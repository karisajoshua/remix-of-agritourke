
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TourDetailModal from '@/components/TourDetailModal';

const Tours = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTour, setSelectedTour] = useState(null);

  const filters = ['All', 'Farm Tours', 'Safari & Wildlife', 'Cultural & Urban', 'Regional Experiences', 'Educational Tours'];

  const tours = [
    {
      id: 1,
      title: "🌹 Flower Farm Tour in Naivasha",
      duration: "1 day",
      location: "Naivasha",
      participants: "4-150 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/The%20Crew.webp",
      description: "Ever wondered where the stunning roses that grace European castles, luxury events, and world-class floral boutiques come from? Welcome to our Flower Farm Tour in Naivasha—a journey into the heart of Kenya's blossoming floriculture industry.",
      category: "Farm Tours",
      featured: false,
      fullDescription: "Kenya is one of the world's leading exporters of cut flowers, with roses making up over 80% of the floral export market. Through this immersive tour, you'll explore where it all begins—on lush farms nestled between Lake Naivasha and Lake Nakuru, in one of Kenya's richest agricultural zones. You'll visit some of the most reputable flower farms in the region, where premium roses are cultivated for export to top-tier markets and global florists source the blooms used in iconic arrangements.",
      itinerary: [
        "Farm arrival and orientation session",
        "Visit premium rose cultivation greenhouses",
        "Learn about export market processes",
        "Explore regenerative farming practices",
        "Organic vegetable farming techniques",
        "Farm-grown tastings and honey sampling"
      ],
      includes: ["Transportation", "Farm visits", "Guided tours", "Organic tastings", "Expert guidance"]
    },
    {
      id: 2,
      title: "🍵 Rural Farm Safari - Tea & Cheese",
      duration: "1 day",
      location: "Limuru Highlands",
      participants: "4-160 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Tea%20farmers.webp",
      description: "Experience Sereni-Tea. Escape the bustle of the city and dive into a full-day 2-in-1 farm experience—a tea and cheese safari that will leave your senses delighted and your soul refreshed.",
      category: "Farm Tours",
      featured: false,
      fullDescription: "Begin the journey at 9:00 AM, departing Nairobi and heading into the cool, green highlands. After a scenic 2-hour drive, arrive at the tea farm for a light breakfast. Over fresh farm-grown tea, our friendly hosts will share the fascinating history of the estate and what makes Kenyan tea so globally loved.",
      itinerary: [
        "9:00 AM: Departure from Nairobi",
        "Tea farm tour and breakfast",
        "Walk through tea bushes and leaf picking",
        "3-course farm-fresh buffet lunch",
        "Indigenous forest guided walk",
        "2:30 PM: Cheese farm experience",
        "Factory tour and cheese tasting",
        "Cow milking and vegetable gardens",
        "Farm-fresh ice cream and pizza",
        "5:30 PM: Return to Nairobi"
      ],
      includes: ["Transportation", "Tea farm tour", "Cheese factory visit", "All meals", "Guided walks", "Tastings"]
    },
    {
      id: 3,
      title: "🐘 9-Day Mixed Farming Safari",
      duration: "9 days",
      location: "Central Kenya",
      participants: "4-70 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Intro-2.webp",
      description: "Embrace the Calm Within. A comprehensive journey through Kenya's diverse agricultural landscape, from Mount Kenya to Thompson Falls.",
      category: "Safari & Wildlife",
      featured: true,
      fullDescription: "A 9-day comprehensive agricultural safari that takes you through Kenya's most fertile regions. Experience diverse farming systems from flower and wheat farms near Mount Kenya to dairy farms in Nyahururu, combined with wildlife viewing at Sweetwaters Game Reserve and Solio Ranch.",
      itinerary: [
        "Day 1: Nairobi to Nanyuki - Cross the Equator, Mount Kenya views",
        "Day 2: Flower & wheat farms, Sweetwaters Game Reserve",
        "Day 3: Nyahururu - Dairy tour & Thompson Falls",
        "Day 4: Maize farming & cattle milking experience", 
        "Day 5: Nyeri - Wildlife at Solio Ranch",
        "Day 6: Coffee farm tour & Baden Powell Memorial",
        "Day 7: Tea farm harvesting experience",
        "Day 8: Orphanage & community visit",
        "Day 9: Return to Nairobi via plantations"
      ],
      includes: ["All accommodation", "All meals", "Transportation", "Farm visits", "Game drives", "Professional guide", "Community visits"]
    },
    {
      id: 4,
      title: "🥛 Organic Farm Visit",
      duration: "1 day",
      location: "Central Kenya Highlands",
      participants: "3-90 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6935.webp",
      description: "A Farm Like No Udder. Get ready for a day that blends nature, nourishment, and nostalgia. An organic farm visit is more than just a countryside escape—it's a hands-on experience that opens your heart to sustainable living and rural beauty.",
      category: "Farm Tours",
      featured: false,
      fullDescription: "Whether you're seeking quiet reflection or family fun, this visit offers something for everyone. Meet our friendly team and fellow explorers at Nairobi's CBD, then hop into our ride as we begin the scenic 1-hour drive to Limuru village.",
      itinerary: [
        "9:00 AM: Departure from Nairobi CBD",
        "10:00 AM: Farm arrival with refreshing drinks",
        "Educational farm tour - seedlings, composting, intercropping",
        "Pick your own vegetables",
        "Farm-to-fork lunch preparation",
        "Hands-on animal interaction - cows, goats, poultry",
        "Cow milking and egg collection",
        "Art gallery and birdwatching",
        "Late afternoon: Return to Nairobi"
      ],
      includes: ["Transportation", "Farm tour", "Lunch preparation", "Animal interaction", "Art gallery visit", "Fresh produce options"]
    },
    {
      id: 5,
      title: "☕ Coffee & Dairy Tour",
      duration: "1 day",
      location: "Central Kenya Highlands",
      participants: "2-150 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/coffee%20and%20dairy%20tour.webp",
      description: "Make Every Sip an Adventure. Ready for your next farm vacation? Let's dive into nature, heritage, and a cup of fresh, farm-grown coffee. This unique coffee and dairy farm tour offers the perfect blend of relaxation, learning, and adventure.",
      category: "Farm Tours",
      featured: true,
      fullDescription: "We'll pick you up from your hotel in Nairobi at 8:00 AM. Just 8 kilometers away lies a 54-acre paradise—lush with coffee plants, rich in history, and surrounded by serene natural beauty. Our destination? Paradise Lost—a beautifully managed estate that offers more than just a farm tour.",
      itinerary: [
        "8:00 AM: Hotel pickup in Nairobi",
        "Paradise Lost estate arrival",
        "Nature walks and birdwatching",
        "Horse and camel riding",
        "Maasai ostrich feeding",
        "Coffee berry picking experience",
        "Processing and production line tour",
        "Brand your own coffee with Kenyan label",
        "Dairy farm experience - milking session",
        "Return to Nairobi with fresh coffee"
      ],
      includes: ["Hotel pickup", "Estate activities", "Coffee processing experience", "Dairy farm visit", "Take-home coffee", "All activities"]
    },
    {
      id: 6,
      title: "🚌 Matatu Tourism",
      duration: "1 day",
      location: "Nairobi",
      participants: "5-30 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Matatu/matatu%20tourims.jpg",
      description: "Ride Through the Urban Jungle in Style. Matatu tourism is one of the most vibrant and unexpected highlights of urban Kenya. These graffiti-covered, music-blasting minibuses are a cultural experience like no other.",
      category: "Cultural & Urban",
      featured: false,
      fullDescription: "Also known as 'ma3' or 'nganya' in local slang, matatus have evolved from simple public transport to iconic, moving works of art since their inception in the 1960s. They are more than just a ride—they're a party on wheels, a voice of youth culture, and an economic engine.",
      itinerary: [
        "Downtown Nairobi meeting point",
        "Ride in fully customized 'nganya'",
        "Experience beats, lights, and local conversations",
        "Try fare collection with conductor",
        "Visit matatu hubs and customization shops",
        "Meet artists and sound engineers",
        "Urban farming stops via matatu transport",
        "Cultural interactions with daily commuters"
      ],
      includes: ["Matatu transport experience", "Cultural guide", "Artist interactions", "Urban stops", "Local insights"]
    },
    {
      id: 7,
      title: "🍍 Nanasi (Pineapple) Tour",
      duration: "Half day",
      location: "Gatundu North, Kiambu",
      participants: "6-20 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Pineaples/Nanasi%20Splash.png",
      description: "Life Is Sweet, Just Like Pineapples. If you've never tasted a pineapple straight from the field—warm from the sun, sliced fresh with a machete, juice trickling down your chin—this is your moment.",
      category: "Regional Experiences",
      featured: false,
      fullDescription: "Welcome to the Nanasi Tour, a refreshing agritourism experience in Kiambu County, where every bite tells a story and every visit feels like a hidden treasure waiting to be discovered. Set in the heart of Gatundu North, this tour is more than just a snack stop—it's an immersion into the vibrant agricultural lifestyle of Kiambu.",
      itinerary: [
        "Arrival at Gatundu North pineapple farms",
        "Walk among rows of lush pineapple plants",
        "Learn growing and harvesting techniques",
        "Fresh field pineapple tasting",
        "Vegetable gardens exploration",
        "Historic Mau Mau caves visit",
        "Tea plantation and factory tour",
        "God's Well spiritual site visit"
      ],
      includes: ["Farm visits", "Historical sites", "Tea factory tour", "Fresh tastings", "Cultural insights"]
    },
    {
      id: 8,
      title: "🏔️ Ngong Adrenaline Rush",
      duration: "1 day",
      location: "Ngong Hills",
      participants: "4-80 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/Ngong%20adrenaline.webp",
      description: "We Turn Moments Into Memories. Nestled in the breathtaking Rift Valley, Ngong Hills are among Kenya's most exhilarating adventure destinations. The cool, high-altitude breeze, rolling green hills, and sweeping views make this a fairytale escape.",
      category: "Regional Experiences",
      featured: true,
      fullDescription: "Meet at International House parking lot (CBD) at 8:00 AM, and after a quick meet-and-greet, we'll hit the road by 8:30 AM. Our journey takes us past Maasai villages and through scenic terrain, with a short stop for teambuilding exercises to shake off the chill of the highlands.",
      itinerary: [
        "8:00 AM: Meet at International House CBD",
        "8:30 AM: Departure past Maasai villages",
        "10:30 AM: Kompass Hotel arrival",
        "Ziplining across hilltops",
        "Archery challenges",
        "Mountain hiking and photography",
        "Teambuilding and group games",
        "Nature walk through untouched landscape",
        "2:30 PM: Nyama Choma lunch at Riverside Restaurant",
        "4:30 PM: Return to Nairobi"
      ],
      includes: ["Transportation", "Adventure activities", "Teambuilding", "Nyama Choma lunch", "Mountain access"]
    },
    {
      id: 9,
      title: "🐐 Goat Farm Tour",
      duration: "1 day",
      location: "Central Kenya Highlands",
      participants: "3-90 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6923.webp",
      description: "Nature's Baaa-utiful Business. Ready to embark on a unique and enriching farm adventure? Welcome to our Goat Farm Tour — where learning, laughter, and sustainability come together in the heart of Kenya's countryside.",
      category: "Farm Tours",
      featured: false,
      fullDescription: "Our journey begins at 7:00 AM in Nairobi's CBD. It's a scenic 2-hour drive filled with music, photo stops, and stretch breaks. We arrive at the farm around 9:30 AM, just in time to enjoy a warm welcome from the host, a cup of tea, and some light farm snacks.",
      itinerary: [
        "7:00 AM: Nairobi CBD departure",
        "9:30 AM: Farm arrival with tea and snacks",
        "3-hour interactive goat farming session",
        "Learn breeds, behaviors, and sustainability",
        "Hands-on goat feeding experience",
        "Multi-storey garden exploration",
        "Dairy production room tour",
        "Traditional home-cooked lunch",
        "Biogas and fertilizer demonstrations",
        "Return to Nairobi with farm stories"
      ],
      includes: ["Transportation", "Farm education", "Goat interaction", "Garden tour", "Dairy experience", "Traditional lunch"]
    },
    {
      id: 10,
      title: "🐦 Maasai Ostrich Farm Tour",
      duration: "1 day",
      location: "Kajiado County",
      participants: "6-15 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Farm%20expo%202023/Peek-a-boo.webp",
      description: "Satisfy Your Natural Curiosity in a Furry Adventure. Welcome to the Maasai Ostrich Farm Tour! Get ready for an unforgettable day filled with nature, laughter, and a dash of adrenaline.",
      category: "Farm Tours",
      featured: false,
      fullDescription: "Meet our friendly team and fellow explorers in Nairobi city center. Together, we'll head to beautiful Kajiado County, home of the famous Maasai Ostrich Farm. Upon arrival, we'll start with a guided walk through the vegetable gardens.",
      itinerary: [
        "8:00 AM: Departure from Nairobi CBD",
        "10:00 AM: Arrival & vegetable garden tour",
        "Ostrich encounter - eggs, chicks, adults",
        "Ostrich rides for the brave",
        "Picnic & pool time",
        "Photo sessions with ostriches",
        "3:00 PM: Lunch at Club 034",
        "Return journey to Nairobi"
      ],
      includes: ["Transportation", "Farm tour", "Ostrich experience", "Pool access", "Lunch at Club 034"]
    },
    {
      id: 11,
      title: "🐷 Pig Farm Tour",
      duration: "2 days",
      location: "Countryside",
      participants: "8-20 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Pigs/Pigs%20on%20a%20farm.png",
      description: "Bacon Begins Here. Pig farming isn't just a profitable venture—it's a fascinating adventure into the world of animals, especially when experienced firsthand in the serene countryside.",
      category: "Farm Tours",
      featured: false,
      fullDescription: "Far from the noise of the city, this one-day, one-night tour will leave you informed, inspired, and fully entertained. Meet your fellow travelers in the city center and begin your scenic 1.5-hour drive to the farm.",
      itinerary: [
        "Day 1: 8:00 AM Departure from Nairobi CBD",
        "10:00 AM: Farm arrival with traditional breakfast",
        "Farm orientation and pig farming experience",
        "Tea plantation activity",
        "Organic farm lunch and nature walk",
        "Cave exploration",
        "Bonfire and traditional storytelling",
        "Overnight camping under stars",
        "Day 2: Morning activities - zip-lining, swimming, hiking",
        "Return to Nairobi refreshed"
      ],
      includes: ["Transportation", "Traditional meals", "Camping accommodation", "Farm activities", "Storytelling", "Adventure activities"]
    },
    {
      id: 12,
      title: "🎓 Educational STEM Tours",
      duration: "1-3 days",
      location: "Various Locations",
      participants: "15-50 students",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Farm%20Machinery.webp",
      description: "Travel Smart, Learn More. STEM—Science, Technology, Engineering, and Mathematics—is a powerful, hands-on educational approach that's transforming the way learners understand the world.",
      category: "Educational Tours",
      featured: true,
      fullDescription: "Since its national rollout in Kenya in 2019, STEM has become a strategic pillar in achieving Vision 2030. At Agritourism Adventures, we align with this vision by offering educational tours that immerse learners in real-world knowledge across Kenya's thriving industries.",
      itinerary: [
        "Food production & agro-processing visits",
        "Car assembly & automation facilities",
        "Archaeological preservation sites",
        "Sound engineering demonstrations",
        "AI and software development hubs",
        "Machine learning applications",
        "Hands-on workshops with professionals",
        "Q&A sessions with industry experts"
      ],
      includes: ["Educational visits", "Professional interactions", "Hands-on workshops", "Transportation", "Learning materials"]
    },
    {
      id: 13,
      title: "💕 Bonding Safari",
      duration: "2-3 days",
      location: "Various Romantic Destinations",
      participants: "2-8 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Intro.webp",
      description: "It's a Date Worth the Escape. Bonding tourism is all about deepening emotional connections through immersive, shared experiences. Whether it's families reconnecting, couples rekindling romance, or friends creating unforgettable memories.",
      category: "Cultural & Urban",
      featured: false,
      fullDescription: "We design every bonding experience with value, comfort, and impact in mind—curating meaningful itineraries that nurture relationships and encourage repeat visits. From scenic safaris to heartfelt conversations, every moment becomes a memory.",
      itinerary: [
        "Friday evening: Romantic arrival and setup",
        "Safari or boat ride together",
        "Romantic dinners under the stars",
        "Camping experience in nature",
        "Team building and fun games",
        "Couples cooking sessions",
        "Expert marriage counseling sessions",
        "Sunday afternoon: Reflection and departure"
      ],
      includes: ["Accommodation", "Romantic activities", "Counseling sessions", "All meals", "Adventure activities"]
    }
  ];

  const filteredTours = activeFilter === 'All' 
    ? tours 
    : tours.filter(tour => tour.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-20 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-agri-dark mb-6">
              All Tours & Itineraries
            </h1>
            <p className="text-xl text-gray-600 font-inter max-w-4xl mx-auto leading-relaxed">
              From dairy farms to matatu rides, flower tours to adrenaline safaris—our trips 
              blend nature, culture, and learning into unforgettable journeys.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-agri-green text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Tours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour) => (
              <div
                key={tour.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  tour.featured ? 'ring-2 ring-agri-yellow' : ''
                }`}
              >
                {/* Tour Image */}
                <div className="relative">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-48 object-cover"
                  />
                  {tour.featured && (
                    <div className="absolute top-4 left-4 bg-agri-yellow text-agri-dark px-3 py-1 rounded-full text-sm font-inter font-semibold">
                      Featured
                    </div>
                  )}
                </div>

                {/* Tour Content */}
                <div className="p-6">
                  <h3 className="text-xl font-poppins font-bold text-agri-dark mb-3">
                    {tour.title}
                  </h3>
                  <p className="text-gray-600 font-inter mb-4 leading-relaxed">
                    {tour.description}
                  </p>

                  {/* Tour Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-500 font-inter">
                      <Clock className="h-4 w-4 mr-2 text-agri-green" />
                      {tour.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 font-inter">
                      <MapPin className="h-4 w-4 mr-2 text-agri-green" />
                      {tour.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 font-inter">
                      <Users className="h-4 w-4 mr-2 text-agri-green" />
                      {tour.participants}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    onClick={() => setSelectedTour(tour)}
                    className="w-full bg-agri-teal hover:bg-agri-teal/90 text-white font-inter font-semibold group"
                  >
                    Explore Tour
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Tour Detail Modal */}
      {selectedTour && (
        <TourDetailModal
          tour={selectedTour}
          isOpen={!!selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </div>
  );
};

export default Tours;
