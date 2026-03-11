import { ReactNode, useEffect, useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { LayoutDashboard, MapPin, FileText, Image, Settings, LogOut, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Tours", url: "/admin/tours", icon: MapPin },
  { title: "Blog", url: "/admin/blog", icon: FileText },
  { title: "Comments", url: "/admin/comments", icon: MessageSquare },
  { title: "Gallery", url: "/admin/gallery", icon: Image },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

function AdminSidebarContent() {
  const { state } = useSidebar();
  const location = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchPendingCount = async () => {
      const { count } = await supabase
        .from('blog_comments')
        .select('*', { count: 'exact', head: true })
        .eq('approved', false);
      setPendingCount(count || 0);
    };
    fetchPendingCount();
  }, []);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const getNavCls = (path: string) => {
    const isActive = location.pathname === path;
    return isActive ? "bg-agri-green/10 text-agri-green font-medium" : "hover:bg-muted/50";
  };

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-60"}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "hidden" : ""}>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && (
                        <span className="flex items-center gap-2">
                          {item.title}
                          {item.title === "Comments" && pendingCount > 0 && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs px-1.5 py-0.5">
                              {pendingCount}
                            </Badge>
                          )}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  {!isCollapsed && <span>Logout</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    } else if (!adminLoading && user && !isAdmin) {
      toast.error("Access denied. Admin privileges required.");
      navigate("/");
    }
  }, [user, isAdmin, authLoading, adminLoading, navigate]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-agri-green mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AdminSidebarContent />
        <main className="flex-1 overflow-auto">
          <header className="h-14 border-b bg-background flex items-center px-4">
            <SidebarTrigger />
            <h1 className="ml-4 text-lg font-semibold text-agri-dark">Agritourism CMS</h1>
          </header>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
