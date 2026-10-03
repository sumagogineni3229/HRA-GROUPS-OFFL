"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Award,
  BookOpen,
  Mail,
  GraduationCap,
  Newspaper,
  Briefcase,
  Image as GalleryIcon,
  Layers,
  Users,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If on login page, don't show admin dashboard sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { label: "Internship", href: "/admin/internship", icon: Layers },
    { label: "Founder Program Form", href: "/admin/founder-program", icon: Users },
    { label: "Blog", href: "/admin/blog", icon: Newspaper },
    { label: "Gallery", href: "/admin/gallery", icon: GalleryIcon },
    { label: "Inquiries & Contact", href: "/admin/inquiries", icon: Mail },
    { label: "Courses", href: "/admin/courses", icon: BookOpen },
    { label: "Exams", href: "/admin/exams", icon: GraduationCap },
    { label: "Certificates", href: "/admin/certificates", icon: Award },
    { label: "Career Manage", href: "/admin/careers", icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#172947] flex font-sans antialiased">
      {/* Desktop Sidebar */}
      <aside className="w-72 bg-[#002244] text-white flex flex-col justify-between p-6 shrink-0 hidden lg:flex border-r border-slate-800 shadow-xl">
        <div className="space-y-8">
          {/* Logo & Console Badge */}
          <div className="space-y-3.5 pt-2">
            <Link href="/" className="inline-block group">
              <img
                src="/logo-white.png"
                alt="HRA Groups"
                className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold text-sky-300 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Admin Console</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#0052cc] text-white shadow-lg shadow-blue-600/30 font-bold"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-72 bg-[#002244] text-white flex flex-col justify-between p-6 z-10 shadow-2xl border-r border-slate-800">
            <div className="space-y-6">
              <div className="flex items-center justify-between pt-2">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <img
                    src="/logo-white.png"
                    alt="HRA Groups"
                    className="h-8 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold text-sky-300 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Admin Console</span>
              </div>

              <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-260px)]">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-[#0052cc] text-white font-bold"
                          : "text-slate-300 hover:text-white hover:bg-white/[0.08]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.08]"
              >
                <span>Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-300 hover:bg-rose-500/20"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200/80 px-4 sm:px-8 lg:px-10 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 lg:hidden cursor-pointer"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-base sm:text-lg font-extrabold text-[#172947]">
              HRA Groups Portal
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-[#172947] block">Master Administrator</span>
              <span className="text-[11px] text-slate-500 block">admin@hragroups.com</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#0052cc] text-white font-extrabold text-xs flex items-center justify-center shadow-md shadow-blue-500/25">
              AD
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-slate-500 hover:text-red-500 hidden sm:block md:hidden"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

