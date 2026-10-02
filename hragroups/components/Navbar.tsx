"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageSquare, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
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

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const isAboutActive = pathname.startsWith("/about");
  const isServicesActive = pathname.startsWith("/services");

  return (
    <header className="sticky top-0 z-50 w-full py-3 px-4 sm:px-8 lg:px-12 pointer-events-none transition-all duration-300">
      <div className={`w-full max-w-[1560px] mx-auto bg-white/90 dark:bg-[#0c1427]/95 backdrop-blur-2xl border transition-all duration-300 rounded-full px-5 sm:px-7 py-2.5 pointer-events-auto ${
        isScrolled
          ? "border-blue-500/30 dark:border-blue-500/40 shadow-[0_10px_35px_rgba(0,82,204,0.12)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.6)] ring-1 ring-blue-500/10"
          : "border-slate-200/80 dark:border-slate-800/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
      }`}>
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
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3">
            {/* Home */}
            <Link
              href="/"
              className={`px-3.5 py-1.5 rounded-full text-[15px] font-medium transition-all ${
                pathname === "/"
                  ? "bg-blue-50 text-[#0052cc] dark:bg-blue-500/15 dark:text-[#65acff] font-semibold shadow-xs"
                  : "text-[#172947] dark:text-slate-200 hover:text-[#0052cc] dark:hover:text-[#65acff] hover:bg-slate-100/60 dark:hover:bg-slate-800/50"
              }`}
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div
              className="relative group py-1"
              onMouseEnter={() => setActiveNavDropdown("about")}
              onMouseLeave={() => setActiveNavDropdown(null)}
            >
              <button
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[15px] font-medium transition-all ${
                  isAboutActive
                    ? "bg-blue-50 text-[#0052cc] dark:bg-blue-500/15 dark:text-[#65acff] font-semibold shadow-xs"
                    : "text-[#172947] dark:text-slate-200 hover:text-[#0052cc] dark:hover:text-[#65acff] hover:bg-slate-100/60 dark:hover:bg-slate-800/50"
                }`}
              >
                About
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200 opacity-75" />
              </button>
              <AnimatePresence>
                {activeNavDropdown === "about" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white/95 dark:bg-[#0c1427]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-2.5 grid gap-1 z-50"
                  >
                    {[
                      { title: "Company Overview", href: "/about/company-overview" },
                      { title: "Meet the HRA team.", href: "/about/team" },
                    ].map((item) => {
                      const itemActive = pathname === item.href;
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                            itemActive
                              ? "bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-sky-300 font-semibold"
                              : "text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-sky-300 hover:bg-blue-50/80 dark:hover:bg-blue-900/30"
                          }`}
                        >
                          {item.title}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown */}
            <div
              className="relative group py-1"
              onMouseEnter={() => setActiveNavDropdown("services")}
              onMouseLeave={() => setActiveNavDropdown(null)}
            >
              <button
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[15px] font-medium transition-all ${
                  isServicesActive
                    ? "bg-blue-50 text-[#0052cc] dark:bg-blue-500/15 dark:text-[#65acff] font-semibold shadow-xs"
                    : "text-[#172947] dark:text-slate-200 hover:text-[#0052cc] dark:hover:text-[#65acff] hover:bg-slate-100/60 dark:hover:bg-slate-800/50"
                }`}
              >
                Services
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-200 opacity-75" />
              </button>
              <AnimatePresence>
                {activeNavDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white/95 dark:bg-[#0c1427]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-2.5 grid gap-1 z-50"
                  >
                    {[
                      { title: "Blog", href: "/services/blog" },
                      { title: "courses", href: "/services/courses" },
                      { title: "HRA Exam Portal", href: "/services/exam-portal" },
                      { title: "HRA Cirtificate Portal.", href: "/services/certificate-portal" },
                    ].map((item) => {
                      const itemActive = pathname === item.href;
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                            itemActive
                              ? "bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-sky-300 font-semibold"
                              : "text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-sky-300 hover:bg-blue-50/80 dark:hover:bg-blue-900/30"
                          }`}
                        >
                          {item.title}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Internship */}
            <Link
              href="/internship"
              className={`px-3.5 py-1.5 rounded-full text-[15px] font-medium transition-all ${
                isActive("/internship")
                  ? "bg-blue-50 text-[#0052cc] dark:bg-blue-500/15 dark:text-[#65acff] font-semibold shadow-xs"
                  : "text-[#172947] dark:text-slate-200 hover:text-[#0052cc] dark:hover:text-[#65acff] hover:bg-slate-100/60 dark:hover:bg-slate-800/50"
              }`}
            >
              Internship
            </Link>

            {/* Careers */}
            <Link
              href="/careers"
              className={`px-3.5 py-1.5 rounded-full text-[15px] font-medium transition-all ${
                isActive("/careers")
                  ? "bg-blue-50 text-[#0052cc] dark:bg-blue-500/15 dark:text-[#65acff] font-semibold shadow-xs"
                  : "text-[#172947] dark:text-slate-200 hover:text-[#0052cc] dark:hover:text-[#65acff] hover:bg-slate-100/60 dark:hover:bg-slate-800/50"
              }`}
            >
              Careers
            </Link>

            {/* Our Clients */}
            <Link
              href="/clients"
              className={`px-3.5 py-1.5 rounded-full text-[15px] font-medium transition-all ${
                isActive("/clients")
                  ? "bg-blue-50 text-[#0052cc] dark:bg-blue-500/15 dark:text-[#65acff] font-semibold shadow-xs"
                  : "text-[#172947] dark:text-slate-200 hover:text-[#0052cc] dark:hover:text-[#65acff] hover:bg-slate-100/60 dark:hover:bg-slate-800/50"
              }`}
            >
              Our Clients
            </Link>

            {/* Galary */}
            <Link
              href="/gallery"
              className={`px-3.5 py-1.5 rounded-full text-[15px] font-medium transition-all ${
                isActive("/gallery")
                  ? "bg-blue-50 text-[#0052cc] dark:bg-blue-500/15 dark:text-[#65acff] font-semibold shadow-xs"
                  : "text-[#172947] dark:text-slate-200 hover:text-[#0052cc] dark:hover:text-[#65acff] hover:bg-slate-100/60 dark:hover:bg-slate-800/50"
              }`}
            >
              Galary
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            {/* Dark / Light Mode Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-slate-700 dark:text-amber-400 hover:text-[#0052cc] dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all duration-200 border border-slate-200/80 dark:border-slate-700/80 shadow-sm flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
              aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400 animate-[spin_10s_linear_infinite]" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Navy Contact Us Pill */}
            <Link
              href="/contact"
              className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-white text-[15px] font-semibold tracking-wide transition-all shadow-[0_4px_14px_rgba(27,45,107,0.35)] hover:shadow-[0_6px_20px_rgba(27,45,107,0.45)] hover:scale-[1.02] active:scale-[0.98] ${
                pathname === "/contact"
                  ? "bg-[#0052cc] ring-2 ring-[#0052cc]/40 ring-offset-2 dark:ring-offset-[#0c1427]"
                  : "bg-[#1b2d6b] hover:bg-[#152355]"
              }`}
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
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
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
            className="lg:hidden border border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-[#0c1427]/95 backdrop-blur-2xl px-6 pt-2 pb-6 space-y-3 rounded-3xl mt-2 shadow-xl dark:shadow-2xl overflow-hidden pointer-events-auto"
          >
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                  pathname === "/"
                    ? "bg-blue-50 text-[#0052cc] dark:bg-blue-900/30 dark:text-[#65acff] font-semibold"
                    : "text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                Home
              </Link>

              {/* About Mobile Group */}
              <div className="px-3 py-1">
                <div className="font-semibold text-xs tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-1">About</div>
                <div className="pl-2 space-y-1 border-l-2 border-slate-100 dark:border-slate-800">
                  <Link
                    href="/about/company-overview"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-1 text-sm font-medium transition-colors ${
                      pathname === "/about/company-overview"
                        ? "text-blue-600 dark:text-sky-400 font-semibold"
                        : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400"
                    }`}
                  >
                    Company Overview
                  </Link>
                  <Link
                    href="/about/team"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-1 text-sm font-medium transition-colors ${
                      pathname === "/about/team"
                        ? "text-blue-600 dark:text-sky-400 font-semibold"
                        : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400"
                    }`}
                  >
                    Meet the HRA team.
                  </Link>
                </div>
              </div>

              {/* Services Mobile Group */}
              <div className="px-3 py-1">
                <div className="font-semibold text-xs tracking-wider uppercase text-slate-400 dark:text-slate-500 mb-1">Services</div>
                <div className="pl-2 space-y-1 border-l-2 border-slate-100 dark:border-slate-800">
                  <Link
                    href="/services/blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-1 text-sm font-medium transition-colors ${
                      pathname === "/services/blog"
                        ? "text-blue-600 dark:text-sky-400 font-semibold"
                        : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400"
                    }`}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/services/courses"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-1 text-sm font-medium transition-colors ${
                      pathname === "/services/courses"
                        ? "text-blue-600 dark:text-sky-400 font-semibold"
                        : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400"
                    }`}
                  >
                    courses
                  </Link>
                  <Link
                    href="/services/exam-portal"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-1 text-sm font-medium transition-colors ${
                      pathname === "/services/exam-portal"
                        ? "text-blue-600 dark:text-sky-400 font-semibold"
                        : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400"
                    }`}
                  >
                    HRA Exam Portal
                  </Link>
                  <Link
                    href="/services/certificate-portal"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-1 text-sm font-medium transition-colors ${
                      pathname === "/services/certificate-portal"
                        ? "text-blue-600 dark:text-sky-400 font-semibold"
                        : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400"
                    }`}
                  >
                    HRA Cirtificate Portal.
                  </Link>
                </div>
              </div>

              <Link
                href="/internship"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                  isActive("/internship")
                    ? "bg-blue-50 text-[#0052cc] dark:bg-blue-900/30 dark:text-[#65acff] font-semibold"
                    : "text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                Internship
              </Link>
              <Link
                href="/careers"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                  isActive("/careers")
                    ? "bg-blue-50 text-[#0052cc] dark:bg-blue-900/30 dark:text-[#65acff] font-semibold"
                    : "text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                Careers
              </Link>
              <Link
                href="/clients"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                  isActive("/clients")
                    ? "bg-blue-50 text-[#0052cc] dark:bg-blue-900/30 dark:text-[#65acff] font-semibold"
                    : "text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
              >
                Our Clients
              </Link>
              <Link
                href="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium transition-colors ${
                  isActive("/gallery")
                    ? "bg-blue-50 text-[#0052cc] dark:bg-blue-900/30 dark:text-[#65acff] font-semibold"
                    : "text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
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
