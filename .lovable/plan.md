

## Plan: Revamp Admin Dashboard and Add Rich Text Blog Editor

### Part 1: Admin Dashboard Redesign

The current dashboard is minimal -- just 3 stat cards. We'll make it more engaging and informative while keeping the sharp-edged, solid-color design.

**Changes to `src/pages/admin/Dashboard.tsx`:**

- Add a welcome banner with the current date and a motivational greeting
- Redesign stat cards with colored left borders and larger icons
- Add a "Recent Activity" section showing the latest 5 blog posts and comments
- Add quick-action buttons (New Tour, New Blog Post, Upload Photo)
- Fetch recent blog posts and pending comments to display in activity feed
- Use the brand palette: agri-green, agri-teal, agri-dark, agri-yellow

**Changes to `src/components/AdminLayout.tsx`:**

- Add a subtle brand accent to the header (colored top border or left accent)
- Improve the header with a breadcrumb-style page title

### Part 2: Rich Text Blog Editor (No HTML Code Required)

Replace the plain textarea with a toolbar-based rich text editor so admins can write content naturally -- adding headings, bold/italic text, paragraph breaks -- without touching any code.

**Approach:** Build a custom toolbar-based editor using a `contentEditable` div. This avoids adding heavy dependencies while giving admins a familiar word-processor-like experience.

**Create `src/components/admin/RichTextEditor.tsx`:**

- A `contentEditable` div with a formatting toolbar above it
- Toolbar buttons for:
  - **Heading 1, Heading 2, Heading 3** -- section titles
  - **Bold, Italic, Underline** -- text formatting
  - **Bullet List, Numbered List** -- lists
  - **Quote** -- blockquotes
  - **Link** -- insert hyperlinks
  - **Paragraph spacing** -- clear formatting / add paragraph breaks
- Uses `document.execCommand()` for formatting (widely supported, simple)
- Outputs clean HTML that works with the existing `sanitizeHtml` + `dangerouslySetInnerHTML` rendering
- When editing an existing post, loads the existing HTML content into the editor
- Styled to look like a proper writing area with a visible toolbar

**Update `src/components/admin/BlogPostForm.tsx`:**

- Replace the content `<Textarea>` with the new `<RichTextEditor>` component
- Remove the "(HTML supported)" label -- the form now feels like a normal text editor
- The editor outputs HTML behind the scenes but the admin never sees it
- Update the form's `setValue` integration to work with the editor's `onChange`

### Technical Details

**Files to create:**
| File | Purpose |
|------|---------|
| `src/components/admin/RichTextEditor.tsx` | Toolbar-based rich text editor component |

**Files to modify:**
| File | Changes |
|------|---------|
| `src/pages/admin/Dashboard.tsx` | Complete redesign with welcome banner, improved stat cards, recent activity, quick actions |
| `src/components/admin/BlogPostForm.tsx` | Replace textarea with RichTextEditor for content field |

**No new dependencies needed** -- the rich text editor uses native browser APIs (`contentEditable` + `execCommand`).

