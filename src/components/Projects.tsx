'use client';

import React from 'react'
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Github, ExternalLink } from "lucide-react"

interface ProjectsSectionProps {
  isDark: boolean
}

const projects = [
  {
    title: "Invoxa",
    role: "Creator & Fullstack Developer",
    status: "LIVE",
    category: "ENTERPRISE SAAS & INVOICING",
    description: "An enterprise-grade multi-tenant SaaS billing, proposal, and inventory tracker with serverless PDF generation, multimodal AI receipt scanning, and interactive business analytics.",
    tech: ["Next.js", "Supabase", "TypeScript", "Puppeteer", "Google Gemini"],
    team: "Solo Project",
    features: [
      "Polymorphic multi-option proposal acceptance pipeline",
      "Headless serverless Puppeteer PDF generation engine",
      "Multimodal Gemini AI receipt parsing & inventory auto-mapping",
      "Interactive AI Business Analyst chat with dynamic chart visualizations",
      "Transaction safety secured via database-level PostgreSQL RPCs"
    ],
    link: "https://invooxa.netlify.app",
    github: "https://github.com/Ayomidejhay/Invoxa",
    image: "/invoxa.png",
  },
  {
    title: "ZeroHunger App",
    role: "Creator & Fullstack Developer",
    status: "LIVE",
    category: "FOOD DONATION PLATFORM",
    description: "A food donation platform where donors can list surplus food and recipients can reserve pickups. Features real-time notifications, role-based authentication, and Supabase backend.",
    tech: ["Supabase", "Next.js", "ShadCN UI", "Tailwind", "TypeScript"],
    team: "Solo Project",
    features: ["Role-based authentication", "Food listing creation and availability tracking", "Real-time notifications via Supabase Realtime", "Reservation system with expiration logic", "Pickup completion tracking and history"],
    link: "https://zero-hungerr.netlify.app/",
    github: "https://github.com/Ayomidejhay/zerohunger",
    image: "/zerohunger.png",
  },
  {
    title: "Football Info",
    role: "Creator & Fullstack Developer",
    status: "LIVE",
    category: "SPORTS API & FAN PREDICTOR",
    description: "A dynamic, real-time football dashboard with fixture analytics, live/finished status filtering, Head-to-Head insights, standings, and a custom fan predictor module.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Football API", "React"],
    team: "Solo Project",
    features: [
      "Real-time scores with status-based matchday/live/finished filtering",
      "In-depth match details including team statistics and Head-to-Head analytics",
      "Interactive Fan Predictor Hub enabling community score prediction updates",
      "Dynamic league standings table and latest global football news feed",
      "Fully responsive, dark-mode optimized layout for desktop and mobile devices"
    ],
    link: "https://foottball.netlify.app/",
    github: "https://github.com/Ayomidejhay/football",
    image: "/football.png",
  },

  {
    title: "Runnars",
    role: "Frontend Developer",
    status: "LIVE",
    category: "PET WELLNESS PLATFORM",
    description: "An ultra-smooth, high-performance landing page for Runnars, a pet wellness and habit-building platform. Built with Next.js, Framer Motion, and Lenis smooth scrolling.",
    tech: ["Next.js", "Framer Motion", "Lenis", "Swiper", "Tailwind", "TypeScript"],
    team: "Solo Project",
    features: [
      "Integrated GSAP & Lenis for ultra-smooth scrolling kinetics",
      "Engaging interactive cards & transitions powered by Framer Motion",
      "Optimized mobile swiper/carousel layouts for seamless touch navigation",
      "Complete responsive design with lazy-loaded wellness components"
    ],
    link: "https://runnars.com",
    github: "https://github.com/Ayomidejhay/runna",
    image: "/runnars.png",
  },
]

const projectThemes = [
  {
    bgLight: "bg-emerald-50/95 border-emerald-200/90 text-emerald-950 shadow-emerald-200/20",
    bgDark: "bg-[#062c1d]/90 border-emerald-900/60 text-emerald-100 shadow-emerald-950/40",
    accent: "text-emerald-500 dark:text-emerald-400",
    tabLight: "bg-emerald-50/95 border-emerald-200/90 border-b-transparent text-emerald-900",
    tabDark: "bg-[#062c1d]/90 border-emerald-900/60 border-b-transparent text-emerald-100",
    bullet: "text-emerald-500 dark:text-emerald-400",
    chipBgLight: "bg-emerald-100/50 border-emerald-200/60 text-emerald-800",
    chipBgDark: "bg-emerald-900/30 border-emerald-800/40 text-emerald-300"
  },
  {
    bgLight: "bg-violet-50/95 border-violet-200/90 text-violet-950 shadow-violet-200/20",
    bgDark: "bg-[#180a2b]/90 border-purple-900/60 text-purple-100 shadow-purple-950/40",
    accent: "text-purple-500 dark:text-purple-400",
    tabLight: "bg-violet-50/95 border-violet-200/90 border-b-transparent text-violet-900",
    tabDark: "bg-[#180a2b]/90 border-purple-900/60 border-b-transparent text-purple-100",
    bullet: "text-purple-500 dark:text-purple-400",
    chipBgLight: "bg-violet-100/50 border-violet-200/60 text-violet-800",
    chipBgDark: "bg-purple-900/30 border-purple-800/40 text-purple-300"
  },
  {
    bgLight: "bg-blue-50/95 border-blue-200/90 text-blue-950 shadow-blue-200/20",
    bgDark: "bg-[#051c2c]/90 border-blue-900/60 text-blue-100 shadow-blue-950/40",
    accent: "text-blue-500 dark:text-blue-400",
    tabLight: "bg-blue-50/95 border-blue-200/90 border-b-transparent text-blue-900",
    tabDark: "bg-[#051c2c]/90 border-blue-900/60 border-b-transparent text-blue-100",
    bullet: "text-blue-500 dark:text-blue-400",
    chipBgLight: "bg-blue-100/50 border-blue-200/60 text-blue-800",
    chipBgDark: "bg-blue-900/30 border-blue-800/40 text-blue-300"
  },
  {
    bgLight: "bg-rose-50/95 border-rose-200/90 text-rose-950 shadow-rose-200/20",
    bgDark: "bg-[#2d0813]/90 border-rose-900/60 text-rose-100 shadow-rose-950/40",
    accent: "text-rose-500 dark:text-rose-400",
    tabLight: "bg-rose-50/95 border-rose-200/90 border-b-transparent text-rose-900",
    tabDark: "bg-[#2d0813]/90 border-rose-900/60 border-b-transparent text-rose-100",
    bullet: "text-rose-500 dark:text-rose-400",
    chipBgLight: "bg-rose-100/50 border-rose-200/60 text-rose-800",
    chipBgDark: "bg-rose-900/30 border-rose-800/40 text-rose-300"
  }
];

export default function Projects({isDark}: ProjectsSectionProps) {
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: projectsRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          gsap.fromTo(
            ".project-card-wrapper",
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.out",
            },
          )
        },
      })
    }, projectsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={projectsRef} className="py-28 px-6 relative" id="project">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-20 text-center">Featured Projects</h2>
        
        {/* Sticky stacked block layout */}
        <div className="flex flex-col gap-28 md:gap-36 w-full relative">
          {projects.map((project, index) => {
            const theme = projectThemes[index % projectThemes.length];
            return (
              <div
                key={project.title}
                className="project-card-wrapper sticky top-28 md:top-36 w-full"
                style={{
                  zIndex: index + 1,
                  // Setup clean horizontal offsets for folder tabs using a css var to prevent Next.js hydration mismatch
                  ['--tab-offset' as any]: `${index * 240}px`,
                }}
              >
                <div className="relative group">
                  
                  {/* Folder Tab */}
                  <span
                    className={`folder-tab absolute bottom-full left-0 md:left-[var(--tab-offset)] translate-y-[1px] h-11 px-6 flex items-center gap-2.5 font-mono text-[10.5px] tracking-[0.15em] font-semibold border-t border-x rounded-t-lg select-none w-full md:w-56 justify-center md:justify-start ${
                      isDark ? theme.tabDark : theme.tabLight
                    }`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="opacity-70"
                      aria-hidden="true"
                    >
                      <path d="M4 20v-6h5v-5h5V4h6v16z"></path>
                    </svg>
                    PROJECT 0{index + 1}
                  </span>

                  {/* Card Panel body */}
                  <article
                    className={`project-card grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-12 p-6 md:p-10 rounded-b-xl rounded-r-xl border shadow-xl transition-all duration-300 ${
                      isDark ? theme.bgDark : theme.bgLight
                    }`}
                  >
                    {/* Left Column: Info details */}
                    <div className="flex flex-col">
                      <p className="flex items-center gap-2 font-mono text-[10px] font-semibold tracking-[0.16em] opacity-70">
                        <span aria-hidden="true" className={`h-2 w-2 rounded-full ${isDark ? "bg-white" : "bg-black"}`}></span>
                        {project.category}
                      </p>

                      <h3 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight font-sans">
                        {project.title}
                      </h3>

                      <p className="font-mono text-[10px] text-blue-500 dark:text-blue-400 font-semibold uppercase tracking-wider mt-1.5 mb-4">
                        {project.role}
                      </p>

                      <p className="text-sm leading-relaxed mb-5 opacity-80 font-sans">
                        {project.description}
                      </p>

                      {/* Feature highlights */}
                      {project.features && project.features.length > 0 && (
                        <ul className="flex flex-col gap-2 mb-6">
                          {project.features.slice(0, 3).map((feat, i) => (
                            <li key={i} className="relative pl-5 text-xs opacity-90 leading-relaxed font-sans">
                              <span className={`absolute left-0 font-mono font-bold select-none ${theme.bullet}`}>&gt;</span>
                              {feat}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Tech stack tags */}
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-slate-200/10 dark:border-slate-800/40">
                        {project.tech.map((t) => (
                          <em
                            key={t}
                            className={`not-italic font-mono text-[9px] px-2 py-0.5 rounded border transition-colors ${
                              isDark ? theme.chipBgDark : theme.chipBgLight
                            }`}
                          >
                            {t}
                          </em>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap gap-3 pt-4">
                        {/* <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={project.github}
                          className={`font-mono text-[10px] font-semibold border rounded-lg px-4 py-2 flex items-center gap-1.5 transition-all duration-200 ${
                            isDark
                              ? "border-slate-800 bg-slate-900/20 hover:border-blue-500/60 hover:text-blue-400 text-slate-300"
                              : "border-slate-200 bg-white/40 hover:border-blue-600/60 hover:text-blue-600 text-slate-700"
                          }`}
                        >
                          <Github className="w-3.5 h-3.5" />
                          CODE ↗
                        </a> */}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={project.link}
                          className="font-mono text-[10px] font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2 flex items-center gap-1.5 transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-blue-500/25"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          DEMO ↗
                        </a>
                      </div>
                    </div>

                    {/* Right Column: Screenshot image in box margin frame */}
                    <div
                      className={`relative self-center overflow-hidden rounded-xl border aspect-[4/3] w-full flex items-center justify-center transition-all duration-500 group-hover:scale-[1.01] ${
                        isDark ? "border-white/10 bg-black/40" : "border-black/10 bg-black/5"
                      }`}
                    >
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={`${project.title} Screenshot`}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                      />
                      {/* Technical corner badge */}
                      <span className="absolute right-3 top-3 px-2 py-1 bg-slate-950/90 text-white text-[8px] font-mono rounded tracking-wider flex items-center gap-1 border border-white/10 select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        SCREENSHOT.PNG
                      </span>
                    </div>

                  </article>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
