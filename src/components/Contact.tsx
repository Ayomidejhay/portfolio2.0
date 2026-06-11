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
            <form 
              action="https://formspree.io/f/xbdeaprw" 
              method="POST" 
              onSubmit={handleSubmit} 
              name="Contact" 
              className="space-y-8"
            >
              {/* Name Input */}
              <div className="relative pt-2">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  required
                  placeholder=" "
                  className={`w-full px-4 py-3.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${isDark
                    ? "bg-slate-800/40 border-slate-700/50 text-white"
                    : "bg-white border-slate-200 text-slate-900"
                    }`}
                />
                <label
                  htmlFor="name"
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none origin-left text-sm ${(isFocused.name || formData.name.length > 0)
                    ? "top-1 text-xs text-blue-500 font-bold -translate-y-3"
                    : isDark ? "text-slate-500" : "text-slate-400"
                    }`}
                >
                  Your Name
                </label>
              </div>

              {/* Email Input */}
              <div className="relative pt-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  required
                  placeholder=" "
                  className={`w-full px-4 py-3.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${isDark
                    ? "bg-slate-800/40 border-slate-700/50 text-white"
                    : "bg-white border-slate-200 text-slate-900"
                    }`}
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none origin-left text-sm ${(isFocused.email || formData.email.length > 0)
                    ? "top-1 text-xs text-blue-500 font-bold -translate-y-3"
                    : isDark ? "text-slate-500" : "text-slate-400"
                    }`}
                >
                  Your Email
                </label>
              </div>

              {/* Message Input */}
              <div className="relative pt-2">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  required
                  rows={5}
                  placeholder=" "
                  className={`w-full px-4 py-3.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none ${isDark
                    ? "bg-slate-800/40 border-slate-700/50 text-white"
                    : "bg-white border-slate-200 text-slate-900"
                    }`}
                />
                <label
                  htmlFor="message"
                  className={`absolute left-4 top-8 -translate-y-1/2 transition-all duration-300 pointer-events-none origin-left text-sm ${(isFocused.message || formData.message.length > 0)
                    ? "top-1 text-xs text-blue-500 font-bold -translate-y-3"
                    : isDark ? "text-slate-500" : "text-slate-400"
                    }`}
                >
                  Your Message
                </label>
              </div>

              <div className="relative">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 interactive ${isSubmitting
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
                  <div className="absolute -bottom-12 left-0 right-0 flex items-center justify-center gap-2 text-green-500 text-sm font-semibold animate-pulse">
                    <CheckCircle className="w-4 h-4" />
                    Message sent successfully!
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-slate-200/10 text-center">
          <p className={isDark ? "text-slate-500" : "text-gray-400"}>
            © 2025 Ayomide Olaniyan. Crafted with love.
          </p>
        </div>
      </div>
    </section>
  );
}
