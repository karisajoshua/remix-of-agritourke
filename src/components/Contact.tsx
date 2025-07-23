
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    tourType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', message: '', tourType: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-agri-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
            Plan Your Trip With Us
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
            Ready to embark on an unforgettable agritourism adventure? 
            Get in touch and let's create your perfect Kenyan experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-poppins font-bold text-agri-dark mb-8">
              Get in Touch
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-agri-green/10 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="h-6 w-6 text-agri-green" />
                </div>
                <div>
                  <h4 className="text-lg font-poppins font-semibold text-agri-dark mb-1">
                    Email Us
                  </h4>
                  <p className="text-gray-600 font-inter">
                    info@agritourismadventures.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-agri-green/10 rounded-lg flex items-center justify-center mr-4">
                  <Phone className="h-6 w-6 text-agri-green" />
                </div>
                <div>
                  <h4 className="text-lg font-poppins font-semibold text-agri-dark mb-1">
                    Call Us
                  </h4>
                  <p className="text-gray-600 font-inter">
                    +254710429755
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-agri-green/10 rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-agri-green" />
                </div>
                <div>
                  <h4 className="text-lg font-poppins font-semibold text-agri-dark mb-1">
                    Visit Us
                  </h4>
                  <p className="text-gray-600 font-inter">
                    Nairobi, Kenya
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-agri-green/10 rounded-lg flex items-center justify-center mr-4">
                  <MessageCircle className="h-6 w-6 text-agri-green" />
                </div>
                <div>
                  <h4 className="text-lg font-poppins font-semibold text-agri-dark mb-1">
                    WhatsApp
                  </h4>
                  <p className="text-gray-600 font-inter">
                    Quick responses for urgent inquiries
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="mt-12 p-6 bg-white rounded-lg shadow-lg">
              <h4 className="text-lg font-poppins font-semibold text-agri-dark mb-4">
                Quick Info
              </h4>
              <ul className="space-y-2 text-gray-600 font-inter">
                <li>• Response time: Within 24 hours</li>
                <li>• Custom itineraries available</li>
                <li>• Group discounts offered</li>
                <li>• Flexible booking options</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-poppins font-bold text-agri-dark mb-6">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-inter font-medium text-agri-dark mb-2">
                  Name *
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-inter font-medium text-agri-dark mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-inter font-medium text-agri-dark mb-2">
                  Tour Type
                </label>
                <Select value={formData.tourType} onValueChange={(value) => handleInputChange('tourType', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select tour type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farm-tours">Farm Tours</SelectItem>
                    <SelectItem value="dairy-safari">Dairy + Tea Safari</SelectItem>
                    <SelectItem value="wildlife-safari">Agricultural Wildlife Safari</SelectItem>
                    <SelectItem value="cultural-tours">Cultural Tours</SelectItem>
                    <SelectItem value="homestay">Community Homestay</SelectItem>
                    <SelectItem value="educational">Educational Tours</SelectItem>
                    <SelectItem value="custom">Custom Experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-inter font-medium text-agri-dark mb-2">
                  Message *
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full min-h-[120px]"
                  placeholder="Tell us about your preferred dates, group size, and any special requirements..."
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-agri-green hover:bg-agri-green/90 text-white font-inter font-semibold py-3"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
