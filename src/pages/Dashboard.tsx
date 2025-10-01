import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, Sparkles } from "lucide-react";
import { ExpenseChart } from "@/components/ExpenseChart";
import { SpendingTrendChart } from "@/components/SpendingTrendChart";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<string[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [budgets, setBudgets] = useState<any[]>([]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        loadData();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadData = async () => {
    const { data: expensesData } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false });

    const { data: budgetsData } = await supabase
      .from('budgets')
      .select('*');

    setExpenses(expensesData || []);
    setBudgets(budgetsData || []);
    setLoading(false);
  };

  const generateInsights = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-insights');
      
      if (error) throw error;
      
      if (data?.insights) {
        const insightsList = data.insights.split('\n').filter((line: string) => line.trim());
        setInsights(insightsList);
        toast({
          title: "Insights generated!",
          description: "Your personalized financial insights are ready.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate insights",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
  const totalBudget = budgets.reduce((sum, bud) => sum + parseFloat(bud.limit_amount || 0), 0);

  const expensesByCategory = expenses.reduce((acc: any, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + parseFloat(exp.amount || 0);
    return acc;
  }, {});

  const chartData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    category,
    amount: amount as number,
  }));

  const stats = [
    {
      title: "Total Expenses",
      value: `$${totalExpenses.toFixed(2)}`,
      change: expenses.length > 0 ? `${expenses.length} transactions` : "No expenses",
      trending: "up",
      icon: DollarSign,
    },
    {
      title: "Monthly Budget",
      value: `$${totalBudget.toFixed(2)}`,
      change: totalBudget > 0 ? `${((totalExpenses / totalBudget) * 100).toFixed(0)}% used` : "No budget set",
      trending: totalExpenses > totalBudget ? "up" : "down",
      icon: TrendingDown,
    },
    {
      title: "Categories",
      value: Object.keys(expensesByCategory).length.toString(),
      change: "Tracked",
      trending: "neutral",
      icon: AlertTriangle,
    },
    {
      title: "AI Insights",
      value: insights.length > 0 ? `${insights.length} tips` : "Generate",
      change: insights.length > 0 ? "Ready to view" : "Click to generate",
      trending: "neutral",
      icon: Sparkles,
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="gradient-honey rounded-2xl p-8 text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2">Welcome back! 🍯</h1>
            <p className="text-lg opacity-90">
              Your finances are buzzing along nicely. Here's today's overview.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover-scale gradient-card border-0 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="flex items-center gap-1 text-sm">
                    {stat.trending === "up" && (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    )}
                    {stat.trending === "down" && (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={
                      stat.trending === "up" ? "text-green-600" : 
                      stat.trending === "down" ? "text-red-600" : 
                      "text-muted-foreground"
                    }>
                      {stat.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="gradient-card border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Quick Tips
                </div>
                <Button onClick={generateInsights} disabled={loading} size="sm">
                  {loading ? "Generating..." : "Generate Insights"}
                </Button>
              </CardTitle>
              <CardDescription>
                Smart suggestions for your finances
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {insights.length > 0 ? (
                insights.map((insight, idx) => (
                  <div key={idx} className="p-3 bg-background rounded-lg border border-border">
                    <p className="text-sm">{insight}</p>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-background rounded-lg border border-border text-center">
                  <p className="text-sm text-muted-foreground">
                    Click "Generate Insights" to get personalized financial tips
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Spending by Category
              </CardTitle>
              <CardDescription>
                Monthly expense breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <ExpenseChart data={chartData} />
              ) : (
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <p>No expenses to display. Add some expenses to see the breakdown.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
