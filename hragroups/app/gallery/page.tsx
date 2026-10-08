"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BigPolygonBackground from "@/components/BigPolygonBackground";
import {
  Sparkles,
  Camera,
  Play,
  Quote,
  ArrowRight,
  ExternalLink,
  Award,
  Video,
  Eye,
  X,
  Maximize2,
  Users,
  Compass,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const GALLERY_HERO_PHRASES = [
  "Moments, Media & Milestones",
  "Leadership & Visionary Awards",
  "Celebrations & Team Culture",
  "Milestones That Define Our Journey",
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    title: string;
    desc: string;
    category?: string;
  } | null>(null);

  const { scrollY } = useScroll();
  const heroTranslateY = useTransform(scrollY, [0, 500], [0, -35]);

  // Typewriter text animation state (matching Work, Founder Program & Careers pages)
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [currentText, setCurrentText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [typingSpeed, setTypingSpeed] = React.useState(70);

  React.useEffect(() => {
    const fullText = GALLERY_HERO_PHRASES[phraseIndex];

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
          setPhraseIndex((prev) => (prev + 1) % GALLERY_HERO_PHRASES.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, typingSpeed]);

  // Authentic 19 gallery items from hragroups.com/gallery
  const galleryItems = [
    {
      id: 1,
      title: "Future Ready Leadership Award",
      desc: "CEO Hemanth Pulavarthi proudly receiving the prestigious Future Ready Leadership in IT Education & Placement award at the grand Mumbai leadership summit organized by TheCConnects. This recognition celebrates HRA Groups’ outstanding contribution toward innovation in technology education, professional training, internships, placements, and industry-driven skill development",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/ceo-A0xjR7b7QVtvl5W2.jpg",
      category: "Awards & Recognition",
      tag: "Leadership Award",
    },
    {
      id: 2,
      title: "CEO Insights Address",
      desc: "An inspiring and impactful leadership address delivered by CEO Hemanth Pulavarthi, where he shared the future vision, mission, and growth journey of HRA Groups. During the session, he spoke about the importance of innovation, technology-driven education, industry-focused learning, leadership development, and creating meaningful career opportunities for students and professionals",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/ceovoice-m7VbaR3ewpSX0KEp.jpg",
      category: "Leadership & Vision",
      tag: "Keynote Address",
    },
    {
      id: 3,
      title: "Industry Recognition Award",
      desc: "A proud recognition moment showcasing innovation, excellence, and leadership achievements",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/awards-mjEGnJG0bpf0NJ8Y.jpg",
      category: "Awards & Recognition",
      tag: "Excellence Award",
    },
    {
      id: 4,
      title: "CEO Interview",
      desc: "Exclusive media interview discussing leadership, innovation, and future opportunities",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/ceointerview-Yg2yRN4jjNSByMGb.jpg",
      category: "Leadership & Vision",
      tag: "Media Interview",
    },
    {
      id: 5,
      title: "Leadership & Visionaries of HRA Groups",
      desc: "CEO Hemanth Pulavarthi and Vice President Rajesh represent the leadership strength, innovation, and visionary direction of HRA Groups",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/1-m2WEZKgbQ6cL3EaE.jpg",
      category: "Leadership & Vision",
      tag: "Executive Leadership",
    },
    {
      id: 6,
      title: "Excellence in IT Consulting & Innovation",
      desc: "CEO Hemanth Pulavarthi and Director Praveen Kumar receiving the “Excellence in IT Consulting & Innovation” award",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img-4-zhGWELSQNu8XsYf6.jpg",
      category: "Awards & Recognition",
      tag: "IT Consulting Award",
    },
    {
      id: 7,
      title: "Team at the Event",
      desc: "The HRA Groups team participating together at the industry recognition event, representing innovation, teamwork, and leadership",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img-42-vgxDdCTsCw8mcYdt.jpg",
      category: "Team & Culture",
      tag: "Team Event",
    },
    {
      id: 8,
      title: "Director’s Speech",
      desc: "An impactful speech by Director Praveen Kumar highlighting the mission, growth, and future goals of HRA Groups",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img-23-VEjOHz2zOG4PEi4W.jpg",
      category: "Leadership & Vision",
      tag: "Director Speech",
    },
    {
      id: 9,
      title: "Team Discussion",
      desc: "A collaborative discussion session focused on innovation and future opportunities",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/pic1-Y4LvGJKw3kFzeMRB.jpg",
      category: "Team & Culture",
      tag: "Strategy Session",
    },
    {
      id: 10,
      title: "Featured Article",
      desc: "A media article highlighting the achievements and impact of HRA Groups",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/about-A0xjMe9RDXh233Dv.jpg",
      category: "Awards & Recognition",
      tag: "Press Coverage",
    },
    {
      id: 11,
      title: "Vice President Rajesh at the Event",
      desc: "Vice President Rajesh representing HRA Groups at the leadership networking event",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/vice-president-mv0Jg69MKJCD4l7q.jpg",
      category: "Leadership & Vision",
      tag: "Networking Summit",
    },
    {
      id: 12,
      title: "Award Ceremony",
      desc: "Special recognition moments captured during the prestigious event",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img-111-dkAHxu7bNRyYUykR.jpeg",
      category: "Awards & Recognition",
      tag: "Celebration",
    },
    {
      id: 13,
      title: "Event Glance of Rajesh",
      desc: "A memorable glimpse of Vice President Rajesh during the leadership event",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img-30-gpUhev1VTLZ5eEPW.jpg",
      category: "Leadership & Vision",
      tag: "Event Highlight",
    },
    {
      id: 14,
      title: "Leadership Glance at Summit",
      desc: "Vice President Rajesh engaging with industry leaders during the prestigious leadership summit",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img-55-iwGtvjzqnUhOIowd.jpg",
      category: "Leadership & Vision",
      tag: "Summit Moments",
    },
    {
      id: 15,
      title: "Project Discussion",
      desc: "The HRA Groups team collaborating together through planning and strategy discussions",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/4-YNq20v52rGC6WBWy.jpg",
      category: "Team & Culture",
      tag: "Project Planning",
    },
    {
      id: 16,
      title: "Team Collaboration & Planning",
      desc: "The HRA Groups team collaborating together through discussions, planning sessions, and idea sharing",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img-34-ACGpG5e7IlMGTrYy.jpg",
      category: "Team & Culture",
      tag: "Idea Sharing",
    },
    {
      id: 17,
      title: "December 2025 Award Event",
      desc: "Highlights and memorable moments from the December 2025 award celebration and recognition ceremony",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img222-j9fiRoFCTM5mW271.jpeg",
      category: "Awards & Recognition",
      tag: "Annual Award Gala",
    },
    {
      id: 18,
      title: "Rajesh and Chinna Botla",
      desc: "Vice President Rajesh with Chinna Botla, CEO of TheCConnects",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img-55-bloUeqJtFMmxXHp7.jpg",
      category: "Leadership & Vision",
      tag: "Executive Partnership",
    },
    {
      id: 19,
      title: "Team Lunch & Celebration",
      desc: "A joyful team lunch gathering celebrating teamwork, collaboration, and shared success at HRA Groups",
      src: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/team-gHIAzdVSBOThAnrW.jpeg",
      category: "Team & Culture",
      tag: "Team Celebration",
    },
  ];

  // Authentic Leadership & Employee Videos from official website
  const leadershipVideos = [
    {
      id: "video-1",
      title: "Leadership Vision",
      embedUrl: "https://www.youtube.com/embed/296LwinrIEE",
    },
    {
      id: "video-2",
      title: "Milestone Moment",
      embedUrl: "https://www.youtube.com/embed/dTuePb-uua8",
    },
    {
      id: "video-3",
      title: "Leadership Talk",
      embedUrl: "https://www.youtube.com/embed/Jsc8Kq4i8z4",
    },
  ];

  const employeeVideos = [
    {
      id: "emp-1",
      title: "Employee Experience",
      embedUrl: "https://www.youtube.com/embed/o0mTGPtKe4c",
      desc: "Discover real stories, mentorship experiences, and everyday professional growth from our talented team members",
    },
    {
      id: "emp-2",
      title: "Life at HRA Groups",
      embedUrl: "https://www.youtube.com/embed/_zyzuKG5lZc",
      desc: "A behind-the-scenes look into our collaborative, fast-paced, and innovation-led work culture",
    },
  ];

  const leadershipQuotes = [
    {
      quote: "Leadership is about aligning talent with purpose and opportunity",
      author: "Hemanth Pulavarthi",
      role: "CEO, HRA Groups",
    },
    {
      quote: "Innovation in HR begins with empathy, vision, and execution",
      author: "Praveen Kumar",
      role: "Director, HRA Groups",
    },
    {
      quote: "Every milestone reflects the collective strength of our people",
      author: "Rajesh",
      role: "Vice President, HRA Groups",
    },
  ];

  const [dbItems, setDbItems] = useState<any[]>([]);

  // Fetch dynamic gallery items from database while preserving all original 19 items
  React.useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.items) {
          const mapped = data.items.map((it: any) => ({
            id: it.id,
            title: it.title,
            desc: it.desc || "",
            src: it.src,
            category: it.category || "Awards & Recognition",
            tag: it.tag || "Gallery Feature",
          }));
          setDbItems(mapped);
        }
      })
      .catch((err) => console.error("Error fetching gallery items:", err));
  }, []);

  const allGalleryItems = React.useMemo(() => {
    return [...dbItems, ...galleryItems];
  }, [dbItems]);

  const categories = ["All", "Awards & Recognition", "Leadership & Vision", "Team & Culture"];

  const filteredItems =
    activeCategory === "All"
      ? allGalleryItems
      : allGalleryItems.filter((item) => item.category === activeCategory);

  // Auto slider state for Hero 3D Visual Diary Carousel
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const heroSliderImages = allGalleryItems.slice(0, 7);

  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % heroSliderImages.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [heroSliderImages.length, isPaused]);

  const handlePrevSlide = () => {
    setSliderIndex((prev) => (prev - 1 + heroSliderImages.length) % heroSliderImages.length);
  };

  const handleNextSlide = () => {
    setSliderIndex((prev) => (prev + 1) % heroSliderImages.length);
  };

  return (
    <div className="ibase-landing-bg text-white min-h-screen selection:bg-[#00c9ff]/30 selection:text-[#00c9ff] relative overflow-hidden font-sans">
      <Navbar />

      {/* Global Background Atmospheric Layer (Large Architectural Polygonal Structures - Exact Match to Work & Founder Program) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        <BigPolygonBackground opacityClass="opacity-80" />
        <div className="absolute top-[15%] -left-[10%] w-[650px] h-[650px] bg-[#00c9ff]/[0.035] rounded-full blur-[200px]" />
        <div className="absolute top-[55%] -right-[15%] w-[750px] h-[750px] bg-[#1e1cb0]/[0.045] rounded-full blur-[220px]" />
      </div>

      <main className="relative z-20">
        {/* CLEAN MINIMALIST HERO WITH ULTRA-SMOOTH ENLARGED 3D PHOTO SLIDER */}
        <section className="pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-12 text-center overflow-hidden">
          <motion.div
            style={{ y: heroTranslateY }}
            className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 space-y-4 sm:space-y-6"
          >
            {/* Animated Headline with Typewriter effect */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-4xl mx-auto"
            >
              <div className="min-h-[80px] sm:min-h-[110px] md:min-h-[130px] flex items-center justify-center w-full px-2">
                <h1 className="text-[34px] sm:text-[48px] md:text-[56px] lg:text-[66px] font-normal tracking-[-0.035em] leading-[1.08] text-white font-serif">
                  <span className="bg-gradient-to-r from-white via-slate-100 to-[#00c9ff] bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(255,255,255,0.2)]">
                    {currentText}
                  </span>
                  <span className="text-[#00c9ff] ml-1.5 font-light animate-[pulse_1s_infinite]">|</span>
                </h1>
              </div>
            </motion.div>

          {/* ENLARGED 3D PHOTO SLIDER */}
          <div
            className="w-full max-w-[1500px] mx-auto pt-1 pb-1"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative h-[400px] sm:h-[500px] md:h-[560px] lg:h-[600px] flex items-center justify-center [perspective:1800px] overflow-hidden select-none">
              {heroSliderImages.map((item, index) => {
                const total = heroSliderImages.length;
                let offset = (index - sliderIndex + total) % total;
                if (offset > total / 2) offset -= total;

                // Render items within visual range
                const isCenter = offset === 0;
                const absOffset = Math.abs(offset);
                const isVisible = absOffset <= 3;
                const zIndex = 30 - absOffset * 8;

                // Responsive translation and 3D rotation
                const xOffset = offset * (typeof window !== "undefined" && window.innerWidth < 640 ? 170 : 340);
                const scale = isCenter ? 1 : Math.max(0.74, 0.88 - absOffset * 0.08);
                const rotateY = offset * -14;
                const opacity = isVisible ? (isCenter ? 1 : Math.max(0.35, 0.75 - absOffset * 0.15)) : 0;

                return (
                    <motion.div
                      key={item.id}
                      animate={{
                        x: xOffset,
                        scale: scale,
                        rotateY: rotateY,
                        opacity: opacity,
                        zIndex: zIndex,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 26,
                        mass: 0.65,
                      }}
                      onClick={() => {
                        if (isCenter) {
                          setSelectedImage(item);
                        } else {
                          setSliderIndex(index);
                        }
                      }}
                      className={`absolute cursor-pointer rounded-3xl sm:rounded-[36px] overflow-hidden will-change-transform ${isCenter
                        ? "shadow-[0_25px_80px_rgba(0,201,255,0.35)] ring-4 ring-[#00c9ff]/50 cursor-zoom-in"
                        : "shadow-xl ring-1 ring-white/10 hover:ring-[#00c9ff]/40"
                        }`}
                      style={{
                        width: typeof window !== "undefined" && window.innerWidth < 640 ? "290px" : "460px",
                        height: typeof window !== "undefined" && window.innerWidth < 640 ? "370px" : "540px",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* Uncropped Full Image */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover object-center pointer-events-none"
                        loading="lazy"
                      />

                      {/* Gradient overlay on active card */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-left text-white transition-opacity duration-300 ${isCenter ? "opacity-100" : "opacity-0 hover:opacity-100"
                          }`}
                      >
                        <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black text-[11px] sm:text-xs font-bold uppercase tracking-wider w-max mb-2 shadow-sm">
                          {item.tag}
                        </span>
                        <h3 className="text-lg sm:text-2xl font-light font-serif leading-snug line-clamp-2 text-white">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#00c9ff] pt-1.5 font-mono flex items-center gap-1.5">
                          <span>Click to view in full resolution</span>
                          <span>→</span>
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Slider Navigation Controls */}
              <div className="flex items-center justify-center gap-4 pt-5 sm:pt-6">
                <button
                  onClick={handlePrevSlide}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-[#00c9ff] hover:text-black border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <div className="flex items-center gap-2.5">
                  {heroSliderImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSliderIndex(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${sliderIndex === i ? "w-8 bg-[#00c9ff]" : "w-2.5 bg-white/20 hover:bg-white/40"
                        }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextSlide}
                  className="w-12 h-12 rounded-full bg-white/5 hover:bg-[#00c9ff] hover:text-black border border-white/15 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* LEADERSHIP VIDEOS SECTION */}
        <section id="videos" className="py-16 sm:py-20 border-b border-white/10 transition-colors duration-300">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 space-y-12">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <Video className="w-3.5 h-3.5 text-[#00c9ff]" />
                <span>Featured Media</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight font-serif">
                Leadership Videos
              </h2>
              <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Exclusive interviews, leadership insights, and milestone media highlights from HRA Groups
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {leadershipVideos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#00c9ff]/50 overflow-hidden shadow-sm hover:shadow-[0_20px_45px_rgba(0,201,255,0.15)] transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-video w-full bg-black">
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                  <div className="p-6 flex items-center justify-between border-t border-white/10 bg-black/40">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/5 text-[#00c9ff] flex items-center justify-center font-bold">
                        <Play className="w-4 h-4 fill-[#00c9ff]" />
                      </div>
                      <h3 className="text-base sm:text-lg font-light text-white group-hover:text-[#00c9ff] transition-colors">
                        {video.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-[#00c9ff] uppercase tracking-wider">
                      Watch
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* RECOGNITIONS & HIGHLIGHTS - FULL 19 CARDS GALLERY */}
        <section id="highlights" className="py-20 sm:py-24 border-b border-white/10 transition-colors duration-300">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 space-y-12">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-3 max-w-xl"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                  <Camera className="w-3.5 h-3.5 text-[#00c9ff]" />
                  <span>Gallery &amp; Recognitions</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight font-serif">
                  Recognitions &amp; Highlights
                </h2>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                  Explore awards, leadership moments, networking events, team collaborations, achievements, and milestones of HRA Groups
                </p>
              </motion.div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                {categories.map((cat) => {
                  const active = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer capitalize z-10 whitespace-nowrap ${active
                        ? "text-black font-semibold"
                        : "text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                        }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="activeGalleryFilter"
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

            {/* Pure Full-Image Natural Masonry Grid (Preserves 100% true proportions without any cropping) */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.03,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedImage(item)}
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 break-inside-avoid bg-black/50 border border-white/10 hover:border-[#00c9ff]/50"
                >
                  {/* 100% Natural Proportion Image with ZERO Cropping */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-auto block rounded-2xl sm:rounded-3xl transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80";
                    }}
                  />

                  {/* Dark Glassmorphism Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl sm:rounded-3xl" />

                  {/* Top Category Badge on Hover */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[#00c9ff] text-xs font-mono border border-white/15">
                      {item.tag}
                    </span>
                  </div>

                  {/* Quick Expand Icon in Corner on Hover */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md z-10 border border-white/15">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Bottom Title & Click Prompt on Hover */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-1 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 z-10">
                    <div className="text-[11px] font-mono text-[#00c9ff] uppercase tracking-wider">
                      {item.category}
                    </div>
                    <h3 className="text-base sm:text-lg font-light font-serif leading-snug line-clamp-2 text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#00c9ff] pt-1 font-mono flex items-center gap-1.5">
                      <span>Click to view full story &amp; details</span>
                      <span>→</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* EMPLOYEE VOICES SECTION */}
        <section className="py-20 border-b border-white/10 transition-colors duration-300">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 space-y-12">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <Users className="w-3.5 h-3.5 text-[#00c9ff]" />
                <span>Voices of HRA</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight font-serif">
                Employee Voices
              </h2>
              <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Stories straight from the people who power HRA Groups
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {employeeVideos.map((video, idx) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#00c9ff]/50 overflow-hidden shadow-sm hover:shadow-[0_20px_45px_rgba(0,201,255,0.15)] transition-all duration-300"
                >
                  <div className="relative aspect-video w-full bg-black">
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                  <div className="p-6 sm:p-7 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#00c9ff]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Real Stories</span>
                    </div>
                    <h3 className="text-xl font-light text-white group-hover:text-[#00c9ff] transition-colors font-serif">
                      {video.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                      {video.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* LEADERSHIP VOICES / QUOTES SECTION */}
        <section className="py-20 sm:py-24 border-b border-white/10 transition-colors duration-300">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 space-y-14">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <Quote className="w-3.5 h-3.5 text-[#00c9ff]" />
                <span>Leadership Insights</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight font-serif">
                Leadership Voices
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadershipQuotes.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[#00c9ff]/50 hover:shadow-[0_20px_45px_rgba(0,201,255,0.12)] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-[#00c9ff] flex items-center justify-center group-hover:bg-[#00c9ff] group-hover:text-black transition-colors duration-300">
                      <Quote className="w-6 h-6" />
                    </div>
                    <p className="text-base sm:text-lg text-white/80 italic font-light leading-relaxed font-serif">
                      “{item.quote}”
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10">
                    <div className="font-medium text-white text-base">{item.author}</div>
                    <div className="text-xs font-mono text-[#00c9ff]">{item.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-16 sm:py-20 bg-black/60 text-white relative overflow-hidden border-t border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,201,255,0.12),transparent_70%)] pointer-events-none" />

          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto space-y-4"
            >
              <span className="text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                Join the Movement
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight font-serif">
                Be Part of Our Next Milestone
              </h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                Whether you are an ambitious student, experienced professional, or corporate partner, collaborate with HRA Groups to shape the future.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/careers"
                  className="px-9 py-3.5 rounded-full bg-[#00c9ff] hover:bg-[#0070f3] text-black font-semibold text-sm shadow-[0_8px_30px_rgba(0,201,255,0.35)] transition-all duration-200 hover:scale-[1.03]"
                >
                  Explore Careers
                  <ArrowRight className="w-4 h-4 inline-block ml-2" />
                </Link>
                <Link
                  href="/internship"
                  className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-medium text-sm backdrop-blur-sm transition-all duration-200"
                >
                  Apply for Internships
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-[#0c1427] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/20 dark:border-slate-800 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
                <div className="lg:col-span-7 bg-black flex items-center justify-center min-h-[300px] lg:min-h-[460px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="max-h-[70vh] w-full object-contain"
                  />
                </div>

                <div className="lg:col-span-5 p-7 sm:p-8 flex flex-col justify-between space-y-6 bg-white dark:bg-[#0c1427]">
                  <div className="space-y-3">
                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0052cc] dark:text-sky-300 text-xs font-bold uppercase tracking-wider border dark:border-blue-800/60">
                      {selectedImage.category || "HRA Groups Milestone"}
                    </span>
                    <h3 className="text-2xl font-bold text-[#001f4d] dark:text-white leading-snug">
                      {selectedImage.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
                      {selectedImage.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      HRA Groups Official Media
                    </span>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="px-5 py-2.5 rounded-xl bg-[#0052cc] text-white font-bold text-xs hover:bg-[#003882] transition-colors cursor-pointer"
                    >
                      Close
                    </button>
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
