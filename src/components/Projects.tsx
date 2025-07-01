'use client';

import React from 'react'
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ProjectsSectionProps {
  isDark: boolean
}

const projects = [
  {
    title: "ZeroHunger App",
    description: "A food donation platform where donors can list surplus food and recipients can reserve pickups. Features real-time notifications, role-based authentication, and Supabase backend.",
    tech: ["Supabase", "Next.js", "ShadCN UI", "Tailwind", "TypeScript"],
    image: "/placeholder.svg?height=200&width=300",
    duration: "",
    team: "Solo Project",
    features: ["Role-based authentication", "Food listing creation and availability tracking", "Real-time notifications via Supabase Realtime", "Reservation system with expiration logic", "Pickup completion tracking and history"],
  },
    {
    title: "JobConnect",
    description: "A job-sharing platform where registered users can post job opportunities visible to all other users.",
    tech: ["Next.js", "Appwrite", "TypeScript", "Tailwind"],
    image: "/jobconnect.png?height=200&width=300",
    duration: "",
    team: "Solo Project",
    features: ["Authenticated user access and role handling", "Users can edit or delete their own job posts", "All users can browse and filter available jobs"],
  },
  {
    title: "Admin Dashboard",
    description: "An intuitive admin interface for managing platform users, listings, and overall system health.",
    tech: ["Chart.js", "Next.js", "Framer Motion", "CSS", "TypeScript"],
    image: "/dashboard.png?height=200&width=300",
    duration: "",
    team: "Solo Project",
    features: ["Analytics dashboard", "Dark Mode", "Responsive Design"],
  },
  {
    title: "Degen Cyberlab",
    description: "A modern, conversion-optimized landing page for a fictional software lab/startup.",
    tech: ["Next.js", "Framer Motion", "Tailwind", "TypeScript"],
    image: "/degen.png?height=200&width=300",
    duration: "",
    team: "Solo Project",
    features: ["Fully responsive hero, services, and testimonial sections", "Animations with Framer Motion for engaging transitions", "Clean, modern branding using Tailwind and custom components"],
  },

]


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
            ".project-card",
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

      // Project cards with advanced 3D hover effects
      gsap.utils.toArray(".project-card").forEach((card: any, index) => {
        // Continuous subtle animation
       // gsap.to(card, {
       //   rotationY: 2,
       //   rotationX: 1,
       //   duration: 4 + index * 0.5,
       //   repeat: -1,
       //   yoyo: true,
       //   ease: "sine.inOut",
       // })

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -20,
            scale: 1.05,
            rotationY: 10,
            rotationX: 5,
            z: 100,
            boxShadow: `0 25px 50px ${isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)"}`,
            duration: 0.6,
            ease: "power2.out",
          })
        })

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            z: 0,
            boxShadow: `0 10px 25px ${isDark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)"}`,
            duration: 0.6,
            ease: "power2.out",
          })
        })
      })
    }, projectsRef)

    return () => ctx.revert()
  }, [isDark])
  return (
    <section ref={projectsRef} className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-12 text-center">Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className={`project-card theme-card group cursor-pointer overflow-hidden shadow-xl interactive transition-all duration-300 ${
                isDark ? "bg-slate-800 border-slate-700" : "bg-white/90 border-gray-200"
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Enhanced hover overlay with detailed info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <h4 className="text-white font-bold text-lg mb-2">{project.title}</h4>
                    <p className="text-gray-200 text-sm mb-3 leading-relaxed">{project.description}</p>

                    {/* Project details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-300 text-xs">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span>Live Project</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 text-xs">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        <span>{project.duration || "3 months"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 text-xs">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        <span>{project.team || "Team of 4"}</span>
                      </div>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-500/80 backdrop-blur-sm text-white border border-blue-400/50 hover:bg-blue-600/80 transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Live Demo
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-blue-500/80 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className={`mb-4 ${isDark ? "text-slate-300" : "text-gray-600"}`}>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 text-sm rounded-full ${
                        isDark
                          ? "bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-300"
                          : "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
