'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
}

export default function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    'relative font-semibold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 overflow-hidden group'

  const variants = {
    primary:
      'bg-gradient-to-r from-primary-400 via-accent-500 to-cyan-500 text-white shadow-lg shadow-primary-400/20 hover:shadow-primary-400/30 hover:shadow-xl',
    secondary:
      'glass-effect text-secondary-100 hover:bg-white/5 border border-white/10',
    outline:
      'border border-primary-400/40 text-primary-400 hover:bg-primary-400/10 hover:border-primary-400/60',
    ghost: 'text-secondary-300 hover:text-primary-400 hover:bg-white/5',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  }`

  const shimmer = variant === 'primary' && (
    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClass}
        whileHover={{ scale: disabled ? 1 : 1.03, y: disabled ? 0 : -2 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        target={href.startsWith('#') ? undefined : '_blank'}
        rel={href.startsWith('#') ? undefined : 'noopener noreferrer'}
      >
        {shimmer}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.a>
    )
  }

  return (
    <motion.button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      {shimmer}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}
