"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  User,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  BrainCircuit,
  Code2,
  CloudCog,
  Layers,
  Award,
  BookOpen,
  X,
  MessageCircle,
} from "lucide-react";

interface CourseDetail {
  id: string;
  title: string;
  badge: string;
  icon: React.ReactNode;
  description: string;
  syllabus: string[];
  images: string[];
  color: string;
}

export default function CoursesPage() {
  const { scrollY } = useScroll();
  const heroTranslateY = useTransform(scrollY, [0, 500], [0, 90]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.94]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0.35]);

  // Modal / Quick Registration State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourseForModal, setSelectedCourseForModal] = useState("AIML");
  const [modalName, setModalName] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalPhone, setModalPhone] = useState("");

  // Advisor form state
  const [advisorName, setAdvisorName] = useState("");
  const [advisorEmail, setAdvisorEmail] = useState("");
  const [advisorPhone, setAdvisorPhone] = useState("");
  const [advisorCourse, setAdvisorCourse] = useState("AIML (AI & Machine Learning)");
  const [advisorSubmitted, setAdvisorSubmitted] = useState(false);
  const [isAdvisorSubmitting, setIsAdvisorSubmitting] = useState(false);

  // Active slide indices for course carousels
  const [sliderIndexes, setSliderIndexes] = useState<{ [key: string]: number }>({
    aiml: 0,
    fullstack: 0,
    devops: 0,
  });

  const courses: CourseDetail[] = [
    {
      id: "aiml",
      title: "Artificial Intelligence & Machine Learning",
      badge: "AI / ML Specialization",
      icon: <BrainCircuit className="w-5 h-5 text-blue-400" />,
      description:
        "Master cutting-edge AI architectures, deep learning neural networks, natural language processing, and computer vision with hands-on production datasets.",
      syllabus: [
        "Strong foundation in Python, Data Science & Statistics",
        "Machine Learning algorithms with real datasets",
        "Deep Learning using TensorFlow & Neural Networks",
        "Natural Language Processing & Chatbot development",
        "Computer Vision projects",
        "Capstone AI project for portfolio",
        "Resume building & mock interviews",
        "Placement assistance support",
      ],
      images: [
        "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/aiml001-3KI9bBOEO3ocT4KR.jpg",
        "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/aiml2-MAHn7sfbbPE6tD1a.webp",
        "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/aiml-3-LHQ4DAMQnHKP6eWi.webp",
        "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/aiml4-plUS765jiTvHlWMa.webp",
      ],
      color: "from-blue-600 to-indigo-700",
    },
    {
      id: "fullstack",
      title: "Python Full Stack Development",
      badge: "Full Stack Mastery",
      icon: <Code2 className="w-5 h-5 text-sky-400" />,
      description:
        "End-to-end full stack software engineering encompassing modern responsive React frontends, robust Django REST APIs, scalable databases, and cloud deployment pipelines.",
      syllabus: [
        "Frontend: HTML, CSS, JavaScript, React.js",
        "Backend: Python, Django, REST APIs",
        "Database: MySQL, MongoDB",
        "Authentication & security",
        "Project deployment on cloud",
        "Git & version control",
        "Real-world projects (E-commerce, dashboards)",
        "Interview preparation",
      ],
      images: [
        "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/py2-C3MFw3vL3cgiXtDe.webp",
        "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/py3-1Cyfpz6ZxwJ0Q0il.webp",
        "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/py4-th6WFhLMgdl2AtH3.webp",
        "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/aiml001-3KI9bBOEO3ocT4KR.jpg",
      ],
      color: "from-sky-600 to-blue-800",
    },
    {
      id: "devops",
      title: "AWS DevOps Engineering",
      badge: "Cloud & Infrastructure",
      icon: <CloudCog className="w-5 h-5 text-emerald-400" />,
      description:
        "Accelerate continuous delivery with modern CI/CD automation, Docker containerization, Kubernetes orchestration, and enterprise AWS cloud architecture.",
      syllabus: [
        "Git, Jenkins & CI/CD pipelines",
        "Docker containerization",
        "Kubernetes orchestration",
        "AWS services (EC2, S3, IAM)",
        "Infrastructure as Code",
        "Monitoring & logging tools",
        "Real-time DevOps projects",
        "Placement-oriented training",
      ],
      images: [
        "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/aws1-UlhJrCmlkJQKAbUz.webp",
        "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/aws3-7ePkRiirI8V4ct93.webp",
        "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/aws5-y3Wu0QErgCwa0utg.webp",
        "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/aws2-KYSRiNzHW6oWAn9S.webp",
      ],
      color: "from-blue-700 to-slate-900",
    },
  ];

  const [dbCourses, setDbCourses] = useState<CourseDetail[]>([]);

  // Fetch dynamic courses created by admin
  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.courses) {
          const formatted: CourseDetail[] = data.courses.map((c: any) => ({
            id: c.id,
            title: c.title,
            badge: c.badge || "Specialization Program",
            icon: <Layers className="w-5 h-5 text-indigo-400" />,
            description: c.description,
            syllabus: c.syllabus && c.syllabus.length > 0 ? c.syllabus : ["Course Curriculum & Hands-on Labs", "Real-world Capstone Projects", "Placement & Interview Preparation"],
            images: c.images && c.images.length > 0 ? c.images : ["https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/aiml001-3KI9bBOEO3ocT4KR.jpg"],
            color: c.color || "from-blue-600 to-indigo-700",
          }));
          setDbCourses(formatted);
        }
      })
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const allCourses = useMemo(() => {
    return [...courses, ...dbCourses];
  }, [courses, dbCourses]);

  // Auto-advance sliders
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderIndexes((prev) => {
        const nextState = { ...prev };
        allCourses.forEach((c) => {
          const imgCount = c.images?.length || 1;
          const current = nextState[c.id] || 0;
          nextState[c.id] = (current + 1) % imgCount;
        });
        return nextState;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [allCourses]);

  const handleOpenModal = (courseTitle: string) => {
    setSelectedCourseForModal(courseTitle);
    setModalOpen(true);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/inquiries/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseName: selectedCourseForModal,
          fullName: modalName,
          email: modalEmail,
          phone: modalPhone,
          message: "Enrolled via Quick Enrollment Modal",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("Thank you! Your course registration has been submitted successfully. Our team will contact you shortly.");
        setModalOpen(false);
        setModalName("");
        setModalEmail("");
        setModalPhone("");
      } else {
        alert(data.error || "Failed to submit course inquiry.");
      }
    } catch (err) {
      alert("Error submitting inquiry. Please try again.");
    }
  };

  const handleAdvisorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdvisorSubmitting) return;
    setIsAdvisorSubmitting(true);

    try {
      const res = await fetch("/api/inquiries/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseName: advisorCourse,
          fullName: advisorName,
          email: advisorEmail,
          phone: advisorPhone,
          message: "Requested callback via Schedule a Callback form",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAdvisorSubmitted(true);
        setTimeout(() => {
          setAdvisorSubmitted(false);
          setAdvisorName("");
          setAdvisorEmail("");
          setAdvisorPhone("");
        }, 5000);
      } else {
        alert(data.error || "Failed to submit callback request.");
      }
    } catch (err) {
      alert("Error sending request. Please try again.");
    } finally {
      setIsAdvisorSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#172947] font-sans selection:bg-[#0052cc]/20 selection:text-[#003882]">
      <Navbar />

      {/* EXACT 1:1 SDI ENTERPRISE DATA & AI HERO DESIGN WITH INVISIBLE IMAGE BACKGROUND */}
      <section className="sticky top-0 z-0 bg-white min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] pt-24 pb-36 sm:pt-28 sm:pb-40 lg:pt-32 lg:pb-44 flex items-center overflow-hidden">
        
        {/* Transparent 3D AI Graphic without any background artifact or line */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-[55%] xl:w-[50%] pointer-events-none z-0 flex items-center justify-end overflow-hidden">
          <img
            src="/ai-hero-clean.webp"
            alt="Enterprise Data and AI - HRA Groups"
            className="w-full max-w-[620px] xl:max-w-[720px] 2xl:max-w-[800px] h-auto object-contain transform translate-x-4 lg:translate-x-10 select-none pointer-events-none"
            loading="eager"
          />
        </div>

        <motion.div
          style={{ y: heroTranslateY, opacity: heroOpacity, scale: heroScale }}
          className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10"
        >
          <div className="max-w-2xl space-y-5 sm:space-y-6">
            {/* Category Pill / Subtitle */}
            <div className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#0052cc] uppercase">
              SKILL DEVELOPMENT • HANDS-ON TRAINING
            </div>

            {/* Heading */}
            <h1 className="text-[32px] sm:text-[42px] md:text-[50px] lg:text-[56px] xl:text-[62px] font-bold tracking-[-0.03em] leading-[1.12] text-[#081528]">
              Become Industry Ready in <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#003882] via-[#0052cc] to-[#0284c7] bg-clip-text text-transparent">
                AIML, AWS DevOps & Full Stack
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-[15px] sm:text-[16px] lg:text-[17px] text-[#475569] font-normal leading-[1.65] max-w-xl">
              Transform your career with job-ready training programs designed by industry experts. HRA Groups provides real-time projects, mentorship, and placement support to help you succeed in tech careers.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={() => handleOpenModal("General")}
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-[#0052cc] to-[#0284c7] hover:from-[#003882] hover:to-[#0052cc] text-white font-bold text-sm shadow-[0_8px_25px_rgba(0,82,204,0.25)] hover:shadow-[0_12px_32px_rgba(0,82,204,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Enroll Now</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <a
                href="#courses-list"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-300/90 text-[#0f172a] hover:text-[#0052cc] font-bold text-sm shadow-xs transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Explore Courses</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* OVERLAPPING SHEET SECTION */}
      <div className="relative z-10 bg-[#f8fafc] rounded-t-[36px] sm:rounded-t-[48px] lg:rounded-t-[60px] overflow-hidden">

        {/* COURSES SECTION */}
        <section id="courses-list" className="py-16 sm:py-20 lg:py-24">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 space-y-20 sm:space-y-24">

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0052cc] bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                <GraduationCap className="w-4 h-4 text-[#0052cc]" />
                <span>Specialized Industry Programs</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001f4d] tracking-tight">
                Master In-Demand Technologies
              </h2>
              <p className="text-slate-600 text-base sm:text-lg">
                Practical, project-centric curriculum tailored for university students, career changers, and tech professionals looking to level up.
              </p>
            </div>

            {/* Courses alternating rows */}
            <div className="space-y-16 sm:space-y-20">
              {allCourses.map((course, idx) => {
                const isEven = idx % 2 === 1;
                const currentImgIdx = sliderIndexes[course.id] || 0;

                return (
                  <div
                    key={course.id}
                    className="rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 p-8 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300"
                  >
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? "lg:grid-flow-dense" : ""
                        }`}
                    >
                      {/* Course Image Carousel */}
                      <div className={`lg:col-span-6 ${isEven ? "lg:col-start-7" : ""}`}>
                        <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-[16/10] shadow-lg group">
                          {/* Active Image */}
                          <img
                            src={course.images[currentImgIdx]}
                            alt={course.title}
                            className="w-full h-full object-contain bg-[#0b1120] transition-all duration-500 group-hover:scale-105"
                          />

                          {/* Badge tag */}
                          <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold tracking-wider uppercase border border-white/20">
                            {course.badge}
                          </div>

                          {/* Navigation Dots */}
                          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 z-10">
                            {course.images.map((_, dotIdx) => (
                              <button
                                key={dotIdx}
                                onClick={() =>
                                  setSliderIndexes((prev) => ({
                                    ...prev,
                                    [course.id]: dotIdx,
                                  }))
                                }
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentImgIdx === dotIdx
                                    ? "bg-[#0052cc] w-6"
                                    : "bg-white/60 hover:bg-white"
                                  }`}
                                aria-label={`Go to slide ${dotIdx + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Course Details Content */}
                      <div className={`lg:col-span-6 space-y-6 ${isEven ? "lg:col-start-1" : ""}`}>
                        <div className="space-y-3">
                          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0052cc] bg-blue-50 px-3 py-1 rounded-md">
                            {course.icon}
                            <span>{course.badge}</span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#001f4d] leading-snug">
                            {course.title}
                          </h3>
                          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                            {course.description}
                          </p>
                        </div>

                        {/* Syllabus Checklist */}
                        <div className="space-y-2.5">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                            Course Highlights & Syllabus
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {course.syllabus.map((item, i) => (
                              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700">
                                <CheckCircle2 className="w-4 h-4 text-[#0052cc] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 flex flex-wrap items-center gap-4">
                          <button
                            onClick={() => handleOpenModal(course.title)}
                            className="px-8 py-3 rounded-full bg-[#0052cc] hover:bg-[#003882] text-white font-bold text-sm shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                          >
                            <span>Register {course.badge.split(" ")[0]}</span>
                          </button>
                          <a
                            href="tel:9676272283"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all"
                          >
                            <Phone className="w-4 h-4 text-[#0052cc]" />
                            <span>Quick Call</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* TALK TO ADVISOR FORM SECTION */}
            <div className="rounded-3xl bg-gradient-to-br from-[#001738] via-[#012768] to-[#001738] p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
                {/* Advisor Left Illustration & Text */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8dc2ff] bg-blue-500/20 px-3.5 py-1.5 rounded-full border border-blue-400/30">
                    <Sparkles className="w-3.5 h-3.5 text-[#93c5fd]" />
                    <span>Free Career Consultation</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                    Have Questions? <br />
                    Talk to our Career Advisor
                  </h3>
                  <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                    Get personalized guidance on selecting the right specialization, career roadmaps, interview preparation strategies, and live batch timings.
                  </p>
                  <div className="rounded-2xl overflow-hidden border border-white/15 shadow-lg max-w-md hidden sm:block">
                    <img
                      src="https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/chatgpt-image-mar-12-2026-02_41_42-pm-e8mvhcQyeH1lfaI1.png"
                      alt="Talk to Advisor"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                {/* Advisor Right Form Box */}
                <div className="lg:col-span-6">
                  <div className="bg-white rounded-3xl p-8 sm:p-10 text-slate-800 shadow-2xl">
                    <h4 className="text-2xl font-bold text-[#001f4d] mb-2">
                      Schedule a Callback
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 mb-6">
                      Fill out your details below and our team will get back to you shortly.
                    </p>

                    {advisorSubmitted ? (
                      <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                        <h5 className="font-bold text-emerald-900 text-base">Inquiry Submitted!</h5>
                        <p className="text-xs text-emerald-700">Your callback request has been received. Our team will contact you shortly.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleAdvisorSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Full Name
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              value={advisorName}
                              onChange={(e) => setAdvisorName(e.target.value)}
                              placeholder="Enter your name"
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent transition-all"
                            />
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Email Address
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              required
                              value={advisorEmail}
                              onChange={(e) => setAdvisorEmail(e.target.value)}
                              placeholder="you@example.com"
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent transition-all"
                            />
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Phone / WhatsApp Number
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              required
                              value={advisorPhone}
                              onChange={(e) => setAdvisorPhone(e.target.value)}
                              placeholder="+91 96762 72283"
                              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent transition-all"
                            />
                            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Interested Specialization
                          </label>
                          <select
                            value={advisorCourse}
                            onChange={(e) => setAdvisorCourse(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0052cc] focus:border-transparent transition-all cursor-pointer"
                          >
                            <option value="AIML (AI & Machine Learning)">AIML (AI & Machine Learning)</option>
                            <option value="Python Full Stack Development">Python Full Stack Development</option>
                            <option value="AWS DevOps Engineering">AWS DevOps Engineering</option>
                            <option value="All Specializations Guidance">All Courses Guidance</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          disabled={isAdvisorSubmitting}
                          className="w-full py-3.5 rounded-xl bg-[#0052cc] hover:bg-[#003882] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer mt-2 disabled:opacity-50"
                        >
                          {isAdvisorSubmitting ? "Submitting..." : "Submit"}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* QUICK REGISTRATION MODAL POPUP */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative border border-slate-200"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2 mb-6">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0052cc] bg-blue-50 px-2.5 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-[#0052cc]" />
                  <span>Quick Enrollment</span>
                </div>
                <h3 className="text-xl font-extrabold text-[#001f4d]">
                  Register for Course
                </h3>
                <p className="text-xs text-slate-500">
                  Fill in your details below to register your seat with HRA Groups.
                </p>
              </div>

              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={modalName}
                    onChange={(e) => setModalName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0052cc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0052cc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={modalPhone}
                    onChange={(e) => setModalPhone(e.target.value)}
                    placeholder="+91 96762 72283"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0052cc]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Course</label>
                  <select
                    value={selectedCourseForModal}
                    onChange={(e) => setSelectedCourseForModal(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0052cc] cursor-pointer"
                  >
                    <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning (AIML)</option>
                    <option value="Python Full Stack Development">Python Full Stack Development</option>
                    <option value="AWS DevOps Engineering">AWS DevOps Engineering</option>
                    <option value="General Technical Skilling">General Technical Skilling</option>
                  </select>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-[#0052cc] hover:bg-[#003882] text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
                  >
                    Submit &amp; Connect on WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FLOATING QUICK CONTACT BUTTON */}
      <a
        href="tel:9676272283"
        className="fixed bottom-6 right-6 z-40 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl flex items-center gap-2 transition-transform hover:scale-105"
      >
        <Phone className="w-4 h-4" />
        <span className="hidden sm:inline">Call +91 96762 72283</span>
        <span className="sm:hidden">Call Us</span>
      </a>

      <Footer />
    </div>
  );
}
