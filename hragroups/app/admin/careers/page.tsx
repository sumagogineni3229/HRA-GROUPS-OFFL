"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  Calendar,
  Video,
  Download,
  Search,
  Check,
  XCircle,
  UserCheck,
  HelpCircle,
  Globe,
  RefreshCw,
} from "lucide-react";

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState<"roles" | "applications" | "interviews">("applications");
  const [roles, setRoles] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [showInterviewModal, setShowInterviewModal] = useState(false);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [positionFilter, setPositionFilter] = useState("ALL");

  // New Role Form State
  const [title, setTitle] = useState("");
  const [dept, setDept] = useState("Engineering");
  const [location, setLocation] = useState("Hyderabad, India");
  const [type, setType] = useState("Full-Time");
  const [experience, setExperience] = useState("1–3 Years");
  const [desc, setDesc] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [tags, setTags] = useState("");

  // Interview Scheduling State
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("11:00 AM");
  const [interviewerName, setInterviewerName] = useState("Technical Lead");
  const [interviewType, setInterviewType] = useState<"Technical" | "HR" | "Management">("Technical");
  const [meetingLink, setMeetingLink] = useState("https://meet.google.com/");
  const [interviewNotes, setInterviewNotes] = useState("");
  const [interviewDecisionNotes, setInterviewDecisionNotes] = useState("");

  // Direct Candidate Email Redirection & Composer State
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailCandidate, setEmailCandidate] = useState<any | null>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailTemplateType, setEmailTemplateType] = useState<"custom" | "acknowledgment" | "shortlist" | "interview" | "offer" | "rejection">("custom");

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

      if (dataRoles.success) setRoles(dataRoles.roles || []);
      if (dataApps.success) setApplications(dataApps.applications || []);
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
        setShowRoleModal(false);
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
        setMessage({ type: "success", text: `Candidate status updated to "${newStatus}"` });
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
        setMessage({ type: "success", text: "Application deleted." });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Schedule Interview confirmation
  const handleScheduleInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    const interviewNoteAppend = `[INTERVIEW SCHEDULED: ${interviewDate} at ${interviewTime} | Type: ${interviewType} | Interviewer: ${interviewerName} | Link: ${meetingLink}] ${interviewNotes}`;

    try {
      const updatedCover = selectedApp.coverLetter
        ? `${selectedApp.coverLetter}\n\n${interviewNoteAppend}`
        : interviewNoteAppend;

      const res = await fetch("/api/careers/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedApp.id,
          status: "INTERVIEW",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((a) =>
            a.id === selectedApp.id
              ? { ...a, status: "INTERVIEW", coverLetter: updatedCover }
              : a
          )
        );
        setSelectedApp({ ...selectedApp, status: "INTERVIEW", coverLetter: updatedCover });
        setShowInterviewModal(false);
        setMessage({
          type: "success",
          text: `Interview scheduled for ${selectedApp.fullName} on ${interviewDate} at ${interviewTime}`,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Open Email Composer / Redirection Modal with pre-filled templates
  const handleOpenEmailComposer = (candidate: any, template: "custom" | "acknowledgment" | "shortlist" | "interview" | "offer" | "rejection" = "custom") => {
    setEmailCandidate(candidate);
    setEmailTemplateType(template);

    let subject = `Regarding your application for ${candidate.roleTitle} - HRA Groups`;
    let body = `Dear ${candidate.fullName},\n\nThank you for your interest in the ${candidate.roleTitle} position at HRA Groups.\n\nBest regards,\nRecruitment Team\nHRA Groups\ncareers@hragroups.com`;

    if (template === "acknowledgment") {
      subject = `Application Received: ${candidate.roleTitle} - HRA Groups`;
      body = `Dear ${candidate.fullName},\n\nWe have received your application for the position of ${candidate.roleTitle} at HRA Groups (Ref ID: #${candidate.id.slice(0, 8)}).\n\nOur recruitment team is currently reviewing your profile and credentials. If your qualifications match our current requirements, we will reach out to schedule the next phase of the evaluation.\n\nThank you for choosing HRA Groups.\n\nBest regards,\nTalent Acquisition Team\nHRA Groups\ncareers@hragroups.com\nhttps://hragroups.com`;
    } else if (template === "shortlist") {
      subject = `Congratulations! You've been shortlisted for ${candidate.roleTitle} - HRA Groups`;
      body = `Dear ${candidate.fullName},\n\nWe are pleased to inform you that your profile has been shortlisted for the ${candidate.roleTitle} opening at HRA Groups.\n\nOur technical hiring team would like to proceed with the preliminary discussion. Please let us know your availability over the coming days for a 30-minute virtual session.\n\nBest regards,\nTalent Acquisition Team\nHRA Groups\ncareers@hragroups.com`;
    } else if (template === "interview") {
      subject = `Interview Invitation: ${candidate.roleTitle} - HRA Groups`;
      body = `Dear ${candidate.fullName},\n\nWe would like to invite you to attend an interview round for the ${candidate.roleTitle} position at HRA Groups.\n\nDetails:\n• Role: ${candidate.roleTitle}\n• Interview Mode: Virtual (Google Meet / Zoom)\n• Platform Link: [Insert Link Here]\n\nPlease confirm if this time slot works for you or suggest an alternate convenient time.\n\nBest regards,\nHR & Recruitment Team\nHRA Groups\ncareers@hragroups.com`;
    } else if (template === "offer") {
      subject = `Offer of Employment: ${candidate.roleTitle} - HRA Groups`;
      body = `Dear ${candidate.fullName},\n\nFollowing your successful interview rounds, we are thrilled to extend an offer for the position of ${candidate.roleTitle} at HRA Groups!\n\nPlease review the attached terms and reach back out with your confirmation.\n\nWelcome to the team!\n\nBest regards,\nHR Department\nHRA Groups\ncareers@hragroups.com`;
    } else if (template === "rejection") {
      subject = `Update regarding your application for ${candidate.roleTitle} - HRA Groups`;
      body = `Dear ${candidate.fullName},\n\nThank you for taking the time to apply and interview for the ${candidate.roleTitle} position at HRA Groups.\n\nWhile we were impressed with your background and qualifications, we have decided to move forward with another candidate whose experience more closely aligns with our immediate requirements for this role.\n\nWe will keep your resume on file for future opportunities that match your skill set. We wish you every success in your career.\n\nBest regards,\nRecruitment Team\nHRA Groups\ncareers@hragroups.com`;
    }

    setEmailSubject(subject);
    setEmailBody(body);
    setShowEmailModal(true);
  };

  const handleApplyTemplate = (tpl: "custom" | "acknowledgment" | "shortlist" | "interview" | "offer" | "rejection") => {
    if (!emailCandidate) return;
    handleOpenEmailComposer(emailCandidate, tpl);
  };

  // Direct Redirection Actions
  const handleLaunchDefaultEmailClient = () => {
    if (!emailCandidate) return;
    const mailtoUrl = `mailto:${encodeURIComponent(emailCandidate.email)}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoUrl;
    setMessage({ type: "success", text: `Redirected to default Mail client for ${emailCandidate.email}` });
    setShowEmailModal(false);
  };

  const handleLaunchGmailWeb = () => {
    if (!emailCandidate) return;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      emailCandidate.email
    )}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    setMessage({ type: "success", text: `Opened Gmail compose window for ${emailCandidate.email}` });
    setShowEmailModal(false);
  };

  // Filtered applications
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchSearch =
        searchQuery.trim() === "" ||
        app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (app.skills && app.skills.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus =
        statusFilter === "ALL" ||
        app.status?.toUpperCase() === statusFilter.toUpperCase();

      const matchPosition =
        positionFilter === "ALL" || app.roleTitle === positionFilter;

      return matchSearch && matchStatus && matchPosition;
    });
  }, [applications, searchQuery, statusFilter, positionFilter]);

  // Status Counts
  const stats = useMemo(() => {
    return {
      total: applications.length,
      new: applications.filter((a) => a.status === "New" || a.status === "NEW").length,
      underReview: applications.filter((a) => a.status?.toUpperCase() === "UNDER REVIEW").length,
      shortlisted: applications.filter((a) => a.status?.toUpperCase() === "SHORTLISTED").length,
      interview: applications.filter((a) => a.status?.toUpperCase() === "INTERVIEW" || a.status === "Interviewing").length,
      selected: applications.filter((a) => a.status?.toUpperCase() === "SELECTED").length,
      rejected: applications.filter((a) => a.status?.toUpperCase() === "REJECTED").length,
    };
  }, [applications]);

  // Positions List for Filter
  const uniquePositions = useMemo(() => {
    const set = new Set<string>();
    applications.forEach((a) => {
      if (a.roleTitle) set.add(a.roleTitle);
    });
    return Array.from(set);
  }, [applications]);

  return (
    <div className="space-y-8 max-w-[1680px] mx-auto font-sans pb-16">
      {/* Header Banner */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052cc] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recruitment &amp; Talent Acquisition</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172947]">
            Careers &amp; Candidate Management Console
          </h1>
          <p className="text-slate-500 text-sm mt-1 max-w-2xl">
            Review applicant resumes, shortlist talent, schedule interviews, and publish vacancies live to the public careers page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/careers"
            target="_blank"
            className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-xs"
          >
            <span>View Public Careers</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setShowRoleModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-[#0052cc] hover:bg-[#003da8] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Job Role</span>
          </button>
        </div>
      </div>

      {/* Recruitment Status Pipeline Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {[
          { label: "Total Received", count: stats.total, color: "text-[#172947]", bg: "bg-slate-50", filter: "ALL" },
          { label: "NEW", count: stats.new, color: "text-blue-600", bg: "bg-blue-50/70", filter: "NEW" },
          { label: "UNDER REVIEW", count: stats.underReview, color: "text-amber-600", bg: "bg-amber-50/70", filter: "UNDER REVIEW" },
          { label: "SHORTLISTED", count: stats.shortlisted, color: "text-indigo-600", bg: "bg-indigo-50/70", filter: "SHORTLISTED" },
          { label: "INTERVIEW", count: stats.interview, color: "text-purple-600", bg: "bg-purple-50/70", filter: "INTERVIEW" },
          { label: "SELECTED", count: stats.selected, color: "text-emerald-600", bg: "bg-emerald-50/70", filter: "SELECTED" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => {
              setActiveTab("applications");
              setStatusFilter(item.filter);
            }}
            className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
              statusFilter === item.filter && activeTab === "applications"
                ? "border-[#0052cc] bg-white ring-2 ring-blue-100 shadow-sm"
                : "border-slate-200/90 bg-white hover:border-slate-300 shadow-xs"
            }`}
          >
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {item.label}
            </span>
            <span className={`text-2xl font-extrabold ${item.color} mt-1.5 block`}>
              {item.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
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

        <button
          onClick={() => setActiveTab("roles")}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "roles"
              ? "bg-[#0052cc] text-white shadow-md shadow-blue-500/20"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Published Vacancies ({roles.length})</span>
        </button>
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

      {/* TAB 1: CANDIDATE APPLICATIONS PIPELINE */}
      {activeTab === "applications" && (
        <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidate name, email, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 bg-white focus:outline-none focus:border-[#0052cc]"
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">New</option>
                <option value="UNDER REVIEW">Under Review</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="INTERVIEW">Interview</option>
                <option value="SELECTED">Selected</option>
                <option value="REJECTED">Rejected</option>
                <option value="ON HOLD">On Hold</option>
              </select>

              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 bg-white focus:outline-none focus:border-[#0052cc] max-w-xs truncate"
              >
                <option value="ALL">All Positions</option>
                {uniquePositions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>

              <button
                onClick={loadData}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                title="Refresh"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center text-sm text-slate-400 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-[#0052cc]" />
              <span>Loading applications...</span>
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Users2 className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-slate-700">No applications match your criteria</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Candidate applications submitted through the careers portal will show up here for resume review, shortlisting, and interview scheduling.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-bold">
                    <th className="pb-3.5 px-3">Candidate</th>
                    <th className="pb-3.5 px-3">Applied Role</th>
                    <th className="pb-3.5 px-3">Contact</th>
                    <th className="pb-3.5 px-3">Experience</th>
                    <th className="pb-3.5 px-3">Resume</th>
                    <th className="pb-3.5 px-3">Workflow Status</th>
                    <th className="pb-3.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApps.map((app) => {
                    const st = (app.status || "NEW").toUpperCase();
                    let statusColor = "bg-blue-50 text-blue-700 border-blue-200";
                    if (st === "UNDER REVIEW") statusColor = "bg-amber-50 text-amber-700 border-amber-200";
                    if (st === "SHORTLISTED") statusColor = "bg-indigo-50 text-indigo-700 border-indigo-200";
                    if (st === "INTERVIEW" || st === "INTERVIEWING") statusColor = "bg-purple-50 text-purple-700 border-purple-200";
                    if (st === "SELECTED") statusColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
                    if (st === "REJECTED") statusColor = "bg-rose-50 text-rose-700 border-rose-200";
                    if (st === "ON HOLD") statusColor = "bg-slate-100 text-slate-700 border-slate-200";

                    return (
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
                            Applied {new Date(app.createdAt).toLocaleDateString()}
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
                          <span className="font-semibold text-slate-700">{app.experience || "Fresher"}</span>
                        </td>
                        <td className="py-4 px-3">
                          {app.resumeUrl ? (
                            <a
                              href={app.resumeUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0052cc] font-bold text-[11px] transition-colors border border-blue-200"
                            >
                              <FileText className="w-3 h-3" />
                              <span>View Resume</span>
                            </a>
                          ) : (
                            <span className="text-slate-400 text-[11px]">No link</span>
                          )}
                        </td>
                        <td className="py-4 px-3">
                          <select
                            value={app.status || "NEW"}
                            onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-[11px] font-bold border focus:outline-none cursor-pointer ${statusColor}`}
                          >
                            <option value="NEW">NEW</option>
                            <option value="UNDER REVIEW">UNDER REVIEW</option>
                            <option value="SHORTLISTED">SHORTLISTED</option>
                            <option value="INTERVIEW">INTERVIEW</option>
                            <option value="SELECTED">SELECTED</option>
                            <option value="REJECTED">REJECTED</option>
                            <option value="ON HOLD">ON HOLD</option>
                          </select>
                        </td>
                        <td className="py-4 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEmailComposer(app)}
                              className="px-2.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0052cc] font-bold text-xs transition-colors flex items-center gap-1 border border-blue-200/80 cursor-pointer"
                              title="Send Email / Redirect to Mail Client"
                            >
                              <Mail className="w-3.5 h-3.5 text-[#0052cc]" />
                              <span>Email</span>
                            </button>
                            <button
                              onClick={() => setSelectedApp(app)}
                              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                              title="Review Candidate Profile"
                            >
                              <Eye className="w-3.5 h-3.5 text-[#0052cc]" />
                              <span>Review</span>
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PUBLISHED JOB VACANCIES */}
      {activeTab === "roles" && (
        <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-extrabold text-[#172947]">
                Live Job Openings ({roles.length})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Positions published here are instantly visible to applicants on the website
              </p>
            </div>
            <button
              onClick={() => setShowRoleModal(true)}
              className="px-4 py-2 rounded-xl bg-[#0052cc] text-white text-xs font-bold hover:bg-[#003da8] flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Position</span>
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-slate-400">Loading vacancies...</div>
          ) : roles.length === 0 ? (
            <div className="py-14 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-slate-700">No active job roles posted</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Click &quot;Post New Job Role&quot; above to create a vacancy.
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
        </div>
      )}

      {/* CREATE JOB OPENING MODAL */}
      {showRoleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto my-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-[#172947]">Post New Job Opening</h3>
                <p className="text-xs text-slate-500">Publish a new role to the HRA Groups Careers page</p>
              </div>
              <button
                onClick={() => setShowRoleModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="space-y-4">
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
                  <label className="text-xs font-bold text-slate-700 block">Experience Required</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 2–4 Years / Fresher"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                  />
                </div>
              </div>

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

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRoleModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-6 py-2.5 rounded-xl bg-[#0052cc] hover:bg-[#003da8] text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {creating ? "Publishing..." : "Publish Job Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* COMPREHENSIVE CANDIDATE MANAGEMENT MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 relative max-h-[92vh] overflow-y-auto my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold text-[#0052cc] bg-blue-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Candidate Profile
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-bold text-slate-600">
                    ID: #{selectedApp.id.slice(0, 8)}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#172947] mt-1">
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

            {/* Quick Status Action Bar */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Application Status:</span>
                <select
                  value={selectedApp.status || "NEW"}
                  onChange={(e) => handleUpdateAppStatus(selectedApp.id, e.target.value)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold border border-slate-300 bg-white shadow-xs focus:outline-none focus:border-[#0052cc]"
                >
                  <option value="NEW">NEW</option>
                  <option value="UNDER REVIEW">UNDER REVIEW</option>
                  <option value="SHORTLISTED">SHORTLISTED</option>
                  <option value="INTERVIEW">INTERVIEW</option>
                  <option value="SELECTED">SELECTED</option>
                  <option value="REJECTED">REJECTED</option>
                  <option value="ON HOLD">ON HOLD</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEmailComposer(selectedApp)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send / Redirect Email</span>
                </button>
                <button
                  onClick={() => setShowInterviewModal(true)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule Interview</span>
                </button>
              </div>
            </div>

            {/* Candidate Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Email</span>
                <a href={`mailto:${selectedApp.email}`} className="font-bold text-[#0052cc] text-xs hover:underline mt-0.5 block truncate">
                  {selectedApp.email}
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Phone</span>
                <a href={`tel:${selectedApp.phone}`} className="font-bold text-slate-800 text-xs hover:underline mt-0.5 block">
                  {selectedApp.phone}
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Location</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{selectedApp.location || "Not specified"}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Experience</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{selectedApp.experience || "Fresher"}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Expected CTC</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{selectedApp.expectedCtc || "Negotiable"}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Notice Period</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{selectedApp.noticePeriod || "Immediate"}</span>
              </div>
            </div>

            {/* Skills / Qualifications */}
            {selectedApp.skills && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-700 block">Skills &amp; Technical Competencies</span>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-medium">
                  {selectedApp.skills}
                </div>
              </div>
            )}

            {/* Candidate Cover Letter & Interview Notes */}
            {selectedApp.coverLetter && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-700 block">Candidate Statement &amp; Interview Log</span>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedApp.coverLetter}
                </div>
              </div>
            )}

            {/* Resume Action Buttons */}
            {selectedApp.resumeUrl && (
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={selectedApp.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-2xl bg-[#0052cc] hover:bg-[#003da8] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Full Resume / Portfolio Document</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>

                <a
                  href={selectedApp.resumeUrl}
                  download
                  className="py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </a>
              </div>
            )}

            {/* Modal Bottom Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-[11px] text-slate-400">
                Submitted on {new Date(selectedApp.createdAt).toLocaleString()}
              </span>
              <button
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCHEDULE INTERVIEW MODAL */}
      {showInterviewModal && selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#172947]">
                    Schedule Candidate Interview
                  </h3>
                  <p className="text-xs text-slate-500">
                    Candidate: <strong className="text-slate-800">{selectedApp.fullName}</strong>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowInterviewModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleScheduleInterview} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Interview Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Time / Slot
                  </label>
                  <input
                    type="text"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    placeholder="e.g. 11:00 AM IST"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Interview Round
                  </label>
                  <select
                    value={interviewType}
                    onChange={(e) => setInterviewType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc]"
                  >
                    <option value="Technical">Technical Round</option>
                    <option value="HR">HR Round</option>
                    <option value="Management">Management / Final</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">
                    Interviewer Name
                  </label>
                  <input
                    type="text"
                    value={interviewerName}
                    onChange={(e) => setInterviewerName(e.target.value)}
                    placeholder="e.g. Lead Engineer"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Meeting Link (Google Meet / Zoom / MS Teams)
                </label>
                <input
                  type="url"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="https://meet.google.com/xyz-abc"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  Interview Notes / Agenda
                </label>
                <textarea
                  rows={2}
                  value={interviewNotes}
                  onChange={(e) => setInterviewNotes(e.target.value)}
                  placeholder="e.g. System design discussion, React / Node.js live coding..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowInterviewModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Confirm &amp; Update to Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DIRECT EMAIL REDIRECTION & COMPOSER MODAL */}
      {showEmailModal && emailCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5 relative max-h-[92vh] overflow-y-auto my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-blue-50 text-[#0052cc]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#172947]">
                    Email Candidate: {emailCandidate.fullName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Sending to <strong className="text-[#0052cc]">{emailCandidate.email}</strong> • Position: {emailCandidate.roleTitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Templates Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Quick Email Templates</label>
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { key: "acknowledgment", label: "Acknowledgment" },
                  { key: "shortlist", label: "Shortlisted" },
                  { key: "interview", label: "Interview Invite" },
                  { key: "offer", label: "Job Offer" },
                  { key: "rejection", label: "Status Update / Close" },
                  { key: "custom", label: "Custom Message" },
                ].map((tpl) => (
                  <button
                    key={tpl.key}
                    type="button"
                    onClick={() => handleApplyTemplate(tpl.key as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      emailTemplateType === tpl.key
                        ? "bg-[#0052cc] text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Subject & Body Edit */}
            <div className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Subject Line</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Subject..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc] font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">Message Body</label>
                <textarea
                  rows={8}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Type candidate message here..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0052cc] font-mono leading-relaxed"
                />
              </div>
            </div>

            {/* Action Buttons to Redirect or Open Email Client */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100/80 space-y-3">
              <span className="text-xs font-bold text-[#172947] block">
                Choose How to Open &amp; Send This Email:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleLaunchDefaultEmailClient}
                  className="px-4 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#172947] font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
                >
                  <Mail className="w-4 h-4 text-[#0052cc]" />
                  <span>Default Mail Client (Mail / Desktop)</span>
                </button>

                <button
                  type="button"
                  onClick={handleLaunchGmailWeb}
                  className="px-4 py-3 rounded-xl bg-[#0052cc] hover:bg-[#003da8] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in Gmail Web</span>
                </button>
              </div>
            </div>

            {/* Modal Bottom Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-400">
                Email will be sent to <strong>{emailCandidate.email}</strong>
              </span>
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
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
