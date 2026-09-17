'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 35 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 35 })

  // Hide the native cursor only while this component is genuinely mounted and
  // active, so a no-JS or touch visitor is never left without a pointer.
  useEffect(() => {
    const root = document.documentElement
    if (isDesktop) root.classList.add('has-custom-cursor')
    else root.classList.remove('has-custom-cursor')
    return () => root.classList.remove('has-custom-cursor')
  }, [isDesktop])

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 768)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [role="button"], input, textarea, select')
      setIsHovering(!!interactive)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('resize', checkDesktop)
    }
  }, [cursorX, cursorY])

  if (!isDesktop) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/70"
          animate={{
            width: isHovering ? 40 : 12,
            height: isHovering ? 40 : 12,
            opacity: isHovering ? 0.8 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: cursorX, y: cursorY }}
      >
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-signal" />
      </motion.div>
    </>
  )
}
