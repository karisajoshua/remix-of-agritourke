

## Plan: Tour Pricing, Custom Quote Requests & Admin Quote Management

### What We're Building

1. **Add a `price_starting_from` field to the `tours` table** so each tour shows a minimum price
2. **Display "Starting from KES X" on tour cards** on the Tours page
3. **Create a `quote_requests` table** to store custom quote submissions
4. **Add a "Request Custom Quote" dialog** on each tour card / detail modal where visitors fill in their details (name, email, phone, group size, preferred dates, message)
5. **Add a Quote Requests section on the admin dashboard** so the admin can see and manage incoming requests

---

### Part 1: Database Changes

**Migration 1 — Add `price_starting_from` column to `tours`:**
```sql
ALTER TABLE public.tours ADD COLUMN price_starting_from integer DEFAULT NULL;
```

**Migration 2 — Create `quote_requests` table:**
```sql
CREATE TABLE public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id uuid REFERENCES public.tours(id) ON DELETE SET NULL,
  tour_title text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  group_size text,
  preferred_dates text,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a quote request
CREATE POLICY "Anyone can submit quote requests" ON public.quote_requests
  FOR INSERT TO public WITH CHECK (true);

-- Only admins can view quote requests
CREATE POLICY "Admins can view quote requests" ON public.quote_requests
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update quote requests
CREATE POLICY "Admins can update quote requests" ON public.quote_requests
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete quote requests
CREATE POLICY "Admins can delete quote requests" ON public.quote_requests
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
```

---

### Part 2: Frontend — Tour Cards & Quote Dialog

**Modify `src/pages/Tours.tsx`:**
- Add `price_starting_from` to the Tour interface and query
- Display "Starting from KES X" on each card below the tour details
- Add a "Request Custom Quote" button alongside the existing "Explore Tour" button

**Create `src/components/QuoteRequestDialog.tsx`:**
- A dialog with fields: Name, Email, Phone, Group Size, Preferred Dates, Message
- Pre-fills the tour title
- Submits to the `quote_requests` table
- Shows a success toast on submission

**Modify `src/components/TourDetailModal.tsx`:**
- Show the starting price in the tour detail view
- Add a "Request Custom Quote" button next to "Book Now"

**Modify `src/components/Tours.tsx` (homepage tours):**
- Show "Starting from KES X" on homepage tour cards too

---

### Part 3: Admin — TourForm & Dashboard

**Modify `src/components/admin/TourForm.tsx`:**
- Add a `price_starting_from` number input field so admins can set the starting price per tour

**Modify `src/pages/admin/Dashboard.tsx`:**
- Add a stat card for pending quote requests count
- Add a "Recent Quote Requests" card showing the latest 5 requests with name, tour, and date
- Add a quick action button to view all quotes

**Create `src/pages/admin/Quotes.tsx`:**
- A full admin page listing all quote requests in a table
- Columns: Date, Name, Email, Phone, Tour, Group Size, Status
- Admin can mark requests as "contacted" or "completed"
- Filter by status (pending / contacted / completed)

**Modify `src/App.tsx`:**
- Add route for `/admin/quotes`

**Modify `src/components/AdminLayout.tsx`:**
- Add "Quotes" to the admin sidebar navigation

---

### Files Summary

| File | Action |
|------|--------|
| DB migration | Add `price_starting_from` to tours, create `quote_requests` table |
| `src/components/QuoteRequestDialog.tsx` | Create — quote request form dialog |
| `src/pages/admin/Quotes.tsx` | Create — admin quotes management page |
| `src/pages/Tours.tsx` | Modify — show price, add quote button |
| `src/components/Tours.tsx` | Modify — show price on homepage cards |
| `src/components/TourDetailModal.tsx` | Modify — show price, add quote button |
| `src/components/admin/TourForm.tsx` | Modify — add price field |
| `src/pages/admin/Dashboard.tsx` | Modify — add quotes stat & recent requests |
| `src/components/AdminLayout.tsx` | Modify — add Quotes nav link |
| `src/App.tsx` | Modify — add quotes route |

