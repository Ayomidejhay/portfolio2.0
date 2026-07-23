'use client';

import React from 'react';
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Briefcase } from "lucide-react"

interface ExperienceSectionProps {
  isDark: boolean
}

interface ExperienceItem {
  title: string
  company: string
  period: string
  statusCode: string
  statusText: string
  details: string[]
}

const experiences: ExperienceItem[] = [
  {
    title: "Frontend Developer (Contract)",
    company: "Rehobot Business Solution Ltd",
    period: "NOV 2025 - PRESENT",
    statusCode: "LOG_EXP_00",
    statusText: "ACTIVE",
    details: [
      "Building responsive, conversion-focused web apps using Next.js & Tailwind CSS.",
      "Developing an internal admin dashboard with role-based accessibility control.",
      "Integrating REST APIs and optimizing pages for high-speed page loads."
    ]
  },
  {
    title: "Frontend Intern",
    company: "DotCircle Labs",
    period: "JUL 2024 - NOV 2024",
    statusCode: "LOG_EXP_01",
    statusText: "COMPLETED",
    details: [
      "Worked on real-world client-facing projects using React & Firebase.",
      "Optimized component structures to enhance code reuse and speed.",
      "Contributed to responsive web interface implementations."
    ]
  },
  {
    title: "Freelance Frontend Developer",
    company: "Self-Employed",
    period: "JUL 2023 - PRESENT",
    statusCode: "LOG_EXP_02",
    statusText: "ACTIVE",
    details: [
      "Building custom websites, dashboards, and landing pages for startups.",
      "Developing reusable components and modular CSS design tokens.",
      "Integrating secure backend endpoints and optimizing for SEO metrics."
    ]
  }
]

export default function Experience({isDark}: ExperienceSectionProps) {
  const experienceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry slide-up animations for logs
      gsap.utils.toArray(".experience-log-card").forEach((node: any) => {
        gsap.fromTo(
          node,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 88%",
              toggleActions: "play none none reverse",
            }
          }
        )
      })

      // Timeline vertical line height draw-in
      gsap.fromTo(".timeline-line-dashed", 
        { scaleY: 0 },
        { 
          scaleY: 1, 
          transformOrigin: "top",
          duration: 1.2, 
          ease: "none",
          scrollTrigger: {
            trigger: experienceRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          }
        }
      )
    }, experienceRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={experienceRef} className="py-28 px-6 relative overflow-hidden" id="experience">
      <div className="max-w-4xl mx-auto text-left">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-20 text-center">Experience</h2>
        
        <div className="relative">
          {/* Vertical left-aligned dashed VCS connection cable */}
          <div className="timeline-line-dashed absolute left-[23px] top-2 bottom-2 w-px border-l border-dashed border-slate-355/60 dark:border-slate-800/80 origin-top transform" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="experience-log-card flex items-start relative w-full"
              >
                {/* Timeline node checkpoint status port */}
                <div className="absolute left-[24px] w-5 h-5 rounded-full border-2 border-white dark:border-slate-950 bg-blue-500 shadow-md shadow-blue-500/30 flex items-center justify-center -translate-x-1/2 z-10 transition-transform duration-300 hover:scale-125">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </div>

                {/* Card Container (aligned to the right of the vertical cable) */}
                <div className="w-full pl-10 md:pl-12">
                  
                  {/* Log Folder tab header */}
                  <div className="flex items-center gap-2 mb-2 font-mono text-[9px] font-bold select-none">
                    <span className="text-blue-500 dark:text-blue-400">📄</span>
                    <span>[{exp.statusCode} // STATUS: {exp.statusText}]</span>
                    <span className="h-px bg-slate-200/50 dark:bg-slate-800/50 flex-1" />
                    <span className={`px-2 py-0.5 rounded border ${
                      exp.statusText === "ACTIVE"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                        : "border-slate-500/30 bg-slate-500/10 text-slate-500"
                    }`}>
                      {exp.period}
                    </span>
                  </div>

                  {/* Log Card */}
                  <div className={`border rounded-2xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:border-blue-500/30 shadow-lg ${
                    isDark 
                      ? "bg-slate-950/40 border-slate-800/60 shadow-2xl shadow-blue-950/5" 
                      : "bg-slate-50/50 border-slate-200 shadow-xl shadow-slate-200/20"
                  }`}>
                    {/* Folder blueprint corners (+) */}
                    <span className="absolute -top-1.5 -left-1.5 font-mono text-[10px] text-blue-500 font-bold select-none">+</span>
                    <span className="absolute -top-1.5 -right-1.5 font-mono text-[10px] text-blue-500 font-bold select-none">+</span>
                    <span className="absolute -bottom-2 -left-1.5 font-mono text-[10px] text-blue-500 font-bold select-none">+</span>
                    <span className="absolute -bottom-2 -right-1.5 font-mono text-[10px] text-blue-500 font-bold select-none">+</span>

                    <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-1">{exp.title}</h3>
                    <p className="text-sm font-semibold text-blue-500 dark:text-blue-400 mb-6 font-mono">
                      @ {exp.company}
                    </p>

                    {/* Monospaced register-style bullets details */}
                    <div className="flex flex-col gap-3 font-mono text-[11px] leading-relaxed">
                      {exp.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <span className="text-blue-500 dark:text-blue-400 font-bold select-none">
                            [sys_log_0{idx}]:
                          </span>
                          <span className={`font-sans text-xs ${isDark ? "text-slate-350" : "text-gray-600"}`}>
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
