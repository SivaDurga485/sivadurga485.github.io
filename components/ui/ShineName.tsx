'use client'

import { motion } from 'framer-motion'

interface ShineNameProps {
  line1?: string
  line2?: string
  className?: string
}

export default function ShineName({
  line1 = 'Siva',
  line2 = 'Durga',
  className = '',
}: ShineNameProps) {
  return (
    <h1
      className={`font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.08] tracking-tight ${className}`}
    >
      <span className="relative inline-block name-gradient name-shine">
        {line1}
      </span>
      <br />
      <span className="relative inline-block text-secondary-100 name-shine name-shine-delay">
        {line2}
      </span>
    </h1>
  )
}
