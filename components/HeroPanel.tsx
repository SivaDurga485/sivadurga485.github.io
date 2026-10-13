'use client'

import { motion, useReducedMotion } from 'framer-motion'
import AnimatedCounter from './ui/AnimatedCounter'

type Kpi = {
  value: number
  decimals: number
  suffix: string
  label: string
  accent?: boolean
}

/* Every figure here is sourced from the resume:
 * - 3 yrs    : Dec 2023 (HCLTech GET) → present
 * - 03       : SnowPro Core, AWS Cloud Practitioner, Azure Fundamentals
 * - 95%      : "Reduced dashboard visual load times by up to 95%" (~60s → 2-3s) */
const KPIS: Kpi[] = [
  { value: 3, decimals: 0, suffix: '', label: 'Years Experience' },
  { value: 3, decimals: 0, suffix: '', label: 'Certifications' },
  { value: 95, decimals: 0, suffix: '%', label: 'Peak load-time cut', accent: true },
]

/**
 * Skill counts per resume group (see `components/Skills.tsx` — same source).
 * Keep in sync; this chart is informative, not decorative.
 */
const STACK = [
  { label: 'SQL & Cloud', value: 13 },
  { label: 'BI & Analytics', value: 11 },
  { label: 'Power BI', value: 10 },
  { label: 'Modeling', value: 9 },
  { label: 'ETL', value: 7 },
  { label: 'Automation', value: 5 },
]

const STACK_MAX = Math.max(...STACK.map((d) => d.value))
const STACK_TOTAL = STACK.reduce((sum, d) => sum + d.value, 0)

export default function HeroPanel() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="w-full border border-rule bg-panel shadow-panel">
      {/* Panel header — reads as an instrument chrome bar, not a card title */}
      <div className="flex items-center justify-between gap-4 border-b border-rule px-4 py-2.5 sm:px-5">
        <span className="meta text-dim">Profile · Snapshot</span>
        <span className="meta">HCLTech</span>
      </div>

      {/* KPI row — the stat strip that replaced the orbit */}
      <dl className="grid grid-cols-3 divide-x divide-rule">
        {KPIS.map((kpi) => (
          <div
            key={kpi.label}
            className="flex flex-col px-3 py-5 sm:px-5 sm:py-6"
          >
            <dt className="meta mb-2.5 flex-1 leading-tight">{kpi.label}</dt>
            <dd>
              <span
                className={`font-mono text-2xl font-medium leading-none sm:text-3xl lg:text-[2.125rem] ${
                  kpi.accent ? 'text-signal' : 'text-fg'
                }`}
              >
                <AnimatedCounter
                  value={kpi.value}
                  suffix={kpi.suffix}
                  decimals={kpi.decimals}
                />
              </span>
            </dd>
          </div>
        ))}
      </dl>

      {/* Stack composition — a small real bar chart, built from Skills counts */}
      <figure className="border-t border-rule px-4 py-5 sm:px-5 sm:py-6">
        <figcaption className="mb-4 flex items-center justify-between gap-4">
          <span className="meta text-dim">Stack Composition</span>
          <span className="meta">
            n = <span className="text-dim">{STACK_TOTAL}</span>
          </span>
        </figcaption>

        <ul className="space-y-2.5">
          {STACK.map((row, i) => (
            <li
              key={row.label}
              className="grid grid-cols-[minmax(0,6.5rem)_1fr_1.75rem] items-center gap-3"
            >
              <span className="truncate font-mono text-[11px] text-dim">
                {row.label}
              </span>

              <span aria-hidden className="relative h-1.5 w-full bg-tile">
                <motion.span
                  className={`absolute inset-y-0 left-0 w-full origin-left ${
                    i === 0 ? 'bg-signal' : 'bg-mute'
                  }`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: row.value / STACK_MAX }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.9,
                    delay: prefersReducedMotion ? 0 : 0.15 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </span>

              <span className="text-right font-mono text-[11px] text-mute">
                {row.value}
              </span>
            </li>
          ))}
        </ul>
      </figure>
    </div>
  )
}
