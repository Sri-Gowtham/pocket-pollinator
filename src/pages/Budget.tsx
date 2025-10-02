import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Wallet, TrendingUp, AlertTriangle, Edit, Trash2, Plus, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Budget {
  id: string;
  category: string;
  limit_amount: number;
  spent: number;
  period_type: string;
  alert_threshold: number;
  is_active: boolean;
  user_id: string;
}

export default function Budget() {
  const { toast } = useToast();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const [newBudget, setNewBudget] = useState({
    category: "",
    limit: "",
    period_type: "monthly",
    alert_threshold: "80",
  });

  const categories = ["Food", "Transport", "Entertainment", "Shopping", "Bills", "Health", "Education", "Other"];
  const periodTypes = [
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "yearly", label: "Yearly" },
    { value: "custom", label: "Custom" },
  ];

  useEffect(() => {
    loadBudgets();
    calculateSpentAmounts();
  }, []);

  const loadBudgets = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) throw error;
      setBudgets(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading budgets",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateSpentAmounts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: expenses } = await supabase
        .from('expenses')
        .select('category, amount')
        .eq('user_id', user.id);

      if (expenses) {
        const spentByCategory: Record<string, number> = {};
        expenses.forEach(exp => {
          spentByCategory[exp.category] = (spentByCategory[exp.category] || 0) + parseFloat(exp.amount.toString());
        });

        // Update budgets with spent amounts
        const { data: budgetsData } = await supabase
          .from('budgets')
          .select('*')
          .eq('user_id', user.id);

        if (budgetsData) {
          for (const budget of budgetsData) {
            const spent = spentByCategory[budget.category] || 0;
            await supabase
              .from('budgets')
              .update({ spent })
              .eq('id', budget.id);
          }
          loadBudgets();
        }
      }
    } catch (error: any) {
      console.error("Error calculating spent amounts:", error);
    }
  };

  const handleAddBudget = async () => {
    if (!newBudget.category || !newBudget.limit) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from('budgets').insert({
        user_id: user.id,
        category: newBudget.category,
        limit_amount: parseFloat(newBudget.limit),
        period_type: newBudget.period_type,
        alert_threshold: parseInt(newBudget.alert_threshold),
        spent: 0,
        is_active: true,
      });

      if (error) throw error;

      toast({
        title: "Budget created!",
        description: `${newBudget.category} - $${newBudget.limit}/${newBudget.period_type}`,
      });

      setNewBudget({
        category: "",
        limit: "",
        period_type: "monthly",
        alert_threshold: "80",
      });

      loadBudgets();
    } catch (error: any) {
      toast({
        title: "Error creating budget",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateBudget = async () => {
    if (!editingBudget) return;

    try {
      const { error } = await supabase
        .from('budgets')
        .update({
          category: editingBudget.category,
          limit_amount: editingBudget.limit_amount,
          period_type: editingBudget.period_type,
          alert_threshold: editingBudget.alert_threshold,
        })
        .eq('id', editingBudget.id);

      if (error) throw error;

      toast({
        title: "Budget updated!",
        description: "Your changes have been saved",
      });

      setIsDialogOpen(false);
      setEditingBudget(null);
      loadBudgets();
    } catch (error: any) {
      toast({
        title: "Error updating budget",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteBudget = async (id: string) => {
    try {
      const { error } = await supabase
        .from('budgets')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Budget deleted",
        description: "The budget has been removed",
      });

      loadBudgets();
    } catch (error: any) {
      toast({
        title: "Error deleting budget",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit_amount, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0);
  const remaining = totalBudget - totalSpent;

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading budgets...</p>
        </div>
      </Layout>
    );
  }

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
          <Card className="gradient-card border-0 shadow-md hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Budget
              </CardTitle>
              <Wallet className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalBudget.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">All active budgets</p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-md hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Spent
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalSpent.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalBudget > 0 ? `${((totalSpent / totalBudget) * 100).toFixed(1)}% used` : 'No budget set'}
              </p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-md hover-scale">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Remaining
              </CardTitle>
              <AlertTriangle className={`h-5 w-5 ${remaining > 500 ? 'text-green-600' : remaining > 0 ? 'text-orange-600' : 'text-red-600'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${remaining < 0 ? 'text-red-600' : ''}`}>
                ${Math.abs(remaining).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {remaining > 0 ? 'Available to spend' : 'Over budget!'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Add New Budget */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Set Budget Limit
            </CardTitle>
            <CardDescription>Create a new category budget with custom period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={newBudget.category}
                  onValueChange={(value) => setNewBudget({ ...newBudget, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="limit">Limit Amount *</Label>
                <Input
                  id="limit"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newBudget.limit}
                  onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="period">Period</Label>
                <Select
                  value={newBudget.period_type}
                  onValueChange={(value) => setNewBudget({ ...newBudget, period_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {periodTypes.map(period => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alert">Alert at (%)</Label>
                <Input
                  id="alert"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="80"
                  value={newBudget.alert_threshold}
                  onChange={(e) => setNewBudget({ ...newBudget, alert_threshold: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-4">
              <Button
                onClick={handleAddBudget}
                className="w-full md:w-auto gradient-honey text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Budget
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Budget List */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
            <CardDescription>
              {budgets.length} active budget{budgets.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {budgets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No budgets set. Create your first budget above!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {budgets.map((budget) => {
                  const percentage = budget.limit_amount > 0 ? ((budget.spent || 0) / budget.limit_amount) * 100 : 0;
                  const isOverBudget = percentage > 100;
                  const isWarning = percentage >= budget.alert_threshold;

                  return (
                    <div key={budget.id} className="space-y-3 p-4 bg-background rounded-lg border border-border hover:border-primary transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-lg">{budget.category}</h4>
                            <span className="text-xs bg-primary/20 px-2 py-0.5 rounded">
                              {budget.period_type}
                            </span>
                            {isWarning && (
                              <Bell className="h-4 w-4 text-orange-600" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            ${(budget.spent || 0).toFixed(2)} of ${budget.limit_amount.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right mr-2">
                            <span className={`text-2xl font-semibold ${
                              isOverBudget ? 'text-red-600' :
                              isWarning ? 'text-orange-600' :
                              'text-green-600'
                            }`}>
                              {percentage.toFixed(0)}%
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingBudget(budget);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4 text-primary" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteBudget(budget.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      <Progress
                        value={Math.min(percentage, 100)}
                        className="h-3"
                      />
                      {isOverBudget && (
                        <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Over budget by ${((budget.spent || 0) - budget.limit_amount).toFixed(2)}</span>
                        </div>
                      )}
                      {isWarning && !isOverBudget && (
                        <div className="flex items-center gap-2 text-xs text-orange-600 bg-orange-50 p-2 rounded">
                          <Bell className="h-4 w-4" />
                          <span>Alert: {budget.alert_threshold}% threshold reached - ${(budget.limit_amount - (budget.spent || 0)).toFixed(2)} remaining</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Budget</DialogTitle>
              <DialogDescription>Update the budget details</DialogDescription>
            </DialogHeader>
            {editingBudget && (
              <div className="grid gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={editingBudget.category}
                    onValueChange={(value) => setEditingBudget({ ...editingBudget, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-limit">Limit Amount</Label>
                  <Input
                    id="edit-limit"
                    type="number"
                    step="0.01"
                    value={editingBudget.limit_amount}
                    onChange={(e) => setEditingBudget({ ...editingBudget, limit_amount: parseFloat(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-period">Period</Label>
                  <Select
                    value={editingBudget.period_type}
                    onValueChange={(value) => setEditingBudget({ ...editingBudget, period_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {periodTypes.map(period => (
                        <SelectItem key={period.value} value={period.value}>
                          {period.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-alert">Alert Threshold (%)</Label>
                  <Input
                    id="edit-alert"
                    type="number"
                    min="0"
                    max="100"
                    value={editingBudget.alert_threshold}
                    onChange={(e) => setEditingBudget({ ...editingBudget, alert_threshold: parseInt(e.target.value) })}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateBudget} className="gradient-honey text-white">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
