"use client";

import React, { useState } from "react";
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
  Globe,
  Layers,
  Layout,
  Smartphone,
  CheckCircle2,
  Code2,
  Workflow,
  Compass,
  Palette,
  Eye,
  Zap,
} from "lucide-react";

// Authentic content from https://hragroupswebsite-psi.vercel.app/services/digital-experiences
const WHAT_WE_BUILD = [
  {
    number: "01",
    title: "Websites & Platforms",
    subtitle: "High-quality digital platforms designed around your business, your audience and the way your organisation actually works.",
    tags: ["Corporate", "Marketing", "Platforms"],
    icon: Globe,
  },
  {
    number: "02",
    title: "Product Experiences",
    subtitle: "Digital products that turn complicated workflows into simple, useful and intuitive experiences.",
    tags: ["Web Apps", "Products", "SaaS"],
    icon: Layout,
  },
  {
    number: "03",
    title: "Experience Design",
    subtitle: "Thoughtful interaction, information architecture and visual systems that make technology easier to understand.",
    tags: ["UI / UX", "Research", "Systems"],
    icon: Palette,
  },
  {
    number: "04",
    title: "Digital Transformation",
    subtitle: "We modernise existing digital journeys and connect the systems behind them so businesses can operate with greater clarity.",
    tags: ["Modernisation", "Integration", "Automation"],
    icon: Workflow,
  },
];

const APPROACH_STEPS = [
  {
    number: "01",
    tag: "UNDERSTAND",
    title: "Find the signal.",
    description:
      "We start by understanding the business, the audience and the problem before deciding what needs to be built.",
  },
  {
    number: "02",
    tag: "STRUCTURE",
    title: "Shape the experience.",
    description:
      "Content, journeys, information and interactions are organised into a system that makes sense.",
  },
  {
    number: "03",
    tag: "DESIGN",
    title: "Give it character.",
    description:
      "We create a visual language that feels distinctive, consistent and appropriate for the brand.",
  },
  {
    number: "04",
    tag: "ENGINEER",
    title: "Make it real.",
    description:
      "Design becomes a responsive, performant digital product built with scalable technology.",
  },
];

const SYSTEM_LAYERS = [
  { name: "Strategy", role: "Purpose & Direction" },
  { name: "Experience", role: "Flow & Interaction" },
  { name: "Technology", role: "Performance & Scale" },
  { name: "Intelligence", role: "Data & Automation" },
];

const DESIGN_PRINCIPLES = [
  {
    number: "01",
    title: "Clarity",
    description: "Remove unnecessary complexity. Make the next action obvious.",
  },
  {
    number: "02",
    title: "Character",
    description: "Create a distinctive experience without sacrificing usability.",
  },
  {
    number: "03",
    title: "Performance",
    description: "Beautiful experiences should also be fast, responsive and reliable.",
  },
  {
    number: "04",
    title: "Purpose",
    description: "Every interaction should have a reason to exist.",
  },
];

export default function DigitalExperiencesPage() {
  const [activeStep, setActiveStep] = useState(0);

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
                  04 / DIGITAL EXPERIENCES
                </span>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-light text-white tracking-[-0.035em] leading-[1.05] font-serif">
                Digital experiences <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic font-normal">
                  with purpose.
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl font-light">
                We design and engineer digital experiences that feel clear, intelligent and effortless — from websites and products to platforms built around the people who use them.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,201,255,0.4)] hover:scale-[1.02]"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/work"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white/5 border border-white/15 text-white/90 text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <span>Explore Our Work</span>
                  <ArrowUpRight className="w-4 h-4 text-[#00c9ff]" />
                </Link>
              </div>

              {/* Meta Stats Row */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">01</div>
                  <div className="text-sm font-medium text-white/90 mt-1">STRATEGY</div>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">02</div>
                  <div className="text-sm font-medium text-white/90 mt-1">DESIGN</div>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">03</div>
                  <div className="text-sm font-medium text-white/90 mt-1">ENGINEERING</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Digital System Terminal Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#08172a]/90 to-[#030b16]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6 group">
                {/* HUD Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-white/60 ml-2 text-[11px]">hra.digital</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#00c9ff] text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-[#00c9ff] animate-ping" />
                    LIVE
                  </div>
                </div>

                {/* Central Visual System Canvas */}
                <div className="p-6 rounded-xl bg-black/60 border border-white/10 space-y-5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/50 tracking-wider">
                    <span>HRA / DIGITAL</span>
                    <span className="text-[#00c9ff]">01 — 04</span>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 space-y-3">
                    <span className="text-[10px] font-mono tracking-widest text-[#00c9ff] uppercase block">
                      DIGITAL SYSTEMS
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-light text-white font-serif">
                      Built for <em className="text-[#00c9ff] not-italic">people.</em>
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed font-light">
                      Strategy, design and technology working as one unified medium.
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-[10px] font-mono text-white/80 hover:text-[#00c9ff] transition-colors">
                        DISCOVER ↗
                      </span>
                    </div>
                  </div>

                  {/* 3 Interactive Pillars Row */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center text-[10px] font-mono">
                    <div className="p-2.5 rounded bg-white/[0.03] border border-white/5">
                      <strong className="text-white/80 font-normal">STRATEGY</strong>
                    </div>
                    <div className="p-2.5 rounded bg-[#00c9ff]/10 border border-[#00c9ff]/30 text-[#00c9ff]">
                      <strong className="font-semibold">DESIGN</strong>
                    </div>
                    <div className="p-2.5 rounded bg-white/[0.03] border border-white/5">
                      <strong className="text-white/80 font-normal">ENGINEERING</strong>
                    </div>
                  </div>
                </div>

                {/* HUD Footer */}
                <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-white/40">
                  <span>EXPERIENCE / SYSTEM / MOTION</span>
                  <span className="text-[#00c9ff]">HRA STUDIO</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================= 02 WHAT WE BUILD ========================= */}
        <section className="relative w-full py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10">
          <div className="space-y-14">
            {/* Header */}
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>02</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>WHAT WE BUILD</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08] font-serif">
                Interfaces are only <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic font-normal">
                  the beginning.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
                A strong digital experience is more than how something looks. It is how naturally a person understands it, uses it and moves through it.
              </p>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {WHAT_WE_BUILD.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.number}
                    className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between min-h-[300px] group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00c9ff]/[0.03] rounded-full blur-2xl group-hover:bg-[#00c9ff]/[0.08] transition-all duration-500" />
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#00c9ff] tracking-widest">
                          {item.number}
                        </span>
                        <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-[#00c9ff] group-hover:border-[#00c9ff]/40 transition-all">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-light text-white font-serif tracking-tight group-hover:text-[#73bbff] transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-sm text-white/60 font-light leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-white/5 text-[11px] font-mono text-white/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#00c9ff] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================= 03 OUR APPROACH ========================= */}
        <section className="relative w-full py-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase mb-4">
                  <span>03</span>
                  <span className="w-8 h-px bg-[#00c9ff]/40" />
                  <span>OUR APPROACH</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-serif">
                  Simple on the surface. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic">
                    Intelligent underneath.
                  </span>
                </h2>
              </div>
              <p className="text-sm sm:text-base text-white/60 max-w-md font-light">
                A structured four-part method designed to turn complex technology into intuitive human experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
              {APPROACH_STEPS.map((step, idx) => (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-7 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[280px] ${
                    activeStep === idx
                      ? "bg-white/[0.08] border-[#00c9ff]/60 shadow-[0_0_30px_rgba(0,201,255,0.12)]"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#00c9ff] tracking-widest">
                        {step.number}
                      </span>
                      <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                        {step.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-medium text-white tracking-tight font-serif">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40">
                    <span>STEP {step.number}</span>
                    <span className="text-[#00c9ff]">PHASE 0{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================= 04 DIGITAL SYSTEM LAYER ========================= */}
        <section className="relative w-full py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>04</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>DIGITAL SYSTEM</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08] font-serif">
                One experience. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73bbff] via-white to-white italic font-normal">
                  Every layer connected.
                </span>
              </h2>
              <p className="text-base text-white/70 font-light leading-relaxed max-w-md">
                We think beyond individual screens. A digital experience becomes powerful when strategy, content, design, technology and data work together.
              </p>
            </div>

            {/* Right Interactive Layer Architecture */}
            <div className="lg:col-span-7 space-y-3">
              {SYSTEM_LAYERS.map((layer, idx) => (
                <div
                  key={layer.name}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/50 hover:bg-white/[0.05] transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-5">
                    <span className="text-xs font-mono text-[#00c9ff] tracking-widest">
                      0{idx + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium text-white group-hover:text-[#73bbff] transition-colors">
                      {layer.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-white/50 tracking-wider">
                    {layer.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================= 05 DESIGN PRINCIPLES ========================= */}
        <section className="relative w-full py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10 bg-black/40">
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>05</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>DESIGN PRINCIPLES</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-serif">
                Digital should feel <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic">
                  effortless.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              {DESIGN_PRINCIPLES.map((principle) => (
                <div
                  key={principle.number}
                  className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest mb-8">
                    {principle.number}
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-3 tracking-tight font-serif">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-light">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================= 06 FINAL CALL TO ACTION ========================= */}
        <section className="relative w-full py-32 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10 overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-2 text-xs font-mono text-[#00c9ff] tracking-widest uppercase">
              06 / LET&apos;S BUILD
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.04] font-serif">
                Make your next <br />
                <em className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white font-normal not-italic">
                  digital experience matter.
                </em>
              </h2>
              <p className="text-base sm:text-lg text-white/70 font-light max-w-xl">
                Tell us what you are building, improving or imagining. We will help turn the idea into a digital experience people actually want to use.
              </p>
            </div>

            <div className="lg:col-span-3 flex lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,201,255,0.45)] hover:scale-[1.03]"
              >
                <span>Start a Conversation</span>
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
