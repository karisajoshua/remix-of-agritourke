
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Tours from '@/components/Tours';
import Services from '@/components/Services';
import Impact from '@/components/Impact';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Tours />
      <Services />
      <Impact />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
