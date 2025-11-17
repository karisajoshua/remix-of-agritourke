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
  image: string;
  featured: boolean;
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
      setTours(data || []);
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

  const importStaticTours = async () => {
    setImporting(true);
    try {
      const detailedTours = [
        {
          title: "🌹 Flower Farm Tour in Naivasha",
          duration: "1 day",
          location: "Naivasha",
          participants: "4-150 people",
          image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/The%20Crew.webp",
          description: "Ever wondered where the stunning roses that grace European castles, luxury events, and world-class floral boutiques come from? Welcome to our Flower Farm Tour in Naivasha—a journey into the heart of Kenya's blossoming floriculture industry.",
          full_description: "Kenya is one of the world's leading exporters of cut flowers, with roses making up over 80% of the floral export market. Through this immersive tour, you'll explore where it all begins—on lush farms nestled between Lake Naivasha and Lake Nakuru, in one of Kenya's richest agricultural zones.",
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
            { label: "Kenya Export Promotion Council", url: "https://www.epc.go.ke/" }
          ]
        },
        {
          title: "🍵 Rural Farm Safari - Tea & Cheese",
          duration: "1 day",
          location: "Countryside",
          participants: "4-160 people",
          image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Tea%20farmers.webp",
          description: "Escape the city and step into Kenya's thriving rural agricultural scene with our Rural Farm Safari—a day immersed in tea cultivation and artisan cheesemaking.",
          full_description: "Kenya is Africa's leading tea exporter and one of the world's top three tea producers. With over 560,000 smallholder farmers contributing to the industry, tea is woven into the fabric of rural life and drives key export revenues.",
          category: "Farm Tours",
          featured: true,
          includes: ["Transportation", "Farm tours", "Tea tasting", "Cheese sampling", "Expert guides"],
          itinerary: [
            { day: 1, title: "Tea Plantation Visit", details: "Walk through lush tea fields and learn harvesting techniques" },
            { day: 1, title: "Processing Demonstration", details: "See tea processing from leaf to export-ready product" },
            { day: 1, title: "Artisan Cheese Tour", details: "Visit a local cheese-making facility" },
            { day: 1, title: "Tastings", details: "Sample premium tea and artisan cheeses" }
          ],
          external_links: [
            { label: "Kenya Tea Development Agency", url: "https://www.ktdateas.com/" }
          ]
        },
        {
          title: "☕ Coffee & Dairy - Kiambu",
          duration: "1 day",
          location: "Kiambu County",
          participants: "5-60 people",
          image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Coffee%20&%20Dairy.webp",
          description: "Experience two of Kenya's most iconic agricultural industries in one unforgettable day—coffee and dairy farming in the heart of Kiambu County.",
          full_description: "Kiambu County is synonymous with premium Kenyan coffee and thriving dairy farming. As one of the country's top coffee-producing regions and a major milk supplier to Nairobi, Kiambu embodies the agricultural diversity that drives Kenya's economy.",
          category: "Farm Tours",
          featured: true,
          includes: ["Transportation", "Coffee & dairy tours", "Tastings", "Expert guidance", "Farm-to-table lunch"],
          itinerary: [
            { day: 1, title: "Coffee Estate", details: "Tour coffee plantation and processing" },
            { day: 1, title: "Coffee Tasting", details: "Professional cupping session" },
            { day: 1, title: "Dairy Farm", details: "Modern dairy operations and milking" },
            { day: 1, title: "Fresh Tastings", details: "Sample dairy products" }
          ],
          external_links: [
            { label: "Agriculture and Food Authority", url: "https://www.agricultureauthority.go.ke/" }
          ]
        },
        {
          title: "🐖 Pig Farm Tour - Large-Scale Farming in Kenya",
          duration: "1 day",
          location: "Central Kenya",
          participants: "5-100 people",
          image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Pig%20farm%20tour%20%F0%9F%90%96.webp",
          description: "Discover the dynamic world of large-scale pig farming in Kenya—a booming agricultural sector that's reshaping food security and livelihoods.",
          full_description: "Kenya's pig farming sector has grown rapidly over the past decade, driven by rising demand for pork products across urban and rural markets.",
          category: "Farm Tours",
          featured: false,
          includes: ["Transportation", "Farm tour", "Expert guidance", "Safety equipment", "Light refreshments"],
          itinerary: [
            { day: 1, title: "Farm Introduction", details: "Overview of operations and pig farming in Kenya" },
            { day: 1, title: "Breeding & Genetics", details: "Learn about modern breeding programs" },
            { day: 1, title: "Nutrition Systems", details: "Explore feed formulation and nutrition" },
            { day: 1, title: "Health Management", details: "Disease prevention and biosecurity measures" }
          ],
          external_links: [
            { label: "Ministry of Agriculture", url: "https://kilimo.go.ke/" }
          ]
        },
        {
          title: "🏔️ Ngong Adrenaline Rush",
          duration: "1 day",
          location: "Ngong Hills",
          participants: "8-40 people",
          image: "https://mmzxltmxiolqboogdvzi.supabase.co/storage/v1/object/public/agritourism/Fair%20view/Ngong%20Adrenaline%20Rush%20%F0%9F%8F%94%EF%B8%8F.webp",
          description: "Get your adrenaline pumping with an unforgettable adventure in the iconic Ngong Hills.",
          full_description: "The Ngong Hills are one of Kenya's most scenic and accessible outdoor destinations, offering panoramic views of the Great Rift Valley, Nairobi's skyline, and the vast plains stretching toward Tanzania.",
          category: "Regional Experiences",
          featured: false,
          includes: ["Transportation", "Guided hike", "Safety briefing", "Packed lunch", "Drinking water"],
          itinerary: [
            { day: 1, title: "Departure", details: "Pickup and scenic drive to Ngong Hills" },
            { day: 1, title: "Hiking Adventure", details: "Trek across the Ngong peaks" },
            { day: 1, title: "Community Visit", details: "Visit local Maasai community" },
            { day: 1, title: "Lunch Break", details: "Packed lunch with scenic views" }
          ],
          external_links: [
            { label: "Kenya Wildlife Service", url: "https://www.kws.go.ke/" }
          ]
        }
      ];

      const { error } = await supabase
        .from('tours')
        .insert(detailedTours);

      if (error) throw error;

      toast.success('Detailed tours imported successfully!');
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
            <p className="text-muted-foreground mt-2">Manage your tour offerings</p>
          </div>
          <div className="flex gap-2">
            {tours.length === 0 && (
              <Button variant="outline" className="gap-2" onClick={importStaticTours} disabled={importing}>
                <Download className="h-4 w-4" />
                {importing ? "Importing..." : "Import Sample Tours"}
              </Button>
            )}
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
                <p className="text-sm text-muted-foreground mb-1">{tour.duration}</p>
                <p className="text-sm text-muted-foreground mb-4">{tour.location}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFeatured(tour.id, tour.featured)}
                  >
                    {tour.featured ? "Unfeature" : "Feature"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => { setEditing({ id: tour.id, title: tour.title, category: tour.category, duration: tour.duration, location: tour.location, image: tour.image, featured: tour.featured }); setFormOpen(true); }}>
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
              <p className="text-muted-foreground">No tours found. Add your first tour to get started.</p>
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
