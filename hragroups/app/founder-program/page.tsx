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
  Users,
  Mic,
  Video,
  FileText,
  Globe,
  TrendingUp,
  Share2,
  CheckCircle2,
  Layers,
  Compass,
} from "lucide-react";

const SESSIONS = [
  {
    number: "01",
    title: "Founder Introduction",
    description:
      "Introduce your business, journey, expertise and vision to the right audience",
    icon: Users,
  },
  {
    number: "02",
    title: "Client Interaction",
    description:
      "Engage with potential clients, partners and business stakeholders",
    icon: Compass,
  },
  {
    number: "03",
    title: "Founder Interview",
    description:
      "Share your founder journey, experiences, perspective and achievements",
    icon: Video,
  },
  {
    number: "04",
    title: "Podcast Conversation",
    description:
      "Take part in thoughtful conversations that showcase your ideas and expertise",
    icon: Mic,
  },
  {
    number: "05",
    title: "Digital Publications",
    description:
      "Strengthen your professional presence through founder stories and business features",
    icon: FileText,
  },
  {
    number: "06",
    title: "Digital Presence",
    description:
      "Build a stronger and more consistent digital identity for your personal and business brand",
    icon: Globe,
  },
  {
    number: "07",
    title: "Strategic Advisory",
    description:
      "Access meaningful conversations around positioning, direction and business growth",
    icon: TrendingUp,
  },
  {
    number: "08",
    title: "Founder Networking",
    description:
      "Connect with founders, professionals and potential collaborators",
    icon: Share2,
  },
];

const VALUE_GAINS = [
  {
    number: "01",
    title: "Visibility",
    description:
      "Present your story and work through professional digital channels",
  },
  {
    number: "02",
    title: "Credibility",
    description:
      "Establish a stronger professional identity through meaningful founder content",
  },
  {
    number: "03",
    title: "Connections",
    description:
      "Create opportunities to meet relevant people and businesses",
  },
  {
    number: "04",
    title: "Opportunities",
    description:
      "Open conversations around collaborations, partnerships and growth",
  },
];

const SUPPORT_PILLARS = [
  {
    number: "01",
    title: "Business Visibility",
    description:
      "Position your business in front of relevant professional audiences",
  },
  {
    number: "02",
    title: "Founder Story",
    description:
      "Turn your journey and experience into meaningful professional content",
  },
  {
    number: "03",
    title: "Professional Network",
    description:
      "Build relationships with founders, professionals and potential collaborators",
  },
  {
    number: "04",
    title: "Strategic Growth",
    description:
      "Create conversations that can lead to new possibilities",
  },
];

export default function FounderProgramPage() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleApplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/inquiries/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          location: data.location || "",
          company: data.company || "",
          stage: data.stage || "",
          description: `FOUNDER BRIDGE APPLICATION: Business: ${data.company || "N/A"} | Website: ${data.website || "N/A"} | Summary: ${data.summary || "N/A"}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Unable to submit application. Please try again.");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ibase-landing-bg text-white min-h-screen selection:bg-[#00c9ff]/30 selection:text-[#00c9ff] relative overflow-hidden font-sans">
      <Navbar />

      {/* Global Background Layer with Big Polygons */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        <BigPolygonBackground opacityClass="opacity-75" />
        <div className="absolute top-[10%] -left-[10%] w-[650px] h-[650px] bg-[#00c9ff]/[0.03] rounded-full blur-[220px]" />
        <div className="absolute top-[50%] -right-[15%] w-[800px] h-[800px] bg-[#1e1cb0]/[0.045] rounded-full blur-[250px]" />
      </div>

      <main className="relative z-20">
        {/* ===================== HERO SECTION ===================== */}
        <section className="relative w-full pt-44 pb-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-8">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c9ff] animate-pulse" />
                <span className="text-xs font-mono tracking-widest uppercase text-white/80">
                  HRA GROUPS / FOUNDER BRIDGE PROGRAM
                </span>
              </div>

              {/* Display Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-light text-white tracking-[-0.035em] leading-[1.05] font-serif">
                Where founders <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic font-normal">
                  connect with opportunity
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl font-light">
                A curated founder platform built around visibility, meaningful conversations, strategic connections and long-term growth
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/founder-program/apply"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,201,255,0.4)] hover:scale-[1.02]"
                >
                  <span>Apply Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a
                  href="#program"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white/5 border border-white/15 text-white/90 text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <span>Explore the program</span>
                  <ChevronDown className="w-4 h-4 text-[#00c9ff]" />
                </a>
              </div>

              {/* Meta Stats Row */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">01</div>
                  <div className="text-sm font-medium text-white/90 mt-1">VISIBILITY</div>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">02</div>
                  <div className="text-sm font-medium text-white/90 mt-1">CONNECTIONS</div>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">03</div>
                  <div className="text-sm font-medium text-white/90 mt-1">GROWTH</div>
                </div>
              </div>
            </div>

            {/* Right Visual Image (Full unboxed image display) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg lg:max-w-none">
                <img
                  src="https://hragroupswebsite-psi.vercel.app/assets/fp-D1WceEEY.png"
                  alt="HRA Groups Founder Bridge Program"
                  className="w-full h-auto object-contain max-h-[580px] filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                  onError={(e) => {
                    // Fallback to founder graphic if asset URL differs
                    (e.target as HTMLImageElement).src =
                      "https://hragroupswebsite-psi.vercel.app/assets/founder-QHSHMDvt.png";
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 01 THE PROGRAM OVERVIEW ===================== */}
        <section id="program" className="relative w-full py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>01</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>THE PROGRAM</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1] font-serif">
                More than a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73bbff] to-white italic font-normal">
                  business connection
                </span>
              </h2>
            </div>

            {/* Right Intro Description */}
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-white/70 leading-relaxed font-light">
              <p>
                Founder Bridge creates a professional environment where founders can introduce their work, tell their story, build credibility and discover relevant opportunities
              </p>
              <p className="text-white/60">
                From conversations and interviews to publications, podcasts and strategic advisory, every touchpoint is designed to strengthen your presence
              </p>
            </div>
          </div>
        </section>

        {/* ===================== 02 THE SESSIONS (THE EXPERIENCE) ===================== */}
        <section className="relative w-full py-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10 bg-black/40 backdrop-blur-md">
          <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase mb-4">
                  <span>02</span>
                  <span className="w-8 h-px bg-[#00c9ff]/40" />
                  <span>THE EXPERIENCE</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-serif">
                  Program Sessions
                </h2>
              </div>
              <p className="text-sm sm:text-base text-white/60 max-w-md font-light">
                A structured journey designed to give founders visibility, connections and meaningful opportunities
              </p>
            </div>

            {/* 8 Sessions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
              {SESSIONS.map((session) => {
                const Icon = session.icon;
                return (
                  <div
                    key={session.number}
                    className="p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00c9ff]/50 hover:bg-white/[0.06] transition-all duration-300 group flex flex-col justify-between min-h-[260px] relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#00c9ff]/[0.04] rounded-full blur-2xl group-hover:bg-[#00c9ff]/[0.1] transition-all duration-500" />
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-mono text-[#00c9ff] tracking-widest">
                          {session.number}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-[#00c9ff] group-hover:border-[#00c9ff]/40 transition-all">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="text-xl font-medium text-white mb-3 tracking-tight group-hover:text-[#73bbff] transition-colors">
                        {session.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                        {session.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40 group-hover:text-[#00c9ff] transition-colors">
                      <span>EXPLORE</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================== 03 WHAT YOU GAIN ===================== */}
        <section className="relative w-full py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>03</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>WHAT YOU GAIN</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.08] font-serif">
                Build a presence <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73bbff] via-white to-white italic font-normal">
                  that travels
                </span>
              </h2>
              <p className="text-sm sm:text-base text-white/70 max-w-md font-light leading-relaxed">
                The program is designed to create several professional touchpoints around your founder journey
              </p>
            </div>

            {/* Right Value Rows */}
            <div className="lg:col-span-7 divide-y divide-white/10 border-t border-b border-white/10">
              {VALUE_GAINS.map((gain) => (
                <div
                  key={gain.number}
                  className="py-7 grid grid-cols-1 sm:grid-cols-12 gap-4 items-baseline group"
                >
                  <span className="sm:col-span-2 text-xs font-mono text-[#00c9ff] tracking-widest">
                    {gain.number}
                  </span>
                  <h3 className="sm:col-span-4 text-lg font-medium text-white group-hover:text-[#73bbff] transition-colors">
                    {gain.title}
                  </h3>
                  <p className="sm:col-span-6 text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                    {gain.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== 04 HRA GROUPS SUPPORT / 4 PILLARS ===================== */}
        <section className="relative w-full py-24 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10 bg-gradient-to-b from-black via-black/80 to-black">
          <div className="space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>04</span>
                <span className="w-8 h-px bg-[#00c9ff]/40" />
                <span>HRA GROUPS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-serif">
                One platform. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic">
                  Multiple possibilities
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
              {SUPPORT_PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest mb-12">
                    {pillar.number}
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== 05 FINAL CALL TO ACTION ===================== */}
        <section className="relative w-full py-32 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto border-t border-white/10 overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-2 text-xs font-mono text-[#00c9ff] tracking-widest uppercase">
              05 / APPLY
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.04] font-serif">
                Bring your story <br />
                <em className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white font-normal not-italic">
                  to the right room
                </em>
              </h2>
              <p className="text-base sm:text-lg text-white/70 font-light max-w-xl">
                Start a conversation with HRA Groups and explore the Founder Bridge experience
              </p>
            </div>

            <div className="lg:col-span-3 flex lg:justify-end">
              <Link
                href="/founder-program/apply"
                className="inline-flex items-center gap-3 px-8 py-5 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,201,255,0.45)] hover:scale-[1.03]"
              >
                <span>Apply for Founder Bridge</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ===================== APPLICATION MODAL / DIALOG ===================== */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#071225] border border-white/15 p-6 sm:p-10 text-white shadow-2xl my-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowApplyModal(false);
                setSubmitted(false);
              }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all text-xl"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#00c9ff]/20 text-[#00c9ff] border border-[#00c9ff]/40 flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <div className="text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                  APPLICATION RECEIVED
                </div>
                <h3 className="text-3xl sm:text-4xl font-light font-serif">
                  Thank you for <br />
                  <em className="text-[#73bbff] not-italic">connecting with us.</em>
                </h3>
                <p className="text-sm text-white/70 max-w-md mx-auto">
                  Your Founder Bridge application has been submitted successfully. Our team will review your details and reach out.
                </p>
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div>
                {/* Modal Header */}
                <div className="space-y-3 mb-8">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00c9ff] tracking-widest uppercase">
                    <span>HRA GROUPS</span>
                    <span>/</span>
                    <span>FOUNDER BRIDGE APPLICATION</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-light font-serif">
                    Start your <em className="text-[#73bbff] not-italic">founder journey.</em>
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    Tell us about yourself, your business, and what you are looking to build.
                  </p>
                </div>

                {errorMsg && (
                  <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                    {errorMsg}
                  </div>
                )}

                {/* Application Form */}
                <form onSubmit={handleApplySubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h4 className="text-xs font-mono text-white/50 tracking-widest uppercase mb-4 flex items-center gap-2">
                      <span className="text-[#00c9ff]">01</span> PERSONAL INFORMATION
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-white/70 mb-1.5 font-mono">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00c9ff] focus:outline-none text-sm text-white placeholder-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/70 mb-1.5 font-mono">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00c9ff] focus:outline-none text-sm text-white placeholder-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/70 mb-1.5 font-mono">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00c9ff] focus:outline-none text-sm text-white placeholder-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/70 mb-1.5 font-mono">Location</label>
                        <input
                          type="text"
                          name="location"
                          placeholder="City / Country"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00c9ff] focus:outline-none text-sm text-white placeholder-white/30"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Information */}
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-xs font-mono text-white/50 tracking-widest uppercase mb-4 flex items-center gap-2">
                      <span className="text-[#00c9ff]">02</span> BUSINESS / VENTURE DETAILS
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-white/70 mb-1.5 font-mono">Business Name / Idea</label>
                        <input
                          type="text"
                          name="company"
                          placeholder="Your business or idea title"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00c9ff] focus:outline-none text-sm text-white placeholder-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/70 mb-1.5 font-mono">Current Stage</label>
                        <select
                          name="stage"
                          className="w-full px-4 py-3 rounded-xl bg-[#0a1930] border border-white/10 focus:border-[#00c9ff] focus:outline-none text-sm text-white"
                        >
                          <option value="Idea Stage">Early Idea / Concept</option>
                          <option value="Prototype / MVP">Prototype / MVP Built</option>
                          <option value="Early Revenue">Early Revenue / Active Users</option>
                          <option value="Scaling">Scaling / Established</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs text-white/70 mb-1.5 font-mono">Website / Pitch Deck URL (Optional)</label>
                        <input
                          type="url"
                          name="website"
                          placeholder="https://"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00c9ff] focus:outline-none text-sm text-white placeholder-white/30"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs text-white/70 mb-1.5 font-mono">Brief Description</label>
                        <textarea
                          name="summary"
                          rows={3}
                          placeholder="What problem are you solving? What support do you seek from Founder Bridge?"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00c9ff] focus:outline-none text-sm text-white placeholder-white/30 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex items-center justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setShowApplyModal(false)}
                      className="px-6 py-3 rounded-full text-white/60 hover:text-white text-xs font-mono tracking-wider transition-all"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,201,255,0.4)] disabled:opacity-50"
                    >
                      <span>{submitting ? "Submitting..." : "Submit Application"}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
