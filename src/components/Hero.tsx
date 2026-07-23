"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InteractiveTerminal from "@/components/InteractiveTerminal";

interface HeroSectionProps {
  isDark: boolean;
}

export default function Hero({ isDark }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [musicNotes, setMusicNotes] = React.useState<{ id: number; char: string; left: number; top: number; rotation: number; scale: number }[]>([]);
  const noteIndexRef = useRef(0);

  const spawnNote = (e: React.MouseEvent<HTMLButtonElement>) => {
    const noteChars = ["♩", "♪", "♫", "♬", "♭", "♮", "♯", "𝄞", "𝄢"];
    const randomChar = noteChars[Math.floor(Math.random() * noteChars.length)];
    const id = Date.now() + noteIndexRef.current++;
    const newNote = {
      id,
      char: randomChar,
      left: Math.random() * 80 + 10,
      top: -20,
      rotation: Math.random() * 60 - 30,
      scale: Math.random() * 0.4 + 0.8,
    };
    setMusicNotes(prev => [...prev, newNote]);
    setTimeout(() => {
      setMusicNotes(prev => prev.filter(n => n.id !== id));
    }, 2000);
  };

  useEffect(() => {
    let typingTimer: NodeJS.Timeout | null = null;
    let initialTimer: NodeJS.Timeout | null = null;

    const ctx = gsap.context(() => {
      const heroT1 = gsap.timeline();

      // Set initial states for clean entrance without flashes
      gsap.set(".hero-shape", { scale: 0, rotation: 45 });
      gsap.set(".hero-left-content", { x: -50, opacity: 0 });
      gsap.set(".hero-right-content", { x: 50, opacity: 0 });
      gsap.set(".hero-name", { yPercent: 100 });
      gsap.set(".hero-title", { yPercent: 100 });
      gsap.set(".hero-description", { y: 20, opacity: 0 });
      gsap.set(".hero-cta", { y: 15, opacity: 0 });

      heroT1
        .to(".hero-shape", {
          scale: 1,
          rotation: 0,
          duration: 2,
          stagger: 0.2,
          ease: "elastic.out(1, 0.5)",
        })
        .to(
          ".hero-left-content",
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=1.8"
        )
        .to(
          ".hero-right-content",
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=1.8"
        )
        .to(
          ".hero-name",
          {
            duration: 1.2,
            yPercent: 0,
            ease: "power4.out",
          },
          "-=1.2"
        )
        .to(
          ".hero-title",
          {
            duration: 1.0,
            yPercent: 0,
            ease: "power4.out",
          },
          "-=1.0"
        )
        .to(
          ".hero-description",
          {
            duration: 1.0,
            y: 0,
            opacity: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          ".hero-cta",
          {
            duration: 0.8,
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.6"
        );
      // Enhanced typing animation with role cycling
      const typingElement = document.querySelector(".typing-text");
      if (typingElement) {
        const roles = ["Frontend Developer", "Creative Coder", "UI/UX Enthusiast"];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeWriter = () => {
          const currentRole = roles[roleIndex];
          if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
          } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
          }

          if (!isDeleting && Math.random() > 0.95) {
            gsap.to(typingElement, {
              duration: 0.1,
              scaleX: 1.05,
              skewX: 2,
              color: isDark ? "#60a5fa" : "#3b82f6",
              yoyo: true,
              repeat: 1,
              onComplete: () => {
                gsap.set(typingElement, {
                  color: isDark ? "#e5e7eb" : "#6b7280",
                  scaleX: 1,
                  skewX: 0
                });
              },
            });
          }

          let speed = isDeleting ? 40 : 80 + Math.random() * 40;

          if (!isDeleting && charIndex === currentRole.length) {
            speed = 2000; // Pause at full word
            isDeleting = true;
          } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 400; // Pause before typing next word
          }

          typingTimer = setTimeout(typeWriter, speed);
        };

        initialTimer = setTimeout(typeWriter, 1500);
      }
    }, heroRef);

    return () => {
      ctx.revert();
      if (typingTimer) clearTimeout(typingTimer);
      if (initialTimer) clearTimeout(initialTimer);
    };
  }, [isDark]);
  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden bg-radial-mesh pt-24"
    >
      {/* Animated background shapes */}
      <div
        className={`hero-shape morph-shape-1 absolute top-20 left-20 w-32 h-32 rounded-full opacity-20 ${
          isDark
            ? "bg-gradient-to-br from-blue-400 to-purple-400"
            : "bg-gradient-to-br from-blue-200 to-purple-200"
        }`}
      ></div>
      <div
        className={`hero-shape morph-shape-2 absolute bottom-20 right-20 w-24 h-24 rounded-full opacity-30 ${
          isDark
            ? "bg-gradient-to-br from-pink-400 to-yellow-400"
            : "bg-gradient-to-br from-pink-200 to-yellow-200"
        }`}
      ></div>
      <div
        className={`hero-shape morph-shape-3 absolute top-1/2 left-1/4 w-16 h-16 rounded-full opacity-25 ${
          isDark
            ? "bg-gradient-to-br from-green-400 to-blue-400"
            : "bg-gradient-to-br from-green-200 to-blue-200"
        }`}
      ></div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        {/* Style block for self-contained saxophone notes spawn effect */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes floatUpWobble {
            0% {
              transform: translateY(0) translateX(0) scale(0.3) rotate(0deg);
              opacity: 0;
            }
            15% {
              opacity: 1;
              transform: translateY(-20px) translateX(10px) scale(1) rotate(15deg);
            }
            50% {
              transform: translateY(-100px) translateX(-15px) scale(1.15) rotate(-15deg);
            }
            100% {
              transform: translateY(-200px) translateX(10px) scale(0.7) rotate(30deg);
              opacity: 0;
            }
          }
          .music-note-animate {
            animation: floatUpWobble 2s ease-out forwards;
          }
        `}} />

        {/* Left Side: Typography */}
        <div className="hero-left-content lg:text-left text-center flex flex-col justify-center">
          
          {/* Directive Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[9px] text-blue-500 dark:text-blue-400 font-semibold tracking-widest uppercase select-none">
              [DIRECTIVE] CORE_INIT // USER_BIO
            </span>
            <span className="h-px bg-slate-200 dark:bg-slate-800/80 flex-1"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          </div>

          {/* Blueprint Card Frame Wrapper */}
          <div className={`relative border p-6 md:p-8 rounded-2xl mb-6 backdrop-blur-sm text-left ${
            isDark 
              ? "bg-slate-950/40 border-slate-800/60 shadow-2xl shadow-blue-950/5" 
              : "bg-slate-50/50 border-slate-200/80 shadow-xl shadow-slate-200/20"
          }`}>
            {/* Blueprint grid crosses (+) in the 4 absolute corners */}
            <span className="absolute -top-1.5 -left-1.5 font-mono text-[12px] text-blue-500 font-bold select-none">+</span>
            <span className="absolute -top-1.5 -right-1.5 font-mono text-[12px] text-blue-500 font-bold select-none">+</span>
            <span className="absolute -bottom-2 -left-1.5 font-mono text-[12px] text-blue-500 font-bold select-none">+</span>
            <span className="absolute -bottom-2 -right-1.5 font-mono text-[12px] text-blue-500 font-bold select-none">+</span>

            <div className="overflow-hidden mb-2">
              <h1
                className={`hero-name text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r leading-tight ${
                  isDark
                    ? "from-white via-blue-200 to-slate-400"
                    : "from-slate-900 via-blue-600 to-indigo-800"
                } bg-clip-text text-transparent`}
              >
                AYOMIDE OLANIYAN
              </h1>
            </div>

            {/* Telemetry/Stats row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[9px] uppercase tracking-wider mb-5 opacity-65 border-b border-slate-200/10 dark:border-slate-800/40 pb-3">
              <span>LOC: NGR.WAT (GMT+1)</span>
              <span className="text-slate-400 dark:text-slate-700">|</span>
              <span>ROLE: DEV.FRONTEND</span>
              <span className="text-slate-400 dark:text-slate-700">|</span>
              <span>SYS_STATUS: ONLINE</span>
            </div>

            <div className="overflow-hidden mb-4 py-0.5">
              <h2
                className={`hero-title text-xl md:text-2xl font-light flex items-center justify-start ${
                  isDark ? "text-slate-300" : "text-gray-600"
                }`}
              >
                <span className="typing-text">Frontend Developer </span>
                <span className="animate-pulse ml-1 text-blue-500">|</span>
              </h2>
            </div>

            <p
              className={`hero-description text-sm md:text-base mb-6 leading-relaxed ${
                isDark ? "text-slate-400" : "text-gray-500"
              }`}
            >
              Crafting high-performance, interactive, and visually stunning web experiences with modern technologies like React, Next.js, and custom GSAP animations.
            </p>

            {/* Saxophone frequency trigger */}
            <div className="relative inline-block text-left">
              <button
                onClick={spawnNote}
                className={`interactive font-mono text-[9.5px] font-semibold border rounded-lg px-3 py-1.5 flex items-center gap-1.5 transition-all duration-200 relative select-none ${
                  isDark
                    ? "bg-slate-900/60 border-amber-500/30 hover:border-amber-400 text-amber-400 hover:bg-amber-950/20"
                    : "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100/60"
                }`}
              >
                <span>🎷</span> ACTIVATE CREATIVE FREQUENCY
              </button>
              
              {/* Floating Note elements */}
              {musicNotes.map((note) => (
                <span
                  key={note.id}
                  className="absolute pointer-events-none text-lg font-bold select-none text-amber-500 dark:text-amber-400 music-note-animate"
                  style={{
                    left: `${note.left}%`,
                    top: `${note.top}px`,
                    transform: `scale(${note.scale}) rotate(${note.rotation}deg)`,
                  }}
                >
                  {note.char}
                </span>
              ))}
            </div>
          </div>

          {/* Tech Specialization Flags */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
            {["[00 // NEXT.JS]", "[01 // TYPESCRIPT]", "[02 // GSAP]", "[03 // TAILWIND]"].map((flag) => (
              <span
                key={flag}
                className={`font-mono text-[8px] md:text-[9px] font-bold tracking-widest px-2.5 py-1 border rounded-md select-none ${
                  isDark
                    ? "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-blue-400 hover:border-blue-500/40"
                    : "bg-slate-50 border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-600/40"
                } transition-colors duration-200`}
              >
                {flag}
              </span>
            ))}
          </div>

          {/* Action links */}
          <div className="hero-cta flex gap-3.5 justify-center lg:justify-start flex-wrap">
            <Button
              size="lg"
              className={`interactive rounded-xl shadow-lg shadow-blue-500/10 ${
                isDark
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-black hover:bg-gray-800 text-white"
              }`}
            >
              <Link href="#project">View My Work</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={`interactive rounded-xl border transition-all duration-300 ${
                isDark
                  ? "bg-transparent text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
                  : "bg-white text-black border-slate-200 hover:bg-slate-100 hover:text-black hover:border-slate-300"
              }`}
            >
              <Link href="#contact">Get In Touch</Link>
            </Button>

            <a href="/Olaniyan Ayomide resume.pdf" download="Olaniyan Ayomide resume.pdf">
              <Button
                variant="outline"
                size="lg"
                className={`interactive rounded-xl border transition-all duration-300 ${
                  isDark
                    ? "bg-transparent text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
                    : "bg-white text-black border-slate-200 hover:bg-slate-100 hover:text-black hover:border-slate-300"
                }`}
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Developer Terminal */}
        <div className="hero-right-content flex justify-center lg:justify-end opacity-0">
          <InteractiveTerminal isDark={isDark} />
        </div>
      </div>

      {/* Enhanced floating elements */}
      <div
        className={`floating-1 absolute top-20 left-20 w-6 h-6 rounded-full parallax-slow ${
          isDark
            ? "bg-gradient-to-br from-blue-400 to-purple-400"
            : "bg-gradient-to-br from-blue-500 to-purple-500"
        }`}
      ></div>
      <div
        className={`floating-2 absolute bottom-40 right-20 w-8 h-8 rounded-full parallax-medium ${
          isDark
            ? "bg-gradient-to-br from-purple-400 to-pink-400"
            : "bg-gradient-to-br from-purple-500 to-pink-500"
        }`}
      ></div>
      <div
        className={`floating-3 absolute top-1/2 left-10 w-4 h-4 rounded-full parallax-fast ${
          isDark
            ? "bg-gradient-to-br from-green-400 to-blue-400"
            : "bg-gradient-to-br from-green-500 to-blue-500"
        }`}
      ></div>
      <div
        className={`floating-4 absolute top-1/3 right-1/4 w-3 h-3 rounded-full parallax-slow ${
          isDark
            ? "bg-gradient-to-br from-yellow-400 to-red-400"
            : "bg-gradient-to-br from-yellow-500 to-red-500"
        }`}
      ></div>
      <div
        className={`floating-5 absolute bottom-1/3 left-1/4 w-5 h-5 rounded-full parallax-medium ${
          isDark
            ? "bg-gradient-to-br from-indigo-400 to-purple-400"
            : "bg-gradient-to-br from-indigo-500 to-purple-500"
        }`}
      ></div>
    </section>
  );
}
