"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Newspaper,
  Plus,
  Trash2,
  Edit3,
  Eye,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Upload,
  Link2,
  Calendar,
  User,
  Tag,
  FileText,
  Bookmark,
  Layers,
  Search,
  X,
  RefreshCw,
} from "lucide-react";
import WordEditor from "@/components/WordEditor";

interface BlogPostItem {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  service: string;
  industry: string;
  readTime: string;
  image: string;
  featured: boolean;
  createdAt: string;
  updatedAt?: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Search and Filter State
  const [filterQuery, setFilterQuery] = useState("");
  const [filterService, setFilterService] = useState("All");

  // Blog Post Template Form State
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("HRA Editorial Team");
  const [publishDate, setPublishDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Blogs");
  const [service, setService] = useState("IT Managed Services");
  const [industry, setIndustry] = useState("Government");
  const [tags, setTags] = useState("Cloud, Enterprise AI, IT Operations");
  const [readTime, setReadTime] = useState("5 min read");
  const [featured, setFeatured] = useState(false);

  // Cover Image State
  const [uploadType, setUploadType] = useState<"url" | "file">("url");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Notification Message
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blog");
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error("Failed to fetch blog posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // Auto calculate read time when content changes
  useEffect(() => {
    if (content) {
      const plainText = content.replace(/<[^>]*>/g, " ");
      const words = plainText.trim().split(/\s+/).filter(Boolean).length;
      const minutes = Math.max(1, Math.ceil(words / 200));
      setReadTime(`${minutes} min read`);
    }
  }, [content]);

  // Extract short description from content if excerpt is empty
  const handleAutoExtractExcerpt = () => {
    if (!content) {
      alert("Please write some content first to extract a description.");
      return;
    }
    const plainText = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const extracted = plainText.slice(0, 160) + (plainText.length > 160 ? "..." : "");
    setExcerpt(extracted);
  };

  // Open modal in Create mode with standard default template
  const handleOpenCreateModal = () => {
    setEditingId(null);
    setTitle("");
    setAuthor("HRA Editorial Team");
    setPublishDate(new Date().toISOString().split("T")[0]);
    setExcerpt("");
    setContent(`
      <h2>Introduction</h2>
      <p>Modern enterprises require agile digital infrastructure, resilient cybersecurity postures, and autonomous AI automation to thrive in competitive markets.</p>
      
      <h2>Core Engineering &amp; Strategic Frameworks</h2>
      <p>Implementing continuous modernization across cloud workflows accelerates deployment speeds while maintaining airtight regulatory compliance.</p>
      
      <div style="background: rgba(0, 82, 204, 0.06); border-left: 4px solid #0052cc; padding: 14px 18px; border-radius: 8px; margin: 18px 0; color: #1e293b;">
        <strong>Strategic Key Takeaway:</strong> Transitioning from legacy silos to integrated digital ecosystems reduces operational overhead by over 35%.
      </div>

      <h2>Conclusion &amp; Next Steps</h2>
      <p>Consult with HRA Groups specialists to customize enterprise solutions tailored to your organization's mission.</p>
    `);
    setCategory("Blogs");
    setService("IT Managed Services");
    setIndustry("Government");
    setTags("Cloud, Enterprise AI, IT Operations");
    setReadTime("5 min read");
    setFeatured(false);
    setImageUrl("https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/6ab591ebae44c3fb86fd1ba7_5%20Steps%20to%20Prepare%20for%20Cybersecurity%20Awareness%20Month.webp");
    setFile(null);
    setPreviewUrl(null);
    setUploadType("url");
    setShowModal(true);
  };

  // Open modal in Edit mode
  const handleOpenEditModal = (post: BlogPostItem) => {
    setEditingId(post.id);
    setTitle(post.title || "");
    setAuthor("HRA Editorial Team");
    setPublishDate(post.createdAt ? new Date(post.createdAt).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]);
    setExcerpt(post.excerpt || "");
    setContent(post.content || post.excerpt || "");
    setCategory(post.category || "Blogs");
    setService(post.service || "IT Managed Services");
    setIndustry(post.industry || "Government");
    setTags("Enterprise, Technology, Cloud");
    setReadTime(post.readTime || "5 min read");
    setFeatured(Boolean(post.featured));
    setImageUrl(post.image || "");
    setFile(null);
    setPreviewUrl(post.image || null);
    setUploadType("url");
    setShowModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  // Save (Create or Update)
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a blog title");
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const formData = new FormData();
      if (editingId) {
        formData.append("id", editingId);
      }
      formData.append("title", title);
      formData.append("excerpt", excerpt || title);
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

      const endpoint = "/api/blog";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({
          type: "success",
          text: editingId
            ? "Blog post updated successfully!"
            : "New blog post published successfully!",
        });
        setShowModal(false);
        loadPosts();
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to save blog post.",
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error occurred." });
    } finally {
      setSaving(false);
    }
  };

  // Delete post
  const handleDeletePost = async (id: string, postTitle: string) => {
    if (!confirm(`Are you sure you want to delete the blog post "${postTitle}"?`)) return;

    try {
      const res = await fetch("/api/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setMessage({ type: "success", text: "Blog post deleted successfully." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to delete post." });
    }
  };

  // Filtered post list
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchQuery =
        filterQuery.trim() === "" ||
        post.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(filterQuery.toLowerCase());
      const matchService =
        filterService === "All" || post.service === filterService;
      return matchQuery && matchService;
    });
  }, [posts, filterQuery, filterService]);

  return (
    <div className="space-y-8 max-w-[1680px] mx-auto font-sans pb-16">
      {/* Top Header Banner */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052cc] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Blog Content Management System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172947]">
            Blog Posts &amp; Editorial Manager
          </h1>
          <p className="text-slate-500 text-sm mt-1 max-w-2xl">
            Author, edit, format with Microsoft Word-style tools, and publish articles directly to the live HRA Groups Blog.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/services/blog"
            target="_blank"
            className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-xs"
          >
            <span>View Live Blog</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleOpenCreateModal}
            className="px-5 py-2.5 rounded-2xl bg-[#0052cc] hover:bg-[#003da8] active:scale-98 text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Blog Post</span>
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

      {/* Search & Filter Tool Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search posts by title or excerpt..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0052cc]"
            />
            {filterQuery && (
              <button
                onClick={() => setFilterQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 bg-white focus:outline-none focus:border-[#0052cc]"
          >
            <option value="All">All Services</option>
            <option value="IT Managed Services">IT Managed Services</option>
            <option value="Enterprise Data & AI">Enterprise Data & AI</option>
            <option value="ServiceNow">ServiceNow</option>
            <option value="Enterprise Asset Management">Enterprise Asset Management</option>
            <option value="Cybersecurity & Cloud">Cybersecurity & Cloud</option>
          </select>

          <button
            onClick={loadPosts}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main Blog Post Listing */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xl font-extrabold text-[#172947]">
              Published Blog Articles ({filteredPosts.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live database records available to all website visitors
            </p>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-sm text-slate-400 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-[#0052cc]" />
            <span>Loading blog articles...</span>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto" />
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-700">No blog posts found</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {filterQuery
                  ? "No articles matched your search filter."
                  : "Click 'New Blog Post' to author your first article with the Word template editor."}
              </p>
            </div>
            <button
              onClick={handleOpenCreateModal}
              className="px-5 py-2 rounded-xl bg-[#0052cc] text-white text-xs font-bold hover:bg-[#003da8] transition-colors"
            >
              Write First Blog Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="group rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Image Thumbnail */}
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-bold text-[#0052cc] shadow-xs uppercase">
                      {post.service}
                    </div>
                    {post.featured && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-[#172947] group-hover:text-[#0052cc] transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {post.industry}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(post)}
                      className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-1 text-xs font-bold"
                      title="Edit with Word Editor"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeletePost(post.id, post.title)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BLOG POST TEMPLATE & WORD EDITOR MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[94vh] flex flex-col my-auto">
            {/* Modal Top Header */}
            <div className="bg-slate-50 px-6 sm:px-8 py-5 border-b border-slate-200 flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0052cc] text-[11px] font-extrabold uppercase">
                    {editingId ? "Edit Mode" : "Blog Post Template"}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-semibold text-slate-600">
                    Microsoft Word-style WYSIWYG
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#172947] mt-1">
                  {editingId ? "Update Blog Post" : "Create New Blog Article"}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSavePost} className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
              {/* SECTION 1: TITLE & AUTHOR & DATE */}
              <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0052cc]">
                  <FileText className="w-4 h-4" />
                  <span>1. General Details</span>
                </div>

                {/* Blog Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 block">
                    Blog Post Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Next-Generation Cloud Migration & AI Modernization"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:border-[#0052cc] focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                {/* Author, Publication Date & Read Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Author</span>
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. HRA Editorial Team"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Publication Date</span>
                    </label>
                    <input
                      type="date"
                      value={publishDate}
                      onChange={(e) => setPublishDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Est. Read Time</span>
                    </label>
                    <input
                      type="text"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="e.g. 5 min read"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: CATEGORY, SERVICE, INDUSTRY & TAGS */}
              <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0052cc]">
                  <Layers className="w-4 h-4" />
                  <span>2. Taxonomy &amp; Categorization</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc]"
                    >
                      <option value="Blogs">Blogs</option>
                      <option value="Whitepapers">Whitepapers</option>
                      <option value="Case Studies">Case Studies</option>
                      <option value="Press Releases">Press Releases</option>
                      <option value="Webinars">Webinars</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Service Alignment</label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc]"
                    >
                      <option value="IT Managed Services">IT Managed Services</option>
                      <option value="Enterprise Data & AI">Enterprise Data & AI</option>
                      <option value="ServiceNow">ServiceNow &amp; Workflows</option>
                      <option value="Enterprise Asset Management">Enterprise Asset Management</option>
                      <option value="Cybersecurity & Cloud">Cybersecurity &amp; Cloud</option>
                      <option value="Content Marketing & SEO">Content Marketing &amp; SEO</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Target Industry</label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc]"
                    >
                      <option value="Government">Government &amp; Public Sector</option>
                      <option value="Utilities">Utilities &amp; Energy</option>
                      <option value="Banking, Financial Services & Insurance">BFSI &amp; Fintech</option>
                      <option value="Transportation">Transportation &amp; Logistics</option>
                      <option value="Public Safety">Public Safety &amp; Emergency</option>
                      <option value="Manufacturing">Manufacturing &amp; Industrial</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-slate-400" />
                      <span>Keywords / Tags (Comma-separated)</span>
                    </label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="e.g. Cloud, AI, Security, DevOps"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc]"
                    />
                  </div>

                  <div className="flex items-center pt-5 sm:pt-6">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs font-bold text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200 w-full hover:border-blue-300 transition-colors">
                      <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="w-4 h-4 rounded text-[#0052cc] accent-[#0052cc]"
                      />
                      <span>Promote as Featured Hero Post</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* SECTION 3: FEATURED COVER IMAGE */}
              <div className="space-y-3 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0052cc]">
                    <Upload className="w-4 h-4" />
                    <span>3. Featured Cover Image</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setUploadType("url")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        uploadType === "url"
                          ? "bg-[#0052cc] text-white shadow-xs"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Link2 className="w-3 h-3" />
                      <span>Web URL</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadType("file")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        uploadType === "file"
                          ? "bg-[#0052cc] text-white shadow-xs"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload File</span>
                    </button>
                  </div>
                </div>

                {uploadType === "url" ? (
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        setPreviewUrl(e.target.value);
                      }}
                      placeholder="https://example.com/cover-image.webp"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc]"
                    />
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-2xl p-5 text-center cursor-pointer transition-colors bg-white relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <span className="text-xs font-bold text-slate-700 block">
                      {file ? file.name : "Click or drop cover photo here"}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Recommended: 16:9 ratio, JPG/PNG/WebP
                    </span>
                  </div>
                )}

                {previewUrl && (
                  <div className="relative aspect-[21/9] max-h-48 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 mt-2">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* SECTION 4: SHORT DESCRIPTION / EXCERPT */}
              <div className="space-y-2 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0052cc]">
                    <Bookmark className="w-4 h-4" />
                    <span>4. Short Description / Summary Snippet</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutoExtractExcerpt}
                    className="text-[11px] font-bold text-[#0052cc] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Auto-extract from editor</span>
                  </button>
                </div>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Provide a concise 1-2 sentence preview for cards and search engine results..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc] resize-none"
                />
              </div>

              {/* SECTION 5: WORD-STYLE RICH CONTENT EDITOR */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#0052cc]">
                    <Sparkles className="w-4 h-4" />
                    <span>5. Blog Content (Word Editor)</span>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">
                    Full formatting tools enabled
                  </span>
                </div>

                <WordEditor
                  value={content}
                  onChange={(html) => setContent(html)}
                  placeholder="Start composing your article here... Format headers, bullet points, callouts, and styling using the Word toolbar above."
                />
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span>Preview Article</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-7 py-2.5 rounded-xl bg-[#0052cc] hover:bg-[#003da8] text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                  >
                    {saving ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{editingId ? "Save & Update Post" : "Publish to Website"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold">
                <Eye className="w-4 h-4 text-sky-400" />
                <span>Live Reader Preview</span>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
              <div className="space-y-3 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0052cc] uppercase">
                  <span>{category}</span>
                  <span>•</span>
                  <span>{service}</span>
                  <span>•</span>
                  <span>{readTime}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#172947] leading-tight">
                  {title || "Untitled Blog Post"}
                </h1>
                <p className="text-slate-500 text-sm italic">{excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
                  <User className="w-3.5 h-3.5" />
                  <span>{author}</span>
                  <span>•</span>
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{publishDate}</span>
                </div>
              </div>

              {previewUrl && (
                <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={previewUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Rendered Rich Content */}
              <div
                className="prose max-w-none text-slate-800 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: content || "<p className='text-slate-400 italic'>No content written yet...</p>",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
