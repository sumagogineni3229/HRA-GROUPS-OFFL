"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Newspaper,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Upload,
  Link2,
} from "lucide-react";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Blogs");
  const [service, setService] = useState("IT Managed Services");
  const [industry, setIndustry] = useState("Government");
  const [readTime, setReadTime] = useState("5 min read");
  const [featured, setFeatured] = useState(false);

  // Image upload
  const [uploadType, setUploadType] = useState<"file" | "url">("url");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublishing(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("excerpt", excerpt);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("service", service);
      formData.append("industry", industry);
      formData.append("readTime", readTime);
      formData.append("featured", String(featured));

      if (uploadType === "file" && file) {
        formData.append("file", file);
      } else if (uploadType === "url" && imageUrl) {
        formData.append("imageUrl", imageUrl);
      }

      const res = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: "success", text: "Article successfully published to Blog!" });
        // Reset form
        setTitle("");
        setExcerpt("");
        setContent("");
        setImageUrl("");
        setFile(null);
        setPreviewUrl(null);
        setShowModal(false);
        loadPosts();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to publish article." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error occurred." });
    } finally {
      setPublishing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const res = await fetch("/api/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto font-sans">
      {/* Header Banner */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-[#0052cc] uppercase tracking-wider block">
            Content Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172947] mt-1">
            Blog & Insights Manager
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Write, publish, and manage tech blog posts. Articles instantly show up on the public blog page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/services/blog"
            target="_blank"
            className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <span>View Public Blog</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-[#0052cc] hover:bg-[#0041a3] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md shadow-blue-500/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Post</span>
          </button>
        </div>
      </div>

      {/* Success/Error Alerts */}
      {message && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 text-sm ${
            message.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-[#172947]">Create & Publish Blog Post</h3>
                <p className="text-xs text-slate-500">Enter article details to publish to the HRA Groups website</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePublish} className="space-y-4">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Article Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Next-Generation Cloud Migration Frameworks"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                />
              </div>

              {/* Excerpt / Summary */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Short Excerpt / Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief 1-2 sentence overview of this article..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc] resize-none"
                />
              </div>

              {/* Service & Industry Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Service Focus</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc] bg-white"
                  >
                    <option value="IT Managed Services">IT Managed Services</option>
                    <option value="Enterprise Data & AI">AI & Technologies</option>
                    <option value="ServiceNow">ServiceNow & Workflow</option>
                    <option value="Enterprise Asset Management">Asset Management & IoT</option>
                    <option value="Cybersecurity & Cloud">Cybersecurity & Cloud</option>
                    <option value="Content Marketing & SEO">Content Marketing & SEO</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Industry</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc] bg-white"
                  >
                    <option value="Government">Government</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Banking, Financial Services & Insurance">Banking & Financial</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Public Safety">Public Safety</option>
                    <option value="Manufacturing">Manufacturing</option>
                  </select>
                </div>
              </div>

              {/* Read Time & Featured Switch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0052cc] accent-[#0052cc]"
                    />
                    <span>Highlight as Featured Article</span>
                  </label>
                </div>
              </div>

              {/* Image Source Selection */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-700 block">Cover Image:</label>
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
                    placeholder="https://example.com/cover-image.jpg"
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
                      {file ? file.name : "Click to select cover image"}
                    </span>
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
                  disabled={publishing}
                  className="px-6 py-2.5 rounded-xl bg-[#0052cc] hover:bg-[#0041a3] text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center gap-2"
                >
                  {publishing ? "Publishing..." : "Publish Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Published Posts Grid */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-[#172947]">
              Database Published Articles ({posts.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Articles created via this panel (displayed in real-time alongside all original blog articles)
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-slate-400">Loading published blogs...</div>
        ) : posts.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Newspaper className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="text-sm font-bold text-slate-700">No dynamic blog posts created yet</div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Click &quot;Write New Post&quot; above to publish your first article. It will automatically show up at the top of the public website blog.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-slate-100 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-extrabold text-blue-700 shadow-xs uppercase">
                      {post.service}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h4 className="font-bold text-base text-[#172947] line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{post.excerpt}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <span className="text-xs font-semibold text-slate-500">{post.industry}</span>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Delete Post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
