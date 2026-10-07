"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Upload,
  Link2,
  Layers,
  Search,
  RefreshCw,
  Globe,
  FileText,
  Sparkles,
} from "lucide-react";

interface ClientItem {
  id: string;
  name: string;
  logo: string;
  category?: string | null;
  description?: string | null;
  website?: string | null;
  createdAt: string;
}

const DEFAULT_CATEGORIES = [
  "Software & Operations",
  "Strategic Tech Partnership",
  "Enterprise Solutions",
  "Digital Growth & Operations",
  "Media & Digital Outreach",
  "Security & Industrial Tech",
  "Education & Tech",
  "Infrastructure & Logistics",
];

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Enterprise Solutions");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [uploadType, setUploadType] = useState<"url" | "file">("url");
  const [logoUrl, setLogoUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");

  const loadClients = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/clients");
      const data = await res.json();
      if (data.success) {
        setClients(data.clients || []);
      }
    } catch (err) {
      console.error("Error loading clients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
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
    if (!name.trim()) {
      alert("Please enter a client organization name");
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("website", website);

      if (uploadType === "file" && file) {
        formData.append("file", file);
      } else if (uploadType === "url" && logoUrl) {
        formData.append("logoUrl", logoUrl);
      }

      const res = await fetch("/api/clients", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: "success", text: "Client organization added successfully!" });
        setName("");
        setDescription("");
        setWebsite("");
        setLogoUrl("");
        setFile(null);
        setPreviewUrl(null);
        setShowModal(false);
        loadClients();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to add client." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message || "Something went wrong" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, clientName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${clientName}"?`)) return;

    try {
      const res = await fetch("/api/clients", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ type: "success", text: "Client removed successfully." });
        loadClients();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to delete client." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err?.message || "Failed to delete client." });
    }
  };

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.category && c.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      selectedCategoryFilter === "All" || c.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#0052cc] uppercase tracking-wider mb-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>Client &amp; Partner Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172947] tracking-tight">
            Our Clients &amp; Partners
          </h1>
          <p className="text-sm text-slate-500 max-w-xl">
            Add, update, or remove client organizations and logos displayed on the Our Clients page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/clients"
            target="_blank"
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#172947] text-xs font-bold transition-all flex items-center gap-2"
          >
            <span>View Live Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-[#0052cc] hover:bg-[#003882] text-white text-xs font-bold shadow-md shadow-blue-600/20 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Client</span>
          </button>
        </div>
      </div>

      {/* Alert Messages */}
      {message && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between border ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          <div className="flex items-center gap-3 text-sm font-semibold">
            {message.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
          <button
            onClick={() => setMessage(null)}
            className="text-xs font-bold opacity-60 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Stats and Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Dynamic Added Clients
            </span>
            <span className="text-2xl font-black text-[#172947]">{clients.length}</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#0052cc] flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Default Built-in Clients
            </span>
            <span className="text-2xl font-black text-[#172947]">12</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Total Live Clients
            </span>
            <span className="text-2xl font-black text-[#0052cc]">
              {12 + clients.length}
            </span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0052cc] focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline">
            Category:
          </span>
          {["All", ...DEFAULT_CATEGORIES.slice(0, 4)].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategoryFilter === cat
                  ? "bg-[#0052cc] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
          <button
            onClick={loadClients}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 ml-auto cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Dynamic Clients List Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[#172947] flex items-center gap-2">
            <span>Admin-Added Clients</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0052cc]">
              {filteredClients.length}
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="py-20 text-center space-y-3 bg-white rounded-3xl border border-slate-200/80">
            <RefreshCw className="w-8 h-8 text-[#0052cc] animate-spin mx-auto" />
            <p className="text-xs font-semibold text-slate-500">Loading client records...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="py-16 text-center space-y-4 bg-white rounded-3xl border border-slate-200/80 p-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0052cc] flex items-center justify-center mx-auto">
              <Building2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#172947]">No custom clients added yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                All 12 default clients are currently shown on the website. Click &quot;Add New Client&quot; above to add more client organizations.
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 rounded-2xl bg-[#0052cc] hover:bg-[#003882] text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Client</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col justify-between space-y-5 hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="h-16 w-24 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/abhitsolutions-YX4xMrgxxVulNQ5z.jpg";
                        }}
                      />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0052cc] text-[11px] font-bold">
                      {client.category || "Client"}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-extrabold text-[#172947] group-hover:text-[#0052cc] transition-colors">
                      {client.name}
                    </h3>
                    {client.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {client.description}
                      </p>
                    )}
                  </div>

                  {client.website && (
                    <a
                      href={client.website.startsWith("http") ? client.website : `https://${client.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#0052cc] font-semibold hover:underline"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span className="truncate max-w-[200px]">{client.website}</span>
                    </a>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Added: {new Date(client.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleDelete(client.id, client.name)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Client"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Built-in Default Clients Preview */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-base font-extrabold text-[#172947] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>Built-in Official Clients (Permanent / Safe)</span>
            </h2>
            <p className="text-xs text-slate-400">
              These official brand partnerships are always preserved and displayed along with any new admin additions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { name: "ABH IT Solutions", logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/abhitsolutions-YX4xMrgxxVulNQ5z.jpg" },
            { name: "RN Innovation", logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/rninnovation-Y4Lv1ZXv5XuMxnDW.jpg" },
            { name: "Vectura Earthmoving", logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/vectura-voDSefIB5Jsiyex0.jpg" },
            { name: "Madhurams", logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/madhurams-Y4Lv1ZXvPEsB5qWZ.jpg" },
            { name: "TheCconnects", logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/thecconnects_logo-ncUALeZwo63vmLgH.jpg" },
            { name: "HCL", logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/hcl-A0xjM8XjWVFaZeRL.png" },
            { name: "Wipro", logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/wipro-mnlJwrKJnohe9w2o.png" },
            { name: "Tombest Mining", logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/logo-urDNMS5El0aAyQDq.png" },
            { name: "SyncPedia", logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/sync-crVbaCLObzJvgYYZ.webp" },
            { name: "Gayathri Infra", logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/gayathri-logo-wagZAeYtR4L21PHp.jpg" },
            { name: "K-Learn World", logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/klearnworld-removebg-preview-1-IqhmGHxpOobd1AaG.png" },
            { name: "Shield Workz", logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/shield-workz-gZFp9ZzZCR8yMimX.png" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/60 flex flex-col items-center justify-center gap-2 text-center"
            >
              <div className="h-10 w-full flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.logo}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <span className="text-[11px] font-bold text-slate-700 truncate w-full">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CREATE CLIENT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 my-8 border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0052cc] uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>New Client</span>
                </div>
                <h3 className="text-xl font-extrabold text-[#172947]">
                  Add Client Organization
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Client Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#172947] block">
                  Client / Organization Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Infosys, TCS, Tech Mahindra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0052cc] focus:outline-none transition-all"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#172947] block">
                  Partnership / Service Category
                </label>
                <input
                  type="text"
                  list="categories-list"
                  placeholder="e.g. Enterprise Solutions, Strategic Tech Partnership"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0052cc] focus:outline-none transition-all"
                />
                <datalist id="categories-list">
                  {DEFAULT_CATEGORIES.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#172947] block">
                  Short Collaboration Description (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Software development, recruitment, and operational support."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0052cc] focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Website */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#172947] block">
                  Website URL (Optional)
                </label>
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0052cc] focus:outline-none transition-all"
                />
              </div>

              {/* Upload Type Toggle */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-bold text-[#172947] block">
                  Client Logo Source <span className="text-rose-500">*</span>
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setUploadType("url")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      uploadType === "url"
                        ? "bg-[#0052cc] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    <span>Image URL</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadType("file")}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      uploadType === "file"
                        ? "bg-[#0052cc] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload File</span>
                  </button>
                </div>

                {uploadType === "url" ? (
                  <input
                    type="url"
                    placeholder="https://example.com/logo.png"
                    value={logoUrl}
                    onChange={(e) => {
                      setLogoUrl(e.target.value);
                      setPreviewUrl(e.target.value);
                    }}
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0052cc] focus:outline-none transition-all mt-2"
                  />
                ) : (
                  <div className="mt-2 border-2 border-dashed border-slate-200 hover:border-[#0052cc] rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="client-file-upload"
                    />
                    <label htmlFor="client-file-upload" className="cursor-pointer block space-y-1">
                      <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                      <span className="text-xs font-bold text-[#0052cc] block">
                        {file ? file.name : "Click to select client logo"}
                      </span>
                      <span className="text-[11px] text-slate-400 block">PNG, JPG, SVG, WebP</span>
                    </label>
                  </div>
                )}

                {/* Logo Preview */}
                {previewUrl && (
                  <div className="pt-2 flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400">Logo Preview:</span>
                    <div className="h-12 w-20 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Form Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-2xl bg-[#0052cc] hover:bg-[#003882] text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Client</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
