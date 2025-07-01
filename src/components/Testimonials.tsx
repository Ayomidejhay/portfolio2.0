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
    content: "Alex's attention to detail and animation skills brought our designs to life in ways we never imagined.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Mike Chen",
    role: "CTO at StartupXYZ",
    content: "One of the most talented developers I've worked with. Alex consistently delivers high-quality code.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Emily Rodriguez",
    role: "Design Lead",
    content: "Alex bridges the gap between design and development perfectly. A true collaborative partner.",
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
    <section ref={testimonialsRef} className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-12 text-center">Testimonials</h2>
        <div className="grid md:grid-cols-1 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`testimonial-item theme-card shadow-lg transition-all duration-300 ${
                isDark ? "bg-slate-800 border-slate-700" : "bg-white/80 border-gray-200"
              }`}
            >
              <CardContent className="p-8">
                <p className={`text-lg mb-6 italic ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className={isDark ? "text-slate-400" : "text-gray-500"}>{testimonial.role}</p>
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
