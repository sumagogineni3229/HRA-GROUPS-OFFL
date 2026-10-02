"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, AlertCircle, Eye, EyeOff, ShieldCheck, HelpCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans antialiased grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden">
      {/* Left Half: Form Section */}
      <div className="min-h-screen p-8 sm:p-14 lg:p-16 xl:p-20 flex flex-col justify-between bg-white z-10">
        <div className="max-w-md w-full mx-auto space-y-7 my-auto">
          {/* Centered Large Brand Logo */}
          <div className="flex justify-center text-center">
            <Link href="/" className="inline-block group">
              <img
                src="/logo-transparent.png"
                alt="HRA Groups Logo"
                className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Centered Title */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#172947] tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-500 text-sm">
              Please enter your admin credentials to access the console.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4e6df2]/20 focus:border-[#4e6df2] transition-all bg-white"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4e6df2]/20 focus:border-[#4e6df2] transition-all bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Checkbox & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#4e6df2] focus:ring-[#4e6df2]/30 accent-[#4e6df2]"
                />
                <span>Keep me logged in</span>
              </label>

              <a
                href="mailto:contact@hragroups.com?subject=Admin%20Password%20Reset"
                className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
              >
                Forgot your password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#516cf4] to-[#405ceb] hover:from-[#4360ed] hover:to-[#314fe0] text-white text-sm font-bold tracking-wide transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 mt-2"
            >
              <span>{loading ? "Logging in..." : "Log in"}</span>
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>

        {/* Bottom helper */}
        <div className="max-w-md w-full mx-auto text-center pt-6 text-xs text-slate-500">
          Authorized administrator only.{" "}
          <Link href="/" className="text-pink-600 font-semibold hover:underline">
            Return to main site
          </Link>
        </div>
      </div>

      {/* Right Half: Full Cover Image Section */}
      <div className="relative min-h-[500px] lg:min-h-screen bg-slate-900 overflow-hidden flex flex-col justify-end p-8 sm:p-12 lg:p-14">
        {/* Full Covering Background Image */}
        <img
          src="/admin-login-art.png"
          alt="Admin Workspace"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Subtle Frosted Vignette Overlay for Crisp Readability of Badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

        {/* Bottom Security Assurance */}
        <div className="w-full text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 text-xs text-slate-200 shadow-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Protected with 256-bit encryption & database session verification</span>
          </div>
        </div>
      </div>
    </div>
  );
}

