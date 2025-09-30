import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Wallet, TrendingUp, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Budget {
  category: string;
  limit: number;
  spent: number;
}

export default function Budget() {
  const { toast } = useToast();
  const [budgets, setBudgets] = useState<Budget[]>([
    { category: "Food", limit: 800, spent: 642 },
    { category: "Transport", limit: 300, spent: 245 },
    { category: "Entertainment", limit: 200, spent: 180 },
    { category: "Shopping", limit: 400, spent: 156 },
    { category: "Bills", limit: 1200, spent: 1200 },
  ]);

  const [newBudget, setNewBudget] = useState({
    category: "",
    limit: "",
  });

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.limit) {
      const budget: Budget = {
        category: newBudget.category,
        limit: parseFloat(newBudget.limit),
        spent: 0,
      };
      
      setBudgets([...budgets, budget]);
      setNewBudget({ category: "", limit: "" });
      
      toast({
        title: "Budget created!",
        description: `${budget.category} - $${budget.limit}/month`,
      });
    }
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remaining = totalBudget - totalSpent;

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Budget Manager 🍯</h1>
          <p className="text-muted-foreground">
            Keep your spending sweet and under control
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="gradient-card border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Budget
              </CardTitle>
              <Wallet className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalBudget.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">Monthly limit</p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Spent
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalSpent.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {((totalSpent / totalBudget) * 100).toFixed(1)}% used
              </p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Remaining
              </CardTitle>
              <AlertTriangle className={`h-5 w-5 ${remaining > 500 ? 'text-green-600' : 'text-red-600'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${remaining.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {remaining > 0 ? 'Available to spend' : 'Over budget!'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Add New Budget */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle>Set Budget Limit</CardTitle>
            <CardDescription>Create a new category budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Groceries"
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="limit">Monthly Limit</Label>
                <Input
                  id="limit"
                  type="number"
                  placeholder="0.00"
                  value={newBudget.limit}
                  onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
                />
              </div>
              
              <div className="flex items-end">
                <Button
                  onClick={handleAddBudget}
                  className="w-full gradient-honey text-white"
                >
                  Create Budget
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget List */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
            <CardDescription>Track spending across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {budgets.map((budget, index) => {
                const percentage = (budget.spent / budget.limit) * 100;
                const isOverBudget = percentage > 100;
                const isWarning = percentage > 80;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{budget.category}</h4>
                        <p className="text-sm text-muted-foreground">
                          ${budget.spent.toFixed(2)} of ${budget.limit.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`font-semibold ${
                          isOverBudget ? 'text-red-600' : 
                          isWarning ? 'text-orange-600' : 
                          'text-green-600'
                        }`}>
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className="h-3"
                    />
                    {isOverBudget && (
                      <p className="text-xs text-red-600">
                        ⚠️ Over budget by ${(budget.spent - budget.limit).toFixed(2)}
                      </p>
                    )}
                    {isWarning && !isOverBudget && (
                      <p className="text-xs text-orange-600">
                        ⚠️ Approaching limit - ${(budget.limit - budget.spent).toFixed(2)} remaining
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
