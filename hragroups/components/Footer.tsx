"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-20 bg-[#002244] text-slate-100 pt-16 pb-12 border-t border-blue-500/20 backdrop-blur-2xl shadow-[0_-15px_40px_rgba(0,34,68,0.5)] overflow-hidden font-sans"
    >
      {/* Blue Glass Ambient Depth & Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.08] via-transparent to-black/30 pointer-events-none" />
      <div className="absolute -top-24 left-1/4 w-[500px] h-[250px] bg-[#0052cc]/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-[450px] h-[220px] bg-sky-400/20 rounded-full blur-[90px] pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-blue-400/20">
          
          {/* Col 1: HRA Groups Brand & Info */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block group">
              <img
                src="/logo-transparent.png"
                alt="HRA Groups Logo"
                className="h-10 sm:h-12 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm font-normal">
              Driving innovation in enterprise tech, consulting, and AI-driven solutions. We build secure, scalable platforms for a better future
            </p>
          </div>

          {/* Col 2 & 3: Quick Links */}
          <div className="lg:col-span-5 space-y-5">
            <h4 className="text-base sm:text-lg font-bold text-white tracking-wide uppercase text-sky-400">
              Quick Links
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {/* Left Column */}
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 text-xs">•</span>
                  <Link href="/" className="text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-0.5 transform inline-block">
                    Home
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 text-xs">•</span>
                  <Link href="/about" className="text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-0.5 transform inline-block">
                    About
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 text-xs">•</span>
                  <Link href="/services" className="text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-0.5 transform inline-block">
                    Services
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 text-xs">•</span>
                  <Link href="/services/blog" className="text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-0.5 transform inline-block">
                    Blog
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 text-xs">•</span>
                  <Link href="/careers" className="text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-0.5 transform inline-block">
                    Careers
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 text-xs">•</span>
                  <Link href="/clients" className="text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-0.5 transform inline-block">
                    Our Clients
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 text-xs">•</span>
                  <Link href="/gallery" className="text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-0.5 transform inline-block">
                    Gallery
                  </Link>
                </li>
              </ul>

              {/* Right Column */}
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 text-xs">•</span>
                  <Link href="/about/company-overview" className="text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-0.5 transform inline-block">
                    Company Overview
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 text-xs">•</span>
                  <Link href="/about/team" className="text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-0.5 transform inline-block">
                    Meet the HRA Team
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 text-xs">•</span>
                  <Link href="/services/courses" className="text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-0.5 transform inline-block">
                    Courses
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 text-xs">•</span>
                  <Link href="/services/exam-portal" className="text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-0.5 transform inline-block">
                    HRA Exam Portal
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 text-xs">•</span>
                  <Link href="/services/certificate-portal" className="text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-0.5 transform inline-block">
                    HRA Certificate Portal
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-sky-400 text-xs">•</span>
                  <Link href="/contact" className="text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-0.5 transform inline-block">
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 4: Contact & Socials */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-base sm:text-lg font-bold text-white tracking-wide uppercase text-sky-400">
              Contact
            </h4>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-slate-300">
                <span className="text-base mt-0.5">📍</span>
                <span className="leading-snug">Hyderabad, Telangana, India</span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <span className="text-base">📞</span>
                <a
                  href="tel:+919676272283"
                  className="hover:text-white transition-colors duration-200"
                >
                  +91 967 627 2283
                </a>
              </div>

              <div className="flex items-center gap-3 text-slate-300 pt-0.5">
                <span className="text-base">✉️</span>
                <a
                  href="mailto:contact@hragroups.com"
                  className="text-slate-300 hover:text-white transition-colors duration-200"
                >
                  contact@hragroups.com
                </a>
              </div>
            </div>

            {/* Social Icons with Website Glass Style */}
            <div className="pt-2 space-y-2.5">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Follow us on
              </span>
              <div className="flex items-center gap-3 text-white">
                {/* Facebook */}
                <a
                  href="https://facebook.com/hragroups"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0052cc] border border-white/15 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/hragroups"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0052cc] border border-white/15 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/company/hra-groups"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0052cc] border border-white/15 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/@hragroups"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0052cc] border border-white/15 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>© {new Date().getFullYear()} HRA GROUPS. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/admin/login" className="hover:text-sky-300 text-slate-400/80 transition-colors duration-200 flex items-center gap-1">
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
