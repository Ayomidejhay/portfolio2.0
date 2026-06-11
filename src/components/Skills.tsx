'use client';

import React from 'react'
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Award } from "lucide-react"

interface SkillsSectionProps {
  isDark: boolean
}

const skills = [
  { 
    name: "React", 
    level: 80, 
    subskills: ["Custom Hooks", "Context API", "React Server Components", "Performance Profiling"],
    description: "Building modular component libraries and handling state architectures."
  },
  { 
    name: "TypeScript", 
    level: 80, 
    subskills: ["Interface Definitions", "Utility Types", "Generics", "Strict Typing Control"],
    description: "Developing robust, compile-safe, and self-documenting application codebases."
  },
  { 
    name: "Next.js", 
    level: 80, 
    subskills: ["App Router", "SSR / ISR", "Server Actions", "Middleware & Routing"],
    description: "Architecting server-rendered and statically-optimized React web applications."
  },
  { 
    name: "GSAP", 
    level: 75, 
    subskills: ["ScrollTrigger", "Timeline Control", "Context Cleanups", "SVG Path Morphing"],
    description: "Creating fluid, story-driven scroll and path-orbital animation timelines."
  },
  { 
    name: "Tailwind CSS", 
    level: 82, 
    subskills: ["Utility Layers", "Design System Integration", "Dark Mode Configs", "Responsive Queries"],
    description: "Designing fast, responsive layouts with custom theme configurations."
  },
  { 
    name: "Framer Motion", 
    level: 80, 
    subskills: ["AnimatePresence", "Gestures & Hovers", "Layout Animations", "Variants API"],
    description: "Building component enter transitions and micro-interactions."
  },
  { 
    name: "JavaScript", 
    level: 83, 
    subskills: ["ES6+ Syntax", "Asynchronous Events", "Closures & Scopes", "DOM Mutation"],
    description: "Writing clean, performant, and optimized logical scripting solutions."
  },
  { 
    name: "CSS/SCSS", 
    level: 85, 
    subskills: ["CSS Grid / Flexbox", "Variables & Keyframes", "Responsive Typography", "CSS Modules"],
    description: "Styling layouts with pixel precision and fluid typography."
  },
]

export default function Skills({isDark}: SkillsSectionProps) {
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: skillsRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          gsap.fromTo(
            ".skill-card",
            {
              y: 60,
              opacity: 0,
              scale: 0.95,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              stagger: 0.1,
              ease: "power3.out",
            },
          )
        },
      })

      // Skill level bar loading transitions
      gsap.utils.toArray(".skill-progress-bar").forEach((bar: any, index) => {
        ScrollTrigger.create({
          trigger: bar,
          start: "top 90%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.fromTo(
              bar,
              { scaleX: 0, transformOrigin: "left" },
              {
                scaleX: 1,
                duration: 1.5,
                ease: "power2.out",
                delay: index * 0.05,
              }
            )
          },
        })
      })
    }, skillsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={skillsRef} className="py-28 px-6 relative" id="skills">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-16 text-center">Skills &amp; Expertise</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <Card
              key={index}
              className={`skill-card theme-card group relative overflow-hidden transition-all duration-300 border glow-card ${
                isDark ? "bg-slate-800/80 border-slate-700/80" : "bg-white/95 border-gray-200/80"
              }`}
            >
              <CardContent className="p-6 h-[220px] flex flex-col justify-between relative">
                {/* Header */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold tracking-tight">{skill.name}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isDark 
                        ? "bg-slate-900 text-blue-400 border border-slate-800" 
                        : "bg-blue-50 text-blue-700 border border-blue-100"
                    }`}>
                      {skill.level}%
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                    {skill.description}
                  </p>
                </div>

                {/* Bottom Progress Bar */}
                <div className="w-full">
                  <div className={`w-full h-1 rounded-full ${isDark ? "bg-slate-700" : "bg-slate-200"} overflow-hidden`}>
                    <div 
                      className="skill-progress-bar h-full bg-gradient-to-r from-blue-500 to-purple-600 origin-left"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

                {/* Subskills Hover Overlay */}
                <div className="absolute inset-0 bg-slate-950/95 p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto rounded-xl">
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-blue-500" />
                    Specializations
                  </h4>
                  <ul className="space-y-1.5">
                    {skill.subskills.map((sub, idx) => (
                      <li key={idx} className="text-slate-300 text-xs flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
