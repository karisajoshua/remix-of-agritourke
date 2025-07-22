
import Navigation from '@/components/Navigation';
import HeroCarousel from '@/components/HeroCarousel';
import AboutHome from '@/components/AboutHome';
import FeaturedToursHome from '@/components/FeaturedToursHome';
import FeaturedServicesHome from '@/components/FeaturedServicesHome';
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
      <FeaturedServicesHome />
      <Partners />
      <Impact />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
