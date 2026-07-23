'use client'

import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Layers, Cpu, Flame, Accessibility } from 'lucide-react';

interface AboutProps {
  isDark: boolean
}

const strengths = [
  {
    title: "Visual Integrity",
    description: "Translating complex design mockups into pixel-perfect, interactive frontend states.",
    icon: <Layers className="w-4 h-4 text-blue-500 dark:text-blue-450" />,
  },
  {
    title: "Scalable Architecture",
    description: "Building modular component libraries and state structures that scale under heavy usage.",
    icon: <Cpu className="w-4 h-4 text-purple-500 dark:text-purple-450" />,
  },
  {
    title: "High Performance",
    description: "Optimizing frame-rates, bundle splittings, and media assets for maximum load speeds.",
    icon: <Flame className="w-4 h-4 text-orange-500 dark:text-orange-450" />,
  },
  {
    title: "Accessibility Core",
    description: "Ensuring all interactive elements are semantic, focus-visible, and screen-reader compliant.",
    icon: <Accessibility className="w-4 h-4 text-green-500 dark:text-green-450" />,
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
              y: 60,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1.0,
              stagger: 0.1,
              ease: "power2.out",
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
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-20 text-center">About Me</h2>
        
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Biography & Strengths */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <p className={`about-item text-base md:text-lg leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                Hi, I'm Ayomide — a software engineer with a strong focus on building highly interactive, accessible, and high-performance frontend interfaces. I specialize in the React/Next.js ecosystem and thrive on turning static designs into animated web realities.
              </p>
              <p className={`about-item text-base md:text-lg leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                My approach combines rigorous software engineering principles with dynamic animation aesthetics. I love bridging the gap between designers and developers.
              </p>
            </div>

            {/* Strengths Grid */}
            <div className="grid md:grid-cols-2 gap-5 pt-4">
              {strengths.map((str, idx) => (
                <div
                  key={idx}
                  className={`about-item p-5 rounded-xl border transition-all duration-300 relative group text-left ${isDark
                    ? "bg-slate-900/40 border-slate-800/80 hover:border-blue-500/40"
                    : "bg-slate-50 border-slate-200 hover:border-blue-500/40"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2.5">
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

          {/* Right Column: Profile Stats CPU schematic card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className={`about-item w-full max-w-md rounded-2xl border p-6 md:p-8 backdrop-blur-xl relative overflow-hidden flex flex-col font-mono text-xs ${isDark
                ? "bg-slate-950/40 border-slate-800/60 shadow-2xl shadow-blue-950/5 text-slate-200"
                : "bg-slate-50/50 border-slate-200 shadow-xl shadow-slate-200/20 text-slate-800"
              }`}>
              {/* Schematic crosshairs in corners */}
              <span className="absolute -top-1.5 -left-1.5 font-mono text-[12px] text-blue-500 font-bold select-none">+</span>
              <span className="absolute -top-1.5 -right-1.5 font-mono text-[12px] text-blue-500 font-bold select-none">+</span>
              <span className="absolute -bottom-2 -left-1.5 font-mono text-[12px] text-blue-500 font-bold select-none">+</span>
              <span className="absolute -bottom-2 -right-1.5 font-mono text-[12px] text-blue-500 font-bold select-none">+</span>

              <div className="flex items-center gap-2 mb-6 w-full border-b border-slate-200/10 dark:border-slate-800/40 pb-3">
                <span className="font-mono text-[9px] text-blue-500 dark:text-blue-400 font-semibold tracking-widest uppercase select-none">
                  [UNIT_CORES // PROCESSING_STATS]
                </span>
              </div>

              <div className="relative flex flex-col gap-6 w-full text-left">
                {/* Circuit board connecting line vertically */}
                <div className="absolute left-[24px] top-6 bottom-6 w-px border-l border-dashed border-blue-500/30"></div>

                {/* Core 00: Years Experience */}
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-base select-none ${
                    isDark ? "bg-slate-900 border-slate-800 text-blue-400" : "bg-white border-slate-200 text-blue-600"
                  }`}>
                    2+
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-600 font-semibold">
                      [CORE_00 // YEARS_EXPERIENCE]
                    </span>
                    <h5 className="font-sans text-sm font-bold mt-0.5 leading-none">PROFESSIONAL_UPTIME</h5>
                    <p className={`text-[10px] mt-1 leading-relaxed ${isDark ? "text-slate-450" : "text-gray-500"}`}>
                      Building high-performance frontend state structures.
                    </p>
                  </div>
                </div>

                {/* Core 01: Projects Deployed */}
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-base select-none ${
                    isDark ? "bg-slate-900 border-slate-800 text-purple-400" : "bg-white border-slate-200 text-purple-600"
                  }`}>
                    10+
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-600 font-semibold">
                      [CORE_01 // PROJECTS_DEPLOYED]
                    </span>
                    <h5 className="font-sans text-sm font-bold mt-0.5 leading-none">SYSTEM_BUILDS_SHIPPED</h5>
                    <p className={`text-[10px] mt-1 leading-relaxed ${isDark ? "text-slate-450" : "text-gray-500"}`}>
                      Statically optimized Next.js frameworks deployed.
                    </p>
                  </div>
                </div>

                {/* Core 02: Client Satisfaction */}
                <div className="flex items-start gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-base select-none ${
                    isDark ? "bg-slate-900 border-slate-800 text-indigo-400" : "bg-white border-slate-200 text-indigo-600"
                  }`}>
                    100%
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 dark:text-slate-600 font-semibold">
                      [CORE_02 // SYSTEM_EFFICIENCY]
                    </span>
                    <h5 className="font-sans text-sm font-bold mt-0.5 leading-none">CLIENT_SATISFACTION</h5>
                    <p className={`text-[10px] mt-1 leading-relaxed ${isDark ? "text-slate-450" : "text-gray-500"}`}>
                      Clean layout compliance and fluid typography delivered.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/10 dark:border-slate-800/40">
                <p className={`text-[11px] leading-relaxed italic ${isDark ? "text-slate-450" : "text-gray-500"}`}>
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
