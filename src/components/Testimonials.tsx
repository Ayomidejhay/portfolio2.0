'use client';

import React from 'react'
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialsSectionProps {
  isDark: boolean
}

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager at TechCorp",
    content: "Ayomide's attention to detail and animation skills brought our designs to life in ways we never imagined. He is a phenomenal frontend developer.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Mike Chen",
    role: "CTO at StartupXYZ",
    content: "One of the most talented developers I've worked with. Ayomide consistently delivers high-quality code and excels at backend integration.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Emily Rodriguez",
    role: "Design Lead",
    content: "Ayomide bridges the gap between design and development perfectly. A true collaborative partner with a keen eye for interactive visuals.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export default function Testimonials({isDark}: TestimonialsSectionProps) {
  const testimonialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: testimonialsRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          gsap.fromTo(
            ".testimonial-item",
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
    }, testimonialsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={testimonialsRef} className="py-28 px-6 relative" id="testimonials">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-16 text-center">Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`testimonial-item theme-card flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 border ${
                isDark ? "bg-slate-800/80 border-slate-700/80" : "bg-white/95 border-gray-200/80"
              }`}
            >
              <CardContent className="p-8 flex flex-col justify-between h-full">
                <p className={`text-base mb-8 italic leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-200/20">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{testimonial.name}</p>
                    <p className={`text-xs ${isDark ? "text-slate-400" : "text-gray-500"}`}>{testimonial.role}</p>
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
