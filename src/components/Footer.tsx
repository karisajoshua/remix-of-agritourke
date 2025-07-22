
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-agri-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img
                src="https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/logo/AA%20transparent%20Logo.png"
                alt="Agritourism Adventures"
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-300 font-inter mb-6 leading-relaxed">
              Connecting travelers with Kenya's agricultural heritage through 
              sustainable, educational, and transformative experiences.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-agri-green/20 rounded-full flex items-center justify-center hover:bg-agri-green/30 transition-colors cursor-pointer">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-agri-green/20 rounded-full flex items-center justify-center hover:bg-agri-green/30 transition-colors cursor-pointer">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-agri-green/20 rounded-full flex items-center justify-center hover:bg-agri-green/30 transition-colors cursor-pointer">
                <Twitter className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Tours */}
          <div>
            <h4 className="text-lg font-poppins font-semibold mb-4">Tours</h4>
            <ul className="space-y-2 text-gray-300 font-inter">
              <li><a href="#" className="hover:text-agri-yellow transition-colors">Farm Tours</a></li>
              <li><a href="#" className="hover:text-agri-yellow transition-colors">Dairy Safaris</a></li>
              <li><a href="#" className="hover:text-agri-yellow transition-colors">Wildlife Safaris</a></li>
              <li><a href="#" className="hover:text-agri-yellow transition-colors">Cultural Tours</a></li>
              <li><a href="#" className="hover:text-agri-yellow transition-colors">Educational Tours</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-poppins font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300 font-inter">
              <li><a href="#about" className="hover:text-agri-yellow transition-colors">About Us</a></li>
              <li><a href="/gallery" className="hover:text-agri-yellow transition-colors">Gallery</a></li>
              <li><a href="#impact" className="hover:text-agri-yellow transition-colors">Our Impact</a></li>
              <li><a href="#" className="hover:text-agri-yellow transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-agri-yellow transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-poppins font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 font-inter">
                <Mail className="h-4 w-4 mr-2 text-agri-green" />
                info@agritourismadventures.com
              </div>
              <div className="flex items-center text-gray-300 font-inter">
                <Phone className="h-4 w-4 mr-2 text-agri-green" />
                +254 xxx xxx xxx
              </div>
            </div>
            <div className="mt-6">
              <h5 className="font-poppins font-semibold mb-2">Legal Documents</h5>
              <ul className="space-y-1 text-sm text-gray-400 font-inter">
                <li><a href="#" className="hover:text-agri-yellow transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-agri-yellow transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-agri-yellow transition-colors">Image Consent Form</a></li>
                <li><a href="#" className="hover:text-agri-yellow transition-colors">Data Withdrawal Form</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 font-inter text-sm">
            © 2024 Agritourism Adventures. All rights reserved.
          </p>
          <p className="text-gray-400 font-inter text-sm mt-4 md:mt-0">
            Where Travel Meets Sustainability
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
