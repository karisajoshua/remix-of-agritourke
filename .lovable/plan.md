

## Plan: Legal Documents, Cookie Consent & Blog Editor Fix

### Part 1: Upload Legal PDFs & Update Footer

Upload all 4 PDF documents to the project's `public/legal/` directory so they're downloadable, then update the footer links.

**Files:**
- `Privacy_Policy.pdf` → `public/legal/Privacy_Policy.pdf`
- `Terms_of_Service.pdf` → `public/legal/Terms_of_Service.pdf`
- `Image_Media_Consent_Form.pdf` → `public/legal/Image_Media_Consent_Form.pdf`
- `Privacy_Opt-Out_Form.pdf` → `public/legal/Privacy_Opt-Out_Form.pdf`

**Modify `src/components/Footer.tsx`:**
- Update "Privacy Policy" link → `/legal/Privacy_Policy.pdf` with `download` attribute
- Update "Terms of Service" link → `/legal/Terms_of_Service.pdf`
- Update "Image Consent Form" link → `/legal/Image_Media_Consent_Form.pdf` (replace old Supabase URL)
- Update "Data Withdrawal Form" → "Privacy Opt-Out Form" linking to `/legal/Privacy_Opt-Out_Form.pdf`
- All links open in new tab with download option

### Part 2: Cookie Consent Banner

**Create `src/components/CookieConsent.tsx`:**
- A bottom-fixed banner that appears on first visit
- Shows a brief message about cookie usage
- Two buttons: "Accept All" and "Manage Preferences"
- "Manage Preferences" opens a dialog with:
  - **Strictly Necessary Cookies** — always on, toggle disabled, with explanation
  - **Analytics Cookies** — optional toggle (for Vercel Analytics)
  - **Marketing Cookies** — optional toggle
- Saves preferences to `localStorage` so it doesn't reappear
- Styled with the brand palette (agri-dark background, agri-green accent)

**Modify `src/pages/Index.tsx` (or `App.tsx`):**
- Add `<CookieConsent />` component at root level so it appears on every page

### Part 3: Fix Blog Rich Text Editor

The editor already has a Link button and toolbar — the issue is likely that `insertLink` uses `prompt()` which can be blocked by browsers, and the editor may lose focus/selection before the command executes.

**Rewrite `src/components/admin/RichTextEditor.tsx`:**
- Replace `prompt()` with an inline URL input bar that appears below the toolbar when "Link" is clicked
- Save the selection range before showing the input, restore it before executing `createLink`
- Add an "Unlink" button to remove links
- Add a "Normal text" / paragraph button to reset formatting back to `<p>` (so users can exit headings)
- Add `Undo` and `Redo` toolbar buttons
- Improve the editor area styling for better visual feedback (active state indicators on toolbar buttons)

### Technical Details

| File | Action |
|------|--------|
| `public/legal/*.pdf` | Copy — 4 PDF files |
| `src/components/Footer.tsx` | Modify — update legal document links |
| `src/components/CookieConsent.tsx` | Create — cookie consent banner + preferences dialog |
| `src/App.tsx` | Modify — add CookieConsent component |
| `src/components/admin/RichTextEditor.tsx` | Rewrite — fix hyperlink insertion, add undo/redo, paragraph reset |

No new dependencies needed. Cookie preferences stored in `localStorage`.

