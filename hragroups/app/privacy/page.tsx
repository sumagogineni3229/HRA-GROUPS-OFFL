"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-[#172947] font-sans">
      <Navbar />

      <section className="relative bg-gradient-to-b from-[#f0f6ff] via-slate-50 to-white pt-14 pb-20 border-b border-slate-100 overflow-hidden">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-bold tracking-[0.2em] text-[#0052cc] uppercase shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>PRIVACY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight heading-black-blue-gradient">
            Privacy Policy
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Learn how HRA Groups collects, protects, and handles personal data and student information.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-12 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-[#172947]">1. Information We Collect</h2>
            <p>
              We collect information provided directly when registering for training programs, verifying certificates, submitting contact forms, or taking assessment exams.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-[#172947]">2. How We Use Information</h2>
            <p>
              Your data is utilized strictly for course enrollment, certification validation, communication regarding inquiries, and providing customer support.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-[#172947]">3. Data Security</h2>
            <p>
              We apply enterprise-grade security protocols, encryption, and access controls to ensure your personal details are safely stored.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-[#172947]">4. Contact Our Data Protection Officer</h2>
            <p>
              For privacy queries or data requests, write to <a href="mailto:contact@hragroups.com" className="text-blue-600 underline">contact@hragroups.com</a>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
