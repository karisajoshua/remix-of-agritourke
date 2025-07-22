
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1920&h=1080&fit=crop&crop=center"
          alt="Kenyan countryside with wildlife"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-white mb-6 leading-tight">
            Where Travel Meets
            <span className="text-agri-yellow block">Sustainability</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-inter max-w-3xl mx-auto leading-relaxed">
            Explore Kenya's farms, cultures, and countryside through immersive, 
            eco-conscious adventures that support local communities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-agri-green hover:bg-agri-green/90 text-white font-inter font-semibold px-8 py-4 text-lg group"
            >
              Explore Tours
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-agri-dark font-inter font-semibold px-8 py-4 text-lg group"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Story
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl md:text-4xl font-poppins font-bold text-agri-yellow">7+</div>
            <div className="text-lg font-inter">Years of Experience</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-3xl md:text-4xl font-poppins font-bold text-agri-yellow">500+</div>
            <div className="text-lg font-inter">Happy Travelers</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-3xl md:text-4xl font-poppins font-bold text-agri-yellow">50+</div>
            <div className="text-lg font-inter">Partner Farms</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
