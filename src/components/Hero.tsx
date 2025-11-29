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
    const ctx = gsap.context(() => {
      //hero animation with morphing elements
      const heroT1 = gsap.timeline();

      //Animated background shapes
      gsap.set(".hero-shape", { scale: 0, rotation: 45 });

      heroT1
        .to(".hero-shape", {
          scale: 1,
          rotation: 0,
          duration: 2,
          stagger: 0.2,
          ease: "elastic.out(1, 0.5)",
        })
        .from(
          ".hero-name",
          {
            duration: 1.8,
            y: 150,
            opacity: 0,
            rotationX: 90,
            transformOrigin: "50% 50% -100px",
            ease: "power4.out",
          },
          "-=1.5"
        )
        .from(
          ".hero-title",
          {
            duration: 1.5,
            y: 80,
            opacity: 0,
            scale: 0.5,
            rotation: 180,
            ease: "elastic.out(1, 0.3)",
          },
          "-=1.2"
        )
        .from(
          ".hero-description",
          {
            duration: 1.2,
            y: 50,
            opacity: 0,
            clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".hero-cta",
          {
            duration: 1,
            y: 60,
            opacity: 0,
           
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.4"
        );
      // Enhanced typing animation
      const typingElement = document.querySelector(".typing-text");
      if (typingElement) {
        const text = "Frontend Developer & Creative Coder";
        let index = 0;

        typingElement.textContent = "";

        const typeWriter = () => {
          if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;

            if (Math.random() > 0.9) {
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
                  });
                },
              });
            }

            setTimeout(typeWriter, 100 + Math.random() * 100);
          }
        };

        setTimeout(typeWriter, 1500);
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isDark]);
  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
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

      <div className="text-center max-w-4xl relative z-10">
        <h1
          className={`hero-name text-6xl md:text-8xl font-bold mb-4 tracking-tight bg-gradient-to-r ${
            isDark
              ? "from-white via-blue-400 to-purple-400"
              : "from-black via-blue-600 to-purple-600"
          } bg-clip-text text-transparent`}
        >
          AYOMIDE OLANIYAN
        </h1>
        <h2
          className={`hero-title text-2xl md:text-4xl font-light mb-6 ${
            isDark ? "text-slate-300" : "text-gray-600"
          }`}
        >
          <span className="typing-text">Frontend Developer </span>
          <span className="animate-pulse ml-1">|</span>
        </h2>
        <p
          className={`hero-description text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${
            isDark ? "text-slate-400" : "text-gray-500"
          }`}
        >
          Crafting beautiful, interactive web experiences with modern
          technologies and creative animations
        </p>
        <div className="hero-cta flex gap-4 justify-center flex-wrap">
          <Button
            size="lg"
            className={`interactive ${
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
            className={`interactive ${
              isDark
                ? "bg-transparent text-slate-300 border-slate-600 hover:bg-slate-800 hover:text-white"
                : "bg-white text-black border-black hover:bg-black hover:text-white"
            }`}
          >
            <Link href="#contact">Get In Touch</Link>
          </Button>

          <a href="/CV_Olaniyan_Ayomide.pdf" download="Olaniyan Ayomide cv.pdf">
            <Button
              variant="outline"
              size="lg"
              className={`interactive ${
                isDark
                  ? "bg-transparent text-slate-300 border-slate-600 hover:bg-slate-800 hover:text-white"
                  : "bg-white text-black border-black hover:bg-black hover:text-white"
              }`}
            >
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
          </a>
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
