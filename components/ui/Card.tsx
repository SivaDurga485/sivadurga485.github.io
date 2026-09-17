'use client'

import { ReactNode, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
  tilt?: boolean
  glowOnHover?: boolean
}

export default function Card({
  children,
  className = '',
  delay = 0,
  hover = true,
  tilt = false,
  glowOnHover = true,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    rotateX.set((e.clientY - centerY) / 20)
    rotateY.set((centerX - e.clientX) / 20)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.18)] ${
        glowOnHover ? 'hover-glow' : ''
      } ${className}`}
      style={tilt ? { rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 1000 } : undefined}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={hover ? { y: -6, transition: { duration: 0.3 } } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
