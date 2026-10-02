"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  ChevronDown,
  ArrowRight,
  Calendar,
  Clock,
  Sparkles,
  BookOpen,
  Filter,
  CheckCircle2,
  Share2,
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  service: string;
  industry: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  featured?: boolean;
}

export default function BlogPage() {
  const [selectedService, setSelectedService] = useState<string>("All");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);

  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.94]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0.35]);

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "5 Steps to Prepare for Enterprise Cybersecurity Awareness Month",
      category: "Blogs",
      service: "IT Managed Services",
      industry: "Government",
      date: "September 28, 2026",
      readTime: "5 min read",
      excerpt:
        "Practical cybersecurity governance frameworks, zero-trust hygiene, and automated patch management to defend hybrid networks.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/6ab591ebae44c3fb86fd1ba7_5%20Steps%20to%20Prepare%20for%20Cybersecurity%20Awareness%20Month.webp",
      featured: true,
    },
    {
      id: "2",
      title: "The Race to Agentic AI Starts with Your Data Foundation",
      category: "Blogs",
      service: "Enterprise Data & AI",
      industry: "Transportation",
      date: "August 19, 2026",
      readTime: "6 min read",
      excerpt:
        "Why autonomous AI agents fail without cleansed data pipelines, vector search infrastructure, and unified data lakehouse models.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/6a87522cbbfe2a46308cfcc6_The%20Race%20to%20Agentic%20AI.webp",
    },
    {
      id: "3",
      title: "Your Best IT People Shouldn't Spend Their Time Keeping the Lights On",
      category: "Blogs",
      service: "IT Managed Services",
      industry: "Utilities",
      date: "August 14, 2026",
      readTime: "4 min read",
      excerpt:
        "Shifting internal talent from routine helpdesk maintenance to strategic modernization via co-managed IT operations.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/6a7f2a621aeecc26bcf58924_Keeping%20the%20Lights%20On.webp",
    },
    {
      id: "4",
      title: "Key Takeaways from Our Enterprise Data & AI Modernization Series",
      category: "Blogs",
      service: "Enterprise Data & AI",
      industry: "Government",
      date: "August 13, 2026",
      readTime: "7 min read",
      excerpt:
        "Critical takeaways on public sector AI compliance, real-time analytics architectures, and reducing decision latency.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/6a7e44df8ae91621ff28c519_AI%20Webinar%20Takeaways.webp",
    },
    {
      id: "5",
      title: "ServiceNow Is No Longer Just an ITSM Tool. Your Partner Shouldn't Act Like It Is",
      category: "Blogs",
      service: "ServiceNow",
      industry: "Banking, Financial Services & Insurance",
      date: "July 28, 2026",
      readTime: "5 min read",
      excerpt:
        "Unlocking the full potential of ServiceNow across ESG, employee workflows, and custom enterprise application development.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/6a6b76c40eb8664bd209d5d1_ServiceNow%20Is%20No%20Longer%20an%20ITSM%20Tool.webp",
    },
    {
      id: "6",
      title: "Why AI Projects in Utilities Fail Without Trusted Geospatial Data",
      category: "Blogs",
      service: "Enterprise Data & AI",
      industry: "Utilities",
      date: "July 23, 2026",
      readTime: "6 min read",
      excerpt:
        "Bridging GIS spatial mapping with predictive maintenance algorithms to fortify electrical substations and pipeline grids.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/6a6b76ba93e5f8c9a76d6692_Why%20AI%20Projects%20in%20Utilities%20Fail%20Without%20Trusted%20Data.webp",
    },
    {
      id: "7",
      title: "Enterprise Asset Management: Moving from Reactive to Predictive Lifecycle",
      category: "Blogs",
      service: "Enterprise Asset Management",
      industry: "Manufacturing",
      date: "July 15, 2026",
      readTime: "4 min read",
      excerpt:
        "How IoT sensor telemetry and automated EAM workflows minimize plant downtime and boost machinery longevity.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/69c553b8ef72025e41e410f9_Gas%20Lines.avif",
    },
    {
      id: "8",
      title: "Building Resilient Cloud Architecture for Municipal Public Safety",
      category: "Blogs",
      service: "IT Managed Services",
      industry: "Public Safety",
      date: "June 30, 2026",
      readTime: "5 min read",
      excerpt:
        "High-availability 911 dispatch networks, automated failover routing, and hardened zero-trust data stores.",
      image:
        "https://cdn.prod.website-files.com/685c045f09a3dab41aa0d72a/688b5444b1e5447e507df849_indust-6.avif",
    },
  ];

  const [dbPosts, setDbPosts] = useState<BlogPost[]>([]);

  // Fetch dynamically published posts from Supabase database
  React.useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.posts) {
          const formatted = data.posts.map((p: any) => ({
            id: p.id,
            title: p.title,
            category: p.category || "Blogs",
            service: p.service || "IT Managed Services",
            industry: p.industry || "Government",
            date: new Date(p.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            readTime: p.readTime || "5 min read",
            excerpt: p.excerpt,
            image: p.image,
            featured: p.featured,
          }));
          setDbPosts(formatted);
        }
      })
      .catch((err) => console.error("Error fetching dynamic blogs:", err));
  }, []);

  // Merged blog posts: dynamic posts published via admin first, plus all original posts preserved
  const allBlogPosts = useMemo(() => {
    return [...dbPosts, ...blogPosts];
  }, [dbPosts]);

  const servicesList = [
    "All",
    "IT Managed Services",
    "Enterprise Data & AI",
    "ServiceNow",
    "Enterprise Asset Management",
  ];

  const industriesList = [
    "All",
    "Government",
    "Utilities",
    "Banking, Financial Services & Insurance",
    "Transportation",
    "Public Safety",
    "Manufacturing",
  ];

  const categoryAliases: Record<string, string[]> = {
    "IT Managed Services": ["IT Managed Services"],
    "Enterprise Data & AI": ["Enterprise Data & AI", "AI & Technologies"],
    "ServiceNow": ["ServiceNow", "ServiceNow & Workflow"],
    "Enterprise Asset Management": ["Enterprise Asset Management", "Asset Management & IoT"],
    "Cybersecurity & Cloud": ["Cybersecurity & Cloud", "Cybersecurity"],
    "Content Marketing & SEO": ["Content Marketing & SEO", "Digital Strategy"],
  };

  const filteredPosts = useMemo(() => {
    return allBlogPosts.filter((post) => {
      let matchService = true;
      if (selectedService !== "All") {
        const allowed = categoryAliases[selectedService] || [selectedService];
        matchService = allowed.some((alias) =>
          post.service.toLowerCase().includes(alias.toLowerCase()) ||
          post.category.toLowerCase().includes(alias.toLowerCase())
        );
      }

      const matchIndustry =
        selectedIndustry === "All" || post.industry === selectedIndustry;
      const matchSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.service.toLowerCase().includes(searchQuery.toLowerCase());

      return matchService && matchIndustry && matchSearch;
    });
  }, [selectedService, selectedIndustry, searchQuery, allBlogPosts]);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070c18] text-[#172947] dark:text-slate-100 font-sans selection:bg-[#0052cc]/20 selection:text-[#003882]">
      <Navbar />

      {/* EXACT 1:1 SDI CENTERED SLATE-BLUE HERO BANNER WITH STICKY PARALLAX */}
      <section className="sticky top-0 z-0 bg-[#384968] dark:bg-[#050b17] min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] pt-24 pb-36 sm:pt-32 sm:pb-44 lg:pt-36 lg:pb-52 flex items-center justify-center text-center overflow-hidden">
        {/* Subtle radial glow & dark gradient depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,102,241,0.22),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.1),rgba(15,23,42,0.4))] pointer-events-none" />
        
        {/* Subtle dot mesh texture */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <motion.div
          style={{ y: heroImageY, opacity: heroOpacity, scale: heroScale }}
          className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto space-y-6 sm:space-y-8"
          >
            {/* Pill Tag (Exact SDI Style) */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-bold tracking-[0.25em] text-[#b8d7ff] uppercase shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#93c5fd]" />
              <span>PERSPECTIVES • INSIGHTS • TRENDS</span>
            </motion.div>

            {/* Exact SDI Style Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[44px] sm:text-[60px] md:text-[70px] lg:text-[80px] xl:text-[88px] font-normal tracking-[-0.03em] leading-[1.08] text-white drop-shadow-sm"
            >
              HRA Groups Blog
            </motion.h1>

            {/* Exact Subtext from user */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="text-[16px] sm:text-[18px] lg:text-[20px] text-slate-200 font-normal leading-[1.65] max-w-3xl mx-auto"
            >
              The HRA blog is our perspective on IT industry insights, best practices, and technology trends — we are all about knowledge sharing and problem-solving.
            </motion.p>

            {/* View Articles Pill Button (Exact SDI Style) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="pt-2"
            >
              <a
                href="#posts"
                className="inline-flex items-center justify-center px-10 py-3.5 rounded-full bg-white text-[#0052cc] hover:text-[#002f80] hover:bg-sky-50 font-bold text-[15px] shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Explore All Articles</span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* MAIN CONTENT AREA WITH ELEVATED SHEET EFFECT (OVERLAPS AND SCROLLS OVER HERO) */}
      <section
        id="posts"
        className="relative z-10 bg-[#f8fafc] dark:bg-[#090e1a] rounded-t-[36px] sm:rounded-t-[48px] lg:rounded-t-[60px] shadow-[0_-25px_60px_rgba(15,23,42,0.25)] border-t border-white/80 dark:border-slate-800/80 py-16 sm:py-20 lg:py-24"
      >
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* LEFT SIDEBAR (SEARCH + CATEGORIES PANEL - COMPACT & BRAND ALIGNED) */}
            <div className="lg:col-span-3 space-y-3.5 lg:sticky lg:top-28">
              {/* Compact Rounded Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-9 py-2 rounded-full bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-[#0052cc] dark:focus:border-sky-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all shadow-xs"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 absolute right-10 top-1/2 -translate-y-1/2"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Compact Categories Card */}
              <div className="bg-white dark:bg-[#0c1427] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-3.5 sm:p-4 shadow-xs space-y-2.5">
                <h3 className="text-sm font-bold text-[#14233c] dark:text-slate-100 tracking-tight px-1">
                  Categories
                </h3>

                <div className="space-y-1">
                  {/* View all */}
                  <button
                    onClick={() => {
                      setSelectedService("All");
                      setSelectedIndustry("All");
                    }}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      selectedService === "All" && selectedIndustry === "All"
                        ? "bg-[#0052cc]/10 dark:bg-blue-950/60 text-[#0052cc] dark:text-sky-300 font-bold"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span>View all</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        selectedService === "All" && selectedIndustry === "All"
                          ? "bg-[#0052cc] text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {allBlogPosts.length}
                    </span>
                  </button>

                  {/* Individual Categories matching requested list and dynamic live counts */}
                  {[
                    {
                      id: "IT Managed Services",
                      label: "IT Managed Services",
                      aliases: ["IT Managed Services"],
                    },
                    {
                      id: "Enterprise Data & AI",
                      label: "AI & Technologies",
                      aliases: ["Enterprise Data & AI", "AI & Technologies"],
                    },
                    {
                      id: "ServiceNow",
                      label: "ServiceNow & Workflow",
                      aliases: ["ServiceNow", "ServiceNow & Workflow"],
                    },
                    {
                      id: "Enterprise Asset Management",
                      label: "Asset Management & IoT",
                      aliases: ["Enterprise Asset Management", "Asset Management & IoT"],
                    },
                    {
                      id: "Cybersecurity & Cloud",
                      label: "Cybersecurity & Cloud",
                      aliases: ["Cybersecurity & Cloud", "Cybersecurity"],
                    },
                    {
                      id: "Content Marketing & SEO",
                      label: "Content Marketing & SEO",
                      aliases: ["Content Marketing & SEO", "Digital Strategy"],
                    },
                  ].map((cat) => {
                    const isActive =
                      selectedService === cat.id ||
                      cat.aliases.includes(selectedService);

                    const count = allBlogPosts.filter((p) =>
                      cat.aliases.some((a) =>
                        p.service.toLowerCase().includes(a.toLowerCase()) ||
                        p.category.toLowerCase().includes(a.toLowerCase())
                      )
                    ).length;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedService(isActive ? "All" : cat.id);
                        }}
                        className={`w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                          isActive
                            ? "bg-[#0052cc]/10 dark:bg-blue-950/60 text-[#0052cc] dark:text-sky-300 font-bold"
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        <span className="truncate pr-2">{cat.label}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${
                            isActive
                              ? "bg-[#0052cc] text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Compact Newsletter Card matching HRA Groups Brand Blue (#0052cc) */}
              <div className="rounded-2xl bg-[#0052cc] dark:bg-[#031c47] p-3.5 sm:p-4 text-white space-y-2.5 shadow-xs border border-transparent dark:border-blue-500/30">
                <span className="text-[10px] font-bold tracking-wider text-blue-200 uppercase">
                  NEWSLETTER
                </span>
                <h4 className="text-xs sm:text-sm font-bold leading-snug">
                  Get Weekly Tech &amp; Workforce Insights
                </h4>
                <p className="text-[11px] text-blue-100 leading-relaxed">
                  Join 5,000+ tech leaders reading our monthly digest.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you for subscribing to HRA Insights!");
                  }}
                  className="space-y-2 pt-1"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter email..."
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 text-xs outline-none focus:bg-white focus:text-slate-900 transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-white text-[#0052cc] font-bold text-xs hover:bg-blue-50 shadow-sm transition-all cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT COLUMN: BLOG POSTS LISTING */}
            <div className="lg:col-span-9">
              {/* Header Status Bar */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Showing <span className="text-[#0052cc] dark:text-sky-400 font-bold">{filteredPosts.length}</span> articles
                </span>

                {(selectedService !== "All" || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedService("All");
                      setSelectedIndustry("All");
                      setSearchQuery("");
                    }}
                    className="text-xs font-bold text-[#0052cc] dark:text-sky-400 hover:underline cursor-pointer"
                  >
                    Reset all filters
                  </button>
                )}
              </div>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-[#0c1427] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8">
                  <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#14233c] dark:text-white">No articles found</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
                    No articles matched your search or category selection. Try resetting filters.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedService("All");
                      setSelectedIndustry("All");
                      setSearchQuery("");
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full bg-[#0052cc] text-white text-xs font-bold shadow-md hover:bg-[#003882] transition-colors cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
                      whileHover={{ y: -6, transition: { duration: 0.25 } }}
                      className="group rounded-3xl bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500/50 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 dark:hover:shadow-blue-950/40 flex flex-col justify-between transition-all duration-300"
                    >
                      {/* Article Thumbnail */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[11px] font-bold tracking-wider text-[#0052cc] dark:text-sky-300 uppercase shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                          {post.service}
                        </div>
                      </div>

                      {/* Article Content */}
                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          {/* Category & Date Tag */}
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0052cc] dark:text-sky-400">
                            <span>{post.category}</span>
                            <span className="text-slate-300 dark:text-slate-700">•</span>
                            <span className="text-slate-400 font-normal">{post.date}</span>
                          </div>

                          {/* Title */}
                          <h3 className="text-base sm:text-lg font-bold text-[#14233c] dark:text-slate-100 group-hover:text-[#0052cc] dark:group-hover:text-sky-400 transition-colors leading-[1.35] line-clamp-2">
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Bottom Action Footer */}
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{post.readTime}</span>
                          </span>

                          <span className="text-[#0052cc] dark:text-sky-400 group-hover:text-[#003882] dark:group-hover:text-sky-300 flex items-center gap-1 font-bold group/link">
                            <span>Read Article</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

