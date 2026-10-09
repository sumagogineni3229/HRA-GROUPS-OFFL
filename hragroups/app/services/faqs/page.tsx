"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BigPolygonBackground from "@/components/BigPolygonBackground";
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  HelpCircle,
  MessageCircle,
  Layers,
  Cpu,
  Globe2,
  Code2,
} from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: "GENERAL" | "SERVICES" | "PROGRAMS";
}

const SERVICES_FAQS: FAQItem[] = [
  {
    id: 1,
    question: "1. What services does HRA Groups provide?",
    answer:
      "We provide Web & App Development, IT Staffing & Recruitment, Digital Marketing, Corporate Training, and FounderBridge programs.",
    category: "SERVICES",
  },
  {
    id: 2,
    question: "2. What is FounderBridge?",
    answer:
      "FounderBridge is a dedicated program designed to support aspiring and early-stage founders through guidance, mentorship, skill development, and practical business support.",
    category: "PROGRAMS",
  },
  {
    id: 3,
    question: "3. Who can join FounderBridge?",
    answer:
      "Aspiring entrepreneurs, startup founders, students with business ideas, and early-stage entrepreneurs can participate.",
    category: "PROGRAMS",
  },
  {
    id: 4,
    question: "4. Do you provide customized services?",
    answer:
      "Yes. Our services are customized according to each client's business requirements and objectives.",
    category: "SERVICES",
  },
  {
    id: 5,
    question: "5. Do you provide end-to-end website and app development?",
    answer:
      "Yes. We provide UI/UX design, development, integrations, testing, deployment, and ongoing support.",
    category: "SERVICES",
  },
  {
    id: 6,
    question: "6. Do you provide IT staffing and recruitment?",
    answer:
      "Yes. We help organizations identify and hire suitable IT talent based on their requirements.",
    category: "SERVICES",
  },
  {
    id: 7,
    question: "7. Do you provide digital marketing services?",
    answer:
      "Yes. We offer solutions covering social media, content, SEO, branding, and digital marketing.",
    category: "SERVICES",
  },
  {
    id: 8,
    question: "8. Do you provide corporate training?",
    answer:
      "Yes. We provide customized online corporate training programs for organizations and teams.",
    category: "SERVICES",
  },
  {
    id: 9,
    question: "9. Can you work on existing websites and applications?",
    answer:
      "Yes. We provide enhancement, maintenance, optimization, and development support for existing projects.",
    category: "SERVICES",
  },
  {
    id: 10,
    question: "10. Do you provide post-project support?",
    answer:
      "Yes. Support and maintenance services are available based on project requirements.",
    category: "SERVICES",
  },
  {
    id: 11,
    question: "11. How can I request a quotation?",
    answer:
      "Contact HRA Groups with your requirements, and our team will discuss your needs and provide a suitable proposal.",
    category: "GENERAL",
  },
  {
    id: 12,
    question: "12. How can I get started with HRA Groups?",
    answer:
      "Contact our team and share your requirements. We will guide you through the appropriate service or program.",
    category: "GENERAL",
  },
];

const FAQ_FILTERS = ["ALL", "SERVICES", "PROGRAMS", "GENERAL"];

export default function ServicesFaqPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const filteredFaqs =
    activeFilter === "ALL"
      ? SERVICES_FAQS
      : SERVICES_FAQS.filter((faq) => faq.category === activeFilter);

  return (
    <div className="ibase-landing-bg text-white min-h-screen selection:bg-[#00c9ff]/30 selection:text-[#00c9ff] relative overflow-hidden font-sans">
      <Navbar />

      {/* Structured Schema Markup for SEO (FAQPage Schema) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": SERVICES_FAQS.map((faq) => ({
              "@type": "Question",
              "name": faq.question.replace(/^\d+\.\s*/, ""),
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Global Background Atmospheric Layer (Big Polygons matching Work page) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        <BigPolygonBackground opacityClass="opacity-80" />
        <div className="absolute top-[15%] -left-[10%] w-[650px] h-[650px] bg-[#00c9ff]/[0.035] rounded-full blur-[200px]" />
        <div className="absolute top-[55%] -right-[15%] w-[750px] h-[750px] bg-[#1e1cb0]/[0.045] rounded-full blur-[220px]" />
      </div>

      <main className="relative z-20">
        {/* ===================== HERO SECTION ===================== */}
        <section className="relative w-full pt-40 pb-12 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto overflow-hidden text-center">
          <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto space-y-6">
            {/* Centered Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00c9ff] animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-white/80">
                HELP &amp; INFORMATION
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-[-0.03em] leading-[1.1] font-serif">
              HRA Groups –<br />
              <em className="font-serif italic text-[#00c9ff]">Services FAQs</em>
            </h1>
          </div>
        </section>

        {/* ===================== FAQS ACCORDION SECTION ===================== */}
        <section className="relative py-12 px-6 sm:px-10 lg:px-16 max-w-[1400px] mx-auto ibase-section-divider">
          {/* Filter Area */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12 relative z-10">
            <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
              CATEGORY:
            </span>
            <div className="flex flex-wrap gap-2">
              {FAQ_FILTERS.map((f) => {
                const isActive = activeFilter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`text-xs font-mono px-4 py-2 rounded-full uppercase tracking-wider transition-all cursor-pointer ${isActive
                        ? "bg-[#00c9ff] text-black font-semibold shadow-[0_0_20px_rgba(0,201,255,0.4)]"
                        : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30"
                      }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Accordion List */}
          <div className="space-y-4 relative z-10 max-w-4xl mx-auto">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                      ? "bg-white/[0.04] border-[#00c9ff]/40 shadow-[0_0_30px_rgba(0,201,255,0.1)]"
                      : "bg-white/[0.015] border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-medium text-white group-hover:text-[#00c9ff] transition-colors pr-2">
                      {faq.question}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${isOpen
                          ? "bg-[#00c9ff] border-[#00c9ff] text-black rotate-180 shadow-[0_0_15px_rgba(0,201,255,0.5)]"
                          : "bg-white/5 border-white/15 text-white/70 group-hover:border-[#00c9ff]/50 group-hover:text-white"
                        }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 text-sm sm:text-base text-white/70 leading-relaxed border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===================== CTA BAND (Exact match to Work Page) ===================== */}
        <section className="relative py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto text-center ibase-section-divider">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00c9ff]">
              START A CONVERSATION
            </span>
            <h2 className="text-4xl sm:text-6xl font-light text-white font-serif leading-tight">
              Have More Questions?<br />
              <em className="italic text-[#00c9ff]">Let's Talk About Your Goals</em>
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xl mx-auto">
              Whether you need end-to-end software development, custom IT training, recruitment solutions, or startup incubation, our team is here to assist.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="ibase-btn-primary">
                Get In Touch
              </Link>
              <a
                href="https://wa.me/919676272283?text=Hi%20HRA%20Groups,%20I%20have%20an%20inquiry%20regarding%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="ibase-btn-ghost flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#00c9ff]" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
