"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  Code2,
  Compass,
  BrainCircuit,
  Palette,
  Newspaper,
  BookOpen,
  GraduationCap,
  Award,
  Building2,
  Users,
  Briefcase,
  Layers,
  Sparkles,
  ExternalLink,
  Shield,
  HeartPulse,
  Flame,
  Cpu,
  Factory,
  Truck,
  Globe2,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);
  const megaTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setActiveMega(menu);
  };

  const handleMouseLeave = () => {
    megaTimeoutRef.current = setTimeout(() => {
      setActiveMega(null);
    }, 150);
  };

  const toggleMobileGroup = (group: string) => {
    setMobileExpandedGroup(mobileExpandedGroup === group ? null : group);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-auto ${
          isScrolled ? "py-2 px-4 sm:px-8" : "py-3.5 px-4 sm:px-8 lg:px-16"
        } ${activeMega ? "is-mega-open" : ""}`}
      >
        <div
          className={`w-full max-w-[1600px] rounded-2xl flex items-center justify-between gap-4 transition-all duration-300 ${
            isScrolled || activeMega
              ? "bg-[#080a10]/95 backdrop-blur-xl border border-white/10 px-5 sm:px-6 py-2.5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
              : "bg-transparent border border-transparent px-4 sm:px-6 py-2"
          }`}
          onMouseLeave={handleMouseLeave}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <img
              src="/logo2.png"
              alt="HRA Groups Logo"
              className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
            />
          </Link>

          {/* Desktop Nav Items (Exact IBaseIT Design & Animations with HRA Groups Pages) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Home */}
            <Link
              href="/"
              className={`text-[14px] font-medium transition-all duration-150 rounded-lg px-3.5 py-2 flex items-center gap-1.5 ${
                pathname === "/"
                  ? "text-white bg-white/10 font-semibold"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <button
              type="button"
              onMouseEnter={() => handleMouseEnter("services")}
              onClick={() => setActiveMega(activeMega === "services" ? null : "services")}
              className={`text-[14px] font-medium transition-all duration-150 rounded-lg px-3.5 py-2 flex items-center gap-1.5 cursor-pointer relative group ${
                activeMega === "services" || pathname.startsWith("/services")
                  ? "text-white bg-white/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-250 opacity-60 group-hover:opacity-100 ${
                  activeMega === "services" ? "rotate-180 text-[#00c9ff] opacity-100" : ""
                }`}
              />
              <span
                className={`absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-[#00c9ff] to-[#1e1cb0] transition-all duration-250 ${
                  activeMega === "services"
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-50 group-hover:opacity-40 group-hover:scale-x-75"
                }`}
              />
            </button>

            {/* Work */}
            <Link
              href="/work"
              className={`text-[14px] font-medium transition-all duration-150 rounded-lg px-3.5 py-2 flex items-center gap-1.5 ${
                pathname === "/work"
                  ? "text-white bg-white/10 font-semibold"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Work
            </Link>

            {/* Founder Program */}
            <Link
              href="/founder-program"
              className={`text-[14px] font-medium transition-all duration-150 rounded-lg px-3.5 py-2 flex items-center gap-1.5 whitespace-nowrap ${
                pathname === "/founder-program"
                  ? "text-white bg-white/10 font-semibold"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Founder Program
            </Link>

            {/* About Dropdown */}
            <button
              type="button"
              onMouseEnter={() => handleMouseEnter("about")}
              onClick={() => setActiveMega(activeMega === "about" ? null : "about")}
              className={`text-[14px] font-medium transition-all duration-150 rounded-lg px-3.5 py-2 flex items-center gap-1.5 cursor-pointer relative group ${
                activeMega === "about" || pathname.startsWith("/about")
                  ? "text-white bg-white/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>About</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-250 opacity-60 group-hover:opacity-100 ${
                  activeMega === "about" ? "rotate-180 text-[#00c9ff] opacity-100" : ""
                }`}
              />
              <span
                className={`absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-[#00c9ff] to-[#1e1cb0] transition-all duration-250 ${
                  activeMega === "about"
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-50 group-hover:opacity-40 group-hover:scale-x-75"
                }`}
              />
            </button>

            {/* Internship Dropdown */}
            <button
              type="button"
              onMouseEnter={() => handleMouseEnter("internship")}
              onClick={() => setActiveMega(activeMega === "internship" ? null : "internship")}
              className={`text-[14px] font-medium transition-all duration-150 rounded-lg px-3.5 py-2 flex items-center gap-1.5 cursor-pointer relative group ${
                activeMega === "internship" || pathname.startsWith("/internship") || pathname.startsWith("/services/courses")
                  ? "text-white bg-white/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>Internship</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-250 opacity-60 group-hover:opacity-100 ${
                  activeMega === "internship" ? "rotate-180 text-[#00c9ff] opacity-100" : ""
                }`}
              />
              <span
                className={`absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-[#00c9ff] to-[#1e1cb0] transition-all duration-250 ${
                  activeMega === "internship"
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-50 group-hover:opacity-40 group-hover:scale-x-75"
                }`}
              />
            </button>

            {/* Inside HRA Dropdown */}
            <button
              type="button"
              onMouseEnter={() => handleMouseEnter("inside-hra")}
              onClick={() => setActiveMega(activeMega === "inside-hra" ? null : "inside-hra")}
              className={`text-[14px] font-medium transition-all duration-150 rounded-lg px-3.5 py-2 flex items-center gap-1.5 cursor-pointer relative group ${
                activeMega === "inside-hra" || pathname === "/gallery"
                  ? "text-white bg-white/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="whitespace-nowrap">Inside HRA</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-250 opacity-60 group-hover:opacity-100 ${
                  activeMega === "inside-hra" ? "rotate-180 text-[#00c9ff] opacity-100" : ""
                }`}
              />
              <span
                className={`absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-gradient-to-r from-[#00c9ff] to-[#1e1cb0] transition-all duration-250 ${
                  activeMega === "inside-hra"
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-50 group-hover:opacity-40 group-hover:scale-x-75"
                }`}
              />
            </button>

            {/* Careers */}
            <Link
              href="/careers"
              className={`text-[14px] font-medium transition-all duration-150 rounded-lg px-3.5 py-2 flex items-center gap-1.5 ${
                pathname === "/careers"
                  ? "text-white bg-white/10 font-semibold"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Careers
            </Link>

            {/* Our Clients */}
            <Link
              href="/clients"
              className={`text-[14px] font-medium transition-all duration-150 rounded-lg px-3.5 py-2 flex items-center gap-1.5 ${
                pathname === "/clients"
                  ? "text-white bg-white/10 font-semibold"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Our Clients
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Social / App Icons (Facebook, Instagram, LinkedIn, YouTube) - Pure Icons without Box with Exact Uniform Sizing */}
            <div className="hidden sm:flex items-center gap-3 mr-2">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/people/HRA-Groups/61576268501882/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-5 h-5 flex items-center justify-center text-[#1877F2] hover:text-[#3b8af7] hover:scale-120 transition-all duration-200"
              >
                <svg className="w-[18px] h-[18px] fill-current drop-shadow-[0_0_8px_rgba(24,119,242,0.4)]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/hra.groups"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-5 h-5 flex items-center justify-center text-[#E4405F] hover:text-[#fa5e7c] hover:scale-120 transition-all duration-200"
              >
                <svg className="w-[18px] h-[18px] fill-current drop-shadow-[0_0_8px_rgba(228,64,95,0.4)]" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/106684172/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-5 h-5 flex items-center justify-center text-[#0A66C2] hover:text-[#2d87e6] hover:scale-120 transition-all duration-200"
              >
                <svg className="w-[21px] h-[21px] fill-current drop-shadow-[0_0_8px_rgba(10,102,194,0.4)]" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@HRAGROUPS"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-5 h-5 flex items-center justify-center text-[#FF0000] hover:text-[#ff3838] hover:scale-120 transition-all duration-200"
              >
                <svg className="w-[18px] h-[18px] fill-current drop-shadow-[0_0_8px_rgba(255,0,0,0.4)]" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#06070b] bg-white hover:bg-slate-100 transition-all duration-200 shadow-[0_0_20px_rgba(0,201,255,0.2)] hover:shadow-[0_0_25px_rgba(0,201,255,0.4),0_8px_25px_rgba(30,28,176,0.3)] hover:-translate-y-0.5 group"
            >
              <span>Say Hello</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`h-0.5 w-full bg-white rounded transition-transform ${
                    mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-white rounded transition-opacity ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-white rounded transition-transform ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mega Menus Overlay */}
      <AnimatePresence>
        {activeMega && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => {
              if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
            className="fixed top-[74px] left-1/2 -translate-x-1/2 w-[calc(100vw-32px)] max-w-[1520px] z-40"
          >
            <div className="bg-[#080a10]/98 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden relative">
              {/* Cyan top gradient trace */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#00c9ff] to-transparent opacity-70" />

              {/* Mega Content: Services */}
              {activeMega === "services" && (
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-6 border-b border-white/10">
                    {/* Col 1: Engineering & Enterprise Tech */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00c9ff]">
                        <span className="w-4 h-[1px] bg-[#00c9ff]" />
                        Digital Engineering
                      </div>
                      <div className="space-y-1.5">
                        <Link
                          href="/services/software-development"
                          onClick={() => setActiveMega(null)}
                          className="block text-sm font-semibold text-white hover:text-[#00c9ff] hover:bg-white/5 px-3 py-2 rounded-lg transition-colors"
                        >
                          Software Development
                          <span className="block text-xs font-normal text-white/50 mt-0.5">
                            Custom web apps, microservices & scalable systems
                          </span>
                        </Link>
                        <Link
                          href="/services/it-consultancy"
                          onClick={() => setActiveMega(null)}
                          className="block text-sm font-semibold text-white hover:text-[#00c9ff] hover:bg-white/5 px-3 py-2 rounded-lg transition-colors"
                        >
                          IT Consultancy
                          <span className="block text-xs font-normal text-white/50 mt-0.5">
                            Cloud modernization, system audit & strategy
                          </span>
                        </Link>
                        <Link
                          href="/services/digital-experiences"
                          onClick={() => setActiveMega(null)}
                          className="block text-sm font-semibold text-white hover:text-[#00c9ff] hover:bg-white/5 px-3 py-2 rounded-lg transition-colors"
                        >
                          Digital Experience
                          <span className="block text-xs font-normal text-white/50 mt-0.5">
                            Premium human-centered UI/UX & motion systems
                          </span>
                        </Link>
                      </div>
                    </div>

                    {/* Col 2: AI Solutions & Automation */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00c9ff]">
                        <span className="w-4 h-[1px] bg-[#00c9ff]" />
                        AI & Insights
                      </div>
                      <div className="space-y-1.5">
                        <Link
                          href="/services/ai-solutions"
                          onClick={() => setActiveMega(null)}
                          className="block text-sm font-semibold text-white hover:text-[#00c9ff] hover:bg-white/5 px-3 py-2 rounded-lg transition-colors"
                        >
                          AI Solutions
                          <span className="block text-xs font-normal text-white/50 mt-0.5">
                            Generative AI, Agentic workflows & custom LLMs
                          </span>
                        </Link>
                        <Link
                          href="/services/blog"
                          onClick={() => setActiveMega(null)}
                          className="block text-sm font-semibold text-white hover:text-[#00c9ff] hover:bg-white/5 px-3 py-2 rounded-lg transition-colors"
                        >
                          Blog &amp; Insights
                          <span className="block text-xs font-normal text-white/50 mt-0.5">
                            Tech articles, enterprise updates &amp; architecture notes
                          </span>
                        </Link>
                      </div>
                    </div>

                    {/* Col 3: Examination & Certification Portals */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00c9ff]">
                        <span className="w-4 h-[1px] bg-[#00c9ff]" />
                        HRA Portals
                      </div>
                      <div className="space-y-1.5">
                        <Link
                          href="/services/exam-portal"
                          onClick={() => setActiveMega(null)}
                          className="block text-sm font-semibold text-white hover:text-[#00c9ff] hover:bg-white/5 px-3 py-2 rounded-lg transition-colors"
                        >
                          HRA Exam Portal
                          <span className="block text-xs font-normal text-white/50 mt-0.5">
                            Online candidate evaluations & timed assessments
                          </span>
                        </Link>
                        <Link
                          href="/services/certificate-portal"
                          onClick={() => setActiveMega(null)}
                          className="block text-sm font-semibold text-white hover:text-[#00c9ff] hover:bg-white/5 px-3 py-2 rounded-lg transition-colors"
                        >
                          Certificate Portal
                          <span className="block text-xs font-normal text-white/50 mt-0.5">
                            Instant verification & official credentials download
                          </span>
                        </Link>
                        <Link
                          href="/services"
                          onClick={() => setActiveMega(null)}
                          className="block text-sm font-semibold text-white hover:text-[#00c9ff] hover:bg-white/5 px-3 py-2 rounded-lg transition-colors"
                        >
                          All Services Overview
                          <span className="block text-xs font-normal text-white/50 mt-0.5">
                            Browse full portfolio of enterprise solutions
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Mega Foot */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs sm:text-sm text-white/70">
                      Need custom development or workforce solutions?
                    </p>
                    <div className="flex items-center gap-3">
                      <Link
                        href="/contact"
                        onClick={() => setActiveMega(null)}
                        className="ibase-btn-ghost text-xs py-2 px-4"
                      >
                        Schedule Consultation
                      </Link>
                      <Link
                        href="/services"
                        onClick={() => setActiveMega(null)}
                        className="ibase-btn-primary text-xs py-2 px-4"
                      >
                        Explore All Offerings
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Mega Content: About */}
              {activeMega === "about" && (
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 border-b border-white/10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00c9ff]">
                        <span className="w-4 h-[1px] bg-[#00c9ff]" />
                        Organization
                      </div>
                      <div className="space-y-2">
                        <Link
                          href="/about/company-overview"
                          onClick={() => setActiveMega(null)}
                          className="block p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/40 hover:bg-white/5 transition-all"
                        >
                          <div className="text-sm font-semibold text-white">Company Overview</div>
                          <div className="text-xs text-white/50 mt-0.5">
                            Learn about our journey, vision, mission and corporate values.
                          </div>
                        </Link>
                        <Link
                          href="/about/team"
                          onClick={() => setActiveMega(null)}
                          className="block p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/40 hover:bg-white/5 transition-all"
                        >
                          <div className="text-sm font-semibold text-white">Meet the HRA Team</div>
                          <div className="text-xs text-white/50 mt-0.5">
                            Our leadership, executives and passionate engineering team.
                          </div>
                        </Link>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-b from-[#00c9ff]/10 via-[#1e1cb0]/10 to-[#0c0e16] border border-white/15 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#00c9ff]">
                          Who We Are
                        </span>
                        <h4 className="text-lg font-bold text-white mt-2">
                          Transforming Businesses Globally
                        </h4>
                        <p className="text-xs text-white/70 mt-2 leading-relaxed">
                          We are a future-driven organization delivering premium technology solutions, workforce management, and enterprise-grade execution.
                        </p>
                      </div>
                      <Link
                        href="/about/company-overview"
                        onClick={() => setActiveMega(null)}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[#00c9ff] transition-colors mt-4"
                      >
                        <span>Learn more about HRA Groups</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <p className="text-xs sm:text-sm text-white/70">
                      Want to collaborate with our leadership team?
                    </p>
                    <div className="flex gap-3">
                      <Link href="/contact" onClick={() => setActiveMega(null)} className="ibase-btn-ghost text-xs py-2 px-4">
                        Contact Us
                      </Link>
                      <Link href="/about/team" onClick={() => setActiveMega(null)} className="ibase-btn-primary text-xs py-2 px-4">
                        View Team
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Mega Dropdown: Internship */}
              {activeMega === "internship" && (
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 border-b border-white/10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00c9ff]">
                        <span className="w-4 h-[1px] bg-[#00c9ff]" />
                        Talent & Learning Programs
                      </div>
                      <div className="space-y-2">
                        <Link
                          href="/internship"
                          onClick={() => setActiveMega(null)}
                          className="block p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/40 hover:bg-white/5 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold text-white">Internship</div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00c9ff]/10 text-[#00c9ff] border border-[#00c9ff]/20">Active</span>
                          </div>
                          <div className="text-xs text-white/50 mt-0.5">
                            Industry-grade real projects, corporate mentorship and practical software engineering.
                          </div>
                        </Link>
                        <Link
                          href="/services/courses"
                          onClick={() => setActiveMega(null)}
                          className="block p-3.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/40 hover:bg-white/5 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold text-white">Training &amp; Courses</div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">Certified</span>
                          </div>
                          <div className="text-xs text-white/50 mt-0.5">
                            Structured modules in Full-Stack, AI, Cloud, Python, and Enterprise IT Systems.
                          </div>
                        </Link>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-b from-[#00c9ff]/10 via-[#1e1cb0]/10 to-[#0c0e16] border border-white/15 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#00c9ff]">
                          Student & Professional Portals
                        </span>
                        <h4 className="text-lg font-bold text-white mt-2">
                          HRA Assessment &amp; Verification
                        </h4>
                        <div className="mt-4 space-y-2 text-xs">
                          <Link
                            href="/services/exam-portal"
                            onClick={() => setActiveMega(null)}
                            className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/10 text-white hover:text-[#00c9ff] hover:border-[#00c9ff]/40 transition-all"
                          >
                            <span>HRA Exam &amp; Assessment Portal</span>
                            <span>↗</span>
                          </Link>
                          <Link
                            href="/services/certificate-portal"
                            onClick={() => setActiveMega(null)}
                            className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/10 text-white hover:text-[#00c9ff] hover:border-[#00c9ff]/40 transition-all"
                          >
                            <span>Verify HRA Credentials &amp; Certificate</span>
                            <span>↗</span>
                          </Link>
                        </div>
                      </div>
                      <Link
                        href="/internship"
                        onClick={() => setActiveMega(null)}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[#00c9ff] transition-colors mt-4"
                      >
                        <span>Explore all Internship Programs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <p className="text-xs sm:text-sm text-white/70">
                      Ready to launch your career with practical engineering?
                    </p>
                    <div className="flex gap-3">
                      <Link href="/services/courses" onClick={() => setActiveMega(null)} className="ibase-btn-ghost text-xs py-2 px-4">
                        Browse Courses
                      </Link>
                      <Link href="/internship" onClick={() => setActiveMega(null)} className="ibase-btn-primary text-xs py-2 px-4">
                        Apply for Internship
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Mega Dropdown: Inside HRA */}
              {activeMega === "inside-hra" && (
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-6 border-b border-white/10">
                    {/* Link 1: Gallery */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00c9ff]">
                        <span className="w-4 h-[1px] bg-[#00c9ff]" />
                        Media & Culture
                      </div>
                      <Link
                        href="/gallery"
                        onClick={() => setActiveMega(null)}
                        className="block p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/40 hover:bg-white/5 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold text-white group-hover:text-[#00c9ff] transition-colors">Gallery</div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00c9ff]/10 text-[#00c9ff] border border-[#00c9ff]/20">Featured</span>
                        </div>
                        <div className="text-xs text-white/50 mt-1">
                          Photos, celebrations, media features and office life at HRA Groups.
                        </div>
                      </Link>
                    </div>

                    {/* Link 2: Events */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00c9ff]">
                        <span className="w-4 h-[1px] bg-[#00c9ff]" />
                        Summits & Gatherings
                      </div>
                      <Link
                        href="/inside-hra/events"
                        onClick={() => setActiveMega(null)}
                        className="block p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/40 hover:bg-white/5 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold text-white group-hover:text-[#00c9ff] transition-colors">Events</div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">Summits</span>
                        </div>
                        <div className="text-xs text-white/50 mt-1">
                          Industry conferences, keynotes, leadership talks and corporate meets.
                        </div>
                      </Link>
                    </div>

                    {/* Link 3: Achievements */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00c9ff]">
                        <span className="w-4 h-[1px] bg-[#00c9ff]" />
                        Awards & Milestones
                      </div>
                      <Link
                        href="/inside-hra/achievements"
                        onClick={() => setActiveMega(null)}
                        className="block p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/40 hover:bg-white/5 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold text-white group-hover:text-[#00c9ff] transition-colors">Achievements</div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00c9ff]/10 text-[#00c9ff] border border-[#00c9ff]/20">Awards</span>
                        </div>
                        <div className="text-xs text-white/50 mt-1">
                          National leadership recognitions, honors and corporate excellence milestones.
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <p className="text-xs sm:text-sm text-white/70">
                      Discover the journey, stories, and recognitions behind HRA Groups.
                    </p>
                    <div className="flex gap-3">
                      <Link href="/gallery" onClick={() => setActiveMega(null)} className="ibase-btn-primary text-xs py-2 px-4">
                        Explore Gallery
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-[#04060c]/80 backdrop-blur-sm"
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="relative w-full max-w-[360px] bg-[#080a10] border-l border-white/10 h-full flex flex-col justify-between z-10 shadow-2xl overflow-y-auto"
            >
              <div>
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/50 font-mono">
                    Navigation
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-white/5 text-white/80 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-4 space-y-2">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      pathname === "/" ? "bg-[#00c9ff]/10 text-[#00c9ff]" : "text-white hover:bg-white/5"
                    }`}
                  >
                    Home
                  </Link>

                  {/* Group: Services */}
                  <div className="border-b border-white/5 pb-2">
                    <button
                      onClick={() => toggleMobileGroup("services")}
                      className="w-full flex items-center justify-between py-2 text-sm font-semibold text-white px-3"
                    >
                      <span>Services</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          mobileExpandedGroup === "services" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileExpandedGroup === "services" && (
                      <div className="pl-5 py-2 space-y-2 text-xs text-white/70">
                        <Link
                          href="/services/software-development"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-white hover:text-[#00c9ff]"
                        >
                          Software Development
                        </Link>
                        <Link
                          href="/services/it-consultancy"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-white hover:text-[#00c9ff]"
                        >
                          IT Consultancy
                        </Link>
                        <Link
                          href="/services/ai-solutions"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-white hover:text-[#00c9ff]"
                        >
                          AI Solutions
                        </Link>
                        <Link
                          href="/services/digital-experiences"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-white hover:text-[#00c9ff]"
                        >
                          Digital Experience
                        </Link>
                        <Link
                          href="/services/blog"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-white hover:text-[#00c9ff]"
                        >
                          Blog
                        </Link>
                        <Link
                          href="/services/exam-portal"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-[#00c9ff] font-medium"
                        >
                          HRA Exam Portal
                        </Link>
                        <Link
                          href="/services/certificate-portal"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-[#00c9ff] font-medium"
                        >
                          HRA Certificate Portal
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    href="/work"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      pathname === "/work" ? "bg-[#00c9ff]/10 text-[#00c9ff]" : "text-white hover:bg-white/5"
                    }`}
                  >
                    Work
                  </Link>

                  <Link
                    href="/founder-program"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      pathname === "/founder-program"
                        ? "bg-[#00c9ff]/10 text-[#00c9ff]"
                        : "text-white hover:bg-white/5"
                    }`}
                  >
                    Founder Program
                  </Link>

                  {/* Group: About */}
                  <div className="border-b border-white/5 pb-2">
                    <button
                      onClick={() => toggleMobileGroup("about")}
                      className="w-full flex items-center justify-between py-2 text-sm font-semibold text-white px-3"
                    >
                      <span>About</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          mobileExpandedGroup === "about" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileExpandedGroup === "about" && (
                      <div className="pl-5 py-2 space-y-2 text-xs text-white/70">
                        <Link
                          href="/about/company-overview"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-white hover:text-[#00c9ff]"
                        >
                          Company Overview
                        </Link>
                        <Link
                          href="/about/team"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-white hover:text-[#00c9ff]"
                        >
                          Meet the HRA Team
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Group: Internship & Learning */}
                  <div className="border-b border-white/5 pb-2">
                    <button
                      onClick={() => toggleMobileGroup("internship")}
                      className="w-full flex items-center justify-between py-2 text-sm font-semibold text-white px-3"
                    >
                      <span>Internship</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          mobileExpandedGroup === "internship" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileExpandedGroup === "internship" && (
                      <div className="pl-5 py-2 space-y-2 text-xs text-white/70">
                        <Link
                          href="/internship"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-white hover:text-[#00c9ff]"
                        >
                          Internship
                        </Link>
                        <Link
                          href="/services/courses"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-white hover:text-[#00c9ff]"
                        >
                          Training &amp; Courses
                        </Link>
                        <Link
                          href="/services/exam-portal"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-[#00c9ff] font-medium"
                        >
                          HRA Exam Portal
                        </Link>
                        <Link
                          href="/services/certificate-portal"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-[#00c9ff] font-medium"
                        >
                          HRA Certificate Verification
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Group: Inside HRA */}
                  <div className="border-b border-white/5 pb-2">
                    <button
                      onClick={() => toggleMobileGroup("inside-hra")}
                      className="w-full flex items-center justify-between py-2 text-sm font-semibold text-white px-3"
                    >
                      <span>Inside HRA</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          mobileExpandedGroup === "inside-hra" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileExpandedGroup === "inside-hra" && (
                      <div className="pl-5 py-2 space-y-2 text-xs text-white/70">
                        <Link
                          href="/gallery"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-white hover:text-[#00c9ff]"
                        >
                          Gallery
                        </Link>
                        <Link
                          href="/inside-hra/events"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-white hover:text-[#00c9ff]"
                        >
                          Events
                        </Link>
                        <Link
                          href="/inside-hra/achievements"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 text-white hover:text-[#00c9ff]"
                        >
                          Achievements
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    href="/careers"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      pathname === "/careers" ? "bg-[#00c9ff]/10 text-[#00c9ff]" : "text-white hover:bg-white/5"
                    }`}
                  >
                    Careers
                  </Link>

                  <Link
                    href="/clients"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      pathname === "/clients" ? "bg-[#00c9ff]/10 text-[#00c9ff]" : "text-white hover:bg-white/5"
                    }`}
                  >
                    Our Clients
                  </Link>
                </div>
              </div>

              <div className="p-5 border-t border-white/10 space-y-4">
                {/* Social App Icons inside Mobile Menu - Pure Icons */}
                <div className="flex items-center justify-center gap-6 py-1">
                  <a
                    href="https://www.facebook.com/people/HRA-Groups/61576268501882/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-[#1877F2] hover:text-[#3b8af7] hover:scale-125 transition-all flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 fill-current drop-shadow-[0_0_8px_rgba(24,119,242,0.4)]" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/hra.groups"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-[#E4405F] hover:text-[#fa5e7c] hover:scale-125 transition-all flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 fill-current drop-shadow-[0_0_8px_rgba(228,64,95,0.4)]" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/106684172/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-[#0A66C2] hover:text-[#2d87e6] hover:scale-125 transition-all flex items-center justify-center"
                  >
                    <svg className="w-[23px] h-[23px] fill-current drop-shadow-[0_0_8px_rgba(10,102,194,0.4)]" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@HRAGROUPS"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="text-[#FF0000] hover:text-[#ff3838] hover:scale-125 transition-all flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 fill-current drop-shadow-[0_0_8px_rgba(255,0,0,0.4)]" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full ibase-btn-primary justify-center text-center text-xs py-3"
                >
                  Say Hello
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
