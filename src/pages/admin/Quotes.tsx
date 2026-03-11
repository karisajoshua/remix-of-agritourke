import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { format } from "date-fns";
import { Mail, Phone, Users, Calendar, MessageSquare, Trash2 } from "lucide-react";

const STATUS_OPTIONS = ["pending", "contacted", "completed"] as const;
type QuoteStatus = typeof STATUS_OPTIONS[number];

interface QuoteRequest {
  id: string;
  tour_id: string | null;
  tour_title: string;
  name: string;
  email: string;
  phone: string | null;
  group_size: string | null;
  preferred_dates: string | null;
  message: string | null;
  status: string;
  created_at: string | null;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  contacted: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

export default function Quotes() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const queryClient = useQueryClient();

  const { data: quotes = [], isLoading } = useQuery({
    queryKey: ["admin-quotes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as QuoteRequest[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("quote_requests").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-quotes"] });
      toast.success("Status updated");
    },
    onError: () => toast.error("Failed to update status"),
  });

  const deleteQuote = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("quote_requests").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-quotes"] });
      toast.success("Quote request deleted");
    },
    onError: () => toast.error("Failed to delete"),
  });

  const filtered = filterStatus === "all" ? quotes : quotes.filter(q => q.status === filterStatus);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-agri-dark">Quote Requests</h2>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              className="rounded-none"
              onClick={() => setFilterStatus("all")}
            >
              All ({quotes.length})
            </Button>
            {STATUS_OPTIONS.map(s => {
              const count = quotes.filter(q => q.status === s).length;
              return (
                <Button
                  key={s}
                  variant={filterStatus === s ? "default" : "outline"}
                  size="sm"
                  className="rounded-none capitalize"
                  onClick={() => setFilterStatus(s)}
                >
                  {s} ({count})
                </Button>
              );
            })}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-agri-green" />
          </div>
        ) : filtered.length === 0 ? (
          <Card className="rounded-none border-none shadow-sm">
            <CardContent className="py-12 text-center text-muted-foreground">
              No quote requests found.
            </CardContent>
          </Card>
        ) : (
          <Card className="rounded-none border-none shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Tour</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(quote => (
                    <TableRow key={quote.id}>
                      <TableCell className="text-sm whitespace-nowrap">
                        {quote.created_at ? format(new Date(quote.created_at), "MMM d, yyyy") : "—"}
                      </TableCell>
                      <TableCell className="font-medium">{quote.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <a href={`mailto:${quote.email}`} className="text-agri-teal hover:underline">{quote.email}</a>
                          </div>
                          {quote.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <span>{quote.phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-agri-dark">{quote.tour_title}</TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          {quote.group_size && (
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" /> {quote.group_size}
                            </div>
                          )}
                          {quote.preferred_dates && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {quote.preferred_dates}
                            </div>
                          )}
                          {quote.message && (
                            <div className="flex items-start gap-1">
                              <MessageSquare className="h-3 w-3 mt-0.5" />
                              <span className="line-clamp-2">{quote.message}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <select
                          value={quote.status}
                          onChange={(e) => updateStatus.mutate({ id: quote.id, status: e.target.value })}
                          className={`text-xs font-medium px-2 py-1 rounded border-none cursor-pointer ${statusColors[quote.status] || ""}`}
                        >
                          {STATUS_OPTIONS.map(s => (
                            <option key={s} value={s} className="capitalize">{s}</option>
                          ))}
                        </select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (confirm("Delete this quote request?")) {
                              deleteQuote.mutate(quote.id);
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
