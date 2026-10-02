"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-[#172947] font-sans">
      <Navbar />

      <section className="relative bg-gradient-to-b from-[#f0f6ff] via-slate-50 to-white pt-14 pb-20 border-b border-slate-100 overflow-hidden">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-bold tracking-[0.2em] text-[#0052cc] uppercase shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>LEGAL</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading-black-blue-gradient">
            Terms of Service
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Please review our terms of service governing usage of HRA Groups websites, programs, and digital portals.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-12 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-[#172947]">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the websites, services, training portals, and applications operated by HRA Groups, you agree to comply with and be bound by these Terms of Service.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-[#172947]">2. Educational & Assessment Services</h2>
            <p>
              HRA Groups provides internship training, certifications, and technical examinations. All certifications awarded are subject to academic integrity policies and verified assessments.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-[#172947]">3. Intellectual Property</h2>
            <p>
              All course materials, code examples, portal interfaces, trademarks, and documentation are proprietary property of HRA Groups.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-[#172947]">4. Contact Us</h2>
            <p>
              For inquiries concerning these terms, please contact us directly at <a href="mailto:contact@hragroups.com" className="text-blue-600 underline">contact@hragroups.com</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
