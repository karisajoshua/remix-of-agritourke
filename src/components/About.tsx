import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Users, Leaf, ArrowRight, User, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Testimonial images
import leylaImage from '@/assets/testimonials/leyla-feisal.jpeg';
import naomiImage from '@/assets/testimonials/naomi-nelima.jpeg';
import floisImage from '@/assets/testimonials/flois-kevogo.jpeg';
import kelvinImage from '@/assets/testimonials/kelvin-ambetsa.jpeg';

const testimonials = [
  {
    name: "Leyla Feisal",
    role: "Tourist",
    image: leylaImage,
    rating: 5,
    quote: "The flower farm trip in Naivasha was beautiful & eye-opening. The organized farm, informed guides and Naivasha's scenery made the trip worthwhile. I want another one!"
  },
  {
    name: "Naomi Nelima",
    role: "Digital Marketer",
    image: naomiImage,
    rating: 5,
    quote: "If your 2026 travel vision board doesn't include the Matatu Tour by Agritourism Adventures, it's time for an update. While I previously avoided matatus, this experience completely redefined the journey through a lens of cleanliness, impeccable organization and vibrant Kenyan pride."
  },
  {
    name: "Flois Kevogo",
    role: "Childhood Educator",
    image: floisImage,
    rating: 4.5,
    quote: "We loved our Bonding Safari experience! The trip was just right for couples, and everything went smoothly from beginning to end. The food was tasty, and the activities kept us entertained. The tour guides made the whole trip even better with their positive energy. We're already looking forward to the next adventure!"
  },
  {
    name: "Kelvin Ambetsa",
    role: "Strategy Expert",
    image: kelvinImage,
    rating: 5,
    quote: "I wanted to learn about goat farming from real experts, and Agritourism Adventures arranged a visit for me. The whole experience was packaged well; educative, organized and fun! I learned about different goat breeds, their business and animal care. AA promised me ongoing help with networking among goat farmers, and they kept it. Makofi kwenyu!"
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-agri-yellow text-agri-yellow" />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star className="h-4 w-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="h-4 w-4 fill-agri-yellow text-agri-yellow" />
          </div>
        </div>
      )}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      ))}
      <span className="ml-1 text-sm font-medium text-gray-600">{rating}</span>
    </div>
  );
};
const About = () => {
  const navigate = useNavigate();
  return <div className="bg-white py-24">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
              Our Story
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed">
              Founded on the belief that authentic experiences create lasting memories, 
              we bridge the gap between curious <Link to="/tours" className="text-agri-green hover:text-agri-green/80 underline">travelers</Link> and Kenya's vibrant farming communities.
            </p>
          </div>

          {/* Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg p-8 shadow-lg text-center group hover:shadow-xl transition-shadow duration-300">
              <Heart className="h-12 w-12 text-agri-green mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-poppins font-bold text-agri-dark mb-4">
                Authentic Connections
              </h3>
              <p className="text-gray-600 font-inter leading-relaxed">
                We facilitate genuine interactions between travelers and local <Link to="/gallery" className="text-agri-green hover:text-agri-green/80 underline">farming families</Link>, 
                creating meaningful cultural exchanges that benefit everyone involved.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg text-center group hover:shadow-xl transition-shadow duration-300">
              <Users className="h-12 w-12 text-agri-green mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-poppins font-bold text-agri-dark mb-4">
                Community Empowerment
              </h3>
              <p className="text-gray-600 font-inter leading-relaxed">
                Every tour directly supports local communities through fair compensation, 
                skill development, and <Link to="/services" className="text-agri-green hover:text-agri-green/80 underline">sustainable tourism practices</Link> that preserve cultural heritage.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg text-center group hover:shadow-xl transition-shadow duration-300">
              <Leaf className="h-12 w-12 text-agri-green mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-poppins font-bold text-agri-dark mb-4">
                Sustainable Impact
              </h3>
              <p className="text-gray-600 font-inter leading-relaxed">
                We promote environmentally responsible tourism that supports regenerative 
                agriculture and helps preserve Kenya's natural landscapes for future generations.
              </p>
            </div>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h3 className="text-3xl md:text-4xl font-poppins font-bold text-agri-dark mb-6">
                From Curiosity to Community
              </h3>
              <div className="space-y-6 text-gray-600 font-inter leading-relaxed">
                <p>
                  Our journey began with a simple question: How can tourism truly benefit 
                  the communities we visit? This curiosity led us deep into Kenya's rural 
                  heartland, where we discovered the incredible stories of resilience, 
                  innovation, and tradition that define our agricultural communities.
                </p>
                <p>
                  What started as exploration became a mission. We realized that travelers 
                  were seeking authentic experiences, while farming communities had rich 
                  stories to share and could benefit from sustainable tourism income. 
                  The connection was natural, but it needed the right approach.
                </p>
                <p>
                  Today, we work with over 50 farming families across Kenya, each offering 
                  unique insights into sustainable agriculture, traditional practices, and 
                  modern innovations. Our network spans from coffee farms in the highlands 
                  to goat farming communities in arid regions.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img src="https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/More%20Tea.webp" alt="Community farming activities" className="rounded-lg shadow-2xl w-full h-96 object-cover" />
              <div className="absolute inset-0 bg-agri-green/10 rounded-lg"></div>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-poppins font-bold text-agri-dark mb-12">
              Our Core Values
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-agri-green/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h4 className="text-xl font-poppins font-bold text-agri-dark mb-2">Respect</h4>
                <p className="text-gray-600 font-inter text-sm">
                  Honoring local customs, traditions, and knowledge systems
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-agri-green/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h4 className="text-xl font-poppins font-bold text-agri-dark mb-2">Sustainability</h4>
                <p className="text-gray-600 font-inter text-sm">
                  Promoting practices that benefit people and planet
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-agri-green/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h4 className="text-xl font-poppins font-bold text-agri-dark mb-2">Innovation</h4>
                <p className="text-gray-600 font-inter text-sm">
                  Embracing new ideas while preserving valuable traditions
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-agri-green/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="text-xl font-poppins font-bold text-agri-dark mb-2">Impact</h4>
                <p className="text-gray-600 font-inter text-sm">
                  Creating measurable positive change in communities
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white rounded-lg p-8 md:p-12 shadow-lg">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-poppins font-bold text-agri-dark mb-6">
                Meet Our Team
              </h3>
              <p className="text-xl text-gray-600 font-inter max-w-3xl mx-auto leading-relaxed">
                Our diverse team combines local expertise with global perspectives, 
                ensuring every experience is both authentic and accessible.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-agri-green/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <User className="h-16 w-16 text-agri-green" />
                </div>
                <h4 className="text-xl font-poppins font-bold text-agri-dark mb-2">Local Coordinators</h4>
                <p className="text-gray-600 font-inter">
                  Community members who facilitate authentic cultural exchanges 
                  and ensure respectful interactions.
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-agri-green/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <User className="h-16 w-16 text-agri-green" />
                </div>
                <h4 className="text-xl font-poppins font-bold text-agri-dark mb-2">Agricultural Experts</h4>
                <p className="text-gray-600 font-inter">
                  Experienced farmers and agricultural specialists who share 
                  knowledge about sustainable farming practices.
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-agri-green/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <User className="h-16 w-16 text-agri-green" />
                </div>
                <h4 className="text-xl font-poppins font-bold text-agri-dark mb-2">Tourism Professionals</h4>
                <p className="text-gray-600 font-inter">
                  Experienced guides and coordinators who ensure safe, 
                  comfortable, and enriching travel experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed">
              Real stories from adventurers who've experienced the magic of agritourism with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-agri-grey rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
              >
                <Quote className="absolute top-6 right-6 h-10 w-10 text-agri-green/20" />
                <div className="flex items-start gap-4 mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-agri-green"
                  />
                  <div>
                    <h4 className="text-xl font-poppins font-bold text-agri-dark">
                      {testimonial.name}
                    </h4>
                    <p className="text-agri-green font-inter font-medium">
                      {testimonial.role}
                    </p>
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
                <p className="text-gray-600 font-inter leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-agri-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed">
              Together with our community partners, we're creating positive change 
              that extends far beyond individual travel experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="text-4xl font-poppins font-bold text-agri-green mb-2">50+</div>
              <div className="text-gray-600 font-inter font-semibold mb-2">Partner Farms</div>
              <div className="text-sm text-gray-500 font-inter">
                Active farming families in our network
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="text-4xl font-poppins font-bold text-agri-green mb-2">2,000+</div>
              <div className="text-gray-600 font-inter font-semibold mb-2">Visitors Hosted</div>
              <div className="text-sm text-gray-500 font-inter">
                Meaningful cultural exchanges facilitated
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="text-4xl font-poppins font-bold text-agri-green mb-2">Ksh 2M+</div>
              <div className="text-gray-600 font-inter font-semibold mb-2">Direct Income</div>
              <div className="text-sm text-gray-500 font-inter">
                Generated for farming communities
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg text-center">
              <div className="text-4xl font-poppins font-bold text-agri-green mb-2">7</div>
              <div className="text-gray-600 font-inter font-semibold mb-2">Years Experience</div>
              <div className="text-sm text-gray-500 font-inter">
                Building sustainable tourism partnerships
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
            Ready to Join Our Mission?
          </h2>
          <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed mb-8">
            Whether you're a traveler seeking authentic experiences or a farming 
            community interested in sustainable tourism, we'd love to connect with you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/tours')} className="bg-agri-green hover:bg-agri-green/90 text-white font-inter font-semibold px-8">
              Explore Our Tours
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button size="lg" variant="outline" asChild className="border-agri-green text-agri-green hover:bg-agri-green hover:text-white font-inter font-semibold px-8">
              <a href="mailto:info@agritourismadventures.com" target="_blank" rel="noopener noreferrer" aria-label="Partner with us via email">
                Partner With Us
                <Users className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default About;