"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BigPolygonBackground from "@/components/BigPolygonBackground";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Code2,
  Layers,
  Cpu,
  Globe,
  Terminal,
  Smartphone,
  Database,
  CheckCircle2,
  Workflow,
  Zap,
} from "lucide-react";

// Authentic content from https://hragroupswebsite-psi.vercel.app/services/software-development
const WHAT_WE_BUILD = [
  {
    number: "01",
    title: "Web Applications",
    text: "High-performance web products designed around real users, business workflows and measurable outcomes.",
    tags: ["React", "Next.js", "Node.js"],
    icon: Globe,
  },
  {
    number: "02",
    title: "Business Platforms",
    text: "Connected platforms that bring operations, data, teams and customers into one intelligent system.",
    tags: ["Platform Architecture", "Cloud", "Databases"],
    icon: Layers,
  },
  {
    number: "03",
    title: "Custom Software",
    text: "Purpose-built software for businesses that need more than an off-the-shelf solution can provide.",
    tags: ["Backend", "Integration", "APIs"],
    icon: Code2,
  },
  {
    number: "04",
    title: "Mobile Experiences",
    text: "Clean, reliable mobile applications that make important business experiences available wherever people work.",
    tags: ["Cross-platform", "iOS", "Android"],
    icon: Smartphone,
  },
];

const CAPABILITIES = [
  "Product strategy",
  "UI / UX engineering",
  "Frontend development",
  "Backend systems",
  "API development",
  "Database architecture",
  "Cloud deployment",
  "Third-party integrations",
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Understand",
    text: "We start with the problem, users and business objective before thinking about technology.",
  },
  {
    number: "02",
    title: "Architect",
    text: "We define the product structure, technical foundation and experience required to make it work.",
  },
  {
    number: "03",
    title: "Build",
    text: "Design and engineering move together to create a focused, scalable digital product.",
  },
  {
    number: "04",
    title: "Evolve",
    text: "After launch, we improve, optimise and extend the system as the business grows.",
  },
];

const TECHNOLOGIES = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Java",
  "Flutter",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "AWS",
  "REST APIs",
  "Git",
];

const PRINCIPLES = [
  {
    number: "01",
    title: "Built around your business",
    text: "Technology is shaped around the way your organisation actually operates.",
  },
  {
    number: "02",
    title: "Ready to scale",
    text: "A strong technical foundation makes future features and growth easier to handle.",
  },
  {
    number: "03",
    title: "Designed for people",
    text: "Every system is considered from the perspective of the people who will use it.",
  },
];

export default function SoftwareDevelopmentPage() {
  const [activeBuildTab, setActiveBuildTab] = useState(0);
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  useEffect(() => {
    const buildInterval = setInterval(() => {
      setActiveBuildTab((prev) => (prev + 1) % WHAT_WE_BUILD.length);
    }, 4500);
    const processInterval = setInterval(() => {
      setActiveProcessStep((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 4000);
    return () => {
      clearInterval(buildInterval);
      clearInterval(processInterval);
    };
  }, []);

  return (
    <div className="ibase-landing-bg text-white min-h-screen selection:bg-[#00c9ff]/30 selection:text-[#00c9ff] relative overflow-hidden font-sans">
      <Navbar />

      {/* Global Background Layer with Big Polygons (Identical to Work & Founder pages) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        <BigPolygonBackground opacityClass="opacity-75" />
        <div className="absolute top-[10%] -left-[10%] w-[650px] h-[650px] bg-[#00c9ff]/[0.035] rounded-full blur-[220px]" />
        <div className="absolute top-[50%] -right-[15%] w-[800px] h-[800px] bg-[#1e1cb0]/[0.05] rounded-full blur-[250px]" />
      </div>

      <main className="relative z-20">
        {/* ========================= 01 HERO SECTION ========================= */}
        <section className="relative w-full pt-44 pb-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-8">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c9ff] animate-pulse" />
                <span className="text-xs font-mono tracking-widest uppercase text-white/80">
                  01 / SOFTWARE DEVELOPMENT
                </span>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-light text-white tracking-[-0.035em] leading-[1.05] font-serif">
                Software Built For <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic font-normal">
                  What Comes Next
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl font-light">
                We design and engineer custom software, web platforms and digital systems that solve real business problems and create lasting value.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,201,255,0.4)] hover:scale-[1.02]"
                >
                  <span>Build with HRA</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a
                  href="#build"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white/5 border border-white/15 text-white/90 text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <span>Explore what we build</span>
                  <ChevronDown className="w-4 h-4 text-[#00c9ff]" />
                </a>
              </div>

              {/* Meta Stats Row */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">01</div>
                  <div className="text-sm font-medium text-white/90 mt-1">ENGINEERING</div>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">02</div>
                  <div className="text-sm font-medium text-white/90 mt-1">SCALABILITY</div>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">03</div>
                  <div className="text-sm font-medium text-white/90 mt-1">PERFORMANCE</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Architecture HUD Terminal */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#08172a]/90 to-[#030b16]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 group">
                {/* HUD Header Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-white/60 ml-2 text-[11px]">hra.core / build-system</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#00c9ff] text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-[#00c9ff] animate-ping" />
                    ACTIVE
                  </div>
                </div>

                {/* Architecture Visualizer Layer */}
                <div className="p-6 rounded-xl bg-black/60 border border-white/10 space-y-5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/50 tracking-wider">
                    <span>ENTERPRISE FULL-STACK</span>
                    <span className="text-[#00c9ff]">v2.4.0</span>
                  </div>

                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-white/80">
                      <span className="text-[#00c9ff]">01 / FRONTEND</span>
                      <span className="text-white/40">Next.js · React · Motion</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-[#00c9ff] rounded-full" />
                    </div>

                    <div className="flex items-center justify-between text-white/80 pt-2">
                      <span className="text-[#73bbff]">02 / BACKEND &amp; API</span>
                      <span className="text-white/40">Node.js · Python · REST</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[88%] h-full bg-[#73bbff] rounded-full" />
                    </div>

                    <div className="flex items-center justify-between text-white/80 pt-2">
                      <span className="text-emerald-400">03 / DATABASE &amp; CLOUD</span>
                      <span className="text-white/40">PostgreSQL · AWS · Cloud</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[94%] h-full bg-emerald-400 rounded-full" />
                    </div>
                  </div>

                  {/* 3 Interactive Pillars Row */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                    <div className="p-2.5 rounded bg-white/[0.03] border border-white/5">
                      <span className="text-white/40 block text-[9px]">RESPONSE</span>
                      <strong className="text-white/80 font-normal">&lt; 50ms</strong>
                    </div>
                    <div className="p-2.5 rounded bg-[#00c9ff]/10 border border-[#00c9ff]/30 text-[#00c9ff]">
                      <span className="text-[#00c9ff]/60 block text-[9px]">UPTIME</span>
                      <strong className="font-semibold">99.99%</strong>
                    </div>
                    <div className="p-2.5 rounded bg-white/[0.03] border border-white/5">
                      <span className="text-white/40 block text-[9px]">COVERAGE</span>
                      <strong className="text-white/80 font-normal">TESTED</strong>
                    </div>
                  </div>
                </div>

                {/* HUD Footer */}
                <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-white/40">
                  <span>SCALE / SECURITY / CI-CD</span>
                  <span className="text-[#00c9ff]">HRA DEV LAB</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================= 02 WHAT WE BUILD ========================= */}
        <section id="build" className="relative w-full py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10">
          <div className="space-y-14">
            {/* Header */}
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>02</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>WHAT WE BUILD</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08] font-serif">
                Built With Precision <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic font-normal">
                  Engineered To Perform
                </span>
              </h2>
              <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
                From responsive web platforms to mission-critical backend systems, we engineer software tailored precisely to how your business operates.
              </p>
            </div>

            {/* Interactive Solution Selector Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Solution Buttons (Left) */}
              <div className="lg:col-span-5 space-y-3.5 flex flex-col justify-between">
                {WHAT_WE_BUILD.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activeBuildTab === idx;
                  return (
                    <button
                      key={item.number}
                      type="button"
                      onClick={() => setActiveBuildTab(idx)}
                      className={`w-full p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer ${isActive
                          ? "bg-white/[0.08] border-[#00c9ff]/60 shadow-[0_0_30px_rgba(0,201,255,0.15)]"
                          : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-mono tracking-widest ${isActive ? "text-[#00c9ff]" : "text-white/40"}`}>
                          {item.number}
                        </span>
                        <Icon className={`w-5 h-5 ${isActive ? "text-[#00c9ff]" : "text-white/60"}`} />
                        <span className={`text-base sm:text-lg font-medium ${isActive ? "text-white" : "text-white/80"}`}>
                          {item.title}
                        </span>
                      </div>
                      <ArrowUpRight className={`w-4 h-4 transition-transform ${isActive ? "text-[#00c9ff] translate-x-0.5 -translate-y-0.5" : "text-white/30"}`} />
                    </button>
                  );
                })}
              </div>

              {/* Solution Detail Panel (Right) */}
              <div className="lg:col-span-7 rounded-3xl bg-[#071225]/80 border border-white/15 p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#00c9ff]/[0.05] rounded-full blur-3xl pointer-events-none" />
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">
                      BUILD SYSTEM / {WHAT_WE_BUILD[activeBuildTab].number}
                    </span>
                    <span className="text-5xl sm:text-6xl font-mono text-white/5 font-bold">
                      {WHAT_WE_BUILD[activeBuildTab].number}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-light text-white font-serif tracking-tight">
                    {WHAT_WE_BUILD[activeBuildTab].title}
                  </h3>

                  <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl">
                    {WHAT_WE_BUILD[activeBuildTab].text}
                  </p>

                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {WHAT_WE_BUILD[activeBuildTab].tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 rounded-full bg-[#00c9ff]/10 border border-[#00c9ff]/30 text-xs font-mono text-[#00c9ff]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="pt-8 border-t border-white/10 flex gap-2">
                  {WHAT_WE_BUILD.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveBuildTab(i)}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${activeBuildTab === i ? "bg-[#00c9ff]" : "bg-white/15 hover:bg-white/30"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================= 03 CAPABILITIES ========================= */}
        <section className="relative w-full py-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>03</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>CAPABILITIES</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08] font-serif">
                From Architecture <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73bbff] via-white to-white italic font-normal">
                  To Deployment
                </span>
              </h2>
              <p className="text-base text-white/70 font-light leading-relaxed max-w-md">
                End-to-end technical execution combining modern system design, maintainable codebase architecture, and robust automated workflows.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CAPABILITIES.map((cap, idx) => (
                <div
                  key={cap}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/40 hover:bg-white/[0.05] transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-[#00c9ff] tracking-wider">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <strong className="text-sm sm:text-base font-normal text-white/90 group-hover:text-white transition-colors">
                      {cap}
                    </strong>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#00c9ff] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================= 04 HOW WE WORK (PROCESS) ========================= */}
        <section className="relative w-full py-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase mb-4">
                  <span>04</span>
                  <span className="w-8 h-px bg-[#00c9ff]/40" />
                  <span>HOW WE WORK</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-serif">
                  A Disciplined <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic">
                    Transparent Process
                  </span>
                </h2>
              </div>
              <p className="text-sm sm:text-base text-white/60 max-w-md font-light">
                From initial discovery to post-launch scaling, our software engineering lifecycle ensures predictability and speed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
              {PROCESS_STEPS.map((step, idx) => (
                <div
                  key={step.number}
                  onClick={() => setActiveProcessStep(idx)}
                  className={`p-7 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[260px] ${activeProcessStep === idx
                      ? "bg-white/[0.08] border-[#00c9ff]/60 shadow-[0_0_30px_rgba(0,201,255,0.12)]"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                >
                  <div>
                    <span className="text-xs font-mono text-[#00c9ff] tracking-widest block mb-6">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-medium text-white mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                      {step.text}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40">
                    <span>PHASE {step.number}</span>
                    <span className="text-[#00c9ff]">0{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================= 05 TECHNOLOGY STACK ========================= */}
        <section className="relative w-full py-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10 bg-black/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>05</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>TECHNOLOGY</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-[1.08] font-serif">
                Built With Modern <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73bbff] via-white to-white italic font-normal">
                  Reliable Tools
                </span>
              </h2>
              <p className="text-base text-white/70 font-light leading-relaxed">
                We select the right tool for the job — balancing performance, maintainability, ecosystem longevity and developer ergonomics.
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-wrap gap-3">
              {TECHNOLOGIES.map((tech) => (
                <div
                  key={tech}
                  className="px-5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm font-mono text-white/80 hover:text-white hover:border-[#00c9ff]/50 hover:bg-white/[0.06] transition-all"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================= 06 THE RESULT / PRINCIPLES ========================= */}
        <section className="relative w-full py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10">
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>06</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>THE RESULT</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-serif">
                Engineering With <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic">
                  Measurable Impact
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {PRINCIPLES.map((principle) => (
                <div
                  key={principle.number}
                  className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest mb-10">
                    {principle.number}
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-3 tracking-tight font-serif">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-light">
                    {principle.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================= 07 FINAL CALL TO ACTION ========================= */}
        <section className="relative w-full py-32 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10 overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-2 text-xs font-mono text-[#00c9ff] tracking-widest uppercase">
              07 / BUILD
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.04] font-serif">
                Have A Product <br />
                <em className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white font-normal not-italic">
                  Worth Engineering?
                </em>
              </h2>
              <p className="text-base sm:text-lg text-white/70 font-light max-w-xl">
                Tell us what you are building, improving or scaling. Our engineering team will help turn your architectural vision into production reality.
              </p>
            </div>

            <div className="lg:col-span-3 flex lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,201,255,0.45)] hover:scale-[1.03]"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
