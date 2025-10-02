import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, TrendingUp, AlertCircle, Target, Zap, Brain, Shield, DollarSign, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SpendingAnalysis {
  spending_patterns?: string;
  budget_analysis?: string;
  recommendations?: string[];
  tax_insights?: string;
  savings_opportunities?: string;
  fraud_alerts?: Array<{
    id: string;
    title: string;
    amount: number;
    date: string;
    reason: string;
  }>;
  statistics?: {
    total_spent: number;
    avg_expense: number;
    transaction_count: number;
    category_breakdown: Record<string, number>;
  };
}

export default function Insights() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SpendingAnalysis | null>(null);

  useEffect(() => {
    loadAnalysis();
  }, []);

  const loadAnalysis = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-spending');

      if (error) throw error;

      if (data?.analysis) {
        setAnalysis(data.analysis);
      }
    } catch (error: any) {
      toast({
        title: "Error loading analysis",
        description: error.message || "Failed to load spending analysis",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshAnalysis = () => {
    loadAnalysis();
    toast({
      title: "Refreshing analysis",
      description: "Getting latest insights from your data...",
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="gradient-honey rounded-2xl p-8 text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Sparkles className="h-8 w-8" />
                <h1 className="text-4xl font-bold">AI Insights</h1>
              </div>
              <Button
                onClick={handleRefreshAnalysis}
                disabled={loading}
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                {loading ? "Analyzing..." : "Refresh Analysis"}
              </Button>
            </div>
            <p className="text-lg opacity-90">
              Powered by smart analytics to optimize your financial health
            </p>
          </div>
        </div>

        {loading && !analysis ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">Analyzing your spending patterns...</p>
          </div>
        ) : analysis ? (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
              <TabsTrigger value="recommendations">Tips</TabsTrigger>
              <TabsTrigger value="fraud">Fraud Alerts</TabsTrigger>
              <TabsTrigger value="tax">Tax Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Statistics Cards */}
              {analysis.statistics && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="gradient-card border-0 shadow-md hover-scale">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Spent
                      </CardTitle>
                      <DollarSign className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">${analysis.statistics.total_spent.toFixed(2)}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {analysis.statistics.transaction_count} transactions
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="gradient-card border-0 shadow-md hover-scale">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Average Expense
                      </CardTitle>
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">${analysis.statistics.avg_expense.toFixed(2)}</div>
                      <p className="text-xs text-muted-foreground mt-1">Per transaction</p>
                    </CardContent>
                  </Card>

                  <Card className="gradient-card border-0 shadow-md hover-scale">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Categories
                      </CardTitle>
                      <PieChart className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {Object.keys(analysis.statistics.category_breakdown).length}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Active categories</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Category Breakdown */}
              {analysis.statistics?.category_breakdown && (
                <Card className="gradient-card border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Spending by Category</CardTitle>
                    <CardDescription>Your expense distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(analysis.statistics.category_breakdown)
                        .sort(([, a], [, b]) => b - a)
                        .map(([category, amount]) => {
                          const percentage = (amount / analysis.statistics!.total_spent) * 100;
                          return (
                            <div key={category} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">{category}</span>
                                <span className="text-muted-foreground">
                                  ${amount.toFixed(2)} ({percentage.toFixed(1)}%)
                                </span>
                              </div>
                              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary transition-all"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="patterns" className="space-y-6">
              <Card className="gradient-card border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Spending Patterns
                  </CardTitle>
                  <CardDescription>AI-detected trends in your expenses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground whitespace-pre-wrap">{analysis.spending_patterns}</p>
                  </div>
                </CardContent>
              </Card>

              {analysis.budget_analysis && (
                <Card className="gradient-card border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Budget Analysis
                    </CardTitle>
                    <CardDescription>How you're tracking against your budgets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-foreground whitespace-pre-wrap">{analysis.budget_analysis}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card className="gradient-card border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    AI Recommendations
                  </CardTitle>
                  <CardDescription>Actionable tips to improve your finances</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.recommendations && analysis.recommendations.length > 0 ? (
                      analysis.recommendations.map((rec, index) => (
                        <div
                          key={index}
                          className="p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors"
                        >
                          <p className="text-sm">{rec}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No recommendations available yet.</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {analysis.savings_opportunities && (
                <Card className="gradient-card border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Savings Opportunities
                    </CardTitle>
                    <CardDescription>Ways to reduce your expenses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-foreground whitespace-pre-wrap">{analysis.savings_opportunities}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="fraud" className="space-y-6">
              <Card className="gradient-card border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-orange-600" />
                    Fraud Detection
                  </CardTitle>
                  <CardDescription>Unusual transactions that need your attention</CardDescription>
                </CardHeader>
                <CardContent>
                  {analysis.fraud_alerts && analysis.fraud_alerts.length > 0 ? (
                    <div className="space-y-3">
                      {analysis.fraud_alerts.map((alert) => (
                        <div
                          key={alert.id}
                          className="p-4 bg-orange-50 border border-orange-200 rounded-lg"
                        >
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-orange-900">{alert.title}</h4>
                              <p className="text-sm text-orange-700 mt-1">{alert.reason}</p>
                              <div className="flex gap-4 mt-2 text-xs text-orange-600">
                                <span>Amount: ${alert.amount}</span>
                                <span>Date: {new Date(alert.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Shield className="h-12 w-12 text-green-600 mx-auto mb-3" />
                      <p className="text-green-600 font-semibold">All Clear!</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        No unusual transactions detected
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tax" className="space-y-6">
              <Card className="gradient-card border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Tax Insights
                  </CardTitle>
                  <CardDescription>Potential deductions and tax-saving opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground whitespace-pre-wrap">
                      {analysis.tax_insights || "Add more expenses to get tax-related insights."}
                    </p>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>Note:</strong> These insights are for informational purposes only.
                      Please consult with a qualified tax professional for personalized advice.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="gradient-card border-0 shadow-md">
            <CardContent className="py-12 text-center">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Data Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start adding expenses to get personalized AI insights!
              </p>
              <Button onClick={() => window.location.href = '/expenses'} className="gradient-honey text-white">
                Add Your First Expense
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
