'use client'

import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import SectionAmbient from './ui/SectionAmbient'
import {
  FiBarChart,
  FiLayers,
  FiShuffle,
  FiDatabase,
  FiZap,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi'
import { staggerContainer, fadeUp } from '@/lib/motion'

/* --- Core stack --------------------------------------------------------------
 * The 1–5 scale is coarse on purpose — a percentage would imply precision
 * nobody has. Each rating is anchored to something stated on the resume
 * (specialisation, certification, or a measured optimisation), noted inline.
 * Review and adjust: these are the only numbers here that aren't counts.
 * ---------------------------------------------------------------------------- */
const coreStack = [
  { name: 'Power BI', level: 5 }, // Desktop/Service/Premium, RLS, deployment pipelines
  { name: 'DAX', level: 5 }, // DAX optimisation: 12s → 3s, 10s → 4s
  { name: 'SQL / T-SQL', level: 5 }, // Advanced SQL, CTEs, window functions, procs
  { name: 'Paginated Reports', level: 5 }, // SSRS / Report Builder specialisation
  { name: 'Snowflake', level: 4 }, // SnowPro Core certified; SQL Server → Snowflake migration
  { name: 'Power Query (M)', level: 4 },
  { name: 'Semantic Modeling', level: 4 }, // Tabular Editor, star schema, SSAS
  { name: 'Power Automate', level: 4 }, // Scheduled delivery + event-driven refresh flows
  { name: 'Python', level: 4 }, // Dialect conversion, CSV validation, COBOL migration
  { name: 'Azure (ADF)', level: 3 }, // Self-taught ADF; Azure Fundamentals certified
]

/* Groups and their members are transcribed from the resume SKILLS section. */
const groups = [
  {
    title: 'Power BI & Visualization',
    icon: FiBarChart,
    skills: [
      'Power BI Desktop',
      'Power BI Service',
      'Power BI Premium',
      'Dashboards',
      'Reports',
      'Paginated Reports',
      'Report Builder',
      'Row-Level Security (RLS)',
      'Deployment Pipelines',
      'Sigma Report Development',
    ],
  },
  {
    title: 'SQL & Cloud Services',
    icon: FiDatabase,
    skills: [
      'SQL',
      'T-SQL',
      'Advanced SQL',
      'SSMS',
      'SQL Server',
      'Snowflake',
      'Azure (Synapse, Data Factory)',
      'AWS',
      'CTEs',
      'Window Functions',
      'Stored Procedures',
      'Views',
      'Data Profiling',
    ],
  },
  {
    title: 'Data Modeling & Optimization',
    icon: FiLayers,
    skills: [
      'DAX',
      'DAX Optimization',
      'Tabular Editor',
      'Semantic Data Modeling',
      'Dimensional Modeling',
      'Star Schema',
      'SSAS',
      'Query Optimization',
      'Performance Tuning',
    ],
  },
  {
    title: 'Business Intelligence & Analytics',
    icon: FiTrendingUp,
    skills: [
      'Business Intelligence',
      'Data Analytics',
      'Data Governance',
      'KPI Development',
      'Data Storytelling',
      'SSRS Reporting',
      'Root Cause Analysis (RCA)',
      'Data Validation & QA',
      'Legacy System Migration',
      'Cloud Migration',
      'Data Cleansing',
    ],
  },
  {
    title: 'ETL & Data Integration',
    icon: FiShuffle,
    skills: [
      'Power Query (M)',
      'ETL/ELT',
      'Dataflows',
      'SSIS',
      'Data Warehousing',
      'Data Integration',
      'Multi-Source Connectivity',
    ],
  },
  {
    title: 'Automation',
    icon: FiZap,
    skills: ['Power Automate', 'Power Apps', 'SharePoint', 'Python', 'Workflow Automation'],
  },
  {
    title: 'Soft Skills & Methodologies',
    icon: FiUsers,
    skills: [
      'Communication',
      'Stakeholder Collaboration',
      'Problem-Solving',
      'Agile',
      'Documentation',
      'Requirements Analysis',
    ],
  },
]

const MAX_LEVEL = 5
const MAX_COUNT = Math.max(...groups.map((g) => g.skills.length))
const TOTAL_SKILLS = groups.reduce((n, g) => n + g.skills.length, 0)

/** Five squares. Level 5 reads in accent — the only colour in the matrix. */
function DotScale({ level }: { level: number }) {
  const isCore = level === MAX_LEVEL
  return (
    <span
      className="flex shrink-0 items-center gap-[3px]"
      role="img"
      aria-label={`Proficiency ${level} of ${MAX_LEVEL}`}
    >
      {Array.from({ length: MAX_LEVEL }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className={`block h-[5px] w-[5px] transition-colors duration-300 ${
            i < level ? (isCore ? 'bg-signal' : 'bg-mute') : 'bg-rule'
          }`}
        />
      ))}
    </span>
  )
}

function CountBar({ count }: { count: number }) {
  const prefersReducedMotion = useReducedMotion()
  return (
    <span aria-hidden className="mt-3 block h-px w-full bg-rule">
      <motion.span
        className="block h-px origin-left bg-mute"
        style={{ width: `${(count / MAX_COUNT) * 100}%` }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </span>
  )
}

export default function Skills() {
  return (
    <SectionAmbient id="skills" variant="skills">
      <SectionHeading
        index="03"
        label="Expertise"
        title="Skills & Expertise"
        subtitle="A connected ecosystem of tools and technologies I use to deliver impact"
        centered={false}
      />

      {/* One dashboard canvas divided by hairlines — not a grid of floating cards */}
      <motion.div
        className="border border-rule bg-panel"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-2.5">
          <span className="meta text-dim">Skill Matrix</span>
          <span className="meta">
            {String(groups.length).padStart(2, '0')} groups ·{' '}
            <span className="text-dim">{TOTAL_SKILLS}</span> skills
          </span>
        </div>

        {/* Core stack — the only region carrying a proficiency rating */}
        <div className="border-b border-rule p-5 sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="meta">00</span>
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-fg">
                Core Stack
              </h3>
            </div>
            <span className="meta">Proficiency 1–5</span>
          </div>

          <motion.ul
            className="grid grid-cols-1 gap-x-12 md:grid-cols-2"
            variants={staggerContainer(0.03, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {coreStack.map((skill) => (
              <motion.li
                key={skill.name}
                variants={fadeUp}
                className="group flex items-center justify-between gap-6 border-b border-rule-soft py-2.5"
              >
                <span className="truncate text-sm text-dim transition-colors duration-200 group-hover:text-fg">
                  {skill.name}
                </span>
                <DotScale level={skill.level} />
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Full matrix — counts are facts, so these regions carry no ratings */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2"
          variants={staggerContainer(0.05, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {groups.map((group, idx) => {
            const Icon = group.icon
            return (
              <motion.div
                key={group.title}
                variants={fadeUp}
                className={`border-b border-rule p-5 last:border-b-0 sm:p-7 ${
                  idx === groups.length - 1 && groups.length % 2 === 1
                    ? 'lg:col-span-2'
                    : 'lg:odd:border-r'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="meta">{String(idx + 1).padStart(2, '0')}</span>
                    <Icon className="shrink-0 text-sm text-mute" aria-hidden />
                    <h3 className="truncate font-display text-sm font-semibold uppercase tracking-[0.12em] text-fg">
                      {group.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-dim">
                    {String(group.skills.length).padStart(2, '0')}
                  </span>
                </div>

                <CountBar count={group.skills.length} />

                <p className="mt-4 font-mono text-[11px] leading-[1.9] text-mute">
                  {group.skills.join('\u00a0\u00a0·\u00a0\u00a0')}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Footer bar keeps the original closing line, minus the glass pill */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-rule px-5 py-3">
          <span className="meta text-dim">Converging into end-to-end BI delivery</span>
          <span className="flex items-center gap-2.5">
            <span className="meta">Core</span>
            <DotScale level={5} />
          </span>
        </div>
      </motion.div>
    </SectionAmbient>
  )
}
