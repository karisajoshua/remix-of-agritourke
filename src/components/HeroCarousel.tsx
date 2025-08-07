import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContentProtection } from '@/hooks/useContentProtection';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Enable content protection
  useContentProtection();

  const slides = [
    {
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Trade%20expo%202013/Corridor.webp",
      title: "Where Travel Meets",
      subtitle: "Sustainability",
      slogan: "Wander with a plan.",
      description: "Explore Kenya's farms, cultures, and countryside through immersive, eco-conscious adventures that support local communities."
    },
    {
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6888.webp",
      title: "Agricultural",
      subtitle: "Innovation",
      slogan: "A fusion of farms and forward thinking.",
      description: "Discover cutting-edge farming techniques and sustainable practices that are shaping Kenya's agricultural future."
    },
    {
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/GR13%20summit%202013/Agri%20&%20Aqua%20Discussions.webp",
      title: "Community",
      subtitle: "Connection",
      slogan: "Where heritage meets the harvest.",
      description: "Build meaningful relationships with local farmers and experience authentic Kenyan agricultural heritage."
    },
    {
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Bean%20hands.webp",
      title: "Educational",
      subtitle: "Adventures",
      slogan: "Travel - One of life's greatest teachers.",
      description: "Learn through hands-on experiences that combine tourism with agricultural education and cultural immersion."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Protected Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 image-protected ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
            style={{ pointerEvents: 'none' }}
          />
          {/* Invisible protection overlay */}
          <div className="absolute inset-0 bg-transparent z-10" />
          <div className="absolute inset-0 bg-black/40 z-20"></div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-colors duration-200"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-colors duration-200"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-white mb-4 leading-tight">
            {slides[currentSlide].title}
            <span className="text-agri-yellow block">{slides[currentSlide].subtitle}</span>
          </h1>
          
          {/* Catchy Slogan */}
          <p className="text-2xl md:text-3xl font-inter italic text-agri-yellow/90 mb-6 font-light">
            {slides[currentSlide].slogan}
          </p>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-inter max-w-3xl mx-auto leading-relaxed">
            {slides[currentSlide].description}
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
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-agri-dark font-inter font-semibold px-8 py-4 text-lg group backdrop-blur-sm"
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

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentSlide ? 'bg-agri-yellow' : 'bg-white/50'
            }`}
          />
        ))}
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

export default HeroCarousel;
