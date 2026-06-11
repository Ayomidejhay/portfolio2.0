'use client';

import React from 'react';
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ExperienceSectionProps {
  isDark: boolean
}

const experiences = [
    {
    title: "Frontend Developer (Contract)",
    company: "Rehobot Business Solution Ltd",
    period: "November 2025 - Present",
    description:
      "Worked as a contract frontend developer building responsive, conversion-focused web applications with Next.js and Tailwind CSS, including an internal admin dashboard with role-based access, while integrating APIs, optimizing performance, and translating business requirements into scalable frontend solutions.",
  },
  {
    title: "Frontend Intern",
    company: "DotCircle Labs",
    period: "July - November 2024",
    description:
      "Worked on real-world client projects using React and Firebase, optimized component structures, and contributed to responsive designs.",
  },
 
   {
    title: "Freelance Frontend Developer",
    company: "Self-Employed",
    period: "July 2023 – Present",
    description:
      "Built responsive websites, dashboards, and landing pages for startups and small businesses using React, Next.js, and Tailwind CSS, while developing reusable components and design systems, integrating backend services, optimizing for performance and SEO, and collaborating with clients to deliver tailored solutions.",
  },
]

export default function Experience({isDark}: ExperienceSectionProps) {
  const experienceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Alternate entry animations
      gsap.utils.toArray(".timeline-node").forEach((node: any, idx) => {
        const isLeft = idx % 2 === 0
        gsap.fromTo(
          node,
          {
            x: isLeft ? -100 : 100,
            opacity: 0,
            scale: 0.95,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: node,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        )
      })

      // Timeline vertical line height draw-in
      gsap.fromTo(".timeline-line", 
        { scaleY: 0 },
        { 
          scaleY: 1, 
          transformOrigin: "top",
          duration: 1.5, 
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
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-20 text-center">Experience</h2>
        
        <div className="relative">
          {/* Vertical central timeline line */}
          <div className="timeline-line absolute left-4 lg:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 origin-top transform lg:-translate-x-1/2 rounded-full" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0
              return (
                <div 
                  key={index} 
                  className={`timeline-node flex flex-col lg:flex-row items-start lg:items-center relative w-full ${
                    isLeft ? "lg:justify-start" : "lg:justify-end"
                  }`}
                >
                  {/* Glowing timeline node checkpoint circle */}
                  <div className="absolute left-4 lg:left-1/2 w-8 h-8 rounded-full border-4 border-white dark:border-slate-900 bg-blue-500 shadow-md shadow-blue-500/50 flex items-center justify-center -translate-x-1/2 z-10 transition-transform duration-300 hover:scale-125">
                    <Briefcase className="w-3.5 h-3.5 text-white" />
                  </div>

                  {/* Card container */}
                  <div className={`w-full lg:w-[45%] pl-12 lg:pl-0 ${isLeft ? "lg:pr-8" : "lg:pl-8"}`}>
                    <Card
                      className={`theme-card shadow-lg hover:shadow-xl transition-all duration-300 border glow-card ${
                        isDark ? "bg-slate-800/80 border-slate-700/80" : "bg-white/95 border-gray-200/80"
                      }`}
                    >
                      <CardContent className="p-8">
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 ${
                          isDark 
                            ? "bg-slate-900 text-blue-400 border border-slate-800" 
                            : "bg-blue-50 text-blue-700 border border-blue-100"
                        }`}>
                          {exp.period}
                        </span>
                        
                        <h3 className="text-2xl font-bold tracking-tight mb-1">{exp.title}</h3>
                        <p className="text-sm font-semibold text-blue-500 mb-4">{exp.company}</p>
                        
                        <p className={`text-sm leading-relaxed ${isDark ? "text-slate-350" : "text-gray-600"}`}>
                          {exp.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
