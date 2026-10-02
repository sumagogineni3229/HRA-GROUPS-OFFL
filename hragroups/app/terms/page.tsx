"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#070c18] text-[#172947] dark:text-slate-100 font-sans transition-colors duration-300">
      <Navbar />

      <section className="relative bg-gradient-to-b from-[#f0f6ff] via-slate-50 to-white dark:from-[#050b17] dark:via-[#090e1a] dark:to-[#070c18] pt-14 pb-20 border-b border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/60 text-xs font-bold tracking-[0.2em] text-[#0052cc] dark:text-sky-300 uppercase shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
            <span>LEGAL</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading-black-blue-gradient">
            Terms of Service
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Please review our terms of service governing usage of HRA Groups websites, programs, and digital portals.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-[#070c18] transition-colors duration-300">
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-12 space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <div className="space-y-3 p-6 rounded-2xl bg-[#f8fafc] dark:bg-[#0c1427] border border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-[#172947] dark:text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the websites, services, training portals, and applications operated by HRA Groups, you agree to comply with and be bound by these Terms of Service.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-[#f8fafc] dark:bg-[#0c1427] border border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-[#172947] dark:text-white">2. Educational &amp; Assessment Services</h2>
            <p>
              HRA Groups provides internship training, certifications, and technical examinations. All certifications awarded are subject to academic integrity policies and verified assessments.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-[#f8fafc] dark:bg-[#0c1427] border border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-[#172947] dark:text-white">3. Intellectual Property</h2>
            <p>
              All course materials, code examples, portal interfaces, trademarks, and documentation are proprietary property of HRA Groups.
            </p>
          </div>

          <div className="space-y-3 p-6 rounded-2xl bg-[#f8fafc] dark:bg-[#0c1427] border border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-[#172947] dark:text-white">4. Contact Us</h2>
            <p>
              For inquiries concerning these terms, please contact us directly at <a href="mailto:contact@hragroups.com" className="text-blue-600 dark:text-sky-400 underline">contact@hragroups.com</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
