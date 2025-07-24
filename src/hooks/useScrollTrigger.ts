
import { useState, useEffect } from 'react';

export const useScrollTrigger = (threshold: number = 200) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    // Check if popup has already been shown in this session
    const popupShown = localStorage.getItem('emailPopupShown');
    if (popupShown) {
      setHasBeenShown(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > threshold && !hasBeenShown) {
        setIsTriggered(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, hasBeenShown]);

  const markAsShown = () => {
    setHasBeenShown(true);
    localStorage.setItem('emailPopupShown', 'true');
  };

  return { isTriggered, hasBeenShown, markAsShown };
};
