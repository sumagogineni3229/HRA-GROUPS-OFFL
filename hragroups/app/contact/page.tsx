"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  Clock,
  Globe,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Building2,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

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
    <div className="min-h-screen bg-white text-[#172947] font-sans selection:bg-[#0052cc]/20 selection:text-[#003882]">
      {/* Global Header */}
      <Navbar />

      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <section className="relative text-white pt-20 pb-24 lg:pt-28 lg:pb-32 border-b border-slate-200 overflow-hidden">
        {/* Background Image with Pure Transparent Border Blur */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://www.priorityfootwear.com/hs-fs/hubfs/green-background-with-green-phone-to-contact-our-diabetic-foot-care-clinics-customer-service.webp?width=1200&height=409&name=green-background-with-green-phone-to-contact-our-diabetic-foot-care-clinics-customer-service.webp"
            alt="Contact Us Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Pure Transparent Border Blur (No Black Tints) */}
          <div className="absolute inset-0 pointer-events-none backdrop-blur-md [mask-image:radial-gradient(ellipse_at_center,transparent_55%,black_100%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,transparent_55%,black_100%)]" />
        </div>

        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-700/80 text-xs sm:text-sm font-bold tracking-[0.2em] text-white uppercase shadow-md mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>GET IN TOUCH</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)]">
              Contact Us
            </h1>

            <p className="text-white text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              Feel free to contact us with any questions or concerns. You can use the form below or email us directly. We appreciate your interest and look forward to hearing from you.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Left Column: Direct Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl bg-slate-50/80 border border-slate-200/80 p-8 sm:p-10 shadow-sm space-y-8">
                <div>
                  <h3 className="text-2xl font-extrabold text-[#172947]">
                    Let's Build Something Great Together
                  </h3>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                    Contact HRA Groups for IT services, internships, training programs, web development solutions, certifications, and business inquiries.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm text-blue-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Our Location
                      </span>
                      <p className="text-base font-semibold text-slate-900 mt-0.5">
                        Hyderabad, Telangana, India
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm text-blue-600">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Call Us Directly
                      </span>
                      <a
                        href="tel:+919676272283"
                        className="text-base font-semibold text-slate-900 hover:text-blue-600 transition-colors mt-0.5 block"
                      >
                        +91 967 627 2283
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm text-blue-600">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Email Us
                      </span>
                      <a
                        href="mailto:contact@hragroups.com"
                        className="text-base font-semibold text-slate-900 hover:text-blue-600 transition-colors mt-0.5 block"
                      >
                        contact@hragroups.com
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-sm text-blue-600">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        Operational Hours
                      </span>
                      <p className="text-base font-semibold text-slate-900 mt-0.5">
                        Monday – Saturday: 9:00 AM – 7:00 PM IST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge Card */}
              <div className="rounded-3xl bg-gradient-to-br from-[#1b2d6b] to-[#0c1b3f] text-white p-8 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-sky-400" />
                  <h4 className="font-bold text-lg text-white">Guaranteed Fast Response</h4>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Our engagement managers and technical teams review incoming inquiries promptly. You can expect a response within 24 business hours.
                </p>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-xl relative">
                {submitted ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#172947]">
                      Thank You!
                    </h3>
                    <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                      Your message has been received successfully. A representative from HRA Groups will reach out to you shortly.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-all"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 mb-6">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#172947]">
                        Send Us a Message
                      </h3>
                      <p className="text-slate-500 text-sm">
                        Please fill out the form and our team will get back to you right away.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
                          placeholder="Your name"
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                        />
                      </div>

                      {/* Last Name */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                          placeholder="Your last name"
                          className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="Your email address"
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Enter your message..."
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#1b2d6b] hover:bg-[#152355] text-white text-sm font-semibold tracking-wide transition-all shadow-[0_4px_14px_rgba(27,45,107,0.35)] hover:shadow-[0_6px_20px_rgba(27,45,107,0.45)] active:scale-98 disabled:opacity-50 cursor-pointer"
                      >
                        <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
