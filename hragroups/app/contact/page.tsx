"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BigPolygonBackground from "@/components/BigPolygonBackground";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  Clock,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const CONTACT_HERO_PHRASES = [
  "Contact HRA Groups",
  "Let's Build Something Great Together",
  "Start The Conversation Today",
  "Reach Our Global Tech Advisors",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  // Typewriter text animation state (identical to Work, Careers, About pages)
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  useEffect(() => {
    const fullText = CONTACT_HERO_PHRASES[phraseIndex];

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
          setPhraseIndex((prev) => (prev + 1) % CONTACT_HERO_PHRASES.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, typingSpeed]);

  const { scrollY } = useScroll();
  const heroContentY = useTransform(scrollY, [0, 500], [0, -35]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/inquiries/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            message: "",
          });
        }, 5000);
      } else {
        alert(data.error || "Failed to submit message.");
      }
    } catch (err) {
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ibase-landing-bg text-white min-h-screen selection:bg-[#00c9ff]/30 selection:text-[#00c9ff] relative overflow-x-hidden font-sans">
      {/* Global Header */}
      <Navbar />

      {/* Global Background Layer with Big Polygons (Exact match to other pages) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        <BigPolygonBackground opacityClass="opacity-75" />
        <div className="absolute top-[10%] -left-[10%] w-[650px] h-[650px] bg-[#00c9ff]/[0.035] rounded-full blur-[220px]" />
        <div className="absolute top-[50%] -right-[15%] w-[800px] h-[800px] bg-[#1e1cb0]/[0.05] rounded-full blur-[250px]" />
      </div>

      <main className="relative z-20">
        {/* HERO SECTION - CENTERED WITH TYPEWRITER ANIMATION & POLISHED AESTHETIC */}
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6 sm:px-10 lg:px-16 pt-24 pb-20 text-center">
          <motion.div
            style={{ y: heroContentY }}
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
              <span>GET IN TOUCH</span>
            </motion.div>

            {/* Typewriter Animated Display Headline */}
            <div className="min-h-[110px] sm:min-h-[140px] md:min-h-[160px] flex items-center justify-center w-full px-2">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-light text-white tracking-[-0.03em] leading-[1.08] text-center font-serif">
                <span className="text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.2)]">
                  {currentText}
                </span>
                <span className="text-[#00c9ff] ml-1.5 font-light animate-[pulse_1s_infinite]">|</span>
              </h1>
            </div>

            {/* Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="space-y-4 max-w-2xl mx-auto"
            >
              <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
                Feel free to contact us with any questions or concerns. You can use the form below or email us directly. We appreciate your interest and look forward to hearing from you.
              </p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-4 pt-4"
              >
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center px-9 py-4 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black font-semibold text-sm tracking-wide shadow-[0_0_30px_rgba(0,201,255,0.35)] hover:shadow-[0_0_45px_rgba(0,201,255,0.55)] transition-all duration-300 hover:scale-[1.03]"
                >
                  <span>Send a Message</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>

                <a
                  href="https://wa.me/919676272283?text=Hello%20HRA%20Groups%20Team!%20I%20have%20an%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-sm backdrop-blur-md transition-all duration-300"
                >
                  <span>Chat on WhatsApp ↗</span>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom Animated Scroll Indicator */}
          <button
            onClick={() => {
              const el = document.getElementById("contact-details");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40 hover:text-[#00c9ff] transition-colors duration-300 cursor-pointer group"
            aria-label="Scroll to explore contact information"
          >
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase group-hover:tracking-[0.3em] transition-all">
              Scroll to explore
            </span>
            <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-[#00c9ff]/60 flex items-start justify-center p-1 transition-colors">
              <div className="w-1 h-2 bg-[#00c9ff] rounded-full animate-bounce" />
            </div>
            <ChevronDown className="w-4 h-4 -mt-1 text-[#00c9ff] animate-pulse" />
          </button>
        </section>

        {/* MAIN CONTENT SECTION */}
        <section id="contact-details" className="py-20 sm:py-24 border-t border-white/10 relative">
          <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Left Column: Direct Info Cards */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#00c9ff] block mb-2">
                      COMMUNICATION CHANNELS
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-light font-serif text-white">
                      Let's Build Something Great Together
                    </h3>
                    <p className="text-white/60 text-xs sm:text-sm mt-3 leading-relaxed font-light">
                      Contact HRA Groups for IT services, internships, training programs, web development solutions, certifications, and business inquiries.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* Location */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#00c9ff]">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block">
                          Our Location
                        </span>
                        <p className="text-sm font-medium text-white mt-0.5">
                          Hyderabad, Telangana, India
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#00c9ff]">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block">
                          Call Us Directly
                        </span>
                        <a
                          href="tel:+919676272283"
                          className="text-sm font-medium text-white hover:text-[#00c9ff] transition-colors mt-0.5 block"
                        >
                          +91 967 627 2283
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#00c9ff]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block">
                          Email Us
                        </span>
                        <a
                          href="mailto:contact@hragroups.com"
                          className="text-sm font-medium text-white hover:text-[#00c9ff] transition-colors mt-0.5 block"
                        >
                          contact@hragroups.com
                        </a>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-[#00c9ff]">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block">
                          Operational Hours
                        </span>
                        <p className="text-sm font-medium text-white mt-0.5">
                          Monday – Saturday: 9:00 AM – 7:00 PM IST
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Badge Card */}
                <div className="rounded-3xl bg-gradient-to-br from-[#08172a] via-[#040e1c] to-black p-8 shadow-2xl space-y-3 border border-white/15 backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#00c9ff]/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex items-center gap-3 relative z-10">
                    <ShieldCheck className="w-6 h-6 text-[#00c9ff]" />
                    <h4 className="font-serif font-light text-lg text-white">Guaranteed Fast Response</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light relative z-10">
                    Our engagement managers and technical teams review incoming inquiries promptly. You can expect a response within 24 business hours.
                  </p>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div id="contact-form" className="lg:col-span-7">
                <div id="form" className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl relative">
                  {submitted ? (
                    <div className="text-center py-16 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-light font-serif text-white">
                        Thank You!
                      </h3>
                      <p className="text-emerald-300/90 max-w-md mx-auto text-sm leading-relaxed font-light">
                        Your message has been received successfully. A representative from HRA Groups will reach out to you shortly.
                      </p>
                      <div className="pt-4">
                        <button
                          onClick={() => setSubmitted(false)}
                          className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Send Another Message
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2 mb-6">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#00c9ff]">
                          DIRECT INQUIRY
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-light font-serif text-white">
                          Send Us a Message
                        </h3>
                        <p className="text-white/60 text-xs sm:text-sm font-light">
                          Please fill out the form and our team will get back to you right away.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* First Name */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono text-white/70 uppercase tracking-wider block">
                            Name <span className="text-[#00c9ff]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData({ ...formData, firstName: e.target.value })
                            }
                            placeholder="Your name"
                            className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#00c9ff] transition-all"
                          />
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2">
                          <label className="text-xs font-mono text-white/70 uppercase tracking-wider block">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData({ ...formData, lastName: e.target.value })
                            }
                            placeholder="Your last name"
                            className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#00c9ff] transition-all"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-white/70 uppercase tracking-wider block">
                          Your Email <span className="text-[#00c9ff]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="Your email address"
                          className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#00c9ff] transition-all"
                        />
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono text-white/70 uppercase tracking-wider block">
                          Message <span className="text-[#00c9ff]">*</span>
                        </label>
                        <textarea
                          rows={5}
                          required
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          placeholder="Enter your message..."
                          className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-[#00c9ff] transition-all resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0070f3] text-black text-sm font-semibold tracking-wide shadow-[0_0_30px_rgba(0,201,255,0.4)] hover:shadow-[0_0_45px_rgba(0,201,255,0.7)] transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
                        >
                          <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                          <Send className="w-4 h-4 text-black" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
