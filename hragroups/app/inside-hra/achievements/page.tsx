"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BigPolygonBackground from "@/components/BigPolygonBackground";
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Award,
  Trophy,
  CheckCircle2,
  Users,
  Compass,
  Layers,
  Play,
  Code2,
  GraduationCap,
  Briefcase,
  Globe2,
} from "lucide-react";

export default function InsideHraAchievementsPage() {
  const [adminAchievements, setAdminAchievements] = useState<any[]>([]);
  const { scrollY } = useScroll();
  const heroTranslateY = useTransform(scrollY, [0, 500], [0, -30]);

  // Typewriter text animation state
  const PHRASES = [
    "Progress Worth Remembering",
    "Milestones That Define Us",
    "Innovation Through Collaboration",
    "Every Milestone Has A Story",
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  useEffect(() => {
    const fullText = PHRASES[phraseIndex];
    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(60);
        if (currentText.length + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(35);
        if (currentText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        }
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, typingSpeed]);

  useEffect(() => {
    fetch("/api/achievements")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          setAdminAchievements(data);
        } else if (data?.success && Array.isArray(data.items)) {
          setAdminAchievements(data.items);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="ibase-landing-bg text-white min-h-screen selection:bg-[#00c9ff]/30 selection:text-[#00c9ff] relative overflow-hidden font-sans">
      <Navbar />

      {/* Global Background Layer (Big Polygons Matching Work, Gallery & Founder Program) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        <BigPolygonBackground opacityClass="opacity-80" />
        <div className="absolute top-[15%] -left-[10%] w-[650px] h-[650px] bg-[#00c9ff]/[0.035] rounded-full blur-[200px]" />
        <div className="absolute top-[55%] -right-[15%] w-[750px] h-[750px] bg-[#1e1cb0]/[0.045] rounded-full blur-[220px]" />
      </div>

      <main className="relative z-20">
        {/* ===================== HERO SECTION ===================== */}
        <section className="pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 border-b border-white/10 text-left">
          <motion.div
            style={{ y: heroTranslateY }}
            className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16"
          >
            <div className="flex items-center gap-2.5 text-xs font-mono tracking-[0.22em] text-[#00c9ff] uppercase">
              <span className="w-6 h-[1px] bg-[#00c9ff]" />
              <span>HRA GROUPS / ACHIEVEMENTS</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mt-10">
              <div className="lg:col-span-8 space-y-4">
                <p className="text-xs font-mono tracking-widest text-white/50 uppercase">
                  OUR JOURNEY
                </p>

                {/* Animated Typewriter Headline */}
                <div className="min-h-[75px] sm:min-h-[95px] md:min-h-[110px] flex items-center">
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal text-white font-serif leading-[1.03] tracking-[-0.035em]">
                    <span>{currentText}</span>
                    <span className="text-[#00c9ff] ml-1.5 font-light animate-[pulse_1s_infinite]">|</span>
                  </h1>
                </div>

                <p className="max-w-2xl text-sm sm:text-base text-white/60 leading-relaxed pt-2">
                  A collection of milestones, programs, recognitions and initiatives that reflect the journey of HRA Groups and the communities we work with
                </p>
              </div>

              <div className="lg:col-span-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10 lg:border-l lg:border-white/15 lg:pl-8 space-y-3">
                <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">
                  01 / MISSION SUMMARY
                </div>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  Building opportunities through technology, education, innovation and meaningful connections
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===================== ADMIN ACHIEVEMENTS (IF ANY) ===================== */}
        {adminAchievements.length > 0 && (
          <section className="py-20 border-b border-white/10">
            <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
              <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span className="text-white">03</span>
                <span>/ FROM HRA GROUPS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {adminAchievements.map((item) => (
                  <article
                    key={item.id || item._id}
                    className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-[#00c9ff]/50 transition-all"
                  >
                    <div className="aspect-video w-full bg-black">
                      {item.mediaType === "video" ? (
                        <video
                          src={item.mediaUrl}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={item.mediaUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="p-6 space-y-2">
                      <span className="text-[10px] font-mono text-[#00c9ff] uppercase tracking-wider block">
                        {item.category} {item.date ? `/ ${item.date}` : ""}
                      </span>
                      <h3 className="text-xl font-light font-serif text-white">{item.title}</h3>
                      <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===================== 01 OVERVIEW SECTION ===================== */}
        <section className="py-24 border-b border-white/10 bg-white/[0.01]">
          <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/50 uppercase">
              <span className="text-[#00c9ff]">01</span>
              <span>MILESTONES</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-6">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-serif text-white leading-[1.04] tracking-[-0.035em]">
                  Every Milestone <br />
                  <span className="text-[#00c9ff]">Has A Story</span>
                </h2>
              </div>

              <div className="lg:col-span-6 text-white/70 text-sm sm:text-base leading-relaxed space-y-5">
                <p>
                  From student-focused initiatives and hackathons to technology programs and founder conversations, HRA Groups continues to create platforms where people can learn, build and connect
                </p>
                <p>
                  Our achievements represent the collective work of our team, partners, mentors, students and the communities that participate in our programs
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 02 FEATURED HACKATHONS ===================== */}
        <section className="py-24 border-b border-white/10">
          <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/50 uppercase">
                  <span className="text-[#00c9ff]">02</span>
                  <span>FEATURED</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-normal font-serif text-white leading-tight">
                  National <br />
                  Hackathons
                </h2>
              </div>
              <div className="lg:col-span-6 text-white/60 text-sm sm:text-base leading-relaxed">
                <p>
                  Creating competitive platforms where students and emerging professionals can collaborate, solve problems and demonstrate their capabilities
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
              {/* Hackathon 1 */}
              <article className="group rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/50 transition-all duration-300 flex flex-col justify-between">
                <div className="relative aspect-[16/10] overflow-hidden bg-black flex items-center justify-center p-2">
                  <img
                    src="https://hragroupswebsite-psi.vercel.app/assets/Hacakthon1winners-BIE5bY7A.png"
                    alt="HRA Groups Hackathon Winners"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-5 right-5 text-4xl font-serif text-white/20 font-light">
                    01
                  </div>
                </div>

                <div className="p-8 sm:p-10 space-y-4">
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">
                    NATIONAL HACKATHON
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light font-serif text-white group-hover:text-[#00c9ff] transition-colors leading-snug">
                    Innovation Through <br /> Collaboration
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    A national-level hackathon bringing together participants to work on practical problem statements with mentor guidance and final presentations
                  </p>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50 uppercase tracking-wider">
                    <span className="text-[#00c9ff]">WINNERS</span>
                    <span>PRIZE MONEY AWARDED</span>
                  </div>
                </div>
              </article>

              {/* Hackathon 2 */}
              <article className="group rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/50 transition-all duration-300 flex flex-col justify-between">
                <div className="relative aspect-[16/10] overflow-hidden bg-black flex items-center justify-center p-2">
                  <img
                    src="https://hragroupswebsite-psi.vercel.app/assets/Hackathon2winners-C8RN2uJw.png"
                    alt="HRA Groups Hackathon Winners"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-5 right-5 text-4xl font-serif text-white/20 font-light">
                    02
                  </div>
                </div>

                <div className="p-8 sm:p-10 space-y-4">
                  <div className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">
                    HRA HACKATHON
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light font-serif text-white group-hover:text-[#00c9ff] transition-colors leading-snug">
                    Ideas Becoming <br /> Solutions
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    A collaborative challenge designed to encourage creativity, technical thinking, teamwork and solution-oriented development
                  </p>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50 uppercase tracking-wider">
                    <span className="text-[#00c9ff]">WINNERS</span>
                    <span>CERTIFICATES PROVIDED</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ===================== 03 THE JOURNEY VIDEO ===================== */}
        <section className="py-24 border-b border-white/10 bg-white/[0.01]">
          <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/50 uppercase">
                  <span className="text-[#00c9ff]">03</span>
                  <span>THE JOURNEY</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-normal font-serif text-white leading-tight">
                  Moments That <br />
                  <span className="text-[#00c9ff]">Define Us</span>
                </h2>
              </div>
              <div className="lg:col-span-6 text-white/60 text-sm sm:text-base leading-relaxed">
                <p>
                  A visual glimpse into HRA Groups initiatives, activities and the people behind them
                </p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden bg-black border border-white/15 relative">
              <div className="relative aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/dTuePb-uua8"
                  title="HRA Groups Journey"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
              <div className="p-6 bg-[#080c16] border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60 uppercase tracking-widest">
                <span className="text-[#00c9ff]">HRA GROUPS</span>
                <span>ACHIEVEMENTS</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 04 AWARDS & RECOGNITION ===================== */}
        <section className="py-24 border-b border-white/10">
          <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/50 uppercase">
                  <span className="text-[#00c9ff]">04</span>
                  <span>RECOGNITION</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-normal font-serif text-white leading-tight">
                  Awards &amp; <br />
                  Recognition
                </h2>
              </div>
              <div className="lg:col-span-6 text-white/60 text-sm sm:text-base leading-relaxed">
                <p>
                  Recognition reflects the work carried out with our students, partners, institutions and professional communities
                </p>
              </div>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {/* Row 1 */}
              <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center group hover:bg-white/[0.015] px-4 transition-colors">
                <div className="md:col-span-1 text-xs font-mono text-[#00c9ff]">01</div>
                <div className="md:col-span-10 space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-light font-serif text-white group-hover:text-[#00c9ff] transition-colors">
                    AICTE Approved
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    HRA Groups internship initiatives are presented with AICTE approval recognition
                  </p>
                </div>
                <div className="md:col-span-1 text-right text-lg text-white/30 group-hover:text-[#00c9ff] group-hover:translate-x-1 transition-all">
                  ↗
                </div>
              </div>

              {/* Row 2 */}
              <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center group hover:bg-white/[0.015] px-4 transition-colors">
                <div className="md:col-span-1 text-xs font-mono text-[#00c9ff]">02</div>
                <div className="md:col-span-10 space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-light font-serif text-white group-hover:text-[#00c9ff] transition-colors">
                    Institutional Collaborations
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    Partnerships and programs conducted with educational institutions and training ecosystems
                  </p>
                </div>
                <div className="md:col-span-1 text-right text-lg text-white/30 group-hover:text-[#00c9ff] group-hover:translate-x-1 transition-all">
                  ↗
                </div>
              </div>

              {/* Row 3 */}
              <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center group hover:bg-white/[0.015] px-4 transition-colors">
                <div className="md:col-span-1 text-xs font-mono text-[#00c9ff]">03</div>
                <div className="md:col-span-10 space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-light font-serif text-white group-hover:text-[#00c9ff] transition-colors">
                    Student Programs
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    Workshops, hackathons, internships and career initiatives designed for student communities
                  </p>
                </div>
                <div className="md:col-span-1 text-right text-lg text-white/30 group-hover:text-[#00c9ff] group-hover:translate-x-1 transition-all">
                  ↗
                </div>
              </div>

              {/* Row 4 */}
              <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center group hover:bg-white/[0.015] px-4 transition-colors">
                <div className="md:col-span-1 text-xs font-mono text-[#00c9ff]">04</div>
                <div className="md:col-span-10 space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-light font-serif text-white group-hover:text-[#00c9ff] transition-colors">
                    Industry Engagement
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    Connecting professionals, founders, businesses and emerging talent through meaningful programs
                  </p>
                </div>
                <div className="md:col-span-1 text-right text-lg text-white/30 group-hover:text-[#00c9ff] group-hover:translate-x-1 transition-all">
                  ↗
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 05 PROGRAMS & INITIATIVES ===================== */}
        <section className="py-24 border-b border-white/10 bg-white/[0.01]">
          <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
            <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-white/50 uppercase">
              <span className="text-[#00c9ff]">05</span>
              <span>PROGRAMS &amp; INITIATIVES</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-y border-white/10">
              {/* Program 1 */}
              <div className="p-8 space-y-8 flex flex-col justify-between min-h-[260px] group hover:bg-white/[0.02] transition-colors">
                <small className="text-xs font-mono text-[#00c9ff]">01</small>
                <div>
                  <h3 className="text-2xl font-light font-serif text-white group-hover:text-[#00c9ff] transition-colors mb-3">
                    Hackathons
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Competitive innovation experiences focused on practical problem solving
                  </p>
                </div>
              </div>

              {/* Program 2 */}
              <div className="p-8 space-y-8 flex flex-col justify-between min-h-[260px] group hover:bg-white/[0.02] transition-colors">
                <small className="text-xs font-mono text-[#00c9ff]">02</small>
                <div>
                  <h3 className="text-2xl font-light font-serif text-white group-hover:text-[#00c9ff] transition-colors mb-3">
                    Technology Workshops
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Practical learning sessions covering modern technologies and industry practices
                  </p>
                </div>
              </div>

              {/* Program 3 */}
              <div className="p-8 space-y-8 flex flex-col justify-between min-h-[260px] group hover:bg-white/[0.02] transition-colors">
                <small className="text-xs font-mono text-[#00c9ff]">03</small>
                <div>
                  <h3 className="text-2xl font-light font-serif text-white group-hover:text-[#00c9ff] transition-colors mb-3">
                    Internship Programs
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Structured opportunities for students to gain practical professional exposure
                  </p>
                </div>
              </div>

              {/* Program 4 */}
              <div className="p-8 space-y-8 flex flex-col justify-between min-h-[260px] group hover:bg-white/[0.02] transition-colors">
                <small className="text-xs font-mono text-[#00c9ff]">04</small>
                <div>
                  <h3 className="text-2xl font-light font-serif text-white group-hover:text-[#00c9ff] transition-colors mb-3">
                    Founder Programs
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Platforms connecting founders with visibility, conversations and professional opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 06 CLOSING CTA ===================== */}
        <section className="py-24 bg-black/60 text-white relative overflow-hidden border-t border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,201,255,0.12),transparent_70%)] pointer-events-none" />

          <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-2 text-2xl font-mono text-[#00c9ff]">
              06
            </div>
            <div className="lg:col-span-10 space-y-4">
              <p className="text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                HRA GROUPS
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light font-serif text-white tracking-tight">
                The Journey <br />
                <em className="text-[#00c9ff] not-italic">Continues</em>
              </h2>
              <p className="text-white/60 text-sm sm:text-base max-w-xl leading-relaxed pt-2">
                We continue to build programs, partnerships and opportunities that create meaningful impact across technology, education and business
              </p>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full bg-[#00c9ff] hover:bg-[#0070f3] text-black font-semibold text-xs font-mono tracking-widest uppercase shadow-[0_8px_30px_rgba(0,201,255,0.35)] transition-all duration-200 hover:scale-[1.03]"
                >
                  <span>CONNECT WITH HRA</span>
                  <span className="text-base">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
