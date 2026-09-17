'use client'

import { motion } from 'framer-motion'

interface CurvedDividerProps {
  flip?: boolean
  className?: string
}

export default function CurvedDivider({ flip = false, className = '' }: CurvedDividerProps) {
  return (
    <div className={`relative w-full overflow-hidden ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-12 md:h-16"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d="M0 40 Q360 0 720 40 T1440 40 V80 H0 Z"
          fill="url(#curveGradient)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
        <defs>
          <linearGradient id="curveGradient" x1="0" y1="0" x2="1440" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.012)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.025)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.012)" />
          </linearGradient>
        </defs>
      </svg>
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-rule to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      />
    </div>
  )
}
