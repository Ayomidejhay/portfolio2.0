"use client";

import React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Linkedin, Twitter, Github, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ContactSectionProps {
  isDark: boolean;
}

export default function Contact({ isDark }: ContactSectionProps) {
  const contactRef = useRef<HTMLDivElement>(null);

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
  return (
    <section ref={contactRef} className="py-20 px-6 relative" id="contact">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-12">
          Let's Connect
        </h2>
        <p
          className={`text-lg mb-12 max-w-2xl mx-auto ${
            isDark ? "text-slate-300" : "text-gray-600"
          }`}
        >
          I'm always interested in new opportunities and collaborations. Let's
          create something amazing together!
        </p>
        <div className="flex justify-center gap-6 mb-12 flex-wrap">
          <Button
            variant="outline"
            size="lg"
            className={`contact-item interactive transition-all duration-300 ${
              isDark
                ? "bg-transparent text-slate-300 border-slate-600 hover:bg-slate-800 hover:text-white"
                : "bg-white text-black border-black hover:bg-black hover:text-white"
            }`}
          >
            <a target="_blank" href="mailto:ayomiolaniyan@gmail.com" className="flex gap-2">
              <Mail className="w-5 h-5 mr-2" />
              Email
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={`contact-item interactive transition-all duration-300 ${
              isDark
                ? "bg-transparent text-slate-300 border-slate-600 hover:bg-slate-800 hover:text-white"
                : "bg-white text-black border-black hover:bg-black hover:text-white"
            }`}
          >
            <Phone className="w-5 h-5 mr-2" />
            09035038136
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className={`contact-item interactive transition-all duration-300 ${
              isDark
                ? "bg-transparent text-slate-300 border-slate-600 hover:bg-slate-800 hover:text-white"
                : "bg-white text-black border-black hover:bg-black hover:text-white"
            }`}
          >
            <a target="_blank" href="https://github.com/Ayomidejhay" className="flex gap-2">
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </a>
          </Button>
        </div>
        <p className={isDark ? "text-slate-400" : "text-gray-500"}>
          © 2025 Ayomide Olaniyan. Crafted with passion and love.
        </p>
      </div>
    </section>
  );
}
