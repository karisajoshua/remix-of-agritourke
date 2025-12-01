import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Download } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import TourForm, { TourRecord } from "@/components/admin/TourForm";

interface Tour {
  id: string;
  title: string;
  category: string;
  duration: string;
  location: string;
  participants: string;
  image: string;
  description: string;
  full_description: string;
  featured: boolean;
  includes: string[];
  itinerary: { day: number; title: string; details: string }[];
  external_links: { label: string; url: string }[];
}

export default function AdminTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<TourRecord | null>(null);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const { data, error } = await supabase
        .from("tours")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      const mappedTours = (data || []).map(tour => ({
        id: tour.id,
        title: tour.title,
        category: tour.category || '',
        duration: tour.duration || '',
        location: tour.location || '',
        participants: tour.participants || '',
        image: tour.image || '',
        description: tour.description || '',
        full_description: tour.full_description || '',
        featured: tour.featured || false,
        includes: Array.isArray(tour.includes) ? tour.includes as string[] : [],
        itinerary: Array.isArray(tour.itinerary) ? tour.itinerary as { day: number; title: string; details: string }[] : [],
        external_links: Array.isArray(tour.external_links) ? tour.external_links as { label: string; url: string }[] : []
      }));
      
      setTours(mappedTours);
    } catch (error: any) {
      toast.error("Failed to load tours");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase.from("tours").delete().eq("id", deleteId);

      if (error) throw error;

      toast.success("Tour deleted successfully");
      fetchTours();
    } catch (error: any) {
      toast.error("Failed to delete tour");
    } finally {
      setDeleteId(null);
    }
  };

  const toggleFeatured = async (id: string, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from("tours")
        .update({ featured: !currentValue })
        .eq("id", id);

      if (error) throw error;

      toast.success("Tour updated successfully");
      fetchTours();
    } catch (error: any) {
      toast.error("Failed to update tour");
    }
  };

  const importAllTours = async () => {
    setImporting(true);
    try {
      // First, clear existing tours
      const { error: deleteError } = await supabase.from('tours').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      if (deleteError) console.warn('Delete warning:', deleteError);

      // All 14 tours from the frontend
      const allTours = [
        {
          title: "🌹 Flower Farm Tour in Naivasha",
          duration: "1 day",
          location: "Naivasha",
          participants: "4-150 people",
          image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/The%20Crew.webp",
          description: "Ever wondered where the stunning roses that grace European castles, luxury events, and world-class floral boutiques come from? Welcome to our Flower Farm Tour in Naivasha—a journey into the heart of Kenya's blossoming floriculture industry.",
          full_description: "Kenya is one of the world's leading exporters of cut flowers, with roses making up over 80% of the floral export market. Through this immersive tour, you'll explore where it all begins—on lush farms nestled between Lake Naivasha and Lake Nakuru, in one of Kenya's richest agricultural zones. You'll visit some of the most reputable flower farms in the region, where premium roses are cultivated for export to top-tier markets and global florists source the blooms used in iconic arrangements.",
          category: "Farm Tours",
          featured: false,
          includes: ["Transportation", "Farm visits", "Guided tours", "Organic tastings", "Expert guidance"],
          itinerary: [
            { day: 1, title: "Farm Arrival", details: "Farm arrival and orientation session" },
            { day: 1, title: "Rose Greenhouses", details: "Visit premium rose cultivation greenhouses" },
            { day: 1, title: "Export Markets", details: "Learn about export market processes" },
            { day: 1, title: "Regenerative Practices", details: "Explore regenerative farming practices" },
            { day: 1, title: "Organic Farming", details: "Organic vegetable farming techniques" },
            { day: 1, title: "Tastings", details: "Farm-grown tastings and honey sampling" }
          ],
          external_links: [
            { label: "Kenya Flower Council", url: "https://kenyaflowercouncil.org/" },
            { label: "Kenya Export Promotion Council", url: "https://www.epc.go.ke/" },
            { label: "Lake Naivasha Growers Group", url: "https://www.lngg.co.ke/" }
          ]
        },
        {
          title: "🍵 Rural Farm Safari - Tea & Cheese",
          duration: "1 day",
          location: "Countryside",
          participants: "4-160 people",
          image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Tea%20farmers.webp",
          description: "Experience Sereni-Tea. Escape the bustle of the city and dive into a full-day 2-in-1 farm experience—a tea and cheese safari that will leave your senses delighted and your soul refreshed.",
          full_description: "Begin the journey at 9:00 AM, departing Nairobi and heading into the cool, green highlands. After a scenic 2-hour drive, arrive at the tea farm for a light breakfast. Over fresh farm-grown tea, our friendly hosts will share the fascinating history of the estate and what makes Kenyan tea so globally loved.",
          category: "Farm Tours",
          featured: false,
          includes: ["Transportation", "Tea farm tour", "Cheese factory visit", "All meals", "Guided walks", "Tastings"],
          itinerary: [
            { day: 1, title: "Departure", details: "9:00 AM: Departure from Nairobi" },
            { day: 1, title: "Tea Farm", details: "Tea farm tour and breakfast" },
            { day: 1, title: "Tea Picking", details: "Walk through tea bushes and leaf picking" },
            { day: 1, title: "Lunch", details: "3-course farm-fresh buffet lunch" },
            { day: 1, title: "Forest Walk", details: "Indigenous forest guided walk" },
            { day: 1, title: "Cheese Farm", details: "2:30 PM: Cheese farm experience" },
            { day: 1, title: "Factory Tour", details: "Factory tour and cheese tasting" },
            { day: 1, title: "Farm Activities", details: "Cow milking and vegetable gardens" },
            { day: 1, title: "Dessert", details: "Farm-fresh ice cream and pizza" },
            { day: 1, title: "Return", details: "5:30 PM: Return to Nairobi" }
          ],
          external_links: [
            { label: "Kenya Tea Development Agency", url: "https://www.ktdateas.com/" },
            { label: "Kenya Association of Manufacturers", url: "https://kam.co.ke/" }
          ]
        },
        {
          title: "🐘 9-Day Mixed Farming Safari",
          duration: "9 days",
          location: "Central Kenya",
          participants: "4-70 people",
          image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Intro-2.webp",
          description: "Embrace the Calm Within. A comprehensive journey through Kenya's diverse agricultural landscape, from Mount Kenya to Thompson Falls.",
          full_description: "A 9-day comprehensive agricultural safari that takes you through Kenya's most fertile regions. Experience diverse farming systems from flower and wheat farms near Mount Kenya to dairy farms in Nyahururu, combined with wildlife viewing at Sweetwaters Game Reserve and Solio Ranch.",
          category: "Safari & Wildlife",
          featured: true,
          includes: ["All accommodation", "All meals", "Transportation", "Farm visits", "Game drives", "Professional guide", "Community visits"],
          itinerary: [
            { day: 1, title: "Nanyuki", details: "Nairobi to Nanyuki - Cross the Equator, Mount Kenya views" },
            { day: 2, title: "Farms & Safari", details: "Flower & wheat farms, Sweetwaters Game Reserve" },
            { day: 3, title: "Nyahururu", details: "Dairy tour & Thompson Falls" },
            { day: 4, title: "Farming", details: "Maize farming & cattle milking experience" },
            { day: 5, title: "Nyeri", details: "Wildlife at Solio Ranch" },
            { day: 6, title: "Coffee", details: "Coffee farm tour & Baden Powell Memorial" },
            { day: 7, title: "Tea", details: "Tea farm harvesting experience" },
            { day: 8, title: "Community", details: "Orphanage & community visit" },
            { day: 9, title: "Return", details: "Return to Nairobi via plantations" }
          ],
          external_links: [
            { label: "Kenya Wildlife Service", url: "https://www.kws.go.ke/" },
            { label: "Kenya Association of Tour Operators", url: "https://www.katokenya.org/" }
          ]
        },
        {
          title: "🥛 Organic Farm Visit",
          duration: "1 day",
          location: "Central Kenya Highlands",
          participants: "3-90 people",
          image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6935.webp",
          description: "A Farm Like No Udder. Get ready for a day that blends nature, nourishment, and nostalgia. An organic farm visit is more than just a countryside escape—it's a hands-on experience that opens your heart to sustainable living and rural beauty.",
          full_description: "Whether you're seeking quiet reflection or family fun, this visit offers something for everyone. Meet our friendly team and fellow explorers at Nairobi's CBD, then hop into our ride as we begin the scenic 1-hour drive to the village.",
          category: "Farm Tours",
          featured: false,
          includes: ["Transportation", "Farm tour", "Lunch preparation", "Animal interaction", "Art gallery visit", "Fresh produce options"],
          itinerary: [
            { day: 1, title: "Departure", details: "9:00 AM: Departure from Nairobi CBD" },
            { day: 1, title: "Arrival", details: "10:00 AM: Farm arrival with refreshing drinks" },
            { day: 1, title: "Farm Tour", details: "Educational farm tour - seedlings, composting, intercropping" },
            { day: 1, title: "Harvest", details: "Pick your own vegetables" },
            { day: 1, title: "Cooking", details: "Farm-to-fork lunch preparation" },
            { day: 1, title: "Animals", details: "Hands-on animal interaction - cows, goats, poultry" },
            { day: 1, title: "Activities", details: "Cow milking and egg collection" },
            { day: 1, title: "Gallery", details: "Art gallery and birdwatching" },
            { day: 1, title: "Return", details: "Late afternoon: Return to Nairobi" }
          ],
          external_links: [
            { label: "Kenya Organic Agriculture Network", url: "https://www.koan.co.ke/" },
            { label: "FAO Kenya", url: "https://www.fao.org/kenya/en/" }
          ]
        },
        {
          title: "☕ Coffee & Dairy Tour",
          duration: "1 day",
          location: "Central Kenya Highlands",
          participants: "2-150 people",
          image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/coffee%20and%20dairy%20tour.webp",
          description: "Make Every Sip an Adventure. Ready for your next farm vacation? Let's dive into nature, heritage, and a cup of fresh, farm-grown coffee. This unique coffee and dairy farm tour offers the perfect blend of relaxation, learning, and adventure.",
          full_description: "We'll pick you up from your hotel in Nairobi at 8:00 AM. Just a short drive away, you'll find a hidden gem — a peaceful estate wrapped in vibrant coffee fields, steeped in rich history, and set against a backdrop of breathtaking scenery. This isn't just a farm visit — it's an experience.",
          category: "Farm Tours",
          featured: true,
          includes: ["Hotel pickup", "Estate activities", "Coffee processing experience", "Dairy farm visit", "Take-home coffee", "All activities"],
          itinerary: [
            { day: 1, title: "Pickup", details: "8:00 AM: Hotel pickup in Nairobi" },
            { day: 1, title: "Nature", details: "Nature walks and birdwatching" },
            { day: 1, title: "Riding", details: "Horse and camel riding" },
            { day: 1, title: "Ostrich", details: "Maasai ostrich feeding" },
            { day: 1, title: "Coffee Picking", details: "Coffee berry picking experience" },
            { day: 1, title: "Processing", details: "Processing and production line tour" },
            { day: 1, title: "Branding", details: "Brand your own coffee with Kenyan label" },
            { day: 1, title: "Dairy", details: "Dairy farm experience - milking session" },
            { day: 1, title: "Return", details: "Return to Nairobi with fresh coffee" }
          ],
          external_links: [
            { label: "Agriculture and Food Authority - Coffee Directorate", url: "https://www.afa.go.ke/home-coffee-directorate/" },
            { label: "Kenya Coffee Producers & Traders Association", url: "https://www.kcpta.com/" }
          ]
        },
        {
          title: "🚌 Matatu Tourism",
          duration: "1 day",
          location: "Nairobi",
          participants: "5-30 people",
          image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Matatu/matatu%20tourims.jpg",
          description: "Ride Through the Urban Jungle in Style. Matatu tourism is one of the most vibrant and unexpected highlights of urban Kenya. These graffiti-covered, music-blasting minibuses are a cultural experience like no other.",
          full_description: "Also known as 'ma3' or 'nganya' in local slang, matatus have evolved from simple public transport to iconic, moving works of art since their inception in the 1960s. They are more than just a ride—they're a party on wheels, a voice of youth culture, and an economic engine.",
          category: "Cultural & Urban",
          featured: false,
          includes: ["Matatu transport experience", "Cultural guide", "Artist interactions", "Urban stops", "Local insights"],
          itinerary: [
            { day: 1, title: "Meeting", details: "Downtown Nairobi meeting point" },
            { day: 1, title: "Ride", details: "Ride in fully customized 'nganya'" },
            { day: 1, title: "Experience", details: "Experience beats, lights, and local conversations" },
            { day: 1, title: "Fare", details: "Try fare collection with conductor" },
            { day: 1, title: "Hubs", details: "Visit matatu hubs and customization shops" },
            { day: 1, title: "Artists", details: "Meet artists and sound engineers" },
            { day: 1, title: "Farming", details: "Urban farming stops via matatu transport" },
            { day: 1, title: "Interactions", details: "Cultural interactions with daily commuters" }
          ],
          external_links: [
            { label: "Magical Kenya - Official Tourism Board", url: "https://www.magicalkenya.com/" },
            { label: "Kenya Museums Society", url: "https://museums.or.ke/" }
          ]
        },
        {
          title: "🍍 Nanasi (Pineapple) Tour",
          duration: "Half day",
          location: "Central Kenya",
          participants: "4-50 people",
          image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Pineaples/Nanasi%20Splash.png",
          description: "Life Is Sweet, Just Like Pineapples. If you've never tasted a pineapple straight from the field—warm from the sun, sliced fresh with a machete, juice trickling down your chin—this is your moment.",
          full_description: "Welcome to the Nanasi Tour, a refreshing agritourism experience in Central Kenya, where every bite tells a story and every visit feels like a hidden treasure waiting to be discovered. Set in the heart of Gatundu North, this tour is more than just a snack stop—it's an immersion into the vibrant agricultural lifestyle of Central Kenya.",
          category: "Regional Experiences",
          featured: false,
          includes: ["Farm visits", "Historical sites", "Tea factory tour", "Fresh tastings", "Cultural insights"],
          itinerary: [
            { day: 1, title: "Arrival", details: "Arrival at Central Kenya pineapple farms" },
            { day: 1, title: "Farm Walk", details: "Walk among rows of lush pineapple plants" },
            { day: 1, title: "Learning", details: "Learn growing and harvesting techniques" },
            { day: 1, title: "Tasting", details: "Fresh field pineapple tasting" },
            { day: 1, title: "Gardens", details: "Vegetable gardens exploration" },
            { day: 1, title: "History", details: "Historic Mau Mau caves visit" },
            { day: 1, title: "Tea", details: "Tea plantation and factory tour" },
            { day: 1, title: "Spiritual", details: "God's Well spiritual site visit" }
          ],
          external_links: [
            { label: "Fresh Produce Exporters Association of Kenya", url: "https://www.fpeak.org/" },
            { label: "Kenya National Archives", url: "https://www.nationalarchives.go.ke/" }
          ]
        },
        {
          title: "🏔️ Ngong Adrenaline Rush",
          duration: "1 day",
          location: "Ngong Hills",
          participants: "4-80 people",
          image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/Ngong%20adrenaline.webp",
          description: "We Turn Moments Into Memories. Nestled in the breathtaking Rift Valley, Ngong Hills are among Kenya's most exhilarating adventure destinations. The cool, high-altitude breeze, rolling green hills, and sweeping views make this a fairytale escape.",
          full_description: "Meet at International House parking lot (CBD) at 8:00 AM, and after a quick meet-and-greet, we'll hit the road by 8:30 AM. Our journey takes us past Maasai villages and through scenic terrain, with a short stop for teambuilding exercises to shake off the chill of the highlands.",
          category: "Regional Experiences",
          featured: true,
          includes: ["Transportation", "Adventure activities", "Teambuilding", "Nyama Choma lunch", "Mountain access"],
          itinerary: [
            { day: 1, title: "Meeting", details: "8:00 AM: Meet at International House CBD" },
            { day: 1, title: "Departure", details: "8:30 AM: Departure past Maasai villages" },
            { day: 1, title: "Arrival", details: "10:30 AM: Kompass Hotel arrival" },
            { day: 1, title: "Ziplining", details: "Ziplining across hilltops" },
            { day: 1, title: "Archery", details: "Archery challenges" },
            { day: 1, title: "Hiking", details: "Mountain hiking and photography" },
            { day: 1, title: "Games", details: "Teambuilding and group games" },
            { day: 1, title: "Nature Walk", details: "Nature walk through untouched landscape" },
            { day: 1, title: "Lunch", details: "2:30 PM: Nyama Choma lunch at Riverside Restaurant" },
            { day: 1, title: "Return", details: "4:30 PM: Return to Nairobi" }
          ],
          external_links: [
            { label: "Kenya Forest Service", url: "https://www.kenyaforestservice.org/" },
            { label: "Kajiado County Government", url: "https://www.kajiado.go.ke/" }
          ]
        },
        {
          title: "🐐 Goat Farm Tour",
          duration: "1 day",
          location: "Central Kenya Highlands",
          participants: "3-90 people",
          image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Mbuzi%20Farm/IMG_6923.webp",
          description: "Nature's Baaa-utiful Business. Ready to embark on a unique and enriching farm adventure? Welcome to our Goat Farm Tour — where learning, laughter, and sustainability come together in the heart of Kenya's countryside.",
          full_description: "Our journey begins at 7:00 AM in Nairobi's CBD. It's a scenic 2-hour drive filled with music, photo stops, and stretch breaks. We arrive at the farm around 9:30 AM, just in time to enjoy a warm welcome from the host, a cup of tea, and some light farm snacks.",
          category: "Farm Tours",
          featured: false,
          includes: ["Transportation", "Farm education", "Goat interaction", "Garden tour", "Dairy experience", "Traditional lunch"],
          itinerary: [
            { day: 1, title: "Departure", details: "7:00 AM: Nairobi CBD departure" },
            { day: 1, title: "Arrival", details: "9:30 AM: Farm arrival with tea and snacks" },
            { day: 1, title: "Session", details: "3-hour interactive goat farming session" },
            { day: 1, title: "Learning", details: "Learn breeds, behaviors, and sustainability" },
            { day: 1, title: "Feeding", details: "Hands-on goat feeding experience" },
            { day: 1, title: "Garden", details: "Multi-storey garden exploration" },
            { day: 1, title: "Dairy", details: "Dairy production room tour" },
            { day: 1, title: "Lunch", details: "Traditional home-cooked lunch" },
            { day: 1, title: "Demo", details: "Biogas and fertilizer demonstrations" },
            { day: 1, title: "Return", details: "Return to Nairobi with farm stories" }
          ],
          external_links: [
            { label: "Farm Africa - Goat Rearing", url: "https://www.farmafrica.org/our-work/specific-expertise/goat-rearing/" },
            { label: "Ministry of Agriculture and Livestock Development", url: "https://kilimo.go.ke/" }
          ]
        },
        {
          title: "🐦 Maasai Ostrich Farm Tour",
          duration: "1 day",
          location: "Kajiado County",
          participants: "6-30 people",
          image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Farm%20expo%202023/Peek-a-boo.webp",
          description: "Satisfy Your Natural Curiosity in a Furry Adventure. Welcome to the Maasai Ostrich Farm Tour! Get ready for an unforgettable day filled with nature, laughter, and a dash of adrenaline.",
          full_description: "Meet our friendly team and fellow explorers in Nairobi city center. Together, we'll head to beautiful Kajiado County, home of the famous Maasai Ostrich Farm. Upon arrival, we'll start with a guided walk through the vegetable gardens.",
          category: "Farm Tours",
          featured: false,
          includes: ["Transportation", "Farm tour", "Ostrich experience", "Pool access", "Lunch at Club 034"],
          itinerary: [
            { day: 1, title: "Departure", details: "8:00 AM: Departure from Nairobi CBD" },
            { day: 1, title: "Arrival", details: "10:00 AM: Arrival & vegetable garden tour" },
            { day: 1, title: "Ostriches", details: "Ostrich encounter - eggs, chicks, adults" },
            { day: 1, title: "Rides", details: "Ostrich rides for the brave" },
            { day: 1, title: "Picnic", details: "Picnic & pool time" },
            { day: 1, title: "Photos", details: "Photo sessions with ostriches" },
            { day: 1, title: "Lunch", details: "3:00 PM: Lunch at Club 034" },
            { day: 1, title: "Return", details: "Return journey to Nairobi" }
          ],
          external_links: [
            { label: "International Livestock Research Institute", url: "https://www.ilri.org/" },
            { label: "Ministry of Tourism", url: "https://tourkenya.go.ke/" }
          ]
        },
        {
          title: "🐷 Pig Farm Tour",
          duration: "2 days",
          location: "Countryside",
          participants: "4-30 people",
          image: "https://qwdwrfjyajqxrnjlouqj.supabase.co/storage/v1/object/public/agritourism/pig%20farm.png",
          description: "Bacon Begins Here. Pig farming isn't just a profitable venture—it's a fascinating adventure into the world of animals, especially when experienced firsthand in the serene countryside.",
          full_description: "Far from the noise of the city, this one-day, one-night tour will leave you informed, inspired, and fully entertained. Meet your fellow travelers in the city center and begin your scenic 1.5-hour drive to the farm.",
          category: "Farm Tours",
          featured: false,
          includes: ["Transportation", "Traditional meals", "Camping accommodation", "Farm activities", "Storytelling", "Adventure activities"],
          itinerary: [
            { day: 1, title: "Departure", details: "Day 1: 8:00 AM Departure from Nairobi CBD" },
            { day: 1, title: "Arrival", details: "10:00 AM: Farm arrival with traditional breakfast" },
            { day: 1, title: "Farm Tour", details: "Farm orientation and pig farming experience" },
            { day: 1, title: "Tea", details: "Tea plantation activity" },
            { day: 1, title: "Lunch", details: "Organic farm lunch and nature walk" },
            { day: 1, title: "Caves", details: "Cave exploration" },
            { day: 1, title: "Evening", details: "Bonfire and traditional storytelling" },
            { day: 1, title: "Camping", details: "Overnight camping under stars" },
            { day: 2, title: "Activities", details: "Day 2: Morning activities - zip-lining, swimming, hiking" },
            { day: 2, title: "Return", details: "Return to Nairobi refreshed" }
          ],
          external_links: [
            { label: "Ministry of Agriculture - Pig Industry", url: "https://kilimo.go.ke/" },
            { label: "Kenya Bureau of Standards", url: "https://www.kebs.org/" }
          ]
        },
        {
          title: "🎓 Educational STEM Tours",
          duration: "1-3 days",
          location: "Various Locations",
          participants: "15-50 students",
          image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/2025%20agri%20expo/Farm%20Machinery.webp",
          description: "Travel Smart, Learn More. STEM—Science, Technology, Engineering, and Mathematics—is a powerful, hands-on educational approach that's transforming the way learners understand the world.",
          full_description: "Since its national rollout in Kenya in 2019, STEM has become a strategic pillar in achieving Vision 2030. At Agritourism Adventures, we align with this vision by offering educational tours that immerse learners in real-world knowledge across Kenya's thriving industries.",
          category: "Educational Tours",
          featured: true,
          includes: ["Educational visits", "Professional interactions", "Hands-on workshops", "Transportation", "Learning materials"],
          itinerary: [
            { day: 1, title: "Food Production", details: "Food production & agro-processing visits" },
            { day: 1, title: "Auto Industry", details: "Car assembly & automation facilities" },
            { day: 1, title: "Archaeology", details: "Archaeological preservation sites" },
            { day: 1, title: "Sound", details: "Sound engineering demonstrations" },
            { day: 1, title: "AI", details: "AI and software development hubs" },
            { day: 1, title: "ML", details: "Machine learning applications" },
            { day: 1, title: "Workshops", details: "Hands-on workshops with professionals" },
            { day: 1, title: "Q&A", details: "Q&A sessions with industry experts" }
          ],
          external_links: [
            { label: "Kenya Institute of Curriculum Development", url: "https://kicd.ac.ke/" },
            { label: "University of Nairobi", url: "https://uonbi.ac.ke/" }
          ]
        },
        {
          title: "💕 Bonding Safari",
          duration: "2-3 days",
          location: "Various Romantic Destinations",
          participants: "1-50 couples",
          image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Intro.webp",
          description: "It's a Date Worth the Escape. Bonding tourism is all about deepening emotional connections through immersive, shared experiences. Whether it's families reconnecting, couples rekindling romance, or friends creating unforgettable memories.",
          full_description: "We design every bonding experience with value, comfort, and impact in mind—curating meaningful itineraries that nurture relationships and encourage repeat visits. From scenic safaris to heartfelt conversations, every moment becomes a memory.",
          category: "Cultural & Urban",
          featured: false,
          includes: ["Accommodation", "Romantic activities", "Counseling sessions", "All meals", "Adventure activities"],
          itinerary: [
            { day: 1, title: "Arrival", details: "Friday evening: Romantic arrival and setup" },
            { day: 1, title: "Safari", details: "Safari or boat ride together" },
            { day: 1, title: "Dinner", details: "Romantic dinners under the stars" },
            { day: 2, title: "Camping", details: "Camping experience in nature" },
            { day: 2, title: "Games", details: "Team building and fun games" },
            { day: 2, title: "Cooking", details: "Couples cooking sessions" },
            { day: 2, title: "Counseling", details: "Expert marriage counseling sessions" },
            { day: 3, title: "Departure", details: "Sunday afternoon: Reflection and departure" }
          ],
          external_links: [
            { label: "Kenya Association of Travel Agents", url: "https://www.katakenya.org/" },
            { label: "Kenya Tourism Board", url: "https://www.ktb.go.ke/" }
          ]
        },
        {
          title: "🌿 Wellness and Nature Experience",
          duration: "1-3 days",
          location: "Central Kenya",
          participants: "4-200 people",
          image: "/images/wellness-nature-botanical-garden.png",
          description: "Explore Kenya's botanical gardens in Nairobi and Central Kenya—a vibrant mix of family-oriented travel, educational tourism, and health and wellness. Discover 300+ plant species, enjoy guided biodiversity tours.",
          full_description: "Fun fact: Did you know that there's a flower nicknamed \"kiss me quick\"? It's used by lovers looking to charm their partners because of their bright blend of blue, purple and white petals.",
          category: "Regional Experiences",
          featured: false,
          includes: ["Art gallery tour", "Tea picking", "Photo sessions", "Tea brewing and tasting", "Composting & recycling", "Plant nursery", "Tea harvesting", "Herbal tea tasting", "Hiking", "Picnics"],
          itinerary: [
            { day: 1, title: "Departure", details: "9:00 AM: Departure from Nairobi's CBD" },
            { day: 1, title: "Arrival", details: "10:30 AM: Farm arrival" },
            { day: 1, title: "Tea Tour", details: "Tea farm tour and picking" },
            { day: 1, title: "Nursery", details: "Plant nursery visit (pick your own vegetables)" },
            { day: 1, title: "Animals", details: "Animal husbandry (geese, chickens and rabbits)" },
            { day: 1, title: "Botanical", details: "Botanical garden tour" },
            { day: 1, title: "Strolling", details: "Garden strolling and a horse ranch visit" },
            { day: 1, title: "Lunch", details: "Picnic or lunch" },
            { day: 1, title: "Return", details: "4:00 PM: Departure to Nairobi" }
          ],
          external_links: [
            { label: "FloraQueen - Botanical Gardens", url: "https://www.floraqueen.com/blog/the-advantages-of-botanical-gardens-near-me" },
            { label: "Educational Tourism Project", url: "https://edutourism-project.eu/" }
          ]
        }
      ];

      const { error } = await supabase.from('tours').insert(allTours);

      if (error) throw error;

      toast.success('All 14 tours imported successfully!');
      fetchTours();
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import tours');
    } finally {
      setImporting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agri-green"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-agri-dark">Tour Management</h2>
            <p className="text-muted-foreground mt-2">Manage your tour offerings ({tours.length} tours)</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={importAllTours} disabled={importing}>
              <Download className="h-4 w-4" />
              {importing ? "Importing..." : "Import All Tours"}
            </Button>
            <Button className="gap-2" onClick={() => { setEditing(null); setFormOpen(true); }}>
              <Plus className="h-4 w-4" />
              Add New Tour
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <Card key={tour.id} className="border-none shadow-sm">
              <CardHeader className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                  {tour.featured && (
                    <span className="absolute top-2 right-2 bg-agri-green text-white text-xs px-2 py-1">
                      Featured
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{tour.title}</CardTitle>
                <p className="text-sm text-muted-foreground mb-1">{tour.category}</p>
                <p className="text-sm text-muted-foreground mb-1">{tour.duration} • {tour.location}</p>
                <p className="text-sm text-muted-foreground mb-1">{tour.participants}</p>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{tour.description}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFeatured(tour.id, tour.featured)}
                  >
                    {tour.featured ? "Unfeature" : "Feature"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => { 
                    setEditing({ 
                      id: tour.id, 
                      title: tour.title, 
                      category: tour.category, 
                      duration: tour.duration, 
                      location: tour.location,
                      participants: tour.participants,
                      image: tour.image, 
                      description: tour.description,
                      full_description: tour.full_description,
                      featured: tour.featured,
                      includes: tour.includes,
                      itinerary: tour.itinerary,
                      external_links: tour.external_links
                    }); 
                    setFormOpen(true); 
                  }}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(tour.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {tours.length === 0 && (
          <Card className="border-none shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No tours found. Import all tours to get started.</p>
              <Button onClick={importAllTours} disabled={importing}>
                <Download className="h-4 w-4 mr-2" />
                {importing ? "Importing..." : "Import All Tours"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the tour.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <TourForm
        open={formOpen}
        onOpenChange={setFormOpen}
        initial={editing}
        onSaved={fetchTours}
      />
    </AdminLayout>
  );
}
