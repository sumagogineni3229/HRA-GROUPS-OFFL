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
  Compass,
  ShieldCheck,
  Workflow,
  Layers,
  CheckCircle2,
  TrendingUp,
  Cpu,
  BarChart3,
  Network,
  Zap,
} from "lucide-react";

// Authentic data from https://hragroupswebsite-psi.vercel.app/services/it-consultancy
const WHAT_WE_ADVISE = [
  {
    number: "01",
    title: "Technology Strategy",
    text: "Turn business priorities into a practical technology roadmap with clear decisions, priorities and next steps.",
    tags: ["Roadmaps", "Architecture", "Planning"],
    icon: Compass,
  },
  {
    number: "02",
    title: "Digital Transformation",
    text: "Modernise outdated processes and connect technology, people and operations into a more effective digital system.",
    tags: ["Modernisation", "Process", "Digital"],
    icon: Workflow,
  },
  {
    number: "03",
    title: "IT Architecture",
    text: "Design technology foundations that are secure, maintainable and ready to support the next stage of growth.",
    tags: ["Systems", "Cloud", "Infrastructure"],
    icon: Layers,
  },
  {
    number: "04",
    title: "Technology Optimisation",
    text: "Identify friction, remove unnecessary complexity and make existing technology work harder for the business.",
    tags: ["Audit", "Optimisation", "Efficiency"],
    icon: TrendingUp,
  },
];

const OUR_FOCUS = [
  "Technology assessment",
  "Digital strategy",
  "IT roadmap planning",
  "System architecture",
  "Cloud direction",
  "Process improvement",
  "Technology selection",
  "Implementation planning",
];

const JOURNEY_STEPS = [
  {
    number: "01",
    title: "Listen",
    text: "We understand the business, current systems, people and the problems that actually need solving.",
  },
  {
    number: "02",
    title: "Diagnose",
    text: "We map the current technology landscape and identify the gaps, risks and opportunities.",
  },
  {
    number: "03",
    title: "Direct",
    text: "We create a focused technology direction with practical priorities rather than unnecessary complexity.",
  },
  {
    number: "04",
    title: "Enable",
    text: "We help your team move from strategy into implementation with clarity and confidence.",
  },
];

const PRINCIPLES = [
  {
    number: "01",
    title: "Business first",
    text: "Technology decisions should support a business objective, not exist simply because the technology is available.",
  },
  {
    number: "02",
    title: "Clarity over complexity",
    text: "We simplify technical decisions so leadership teams can understand what matters and what comes next.",
  },
  {
    number: "03",
    title: "Built for change",
    text: "A good technology strategy should remain useful as customers, teams and markets evolve.",
  },
];

const DELIVERABLES = [
  "Current-state assessment",
  "Technology recommendations",
  "Digital transformation roadmap",
  "Architecture direction",
  "Priority framework",
  "Implementation plan",
];

export default function ITConsultancyPage() {
  const [activeAdvisoryTab, setActiveAdvisoryTab] = useState(0);
  const [activeJourneyStep, setActiveJourneyStep] = useState(0);

  useEffect(() => {
    const advInterval = setInterval(() => {
      setActiveAdvisoryTab((prev) => (prev + 1) % WHAT_WE_ADVISE.length);
    }, 4500);
    const jrnInterval = setInterval(() => {
      setActiveJourneyStep((prev) => (prev + 1) % JOURNEY_STEPS.length);
    }, 4000);
    return () => {
      clearInterval(advInterval);
      clearInterval(jrnInterval);
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
                  02 / IT CONSULTANCY &amp; STRATEGY
                </span>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-light text-white tracking-[-0.035em] leading-[1.05] font-serif">
                Technology Strategy <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic font-normal">
                  That Drives Progress
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl font-light">
                We help ambitious organisations make smart technology decisions, modernise architecture, and turn digital roadmaps into measurable business advantage.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,201,255,0.4)] hover:scale-[1.02]"
                >
                  <span>Talk to an IT Advisor</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a
                  href="#advisory"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white/5 border border-white/15 text-white/90 text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <span>Explore advisory services</span>
                  <ChevronDown className="w-4 h-4 text-[#00c9ff]" />
                </a>
              </div>

              {/* Meta Stats Row */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">01</div>
                  <div className="text-sm font-medium text-white/90 mt-1">ALIGNMENT</div>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">02</div>
                  <div className="text-sm font-medium text-white/90 mt-1">MODERNISATION</div>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">03</div>
                  <div className="text-sm font-medium text-white/90 mt-1">EXECUTION</div>
                </div>
              </div>
            </div>

            {/* Right Interactive IT Strategy Terminal Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#08172a]/90 to-[#030b16]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 group">
                {/* HUD Header Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-white/60 ml-2 text-[11px]">hra.advisory / roadmap</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#00c9ff] text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-[#00c9ff] animate-ping" />
                    STRATEGIC
                  </div>
                </div>

                {/* Strategy Visualizer Layer */}
                <div className="p-6 rounded-xl bg-black/60 border border-white/10 space-y-5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/50 tracking-wider">
                    <span>ENTERPRISE ROADMAP</span>
                    <span className="text-[#00c9ff]">2026 — 2028</span>
                  </div>

                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-white/80">
                      <span className="text-[#00c9ff]">01 / AS-IS AUDIT</span>
                      <span className="text-white/40">Gaps · Risks · Debt</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-[#00c9ff] rounded-full" />
                    </div>

                    <div className="flex items-center justify-between text-white/80 pt-2">
                      <span className="text-[#73bbff]">02 / TARGET ARCHITECTURE</span>
                      <span className="text-white/40">Cloud · APIs · Data</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-[#73bbff] rounded-full" />
                    </div>

                    <div className="flex items-center justify-between text-white/80 pt-2">
                      <span className="text-emerald-400">03 / EXECUTION ROADMAP</span>
                      <span className="text-white/40">Phased Rollout · ROI</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[92%] h-full bg-emerald-400 rounded-full" />
                    </div>
                  </div>

                  {/* 3 Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                    <div className="p-2.5 rounded bg-white/[0.03] border border-white/5">
                      <span className="text-white/40 block text-[9px]">CLARITY</span>
                      <strong className="text-white/80 font-normal">HIGH</strong>
                    </div>
                    <div className="p-2.5 rounded bg-[#00c9ff]/10 border border-[#00c9ff]/30 text-[#00c9ff]">
                      <span className="text-[#00c9ff]/60 block text-[9px]">EFFICIENCY</span>
                      <strong className="font-semibold">+40%</strong>
                    </div>
                    <div className="p-2.5 rounded bg-white/[0.03] border border-white/5">
                      <span className="text-white/40 block text-[9px]">GOVERNANCE</span>
                      <strong className="text-white/80 font-normal">SECURE</strong>
                    </div>
                  </div>
                </div>

                {/* HUD Footer */}
                <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-white/40">
                  <span>DISCOVERY / ARCHITECTURE / ADVISORY</span>
                  <span className="text-[#00c9ff]">HRA STRATEGY</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================= 02 WHAT WE ADVISE ========================= */}
        <section id="advisory" className="relative w-full py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10">
          <div className="space-y-14">
            {/* Header */}
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>02</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>WHAT WE ADVISE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08] font-serif">
                Practical direction. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic font-normal">
                  Measurable impact.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
                We bridge the gap between business objectives and engineering reality, giving executive teams confidence in their technology investments.
              </p>
            </div>

            {/* Interactive Solution Selector Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Solution Buttons (Left) */}
              <div className="lg:col-span-5 space-y-3.5 flex flex-col justify-between">
                {WHAT_WE_ADVISE.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activeAdvisoryTab === idx;
                  return (
                    <button
                      key={item.number}
                      type="button"
                      onClick={() => setActiveAdvisoryTab(idx)}
                      className={`w-full p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer ${
                        isActive
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
                      ADVISORY SERVICE / {WHAT_WE_ADVISE[activeAdvisoryTab].number}
                    </span>
                    <span className="text-5xl sm:text-6xl font-mono text-white/5 font-bold">
                      {WHAT_WE_ADVISE[activeAdvisoryTab].number}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-light text-white font-serif tracking-tight">
                    {WHAT_WE_ADVISE[activeAdvisoryTab].title}
                  </h3>

                  <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl">
                    {WHAT_WE_ADVISE[activeAdvisoryTab].text}
                  </p>

                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {WHAT_WE_ADVISE[activeAdvisoryTab].tags.map((tag) => (
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
                  {WHAT_WE_ADVISE.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveAdvisoryTab(i)}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        activeAdvisoryTab === i ? "bg-[#00c9ff]" : "bg-white/15 hover:bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================= 03 OUR FOCUS ========================= */}
        <section className="relative w-full py-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>03</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>OUR FOCUS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08] font-serif">
                Clarity across <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73bbff] via-white to-white italic font-normal">
                  every dimension.
                </span>
              </h2>
              <p className="text-base text-white/70 font-light leading-relaxed max-w-md">
                We assist leadership across key strategic pillars, providing clarity on infrastructure investments, software architecture, and modern delivery models.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OUR_FOCUS.map((focus, idx) => (
                <div
                  key={focus}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/40 hover:bg-white/[0.05] transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-[#00c9ff] tracking-wider">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <strong className="text-sm sm:text-base font-normal text-white/90 group-hover:text-white transition-colors">
                      {focus}
                    </strong>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#00c9ff] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================= 04 OUR APPROACH (PROCESS) ========================= */}
        <section className="relative w-full py-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase mb-4">
                  <span>04</span>
                  <span className="w-8 h-px bg-[#00c9ff]/40" />
                  <span>OUR APPROACH</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-serif">
                  A proven four-stage <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic">
                    advisory framework.
                  </span>
                </h2>
              </div>
              <p className="text-sm sm:text-base text-white/60 max-w-md font-light">
                We work alongside your teams to analyze, simplify and steer complex technical challenges into executable milestones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
              {JOURNEY_STEPS.map((step, idx) => (
                <div
                  key={step.number}
                  onClick={() => setActiveJourneyStep(idx)}
                  className={`p-7 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[260px] ${
                    activeJourneyStep === idx
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
                    <span>STAGE {step.number}</span>
                    <span className="text-[#00c9ff]">0{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================= 05 HOW WE THINK (PRINCIPLES) ========================= */}
        <section className="relative w-full py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10">
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>05</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>HOW WE THINK</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-serif">
                Technology choices <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic">
                  rooted in business value.
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

        {/* ========================= 06 WHAT YOU GET (DELIVERABLES) ========================= */}
        <section className="relative w-full py-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10 bg-black/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>06</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>WHAT YOU GET</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-[1.08] font-serif">
                Tangible artefacts. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73bbff] via-white to-white italic font-normal">
                  Actionable plans.
                </span>
              </h2>
              <p className="text-base text-white/70 font-light leading-relaxed">
                We deliver concrete documents, architectural blueprints, and step-by-step guides that give your internal team clarity on execution.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DELIVERABLES.map((del, idx) => (
                <div
                  key={del}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-4"
                >
                  <span className="text-xs font-mono text-[#00c9ff] tracking-wider">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <strong className="text-sm sm:text-base font-normal text-white/90">
                    {del}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================= 07 FINAL CALL TO ACTION ========================= */}
        <section className="relative w-full py-32 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10 overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-2 text-xs font-mono text-[#00c9ff] tracking-widest uppercase">
              07 / ADVISORY
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.04] font-serif">
                Ready to clarify your <br />
                <em className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white font-normal not-italic">
                  technology roadmap?
                </em>
              </h2>
              <p className="text-base sm:text-lg text-white/70 font-light max-w-xl">
                Schedule a confidential advisory session with HRA Groups to evaluate your current architecture, eliminate risks, and accelerate your digital goals.
              </p>
            </div>

            <div className="lg:col-span-3 flex lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,201,255,0.45)] hover:scale-[1.03]"
              >
                <span>Schedule Consultation</span>
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
