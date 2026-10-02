"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  KeyRound,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  BookOpen,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  BadgeCheck,
  GraduationCap,
  FileQuestion,
  User,
  Mail,
  Lock,
  Check,
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
}

interface SubmissionResult {
  candidateId: string;
  candidateName: string;
  score: number;
  totalPoints: number;
  percentage: number;
  status: "PASSED" | "FAILED";
  passScorePct: number;
}

export default function ExamPortalPage() {
  // Login / Auth State
  const [candidateId, setCandidateId] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [examKey, setExamKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Exam taking state
  const [currentExam, setCurrentExam] = useState<Assessment | null>(null);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [submittingTest, setSubmittingTest] = useState(false);

  // Result state
  const [result, setResult] = useState<SubmissionResult | null>(null);

  // Proctored Fullscreen & Tab Switch Violation Tracking
  const [isFullscreenActive, setIsFullscreenActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [violationCount, setViolationCount] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const maxViolations = 3;

  // Request browser fullscreen helper
  const enterBrowserFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
        setIsFullscreenActive(true);
      }
    } catch (err) {
      console.warn("Fullscreen request not permitted or canceled by user:", err);
    }
  };

  const exitBrowserFullscreen = async () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn("Exit fullscreen error:", err);
    }
  };

  // Visibility and Tab Switch Event Listener
  useEffect(() => {
    if (!isExamStarted || result) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab changed or window minimized
        setIsPaused(true);
        setViolationCount((prev) => {
          const nextCount = prev + 1;
          if (nextCount >= maxViolations) {
            // Auto submit after 3 violations
            setTimeout(() => {
              submitExamAnswers(true, "Auto-submitted due to repeated tab switching / browser blur violations (3/3 strikes).");
            }, 500);
          } else {
            setShowWarningModal(true);
          }
          return nextCount;
        });
      }
    };

    const handleWindowBlur = () => {
      if (!document.hidden) {
        setIsPaused(true);
        setViolationCount((prev) => {
          const nextCount = prev + 1;
          if (nextCount >= maxViolations) {
            setTimeout(() => {
              submitExamAnswers(true, "Auto-submitted due to repeated tab switching / browser blur violations (3/3 strikes).");
            }, 500);
          } else {
            setShowWarningModal(true);
          }
          return nextCount;
        });
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isExamStarted && !result) {
        // Exited fullscreen
        setIsFullscreenActive(false);
        setIsPaused(true);
        setShowWarningModal(true);
      } else if (document.fullscreenElement) {
        setIsFullscreenActive(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isExamStarted, result]);

  // Timer countdown (only counts down when test is NOT paused)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isExamStarted && secondsRemaining > 0 && !result && !isPaused) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isExamStarted, secondsRemaining, result, isPaused]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    try {
      const res = await fetch(`/api/exams?key=${encodeURIComponent(examKey.trim())}`);
      const data = await res.json();

      if (res.ok && data.success && data.exam) {
        setCurrentExam(data.exam);
        setSecondsRemaining(data.exam.durationMins * 60);
      } else {
        setAuthError(data.error || "Invalid session passcode or exam key. Please verify with your proctor.");
      }
    } catch (err: any) {
      setAuthError("Network error occurred while verifying credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartExam = async () => {
    if (!candidateName.trim() || !candidateId.trim()) {
      setAuthError("Please provide your full candidate name and roll number.");
      return;
    }
    await enterBrowserFullscreen();
    setIsExamStarted(true);
    setIsPaused(false);
    setViolationCount(0);
  };

  const handleResumeExam = async () => {
    await enterBrowserFullscreen();
    setIsPaused(false);
    setShowWarningModal(false);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isPaused) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleAutoSubmit = () => {
    submitExamAnswers(true, "Time expired");
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const unansweredCount =
      (currentExam?.questions.length || 0) - Object.keys(answers).length;

    if (unansweredCount > 0) {
      if (
        !confirm(
          `You have ${unansweredCount} unanswered questions. Are you sure you want to submit your assessment?`
        )
      ) {
        return;
      }
    }
    submitExamAnswers(false);
  };

  const submitExamAnswers = async (isTimeUp: boolean = false, reason?: string) => {
    if (!currentExam) return;
    setSubmittingTest(true);
    exitBrowserFullscreen();

    const totalSeconds = currentExam.durationMins * 60;
    const timeSpent = Math.max(0, totalSeconds - secondsRemaining);

    try {
      const res = await fetch("/api/exams/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId: currentExam.id,
          candidateId,
          candidateName,
          candidateEmail,
          answers,
          timeSpentSecs: timeSpent,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data.submission);
        setIsExamStarted(false);
      } else {
        alert(data.error || "Submission failed. Please contact your examination proctor.");
      }
    } catch (err) {
      alert("Error submitting examination. Please check connection.");
    } finally {
      setSubmittingTest(false);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleRestart = () => {
    setCurrentExam(null);
    setIsExamStarted(false);
    setAnswers({});
    setCurrentQuestionIdx(0);
    setResult(null);
    setExamKey("");
    setCandidateId("");
    setCandidateName("");
    setCandidateEmail("");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#070c18] text-[#172947] dark:text-slate-100 font-sans selection:bg-[#0052cc]/20 selection:text-[#003882] flex flex-col justify-between">
      <Navbar />

      {/* STATE 1: LOGIN / CANDIDATE ACCESS FORM (50-50 FULLSCREEN HERO LAYOUT) */}
      {!currentExam && !result && (
        <main className="flex-1 w-full pt-0 flex flex-col">
          <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
            
            {/* LEFT 50%: FULL-BLEED COVER ART PANEL */}
            <div className="relative w-full h-[360px] sm:h-[440px] lg:h-full min-h-full overflow-hidden bg-slate-950">
              <img
                src="/exam-art.png"
                alt="HRA Online Examination & Assessment System"
                className="w-full h-full object-cover object-center"
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#061022]/90 via-[#061022]/30 to-[#061022]/40 pointer-events-none" />

              {/* Top Status Header Badge */}
              <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 text-white text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Proctored Assessment System</span>
                </div>
                <div className="text-xs font-mono text-white/80 tracking-wider bg-black/50 px-3 py-1 rounded-full backdrop-blur-xs border border-white/10">
                  SESSION SECURE • 256-BIT
                </div>
              </div>

              {/* Floating Content Badges on Left Image */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                <div />
                <div className="space-y-3">
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/70 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold text-white shadow-2xl"
                  >
                    <BadgeCheck className="w-4 h-4 text-emerald-400" />
                    <span>HRA Global Assessment & Evaluation Board</span>
                  </motion.div>

                  {/* Bottom Metrics Bar */}
                  <div className="pt-4 border-t border-white/20 grid grid-cols-3 gap-3 text-center text-xs backdrop-blur-md bg-black/50 rounded-2xl p-3 border border-white/10">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase tracking-wider text-slate-300 block font-bold">Integrity</span>
                      <span className="font-bold text-white text-xs sm:text-sm">AI Proctored</span>
                    </div>
                    <div className="space-y-0.5 border-x border-white/20">
                      <span className="text-[10px] uppercase tracking-wider text-slate-300 block font-bold">Grading</span>
                      <span className="font-bold text-emerald-400 text-xs sm:text-sm">Instant Score</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase tracking-wider text-slate-300 block font-bold">Format</span>
                      <span className="font-bold text-white text-xs sm:text-sm">MCQ & Timed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT 50%: FULLSCREEN SEAMLESS CANDIDATE LOGIN FORM */}
            <div className="w-full bg-[#f4f8ff] dark:bg-[#090e1a] flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16 xl:p-20 border-l border-blue-100 dark:border-slate-800">
              <div className="w-full max-w-xl mx-auto space-y-6 my-auto">
                
                {/* Header Match */}
                <div className="border-b border-blue-200/80 dark:border-slate-800 pb-5">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0052cc] dark:text-sky-400 bg-blue-100/70 dark:bg-blue-950/60 px-3.5 py-1.5 rounded-full mb-3 border border-blue-200 dark:border-blue-800/60">
                    <GraduationCap className="w-3.5 h-3.5 text-[#0052cc] dark:text-sky-400" />
                    <span>Candidate Examination Portal</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172947] dark:text-white tracking-tight leading-tight">
                    Launch Your Exam
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
                    Enter your roll credentials and authorized exam key to begin your timed test.
                  </p>
                </div>

                {/* Error Banner */}
                {authError && (
                  <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Access Verification Error</span>
                      <span>{authError}</span>
                    </div>
                  </div>
                )}

                {/* Main Access Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  
                  {/* Candidate Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-[#172947] dark:text-slate-300 flex items-center justify-between">
                      <span>Candidate Full Name <span className="text-red-500">*</span></span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        placeholder="Enter candidate full name"
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#0c1427] border-2 border-blue-200/90 dark:border-slate-800 text-[#172947] dark:text-white placeholder:text-slate-400 text-sm font-semibold focus:outline-none focus:border-[#0052cc] dark:focus:border-sky-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Roll Number / Candidate ID */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-[#172947] dark:text-slate-300 flex items-center justify-between">
                      <span>Candidate / Roll ID <span className="text-red-500">*</span></span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Example: HRA-2026-8891</span>
                    </label>
                    <div className="relative">
                      <FileQuestion className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={candidateId}
                        onChange={(e) => setCandidateId(e.target.value)}
                        placeholder="e.g. HRA-2026-8891"
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#0c1427] border-2 border-blue-200/90 dark:border-slate-800 text-[#172947] dark:text-white placeholder:text-slate-400 text-sm font-semibold uppercase tracking-wider focus:outline-none focus:border-[#0052cc] dark:focus:border-sky-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-[#172947] dark:text-slate-300 flex items-center justify-between">
                      <span>Candidate Email <span className="text-slate-400 font-normal">(Optional for score delivery)</span></span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                        placeholder="candidate@example.com"
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#0c1427] border-2 border-blue-200/90 dark:border-slate-800 text-[#172947] dark:text-white placeholder:text-slate-400 text-sm font-semibold focus:outline-none focus:border-[#0052cc] dark:focus:border-sky-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Exam Key */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-[#172947] dark:text-slate-300 flex items-center justify-between">
                      <span>Session Passcode / Exam Key <span className="text-red-500">*</span></span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">e.g. HRA-FS2026 / HRA-DEVOPS</span>
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={examKey}
                        onChange={(e) => setExamKey(e.target.value)}
                        placeholder="Enter exam access code"
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#0c1427] border-2 border-blue-200/90 dark:border-slate-800 text-[#172947] dark:text-white placeholder:text-slate-400 text-sm font-mono font-bold uppercase tracking-wider focus:outline-none focus:border-[#0052cc] dark:focus:border-sky-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-2xl bg-[#0052cc] hover:bg-[#003882] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Verifying Exam Key...</span>
                        </>
                      ) : (
                        <>
                          <span>Verify & Access Exam</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Footer Security Note */}
                <div className="pt-4 border-t border-blue-200/70 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Proctor Automated Verification
                  </span>
                  <Link href="/contact" className="hover:text-[#0052cc] dark:hover:text-sky-400 font-semibold transition-colors">
                    Need Proctor Support?
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </main>
      )}

      {/* STATE 2: PRE-EXAM BRIEFING & START SCREEN */}
      {currentExam && !isExamStarted && !result && (
        <main className="flex-1 py-12 sm:py-16 bg-[#f8fafc] dark:bg-[#070c18]">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 space-y-8 shadow-xl"
            >
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0052cc] dark:text-sky-300 text-xs font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-800/60">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>{currentExam.category}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#172947] dark:text-white">
                    {currentExam.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Candidate: <strong className="text-[#172947] dark:text-white">{candidateName}</strong> (Roll: {candidateId})
                  </p>
                </div>

                <div className="sm:text-right bg-blue-50/80 dark:bg-blue-950/40 p-4 rounded-2xl border border-blue-100 dark:border-blue-800/60 shrink-0">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Time Allowed</div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0052cc] dark:text-sky-400">
                    {currentExam.durationMins} Mins
                  </div>
                </div>
              </div>

              {/* Assessment Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-1">
                  <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Total Questions</span>
                  <div className="text-2xl font-extrabold text-[#172947] dark:text-white">
                    {currentExam.questions.length} Items
                  </div>
                </div>
                <div className="bg-emerald-50/60 dark:bg-emerald-950/40 p-5 rounded-2xl border border-emerald-200/80 dark:border-emerald-800 space-y-1">
                  <span className="text-[11px] uppercase font-bold text-emerald-700 dark:text-emerald-400 block">Passing Mark</span>
                  <div className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">
                    {currentExam.passScorePct}% Score
                  </div>
                </div>
                <div className="bg-indigo-50/60 dark:bg-indigo-950/40 p-5 rounded-2xl border border-indigo-200/80 dark:border-indigo-800 space-y-1">
                  <span className="text-[11px] uppercase font-bold text-indigo-700 dark:text-indigo-400 block">Cohort / Stream</span>
                  <div className="text-2xl font-extrabold text-indigo-800 dark:text-indigo-300 truncate">
                    {currentExam.courseCohort || "General"}
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-800/50 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
                <strong className="text-[#0052cc] dark:text-sky-400 block text-sm font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Examination Guidelines & Instructions:
                </strong>
                <p>
                  {currentExam.description ||
                    "Please answer all multiple-choice questions within the allocated time. Do not refresh or navigate away from the browser window during the test. Your score will be auto-evaluated immediately upon final submission."}
                </p>
                <ul className="list-disc list-inside text-xs text-slate-500 dark:text-slate-400 space-y-1 pt-1">
                  <li>Each question carries designated points toward your total percentage.</li>
                  <li>You may navigate back and forth between questions before final submission.</li>
                  <li>Test auto-submits automatically when the countdown timer reaches zero.</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentExam(null)}
                  className="px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel & Back
                </button>
                <button
                  type="button"
                  onClick={handleStartExam}
                  className="px-8 py-3.5 rounded-2xl bg-[#0052cc] hover:bg-[#003882] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all duration-200 hover:scale-[1.02] cursor-pointer flex items-center gap-2"
                >
                  <span>Start Assessment Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </main>
      )}

      {/* STATE 3: LIVE EXAM QUESTION TEST INTERFACE (FULLSCREEN IMMERSIVE ASSESSMENT ENVIRONMENT) */}
      {currentExam && isExamStarted && !result && (
        <main className="flex-1 w-full min-h-[calc(100vh-80px)] bg-[#f8fafc] dark:bg-[#070c18] flex flex-col justify-between">
          {/* Top Fixed Control Bar */}
          <div className="bg-white dark:bg-[#0c1427] border-b border-slate-200/90 dark:border-slate-800 px-6 sm:px-10 lg:px-16 py-4 shadow-sm">
            <div className="w-full max-w-[1720px] mx-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-[#0052cc] dark:text-sky-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 text-[11px] font-bold text-[#0052cc] dark:text-sky-400 uppercase tracking-wider">
                    <span>{currentExam.category}</span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span>{currentExam.courseCohort || "General Cohort"}</span>
                  </div>
                  <h2 className="font-extrabold text-base sm:text-xl text-[#172947] dark:text-white leading-tight">
                    {currentExam.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
                <div className="hidden md:block text-right">
                  <span className="text-xs text-slate-400 block font-medium">Candidate</span>
                  <span className="text-xs sm:text-sm font-bold text-[#172947] dark:text-white">
                    {candidateName} <span className="font-mono text-slate-500 dark:text-slate-400">({candidateId})</span>
                  </span>
                </div>

                {/* Live Countdown Timer */}
                <div
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl border font-mono font-black text-sm sm:text-base shadow-sm ${
                    secondsRemaining < 300
                      ? "bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 animate-pulse"
                      : "bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-[#0052cc] dark:text-sky-400"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>{formatTimer(secondsRemaining)}</span>
                </div>

                {/* Submit Test Button */}
                <button
                  onClick={handleManualSubmit}
                  disabled={submittingTest}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all duration-200 hover:scale-[1.02] cursor-pointer disabled:opacity-50"
                >
                  {submittingTest ? "Submitting..." : "Submit Final Exam"}
                </button>
              </div>
            </div>
          </div>

          {/* Fullscreen Body: Split Layout (Question Navigator Left + Active Question Right) */}
          <div className="flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left Column: Quick Question Navigator (3 Cols on Desktop) */}
            <div className="lg:col-span-3 bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5 lg:sticky lg:top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-[#172947] dark:text-slate-200 uppercase tracking-wider">
                  Question Palette
                </span>
                <span className="text-xs font-semibold text-[#0052cc] dark:text-sky-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full">
                  {Object.keys(answers).length} / {currentExam.questions.length} Answered
                </span>
              </div>

              {/* Navigator Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-4 gap-2.5 max-h-[350px] overflow-y-auto pr-1">
                {currentExam.questions.map((q, idx) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isCurrent = currentQuestionIdx === idx;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIdx(idx)}
                      className={`h-11 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-center relative ${
                        isCurrent
                          ? "bg-[#0052cc] text-white ring-4 ring-blue-100 dark:ring-blue-900/50 shadow-md scale-105"
                          : isAnswered
                          ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/60"
                          : "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span>{idx + 1}</span>
                      {isAnswered && !isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute top-1.5 right-1.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-[#0052cc]" />
                  <span>Current Question</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800" />
                  <span>Not Answered</span>
                </div>
              </div>
            </div>

            {/* Right Column: Fullscreen Question Workspace (9 Cols on Desktop) */}
            <div className="lg:col-span-9 bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm space-y-8 flex flex-col justify-between min-h-[550px]">
              {currentExam.questions[currentQuestionIdx] && (
                <>
                  <div className="space-y-6">
                    {/* Top Status & Points */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0052cc] dark:text-sky-300 text-xs font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-800/60">
                        <FileQuestion className="w-3.5 h-3.5" />
                        <span>Question {currentQuestionIdx + 1} of {currentExam.questions.length}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800">
                        Marks Weightage: <span className="text-[#0052cc] dark:text-sky-400">{currentExam.questions[currentQuestionIdx].points || 1} Points</span>
                      </div>
                    </div>

                    {/* Question Prompt */}
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#172947] dark:text-white leading-relaxed tracking-tight">
                      {currentExam.questions[currentQuestionIdx].text}
                    </h3>

                    {/* MCQ Options */}
                    <div className="space-y-3.5 pt-2">
                      {currentExam.questions[currentQuestionIdx].options.map((opt, optIdx) => {
                        const qId = currentExam.questions[currentQuestionIdx].id;
                        const isSelected = answers[qId] === optIdx;

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectOption(qId, optIdx)}
                            className={`p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center gap-4 ${
                              isSelected
                                ? "bg-blue-50/90 dark:bg-blue-950/70 border-[#0052cc] dark:border-sky-400 text-[#172947] dark:text-white shadow-md ring-4 ring-blue-100/60 dark:ring-blue-900/40"
                                : "bg-slate-50/50 dark:bg-slate-900/50 border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 transition-all ${
                                isSelected
                                  ? "bg-[#0052cc] text-white shadow-sm"
                                  : "bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </div>
                            <span className="text-sm sm:text-base lg:text-lg font-semibold leading-snug">
                              {opt}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      disabled={currentQuestionIdx === 0}
                      onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
                      className="px-6 sm:px-8 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 disabled:opacity-30 cursor-pointer flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous Question</span>
                    </button>

                    {currentQuestionIdx < currentExam.questions.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentQuestionIdx((p) => p + 1)}
                        className="px-8 sm:px-10 py-3.5 rounded-2xl bg-[#0052cc] hover:bg-[#003882] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all duration-200 hover:scale-[1.02] cursor-pointer flex items-center gap-2"
                      >
                        <span>Next Question</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleManualSubmit}
                        className="px-8 sm:px-10 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all duration-200 hover:scale-[1.02] cursor-pointer flex items-center gap-2"
                      >
                        <span>Submit Final Test</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

          </div>
        </main>
      )}

      {/* STATE 4: RESULT SCREEN */}
      {result && (
        <main className="flex-1 w-full min-h-[calc(100vh-80px)] py-12 sm:py-16 bg-[#f8fafc] dark:bg-[#070c18] flex items-center justify-center">
          <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 space-y-8 shadow-2xl text-center"
            >
              <div className="space-y-3">
                <div
                  className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl shadow-lg ${
                    result.status === "PASSED"
                      ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-200 dark:border-emerald-800"
                      : "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-2 border-rose-200 dark:border-rose-800"
                  }`}
                >
                  {result.status === "PASSED" ? (
                    <Award className="w-10 h-10" />
                  ) : (
                    <XCircle className="w-10 h-10" />
                  )}
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  {result.status === "PASSED" ? (
                    <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3.5 py-1 rounded-full">
                      ASSESSMENT PASSED
                    </span>
                  ) : (
                    <span className="bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 px-3.5 py-1 rounded-full">
                      ASSESSMENT FAILED
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172947] dark:text-white">
                  {result.candidateName}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Roll / Candidate ID: <strong className="font-mono text-[#172947] dark:text-slate-200">{result.candidateId}</strong>
                </p>
              </div>

              {/* Score Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Points Earned
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-[#172947] dark:text-white">
                    {result.score} / {result.totalPoints}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Your Percentage
                  </span>
                  <div
                    className={`text-xl sm:text-2xl font-black ${
                      result.status === "PASSED" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {result.percentage}%
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Required Pass Mark
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-slate-700 dark:text-slate-200">
                    {result.passScorePct}%
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {result.status === "PASSED" ? (
                  <span>
                    🎉 Congratulations! Your test score has been verified by the evaluation board. Your completion certificate is eligible for issuance via the Certificate Portal.
                  </span>
                ) : (
                  <span>
                    Your score did not meet the minimum passing threshold for this exam session. Please reach out to your instructor or proctor coordinator for re-assessment details.
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-7 py-3.5 rounded-2xl bg-[#0052cc] hover:bg-[#003882] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Return to Exam Portal</span>
                </button>
                {result.status === "PASSED" && (
                  <Link
                    href="/services/certificate-portal"
                    className="px-7 py-3.5 rounded-2xl border-2 border-[#0052cc] text-[#0052cc] dark:text-sky-400 dark:border-sky-500 font-bold text-xs sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors flex items-center gap-2"
                  >
                    <Award className="w-4 h-4" />
                    <span>Go to Certificate Portal</span>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      )}

      {/* TAB SWITCH / FULLSCREEN EXIT PROCTOR WARNING MODAL (PAUSE STATE) */}
      <AnimatePresence>
        {isExamStarted && !result && isPaused && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-[#0c1427] rounded-3xl shadow-2xl border-2 border-rose-300 dark:border-rose-700 max-w-lg w-full p-6 sm:p-8 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-3xl bg-rose-100 dark:bg-rose-950/80 border-2 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto shadow-inner">
                <AlertTriangle className="w-8 h-8 animate-bounce" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-extrabold uppercase tracking-wider border border-rose-200 dark:border-rose-800">
                  <span>Proctored Security Alert • Exam Paused</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#172947] dark:text-white">
                  Tab Switching / Window Blur Detected
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Navigating away from the examination window or exiting fullscreen mode violates the proctored assessment guidelines.
                </p>
              </div>

              {/* Strike Indicator Badges */}
              <div className="bg-rose-50/70 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-200/90 dark:border-rose-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-rose-900 dark:text-rose-200">
                  <span>Violation Count:</span>
                  <span className="text-sm font-black text-rose-600 dark:text-rose-400">
                    Strike {violationCount} of {maxViolations}
                  </span>
                </div>
                
                {/* Visual Strike Progress Bars */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[1, 2, 3].map((strike) => (
                    <div
                      key={strike}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        violationCount >= strike
                          ? "bg-rose-600 shadow-sm"
                          : "bg-slate-200 dark:bg-slate-800"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-[11px] font-semibold text-rose-700 dark:text-rose-300 pt-1 text-left">
                  {violationCount >= maxViolations ? (
                    <strong className="text-red-600 dark:text-red-400">
                      🚨 3 strikes reached. Your examination is being submitted automatically.
                    </strong>
                  ) : (
                    <span>
                      ⚠️ Warning: If you switch tabs or leave fullscreen <strong>{maxViolations - violationCount} more time{maxViolations - violationCount > 1 ? "s" : ""}</strong>, your assessment will be auto-submitted immediately.
                    </span>
                  )}
                </p>
              </div>

              {/* Action Button to Resume & Re-enter Fullscreen */}
              {violationCount < maxViolations && (
                <button
                  onClick={handleResumeExam}
                  className="w-full py-4 rounded-2xl bg-[#0052cc] hover:bg-[#003882] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Resume Assessment in Fullscreen</span>
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
