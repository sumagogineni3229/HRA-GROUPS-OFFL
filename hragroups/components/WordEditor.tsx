"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  Sparkles,
  Subscript,
  Superscript,
  Highlighter,
  Minus,
  CheckSquare,
  Pilcrow,
  Image as ImageIcon,
  Upload,
  Link2,
  X,
} from "lucide-react";

interface WordEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function WordEditor({
  value,
  onChange,
  placeholder = "Write your blog post content here... Use the toolbar above for Microsoft Word-like formatting.",
  minHeight = "380px",
}: WordEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const savedSelectionRef = useRef<Range | null>(null);
  const isUpdatingRef = useRef(false);

  // Inline Image Modal State
  const [showImageModal, setShowImageModal] = useState(false);
  const [inlineImageUrl, setInlineImageUrl] = useState("");
  const [inlineImageCaption, setInlineImageCaption] = useState("");
  const [inlineImageAlt, setInlineImageAlt] = useState("");
  const [uploadingInline, setUploadingInline] = useState(false);

  // Sync incoming value to editor content if changed externally
  useEffect(() => {
    if (editorRef.current && !isUpdatingRef.current) {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value]);

  // Save current selection range so clicking toolbar buttons doesn't lose focus
  const saveSelection = () => {
    if (typeof window === "undefined") return;
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && editorRef.current) {
      const range = sel.getRangeAt(0);
      if (editorRef.current.contains(range.commonAncestorContainer)) {
        savedSelectionRef.current = range.cloneRange();
      }
    }
  };

  // Restore cursor selection before executing command
  const restoreSelection = () => {
    if (typeof window === "undefined") return;
    const sel = window.getSelection();
    if (savedSelectionRef.current && sel && editorRef.current) {
      sel.removeAllRanges();
      sel.addRange(savedSelectionRef.current);
    } else if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const triggerChange = () => {
    if (editorRef.current) {
      isUpdatingRef.current = true;
      onChange(editorRef.current.innerHTML);
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 50);
    }
  };

  // Robust formatBlock implementation supporting cross-browser h1, h2, h3, p
  const formatHeading = (tag: "h1" | "h2" | "h3" | "p") => {
    restoreSelection();
    if (typeof document !== "undefined") {
      const success = document.execCommand("formatBlock", false, tag);
      if (!success) {
        document.execCommand("formatBlock", false, `<${tag}>`);
      }
      triggerChange();
    }
  };

  const exec = (command: string, val: string | undefined = undefined) => {
    restoreSelection();
    if (typeof document !== "undefined") {
      document.execCommand(command, false, val);
      triggerChange();
    }
  };

  const handleInput = () => {
    saveSelection();
    triggerChange();
  };

  const addLink = () => {
    saveSelection();
    const url = prompt("Enter hyperlink URL (e.g. https://hragroups.com):");
    if (url) {
      exec("createLink", url);
    }
  };

  // Insert image HTML snippet directly into Word editor canvas
  const insertImageHtml = (src: string, caption: string = "", alt: string = "Blog illustration") => {
    restoreSelection();
    const captionHtml = caption
      ? `<figcaption style="text-align: center; font-size: 0.825rem; color: #64748b; margin-top: 6px; font-style: italic;">${caption}</figcaption>`
      : "";

    const imageBlock = `
      <figure class="word-image-figure" style="margin: 20px 0; text-align: center; max-width: 100%;">
        <img src="${src}" alt="${alt || 'Blog illustration'}" style="width: 100%; max-height: 480px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; display: block; margin: 0 auto;" />
        ${captionHtml}
      </figure>
      <p></p>
    `;

    if (typeof document !== "undefined") {
      document.execCommand("insertHTML", false, imageBlock);
      triggerChange();
    }
  };

  // Handle direct file upload from PC
  const handleInlineFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadingInline(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/blog/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success && data.url) {
          insertImageHtml(data.url, inlineImageCaption, file.name);
          setShowImageModal(false);
          setInlineImageUrl("");
          setInlineImageCaption("");
        } else {
          // Fallback to local blob preview
          const localUrl = URL.createObjectURL(file);
          insertImageHtml(localUrl, inlineImageCaption, file.name);
          setShowImageModal(false);
        }
      } catch (err) {
        const localUrl = URL.createObjectURL(file);
        insertImageHtml(localUrl, inlineImageCaption, file.name);
        setShowImageModal(false);
      } finally {
        setUploadingInline(false);
      }
    }
  };

  const handleConfirmImageUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineImageUrl.trim()) return;
    insertImageHtml(inlineImageUrl.trim(), inlineImageCaption, inlineImageAlt);
    setShowImageModal(false);
    setInlineImageUrl("");
    setInlineImageCaption("");
    setInlineImageAlt("");
  };

  const insertTemplateBlock = (type: string) => {
    restoreSelection();
    let snippet = "";
    if (type === "callout") {
      snippet = `
        <div class="word-callout" style="background: rgba(0, 82, 204, 0.08); border-left: 4px solid #0052cc; padding: 14px 18px; border-radius: 8px; margin: 18px 0; color: #1e293b;">
          <strong style="color: #0052cc;">Key Insight:</strong> Enter notable industry statistic or key takeaway here.
        </div>
      `;
    } else if (type === "quote") {
      snippet = `
        <blockquote class="word-quote" style="border-left: 4px solid #3866f1; margin: 18px 0; padding-left: 16px; color: #475569; font-size: 1.1rem; font-style: italic;">
          "Empowering enterprise modernization with resilient cloud and AI architectures."
        </blockquote>
      `;
    } else if (type === "section") {
      snippet = `
        <h2 style="color: #0f172a; font-size: 1.5rem; font-weight: 800; margin-top: 24px; margin-bottom: 10px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
          Section Heading
        </h2>
        <p>Elaborate on the key principles, engineering methodologies, and real-world deployment outcomes.</p>
      `;
    }

    if (snippet && typeof document !== "undefined") {
      document.execCommand("insertHTML", false, snippet);
      triggerChange();
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs focus-within:border-[#0052cc] focus-within:ring-2 focus-within:ring-blue-100 transition-all relative">
      {/* WORD TOOLBAR */}
      <div
        className="bg-slate-50/95 border-b border-slate-200/90 p-2 flex flex-wrap items-center gap-1 text-slate-700 select-none sticky top-0 z-20 backdrop-blur-xs"
        onMouseDown={(e) => {
          if ((e.target as HTMLElement).closest("button")) {
            e.preventDefault();
          }
        }}
      >
        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-slate-300">
          <button
            type="button"
            onClick={() => exec("undo")}
            className="p-1.5 rounded-lg hover:bg-slate-200 active:bg-slate-300 text-slate-600 transition-colors cursor-pointer"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("redo")}
            className="p-1.5 rounded-lg hover:bg-slate-200 active:bg-slate-300 text-slate-600 transition-colors cursor-pointer"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {/* Headings & Paragraph formatting buttons */}
        <div className="flex items-center gap-1 px-2 border-r border-slate-300">
          <button
            type="button"
            onClick={() => formatHeading("h1")}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:text-[#0052cc] text-slate-800 font-extrabold text-xs transition-all flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
            title="Format as Heading 1 (Large Title)"
          >
            <Heading1 className="w-4 h-4 text-[#0052cc]" />
            <span>H1</span>
          </button>
          <button
            type="button"
            onClick={() => formatHeading("h2")}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:text-[#0052cc] text-slate-800 font-bold text-xs transition-all flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
            title="Format as Heading 2 (Section Title)"
          >
            <Heading2 className="w-4 h-4 text-[#0052cc]" />
            <span>H2</span>
          </button>
          <button
            type="button"
            onClick={() => formatHeading("h3")}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:text-[#0052cc] text-slate-800 font-bold text-xs transition-all flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
            title="Format as Heading 3 (Sub-heading)"
          >
            <Heading3 className="w-4 h-4 text-[#0052cc]" />
            <span>H3</span>
          </button>
          <button
            type="button"
            onClick={() => formatHeading("p")}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-all flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
            title="Format as Normal Paragraph Text"
          >
            <Pilcrow className="w-3.5 h-3.5 text-slate-500" />
            <span>Paragraph</span>
          </button>
        </div>

        {/* Text Styling (Bold, Italic, Underline, Strikethrough, Highlight) */}
        <div className="flex items-center gap-0.5 px-2 border-r border-slate-300">
          <button
            type="button"
            onClick={() => exec("bold")}
            className="p-1.5 rounded-lg hover:bg-slate-200 active:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("italic")}
            className="p-1.5 rounded-lg hover:bg-slate-200 active:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("underline")}
            className="p-1.5 rounded-lg hover:bg-slate-200 active:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
            title="Underline (Ctrl+U)"
          >
            <Underline className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("strikeThrough")}
            className="p-1.5 rounded-lg hover:bg-slate-200 active:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("hiliteColor", "#fef08a")}
            className="p-1.5 rounded-lg hover:bg-yellow-100 text-yellow-700 transition-colors cursor-pointer"
            title="Highlight Text (Yellow)"
          >
            <Highlighter className="w-4 h-4" />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-0.5 px-2 border-r border-slate-300">
          <button
            type="button"
            onClick={() => exec("justifyLeft")}
            className="p-1.5 rounded-lg hover:bg-slate-200 active:bg-slate-300 text-slate-600 transition-colors cursor-pointer"
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("justifyCenter")}
            className="p-1.5 rounded-lg hover:bg-slate-200 active:bg-slate-300 text-slate-600 transition-colors cursor-pointer"
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("justifyRight")}
            className="p-1.5 rounded-lg hover:bg-slate-200 active:bg-slate-300 text-slate-600 transition-colors cursor-pointer"
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("justifyFull")}
            className="p-1.5 rounded-lg hover:bg-slate-200 active:bg-slate-300 text-slate-600 transition-colors cursor-pointer"
            title="Justify"
          >
            <AlignJustify className="w-4 h-4" />
          </button>
        </div>

        {/* Lists & Quotes & Dividers */}
        <div className="flex items-center gap-0.5 px-2 border-r border-slate-300">
          <button
            type="button"
            onClick={() => exec("insertUnorderedList")}
            className="p-1.5 rounded-lg hover:bg-slate-200 active:bg-slate-300 text-slate-600 transition-colors cursor-pointer"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("insertOrderedList")}
            className="p-1.5 rounded-lg hover:bg-slate-200 active:bg-slate-300 text-slate-600 transition-colors cursor-pointer"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("formatBlock", "<blockquote>")}
            className="p-1.5 rounded-lg hover:bg-slate-200 active:bg-slate-300 text-slate-600 transition-colors cursor-pointer"
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => exec("insertHorizontalRule")}
            className="p-1.5 rounded-lg hover:bg-slate-200 active:bg-slate-300 text-slate-600 transition-colors cursor-pointer"
            title="Horizontal Divider"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={addLink}
            className="p-1.5 rounded-lg hover:bg-slate-200 active:bg-slate-300 text-blue-600 transition-colors cursor-pointer"
            title="Insert Hyperlink"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* INLINE IMAGE BUTTON */}
        <div className="flex items-center gap-0.5 px-2 border-r border-slate-300">
          <button
            type="button"
            onClick={() => {
              saveSelection();
              setShowImageModal(true);
            }}
            className="px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 hover:bg-blue-100 text-[#0052cc] font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            title="Insert Photo / Illustration into Article Body"
          >
            <ImageIcon className="w-4 h-4 text-[#0052cc]" />
            <span>+ Add Image</span>
          </button>
        </div>

        {/* Word Template Quick Blocks */}
        <div className="flex items-center gap-1.5 pl-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Snippets:
          </span>
          <button
            type="button"
            onClick={() => insertTemplateBlock("section")}
            className="px-2 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-[#0052cc] text-[11px] font-bold transition-colors cursor-pointer active:scale-95"
          >
            + Section
          </button>
          <button
            type="button"
            onClick={() => insertTemplateBlock("callout")}
            className="px-2 py-1 rounded-md bg-sky-50 hover:bg-sky-100 text-sky-800 text-[11px] font-bold transition-colors cursor-pointer active:scale-95"
          >
            + Callout Box
          </button>
          <button
            type="button"
            onClick={() => insertTemplateBlock("quote")}
            className="px-2 py-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold transition-colors cursor-pointer active:scale-95"
          >
            + Pull Quote
          </button>
        </div>
      </div>

      {/* EDITABLE WORD CANVAS WITH EXPLICIT TYPOGRAPHY STYLES */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        onBlur={saveSelection}
        style={{ minHeight }}
        data-placeholder={placeholder}
        className="word-editor-canvas p-6 text-slate-800 text-base leading-relaxed outline-none focus:outline-none overflow-y-auto max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
      />

      {/* INLINE IMAGE INSERTION MODAL */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 text-[#0052cc]">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#172947]">
                    Insert Image into Article
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload from your device or paste an image URL
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            {/* Option 1: File Upload */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Option A: Upload Image File
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-[#0052cc] rounded-2xl p-5 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-blue-50/40"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleInlineFileUpload}
                  className="hidden"
                />
                <Upload className="w-7 h-7 text-slate-400 mx-auto mb-1.5" />
                <span className="text-xs font-bold text-slate-700 block">
                  {uploadingInline ? "Uploading & inserting..." : "Click to select image from computer"}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Supports JPG, PNG, WebP, GIF, SVG
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] font-bold text-slate-400 uppercase">OR</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Option 2: Image URL Container (Div instead of nested form) */}
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Option B: Image Web URL
                </label>
                <div className="relative">
                  <Link2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={inlineImageUrl}
                    onChange={(e) => setInlineImageUrl(e.target.value)}
                    placeholder="https://example.com/diagram-illustration.png"
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleConfirmImageUrl(e);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Image Caption (Optional)
                </label>
                <input
                  type="text"
                  value={inlineImageCaption}
                  onChange={(e) => setInlineImageCaption(e.target.value)}
                  placeholder="e.g. Figure 1: Cloud Architecture Diagram"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleConfirmImageUrl(e);
                    }
                  }}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowImageModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmImageUrl}
                  disabled={!inlineImageUrl.trim()}
                  className="px-5 py-2 rounded-xl bg-[#0052cc] hover:bg-[#003da8] text-white text-xs font-bold transition-all disabled:opacity-40 cursor-pointer"
                >
                  Insert Image URL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
