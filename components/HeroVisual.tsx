'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ORBIT_TECH = ['Power BI', 'DAX', 'SQL', 'Python', 'Automate', 'AI', 'Snowflake']

const FLOATING_PARTICLES = [
  { size: 4, top: '18%', left: '14%', delay: 0 },
  { size: 3, top: '12%', left: '82%', delay: 0.6 },
  { size: 5, top: '78%', left: '86%', delay: 1.2 },
  { size: 3, top: '84%', left: '12%', delay: 1.8 },
]

function OrbitLabel({ label, angle }: { label: string; angle: number }) {
  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        width: 0,
        height: 0,
        transform: `rotate(${angle}deg) translateY(calc(-1 * min(9.25rem, 38vw)))`,
      }}
    >
      <motion.div
        className="flex items-center justify-center"
        animate={{ rotate: [-angle, -angle - 360] }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
      >
        <span className="font-mono text-[10px] md:text-[11px] px-2.5 py-1 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-secondary-300 whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
          {label}
        </span>
      </motion.div>
    </div>
  )
}

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[min(100%,22rem)] sm:max-w-[26rem] md:max-w-[28rem] mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Square stage — everything centered inside */}
      <div className="relative w-full aspect-square">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Ambient glow — centered */}
          <div className="absolute inset-[5%] rounded-full bg-gradient-to-br from-primary-400/10 via-accent-500/5 to-cyan-500/8 blur-3xl" />

          {/* Ring 1 — outer */}
          <motion.div
            className="absolute inset-[6%] rounded-full border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary-400/70" />
          </motion.div>

          {/* Ring 2 — dashed middle */}
          <motion.div
            className="absolute inset-[18%] rounded-full border border-dashed border-white/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          />

          {/* Ring 3 — inner */}
          <motion.div
            className="absolute inset-[30%] rounded-full border border-white/5"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          />

          {/* Orbiting technologies — rotate as a group */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
          >
            {ORBIT_TECH.map((label, i) => (
              <OrbitLabel
                key={label}
                label={label}
                angle={(360 / ORBIT_TECH.length) * i}
              />
            ))}
          </motion.div>

          {/* Core */}
          <div className="absolute inset-[34%] rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400/8 via-transparent to-accent-500/8" />

            <motion.div
              className="relative z-10 w-[72%] h-[72%] rounded-full p-[2px] bg-gradient-to-br from-primary-400/70 via-accent-500/60 to-cyan-500/70"
              animate={{
                boxShadow: [
                  '0 8px 32px rgba(0,0,0,0.25)',
                  '0 8px 40px rgba(56,189,248,0.12)',
                  '0 8px 32px rgba(0,0,0,0.25)',
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-full bg-surface-950/95 flex items-center justify-center border border-white/10">
                <span className="text-3xl sm:text-4xl md:text-5xl font-display font-bold name-gradient">
                  SD
                </span>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.04] to-transparent h-1/4 pointer-events-none"
              animate={{ y: ['-100%', '400%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Floating particles — symmetric placement */}
          {FLOATING_PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary-400/25"
              style={{ width: p.size, height: p.size, top: p.top, left: p.left }}
              animate={{ y: [0, -8, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: p.delay }}
            />
          ))}
        </motion.div>
      </div>

      {/* Caption — below orbit, centered */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <p className="font-display text-sm font-semibold text-secondary-200">Data Enthusiast</p>
        <p className="text-xs text-secondary-400 mt-1">Anime · Chess · AI · System Design</p>
      </motion.div>
    </div>
  )
}
