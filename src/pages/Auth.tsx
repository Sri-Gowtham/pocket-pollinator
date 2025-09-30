import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate authentication
    if (email && password) {
      toast({
        title: isLogin ? "Welcome back!" : "Account created!",
        description: "Redirecting to dashboard...",
      });
      
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center honeycomb-pattern p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border">
          <div className="text-center mb-8">
            <div className="hexagon w-20 h-20 bg-primary mx-auto flex items-center justify-center mb-4">
              <span className="text-4xl">🐝</span>
            </div>
            <h1 className="text-3xl font-bold">Budget Bee</h1>
            <p className="text-muted-foreground mt-2">
              {isLogin ? "Welcome back!" : "Join the hive!"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Button variant="link" className="text-sm p-0 h-auto">
                  Forgot password?
                </Button>
              </div>
            )}

            <Button type="submit" className="w-full gradient-honey text-white font-semibold">
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Button
                variant="link"
                className="ml-1 p-0 h-auto font-semibold"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up" : "Sign in"}
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
