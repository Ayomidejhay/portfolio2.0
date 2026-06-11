"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroSectionProps {
  isDark: boolean;
}

export default function Hero({ isDark }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);

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
        {/* Left Side: Typography */}
        <div className="lg:text-left text-center flex flex-col justify-center">
          <div className="overflow-hidden mb-4 py-1">
            <h1
              className={`hero-name text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r leading-tight ${
                isDark
                  ? "from-white via-blue-400 to-purple-400"
                  : "from-black via-blue-600 to-purple-600"
              } bg-clip-text text-transparent`}
            >
              AYOMIDE OLANIYAN
            </h1>
          </div>
          <div className="overflow-hidden mb-6 py-1">
            <h2
              className={`hero-title text-xl md:text-3xl font-light flex items-center justify-center lg:justify-start ${
                isDark ? "text-slate-300" : "text-gray-600"
              }`}
            >
              <span className="typing-text">Frontend Developer </span>
              <span className="animate-pulse ml-1 text-blue-500">|</span>
            </h2>
          </div>
          <p
            className={`hero-description text-base md:text-lg mb-8 max-w-xl leading-relaxed ${
              isDark ? "text-slate-400" : "text-gray-500"
            }`}
          >
            Crafting high-performance, interactive, and visually stunning web experiences with modern technologies like React, Next.js, and custom GSAP animations.
          </p>
          <div className="hero-cta flex gap-4 justify-center lg:justify-start flex-wrap">
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
          <div className={`w-full max-w-md rounded-2xl border backdrop-blur-xl shadow-2xl p-6 text-left font-mono text-xs md:text-sm leading-relaxed overflow-hidden glow-card ${
            isDark 
              ? "bg-slate-950/80 border-slate-800/80 shadow-blue-500/5 text-slate-300" 
              : "bg-white/80 border-slate-200/80 shadow-slate-200/50 text-slate-700"
          }`}>
            <div className="flex gap-1.5 mb-5 border-b border-slate-200/20 dark:border-slate-800/60 pb-3">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
              <span className={`ml-2 text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>ayomide.sh</span>
            </div>
            <div className="space-y-3.5">
              <div>
                <span className="text-purple-500">~</span> <span className="text-blue-500 font-semibold">neofetch</span>
              </div>
              <div className="grid grid-cols-[85px_1fr] gap-y-2.5">
                <span className="text-blue-500 font-bold">OS:</span>
                <span>Windows 11 x86_64</span>
                <span className="text-blue-500 font-bold">Shell:</span>
                <span>powershell</span>
                <span className="text-blue-500 font-bold">Editor:</span>
                <span>VS Code</span>
                <span className="text-blue-500 font-bold">Stack:</span>
                <span>React, Next.js, TypeScript</span>
                <span className="text-blue-500 font-bold">Styling:</span>
                <span>Tailwind CSS, Vanilla CSS</span>
                <span className="text-blue-500 font-bold">Backend:</span>
                <span>Supabase, Firebase, Appwrite</span>
                <span className="text-blue-500 font-bold">Interests:</span>
                <span>Saxophone 🎷, Football ⚽</span>
              </div>
              <div className={`pt-3 border-t border-slate-200/10 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                {`// Continuous learning, clean interfaces`}
              </div>
            </div>
          </div>
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
