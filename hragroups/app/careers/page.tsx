"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BigPolygonBackground from "@/components/BigPolygonBackground";
import {
  ArrowRight,
  MapPin,
  Briefcase,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Shield,
  Phone,
  FileText,
  Building2,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Users2,
  HelpCircle,
  X,
  Send,
  UserCheck,
  Mail,
  User,
} from "lucide-react";

const CAREER_HERO_PHRASES = [
  "Build a Career That Makes an Impact.",
  "Shape the Future of Technology.",
  "Innovate, Transform & Grow.",
  "Join a Team Driven by Purpose.",
];

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [selectedJobForModal, setSelectedJobForModal] = useState<string>("General Application");
  const [selectedJobIdForModal, setSelectedJobIdForModal] = useState<string | null>(null);

  // Typewriter text animation state (identical to Work page)
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

  // Application form fields
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
  const [applicationId, setApplicationId] = useState<string>("");

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
      desc: "Personalized roadmaps, one-on-one leadership guidance, and clear progression opportunities across multiple domains.",
      icon: <TrendingUp className="w-6 h-6 text-[#00c9ff]" />,
    },
    {
      title: "Professional & Collaborative Work Culture",
      desc: "A vibrant, team-first environment celebrating innovative ideas, peer collaboration, and inclusive synergy.",
      icon: <Users2 className="w-6 h-6 text-[#00c9ff]" />,
    },
    {
      title: "Continuous Learning & Upskilling",
      desc: "Regular workshops, hands-on enterprise projects, access to industry certifications, and domain masterclasses.",
      icon: <GraduationCap className="w-6 h-6 text-[#00c9ff]" />,
    },
    {
      title: "Balanced & Flexible Work Environment",
      desc: "A healthy work-life balance with modern hybrid possibilities, transparent communication, and supportive teams.",
      icon: <Shield className="w-6 h-6 text-[#00c9ff]" />,
    },
  ];

  const applicationDetailsRequired = [
    "Full name and active contact details",
    "Email ID and residential address",
    "Location preference (Hyderabad / Remote / Hybrid)",
    "Educational background and academic qualifications",
    "Work experience / Internship history (if any)",
    "Skills and relevant certifications",
    "Expected CTC and notice period",
    "Updated resume / portfolio (PDF format)",
  ];

  const filteredOpenings = useMemo(() => {
    if (selectedDept === "All") return dbRoles;
    return dbRoles.filter((job) => job.dept === selectedDept);
  }, [dbRoles, selectedDept]);

  const handleOpenModal = (jobTitle: string, jobId?: string) => {
    setSelectedJobForModal(jobTitle);
    setSelectedJobIdForModal(jobId || null);
    setIsApplyModalOpen(true);
    setAppSuccessMsg(false);
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
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
          careerRoleId: selectedJobIdForModal,
          roleTitle: selectedJobForModal,
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
        setApplicationId(data.application?.id?.slice(0, 8) || "HRA-APP");
        setAppSuccessMsg(true);
        setTimeout(() => {
          setIsApplyModalOpen(false);
          setApplicantName("");
          setApplicantEmail("");
          setApplicantPhone("");
          setApplicantSkills("");
          setApplicantResumeUrl("");
          setApplicantResumeFile(null);
          setApplicantMessage("");
          setAppSuccessMsg(false);
        }, 3500);
      } else {
        alert(data.error || "Failed to submit application");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setSubmittingApp(false);
    }
  };

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
        {/* CAREERS HERO BANNER */}
        <section className="relative pt-36 pb-24 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32 flex items-center justify-center text-center overflow-hidden">
          <motion.div
            style={{ y: heroContentY }}
            className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl mx-auto space-y-6 sm:space-y-8"
            >
              {/* Pill Tag */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-mono tracking-[0.25em] text-[#00c9ff] uppercase backdrop-blur-md shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#00c9ff] animate-pulse" />
                <span>Careers at HRA Groups</span>
              </motion.div>

              {/* Typewriter Animated Display Headline (Matching Work page) */}
              <div className="min-h-[110px] sm:min-h-[140px] md:min-h-[160px] flex items-center justify-center w-full px-2">
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-light text-white tracking-[-0.03em] leading-[1.08] text-center font-serif">
                  <span className="text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.2)]">
                    {currentText}
                  </span>
                  <span className="text-[#00c9ff] ml-1.5 font-light animate-[pulse_1s_infinite]">|</span>
                </h1>
              </div>

              {/* Description Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8 }}
                className="text-[16px] sm:text-[18px] lg:text-[19px] text-white/70 font-light leading-[1.65] max-w-2xl mx-auto"
              >
                Build a meaningful career with a team focused on technology, growth, and long-term impact. Explore opportunities to grow with{" "}
                <a
                  href="https://www.linkedin.com/company/hragroups/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00c9ff] underline underline-offset-4 font-normal hover:text-white transition-colors"
                >
                  HRA Groups
                </a>
                .
              </motion.p>

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

                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfAlELtcrSzsXxs8Cw87uaeFriCPEYQG3qkxjUZx4OC9FND3g/viewform?usp=header"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-sm backdrop-blur-md transition-all duration-300"
                >
                  <span>General Application Form ↗</span>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* WHY WORK WITH US SECTION */}
        <section className="py-20 sm:py-24 border-t border-white/10">
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
                Grow with HRA Groups
              </h2>
              <p className="text-white/60 font-light text-sm sm:text-base max-w-xl mx-auto">
                We empower our people with the resources, mentorship, and opportunities they need to reach their highest potential.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyWorkItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="p-7 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/40 hover:bg-white/[0.04] backdrop-blur-md hover:shadow-[0_15px_40px_rgba(0,201,255,0.1)] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#00c9ff] group-hover:text-black transition-colors duration-300">
                      {React.cloneElement(item.icon, {
                        className: "w-6 h-6 text-[#00c9ff] group-hover:text-black transition-colors",
                      })}
                    </div>
                    <h3 className="text-lg sm:text-xl font-light font-serif text-white group-hover:text-[#73bbff] transition-colors">
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
                  Discover active openings and submit your application to join our growing team in Hyderabad or remotely.
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
                    We are not actively recruiting for this category at the moment. New job positions added by the admin will appear here in real time.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleOpenModal("General Career Application")}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Submit General Application</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredOpenings.map((job, index) => (
                    <motion.div
                      layout
                      key={job.id}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                      className="group rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/40 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,201,255,0.1)] flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden"
                    >
                      {/* Left accent indicator bar */}
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00c9ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
                            onClick={() => handleOpenModal(job.title, job.id)}
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
                How to Apply
              </h2>
              <p className="text-white/60 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Complete our online application form with accurate details. Our HR team will review your profile and connect with shortlisted candidates promptly.
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
                  <span>📁 Applications are reviewed on a rolling basis by our talent team.</span>
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
                      Have questions about the application process, domain prerequisites, or onboarding timelines? Reach out to our HR representative.
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
                    onClick={() => handleOpenModal("General Corporate Application")}
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
                Ready to Shape the Future?
              </h2>
              <p className="text-white/60 font-light text-sm sm:text-base leading-relaxed">
                Grow with HRA Groups through purposeful work, collaboration, and continuous innovation.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => handleOpenModal("General Application")}
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

      {/* FULL DIRECT APPLICATION MODAL THAT STORES DIRECTLY IN DATABASE */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#071225] text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-white/15 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-[#00c9ff]">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Job Application Submission</span>
                </div>

                <div>
                  <h3 className="text-2xl font-light font-serif text-white">
                    {selectedJobForModal}
                  </h3>
                  <p className="text-xs text-white/60 font-light mt-1">
                    Submit your application directly to the HRA Groups talent acquisition team.
                  </p>
                </div>

                {appSuccessMsg ? (
                  <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-center space-y-2 animate-in fade-in">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="font-bold text-emerald-200 text-base">Application Received!</h4>
                    <p className="text-xs text-emerald-300 font-light">
                      Thank you for applying. Your profile has been submitted to the Recruitment team for review.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleApplicationSubmit} className="space-y-3.5 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-mono text-white/70 block mb-1">
                          Full Name <span className="text-[#00c9ff]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          placeholder="Your Full Name"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00c9ff]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-white/70 block mb-1">
                          Email Address <span className="text-[#00c9ff]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00c9ff]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-mono text-white/70 block mb-1">
                          Phone Number <span className="text-[#00c9ff]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          placeholder="+91 96762 72283"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00c9ff]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-white/70 block mb-1">
                          Experience Level
                        </label>
                        <select
                          value={applicantExperience}
                          onChange={(e) => setApplicantExperience(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#040e1c] border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00c9ff]"
                        >
                          <option value="Fresher / Intern">Fresher / Intern</option>
                          <option value="1–2 Years">1–2 Years</option>
                          <option value="3–5 Years">3–5 Years</option>
                          <option value="5+ Years">5+ Years (Senior)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-white/70 block mb-1">
                        Current Location / City
                      </label>
                      <input
                        type="text"
                        value={applicantLocation}
                        onChange={(e) => setApplicantLocation(e.target.value)}
                        placeholder="e.g. Hyderabad, India / Bengaluru"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00c9ff]"
                      />
                    </div>

                    {/* Resume Upload: File + URL */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/70 block">
                        Upload Resume (PDF, DOCX) or Provide Link <span className="text-[#00c9ff]">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="border border-dashed border-white/20 rounded-xl p-2.5 bg-white/5 text-center relative hover:border-[#00c9ff] transition-colors cursor-pointer">
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
                          <span className="text-xs font-mono text-[#00c9ff] block truncate">
                            {applicantResumeFile ? applicantResumeFile.name : "📁 Choose Resume PDF File"}
                          </span>
                        </div>

                        <input
                          type="url"
                          value={applicantResumeUrl}
                          onChange={(e) => setApplicantResumeUrl(e.target.value)}
                          placeholder="Or paste Drive / LinkedIn link"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00c9ff]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-white/70 block mb-1">
                        Key Skills &amp; Qualifications
                      </label>
                      <input
                        type="text"
                        value={applicantSkills}
                        onChange={(e) => setApplicantSkills(e.target.value)}
                        placeholder="e.g. React.js, Python, AWS, Communication"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00c9ff]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-white/70 block mb-1">
                        Brief Cover Note / Why HRA Groups?
                      </label>
                      <textarea
                        rows={2}
                        value={applicantMessage}
                        onChange={(e) => setApplicantMessage(e.target.value)}
                        placeholder="Share a brief message regarding your background..."
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#00c9ff] resize-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={submittingApp}
                        className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-xs sm:text-sm transition-all shadow-md cursor-pointer disabled:opacity-50 hover:shadow-[0_0_20px_rgba(0,201,255,0.4)]"
                      >
                        {submittingApp ? "Submitting Application..." : "Submit Direct Application"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsApplyModalOpen(false)}
                        className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
