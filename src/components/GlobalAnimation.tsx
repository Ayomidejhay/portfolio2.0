'use client';

import React from 'react';

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface GlobalAnimationsProps {
  isDark: boolean
}

export default function GlobalAnimation({isDark}: GlobalAnimationsProps) {
  useEffect(() => {
    const cleanupListeners: { element: EventTarget; type: string; handler: EventListener }[] = []

    const ctx = gsap.context(() => {
      // Enhanced section titles with character animation
      gsap.utils.toArray(".section-title").forEach((title: any) => {
        if (!title.dataset.originalText) {
          title.dataset.originalText = title.textContent || ""
        }
        const originalText = title.dataset.originalText
        const words = originalText.split(" ")
        title.innerHTML = words
          .map((word: string) => {
            const chars = word.split("")
            const charsHtml = chars
              .map((char: string) => `<span class="char inline-block">${char}</span>`)
              .join("")
            return `<span class="inline-block whitespace-nowrap">${charsHtml}</span>`
          })
          .join(" ")

        ScrollTrigger.create({
          trigger: title,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.fromTo(
              title.querySelectorAll(".char"),
              {
                y: 100,
                opacity: 0,
                rotation: 180,
                scale: 0,
              },
              {
                y: 0,
                opacity: 1,
                rotation: 0,
                scale: 1,
                duration: 0.8,
                stagger: {
                  amount: 0.6,
                  from: "center",
                },
                ease: "back.out(1.7)",
              },
            )
          },
        })
      })

      // Enhanced scroll progress with morphing
      gsap.to(".scroll-progress", {
        scaleX: 1,
        transformOrigin: "left",
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          onUpdate: (self) => {
            const progress = self.progress
            const hue = progress * 360
            gsap.set(".scroll-progress", {
              background: `linear-gradient(90deg, hsl(${hue}, 70%, 60%), hsl(${hue + 60}, 70%, 60%))`,
            })
          },
        },
      })

      // Parallax elements with different speeds
      gsap.utils.toArray(".parallax-slow").forEach((element: any) => {
        gsap.to(element, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })

      gsap.utils.toArray(".parallax-medium").forEach((element: any) => {
        gsap.to(element, {
          yPercent: -100,
          rotation: 180,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })

      gsap.utils.toArray(".parallax-fast").forEach((element: any) => {
        gsap.to(element, {
          yPercent: -150,
          rotation: 360,
          scale: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })

      // Interactive particle system
      const createClickParticle = (x: number, y: number) => {
        for (let i = 0; i < 12; i++) {
          const particle = document.createElement("div")
          particle.className = "click-particle"
          particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${isDark ? "#60a5fa" : "#3b82f6"};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${x}px;
            top: ${y}px;
          `
          document.body.appendChild(particle)

          const angle = (i / 12) * Math.PI * 2
          const velocity = 100 + Math.random() * 100
          const vx = Math.cos(angle) * velocity
          const vy = Math.sin(angle) * velocity

          gsap.to(particle, {
            x: vx,
            y: vy,
            opacity: 0,
            scale: 0,
            duration: 1 + Math.random(),
            ease: "power2.out",
            onComplete: () => particle.remove(),
          })
        }
      }

      const handleClick = (e: Event) => {
        const mouseEvent = e as MouseEvent
        createClickParticle(mouseEvent.clientX, mouseEvent.clientY)
      }

      document.addEventListener("click", handleClick)
      cleanupListeners.push({ element: document, type: "click", handler: handleClick as EventListener })
    })

    return () => {
      ctx.revert()
      cleanupListeners.forEach(({ element, type, handler }) => {
        element.removeEventListener(type, handler)
      })
    }
  }, [isDark])
  return null
}
