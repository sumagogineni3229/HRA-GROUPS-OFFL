"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  MessageSquare,
  ChevronDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Server,
  Cloud,
  ShieldCheck,
  Cpu,
  BarChart3,
  Layers,
  PhoneCall,
  CheckCircle2,
  Users,
  Building2,
  Star,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [currentCaseStudy, setCurrentCaseStudy] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [activeNavDropdown, setActiveNavDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentExcellenceSlide, setCurrentExcellenceSlide] = useState(0);
  const [isHoveredCaseStudy, setIsHoveredCaseStudy] = useState(false);

  // Excellence slides from live site
  const excellenceSlides = [
    {
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/1st-bzgvbiCndwULoKQT.jpeg",
      title: "Corporate Excellence Award",
      desc: "Honored for outstanding corporate excellence and innovation across multiple business domains.",
      extra: "Reflects leadership strength, governance discipline, and enterprise-grade execution.",
      points: ["Corporate excellence", "Innovation-driven delivery", "High-impact execution", "Quality governance"],
    },
    {
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/2nd-7LE56fFGyLZYeJTC.jpeg",
      title: "Leadership & Vision Award",
      desc: "Recognized for visionary leadership enabling sustainable growth and long-term success.",
      extra: "Acknowledges strategic foresight and people-centric leadership.",
      points: ["Visionary leadership", "Strategic growth", "Trusted partnerships", "Long-term vision"],
    },
    {
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img-55-iwGtvjzqnUhOIowd.jpg",
      title: "Project Delivery Excellence",
      desc: "Awarded for consistent, secure, and high-quality project delivery.",
      extra: "Demonstrates commitment to timelines and scalable systems.",
      points: ["On-time delivery", "Secure systems", "Scalable architecture", "Industry standards"],
    },
    {
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/5th-ENaP3cssCd60dQxr.jpeg",
      title: "Innovation-Led Growth Award",
      desc: "Awarded for driving measurable business growth through continuous innovation.",
      extra: "Transforms ideas into reliable, scalable digital solutions.",
      points: ["Innovation-led growth", "Scalable solutions", "Business impact", "Industry recognition"],
    },
    {
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/speech-FKw85a5LrJj4HdRc.jpeg",
      title: "Leadership Address & Recognition",
      desc: "Honored for leadership presence and industry influence.",
      extra: "Highlights thought leadership and strategic communication.",
      points: ["Leadership address", "Industry presence", "Stakeholder trust", "Recognition"],
    },
    {
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img-23-VEjOHz2zOG4PEi4W.jpg",
      title: "Corporate Achievement Recognition",
      desc: "Recognized for maintaining operational excellence.",
      extra: "Represents disciplined execution and professionalism.",
      points: ["Operational excellence", "Professional standards", "Process maturity", "Corporate trust"],
    },
    {
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/vice-president-mv0Jg69MKJCD4l7q.jpg",
      title: "Executive Leadership Recognition",
      desc: "Received recognition for executive leadership.",
      extra: "Acknowledges accountability and strategic direction.",
      points: ["Executive leadership", "Strategic governance", "Corporate recognition", "Leadership trust"],
    },
    {
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/6th-DmIMSc5GPntYvZy8.jpeg",
      title: "Milestone Achievement",
      desc: "Acknowledged for achieving key organizational milestones.",
      extra: "Marks significant progress toward long-term excellence.",
      points: ["Key milestones", "Growth journey", "Future vision", "Achievement"],
    },
  ];

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 80]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0.3]);

  // Case studies data
  const caseStudies = [
    {
      title: "IT Managed Services for Large Midwest City",
      desc: "Modernizing core city infrastructure, providing round-the-clock proactive monitoring, and slashing ticketing resolution turnaround by 45%.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/69c55ee836da2f16acf071b9_Chicago%201.avif",
      category: "Government",
    },
    {
      title: "ServiceNow for One of Nation's Largest Port Authorities",
      desc: "Streamlined multi-agency workflows and automated cross-department logistics for continuous marine and land operations.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/69c54dbff8dd16043703b2f1_Sea%20Port.avif",
      category: "Transportation",
    },
    {
      title: "Large Midwest Utility Company - EAM & GIS",
      desc: "Enterprise asset tracking and precision spatial GIS mapping to enhance pipeline security and preventative maintenance.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/69c553b8ef72025e41e410f9_Gas%20Lines.avif",
      category: "Utilities",
    },
    {
      title: "Large West Coast City - Data Strategy",
      desc: "Architecting a unified, scalable municipal data lakehouse for real-time analytics, dashboards, and AI policy decisions.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/69c554b70e1e15aea82ce672_Sacramento%202.avif",
      category: "Government",
    },
    {
      title: "West Coast Community College System – IT Strategic Plan",
      desc: "Digital campus roadmap bridging modern LMS integrations, cybersecurity safeguards, and hybrid cloud agility.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/69c43e92d4da2117b1b6a218_Community%20College.avif",
      category: "Education",
    },
    {
      title: "Large Midwest Energy Provider - Network Engineering Services",
      desc: "Mission-critical high-bandwidth SCADA network engineering ensuring 99.999% substation uptime across four states.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/69c537b8d3971172f86b6ff4_Gas%20Utility.avif",
      category: "Energy",
    },
  ];

  // Auto slide for excellence section
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentExcellenceSlide((prev) => (prev + 1) % excellenceSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [excellenceSlides.length]);

  // Auto slide for Case Studies section (with pause on hover) - high speed
  useEffect(() => {
    if (isHoveredCaseStudy) return;
    const timer = setInterval(() => {
      setCurrentCaseStudy((prev) => (prev + 1) % caseStudies.length);
    }, 1200);
    return () => clearInterval(timer);
  }, [isHoveredCaseStudy, caseStudies.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Industries list
  const industries = [
    {
      name: "Government",
      title: "Helping Government Work Smarter for the People It Serves",
      desc: "Modern government relies on technology to deliver secure services, enable data-driven policy, and operate more efficiently in service of the public.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/688a2821f82609ee0bf3ddbe_industries-1.avif",
    },
    {
      name: "Utilities",
      title: "IT Services & Consulting for Utility Organizations",
      desc: "Utility companies rely on advanced technology to manage complex networks, strengthen grid resilience, and ensure reliable, safe service in an increasingly data-driven environment.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/68cd5d15f8df338f0c6d44f7_utilities-hero.avif",
    },
    {
      name: "Aviation",
      title: "IT Services & Consulting for Aviation Safety and Security",
      desc: "Aviation depends on advanced technology to ensure safety, optimize operations, and support real-time coordination across complex air travel systems.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/688b5467f59b1147601759d4_indust-2.avif",
    },
    {
      name: "Transportation",
      title: "Transforming City Operations with ServiceNow",
      desc: "Information technology is critical to public transit, enabling real-time tracking, efficient operations, and data-driven planning that improve reliability and rider experience.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/68cd5dd51e5d223642754afb_transportation-hero.avif",
    },
    {
      name: "Public Safety Managed Services",
      title: "Public Safety Managed Services",
      desc: "Advanced technology solutions designed to recognize, respond, and recover from an incident or emergency swiftly and effectively.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/688b5444b1e5447e507df849_indust-6.avif",
    },
    {
      name: "Commercial Real Estate",
      title: "Commercial Real Estate",
      desc: "Real estate data services to maximize revenue, valuation & safety with smart building technologies.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/688b543568ea9de47bf6c70c_indust-4.avif",
    },
    {
      name: "Banking, Financial Services & Insurance",
      title: "Solutions for Banking, Financial Services, and Insurance",
      desc: "Streamlining operations, modernizing legacy systems, and improving service delivery while keeping full regulatory compliance.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/68cd5f2493afb621532c175b_banking-hero.avif",
    },
    {
      name: "Manufacturing",
      title: "IT Services & Manufacturing",
      desc: "Information technology is critical to modern manufacturing, enabling automation and data-driven decisions that improve efficiency, quality, and resilience.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/688a2821f82609ee0bf3ddbe_industries-1.avif",
    },
  ];

  // Solutions data
  const solutions = [
    {
      id: "managed-services",
      title: "IT Managed Services",
      tag: "Comprehensive IT Solutions",
      sub: "for Organizations of All Sizes",
      spanCol: "md:col-span-12 lg:col-span-4 lg:row-span-2",
      icon: Server,
      accentBg: "from-blue-500/10 via-sky-400/5 to-transparent",
      graphic: (
        <div className="relative w-full h-48 sm:h-64 flex items-center justify-center">
          <div className="absolute w-36 h-36 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
          {/* Cloud & Data illustration */}
          <div className="relative flex flex-col items-center">
            <div className="p-4 bg-gradient-to-b from-white to-blue-50/80 rounded-2xl shadow-xl border border-blue-100 flex items-center justify-center">
              <Cloud className="w-16 h-16 text-blue-600 stroke-[1.5]" />
            </div>
            {/* Animated data lines */}
            <div className="flex gap-2 mt-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-gradient-to-b from-blue-500 to-transparent rounded-full animate-bounce"
                  style={{
                    height: `${20 + (i % 3) * 12}px`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "servicenow",
      title: "ServiceNow Integration",
      tag: "Workflow Automation",
      sub: "Transform workflows, reduce costs, and drive efficiency with SDI Presence – your Elite ServiceNow partner",
      spanCol: "md:col-span-12 lg:col-span-8",
      icon: Cpu,
      accentBg: "from-blue-600/10 via-indigo-400/5 to-transparent",
      graphic: (
        <div className="relative w-full h-36 flex items-center justify-center">
          <div className="px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-blue-100 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
            <span className="font-semibold text-blue-900 tracking-wide">ServiceNow</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Elite Partner</span>
          </div>
        </div>
      ),
    },
    {
      id: "eam",
      title: "Enterprise Asset Management",
      tag: "Asset Optimization",
      sub: "Maximize Asset Performance. Enhance Operational Efficiency.",
      spanCol: "md:col-span-6 lg:col-span-4",
      icon: Layers,
      accentBg: "from-sky-500/10 via-transparent to-transparent",
      graphic: (
        <div className="relative w-full h-32 flex items-center justify-center">
          <div className="p-3 bg-white rounded-xl shadow-md border border-blue-50 flex items-center gap-2">
            <div className="w-12 h-6 bg-blue-100 rounded flex items-center justify-center text-[10px] text-blue-800 font-bold">EAM 4.0</div>
            <div className="w-16 h-2 bg-blue-200 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-blue-600"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "data-ai",
      title: "Enterprise Data & AI",
      tag: "Intelligent Insights",
      sub: "Transforming Data Disorder into Business Insight",
      spanCol: "md:col-span-6 lg:col-span-4",
      icon: BarChart3,
      accentBg: "from-indigo-500/10 via-transparent to-transparent",
      graphic: (
        <div className="relative w-full h-32 flex items-center justify-center">
          <div className="flex gap-2 items-end h-16">
            <div className="w-4 h-8 bg-blue-200 rounded-t"></div>
            <div className="w-4 h-12 bg-blue-400 rounded-t"></div>
            <div className="w-4 h-16 bg-blue-600 rounded-t"></div>
            <div className="w-4 h-10 bg-indigo-500 rounded-t"></div>
          </div>
        </div>
      ),
    },
    {
      id: "public-safety",
      title: "Public Safety Technology",
      tag: "Community Protection",
      sub: "Protecting Communities with Connected, Reliable, and Secure Technology.",
      spanCol: "md:col-span-6 lg:col-span-6",
      icon: ShieldCheck,
      accentBg: "from-blue-600/10 via-sky-400/5 to-transparent",
      graphic: (
        <div className="relative w-full h-32 flex items-center justify-center">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 shadow-sm flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
            <div className="text-left">
              <div className="text-xs font-bold text-blue-900">NextGen 911 Ready</div>
              <div className="text-[11px] text-slate-500">24/7 Redundant Telemetry</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "advisory",
      title: "Advisory & Consulting",
      tag: "Strategic Roadmaps",
      sub: "Turning Complex Challenges into Strategic Opportunities",
      spanCol: "md:col-span-6 lg:col-span-6",
      icon: CheckCircle2,
      accentBg: "from-sky-500/10 via-transparent to-transparent",
      graphic: (
        <div className="relative w-full h-32 flex items-center justify-center">
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-md flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">30+</div>
            <div className="text-left">
              <div className="text-xs font-bold text-slate-900">Years of Executive Advisory</div>
              <div className="text-[11px] text-slate-500">Proven Playbooks & Governance</div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setEmailSubmitted(true);
      setTimeout(() => setEmailSubmitted(false), 5000);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#172947] font-sans selection:bg-[#0052cc]/20 selection:text-[#003882]">
      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* EXACT 1:1 STICKY HERO WITH SMOOTH PARALLAX AS IN BLOG PAGE */}
      <section className="sticky top-0 z-0 bg-white min-h-[calc(100vh-80px)] flex items-center pt-4 pb-12 lg:pt-0 lg:pb-0 overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative my-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-center min-h-[calc(100vh-140px)] relative">
            {/* Hero Left Content (Layered on top of expanded illustration - Moved to Top) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 xl:col-span-6 space-y-4 lg:space-y-5 relative z-20 pt-0 pb-4 -mt-16 sm:-mt-24 lg:-mt-48 xl:-mt-64"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs sm:text-sm font-bold tracking-[0.2em] text-[#0052cc] uppercase shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>INNOVATION • RESILIENCE • CONSULTANCY</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8 }}
                className="text-[40px] sm:text-[54px] md:text-[62px] lg:text-[66px] xl:text-[76px] font-bold tracking-tight text-slate-900 leading-[1.12]"
              >
                Welcome to <span className="text-[#657ef8]">H</span><span className="text-[#00bcd4]">R</span><span className="text-[#f58220]">A</span> Groups
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="text-[22px] sm:text-[26px] lg:text-[30px] font-semibold italic tracking-wide"
              >
                <span className="text-[#657ef8]">H</span><span className="text-[#657ef8]/90 font-normal">ope</span> <span className="text-slate-400 font-normal">+</span> <span className="text-[#00bcd4]">R</span><span className="text-[#00bcd4]/90 font-normal">esilience</span> <span className="text-slate-400 font-normal">+</span> <span className="text-[#f58220]">A</span><span className="text-[#f58220]/90 font-normal">spire</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8 }}
                className="text-[18px] sm:text-[20px] lg:text-[22px] text-slate-700 font-normal leading-[1.65] max-w-[580px]"
              >
                We specialize in IT Services and Consultancy,<br className="hidden sm:inline" />
                Driving innovation &amp; excellence
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.8 }}
                className="pt-2"
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center px-10 py-4 rounded-full bg-white border border-[#447aff]/30 shadow-[0_6px_22px_rgba(68,122,255,0.18)] hover:shadow-[0_10px_30px_rgba(68,122,255,0.28)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <span className="text-[15px] font-semibold bg-gradient-to-r from-[#013b9a] via-[#3866f1] to-[#65acff] bg-clip-text text-transparent group-hover:opacity-90">
                    Talk to an Expert
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Right 3D City Isometric Artwork (Full screen scaling & presence) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-6 xl:col-span-6 relative flex justify-center lg:justify-end z-10 lg:-ml-12 xl:-ml-24"
            >
              <div className="relative w-full max-w-[850px] lg:max-w-[1050px] xl:max-w-[1300px] lg:scale-115 xl:scale-130 transform-gpu origin-center lg:origin-right">
                <img
                  src="https://cdn.prod.website-files.com/685c045f09a3dab41aa0d71d/69d7c14dcfa64e1aeab3d642_Picture%20for%20hero%20section.avif"
                  alt="HRA Groups 3D City Architecture"
                  className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-none"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ELEVATED SHEET WRAPPER (OVERLAPS AND SCROLLS SMOOTHLY OVER HERO EXACTLY AS IN BLOG PAGE) */}
      <div id="experience-sheet" className="relative z-10 bg-white rounded-t-[36px] sm:rounded-t-[48px] lg:rounded-t-[60px] shadow-[0_-25px_60px_rgba(15,23,42,0.15)] border-t border-slate-100/80">
        {/* ========================================================================= */}
        {/* SECTION: OUR EXCELLENCE SLIDER (With Smooth Scroll Reveal & Flip Animation) */}
        {/* ========================================================================= */}
        <section className="py-20 bg-gradient-to-br from-[#eef3ff] via-[#f8faff] to-white border-b border-blue-100/60 overflow-hidden relative rounded-t-[36px] sm:rounded-t-[48px] lg:rounded-t-[60px]">
          <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_12px_40px_rgba(0,82,204,0.08)] border border-blue-100/80 hover:shadow-[0_18px_50px_rgba(0,82,204,0.12)] transition-shadow duration-500"
            >
              {/* Slider Image Container */}
              <div className="w-full lg:w-1/2 relative h-[320px] sm:h-[400px] rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center shadow-lg group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={excellenceSlides[currentExcellenceSlide].image}
                    src={excellenceSlides[currentExcellenceSlide].image}
                    alt={excellenceSlides[currentExcellenceSlide].title}
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.05, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full h-full object-contain p-3"
                  />
                </AnimatePresence>

                {/* Prev / Next Arrows */}
                <button
                  onClick={() =>
                    setCurrentExcellenceSlide((prev) =>
                      prev > 0 ? prev - 1 : excellenceSlides.length - 1
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-blue-600 text-white flex items-center justify-center transition-all shadow-md active:scale-90 z-20"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setCurrentExcellenceSlide((prev) =>
                      (prev + 1) % excellenceSlides.length
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-blue-600 text-white flex items-center justify-center transition-all shadow-md active:scale-90 z-20"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Slide Counter Indicator */}
                <div className="absolute bottom-3 right-4 px-3.5 py-1 rounded-full bg-black/70 text-white text-xs font-semibold backdrop-blur-sm z-20">
                  {currentExcellenceSlide + 1} / {excellenceSlides.length}
                </div>
              </div>

              {/* Slider Content */}
              <div className="w-full lg:w-1/2 space-y-4 lg:pl-6 lg:border-l-4 lg:border-blue-500 relative">
                <motion.div
                  key={`badge-${currentExcellenceSlide}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200/50">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    HRA Excellence &amp; Recognition
                  </span>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${currentExcellenceSlide}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-3"
                  >
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1f3c88] leading-tight min-h-[50px]">
                      {excellenceSlides[currentExcellenceSlide].title}
                    </h2>

                    <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                      {excellenceSlides[currentExcellenceSlide].desc}
                    </p>

                    <p className="text-slate-500 text-sm italic">
                      {excellenceSlides[currentExcellenceSlide].extra}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {excellenceSlides[currentExcellenceSlide].points.map((point, pIdx) => (
                    <motion.li
                      key={`${point}-${currentExcellenceSlide}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: pIdx * 0.08, duration: 0.3 }}
                      className="flex items-center gap-2 text-sm text-slate-800 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      {point}
                    </motion.li>
                  ))}
                </ul>

                {/* Dots navigation */}
                <div className="flex items-center gap-2 pt-4">
                  {excellenceSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentExcellenceSlide(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${currentExcellenceSlide === i
                        ? "w-8 bg-blue-600 shadow-sm"
                        : "w-2.5 bg-slate-300 hover:bg-slate-400"
                        }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: ABOUT HRA GROUPS (Empowering Digital Innovation & Scalable Growth) */}
        {/* ========================================================================= */}
        <section id="about" className="py-24 bg-white border-t border-slate-100 overflow-hidden relative">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-7 space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/50 text-xs font-bold tracking-widest text-[#0052cc] uppercase">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  ABOUT HRA GROUPS
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] leading-tight">
                  Empowering Digital Innovation &amp; Scalable Business Growth
                </h2>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  HRA Groups is a leading IT and Business Solutions company delivering technology-driven services across multiple domains. We specialize in building secure, scalable, and modern digital systems tailored for startups, enterprises, and growing organizations.
                </p>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  With a strong focus on innovation and client success, we provide software development, cloud engineering, consulting, staffing, and digital marketing services. Our expert team combines technical excellence with strategic thinking to help businesses modernize their operations, improve efficiency, and achieve long-term growth.
                </p>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  At HRA Groups, our mission is to empower companies with cutting-edge IT solutions that drive productivity, accelerate digital adoption, and create sustainable impact in the industry.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-5"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="p-7 rounded-3xl bg-gradient-to-br from-blue-50/80 to-indigo-50/40 border border-blue-100/80 shadow-sm flex items-center gap-6"
                >
                  <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                    35+
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-900">Successful Projects</div>
                    <div className="text-xs text-slate-500">Delivered with high reliability & quality</div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="p-7 rounded-3xl bg-gradient-to-br from-cyan-50/80 to-blue-50/40 border border-cyan-100/80 shadow-sm flex items-center gap-6"
                >
                  <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    30+
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-900">Trusted Clients</div>
                    <div className="text-xs text-slate-500">Across diverse domestic & global sectors</div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="p-7 rounded-3xl bg-gradient-to-br from-amber-50/80 to-orange-50/40 border border-amber-100/80 shadow-sm flex items-center gap-6"
                >
                  <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    2+
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-900">Years of Expertise</div>
                    <div className="text-xs text-slate-500">Continuous innovation & industry leadership</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: OUR CORE SERVICES (Full Natural Visibility with Staggered Scroll Animation) */}
        {/* ========================================================================= */}
        <section className="py-24 sm:py-28 bg-gradient-to-b from-[#f8faff] via-white to-[#edf3fc] border-t border-slate-100 relative overflow-hidden">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 pb-8 sm:pb-12">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-3xl mx-auto mb-16 space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs sm:text-sm font-bold tracking-[0.2em] text-[#0052cc] uppercase shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>WHAT WE OFFER</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold heading-black-blue-gradient"
              >
                Our Core Services
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto"
              >
                Comprehensive end-to-end technology and business solutions designed to accelerate your competitive edge.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "💡",
                  title: "Custom Software Development",
                  desc: "We build scalable web applications, ERP tools, and internal management systems with clean architecture.",
                  gradient: "from-blue-500/10 to-transparent",
                },
                {
                  icon: "📱",
                  title: "Mobile App Development",
                  desc: "High-performance Android & iOS apps with modern UI/UX, API integrations, and cloud sync features.",
                  gradient: "from-cyan-500/10 to-transparent",
                },
                {
                  icon: "☁️",
                  title: "Cloud & DevOps Engineering",
                  desc: "Deployment, automation, CI/CD pipelines, server optimization, and secure infrastructure setups.",
                  gradient: "from-indigo-500/10 to-transparent",
                },
                {
                  icon: "🧑‍💼",
                  title: "IT Staffing & Recruitment",
                  desc: "Recruitment for IT & non-IT roles, bulk hiring, contract staffing, and complete lifecycle hiring support.",
                  gradient: "from-purple-500/10 to-transparent",
                },
                {
                  icon: "📈",
                  title: "Digital Marketing & SEO",
                  desc: "SEO, paid ads, branding, social media growth, lead generation, and content marketing services.",
                  gradient: "from-emerald-500/10 to-transparent",
                },
                {
                  icon: "🤝",
                  title: "Business & Technology Consulting",
                  desc: "Technology roadmap, automation, workflow optimization, and digital growth strategies.",
                  gradient: "from-amber-500/10 to-transparent",
                },
              ].map((service, idx) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: idx * 0.09, ease: "easeOut" }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="group relative bg-white rounded-3xl p-8 sm:p-9 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,82,204,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${service.gradient} rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`}></div>

                  <div className="relative z-10">
                    <div className="text-4xl mb-6 bg-slate-50 w-16 h-16 rounded-2xl border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-300 shadow-sm">
                      {service.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100/80 relative z-10 flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                      Explore Solution <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* SECTION: OUR SOLUTIONS (Opens as a separate distinct elevated sheet layer) */}
      {/* ========================================================================= */}
      <div className="relative z-20 -mt-10 sm:-mt-14 lg:-mt-16 bg-white rounded-t-[36px] sm:rounded-t-[48px] lg:rounded-t-[60px] shadow-[0_-25px_60px_rgba(15,23,42,0.22)] border-t border-slate-100/90">
        <section
          id="solutions"
          className="py-24 sm:py-32 overflow-hidden rounded-t-[36px] sm:rounded-t-[48px] lg:rounded-t-[60px]"
        >
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            {/* Section Header with Staggered Scroll Animations */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-14 sm:mb-16 space-y-3 text-center sm:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs sm:text-sm font-bold tracking-[0.2em] text-[#0052cc] uppercase shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>OUR SOLUTIONS</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold heading-black-blue-gradient"
              >
                Your Priorities, Our Solutions
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-slate-500 text-sm sm:text-base max-w-xl"
              >
                Architected for high reliability, cybersecurity resilience, and agile business modernization.
              </motion.p>
            </motion.div>

            {/* Solutions Bento Grid with Staggered Lifts */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {solutions.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className={`group relative rounded-3xl bg-slate-50/70 border border-slate-100/80 p-8 shadow-sm hover:shadow-2xl hover:bg-white transition-all duration-300 flex flex-col justify-between overflow-hidden ${item.spanCol}`}
                  >
                    {/* Subtle top-right gradient glow */}
                    <div
                      className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl ${item.accentBg} rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`}
                    ></div>

                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                          <Icon className="w-6 h-6 stroke-[1.8]" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase block">
                            {item.tag}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-[#0a192f] group-hover:text-[#0052cc] transition-colors">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-2 max-w-lg">
                        {item.sub}
                      </p>
                    </div>

                    {/* Graphic or interactive preview */}
                    <div className="mt-8 pt-4">{item.graphic}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION: CASE STUDIES (Unmatched Technical and Industry Expertise) */}
        <section id="case-studies" className="py-24 bg-white border-t border-slate-100">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs sm:text-sm font-bold tracking-[0.2em] text-[#0052cc] uppercase shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>CASE STUDIES</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold heading-black-blue-gradient">
                  Unmatched Technical and Industry Expertise
                </h2>
              </div>

              {/* Slider Navigation Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setCurrentCaseStudy((prev) => (prev > 0 ? prev - 1 : caseStudies.length - 1))
                  }
                  className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm active:scale-95"
                  aria-label="Previous Case Study"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setCurrentCaseStudy((prev) => (prev < caseStudies.length - 1 ? prev + 1 : 0))
                  }
                  className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm active:scale-95"
                  aria-label="Next Case Study"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Continuous Smooth Infinite Moving Track */}
            <div className="relative overflow-hidden w-full py-4 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
              <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] [animation-duration:22s]">
                {[...caseStudies, ...caseStudies].map((study, idx) => (
                  <div
                    key={`${study.title}-${idx}`}
                    className="w-[320px] sm:w-[480px] md:w-[560px] flex-shrink-0 group rounded-3xl bg-slate-50/95 border border-slate-200/80 p-6 sm:p-7 md:p-8 flex flex-col justify-between hover:bg-white hover:shadow-2xl hover:border-blue-300 transition-all duration-300 shadow-sm"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center">
                      <div className="sm:col-span-7 space-y-3 sm:space-y-4">
                        <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                          {study.category}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                          {study.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                          {study.desc}
                        </p>

                        <div className="pt-2">
                          <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#172947] hover:bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm group-hover:shadow"
                          >
                            Read more
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                          </a>
                        </div>
                      </div>

                      <div className="sm:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-100">
                        <img
                          src={study.image}
                          alt={study.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots & Progress Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div className="flex items-center gap-2">
                {caseStudies.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentCaseStudy(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentCaseStudy === i
                        ? "w-8 bg-blue-600 shadow-sm"
                        : "w-2.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to case study ${i + 1}`}
                  />
                ))}
              </div>

              <div className="w-full sm:w-64 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-500 rounded-full"
                  style={{
                    width: `${((currentCaseStudy + 1) / caseStudies.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: INDUSTRIES WE SERVE (Expertise You Can Trust Across Critical Sectors) */}
        <section id="industries" className="py-24 bg-slate-50/60 border-t border-slate-200/50">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-14 space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs sm:text-sm font-bold tracking-[0.2em] text-[#0052cc] uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>INDUSTRIES WE SERVE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold heading-black-blue-gradient">
                Expertise You Can Trust Across Critical Sectors
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Industry Selector List */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-3 shadow-sm border border-slate-200/80 space-y-1">
                {industries.map((ind, idx) => (
                  <button
                    key={ind.name}
                    onClick={() => setActiveIndustry(idx)}
                    className={`w-full text-left px-5 py-3.5 rounded-2xl font-semibold text-sm transition-all flex items-center justify-between ${activeIndustry === idx
                      ? "bg-gradient-to-r from-[#013b9a] to-[#3866f1] text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                  >
                    <span>{ind.name}</span>
                    {activeIndustry === idx && <ArrowRight className="w-4 h-4" />}
                  </button>
                ))}
              </div>

              {/* Active Industry Showcase Card */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={industries[activeIndustry].name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                  >
                    <div className="md:col-span-7 space-y-5">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full uppercase">
                        {industries[activeIndustry].name}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                        {industries[activeIndustry].title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                        {industries[activeIndustry].desc}
                      </p>

                      <div className="pt-3">
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#172947] hover:bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                        >
                          Read more
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    <div className="md:col-span-5">
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                        <img
                          src={industries[activeIndustry].image}
                          alt={industries[activeIndustry].title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: HOW WE ADD VALUE (With Dynamic Scroll Cards Animation) */}
        {/* ========================================================================= */}
        <section className="py-20 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center max-w-2xl mx-auto mb-14"
            >
              <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase block mb-3">
                THE HRA DIFFERENCE
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                How We Add Value
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  badge: "⭐",
                  title: "Expert Team",
                  desc: "Experienced professionals delivering high-quality technology solutions.",
                },
                {
                  badge: "⚡",
                  title: "Quick Execution",
                  desc: "Agile approach ensuring faster delivery and transparent communication.",
                },
                {
                  badge: "🔐",
                  title: "Secure Solutions",
                  desc: "Enterprise-grade data security and compliance in every project.",
                },
                {
                  badge: "📞",
                  title: "Dedicated Support",
                  desc: "24/7 support, project maintenance, and customer assistance.",
                },
              ].map((v, idx) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -6 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 hover:bg-white/15 transition-all shadow-lg"
                >
                  <div className="text-2xl mb-3">{v.badge}</div>
                  <h4 className="text-lg font-bold text-white mb-2">{v.title}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: CAREER ACCELERATION PROGRAMS (With Staggered Cards Reveal) */}
        {/* ========================================================================= */}
        <section className="py-24 bg-white border-t border-slate-100 overflow-hidden">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-3xl mb-16"
            >
              <span className="text-xs font-bold tracking-widest text-[#0052cc] uppercase block mb-3">
                CAREER ACCELERATION PROGRAMS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
                Industry-Focused Career Programs
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Courses, internships, workshops, bootcamps, and career programs designed to prepare students and professionals with practical skills and real-world experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="p-8 rounded-3xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm font-black text-blue-600 mb-4 bg-blue-100/80 w-10 h-10 rounded-xl flex items-center justify-center">01</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Technical Courses</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    Advanced technology training programs with practical sessions and project-based learning.
                  </p>
                  <ul className="space-y-2.5">
                    {["AWS DevOps", "AI & ML", "Python Full Stack", "Java Full Stack"].map((c) => (
                      <li key={c} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-8">
                  <Link href="/services/courses" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700">
                    Explore Technical Courses <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="p-8 rounded-3xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm font-black text-indigo-600 mb-4 bg-indigo-100/80 w-10 h-10 rounded-xl flex items-center justify-center">02</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Professional Programs</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    Interactive learning experiences focused on innovation, teamwork, and career readiness.
                  </p>
                  <ul className="space-y-2.5">
                    {["Campus Recruitment Training", "Hackathons", "Bootcamps", "Workshops"].map((c) => (
                      <li key={c} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-8">
                  <Link href="/services" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700">
                    View Programs <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="p-8 rounded-3xl bg-slate-50/80 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-sm font-black text-cyan-600 mb-4 bg-cyan-100/80 w-10 h-10 rounded-xl flex items-center justify-center">03</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Internship Opportunities</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    Gain industry exposure through live projects, mentorship, and hands-on practical experience.
                  </p>
                  <ul className="space-y-2.5">
                    {["Web Development", "Human Resources", "Digital Marketing", "Business Development Executive"].map((c) => (
                      <li key={c} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-8">
                  <Link href="/internship" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-600 hover:text-cyan-700">
                    Apply for Internship <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION: CLIENT TESTIMONIAL & QUOTE (With Smooth Scroll Entrance) */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-6 space-y-4"
              >
                <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase block">
                  WHAT OUR CLIENTS SAY
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Client Testimonial
                </h3>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed italic">
                  “We’ve had great experiences working with HRA Groups for our web development projects. Their team is highly skilled and always delivers high-quality work. They also offer excellent training programs for IT professionals, which have greatly benefitted our team. Highly recommend their services!”
                </p>
                <div className="text-cyan-400 font-bold text-lg pt-2">— Ajay</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="lg:col-span-6 bg-slate-800/80 rounded-3xl p-8 sm:p-10 border border-slate-700 shadow-xl"
              >
                <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase block mb-3">
                  FOUNDER &amp; LEADERSHIP
                </span>
                <blockquote className="text-lg sm:text-xl font-medium text-slate-100 leading-snug italic mb-4">
                  “When we match the right talent with the right opportunity, we’re not just filling roles, we’re shaping careers.”
                </blockquote>
                <div className="text-slate-400 font-semibold">— Hemanth Pulavarthi, Founder / Leadership</div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* GLOBAL FOOTER */}
      <Footer />
    </div>
  );
}
