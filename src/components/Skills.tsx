'use client';

import React from 'react'
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Cpu, Terminal, Award, Folder, FileCode } from "lucide-react"

interface SkillsSectionProps {
  isDark: boolean
}

interface SkillItem {
  name: string
  level: number
  code: string
  subskills: string[]
  description: string
  details: string[]
}

interface SkillCategory {
  id: string
  title: string
  skills: SkillItem[]
}

const skillCategories: SkillCategory[] = [
  {
    id: "core",
    title: "Frontend Core Modules",
    skills: [
      {
        name: "React",
        level: 80,
        code: "SYS_MOD_RCT",
        subskills: ["Custom Hooks", "Context API", "React Server Components", "Performance Profiling"],
        description: "Building modular component libraries and handling state architectures.",
        details: [
          "Initializing system context provider hooks... OK",
          "Mapping component layout trees... DONE",
          "Render profiling cycle: 0.12ms (OPTIMAL)",
          "State telemetry pipelines: ACTIVE"
        ]
      },
      {
        name: "TypeScript",
        level: 85,
        code: "SYS_MOD_TS",
        subskills: ["Interface Definitions", "Utility Types", "Generics", "Strict Typing Control"],
        description: "Developing robust, compile-safe, and self-documenting application codebases.",
        details: [
          "Loading strict compilation directives... OK",
          "Parsing generic type constraints... DONE",
          "Type safety audit: 100% SECURE",
          "Self-documenting AST indexation: COMPILED"
        ]
      },
      {
        name: "Next.js",
        level: 82,
        code: "SYS_MOD_NXT",
        subskills: ["App Router", "SSR / ISR", "Server Actions", "Middleware & Routing"],
        description: "Architecting server-rendered and statically-optimized React web applications.",
        details: [
          "Mapping App Router segments... OK",
          "Establishing static page generation (ISR) cache... DONE",
          "Dynamic routing response: <45ms (OPTIMAL)",
          "Server Action secure connection handlers: ONLINE"
        ]
      },
      {
        name: "JavaScript",
        level: 83,
        code: "SYS_MOD_JS",
        subskills: ["ES6+ Syntax", "Asynchronous Events", "Closures & Scopes", "DOM Mutation"],
        description: "Writing clean, performant, and optimized logical scripting solutions.",
        details: [
          "Allocating event loop handlers... OK",
          "Resolving asynchronous execution scopes... DONE",
          "Memory leak garbage collector audit: OPTIMAL",
          "Engine optimization level: v8/TURBO"
        ]
      }
    ]
  },
  {
    id: "motion",
    title: "Creative & Motion Telemetry",
    skills: [
      {
        name: "GSAP",
        level: 75,
        code: "SYS_MOD_GSP",
        subskills: ["ScrollTrigger", "Timeline Control", "Context Cleanups", "SVG Path Morphing"],
        description: "Creating fluid, story-driven scroll and path-orbital animation timelines.",
        details: [
          "Binding ScrollTrigger layout targets... OK",
          "Allocating nested GSAP timelines... DONE",
          "Animation frame rate: 60FPS (STABLE)",
          "Memory cleanup context trackers: VERIFIED"
        ]
      },
      {
        name: "Framer Motion",
        level: 80,
        code: "SYS_MOD_FRM",
        subskills: ["AnimatePresence", "Gestures & Hovers", "Layout Animations", "Variants API"],
        description: "Building component enter transitions and micro-interactions.",
        details: [
          "Compiling layout animate presence parameters... OK",
          "Binding mouse gesture hover variants... DONE",
          "GPU acceleration pipeline link: VERIFIED",
          "Component exit layout animation queue: ACTIVE"
        ]
      }
    ]
  },
  {
    id: "styling",
    title: "Styling & Visual Grid",
    skills: [
      {
        name: "Tailwind CSS",
        level: 82,
        code: "SYS_MOD_TW",
        subskills: ["Utility Layers", "Design System Integration", "Dark Mode Configs", "Responsive Queries"],
        description: "Designing fast, responsive layouts with custom theme configurations.",
        details: [
          "Compiling @theme inline directive parameters... OK",
          "Syncing dark mode selector properties... DONE",
          "CSS bundle footprint optimization: MINIFIED",
          "Responsive flexbox grid breakpoints: LINKED"
        ]
      },
      {
        name: "CSS/SCSS",
        level: 85,
        code: "SYS_MOD_CSS",
        subskills: ["CSS Grid / Flexbox", "Variables & Keyframes", "Responsive Typography", "CSS Modules"],
        description: "Styling layouts with pixel precision and fluid typography.",
        details: [
          "Mapping CSS custom variables... OK",
          "Compiling keyframe transform equations... DONE",
          "Pixel-precision grid render checks: COMPLETE",
          "Fluid viewport typography ratio scaling: SYNCD"
        ]
      }
    ]
  }
]

export default function Skills({isDark}: SkillsSectionProps) {
  const skillsRef = useRef<HTMLDivElement>(null)
  const [activeSkill, setActiveSkill] = useState<SkillItem>(skillCategories[0].skills[0])
  const [logs, setLogs] = useState<string[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const timerRefs = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: skillsRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          gsap.fromTo(
            ".skills-console-wrapper",
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1.0,
              ease: "power2.out",
            },
          )
        },
      })
    }, skillsRef)

    return () => ctx.revert()
  }, [])

  // Live diagnostic log simulation trigger
  const runDiagnostics = (skill: SkillItem) => {
    // Clear any previous running timers to prevent overlap logs
    timerRefs.current.forEach(t => clearTimeout(t))
    timerRefs.current = []

    setIsAnalyzing(true)
    setLogs([`> Initiating diagnostic sequence for module: ${skill.code}...`])

    skill.details.forEach((detail, index) => {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, `> ${detail}`])
        if (index === skill.details.length - 1) {
          setIsAnalyzing(false)
          setLogs(prev => [...prev, `> Diagnostics complete. Module state: OPTIMAL.`])
        }
      }, (index + 1) * 200)
      timerRefs.current.push(timer)
    })
  }

  useEffect(() => {
    runDiagnostics(activeSkill)
    return () => {
      timerRefs.current.forEach(t => clearTimeout(t))
    }
  }, [activeSkill])

  // Get custom blocks loader string [████████░░]
  const getBlockBar = (level: number) => {
    const total = 10
    const filled = Math.round(level / 10)
    return `[${"█".repeat(filled)}${"░".repeat(total - filled)}]`
  }

  return (
    <section ref={skillsRef} className="py-28 px-6 relative" id="skills">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-20 text-center">Skills &amp; Expertise</h2>
        
        {/* Double-Pane Telemetry Console Layout */}
        <div className="skills-console-wrapper w-full grid lg:grid-cols-[1.1fr_2fr] gap-8">
          
          {/* Left Pane: Filesystem Tree Selector */}
          <div className={`flex flex-col gap-6 border rounded-2xl p-6 backdrop-blur-sm text-left h-fit ${
            isDark 
              ? "bg-slate-950/60 border-slate-800/80 shadow-2xl shadow-blue-950/5" 
              : "bg-slate-50/50 border-slate-200 shadow-xl shadow-slate-200/20"
          }`}>
            <div className={`font-mono text-[9px] font-bold tracking-widest uppercase opacity-55 select-none ${isDark ? "text-slate-500" : "text-slate-400"}`}>
              // DIRECTORY: root/skills
            </div>
            
            <div className="flex flex-col gap-5 font-mono text-xs select-none">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="flex flex-col gap-2.5">
                  {/* Category folder header */}
                  <div className={`flex items-center gap-2 font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    <Folder className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 opacity-80" />
                    {cat.title}
                  </div>
                  
                  {/* Category skill list nodes */}
                  <div className={`flex flex-col gap-1.5 pl-4 border-l ${isDark ? "border-slate-800" : "border-slate-200"}`}>
                    {cat.skills.map((skill) => {
                      const isSelected = activeSkill.name === skill.name
                      return (
                        <button
                          key={skill.name}
                          onClick={() => setActiveSkill(skill)}
                          className={`flex items-center gap-2.5 py-1.5 px-3 rounded-lg border transition-all duration-200 text-left w-full cursor-pointer ${
                            isSelected
                              ? "bg-blue-600/10 border-blue-500/35 text-blue-500 dark:text-blue-400 font-semibold"
                              : "bg-transparent border-transparent hover:bg-slate-500/5 hover:text-blue-600 dark:hover:text-blue-400"
                          }`}
                        >
                          <FileCode className="w-3.5 h-3.5 opacity-60" />
                          {skill.name}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Pane: Live Telemetry Analyzer Console */}
          <div className={`flex flex-col gap-6 border rounded-2xl p-6 md:p-8 backdrop-blur-sm text-left ${
            isDark 
              ? "bg-slate-950/60 border-slate-800/80 shadow-2xl shadow-blue-950/5 text-slate-100" 
              : "bg-slate-50/50 border-slate-200 shadow-xl shadow-slate-200/20 text-slate-900"
          }`}>
            
            {/* Analyzer Header details */}
            <div className="flex flex-wrap items-center gap-3 w-full border-b border-slate-200/10 dark:border-slate-800/40 pb-4">
              <Cpu className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <div>
                <h3 className="text-xl font-bold font-sans leading-none">{activeSkill.name}</h3>
                <span className={`font-mono text-[9px] uppercase tracking-wider opacity-65 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Module: {activeSkill.code}
                </span>
              </div>
              
              {/* Telemetry Status Flag tag */}
              <span className={`ml-auto font-mono text-[9.5px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md flex items-center gap-1.5 select-none ${
                isAnalyzing
                  ? "bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse"
                  : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isAnalyzing ? "bg-amber-500 animate-ping" : "bg-emerald-500"}`} />
                {isAnalyzing ? "ANALYZING" : "OPTIMAL"}
              </span>
            </div>

            {/* Description dossier */}
            <p className={`text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              {activeSkill.description}
            </p>

            {/* Telemetry Loader stats bar */}
            <div className="flex flex-col gap-2 font-mono text-xs w-full">
              <div className="flex justify-between items-center opacity-70">
                <span>SYSTEM_LOAD_CAPACITY</span>
                <span>{activeSkill.level}%</span>
              </div>
              <div className={`p-3 rounded-lg border font-bold font-mono tracking-wider flex items-center ${
                isDark 
                  ? "bg-slate-900/60 border-slate-800/80 text-blue-400" 
                  : "bg-slate-100/60 border-slate-200 text-blue-700"
              }`}>
                {getBlockBar(activeSkill.level)}
              </div>
            </div>

            {/* Technical Specification Registers Grid */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-bold font-mono uppercase tracking-widest flex items-center gap-2 opacity-50">
                <Award className="w-3.5 h-3.5" />
                Spec Registers Grid
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {activeSkill.subskills.map((sub, i) => (
                  <span
                    key={sub}
                    className={`font-mono text-[9px] font-semibold border rounded-lg px-2.5 py-1.5 select-none text-center truncate ${
                      isDark 
                        ? "border-slate-800 bg-slate-900/20 text-slate-300" 
                        : "border-slate-200 bg-white/40 text-slate-700"
                    }`}
                    title={sub}
                  >
                    REG_0{i}: {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* Console Log Diagnostic Box */}
            <div className="flex flex-col gap-3 mt-auto">
              <h4 className="text-[10px] font-bold font-mono uppercase tracking-widest flex items-center gap-2 opacity-50 select-none">
                <Terminal className="w-3.5 h-3.5" />
                Diagnostic Log Telemetry
              </h4>
              <div className={`w-full h-32 rounded-xl p-4 font-mono text-[10.5px] md:text-xs leading-relaxed overflow-y-auto border ${
                isDark 
                  ? "bg-slate-950 border-slate-800 text-emerald-400 shadow-inner" 
                  : "bg-slate-900 border-slate-800 text-emerald-500 shadow-inner"
              }`}>
                <div className="space-y-1.5">
                  {logs.map((log, idx) => (
                    <div key={idx}>{log}</div>
                  ))}
                  {isAnalyzing && <span className="inline-block w-1.5 h-3 bg-emerald-500 dark:bg-emerald-400 animate-pulse ml-0.5" />}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
