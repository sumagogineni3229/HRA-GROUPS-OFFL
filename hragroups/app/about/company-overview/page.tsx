"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BigPolygonBackground from "@/components/BigPolygonBackground";
import {
  Code,
  Users,
  TrendingUp,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Award,
  ChevronRight,
  ShieldCheck,
  Building2,
  Star,
} from "lucide-react";

export default function CompanyOverviewPage() {
  const pillars = [
    {
      id: "01",
      icon: Code,
      title: "Web & App Development",
      accentBg: "from-[#00c9ff]/10 to-blue-500/10",
      accentColor: "#00c9ff",
      desc: "Creating high-performance digital platforms, enterprise systems, modern websites, and mobile applications with scalable architecture and premium user experiences.",
      items: [
        "Custom Web Applications",
        "Mobile App Development",
        "UI / UX Experience Design",
        "Enterprise Software Solutions",
        "E-Commerce Platforms",
      ],
    },
    {
      id: "02",
      icon: Users,
      title: "IT Staffing & Recruitment",
      accentBg: "from-sky-500/10 to-[#00c9ff]/10",
      accentColor: "#00c9ff",
      desc: "Delivering workforce solutions through talent acquisition, staffing services, recruitment management, and professional hiring strategies.",
      items: [
        "Permanent Staffing",
        "Contract Hiring",
        "Campus Recruitment",
        "Talent Acquisition",
        "HR Consulting Services",
      ],
    },
    {
      id: "03",
      icon: TrendingUp,
      title: "Digital Marketing",
      accentBg: "from-indigo-500/10 to-purple-500/10",
      accentColor: "#00c9ff",
      desc: "Driving brand visibility and business growth through innovative marketing campaigns, digital branding, and audience engagement strategies.",
      items: [
        "SEO & Search Visibility",
        "Social Media Marketing",
        "Performance Campaigns",
        "Brand Development",
        "Content Strategy",
      ],
    },
    {
      id: "04",
      icon: Briefcase,
      title: "Corporate Services",
      accentBg: "from-blue-500/10 to-sky-500/10",
      accentColor: "#00c9ff",
      desc: "Helping organizations optimize operations, improve performance, and scale efficiently through strategic consulting and transformation services.",
      items: [
        "Corporate Training",
        "Business Consulting",
        "Operational Excellence",
        "Process Optimization",
        "Growth Strategies",
      ],
    },
  ];

  const stats = [
    {
      value: "250+",
      label: "Projects Completed",
      sub: "Across Web, App & Cloud",
    },
    {
      value: "150+",
      label: "Clients Served",
      sub: "Enterprise & High-Growth",
    },
    {
      value: "500+",
      label: "Talents Placed",
      sub: "Tech & Corporate Roles",
    },
    {
      value: "98%",
      label: "Client Satisfaction",
      sub: "Verified Long-term CSAT",
    },
  ];

  return (
    <div className="ibase-landing-bg text-white min-h-screen selection:bg-[#00c9ff]/30 selection:text-[#00c9ff] relative overflow-hidden font-sans">
      {/* Global Navbar */}
      <Navbar />

      {/* Global Background Layer with Big Polygons (Exact match to Work & Founder Program pages) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        <BigPolygonBackground opacityClass="opacity-75" />
        <div className="absolute top-[10%] -left-[10%] w-[650px] h-[650px] bg-[#00c9ff]/[0.035] rounded-full blur-[220px]" />
        <div className="absolute top-[50%] -right-[15%] w-[800px] h-[800px] bg-[#1e1cb0]/[0.05] rounded-full blur-[250px]" />
      </div>

      <main className="relative z-20">
        {/* HERO SECTION */}
        <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-12 lg:pb-16 overflow-hidden">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center min-h-[480px]">
              {/* Hero Left Content */}
              <div className="lg:col-span-6 xl:col-span-6 space-y-5 lg:space-y-6 z-10">
                {/* Pill Tag / Subtitle */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm font-mono tracking-[0.2em] text-[#00c9ff] uppercase">
                  <span>INNOVATE</span>
                  <span className="text-white/30">•</span>
                  <span>TRANSFORM</span>
                  <span className="text-white/30">•</span>
                  <span>GROW</span>
                </div>

                {/* Heading Layout */}
                <h1 className="text-[38px] sm:text-[50px] md:text-[58px] lg:text-[60px] xl:text-[70px] font-light tracking-[-0.035em] leading-[1.08] text-white font-serif">
                  About HRA Groups &amp;{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c9ff] via-[#73bbff] to-white italic font-normal">
                    Company Overview
                  </span>
                </h1>

                {/* Description text */}
                <p className="text-[15px] sm:text-[16px] lg:text-[17px] text-white/70 font-light leading-[1.65] max-w-[540px]">
                  We are a future-driven organization delivering premium technology solutions, workforce management,
                  branding excellence, and corporate services designed to empower businesses in the digital era. Our
                  mission is to combine innovation, strategy, and execution to build scalable business success.
                </p>

                {/* Pill Action Button */}
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-9 py-4 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-sm tracking-wide shadow-[0_0_30px_rgba(0,201,255,0.35)] hover:shadow-[0_0_45px_rgba(0,201,255,0.55)] transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <span>Talk to an Expert</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Hero Right: 3D Server, Cloud, and Laptop Architecture Graphic */}
              <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end relative">
                <div className="relative w-full max-w-[640px] lg:max-w-[740px] xl:max-w-[820px]">
                  <img
                    src="/company-overview-hero-transparent.png"
                    alt="HRA Groups 3D Digital Architecture & Systems"
                    className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_20px_60px_rgba(0,201,255,0.2)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE 4 PILLARS */}
        <section className="py-20 lg:py-24 border-t border-white/10">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            {/* Section Heading */}
            <div className="mb-14">
              <span className="text-xs font-mono tracking-widest text-[#00c9ff] uppercase block mb-3">
                CORE CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white font-serif tracking-tight">
                Strategic Pillars Built for Growth
              </h2>
            </div>

            {/* Pillars Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.id}
                    className="group relative rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/40 p-8 sm:p-10 backdrop-blur-md hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-[0_15px_40px_rgba(0,201,255,0.1)]"
                  >
                    {/* Subtle corner glow */}
                    <div
                      className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl ${pillar.accentBg} rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-opacity`}
                    />

                    {/* Large clean numeral badge in background */}
                    <span className="absolute top-6 right-8 text-5xl sm:text-6xl font-mono font-extrabold text-white/5 select-none pointer-events-none group-hover:text-[#00c9ff]/10 transition-colors">
                      {pillar.id}
                    </span>

                    <div className="relative z-10 space-y-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00c9ff] group-hover:bg-[#00c9ff] group-hover:text-black transition-all duration-300 shadow-sm">
                          <Icon className="w-6 h-6 stroke-[1.8]" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-light font-serif text-white group-hover:text-[#73bbff] transition-colors">
                          {pillar.title}
                        </h3>
                      </div>

                      <p className="text-white/70 font-light text-sm sm:text-base leading-relaxed max-w-xl">
                        {pillar.desc}
                      </p>

                      <div className="pt-2">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3">
                          Key Service Offerings
                        </h4>
                        <ul className="space-y-2.5">
                          {pillar.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-3 text-sm text-white/80 font-light"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00c9ff] shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: BUILDING PREMIUM BUSINESS SOLUTIONS */}
        <section className="py-20 border-t border-white/10">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#08172a] via-[#040e1c] to-black border border-white/15 p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden backdrop-blur-xl">
              {/* Background concentric glowing rings */}
              <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-[#00c9ff]/20 pointer-events-none" />
              <div className="absolute -top-48 -right-48 w-[800px] h-[800px] rounded-full border border-[#00c9ff]/10 pointer-events-none" />

              <div className="relative z-10 max-w-4xl space-y-6">
                <span className="text-xs font-mono tracking-widest text-[#00c9ff] uppercase block">
                  BUSINESS IMPACT &amp; SCALE
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white font-serif leading-tight">
                  Building Premium Business Solutions
                </h2>

                <p className="text-white/70 font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
                  With expertise across technology, recruitment, digital branding, and corporate transformation, we create
                  innovative ecosystems that help businesses achieve sustainable growth and long-term success. Our
                  commitment to quality, creativity, and strategic execution enables organizations to stay ahead in an
                  evolving market.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-white/10 mt-10">
                  {stats.map((stat, idx) => (
                    <div
                      key={stat.label}
                      className={`space-y-1.5 ${idx !== 0 ? "sm:border-l sm:border-white/10 sm:pl-6" : ""}`}
                    >
                      <div className="text-3xl sm:text-4xl font-light font-mono text-[#00c9ff]">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-white uppercase tracking-wider">
                        {stat.label}
                      </div>
                      <div className="text-xs text-white/50 font-light">{stat.sub}</div>
                    </div>
                  ))}
                </div>

                {/* CTA Action */}
                <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link
                    href="/contact"
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(0,201,255,0.4)] transition-all hover:scale-105"
                  >
                    Partner with HRA Groups
                  </Link>
                  <span className="text-xs text-white/50 font-mono">Accelerate your organizational roadmap today</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
