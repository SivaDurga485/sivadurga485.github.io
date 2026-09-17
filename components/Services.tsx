'use client'

import { motion } from 'framer-motion'
import SectionAmbient from './ui/SectionAmbient'
import SectionHeading from './ui/SectionHeading'
import { FiBarChart, FiDatabase, FiZap, FiTrendingUp, FiBriefcase, FiGitBranch, FiArrowRight } from 'react-icons/fi'
import { staggerContainer, fadeUp } from '@/lib/motion'

const services = [
  {
    icon: FiBarChart,
    title: 'Power BI Dashboards',
    description:
      'Custom interactive dashboards tailored to your business needs with real-time data visualization and insights.',
  },
  {
    icon: FiDatabase,
    title: 'Data Analysis',
    description:
      'Deep dive into your data to uncover patterns, trends, and actionable insights that drive business decisions.',
  },
  {
    icon: FiZap,
    title: 'Dashboard Optimization',
    description:
      'Performance tuning and optimization for existing dashboards, reducing load times and improving user experience.',
  },
  {
    icon: FiTrendingUp,
    title: 'SQL Reporting',
    description:
      'Build robust, efficient SQL queries and reports that provide accurate data for strategic planning.',
  },
  {
    icon: FiBriefcase,
    title: 'Automation Scripts',
    description:
      'Develop custom Python scripts to automate repetitive tasks, save time, and improve efficiency.',
  },
  {
    icon: FiGitBranch,
    title: 'BI Solutions',
    description:
      'End-to-end business intelligence solutions from data modeling to dashboard deployment and maintenance.',
  },
]

export default function Services() {
  return (
    <SectionAmbient id="services" variant="services">
      <SectionHeading
        index="05"
        label="Services"
        title="What I Offer"
        subtitle="Comprehensive data solutions tailored to your business needs"
        centered={false}
      />

      {/* A capability register: numbered rows on rules, 4/8 asymmetric split */}
      <motion.ul
        className="border-t border-rule"
        variants={staggerContainer(0.06, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {services.map((service, idx) => {
          const Icon = service.icon
          return (
            <motion.li
              key={service.title}
              variants={fadeUp}
              className="group grid grid-cols-1 gap-x-10 gap-y-3 border-b border-rule px-1 py-6 transition-colors duration-300 hover:bg-panel md:grid-cols-12 md:py-7"
            >
              <div className="flex items-center gap-4 md:col-span-5 md:items-start">
                <span className="meta pt-1 transition-colors duration-300 group-hover:text-signal">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <Icon
                  className="mt-[0.2rem] shrink-0 text-base text-mute transition-colors duration-300 group-hover:text-dim"
                  aria-hidden
                />
                <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-fg md:text-xl">
                  {service.title}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-dim md:col-span-7 md:pt-1 md:text-[0.9375rem]">
                {service.description}
              </p>
            </motion.li>
          )
        })}
      </motion.ul>

      {/* Closing strip — same copy, no glow, no pulse, no gradient */}
      <motion.div
        className="mt-16 border border-rule bg-panel md:mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2.5 border-b border-rule px-5 py-2.5 sm:px-7">
          <span aria-hidden className="block h-1.5 w-1.5 shrink-0 bg-signal" />
          <span className="meta text-dim">Availability</span>
        </div>

        <div className="grid grid-cols-1 items-center gap-y-6 p-5 sm:p-7 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-8">
            <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.015em] text-fg md:text-2xl">
              Available for Freelance &amp; Part-time Opportunities
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-dim md:text-base">
              Let&apos;s collaborate and bring your data vision to life. Get in touch today!
            </p>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end">
            <a
              href="#contact"
              className="group inline-flex min-h-[48px] items-center gap-2.5 bg-signal px-6 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-[#ffb949]"
            >
              Get in touch
              <FiArrowRight
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </motion.div>
    </SectionAmbient>
  )
}
