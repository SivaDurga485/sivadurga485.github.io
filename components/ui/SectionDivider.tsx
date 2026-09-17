'use client'

import { motion } from 'framer-motion'

interface SectionDividerProps {
  variant?: 'default' | 'glow' | 'dots'
}

export default function SectionDivider({ variant = 'default' }: SectionDividerProps) {
  if (variant === 'dots') {
    return (
      <div className="flex justify-center items-center gap-2 py-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary-400/40"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="relative py-8 overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-primary-400/30 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
      </div>
      {variant === 'glow' && (
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-px bg-primary-400/60 blur-sm"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
    </div>
  )
}
