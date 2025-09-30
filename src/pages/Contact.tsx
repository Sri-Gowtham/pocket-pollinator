import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Contact Us 📧</h1>
          <p className="text-muted-foreground">
            Get in touch with the Budget Bee team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="gradient-card border-0 shadow-md">
            <CardContent className="pt-6 text-center">
              <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">support@budgetbee.com</p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-md">
            <CardContent className="pt-6 text-center">
              <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-sm text-muted-foreground">1-800-BEE-BUZZ</p>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-md">
            <CardContent className="pt-6 text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="text-sm text-muted-foreground">San Francisco, CA</p>
            </CardContent>
          </Card>
        </div>

        <Card className="gradient-card border-0 shadow-md">
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll respond as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full gradient-honey text-white">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
