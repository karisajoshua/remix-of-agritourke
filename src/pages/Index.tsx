
import Navigation from '@/components/Navigation';
import HeroCarousel from '@/components/HeroCarousel';
import AboutHome from '@/components/AboutHome';
import FeaturedToursHome from '@/components/FeaturedToursHome';
import Partners from '@/components/Partners';
import Impact from '@/components/Impact';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
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
    </div>
  );
};

export default Index;
