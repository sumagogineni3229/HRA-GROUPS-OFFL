"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Trash2,
  CheckCircle2,
  Clock,
  Archive,
  Eye,
  Mail,
  Phone,
  Building2,
  Globe,
  MapPin,
  Sparkles,
  ExternalLink,
  X,
  Check,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FounderApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location?: string;
  designation?: string;
  company?: string;
  industry?: string;
  website?: string;
  business: string;
  goals?: string;
  interests: string[];
  status: string; // New | Under Review | Connected | Archived
  createdAt: string;
}

export default function AdminFounderProgramPage() {
  const [applications, setApplications] = useState<FounderApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApp, setSelectedApp] = useState<FounderApplication | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/founder-program/applications");
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications || []);
      }
    } catch (err) {
      console.error("Error fetching founder applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      setUpdatingId(id);
      const res = await fetch("/api/founder-program/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error("Error updating application status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this founder application?")) return;
    try {
      const res = await fetch(`/api/founder-program/applications?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setApplications((prev) => prev.filter((app) => app.id !== id));
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp(null);
        }
      }
    } catch (err) {
      console.error("Error deleting application:", err);
    }
  };

  // Filter applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.company && app.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.industry && app.industry.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.location && app.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "All" ? true : app.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800";
      case "Under Review":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800";
      case "Connected":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800";
      case "Archived":
        return "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-xs font-bold text-[#0052cc] uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>FOUNDER BRIDGE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172947] tracking-tight">
            Founder Program Applications
          </h1>
          <p className="text-sm text-slate-500">
            Review and manage all incoming founder registration submissions from the Founder Bridge portal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchApplications}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Applications", count: applications.length, color: "text-[#172947]" },
          {
            label: "New Leads",
            count: applications.filter((a) => a.status === "New").length,
            color: "text-blue-600",
          },
          {
            label: "Under Review",
            count: applications.filter((a) => a.status === "Under Review").length,
            color: "text-amber-600",
          },
          {
            label: "Connected / Onboarded",
            count: applications.filter((a) => a.status === "Connected").length,
            color: "text-emerald-600",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1"
          >
            <span className="text-xs font-medium text-slate-500 block">{stat.label}</span>
            <span className={`text-2xl font-black ${stat.color} block`}>{stat.count}</span>
          </div>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by founder name, email, company, industry or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0052cc]/20 focus:border-[#0052cc]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {["All", "New", "Under Review", "Connected", "Archived"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? "bg-[#002244] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#0052cc] animate-spin mx-auto" />
            <p className="text-sm font-medium text-slate-500">Loading applications...</p>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <Users className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No applications found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery || statusFilter !== "All"
                ? "Try adjusting your search query or status filter."
                : "No one has submitted a Founder Bridge application yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Founder &amp; Role</th>
                  <th className="py-3.5 px-6">Contact Info</th>
                  <th className="py-3.5 px-6">Company / Industry</th>
                  <th className="py-3.5 px-6">Interests</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                    onClick={() => setSelectedApp(app)}
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-[#172947] text-sm group-hover:text-[#0052cc] transition-colors">
                        {app.fullName}
                      </div>
                      <div className="text-xs text-slate-500">
                        {app.designation || "Founder"}
                        {app.location ? ` • ${app.location}` : ""}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="text-xs font-medium text-slate-700">{app.email}</div>
                      <div className="text-xs text-slate-500">{app.phone}</div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="text-xs font-semibold text-slate-800">
                        {app.company || "N/A"}
                      </div>
                      <div className="text-xs text-slate-500">{app.industry || "General"}</div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {app.interests && app.interests.length > 0 ? (
                          app.interests.slice(0, 2).map((item, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-600"
                            >
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                        {app.interests && app.interests.length > 2 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-[10px] font-bold text-blue-600">
                            +{app.interests.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-xs text-slate-500 whitespace-nowrap">
                      {new Date(app.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td
                      className="py-4 px-6 text-right space-x-2 whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-[#0052cc] hover:border-[#0052cc] transition-colors"
                        title="View Full Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-300 transition-colors"
                        title="Delete Application"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Applicant Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl border border-slate-200"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[11px] font-bold text-[#0052cc] uppercase mb-2">
                    <Users className="w-3.5 h-3.5" />
                    <span>FOUNDER BRIDGE APPLICATION</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#172947]">
                    {selectedApp.fullName}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {selectedApp.designation || "Founder"}
                    {selectedApp.company ? ` at ${selectedApp.company}` : ""}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Selector Bar */}
              <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-700">Update Status:</span>
                <div className="flex items-center gap-1.5">
                  {["New", "Under Review", "Connected", "Archived"].map((st) => (
                    <button
                      key={st}
                      disabled={updatingId === selectedApp.id}
                      onClick={() => handleUpdateStatus(selectedApp.id, st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedApp.status === st
                          ? "bg-[#002244] text-white shadow-xs"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-slate-500 font-medium flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#0052cc]" />
                    <span>Email Address</span>
                  </div>
                  <a
                    href={`mailto:${selectedApp.email}`}
                    className="font-bold text-[#172947] hover:underline block text-sm"
                  >
                    {selectedApp.email}
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-slate-500 font-medium flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#0052cc]" />
                    <span>Phone Number</span>
                  </div>
                  <a
                    href={`tel:${selectedApp.phone}`}
                    className="font-bold text-[#172947] hover:underline block text-sm"
                  >
                    {selectedApp.phone}
                  </a>
                </div>

                {selectedApp.location && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="text-slate-500 font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0052cc]" />
                      <span>Location</span>
                    </div>
                    <div className="font-bold text-[#172947] text-sm">{selectedApp.location}</div>
                  </div>
                )}

                {selectedApp.website && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="text-slate-500 font-medium flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#0052cc]" />
                      <span>Website</span>
                    </div>
                    <a
                      href={selectedApp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#0052cc] hover:underline flex items-center gap-1 text-sm"
                    >
                      <span>{selectedApp.website}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Business Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  About the Business / Venture
                </h4>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedApp.business}
                </div>
              </div>

              {/* Founder Goals */}
              {selectedApp.goals && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Goals Through Founder Bridge
                  </h4>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedApp.goals}
                  </div>
                </div>
              )}

              {/* Program Interests */}
              {selectedApp.interests && selectedApp.interests.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Areas of Interest
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApp.interests.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs">
                <span className="text-slate-400">
                  Submitted on {new Date(selectedApp.createdAt).toLocaleString()}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDelete(selectedApp.id)}
                    className="px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold transition-colors cursor-pointer"
                  >
                    Delete Application
                  </button>
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="px-5 py-2 rounded-xl bg-[#002244] text-white font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
