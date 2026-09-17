'use client'

import { motion } from 'framer-motion'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  label?: string
  /** Section number, e.g. "02" — renders as `02 — ABOUT` on the marker rule. */
  index?: string
}

/**
 * The editorial section marker used site-wide: a mono index/label sitting on a
 * hairline rule, then a heavy display title. Hierarchy comes from weight and
 * scale — no gradient text.
 */
export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  label,
  index,
}: SectionHeadingProps) {
  const marker = [index, label].filter(Boolean).join(' — ')

  return (
    <motion.div
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {marker && (
        <div className="mb-7 flex items-center gap-4 md:mb-9">
          {centered && <span className="hairline flex-1" />}
          <span className="meta whitespace-nowrap text-dim">{marker}</span>
          <span className="hairline flex-1" />
        </div>
      )}

      <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-fg">
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed text-dim md:text-lg ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
