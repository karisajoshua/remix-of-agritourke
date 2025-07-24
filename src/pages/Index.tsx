
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import HeroCarousel from '@/components/HeroCarousel';
import AboutHome from '@/components/AboutHome';
import FeaturedToursHome from '@/components/FeaturedToursHome';
import Partners from '@/components/Partners';
import Impact from '@/components/Impact';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import EmailPopup from '@/components/EmailPopup';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';

const Index = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { isTriggered, hasBeenShown, markAsShown } = useScrollTrigger(200);

  // Show popup when scroll is triggered and it hasn't been shown yet
  React.useEffect(() => {
    if (isTriggered && !hasBeenShown && !isPopupOpen) {
      setIsPopupOpen(true);
    }
  }, [isTriggered, hasBeenShown, isPopupOpen]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    markAsShown();
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroCarousel />
      <AboutHome />
      <FeaturedToursHome />
      <Partners />
      <Impact />
      <Contact />
      <Footer />
      
      <EmailPopup 
        isOpen={isPopupOpen} 
        onClose={handleClosePopup} 
      />
    </div>
  );
};

export default Index;
