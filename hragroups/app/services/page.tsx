"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import BigPolygonBackground from "@/components/BigPolygonBackground";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  GraduationCap,
  Award,
  Newspaper,
  Code2,
  Compass,
  BrainCircuit,
  Palette,
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      number: "01",
      title: "Software Development",
      desc: "Custom web applications, scalable business platforms, APIs, and enterprise cloud architecture.",
      href: "/services/software-development",
      icon: Code2,
      badge: "ENGINEERING",
    },
    {
      number: "02",
      title: "IT Consultancy",
      desc: "Strategic technical roadmapping, cloud modernization, security audits, and ROI-driven advice.",
      href: "/services/it-consultancy",
      icon: Compass,
      badge: "CONSULTING",
    },
    {
      number: "03",
      title: "AI Solutions",
      desc: "Practical generative AI, LLM applications, intelligent process automation, and predictive modeling.",
      href: "/services/ai-solutions",
      icon: BrainCircuit,
      badge: "AI & ML",
    },
    {
      number: "04",
      title: "Digital Experience",
      desc: "Human-centered UI/UX design, motion systems, design architecture, and high-performance frontend.",
      href: "/services/digital-experiences",
      icon: Palette,
      badge: "DESIGN",
    },
    {
      number: "05",
      title: "Blog & Insights",
      desc: "Stay updated with industry trends, enterprise engineering best practices, and career advice.",
      href: "/services/blog",
      icon: Newspaper,
      badge: "PUBLICATIONS",
    },
    {
      number: "06",
      title: "Training & Courses",
      desc: "Industry-aligned IT training and courses covering Full-Stack, Cloud, AI, and DevOps.",
      href: "/services/courses",
      icon: BookOpen,
      badge: "EDUCATION",
    },
    {
      number: "07",
      title: "HRA Exam Portal",
      desc: "Comprehensive online assessment platform for evaluating skills and readiness.",
      href: "/services/exam-portal",
      icon: GraduationCap,
      badge: "ASSESSMENT",
    },
    {
      number: "08",
      title: "Certificate Portal",
      desc: "Verify and download your official HRA Groups certifications and credentials.",
      href: "/services/certificate-portal",
      icon: Award,
      badge: "CREDENTIALS",
    },
  ];

  return (
    <div className="ibase-landing-bg text-white min-h-screen selection:bg-[#00c9ff]/30 selection:text-[#00c9ff] relative overflow-hidden font-sans">
      <Navbar />

      {/* Global Background Atmospheric Layer matching Work Page */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        <BigPolygonBackground opacityClass="opacity-80" />
        <div className="absolute top-[15%] -left-[10%] w-[650px] h-[650px] bg-[#00c9ff]/[0.035] rounded-full blur-[200px]" />
        <div className="absolute top-[55%] -right-[15%] w-[750px] h-[750px] bg-[#1e1cb0]/[0.045] rounded-full blur-[220px]" />
      </div>

      <main className="relative z-20">
        {/* ===================== HERO SECTION ===================== */}
        <section className="relative w-full pt-44 pb-20 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto overflow-hidden text-center">
          <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto space-y-8">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c9ff] animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-white/80">
                SOLUTIONS &amp; OFFERINGS
              </span>
            </div>

            {/* Display Headline matching Work Page */}
            <div className="flex items-center justify-center w-full px-2">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-light text-white tracking-[-0.03em] leading-[1.08] text-center font-serif">
                <span className="text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.2)]">
                  Our Services
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              From technical upskilling and certification portals to cutting-edge enterprise consulting.
            </p>

            {/* Step Pillars matching Work page */}
            <div className="pt-10 border-t border-white/10 w-full flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-xs font-mono tracking-widest uppercase text-white/50">
              <div className="flex items-center gap-2">
                <span className="text-[#00c9ff] font-bold">01</span>
                <span>CONSULT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#00c9ff] font-bold">02</span>
                <span>BUILD</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#00c9ff] font-bold">03</span>
                <span>VERIFY</span>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <span>HRA / SERVICES</span>
                <span className="text-[#00c9ff] font-bold">2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== SERVICES SHOWCASE GRID ===================== */}
        <section className="relative py-20 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto ibase-section-divider">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 relative z-10">
            <div>
              <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase mb-3">
                02 / SERVICE DIRECTORY
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight font-serif">
                What We<br />
                <em className="font-serif italic text-[#00c9ff]">Offer</em>
              </h2>
            </div>
            <div className="text-xs font-mono text-white/40 pb-2">
              <span className="text-[#00c9ff] font-bold text-sm">08</span> SERVICES AVAILABLE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 relative z-10">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="group rounded-3xl bg-[#080b14]/90 border border-white/10 hover:border-[#00c9ff]/50 p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,201,255,0.12)] cursor-pointer"
                >
                  <div>
                    {/* Top Tag & Number HUD */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#00c9ff]">
                        <span className="font-bold">{item.number}</span>
                        <span>·</span>
                        <span className="text-white/50">{item.badge}</span>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00c9ff] group-hover:bg-[#00c9ff] group-hover:text-black group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-light text-white font-serif mb-4 group-hover:text-[#00c9ff] transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-white/60 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-white/70 group-hover:text-[#00c9ff] transition-colors">
                    <span className="tracking-wider uppercase font-mono text-[11px]">
                      Explore Offering
                    </span>
                    <span className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 group-hover:border-[#00c9ff] group-hover:text-[#00c9ff] group-hover:scale-110 transition-all">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ===================== CTA BAND ===================== */}
        <section className="relative py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto text-center ibase-section-divider">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00c9ff]">
              START A CONVERSATION
            </span>
            <h2 className="text-4xl sm:text-6xl font-light text-white font-serif leading-tight">
              Have A Project In Mind?<br />
              <em className="italic text-[#00c9ff]">Let's Build It Together</em>
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xl mx-auto">
              From enterprise software engineering and AI solutions to training and assessment certifications.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="ibase-btn-primary">
                Let's Connect
              </Link>
              <Link href="/work" className="ibase-btn-ghost">
                View Our Work
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

