'use client';

import React from 'react';
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Award, User, Github, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface AchievementsSectionProps {
  isDark: boolean
}

const achievements = [
  {
    title: "HackTech 2023 Winner",
    description: "Best UI/UX Design Award",
    icon: <Award className="w-8 h-8" />,
  },
  {
    title: "React Conference Speaker",
    description: "Presented on Advanced Animation Techniques",
    icon: <User className="w-8 h-8" />,
  },
  {
    title: "Open Source Contributor",
    description: "Active contributor to popular React libraries",
    icon: <Github className="w-8 h-8" />,
  },
  {
    title: "Certified React Developer",
    description: "Advanced React Patterns Certification",
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
    <section ref={achievementsRef} className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-12 text-center">Achievements</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className={`achievement-item theme-card shadow-lg transition-all duration-300 ${
                isDark ? "bg-slate-800 border-slate-700" : "bg-white/80 border-gray-200"
              }`}
            >
              <CardContent className="p-8 text-center">
                <div className={`mb-4 flex justify-center ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                <p className={isDark ? "text-slate-300" : "text-gray-600"}>{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
