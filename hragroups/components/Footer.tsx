"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#050608] text-white pt-16 pb-12 border-t border-white/5 px-6 sm:px-12 lg:px-20 font-sans relative z-20">
      <div className="max-w-[1680px] mx-auto">
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10 items-start">
          
          {/* Col 1: Logo, Slogan & Social Icons */}
          <div className="lg:col-span-3 space-y-6">
            <Link href="/" className="inline-block group">
              <img
                src="/logo2.png"
                alt="HRA Groups Logo"
                className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
              />
            </Link>

            <p className="text-xs sm:text-sm text-white/60 max-w-sm leading-relaxed">
              Driving innovation in enterprise tech, consulting, and AI-driven solutions. We build secure, scalable platforms for a better future
            </p>

            {/* Social Icons: Facebook, Instagram, LinkedIn, YouTube */}
            <div className="flex items-center gap-2.5 pt-1">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/people/HRA-Groups/61576268501882/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-[#1877F2]/10 border border-[#1877F2]/30 flex items-center justify-center text-[#1877F2] hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_0_12px_rgba(24,119,242,0.5)] transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/hra.groups"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-[#E4405F]/10 border border-[#E4405F]/30 flex items-center justify-center text-[#E4405F] hover:text-white hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-[#E4405F] hover:shadow-[0_0_12px_rgba(228,64,95,0.5)] transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/106684172/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-[#0A66C2]/10 border border-[#0A66C2]/30 flex items-center justify-center text-[#0A66C2] hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:shadow-[0_0_12px_rgba(10,102,194,0.5)] transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@HRAGROUPS"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-[#FF0000]/10 border border-[#FF0000]/30 flex items-center justify-center text-[#FF0000] hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] hover:shadow-[0_0_12px_rgba(255,0,0,0.5)] transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links Header + 3 Sub-columns */}
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-base sm:text-lg font-medium text-white tracking-tight">Quick links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3.5 gap-x-6 text-[13px] sm:text-[14px]">
              {/* Quick links Sub-Col 1: Main & Services */}
              <div className="space-y-3">
                <Link
                  href="/"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  All Services
                </Link>
                <Link
                  href="/services/software-development"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  Software Development
                </Link>
                <Link
                  href="/services/it-consultancy"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  IT Consultancy
                </Link>
                <Link
                  href="/services/ai-solutions"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  AI Solutions
                </Link>
                <Link
                  href="/services/digital-experiences"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  Digital Experience
                </Link>
                <Link
                  href="/work"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  Our Work
                </Link>
              </div>

              {/* Quick links Sub-Col 2: About, Talent & Programs */}
              <div className="space-y-3">
                <Link
                  href="/about/company-overview"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  Company Overview
                </Link>
                <Link
                  href="/about/team"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  Our Leadership &amp; Team
                </Link>
                <Link
                  href="/internship"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  Internship Program
                </Link>
                <Link
                  href="/services/courses"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  Training Courses
                </Link>
                <Link
                  href="/founder-program"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  Founder Program
                </Link>
                <Link
                  href="/careers"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  Careers &amp; Opportunities
                </Link>
                <Link
                  href="/clients"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  Our Clients
                </Link>
              </div>

              {/* Quick links Sub-Col 3: Inside HRA & Portals */}
              <div className="space-y-3">
                <Link
                  href="/inside-hra/achievements"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  Achievements
                </Link>
                <Link
                  href="/inside-hra/events"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  Events &amp; Summits
                </Link>
                <Link
                  href="/gallery"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  Media Gallery
                </Link>
                <Link
                  href="/services/exam-portal"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  HRA Exam Portal
                </Link>
                <Link
                  href="/services/certificate-portal"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  Certificate Verification
                </Link>
                <Link
                  href="/services/blog"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  Blog &amp; Insights
                </Link>
                <Link
                  href="/contact"
                  className="block text-white/60 hover:text-white transition-colors duration-200"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>

          {/* Col 3: Contact */}
          <div className="lg:col-span-3 space-y-5">
            <h3 className="text-base sm:text-lg font-medium text-white tracking-tight">Contact</h3>
            <div className="space-y-3.5 text-[13px] sm:text-[14px] text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00c9ff] shrink-0 mt-0.5" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00c9ff] shrink-0" />
                <a
                  href="tel:+919676272283"
                  className="hover:text-white transition-colors duration-200"
                >
                  +91967 627 2283
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00c9ff] shrink-0" />
                <a
                  href="mailto:contact@hragroups.com"
                  className="hover:text-white transition-colors duration-200 text-[#00c9ff] underline underline-offset-4 decoration-[#00c9ff]/40 hover:decoration-[#00c9ff]"
                >
                  contact@hragroups.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} HRA Groups. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-200">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>

      {/* Back to top fab */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 z-40 w-10 h-10 rounded-full bg-white/10 hover:bg-[#00c9ff] border border-white/10 hover:border-[#00c9ff] text-white hover:text-[#06070b] flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4 font-bold" />
      </button>
    </footer>
  );
}

