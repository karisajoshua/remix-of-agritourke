import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, FileText, Image } from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    tours: 0,
    blogPosts: 0,
    galleryImages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [toursRes, blogRes, galleryRes] = await Promise.all([
        supabase.from("tours").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("gallery_images").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        tours: toursRes.count || 0,
        blogPosts: blogRes.count || 0,
        galleryImages: galleryRes.count || 0,
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Tours", value: stats.tours, icon: MapPin, color: "text-agri-green", route: "/admin/tours" },
    { title: "Blog Posts", value: stats.blogPosts, icon: FileText, color: "text-agri-teal", route: "/admin/blog" },
    { title: "Gallery Images", value: stats.galleryImages, icon: Image, color: "text-agri-dark", route: "/admin/gallery" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-agri-dark">Dashboard Overview</h2>
          <p className="text-muted-foreground mt-2">Welcome to your content management system</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {statCards.map((stat) => (
            <Card 
              key={stat.title} 
              className="border-none shadow-sm cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]"
              onClick={() => navigate(stat.route)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-agri-dark">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-2">Click to manage</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
