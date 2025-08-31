
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

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
              <a 
                href="https://www.facebook.com/Farmtourfam/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-agri-green/20 rounded-full flex items-center justify-center hover:bg-agri-green/30 transition-colors cursor-pointer"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/agritourismadventures?utm_source=qr&igsh=MzNlNGNkZWQ4Mg==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-agri-green/20 rounded-full flex items-center justify-center hover:bg-agri-green/30 transition-colors cursor-pointer"
                aria-label="Visit our Instagram page"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/101539076/admin/dashboard/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-agri-green/20 rounded-full flex items-center justify-center hover:bg-agri-green/30 transition-colors cursor-pointer"
                aria-label="Visit our LinkedIn page"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tours */}
          <div>
            <h4 className="text-lg font-poppins font-semibold mb-4">Tours</h4>
            <ul className="space-y-2 text-gray-300 font-inter">
              <li><Link to="/tours?category=Farm%20Tours" className="hover:text-agri-yellow transition-colors">Farm Tours</Link></li>
              <li><Link to="/tours?category=Safari%20%26%20Wildlife" className="hover:text-agri-yellow transition-colors">Safari & Wildlife</Link></li>
              <li><Link to="/tours?category=Cultural%20%26%20Urban" className="hover:text-agri-yellow transition-colors">Cultural Tours</Link></li>
              <li><Link to="/tours?category=Regional%20Experiences" className="hover:text-agri-yellow transition-colors">Regional Experiences</Link></li>
              <li><Link to="/tours?category=Educational%20Tours" className="hover:text-agri-yellow transition-colors">Educational Tours</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-poppins font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300 font-inter">
              <li><Link to="/about" className="hover:text-agri-yellow transition-colors">About Us</Link></li>
              <li><Link to="/gallery" className="hover:text-agri-yellow transition-colors">Gallery</Link></li>
              <li><a href="#impact" className="hover:text-agri-yellow transition-colors">Our Impact</a></li>
              <li><Link to="/blog" className="hover:text-agri-yellow transition-colors">Blog</Link></li>
              <li><a href="#careers" className="hover:text-agri-yellow transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-poppins font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a 
                href="mailto:info@agritourismadventures.com"
                className="flex items-center text-gray-300 font-inter hover:text-agri-yellow transition-colors"
                aria-label="Send us an email"
              >
                <Mail className="h-4 w-4 mr-2 text-agri-green" />
                info@agritourismadventures.com
              </a>
              <a 
                href="tel:+254710429755"
                className="flex items-center text-gray-300 font-inter hover:text-agri-yellow transition-colors"
                aria-label="Call us"
              >
                <Phone className="h-4 w-4 mr-2 text-agri-green" />
                +254710429755
              </a>
            </div>
            <div className="mt-6">
              <h5 className="font-poppins font-semibold mb-2">Legal Documents</h5>
              <ul className="space-y-1 text-sm text-gray-400 font-inter">
                <li><a href="#" className="hover:text-agri-yellow transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-agri-yellow transition-colors">Terms of Service</a></li>
                <li>
                  <a 
                    href="https://ppmyiephtxszzlhijssl.supabase.co/storage/v1/object/public/agritourismadv//Consent%20For%20Use%20Of%20Images%20Form%20-%20AA.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-agri-yellow transition-colors"
                  >
                    Image Consent Form
                  </a>
                </li>
                <li>
                  <a 
                    href="https://ppmyiephtxszzlhijssl.supabase.co/storage/v1/object/public/agritourismadv//Data%20Subject%20Consent%20Withdrawal%20Form.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-agri-yellow transition-colors"
                  >
                    Data Withdrawal Form
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <p className="text-gray-400 font-inter text-sm">© 2025 Agritourism Adventures. All rights reserved.</p>
            <p className="text-gray-400 font-inter text-sm mt-4 md:mt-0">
              Where Travel Meets Sustainability
            </p>
          </div>
          <div className="text-center border-t border-gray-700 pt-4">
            <p className="text-gray-500 font-inter text-xs">
              Powered by Texcortech Systems
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
