"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, GraduationCap, Award, Newspaper } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      title: "Blog & Insights",
      desc: "Stay updated with industry trends, enterprise engineering best practices, and career advice.",
      href: "/services/blog",
      icon: Newspaper,
    },
    {
      title: "Training & Courses",
      desc: "Industry-aligned IT training and courses covering Full-Stack, Cloud, AI, and DevOps.",
      href: "/services/courses",
      icon: BookOpen,
    },
    {
      title: "HRA Exam Portal",
      desc: "Comprehensive online assessment platform for evaluating skills and readiness.",
      href: "/services/exam-portal",
      icon: GraduationCap,
    },
    {
      title: "Certificate Portal",
      desc: "Verify and download your official HRA Groups certifications and credentials.",
      href: "/services/certificate-portal",
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#070c18] text-[#172947] dark:text-slate-100 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#f0f6ff] via-slate-50 to-white dark:from-[#0c1427] dark:via-[#090e1a] dark:to-[#070c18] pt-14 pb-20 border-b border-slate-100 dark:border-slate-800/80 overflow-hidden">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-xs font-bold tracking-[0.2em] text-[#0052cc] dark:text-sky-300 uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
            <span>SOLUTIONS & OFFERINGS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight heading-black-blue-gradient">
            Our Services
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From technical upskilling and certification portals to cutting-edge enterprise consulting.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#070c18]">
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="p-8 rounded-3xl bg-slate-50 dark:bg-[#0c1427] border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/40 dark:hover:border-blue-500/50 hover:shadow-xl dark:hover:shadow-blue-950/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-sky-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#172947] dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-sky-400">
                  <span>Explore Offering</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
