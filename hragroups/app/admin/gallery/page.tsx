"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Image as GalleryIcon,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Upload,
  Link2,
  Tag,
  Layers,
  Search,
  RefreshCw,
  Eye,
} from "lucide-react";

interface GalleryMediaItem {
  id: string;
  title: string;
  desc?: string | null;
  src: string;
  category: string;
  tag?: string | null;
  createdAt: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [previewModalItem, setPreviewModalItem] = useState<GalleryMediaItem | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Awards & Recognition");
  const [tag, setTag] = useState("Leadership Event");
  const [uploadType, setUploadType] = useState<"url" | "file">("url");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [filterCategory, setFilterCategory] = useState("All");

  const loadGalleryItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success) {
        setItems(data.items || []);
      }
    } catch (err) {
      console.error("Error loading gallery items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a media title");
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("category", category);
      formData.append("tag", tag);

      if (uploadType === "file" && file) {
        formData.append("file", file);
      } else if (uploadType === "url" && imageUrl) {
        formData.append("imageUrl", imageUrl);
      }

      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: "success", text: "Media photo successfully added to gallery!" });
        setTitle("");
        setDesc("");
        setImageUrl("");
        setFile(null);
        setPreviewUrl(null);
        setShowModal(false);
        loadGalleryItems();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to add media." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error occurred." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media item?")) return;

    try {
      const res = await fetch("/api/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        setMessage({ type: "success", text: "Media photo removed successfully." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to delete item." });
    }
  };

  const filteredItems = items.filter((item) => {
    return filterCategory === "All" || item.category === filterCategory;
  });

  return (
    <div className="space-y-8 max-w-[1680px] mx-auto font-sans pb-16">
      {/* Header Banner */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052cc] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Media &amp; Visual Showcase</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172947]">
            Gallery &amp; Event Media Manager
          </h1>
          <p className="text-slate-500 text-sm mt-1 max-w-2xl">
            Upload new event highlights, leadership awards, convocation photos, and campus media while keeping all 19 original gallery photos intact.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/gallery"
            target="_blank"
            className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-xs"
          >
            <span>View Live Gallery</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => {
              setTitle("");
              setDesc("");
              setCategory("Awards & Recognition");
              setTag("Leadership Event");
              setImageUrl("");
              setFile(null);
              setPreviewUrl(null);
              setShowModal(true);
            }}
            className="px-5 py-2.5 rounded-2xl bg-[#0052cc] hover:bg-[#003da8] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Media</span>
          </button>
        </div>
      </div>

      {/* Alert Messages */}
      {message && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-sm ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {message.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span className="font-semibold">{message.text}</span>
          </div>
          <button
            onClick={() => setMessage(null)}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter and Stats Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <span>All 19 original gallery photos are preserved + {items.length} dynamic additions</span>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 bg-white focus:outline-none focus:border-[#0052cc]"
          >
            <option value="All">All Categories</option>
            <option value="Awards & Recognition">Awards & Recognition</option>
            <option value="Leadership & Vision">Leadership & Vision</option>
            <option value="Team & Culture">Team & Culture</option>
            <option value="Office & Infrastructure">Office & Infrastructure</option>
            <option value="Campus & Student Moments">Campus & Student Moments</option>
          </select>

          <button
            onClick={loadGalleryItems}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Dynamic Uploads List */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-[#172947]">
              Database Uploaded Media ({filteredItems.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Images added through this panel show up live alongside existing gallery photos
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-sm text-slate-400 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-[#0052cc]" />
            <span>Loading gallery photos...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <GalleryIcon className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="text-sm font-bold text-slate-700">No database photos uploaded yet</div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              All 19 original ceremony and leadership photos are actively displayed on the public gallery. Click &quot;Upload Media&quot; above to add new ones.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-extrabold text-blue-700 shadow-xs uppercase">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      {item.tag && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-blue-600">{item.tag}</span>
                        </>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-[#172947] line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    {item.desc && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <button
                    onClick={() => setPreviewModalItem(item)}
                    className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Delete Media"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* UPLOAD MEDIA MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto my-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-[#172947]">Add Photo to Gallery</h3>
                <p className="text-xs text-slate-500">Upload high-resolution event media or paste image URL</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Media Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Photo / Event Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Annual Tech Symposium & Awards 2026"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Description / Story
                </label>
                <textarea
                  rows={3}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Details about the event, attendees, or leadership recognition..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc] resize-none"
                />
              </div>

              {/* Category & Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc] bg-white"
                  >
                    <option value="Awards & Recognition">Awards & Recognition</option>
                    <option value="Leadership & Vision">Leadership & Vision</option>
                    <option value="Team & Culture">Team & Culture</option>
                    <option value="Office & Infrastructure">Office & Infrastructure</option>
                    <option value="Campus & Student Moments">Campus & Student Moments</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Badge Tag</label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="e.g. Keynote, Leadership Award"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                  />
                </div>
              </div>

              {/* Image Source Selection */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-700 block">Photo Source:</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setUploadType("url")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      uploadType === "url"
                        ? "bg-blue-50 border-blue-300 text-[#0052cc]"
                        : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    <span>Paste Image URL</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadType("file")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                      uploadType === "file"
                        ? "bg-blue-50 border-blue-300 text-[#0052cc]"
                        : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload File</span>
                  </button>
                </div>

                {uploadType === "url" ? (
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setPreviewUrl(e.target.value);
                    }}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                  />
                ) : (
                  <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50 relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <span className="text-xs font-bold text-slate-700 block">
                      {file ? file.name : "Click to select high-res photo"}
                    </span>
                  </div>
                )}

                {previewUrl && (
                  <div className="relative aspect-[16/9] max-h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 mt-2">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#0052cc] hover:bg-[#0041a3] text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {saving ? "Uploading..." : "Add to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewModalItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl space-y-4">
            <div className="relative aspect-[16/9] bg-slate-900">
              <img
                src={previewModalItem.src}
                alt={previewModalItem.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setPreviewModalItem(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-2">
              <span className="text-xs font-bold text-[#0052cc] uppercase">
                {previewModalItem.category}
              </span>
              <h3 className="text-xl font-bold text-[#172947]">{previewModalItem.title}</h3>
              {previewModalItem.desc && (
                <p className="text-sm text-slate-600 leading-relaxed">{previewModalItem.desc}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
