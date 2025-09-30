import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, TrendingUp, AlertCircle, Target, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Insights() {
  const insights = [
    {
      type: "success",
      icon: TrendingUp,
      title: "Savings Streak",
      description: "You've stayed under budget for 3 months straight! Keep up the great work.",
      action: "View Savings Plan",
    },
    {
      type: "warning",
      icon: AlertCircle,
      title: "Spending Alert",
      description: "Dining expenses are 45% higher than last month. Consider meal prepping to save.",
      action: "See Breakdown",
    },
    {
      type: "tip",
      icon: Target,
      title: "Budget Optimization",
      description: "You could save $120/month by switching to annual subscriptions instead of monthly.",
      action: "Optimize Now",
    },
    {
      type: "insight",
      icon: Brain,
      title: "Pattern Detected",
      description: "You spend more on weekends. Setting a weekend budget could help control expenses.",
      action: "Set Weekend Budget",
    },
  ];

  const aiSuggestions = [
    "📊 Your average daily spending is $94.92. Try to keep it under $90 for better savings.",
    "🎯 Set up automatic transfers to savings on payday to reach your goals faster.",
    "💳 3 of your subscriptions are due next week. Total: $47.97",
    "🍔 Consider reducing takeout by 2 meals/week. Potential savings: $280/month",
    "🚗 Gas expenses increased 18% this month. Check for fuel-efficient driving tips.",
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div className="gradient-honey rounded-2xl p-8 text-primary-foreground">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-8 w-8" />
            <h1 className="text-4xl font-bold">AI Insights</h1>
          </div>
          <p className="text-lg opacity-90">
            Powered by smart analytics to optimize your financial health
          </p>
        </div>

        {/* Main Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            const colors = {
              success: "text-green-600 bg-green-50 border-green-200",
              warning: "text-orange-600 bg-orange-50 border-orange-200",
              tip: "text-blue-600 bg-blue-50 border-blue-200",
              insight: "text-purple-600 bg-purple-50 border-purple-200",
            };
            
            return (
              <Card key={index} className="hover-scale gradient-card border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-lg ${colors[insight.type as keyof typeof colors]}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle>{insight.title}</CardTitle>
                      <CardDescription className="mt-2">
                        {insight.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    {insight.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Suggestions */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Quick AI Suggestions
            </CardTitle>
            <CardDescription>
              Smart tips generated from your spending patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <p className="text-sm">{suggestion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coming Soon */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle>Coming Soon: Advanced AI Features</CardTitle>
            <CardDescription>
              We're working on even smarter insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-background rounded-lg border border-border text-center">
                <p className="font-semibold mb-1">🎯 Goal Prediction</p>
                <p className="text-xs text-muted-foreground">AI forecasts when you'll reach savings goals</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border text-center">
                <p className="font-semibold mb-1">📸 Receipt Scanning</p>
                <p className="text-xs text-muted-foreground">Auto-categorize expenses from photos</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border text-center">
                <p className="font-semibold mb-1">🤖 Budget Assistant</p>
                <p className="text-xs text-muted-foreground">Chat with AI about your finances</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
