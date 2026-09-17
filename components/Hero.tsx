'use client'

import { motion } from 'framer-motion'
import { FiArrowRight, FiDownload } from 'react-icons/fi'
import RoleSlicer from './ui/RoleSlicer'
import HeroPanel from './HeroPanel'
import { staggerContainer, fadeUp } from '@/lib/motion'

/** Served from `public/`. Keep the filename in sync if the PDF is replaced. */
const RESUME_PATH = '/Sivadurga-Kondapalli-Resume.pdf'

const roles = [
  'Power BI Developer',
  'BI Engineer',
  'Data Analyst',
  'Power Automate Developer',
  'Python Automation Enthusiast',
  'AI Explorer',
]

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-28 md:pb-28 md:pt-32"
    >
      {/* Ambient: neutral graph paper only — no coloured blooms. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="grid-bg absolute inset-0 opacity-70" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.08, 0.15)}
          initial="hidden"
          animate="visible"
        >
          {/* Section index rule — the editorial device repeated site-wide */}
          <motion.div
            variants={fadeUp}
            className="mb-10 flex items-center gap-4 border-b border-rule pb-3 md:mb-14"
          >
            <span className="meta text-dim">01 — Home</span>
            <span className="hairline flex-1" />
            <span className="meta flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 shrink-0 bg-signal"
              />
              Available for opportunities
            </span>
          </motion.div>

          {/* Asymmetric 7/5 split — deliberately not a 50/50 card grid */}
          <div className="grid grid-cols-1 items-start gap-y-14 lg:grid-cols-12 lg:gap-x-16">
            {/* ---------------------------------------------- copy */}
            <div className="lg:col-span-7">
              <motion.p variants={fadeUp} className="meta mb-5">
                Hello, I&apos;m
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="font-display font-semibold leading-[0.86] tracking-[-0.035em] text-[clamp(2.5rem,8vw,5.5rem)]"
              >
                <span className="block text-fg">Sivadurga</span>
                <span className="block text-mute">
                  Kondapalli
                  <span
                    aria-hidden
                    className="ml-3 inline-block h-[0.14em] w-[0.14em] translate-y-[-0.08em] bg-signal align-middle"
                  />
                </span>
              </motion.h1>

              <motion.div variants={fadeUp}>
                <RoleSlicer roles={roles} className="mt-9 max-w-xl" />
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mt-9 max-w-xl text-base leading-relaxed text-dim md:text-[1.0625rem] md:leading-8"
              >
                Power BI Developer with close to three years across Power BI, DAX,
                Power Query&nbsp;(M), SQL/T-SQL and Snowflake — paginated reports, semantic
                modeling, performance tuning and legacy-to-cloud migration with zero disruption.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="group inline-flex min-h-[48px] items-center gap-2.5 bg-signal px-6 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-[#ffb949]"
                >
                  View Projects
                  <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a
                  href={RESUME_PATH}
                  download
                  className="group inline-flex min-h-[48px] items-center gap-2.5 border border-rule px-6 text-sm font-medium text-dim transition-colors duration-200 hover:border-mute hover:text-fg"
                >
                  Download Resume
                  <FiDownload
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-y-0.5"
                  />
                </a>
              </motion.div>
            </div>

            {/* ---------------------------------------------- instrument */}
            <motion.div variants={fadeUp} className="lg:col-span-5 lg:pt-2">
              <HeroPanel />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue — a rule and a label, not a floating mouse pill */}
      <motion.div
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="meta">Scroll</span>
        <span aria-hidden className="h-10 w-px bg-gradient-to-b from-rule to-transparent" />
      </motion.div>
    </section>
  )
}
