import { Button } from "./ui/button";
import { Mail, HelpCircle, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link to="/contact">
              <Button variant="outline" size="sm" className="gap-2">
                <Mail className="h-4 w-4" />
                Contact Us
              </Button>
            </Link>
            <Link to="/support">
              <Button variant="outline" size="sm" className="gap-2">
                <HelpCircle className="h-4 w-4" />
                Support Center
              </Button>
            </Link>
            <Link to="/feedback">
              <Button variant="outline" size="sm" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Feedback
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            © 2024 Budget Bee. All rights reserved. Making your finances buzz with efficiency! 🐝
          </p>
        </div>
      </div>
    </footer>
  );
};
