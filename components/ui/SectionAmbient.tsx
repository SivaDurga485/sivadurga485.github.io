'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionAmbientProps {
  children: ReactNode
  id?: string
  className?: string
  variant?: 'hero' | 'about' | 'skills' | 'projects' | 'services' | 'contact' | 'default'
}

/**
 * Ambience is now neutral — a faint graph-paper grid and one very low-alpha
 * white bloom, positioned differently per section so the page still has
 * rhythm without any section owning a colour. Colour is reserved for meaning.
 */
const orbPositions: Record<string, string> = {
  about: 'top-1/4 -left-40',
  skills: 'bottom-0 right-1/4',
  projects: 'top-1/3 -right-40',
  services: 'bottom-1/4 left-1/3',
  contact: 'top-0 left-1/2 -translate-x-1/2',
  hero: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  default: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
}

export default function SectionAmbient({
  children,
  id,
  className = '',
  variant = 'default',
}: SectionAmbientProps) {
  const orbPos = orbPositions[variant] ?? orbPositions.default

  return (
    <section id={id} className={`section-padding relative overflow-hidden ${className}`}>
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <motion.div
        className={`pointer-events-none absolute h-96 w-96 rounded-full bg-white/[0.012] blur-[140px] ${orbPos}`}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      {/* Static wrapper — child components handle their own reveal animations */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">{children}</div>
    </section>
  )
}
