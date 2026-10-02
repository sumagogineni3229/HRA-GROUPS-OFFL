"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Mail, ArrowRight, ShieldCheck, Award, Target, CheckCircle2, Sparkles, Filter } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  category: "all" | "engineering" | "hr" | "marketing" | "counselling" | "operations";
  desc: string;
  image: string;
  badge: string;
}

export default function MeetTheTeamPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { scrollY } = useScroll();
  const heroTranslateY = useTransform(scrollY, [0, 500], [0, 90]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.94]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0.35]);

  const teamMembers: TeamMember[] = [
    {
      name: "G. Suma",
      role: "Business Operations Head",
      category: "operations",
      desc: "Managing overall operations, strategic growth, and corporate execution.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/suma-aanDZq8DXVe1cBl8.jpeg",
      badge: "HRA Groups",
    },
    {
      name: "Akhila . P",
      role: "Web Developer",
      category: "engineering",
      desc: "Modern UI and responsive web interfaces.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/akhila-lAfny9fafWpwb76H.jpeg",
      badge: "HRA Groups",
    },
    {
      name: "Pranav . K",
      role: "Web Developer",
      category: "engineering",
      desc: "Scalable and efficient web solutions.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/12-FV7WMppRnE2w3s3i.jpeg",
      badge: "HRA Groups",
    },
    {
      name: "Samrithi . R",
      role: "Human Resources",
      category: "hr",
      desc: "People operations and coordination.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/samrithi-H1lbg3suj8rG47q9.jpeg",
      badge: "HRA Groups",
    },
    {
      name: "Anila . P",
      role: "Web Developer",
      category: "engineering",
      desc: "Frontend development & UI improvements.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/anila-kkFNsyk0bMMoSvoi.jpeg",
      badge: "HRA Groups",
    },
    {
      name: "Ravi . T",
      role: "Digital Marketing",
      category: "marketing",
      desc: "SEO, branding & online growth strategies.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/33-QGM93BCxNrhw6ZSa.jpeg",
      badge: "HRA Groups",
    },
    {
      name: "Santhi . A",
      role: "Career Counsellor",
      category: "counselling",
      desc: "Guiding students toward the right career paths.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/santhi-mSPA76e99f72xDRS.jpeg",
      badge: "HRA Groups",
    },
    {
      name: "D. Ramya",
      role: "Web Development",
      category: "engineering",
      desc: "Clean design and performance focus.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/ramya-aJcIj2uv1I0J30qb.jpeg",
      badge: "HRA Groups",
    },
    {
      name: "Mounika",
      role: "Telecaller",
      category: "operations",
      desc: "Handling customer queries and follow-ups.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/mounika-hZnvwfR9v6kUW569.jpeg",
      badge: "HRA Groups",
    },
    {
      name: "K. Aakansha",
      role: "Human Resources",
      category: "hr",
      desc: "HR operations & communication.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/aakansha-zhfCiYF1j3rosPRN.jpeg",
      badge: "HRA Groups",
    },
    {
      name: "Kushal Sai",
      role: "Digital Marketing",
      category: "marketing",
      desc: "Brand promotion and campaign execution.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img_0283---kushal-sai-b-1-piPaLcCzMaX8gfvM.jpeg",
      badge: "HRA Groups",
    },
    {
      name: "Keerthi",
      role: "Career Counsellor",
      category: "counselling",
      desc: "Career guidance and student mentoring.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/keerthi-keerthi-1-mii5OFVRbeK8e9pf.jpeg",
      badge: "HRA Groups",
    },
    {
      name: "Jabili",
      role: "Web Developer",
      category: "engineering",
      desc: "UI implementation and responsive layouts.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/jabili-sree-polavarapu-LyJTaq0bpmwet19p.jpg",
      badge: "HRA Groups",
    },
    {
      name: "Sirisha",
      role: "Digital Marketing",
      category: "marketing",
      desc: "SEO optimization and social media growth.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/sirisha-ummadisetty-1-x60SOmYbbNWejoj5.jpeg",
      badge: "HRA Groups",
    },
    {
      name: "Aanatha Lakshmi",
      role: "Web Development Intern",
      category: "engineering",
      desc: "Learning and building modern web applications.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img_0190---anu-kadali-1-7xuxcTDkH5jvglId.jpeg",
      badge: "HRA Groups",
    },
    {
      name: "Madhuri Sadanala",
      role: "Web Development Intern",
      category: "engineering",
      desc: "Focused on frontend development and UI design.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/2025-07-22-16-56-36-842---madhuri-sadanala-wal9tXUDXNMS5pCd.jpg",
      badge: "HRA Groups",
    },
    {
      name: "Manjula",
      role: "Human Resources",
      category: "hr",
      desc: "Managing recruitment and employee engagement.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img-20250926-wa0012---manjula-kesanakurthi-d9irfV6sxIWXebK0.jpg",
      badge: "HRA Groups",
    },
    {
      name: "Mahi Naga Iswarya Pakalapati",
      role: "Human Resources",
      category: "hr",
      desc: "Supporting recruitment, employee engagement, and HR operations.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img-20251008-wa0102-1---mahi-pakalapati-mMzem2JNu7C79HA7.jpg",
      badge: "HRA Groups",
    },
    {
      name: "Sreemaa Penta",
      role: "Digital Marketing",
      category: "marketing",
      desc: "Creating digital campaigns and strengthening the brand presence.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/img_9500---sreemaa-penta-63w9mgndIZMK2HLx.jpeg",
      badge: "HRA Groups",
    },
    {
      name: "Medisetti Lakshmi Eeshitha",
      role: "Career Counsellor",
      category: "counselling",
      desc: "Helping students explore career opportunities and professional growth.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/eeshitha---m-eeshitha-mKckk28txNs58gAi.PNG",
      badge: "HRA Groups",
    },
    {
      name: "Alla Chandana Reddy",
      role: "Web Developer",
      category: "engineering",
      desc: "Developing responsive websites with modern technologies.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/chandana---chandana-reddy-alla-h1iXtbHoxMEF3P7C.jpeg",
      badge: "HRA Groups",
    },
    {
      name: "Faezeh Kazemi",
      role: "SEO Specialist",
      category: "marketing",
      desc: "Improving website visibility through strategic SEO optimization.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/1660463590337---faz-kzm-t4M6NTuWsciDdBPC.jpg",
      badge: "HRA Groups",
    },
    {
      name: "B. Shiva Kumar",
      role: "Digital Marketing",
      category: "marketing",
      desc: "Driving online marketing campaigns and audience engagement.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/file_000000008a4472099be949a7b91ee390---shiva-kumar-bavu-pDP3mc6Z7MID8D9a.png",
      badge: "HRA Groups",
    },
    {
      name: "Talluri Sathya Prasad",
      role: "Video Editor",
      category: "marketing",
      desc: "Producing engaging video content for digital platforms.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/fb_img_1768241746122---sathya-prasad-8JMF4OFRdj5nyRNz.jpg",
      badge: "HRA Groups",
    },
    {
      name: "Vaishnavi Varma",
      role: "Social Media Manager",
      category: "marketing",
      desc: "Managing social media strategy, branding, and community engagement.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/copy_4f60dc00-9df1-41b8-941a-9d29e29698b4---vaishnavi-varma-wfJyA6EJzpEmjaAw.JPEG",
      badge: "HRA Groups",
    },
    {
      name: "Aakanksha",
      role: "Business Development Executive",
      category: "operations",
      desc: "Building client relationships and driving business growth initiatives.",
      image: "https://assets.zyrosite.com/Y4LvROeE7gfaLJG1/image_1778832110615---aakanksha-tikka-A7wJDY3I0zCpHeX3.jpg",
      badge: "HRA Groups",
    },
  ];

  const categories = [
    { id: "all", label: "All Members", count: teamMembers.length },
    { id: "engineering", label: "Web & Tech", count: teamMembers.filter((m) => m.category === "engineering").length },
    { id: "hr", label: "Human Resources", count: teamMembers.filter((m) => m.category === "hr").length },
    { id: "marketing", label: "Marketing & Media", count: teamMembers.filter((m) => m.category === "marketing").length },
    { id: "counselling", label: "Career Mentors", count: teamMembers.filter((m) => m.category === "counselling").length },
    { id: "operations", label: "Operations & Business", count: teamMembers.filter((m) => m.category === "operations").length },
  ];

  const filteredMembers =
    selectedCategory === "all"
      ? teamMembers
      : teamMembers.filter((m) => m.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070c18] text-[#172947] dark:text-slate-100 font-sans selection:bg-[#0052cc]/20 selection:text-[#003882]">
      <Navbar />

      {/* HERO BANNER WITH IT BUILDING BACKGROUND & STICKY PARALLAX */}
      <section className="sticky top-0 z-0 bg-[#001738] dark:bg-[#050b17] min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] pt-24 pb-36 sm:pt-32 sm:pb-44 lg:pt-36 lg:pb-52 flex items-center overflow-hidden">
        {/* IT Building background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none scale-105 transform transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')`,
            backgroundPosition: "center 35%",
          }}
        />

        {/* High-end gradient overlay for perfect readability matching logo colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00142e]/95 via-[#012768]/88 to-[#00142e]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,82,204,0.45),transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,20,46,0.1),rgba(0,20,46,0.6))] pointer-events-none" />

        {/* Subtle grid mesh overlay */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <motion.div
          style={{ y: heroTranslateY, opacity: heroOpacity, scale: heroScale }}
          className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10"
        >
          <div className="max-w-3xl space-y-6 sm:space-y-8">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-xs sm:text-sm font-bold tracking-[0.22em] text-[#8dc2ff] uppercase backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#93c5fd]" />
              <span>PASSION</span>
              <span className="text-blue-300/60">•</span>
              <span>INNOVATION</span>
              <span className="text-blue-300/60">•</span>
              <span>EXCELLENCE</span>
            </div>

            {/* Slim Heading in Clean White & Sky Blue */}
            <h1 className="text-[38px] sm:text-[50px] md:text-[58px] lg:text-[66px] xl:text-[74px] font-normal tracking-[-0.025em] leading-[1.1] text-white drop-shadow-sm">
              Meet the People Behind <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-white via-sky-100 to-[#65acff] bg-clip-text text-transparent font-medium">HRA Groups</span>
            </h1>

            <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-slate-200 font-normal leading-[1.7] max-w-[620px]">
              A passionate, multi-disciplinary team driving innovation, high-performance web engineering,
              talent acquisition, digital growth, and student mentoring.
            </p>
          </div>
        </motion.div>
      </section>

      {/* WRAPPER FOR FILTER AND CONTENT AS AN ELEVATED OVERLAPPING SHEET */}
      <div className="relative z-10 bg-[#f8fafc] dark:bg-[#090e1a] rounded-t-[36px] sm:rounded-t-[48px] lg:rounded-t-[60px] shadow-[0_-25px_60px_rgba(0,18,48,0.3)] border-t border-white/80 dark:border-slate-800/80 overflow-hidden">
        {/* FILTER TABS STRIP */}
        <section className="bg-white/95 dark:bg-[#0c1427]/95 border-b border-slate-200/80 dark:border-slate-800/80 sticky top-[80px] z-30 shadow-xs backdrop-blur-md">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-4 sm:py-5">
            <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {categories.map((cat) => {
                  const active = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2.5 cursor-pointer ${active
                          ? "bg-[#013b9a] text-white shadow-md shadow-blue-900/15 scale-[1.02]"
                          : "bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                        }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${active ? "bg-white/20 text-white" : "bg-slate-200/90 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300"
                          }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <span className="hidden xl:inline-block text-xs font-semibold text-slate-400 dark:text-slate-400 shrink-0">
                Showing <span className="text-[#013b9a] dark:text-sky-400 font-bold">{filteredMembers.length}</span> professionals
              </span>
            </div>
          </div>
        </section>

        {/* TEAM GRID SECTION */}
        <section className="py-12 sm:py-16 lg:py-20">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredMembers.map((member) => (
              <div
                key={member.name}
                className="group relative rounded-3xl bg-white dark:bg-[#0c1427] border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-300 dark:hover:border-blue-500/50 p-6 sm:p-7 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 dark:hover:shadow-blue-950/40 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Subtle Hover Gradient */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-blue-50 dark:from-blue-600/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  {/* Circular Avatar with Gold Accent Border */}
                  <div className="relative w-28 h-28 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-[#dfb76c] via-[#f7d68a] to-[#013b9a] shadow-md group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-1.5 w-full">
                    <h3 className="text-lg font-bold text-[#14233c] dark:text-slate-100 group-hover:text-[#0052cc] dark:group-hover:text-sky-400 transition-colors line-clamp-1">
                      {member.name}
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0052cc] dark:text-sky-400 block">
                      {member.role}
                    </span>
                    <p className="text-xs sm:text-[13px] text-[#5c6f84] dark:text-slate-400 leading-relaxed pt-1 line-clamp-2">
                      {member.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Gold/Navy Badge */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between relative z-10">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#013b9a] dark:text-sky-300 border border-blue-100/80 dark:border-blue-800/50">
                    <Sparkles className="w-3 h-3 text-[#dfb76c]" />
                    <span>{member.badge}</span>
                  </span>

                  <Link
                    href="/contact"
                    className="text-xs font-semibold text-slate-400 dark:text-slate-400 hover:text-[#0052cc] dark:hover:text-sky-400 transition-colors flex items-center gap-1 group/btn"
                  >
                    <span>Connect</span>
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Join our team CTA Card */}
          <div className="mt-16 sm:mt-20 rounded-3xl bg-gradient-to-r from-[#013b9a] via-[#0047ab] to-[#002244] dark:from-[#031c47] dark:via-[#012768] dark:to-[#02132b] p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-400/20 dark:border-blue-500/20">
            <div className="space-y-3 text-center md:text-left max-w-2xl">
              <span className="text-xs font-bold tracking-widest text-[#fce092] uppercase">
                WE ARE GROWING
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Want to Join the HRA Groups Team?
              </h2>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                We are always seeking passionate engineers, designers, HR experts, and marketing innovators to join our team in Hyderabad and beyond.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href="/careers"
                className="px-8 py-3.5 rounded-full bg-white text-[#013b9a] hover:bg-blue-50 font-bold text-sm shadow-md transition-all duration-300 hover:scale-[1.03]"
              >
                View Open Positions
              </Link>
              <Link
                href="/internship"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-sm transition-all duration-300"
              >
                Apply for Internship
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </div>
  );
}
