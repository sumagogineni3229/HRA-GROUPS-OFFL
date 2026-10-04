"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Briefcase,
  Layers,
  GraduationCap,
  Award,
  Phone,
  Mail,
  RefreshCw,
  Minimize2,
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  options?: { label: string; action: string; href?: string }[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    sender: "bot",
    text: "👋 Hi there! Welcome to HRA Groups. I'm your AI Virtual Assistant.",
    time: "Just now",
  },
  {
    id: "welcome-2",
    sender: "bot",
    text: "How can I help you today? Explore our enterprise services, internship programs, career openings, or speak directly with our team.",
    time: "Just now",
    options: [
      { label: "🚀 Enterprise Services", action: "services" },
      { label: "🎓 Internship Programs", action: "internship" },
      { label: "💼 Careers & Openings", action: "careers" },
      { label: "📜 Certificate Verification", action: "certificates" },
      { label: "💬 Connect on WhatsApp", action: "whatsapp" },
      { label: "📞 Speak to an Advisor", action: "contact" },
    ],
  },
];

const BOT_RESPONSES: Record<
  string,
  {
    reply: string;
    options?: { label: string; action: string; href?: string }[];
  }
> = {
  services: {
    reply:
      "We deliver high-impact enterprise solutions including AI & Intelligent Automation, Full-Stack Software Development, Cloud Architecture, IT Consultancy, and Immersive Digital Experiences.",
    options: [
      { label: "Explore Services Overview", action: "goto", href: "/services" },
      { label: "AI Solutions", action: "goto", href: "/services/ai-solutions" },
      { label: "Software Development", action: "goto", href: "/services/software-development" },
      { label: "IT Consultancy", action: "goto", href: "/services/it-consultancy" },
      { label: "🔙 Main Menu", action: "menu" },
    ],
  },
  internship: {
    reply:
      "HRA Groups offers industry-aligned internship programs with hands-on live project exposure, mentorship from tech leaders, verified certificates, and performance-based stipend opportunities!",
    options: [
      { label: "View Internship Programs", action: "goto", href: "/internship" },
      { label: "Founder Program", action: "goto", href: "/founder-program" },
      { label: "Exam Portal", action: "goto", href: "/services/exam-portal" },
      { label: "🔙 Main Menu", action: "menu" },
    ],
  },
  careers: {
    reply:
      "Looking to grow your career with a futuristic tech enterprise? We're hiring driven software engineers, UI/UX designers, AI researchers, and business associates.",
    options: [
      { label: "Explore Open Positions", action: "goto", href: "/careers" },
      { label: "About Our Culture", action: "goto", href: "/about" },
      { label: "🔙 Main Menu", action: "menu" },
    ],
  },
  certificates: {
    reply:
      "You can verify your official HRA Groups Internship or Training completion certificate instantly using our secure validation portal.",
    options: [
      { label: "Verify Certificate", action: "goto", href: "/services/certificate-portal" },
      { label: "Take Online Exam", action: "goto", href: "/services/exam-portal" },
      { label: "🔙 Main Menu", action: "menu" },
    ],
  },
  contact: {
    reply:
      "Our team is based in Hyderabad, Telangana, India. You can reach us by phone at +91 96762 72283 or email us at contact@hragroups.com.",
    options: [
      { label: "Open Contact Page", action: "goto", href: "/contact" },
      { label: "Chat on WhatsApp", action: "whatsapp" },
      { label: "🔙 Main Menu", action: "menu" },
    ],
  },
  whatsapp: {
    reply:
      "You can chat with our team on WhatsApp directly for quick inquiries, program queries, or business solutions.",
    options: [
      {
        label: "Open WhatsApp Chat ↗",
        action: "goto_external",
        href: "https://wa.me/919676272283?text=Hello%20HRA%20Groups%20Team!%20I%20have%20an%20inquiry.",
      },
      { label: "🔙 Main Menu", action: "menu" },
    ],
  },
  menu: {
    reply: "Here are the topics I can help you with right away:",
    options: [
      { label: "🚀 Enterprise Services", action: "services" },
      { label: "🎓 Internship Programs", action: "internship" },
      { label: "💼 Careers & Openings", action: "careers" },
      { label: "📜 Certificate Verification", action: "certificates" },
      { label: "💬 Connect on WhatsApp", action: "whatsapp" },
      { label: "📞 Speak to an Advisor", action: "contact" },
    ],
  },
};

export default function FloatingActions() {
  const pathname = usePathname();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hide floating widgets on admin panel pages to keep the dashboard clean
  const isAdmin = pathname?.startsWith("/admin");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isChatOpen]);

  const getTimeString = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text: query,
      time: getTimeString(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    try {
      // Call live /api/chatbot backend route (powered by Gemini AI)
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      const data = await res.json();

      const botMsg: Message = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text:
          data.reply ||
          "Thank you for contacting HRA Groups! How else can I assist you?",
        time: getTimeString(),
        options: [
          { label: "🚀 Services", action: "services" },
          { label: "🎓 Internships", action: "internship" },
          { label: "💬 WhatsApp", action: "whatsapp" },
          { label: "📞 Contact", action: "contact" },
          { label: "🔙 Menu", action: "menu" },
        ],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const botMsg: Message = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text:
          "Thank you for contacting HRA Groups! For immediate assistance, feel free to WhatsApp our support team at +91 96762 72283 or explore our options below.",
        time: getTimeString(),
        options: [
          { label: "💬 WhatsApp", action: "whatsapp" },
          { label: "🚀 Services", action: "services" },
          { label: "🎓 Internships", action: "internship" },
          { label: "🔙 Menu", action: "menu" },
        ],
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOptionClick = (option: { label: string; action: string; href?: string }) => {
    if (option.action === "goto" && option.href) {
      window.location.href = option.href;
      return;
    }
    if (option.action === "goto_external" && option.href) {
      window.open(option.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (option.action === "whatsapp") {
      window.open(
        "https://wa.me/919676272283?text=Hello%20HRA%20Groups%20Team!%20I%20have%20an%20inquiry.",
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    if (BOT_RESPONSES[option.action]) {
      const userMsg: Message = {
        id: "user-" + Date.now(),
        sender: "user",
        text: option.label,
        time: getTimeString(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      setTimeout(() => {
        const botMsg: Message = {
          id: "bot-" + Date.now(),
          sender: "bot",
          text: BOT_RESPONSES[option.action].reply,
          time: getTimeString(),
          options: BOT_RESPONSES[option.action].options,
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 400);
    }
  };

  const resetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  if (isAdmin) {
    return null;
  }

  return (
    <>
      {/* ========================================================================= */}
      {/* FLOATING ACTION BUTTONS (BOTTOM-RIGHT CORNER)                            */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* FLOATING ACTION BUTTONS (BOTTOM-RIGHT CORNER - HORIZONTAL ROW)            */}
      {/* ========================================================================= */}
      <div className="fixed bottom-10 right-8 z-50 flex flex-row items-center gap-3.5 select-none print:hidden">
        {/* 1. WHATSAPP FLOATING BUTTON */}
        <a
          href="https://wa.me/919676272283?text=Hello%20HRA%20Groups%20Team!%20I%20have%20an%20inquiry."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none -z-10" />

          {/* WhatsApp SVG Icon */}
          <svg
            className="w-7 h-7 fill-current drop-shadow-sm transition-transform duration-300 group-hover:rotate-6"
            viewBox="0 0 24 24"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43l-.48-.01c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.3z" />
          </svg>

          {/* Hover Tooltip (above button) */}
          <span className="absolute bottom-16 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-[#0a0f1d] text-white text-xs font-medium whitespace-nowrap shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-y-1 group-hover:translate-y-0">
            Chat on WhatsApp
          </span>
        </a>

        {/* 2. CHATBOT FLOATING TOGGLE BUTTON */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label={isChatOpen ? "Close Live Chat" : "Open Live Chat"}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#0052cc] via-[#0070f3] to-[#00c9ff] text-white shadow-[0_4px_25px_rgba(0,201,255,0.45)] hover:shadow-[0_6px_32px_rgba(0,201,255,0.7)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        >
          {/* Subtle glowing animated ring */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#00c9ff] to-[#0052cc] opacity-40 blur-sm animate-pulse pointer-events-none -z-10" />

          {/* Unread badge dot */}
          {hasUnread && !isChatOpen && (
            <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#ff3366] border-2 border-[#06070b] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </span>
          )}

          {isChatOpen ? (
            <X className="w-6 h-6 transition-transform duration-300 rotate-90" />
          ) : (
            <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          )}

          {/* Hover Tooltip (above button) */}
          <span className="absolute bottom-16 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-[#0a0f1d] text-white text-xs font-medium whitespace-nowrap shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-y-1 group-hover:translate-y-0">
            {isChatOpen ? "Close Assistant" : "HRA AI Assistant"}
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* CHATBOT MODAL WINDOW                                                      */}
      {/* ========================================================================= */}
      {isChatOpen && (
        <div className="fixed bottom-28 right-8 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[580px] max-h-[calc(100vh-9rem)] rounded-3xl bg-[#080d1a]/95 border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,201,255,0.15)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300 font-sans">
          {/* TOP HEADER */}
          <div className="px-5 py-4 bg-gradient-to-r from-[#0a1226] via-[#0d1c3a] to-[#081329] border-b border-white/10 flex items-center justify-between shrink-0 relative overflow-hidden">
            {/* Header Glow accent */}
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#00c9ff]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0052cc] to-[#00c9ff] flex items-center justify-center text-white shadow-md border border-white/20">
                  <Bot className="w-5 h-5" />
                </div>
                {/* Online status indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a1226]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    HRA Assistant
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#00c9ff]/15 border border-[#00c9ff]/30 text-[#00c9ff] font-mono uppercase tracking-wider">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-white/50 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • Typically replies instantly
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 relative z-10">
              <button
                onClick={resetChat}
                title="Reset conversation"
                className="w-8 h-8 rounded-lg hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Reset chat"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                title="Close chat"
                className="w-8 h-8 rounded-lg hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Minimize chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CHAT MESSAGES BODY */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-sm scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#0052cc] to-[#00c9ff] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm border border-white/15">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] space-y-2 ${
                    msg.sender === "user" ? "items-end text-right" : "items-start text-left"
                  }`}
                >
                  <div
                    className={`p-3.5 rounded-2xl text-[13px] leading-relaxed break-words shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-[#0052cc] to-[#0070f3] text-white rounded-tr-sm border border-[#00c9ff]/30"
                        : "bg-white/[0.06] text-white/90 rounded-tl-sm border border-white/10 backdrop-blur-md"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Optional Interactive Quick Buttons */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(opt)}
                          className="text-[11px] font-medium px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-[#00c9ff]/15 border border-white/10 hover:border-[#00c9ff]/40 text-white/80 hover:text-[#00c9ff] transition-all duration-200 cursor-pointer text-left flex items-center gap-1.5"
                        >
                          <span>{opt.label}</span>
                          <ChevronRight className="w-3 h-3 opacity-60" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-white/30 block px-1">
                    {msg.time}
                  </span>
                </div>

                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white/80 shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* BOT TYPING INDICATOR */}
            {isTyping && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#0052cc] to-[#00c9ff] flex items-center justify-center text-white shrink-0 border border-white/15">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white/[0.06] border border-white/10 rounded-tl-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00c9ff] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#00c9ff] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#00c9ff] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* QUICK TOPIC SHORTCUTS STRIP */}
          <div className="px-3 py-2 bg-black/40 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-xs">
            <button
              onClick={() => handleSendMessage("Tell me about enterprise services")}
              className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              🚀 Services
            </button>
            <button
              onClick={() => handleSendMessage("Internship programs details")}
              className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              🎓 Internships
            </button>
            <button
              onClick={() => handleSendMessage("Career opportunities")}
              className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              💼 Careers
            </button>
            <button
              onClick={() => handleSendMessage("Verify my certificate")}
              className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              📜 Certificate
            </button>
          </div>

          {/* INPUT FORM FOOTER */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#0a1020] border-t border-white/10 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about HRA Groups..."
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#00c9ff]/60 focus:bg-white/[0.08] transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0052cc] to-[#00c9ff] text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(0,201,255,0.4)] transition-all cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
