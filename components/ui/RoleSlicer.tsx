'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface RoleSlicerProps {
  roles: string[]
  /** ms each role stays highlighted */
  interval?: number
  className?: string
}

/**
 * Roles rendered as a Power BI-style slicer: every role is always present and
 * readable (nothing is hidden from assistive tech, nothing is typed out one
 * character at a time) — only the *selection* moves. Under reduced-motion the
 * selection simply stays on the first item.
 */
export default function RoleSlicer({
  roles,
  interval = 2600,
  className = '',
}: RoleSlicerProps) {
  const prefersReducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion || roles.length < 2) return
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % roles.length),
      interval
    )
    return () => window.clearInterval(id)
  }, [prefersReducedMotion, roles.length, interval])

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <span className="meta">Roles</span>
        <span className="hairline flex-1" />
      </div>

      <ul className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
        {roles.map((role, i) => {
          const isActive = i === active
          return (
            <li key={role} className="flex items-center gap-2.5">
              <span
                aria-hidden
                className={`h-3.5 w-[2px] shrink-0 transition-colors duration-500 ${
                  isActive ? 'bg-signal' : 'bg-rule'
                }`}
              />
              <span
                className={`font-mono text-[11px] md:text-xs transition-colors duration-500 ${
                  isActive ? 'text-signal' : 'text-mute'
                }`}
              >
                {role}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
