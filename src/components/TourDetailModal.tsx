
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, Check, MessageCircle } from 'lucide-react';

interface Tour {
  id: number;
  title: string;
  duration: string;
  location: string;
  participants: string;
  price: string;
  image: string;
  description: string;
  fullDescription: string;
  itinerary: string[];
  includes: string[];
}

interface TourDetailModalProps {
  tour: Tour;
  isOpen: boolean;
  onClose: () => void;
}

const TourDetailModal = ({ tour, isOpen, onClose }: TourDetailModalProps) => {
  const handleBookNow = () => {
    const message = `Hi! I'm interested in booking the ${tour.title} for ${tour.duration} at ${tour.price}. 

Details:
📍 Location: ${tour.location}
👥 Group size: ${tour.participants}
💰 Price: ${tour.price}

Please provide more information about availability and booking process.

Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/254712558187?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-poppins font-bold text-agri-dark">
            {tour.title}
          </DialogTitle>
        </DialogHeader>

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

            <div className="mt-6 p-4 bg-agri-green/10 rounded-lg">
              <div className="text-3xl font-poppins font-bold text-agri-green mb-2">
                {tour.price}
              </div>
              <p className="text-sm text-gray-600 font-inter">
                Per person (price may vary based on group size)
              </p>
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
            Book Now via WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TourDetailModal;
