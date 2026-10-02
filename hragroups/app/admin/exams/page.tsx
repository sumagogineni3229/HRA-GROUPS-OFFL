"use client";

import React, { useState, useEffect } from "react";
import {
  FileQuestion,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  KeyRound,
  Users,
  Award,
  Layers,
  Search,
  BookOpen,
  Calendar,
  AlertCircle,
  Eye,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionItem {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  points: number;
}

interface Assessment {
  id: string;
  title: string;
  category: string;
  courseCohort: string;
  examKey: string;
  durationMins: number;
  passScorePct: number;
  description?: string;
  questions: QuestionItem[];
  isActive: boolean;
  createdAt: string;
  _count?: {
    submissions: number;
  };
}

interface Submission {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail?: string;
  score: number;
  totalPoints: number;
  percentage: number;
  status: "PASSED" | "FAILED";
  timeSpentSecs?: number;
  submittedAt: string;
  assessment: {
    title: string;
    examKey: string;
    passScorePct: number;
    category: string;
  };
}

export default function AdminExamsPage() {
  const [activeTab, setActiveTab] = useState<"exams" | "submissions">("exams");
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Create Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Certification Exam");
  const [formCohort, setFormCohort] = useState("");
  const [formExamKey, setFormExamKey] = useState("");
  const [formDuration, setFormDuration] = useState("45");
  const [formPassScore, setFormPassScore] = useState("70");
  const [formDescription, setFormDescription] = useState("");

  // Questions Builder
  const [questions, setQuestions] = useState<QuestionItem[]>([
    {
      id: "q_1",
      text: "",
      options: ["", "", "", ""],
      correctOptionIndex: 0,
      points: 2,
    },
  ]);

  // View Submission Details Modal
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resExams, resSubs] = await Promise.all([
        fetch("/api/exams"),
        fetch("/api/exams/submissions"),
      ]);

      const dataExams = await resExams.json();
      const dataSubs = await resSubs.json();

      if (dataExams.success) setAssessments(dataExams.assessments || []);
      if (dataSubs.success) setSubmissions(dataSubs.submissions || []);
    } catch (err) {
      console.error("Error fetching exams:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `q_${Date.now()}`,
        text: "",
        options: ["", "", "", ""],
        correctOptionIndex: 0,
        points: 2,
      },
    ]);
  };

  const handleRemoveQuestion = (idx: number) => {
    if (questions.length <= 1) {
      alert("At least one question is required for an exam.");
      return;
    }
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleQuestionTextChange = (idx: number, val: string) => {
    const updated = [...questions];
    updated[idx].text = val;
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx: number, optIdx: number, val: string) => {
    const updated = [...questions];
    updated[qIdx].options[optIdx] = val;
    setQuestions(updated);
  };

  const handleCorrectOptionChange = (qIdx: number, optIdx: number) => {
    const updated = [...questions];
    updated[qIdx].correctOptionIndex = optIdx;
    setQuestions(updated);
  };

  const handlePointsChange = (qIdx: number, val: number) => {
    const updated = [...questions];
    updated[qIdx].points = Number(val) || 1;
    setQuestions(updated);
  };

  const handleCreateExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formExamKey) {
      alert("Please enter Exam Title and Access Key.");
      return;
    }

    // validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) {
        alert(`Question #${i + 1} text cannot be empty.`);
        return;
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          alert(`Option ${j + 1} in Question #${i + 1} cannot be empty.`);
          return;
        }
      }
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formTitle,
          category: formCategory,
          courseCohort: formCohort || "All Cohorts",
          examKey: formExamKey,
          durationMins: Number(formDuration) || 45,
          passScorePct: Number(formPassScore) || 70,
          description: formDescription,
          questions: questions,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsModalOpen(false);
        resetForm();
        fetchData();
      } else {
        alert(data.error || "Failed to create assessment");
      }
    } catch (err: any) {
      alert(err.message || "Failed to create assessment");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormTitle("");
    setFormCategory("Certification Exam");
    setFormCohort("");
    setFormExamKey("");
    setFormDuration("45");
    setFormPassScore("70");
    setFormDescription("");
    setQuestions([
      {
        id: "q_1",
        text: "",
        options: ["", "", "", ""],
        correctOptionIndex: 0,
        points: 2,
      },
    ]);
  };

  const handleDeleteExam = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? All candidate submissions for this exam will also be removed.`)) return;

    try {
      const res = await fetch(`/api/exams?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setAssessments(assessments.filter((a) => a.id !== id));
        setSubmissions(submissions.filter((s) => s.assessment.title !== title));
      } else {
        const d = await res.json();
        alert(d.error || "Failed to delete exam");
      }
    } catch (err) {
      alert("Error deleting exam");
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    if (!confirm("Are you sure you want to delete this candidate submission record?")) return;
    try {
      const res = await fetch(`/api/exams/submissions?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubmissions(submissions.filter((s) => s.id !== id));
      }
    } catch (err) {
      alert("Error removing submission");
    }
  };

  // Metrics
  const totalExams = assessments.length;
  const totalSubmissions = submissions.length;
  const passedSubmissions = submissions.filter((s) => s.status === "PASSED").length;
  const avgPassRate = totalSubmissions > 0 ? Math.round((passedSubmissions / totalSubmissions) * 100) : 0;

  // Filtered Lists
  const filteredExams = assessments.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.examKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.courseCohort?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubmissions = submissions.filter(
    (s) =>
      s.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.candidateId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.assessment.examKey.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-16">
      {/* Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold uppercase tracking-widest text-[#0052cc] mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Assessments & Examinations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001f4d]">
            HRA Exam Management Portal
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create online exams with automated grading, distribute candidate access keys, and review test results.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0052cc] hover:bg-[#003882] text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Exam</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0052cc] flex items-center justify-center font-bold">
            <FileQuestion className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#001f4d]">{totalExams}</div>
            <div className="text-xs text-slate-500 font-medium">Active Exams</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#001f4d]">{totalSubmissions}</div>
            <div className="text-xs text-slate-500 font-medium">Candidates Tested</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-700">{passedSubmissions}</div>
            <div className="text-xs text-slate-500 font-medium">Certified / Passed</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-amber-700">{avgPassRate}%</div>
            <div className="text-xs text-slate-500 font-medium">Average Pass Rate</div>
          </div>
        </div>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("exams")}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === "exams"
                ? "bg-white text-[#0052cc] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Exam Openings ({assessments.length})
          </button>
          <button
            onClick={() => setActiveTab("submissions")}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === "submissions"
                ? "bg-white text-[#0052cc] shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Candidate Results & Scores ({submissions.length})
          </button>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              activeTab === "exams"
                ? "Search by exam title, key, cohort..."
                : "Search candidate name, roll no, exam..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#001f4d] placeholder:text-slate-400 focus:outline-none focus:border-[#0052cc]"
          />
        </div>
      </div>

      {/* Main Tab Content */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 bg-white rounded-3xl border border-slate-200/80">
          <div className="w-8 h-8 border-4 border-[#0052cc] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium">Loading Assessment Data...</p>
        </div>
      ) : activeTab === "exams" ? (
        /* EXAMS TAB */
        <div className="space-y-4">
          {filteredExams.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 space-y-3">
              <FileQuestion className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-[#001f4d]">No Exams Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Create your first scheduled exam with multi-choice questions, time duration, and unique session passcode.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#0052cc] text-white font-bold text-xs"
              >
                Schedule New Exam
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredExams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0052cc] text-[11px] font-bold uppercase tracking-wider border border-blue-100">
                        {exam.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                        {exam.courseCohort || "General Cohort"}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#001f4d] leading-snug">
                      {exam.title}
                    </h3>

                    {exam.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {exam.description}
                      </p>
                    )}

                    <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">
                          Session Key
                        </span>
                        <span className="font-mono font-bold text-[#0052cc]">
                          {exam.examKey}
                        </span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">
                          Duration & Pass
                        </span>
                        <span className="font-bold text-slate-700">
                          {exam.durationMins}m / {exam.passScorePct}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1 font-medium">
                        <Layers className="w-3.5 h-3.5 text-blue-500" />
                        {Array.isArray(exam.questions) ? exam.questions.length : 0} Questions
                      </span>
                      <span className="flex items-center gap-1 font-medium text-emerald-700">
                        <Users className="w-3.5 h-3.5" />
                        {exam._count?.submissions || 0} Submissions
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <a
                      href={`/services/exam-portal`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#0052cc] hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Candidate Portal
                    </a>
                    <button
                      onClick={() => handleDeleteExam(exam.id, exam.title)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      title="Delete Exam"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* SUBMISSIONS / CANDIDATE SCORES TAB */
        <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm">
          {filteredSubmissions.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <Award className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-[#001f4d]">No candidate submissions yet</h3>
              <p className="text-xs text-slate-500">
                When candidates enter their roll number and passkey on the Exam Portal, their auto-graded scores will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold text-xs uppercase tracking-wider">
                    <th className="py-4 px-6">Candidate</th>
                    <th className="py-4 px-6">Roll / ID</th>
                    <th className="py-4 px-6">Exam Title</th>
                    <th className="py-4 px-6">Score & Points</th>
                    <th className="py-4 px-6">Result Status</th>
                    <th className="py-4 px-6">Submitted At</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredSubmissions.map((sub) => {
                    const isPassed = sub.status === "PASSED";
                    return (
                      <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-bold text-[#001f4d]">{sub.candidateName}</div>
                          {sub.candidateEmail && (
                            <div className="text-xs text-slate-400">{sub.candidateEmail}</div>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                            {sub.candidateId}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-medium text-slate-800 line-clamp-1 max-w-xs">
                            {sub.assessment.title}
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            Passkey: {sub.assessment.examKey}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-bold text-[#001f4d]">
                            {sub.score} / {sub.totalPoints} pts
                          </div>
                          <div className="text-xs font-semibold text-slate-500">
                            {sub.percentage}% (Min: {sub.assessment.passScorePct}%)
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {isPassed ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              PASSED
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold">
                              <XCircle className="w-3.5 h-3.5" />
                              FAILED
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-xs text-slate-500">
                          {new Date(sub.submittedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleDeleteSubmission(sub.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Remove Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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

      {/* CREATE EXAM MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#001f4d]">
                    Schedule & Build New Exam
                  </h2>
                  <p className="text-xs text-slate-500">
                    Define exam parameters, access passcode, and multi-choice questions.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateExam} className="space-y-6">
                {/* General Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700">
                      Exam Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Advanced Java & Spring Boot Certification Exam"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      Category / Stream
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                    >
                      <option value="Certification Exam">Certification Exam</option>
                      <option value="Diagnostic Test">Diagnostic Test</option>
                      <option value="Internship Screening">Internship Screening</option>
                      <option value="Technical Assessment">Technical Assessment</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      Target Cohort / Batch
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. FS-2026 Batch 1"
                      value={formCohort}
                      onChange={(e) => setFormCohort(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      Unique Exam Passkey (Login Code) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. HRA-JAVA2026"
                      value={formExamKey}
                      onChange={(e) => setFormExamKey(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono uppercase focus:outline-none focus:border-[#0052cc]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        Duration (Mins)
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="240"
                        value={formDuration}
                        onChange={(e) => setFormDuration(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        Passing Score (%)
                      </label>
                      <input
                        type="number"
                        min="10"
                        max="100"
                        value={formPassScore}
                        onChange={(e) => setFormPassScore(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700">
                      Instructions / Description
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Brief notes for candidate before beginning assessment..."
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0052cc]"
                    />
                  </div>
                </div>

                {/* Questions Builder Section */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-[#001f4d]">
                        Questions & Answer Key ({questions.length})
                      </h3>
                      <p className="text-xs text-slate-500">
                        Add multi-choice questions and mark the radio button for the correct option.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddQuestion}
                      className="px-4 py-2 rounded-xl bg-blue-50 text-[#0052cc] hover:bg-blue-100 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Question
                    </button>
                  </div>

                  <div className="space-y-5">
                    {questions.map((q, qIdx) => (
                      <div
                        key={q.id || qIdx}
                        className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-3 relative"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-extrabold text-xs text-[#0052cc] uppercase tracking-wider">
                            Question #{qIdx + 1}
                          </span>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                              <span>Points:</span>
                              <input
                                type="number"
                                min="1"
                                max="10"
                                value={q.points}
                                onChange={(e) =>
                                  handlePointsChange(qIdx, parseInt(e.target.value))
                                }
                                className="w-14 px-2 py-1 rounded-lg border border-slate-200 bg-white text-xs font-bold text-center"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveQuestion(qIdx)}
                              className="text-slate-400 hover:text-rose-500 p-1 rounded-lg"
                              title="Delete Question"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <input
                          type="text"
                          required
                          placeholder={`Enter question prompt #${qIdx + 1}...`}
                          value={q.text}
                          onChange={(e) => handleQuestionTextChange(qIdx, e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:border-[#0052cc]"
                        />

                        {/* Options */}
                        <div className="space-y-2 pt-1">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                            Options (Select the correct answer button)
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {q.options.map((opt, optIdx) => {
                              const isCorrect = q.correctOptionIndex === optIdx;
                              return (
                                <div
                                  key={optIdx}
                                  className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                                    isCorrect
                                      ? "bg-emerald-50 border-emerald-300 ring-1 ring-emerald-300"
                                      : "bg-white border-slate-200"
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`correct_${qIdx}`}
                                    checked={isCorrect}
                                    onChange={() => handleCorrectOptionChange(qIdx, optIdx)}
                                    className="accent-emerald-600 w-4 h-4 cursor-pointer"
                                  />
                                  <input
                                    type="text"
                                    required
                                    placeholder={`Option ${optIdx + 1}`}
                                    value={opt}
                                    onChange={(e) =>
                                      handleOptionChange(qIdx, optIdx, e.target.value)
                                    }
                                    className="w-full px-2 py-1 text-xs bg-transparent border-none focus:outline-none text-slate-800"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Action */}
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
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-[#0052cc] hover:bg-[#003882] text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? "Saving Exam..." : "Publish & Activate Exam"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
