"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [selectedJobForModal, setSelectedJobForModal] = useState<string>("General Application");
  const [selectedJobIdForModal, setSelectedJobIdForModal] = useState<string | null>(null);

  // Application form fields
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantLocation, setApplicantLocation] = useState("Hyderabad, India");
  const [applicantExperience, setApplicantExperience] = useState("Fresher");
  const [applicantSkills, setApplicantSkills] = useState("");
  const [applicantResumeUrl, setApplicantResumeUrl] = useState("");
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
      icon: <TrendingUp className="w-6 h-6 text-[#0052cc]" />,
    },
    {
      title: "Professional & Collaborative Work Culture",
      desc: "A vibrant, team-first environment celebrating innovative ideas, peer collaboration, and inclusive synergy.",
      icon: <Users2 className="w-6 h-6 text-[#0052cc]" />,
    },
    {
      title: "Continuous Learning & Upskilling",
      desc: "Regular workshops, hands-on enterprise projects, access to industry certifications, and domain masterclasses.",
      icon: <GraduationCap className="w-6 h-6 text-[#0052cc]" />,
    },
    {
      title: "Balanced & Flexible Work Environment",
      desc: "A healthy work-life balance with modern hybrid possibilities, transparent communication, and supportive teams.",
      icon: <Shield className="w-6 h-6 text-[#0052cc]" />,
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
          resumeUrl: applicantResumeUrl,
          coverLetter: applicantMessage,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAppSuccessMsg(true);
        setTimeout(() => {
          setIsApplyModalOpen(false);
          setApplicantName("");
          setApplicantEmail("");
          setApplicantPhone("");
          setApplicantSkills("");
          setApplicantResumeUrl("");
          setApplicantMessage("");
          setAppSuccessMsg(false);
        }, 2500);
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
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070c18] text-[#172947] dark:text-slate-100 font-sans selection:bg-[#0052cc]/20 selection:text-[#003882] transition-colors duration-300">
      <Navbar />

      {/* STICKY / 1:1 SDI PRESENCE STYLE CAREERS HERO BANNER */}
      <section className="relative bg-[#384968] dark:bg-[#050b17] min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] pt-24 pb-28 sm:pt-32 sm:pb-36 lg:pt-36 lg:pb-40 flex items-center justify-center text-center overflow-hidden border-b border-slate-700/50 dark:border-slate-800">
        {/* Subtle radial glow & background lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,102,241,0.18),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(56,102,241,0.25),transparent_70%)] pointer-events-none" />

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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs sm:text-sm font-bold tracking-[0.25em] text-[#b8d7ff] uppercase backdrop-blur-sm shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#93c5fd]" />
              <span>Careers at HRA Groups</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[40px] sm:text-[54px] md:text-[64px] lg:text-[72px] xl:text-[80px] font-normal tracking-[-0.03em] leading-[1.08] text-white drop-shadow-sm"
            >
              Build a Career That <br className="hidden sm:inline" />
              <span className="font-semibold text-white">Makes an Impact</span>
            </motion.h1>

            {/* Description Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="text-[16px] sm:text-[18px] lg:text-[19px] text-slate-200 dark:text-slate-300 font-normal leading-[1.65] max-w-2xl mx-auto"
            >
              Build a meaningful career with a team focused on technology, growth, and long-term impact. Explore opportunities to grow with{" "}
              <a
                href="https://www.linkedin.com/company/hragroups/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300 underline underline-offset-4 font-semibold hover:text-white transition-colors"
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
                className="inline-flex items-center justify-center px-10 py-3.5 rounded-full bg-white text-[#0052cc] hover:text-[#002f80] hover:bg-sky-50 font-bold text-[15px] shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-[1.03]"
              >
                <span>View Job Openings</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfAlELtcrSzsXxs8Cw87uaeFriCPEYQG3qkxjUZx4OC9FND3g/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-[15px] backdrop-blur-sm transition-all duration-300"
              >
                <span>General Application Form ↗</span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* WHY WORK WITH US SECTION */}
      <section className="py-16 sm:py-20 bg-white dark:bg-[#090e1a] border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14 space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 text-xs font-bold uppercase tracking-widest text-[#0052cc] dark:text-sky-300">
              <Sparkles className="w-3.5 h-3.5 text-[#0052cc] dark:text-sky-400" />
              <span>Why Work With Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001f4d] dark:text-white tracking-tight">
              Grow with HRA Groups
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
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
                className="p-7 sm:p-8 rounded-3xl bg-[#f8fafc] dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-white dark:hover:bg-[#0f172a] hover:shadow-[0_16px_36px_rgba(0,82,204,0.08)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center group-hover:bg-[#0052cc] group-hover:text-white transition-colors duration-300">
                    {React.cloneElement(item.icon, {
                      className: "w-6 h-6 text-[#0052cc] dark:text-sky-400 group-hover:text-white transition-colors",
                    })}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#001f4d] dark:text-white group-hover:text-[#0052cc] dark:group-hover:text-sky-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JOB OPENINGS SECTION WITH FILTER TABS */}
      <section id="openings" className="py-20 sm:py-24 bg-[#f8fafc] dark:bg-[#070c18] transition-colors duration-300">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-3 max-w-xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 text-xs font-bold uppercase tracking-widest text-[#0052cc] dark:text-sky-300">
                <Briefcase className="w-3.5 h-3.5 text-[#0052cc] dark:text-sky-400" />
                <span>Current Openings</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001f4d] dark:text-white tracking-tight">
                Explore Open Positions
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
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
                    className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer capitalize z-10 whitespace-nowrap ${
                      active
                        ? "text-white"
                        : "text-slate-600 dark:text-slate-300 hover:text-[#0052cc] dark:hover:text-white bg-white dark:bg-[#0c1427] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="activeCareersFilter"
                        className="absolute inset-0 bg-[#0052cc] rounded-full shadow-md shadow-blue-600/30 -z-10"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span>{dept}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Job Openings List - In-Line Wide Row Layout or Empty State */}
          <motion.div layout className="flex flex-col gap-4 sm:gap-5">
            {loadingRoles ? (
              <div className="py-16 text-center rounded-3xl bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800 p-8 space-y-3">
                <div className="w-8 h-8 border-3 border-[#0052cc] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-slate-600 dark:text-slate-400 font-medium">Checking active career openings...</p>
              </div>
            ) : filteredOpenings.length === 0 ? (
              <div className="py-20 px-6 text-center rounded-3xl bg-white dark:bg-[#0c1427] border border-dashed border-slate-300 dark:border-slate-700/80 p-8 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center mx-auto text-[#0052cc] dark:text-sky-400">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#001f4d] dark:text-white">
                  No Current Openings {selectedDept !== "All" ? `in ${selectedDept}` : ""}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                  We are not actively recruiting for this category at the moment. New job positions added by the admin will appear here in real time.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => handleOpenModal("General Career Application")}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#0052cc] hover:bg-[#003882] text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
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
                    className="group rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 p-6 sm:p-7 transition-all duration-300 hover:shadow-[0_16px_36px_rgba(0,82,204,0.07)] flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden"
                  >
                    {/* Left accent indicator bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0052cc] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Job Details Main Area */}
                    <div className="space-y-3 flex-1">
                      {/* Top badging row */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0052cc] dark:text-sky-300 text-xs font-bold uppercase tracking-wider border border-blue-100/80 dark:border-blue-800/60">
                          {job.dept}
                        </span>
                        {job.isLiveDirect && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                            Active Role
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium border dark:border-slate-700/60">
                          {job.type}
                        </span>
                      </div>

                      {/* Job Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-[#001f4d] dark:text-white group-hover:text-[#0052cc] dark:group-hover:text-sky-400 transition-colors">
                        {job.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
                        {job.desc}
                      </p>

                      {/* In-line Meta Information (Location, Experience, Tags) */}
                      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800">
                          <MapPin className="w-3.5 h-3.5 text-[#0052cc] dark:text-sky-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-800">
                          <Briefcase className="w-3.5 h-3.5 text-[#0052cc] dark:text-sky-400" />
                          <span>{job.experience}</span>
                        </div>

                        {job.tags && job.tags.length > 0 && (
                          <div className="hidden sm:flex flex-wrap items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-slate-700">
                            {job.tags.map((tag: string) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md bg-slate-100/80 dark:bg-slate-800/80 text-[11px] text-slate-600 dark:text-slate-400 border dark:border-slate-700/50"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Side Action Button - Single Clean Apply Button */}
                    <div className="flex items-center shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                      {job.applyLink ? (
                        <a
                          href={job.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#0052cc] hover:bg-[#003882] text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer whitespace-nowrap w-full sm:w-auto"
                        >
                          <span>Apply</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          onClick={() => handleOpenModal(job.title, job.id)}
                          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#0052cc] hover:bg-[#003882] text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer whitespace-nowrap w-full sm:w-auto"
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
      <section className="py-20 bg-white dark:bg-[#090e1a] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14 space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 text-xs font-bold uppercase tracking-widest text-[#0052cc] dark:text-sky-300">
              <FileText className="w-3.5 h-3.5 text-[#0052cc] dark:text-sky-400" />
              <span>Application Guide</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001f4d] dark:text-white tracking-tight">
              How to Apply
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
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
              className="lg:col-span-7 rounded-3xl bg-[#f8fafc] dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center text-[#0052cc] dark:text-sky-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#001f4d] dark:text-white">
                      Details Required
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Ensure you have the following information prepared before applying:
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {applicationDetailsRequired.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white dark:bg-[#090e1a] border border-slate-200/70 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium shadow-xs"
                    >
                      <span className="text-[#0052cc] dark:text-sky-400 font-bold shrink-0 mt-0.5">✦</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span>📁 Applications are reviewed on a rolling basis by our talent team.</span>
              </div>
            </motion.div>

            {/* Right Box: Need Assistance & Direct Form CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#001738] via-[#012354] to-[#001738] dark:from-[#050b17] dark:via-[#09152b] dark:to-[#050b17] p-8 sm:p-10 text-white flex flex-col justify-between shadow-xl relative overflow-hidden border dark:border-slate-800"
            >
              {/* Background ambient light */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#8dc2ff]">
                    Direct Support
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    Need Assistance?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Have questions about the application process, domain prerequisites, or onboarding timelines? Reach out to our HR representative.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm space-y-2">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#8dc2ff]" />
                    <div>
                      <span className="text-[11px] text-slate-300 uppercase tracking-wider block font-semibold">
                        HR Contact &amp; Helpline
                      </span>
                      <strong className="text-lg font-bold text-white tracking-wide">
                        +91 96762 72283
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 relative z-10">
                <button
                  onClick={() => handleOpenModal("General Corporate Application")}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-white text-[#001738] hover:bg-sky-50 font-bold text-sm shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  <span>Direct In-App Application</span>
                  <ArrowRight className="w-4 h-4 text-[#0052cc]" />
                </button>

                <a
                  href="https://wa.me/919676272283?text=Hello%20HRA%20Groups%20Team!%20I%20am%20interested%20in%20career%20opportunities."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-xs backdrop-blur-sm transition-all duration-200"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* JOIN OUR TEAM CTA BANNER */}
      <section className="py-16 bg-[#001738] dark:bg-[#050b17] text-white relative overflow-hidden border-t dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,102,241,0.15),transparent_70%)] pointer-events-none" />

        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto space-y-4"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#8dc2ff]">
              Join Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Ready to Shape the Future?
            </h2>
            <p className="text-slate-300 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Grow with HRA Groups through purposeful work, collaboration, and continuous innovation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => handleOpenModal("General Application")}
                className="px-9 py-3.5 rounded-full bg-[#0052cc] hover:bg-[#003882] text-white font-bold text-sm shadow-[0_8px_30px_rgba(0,82,204,0.35)] transition-all duration-200 hover:scale-[1.03] cursor-pointer"
              >
                Apply for Jobs Now ↗
              </button>
              <Link
                href="/internship"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm backdrop-blur-sm transition-all duration-200"
              >
                Explore Internships
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FULL DIRECT APPLICATION MODAL THAT STORES DIRECTLY IN DATABASE */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#0c1427] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 text-xs font-bold uppercase tracking-wider text-[#0052cc] dark:text-sky-300">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Job Application Submission</span>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-[#001f4d] dark:text-white">
                    {selectedJobForModal}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Submit your application directly to the HRA Groups talent acquisition team.
                  </p>
                </div>

                {appSuccessMsg ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center space-y-2 animate-in fade-in">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                    <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-base">Application Received!</h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">
                      Thank you for applying. Your profile has been submitted to the Recruitment team for review.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleApplicationSubmit} className="space-y-3.5 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={applicantName}
                          onChange={(e) => setApplicantName(e.target.value)}
                          placeholder="Your Full Name"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052cc]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052cc]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          placeholder="+91 96762 72283"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052cc]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                          Experience Level
                        </label>
                        <select
                          value={applicantExperience}
                          onChange={(e) => setApplicantExperience(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052cc]"
                        >
                          <option value="Fresher / Intern" className="dark:bg-slate-900 dark:text-white">Fresher / Intern</option>
                          <option value="1–2 Years" className="dark:bg-slate-900 dark:text-white">1–2 Years</option>
                          <option value="3–5 Years" className="dark:bg-slate-900 dark:text-white">3–5 Years</option>
                          <option value="5+ Years" className="dark:bg-slate-900 dark:text-white">5+ Years (Senior)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Current Location / City
                      </label>
                      <input
                        type="text"
                        value={applicantLocation}
                        onChange={(e) => setApplicantLocation(e.target.value)}
                        placeholder="e.g. Hyderabad, India / Bengaluru"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052cc]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Resume / Portfolio Link (Google Drive, LinkedIn, GitHub)
                      </label>
                      <input
                        type="url"
                        value={applicantResumeUrl}
                        onChange={(e) => setApplicantResumeUrl(e.target.value)}
                        placeholder="https://drive.google.com/file/... or LinkedIn URL"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052cc]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Key Skills &amp; Qualifications
                      </label>
                      <input
                        type="text"
                        value={applicantSkills}
                        onChange={(e) => setApplicantSkills(e.target.value)}
                        placeholder="e.g. React.js, Python, AWS, Communication"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052cc]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Brief Cover Note / Why HRA Groups?
                      </label>
                      <textarea
                        rows={2}
                        value={applicantMessage}
                        onChange={(e) => setApplicantMessage(e.target.value)}
                        placeholder="Share a brief message regarding your background..."
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0052cc] resize-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={submittingApp}
                        className="flex-1 py-3 rounded-xl bg-[#0052cc] hover:bg-[#003882] text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
                      >
                        {submittingApp ? "Submitting Application..." : "Submit Direct Application"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsApplyModalOpen(false)}
                        className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
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

