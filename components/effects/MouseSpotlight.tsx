'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MouseSpotlight() {
  const [isDesktop, setIsDesktop] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 })

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 768)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', checkDesktop)
    }
  }, [mouseX, mouseY])

  if (!isDesktop) return null

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ x: springX, y: springY }}
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.015) 40%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}
