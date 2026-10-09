"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BigPolygonBackground from "@/components/BigPolygonBackground";
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Play,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Award,
  Video,
  Eye,
  X,
  Maximize2,
  Users,
  Compass,
  Radio,
  Tag,
} from "lucide-react";

// Authentic event records extracted from HRA Groups
const DEFAULT_EVENTS = [
  {
    id: 1,
    title: "National Student Innovation Hackathon",
    category: "HACKATHONS",
    date: "2025-11-20",
    mediaType: "image",
    mediaUrl: "https://hragroupswebsite-psi.vercel.app/assets/Hacakthon1winners-BIE5bY7A.png",
    description:
      "A high-energy, national-level engineering competition uniting student builders, developers, and visionary creators across India to solve real-world industry challenges",
    format: "Live Experience & Hackathon",
    location: "Mumbai / Hybrid",
  },
  {
    id: 2,
    title: "Future Ready Leadership & Corporate Summit",
    category: "SUMMITS",
    date: "2025-12-14",
    mediaType: "image",
    mediaUrl: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/ceo-A0xjR7b7QVtvl5W2.jpg",
    description:
      "Prestigious executive summit featuring keynote talks by CEO Hemanth Pulavarthi and Director Praveen Kumar on workforce transformation and next-gen IT solutions",
    format: "Keynote & Leadership Panel",
    location: "TheCConnects Summit, Mumbai",
  },
  {
    id: 3,
    title: "Full-Stack & Cloud Architecture Workshop",
    category: "WORKSHOPS",
    date: "2025-10-05",
    mediaType: "image",
    mediaUrl: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img-4-zhGWELSQNu8XsYf6.jpg",
    description:
      "Hands-on technology learning designed around practical skills, cloud microservices experimentation, and real-world system architecture.",
    format: "Interactive Masterclass",
    location: "Virtual & Tech Hub",
  },
  {
    id: 4,
    title: "Executive Networking Dinner & Partner Meet",
    category: "NETWORKING",
    date: "2025-09-18",
    mediaType: "image",
    mediaUrl: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img-30-gpUhev1VTLZ5eEPW.jpg",
    description:
      "A collaborative leadership networking gathering connecting enterprise leaders, institutional heads, founders, and industry strategists",
    format: "Corporate Meetup",
    location: "Grand Hyatt, Hyderabad",
  },
  {
    id: 5,
    title: "Annual Team Meet & Culture Celebration",
    category: "CULTURE",
    date: "2025-12-28",
    mediaType: "image",
    mediaUrl: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/team-gHIAzdVSBOThAnrW.jpeg",
    description:
      "A celebration of collective achievements, teamwork, shared milestones, and collaborative spirit across all divisions of HRA Groups",
    format: "Internal Gala",
    location: "HRA Headquarters",
  },
  {
    id: 6,
    title: "CEO Keynote: Empowering Youth in Digital Tech",
    category: "SUMMITS",
    date: "2025-12-14",
    mediaType: "video",
    mediaUrl: "https://www.youtube.com/embed/296LwinrIEE",
    description:
      "CEO Hemanth Pulavarthi delivers an inspiring address on the future of technology education, placement empowerment, and industry-oriented innovation",
    format: "Keynote Stream",
    location: "Mumbai Grand Stage",
  },
  {
    id: 7,
    title: "Milestone Celebration & Awards Gala",
    category: "SUMMITS",
    date: "2025-12-15",
    mediaType: "video",
    mediaUrl: "https://www.youtube.com/embed/dTuePb-uua8",
    description:
      "Highlights from the national recognition gala celebrating corporate excellence and pioneering contributions in IT talent development",
    format: "Event Highlights",
    location: "Leadership Summit",
  },
  {
    id: 8,
    title: "Executive Dialogue on IT Consulting",
    category: "WORKSHOPS",
    date: "2025-11-02",
    mediaType: "video",
    mediaUrl: "https://www.youtube.com/embed/Jsc8Kq4i8z4",
    description:
      "In-depth discussion on scalable system modernizations, software architecture frameworks, and enterprise IT strategy",
    format: "Panel Discussion",
    location: "Executive Studio",
  },
];

const EVENT_HERO_PHRASES = [
  "Experiences Worth Remembering",
  "Where Ideas Meet People",
  "National Summits & Hackathons",
  "Connecting The Tech Ecosystem",
];

const formatDate = (dateStr: string) => {
  if (!dateStr) return "Date TBA";
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime())
    ? dateStr
    : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

export default function InsideHraEventsPage() {
  const [events, setEvents] = useState<any[]>(DEFAULT_EVENTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const { scrollY } = useScroll();
  const heroTranslateY = useTransform(scrollY, [0, 500], [0, -35]);

  // Typewriter animation state
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  useEffect(() => {
    const fullText = EVENT_HERO_PHRASES[phraseIndex];
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
          setPhraseIndex((prev) => (prev + 1) % EVENT_HERO_PHRASES.length);
        }
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, typingSpeed]);

  // Fetch dynamic events from backend if available while keeping all defaults
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.events && data.events.length > 0) {
          const mapped = data.events.map((it: any) => ({
            id: it.id || it._id,
            title: it.title,
            category: (it.category || "Events").toUpperCase(),
            date: it.date || "",
            mediaType: it.mediaType || "image",
            mediaUrl: it.mediaUrl || it.imageUrl || it.src,
            description: it.description || it.desc || "",
            format: it.format || "Live Experience",
            location: it.location || "HRA Groups",
          }));
          setEvents([...mapped, ...DEFAULT_EVENTS]);
        }
      })
      .catch(() => {});
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    events.forEach((e) => {
      if (e.category) set.add(e.category.toUpperCase());
    });
    return ["ALL", ...Array.from(set)];
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (selectedCategory === "ALL") return events;
    return events.filter((e) => e.category.toUpperCase() === selectedCategory);
  }, [events, selectedCategory]);

  const imageEvents = useMemo(
    () => filteredEvents.filter((e) => e.mediaType !== "video"),
    [filteredEvents]
  );
  const videoEvents = useMemo(
    () => filteredEvents.filter((e) => e.mediaType === "video"),
    [filteredEvents]
  );

  const featuredEvent = imageEvents[0] || filteredEvents[0];
  const remainingImageEvents = imageEvents.slice(1);

  return (
    <div className="ibase-landing-bg text-white min-h-screen selection:bg-[#00c9ff]/30 selection:text-[#00c9ff] relative overflow-hidden font-sans">
      <Navbar />

      {/* Global Background Layer (Big Polygons Matching Work & Founder Program) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        <BigPolygonBackground opacityClass="opacity-80" />
        <div className="absolute top-[15%] -left-[10%] w-[650px] h-[650px] bg-[#00c9ff]/[0.035] rounded-full blur-[200px]" />
        <div className="absolute top-[55%] -right-[15%] w-[750px] h-[750px] bg-[#1e1cb0]/[0.045] rounded-full blur-[220px]" />
      </div>

      <main className="relative z-20">
        {/* ===================== HERO SECTION ===================== */}
        <section className="pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 text-center overflow-hidden border-b border-white/10">
          <motion.div
            style={{ y: heroTranslateY }}
            className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6 sm:space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-4xl mx-auto space-y-3"
            >
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-[#00c9ff] uppercase backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c9ff] animate-pulse" />
                <span>HRA GROUPS • INSIDE HRA • EVENTS</span>
              </div>

              {/* Typewriter Display Headline */}
              <div className="min-h-[80px] sm:min-h-[110px] md:min-h-[130px] flex items-center justify-center w-full px-2">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-light text-white tracking-[-0.03em] leading-[1.08] text-center font-serif">
                  <span className="text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.2)]">
                    {currentText}
                  </span>
                  <span className="text-[#00c9ff] ml-1.5 font-light animate-[pulse_1s_infinite]">|</span>
                </h1>
              </div>

              <p className="max-w-2xl mx-auto text-white/60 text-sm sm:text-base leading-relaxed">
                Explore the moments, conversations, challenges, hackathons, and executive gatherings that bring the HRA Groups ecosystem together.
              </p>
            </motion.div>

            {/* Quick Hero Stat Row */}
            <div className="flex items-center justify-center gap-8 pt-4 text-xs font-mono text-white/50 uppercase tracking-widest">
              <div>
                <span className="text-white font-bold text-lg">{events.length.toString().padStart(2, "0")}</span>
                <span className="ml-2">Total Events</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div>
                <span className="text-[#00c9ff] font-bold text-lg">{categories.length - 1}</span>
                <span className="ml-2">Categories</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div>
                <span className="text-white font-bold text-lg">Live &amp; Recorded</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===================== INTRO EDITORIAL SECTION ===================== */}
        <section className="py-20 border-b border-white/10">
          <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">
                01 / GATHERINGS &amp; PROGRAMS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight font-serif leading-tight">
                More Than <br />
                <span className="text-[#00c9ff] italic">An Event</span>
              </h2>
            </div>
            <div className="lg:col-span-7 text-white/70 text-base sm:text-lg leading-relaxed space-y-4">
              <p>
                From national hackathons and hands-on developer workshops to leadership summits, fireside keynotes, and industry roundtables, our events are intentionally crafted to create collaborative spaces for people to connect, learn, build, and scale.
              </p>
              <p className="text-sm sm:text-base text-white/50">
                Browse our chronological collection below to discover the milestones, discussions, and visual stories that define our journey.
              </p>
            </div>
          </div>
        </section>

        {/* ===================== CATEGORY FILTER BAR ===================== */}
        <section className="py-8 sticky top-16 z-30 bg-[#080a10]/90 backdrop-blur-xl border-b border-white/10">
          <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            <div className="text-xs font-mono tracking-wider text-white/50 uppercase shrink-0">
              Filter by Track:
            </div>
            <div className="flex items-center gap-2">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer capitalize z-10 whitespace-nowrap ${
                      active
                        ? "text-black font-semibold"
                        : "text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="activeEventCategory"
                        className="absolute inset-0 bg-[#00c9ff] rounded-full shadow-md shadow-[#00c9ff]/30 -z-10"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================== FEATURED & EVENT MOMENTS ===================== */}
        <section className="py-16 sm:py-20 border-b border-white/10">
          <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
            <div className="flex items-end justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">
                  02 / MOMENTS &amp; HIGHLIGHTS
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight font-serif">
                  Event Moments
                </h2>
              </div>
              <div className="text-xs font-mono text-white/50 uppercase tracking-widest hidden sm:block">
                Photography / High-Resolution Archive
              </div>
            </div>

            {/* Featured Boxless Editorial Showcase */}
            {featuredEvent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onClick={() => setSelectedEvent(featuredEvent)}
                className="group relative cursor-pointer py-4"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  {/* Seamless Boxless Image Frame */}
                  <div className="lg:col-span-7 relative">
                    <div className="relative overflow-hidden rounded-3xl group-hover:scale-[1.015] transition-all duration-700 shadow-[0_20px_60px_rgba(0,201,255,0.15)]">
                      <img
                        src={featuredEvent.mediaUrl}
                        alt={featuredEvent.title}
                        className="w-full h-auto max-h-[560px] object-contain block mx-auto rounded-3xl"
                        loading="lazy"
                      />
                      {/* Subtle ambient lighting edge on hover */}
                      <div className="absolute inset-0 rounded-3xl ring-1 ring-white/15 group-hover:ring-[#00c9ff]/60 transition-colors pointer-events-none" />
                    </div>
                  </div>

                  {/* Editorial Typography (Boxless) */}
                  <div className="lg:col-span-5 space-y-6 text-left">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                        <span>{featuredEvent.category}</span>
                      </div>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif text-white group-hover:text-[#00c9ff] transition-colors leading-[1.15]">
                        {featuredEvent.title}
                      </h3>
                      <p className="text-base text-white/70 leading-relaxed pt-2">
                        {featuredEvent.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-6 text-xs font-mono">
                      <div>
                        <span className="text-white/40 block mb-1 uppercase tracking-wider">DATE</span>
                        <span className="text-white text-sm font-medium flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#00c9ff]" />
                          {formatDate(featuredEvent.date)}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/40 block mb-1 uppercase tracking-wider">LOCATION</span>
                        <span className="text-white text-sm font-medium flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#00c9ff]" />
                          {featuredEvent.location}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 text-sm font-mono text-[#00c9ff] group-hover:translate-x-1.5 transition-transform">
                        <span>View Full Story &amp; High-Res Photo</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Remaining Grid of Events */}
            {remainingImageEvents.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
                {remainingImageEvents.map((evt, idx) => (
                  <motion.div
                    key={evt.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    onClick={() => setSelectedEvent(evt)}
                    className="group rounded-3xl overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#00c9ff]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg"
                  >
                    <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#05070d] flex items-center justify-center p-1">
                      <img
                        src={evt.mediaUrl}
                        alt={evt.title}
                        className="w-full h-full object-cover object-top sm:object-contain group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img-23-VEjOHz2zOG4PEi4W.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#00c9ff] text-[11px] font-mono border border-white/15">
                        {evt.category}
                      </span>
                    </div>

                    <div className="p-6 sm:p-7 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xl font-light font-serif text-white group-hover:text-[#00c9ff] transition-colors leading-snug line-clamp-2">
                          {evt.title}
                        </h4>
                        <p className="text-xs text-white/60 pt-2 line-clamp-2 leading-relaxed">
                          {evt.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#00c9ff]" />
                          {formatDate(evt.date)}
                        </span>
                        <span className="text-[#00c9ff] group-hover:translate-x-1 transition-transform">
                          View →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ===================== VIDEO STORIES SECTION ===================== */}
        <section id="videos" className="py-20 border-b border-white/10">
          <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
            <div className="flex items-end justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-[#00c9ff] tracking-widest uppercase">
                  03 / VIDEO STORIES
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight font-serif">
                  Watch the Experience
                </h2>
              </div>
              <p className="max-w-md text-sm text-white/60 hidden md:block">
                Go beyond the photographs. Discover event keynote highlights, conversations, presentations, and moments captured on video.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {videoEvents.map((vid, idx) => (
                <motion.div
                  key={vid.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-3xl overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#00c9ff]/50 transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-video w-full bg-black">
                    <iframe
                      src={vid.mediaUrl}
                      title={vid.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                  <div className="p-6 space-y-2 bg-black/40 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-mono text-[#00c9ff] uppercase tracking-wider block mb-1">
                        {vid.category}
                      </span>
                      <h4 className="text-base sm:text-lg font-light font-serif text-white">
                        {vid.title}
                      </h4>
                      <p className="text-xs text-white/60 pt-1 line-clamp-2 leading-relaxed">
                        {vid.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                      <span>{formatDate(vid.date)}</span>
                      <span className="text-[#00c9ff] flex items-center gap-1">
                        <Play className="w-3 h-3 fill-[#00c9ff]" /> Video Stream
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CLOSING CTA BANNER ===================== */}
        <section className="py-20 bg-black/60 text-white relative overflow-hidden border-t border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,201,255,0.12),transparent_70%)] pointer-events-none" />

          <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto space-y-4"
            >
              <span className="text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                HRA GROUPS • COMMUNITY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight font-serif">
                Where Ideas Meet People
              </h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                Whether you want to sponsor our next hackathon, attend a technology workshop, or collaborate on a corporate summit, join hands with HRA Groups.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="px-9 py-3.5 rounded-full bg-[#00c9ff] hover:bg-[#0070f3] text-black font-semibold text-sm shadow-[0_8px_30px_rgba(0,201,255,0.35)] transition-all duration-200 hover:scale-[1.03]"
                >
                  Partner for an Event
                  <ArrowRight className="w-4 h-4 inline-block ml-2" />
                </Link>
                <Link
                  href="/gallery"
                  className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-medium text-sm backdrop-blur-sm transition-all duration-200"
                >
                  Explore Full Gallery
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ===================== EVENT LIGHTBOX MODAL ===================== */}
      <AnimatePresence>
        {selectedEvent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0c101d] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/20 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer border border-white/15"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
                <div className="lg:col-span-7 bg-black flex items-center justify-center min-h-[300px] lg:min-h-[460px]">
                  {selectedEvent.mediaType === "video" ? (
                    <iframe
                      src={selectedEvent.mediaUrl}
                      title={selectedEvent.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full min-h-[300px] border-0"
                    />
                  ) : (
                    <img
                      src={selectedEvent.mediaUrl}
                      alt={selectedEvent.title}
                      className="max-h-[70vh] w-full object-contain"
                    />
                  )}
                </div>

                <div className="lg:col-span-5 p-7 sm:p-8 flex flex-col justify-between space-y-6 bg-[#0c101d]">
                  <div className="space-y-3">
                    <span className="px-3 py-1 rounded-full bg-white/5 text-[#00c9ff] text-xs font-mono border border-white/15 uppercase">
                      {selectedEvent.category}
                    </span>
                    <h3 className="text-2xl font-light font-serif text-white leading-snug">
                      {selectedEvent.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed pt-2">
                      {selectedEvent.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono text-white/50">
                    <div className="flex items-center justify-between">
                      <span>Date:</span>
                      <span className="text-white">{formatDate(selectedEvent.date)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Format:</span>
                      <span className="text-white">{selectedEvent.format || "Live Experience"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Location:</span>
                      <span className="text-white">{selectedEvent.location || "HRA Groups"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
