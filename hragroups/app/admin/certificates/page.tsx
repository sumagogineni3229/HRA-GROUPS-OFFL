"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Award,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  KeyRound,
  User,
  Search,
  ShieldCheck,
} from "lucide-react";

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form states
  const [holderName, setHolderName] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [password, setPassword] = useState("");
  const [courseName, setCourseName] = useState("Full Stack Software Engineering & Cloud Internship");
  const [issueDate, setIssueDate] = useState("");
  const [grade, setGrade] = useState("A+ Distinction");
  const [certificateUrl, setCertificateUrl] = useState("");

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadCertificates = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/certificates");
      const data = await res.json();
      if (data.success) {
        setCertificates(data.certificates);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setMessage(null);

    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          holderName,
          certificateId: certificateId.trim().toUpperCase(),
          password,
          courseName,
          issueDate: issueDate || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          grade,
          certificateUrl,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage({ type: "success", text: "Certificate issued and verified in the registry!" });
        setHolderName("");
        setCertificateId("");
        setPassword("");
        setCourseName("Full Stack Software Engineering & Cloud Internship");
        setIssueDate("");
        setGrade("A+ Distinction");
        setCertificateUrl("");
        setShowModal(false);
        loadCertificates();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to issue certificate." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error occurred." });
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate record?")) return;

    try {
      const res = await fetch("/api/certificates", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setCertificates(certificates.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCertificates = certificates.filter(
    (c) =>
      c.holderName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.certificateId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.courseName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto font-sans">
      {/* Header Banner */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-[#0052cc] uppercase tracking-wider block">
            Credentials &amp; Verification
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172947] mt-1">
            Certificate Issuance &amp; Verification
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Issue verified credentials with Holder Name, Certificate ID, and Security Password verifiable by employers on the public portal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/services/certificate-portal"
            target="_blank"
            className="px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <span>View Public Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-[#0052cc] hover:bg-[#0041a3] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Issue New Certificate</span>
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

      {/* Issue Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-[#172947]">Issue New Verified Certificate</h3>
                <p className="text-xs text-slate-500">Enter candidate credentials and security password</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              {/* Holder Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Certificate Holder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                />
              </div>

              {/* Certificate ID & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Certificate ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    placeholder="e.g. HRA-0001"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:border-[#0052cc] uppercase"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Verification Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="e.g. HRA@Pass2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                  />
                </div>
              </div>

              {/* Course Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Course / Program Completed <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="e.g. Python Full Stack Development & Cloud"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                />
              </div>

              {/* Issue Date & Grade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Issue Date</label>
                  <input
                    type="text"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    placeholder="e.g. October 2, 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Grade / Honor</label>
                  <input
                    type="text"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="e.g. A+ Distinction"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                  />
                </div>
              </div>

              {/* Certificate URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Certificate PDF / Download Link (Optional)
                </label>
                <input
                  type="url"
                  value={certificateUrl}
                  onChange={(e) => setCertificateUrl(e.target.value)}
                  placeholder="https://example.com/certificates/hra-0001.pdf"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                />
              </div>

              {/* Action Buttons */}
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
                  {creating ? "Issuing..." : "Issue & Verify"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search & List */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-[#172947]">
              Issued Certificates Registry ({certificates.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live records verifiable in the HRA Certificate Portal
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0052cc]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-slate-400">Loading certificate registry...</div>
        ) : filteredCertificates.length === 0 ? (
          <div className="py-14 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Award className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="text-sm font-bold text-slate-700">No certificates found</div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Click &quot;Issue New Certificate&quot; to issue candidate credentials with ID and verification password.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                  <th className="pb-3.5 px-3">Candidate</th>
                  <th className="pb-3.5 px-3">Certificate ID</th>
                  <th className="pb-3.5 px-3">Password</th>
                  <th className="pb-3.5 px-3">Program</th>
                  <th className="pb-3.5 px-3">Issue Date</th>
                  <th className="pb-3.5 px-3">Status</th>
                  <th className="pb-3.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCertificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-3">
                      <span className="font-bold text-[#172947] text-sm block">
                        {cert.holderName}
                      </span>
                      <span className="text-[11px] text-slate-400">{cert.grade || "A+ Distinction"}</span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                        {cert.certificateId}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {cert.password}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-slate-700 font-medium max-w-xs truncate">
                      {cert.courseName}
                    </td>
                    <td className="py-4 px-3 text-slate-500">
                      {cert.issueDate}
                    </td>
                    <td className="py-4 px-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                        {cert.status || "Verified"}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <button
                        onClick={() => handleDelete(cert.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Record"
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
    </div>
  );
}
