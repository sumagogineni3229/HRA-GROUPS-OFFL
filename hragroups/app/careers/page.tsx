"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BigPolygonBackground from "@/components/BigPolygonBackground";
import {
  ArrowRight,
  ArrowLeft,
  MapPin,
  Briefcase,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Shield,
  Phone,
  FileText,
  Building2,
  ChevronDown,
  GraduationCap,
  Users2,
  UploadCloud,
} from "lucide-react";

const CAREER_HERO_PHRASES = [
  "Build a Career That Makes an Impact",
  "Shape the Future of Technology",
  "Innovate, Transform & Grow",
  "Join a Team Driven by Purpose",
];

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  
  // Fullscreen Job Application Form State
  const [isJobFormFullscreen, setIsJobFormFullscreen] = useState<boolean>(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>("General Application");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Typewriter text animation state
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  useEffect(() => {
    const fullText = CAREER_HERO_PHRASES[phraseIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(60);

        if (currentText.length + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(35);

        if (currentText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % CAREER_HERO_PHRASES.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, typingSpeed]);

  // Job Application form fields
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantLocation, setApplicantLocation] = useState("Hyderabad, India");
  const [applicantExperience, setApplicantExperience] = useState("Fresher");
  const [applicantSkills, setApplicantSkills] = useState("");
  const [applicantResumeUrl, setApplicantResumeUrl] = useState("");
  const [applicantResumeFile, setApplicantResumeFile] = useState<File | null>(null);
  const [applicantMessage, setApplicantMessage] = useState("");
  const [submittingApp, setSubmittingApp] = useState(false);
  const [appSuccessMsg, setAppSuccessMsg] = useState(false);

  // Dynamic database roles loaded from DB
  const [dbRoles, setDbRoles] = useState<any[]>([]);
  const [loadingRoles, setLoadingRoles] = useState<boolean>(true);

  useEffect(() => {
    setLoadingRoles(true);
    fetch("/api/careers/roles")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.roles) {
          const formatted = data.roles
            .filter((r: any) => r.isActive !== false)
            .map((r: any) => ({
              id: r.id,
              title: r.title,
              dept: r.dept || "Engineering",
              location: r.location || "Hyderabad, India",
              type: r.type || "Full-Time",
              experience: r.experience || "1–3 Years",
              desc: r.desc,
              applyLink: r.applyLink,
              isLiveDirect: Boolean(r.applyLink),
              tags: r.tags && r.tags.length > 0 ? r.tags : [r.dept, r.type, r.location].filter(Boolean),
            }));
          setDbRoles(formatted);
        }
      })
      .catch((err) => console.error("Error loading career roles:", err))
      .finally(() => setLoadingRoles(false));
  }, []);

  // Scroll to top when opening fullscreen form
  useEffect(() => {
    if (isJobFormFullscreen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isJobFormFullscreen]);

  // Handle ESC key to exit fullscreen form
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isJobFormFullscreen) {
        setIsJobFormFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isJobFormFullscreen]);

  const { scrollY } = useScroll();
  const heroContentY = useTransform(scrollY, [0, 500], [0, -35]);

  const departments = useMemo(() => {
    const list = ["All"];
    dbRoles.forEach((role) => {
      if (role.dept && !list.includes(role.dept)) {
        list.push(role.dept);
      }
    });
    return list;
  }, [dbRoles]);

  const whyWorkItems = [
    {
      title: "Structured Career Growth & Mentorship",
      desc: "Personalized roadmaps, one-on-one leadership guidance, and clear progression opportunities across multiple domains",
      icon: <TrendingUp className="w-6 h-6 text-[#00c9ff]" />,
    },
    {
      title: "Professional & Collaborative Work Culture",
      desc: "A vibrant, team-first environment celebrating innovative ideas, peer collaboration, and inclusive synergy",
      icon: <Users2 className="w-6 h-6 text-[#00c9ff]" />,
    },
    {
      title: "Continuous Learning & Upskilling",
      desc: "Regular workshops, hands-on enterprise projects, access to industry certifications, and domain masterclasses",
      icon: <GraduationCap className="w-6 h-6 text-[#00c9ff]" />,
    },
    {
      title: "Balanced & Flexible Work Environment",
      desc: "A healthy work-life balance with modern hybrid possibilities, transparent communication, and supportive teams",
      icon: <Shield className="w-6 h-6 text-[#00c9ff]" />,
    },
  ];

  const applicationDetailsRequired = [
    "Full name and active contact details",
    "Email ID and residential address",
    "Location preference (Hyderabad / Remote / Hybrid)",
    "Educational background and academic qualifications",
    "Work experience / employment history (if any)",
    "Skills and relevant certifications",
    "Expected CTC and notice period",
    "Updated resume / portfolio (PDF format)",
  ];

  const filteredOpenings = useMemo(() => {
    if (selectedDept === "All") return dbRoles;
    return dbRoles.filter((job) => job.dept === selectedDept);
  }, [dbRoles, selectedDept]);

  const handleOpenJobForm = (jobTitle: string, jobId?: string) => {
    setSelectedJobTitle(jobTitle);
    setSelectedJobId(jobId || null);
    setIsJobFormFullscreen(true);
    setAppSuccessMsg(false);
  };

  const handleJobFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingApp(true);

    try {
      let finalResumeUrl = applicantResumeUrl;

      // If candidate attached a local file, upload it first to /api/careers/upload
      if (applicantResumeFile) {
        const formData = new FormData();
        formData.append("resume", applicantResumeFile);
        const uploadRes = await fetch("/api/careers/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (uploadData.success && uploadData.resumeUrl) {
          finalResumeUrl = uploadData.resumeUrl;
        }
      }

      const res = await fetch("/api/careers/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          careerRoleId: selectedJobId,
          roleTitle: selectedJobTitle,
          fullName: applicantName,
          email: applicantEmail,
          phone: applicantPhone,
          location: applicantLocation,
          experience: applicantExperience,
          skills: applicantSkills,
          resumeUrl: finalResumeUrl,
          coverLetter: applicantMessage,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAppSuccessMsg(true);
      } else {
        alert(data.error || "Failed to submit application");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setSubmittingApp(false);
    }
  };

  // ===================== FULLSCREEN JOB APPLICATION FORM VIEW =====================
  if (isJobFormFullscreen) {
    return (
      <div className="ibase-landing-bg text-white min-h-screen selection:bg-[#00c9ff]/30 selection:text-[#00c9ff] relative overflow-x-hidden font-sans">
        <Navbar />

        {/* Global Background Layer with Big Polygons */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
          <BigPolygonBackground opacityClass="opacity-75" />
          <div className="absolute top-[10%] -left-[10%] w-[650px] h-[650px] bg-[#00c9ff]/[0.035] rounded-full blur-[220px]" />
          <div className="absolute top-[50%] -right-[15%] w-[800px] h-[800px] bg-[#1e1cb0]/[0.05] rounded-full blur-[250px]" />
        </div>

        <main className="relative z-20 pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16 xl:px-24 max-w-[1200px] mx-auto">
          {/* Top Bar / Return */}
          <div className="flex items-center justify-between pb-8 mb-10 border-b border-white/10">
            <button
              onClick={() => {
                setIsJobFormFullscreen(false);
                setAppSuccessMsg(false);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 hover:border-[#00c9ff]/50 text-xs sm:text-sm font-mono text-white/80 hover:text-[#00c9ff] transition-all cursor-pointer backdrop-blur-md hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Careers Overview</span>
            </button>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00c9ff]">
              <Briefcase className="w-3.5 h-3.5" />
              <span>JOB APPLICATION</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00c9ff]/15 border border-[#00c9ff]/30 text-[#00c9ff] text-xs font-mono uppercase tracking-widest">
                <Building2 className="w-4 h-4" />
                <span>Position: {selectedJobTitle}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light font-serif text-white tracking-tight leading-[1.12]">
                Apply For {selectedJobTitle}
              </h1>

              <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
                Submit your credentials directly to the HRA Groups talent acquisition team for review
              </p>
            </div>

            {appSuccessMsg ? (
              <div className="rounded-3xl bg-[#071225]/90 border border-emerald-500/30 p-10 sm:p-16 text-center space-y-6 backdrop-blur-2xl shadow-[0_0_80px_rgba(16,185,129,0.2)]">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2 max-w-xl mx-auto">
                  <h2 className="text-2xl sm:text-3xl font-light font-serif text-white">
                    Application Received Successfully!
                  </h2>
                  <p className="text-sm sm:text-base text-emerald-300 font-light leading-relaxed">
                    Thank you for applying to HRA Groups. Our HR recruitment team will review your qualifications and contact you regarding the next interview stages
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setAppSuccessMsg(false);
                      setIsJobFormFullscreen(false);
                    }}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer"
                  >
                    Return to Careers Page
                  </button>
                  <Link
                    href="/about/company-overview"
                    className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-xs sm:text-sm backdrop-blur-md"
                  >
                    Learn About HRA Culture
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-12 backdrop-blur-2xl shadow-2xl space-y-8">
                <form onSubmit={handleJobFormSubmit} className="space-y-8">
                  {/* Step 1: Personal & Contact */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase pb-2 border-b border-white/10">
                      <span className="w-5 h-5 rounded-full bg-[#00c9ff]/20 text-[#00c9ff] flex items-center justify-center text-[10px] font-bold">01</span>
                      <span>Candidate Identification</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="text-xs font-mono text-white/70 block mb-2">
                          Full Name <span className="text-[#00c9ff]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#00c9ff] transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-white/70 block mb-2">
                          Email Address <span className="text-[#00c9ff]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#00c9ff] transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-white/70 block mb-2">
                          Phone Number <span className="text-[#00c9ff]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          placeholder="+91 96762 72283"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#00c9ff] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Experience & Location */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase pb-2 border-b border-white/10">
                      <span className="w-5 h-5 rounded-full bg-[#00c9ff]/20 text-[#00c9ff] flex items-center justify-center text-[10px] font-bold">02</span>
                      <span>Experience &amp; Work Location</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="text-xs font-mono text-white/70 block mb-2">
                          Experience Level
                        </label>
                        <select
                          value={applicantExperience}
                          onChange={(e) => setApplicantExperience(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#040e1c] border border-white/15 text-sm text-white focus:outline-none focus:border-[#00c9ff] transition-all cursor-pointer"
                        >
                          <option value="Fresher / Entry Level">Fresher / Entry Level</option>
                          <option value="1–2 Years">1–2 Years</option>
                          <option value="3–5 Years">3–5 Years</option>
                          <option value="5–8 Years">5–8 Years (Senior)</option>
                          <option value="8+ Years">8+ Years (Lead / Principal)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-white/70 block mb-2">
                          Current Location / City
                        </label>
                        <input
                          type="text"
                          value={applicantLocation}
                          onChange={(e) => setApplicantLocation(e.target.value)}
                          placeholder="e.g. Hyderabad, India / Bengaluru / Remote"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#00c9ff] transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-white/70 block mb-2">
                          Key Technical Skills / Stack
                        </label>
                        <input
                          type="text"
                          value={applicantSkills}
                          onChange={(e) => setApplicantSkills(e.target.value)}
                          placeholder="e.g. React, Next.js, Node.js, Python, AWS"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#00c9ff] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Resume Upload */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase pb-2 border-b border-white/10">
                      <span className="w-5 h-5 rounded-full bg-[#00c9ff]/20 text-[#00c9ff] flex items-center justify-center text-[10px] font-bold">03</span>
                      <span>Resume &amp; Cover Note</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs font-mono text-white/70 block mb-2">
                          Upload Resume File (PDF / DOCX) <span className="text-[#00c9ff]">*</span>
                        </label>
                        <div className="border border-dashed border-white/20 rounded-xl p-3.5 bg-white/5 text-center relative hover:border-[#00c9ff] transition-colors cursor-pointer flex items-center justify-center gap-2">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setApplicantResumeFile(e.target.files[0]);
                              }
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          <UploadCloud className="w-4 h-4 text-[#00c9ff]" />
                          <span className="text-xs font-mono text-white/80 truncate">
                            {applicantResumeFile ? applicantResumeFile.name : "📁 Choose Resume PDF File"}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-white/70 block mb-2">
                          Or Provide Link (LinkedIn / Google Drive / GitHub)
                        </label>
                        <input
                          type="url"
                          value={applicantResumeUrl}
                          onChange={(e) => setApplicantResumeUrl(e.target.value)}
                          placeholder="https://linkedin.com/in/username or drive link"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#00c9ff] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-white/70 block mb-2">
                        Brief Cover Note / Why HRA Groups?
                      </label>
                      <textarea
                        rows={3}
                        value={applicantMessage}
                        onChange={(e) => setApplicantMessage(e.target.value)}
                        placeholder="Tell us about your background, achievements, and why you are excited for this role..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[#00c9ff] transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                    <p className="text-xs text-white/50 font-mono">
                      ✦ All applications are kept confidential and reviewed directly by our recruitment department
                    </p>

                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => setIsJobFormFullscreen(false)}
                        className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={submittingApp}
                        className="px-10 py-3.5 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-xs sm:text-sm tracking-wide shadow-[0_0_30px_rgba(0,201,255,0.4)] hover:shadow-[0_0_45px_rgba(0,201,255,0.7)] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <span>{submittingApp ? "Submitting Application..." : "Submit Direct Application"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </main>

        <Footer />
      </div>
    );
  }

  // ===================== STANDARD CAREERS PAGE VIEW =====================
  return (
    <div className="ibase-landing-bg text-white min-h-screen selection:bg-[#00c9ff]/30 selection:text-[#00c9ff] relative overflow-hidden font-sans">
      <Navbar />

      {/* Global Background Layer with Big Polygons (Exact match to Work & Founder Program pages) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        <BigPolygonBackground opacityClass="opacity-75" />
        <div className="absolute top-[10%] -left-[10%] w-[650px] h-[650px] bg-[#00c9ff]/[0.035] rounded-full blur-[220px]" />
        <div className="absolute top-[50%] -right-[15%] w-[800px] h-[800px] bg-[#1e1cb0]/[0.05] rounded-full blur-[250px]" />
      </div>

      <main className="relative z-20">
        {/* HERO SECTION - EXACT VERTICAL & HORIZONTAL CENTERING WITH TYPEWRITER ANIMATION */}
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6 sm:px-10 lg:px-16 pt-20 pb-20 text-center">
          <motion.div
            style={{ y: heroContentY }}
            className="w-full max-w-4xl mx-auto space-y-8 flex flex-col items-center justify-center"
          >
            {/* Eyebrow Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm font-mono tracking-[0.25em] text-[#00c9ff] uppercase shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#00c9ff] animate-pulse" />
              <span>CAREERS &amp; CULTURE</span>
            </motion.div>

            {/* Typewriter Animated Display Headline */}
            <div className="min-h-[110px] sm:min-h-[140px] md:min-h-[160px] flex items-center justify-center w-full px-2">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-light text-white tracking-[-0.03em] leading-[1.08] text-center font-serif">
                <span className="text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.2)]">
                  {currentText}
                </span>
                <span className="text-[#00c9ff] ml-1.5 font-light animate-[pulse_1s_infinite]">|</span>
              </h1>
            </div>

            {/* Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="space-y-4 max-w-2xl mx-auto"
            >
              <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
                Join a dynamic, fast-growing company where your ideas are valued, your skills are sharpened, and your career takes off with{" "}
                <a
                  href="https://www.linkedin.com/company/hragroups"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00c9ff] underline underline-offset-4 font-normal hover:text-white transition-colors"
                >
                  HRA Groups
                </a>
                .
              </p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-4 pt-4"
              >
                <a
                  href="#openings"
                  className="inline-flex items-center justify-center px-9 py-4 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-sm tracking-wide shadow-[0_0_30px_rgba(0,201,255,0.35)] hover:shadow-[0_0_45px_rgba(0,201,255,0.55)] transition-all duration-300 hover:scale-[1.03]"
                >
                  <span>View Job Openings</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>

                <button
                  onClick={() => handleOpenJobForm("General Application")}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-sm backdrop-blur-md transition-all duration-300 cursor-pointer hover:border-[#00c9ff]/50"
                >
                  <span>Apply Directly ↗</span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom Animated Scroll Indicator */}
          <button
            onClick={() => {
              const el = document.getElementById("why-work-with-us");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40 hover:text-[#00c9ff] transition-colors duration-300 cursor-pointer group"
            aria-label="Scroll to explore career opportunities"
          >
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase group-hover:tracking-[0.3em] transition-all">
              Scroll to explore
            </span>
            <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-[#00c9ff]/60 flex items-start justify-center p-1 transition-colors">
              <div className="w-1 h-2 bg-[#00c9ff] rounded-full animate-bounce" />
            </div>
            <ChevronDown className="w-4 h-4 -mt-1 text-[#00c9ff] animate-pulse" />
          </button>
        </section>

        {/* WHY WORK WITH US SECTION */}
        <section id="why-work-with-us" className="py-20 sm:py-24 border-t border-white/10 relative">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-14 space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#00c9ff]">
                <Sparkles className="w-3.5 h-3.5 text-[#00c9ff]" />
                <span>Why Work With Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white font-serif tracking-tight">
                Grow With HRA Groups
              </h2>
              <p className="text-white/60 font-light text-sm sm:text-base max-w-xl mx-auto">
                We empower our people with the resources, mentorship, and opportunities they need to reach their highest potential.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyWorkItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 space-y-4 hover:border-[#00c9ff]/40 transition-all duration-300 flex flex-col justify-between backdrop-blur-md hover:bg-white/[0.04]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-light font-serif text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* JOB OPENINGS SECTION WITH FILTER TABS */}
        <section id="openings" className="py-20 sm:py-24 border-t border-white/10">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 space-y-12">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-3 max-w-xl"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#00c9ff]">
                  <Briefcase className="w-3.5 h-3.5 text-[#00c9ff]" />
                  <span>Current Openings</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white font-serif tracking-tight">
                  Explore Open Positions
                </h2>
                <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
                  Discover active openings and submit your application to join our growing team in Hyderabad or remotely
                </p>
              </motion.div>

              {/* Department Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                {departments.map((dept) => {
                  const active = selectedDept === dept;
                  return (
                    <button
                      key={dept}
                      onClick={() => setSelectedDept(dept)}
                      className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 cursor-pointer capitalize z-10 whitespace-nowrap ${
                        active
                          ? "bg-[#00c9ff] text-black font-semibold shadow-[0_0_20px_rgba(0,201,255,0.35)]"
                          : "text-white/70 hover:text-white bg-white/[0.03] border border-white/10 hover:bg-white/[0.07]"
                      }`}
                    >
                      <span>{dept}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Job Openings List */}
            <motion.div layout className="flex flex-col gap-4 sm:gap-5">
              {loadingRoles ? (
                <div className="py-16 text-center rounded-3xl bg-white/[0.02] border border-white/10 p-8 space-y-3 backdrop-blur-md">
                  <div className="w-8 h-8 border-2 border-[#00c9ff] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-white/60 text-sm font-mono">Checking active career openings...</p>
                </div>
              ) : filteredOpenings.length === 0 ? (
                <div className="py-20 px-6 text-center rounded-3xl bg-white/[0.02] border border-dashed border-white/15 p-8 space-y-4 backdrop-blur-md">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#00c9ff]">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-light font-serif text-white">
                    No Current Openings {selectedDept !== "All" ? `in ${selectedDept}` : ""}
                  </h3>
                  <p className="text-sm sm:text-base text-white/50 font-light max-w-lg mx-auto">
                    We are not actively recruiting for this category at the moment. New job positions added by the admin will appear here in real time
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleOpenJobForm("General Career Application")}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Submit General Application</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredOpenings.map((job) => (
                    <motion.div
                      layout
                      key={job.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/40 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-300 backdrop-blur-md hover:bg-white/[0.04] group"
                    >
                      {/* Job Details Main Area */}
                      <div className="space-y-3 flex-1">
                        {/* Top badging row */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-white/5 text-[#00c9ff] text-xs font-mono uppercase tracking-wider border border-white/10">
                            {job.dept}
                          </span>
                          {job.isLiveDirect && (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-800 text-[11px] font-mono uppercase tracking-wider">
                              Active Role
                            </span>
                          )}
                          <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-white/70 text-[11px] font-mono border border-white/10">
                            {job.type}
                          </span>
                        </div>

                        {/* Job Title */}
                        <h3 className="text-xl sm:text-2xl font-light font-serif text-white group-hover:text-[#73bbff] transition-colors">
                          {job.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed max-w-4xl">
                          {job.desc}
                        </p>

                        {/* In-line Meta Information (Location, Experience, Tags) */}
                        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-white/60 font-mono">
                          <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                            <MapPin className="w-3.5 h-3.5 text-[#00c9ff]" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                            <Briefcase className="w-3.5 h-3.5 text-[#00c9ff]" />
                            <span>{job.experience}</span>
                          </div>

                          {job.tags && job.tags.length > 0 && (
                            <div className="hidden sm:flex flex-wrap items-center gap-1.5 pl-2 border-l border-white/10">
                              {job.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-white/50 border border-white/5"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Side Action Button */}
                      <div className="flex items-center shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/10">
                        {job.applyLink ? (
                          <a
                            href={job.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer whitespace-nowrap w-full sm:w-auto"
                          >
                            <span>Apply</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <button
                            onClick={() => handleOpenJobForm(job.title, job.id)}
                            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer whitespace-nowrap w-full sm:w-auto"
                          >
                            <span>Apply</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </motion.div>
          </div>
        </section>

        {/* HOW TO APPLY & ASSISTANCE SECTION */}
        <section className="py-20 border-t border-white/10">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-14 space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-[#00c9ff]">
                <FileText className="w-3.5 h-3.5 text-[#00c9ff]" />
                <span>Application Guide</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white font-serif tracking-tight">
                How To Apply
              </h2>
              <p className="text-white/60 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Complete our online application form with accurate details. Our HR team will review your profile and connect with shortlisted candidates promptly
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Box: Details Required */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-10 space-y-6 flex flex-col justify-between backdrop-blur-md"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00c9ff]">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-light font-serif text-white">
                        Details Required
                      </h3>
                      <p className="text-xs text-white/50 font-light">
                        Ensure you have the following information prepared before applying:
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {applicationDetailsRequired.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs sm:text-sm text-white/80 font-light"
                      >
                        <span className="text-[#00c9ff] font-bold shrink-0 mt-0.5">✦</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs text-white/50 font-mono flex items-center gap-2">
                  <span>📁 Applications are reviewed on a rolling basis by our talent team</span>
                </div>
              </motion.div>

              {/* Right Box: Need Assistance & Direct Form CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#08172a] via-[#040e1c] to-black p-8 sm:p-10 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden border border-white/15 backdrop-blur-xl"
              >
                {/* Background ambient light */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00c9ff]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00c9ff]">
                      Direct Support
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-light font-serif text-white">
                      Need Assistance?
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                      Have questions about the application process, domain prerequisites, or onboarding timelines? Reach out to our HR representative
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#00c9ff]" />
                      <div>
                        <span className="text-[11px] text-white/50 uppercase tracking-wider block font-mono">
                          HR Contact &amp; Helpline
                        </span>
                        <strong className="text-lg font-medium text-white tracking-wide">
                          +91 96762 72283
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-6 relative z-10">
                  <button
                    onClick={() => handleOpenJobForm("General Corporate Application")}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-sm shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Direct In-App Application</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>

                  <a
                    href="https://wa.me/919676272283?text=Hello%20HRA%20Groups%20Team!%20I%20am%20interested%20in%20career%20opportunities."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-xs backdrop-blur-md transition-all duration-200"
                  >
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* JOIN OUR TEAM CTA BANNER */}
        <section className="py-20 border-t border-white/10 relative overflow-hidden">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto space-y-4"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-[#00c9ff]">
                Join Our Team
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white font-serif tracking-tight">
                Ready To Shape The Future?
              </h2>
              <p className="text-white/60 font-light text-sm sm:text-base leading-relaxed">
                Grow with HRA Groups through purposeful work, collaboration, and continuous innovation
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => handleOpenJobForm("General Application")}
                  className="px-9 py-4 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-sm shadow-[0_0_30px_rgba(0,201,255,0.35)] transition-all duration-200 hover:scale-[1.03] cursor-pointer"
                >
                  Apply for Jobs Now ↗
                </button>
                <Link
                  href="/internship"
                  className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-sm backdrop-blur-md transition-all duration-200"
                >
                  Explore Internships
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
