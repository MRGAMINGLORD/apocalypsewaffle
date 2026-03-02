import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);
    const { error } = await supabase.from("feedback").insert({ name: name.trim(), message: message.trim() });
    setLoading(false);

    if (error) {
      toast({ title: "Error", description: "Failed to send feedback. Try again.", variant: "destructive" });
    } else {
      toast({ title: "Thanks!", description: "Your feedback has been submitted." });
      setName("");
      setMessage("");
    }
  };

  return (
    <section className="mx-auto max-w-md px-6 pb-20 pt-4">
      <h2 className="mb-6 text-center font-display text-3xl text-primary sm:text-4xl">
        <MessageSquare className="mx-auto mb-2 h-8 w-8" />
        Send Feedback
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-card p-6">
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          required
        />
        <Textarea
          placeholder="Your feedback..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={1000}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending..." : "Submit Feedback"}
        </Button>
      </form>
    </section>
  );
};

export default FeedbackForm;
