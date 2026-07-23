'use client';

import React, { useState, useEffect } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import { gsap } from "gsap"

interface NavbarProps {
  isDark: boolean
  toggleTheme: () => void
}

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#project" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [hudOpen, setHudOpen] = useState(false)
  const [uptime, setUptime] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Scroll detection for navbar height and background blur
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    // IntersectionObserver for tracking active section
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0.1,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    // Elements to track
    const targets = ["hero", "about", "experience", "skills", "project", "contact"]
    targets.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    // Entry animation for Navbar on mount (target inner to avoid overriding centered nav transform)
    gsap.fromTo(".nav-inner", 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
    )

    // Uptime count ticks
    const uptimeTimer = setInterval(() => {
      setUptime((prev) => prev + 1)
    }, 1000)

    // Scroll depth tracker
    const handleScrollDepth = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress(Math.round((window.scrollY / totalHeight) * 100))
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("scroll", handleScrollDepth)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", handleScrollDepth)
      clearInterval(uptimeTimer)
      observer.disconnect()
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    const targetElement = document.querySelector(href)
    if (targetElement) {
      const offset = 115 // navbar height offset + top position clearing
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = targetElement.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
      setActiveSection(href.substring(1))
    }
  }

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-40 transition-all duration-500 rounded-2xl nav-container ${
        scrolled
          ? "py-3 bg-white/70 dark:bg-slate-900/75 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/60 shadow-lg"
          : "py-5 bg-transparent border border-transparent"
      }`}
    >
      <div className="nav-inner px-6 flex items-center justify-between w-full">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="text-lg font-extrabold tracking-wider bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent cursor-pointer interactive transform hover:scale-105 transition-transform"
        >
          AYOMIDE.DEV
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1)
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative text-xs font-semibold uppercase tracking-wider transition-all duration-300 py-1.5 interactive ${
                  isActive 
                    ? "text-blue-500 font-bold" 
                    : isDark ? "text-slate-400 hover:text-slate-100" : "text-gray-600 hover:text-black"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                )}
              </a>
            )
          })}

          {/* HUD Toggle */}
          <button
            onClick={() => setHudOpen(!hudOpen)}
            className={`font-mono text-[9.5px] font-bold border rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 transition-all duration-300 relative select-none cursor-pointer interactive ${
              hudOpen
                ? "bg-blue-600/10 border-blue-500 text-blue-500"
                : isDark
                  ? "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
            aria-label="Toggle Systems HUD"
          >
            <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${hudOpen ? "animate-ping" : "animate-pulse"}`}></span>
            SYS_HUD
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all duration-300 ${
              isDark 
                ? "bg-slate-800/80 border-slate-700 text-yellow-400 hover:bg-slate-700 hover:border-slate-600" 
                : "bg-slate-50 border-slate-200 text-gray-600 hover:bg-slate-100 hover:border-gray-300"
            } shadow-sm interactive`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Menu Action Trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Mobile HUD Button */}
          <button
            onClick={() => setHudOpen(!hudOpen)}
            className={`font-mono text-[9.5px] font-bold border rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 transition-all duration-300 select-none cursor-pointer interactive ${
              hudOpen
                ? "bg-blue-600/10 border-blue-500 text-blue-500"
                : isDark
                  ? "bg-slate-900/60 border-slate-800 text-slate-400"
                  : "bg-slate-50 border-slate-200 text-slate-600"
            }`}
            aria-label="Toggle Systems HUD"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            HUD
          </button>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all duration-300 ${
              isDark 
                ? "bg-slate-800/80 border-slate-700 text-yellow-400 hover:bg-slate-700 hover:border-slate-600" 
                : "bg-slate-50 border-slate-200 text-gray-600 hover:bg-slate-100 hover:border-gray-300"
            } shadow-sm interactive`}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-lg border transition-colors interactive ${
              isDark 
                ? "text-slate-300 hover:bg-slate-800 border-slate-800" 
                : "text-gray-600 hover:bg-slate-100 border-slate-200"
            }`}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden absolute left-0 right-0 top-[60px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl mx-1 shadow-xl transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[420px] opacity-100 py-6" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-3 px-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1)
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm py-2 font-bold transition-colors interactive ${
                  isActive 
                    ? "text-blue-500 border-l-2 border-blue-500 pl-2" 
                    : isDark ? "text-slate-300 hover:text-white" : "text-gray-800 hover:text-black"
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </div>

      {/* HUD Telemetry Drawer Dropdown */}
      {hudOpen && (
        <div className="px-6 pb-4 w-full mt-4 animate-fade-in select-none">
          <div className={`border rounded-xl p-5 font-mono text-[10px] md:text-xs text-left grid grid-cols-2 md:grid-cols-4 gap-4 backdrop-blur-xl ${
            isDark
              ? "bg-slate-950/90 border-slate-800/80 text-slate-300"
              : "bg-white/90 border-slate-200/80 text-slate-700"
          }`}>
            <div className="flex flex-col gap-1">
              <span className="opacity-45 text-[8.5px] uppercase tracking-wider">// TELEMETRY_DEPTH</span>
              <span className="font-bold text-blue-500 dark:text-blue-400">{scrollProgress}% SCROLLED</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="opacity-45 text-[8.5px] uppercase tracking-wider">// SESSION_UPTIME</span>
              <span className="font-bold">{uptime}s ACTIVE</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="opacity-45 text-[8.5px] uppercase tracking-wider">// THEME_STATE</span>
              <span className="font-bold uppercase">{isDark ? "DARK_MODE" : "LIGHT_MODE"}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="opacity-45 text-[8.5px] uppercase tracking-wider">// SYS_LOAD_SIM</span>
              <span className="font-bold text-emerald-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                STABLE (1.04ms)
              </span>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
