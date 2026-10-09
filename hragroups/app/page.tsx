"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TCSDarkHeroBackground from "@/components/TCSDarkHeroBackground";
import IBasePolygonBackground from "@/components/IBasePolygonBackground";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Building,
  HeartPulse,
  Flame,
  Cpu,
  Factory,
  Shield,
  Truck,
  Globe2,
  Code2,
  Cloud,
  PenTool,
} from "lucide-react";

// Rotating typewriter phrases for HRA Groups
const TYPEWRITER_PHRASES = [
  "Welcome to HRA Groups",
  "Hope + Resilience + Aspire",
  "We specialize in IT Services & Consultancy",
  "Driving Innovation & Excellence",
  "Empowering Businesses in the Digital Era",
  "Next-Gen Digital & AI Solutions",
];

const CAPABILITIES = [
  {
    num: "01",
    title: "AI & Intelligent Automation",
    desc: "Agentic systems, workflow automation, custom models, and LLM integrations across enterprise operations",
    bullets: ["Multi-agent solutions", "Custom LLM fine-tuning", "Workflow automation"],
  },
  {
    num: "02",
    title: "Cloud & Infrastructure",
    desc: "Edge-to-cloud infrastructure, MLOps pipelines, and data orchestration built to scale with AI ambition",
    bullets: ["MLOps pipelines", "Edge / multi-cloud", "Data orchestration"],
  },
  {
    num: "03",
    title: "Product Engineering",
    desc: "Full lifecycle development, digital strategy, and AI-infused product builds — concept to production",
    bullets: ["Zero-to-one builds", "Digital strategy", "Quality engineering"],
  },
  {
    num: "04",
    title: "Data & Insights",
    desc: "Pipelines, governance, decision intelligence — the foundation every AI initiative actually rests on",
    bullets: ["Data pipelines", "Governance", "Decision intelligence"],
  },
  {
    num: "05",
    title: "AI Strategy & Roadmap",
    desc: "Readiness assessment, adoption strategy, responsible-AI guardrails — and a sequenced ROI roadmap",
    bullets: ["Readiness audits", "Adoption strategy", "Responsible AI"],
  },
];

const TESTIMONIALS = [
  {
    initials: "BO",
    company: "Boursa Kuwait",
    author: "Shakeel Haider",
    role: "Delivery Director IT Services, Boursa Kuwait",
    linkedin: "https://www.linkedin.com/",
    featured: true,
    quote:
      "IBaseIT's Quality Engineering services have been a game-changer for Boursa Kuwait. It helped to evolve the core by Automation, scaled Agile, and cloud platforms to evaluate application development, testing, and infrastructure. Their tailored solutions and rigorous testing boosted efficiency and client satisfaction. QATTS' automation features like data-driven testing, Multi Branch Support and CI/CD capabilities further enhanced our financial gains",
  },
  {
    initials: "AR",
    company: "ArrowStream",
    author: "Matt Heckroth",
    role: "Sr. Director of Product Management, ArrowStream",
    linkedin: "https://www.linkedin.com/",
    featured: false,
    quote:
      "At ArrowStream, we prioritize supply chain optimization. IBaseIT mobile app integration was crucial, delivering a secure, feature-rich solution that empowers clients on-the-go. Their expertise and agile approach ensured timely delivery and adaptability, showcasing our commitment to quality",
  },
  {
    initials: "EN",
    company: "Envoy Global",
    author: "Mahi Inampudi",
    role: "CTO & President, Envoy Global",
    linkedin: "https://www.linkedin.com/",
    featured: false,
    quote:
      "As the CTO of Envoy Global, Inc., I am excited to endorse IBaseIT for their exceptional expertise in developing process automation software using Microsoft PowerApps and Power Automate. Their tailored solutions, including an internal automation technology for processing large PDFs seamlessly, have significantly improved our efficiency and productivity",
  },
  {
    initials: "WI",
    company: "Wilco Source",
    author: "Suresh Kankanala",
    role: "Chief Technology Officer, Wilco Source",
    linkedin: "https://www.linkedin.com/",
    featured: false,
    quote:
      "IBaseIT has been a reliable partner in supporting our healthcare and pharmaceutical clients through their expertise in Application Development, Mobile Development, and Testing services. Their team consistently demonstrates strong technical capability, responsiveness, and a strong commitment to quality delivery.",
  },
  {
    initials: "KI",
    company: "Kidde Global Solutions",
    author: "Kiran Anamolu",
    role: "Site Leader, Director Engineering",
    linkedin: "https://www.linkedin.com/",
    featured: false,
    quote:
      "Since 2022, IBaseIT has been a valuable partner in supporting our Digital Transformation initiatives. Their team has contributed across Product Engineering, Mobile Development, Testing, and AWS Cloud Solutions & Development, consistently delivering high-quality solutions & demonstrating strong technical expertise.",
  },
];

// Authentic verified client brand logos from /clients page
const CLIENT_LOGOS = [
  {
    name: "ABH IT Solutions",
    logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/abhitsolutions-YX4xMrgxxVulNQ5z.jpg",
  },
  {
    name: "RN Innovation Technologies",
    logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/rninnovation-Y4Lv1ZXv5XuMxnDW.jpg",
  },
  {
    name: "Vectura Earthmoving Pvt. Ltd.",
    logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/vectura-voDSefIB5Jsiyex0.jpg",
  },
  {
    name: "Madhurams Malikipuram",
    logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/madhurams-Y4Lv1ZXvPEsB5qWZ.jpg",
  },
  {
    name: "TheCconnects",
    logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/thecconnects_logo-ncUALeZwo63vmLgH.jpg",
  },
  {
    name: "HCL",
    logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/hcl-A0xjM8XjWVFaZeRL.png",
  },
  {
    name: "Wipro",
    logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/wipro-mnlJwrKJnohe9w2o.png",
  },
  {
    name: "Tombest Mining",
    logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/logo-urDNMS5El0aAyQDq.png",
  },
  {
    name: "SyncPedia",
    logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/sync-crVbaCLObzJvgYYZ.webp",
  },
  {
    name: "Gayathri Infra Pvt. Ltd.",
    logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/gayathri-logo-wagZAeYtR4L21PHp.jpg",
  },
  {
    name: "K-Learn World",
    logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/klearnworld-removebg-preview-1-IqhmGHxpOobd1AaG.png",
  },
  {
    name: "Shield Workz",
    logo: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/shield-workz-gZFp9ZzZCR8yMimX.png",
  },
];

// The Collection moments with authentic video assets from hragroupswebsite-psi.vercel.app
const COLLECTION_ITEMS = [
  {
    id: 1,
    number: "01",
    title: "Internship Experience",
    category: "INTERNSHIPS",
    type: "video",
    media: "https://hragroupswebsite-psi.vercel.app/assets/internexpreince-DqsfGd7X.mp4",
    description: "Real learning, practical exposure and experiences that help emerging talent move closer to the professional world.",
  },
  {
    id: 2,
    number: "02",
    title: "Founder Program",
    category: "FOUNDER PROGRAM",
    type: "video",
    media: "https://hragroupswebsite-psi.vercel.app/assets/founderconnect-B-kGXUm9.mp4",
    description: "Ideas, conversations and connections that help aspiring founders move from possibility toward action.",
  },
  {
    id: 3,
    number: "03",
    title: "Technology Workshop",
    category: "WORKSHOPS",
    type: "video",
    media: "https://hragroupswebsite-psi.vercel.app/assets/Technology%20Workshop-DhA_BgOM.mp4",
    description: "Hands-on technology learning designed around practical skills, experimentation and real-world thinking.",
  },
  {
    id: 4,
    number: "04",
    title: "HRA Hackathon",
    category: "HACKATHON",
    type: "video",
    media: "https://hragroupswebsite-psi.vercel.app/assets/hAC-Ddg1rOEo.mp4",
    description: "A high-energy environment where ideas, technology and teamwork come together to create something meaningful.",
  },
  {
    id: 5,
    number: "05",
    title: "Team HRA",
    category: "TEAM",
    type: "video",
    media: "https://hragroupswebsite-psi.vercel.app/assets/EEMO-B-yefoGI.mp4",
    description: "The people behind the ideas, products, programs and everyday work that shape the HRA ecosystem.",
  },
  {
    id: 6,
    number: "06",
    title: "Achievements",
    category: "ACHIEVEMENTS",
    type: "video",
    media: "https://hragroupswebsite-psi.vercel.app/assets/V-2%20(1)-ZmECZi53.mp4",
    description: "A look at milestones, recognition and moments that reflect the progress of the HRA community.",
  },
];

const COLLECTION_CATEGORIES = [
  "ALL",
  "INTERNSHIPS",
  "FOUNDER PROGRAM",
  "WORKSHOPS",
  "HACKATHON",
  "TEAM",
  "ACHIEVEMENTS",
];

export default function Home() {
  // Typewriter Animation State
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  // Gallery Collection State
  const [collectionCategory, setCollectionCategory] = useState("ALL");
  const [activeMoment, setActiveMoment] = useState<typeof COLLECTION_ITEMS[0] | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  // Capability rail scroll ref
  const railRef = React.useRef<HTMLDivElement>(null);

  const scrollRail = (direction: "left" | "right") => {
    if (railRef.current) {
      const scrollAmount = 360;
      railRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fullText = TYPEWRITER_PHRASES[phraseIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(60);

        if (currentText.length + 1 === fullText.length) {
          // Pause when word is completely typed
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting backward
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(35);

        if (currentText.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, typingSpeed]);

  return (
    <div className="ibase-landing-bg text-white min-h-screen selection:bg-[#00c9ff]/30 selection:text-[#00c9ff] relative overflow-hidden font-sans">
      <Navbar />

      {/* Global Background Atmospheric Grids, Moving Polygon Constellation Lines matching screenshot */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        {/* Exact IBaseIT Large Polygon Constellation Lines on pitch black */}
        <IBasePolygonBackground />

        {/* Subtle Cyber Glowing Orbs (Toned down for true black focus) */}
        <div className="absolute top-[20%] -left-[10%] w-[600px] h-[600px] bg-[#00c9ff]/[0.02] rounded-full blur-[200px] ibase-orb-cyan" />
        <div className="absolute top-[40%] -right-[15%] w-[700px] h-[700px] bg-[#1e1cb0]/[0.04] rounded-full blur-[220px] ibase-orb-violet" />
        <div className="absolute top-[65%] left-[5%] w-[600px] h-[600px] bg-[#00c9ff]/[0.02] rounded-full blur-[200px] ibase-orb-cyan" />
        <div className="absolute top-[85%] right-[10%] w-[700px] h-[700px] bg-[#1e1cb0]/[0.04] rounded-full blur-[220px] ibase-orb-violet" />
      </div>

      <main className="relative z-20">
        {/* ===================== HERO SECTION ===================== */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-between pt-36 pb-20 overflow-hidden">
          {/* Full-bleed Full Screen Background Animation & Canvas */}
          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <TCSDarkHeroBackground />
          </div>

          {/* IBaseIT SVG Network Cyber Grid Overlay */}
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0, 201, 255, 0.15) 0%, transparent 70%)`
            }}
          />

          {/* Hero Content Container (Max width centered) */}
          <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col items-center justify-between flex-1 text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center space-y-8 mt-6">
              {/* Pill Tag */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0a0c12]/80 border border-white/15 backdrop-blur-md shadow-lg group hover:border-[#00c9ff]/40 transition-colors"
              >
                <span className="text-xs sm:text-[13px] font-medium text-white/80">
                  We Engineer AI That Performs in Real World
                </span>
                <span className="text-white/40 text-sm group-hover:translate-x-0.5 transition-transform text-[#00c9ff]">
                  ›
                </span>
              </motion.div>

              {/* Typewriter Display Headline with Exact IBaseIT Geometric Typography */}
              <div className="h-[90px] sm:h-[130px] md:h-[150px] flex items-center justify-center w-full px-2">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-semibold text-white tracking-[-0.03em] leading-[1.08] text-center" style={{ fontFamily: 'var(--font-manrope), "Plus Jakarta Sans", sans-serif' }}>
                  <span className="text-white drop-shadow-[0_2px_18px_rgba(255,255,255,0.2)]">{currentText}</span>
                  <span className="text-[#00c9ff] ml-1.5 font-light animate-[pulse_1s_infinite]">|</span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
                Proprietary engineering methodologies connecting AI, multi-cloud platforms, and autonomous systems into measurable business performance.
              </p>
            </div>

            {/* Hero 2-Column Action Cards */}
            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pt-16 border-t border-white/10 mt-12 text-center">
              <div className="flex flex-col items-center space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Scale Enterprise Technology With HRA
                </h3>
                <p className="text-sm text-white/60 max-w-sm">
                  Build reliable software, cloud systems, and AI.
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="ibase-btn-ghost text-sm font-medium px-6 py-2.5"
                  >
                    Talk to Us
                  </Link>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Launch Your Tech Career &amp; Training
                </h3>
                <p className="text-sm text-white/60 max-w-sm">
                  Join verified internships, courses, and hackathons
                </p>
                <div className="pt-2">
                  <Link
                    href="/internship"
                    className="ibase-btn-ghost text-sm font-medium px-6 py-2.5"
                  >
                    Explore Programs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== BRANDS AUTO MOVE SLIDER SECTION ===================== */}
        <section className="relative py-16 sm:py-20 w-full overflow-hidden ibase-section-divider">
          {/* Subtle ambient lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-[#00c9ff]/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-3 mb-10 relative z-10">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#00c9ff]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/50 font-medium">
                TRUSTED PARTNERSHIPS
              </span>
              <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#00c9ff]" />
            </div>
            <p className="text-sm sm:text-base text-white/70 font-normal">
              Forward-thinking companies scaling with HRA Groups
            </p>
          </div>

          {/* Left & Right gradient edge masks for seamless fade out like the screenshot */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#06070b] via-[#06070b]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#06070b] via-[#06070b]/80 to-transparent z-20 pointer-events-none" />

          {/* Infinite Marquee Strip */}
          <div className="relative w-full overflow-x-hidden py-3 z-10">
            <div className="animate-marquee flex items-center gap-6 sm:gap-8 whitespace-nowrap">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, idx) => (
                <div
                  key={idx}
                  className="h-20 sm:h-24 w-48 sm:w-60 bg-white rounded-2xl border border-white/20 p-4 sm:p-5 flex items-center justify-center shrink-0 shadow-lg hover:shadow-[0_0_25px_rgba(0,201,255,0.3)] hover:border-[#00c9ff]/60 hover:scale-105 transition-all duration-300 group cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain filter group-hover:scale-108 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== HRA SERVICES SECTION ===================== */}
        <section id="services" className="relative py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto ibase-section-divider">
          {/* Ambient Glow */}
          <div className="absolute top-1/3 -left-20 w-[600px] h-[400px] bg-[#00c9ff]/10 rounded-full blur-[160px] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 relative z-10">
            <div>
              <div className="ibase-eyebrow">WHAT WE BUILD</div>
              <h2 className="ibase-h-display">
                Services Designed For <em>Growth & Scale</em>
              </h2>
            </div>
            <p className="text-sm text-white/50 max-w-sm">
              We design and engineer digital systems, intelligent platforms, and modern experiences for ambitious businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {[
              {
                number: "01",
                category: "ENGINEERING",
                title: "Software Development",
                short: "Scalable digital products engineered around your business goals.",
                description: "From idea to deployment, we design and develop reliable software that is fast, secure, scalable, and built for long-term growth.",
                technologies: ["React", "Node.js", "Python", "Java", "Next.js", "PostgreSQL"],
                solutions: ["Web Applications", "Custom Software", "SaaS Platforms", "Business Applications", "API Development", "Cloud Applications"],
                link: "/services/software-development",
                symbol: "⌘"
              },
              {
                number: "02",
                category: "STRATEGY",
                title: "IT Consultancy",
                short: "Clear technology decisions that move your business forward.",
                description: "We help organizations identify technology opportunities, solve complex challenges, modernize systems, and create practical digital strategies.",
                technologies: ["Cloud", "DevOps", "Cybersecurity", "Architecture", "Databases", "Automation"],
                solutions: ["Technology Consulting", "Digital Transformation", "Cloud Strategy", "System Architecture", "Technology Audits", "Process Optimization"],
                link: "/services/it-consultancy",
                symbol: "◈"
              },
              {
                number: "03",
                category: "INTELLIGENCE",
                title: "AI & Automation",
                short: "Intelligent systems that automate work and unlock new possibilities.",
                description: "We build practical AI solutions that help businesses automate repetitive processes, understand data, improve decisions, and create better customer experiences.",
                technologies: ["Python", "Machine Learning", "Generative AI", "LLMs", "APIs", "Data Analytics"],
                solutions: ["AI Assistants", "Workflow Automation", "Predictive Analytics", "AI Integrations", "Document Intelligence", "Business Intelligence"],
                link: "/services/ai-solutions",
                symbol: "✦"
              },
              {
                number: "04",
                category: "EXPERIENCE",
                title: "Digital Experiences",
                short: "Modern interfaces designed to make technology feel effortless.",
                description: "We create polished digital experiences that combine thoughtful UX, strong visual systems, accessibility, and high-performance technology.",
                technologies: ["Figma", "React", "Next.js", "UI/UX", "Motion", "Design Systems"],
                solutions: ["Website Development", "UI/UX Design", "Product Design", "Design Systems", "Landing Pages", "Digital Platforms"],
                link: "/services/digital-experiences",
                symbol: "↗"
              }
            ].map((srv) => (
              <Link
                key={srv.title}
                href={srv.link}
                className="p-10 rounded-2xl bg-[#0a0c12]/80 backdrop-blur-md border border-white/10 hover:bg-[#0d1018] hover:border-[#00c9ff]/40 transition-all duration-300 flex flex-col justify-between group relative min-h-[380px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono tracking-widest uppercase text-white/40">
                      SERVICE <b className="text-[#00c9ff]">{srv.number}</b> · {srv.category}
                    </span>
                    <span className="text-xl text-[#00c9ff] group-hover:scale-125 transition-transform">
                      {srv.symbol}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00c9ff] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-white/70 font-medium mb-3">
                    {srv.short}
                  </p>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {srv.solutions.slice(0, 3).map((sol) => (
                      <span key={sol} className="text-xs px-3 py-1 rounded-full border border-white/15 text-white/70">
                        {sol}
                      </span>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-white/10 text-xs text-white/60 flex items-center justify-between group-hover:text-white transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00c9ff]" />
                      <span>{srv.technologies.slice(0, 4).join(" · ")}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#00c9ff] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===================== SELECTED WORK / CASE STUDIES ===================== */}
        <section id="work" className="relative py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto ibase-section-divider">
          {/* Ambient Glow */}
          <div className="absolute top-1/4 right-0 w-[500px] h-[350px] bg-[#1e1cb0]/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 relative z-10">
            <div>
              <div className="ibase-eyebrow">SELECTED WORK</div>
              <h2 className="ibase-h-display">
                Ideas In <em>Action</em>
              </h2>
            </div>
            <p className="text-sm text-white/50 max-w-sm">
              We turn ambitious ideas into useful digital products, intelligent systems and experiences that create meaningful value.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {[
              {
                id: 1,
                number: "01",
                title: "MediaHub",
                category: "WEB PLATFORM",
                type: "SOFTWARE",
                description: "A modern digital platform designed to bring content, users and business operations together through one seamless digital experience.",
                image: "https://hragroupswebsite-psi.vercel.app/assets/mediahubPic-C7zqN69E.png",
                tags: ["React", "Node.js", "Database"],
                link: "/services/software-development"
              },
              {
                id: 2,
                number: "02",
                title: "HRA Internship Platform",
                category: "EDUCATION",
                type: "SOFTWARE",
                description: "A structured digital platform connecting students, internships, projects and program operations in one connected environment.",
                image: "https://hragroupswebsite-psi.vercel.app/assets/HRA%20Internship%20Platform-CEce0vXc.png",
                tags: ["React", "Platform", "Automation"],
                link: "/internship"
              },
              {
                id: 3,
                number: "03",
                title: "Business Management System",
                category: "BUSINESS",
                type: "SOFTWARE",
                description: "A centralized business system created to simplify workflows, organize information and improve operational visibility.",
                image: "https://hragroupswebsite-psi.vercel.app/assets/Business%20Management%20System-yEUPX7Gh.png",
                tags: ["Web App", "Dashboard", "Database"],
                link: "/services/software-development"
              },
              {
                id: 4,
                number: "04",
                title: "AI Business Assistant",
                category: "AI & AUTOMATION",
                type: "AI",
                description: "An intelligent assistant concept designed to help businesses automate repetitive tasks, access information and work more efficiently.",
                image: "https://hragroupswebsite-psi.vercel.app/assets/Business%20Assistant-CR4vqKpm.png",
                tags: ["AI", "Python", "Automation"],
                link: "/services/ai-solutions"
              }
            ].map((work) => (
              <Link
                key={work.title}
                href={work.link}
                className="rounded-2xl bg-[#0a0c12]/80 backdrop-blur-md border border-white/10 hover:border-[#00c9ff]/40 hover:bg-[#0d1018] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="h-48 bg-[#0c0e16] border-b border-white/10 relative flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-4 text-[10px] font-mono tracking-widest text-[#00c9ff] uppercase bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                      {work.number} / {work.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#00c9ff]">
                      {work.type}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-[#00c9ff] transition-colors">
                      {work.title}
                    </h4>
                    <p className="text-xs text-white/60 line-clamp-3 leading-relaxed">
                      {work.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-4">
                  <div className="pt-4 border-t border-white/10 text-xs text-white/60 flex items-center justify-between">
                    <span>{work.tags.join(" · ")}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#00c9ff] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===================== WHY HRA (APPROACH) ===================== */}
        <section className="relative py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto ibase-section-divider">
          {/* Ambient Glow */}
          <div className="absolute top-1/3 left-10 w-[500px] h-[350px] bg-[#00c9ff]/10 rounded-full blur-[150px] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 relative z-10">
            <div>
              <div className="ibase-eyebrow">THE HRA APPROACH</div>
              <h2 className="ibase-h-display">
                Technology Talent<br />
                <em>Entrepreneurship</em>
              </h2>
            </div>
            <p className="text-sm text-white/50 max-w-sm">
              HRA Groups brings technology, people and entrepreneurship together to create meaningful digital possibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {[
              {
                number: "01",
                code: "BUILD / SYSTEMS",
                title: "Build",
                description: "We turn real business challenges into focused digital products, intelligent systems and technology that works.",
                accent: "Technology",
                icon: "⌘"
              },
              {
                number: "02",
                code: "DEVELOP / TALENT",
                title: "Develop",
                description: "We create practical environments where people learn technology by working with real tools, real projects and real outcomes.",
                accent: "Talent",
                icon: "◈"
              },
              {
                number: "03",
                code: "CREATE / FOUNDERS",
                title: "Create",
                description: "We help aspiring entrepreneurs move from an idea to a clearer direction through technology, guidance and execution.",
                accent: "Entrepreneurship",
                icon: "✦"
              }
            ].map((item) => (
              <div
                key={item.number}
                className="p-8 rounded-2xl bg-[#0a0c12]/80 backdrop-blur-md border border-white/10 hover:border-[#00c9ff]/40 hover:bg-[#0d1018] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono tracking-widest text-[#00c9ff]">
                      {item.number} / {item.code}
                    </span>
                    <span className="text-lg text-white/40">{item.icon}</span>
                  </div>

                  <span className="text-xs font-medium text-white/50 uppercase tracking-wider block mb-1">
                    {item.accent}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-white/50">
                  <span>HRA Ecosystem</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00c9ff]" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== PROGRAMS (INTERNSHIP & FOUNDER) ===================== */}
        <section id="programs" className="relative py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto ibase-section-divider">
          {/* Ambient Glow */}
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-[#1e1cb0]/15 rounded-full blur-[160px] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 relative z-10">
            <div>
              <div className="ibase-eyebrow">ECOSYSTEM INITIATIVES</div>
              <h2 className="ibase-h-display">
                Talent &amp; Founder <em>Programs</em>
              </h2>
            </div>
            <p className="text-sm text-white/50 max-w-sm">
              Empowering next-generation builders with practical exposure, mentorship, and launchpad infrastructure.
            </p>
          </div>

          {/* 1. Boxless Talent Acceleration Section */}
          <div className="relative py-12 sm:py-16 lg:py-20 mb-16 overflow-hidden">
            {/* Background Image (image2.jpeg) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/image2.jpeg"
              alt="Talent Acceleration"
              className="absolute inset-0 w-full h-full object-cover object-[70%_center] md:object-[75%_center] lg:object-right pointer-events-none opacity-90"
            />

            {/* Seamless Edge Gradient Fades (Blends directly with page background) */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#04060c] via-[#04060c]/95 via-45% md:via-[#04060c]/75 md:via-50% to-[#04060c]/20 lg:to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04060c] via-transparent to-[#04060c] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#04060c] via-transparent to-[#04060c] pointer-events-none" />

            {/* Ambient Lighting */}
            <div className="absolute top-1/2 -left-20 w-[450px] h-[450px] bg-[#00c9ff]/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl flex flex-col justify-between space-y-9 px-2 sm:px-4">
              <div>
                {/* Badge */}
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="w-6 h-[2px] bg-[#00c9ff]" />
                  <span className="text-xs font-mono tracking-widest uppercase text-white/80">
                    TALENT ACCELERATION
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#00c9ff] animate-pulse" />
                </div>

                {/* Main Heading */}
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.08] mb-6">
                  Learn By <span className="italic font-serif text-[#00c9ff]">Building</span>
                  <br />
                  Grow With Real
                  <br />
                  Projects
                </h3>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-lg mb-8 font-light">
                  Structured hands-on opportunities for students and early career professionals to gain practical industry exposure by building real-world digital applications, cloud platforms, and AI pipelines.
                </p>

                {/* 4 Skill Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mb-9">
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-xs sm:text-sm text-white/90 hover:border-[#00c9ff]/40 transition-colors">
                    <Code2 className="w-4 h-4 text-[#00c9ff] shrink-0" />
                    <span className="font-medium">Software Engineering</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-xs sm:text-sm text-white/90 hover:border-[#00c9ff]/40 transition-colors">
                    <Cpu className="w-4 h-4 text-[#00c9ff] shrink-0" />
                    <span className="font-medium">AI / ML Solutions</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-xs sm:text-sm text-white/90 hover:border-[#00c9ff]/40 transition-colors">
                    <Cloud className="w-4 h-4 text-[#00c9ff] shrink-0" />
                    <span className="font-medium">Cloud &amp; DevOps</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-xs sm:text-sm text-white/90 hover:border-[#00c9ff]/40 transition-colors">
                    <PenTool className="w-4 h-4 text-[#00c9ff] shrink-0" />
                    <span className="font-medium">UI/UX Design</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-6">
                  <Link
                    href="/internship"
                    className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00c9ff] to-[#0072ff] text-white font-semibold text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(0,201,255,0.4)] hover:shadow-[0_0_35px_rgba(0,201,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    <span>Explore Internships</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/services/courses"
                    className="text-xs font-mono tracking-wider uppercase text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>VIEW TRAINING TRACKS</span>
                    <span className="text-xs">↓</span>
                  </Link>
                </div>
              </div>

              {/* Micro Meta Footer */}
              <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-mono tracking-wider uppercase text-white/50">
                <div className="flex items-center gap-2">
                  <span className="text-[#00c9ff] font-bold">01</span>
                  <span>HANDS-ON PROJECTS</span>
                </div>
                <span className="hidden sm:inline text-white/20">|</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#00c9ff] font-bold">02</span>
                  <span>MENTORSHIP</span>
                </div>
                <span className="hidden sm:inline text-white/20">|</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#00c9ff] font-bold">03</span>
                  <span>VERIFIED CERTIFICATES</span>
                </div>
              </div>
            </div>
          </div>

          {/* Thin ambient divider between the two initiatives */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

          {/* 2. Boxless Founder Program Section */}
          <div className="relative py-12 sm:py-16 lg:py-20">
            {/* Ambient Lighting */}
            <div className="absolute top-1/2 -left-20 w-[500px] h-[500px] bg-[#00c9ff]/8 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-[#3b82f6]/8 rounded-full blur-[160px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10 px-2 sm:px-4">
              {/* Left Column: Text & Content */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-9">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-[2px] bg-[#00c9ff]" />
                    <span className="text-xs font-mono tracking-widest uppercase text-white/70">
                      HRA FOUNDER PROGRAM
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#00c9ff] animate-pulse" />
                  </div>

                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.1] mb-6">
                    Don't Just Have<br />
                    An <span className="italic font-serif text-[#00c9ff]">Idea</span><br />
                    Build It
                  </h3>

                  <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xl mb-8">
                    A focused ecosystem for ambitious founders who want to transform ideas into meaningful products, businesses, and impact through technology, mentorship, and execution.
                  </p>

                  <div className="flex flex-wrap items-center gap-5">
                    <Link
                      href="/contact"
                      className="ibase-btn-primary px-8 py-3.5 text-sm font-semibold flex items-center gap-2 group"
                    >
                      <span>Apply to the Program</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                    <Link
                      href="/about"
                      className="text-xs font-mono tracking-wider uppercase text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span>Discover the program</span>
                      <span className="text-xs">↓</span>
                    </Link>
                  </div>
                </div>

                {/* Micro Meta Footer */}
                <div className="pt-8 border-t border-white/10 flex items-center gap-6 sm:gap-10 text-[11px] font-mono tracking-wider uppercase text-white/40">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00c9ff] font-bold">01</span>
                    <span>BUILD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00c9ff] font-bold">02</span>
                    <span>LEARN</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00c9ff] font-bold">03</span>
                    <span>GROW</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Founder Image with subtle frame */}
              <div className="lg:col-span-6 flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-[4/3] sm:aspect-[1/1] rounded-2xl overflow-hidden border border-white/15 bg-[#080b14]/80 shadow-2xl group">
                  {/* Top HUD Frame labels */}
                  <div className="absolute top-2.5 left-4 z-20 text-[9px] font-mono tracking-widest uppercase text-white/50">
                    HRA / FOUNDER / 01
                  </div>
                  <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] font-mono text-white/70 border border-white/10">
                    01
                  </div>

                  {/* Founder Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://hragroupswebsite-psi.vercel.app/assets/founder-QHSHMDvt.png"
                    alt="HRA Founder"
                    className="w-full h-full object-cover object-top filter contrast-[1.03] group-hover:scale-102 transition-transform duration-700"
                  />

                  {/* HUD Corner Elements & Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913]/80 via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Bottom HUD Frame labels */}
                  <div className="absolute bottom-3 left-4 z-20 text-[9px] font-mono tracking-widest uppercase text-white/40">
                    TECHNOLOGY × ENTREPRENEURSHIP
                  </div>
                  <div className="absolute bottom-3 right-4 z-20 text-[9px] font-mono tracking-widest uppercase text-white/40">
                    SYSTEM / 2026
                  </div>

                  {/* Side Vertical HUD label */}
                  <div className="hidden sm:block absolute right-2 top-1/2 -translate-y-1/2 rotate-90 origin-right text-[8px] font-mono tracking-[0.2em] uppercase text-white/30 pointer-events-none">
                    IDEATION — EXECUTION — IMPACT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 02 THE COLLECTION / INSIDE HRA (VIDEOS & MOMENTS) ===================== */}
        <section id="collection" className="relative py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto ibase-section-divider">
          {/* Ambient Glows */}
          <div className="absolute top-1/4 -left-20 w-[600px] h-[450px] bg-[#00c9ff]/10 rounded-full blur-[170px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-20 w-[600px] h-[450px] bg-[#8b5cf6]/10 rounded-full blur-[170px] pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-widest text-[#00c9ff] uppercase">
                <span>02</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c9ff]" />
                <span>THE COLLECTION</span>
              </div>
              <h2 className="ibase-h-display text-4xl sm:text-5xl lg:text-6xl font-light">
                Inside<br />
                <em>HRA</em>
              </h2>
            </div>
            <div className="flex items-start gap-4 max-w-md lg:border-l lg:border-white/10 lg:pl-6">
              <span className="w-1 h-12 bg-[#00c9ff] rounded-full hidden sm:block shrink-0" />
              <p className="text-sm text-white/60 leading-relaxed">
                A moving archive of our internships, founder community, workshops, hackathons, people and achievements.
              </p>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="relative z-10 mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-b border-white/10 pb-6">
            <div className="flex items-center gap-4 text-xs font-mono tracking-wider">
              <span className="text-white/40 uppercase">EXPLORE BY EXPERIENCE</span>
              <span className="text-[#00c9ff] bg-[#00c9ff]/10 px-2.5 py-1 rounded border border-[#00c9ff]/20">
                {String(
                  collectionCategory === "ALL"
                    ? COLLECTION_ITEMS.length
                    : COLLECTION_ITEMS.filter((item) => item.category === collectionCategory).length
                ).padStart(2, "0")}{" "}
                MOMENTS
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {COLLECTION_CATEGORIES.map((cat) => {
                const isActive = collectionCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCollectionCategory(cat)}
                    className={`text-[11px] font-mono tracking-wider px-3.5 py-1.5 rounded-full transition-all duration-300 uppercase cursor-pointer ${isActive
                      ? "bg-[#00c9ff] text-black font-semibold shadow-[0_0_15px_rgba(0,201,255,0.4)]"
                      : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30"
                      }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Video Moments Layout: 3 videos per line with compact sleek sizing */}
          <div className="relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {(collectionCategory === "ALL"
                ? COLLECTION_ITEMS
                : COLLECTION_ITEMS.filter((item) => item.category === collectionCategory)
              ).map((moment) => (
                <div
                  key={moment.id}
                  onClick={() => setActiveMoment(moment)}
                  className="group relative flex flex-col justify-between cursor-pointer"
                >
                  {/* Cinematic Video Box */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#06080e] border border-white/15 group-hover:border-[#00c9ff]/60 transition-all duration-500 shadow-xl group-hover:shadow-[0_12px_35px_rgba(0,201,255,0.2)]">
                    <video
                      src={moment.media}
                      autoPlay
                      muted={isAudioMuted}
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85 pointer-events-none" />

                    {/* Top Overlay HUD Bar */}
                    <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                      <span className="text-[11px] font-mono font-medium tracking-widest text-white/75">
                        {moment.number}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00c9ff] animate-pulse" />
                        <span className="text-[9px] font-mono tracking-widest uppercase text-white/70">
                          SHORT FILM
                        </span>
                      </div>
                    </div>

                    {/* Play Button Icon on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-[#00c9ff]/95 text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,201,255,0.6)] transform group-hover:scale-110 transition-transform">
                        <span className="text-base ml-0.5">▶</span>
                      </div>
                    </div>

                    {/* In-Video Bottom Typography */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
                      <span className="text-[9px] font-mono tracking-[0.2em] text-[#00c9ff] uppercase block mb-1 font-semibold">
                        {moment.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight leading-snug font-serif drop-shadow-md line-clamp-1">
                        {moment.title}
                      </h3>
                    </div>
                  </div>

                  {/* Bottom External Meta Strip */}
                  <div className="pt-3 px-1 flex items-center justify-between gap-3 text-xs">
                    <p className="text-white/50 leading-relaxed line-clamp-2 text-[11px]">
                      {moment.description}
                    </p>
                    <div className="flex items-center gap-1 font-mono text-[10px] tracking-wider uppercase text-white/60 group-hover:text-[#00c9ff] shrink-0 transition-colors">
                      <span>VIEW</span>
                      <span className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Lightbox Modal */}
          <AnimatePresence>
            {activeMoment && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveMoment(null)}
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-4xl bg-[#0a0d18] border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
                >
                  {/* Close & Sound Buttons */}
                  <div className="absolute top-4 right-4 z-30 flex items-center gap-3">
                    <button
                      onClick={() => setIsAudioMuted(!isAudioMuted)}
                      className="px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-xs font-mono text-white/80 hover:text-white hover:border-[#00c9ff] transition-colors"
                    >
                      {isAudioMuted ? "UNMUTE 🔇" : "MUTED 🔊"}
                    </button>
                    <button
                      onClick={() => setActiveMoment(null)}
                      className="w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Video Player */}
                  <div className="w-full aspect-[16/9] bg-black">
                    <video
                      src={activeMoment.media}
                      autoPlay
                      muted={isAudioMuted}
                      loop
                      controls
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 bg-[#060913]">
                    <div>
                      <div className="flex items-center gap-3 mb-1.5 text-xs font-mono text-[#00c9ff]">
                        <span>MOMENT {activeMoment.number}</span>
                        <span>·</span>
                        <span>{activeMoment.category}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{activeMoment.title}</h3>
                      <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-xl">
                        {activeMoment.description}
                      </p>
                    </div>

                    <Link
                      href="/gallery"
                      className="ibase-btn-primary text-xs px-5 py-2.5 whitespace-nowrap"
                    >
                      View Full Archive
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ===================== CLIENT PERSPECTIVE (TESTIMONIALS) ===================== */}
        <section className="relative py-28 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto ibase-section-divider">
          {/* Ambient Glow */}
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-[#00c9ff]/10 rounded-full blur-[150px] pointer-events-none" />

          <div className="mb-14 relative z-10">
            <div className="ibase-eyebrow">CLIENT PERSPECTIVE</div>
            <h2 className="ibase-h-display">
              Built Together <em>Trusted Together</em>
            </h2>
            <p className="text-sm text-white/50 max-w-sm mt-3">
              Strong digital products come from strong collaboration. Here's what our partners say about working with HRA Groups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {[
              {
                quote: "HRA Groups understood what we wanted and turned the idea into a practical digital solution. The team was responsive, professional, and focused on delivering quality.",
                name: "Client Feedback",
                role: "Business Client",
                company: "HRA Partner",
                initials: "CF"
              },
              {
                quote: "The experience with the HRA team was smooth from planning to execution. They were open to feedback and consistently looked for better ways to solve the problem.",
                name: "Client Feedback",
                role: "Project Partner",
                company: "Enterprise Client",
                initials: "PP"
              },
              {
                quote: "What stood out was the team's willingness to understand the business requirement before jumping into development. That made the entire process much easier.",
                name: "Client Feedback",
                role: "Technology Partner",
                company: "Digital Partner",
                initials: "TP"
              }
            ].map((t) => (
              <div
                key={t.quote}
                className="p-8 rounded-3xl border border-white/10 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#00c9ff]/30 bg-[#0c0e14]/80"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs text-[#00c9ff]">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{t.name}</div>
                      <div className="text-xs text-white/50">{t.role} · {t.company}</div>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-white/80 leading-relaxed italic mb-8">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
                  <span>Verified Outcome</span>
                  <CheckCircle2 className="w-4 h-4 text-[#00c9ff]" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== CTA BAND ===================== */}
        <section className="relative py-32 px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto text-center ibase-section-divider overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00c9ff]/5 via-transparent to-[#1e1cb0]/15 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              Have An Idea Or Requirement?<br />
              <em className="bg-gradient-to-r from-[#00c9ff] to-[#1e1cb0] text-transparent bg-clip-text not-italic">
                Let's Build It Together
              </em>
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
              Whether you need custom software development, IT consultancy, AI solutions, or ecosystem talent collaboration, our team is ready to help.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="ibase-btn-primary">
                Let's Connect
              </Link>
              <Link href="/services/software-development" className="ibase-btn-ghost">
                Explore Services
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
