"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Users2,
  Cpu,
  Target,
  BarChart3,
  Globe2,
  Briefcase,
  Layers,
  ChevronRight,
  Award,
} from "lucide-react";

export default function ClientsPage() {
  const { scrollY } = useScroll();
  const heroTranslateY = useTransform(scrollY, [0, 500], [0, -35]);

  // Authentic verified logos from hragroups.com/clients
  const clientLogos = [
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

  // Verified Client Collaborations with description
  const clientCollaborations = [
    {
      name: "ABH IT Solutions",
      category: "Software & Operations",
      desc: "Software development, recruitment, and operational support to improve efficiency and business growth.",
      icon: <Cpu className="w-6 h-6 text-[#0052cc]" />,
    },
    {
      name: "RN Innovation Technologies",
      category: "Strategic Tech Partnership",
      desc: "Strategic technology partnership focused on innovation, collaboration, and long-term business success.",
      icon: <Layers className="w-6 h-6 text-[#0052cc]" />,
    },
    {
      name: "Vectura Earthmoving Pvt. Ltd.",
      category: "Enterprise Solutions",
      desc: "Custom software solutions that streamline operations and strengthen digital capabilities.",
      icon: <Building2 className="w-6 h-6 text-[#0052cc]" />,
    },
    {
      name: "Madhurams Malikipuram",
      category: "Web & Digital Marketing",
      desc: "Website development and digital marketing services that improve online visibility and customer engagement.",
      icon: <Globe2 className="w-6 h-6 text-[#0052cc]" />,
    },
    {
      name: "TheCconnects",
      category: "Innovation & Growth",
      desc: "Professional collaboration focused on innovation, shared goals, and creating new business opportunities.",
      icon: <Users2 className="w-6 h-6 text-[#0052cc]" />,
    },
    {
      name: "HCL",
      category: "Recruitment & Talent",
      desc: "Recruitment support by connecting skilled professionals with organizational hiring requirements.",
      icon: <Briefcase className="w-6 h-6 text-[#0052cc]" />,
    },
    {
      name: "Wipro",
      category: "Workforce Solutions",
      desc: "Talent acquisition support to help build a highly skilled and future-ready workforce.",
      icon: <Target className="w-6 h-6 text-[#0052cc]" />,
    },
    {
      name: "Tombest Mining",
      category: "Software Development",
      desc: "Reliable software development solutions designed to improve productivity and digital transformation.",
      icon: <BarChart3 className="w-6 h-6 text-[#0052cc]" />,
    },
    {
      name: "SyncPedia",
      category: "EdTech Collaboration",
      desc: "EdTech collaboration promoting technology-driven learning and continuous skill development.",
      icon: <Award className="w-6 h-6 text-[#0052cc]" />,
    },
    {
      name: "Gayathri Infra Pvt. Ltd.",
      category: "Operational Efficiency",
      desc: "Customized software solutions that enhance operational efficiency and business performance.",
      icon: <Building2 className="w-6 h-6 text-[#0052cc]" />,
    },
    {
      name: "K-Learn World",
      category: "EdTech & Learning",
      desc: "EdTech partnership supporting quality education, innovation, and career-focused learning.",
      icon: <Sparkles className="w-6 h-6 text-[#0052cc]" />,
    },
  ];

  // Value Pillars from official clients page
  const valuePillars = [
    {
      title: "Talent Enablement",
      desc: "Structured training, workforce development, and capability-building programs designed to strengthen employee performance and organizational success.",
      icon: <Users2 className="w-7 h-7 text-[#0052cc]" />,
    },
    {
      title: "Operational Support",
      desc: "Streamlined operational processes, recruitment solutions, and business support services that improve efficiency, productivity, and sustainable growth.",
      icon: <Layers className="w-7 h-7 text-[#0052cc]" />,
    },
    {
      title: "Strategic Collaboration",
      desc: "Long-term partnerships focused on innovation, digital transformation, technology solutions, and delivering measurable business outcomes.",
      icon: <Target className="w-7 h-7 text-[#0052cc]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#070c18] text-[#172947] dark:text-slate-100 font-sans selection:bg-[#0052cc]/20 selection:text-[#003882] transition-colors duration-300">
      <Navbar />

      {/* HERO BANNER */}
      <section className="relative bg-[#384968] dark:bg-[#050b17] min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] pt-24 pb-28 sm:pt-32 sm:pb-36 lg:pt-36 lg:pb-40 flex items-center justify-center text-center overflow-hidden border-b border-slate-700/50 dark:border-slate-800">
        {/* Subtle radial glow & background lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,102,241,0.18),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(56,102,241,0.25),transparent_70%)] pointer-events-none" />

        <motion.div
          style={{ y: heroTranslateY }}
          className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto space-y-6 sm:space-y-8"
          >
            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs sm:text-sm font-bold tracking-[0.25em] text-[#b8d7ff] uppercase backdrop-blur-sm shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#93c5fd]" />
              <span>TRUSTED PARTNERSHIPS • PROVEN SUCCESS</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[40px] sm:text-[54px] md:text-[64px] lg:text-[72px] xl:text-[80px] font-normal tracking-[-0.03em] leading-[1.08] text-white drop-shadow-sm"
            >
              Our Clients &amp; <br className="hidden sm:inline" />
              <span className="font-semibold text-white">Partnerships</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="text-[16px] sm:text-[18px] lg:text-[19px] text-slate-200 dark:text-slate-300 font-normal leading-[1.7] max-w-3xl mx-auto"
            >
              Our approach is grounded in clarity, accountability, and measurable outcomes, ensuring every engagement delivers sustained value.
            </motion.p>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="pt-2"
            >
              <a
                href="#partnerships"
                className="inline-flex items-center justify-center px-10 py-3.5 rounded-full bg-white text-[#0052cc] hover:text-[#002f80] hover:bg-sky-50 font-bold text-[15px] shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-[1.03]"
              >
                <span>Explore Client Collaborations</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* INFINITE LOGO MARQUEE SLIDER - ENLARGED & AUTO-SCROLLING */}
      <section className="py-14 sm:py-16 bg-slate-50/80 dark:bg-[#090e1a] border-b border-slate-200/80 dark:border-slate-800/80 overflow-hidden relative transition-colors duration-300">
        <div className="w-full max-w-[1720px] mx-auto px-6 mb-8 text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 text-xs font-bold uppercase tracking-[0.22em] text-[#0052cc] dark:text-sky-300">
            <Building2 className="w-3.5 h-3.5 text-[#0052cc] dark:text-sky-400" />
            <span>Organizations Trusting HRA Groups</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#001f4d] dark:text-white tracking-tight">
            Valued Industry Partners
          </h2>
        </div>

        {/* Gradient edge masks for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-slate-50 dark:from-[#090e1a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-slate-50 dark:from-[#090e1a] to-transparent z-10 pointer-events-none" />

        <div className="relative w-full overflow-x-hidden py-2">
          <div className="animate-marquee flex items-center gap-8 sm:gap-10 whitespace-nowrap">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((client, idx) => (
              <div
                key={idx}
                className="h-28 sm:h-36 w-56 sm:w-72 bg-white dark:bg-[#0c1427] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 flex items-center justify-center shrink-0 shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 hover:scale-105 transition-all duration-300 group cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-full max-w-full object-contain filter group-hover:scale-110 transition-transform duration-300 rounded-lg dark:bg-white/95 dark:p-1.5"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORGANIZATIONS WE WORK WITH - GRID SECTION */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#070c18] transition-colors duration-300">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 space-y-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 text-xs font-bold uppercase tracking-widest text-[#0052cc] dark:text-sky-300">
              <Building2 className="w-3.5 h-3.5 text-[#0052cc] dark:text-sky-400" />
              <span>Client Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001f4d] dark:text-white tracking-tight">
              Organizations We Work With
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              We collaborate with a diverse portfolio of organizations ranging from emerging enterprises to established industry leaders. Each partnership reflects our commitment to quality execution and consistent delivery.
            </p>
          </motion.div>

          {/* Logo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {clientLogos.map((client, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                className="group rounded-3xl bg-[#f8fafc] dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 p-6 sm:p-8 flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 hover:shadow-[0_16px_36px_rgba(0,82,204,0.08)] cursor-pointer"
              >
                <div className="h-24 w-full flex items-center justify-center p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300 rounded-lg dark:bg-white/95 dark:p-1.5"
                    loading="lazy"
                  />
                </div>
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 w-full">
                  <h3 className="text-xs sm:text-sm font-bold text-[#001f4d] dark:text-white group-hover:text-[#0052cc] dark:group-hover:text-sky-400 transition-colors truncate">
                    {client.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATIONSHIPS PROMISE STRIP */}
      <section className="py-16 sm:py-20 bg-[#001738] dark:bg-[#050b17] text-white relative overflow-hidden border-t dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,102,241,0.15),transparent_70%)] pointer-events-none" />

        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 space-y-4"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#8dc2ff]">
                Built on Trust &amp; Transparency
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                Long-Term Partnerships <br />
                <span className="bg-gradient-to-r from-sky-200 via-sky-100 to-[#65acff] bg-clip-text text-transparent">
                  Driven by Value
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-6 space-y-4 text-slate-300 dark:text-slate-400 text-sm sm:text-base leading-relaxed"
            >
              <p>
                At HRA Groups, our client relationships are built on trust, transparency, and consistent delivery. We invest time in understanding organizational challenges, industry context, and long-term objectives.
              </p>
              <p>
                Our teams work closely with stakeholders to design solutions that are practical, scalable, and aligned with evolving business needs, ensuring long-term partnership success.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CLIENT COLLABORATIONS SECTION */}
      <section id="partnerships" className="py-20 sm:py-24 bg-white dark:bg-[#090e1a] border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 space-y-12">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 text-xs font-bold uppercase tracking-widest text-[#0052cc] dark:text-sky-300">
                <Layers className="w-3.5 h-3.5 text-[#0052cc] dark:text-sky-400" />
                <span>Strategic Engagements</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001f4d] dark:text-white tracking-tight">
                Client Collaborations
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              We deliver technology, recruitment, digital marketing, and business solutions through trusted partnerships that drive innovation and sustainable growth.
            </p>
          </motion.div>

          {/* Collaborations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {clientCollaborations.map((collab, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group rounded-3xl bg-[#f8fafc] dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_45px_rgba(0,82,204,0.08)] cursor-pointer relative overflow-hidden"
              >
                {/* Top glow accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0052cc] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100/80 dark:border-blue-800/60 text-xs font-bold uppercase tracking-wider text-[#0052cc] dark:text-sky-300">
                      {collab.category}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 group-hover:bg-[#0052cc] group-hover:text-white transition-colors shadow-xs">
                      {collab.icon}
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#001f4d] dark:text-white group-hover:text-[#0052cc] dark:group-hover:text-sky-400 transition-colors">
                    {collab.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {collab.desc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#0052cc] dark:text-sky-400">
                  <span>Partner Engagement</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CORE VALUE & SERVICES SECTION */}
      <section className="py-20 sm:py-24 bg-[#f8fafc] dark:bg-[#070c18] transition-colors duration-300">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 space-y-14">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 text-xs font-bold uppercase tracking-widest text-[#0052cc] dark:text-sky-300">
              <Sparkles className="w-3.5 h-3.5 text-[#0052cc] dark:text-sky-400" />
              <span>Core Value Offerings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001f4d] dark:text-white tracking-tight">
              Comprehensive Partner Capabilities
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Empowering organizations with high-impact talent enablement, operations excellence, and strategic consulting.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valuePillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0c1427] border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-[0_20px_45px_rgba(0,82,204,0.08)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center group-hover:bg-[#0052cc] group-hover:text-white transition-colors duration-300">
                    {React.cloneElement(pillar.icon, {
                      className: "w-7 h-7 text-[#0052cc] dark:text-sky-400 group-hover:text-white transition-colors",
                    })}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#001f4d] dark:text-white group-hover:text-[#0052cc] dark:group-hover:text-sky-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-[#0052cc] dark:text-sky-400">
                  <span>Discover Solutions</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA SECTION: PARTNER WITH US */}
      <section className="py-16 sm:py-20 bg-[#001738] dark:bg-[#050b17] text-white relative overflow-hidden border-t dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,102,241,0.15),transparent_70%)] pointer-events-none" />

        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto space-y-4"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#8dc2ff]">
              Work With Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Ready to Accelerate Your Business?
            </h2>
            <p className="text-slate-300 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Partner with HRA Groups for cutting-edge software development, talent acquisition, and digital transformation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/contact"
                className="px-9 py-3.5 rounded-full bg-[#0052cc] hover:bg-[#003882] text-white font-bold text-sm shadow-[0_8px_30px_rgba(0,82,204,0.35)] transition-all duration-200 hover:scale-[1.03]"
              >
                Become a Partner
                <ArrowRight className="w-4 h-4 inline-block ml-2" />
              </Link>
              <Link
                href="/careers"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm backdrop-blur-sm transition-all duration-200"
              >
                Explore Careers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
