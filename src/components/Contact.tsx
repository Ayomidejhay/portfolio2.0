"use client";

import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Linkedin, Github, Phone, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactSectionProps {
  isDark: boolean;
}

export default function Contact({ isDark }: ContactSectionProps) {
  const contactRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isFocused, setIsFocused] = useState({ name: false, email: false, message: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      setLocalTime(new Date().toLocaleTimeString("en-US", options));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          gsap.fromTo(
            ".contact-item",
            {
              y: 80,
              opacity: 0,
              rotationX: 45,
              scale: 0.9,
            },
            {
              y: 0,
              opacity: 1,
              rotationX: 0,
              scale: 1,
              duration: 1.2,
              stagger: 0.15,
              ease: "power3.out",
            }
          );
        },
      });
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field: 'name' | 'email' | 'message') => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: 'name' | 'email' | 'message') => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Support raw form IDs, full URLs, and HTML action attribute fallbacks
    const formId = process.env.NEXT_PUBLIC_FORM_ID || process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || process.env.NEXT_PUBLIC_FORMSPREE_ID;
    let formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL || e.currentTarget.action;

    if (formId && !formspreeUrl.includes(formId)) {
      formspreeUrl = `https://formspree.io/f/${formId}`;
    }

    if (formspreeUrl && !formspreeUrl.includes("YOUR_FORM_ID")) {
      try {
        const response = await fetch(formspreeUrl, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setIsSubmitted(true);
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => {
            setIsSubmitted(false);
          }, 5000);
        } else {
          console.error("Failed to send message via Formspree");
        }
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Simulate API request during development / fallback
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <section ref={contactRef} className="py-28 px-6 relative border-t border-slate-200/10" id="contact">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-16 text-center">
          Let's Connect
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info Column */}
          <div className="contact-item space-y-8">
            <h3 className="text-3xl font-bold tracking-tight">Got a project? Let's talk.</h3>
            <p className={`text-base leading-relaxed max-w-md ${isDark ? "text-slate-300" : "text-gray-600"}`}>
              I'm always interested in new opportunities, collaborations, or even just chatting about creative tech. Fill out the form, or reach out directly using any of my social profiles.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:ayomiolaniyan@gmail.com"
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 interactive ${isDark
                  ? "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 text-slate-300"
                  : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-gray-700"
                  }`}
              >
                <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400">Email Me</p>
                  <p className="text-sm font-bold">ayomiolaniyan@gmail.com</p>
                </div>
              </a>

              <div
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${isDark
                  ? "bg-slate-800/50 border-slate-700/50 text-slate-300"
                  : "bg-slate-50 border-slate-200 text-gray-700"
                  }`}
              >
                <div className="p-3 bg-green-500/10 rounded-full text-green-500">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400">Call Me</p>
                  <p className="text-sm font-bold">09035038136</p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://github.com/Ayomidejhay"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3.5 rounded-full border transition-all duration-300 interactive ${isDark
                  ? "bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 hover:border-slate-600"
                  : "bg-slate-50 border-slate-200 text-gray-700 hover:text-black hover:bg-slate-100 hover:border-gray-300"
                  }`}
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/ayomide-olaniyan"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3.5 rounded-full border transition-all duration-300 interactive ${isDark
                  ? "bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 hover:border-slate-600"
                  : "bg-slate-50 border-slate-200 text-gray-700 hover:text-blue-600 hover:bg-slate-100 hover:border-gray-300"
                  }`}
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Form Column */}
          <div className="contact-item">
            <div className={`relative border p-6 md:p-8 rounded-2xl backdrop-blur-sm ${
              isDark 
                ? "bg-slate-950/40 border-slate-800/60 shadow-2xl shadow-blue-950/5" 
                : "bg-slate-50/50 border-slate-200 shadow-xl shadow-slate-200/20"
            }`}>
              {/* Blueprint crosshairs in corners */}
              <span className="absolute -top-1.5 -left-1.5 font-mono text-[12px] text-blue-500 font-bold select-none">+</span>
              <span className="absolute -top-1.5 -right-1.5 font-mono text-[12px] text-blue-500 font-bold select-none">+</span>
              <span className="absolute -bottom-2 -left-1.5 font-mono text-[12px] text-blue-500 font-bold select-none">+</span>
              <span className="absolute -bottom-2 -right-1.5 font-mono text-[12px] text-blue-500 font-bold select-none">+</span>

              <form 
                action="https://formspree.io/f/xbdeaprw" 
                method="POST" 
                onSubmit={handleSubmit} 
                name="Contact" 
                className="space-y-6"
              >
                {/* Name Input */}
                <div className="relative flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-blue-500 dark:text-blue-400 font-semibold mb-1.5 flex items-center gap-1.5 select-none">
                    <span>[FIELD_00 // SENDER_NAME]</span>
                    <span className="h-px bg-slate-200/50 dark:bg-slate-800/50 flex-1"></span>
                    <span className={`text-[8.5px] font-bold ${isFocused.name ? "text-emerald-500 animate-pulse" : "opacity-45"}`}>
                      {isFocused.name ? "● ACTIVE_TYPING" : "○ WAITING_INPUT"}
                    </span>
                  </span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                    required
                    placeholder="Enter your name..."
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300 font-sans text-sm ${isDark
                      ? "bg-slate-900/40 border-slate-800 text-white"
                      : "bg-white border-slate-200 text-slate-900"
                    }`}
                  />
                </div>

                {/* Email Input */}
                <div className="relative flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-blue-500 dark:text-blue-400 font-semibold mb-1.5 flex items-center gap-1.5 select-none">
                    <span>[FIELD_01 // SENDER_EMAIL]</span>
                    <span className="h-px bg-slate-200/50 dark:bg-slate-800/50 flex-1"></span>
                    <span className={`text-[8.5px] font-bold ${isFocused.email ? "text-emerald-500 animate-pulse" : "opacity-45"}`}>
                      {isFocused.email ? "● ACTIVE_TYPING" : "○ WAITING_INPUT"}
                    </span>
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    required
                    placeholder="Enter your email address..."
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300 font-sans text-sm ${isDark
                      ? "bg-slate-900/40 border-slate-800 text-white"
                      : "bg-white border-slate-200 text-slate-900"
                    }`}
                  />
                </div>

                {/* Message Input */}
                <div className="relative flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-blue-500 dark:text-blue-400 font-semibold mb-1.5 flex items-center gap-1.5 select-none">
                    <span>[FIELD_02 // SENDER_MESSAGE]</span>
                    <span className="h-px bg-slate-200/50 dark:bg-slate-800/50 flex-1"></span>
                    <span className={`text-[8.5px] font-bold ${isFocused.message ? "text-emerald-500 animate-pulse" : "opacity-45"}`}>
                      {isFocused.message ? "● ACTIVE_TYPING" : "○ WAITING_INPUT"}
                    </span>
                  </span>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                    required
                    rows={5}
                    placeholder="Type your message description here..."
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-300 resize-none font-sans text-sm ${isDark
                      ? "bg-slate-900/40 border-slate-800 text-white"
                      : "bg-white border-slate-200 text-slate-900"
                    }`}
                  />
                </div>

                <div className="relative pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 interactive ${isSubmitting
                      ? "bg-blue-600/50 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-500 text-white"
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {isSubmitted && (
                    <div className="absolute -bottom-10 left-0 right-0 flex items-center justify-center gap-2 text-green-500 text-xs font-semibold animate-pulse font-mono select-none">
                      <CheckCircle className="w-3.5 h-3.5" />
                      [SYS_MSG] SEND_COMPLETE // SUCCESS
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Creative Sitemap Footer */}
        <div className="mt-24 pt-12 border-t border-slate-200/15 dark:border-slate-800/40 w-full text-left font-mono">
          <div className="grid md:grid-cols-3 gap-10 mb-10 text-xs md:text-sm">
            {/* Column 1: Brand & Telemetry */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-extrabold tracking-wider bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent uppercase font-sans">
                AYOMIDE.DEV
              </h4>
              <p className={`text-[11px] leading-relaxed opacity-75 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Crafting high-performance, interactive, and visually stunning digital products.
              </p>
              {/* Telemetry info */}
              <div className="flex flex-col gap-1.5 mt-2 text-[10px] text-slate-500 dark:text-slate-600 uppercase">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>SYS_STATUS: OPTIMAL</span>
                </div>
                <div>LOC: NIGERIA // GMT+1</div>
                {localTime && <div>LOCAL_TIME: {localTime} (WAT)</div>}
              </div>
            </div>

            {/* Column 2: Quick Directory Navigation Links */}
            <div className="flex flex-col gap-3">
              <h5 className={`text-[10px] font-bold tracking-widest uppercase opacity-45 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                // SITEMAP_DIRECTORY
              </h5>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] uppercase">
                {[
                  { name: "00 // Hero", href: "#hero" },
                  { name: "01 // About", href: "#about" },
                  { name: "02 // Experience", href: "#experience" },
                  { name: "03 // Skills", href: "#skills" },
                  { name: "04 // Projects", href: "#project" },
                  { name: "05 // Contact", href: "#contact" }
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-250 w-fit relative group`}
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-blue-500 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Contact Channels & Socials */}
            <div className="flex flex-col gap-3">
              <h5 className={`text-[10px] font-bold tracking-widest uppercase opacity-45 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                // EXTERNAL_CHANNELS
              </h5>
              <div className="flex flex-col gap-2 text-[11px] uppercase">
                {[
                  { name: "GitHub // @Ayomidejhay", href: "https://github.com/Ayomidejhay" },
                  { name: "LinkedIn // Ayomide", href: "https://linkedin.com/in/ayomide-olaniyan" },
                  { name: "Email // ayomideolaniyan", href: "mailto:ayomideolaniyan@gmail.com" }
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-250 w-fit relative group`}
                  >
                    {item.name}
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-blue-500 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="border-t border-slate-200/10 dark:border-slate-800/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-600 select-none">
            <div>
              © 2026 AYOMIDE OLANIYAN. ALL RIGHTS RESERVED.
            </div>
            <div className="flex flex-wrap gap-2.5 justify-center">
              {["[NEXT.JS]", "[TS]", "[GSAP]", "[TAILWIND]"].map((badge) => (
                <span key={badge} className="px-1.5 py-0.5 border border-slate-200/10 dark:border-slate-800/40 rounded bg-slate-100/50 dark:bg-slate-900/40">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
