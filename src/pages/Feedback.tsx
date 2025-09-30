import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Feedback() {
  const { toast } = useToast();
  const [rating, setRating] = useState<number>(0);
  const [feedbackType, setFeedbackType] = useState("general");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for your feedback!",
      description: "Your input helps us improve Budget Bee.",
    });
    setRating(0);
    setFeedbackType("general");
    setFeedback("");
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Feedback 💬</h1>
          <p className="text-muted-foreground">
            Help us make Budget Bee better for everyone
          </p>
        </div>

        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle>Share Your Thoughts</CardTitle>
            <CardDescription>
              We value your opinion and use it to improve our service
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div className="space-y-3">
                <Label>How would you rate your experience?</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Type */}
              <div className="space-y-3">
                <Label>What type of feedback is this?</Label>
                <RadioGroup value={feedbackType} onValueChange={setFeedbackType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general" className="font-normal cursor-pointer">
                      General Feedback
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bug" id="bug" />
                    <Label htmlFor="bug" className="font-normal cursor-pointer">
                      Bug Report
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feature" id="feature" />
                    <Label htmlFor="feature" className="font-normal cursor-pointer">
                      Feature Request
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="complaint" id="complaint" />
                    <Label htmlFor="complaint" className="font-normal cursor-pointer">
                      Complaint
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Feedback Text */}
              <div className="space-y-2">
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea
                  id="feedback"
                  placeholder="Tell us what you think..."
                  rows={8}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full gradient-honey text-white">
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Feature Requests */}
        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle>Popular Feature Requests</CardTitle>
            <CardDescription>
              Vote for features you'd like to see
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { feature: "Multi-currency support", votes: 124 },
                { feature: "Mobile app", votes: 98 },
                { feature: "Recurring expense templates", votes: 76 },
                { feature: "Bank account sync", votes: 65 },
                { feature: "Dark mode improvements", votes: 43 },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
                >
                  <span>{item.feature}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {item.votes} votes
                    </span>
                    <Button size="sm" variant="outline">
                      Vote
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
