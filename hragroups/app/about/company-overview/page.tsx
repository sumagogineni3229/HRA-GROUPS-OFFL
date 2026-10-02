"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      accentBg: "from-blue-500/10 to-indigo-500/10",
      accentColor: "#0052cc",
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
      accentBg: "from-sky-500/10 to-blue-500/10",
      accentColor: "#0052cc",
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
      accentColor: "#0052cc",
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
      accentColor: "#0052cc",
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
    <div className="min-h-screen bg-white text-[#172947] font-sans selection:bg-[#0052cc]/20 selection:text-[#003882]">
      {/* Global Navbar */}
      <Navbar />

      {/* HERO SECTION (Exact 1:1 Layout, Typography, and 3D Server/Laptop Image from the Reference Screenshot) */}
      <section className="relative bg-white pt-6 pb-20 lg:pt-10 lg:pb-28 overflow-hidden border-b border-slate-100">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[580px]">
            {/* Hero Left Content */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-6 lg:space-y-8 z-10">
              {/* Pill Tag / Subtitle */}
              <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold tracking-[0.2em] text-[#0052cc] uppercase">
                <span>INNOVATE</span>
                <span className="text-blue-300">•</span>
                <span>TRANSFORM</span>
                <span className="text-blue-300">•</span>
                <span>GROW</span>
              </div>

              {/* Exact 1:1 Heading Layout */}
              <h1 className="text-[38px] sm:text-[50px] md:text-[58px] lg:text-[60px] xl:text-[70px] font-extrabold tracking-[-0.03em] heading-black-blue-gradient leading-[1.08]">
                About HRA Groups &amp; Company Overview
              </h1>

              {/* Exact Description text */}
              <p className="text-[15px] sm:text-[16px] lg:text-[17px] text-[#5c6f84] font-normal leading-[1.65] max-w-[540px]">
                We are a future-driven organization delivering premium technology solutions, workforce management,
                branding excellence, and corporate services designed to empower businesses in the digital era. Our
                mission is to combine innovation, strategy, and execution to build scalable business success.
              </p>

              {/* Pill Action Button matching reference screenshot */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-9 py-3.5 rounded-full bg-white border border-blue-200/90 shadow-[0_4px_24px_rgba(0,82,204,0.14)] hover:shadow-[0_8px_32px_rgba(0,82,204,0.22)] text-[#0052cc] hover:text-[#003882] font-semibold text-[15px] transition-all duration-300 hover:scale-[1.02] group"
                >
                  <span className="text-[#0052cc] group-hover:text-[#003882]">Talk to an Expert</span>
                </Link>
              </div>
            </div>

            {/* Hero Right: 3D Server, Cloud, and Laptop Architecture Graphic */}
            <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end relative">
              <div className="relative w-full max-w-[640px] lg:max-w-[740px] xl:max-w-[820px]">
                <img
                  src="https://cdn.prod.website-files.com/685c045f09a3dab41aa0d71d/696e51ec501b766860e7df16_servicenow-hero-generic.webp"
                  alt="HRA Groups 3D Digital Architecture & Systems"
                  className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 4 PILLARS (Clean Bento Grid matching Landing Page Solutions) */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          {/* Section Heading */}
          <div className="mb-14">
            <span className="text-xs font-bold tracking-widest text-[#0052cc] uppercase block mb-3">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold heading-black-blue-gradient">
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
                  className="group relative rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle corner glow */}
                  <div
                    className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl ${pillar.accentBg} rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`}
                  />

                  {/* Large clean numeral badge in background */}
                  <span className="absolute top-6 right-8 text-5xl sm:text-6xl font-extrabold text-slate-100 select-none pointer-events-none group-hover:text-blue-50 transition-colors">
                    {pillar.id}
                  </span>

                  <div className="relative z-10 space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-[#0052cc] group-hover:text-white transition-all duration-300 shadow-sm">
                        <Icon className="w-6 h-6 stroke-[1.8]" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#172947] group-hover:text-[#0052cc] transition-colors">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                      {pillar.desc}
                    </p>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                        Key Service Offerings
                      </h4>
                      <ul className="space-y-2.5">
                        {pillar.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-3 text-sm text-slate-700 font-medium"
                          >
                            <span className="w-2 h-2 rounded-full bg-[#0052cc] shrink-0" />
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
      <section className="py-20 bg-white">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#013b9a] via-[#0047ab] to-[#002244] p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden">
            {/* Background concentric glowing rings */}
            <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-sky-400/20 pointer-events-none" />
            <div className="absolute -top-48 -right-48 w-[800px] h-[800px] rounded-full border border-sky-400/10 pointer-events-none" />

            <div className="relative z-10 max-w-4xl space-y-6">
              <span className="text-xs font-bold tracking-widest text-sky-300 uppercase block">
                BUSINESS IMPACT &amp; SCALE
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold heading-sky-blue-gradient leading-tight">
                Building Premium Business Solutions
              </h2>

              <p className="text-sky-100 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
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
                    <div className="text-3xl sm:text-4xl font-extrabold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-sky-200 uppercase tracking-wider">
                      {stat.label}
                    </div>
                    <div className="text-xs text-sky-300/80">{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* CTA Action */}
              <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 rounded-full bg-white text-[#013b9a] font-bold text-sm hover:bg-sky-50 transition-all shadow-md hover:scale-105"
                >
                  Partner with HRA Groups
                </Link>
                <span className="text-xs text-sky-200">Accelerate your organizational roadmap today</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
