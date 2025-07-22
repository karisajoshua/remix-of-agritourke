
import Navigation from '@/components/Navigation';
import HeroCarousel from '@/components/HeroCarousel';
import About from '@/components/About';
import Tours from '@/components/Tours';
import Services from '@/components/Services';
import Partners from '@/components/Partners';
import Impact from '@/components/Impact';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroCarousel />
      <About />
      <Tours />
      <Services />
      <Partners />
      <Impact />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
