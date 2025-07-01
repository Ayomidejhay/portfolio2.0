'use client';

import React from 'react'
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface CustomCursorProps {
  isDark: boolean
}

export default function CustomCursor({isDark}: CustomCursorProps) {
     const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const ctx = gsap.context(() => {
      gsap.set(cursor, { xPercent: -50, yPercent: -50 })

      let mouseX = 0,
        mouseY = 0
      const moveCursor = (e: MouseEvent) => {
        mouseX = e.clientX
        mouseY = e.clientY
        gsap.to(cursor, {
          duration: 0.15,
          x: mouseX,
          y: mouseY,
          ease: "power2.out",
        })
      }

      window.addEventListener("mousemove", moveCursor)

      // Create cursor trail particles
      const createTrailParticle = () => {
        const particle = document.createElement("div")
        particle.className = "cursor-trail"
        particle.style.cssText = `
          position: fixed;
          width: 3px;
          height: 3px;
          background: ${isDark ? "#60a5fa" : "#3b82f6"};
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          left: ${mouseX}px;
          top: ${mouseY}px;
        `
        document.body.appendChild(particle)

        gsap.to(particle, {
          opacity: 0,
          scale: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => particle.remove(),
        })
      }

      // Create trail particles on mouse move
      let trailTimer: NodeJS.Timeout
      window.addEventListener("mousemove", () => {
        clearTimeout(trailTimer)
        trailTimer = setTimeout(createTrailParticle, 50)
      })

      const hoverElements = document.querySelectorAll("button, a, .interactive")
      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(cursor, {
            duration: 0.2,
            scale: 3,
            backgroundColor: isDark ? "#60a5fa" : "#3b82f6",
            boxShadow: `0 0 20px ${isDark ? "rgba(96, 165, 250, 0.5)" : "rgba(59, 130, 246, 0.5)"}`,
          })
        })
        el.addEventListener("mouseleave", () => {
          gsap.to(cursor, {
            duration: 0.2,
            scale: 1,
            backgroundColor: isDark ? "#ffffff" : "#000000",
            boxShadow: "none",
          })
        })
      })
    })

    return () => ctx.revert()
  }, [isDark])
  return (
     <div
      ref={cursorRef}
      className={`fixed w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block ${
        isDark ? "bg-white" : "bg-black"
      }`}
    />
  )
}
