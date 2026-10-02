"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageSquare, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavDropdown, setActiveNavDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "py-3 px-4 sm:px-8 lg:px-12 pointer-events-none"
          : "py-5 px-6 sm:px-12 lg:px-20 bg-white"
      }`}
    >
      <div
        className={`w-full mx-auto transition-all duration-300 pointer-events-auto ${
          isScrolled
            ? "max-w-[1560px] bg-white/85 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full px-5 sm:px-7 py-2.5"
            : "max-w-[1720px] px-0 py-0 flex items-center justify-between"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/logo-transparent.png"
              alt="HRA Groups Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {/* Home */}
            <Link
              href="/"
              className="text-[15px] font-medium text-[#172947] hover:text-[#0052cc] transition-colors"
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setActiveNavDropdown("about")}
              onMouseLeave={() => setActiveNavDropdown(null)}
            >
              <button className="flex items-center gap-1 text-[15px] font-medium text-[#172947] hover:text-[#0052cc] transition-colors">
                About
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#0052cc] transition-transform group-hover:rotate-180 duration-200" />
              </button>
              <AnimatePresence>
                {activeNavDropdown === "about" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 p-2.5 grid gap-0.5 z-50"
                  >
                    {[
                      { title: "Company Overview", href: "/about/company-overview" },
                      { title: "Meet the HRA team.", href: "/about/team" },
                    ].map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setActiveNavDropdown("services")}
              onMouseLeave={() => setActiveNavDropdown(null)}
            >
              <button className="flex items-center gap-1 text-[15px] font-medium text-[#172947] hover:text-[#0052cc] transition-colors">
                Services
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#0052cc] transition-transform group-hover:rotate-180 duration-200" />
              </button>
              <AnimatePresence>
                {activeNavDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 p-2.5 grid gap-0.5 z-50"
                  >
                    {[
                      { title: "Blog", href: "/services/blog" },
                      { title: "courses", href: "/services/courses" },
                      { title: "HRA Exam Portal", href: "/services/exam-portal" },
                      { title: "HRA Cirtificate Portal.", href: "/services/certificate-portal" },
                    ].map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Internship */}
            <Link
              href="/internship"
              className="text-[15px] font-medium text-[#172947] hover:text-[#0052cc] transition-colors"
            >
              Internship
            </Link>

            {/* Careers */}
            <Link
              href="/careers"
              className="text-[15px] font-medium text-[#172947] hover:text-[#0052cc] transition-colors"
            >
              Careers
            </Link>

            {/* Our Clients */}
            <Link
              href="/clients"
              className="text-[15px] font-medium text-[#172947] hover:text-[#0052cc] transition-colors"
            >
              Our Clients
            </Link>

            {/* Galary */}
            <Link
              href="/gallery"
              className="text-[15px] font-medium text-[#172947] hover:text-[#0052cc] transition-colors"
            >
              Galary
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            {/* Navy Contact Us Pill Matching Image */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#1b2d6b] hover:bg-[#152355] text-white text-[15px] font-semibold tracking-wide transition-all shadow-[0_4px_14px_rgba(27,45,107,0.35)] hover:shadow-[0_6px_20px_rgba(27,45,107,0.45)] hover:scale-[1.02] active:scale-[0.98]"
            >
              {/* Double Chat Bubble Outline Icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[20px] h-[20px] text-white stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round shrink-0"
              >
                <path d="M12 4C7.58 4 4 7.13 4 11c0 1.63.63 3.12 1.71 4.29L4.5 19.5l4.5-1.29c.92.37 1.93.59 3 .59 4.42 0 8-3.13 8-7s-3.58-7-8-7z" strokeWidth="1.9" />
                <path d="M9.5 19.5c1.8 1.4 4.1 2 6.5 1.5l3.5 1-1-3.2c.9-1.2 1.5-2.6 1.5-4.2" strokeWidth="1.9" />
              </svg>
              <span>Contact Us</span>
            </Link>

            {/* Mobile Burger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-b border-slate-200 bg-white px-6 pt-2 pb-6 space-y-3 rounded-3xl mt-2 shadow-xl overflow-hidden pointer-events-auto"
          >
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-slate-50"
              >
                Home
              </Link>

              {/* About Mobile Group */}
              <div className="px-3 py-1">
                <div className="font-semibold text-xs tracking-wider uppercase text-slate-400 mb-1">About</div>
                <div className="pl-2 space-y-1 border-l-2 border-slate-100">
                  <Link
                    href="/about/company-overview"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-sm font-medium text-slate-700 hover:text-blue-600"
                  >
                    Company Overview
                  </Link>
                  <Link
                    href="/about/team"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-sm font-medium text-slate-700 hover:text-blue-600"
                  >
                    Meet the HRA team.
                  </Link>
                </div>
              </div>

              {/* Services Mobile Group */}
              <div className="px-3 py-1">
                <div className="font-semibold text-xs tracking-wider uppercase text-slate-400 mb-1">Services</div>
                <div className="pl-2 space-y-1 border-l-2 border-slate-100">
                  <Link
                    href="/services/blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-sm font-medium text-slate-700 hover:text-blue-600"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/services/courses"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-sm font-medium text-slate-700 hover:text-blue-600"
                  >
                    courses
                  </Link>
                  <Link
                    href="/services/exam-portal"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-sm font-medium text-slate-700 hover:text-blue-600"
                  >
                    HRA Exam Portal
                  </Link>
                  <Link
                    href="/services/certificate-portal"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-sm font-medium text-slate-700 hover:text-blue-600"
                  >
                    HRA Cirtificate Portal.
                  </Link>
                </div>
              </div>

              <Link
                href="/internship"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-slate-50"
              >
                Internship
              </Link>
              <Link
                href="/careers"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-slate-50"
              >
                Careers
              </Link>
              <Link
                href="/clients"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-slate-50"
              >
                Our Clients
              </Link>
              <Link
                href="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-slate-50"
              >
                Galary
              </Link>
            </div>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-3 w-full py-3 rounded-full bg-[#1b2d6b] text-white text-[15px] font-semibold shadow-md active:scale-98"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[20px] h-[20px] text-white stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round shrink-0"
              >
                <path d="M12 4C7.58 4 4 7.13 4 11c0 1.63.63 3.12 1.71 4.29L4.5 19.5l4.5-1.29c.92.37 1.93.59 3 .59 4.42 0 8-3.13 8-7s-3.58-7-8-7z" strokeWidth="1.9" />
                <path d="M9.5 19.5c1.8 1.4 4.1 2 6.5 1.5l3.5 1-1-3.2c.9-1.2 1.5-2.6 1.5-4.2" strokeWidth="1.9" />
              </svg>
              <span>Contact Us</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
