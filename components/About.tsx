'use client'

import { motion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import Timeline, { type TimelineItem } from './ui/Timeline'
import SectionAmbient from './ui/SectionAmbient'
import { FiCode, FiBriefcase, FiHeart, FiTarget } from 'react-icons/fi'
import { staggerContainer, fadeUp } from '@/lib/motion'

const personalData = [
  { icon: FiHeart, label: 'Anime Enthusiast', desc: 'Love exploring Japanese animation and storytelling' },
  { icon: FiTarget, label: 'Chess Learner', desc: 'Passionate about strategic thinking and problem-solving' },
  { icon: FiCode, label: 'Tech Lover', desc: 'Interested in AI, system design, and emerging technologies' },
  { icon: FiBriefcase, label: 'Builder', desc: 'Enjoy creating useful applications and solutions' },
]

const professionalData = [
  {
    title: '2.8 Years Experience',
    desc: 'Power BI Developer at HCLTech, Chennai — Graduate Engineer Trainee since Dec 2023, Software Engineer since Jan 2025',
  },
  {
    title: 'Core Skills',
    desc: 'Power BI Desktop/Service, DAX, Power Query (M), SQL/T-SQL, SSMS, Snowflake, Tabular Editor, Power Automate, Python',
  },
  {
    title: 'Specialization',
    desc: 'Paginated Reports (SSRS/Report Builder), semantic modeling, Row-Level Security, performance tuning and DAX optimization',
  },
  {
    title: 'Focus Areas',
    desc: 'Legacy-to-cloud migration (SQL Server to Snowflake) with zero disruption, data governance, RCA and reporting automation',
  },
]

/* SnowPro Core and AWS CCP carry expiry dates; the Microsoft credential carries
 * its issue date and does not expire. Ordered soonest-expiring first. */
const certifications = [
  { name: 'Snowflake SnowPro Core', date: 'Jan 2027', dateLabel: 'Valid through' },
  { name: 'AWS Certified Cloud Practitioner', date: 'Jun 2027', dateLabel: 'Valid through' },
  { name: 'Microsoft Certified: Azure Fundamentals', date: 'Dec 2024', dateLabel: 'Issued' },
]

/* `period` stays the human label; `start`/`end` (YYYY-MM) drive the Gantt bars
 * so the roadmap is positioned on a real time axis rather than by eye. */
const journeyItems: TimelineItem[] = [
  {
    period: 'Aug 2019 – May 2023',
    title: 'B.Tech, Electronics & Communication Engineering',
    subtitle: 'Narasaraopeta Engineering College, Andhra Pradesh',
    type: 'education',
    start: '2019-08',
    end: '2023-05',
  },
  {
    period: 'Dec 2023',
    title: 'Joined HCLTech as Graduate Engineer Trainee',
    subtitle: 'Chennai, India',
    type: 'milestone',
    highlight: true,
    start: '2023-12',
  },
  {
    period: 'Dec 2023 – Dec 2024',
    title: 'Graduate Engineer Trainee',
    subtitle: 'HCLTech, Chennai',
    description:
      'Migrated legacy SSMS and Excel-based reports to Power BI, Snowflake and semantic models, and optimized SQL with views, CTEs and stored procedures.',
    type: 'work',
    start: '2023-12',
    end: '2024-12',
  },
  {
    period: 'Feb 2024 – Jun 2024',
    title: 'SOP Document Workflow Platform',
    description:
      'Built a dynamic Power Platform solution for managing SOP document processes across multiple roles — requests, reviews, approvals and conditional feedback loops — with Power Apps as the interface, SharePoint for data management and Power Automate for process automation.',
    type: 'work',
    start: '2024-02',
    end: '2024-06',
  },
  {
    period: 'Aug 2024 – Nov 2024',
    title: 'COBOL to Python Migration',
    description:
      'Contributed to migrating a legacy COBOL system to Python, resolving tool-generated code defects and building automated validation to ensure data integrity.',
    type: 'work',
    start: '2024-08',
    end: '2024-11',
  },
  {
    period: 'Dec 2024',
    title: 'Microsoft Certified: Azure Fundamentals',
    type: 'milestone',
    start: '2024-12',
  },
  {
    period: 'Jan 2025',
    title: 'Promoted to Software Engineer',
    subtitle: 'HCLTech, Chennai',
    type: 'promotion',
    highlight: true,
    start: '2025-01',
  },
  {
    period: 'Jan 2025 – Present',
    title: 'Software Engineer',
    subtitle: 'HCLTech, Chennai',
    description:
      'Owning end-to-end Power BI delivery: dashboards with dynamic parameters and RLS, data governance fixes in production paginated reports, and RCA across the semantic model, SSMS, Snowflake and Sigma layers.',
    type: 'work',
    highlight: true,
    start: '2025-01',
    end: 'present',
  },
  {
    period: 'Mar 2025 – Jul 2025',
    title: 'Paginated Report Modernization',
    description:
      'Migrated legacy SSRS/paginated reports from SQL Server to Snowflake and a centralized semantic model in Tabular Editor, preserving full functional parity with zero disruption.',
    type: 'work',
    start: '2025-03',
    end: '2025-07',
  },
  {
    period: 'Aug 2025 – Dec 2025',
    title: 'Performance & DAX Optimization',
    description:
      'Cut dashboard visual load times by up to 95% through query-level coarse-grained filtering and DAX optimization of boolean flag measures.',
    type: 'work',
    start: '2025-08',
    end: '2025-12',
  },
  {
    period: 'Currently Exploring',
    title: 'Growing Horizons',
    description: 'Data Engineering • Python Automations • AI',
    type: 'exploration',
  },
]

/** Renders numeric tokens in mono + accent — the "data person" typographic tell. */
function Figures({ text }: { text: string }) {
  const parts = text.split(/(\d+(?:\.\d+)?\+?)/g)
  return (
    <>
      {parts.map((part, i) =>
        /^\d/.test(part) ? (
          <span key={i} className="font-mono font-medium text-signal">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}

function ColumnHeader({ label, count }: { label: string; count: number }) {
  return (
    <div className="mb-1 flex items-baseline justify-between gap-4 border-b border-rule pb-3">
      <h3 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-fg">
        {label}
      </h3>
      <span className="meta">
        {String(count).padStart(2, '0')} entries
      </span>
    </div>
  )
}

export default function About() {
  return (
    <SectionAmbient id="about" variant="about">
      <SectionHeading
        index="02"
        label="About"
        title="About Me"
        subtitle="Know more about who I am and the journey that shaped me"
        centered={false}
      />

      {/* Spec sheet — asymmetric 7/5, hairline rows, no cards */}
      <motion.div
        className="grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-16"
        variants={staggerContainer(0.07, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <motion.div variants={fadeUp} className="lg:col-span-7">
          <ColumnHeader label="Professional" count={professionalData.length} />
          <dl>
            {professionalData.map((item, idx) => (
              <div
                key={item.title}
                className="group grid grid-cols-[2.25rem_1fr] gap-x-2 border-b border-rule py-5 transition-colors duration-300 hover:border-mute"
              >
                <dt className="meta pt-[0.3rem] leading-none">
                  {String(idx + 1).padStart(2, '0')}
                </dt>
                <div>
                  <dd className="font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-fg">
                    <Figures text={item.title} />
                  </dd>
                  <dd className="mt-1.5 text-sm leading-relaxed text-dim">
                    {item.desc}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div variants={fadeUp} className="lg:col-span-5">
          <ColumnHeader label="Personal" count={personalData.length} />
          <ul>
            {personalData.map((item) => {
              const Icon = item.icon
              return (
                <li
                  key={item.label}
                  className="grid grid-cols-[1.5rem_1fr] gap-x-3 border-b border-rule py-5 transition-colors duration-300 hover:border-mute"
                >
                  <Icon className="mt-[0.2rem] text-base text-mute" aria-hidden />
                  <div>
                    <p className="font-display text-base font-semibold leading-snug text-fg">
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-dim">
                      {item.desc}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </motion.div>
      </motion.div>

      {/* Certifications — three real credentials, dates in mono */}
      <motion.div
        className="mt-16 border border-rule bg-panel md:mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-2.5">
          <span className="meta text-dim">Certifications</span>
          <span className="meta">
            {String(certifications.length).padStart(2, '0')} held
          </span>
        </div>
        <ul className="grid grid-cols-1 divide-y divide-rule md:grid-cols-3 md:divide-y-0 md:divide-x">
          {certifications.map((cert) => (
            <li key={cert.name} className="flex px-5 py-5">
              <div className="flex w-full items-start gap-3">
                <span aria-hidden className="mt-[0.4rem] block h-2 w-2 shrink-0 rotate-45 bg-signal" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="flex-1 font-display text-sm font-semibold leading-snug text-fg">
                    {cert.name}
                  </p>
                  <p className="mt-2.5 flex items-baseline gap-2">
                    <span className="meta">{cert.dateLabel}</span>
                    <span className="font-mono text-xs text-dim">{cert.date}</span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Journey — the timeline, now on a real time axis */}
      <div className="mt-24 md:mt-32">
        <SectionHeading
          index="02.1"
          label="Timeline"
          title="Journey So Far"
          subtitle="A story of growth, increasing ownership, and expanding expertise"
          centered={false}
        />
        <Timeline items={journeyItems} />
      </div>
    </SectionAmbient>
  )
}
