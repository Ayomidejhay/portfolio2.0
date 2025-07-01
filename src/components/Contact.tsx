'use client';

import React from 'react';
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Linkedin, Twitter, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactSectionProps {
  isDark: boolean
}

export default function Contact({isDark}: ContactSectionProps) {
    const contactRef = useRef<HTMLDivElement>(null)

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
            },
          )
        },
      })
    }, contactRef)

    return () => ctx.revert()
  }, [])
  return (
    <section ref={contactRef} className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-12">Let's Connect</h2>
        <p className={`text-lg mb-12 max-w-2xl mx-auto ${isDark ? "text-slate-300" : "text-gray-600"}`}>
          I'm always interested in new opportunities and collaborations. Let's create something amazing together!
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
            <Mail className="w-5 h-5 mr-2" />
            Email
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
            <Linkedin className="w-5 h-5 mr-2" />
            LinkedIn
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
            <Twitter className="w-5 h-5 mr-2" />
            Twitter
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
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </Button>
        </div>
        <p className={isDark ? "text-slate-400" : "text-gray-500"}>
          © 2025 Ayomide Olaniyan. Crafted with passion and love.
        </p>
      </div>
    </section>
  )
}
