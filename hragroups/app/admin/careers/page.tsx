"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Users2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Clock,
  Sparkles,
  ChevronRight,
  Filter,
  Eye,
} from "lucide-react";

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState<"roles" | "applications">("roles");
  const [roles, setRoles] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  // New Role Form State
  const [title, setTitle] = useState("");
  const [dept, setDept] = useState("Engineering");
  const [location, setLocation] = useState("Hyderabad, India");
  const [type, setType] = useState("Full-Time");
  const [experience, setExperience] = useState("1–3 Years");
  const [desc, setDesc] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [tags, setTags] = useState("");

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [resRoles, resApps] = await Promise.all([
        fetch("/api/careers/roles"),
        fetch("/api/careers/applications"),
      ]);

      const dataRoles = await resRoles.json();
      const dataApps = await resApps.json();

      if (dataRoles.success) setRoles(dataRoles.roles);
      if (dataApps.success) setApplications(dataApps.applications);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setMessage(null);

    try {
      const res = await fetch("/api/careers/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          dept,
          location,
          type,
          experience,
          desc,
          applyLink: applyLink || null,
          tags: tags ? tags.split(",").map((t) => t.trim()) : [dept, type, location],
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: "success", text: "New career position published live to the careers page!" });
        setTitle("");
        setDept("Engineering");
        setLocation("Hyderabad, India");
        setType("Full-Time");
        setExperience("1–3 Years");
        setDesc("");
        setApplyLink("");
        setTags("");
        setShowModal(false);
        loadData();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to create career role." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error occurred." });
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteRole = async (id: string) => {
    if (!confirm("Are you sure you want to delete this career position?")) return;

    try {
      const res = await fetch("/api/careers/roles", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setRoles(roles.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateAppStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/careers/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setApplications(
          applications.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp({ ...selectedApp, status: newStatus });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteApp = async (id: string) => {
    if (!confirm("Are you sure you want to delete this candidate application?")) return;

    try {
      const res = await fetch("/api/careers/applications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setApplications(applications.filter((a) => a.id !== id));
        if (selectedApp && selectedApp.id === id) setSelectedApp(null);
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
            Recruitment &amp; HR
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172947] mt-1">
            Career Management &amp; Openings
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Publish vacancies to the website careers page and review candidate applications directly inside this console.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/careers"
            target="_blank"
            className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <span>View Public Careers</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-[#0052cc] hover:bg-[#0041a3] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Job Opening</span>
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Dynamic Positions
            </span>
            <span className="text-3xl font-extrabold text-[#172947] mt-1 block">
              {roles.length}
            </span>
            <span className="text-xs text-slate-500 mt-1 block">
              + 6 Permanent Core Openings
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#0052cc]">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Total Applicants
            </span>
            <span className="text-3xl font-extrabold text-[#0052cc] mt-1 block">
              {applications.length}
            </span>
            <span className="text-xs text-slate-500 mt-1 block">
              Received via Career Portal
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600">
            <Users2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              New Applications
            </span>
            <span className="text-3xl font-extrabold text-emerald-600 mt-1 block">
              {applications.filter((a) => a.status === "New").length}
            </span>
            <span className="text-xs text-slate-500 mt-1 block">
              Awaiting Review
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("roles")}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "roles"
              ? "bg-[#0052cc] text-white shadow-md shadow-blue-500/20"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Job Openings ({roles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("applications")}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "applications"
              ? "bg-[#0052cc] text-white shadow-md shadow-blue-500/20"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Users2 className="w-4 h-4" />
          <span>Candidate Applications ({applications.length})</span>
        </button>
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

      {/* TAB 1: JOB ROLES */}
      {activeTab === "roles" && (
        <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-[#172947]">
                Dynamic Job Positions ({roles.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Positions posted by admin appearing live on the website
              </p>
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-slate-400">Loading career roles...</div>
          ) : roles.length === 0 ? (
            <div className="py-14 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-slate-700">No custom job roles added yet</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Click &quot;Post New Job Opening&quot; above to publish a new job opening with department, requirements, and tags.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/70 p-4 rounded-2xl transition-colors"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0052cc] text-xs font-bold uppercase">
                        {role.dept}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                        {role.type}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                        {role.experience}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-[#172947]">{role.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 max-w-4xl">{role.desc}</p>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#0052cc]" />
                        <span>{role.location}</span>
                      </span>
                      <span>•</span>
                      <span>{role.applications?.length || 0} Direct Applicants</span>
                      <span>•</span>
                      <span>Posted {new Date(role.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteRole(role.id)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete Role"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Built-in Permanent Core Openings Reference */}
          <div className="pt-6 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Permanent Core Positions (Always Preserved on Public Careers Page):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-[#172947] block">HR Intern (Unpaid)</span>
                <span className="text-slate-500 text-[11px]">Human Resources • Hyderabad</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-[#172947] block">Soft Skills Trainer</span>
                <span className="text-slate-500 text-[11px]">Education &amp; Training • Hyderabad</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-[#172947] block">Senior Full-Stack Engineer</span>
                <span className="text-slate-500 text-[11px]">Engineering • Next.js / Cloud</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CANDIDATE APPLICATIONS */}
      {activeTab === "applications" && (
        <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-[#172947]">
                Candidate Applications ({applications.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Applicants submitted through the website application modal
              </p>
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-slate-400">Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className="py-14 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Users2 className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-slate-700">No applications received yet</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                When candidates apply on the website via the Apply modal, their resumes and contact details will appear here immediately.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                    <th className="pb-3.5 px-3">Candidate</th>
                    <th className="pb-3.5 px-3">Applied Position</th>
                    <th className="pb-3.5 px-3">Contact</th>
                    <th className="pb-3.5 px-3">Experience / CTC</th>
                    <th className="pb-3.5 px-3">Status</th>
                    <th className="pb-3.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-3">
                        <span className="font-bold text-[#172947] text-sm block">
                          {app.fullName}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {app.location || "Hyderabad, India"}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <span className="font-bold text-[#0052cc] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 block max-w-xs truncate">
                          {app.roleTitle}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5 block">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{app.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{app.phone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-3 text-slate-600">
                        <div>Exp: {app.experience || "Fresher"}</div>
                        <div className="text-[11px] text-slate-400">
                          CTC: {app.expectedCtc || "Negotiable"}
                        </div>
                      </td>
                      <td className="py-4 px-3">
                        <select
                          value={app.status}
                          onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold border focus:outline-none cursor-pointer ${
                            app.status === "New"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : app.status === "Interviewing"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : app.status === "Selected"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Interviewing">Interviewing</option>
                          <option value="Selected">Selected</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-4 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="p-1.5 rounded-lg text-[#0052cc] hover:bg-blue-50 transition-colors cursor-pointer"
                            title="View Application Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteApp(app.id)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete Application"
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

      {/* CREATE JOB OPENING MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-[#172947]">Post New Job Opening</h3>
                <p className="text-xs text-slate-500">Publish a new role to the HRA Groups Careers page</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="space-y-4">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Job Position Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Cloud DevOps Engineer"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                />
              </div>

              {/* Department & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Department</label>
                  <select
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc] bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Education & Training">Education &amp; Training</option>
                    <option value="Technology Consulting">Technology Consulting</option>
                    <option value="Digital Strategy">Digital Strategy</option>
                    <option value="Sales & Growth">Sales &amp; Growth</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Experience</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 2–4 Years / Fresher"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                  />
                </div>
              </div>

              {/* Location & Employment Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Hyderabad, India / Hybrid"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Employment Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc] bg-white"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Internship / Full-Time">Internship / Full-Time</option>
                    <option value="Contract / Part-Time">Contract / Part-Time</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Job Description &amp; Responsibilities <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Describe the role requirements, technical expectations, and duties..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc] resize-none"
                />
              </div>

              {/* Tags & Custom External Form Link */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Skill Tags <span className="text-xs font-normal text-slate-400">(comma separated)</span>
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. React, Node.js, AWS, TypeScript"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Custom Application Link (Optional - defaults to In-app Application Form)
                </label>
                <input
                  type="url"
                  value={applyLink}
                  onChange={(e) => setApplyLink(e.target.value)}
                  placeholder="https://docs.google.com/forms/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                />
              </div>

              {/* Submit Action */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-6 py-2.5 rounded-xl bg-[#0052cc] hover:bg-[#0041a3] text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {creating ? "Publishing..." : "Publish Job Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* APPLICANT DETAIL VIEW MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                  Application Review
                </span>
                <h3 className="text-2xl font-extrabold text-[#172947] mt-0.5">
                  {selectedApp.fullName}
                </h3>
                <p className="text-xs text-slate-500">
                  Applied for: <strong className="text-[#0052cc]">{selectedApp.roleTitle}</strong>
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Email</span>
                <a href={`mailto:${selectedApp.email}`} className="font-bold text-[#0052cc] text-sm hover:underline">
                  {selectedApp.email}
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Phone</span>
                <a href={`tel:${selectedApp.phone}`} className="font-bold text-slate-800 text-sm hover:underline">
                  {selectedApp.phone}
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Location</span>
                <span className="font-bold text-slate-800">{selectedApp.location || "Not specified"}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Experience</span>
                <span className="font-bold text-slate-800">{selectedApp.experience || "Fresher"}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Expected CTC</span>
                <span className="font-bold text-slate-800">{selectedApp.expectedCtc || "Negotiable"}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Notice Period</span>
                <span className="font-bold text-slate-800">{selectedApp.noticePeriod || "Immediate"}</span>
              </div>
            </div>

            {selectedApp.skills && (
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-700 block">Skills / Certifications</span>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                  {selectedApp.skills}
                </div>
              </div>
            )}

            {selectedApp.coverLetter && (
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-700 block">Candidate Message / Note</span>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                  {selectedApp.coverLetter}
                </div>
              </div>
            )}

            {selectedApp.resumeUrl && (
              <div className="pt-2">
                <a
                  href={selectedApp.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0052cc] font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-blue-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Candidate Portfolio / Resume PDF</span>
                </a>
              </div>
            )}

            {/* Change Status Action */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Update Status:</span>
                <select
                  value={selectedApp.status}
                  onChange={(e) => handleUpdateAppStatus(selectedApp.id, e.target.value)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 bg-white"
                >
                  <option value="New">New</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
