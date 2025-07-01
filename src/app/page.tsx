'use client';

import { useState, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { Sun, Moon } from "lucide-react"
import About from "@/components/About";
import Hero from "@/components/Hero";
import Image from "next/image";
import CustomCursor from "@/components/CustomCursor";
import FloatingElements from "@/components/FloatingElements";
import GlobalAnimation from "@/components/GlobalAnimation";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

gsap.registerPlugin(ScrollTrigger, TextPlugin)

export default function Home() {

  const [isDark, setIsDark] = useState(false)
  const themeToggleRef = useRef<HTMLButtonElement>(null)

  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    // Animate theme transition
    gsap.to("body", {
      duration: 0.5,
      backgroundColor: newTheme ? "#0f172a" : "#ffffff",
      color: newTheme ? "#e2e8f0" : "#1f2937",
      ease: "power2.inOut",
    })

    // Animate all cards
    gsap.to(".theme-card", {
      duration: 0.5,
      backgroundColor: newTheme ? "#1e293b" : "#ffffff",
      borderColor: newTheme ? "#334155" : "#e5e7eb",
      ease: "power2.inOut",
    })

    // Animate theme toggle button
    gsap.to(themeToggleRef.current, {
      duration: 0.3,
      rotation: 360,
      scale: 1.1,
      ease: "back.out(1.7)",
      onComplete: () => {
        gsap.to(themeToggleRef.current, {
          duration: 0.2,
          scale: 1,
          ease: "power2.out",
        })
      },
    })
  }
  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-slate-900 text-slate-100" : "bg-white text-gray-900"}`}
    >
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div className="scroll-progress h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left scale-x-0"></div>
      </div>

      {/* Theme Toggle */}
      <button
        ref={themeToggleRef}
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 ${
          isDark ? "bg-slate-800 text-yellow-400 hover:bg-slate-700" : "bg-white text-gray-600 hover:bg-gray-100"
        } shadow-lg interactive`}
      >
        {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      {/* Custom Cursor */}
      <CustomCursor isDark={isDark} />

      {/* Floating Elements */}
      <FloatingElements isDark={isDark} />

      {/* Global Animations */}
      <GlobalAnimation isDark={isDark} />

      {/* Sections */}
      <Hero isDark={isDark} />
      <About isDark={isDark} />
      <Experience isDark={isDark} />
      <Skills isDark={isDark} />
      <Projects isDark={isDark} />
      {/*<Achievements isDark={isDark} />*/}
      <Testimonials isDark={isDark} />
      <Contact isDark={isDark} />
    </div>
  );
}
