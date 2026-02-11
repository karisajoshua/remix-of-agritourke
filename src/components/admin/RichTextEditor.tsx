import { useRef, useCallback, useEffect } from "react";
import {
  Bold, Italic, Underline, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Link, RemoveFormatting,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const ToolBtn = ({ icon: Icon, label, onAction }: { icon: React.ElementType; label: string; onAction: () => void }) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    className="h-8 w-8 p-0 rounded-none hover:bg-agri-green/10"
    onClick={onAction}
    title={label}
  >
    <Icon className="h-4 w-4" />
  </Button>
);

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

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

  const insertLink = useCallback(() => {
    const url = prompt("Enter URL:");
    if (url) exec("createLink", url);
  }, [exec]);

  return (
    <div className="border border-input rounded-none">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-0.5 border-b border-input p-1 bg-agri-grey">
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
        <ToolBtn icon={Link} label="Insert Link" onAction={insertLink} />
        <ToolBtn icon={RemoveFormatting} label="Clear Formatting" onAction={() => exec("removeFormat")} />
      </div>

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
          [&_a]:text-agri-teal [&_a]:underline"
        onInput={handleInput}
        suppressContentEditableWarning
      />
    </div>
  );
}
