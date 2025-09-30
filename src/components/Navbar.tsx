import { Link, useLocation } from "react-router-dom";
import { Menu, LayoutDashboard, Receipt, Lightbulb, Wallet, LogOut } from "lucide-react";
import { Button } from "./ui/button";

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  const location = useLocation();
  const isAuth = location.pathname === "/auth";

  if (isAuth) return null;

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/expenses", label: "Expenses", icon: Receipt },
    { path: "/insights", label: "AI Insights", icon: Lightbulb },
    { path: "/budget", label: "Budget", icon: Wallet },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <Link to="/" className="flex items-center gap-2">
              <div className="hexagon w-10 h-10 bg-primary flex items-center justify-center">
                <span className="text-2xl">🐝</span>
              </div>
              <span className="font-bold text-xl hidden sm:block">Budget Bee</span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-accent text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <Link to="/auth">
            <Button variant="ghost" size="sm" className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
