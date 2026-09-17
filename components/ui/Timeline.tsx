'use client'

import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export interface TimelineItem {
  period: string
  title: string
  description?: string
  subtitle?: string
  type?: 'education' | 'work' | 'milestone' | 'promotion' | 'exploration'
  highlight?: boolean
  /** `YYYY-MM`. Drives the Gantt bar; omit for undated entries. */
  start?: string
  /** `YYYY-MM`, or `'present'`. Defaults to `start` (a point-in-time event). */
  end?: string
}

interface TimelineProps {
  items: TimelineItem[]
}

/* --- Shared time axis -------------------------------------------------------
 * Every Gantt bar is positioned against this one window, so a bar sitting
 * further right genuinely means "later". Extend WINDOW_END as time passes.
 * -------------------------------------------------------------------------- */
const WINDOW_START = '2019-08'
const WINDOW_END = '2026-09'

const toMonths = (value: string) => {
  const [year, month] = value.split('-').map(Number)
  return year * 12 + (month - 1)
}

const AXIS_START = toMonths(WINDOW_START)
const AXIS_SPAN = toMonths(WINDOW_END) - AXIS_START

const AXIS_YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026]
const AXIS_TICKS = AXIS_YEARS.map((year) => ({
  year,
  offset: (toMonths(`${year}-01`) - AXIS_START) / AXIS_SPAN,
})).filter((tick) => tick.offset > 0 && tick.offset < 1)

type MarkerSpec = {
  shape: 'square' | 'square-hollow' | 'diamond' | 'diamond-hollow' | 'circle-hollow'
  label: string
}

const MARKERS: Record<NonNullable<TimelineItem['type']>, MarkerSpec> = {
  education: { shape: 'square-hollow', label: 'Education' },
  work: { shape: 'square', label: 'Work' },
  milestone: { shape: 'diamond-hollow', label: 'Milestone' },
  promotion: { shape: 'diamond', label: 'Promotion' },
  exploration: { shape: 'circle-hollow', label: 'Exploring' },
}

/** Shape carries the type; colour is reserved for highlighted entries only. */
function Marker({
  shape,
  accent,
  className = '',
}: {
  shape: MarkerSpec['shape']
  accent?: boolean
  className?: string
}) {
  const tone = accent ? 'border-signal bg-signal' : 'border-mute bg-mute'
  const hollow = accent ? 'border-signal' : 'border-mute'

  const base = 'block h-2.5 w-2.5 shrink-0 border'

  const byShape: Record<MarkerSpec['shape'], string> = {
    square: `${base} ${tone}`,
    'square-hollow': `${base} ${hollow} bg-transparent`,
    diamond: `${base} rotate-45 ${tone}`,
    'diamond-hollow': `${base} rotate-45 ${hollow} bg-transparent`,
    'circle-hollow': `${base} rounded-full border-dashed ${hollow} bg-transparent`,
  }

  return <span aria-hidden className={`${byShape[shape]} ${className}`} />
}

function Legend() {
  return (
    <div className="mb-10 border border-rule bg-panel md:mb-14">
      <div className="flex items-center justify-between gap-4 border-b border-rule px-4 py-2.5">
        <span className="meta text-dim">Timeline · Axis</span>
        <span className="meta">
          {WINDOW_START.slice(0, 4)} → {WINDOW_END.slice(0, 4)}
        </span>
      </div>
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5 px-4 py-3">
        {(Object.keys(MARKERS) as Array<keyof typeof MARKERS>).map((key) => (
          <li key={key} className="flex items-center gap-2">
            <Marker shape={MARKERS[key].shape} />
            <span className="meta">{MARKERS[key].label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Proportional duration bar — the Gantt row inside each entry. */
function GanttBar({ item, active }: { item: TimelineItem; active: boolean }) {
  const prefersReducedMotion = useReducedMotion()
  if (!item.start) return null

  const startMonth = toMonths(item.start)
  const endMonth = toMonths(
    item.end === 'present' ? WINDOW_END : item.end ?? item.start
  )

  const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1)
  // Clamped so an entry dated past WINDOW_END can never render outside the
  // track — extend WINDOW_END as time passes rather than relying on this.
  const offset = clamp01((startMonth - AXIS_START) / AXIS_SPAN)
  const width = Math.min(
    Math.max((endMonth - startMonth) / AXIS_SPAN, 0.014),
    1 - offset
  )
  const months = endMonth - startMonth + 1
  const isPoint = endMonth === startMonth
  const accent = Boolean(item.highlight)

  return (
    <div className="mt-4">
      <div className="relative h-1.5 w-full bg-tile" role="presentation">
        {AXIS_TICKS.map((tick) => (
          <span
            key={tick.year}
            aria-hidden
            className="absolute inset-y-0 w-px bg-ink/70"
            style={{ left: `${tick.offset * 100}%` }}
          />
        ))}
        <motion.span
          aria-hidden
          className={`absolute inset-y-0 origin-left ${
            accent ? 'bg-signal' : active ? 'bg-dim' : 'bg-mute'
          } transition-colors duration-300`}
          style={{ left: `${offset * 100}%`, width: `${width * 100}%` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="meta">{item.period}</span>
        <span className="meta text-dim">
          {isPoint ? 'point' : `${months} mo`}
        </span>
      </div>
    </div>
  )
}

export default function Timeline({ items }: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // The spine draws itself as you scroll the section — the "roadmap" read.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.8', 'end 0.55'],
  })
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })
  // Scroll-linked, so it tracks the pointer rather than autoplaying — but
  // drop the spring under reduced motion. Both branches are motion values,
  // so the server and client render the same initial transform.
  const progress = prefersReducedMotion ? scrollYProgress : smoothed

  return (
    <div className="mx-auto max-w-5xl">
      <Legend />

      <div ref={trackRef} className="relative">
        {/* Spine — hairline base with a scroll-driven accent fill */}
        <div
          className="absolute bottom-0 left-[7px] top-0 w-px md:left-1/2 md:-translate-x-1/2"
          aria-hidden
        >
          <div className="absolute inset-0 bg-rule" />
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top bg-signal/60"
            style={{ scaleY: progress }}
          />
        </div>

        <ol className="space-y-8 md:space-y-10">
          {items.map((item, idx) => {
            const isActive = activeIndex === idx
            const isEven = idx % 2 === 0
            const type = item.type ?? 'work'
            const accent = Boolean(item.highlight)

            return (
              <motion.li
                key={`${item.title}-${idx}`}
                className={`relative flex flex-col md:flex-row md:items-start ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, margin: '-40px' }}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Entry block — hairline structure, no glass, no rounding */}
                <div
                  className={`w-full pl-8 md:w-[calc(50%-2.25rem)] md:pl-0 ${
                    isEven ? 'md:pr-9' : 'md:pl-9'
                  }`}
                >
                  <div
                    className={`border-l-2 py-1 pl-4 transition-colors duration-300 md:border-l md:py-0 ${
                      accent
                        ? 'border-signal'
                        : isActive
                          ? 'border-mute'
                          : 'border-rule'
                    }`}
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2.5">
                      <Marker shape={MARKERS[type].shape} accent={accent} />
                      <span className="meta text-dim">{MARKERS[type].label}</span>
                      {!item.start && (
                        <span className="meta">· {item.period}</span>
                      )}
                    </div>

                    <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-fg md:text-xl">
                      {item.title}
                    </h3>

                    {item.subtitle && (
                      <p className="mt-1 text-sm text-mute">{item.subtitle}</p>
                    )}

                    {item.description && (
                      <p className="mt-2 text-sm leading-relaxed text-dim">
                        {item.description}
                      </p>
                    )}

                    <GanttBar item={item} active={isActive} />
                  </div>
                </div>

                {/* Spine node */}
                <div className="absolute left-[7px] top-[7px] z-10 -translate-x-1/2 md:left-1/2 md:top-1.5">
                  <span
                    className={`block h-2.5 w-2.5 ring-4 ring-ink transition-colors duration-300 ${
                      accent
                        ? 'bg-signal'
                        : isActive
                          ? 'bg-dim'
                          : 'bg-rule'
                    } ${type === 'promotion' || type === 'milestone' ? 'rotate-45' : ''}`}
                    aria-hidden
                  />
                </div>

                {/* Spacer keeps the alternating layout balanced */}
                <div className="hidden md:block md:w-[calc(50%-2.25rem)]" />
              </motion.li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
