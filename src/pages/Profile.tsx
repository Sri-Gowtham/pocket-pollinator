import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, Target, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useCurrency } from "@/contexts/CurrencyContext";

interface Profile {
  id: string;
  email: string;
  full_name: string;
  currency: string;
  theme_preference: string;
}

interface FinancialGoal {
  id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  target_date: string;
  category: string;
  description: string;
}

export default function Profile() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setCurrency } = useCurrency();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  
  const [profileForm, setProfileForm] = useState({
    full_name: "",
    currency: "USD",
    theme_preference: "light",
  });

  const [newGoal, setNewGoal] = useState({
    title: "",
    target_amount: "",
    target_date: "",
    category: "savings",
    description: "",
  });

  const currencies = [
    { code: "USD", name: "US Dollar ($)" },
    { code: "EUR", name: "Euro (€)" },
    { code: "GBP", name: "British Pound (£)" },
    { code: "INR", name: "Indian Rupee (₹)" },
    { code: "JPY", name: "Japanese Yen (¥)" },
    { code: "AUD", name: "Australian Dollar (A$)" },
    { code: "CAD", name: "Canadian Dollar (C$)" },
  ];

  const goalCategories = ["savings", "investment", "debt_payoff", "emergency_fund", "other"];

  useEffect(() => {
    loadProfile();
    loadGoals();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile(data);
        setProfileForm({
          full_name: data.full_name || "",
          currency: data.currency || "USD",
          theme_preference: data.theme_preference || "light",
        });
      }
    } catch (error: any) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadGoals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('financial_goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (error: any) {
      console.error("Error loading goals:", error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileForm.full_name,
          currency: profileForm.currency,
          theme_preference: profileForm.theme_preference,
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update currency context
      setCurrency(profileForm.currency);

      toast({
        title: "Profile updated!",
        description: "Your changes have been saved",
      });

      loadProfile();
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAddGoal = async () => {
    if (!newGoal.title || !newGoal.target_amount) {
      toast({
        title: "Missing fields",
        description: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from('financial_goals').insert({
        user_id: user.id,
        title: newGoal.title,
        target_amount: parseFloat(newGoal.target_amount),
        target_date: newGoal.target_date || null,
        category: newGoal.category,
        description: newGoal.description,
        current_amount: 0,
      });

      if (error) throw error;

      toast({
        title: "Goal created!",
        description: `${newGoal.title} has been added`,
      });

      setNewGoal({
        title: "",
        target_amount: "",
        target_date: "",
        category: "savings",
        description: "",
      });

      loadGoals();
    } catch (error: any) {
      toast({
        title: "Error creating goal",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteGoal = async (id: string) => {
    try {
      const { error } = await supabase
        .from('financial_goals')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Goal deleted",
        description: "The goal has been removed",
      });

      loadGoals();
    } catch (error: any) {
      toast({
        title: "Error deleting goal",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Profile & Settings 👤</h1>
            <p className="text-muted-foreground">
              Manage your account and financial goals
            </p>
          </div>
          <Button onClick={handleSignOut} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="goals">
              <Target className="h-4 w-4 mr-2" />
              Financial Goals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="gradient-card border-0 shadow-md">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile?.email || ""}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={profileForm.full_name}
                    onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>

                <Button onClick={handleUpdateProfile} className="gradient-honey text-white">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="gradient-card border-0 shadow-md">
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Preferred Currency</Label>
                  <Select
                    value={profileForm.currency}
                    onValueChange={(value) => setProfileForm({ ...profileForm, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map(curr => (
                        <SelectItem key={curr.code} value={curr.code}>
                          {curr.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleUpdateProfile} className="gradient-honey text-white">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            {/* Add New Goal */}
            <Card className="gradient-card border-0 shadow-md">
              <CardHeader>
                <CardTitle>Create Financial Goal</CardTitle>
                <CardDescription>Set a new savings or investment target</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal-title">Goal Title *</Label>
                    <Input
                      id="goal-title"
                      placeholder="e.g., Emergency Fund"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goal-amount">Target Amount *</Label>
                    <Input
                      id="goal-amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={newGoal.target_amount}
                      onChange={(e) => setNewGoal({ ...newGoal, target_amount: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goal-date">Target Date</Label>
                    <Input
                      id="goal-date"
                      type="date"
                      value={newGoal.target_date}
                      onChange={(e) => setNewGoal({ ...newGoal, target_date: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goal-category">Category</Label>
                    <Select
                      value={newGoal.category}
                      onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {goalCategories.map(cat => (
                          <SelectItem key={cat} value={cat}>
                            {cat.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="goal-description">Description</Label>
                    <Input
                      id="goal-description"
                      placeholder="Optional notes"
                      value={newGoal.description}
                      onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Button onClick={handleAddGoal} className="gradient-honey text-white">
                    <Target className="h-4 w-4 mr-2" />
                    Create Goal
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Goals List */}
            <Card className="gradient-card border-0 shadow-md">
              <CardHeader>
                <CardTitle>Your Financial Goals</CardTitle>
                <CardDescription>{goals.length} active goal{goals.length !== 1 ? 's' : ''}</CardDescription>
              </CardHeader>
              <CardContent>
                {goals.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No goals yet. Create your first financial goal above!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {goals.map((goal) => {
                      const progress = goal.target_amount > 0 ? (goal.current_amount / goal.target_amount) * 100 : 0;
                      return (
                        <div key={goal.id} className="p-4 bg-background rounded-lg border border-border">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-lg">{goal.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {goal.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </p>
                              {goal.description && (
                                <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteGoal(goal.id)}
                            >
                              <LogOut className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>${goal.current_amount.toFixed(2)}</span>
                              <span className="font-semibold">${goal.target_amount.toFixed(2)}</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{progress.toFixed(0)}% complete</span>
                              {goal.target_date && <span>Target: {new Date(goal.target_date).toLocaleDateString()}</span>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

