"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  Search,
  BookOpen,
  Calendar,
  AlertCircle,
  Eye,
  Check,
  X,
  Sparkles,
  Users,
  GraduationCap,
  Mail,
  Phone,
  Building2,
  FileText,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InternshipTrack {
  id: string;
  title: string;
  category: string;
  description: string;
  duration?: string;
  mode?: string;
  tags: string[];
  isActive: boolean;
  createdAt: string;
  _count?: {
    applications: number;
  };
}

interface InternshipApplication {
  id: string;
  domainTitle: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  message?: string;
  status: string; // New | Under Review | Accepted | Shortlisted | Rejected
  createdAt: string;
  internshipTrack?: {
    title: string;
    category: string;
    mode?: string;
  };
}

export default function AdminInternshipPage() {
  const [activeTab, setActiveTab] = useState<"tracks" | "applications">("applications");
  const [tracks, setTracks] = useState<InternshipTrack[]>([]);
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Track Creation Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittingTrack, setSubmittingTrack] = useState(false);
  const [trackTitle, setTrackTitle] = useState("");
  const [trackCategory, setTrackCategory] = useState("technology");
  const [trackDescription, setTrackDescription] = useState("");
  const [trackDuration, setTrackDuration] = useState("3–6 Months");
  const [trackMode, setTrackMode] = useState("Hybrid / Remote");
  const [trackTagsInput, setTrackTagsInput] = useState("");

  // Applicant Review Modal
  const [selectedApp, setSelectedApp] = useState<InternshipApplication | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resTracks, resApps] = await Promise.all([
        fetch("/api/internship/tracks"),
        fetch("/api/internship/applications"),
      ]);

      const dataTracks = await resTracks.json();
      const dataApps = await resApps.json();

      if (dataTracks.success) setTracks(dataTracks.tracks || []);
      if (dataApps.success) setApplications(dataApps.applications || []);
    } catch (err) {
      console.error("Error fetching internship data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackTitle.trim() || !trackDescription.trim()) {
      alert("Please enter program title and description.");
      return;
    }

    try {
      setSubmittingTrack(true);
      const tags = trackTagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch("/api/internship/tracks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: trackTitle,
          category: trackCategory,
          description: trackDescription,
          duration: trackDuration,
          mode: trackMode,
          tags,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModalOpen(false);
        setTrackTitle("");
        setTrackDescription("");
        setTrackTagsInput("");
        fetchData();
      } else {
        alert(data.error || "Failed to create track");
      }
    } catch (err: any) {
      alert(err.message || "Failed to create track");
    } finally {
      setSubmittingTrack(false);
    }
  };

  const handleDeleteTrack = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete track "${title}"?`)) return;

    try {
      const res = await fetch(`/api/internship/tracks?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setTracks(tracks.filter((t) => t.id !== id));
      } else {
        const d = await res.json();
        alert(d.error || "Failed to delete track");
      }
    } catch (err) {
      alert("Error deleting track");
    }
  };

  const handleUpdateAppStatus = async (appId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/internship/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: appId, status: newStatus }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
        );
        if (selectedApp && selectedApp.id === appId) {
          setSelectedApp({ ...selectedApp, status: newStatus });
        }
      }
    } catch (err) {
      alert("Error updating application status");
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (!confirm("Are you sure you want to remove this applicant record?")) return;
    try {
      const res = await fetch(`/api/internship/applications?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setApplications(applications.filter((a) => a.id !== id));
        if (selectedApp?.id === id) setSelectedApp(null);
      }
    } catch (err) {
      alert("Error deleting applicant");
    }
  };

  // Metrics
  const totalApps = applications.length;
  const newApps = applications.filter((a) => a.status === "New").length;
  const acceptedApps = applications.filter((a) => a.status === "Accepted").length;
  const activeTracksCount = 9 + tracks.length;

  // Filtered Applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone.includes(searchQuery) ||
      app.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.domainTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredTracks = tracks.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-16">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-widest text-[#0052cc] mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Workforce & Talent Development</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001f4d]">
            Internship Program Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review incoming student applications, manage custom internship tracks, and update applicant candidate statuses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0052cc] hover:bg-[#003882] text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Internship Track</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0052cc] flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#001f4d]">{totalApps}</div>
            <div className="text-xs text-slate-500 font-medium">Total Applicants</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-amber-600">{newApps}</div>
            <div className="text-xs text-slate-500 font-medium">Pending Review (New)</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-700">{acceptedApps}</div>
            <div className="text-xs text-slate-500 font-medium">Accepted Candidates</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#001f4d]">{activeTracksCount}</div>
            <div className="text-xs text-slate-500 font-medium">Live Internship Tracks</div>
          </div>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === "applications"
                ? "bg-white text-[#0052cc] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Applicant Submissions ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab("tracks")}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === "tracks"
                ? "bg-white text-[#0052cc] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Custom Tracks ({tracks.length})
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {activeTab === "applications" && (
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs font-semibold text-slate-700 bg-transparent border-none focus:outline-none cursor-pointer py-1"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Under Review">Under Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          )}

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                activeTab === "applications"
                  ? "Search applicant name, college, email..."
                  : "Search track title or category..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#001f4d] placeholder:text-slate-400 focus:outline-none focus:border-[#0052cc]"
            />
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 bg-white rounded-3xl border border-slate-200/80">
          <div className="w-8 h-8 border-4 border-[#0052cc] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium">Loading Internship Data...</p>
        </div>
      ) : activeTab === "applications" ? (
        /* APPLICANT SUBMISSIONS TABLE */
        <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm">
          {filteredApps.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <Users className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-[#001f4d]">No applicant submissions found</h3>
              <p className="text-xs text-slate-500">
                When students fill the internship application on the website, their full details will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <th className="py-4 px-6">Candidate</th>
                    <th className="py-4 px-6">Domain Track</th>
                    <th className="py-4 px-6">College / University</th>
                    <th className="py-4 px-6">Contact Details</th>
                    <th className="py-4 px-6">Review Status</th>
                    <th className="py-4 px-6">Applied Date</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#001f4d]">{app.fullName}</div>
                        {app.message && (
                          <div className="text-xs text-slate-400 line-clamp-1 max-w-xs">
                            "{app.message}"
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0052cc] text-xs font-bold border border-blue-100">
                          {app.domainTitle}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-slate-700 max-w-xs truncate">
                          {app.college}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-600 space-y-0.5">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <a href={`mailto:${app.email}`} className="hover:text-[#0052cc]">
                            {app.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <a href={`tel:${app.phone}`} className="hover:text-[#0052cc]">
                            {app.phone}
                          </a>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={app.status}
                          onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1 rounded-full border cursor-pointer focus:outline-none ${
                            app.status === "Accepted"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : app.status === "Shortlisted"
                              ? "bg-blue-50 text-blue-700 border-blue-300"
                              : app.status === "Under Review"
                              ? "bg-amber-50 text-amber-700 border-amber-300"
                              : app.status === "Rejected"
                              ? "bg-rose-50 text-rose-700 border-rose-300"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-500">
                        {new Date(app.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="p-1.5 text-[#0052cc] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="View Full Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteApplication(app.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* CUSTOM TRACKS TAB */
        <div className="space-y-4">
          {filteredTracks.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 space-y-3">
              <Layers className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-[#001f4d]">No Custom Tracks Added Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                All 9 core domains remain active on the public page. You can add new custom tracks here which will automatically display alongside the core programs.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#0052cc] text-white font-bold text-xs"
              >
                Add New Track
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTracks.map((track) => (
                <div
                  key={track.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0052cc] text-[11px] font-bold uppercase tracking-wider border border-blue-100">
                        {track.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                        {track.duration || "3–6 Months"}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#001f4d] leading-snug">
                      {track.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {track.description}
                    </p>

                    {track.tags && track.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {track.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-[11px] text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {track._count?.applications || 0} Applied
                    </span>
                    <button
                      onClick={() => handleDeleteTrack(track.id, track.title)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title="Delete Track"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CREATE INTERNSHIP TRACK MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#001f4d]">
                    Add New Internship Track
                  </h2>
                  <p className="text-xs text-slate-500">
                    Create a domain track that will be listed on the public Internship page.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateTrack} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Track Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cyber Security & Ethical Hacking"
                    value={trackTitle}
                    onChange={(e) => setTrackTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Category</label>
                    <select
                      value={trackCategory}
                      onChange={(e) => setTrackCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                    >
                      <option value="technology">Technology</option>
                      <option value="creative">Creative</option>
                      <option value="business">Business</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. 3–6 Months"
                      value={trackDuration}
                      onChange={(e) => setTrackDuration(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Mode</label>
                  <input
                    type="text"
                    placeholder="e.g. Hybrid / Remote / On-Site (Hyderabad)"
                    value={trackMode}
                    onChange={(e) => setTrackMode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Key Skills / Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Penetration Testing, Network Security, Wireshark, OWASP"
                    value={trackTagsInput}
                    onChange={(e) => setTrackTagsInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Description *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Provide overview of curriculum, hands-on projects, and mentoring scope..."
                    value={trackDescription}
                    onChange={(e) => setTrackDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingTrack}
                    className="px-6 py-2.5 rounded-xl bg-[#0052cc] hover:bg-[#003882] text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    {submittingTrack ? "Saving Track..." : "Add Track to Website"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW CANDIDATE FULL DETAILS MODAL */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0052cc] text-xs font-bold">
                    {selectedApp.domainTitle}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#001f4d] mt-2">
                    {selectedApp.fullName}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 uppercase font-bold">College / University</span>
                    <span className="font-bold text-slate-800">{selectedApp.college}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 uppercase font-bold">Email ID</span>
                    <a href={`mailto:${selectedApp.email}`} className="font-bold text-[#0052cc]">
                      {selectedApp.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 uppercase font-bold">Contact Phone</span>
                    <a href={`tel:${selectedApp.phone}`} className="font-bold text-[#0052cc]">
                      {selectedApp.phone}
                    </a>
                  </div>
                </div>

                {selectedApp.message && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Candidate Statement / Bio
                    </label>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 leading-relaxed text-xs sm:text-sm">
                      {selectedApp.message}
                    </div>
                  </div>
                )}

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Update Application Review Status
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Under Review", "Shortlisted", "Accepted", "Rejected"].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateAppStatus(selectedApp.id, st)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                          selectedApp.status === st
                            ? "bg-[#0052cc] text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
