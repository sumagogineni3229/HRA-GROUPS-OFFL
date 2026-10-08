"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  X,
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Code2,
  Layers,
  Award,
  Globe,
  Rocket,
  Compass,
  Laptop,
  Palette,
  Megaphone,
  Building2,
  Cloud,
  FileText,
  Lightbulb,
} from "lucide-react";

interface DomainProgram {
  id: string;
  number: string;
  category: "all" | "technology" | "creative" | "business";
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

export default function InternshipPage() {
  const { scrollY } = useScroll();
  const heroTranslateY = useTransform(scrollY, [0, 500], [0, 90]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.94]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0.35]);

  const [activeTab, setActiveTab] = useState<"all" | "technology" | "creative" | "business">("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic tracks from Supabase DB
  const [dbTracks, setDbTracks] = useState<DomainProgram[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal application state
  const [modalOpen, setModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    domain: "Web Development",
    message: "",
  });

  // Fetch dynamic tracks added by admin
  React.useEffect(() => {
    fetch("/api/internship/tracks")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.tracks)) {
          const formatted: DomainProgram[] = data.tracks.map((t: any, idx: number) => ({
            id: t.id,
            number: `0${10 + idx} / ${t.category.toUpperCase()}`,
            category: (["technology", "creative", "business"].includes(t.category)
              ? t.category
              : "technology") as "technology" | "creative" | "business",
            title: t.title,
            description: t.description,
            icon: <Sparkles className="w-6 h-6 text-[#0052cc]" />,
            tags: t.tags && t.tags.length > 0 ? t.tags : ["Industry Guided", "Live Project"],
          }));
          setDbTracks(formatted);
        }
      })
      .catch((err) => console.error("Error loading tracks:", err));
  }, []);

  const coreDomains: DomainProgram[] = [
    {
      id: "web-dev",
      number: "01 / TECHNOLOGY",
      category: "technology",
      title: "Web Development",
      description: "Build responsive websites, interactive UI components, and modern web applications using cutting-edge technologies",
      icon: <Code2 className="w-6 h-6 text-[#0052cc]" />,
      tags: ["React / Next.js", "JavaScript / TypeScript", "Tailwind CSS", "REST APIs"],
    },
    {
      id: "aiml",
      number: "02 / TECHNOLOGY",
      category: "technology",
      title: "AI & Machine Learning",
      description: "Explore intelligent systems, predictive modeling, data pipelines, and practical applications of emerging AI technologies",
      icon: <Sparkles className="w-6 h-6 text-[#0052cc]" />,
      tags: ["Python", "TensorFlow / PyTorch", "Deep Learning", "NLP"],
    },
    {
      id: "data-analytics",
      number: "03 / TECHNOLOGY",
      category: "technology",
      title: "Data & Analytics",
      description: "Turn complex data into actionable business insights and develop analytical thinking through practical real-world datasets",
      icon: <Layers className="w-6 h-6 text-[#0052cc]" />,
      tags: ["SQL & Data Modeling", "Power BI / Tableau", "Statistical Analysis", "ETL"],
    },
    {
      id: "uiux-design",
      number: "04 / CREATIVE",
      category: "creative",
      title: "UI / UX Design",
      description: "Create intuitive digital product experiences with user research, comprehensive design systems, wireframes, and prototypes",
      icon: <Palette className="w-6 h-6 text-[#0052cc]" />,
      tags: ["Figma & Prototyping", "Design Systems", "User Research", "Wireframing"],
    },
    {
      id: "digital-marketing",
      number: "05 / CREATIVE",
      category: "creative",
      title: "Digital Marketing",
      description: "Master digital audience growth, strategic content creation, social media campaigns, SEO ranking, and paid performance channels",
      icon: <Megaphone className="w-6 h-6 text-[#0052cc]" />,
      tags: ["SEO & SEM", "Social Media Growth", "Content Strategy", "Google Ads"],
    },
    {
      id: "business-mgmt",
      number: "06 / BUSINESS",
      category: "business",
      title: "Business & Management",
      description: "Develop executive communication, strategic leadership, market research, and corporate operations execution skills",
      icon: <Briefcase className="w-6 h-6 text-[#0052cc]" />,
      tags: ["Operations", "Market Research", "Project Management", "Client Relations"],
    },
    {
      id: "cloud-devops",
      number: "07 / TECHNOLOGY",
      category: "technology",
      title: "Cloud & DevOps",
      description: "Understand modern cloud architecture, CI/CD automated pipelines, containerization, and production engineering workflows",
      icon: <Cloud className="w-6 h-6 text-[#0052cc]" />,
      tags: ["AWS Cloud", "Docker & Kubernetes", "CI/CD Pipelines", "Linux & Git"],
    },
    {
      id: "entrepreneurship",
      number: "08 / BUSINESS",
      category: "business",
      title: "Entrepreneurship",
      description: "Explore product innovation, viable business models, market validation, venture development, and founder-level thinking",
      icon: <Lightbulb className="w-6 h-6 text-[#0052cc]" />,
      tags: ["Business Modeling", "Product Strategy", "Growth Hacking", "Pitching"],
    },
    {
      id: "content-media",
      number: "09 / CREATIVE",
      category: "creative",
      title: "Content & Media",
      description: "Develop digital storytelling, brand narratives, multimedia production, video scripting, and high-impact communication.",
      icon: <FileText className="w-6 h-6 text-[#0052cc]" />,
      tags: ["Copywriting", "Video Production", "Brand Storytelling", "Social Media"],
    },
  ];

  // Combined Domains: Core + Dynamic DB Tracks
  const allDomains = React.useMemo(() => {
    return [...coreDomains, ...dbTracks];
  }, [coreDomains, dbTracks]);

  const filteredDomains =
    activeTab === "all" ? allDomains : allDomains.filter((d) => d.category === activeTab);

  const faqs = [
    {
      q: "Who can apply for the internship?",
      a: "Students and recent graduates from relevant academic backgrounds who are interested in developing practical skills and gaining professional experience can apply. Eligibility may vary depending on the selected domain",
    },
    {
      q: "Can I choose my internship domain?",
      a: "Yes. Applicants can indicate their preferred domain during the application process. Final allocation may depend on programme requirements and team availability",
    },
    {
      q: "Will I work on projects?",
      a: "Yes! The programme is designed around practical learning and project-based assignments so that students can apply their knowledge in realistic working environments",
    },
    {
      q: "Is mentorship provided?",
      a: "Students receive guidance, 1-on-1 feedback, and direction from experienced professionals and mentors as part of their comprehensive internship journey",
    },
    {
      q: "How do I apply?",
      a: "Click the Apply Now button, complete the quick application form, and submit your details. Our HR team will review your application and connect with you on next steps",
    },
  ];

  const handleApplyClick = (domainTitle?: string, trackId?: string) => {
    if (domainTitle) {
      setFormData((prev) => ({ ...prev, domain: domainTitle }));
      setSelectedTrackId(trackId || null);
    }
    setModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Submit to Supabase database so admin gets details in Internship Panel
      const res = await fetch("/api/internship/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          internshipTrackId: selectedTrackId,
          domainTitle: formData.domain,
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          college: formData.college,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          setModalOpen(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            college: "",
            domain: "Web Development",
            message: "",
          });
        }, 3500);
      } else {
        alert(data.error || "Failed to submit application. Please retry.");
      }
    } catch (err) {
      alert("Error connecting to server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#070c18] text-[#172947] dark:text-slate-100 font-sans selection:bg-[#0052cc]/20 selection:text-[#003882]">
      <Navbar />

      {/* STICKY PARALLAX HERO BANNER */}
      <section className="sticky top-0 z-0 bg-[#001738] dark:bg-[#050b17] min-h-[500px] sm:min-h-[560px] lg:min-h-[640px] pt-24 pb-36 sm:pt-32 sm:pb-44 lg:pt-36 lg:pb-52 flex items-center overflow-hidden">
        {/* High-Clarity Unblurred Background Photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-100"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')`,
            backgroundPosition: "center 30%",
          }}
        />

        {/* Lightweight translucent brand scrim for maximum photo clarity */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000d20]/80 via-[#011c47]/55 to-[#000d20]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,10,25,0.2),rgba(0,10,25,0.5))] pointer-events-none" />

        <motion.div
          style={{ y: heroTranslateY, opacity: heroOpacity, scale: heroScale }}
          className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-xs sm:text-sm font-bold tracking-[0.22em] text-[#8dc2ff] uppercase backdrop-blur-md shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#93c5fd]" />
                <span>HRA GROUPS INTERNSHIP PROGRAMME</span>
              </div>

              {/* Heading */}
              <h1 className="text-[38px] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-[78px] font-normal tracking-[-0.03em] leading-[1.08] text-white drop-shadow-sm">
                Turn Your <br />
                <span className="font-semibold text-white">Potential</span> <br />
                Into{" "}
                <span className="bg-gradient-to-r from-sky-200 via-sky-100 to-[#65acff] bg-clip-text text-transparent font-medium italic">
                  Experience.
                </span>
              </h1>

              {/* Description */}
              <p className="text-[16px] sm:text-[18px] lg:text-[19px] text-slate-200 font-normal leading-[1.7] max-w-2xl">
                A premium learning experience built for ambitious students. Work on meaningful projects, learn from experienced professionals, develop real-world skills and take your first confident step towards your career.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => handleApplyClick()}
                  className="inline-flex items-center justify-center px-9 py-3.5 rounded-full bg-[#0052cc] hover:bg-[#003882] text-white font-bold text-[15px] shadow-[0_8px_30px_rgba(0,82,204,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                >
                  <span>Apply for Internship</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <a
                  href="#programmes"
                  className="inline-flex items-center justify-center px-9 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-[15px] backdrop-blur-sm transition-all duration-300"
                >
                  <span>Explore Opportunities</span>
                </a>
              </div>

              {/* 4 Steps Meta Pillars */}
              <div className="grid grid-cols-4 gap-4 pt-6 border-t border-white/15 max-w-lg">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">01</div>
                  <div className="text-[11px] font-semibold text-sky-200 uppercase tracking-wider">Learn</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">02</div>
                  <div className="text-[11px] font-semibold text-sky-200 uppercase tracking-wider">Build</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">03</div>
                  <div className="text-[11px] font-semibold text-sky-200 uppercase tracking-wider">Collaborate</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">04</div>
                  <div className="text-[11px] font-semibold text-sky-200 uppercase tracking-wider">Grow</div>
                </div>
              </div>
            </div>

            {/* Right Card: 3D Floating Glassmorphism Internship Badge */}
            <div className="lg:col-span-5 hidden lg:flex justify-center">
              <div className="w-full max-w-md rounded-3xl p-7 bg-white/10 backdrop-blur-xl border border-white/25 shadow-2xl space-y-6 text-white relative">
                {/* Status tag */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold tracking-tight text-white">HRA</span>
                  <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    Applications Open
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl font-bold leading-tight">
                    Internship <br />
                    Programme
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Learn through practical experience, collaborate with teams and create work you can be proud of.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/15">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-sky-200 block">Experience</span>
                    <strong className="text-sm font-semibold">Practical</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-sky-200 block">Learning</span>
                    <strong className="text-sm font-semibold">Industry Led</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-sky-200 block">Projects</span>
                    <strong className="text-sm font-semibold">Real World</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-sky-200 block">Focus</span>
                    <strong className="text-sm font-semibold">Career Growth</strong>
                  </div>
                </div>

                <button
                  onClick={() => handleApplyClick()}
                  className="w-full py-3 rounded-xl bg-white text-[#001738] font-bold text-sm shadow-md hover:bg-sky-50 transition-all cursor-pointer"
                >
                  Start Your Journey ↗
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* OVERLAPPING SHEET CONTAINER */}
      <div className="relative z-10 bg-[#f8fafc] dark:bg-[#090e1a] rounded-t-[36px] sm:rounded-t-[48px] lg:rounded-t-[60px] border-t border-white/80 dark:border-slate-800/80 overflow-hidden shadow-[0_-25px_60px_rgba(0,18,48,0.3)]">
        
        {/* HIGHLIGHT VALUE STRIP */}
        <section className="bg-white dark:bg-[#0c1427] border-b border-slate-200/80 dark:border-slate-800 py-5">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center"
            >
              {[
                "Project-Based Learning",
                "Professional Mentorship",
                "Collaborative Environment",
                "Portfolio Development",
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                  className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  <span className="text-[#0052cc] dark:text-sky-400 font-bold">✦</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* INTRO SECTION: THE HRA APPROACH */}
        <section className="py-16 sm:py-20 lg:py-24 overflow-hidden">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-6 space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 text-xs font-bold uppercase tracking-widest text-[#0052cc] dark:text-sky-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#0052cc] dark:text-sky-400" />
                  <span>The HRA Approach</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001f4d] dark:text-slate-100 leading-tight tracking-tight">
                  Not just an internship. <br />
                  <span className="bg-gradient-to-r from-[#0052cc] via-[#0070f3] to-[#0284c7] dark:from-sky-300 dark:via-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
                    A career experience.
                  </span>
                </h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-6"
              >
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed bg-white/60 dark:bg-[#0c1427]/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  At HRA Groups, we believe students learn best when they move beyond theory and start solving real problems. Our internship experience combines structured learning, practical assignments, collaboration and professional exposure to help you discover what you are capable of.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* EXPLORE DOMAINS SECTION */}
        <section id="programmes" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#070c18] border-y border-slate-200/80 dark:border-slate-800">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 space-y-12">
            
            {/* Domain Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div className="space-y-3 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 text-xs font-bold uppercase tracking-widest text-[#0052cc] dark:text-sky-300">
                  <GraduationCap className="w-3.5 h-3.5 text-[#0052cc] dark:text-sky-400" />
                  <span>Explore Opportunities</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001f4d] dark:text-slate-100 tracking-tight">
                  Choose Your Direction.
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                Choose an internship domain that aligns with your interests, academic background and future career goals.
              </p>
            </motion.div>

            {/* Filter Tabs with animated active pill */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
              {(["all", "technology", "creative", "business"] as const).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer capitalize z-10 ${
                      isActive ? "text-white" : "text-slate-600 dark:text-slate-300 hover:text-[#0052cc] dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-700"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeDomainFilter"
                        className="absolute inset-0 bg-[#0052cc] rounded-full shadow-md shadow-blue-600/30 -z-10"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span>{tab === "all" ? "All Domains" : tab}</span>
                  </button>
                );
              })}
            </div>

            {/* Domains Grid with staggered entrance & smooth filter transitions */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredDomains.map((d, index) => (
                  <motion.div
                    layout
                    key={d.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -8, transition: { duration: 0.25 } }}
                    className="group rounded-3xl bg-[#f8fafc] dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/50 p-7 sm:p-8 transition-colors duration-300 hover:shadow-[0_20px_45px_rgba(0,82,204,0.08)] dark:hover:shadow-blue-950/30 flex flex-col justify-between cursor-pointer relative overflow-hidden"
                    onClick={() => handleApplyClick(d.title)}
                  >
                    {/* Top ambient highlight gradient */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0052cc]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-400 group-hover:text-[#0052cc] dark:group-hover:text-sky-400 transition-colors">
                          {d.number}
                        </span>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 group-hover:bg-[#0052cc] group-hover:text-white group-hover:border-[#0052cc] transition-all shadow-sm"
                        >
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                        </motion.div>
                      </div>

                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 group-hover:bg-blue-600/10 group-hover:border-blue-200 flex items-center justify-center transition-colors">
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {d.icon}
                        </motion.div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#001f4d] dark:text-slate-100 group-hover:text-[#0052cc] dark:group-hover:text-sky-400 transition-colors">
                          {d.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                          {d.description}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {d.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-[11px] font-medium text-slate-600 dark:text-slate-300 group-hover:border-blue-200 group-hover:text-blue-900 dark:group-hover:text-sky-300 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-950/40 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#0052cc] dark:text-sky-400">
                      <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                        Apply for this domain
                      </span>
                      <span className="text-base group-hover:translate-x-1 transition-transform duration-200 inline-block">
                        →
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

          </div>
        </section>

        {/* EXPERIENCE SECTION: LEARN BY DOING */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[#001738] dark:bg-[#050b17] text-white">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Pillars */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#8dc2ff]">
                    The Experience
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                    Learn by <span className="text-[#8dc2ff]">Doing</span>
                  </h2>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                    Your internship should give you something more valuable than a line on your resume — confidence gained through actually creating, solving and collaborating
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-[#8dc2ff] flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Work on Practical Projects</h4>
                      <p className="text-xs sm:text-sm text-slate-300">Apply your knowledge to meaningful project-based assignments</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-[#8dc2ff] flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Learn With Mentors</h4>
                      <p className="text-xs sm:text-sm text-slate-300">Receive guidance, feedback and direction from experienced professionals</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-[#8dc2ff] flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Collaborate With Teams</h4>
                      <p className="text-xs sm:text-sm text-slate-300">Experience communication, teamwork and professional workflows</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-[#8dc2ff] flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Build Your Portfolio</h4>
                      <p className="text-xs sm:text-sm text-slate-300">Create work that demonstrates your skills and practical capabilities</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Experience Hero Box */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#012768] via-[#001738] to-[#011a42] border border-white/15 shadow-2xl space-y-6 relative overflow-hidden">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#8dc2ff]">
                    HRA / 01
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-slate-400">Your Next Chapter</span>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                      Start <br />
                      Something <br />
                      Meaningful
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300">
                    Join an energetic environment designed to accelerate your personal and technical growth.
                  </p>
                  <button
                    onClick={() => handleApplyClick()}
                    className="px-8 py-3.5 rounded-full bg-white text-[#001738] font-bold text-sm hover:bg-sky-50 transition-all cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4-STEP PROCESS JOURNEY */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#070c18]">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 space-y-12">
            <div className="space-y-3 max-w-xl">
              <div className="text-xs font-bold uppercase tracking-widest text-[#0052cc] dark:text-sky-400">
                Your Journey
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001f4d] dark:text-slate-100">
                Four steps. <br />
                <span className="bg-gradient-to-r from-[#0052cc] to-[#0284c7] dark:from-sky-300 dark:to-blue-400 bg-clip-text text-transparent">
                  One transformation
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="p-8 rounded-3xl bg-[#f8fafc] dark:bg-[#0c1427] border border-slate-200/80 dark:border-slate-800 space-y-4">
                <div className="text-2xl font-black text-[#0052cc] dark:text-sky-400">01</div>
                <h3 className="text-xl font-bold text-[#001f4d] dark:text-slate-100">Apply</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Tell us about yourself, academic background, and choose the domain that interests you
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#f8fafc] dark:bg-[#0c1427] border border-slate-200/80 dark:border-slate-800 space-y-4">
                <div className="text-2xl font-black text-[#0052cc] dark:text-sky-400">02</div>
                <h3 className="text-xl font-bold text-[#001f4d] dark:text-slate-100">Onboard</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Understand the programme structure, learning milestones, expectations, and project journey
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#f8fafc] dark:bg-[#0c1427] border border-slate-200/80 dark:border-slate-800 space-y-4">
                <div className="text-2xl font-black text-[#0052cc] dark:text-sky-400">03</div>
                <h3 className="text-xl font-bold text-[#001f4d] dark:text-slate-100">Build</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Learn with mentors, collaborate with team members, and work on practical assignments
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#f8fafc] dark:bg-[#0c1427] border border-slate-200/80 dark:border-slate-800 space-y-4">
                <div className="text-2xl font-black text-[#0052cc] dark:text-sky-400">04</div>
                <h3 className="text-xl font-bold text-[#001f4d] dark:text-slate-100">Grow</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Complete your experience with recognized certifications, verifiable skills, and portfolio work
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-12 bg-[#f8fafc] dark:bg-[#090e1a] border-y border-slate-200/80 dark:border-slate-800">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-6">
                <div className="text-4xl sm:text-5xl font-black text-[#001f4d] dark:text-white">500+</div>
                <div className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mt-1">Students Engaged</div>
              </div>
              <div className="p-6">
                <div className="text-4xl sm:text-5xl font-black text-[#001f4d] dark:text-white">20+</div>
                <div className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mt-1">Learning Domains</div>
              </div>
              <div className="p-6">
                <div className="text-4xl sm:text-5xl font-black text-[#001f4d] dark:text-white">50+</div>
                <div className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mt-1">Live Projects</div>
              </div>
              <div className="p-6">
                <div className="text-4xl sm:text-5xl font-black text-[#001f4d] dark:text-white">10+</div>
                <div className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mt-1">Mentors & Experts</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#070c18]">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-[#0052cc] dark:text-sky-400">
                  FAQ
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001f4d] dark:text-slate-100">
                  Everything you <br />
                  <span className="bg-gradient-to-r from-[#0052cc] to-[#0284c7] dark:from-sky-300 dark:to-blue-400 bg-clip-text text-transparent">
                    need to know
                  </span>
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Have other questions? Feel free to reach out to our team via WhatsApp or phone
                </p>
              </div>

              <div className="lg:col-span-7 space-y-3">
                {faqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div
                      key={i}
                      className="border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden transition-all bg-[#f8fafc] dark:bg-[#0c1427]"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm sm:text-base text-[#001f4d] dark:text-slate-100 hover:text-[#0052cc] dark:hover:text-sky-400 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <span className={`w-7 h-7 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 text-xs shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}>
                          +
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/60 dark:border-slate-800 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[#f8fafc] dark:bg-[#090e1a]">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="rounded-3xl bg-gradient-to-r from-[#001738] via-[#012768] to-[#001738] dark:from-[#031c47] dark:via-[#012768] dark:to-[#02132b] p-10 sm:p-16 text-center text-white shadow-2xl relative overflow-hidden space-y-6 border border-blue-400/20 dark:border-blue-500/20">
              <div className="text-xs font-bold uppercase tracking-widest text-[#8dc2ff]">
                Your Journey Starts Here
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold max-w-2xl mx-auto leading-tight">
                Don&apos;t wait for experience. <br />
                <span className="bg-gradient-to-r from-sky-200 via-sky-100 to-[#65acff] bg-clip-text text-transparent">
                  Create it.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto">
                Take the next step with HRA Groups. Learn new skills, work on meaningful projects and start building the professional version of yourself.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleApplyClick()}
                  className="px-10 py-4 rounded-full bg-white text-[#001738] font-bold text-sm shadow-xl hover:bg-sky-50 transition-all hover:scale-105 cursor-pointer"
                >
                  Start Your Application ↗
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* APPLICATION MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#0c1427] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2 mb-6">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0052cc] dark:text-sky-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-[#0052cc] dark:text-sky-400" />
                  <span>HRA Groups</span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#001f4d] dark:text-white">
                  Internship Application
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fill in your details below and our team will get in touch with you.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">Application Received</h4>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Thank you for applying to the HRA Groups Internship Programme. Connecting you on WhatsApp for onboarding...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0052cc]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0052cc]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 96762 72283"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0052cc]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">College / University</label>
                      <input
                        type="text"
                        required
                        value={formData.college}
                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                        placeholder="Institution name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0052cc]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Preferred Internship Domain</label>
                    <select
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0052cc] cursor-pointer"
                    >
                      {allDomains.map((d) => (
                        <option key={d.id} value={d.title}>
                          {d.title} ({d.category.toUpperCase()})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">Tell us about yourself</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly tell us about your skills, interests or goals..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0052cc]"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3.5 rounded-xl bg-[#0052cc] hover:bg-[#003882] text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application →"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
