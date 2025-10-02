import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_PUBLISHABLE_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch user's expenses
    const { data: expenses } = await supabaseClient
      .from('expenses')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(100);

    const { data: budgets } = await supabaseClient
      .from('budgets')
      .select('*')
      .eq('user_id', user.id);

    if (!expenses || expenses.length === 0) {
      return new Response(JSON.stringify({ 
        analysis: {
          spending_patterns: "Not enough data to analyze spending patterns yet.",
          fraud_alerts: [],
          recommendations: ["Start tracking your expenses to get personalized insights!"],
          tax_insights: "Add more expenses to get tax-related insights.",
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Calculate statistics
    const totalSpent = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    const avgExpense = totalSpent / expenses.length;
    
    // Group by category
    const categoryTotals: Record<string, number> = {};
    expenses.forEach(exp => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + parseFloat(exp.amount);
    });

    // Detect unusual transactions (potential fraud)
    const fraudAlerts = expenses
      .filter(exp => parseFloat(exp.amount) > avgExpense * 3)
      .map(exp => ({
        id: exp.id,
        title: exp.title,
        amount: exp.amount,
        date: exp.date,
        reason: 'Unusually high amount compared to average spending'
      }));

    const prompt = `Analyze this financial data and provide detailed insights:

Total Expenses: $${totalSpent.toFixed(2)}
Number of Transactions: ${expenses.length}
Average Transaction: $${avgExpense.toFixed(2)}

Spending by Category:
${Object.entries(categoryTotals).map(([cat, amt]) => `- ${cat}: $${amt.toFixed(2)}`).join('\n')}

Recent Transactions (last 10):
${expenses.slice(0, 10).map(exp => `- ${exp.title}: $${exp.amount} (${exp.category}) on ${exp.date}`).join('\n')}

Budgets:
${budgets && budgets.length > 0 ? budgets.map(b => `- ${b.category}: $${b.spent || 0}/$${b.limit_amount}`).join('\n') : 'No budgets set'}

Provide a comprehensive analysis including:
1. Spending Patterns: Identify trends, peak spending days/categories
2. Budget Adherence: How well they're sticking to budgets
3. Recommendations: 3-5 actionable tips to improve financial health
4. Tax Insights: Potential deductible expenses or tax-saving opportunities
5. Savings Opportunities: Areas where they can cut costs

Format as JSON with keys: spending_patterns, budget_analysis, recommendations (array), tax_insights, savings_opportunities`;

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are a financial analysis expert. Provide detailed, actionable insights in JSON format.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      return new Response(JSON.stringify({ error: 'AI service unavailable' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    let aiAnalysis;
    
    try {
      // Try to parse as JSON
      const content = data.choices[0].message.content;
      // Remove markdown code blocks if present
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/```\n?([\s\S]*?)\n?```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      aiAnalysis = JSON.parse(jsonStr);
    } catch (e) {
      // If parsing fails, structure the response
      aiAnalysis = {
        spending_patterns: data.choices[0].message.content,
        recommendations: ["Review your spending regularly", "Set realistic budgets", "Track all expenses"],
        tax_insights: "Consult a tax professional for personalized advice",
      };
    }

    return new Response(JSON.stringify({ 
      analysis: {
        ...aiAnalysis,
        fraud_alerts: fraudAlerts,
        statistics: {
          total_spent: totalSpent,
          avg_expense: avgExpense,
          transaction_count: expenses.length,
          category_breakdown: categoryTotals,
        }
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error analyzing spending:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

