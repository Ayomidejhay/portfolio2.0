'use client';

import React from 'react'
import { useEffect } from "react"
import { gsap } from "gsap"

interface FloatingElementsProps {
  isDark: boolean
}

export default function FloatingElements({isDark}: FloatingElementsProps) {
    useEffect(() => {
    const ctx = gsap.context(() => {
      // Complex floating elements with physics
      const floatingElements = [".floating-1", ".floating-2", ".floating-3", ".floating-4", ".floating-5"]

      floatingElements.forEach((element, index) => {
        const duration = 6 + index * 2
        const amplitude = 20 + index * 10

        // Main floating animation
        gsap.to(element, {
          y: -amplitude,
          rotation: 360,
          duration: duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5,
        })

        // Secondary movement
        gsap.to(element, {
          x: amplitude * 0.5,
          duration: duration * 0.7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3,
        })

        // Pulsing scale animation
        gsap.to(element, {
          scale: 1.4,
          duration: duration * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        })

        // Color shifting animation
        gsap.to(element, {
          filter: "hue-rotate(360deg)",
          duration: duration * 2,
          repeat: -1,
          ease: "none",
          delay: index * 0.1,
        })

        // Opacity pulsing
        gsap.to(element, {
          opacity: 0.3,
          duration: duration * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.4,
        })
      })

      // Add magnetic effect to floating elements
      floatingElements.forEach((selector, index) => {
        const element = document.querySelector(selector)
        if (element) {
          element.addEventListener("mouseenter", () => {
            gsap.to(element, {
              scale: 2,
              rotation: 180,
              duration: 0.5,
              ease: "back.out(1.7)",
            })
          })

          element.addEventListener("mouseleave", () => {
            gsap.to(element, {
              scale: 1,
              rotation: 0,
              duration: 0.5,
              ease: "back.out(1.7)",
            })
          })
        }
      })

      // Add orbital animation for floating elements
      gsap.to(".floating-1", {
        motionPath: {
          path: "M0,0 Q50,-50 100,0 T200,0",
          autoRotate: true,
        },
        duration: 15,
        repeat: -1,
        ease: "none",
      })

      gsap.to(".floating-2", {
        motionPath: {
          path: "M0,0 Q-30,40 -60,0 T-120,0",
          autoRotate: true,
        },
        duration: 12,
        repeat: -1,
        ease: "none",
      })

      gsap.to(".floating-3", {
        motionPath: {
          path: "M0,0 Q25,-25 50,0 Q75,25 100,0",
          autoRotate: true,
        },
        duration: 18,
        repeat: -1,
        ease: "none",
      })

      // Enhanced morphing background shapes with particle trails
      gsap.to(".morph-shape-1", {
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        rotation: 180,
        scale: 1.3,
        filter: "blur(1px)",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        onUpdate: () => {
          if (Math.random() > 0.95) {
            createMorphParticle(".morph-shape-1")
          }
        },
      })

      gsap.to(".morph-shape-2", {
        borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
        rotation: -120,
        scale: 0.8,
        filter: "blur(0.5px)",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        onUpdate: () => {
          if (Math.random() > 0.97) {
            createMorphParticle(".morph-shape-2")
          }
        },
      })

      gsap.to(".morph-shape-3", {
        borderRadius: "40% 60% 60% 40% / 60% 30% 60% 40%",
        rotation: 90,
        scale: 1.1,
        filter: "blur(0.8px)",
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        onUpdate: () => {
          if (Math.random() > 0.96) {
            createMorphParticle(".morph-shape-3")
          }
        },
      })

      // Function to create particles from morphing shapes
      const createMorphParticle = (shapeSelector: string) => {
        const shape = document.querySelector(shapeSelector)
        if (shape) {
          const rect = shape.getBoundingClientRect()
          const particle = document.createElement("div")
          particle.className = "morph-particle"
          particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: ${isDark ? "#60a5fa" : "#3b82f6"};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
          `
          document.body.appendChild(particle)

          gsap.to(particle, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            opacity: 0,
            scale: 0,
            duration: 2,
            ease: "power2.out",
            onComplete: () => particle.remove(),
          })
        }
      }
    })

    return () => ctx.revert()
  }, [isDark])
  return null
}
