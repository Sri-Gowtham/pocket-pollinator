import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseChart } from "@/components/ExpenseChart";
import { SpendingTrendChart } from "@/components/SpendingTrendChart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Analytics() {
  const categoryData = [
    { category: "Food", amount: 642 },
    { category: "Transport", amount: 245 },
    { category: "Entertainment", amount: 180 },
    { category: "Shopping", amount: 156 },
    { category: "Bills", amount: 1200 },
  ];

  const trendData = [
    { date: "Week 1", amount: 450 },
    { date: "Week 2", amount: 680 },
    { date: "Week 3", amount: 520 },
    { date: "Week 4", amount: 1197 },
  ];

  const monthlyComparison = [
    { month: "Jan", amount: 2650 },
    { month: "Feb", amount: 2890 },
    { month: "Mar", amount: 2847 },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Analytics & Reports 📊</h1>
          <p className="text-muted-foreground">
            Visualize your spending patterns and trends
          </p>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="gradient-card border-0 shadow-md">
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>
                Current month distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseChart data={categoryData} />
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-md">
            <CardHeader>
              <CardTitle>Weekly Trend</CardTitle>
              <CardDescription>
                Spending pattern over the last 4 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SpendingTrendChart data={trendData} />
            </CardContent>
          </Card>
        </div>

        {/* Monthly Comparison */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle>Monthly Comparison</CardTitle>
            <CardDescription>
              Last 3 months spending overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#F59E0B" name="Spending ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="gradient-card border-0 shadow-md">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Average Daily</p>
              <p className="text-3xl font-bold">$94.92</p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-md">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Highest Category</p>
              <p className="text-3xl font-bold">Bills</p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-md">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Savings Rate</p>
              <p className="text-3xl font-bold">18.7%</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
