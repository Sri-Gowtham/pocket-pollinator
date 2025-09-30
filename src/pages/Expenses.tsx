import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export default function Expenses() {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", title: "Grocery Shopping", amount: 85.50, category: "Food", date: "2024-03-15" },
    { id: "2", title: "Gas Station", amount: 45.00, category: "Transport", date: "2024-03-14" },
    { id: "3", title: "Netflix", amount: 15.99, category: "Entertainment", date: "2024-03-13" },
  ]);

  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const categories = ["Food", "Transport", "Entertainment", "Shopping", "Bills", "Other"];

  const handleAddExpense = () => {
    if (newExpense.title && newExpense.amount && newExpense.category) {
      const expense: Expense = {
        id: Date.now().toString(),
        title: newExpense.title,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        date: new Date().toISOString().split('T')[0],
      };
      
      setExpenses([expense, ...expenses]);
      setNewExpense({ title: "", amount: "", category: "" });
      
      toast({
        title: "Expense added!",
        description: `${expense.title} - $${expense.amount}`,
      });
    }
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
    toast({
      title: "Expense deleted",
      variant: "destructive",
    });
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Expense Tracker 🐝</h1>
          <p className="text-muted-foreground">
            Keep track of where your honey goes
          </p>
        </div>

        {/* Add New Expense */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Add New Expense
            </CardTitle>
            <CardDescription>Record a new transaction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Lunch"
                  value={newExpense.title}
                  onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button
                  onClick={handleAddExpense}
                  className="w-full gradient-honey text-white"
                >
                  Add Expense
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expenses List */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>Your transaction history</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-3xl font-bold">${totalExpenses.toFixed(2)}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover-scale"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold">{expense.title}</h4>
                    <div className="flex gap-3 text-sm text-muted-foreground mt-1">
                      <span className="bg-primary/20 px-2 py-0.5 rounded">
                        {expense.category}
                      </span>
                      <span>{expense.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold">${expense.amount.toFixed(2)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteExpense(expense.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
