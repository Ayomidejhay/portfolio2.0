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
    title: "Frontend Intern",
    company: "DotCircle Labs",
    period: "July - November 2024",
    description:
      "Worked on real-world client projects using React and Firebase, optimized component structures, and contributed to responsive designs.",
  },
  
]

export default function Experience({isDark}: ExperienceSectionProps) {
    const experienceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: experienceRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          gsap.fromTo(
            ".experience-item",
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
    }, experienceRef)

    return () => ctx.revert()
  }, [])
  return (
    <section ref={experienceRef} className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-12 text-center">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className={`experience-item theme-card shadow-lg transition-all duration-300 ${
                isDark ? "bg-slate-800 border-slate-700" : "bg-white/80 border-gray-200"
              }`}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Briefcase className={`w-8 h-8 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                    <p className={`text-lg font-medium mb-2 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                      {exp.company}
                    </p>
                    <p className={`mb-4 ${isDark ? "text-slate-400" : "text-gray-500"}`}>{exp.period}</p>
                    <p className={`leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                      {exp.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
