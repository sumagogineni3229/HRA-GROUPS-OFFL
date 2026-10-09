"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BigPolygonBackground from "@/components/BigPolygonBackground";
import {
  Search,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  BookOpen,
  Share2,
  Check,
  User,
  Tag,
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
  content?: string;
}

const BLOG_HERO_PHRASES = [
  "HRA Groups Blog & Insights.",
  "Perspectives & Industry Trends.",
  "Ideas, Systems & Innovation.",
  "Knowledge Sharing & Solutions.",
];

function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    try {
      setSubmitting(true);
      setStatus("idle");
      const res = await fetch("/api/inquiries/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "Blog Page Newsletter" }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFeedbackMsg(data.message || "Thank you for subscribing to HRA Insights!");
        setEmail("");
      } else {
        setStatus("error");
        setFeedbackMsg(data.error || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setFeedbackMsg("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-[#08172a] to-[#030b16] p-4 text-white space-y-2.5 border border-white/15 backdrop-blur-md">
      <span className="text-[10px] font-mono font-bold tracking-widest text-[#00c9ff] uppercase">
        NEWSLETTER
      </span>
      <h4 className="text-xs sm:text-sm font-semibold leading-snug">
        Get Weekly Tech &amp; Workforce Insights
      </h4>
      <p className="text-[11px] text-white/60 leading-relaxed">
        Join 5,000+ tech leaders reading our monthly digest
      </p>

      {status === "success" ? (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2 pt-1">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email..."
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/40 text-xs outline-none focus:border-[#00c9ff] transition-all"
            disabled={submitting}
          />
          {status === "error" && (
            <p className="text-[11px] text-rose-400">{feedbackMsg}</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-xs hover:shadow-[0_0_20px_rgba(0,201,255,0.4)] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Subscribing...</span>
              </>
            ) : (
              <span>Subscribe</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}


export default function BlogPage() {
  const [selectedService, setSelectedService] = useState<string>("All");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Scroll to top when opening a full screen article and handle browser popstate/escape
  useEffect(() => {
    if (activeArticle) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeArticle]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeArticle) {
        setActiveArticle(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeArticle]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Typewriter text animation state (identical to Work page)
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  useEffect(() => {
    const fullText = BLOG_HERO_PHRASES[phraseIndex];

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
          setPhraseIndex((prev) => (prev + 1) % BLOG_HERO_PHRASES.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, typingSpeed]);

  // Smooth scroll animations for hero banner
  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 600], [0, 140]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.92]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.25]);

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
      content: `Enterprise cybersecurity awareness is no longer an annual compliance checkbox. In today's landscape of coordinated ransomware campaigns, credential stuffing, and multi-vector supply chain attacks, cyber preparedness requires continuous operational readiness.

### 1. Establish Zero-Trust Architecture & Continuous Authentication
Zero Trust operates on the principle of "never trust, always verify." Organizations must enforce strict least-privilege access controls across cloud workloads, on-premise servers, and remote employee endpoints. Multi-factor authentication (MFA) must be mandated alongside continuous posture verification.

### 2. Automate Threat Hunting & Patch Management
Over 60% of modern breach incidents exploit known vulnerabilities for which patches were available but unapplied. Deploying automated patch orchestration and AI-powered SIEM/SOAR monitoring reduces remediation lead times from weeks to minutes.

### 3. Conduct Real-World Simulation Drills
Phishing attacks have grown exponentially more sophisticated with generative AI voice and message cloning. Regular, unannounced simulation drills test employee reflexes, measure reporting accuracy, and instill a culture of collective cyber vigilance.

### 4. Fortify Supply Chain & Third-Party Vendor Access
Evaluate external vendor risk profiles rigorously. Isolate third-party contractors within granular network micro-segments, ensuring compromise of an external SaaS integration cannot grant lateral movement into core enterprise data centers.

### 5. Formulate an Actionable Incident Response Playbook
When a security event occurs, rapid coordination between IT, Legal, Executive Leadership, and Communications is paramount. An actionable response playbook with defined escalation matrices minimizes business downtime and maintains stakeholder trust.`,
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
      content: `Autonomous AI agents are transforming how enterprises execute complex multi-step workflows. Unlike traditional chat interfaces, agentic systems plan, critique, call APIs, and execute decisions independently. However, their efficacy is strictly constrained by the underlying data architecture.

### The Myth of Model Superiority Over Data Quality
Enterprises frequently invest heavily in frontier LLMs while neglecting messy, siloed unstructured repositories. When an AI agent accesses conflicting customer data or obsolete schema records, hallucination rates skyrocket and execution errors compound.

### Building Modern Vector & Lakehouse Pipelines
Unifying transactional databases and real-time event streams into a governed lakehouse enables semantic search indexing across enterprise documentation, telemetry, and transactional logs. Embedding retrieval must be paired with low-latency vector databases to supply agents with real-time contextual grounding.

### Granular Governance & Guardrail Ensembles
Deploying agentic systems into mission-critical pipelines requires deterministic guardrails. Guardrail layers validate agent proposed actions against security rules, budget thresholds, and compliance protocols before any state-modifying API is invoked.`,
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
      content: `In high-growth enterprises, top engineering talent is routinely bogged down by repetitive server patching, tier-1 helpdesk tickets, and routine network monitoring. This operational overhead throttles product velocity and leads to high developer attrition.

### The Strategic Value of Co-Managed IT Operations
A co-managed IT model bridges internal domain knowledge with 24/7 Tier-1 through Tier-3 specialized managed services. Routine maintenance, monitoring, and patch cycles are automated and managed by dedicated partners, liberating core teams to focus on revenue-generating product innovation.

### Delivering Measurable Business Velocity
By offloading routine IT operations, engineering teams accelerate digital transformation initiatives by an average of 40%, delivering software updates faster, improving system reliability, and driving competitive advantage.`,
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
      content: `Our recent executive webinar series brought together industry leaders to unpack the technical and regulatory realities of deploying modern AI in public sector and enterprise ecosystems.

### Key Finding 1: Data Sovereignty & Compliant Enclaves
Government and regulated sectors require air-gapped or localized inference enclaves. Strict data provenance and auditability ensure that intellectual property and sensitive citizen data never leak into public foundation model training sets.

### Key Finding 2: Reducing Decision Latency with Streaming Pipelines
Traditional batch data pipelines introduce multi-hour latency. By transitioning to event-driven streaming architectures with Apache Kafka and Flink, organizations enable real-time anomaly detection and immediate operational decisioning.`,
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
      content: `While ServiceNow built its reputation on world-class IT Service Management (ITSM), the modern Now Platform represents an enterprise-grade digital workflow engine spanning HR, Customer Service Management (CSM), App Engine, and ESG reporting.

### Unifying Disparate Enterprise Silos
Organizations using ServiceNow strictly for ticketing leave over 70% of platform ROI uncaptured. By configuring integrated employee lifecycle workflows, automated hardware provisioning, software licensing, and access approvals proceed seamlessly in real-time.

### Rapid Low-Code Application Development
With ServiceNow App Engine, enterprise business units build custom digital solutions in days rather than quarters, backed by enterprise-grade security and unified data models.`,
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
      content: `Predictive maintenance AI models in power and water utilities rely heavily on geospatial telemetry. Without accurate topological mapping of feeder lines, transformer stations, and underground conduits, AI failure predictions become practically unusable in the field.

### Integrating GIS with IoT Telemetry
Fusing Geographic Information Systems (GIS) with real-time thermal sensor and vibration data creates accurate digital twins of physical utility infrastructure, enabling automated dispatch of repair crews prior to grid disruptions.`,
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
      content: `Unplanned machinery downtime costs industrial manufacturers billions annually. Transitioning from calendar-based maintenance to condition-based predictive asset management ensures repairs occur precisely when needed.

### Continuous Telemetry & Anomaly Detection
Edge-computing devices sample machinery harmonics and temperature variations every millisecond, detecting micro-fractures and bearing degradation weeks before catastrophic failure occurs.`,
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
      content: `Public safety networks demand 99.999% uptime availability. Emergency dispatch centers cannot tolerate single-point cloud failures.

### Multi-Region Automated Failover
Deploying dual-active multi-region cloud topologies with automated BGP anycast routing ensures seamless failover within sub-seconds during extreme weather events or network fiber cuts.`,
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
            content: p.content,
          }));
          setDbPosts(formatted);
        }
      })
      .catch((err) => console.error("Error fetching dynamic blogs:", err));
  }, []);

  // Merged blog posts: dynamic posts published via admin first, plus all original posts preserved
  const allBlogPosts = useMemo(() => {
    return [...dbPosts, ...blogPosts];
  }, [dbPosts, blogPosts]);

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
        matchService = allowed.some(
          (alias) =>
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

  const scrollToPosts = () => {
    const el = document.getElementById("posts");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ===================== FULLSCREEN ARTICLE DETAIL VIEW =====================
  if (activeArticle) {
    return (
      <div className="ibase-landing-bg text-white min-h-screen selection:bg-[#00c9ff]/30 selection:text-[#00c9ff] relative overflow-x-hidden font-sans">
        <Navbar />

        {/* Blog Article Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": activeArticle.title,
              "description": activeArticle.excerpt,
              "image": activeArticle.image.startsWith("http")
                ? activeArticle.image
                : `https://hragroups.com${activeArticle.image}`,
              "author": {
                "@type": "Organization",
                "name": "HRA Groups"
              },
              "publisher": {
                "@type": "Organization",
                "name": "HRA Groups",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://hragroups.com/images/hra-logo.png"
                }
              },
              "datePublished": activeArticle.date,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://hragroups.com/services/blog"
              }
            }),
          }}
        />

        {/* Global Background Layer with Big Polygons (Exact match to all pages) */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
          <BigPolygonBackground opacityClass="opacity-75" />
          <div className="absolute top-[10%] -left-[10%] w-[650px] h-[650px] bg-[#00c9ff]/[0.035] rounded-full blur-[220px]" />
          <div className="absolute top-[50%] -right-[15%] w-[800px] h-[800px] bg-[#1e1cb0]/[0.05] rounded-full blur-[250px]" />
        </div>

        <main className="relative z-20 pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16 xl:px-24 max-w-[1200px] mx-auto">
          {/* Navigation Bar / Return to Blogs */}
          <div className="flex items-center justify-between pb-8 mb-10 border-b border-white/10">
            <button
              onClick={() => setActiveArticle(null)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 hover:border-[#00c9ff]/50 text-xs sm:text-sm font-mono text-white/80 hover:text-[#00c9ff] transition-all cursor-pointer backdrop-blur-md hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all articles</span>
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 hover:border-[#00c9ff]/50 text-xs sm:text-sm font-mono text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-md hover:bg-white/10"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-[#00c9ff]" />
                  <span className="text-[#00c9ff]">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Share Article</span>
                </>
              )}
            </button>
          </div>

          {/* Article Header & Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Eyebrow / Badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00c9ff]/15 border border-[#00c9ff]/30 text-[#00c9ff] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                {activeArticle.service}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-white/70">
                <Tag className="w-3.5 h-3.5 text-white/40" />
                {activeArticle.industry}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-white/60 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-white/40" />
                {activeArticle.date}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-white/60 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-white/40" />
                {activeArticle.readTime}
              </span>
              <span className="text-white/40">•</span>
              <span className="text-white/60 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-white/40" />
                HRA Insights
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light font-serif text-white leading-[1.15] tracking-tight">
              {activeArticle.title}
            </h1>

            {/* Standfirst / Excerpt quote */}
            <p className="text-lg sm:text-xl text-[#00c9ff]/90 font-light leading-relaxed border-l-2 border-[#00c9ff] pl-5 py-1">
              {activeArticle.excerpt}
            </p>

            {/* High-Resolution Hero Banner Image */}
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/15 bg-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.8)] my-8">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Prose Content */}
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-12 backdrop-blur-xl space-y-8">
              <div className="prose prose-invert max-w-none space-y-6 text-white/80 font-light text-base sm:text-lg leading-[1.85]">
                {(activeArticle.content || activeArticle.excerpt)
                  .split("\n\n")
                  .map((block, idx) => {
                    if (block.startsWith("### ")) {
                      return (
                        <h2
                          key={idx}
                          className="text-2xl sm:text-3xl font-light font-serif text-white pt-6 pb-2 border-b border-white/10 flex items-center gap-3"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-[#00c9ff] inline-block" />
                          {block.replace("### ", "")}
                        </h2>
                      );
                    }
                    if (block.startsWith("- ")) {
                      return (
                        <ul key={idx} className="list-disc list-inside space-y-2.5 pl-2 text-white/80">
                          {block.split("\n").map((li, lidx) => (
                            <li key={lidx}>{li.replace(/^- /, "")}</li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={idx} className="text-white/85">
                        {block}
                      </p>
                    );
                  })}
              </div>

              {/* Bottom Consultation Callout */}
              <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-white/[0.04] to-transparent p-6 sm:p-8 rounded-2xl border border-white/10">
                <div className="space-y-1.5 text-center md:text-left">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#00c9ff]">
                    CONNECT WITH AN ADVISOR
                  </span>
                  <h3 className="text-lg sm:text-xl font-light font-serif text-white">
                    Need strategic support executing this in your organization?
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 font-light">
                    Our digital solutions and cloud engineers are ready to assist.
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <Link
                    href="/contact"
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-xs sm:text-sm tracking-wide shadow-[0_0_30px_rgba(0,201,255,0.4)] hover:shadow-[0_0_45px_rgba(0,201,255,0.7)] transition-all cursor-pointer inline-block"
                  >
                    Schedule Consultation
                  </Link>
                </div>
              </div>
            </div>

            {/* Back Button bottom */}
            <div className="pt-8 text-center">
              <button
                onClick={() => setActiveArticle(null)}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono uppercase tracking-widest text-white transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Blog Listing</span>
              </button>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    );
  }

  // ===================== STANDARD BLOG LISTING VIEW =====================
  return (
    <div className="ibase-landing-bg text-white min-h-screen selection:bg-[#00c9ff]/30 selection:text-[#00c9ff] relative overflow-x-hidden font-sans">
      <Navbar />

      {/* Global Background Layer with Big Polygons (Exact match to Work & Founder Program pages) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        <BigPolygonBackground opacityClass="opacity-75" />
        <div className="absolute top-[10%] -left-[10%] w-[650px] h-[650px] bg-[#00c9ff]/[0.035] rounded-full blur-[220px]" />
        <div className="absolute top-[50%] -right-[15%] w-[800px] h-[800px] bg-[#1e1cb0]/[0.05] rounded-full blur-[250px]" />
      </div>

      <main className="relative z-20">
        {/* ===================== FIRST SCREEN (EXACT FULL VIEWPORT HERO WITH STICKY PARALLAX & TYPEWRITER ANIMATION) ===================== */}
        <section className="sticky top-0 z-0 h-screen w-full flex items-center justify-center text-center px-6 sm:px-10 lg:px-16 max-w-[1600px] mx-auto overflow-hidden">
          <motion.div
            style={{ y: heroImageY, opacity: heroOpacity, scale: heroScale }}
            className="w-full max-w-4xl mx-auto space-y-8 flex flex-col items-center justify-center"
          >
            {/* Eyebrow Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs sm:text-sm font-mono tracking-[0.25em] text-[#00c9ff] uppercase shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#00c9ff] animate-pulse" />
              <span>PERSPECTIVES • INSIGHTS • TRENDS</span>
            </motion.div>

            {/* Typewriter Animated Display Headline (Like Work page) */}
            <div className="min-h-[110px] sm:min-h-[140px] md:min-h-[160px] flex items-center justify-center w-full px-2">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-light text-white tracking-[-0.03em] leading-[1.08] text-center font-serif">
                <span className="text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.2)]">
                  {currentText}
                </span>
                <span className="text-[#00c9ff] ml-1.5 font-light animate-[pulse_1s_infinite]">|</span>
              </h1>
            </div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="text-base sm:text-lg lg:text-xl text-white/70 font-light leading-[1.7] max-w-3xl mx-auto"
            >
              The HRA blog is our perspective on IT industry insights, best practices, and technology trends — we are all about knowledge sharing and problem-solving.
            </motion.p>

            {/* View Articles Pill Button (Glowing/Blinking Indicator to Scroll Down) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="pt-2 relative flex flex-col items-center"
            >
              {/* Outer pulsing ring radar indicator */}
              <span className="absolute -inset-1 rounded-full bg-[#00c9ff]/40 blur-md animate-ping pointer-events-none opacity-75" />
              
              <button
                onClick={scrollToPosts}
                className="relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-sm tracking-wide shadow-[0_0_35px_rgba(0,201,255,0.6)] hover:shadow-[0_0_50px_rgba(0,201,255,0.9)] animate-pulse transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] cursor-pointer"
              >
                <span>Explore All Articles</span>
                <ChevronDown className="w-4 h-4 animate-bounce text-black" />
              </button>

              {/* Scroll down indicator prompt */}
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#00c9ff]/80 mt-3 animate-pulse">
                ↓ Scroll to explore
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* ===================== SECOND PART: ELEVATED SEPARATE SHEET OVERLAYING AS YOU SCROLL ===================== */}
        <section
          id="posts"
          className="relative z-10 bg-[#000000]/95 backdrop-blur-3xl rounded-t-[40px] sm:rounded-t-[56px] lg:rounded-t-[72px] border-t border-white/15 shadow-[0_-30px_90px_rgba(0,0,0,0.95)] py-20 sm:py-24"
        >
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* LEFT SIDEBAR (SEARCH + CATEGORIES PANEL + NEWSLETTER) */}
              <div className="lg:col-span-3 space-y-4 lg:sticky lg:top-28">
                {/* Rounded Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-9 py-2.5 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder-white/40 outline-none focus:border-[#00c9ff] focus:bg-white/10 transition-all backdrop-blur-md"
                  />
                  <Search className="w-4 h-4 text-white/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-xs font-bold text-white/50 hover:text-white absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Categories Card */}
                <div className="bg-white/[0.03] rounded-2xl border border-white/10 p-4 space-y-3 backdrop-blur-md">
                  <h3 className="text-xs font-mono tracking-widest uppercase text-white/60 px-1">
                    Categories
                  </h3>

                  <div className="space-y-1">
                    {/* View all */}
                    <button
                      onClick={() => {
                        setSelectedService("All");
                        setSelectedIndustry("All");
                      }}
                      className={`w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                        selectedService === "All" && selectedIndustry === "All"
                          ? "bg-[#00c9ff]/20 text-[#00c9ff] font-semibold border border-[#00c9ff]/40"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>View all</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
                          selectedService === "All" && selectedIndustry === "All"
                            ? "bg-[#00c9ff] text-black font-bold"
                            : "bg-white/10 text-white/60"
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
                        cat.aliases.some(
                          (a) =>
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
                              ? "bg-[#00c9ff]/20 text-[#00c9ff] font-semibold border border-[#00c9ff]/40"
                              : "text-white/70 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span className="truncate pr-2">{cat.label}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-mono shrink-0 ${
                              isActive
                                ? "bg-[#00c9ff] text-black font-bold"
                                : "bg-white/10 text-white/60"
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Newsletter Card */}
                <NewsletterCard />
              </div>

              {/* RIGHT COLUMN: BLOG POSTS LISTING */}
              <div className="lg:col-span-9">
                {/* Header Status Bar */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono text-white/60">
                  <span>
                    Showing <span className="text-[#00c9ff] font-bold">{filteredPosts.length}</span> articles
                  </span>

                  {(selectedService !== "All" || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedService("All");
                        setSelectedIndustry("All");
                        setSearchQuery("");
                      }}
                      className="text-[#00c9ff] hover:underline cursor-pointer"
                    >
                      Reset all filters
                    </button>
                  )}
                </div>

                {filteredPosts.length === 0 ? (
                  <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/10 p-8 backdrop-blur-md">
                    <BookOpen className="w-12 h-12 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-light font-serif text-white">No articles found</h3>
                    <p className="text-sm text-white/50 mt-2 max-w-md mx-auto font-light">
                      No articles matched your search or category selection. Try resetting filters.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedService("All");
                        setSelectedIndustry("All");
                        setSearchQuery("");
                      }}
                      className="mt-6 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
                        whileHover={{ y: -6, transition: { duration: 0.25 } }}
                        onClick={() => setActiveArticle(post)}
                        className="group rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#00c9ff]/40 overflow-hidden backdrop-blur-md hover:bg-white/[0.04] flex flex-col justify-between transition-all duration-300 relative shadow-sm hover:shadow-[0_15px_40px_rgba(0,201,255,0.12)] cursor-pointer"
                      >
                        {/* Article Thumbnail */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono tracking-wider text-[#00c9ff] uppercase border border-white/15">
                            {post.service}
                          </div>
                        </div>

                        {/* Article Content */}
                        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-3">
                            {/* Category & Date Tag */}
                            <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                              <span className="text-[#00c9ff]">{post.category}</span>
                              <span>•</span>
                              <span>{post.date}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-base sm:text-lg font-light font-serif text-white group-hover:text-[#73bbff] transition-colors leading-[1.35] line-clamp-2">
                              {post.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>

                          {/* Bottom Action Footer */}
                          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-white/40" />
                              <span>{post.readTime}</span>
                            </span>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveArticle(post);
                              }}
                              className="text-[#00c9ff] flex items-center gap-1 group-hover:translate-x-1 transition-transform font-medium cursor-pointer"
                            >
                              <span>Read Article</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
