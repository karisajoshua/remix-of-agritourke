import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, ArrowRight, ExternalLink } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TourDetailModal from '@/components/TourDetailModal';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const Tours = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(searchParams.get('category') || 'All');
  const [selectedTour, setSelectedTour] = useState(null);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category && filters.includes(category)) {
      setActiveFilter(category);
    }
  }, [searchParams]);

  const filters = ['All', 'Farm Tours', 'Safari & Wildlife', 'Cultural & Urban', 'Regional Experiences', 'Educational Tours'];

  const tours = [
    {
      id: 1,
      title: "🌹 Flower Farm Tour in Naivasha",
      duration: "1 day",
      location: "Naivasha",
      participants: "4-150 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/The%20Crew.webp",
      description: "Ever wondered where the stunning roses that grace European castles, luxury events, and world-class floral boutiques come from? Welcome to our Flower Farm Tour in Naivasha—a journey into the heart of Kenya's blossoming floriculture industry. Learn more from the <a href='https://kenyaflowercouncil.org/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Kenya Flower Council</a>, the official industry authority, and discover export guidelines from the <a href='https://www.epc.go.ke/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Kenya Export Promotion Council</a>.",
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
      includes: ["Transportation", "Farm visits", "Guided tours", "Organic tastings", "Expert guidance"],
      externalLinks: [
        { title: "Kenya Flower Council - Official Industry Authority", url: "https://kenyaflowercouncil.org/" },
        { title: "Kenya Export Promotion Council - Flower Export Guidelines", url: "https://www.epc.go.ke/" },
        { title: "Lake Naivasha Growers Group - Sustainable Floriculture", url: "https://www.lngg.co.ke/" }
      ]
    },
    {
      id: 2,
      title: "🍵 Rural Farm Safari - Tea & Cheese",
      duration: "1 day",
      location: "Countryside",
      participants: "4-160 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Tea%20farmers.webp",
      description: "Experience Sereni-Tea. Escape the bustle of the city and dive into a full-day 2-in-1 farm experience—a tea and cheese safari that will leave your senses delighted and your soul refreshed. Discover more about Kenya's tea industry from the <a href='https://www.ktdateas.com/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Kenya Tea Development Agency</a> and learn about dairy regulations from the <a href='https://eprocedures.investkenya.go.ke/media/The%20Dairy%20Industry%20Act%20Cap%20336.pdf?_sm_au_=iVVTZw6qZN4wW125KKQTWK37LBJkG' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Kenya Investment Authority</a>.",
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
      includes: ["Transportation", "Tea farm tour", "Cheese factory visit", "All meals", "Guided walks", "Tastings"],
      externalLinks: [
        { title: "Kenya Tea Development Agency - Official Tea Authority", url: "https://www.ktdateas.com/" },
        { title: "Kenya Association of Manufacturers - Dairy Sector", url: "https://kam.co.ke/" },
        { title: "Kenya Investment Authority - Dairy Industry Act", url: "https://eprocedures.investkenya.go.ke/media/The%20Dairy%20Industry%20Act%20Cap%20336.pdf?_sm_au_=iVVTZw6qZN4wW125KKQTWK37LBJkG" }
      ]
    },
    {
      id: 3,
      title: "🐘 9-Day Mixed Farming Safari",
      duration: "9 days",
      location: "Central Kenya",
      participants: "4-70 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Intro-2.webp",
      description: "Embrace the Calm Within. A comprehensive journey through Kenya's diverse agricultural landscape, from Mount Kenya to Thompson Falls. Experience certified wildlife conservation with the <a href='https://www.kws.go.ke/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Kenya Wildlife Service</a> and explore tours certified by <a href='https://www.katokenya.org/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Kenya Association of Tour Operators</a>.",
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
      includes: ["All accommodation", "All meals", "Transportation", "Farm visits", "Game drives", "Professional guide", "Community visits"],
      externalLinks: [
        { title: "Kenya Wildlife Service - Official Wildlife Authority", url: "https://www.kws.go.ke/" },
        { title: "Kenya Association of Tour Operators - Certified Tours", url: "https://www.katokenya.org/" },
        { title: "UNESCO Kenya - Cultural Heritage Sites", url: "https://whc.unesco.org/en/statesparties/ke" }
      ]
    },
    {
      id: 4,
      title: "🥛 Organic Farm Visit",
      duration: "1 day",
      location: "Central Kenya Highlands",
      participants: "3-90 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6935.webp",
      description: "A Farm Like No Udder. Get ready for a day that blends nature, nourishment, and nostalgia. An organic farm visit is more than just a countryside escape—it's a hands-on experience that opens your heart to sustainable living and rural beauty. Learn about certified organic standards from the <a href='https://www.koan.co.ke/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Kenya Organic Agriculture Network</a> and explore sustainable practices with <a href='https://www.fao.org/kenya/en/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>FAO Kenya</a>.",
      category: "Farm Tours",
      featured: false,
      fullDescription: "Whether you're seeking quiet reflection or family fun, this visit offers something for everyone. Meet our friendly team and fellow explorers at Nairobi's CBD, then hop into our ride as we begin the scenic 1-hour drive to the village.",
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
      includes: ["Transportation", "Farm tour", "Lunch preparation", "Animal interaction", "Art gallery visit", "Fresh produce options"],
      externalLinks: [
        { title: "Kenya Organic Agriculture Network - Certified Organic Standards", url: "https://www.koan.co.ke/" },
        { title: "FAO Kenya - Sustainable Agriculture Practices", url: "https://www.fao.org/kenya/en/" },
        { title: "Kenya Agricultural Research Institute - Innovation Hub", url: "https://www.kalro.org/" }
      ]
    },
    {
      id: 5,
      title: "☕ Coffee & Dairy Tour",
      duration: "1 day",
      location: "Central Kenya Highlands",
      participants: "2-150 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/coffee%20and%20dairy%20tour.webp",
      description: "Make Every Sip an Adventure. Ready for your next farm vacation? Let's dive into nature, heritage, and a cup of fresh, farm-grown coffee. This unique coffee and dairy farm tour offers the perfect blend of relaxation, learning, and adventure. <a href='https://www.afa.go.ke/home-coffee-directorate/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>The Agriculture and Food Authority</a> invites you to discover all matters coffee: the rich story behind it, its regulations and what makes it so special.",
      category: "Farm Tours",
      featured: true,
      fullDescription: "We'll pick you up from your hotel in Nairobi at 8:00 AM. Just a short drive away, you'll find a hidden gem — a peaceful estate wrapped in vibrant coffee fields, steeped in rich history, and set against a backdrop of breathtaking scenery. This isn't just a farm visit — it’s an experience. With its thoughtful management and warm atmosphere, the estate invites you to explore, relax, and discover the stories behind every bean.",
      itinerary: [
        "8:00 AM: Hotel pickup in Nairobi",
        "Nature walks and birdwatching",
        "Horse and camel riding",
        "Maasai ostrich feeding",
        "Coffee berry picking experience",
        "Processing and production line tour",
        "Brand your own coffee with Kenyan label",
        "Dairy farm experience - milking session",
        "Return to Nairobi with fresh coffee"
      ],
      includes: ["Hotel pickup", "Estate activities", "Coffee processing experience", "Dairy farm visit", "Take-home coffee", "All activities"],
      externalLinks: [
        { title: "Agriculture and Food Authority - Coffee Directorate", url: "https://www.afa.go.ke/home-coffee-directorate/" },
        { title: "Kenya Coffee Producers & Traders Association", url: "https://www.kcpta.com/" },
        { title: "Specialty Coffee Association - Quality Standards", url: "https://sca.coffee/" }
      ]
    },
    {
      id: 6,
      title: "🚌 Matatu Tourism",
      duration: "1 day",
      location: "Nairobi",
      participants: "5-30 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Matatu/matatu%20tourims.jpg",
      description: "Ride Through the Urban Jungle in Style. Matatu tourism is one of the most vibrant and unexpected highlights of urban Kenya. These graffiti-covered, music-blasting minibuses are a cultural experience like no other. Explore Kenya's cultural heritage with <a href='https://www.magicalkenya.com/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Magical Kenya</a> and learn more from the <a href='https://museums.or.ke/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Kenya Museums Society</a>.",
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
      includes: ["Matatu transport experience", "Cultural guide", "Artist interactions", "Urban stops", "Local insights"],
      externalLinks: [
        { title: "Magical Kenya - Official Tourism Board", url: "https://www.magicalkenya.com/" },
        { title: "Kenya Museums Society - Cultural Heritage", url: "https://museums.or.ke/" },
        { title: "Nairobi City County - Urban Transport Guidelines", url: "https://nairobi.go.ke/" }
      ]
    },
    {
      id: 7,
      title: "🍍 Nanasi (Pineapple) Tour",
      duration: "Half day",
      location: "Central Kenya",
      participants: "4-50 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Pineaples/Nanasi%20Splash.png",
      description: "Life Is Sweet, Just Like Pineapples. If you've never tasted a pineapple straight from the field—warm from the sun, sliced fresh with a machete, juice trickling down your chin—this is your moment. Learn about fresh produce exports from <a href='https://www.fpeak.org/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Fresh Produce Exporters Association</a> and explore historical documentation at <a href='https://www.nationalarchives.go.ke/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Kenya National Archives</a>.",
      category: "Regional Experiences",
      featured: false,
      fullDescription: "Welcome to the Nanasi Tour, a refreshing agritourism experience in Central Kenya, where every bite tells a story and every visit feels like a hidden treasure waiting to be discovered. Set in the heart of Gatundu North, this tour is more than just a snack stop—it's an immersion into the vibrant agricultural lifestyle of Central Kenya.",
      itinerary: [
        "Arrival at Central Kenya pineapple farms",
        "Walk among rows of lush pineapple plants",
        "Learn growing and harvesting techniques",
        "Fresh field pineapple tasting",
        "Vegetable gardens exploration",
        "Historic Mau Mau caves visit",
        "Tea plantation and factory tour",
        "God's Well spiritual site visit"
      ],
      includes: ["Farm visits", "Historical sites", "Tea factory tour", "Fresh tastings", "Cultural insights"],
      externalLinks: [
        { title: "Fresh Produce Exporters Association of Kenya", url: "https://www.fpeak.org/" },
        { title: "Kenya National Archives - Historical Documentation", url: "https://www.nationalarchives.go.ke/" },
        { title: "Central Kenya Tourism Circuit - Regional Authority", url: "https://www.magicalkenya.com/places-to-visit/counties/central-region/" }
      ]
    },
    {
      id: 8,
      title: "🏔️ Ngong Adrenaline Rush",
      duration: "1 day",
      location: "Ngong Hills",
      participants: "4-80 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/Ngong%20adrenaline.webp",
      description: "We Turn Moments Into Memories. Nestled in the breathtaking Rift Valley, Ngong Hills are among Kenya's most exhilarating adventure destinations. The cool, high-altitude breeze, rolling green hills, and sweeping views make this a fairytale escape. Forest conservation is managed by the <a href='https://www.kenyaforestservice.org/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Kenya Forest Service</a> with tourism development supported by <a href='https://www.kajiado.go.ke/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Kajiado County Government</a>.",
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
      includes: ["Transportation", "Adventure activities", "Teambuilding", "Nyama Choma lunch", "Mountain access"],
      externalLinks: [
        { title: "Kenya Forest Service - Ngong Hills Conservation", url: "https://www.kenyaforestservice.org/" },
        { title: "Kajiado County Government - Tourism Development", url: "https://www.kajiado.go.ke/" },
        { title: "Adventure Travel Trade Association - Safety Standards", url: "https://www.adventuretravel.biz/" }
      ]
    },
    {
      id: 9,
      title: "🐐 Goat Farm Tour",
      duration: "1 day",
      location: "Central Kenya Highlands",
      participants: "3-90 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6923.webp",
      description: "Nature's Baaa-utiful Business. Ready to embark on a unique and enriching farm adventure? Welcome to our Goat Farm Tour — where learning, laughter, and sustainability come together in the heart of Kenya's countryside. Embark on an unforgettable journey to learn about goats from <a href='https://www.farmafrica.org/our-work/specific-expertise/goat-rearing/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Farm Africa</a>, supported by expert research at the <a href='https://kilimo.go.ke/wp-content/uploads/2024/08/CATALOGUE-BREEDS-PUBLISHED-VERSION.pdf' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Ministry of Agriculture and Livestock Development</a>.",
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
      includes: ["Transportation", "Farm education", "Goat interaction", "Garden tour", "Dairy experience", "Traditional lunch"],
      externalLinks: [
        { title: "Farm Africa - Goat Rearing Expertise", url: "https://www.farmafrica.org/our-work/specific-expertise/goat-rearing/" },
        { title: "Ministry of Agriculture and Livestock Development - Breeds Catalogue", url: "https://kilimo.go.ke/wp-content/uploads/2024/08/CATALOGUE-BREEDS-PUBLISHED-VERSION.pdf" },
        { title: "Kenya Agricultural Research Institute - Livestock Division", url: "https://www.kalro.org/" }
      ]
    },
    {
      id: 10,
      title: "🐦 Maasai Ostrich Farm Tour",
      duration: "1 day",
      location: "Kajiado County",
      participants: "6-30 people",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Farm%20expo%202023/Peek-a-boo.webp",
      description: "Satisfy Your Natural Curiosity in a Furry Adventure. Welcome to the Maasai Ostrich Farm Tour! Get ready for an unforgettable day filled with nature, laughter, and a dash of adrenaline. Learn about ostrich farming from the <a href='https://www.ilri.org/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>International Livestock Research Institute</a> and explore cultural tourism with the <a href='https://tourkenya.go.ke/tourism/cultural-heritage-tourism/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Ministry of Tourism</a>.",
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
      includes: ["Transportation", "Farm tour", "Ostrich experience", "Pool access", "Lunch at Club 034"],
      externalLinks: [
        { title: "International Livestock Research Institute", url: "https://www.ilri.org/" },
        { title: "Ministry of Tourism - Cultural Heritage Tourism", url: "https://tourkenya.go.ke/tourism/cultural-heritage-tourism/" },
        { title: "Kenya Wildlife Research and Training Institute", url: "https://www.kws.go.ke/" }
      ]
    },
    {
      id: 11,
      title: "🐷 Pig Farm Tour",
      duration: "2 days",
      location: "Countryside",
      participants: "4-30 people",
      image: "https://qwdwrfjyajqxrnjlouqj.supabase.co/storage/v1/object/public/agritourism/pig%20farm.png",
      description: "Bacon Begins Here. Pig farming isn't just a profitable venture—it's a fascinating adventure into the world of animals, especially when experienced firsthand in the serene countryside. Learn about pig regulations from the <a href='https://kilimo.go.ke/wp-content/uploads/2024/08/PIG-INDUSTRY-REGS.pdf' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Ministry of Agriculture and Livestock Development</a> (<a href='https://kilimo.go.ke/wp-content/uploads/2024/08/PIG-INDUSTRY-REGS.pdf' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>MoALD</a>).",
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
      includes: ["Transportation", "Traditional meals", "Camping accommodation", "Farm activities", "Storytelling", "Adventure activities"],
      externalLinks: [
        { title: "Ministry of Agriculture and Livestock Development - Pig Industry Regulations", url: "https://kilimo.go.ke/wp-content/uploads/2024/08/PIG-INDUSTRY-REGS.pdf" },
        { title: "Kenya Bureau of Standards - Food Safety Guidelines", url: "https://www.kebs.org/" },
        { title: "International Livestock Research Institute - Kenya", url: "https://www.ilri.org/where-we-work/kenya" }
      ]
    },
    {
      id: 12,
      title: "🎓 Educational STEM Tours",
      duration: "1-3 days",
      location: "Various Locations",
      participants: "15-50 students",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Farm%20Machinery.webp",
      description: "Travel Smart, Learn More. STEM—Science, Technology, Engineering, and Mathematics—is a powerful, hands-on educational approach that's transforming the way learners understand the world. Learn more from the <a href='https://kicd.ac.ke/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Kenya Institute of Curriculum Development</a> and explore research excellence with <a href='https://uonbi.ac.ke/institutes-and-centres' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>University of Nairobi Institutes and Centres</a>.",
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
      includes: ["Educational visits", "Professional interactions", "Hands-on workshops", "Transportation", "Learning materials"],
      externalLinks: [
        { title: "Kenya Institute of Curriculum Development - STEM Education", url: "https://kicd.ac.ke/" },
        { title: "University of Nairobi Institutes and Centres", url: "https://uonbi.ac.ke/institutes-and-centres" },
        { title: "UNESCO Kenya - Science Education Programs", url: "https://en.unesco.org/countries/kenya" }
      ]
    },
    {
      id: 13,
      title: "💕 Bonding Safari",
      duration: "2-3 days",
      location: "Various Romantic Destinations",
      participants: "1-50 couples",
      image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Intro.webp",
      description: "It's a Date Worth the Escape. Bonding tourism is all about deepening emotional connections through immersive, shared experiences. Whether it's families reconnecting, couples rekindling romance, or friends creating unforgettable memories. Explore certified tourism with <a href='https://www.katakenya.org/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Kenya Association of Travel Agents</a> and discover romantic destinations through <a href='https://www.ktb.go.ke/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>Kenya Tourism Board</a>.",
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
      includes: ["Accommodation", "Romantic activities", "Counseling sessions", "All meals", "Adventure activities"],
      externalLinks: [
        { title: "Kenya Association of Travel Agents - Certified Tourism", url: "https://www.katakenya.org/" },
        { title: "Kenya Tourism Board - Romantic Destinations", url: "https://www.ktb.go.ke/" },
        { title: "Marriage and Family Counseling Association of Kenya", url: "https://www.mfcak.org/" }
      ]
    },
    {
      id: 14,
      title: "🌿 Wellness and Nature Experience",
      duration: "1-3 days",
      location: "Central Kenya",
      participants: "4-200 people",
      image: "/images/wellness-nature-botanical-garden.png",
      description: "Explore Kenya's <a href='https://www.floraqueen.com/blog/the-advantages-of-botanical-gardens-near-me?srsltid=AfmBOopXyuG0gnxXn9mfJQtv_4zOa1OVARJCf3Do-aU-bOa0RAe6v4tx' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>botanical gardens</a> in Nairobi and Central Kenya—a vibrant mix of <a href='https://www.crawfordinternational.co.za/why-you-should-travel-as-a-family' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>family-oriented travel</a>, <a href='https://edutourism-project.eu/en/general-features-of-thematic-tourism-edutourism-2/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>educational tourism</a>, and <a href='https://ke.cicinsurancegroup.com/health-and-wellness/' target='_blank' rel='noopener noreferrer' class='text-agri-teal hover:text-agri-green underline'>health and wellness</a>. Discover 300+ plant species, enjoy guided biodiversity tours, and join hands-on workshops like seed planting that delight kids while teaching conservation. Amid towering palms and fragrant frangipani, unwind in fresh, tranquil spaces that ease stress and boost vitality for all ages. Pack sunscreen and curiosity for an eco-friendly adventure blending learning, laughter, and nature's embrace.",
      category: "Regional Experiences",
      featured: false,
      fullDescription: "\n\nFun fact: Did you know that there's a flower nicknamed \"kiss me quick\"? It's used by lovers looking to charm their partners because of their bright blend of blue, purple and white petals.\n\n",
      itinerary: [
        "9:00 AM: Departure from Nairobi's CBD",
        "10:30 AM: Farm arrival",
        "Tea farm tour and picking",
        "Plant nursery visit (pick your own vegetables)",
        "Animal husbandry (geese, chickens and rabbits), including feeding and petting",
        "Botanical garden tour",
        "Garden strolling and a horse ranch visit",
        "Picnic or lunch",
        "4:00 PM: Departure to Nairobi",
        "Note: Activities include both full-day and half-day options. Choose 4-6 activities to make the best of your day."
      ],
      includes: [
        "Art gallery tour",
        "Tea picking",
        "Photo sessions",
        "Tea brewing and tasting",
        "Composting & recycling",
        "Plant nursery",
        "Tea harvesting",
        "Herbal tea tasting",
        "Hiking",
        "Picnics",
        "Cycling (at an extra cost)",
        "Boatrides (at an extra cost)",
        "Fishing (at an extra cost)",
        "Lunch (at an extra cost)"
      ],
      externalLinks: [
        { title: "FloraQueen - Advantages of Botanical Gardens", url: "https://www.floraqueen.com/blog/the-advantages-of-botanical-gardens-near-me?srsltid=AfmBOopXyuG0gnxXn9mfJQtv_4zOa1OVARJCf3Do-aU-bOa0RAe6v4tx" },
        { title: "Educational Tourism - Thematic Tourism Features", url: "https://edutourism-project.eu/en/general-features-of-thematic-tourism-edutourism-2/" },
        { title: "CIC Insurance - Health and Wellness", url: "https://ke.cicinsurancegroup.com/health-and-wellness/" },
        { title: "Crawford International - Family Travel Benefits", url: "https://www.crawfordinternational.co.za/why-you-should-travel-as-a-family" }
      ]
    }
  ];

  const filteredTours = activeFilter === 'All'
    ? tours 
    : tours.filter(tour => tour.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="pt-20 pb-4 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Tours</BreadcrumbPage>
              </BreadcrumbItem>
              {activeFilter !== 'All' && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{activeFilter}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      {/* Hero & Tours Section */}
      <section className="py-16 bg-agri-grey">
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
                onClick={() => {
                  setActiveFilter(filter);
                  const newSearchParams = new URLSearchParams(searchParams);
                  if (filter === 'All') {
                    newSearchParams.delete('category');
                  } else {
                    newSearchParams.set('category', filter);
                  }
                  setSearchParams(newSearchParams);
                }}
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
                    <span dangerouslySetInnerHTML={{ __html: tour.description }} />
                    {" "}
                    <Link to={`/tours?category=${encodeURIComponent(tour.category)}`} className="text-agri-green hover:text-agri-green/80 underline">
                      See more {tour.category} tours
                    </Link>
                    {" · "}
                    <Link to="/services" className="text-agri-green hover:text-agri-green/80 underline">
                      Explore our services
                    </Link>
                  </p>

                  {/* Tour Details */}
                  <div className="space-y-2 mb-4">
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
