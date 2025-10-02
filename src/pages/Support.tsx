import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Support() {
  const faqs = [
    {
      question: "How do I add a new expense?",
      answer: "Navigate to the Expenses page and click 'Add New Expense'. Fill in the title, amount, and category, then click submit.",
    },
    {
      question: "Can I set different budgets for different categories?",
      answer: "Yes! Go to the Budget page and create separate budget limits for each spending category like Food, Transport, Entertainment, etc.",
    },
    {
      question: "How does the AI insights feature work?",
      answer: "Our AI analyzes your spending patterns and provides personalized recommendations to help you save money and optimize your budget.",
    },
    {
      question: "Is my financial data secure?",
      answer: "Absolutely! We use bank-level encryption and never share your data with third parties. Your privacy is our top priority.",
    },
    {
      question: "Can I export my expense data?",
      answer: "Yes, you can export your data in CSV or PDF format from the Expenses page. Look for the export button in the top right.",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Support Center 🐝</h1>
          <p className="text-muted-foreground">
            Find answers and get help with Budget Bee
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover-scale gradient-card border-0 shadow-md cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Book className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold">Documentation</h3>
            </CardContent>
          </Card>

          <Link to="/contact" className="block">
            <Card className="hover-scale gradient-card border-0 shadow-md cursor-pointer h-full">
              <CardContent className="pt-6 text-center">
                <HelpCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold">Contact Support</h3>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* FAQs */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Quick answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Still Need Help */}
        <Card className="gradient-honey border-0 shadow-md text-primary-foreground">
          <CardContent className="pt-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
            <p className="mb-4 opacity-90">
              Our support team is here to help you buzz through any issues
            </p>
            <Link to="/contact">
              <Button variant="secondary" size="lg">
                Contact Support Team
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
