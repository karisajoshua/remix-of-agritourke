import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Send } from "lucide-react";
import { z } from "zod";

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  group_size: z.string().trim().max(50).optional(),
  preferred_dates: z.string().trim().max(100).optional(),
  message: z.string().trim().max(1000).optional(),
});

interface QuoteRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tourId: string;
  tourTitle: string;
}

export default function QuoteRequestDialog({ open, onOpenChange, tourId, tourTitle }: QuoteRequestDialogProps) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    group_size: "",
    preferred_dates: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = quoteSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setSubmitting(true);
      const { error } = await supabase.from("quote_requests").insert({
        tour_id: tourId,
        tour_title: tourTitle,
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || null,
        group_size: result.data.group_size || null,
        preferred_dates: result.data.preferred_dates || null,
        message: result.data.message || null,
      });

      if (error) throw error;

      toast.success("Quote request submitted! We'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", group_size: "", preferred_dates: "", message: "" });
      onOpenChange(false);
    } catch {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-poppins font-bold text-agri-dark">
            Request Custom Quote
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-inter">
            Get a tailored quote for <span className="font-semibold text-agri-green">{tourTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="quote-name">Full Name *</Label>
            <Input id="quote-name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" maxLength={100} />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="quote-email">Email *</Label>
            <Input id="quote-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" maxLength={255} />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="quote-phone">Phone</Label>
              <Input id="quote-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+254..." maxLength={20} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quote-group">Group Size</Label>
              <Input id="quote-group" name="group_size" value={form.group_size} onChange={handleChange} placeholder="e.g. 4-6 people" maxLength={50} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="quote-dates">Preferred Dates</Label>
            <Input id="quote-dates" name="preferred_dates" value={form.preferred_dates} onChange={handleChange} placeholder="e.g. March 15-20, 2026" maxLength={100} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="quote-message">Additional Details</Label>
            <Textarea id="quote-message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your requirements, preferences, or any questions..." rows={3} maxLength={1000} />
          </div>

          <Button type="submit" disabled={submitting} className="w-full bg-agri-green hover:bg-agri-green/90 font-inter font-semibold">
            <Send className="mr-2 h-4 w-4" />
            {submitting ? "Submitting..." : "Submit Quote Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
