import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, FileText, Image, Plus, Calendar, MessageSquare, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/AdminLayout";
import { format } from "date-fns";

interface RecentPost {
  id: string;
  title: string;
  date: string | null;
  category: string | null;
}

interface PendingComment {
  id: string;
  author_name: string;
  content: string;
  created_at: string | null;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ tours: 0, blogPosts: 0, galleryImages: 0, pendingQuotes: 0 });
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [pendingComments, setPendingComments] = useState<PendingComment[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const [toursRes, blogRes, galleryRes, postsRes, commentsRes, quotesRes] = await Promise.all([
        supabase.from("tours").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("gallery_images").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id, title, date, category").order("created_at", { ascending: false }).limit(5),
        supabase.from("blog_comments").select("id, author_name, content, created_at").eq("approved", false).order("created_at", { ascending: false }).limit(5),
        supabase.from("quote_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
      ]);

      setStats({
        tours: toursRes.count || 0,
        blogPosts: blogRes.count || 0,
        galleryImages: galleryRes.count || 0,
        pendingQuotes: quotesRes.count || 0,
      });
      setRecentPosts(postsRes.data || []);
      setPendingComments(commentsRes.data || []);
    };

    fetchAll();
  }, []);

  const today = format(new Date(), "EEEE, MMMM d, yyyy");

  const statCards = [
    { title: "Total Tours", value: stats.tours, icon: MapPin, borderColor: "border-l-agri-green", iconBg: "bg-agri-green/10", iconColor: "text-agri-green", route: "/admin/tours" },
    { title: "Blog Posts", value: stats.blogPosts, icon: FileText, borderColor: "border-l-agri-teal", iconBg: "bg-agri-teal/10", iconColor: "text-agri-teal", route: "/admin/blog" },
    { title: "Gallery Images", value: stats.galleryImages, icon: Image, borderColor: "border-l-agri-yellow", iconBg: "bg-agri-yellow/10", iconColor: "text-agri-yellow", route: "/admin/gallery" },
    { title: "Pending Quotes", value: stats.pendingQuotes, icon: Send, borderColor: "border-l-orange-500", iconBg: "bg-orange-50", iconColor: "text-orange-500", route: "/admin/quotes" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="bg-agri-dark p-6 rounded-none">
          <h2 className="text-2xl font-bold text-white">Welcome back 👋</h2>
          <p className="text-white/70 mt-1 flex items-center gap-2">
            <Calendar className="h-4 w-4" /> {today}
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <Card
              key={stat.title}
              className={`rounded-none border-none border-l-4 ${stat.borderColor} shadow-sm cursor-pointer transition-all hover:shadow-md hover:translate-y-[-2px]`}
              onClick={() => navigate(stat.route)}
            >
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`h-12 w-12 rounded-none ${stat.iconBg} flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-agri-dark">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button className="rounded-none bg-agri-green hover:bg-agri-green/90 gap-2" onClick={() => navigate("/admin/tours")}>
            <Plus className="h-4 w-4" /> New Tour
          </Button>
          <Button className="rounded-none bg-agri-teal hover:bg-agri-teal/90 gap-2" onClick={() => navigate("/admin/blog")}>
            <Plus className="h-4 w-4" /> New Blog Post
          </Button>
          <Button className="rounded-none bg-agri-yellow hover:bg-agri-yellow/90 gap-2" onClick={() => navigate("/admin/gallery")}>
            <Plus className="h-4 w-4" /> Upload Photo
          </Button>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Blog Posts */}
          <Card className="rounded-none border-none shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-agri-dark flex items-center gap-2">
                <FileText className="h-5 w-5 text-agri-teal" /> Recent Blog Posts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentPosts.length === 0 ? (
                <p className="text-sm text-muted-foreground">No posts yet.</p>
              ) : (
                recentPosts.map((post) => (
                  <div key={post.id} className="flex items-start justify-between border-b border-border pb-2 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-agri-dark">{post.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" /> {post.date || "No date"}
                        {post.category && <span className="ml-2 text-agri-teal">• {post.category}</span>}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Pending Comments */}
          <Card className="rounded-none border-none shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-agri-dark flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-agri-yellow" /> Pending Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingComments.length === 0 ? (
                <p className="text-sm text-muted-foreground">No pending comments.</p>
              ) : (
                pendingComments.map((comment) => (
                  <div key={comment.id} className="border-b border-border pb-2 last:border-0 last:pb-0">
                    <p className="text-sm font-medium text-agri-dark">{comment.author_name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{comment.content}</p>
                  </div>
                ))
              )}
              {pendingComments.length > 0 && (
                <Button variant="outline" size="sm" className="rounded-none w-full mt-2" onClick={() => navigate("/admin/comments")}>
                  Review All Comments
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
