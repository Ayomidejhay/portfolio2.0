'use client';

import React from 'react';
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Award, Code2, Github, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface AchievementsSectionProps {
  isDark: boolean
}

const achievements = [
  {
    title: "Hackathon Winner",
    description: "Honored with the Best UI/UX Design Award for building intuitive interface designs.",
    icon: <Award className="w-8 h-8" />,
  },
  {
    title: "Fullstack App Delivery",
    description: "Shipped enterprise contract dashboard apps with real-time tracking features.",
    icon: <Code2 className="w-8 h-8" />,
  },
  {
    title: "Open Source Contributor",
    description: "Active contributor to interactive React web libraries and ecosystem tools.",
    icon: <Github className="w-8 h-8" />,
  },
  {
    title: "Frontend Certifications",
    description: "Certified developer in Advanced React, Next.js architecture, and Performance Tuning.",
    icon: <GraduationCap className="w-8 h-8" />,
  },
]

export default function Achievements({isDark}: AchievementsSectionProps) {
  const achievementsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: achievementsRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          gsap.fromTo(
            ".achievement-item",
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
    }, achievementsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={achievementsRef} className="py-28 px-6 relative" id="achievements">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-16 text-center">Achievements</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className={`achievement-item theme-card flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 border ${
                isDark ? "bg-slate-800/80 border-slate-700/80" : "bg-white/95 border-gray-200/80"
              }`}
            >
              <CardContent className="p-8 text-center flex flex-col items-center">
                <div className={`mb-6 p-4 rounded-full bg-blue-500/10 border border-blue-500/20 ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">{achievement.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"}`}>{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
