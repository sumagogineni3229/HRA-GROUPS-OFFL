"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BigPolygonBackground from "@/components/BigPolygonBackground";
import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Layers,
  Cpu,
  Globe2,
  Code2,
} from "lucide-react";

// Authentic project case studies from hragroupswebsite-psi.vercel.app/work
const WORK_PROJECTS = [
  {
    id: 1,
    number: "01",
    title: "MediaHub",
    category: "WEB PLATFORM",
    type: "SOFTWARE",
    description:
      "A modern digital platform designed to bring content, users and business operations together through one seamless digital experience",
    image: "https://hragroupswebsite-psi.vercel.app/assets/mediahubPic-C7zqN69E.png",
    tags: ["React", "Node.js", "Database"],
    link: "/services/software-development",
  },
  {
    id: 2,
    number: "02",
    title: "HRA Internship Platform",
    category: "EDUCATION",
    type: "SOFTWARE",
    description:
      "A structured digital platform connecting students, internships, projects and program operations in one connected environment",
    image: "https://hragroupswebsite-psi.vercel.app/assets/HRA%20Internship%20Platform-CEce0vXc.png",
    tags: ["React", "Platform", "Automation"],
    link: "/internship",
  },
  {
    id: 3,
    number: "03",
    title: "Business Management System",
    category: "BUSINESS",
    type: "SOFTWARE",
    description:
      "A centralized business system created to simplify workflows, organize information and improve operational visibility",
    image: "https://hragroupswebsite-psi.vercel.app/assets/Business%20Management%20System-yEUPX7Gh.png",
    tags: ["Web App", "Dashboard", "Database"],
    link: "/services/software-development",
  },
  {
    id: 4,
    number: "04",
    title: "AI Business Assistant",
    category: "AI & AUTOMATION",
    type: "AI",
    description:
      "An intelligent assistant concept designed to help businesses automate repetitive tasks, access information and work more efficiently",
    image: "https://hragroupswebsite-psi.vercel.app/assets/Business%20Assistant-CR4vqKpm.png",
    tags: ["AI", "Python", "Automation"],
    link: "/services/ai-solutions",
  },
];

const WORK_FILTERS = ["ALL", "SOFTWARE", "AI"];

const CAPABILITIES = [
  {
    number: "01",
    title: "DIGITAL ENGINEERING",
    description:
      "Web platforms, business applications and scalable digital infrastructure designed around real operational needs",
  },
  {
    number: "02",
    title: "AI & INTELLIGENCE",
    description:
      "Practical AI systems and automation that reduce repetitive work and give teams better access to information",
  },
  {
    number: "03",
    title: "PRODUCT SYSTEMS",
    description:
      "Connected products that bring interfaces, workflows, data and people together into one coherent system",
  },
  {
    number: "04",
    title: "EXPERIENCE DESIGN",
    description:
      "Clear, refined digital experiences where design makes complex technology easier to understand and use",
  },
];

const WORK_HERO_PHRASES = [
  "Ideas in action",
  "Engineered for Growth",
  "Intelligent Systems that Scale",
  "Digital Products that Deliver",
];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Typewriter text animation state
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  useEffect(() => {
    const fullText = WORK_HERO_PHRASES[phraseIndex];

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
          setPhraseIndex((prev) => (prev + 1) % WORK_HERO_PHRASES.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, typingSpeed]);

  const filteredProjects =
    activeFilter === "ALL"
      ? WORK_PROJECTS
      : WORK_PROJECTS.filter((p) => p.type === activeFilter);

  return (
    <div className="ibase-landing-bg text-white min-h-screen selection:bg-[#00c9ff]/30 selection:text-[#00c9ff] relative overflow-hidden font-sans">
      <Navbar />

      {/* Global Background Atmospheric Layer (Large Architectural Polygonal Structures for Work Page) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        <BigPolygonBackground opacityClass="opacity-80" />
        <div className="absolute top-[15%] -left-[10%] w-[650px] h-[650px] bg-[#00c9ff]/[0.035] rounded-full blur-[200px]" />
        <div className="absolute top-[55%] -right-[15%] w-[750px] h-[750px] bg-[#1e1cb0]/[0.045] rounded-full blur-[220px]" />
      </div>

      <main className="relative z-20">
        {/* ===================== WORK HERO (CENTERED WITH TYPEWRITER ANIMATION) ===================== */}
        <section className="relative w-full pt-44 pb-20 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto overflow-hidden text-center">
          <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto space-y-8">
            {/* Centered Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c9ff] animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-white/80">
                SELECTED WORK
              </span>
            </div>

            {/* Typewriter Animated Display Headline */}
            <div className="min-h-[110px] sm:min-h-[140px] md:min-h-[160px] flex items-center justify-center w-full px-2">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-light text-white tracking-[-0.03em] leading-[1.08] text-center font-serif">
                <span className="text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.2)]">
                  {currentText}
                </span>
                <span className="text-[#00c9ff] ml-1.5 font-light animate-[pulse_1s_infinite]">|</span>
              </h1>
            </div>

            {/* Centered Description */}
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              We turn ambitious ideas into useful digital products, intelligent systems and experiences that create meaningful value.
            </p>

            {/* Centered Hero Step Pillars */}
            <div className="pt-10 border-t border-white/10 w-full flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-xs font-mono tracking-widest uppercase text-white/50">
              <div className="flex items-center gap-2">
                <span className="text-[#00c9ff] font-bold">01</span>
                <span>THINK</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#00c9ff] font-bold">02</span>
                <span>BUILD</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#00c9ff] font-bold">03</span>
                <span>EVOLVE</span>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <span>HRA / WORK</span>
                <span className="text-[#00c9ff] font-bold">2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 02 SELECTED PROJECTS ===================== */}
        <section className="relative py-20 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto ibase-section-divider">
          {/* Header & Filter Area */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 relative z-10">
            <div>
              <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase mb-3">
                02 / SELECTED PROJECTS
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight font-serif">
                Things we've<br />
                <em className="font-serif italic text-[#00c9ff]">built.</em>
              </h2>
            </div>

            {/* Filter Area */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
                VIEW BY
              </span>
              <div className="flex flex-wrap gap-2">
                {WORK_FILTERS.map((f) => {
                  const isActive = activeFilter === f;
                  return (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`text-xs font-mono px-4 py-2 rounded-full uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#00c9ff] text-black font-semibold shadow-[0_0_20px_rgba(0,201,255,0.4)]"
                          : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30"
                      }`}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Project Count */}
          <div className="flex items-center gap-3 text-xs font-mono text-white/40 mb-10 pb-4 border-b border-white/10">
            <span className="text-[#00c9ff] font-bold text-sm">
              {String(filteredProjects.length).padStart(2, "0")}
            </span>
            <span>PROJECTS IN VIEW</span>
          </div>

          {/* Projects List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 relative z-10">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="group rounded-3xl bg-[#080b14]/90 border border-white/10 hover:border-[#00c9ff]/50 overflow-hidden transition-all duration-500 flex flex-col justify-between hover:shadow-[0_15px_40px_rgba(0,201,255,0.12)]"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[16/10] bg-[#05070e] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080b14] via-transparent to-transparent opacity-80" />

                    {/* Top HUD Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                      <span className="text-[10px] font-mono font-bold text-[#00c9ff] bg-black/70 px-2.5 py-1 rounded border border-white/10 backdrop-blur-xs uppercase">
                        {project.number}
                      </span>
                      <span className="text-[10px] font-mono text-white/80 bg-black/70 px-3 py-1 rounded-full border border-white/10 backdrop-blur-xs uppercase">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-mono text-[#00c9ff] uppercase tracking-wider mb-2">
                        <span>{project.number}</span>
                        <span>·</span>
                        <span>{project.type}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-light text-white font-serif mb-3 group-hover:text-[#00c9ff] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Project Link */}
                      <Link
                        href={project.link}
                        className="ibase-btn-primary text-xs px-5 py-2.5 flex items-center gap-2 group/btn"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ===================== 03 CAPABILITIES ===================== */}
        <section className="relative py-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto ibase-section-divider">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 relative z-10">
            <div>
              <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase mb-3">
                03 / CAPABILITIES
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight font-serif">
                Built for<br />
                <em className="font-serif italic text-[#00c9ff]">what's next</em>
              </h2>
            </div>
            <p className="text-sm text-white/60 max-w-md leading-relaxed">
              Digital products require more than good visuals. They need a foundation that can evolve with the people and businesses using them
            </p>
          </div>

          {/* Capabilities List */}
          <div className="divide-y divide-white/10 border-y border-white/10 relative z-10">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.number}
                className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group hover:bg-white/[0.02] px-4 rounded-xl transition-colors cursor-pointer"
              >
                <div className="md:col-span-1 text-sm font-mono text-[#00c9ff] font-bold">
                  {cap.number}
                </div>
                <div className="md:col-span-4 text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#00c9ff] transition-colors">
                  {cap.title}
                </div>
                <div className="md:col-span-6 text-sm text-white/60 leading-relaxed">
                  {cap.description}
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <span className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 group-hover:border-[#00c9ff] group-hover:text-[#00c9ff] group-hover:scale-110 transition-all">
                    ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== CTA BAND ===================== */}
        <section className="relative py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto text-center ibase-section-divider">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00c9ff]">
              START A PROJECT
            </span>
            <h2 className="text-4xl sm:text-6xl font-light text-white font-serif leading-tight">
              Have an idea in mind?<br />
              <em className="italic text-[#00c9ff]">Let's build it together</em>
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xl mx-auto">
              Whether you need scalable software engineering, AI workflow automation, or digital product consultancy, we are here to bring it to life
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="ibase-btn-primary">
                Let's Connect
              </Link>
              <Link href="/services/software-development" className="ibase-btn-ghost">
                Explore Services
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
