import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// GSAP utility functions
export const gsapUtils = {
  // Easing functions
  easing: {
    smooth: "power2.out",
    bounce: "back.out(1.7)",
    elastic: "elastic.out(1, 0.3)",
    expo: "expo.out",
  },

  // Common animation durations
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
    verySlow: 2.0,
  },

  // Stagger configurations
  stagger: {
    fast: 0.1,
    normal: 0.15,
    slow: 0.3,
  },
}

// Theme utilities
export const themeUtils = {
  getThemeColors: (isDark: boolean) => ({
    primary: isDark ? "#60a5fa" : "#3b82f6",
    secondary: isDark ? "#a78bfa" : "#8b5cf6",
    accent: isDark ? "#34d399" : "#10b981",
    background: isDark ? "#0f172a" : "#ffffff",
    foreground: isDark ? "#e2e8f0" : "#1f2937",
    muted: isDark ? "#475569" : "#6b7280",
  }),

  getGradient: (isDark: boolean) =>
    isDark
      ? "linear-gradient(135deg, #60a5fa, #a78bfa, #34d399)"
      : "linear-gradient(135deg, #3b82f6, #8b5cf6, #10b981)",
}

// Performance utilities
export const perfUtils = {
  // Debounce function for scroll events
  debounce: (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  // Throttle function for resize events
  throttle: (func: Function, limit: number) => {
    let inThrottle: boolean
    return function executedFunction(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },

  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  },
}

// Animation utilities
export const animUtils = {
  // Create staggered animation config
  createStagger: (amount = 0.15, from = "start") => ({
    amount,
    from,
  }),

  // Create fade in animation
  fadeIn: (delay = 0) => ({
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay,
    ease: "power2.out",
  }),

  // Create slide in animation
  slideIn: (direction: "left" | "right" | "up" | "down" = "up", delay = 0) => {
    const directions = {
      left: { x: -50, y: 0 },
      right: { x: 50, y: 0 },
      up: { x: 0, y: 50 },
      down: { x: 0, y: -50 },
    }

    return {
      ...directions[direction],
      opacity: 0,
      duration: 0.8,
      delay,
      ease: "power2.out",
    }
  },

  // Create scale animation
  scaleIn: (delay = 0) => ({
    scale: 0,
    opacity: 0,
    duration: 0.6,
    delay,
    ease: "back.out(1.7)",
  }),
}
// Types for gsapUtils
export interface GsapUtilsType {
  easing: GsapEasing
  duration: GsapDuration
  stagger: GsapStagger
}
export interface GsapEasing {
  smooth: string
  bounce: string
  elastic: string
  expo: string
}

export interface GsapDuration {
  fast: number
  normal: number
  slow: number
  verySlow: number
}

export interface GsapStagger {
  fast: number
  normal: number
  slow: number
}

export interface GsapUtils {
  easing: GsapEasing
  duration: GsapDuration
  stagger: GsapStagger
}

// Types for themeUtils
export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
}

export interface ThemeUtils {
  getThemeColors: (isDark: boolean) => ThemeColors
  getGradient: (isDark: boolean) => string
}

// Types for perfUtils
export interface PerfUtils {
  debounce: <T extends (...args: any[]) => void>(func: T, wait: number) => (...args: Parameters<T>) => void
  throttle: <T extends (...args: any[]) => void>(func: T, limit: number) => (...args: Parameters<T>) => void
  prefersReducedMotion: () => boolean
}

// Types for animUtils
export interface StaggerConfig {
  amount: number
  from: string
}

export interface FadeInConfig {
  opacity: number
  y: number
  duration: number
  delay: number
  ease: string
}

export interface SlideInConfig {
  x: number
  y: number
  opacity: number
  duration: number
  delay: number
  ease: string
}

export interface ScaleInConfig {
  scale: number
  opacity: number
  duration: number
  delay: number
  ease: string
}

export interface AnimUtils {
  createStagger: (amount?: number, from?: string) => StaggerConfig
  fadeIn: (delay?: number) => FadeInConfig
  slideIn: (direction?: "left" | "right" | "up" | "down", delay?: number) => SlideInConfig
  scaleIn: (delay?: number) => ScaleInConfig
}
