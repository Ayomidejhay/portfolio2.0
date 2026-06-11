'use client';

import React from 'react'
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Github, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ProjectsSectionProps {
  isDark: boolean
}

const projects = [
  {
    title: "ZeroHunger App",
    description: "A food donation platform where donors can list surplus food and recipients can reserve pickups. Features real-time notifications, role-based authentication, and Supabase backend.",
    tech: ["Supabase", "Next.js", "ShadCN UI", "Tailwind", "TypeScript"],
    image: "/zerohunger.png?height=200&width=300",
    duration: "",
    team: "Solo Project",
    features: ["Role-based authentication", "Food listing creation and availability tracking", "Real-time notifications via Supabase Realtime", "Reservation system with expiration logic", "Pickup completion tracking and history"],
    link: "https://zero-hungerr.netlify.app/",
    github: "https://github.com/Ayomidejhay/zerohunger",
  },
  {
    title: "JobConnect",
    description: "A job-sharing platform where registered users can post job opportunities visible to all other users.",
    tech: ["Next.js", "Appwrite", "TypeScript", "Tailwind"],
    image: "/jobconnect.png?height=200&width=300",
    duration: "",
    team: "Solo Project",
    features: ["Authenticated user access and role handling", "Users can edit or delete their own job posts", "All users can browse and filter available jobs"],
    link: "https://jobconnnect.netlify.app/",
    github: "https://github.com/Ayomidejhay/jobconnect",
  },
  {
    title: "Admin Dashboard",
    description: "An intuitive admin interface for managing platform users, listings, and overall system health.",
    tech: ["Chart.js", "Next.js", "Framer Motion", "CSS", "TypeScript"],
    image: "/dashboard.png?height=200&width=300",
    duration: "",
    team: "Solo Project",
    features: ["Analytics dashboard", "Dark Mode", "Responsive Design"],
    link: "https://dashboardtestin.netlify.app/",
    github: "https://github.com/Ayomidejhay/dashboard-demo",
  },
  {
    title: "Degen Cyberlab",
    description: "A modern, conversion-optimized landing page for a fictional software lab/startup.",
    tech: ["Next.js", "Framer Motion", "Tailwind", "TypeScript"],
    image: "/degen.png?height=200&width=300",
    duration: "",
    team: "Solo Project",
    features: ["Fully responsive hero, services, and testimonial sections", "Animations with Framer Motion for engaging transitions", "Clean, modern branding using Tailwind and custom components"],
    link: "https://cyberr-lab.netlify.app/",
    github: "https://github.com/Ayomidejhay/cyberr-lab",
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
    }, projectsRef)

    return () => ctx.revert()
  }, [])

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -15,
      scale: 1.03,
      rotationY: 8,
      rotationX: 4,
      z: 50,
      boxShadow: isDark 
        ? "0 25px 50px -12px rgba(96, 165, 250, 0.25)" 
        : "0 25px 50px -12px rgba(59, 130, 246, 0.2)",
      duration: 0.4,
      ease: "power2.out",
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      rotationY: 0,
      rotationX: 0,
      z: 0,
      boxShadow: isDark 
        ? "0 10px 25px -5px rgba(0, 0, 0, 0.4)" 
        : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      duration: 0.4,
      ease: "power2.out",
    })
  }

  return (
    <section ref={projectsRef} className="py-28 px-6 relative" id="project">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-16 text-center">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <Card
              key={project.title}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`project-card theme-card group overflow-hidden shadow-xl border transition-all duration-500 transform-gpu glow-card ${
                isDark ? "bg-slate-800/80 border-slate-700/80" : "bg-white/95 border-gray-200/80"
              }`}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />

                {/* Enhanced hover overlay with detailed info */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-white font-bold text-xl mb-2">{project.title}</h4>

                    {/* Tech stack tags inside overlay */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-white/10 backdrop-blur-sm text-white text-[11px] rounded-full border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons inside overlay */}
                    <div className="flex gap-3">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={project.github}
                        className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-lg shadow-slate-950/30"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={project.link}
                        className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg border border-blue-500 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-200"></span>
                        </span>
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    </div>
                  </div>
                </div>

                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </div>

              <CardContent className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-blue-500 transition-colors duration-300">{project.title}</h3>
                  <p className={`mb-5 text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"}`}>{project.description}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${
                          isDark
                            ? "bg-slate-900/50 border-slate-800 text-slate-300"
                            : "bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={project.github}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-300 ${
                        isDark 
                          ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800" 
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      Code
                    </a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={project.link}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-blue-500/25"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-200"></span>
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Link
                    </a>
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
