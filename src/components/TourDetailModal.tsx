
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, Check, MessageCircle, User, Phone, ExternalLink } from 'lucide-react';

interface Tour {
  id: number;
  title: string;
  duration: string;
  location: string;
  participants: string;
  image: string;
  description: string;
  fullDescription: string;
  itinerary: string[];
  includes: string[];
  externalLinks?: { title: string; url: string }[];
}

interface TourDetailModalProps {
  tour: Tour;
  isOpen: boolean;
  onClose: () => void;
}

const TourDetailModal = ({ tour, isOpen, onClose }: TourDetailModalProps) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitBooking = () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please fill in your name and phone number');
      return;
    }

    const itineraryText = tour.itinerary.map(item => `• ${item}`).join('\n');
    const includesText = tour.includes.map(item => `• ${item}`).join('\n');

    const message = `🌾 TOUR BOOKING INQUIRY 🌾

Customer Details:
👤 Name: ${formData.name}
📱 Phone: ${formData.phone}

Tour Information:
🎯 Tour: ${tour.title}
⏰ Duration: ${tour.duration}
📍 Location: ${tour.location}
👥 Group Size: ${tour.participants}

📋 What's Included:
${includesText}

🗺️ Itinerary Highlights:
${itineraryText}

💬 Additional Message:
${formData.message || 'No additional message'}

Please provide availability and booking details for this tour.

Thank you! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/254710429755?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
    setShowBookingForm(false);
    setFormData({ name: '', phone: '', message: '' });
  };

  const handleBookNow = () => {
    setShowBookingForm(true);
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-poppins font-bold text-agri-dark">
            {tour.title}
          </DialogTitle>
        </DialogHeader>

        {!showBookingForm ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image and Basic Info */}
              <div>
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                
                <div className="space-y-3">
                  <div className="flex items-center text-agri-dark font-inter">
                    <Clock className="h-5 w-5 mr-3 text-agri-green" />
                    <span className="font-semibold">Duration:</span>
                    <span className="ml-2">{tour.duration}</span>
                  </div>
                  <div className="flex items-center text-agri-dark font-inter">
                    <MapPin className="h-5 w-5 mr-3 text-agri-green" />
                    <span className="font-semibold">Location:</span>
                    <span className="ml-2">{tour.location}</span>
                  </div>
                  <div className="flex items-center text-agri-dark font-inter">
                    <Users className="h-5 w-5 mr-3 text-agri-green" />
                    <span className="font-semibold">Group size:</span>
                    <span className="ml-2">{tour.participants}</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-poppins font-bold text-agri-dark mb-3">
                    About This Tour
                  </h3>
                  <p className="text-gray-600 font-inter leading-relaxed mb-4">
                    {tour.description}
                  </p>
                  <p className="text-gray-600 font-inter leading-relaxed">
                    {tour.fullDescription}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-poppins font-bold text-agri-dark mb-3">
                    Itinerary
                  </h3>
                  <ul className="space-y-2">
                    {tour.itinerary.map((item, index) => (
                      <li key={index} className="flex items-start text-gray-600 font-inter">
                        <Check className="h-4 w-4 text-agri-green mr-2 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-poppins font-bold text-agri-dark mb-3">
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {tour.includes.map((item, index) => (
                      <li key={index} className="flex items-start text-gray-600 font-inter">
                        <Check className="h-4 w-4 text-agri-green mr-2 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* External Links */}
                {tour.externalLinks && tour.externalLinks.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-poppins font-bold text-agri-dark mb-3">
                      Authoritative Resources
                    </h3>
                    <div className="space-y-3">
                      {tour.externalLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start text-agri-teal hover:text-agri-green font-inter transition-colors group"
                          aria-label={`Learn more about ${link.title}`}
                        >
                          <ExternalLink className="h-4 w-4 mr-2 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <span className="leading-relaxed">{link.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Book Now Button */}
            <div className="flex gap-4 pt-4 border-t">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 font-inter font-semibold"
              >
                Close
              </Button>
              <Button
                onClick={handleBookNow}
                className="flex-1 bg-agri-green hover:bg-agri-green/90 text-white font-inter font-semibold"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Book Now
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-poppins font-bold text-agri-dark mb-2">
                Book Your Tour
              </h3>
              <p className="text-gray-600 font-inter">
                Please provide your details to proceed with booking
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-inter font-semibold text-agri-dark mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-green focus:border-transparent font-inter"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-inter font-semibold text-agri-dark mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-green focus:border-transparent font-inter"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-inter font-semibold text-agri-dark mb-2">
                  Additional Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-green focus:border-transparent font-inter"
                  placeholder="Any special requests or questions?"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Button
                variant="outline"
                onClick={handleCloseBookingForm}
                className="flex-1 font-inter font-semibold"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmitBooking}
                className="flex-1 bg-agri-green hover:bg-agri-green/90 text-white font-inter font-semibold"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Send WhatsApp Message
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TourDetailModal;
