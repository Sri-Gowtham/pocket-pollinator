import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, Sparkles } from "lucide-react";
import { ExpenseChart } from "@/components/ExpenseChart";
import { SpendingTrendChart } from "@/components/SpendingTrendChart";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Expenses",
      value: "$2,847.50",
      change: "+12.5%",
      trending: "up",
      icon: DollarSign,
    },
    {
      title: "Monthly Budget",
      value: "$3,500.00",
      change: "81% used",
      trending: "down",
      icon: TrendingDown,
    },
    {
      title: "Alerts",
      value: "3",
      change: "2 new today",
      trending: "up",
      icon: AlertTriangle,
    },
    {
      title: "AI Insights",
      value: "5 tips",
      change: "Ready to view",
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
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Quick Tips
              </CardTitle>
              <CardDescription>
                Smart suggestions for your finances
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-background rounded-lg border border-border">
                <p className="text-sm">💡 You're spending 23% more on dining this month</p>
              </div>
              <div className="p-3 bg-background rounded-lg border border-border">
                <p className="text-sm">🎯 Great job! You're on track with your savings goal</p>
              </div>
              <div className="p-3 bg-background rounded-lg border border-border">
                <p className="text-sm">⚠️ Entertainment budget is 90% used with 10 days left</p>
              </div>
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
              <ExpenseChart 
                data={[
                  { category: "Food", amount: 642 },
                  { category: "Transport", amount: 245 },
                  { category: "Entertainment", amount: 180 },
                  { category: "Shopping", amount: 156 },
                  { category: "Bills", amount: 1200 },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
