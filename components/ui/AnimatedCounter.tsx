'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
  duration?: number
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()
  // Always start at 0 so server and client render identically; the effect
  // below snaps straight to the real figure when motion is reduced.
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(value)
      return
    }
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * value)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, value, duration, prefersReducedMotion])

  return (
    <motion.span ref={ref} className={`tnum ${className}`}>
      {prefix}
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </motion.span>
  )
}
