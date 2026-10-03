"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BigPolygonBackground from "@/components/BigPolygonBackground";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Bot,
  Cpu,
  Workflow,
  BarChart3,
  Layers,
  Database,
  CheckCircle2,
  Code2,
  BrainCircuit,
  Zap,
} from "lucide-react";

// Authentic data from https://hragroupswebsite-psi.vercel.app/services/ai-solutions
const AI_SOLUTIONS = [
  {
    number: "01",
    title: "AI Business Assistants",
    text: "Intelligent assistants that help teams find information, automate repetitive work and respond faster.",
    tags: ["AI", "Automation", "Python"],
    icon: Bot,
  },
  {
    number: "02",
    title: "Intelligent Automation",
    text: "Connect repetitive business workflows with intelligent systems that reduce manual effort and improve consistency.",
    tags: ["Workflows", "APIs", "AI"],
    icon: Workflow,
  },
  {
    number: "03",
    title: "AI-Powered Products",
    text: "Build products that use artificial intelligence as part of the experience instead of treating AI as an add-on.",
    tags: ["ML", "LLMs", "Product"],
    icon: Cpu,
  },
  {
    number: "04",
    title: "Data & Intelligence",
    text: "Turn business information into useful signals, recommendations and decision-support systems.",
    tags: ["Data", "Analytics", "Insights"],
    icon: BarChart3,
  },
];

const CAPABILITIES = [
  "AI strategy",
  "AI workflow automation",
  "Generative AI solutions",
  "Business assistants",
  "LLM integrations",
  "Intelligent search",
  "Data intelligence",
  "AI product development",
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Understand",
    text: "We identify where intelligence can create a genuine business advantage instead of adding AI simply for the sake of it.",
  },
  {
    number: "02",
    title: "Design",
    text: "We define the experience, data flow and intelligence layer required to make the solution useful.",
  },
  {
    number: "03",
    title: "Build",
    text: "We connect models, software and automation into a reliable system designed around your workflow.",
  },
  {
    number: "04",
    title: "Improve",
    text: "We measure how the system performs and continuously refine it as your business and data evolve.",
  },
];

const TECH_STACK = [
  "Python",
  "OpenAI",
  "LLMs",
  "Machine Learning",
  "APIs",
  "RAG",
  "Vector Search",
  "Automation",
  "React",
  "Node.js",
  "Cloud",
  "Databases",
];

const PRINCIPLES = [
  {
    number: "01",
    title: "Useful before impressive",
    text: "The best AI solution is the one that solves a real problem and becomes part of how people work.",
  },
  {
    number: "02",
    title: "Human in the loop",
    text: "Automation should increase human capability, while important decisions remain understandable and controllable.",
  },
  {
    number: "03",
    title: "Built for reality",
    text: "We consider data quality, security, cost, reliability and adoption — not only the model.",
  },
];

const BUSINESS_IMPACTS = [
  "Less repetitive work",
  "Faster access to information",
  "Better operational visibility",
  "More intelligent workflows",
  "Improved customer experiences",
  "Scalable digital capability",
];

export default function AISolutionsPage() {
  const [activeSolution, setActiveSolution] = useState(0);
  const [activeProcess, setActiveProcess] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSolution((prev) => (prev + 1) % AI_SOLUTIONS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveProcess((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 4000);
    return () => clearInterval(timer);
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
                  01 / AI &amp; AUTOMATION
                </span>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-light text-white tracking-[-0.035em] leading-[1.05] font-serif">
                Intelligence <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic font-normal">
                  with purpose.
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl font-light">
                We build practical AI systems that help businesses automate work, understand information and make better decisions.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,201,255,0.4)] hover:scale-[1.02]"
                >
                  <span>Build with AI</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a
                  href="#solutions"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white/5 border border-white/15 text-white/90 text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <span>Explore AI solutions</span>
                  <ChevronDown className="w-4 h-4 text-[#00c9ff]" />
                </a>
              </div>

              {/* Meta Stats Row */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">01</div>
                  <div className="text-sm font-medium text-white/90 mt-1">AUTOMATION</div>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">02</div>
                  <div className="text-sm font-medium text-white/90 mt-1">INTELLIGENCE</div>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">03</div>
                  <div className="text-sm font-medium text-white/90 mt-1">DECISIONS</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Intelligence HUD Terminal */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#08172a]/90 to-[#030b16]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 group">
                {/* HUD Header Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-white/60 ml-2 text-[11px]">HRA / INTELLIGENCE SYSTEM</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#00c9ff] text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-[#00c9ff] animate-ping" />
                    ONLINE
                  </div>
                </div>

                {/* Live Animated Signal Visualizer */}
                <div className="p-5 rounded-xl bg-black/60 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/50 tracking-wider">
                    <span>INTELLIGENCE LAYER</span>
                    <span className="text-[#00c9ff]">LIVE SIGNAL</span>
                  </div>

                  <div className="flex items-center justify-between h-20 px-4 bg-white/[0.02] rounded-lg border border-white/5">
                    {/* Equalizer Wave */}
                    <div className="flex items-end gap-1.5 h-10">
                      {[60, 90, 45, 100, 75, 50, 85, 30, 95, 65, 40, 70].map((height, i) => (
                        <motion.span
                          key={i}
                          animate={{ height: ["30%", `${height}%`, "40%"] }}
                          transition={{
                            duration: 1.2 + (i % 3) * 0.3,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          }}
                          className="w-1.5 bg-gradient-to-t from-[#0070f3] to-[#00c9ff] rounded-t-sm"
                        />
                      ))}
                    </div>

                    {/* AI Core Glowing Orb */}
                    <div className="w-12 h-12 rounded-full border border-[#00c9ff]/60 bg-[#00c9ff]/10 flex items-center justify-center text-xs font-mono font-bold text-[#00c9ff] shadow-[0_0_25px_rgba(0,201,255,0.4)] animate-pulse">
                      AI
                    </div>
                  </div>

                  {/* Flow Data Analysis */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] font-mono">
                    <div className="p-2.5 rounded bg-white/[0.03] border border-white/5">
                      <span className="text-white/40 block text-[9px]">INPUT</span>
                      <strong className="text-white/80 font-normal">BUSINESS DATA</strong>
                    </div>
                    <div className="p-2.5 rounded bg-[#00c9ff]/10 border border-[#00c9ff]/30 text-[#00c9ff]">
                      <span className="text-[#00c9ff]/60 block text-[9px]">PROCESS</span>
                      <strong className="font-semibold">INTELLIGENCE</strong>
                    </div>
                    <div className="p-2.5 rounded bg-white/[0.03] border border-white/5">
                      <span className="text-white/40 block text-[9px]">OUTPUT</span>
                      <strong className="text-white/80 font-normal">ACTION</strong>
                    </div>
                  </div>
                </div>

                {/* HUD Footer */}
                <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-white/40">
                  <span>LEARN / REASON / AUTOMATE</span>
                  <span className="text-[#00c9ff]">HRA AI LAB</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================= 02 WHAT WE BUILD ========================= */}
        <section id="solutions" className="relative w-full py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10">
          <div className="space-y-14">
            {/* Heading */}
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>02</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>WHAT WE BUILD</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08] font-serif">
                AI that fits <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic font-normal">
                  the way you work.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
                We focus on practical applications of artificial intelligence — systems that can be integrated into real products, operations and customer experiences.
              </p>
            </div>

            {/* Interactive Solution Selector Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Solution Buttons (Left) */}
              <div className="lg:col-span-5 space-y-3.5 flex flex-col justify-between">
                {AI_SOLUTIONS.map((sol, idx) => {
                  const Icon = sol.icon;
                  const isActive = activeSolution === idx;
                  return (
                    <button
                      key={sol.number}
                      type="button"
                      onClick={() => setActiveSolution(idx)}
                      className={`w-full p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer ${
                        isActive
                          ? "bg-white/[0.08] border-[#00c9ff]/60 shadow-[0_0_30px_rgba(0,201,255,0.15)]"
                          : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-mono tracking-widest ${isActive ? "text-[#00c9ff]" : "text-white/40"}`}>
                          {sol.number}
                        </span>
                        <Icon className={`w-5 h-5 ${isActive ? "text-[#00c9ff]" : "text-white/60"}`} />
                        <span className={`text-base sm:text-lg font-medium ${isActive ? "text-white" : "text-white/80"}`}>
                          {sol.title}
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
                      AI SOLUTION / {AI_SOLUTIONS[activeSolution].number}
                    </span>
                    <span className="text-5xl sm:text-6xl font-mono text-white/5 font-bold">
                      {AI_SOLUTIONS[activeSolution].number}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-light text-white font-serif tracking-tight">
                    {AI_SOLUTIONS[activeSolution].title}
                  </h3>

                  <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-xl">
                    {AI_SOLUTIONS[activeSolution].text}
                  </p>

                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {AI_SOLUTIONS[activeSolution].tags.map((tag) => (
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
                  {AI_SOLUTIONS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSolution(i)}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        activeSolution === i ? "bg-[#00c9ff]" : "bg-white/15 hover:bg-white/30"
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
                From intelligence <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73bbff] via-white to-white italic font-normal">
                  to execution.
                </span>
              </h2>
              <p className="text-base text-white/70 font-light leading-relaxed max-w-md">
                AI is only valuable when it becomes part of a working system. We combine intelligence, software and automation to make that happen.
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

        {/* ========================= 04 PROCESS ========================= */}
        <section className="relative w-full py-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase mb-4">
                  <span>04</span>
                  <span className="w-8 h-px bg-[#00c9ff]/40" />
                  <span>PROCESS</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-serif">
                  How we approach <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic">
                    AI implementation.
                  </span>
                </h2>
              </div>
              <p className="text-sm sm:text-base text-white/60 max-w-md font-light">
                A deliberate progression from understanding the workflow to deploying intelligent, reliable systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
              {PROCESS_STEPS.map((step, idx) => (
                <div
                  key={step.number}
                  onClick={() => setActiveProcess(idx)}
                  className={`p-7 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[260px] ${
                    activeProcess === idx
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
                    <span>STEP {step.number}</span>
                    <span className="text-[#00c9ff]">0{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================= 05 OUR THINKING ========================= */}
        <section className="relative w-full py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10">
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>05</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>OUR THINKING</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-serif">
                Intelligence with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic">
                  responsibility.
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

        {/* ========================= 06 TECHNOLOGY ========================= */}
        <section className="relative w-full py-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10 bg-black/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>06</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>TECHNOLOGY</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-[1.08] font-serif">
                Intelligence needs <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73bbff] via-white to-white italic font-normal">
                  a strong foundation.
                </span>
              </h2>
              <p className="text-base text-white/70 font-light leading-relaxed">
                We combine AI models with software engineering, integrations and data systems to create solutions that work beyond the demo.
              </p>
            </div>

            <div className="lg:col-span-7 flex flex-wrap gap-3">
              {TECH_STACK.map((tech) => (
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

        {/* ========================= 07 BUSINESS IMPACT ========================= */}
        <section className="relative w-full py-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>07</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>BUSINESS IMPACT</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-[1.08] font-serif">
                Less repetition. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] to-[#73bbff] italic font-normal">
                  More intelligence.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BUSINESS_IMPACTS.map((impact, idx) => (
                <div
                  key={impact}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-4"
                >
                  <span className="text-xs font-mono text-[#00c9ff] tracking-wider">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <strong className="text-sm sm:text-base font-normal text-white/90">
                    {impact}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================= 08 FINAL CTA ========================= */}
        <section className="relative w-full py-32 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10 overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-2 text-xs font-mono text-[#00c9ff] tracking-widest uppercase">
              08 / COLLABORATE
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.04] font-serif">
                Have a workflow <br />
                <em className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white font-normal not-italic">
                  worth automating?
                </em>
              </h2>
              <p className="text-base sm:text-lg text-white/70 font-light max-w-xl">
                Tell us where your team spends time, where information gets stuck or where decisions could become smarter.
              </p>
            </div>

            <div className="lg:col-span-3 flex lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,201,255,0.45)] hover:scale-[1.03]"
              >
                <span>Explore an AI solution</span>
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
