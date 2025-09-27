
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Tours', href: '/tours' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Impact', href: '/#impact' },
    { name: 'Contact', href: '/#contact' }
  ];

  const handleNavClick = (href: string, name: string) => {
    if (href.startsWith('/#')) {
      // If we're not on the home page, navigate to home first
      if (location.pathname !== '/') {
        navigate('/');
        // Small delay to ensure page loads before scrolling
        setTimeout(() => {
          const targetId = href.substring(2); // Remove '/#'
          const element = document.getElementById(targetId);
          if (element) {
            const headerOffset = 80; // Account for fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      } else {
        // Already on home page, just scroll to section
        const targetId = href.substring(2);
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    } else {
      // Regular navigation
      navigate(href);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/logo/AA%20transparent%20Logo.png"
                alt="Agritourism Adventures"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.name)}
                  className="text-agri-dark hover:text-agri-green px-3 py-2 text-sm font-inter font-medium transition-colors duration-200 cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button 
              asChild
              className="bg-agri-teal hover:bg-agri-teal/90 text-white font-inter font-medium"
            >
              <a 
                href="https://wa.me/254710429755" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Book a tour via WhatsApp"
              >
                Book a Tour
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-agri-dark hover:text-agri-green focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.name)}
                  className="text-agri-dark hover:text-agri-green block px-3 py-2 text-base font-medium w-full text-left"
                >
                  {item.name}
                </button>
              ))}
              <div className="px-3 py-2">
                <Button 
                  asChild
                  className="w-full bg-agri-teal hover:bg-agri-teal/90 text-white font-inter font-medium"
                >
                  <a 
                    href="https://wa.me/254710429755" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Book a tour via WhatsApp"
                  >
                    Book a Tour
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
