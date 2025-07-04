'use client';

import React from 'react'
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface SkillsSectionProps {
  isDark: boolean
}

const skills = [
  { name: "React", level:80 },
  { name: "TypeScript", level: 80 },
  { name: "Next.js", level: 80 },
  { name: "GSAP", level: 75 },
  { name: "Tailwind CSS", level: 82 },
  { name: "Framer Motion", level: 80 },
  { name: "JavaScript", level: 83 },
  { name: "CSS/SCSS", level: 85 },
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
            ".skill-item",
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

      // Advanced skill bars with wave effects
      gsap.utils.toArray(".skill-bar").forEach((bar: any, index) => {
        ScrollTrigger.create({
          trigger: bar,
          start: "top 90%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.fromTo(
              bar,
              {
                scaleX: 0,
                transformOrigin: "left",
              },
              {
                scaleX: 1,
                duration: 2,
                ease: "elastic.out(1, 0.3)",
                delay: index * 0.1,
              },
            )

            // Add glow effect
            gsap.to(bar, {
              boxShadow: `0 0 20px ${isDark ? "rgba(96, 165, 250, 0.6)" : "rgba(59, 130, 246, 0.6)"}`,
              duration: 0.5,
              delay: index * 0.1 + 1,
            })

            // Continuous pulse
            gsap.to(bar, {
              boxShadow: `0 0 30px ${isDark ? "rgba(96, 165, 250, 0.4)" : "rgba(59, 130, 246, 0.4)"}`,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: index * 0.1 + 1.5,
            })
          },
        })
      })
    }, skillsRef)

    return () => ctx.revert()
  }, [isDark])
  return (
    <section ref={skillsRef} className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-12 text-center">Skills</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`skill-item theme-card rounded-xl p-6 shadow-lg transition-all duration-300 ${
                isDark ? "bg-slate-800 border-slate-700" : "bg-white/80 border-gray-200"
              }`}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium text-lg">{skill.name}</span>
                <span className={`font-bold ${isDark ? "text-slate-400" : "text-gray-500"}`}>{skill.level}%</span>
              </div>
              <div className={`w-full rounded-full h-3 overflow-hidden ${isDark ? "bg-slate-700" : "bg-gray-200"}`}>
                <div
                  className="skill-bar bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
