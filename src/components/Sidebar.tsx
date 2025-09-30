import { Link, useLocation } from "react-router-dom";
import { X, LayoutDashboard, Receipt, Lightbulb, Wallet } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/expenses", label: "Expenses", icon: Receipt },
    { path: "/insights", label: "AI Insights", icon: Lightbulb },
    { path: "/budget", label: "Budget", icon: Wallet },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border lg:hidden">
            <span className="font-bold text-lg">Menu</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover-scale ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                      : "hover:bg-sidebar-accent text-sidebar-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <div className="hexagon w-16 h-16 bg-primary mx-auto flex items-center justify-center mb-2">
              <span className="text-3xl">🐝</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Making finances buzz! 🍯
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
