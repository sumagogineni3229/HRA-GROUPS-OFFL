"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CheckCircle2,
  ShieldCheck,
  User,
  KeyRound,
  FileCheck2,
  Sparkles,
  Download,
  ShieldAlert,
  Lock,
  BadgeCheck,
} from "lucide-react";

export default function CertificatePortalPage() {
  const [holderName, setHolderName] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [verifiedResult, setVerifiedResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setVerifiedResult(null);

    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify",
          holderName,
          certificateId,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.certificate) {
        setVerifiedResult(data.certificate);
      } else {
        setErrorMsg(data.error || "Certificate verification failed. Please check the details and try again.");
      }
    } catch (err) {
      setErrorMsg("Network error occurred while verifying credential. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#070c18] text-[#172947] dark:text-slate-100 font-sans selection:bg-[#0052cc]/20 selection:text-[#003882] flex flex-col justify-between">
      <Navbar />

      {/* 50-50 FULLSCREEN SECTION (ATTACHED DIRECTLY WITH NAV) */}
      <main className="flex-1 w-full pt-0 flex flex-col">
        <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-80px)]">
          
          {/* LEFT 50%: FULL-BLEED FULLSCREEN COVER IMAGE PANEL */}
          <div className="relative w-full h-[360px] sm:h-[440px] lg:h-full min-h-full overflow-hidden bg-slate-950">
            {/* Fullscreen Cover Image */}
            <img
              src="/certificate-art.png"
              alt="Certificate Verification and Validation"
              className="w-full h-full object-cover object-center"
            />

            {/* Dark & Blue Gradient Vignette for Premium Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#061022]/90 via-[#061022]/30 to-[#061022]/40 pointer-events-none" />

            {/* Top Status Header Badge */}
            <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 text-white text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Tamper-Proof Registry</span>
              </div>
              <div className="text-xs font-mono text-white/80 tracking-wider bg-black/50 px-3 py-1 rounded-full backdrop-blur-xs border border-white/10">
                SECURE • SHA-256
              </div>
            </div>

            {/* Floating Authenticated Badges on Top of Image */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div />
              <div className="space-y-3">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/70 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-bold text-white shadow-2xl"
                >
                  <BadgeCheck className="w-4 h-4 text-emerald-400" />
                  <span>HRA Global Credential Authority</span>
                </motion.div>

                {/* Bottom Metrics Bar */}
                <div className="pt-4 border-t border-white/20 grid grid-cols-3 gap-3 text-center text-xs backdrop-blur-md bg-black/50 rounded-2xl p-3 border border-white/10">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase tracking-wider text-slate-300 block font-bold">Security</span>
                    <span className="font-bold text-white text-xs sm:text-sm">256-Bit SSL</span>
                  </div>
                  <div className="space-y-0.5 border-x border-white/20">
                    <span className="text-[10px] uppercase tracking-wider text-slate-300 block font-bold">Response</span>
                    <span className="font-bold text-emerald-400 text-xs sm:text-sm">Instant 0.2s</span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase tracking-wider text-slate-300 block font-bold">Issuer</span>
                    <span className="font-bold text-white text-xs sm:text-sm">HRA Groups</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT 50%: FULLSCREEN SEAMLESS VERIFICATION FORM (FULL BLEED LIGHT ORANGE) */}
          <div className="w-full bg-[#fff9f5] dark:bg-[#090e1a] flex flex-col justify-center items-center p-8 sm:p-12 lg:p-16 xl:p-20 border-l border-orange-100 dark:border-slate-800">
            <div className="w-full max-w-xl mx-auto space-y-6 my-auto">
              
              {/* Header Exact Match */}
              <div className="border-b border-orange-200/80 dark:border-slate-800 pb-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ea580c] dark:text-orange-400 bg-orange-100/70 dark:bg-orange-950/60 px-3.5 py-1.5 rounded-full mb-3 border border-orange-200 dark:border-orange-800/60">
                  <Sparkles className="w-3.5 h-3.5 text-[#ea580c] dark:text-orange-400" />
                  <span>Instant Verification</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172947] dark:text-white tracking-tight leading-tight">
                  Verify Your Certificate
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
                  Enter the exact details printed on your certificate.
                </p>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Verification Error</span>
                    <span>{errorMsg}</span>
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <form onSubmit={handleVerify} className="space-y-5">
                {/* 1. Certificate Holder Name */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-extrabold text-[#172947] dark:text-slate-300 block">
                    Certificate Holder Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={holderName}
                      onChange={(e) => setHolderName(e.target.value)}
                      placeholder="Enter certificate holder name"
                      className="w-full pl-11 pr-4 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-[#0c1427] border-2 border-orange-200/90 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-600/50 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm sm:text-base font-medium shadow-sm focus:outline-none focus:border-[#ea580c] dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15 transition-all"
                    />
                    <User className="w-5 h-5 text-orange-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* 2. Certificate ID */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-extrabold text-[#172947] dark:text-slate-300 block">
                    Certificate ID <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={certificateId}
                      onChange={(e) => setCertificateId(e.target.value)}
                      placeholder="Example: HRA-0001"
                      className="w-full pl-11 pr-4 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-[#0c1427] border-2 border-orange-200/90 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-600/50 text-slate-900 dark:text-white placeholder:text-slate-400 font-mono text-sm sm:text-base font-semibold uppercase shadow-sm focus:outline-none focus:border-[#ea580c] dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15 transition-all"
                    />
                    <FileCheck2 className="w-5 h-5 text-orange-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* 3. Verification Password */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-extrabold text-[#172947] dark:text-slate-300 block">
                    Verification Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter verification password"
                      className="w-full pl-11 pr-4 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-[#0c1427] border-2 border-orange-200/90 dark:border-slate-800 hover:border-orange-300 dark:hover:border-orange-600/50 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm sm:text-base font-medium shadow-sm focus:outline-none focus:border-[#ea580c] dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15 transition-all"
                    />
                    <KeyRound className="w-5 h-5 text-orange-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer mt-3"
                >
                  {loading ? (
                    <span>Verifying Credentials...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>Verify Certificate</span>
                    </>
                  )}
                </button>
              </form>

              {/* Verified Result Card */}
              <AnimatePresence>
                {verifiedResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12 }}
                    className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800 p-6 space-y-4 shadow-sm mt-4"
                  >
                    <div className="flex items-center justify-between border-b border-emerald-200/80 dark:border-emerald-800/80 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-emerald-950 dark:text-emerald-200 text-sm sm:text-base">
                            Certificate Verified &amp; Authenticated
                          </h4>
                          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                            Official credential verified by HRA Groups Global Registry
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider">
                        {verifiedResult.status || "Verified"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">
                          Certificate Holder
                        </span>
                        <span className="font-bold text-[#001f4d] dark:text-white text-sm">
                          {verifiedResult.holderName}
                        </span>
                      </div>

                      <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">
                          Certificate ID
                        </span>
                        <span className="font-mono font-bold text-blue-700 dark:text-sky-400 text-sm">
                          {verifiedResult.certificateId}
                        </span>
                      </div>

                      <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900 sm:col-span-2">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">
                          Program / Course Completed
                        </span>
                        <span className="font-bold text-[#001f4d] dark:text-white">
                          {verifiedResult.courseName}
                        </span>
                      </div>

                      <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">
                          Issue Date
                        </span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {verifiedResult.issueDate}
                        </span>
                      </div>

                      <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900">
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">
                          Academic Grade
                        </span>
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                          {verifiedResult.grade || "A+ Distinction"}
                        </span>
                      </div>
                    </div>

                    {verifiedResult.certificateUrl && (
                      <div className="pt-2">
                        <a
                          href={verifiedResult.certificateUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Official Certificate PDF</span>
                        </a>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Help / Contact Note */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Having issues verifying your certificate?{" "}
                  <Link
                    href="/contact"
                    className="text-[#0052cc] dark:text-sky-400 hover:underline font-bold"
                  >
                    Contact Verification Support
                  </Link>
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
