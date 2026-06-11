'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

import { Layers, Cpu, Flame, Accessibility } from 'lucide-react';

interface AboutProps {
  isDark: boolean
}

const strengths = [
  {
    title: "Visual Integrity",
    description: "Translating complex design into pixel-perfect, interactive frontend states.",
    icon: <Layers className="w-5 h-5 text-blue-500" />,
  },
  {
    title: "Scalable Architecture",
    description: "Building component libraries and state architectures that scale under heavy usage.",
    icon: <Cpu className="w-5 h-5 text-purple-500" />,
  },
  {
    title: "High Performance",
    description: "Optimizing frame-rates, bundle splittings, and assets for fast loading speed.",
    icon: <Flame className="w-5 h-5 text-orange-500" />,
  },
  {
    title: "Accessibility Core",
    description: "Ensuring all interactive elements are semantic, focus-visible, and screen-readable.",
    icon: <Accessibility className="w-5 h-5 text-green-500" />,
  },
]

export default function About({ isDark }: AboutProps) {
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          gsap.fromTo(
            ".about-item",
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
    }, aboutRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={aboutRef} className="py-28 px-6 relative" id="about">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-16 text-center">About Me</h2>
        
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Biography & Strengths */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <p className={`about-item text-base md:text-lg leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                Hi, I'm Ayomide — a software engineer with a strong focus on building highly interactive, accessible, and high-performance frontend interfaces. I specialize in the React/Next.js ecosystem and thrive on turning static designs into animated web realities.
              </p>
              <p className={`about-item text-base md:text-lg leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                My approach combines rigorous software engineering principles with dynamic animation aesthetics. I love bridging the gap between designers and developers.
              </p>
            </div>

            {/* Strengths Grid */}
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              {strengths.map((str, idx) => (
                <div
                  key={idx}
                  className={`about-item p-5 rounded-xl border transition-all duration-300 ${isDark
                    ? "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/80"
                    : "bg-slate-50 border-slate-200/80 hover:bg-slate-100/50"
                    }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      {str.icon}
                    </div>
                    <h4 className="font-bold text-sm tracking-tight">{str.title}</h4>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                    {str.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Profile Stats Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className={`about-item w-full max-w-sm rounded-2xl border p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between glow-card ${isDark
                ? "bg-slate-900/50 border-slate-800/60 shadow-blue-500/5"
                : "bg-white border-slate-200/80 shadow-slate-200/50"
              }`}>
              <h3 className="text-xl font-bold mb-6 tracking-tight">Technical Profile</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-3xl font-extrabold text-blue-500 tracking-tight">2+</p>
                  <p className={`text-xs font-semibold uppercase tracking-wider mt-1 ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                    Years Experience
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-purple-500 tracking-tight">10+</p>
                  <p className={`text-xs font-semibold uppercase tracking-wider mt-1 ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                    Projects Deployed
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-indigo-500 tracking-tight">100%</p>
                  <p className={`text-xs font-semibold uppercase tracking-wider mt-1 ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                    Client Satisfaction
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/10">
                <p className={`text-xs leading-relaxed italic ${isDark ? "text-slate-400" : "text-gray-500"}`}>
                  "Clean code, seamless animations, and structured design tokens are what I strive for."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
