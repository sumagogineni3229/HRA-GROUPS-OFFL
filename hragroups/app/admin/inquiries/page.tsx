"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  BookOpen,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  Trash2,
  Search,
  Filter,
  Eye,
  X,
  Sparkles,
  Inbox,
  UserCheck,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactInquiry {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  message: string;
  status: string; // New | In Progress | Resolved | Closed
  createdAt: string;
}

interface CourseInquiry {
  id: string;
  courseName: string;
  fullName: string;
  email: string;
  phone: string;
  message?: string;
  status: string; // New | In Progress | Enrolled | Closed
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [activeTab, setActiveTab] = useState<"courses" | "contact">("courses");
  const [courseInquiries, setCourseInquiries] = useState<CourseInquiry[]>([]);
  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Selected Detail Modal
  const [selectedCourseInq, setSelectedCourseInq] = useState<CourseInquiry | null>(null);
  const [selectedContactInq, setSelectedContactInq] = useState<ContactInquiry | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resCourses, resContacts] = await Promise.all([
        fetch("/api/inquiries/courses"),
        fetch("/api/inquiries/contact"),
      ]);

      const dataCourses = await resCourses.json();
      const dataContacts = await resContacts.json();

      if (dataCourses.success) setCourseInquiries(dataCourses.inquiries || []);
      if (dataContacts.success) setContactInquiries(dataContacts.inquiries || []);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCourseStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/inquiries/courses", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setCourseInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedCourseInq && selectedCourseInq.id === id) {
          setSelectedCourseInq({ ...selectedCourseInq, status: newStatus });
        }
      }
    } catch (err) {
      alert("Error updating status");
    }
  };

  const handleDeleteCourseInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course inquiry?")) return;
    try {
      const res = await fetch(`/api/inquiries/courses?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setCourseInquiries(courseInquiries.filter((c) => c.id !== id));
        if (selectedCourseInq?.id === id) setSelectedCourseInq(null);
      }
    } catch (err) {
      alert("Error deleting inquiry");
    }
  };

  const handleUpdateContactStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/inquiries/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setContactInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedContactInq && selectedContactInq.id === id) {
          setSelectedContactInq({ ...selectedContactInq, status: newStatus });
        }
      }
    } catch (err) {
      alert("Error updating status");
    }
  };

  const handleDeleteContactInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact submission?")) return;
    try {
      const res = await fetch(`/api/inquiries/contact?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setContactInquiries(contactInquiries.filter((c) => c.id !== id));
        if (selectedContactInq?.id === id) setSelectedContactInq(null);
      }
    } catch (err) {
      alert("Error deleting inquiry");
    }
  };

  // Metrics
  const totalCourseInquiries = courseInquiries.length;
  const newCourseInquiries = courseInquiries.filter((c) => c.status === "New").length;
  const totalContactInquiries = contactInquiries.length;
  const newContactInquiries = contactInquiries.filter((c) => c.status === "New").length;

  // Filtered
  const filteredCourses = courseInquiries.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredContacts = contactInquiries.filter((c) => {
    const name = `${c.firstName} ${c.lastName || ""}`.toLowerCase();
    const matchesSearch =
      name.includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-widest text-[#0052cc] mb-2">
            <Inbox className="w-3.5 h-3.5" />
            <span>Communications & Leads</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001f4d]">
            Inquiries and Contact Messages
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage course enrollment inquiries, advisor consultations, and general contact messages.
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0052cc] flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#001f4d]">{totalCourseInquiries}</div>
            <div className="text-xs text-slate-500 font-medium">Course Inquiries</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-amber-600">{newCourseInquiries}</div>
            <div className="text-xs text-slate-500 font-medium">New Course Leads</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#001f4d]">{totalContactInquiries}</div>
            <div className="text-xs text-slate-500 font-medium">Contact Messages</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-purple-700">{newContactInquiries}</div>
            <div className="text-xs text-slate-500 font-medium">New Messages</div>
          </div>
        </div>
      </div>

      {/* Tabs & Search Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* TWO OPTIONS INSIDE: COURSE INQUIRIES & CONTACT INQUIRIES */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
          <button
            onClick={() => {
              setActiveTab("courses");
              setStatusFilter("All");
            }}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "courses"
                ? "bg-white text-[#0052cc] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Course Inquiries ({courseInquiries.length})</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("contact");
              setStatusFilter("All");
            }}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "contact"
                ? "bg-white text-[#0052cc] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Inquiries ({contactInquiries.length})</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-transparent border-none focus:outline-none cursor-pointer py-1"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              {activeTab === "courses" ? (
                <option value="Enrolled">Enrolled</option>
              ) : (
                <option value="Resolved">Resolved</option>
              )}
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                activeTab === "courses"
                  ? "Search by student name, course, phone..."
                  : "Search sender name, email, message..."
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
          <p className="text-sm font-medium">Loading Inquiries Data...</p>
        </div>
      ) : activeTab === "courses" ? (
        /* OPTION 1: COURSE INQUIRIES TABLE */
        <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm">
          {filteredCourses.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-[#001f4d]">No course inquiries found</h3>
              <p className="text-xs text-slate-500">
                When students fill out enrollment forms or consult with academic advisors on the Courses page, leads will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <th className="py-4 px-6">Student / Candidate</th>
                    <th className="py-4 px-6">Interested Course</th>
                    <th className="py-4 px-6">Contact Info</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Received Date</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredCourses.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#001f4d]">{item.fullName}</div>
                        {item.message && (
                          <div className="text-xs text-slate-400 line-clamp-1 max-w-xs">
                            "{item.message}"
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0052cc] text-xs font-bold border border-blue-100">
                          {item.courseName}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-600 space-y-0.5">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <a href={`mailto:${item.email}`} className="hover:text-[#0052cc]">
                            {item.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <a href={`tel:${item.phone}`} className="hover:text-[#0052cc]">
                            {item.phone}
                          </a>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={item.status}
                          onChange={(e) => handleUpdateCourseStatus(item.id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1 rounded-full border cursor-pointer focus:outline-none ${
                            item.status === "Enrolled"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : item.status === "In Progress"
                              ? "bg-blue-50 text-blue-700 border-blue-300"
                              : item.status === "Closed"
                              ? "bg-rose-50 text-rose-700 border-rose-300"
                              : "bg-amber-50 text-amber-700 border-amber-300"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Enrolled">Enrolled</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedCourseInq(item)}
                            className="p-1.5 text-[#0052cc] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="View Lead Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCourseInquiry(item.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Lead"
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
        /* OPTION 2: CONTACT INQUIRIES TABLE */
        <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm">
          {filteredContacts.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-[#001f4d]">No contact submissions found</h3>
              <p className="text-xs text-slate-500">
                When visitors send a message via the Contact Us page, their inquiries will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <th className="py-4 px-6">Sender</th>
                    <th className="py-4 px-6">Email Address</th>
                    <th className="py-4 px-6">Message Preview</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Received Date</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredContacts.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-[#001f4d]">
                          {item.firstName} {item.lastName || ""}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <a
                          href={`mailto:${item.email}`}
                          className="font-medium text-[#0052cc] hover:underline"
                        >
                          {item.email}
                        </a>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-xs text-slate-600 line-clamp-2 max-w-sm">
                          {item.message}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={item.status}
                          onChange={(e) => handleUpdateContactStatus(item.id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1 rounded-full border cursor-pointer focus:outline-none ${
                            item.status === "Resolved"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : item.status === "In Progress"
                              ? "bg-blue-50 text-blue-700 border-blue-300"
                              : item.status === "Closed"
                              ? "bg-rose-50 text-rose-700 border-rose-300"
                              : "bg-amber-50 text-amber-700 border-amber-300"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedContactInq(item)}
                            className="p-1.5 text-[#0052cc] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Read Full Message"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteContactInquiry(item.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Message"
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
      )}

      {/* VIEW COURSE INQUIRY MODAL */}
      <AnimatePresence>
        {selectedCourseInq && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0052cc] text-xs font-bold">
                    {selectedCourseInq.courseName}
                  </span>
                  <h2 className="text-xl font-black text-[#001f4d] mt-2">
                    {selectedCourseInq.fullName}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedCourseInq(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 uppercase font-bold">Email ID</span>
                    <a href={`mailto:${selectedCourseInq.email}`} className="font-bold text-[#0052cc]">
                      {selectedCourseInq.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 uppercase font-bold">Contact Phone</span>
                    <a href={`tel:${selectedCourseInq.phone}`} className="font-bold text-[#0052cc]">
                      {selectedCourseInq.phone}
                    </a>
                  </div>
                </div>

                {selectedCourseInq.message && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Inquiry Note
                    </label>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 leading-relaxed text-xs sm:text-sm">
                      {selectedCourseInq.message}
                    </div>
                  </div>
                )}

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Update Lead Status
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {["New", "In Progress", "Enrolled", "Closed"].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateCourseStatus(selectedCourseInq.id, st)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                          selectedCourseInq.status === st
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
                  onClick={() => setSelectedCourseInq(null)}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW CONTACT INQUIRY MODAL */}
      <AnimatePresence>
        {selectedContactInq && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    Contact Message
                  </span>
                  <h2 className="text-xl font-black text-[#001f4d] mt-2">
                    {selectedContactInq.firstName} {selectedContactInq.lastName || ""}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedContactInq(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 uppercase font-bold">Email Address</span>
                    <a href={`mailto:${selectedContactInq.email}`} className="font-bold text-[#0052cc]">
                      {selectedContactInq.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 uppercase font-bold">Received At</span>
                    <span className="text-slate-700 font-semibold">
                      {new Date(selectedContactInq.createdAt).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Message Body
                  </label>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 leading-relaxed text-xs sm:text-sm whitespace-pre-wrap">
                    {selectedContactInq.message}
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Update Message Status
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {["New", "In Progress", "Resolved", "Closed"].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateContactStatus(selectedContactInq.id, st)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                          selectedContactInq.status === st
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

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`mailto:${selectedContactInq.email}?subject=Re:%20HRA%20Groups%20Inquiry`}
                  className="px-5 py-2.5 rounded-xl bg-[#0052cc] text-white font-bold text-xs flex items-center gap-2 hover:bg-[#003882]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
                <button
                  onClick={() => setSelectedContactInq(null)}
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
