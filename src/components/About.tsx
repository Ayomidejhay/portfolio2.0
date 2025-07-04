'use client'

import React, {useEffect, useRef} from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

interface AboutProps{
    isDark: boolean
}

export default function About({isDark}: AboutProps) {
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
     <section ref={aboutRef} className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold mb-12 text-center">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className={`about-item text-lg mb-6 leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"}`}>
              Hi, I'm Ayomide — a developer with a strong focus on frontend technologies like React, Next.js, Tailwind CSS, and JavaScript. I love translating designs into responsive, accessible interfaces and bringing backend functionality to life using platforms like Supabase and Firebase.
            </p>
            <p className={`about-item text-lg mb-6 leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"}`}>
              My approach combines clean code with stunning visuals, ensuring every project is both functional and
              beautiful.
            </p>
            <p className={`about-item text-lg leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"}`}>
              When I'm not coding, you'll find me exploring new technologies, playing football or saxophone.
            </p>
          </div>
          <div className="about-item">
            <Image
              src="/coding.jpg"
              alt=""
              width={500}
              height={500}
              className="rounded-lg shadow-lg w-full max-w-sm mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
