import { useRef, useCallback, useEffect, useState } from "react";
import {
  Bold, Italic, Underline, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Link, Unlink, RemoveFormatting,
  Undo, Redo, Pilcrow, Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const ToolBtn = ({
  icon: Icon, label, onAction, active,
}: {
  icon: React.ElementType; label: string; onAction: () => void; active?: boolean;
}) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    className={`h-8 w-8 p-0 rounded-none hover:bg-agri-green/10 ${active ? "bg-agri-green/20 text-agri-green" : ""}`}
    onClick={onAction}
    title={label}
  >
    <Icon className="h-4 w-4" />
  </Button>
);

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const savedRange = useRef<Range | null>(null);

  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
    isInternalChange.current = false;
  }, [value]);

  const exec = useCallback((command: string, val?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, val);
    isInternalChange.current = true;
    onChange(editorRef.current?.innerHTML || "");
  }, [onChange]);

  const handleInput = useCallback(() => {
    isInternalChange.current = true;
    onChange(editorRef.current?.innerHTML || "");
  }, [onChange]);

  // Save current selection range
  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedRange.current = sel.getRangeAt(0).cloneRange();
    }
  }, []);

  // Restore saved selection range
  const restoreSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && savedRange.current) {
      sel.removeAllRanges();
      sel.addRange(savedRange.current);
    }
  }, []);

  const openLinkInput = useCallback(() => {
    saveSelection();
    setLinkUrl("");
    setShowLinkInput(true);
  }, [saveSelection]);

  const applyLink = useCallback(() => {
    if (!linkUrl.trim()) {
      setShowLinkInput(false);
      return;
    }
    restoreSelection();
    editorRef.current?.focus();
    document.execCommand("createLink", false, linkUrl.trim());
    isInternalChange.current = true;
    onChange(editorRef.current?.innerHTML || "");
    setShowLinkInput(false);
    setLinkUrl("");
  }, [linkUrl, restoreSelection, onChange]);

  const insertImage = useCallback(() => {
    saveSelection();
    const url = prompt("Enter image URL:");
    if (url) {
      restoreSelection();
      editorRef.current?.focus();
      document.execCommand("insertImage", false, url);
      isInternalChange.current = true;
      onChange(editorRef.current?.innerHTML || "");
    }
  }, [saveSelection, restoreSelection, onChange]);

  return (
    <div className="border border-input rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-0.5 border-b border-input p-1 bg-agri-grey">
        <ToolBtn icon={Pilcrow} label="Normal Text" onAction={() => exec("formatBlock", "p")} />
        <ToolBtn icon={Heading1} label="Heading 1" onAction={() => exec("formatBlock", "h1")} />
        <ToolBtn icon={Heading2} label="Heading 2" onAction={() => exec("formatBlock", "h2")} />
        <ToolBtn icon={Heading3} label="Heading 3" onAction={() => exec("formatBlock", "h3")} />
        <div className="w-px bg-border mx-1 self-stretch" />
        <ToolBtn icon={Bold} label="Bold" onAction={() => exec("bold")} />
        <ToolBtn icon={Italic} label="Italic" onAction={() => exec("italic")} />
        <ToolBtn icon={Underline} label="Underline" onAction={() => exec("underline")} />
        <div className="w-px bg-border mx-1 self-stretch" />
        <ToolBtn icon={List} label="Bullet List" onAction={() => exec("insertUnorderedList")} />
        <ToolBtn icon={ListOrdered} label="Numbered List" onAction={() => exec("insertOrderedList")} />
        <ToolBtn icon={Quote} label="Blockquote" onAction={() => exec("formatBlock", "blockquote")} />
        <div className="w-px bg-border mx-1 self-stretch" />
        <ToolBtn icon={Link} label="Insert Link" onAction={openLinkInput} />
        <ToolBtn icon={Unlink} label="Remove Link" onAction={() => exec("unlink")} />
        <ToolBtn icon={Image} label="Insert Image" onAction={insertImage} />
        <div className="w-px bg-border mx-1 self-stretch" />
        <ToolBtn icon={Undo} label="Undo" onAction={() => exec("undo")} />
        <ToolBtn icon={Redo} label="Redo" onAction={() => exec("redo")} />
        <ToolBtn icon={RemoveFormatting} label="Clear Formatting" onAction={() => exec("removeFormat")} />
      </div>

      {/* Inline Link Input */}
      {showLinkInput && (
        <div className="flex items-center gap-2 p-2 border-b border-input bg-muted/50">
          <Input
            type="url"
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { e.preventDefault(); applyLink(); }
              if (e.key === "Escape") setShowLinkInput(false);
            }}
            className="h-8 text-sm flex-1"
            autoFocus
          />
          <Button type="button" size="sm" className="h-8 bg-agri-green hover:bg-agri-green/90 text-white" onClick={applyLink}>
            Apply
          </Button>
          <Button type="button" size="sm" variant="ghost" className="h-8" onClick={() => setShowLinkInput(false)}>
            Cancel
          </Button>
        </div>
      )}

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[250px] p-4 text-sm outline-none prose prose-sm max-w-none
          [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3
          [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-2
          [&_h3]:text-lg [&_h3]:font-medium [&_h3]:mb-2
          [&_p]:mb-2 [&_blockquote]:border-l-4 [&_blockquote]:border-agri-green [&_blockquote]:pl-4 [&_blockquote]:italic
          [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
          [&_a]:text-agri-teal [&_a]:underline
          [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-md [&_img]:my-2"
        onInput={handleInput}
        suppressContentEditableWarning
      />
    </div>
  );
}
