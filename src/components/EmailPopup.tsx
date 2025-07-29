
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Mail } from 'lucide-react';
import { submitEmail } from '@/lib/emailService';
import { useToast } from '@/hooks/use-toast';

interface EmailPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailPopup: React.FC<EmailPopupProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await submitEmail(email);
      
      if (result.success) {
        toast({
          title: "Welcome to the Tribe! 🌾",
          description: result.message,
        });
        onClose();
      } else {
        toast({
          title: "Subscription Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
          {/* Left side - Image */}
          <div className="relative overflow-hidden">
            <img
              src="https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6909.webp"
              alt="Kenya's Agricultural Adventures"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
          </div>
          
          {/* Right side - Content */}
          <div className="p-8 flex flex-col justify-center relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <DialogHeader className="text-left space-y-4 mb-6">
              <h2 className="text-2xl font-bold text-agri-dark leading-tight">
                Ready to Explore Kenya's Hidden Agricultural Gems?
              </h2>
              <h3 className="text-xl font-semibold text-agri-green">
                Join the Fam Tour firm!
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get exclusive updates on our upcoming farm tours, eco-travel experiences, seasonal deals, and behind-the-scenes stories from the land.
              </p>
            </DialogHeader>

            <div className="bg-agri-green/10 p-4 rounded-lg mb-6 border-l-4 border-agri-green">
              <p className="text-agri-dark font-semibold flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Sign up with your email below and get 10% off your first tour!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 text-lg border-2 border-gray-200 focus:border-agri-green rounded-lg"
                  disabled={isSubmitting}
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-agri-green hover:bg-agri-green/90 text-white font-semibold py-3 text-lg rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Mail className="h-5 w-5" />
                {isSubmitting ? 'Subscribing...' : '📩 Subscribe Now'}
              </Button>
            </form>

            <p className="text-sm text-gray-500 mt-4 text-center">
              We promise not to spam. Just fresh updates — straight from the farm!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailPopup;
