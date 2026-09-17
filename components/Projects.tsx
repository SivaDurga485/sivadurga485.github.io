'use client'

import { motion } from 'framer-motion'
import SectionAmbient from './ui/SectionAmbient'
import SectionHeading from './ui/SectionHeading'
import { staggerContainer, fadeUp } from '@/lib/motion'

type Project = {
  title: string
  description: string
  tech: string[]
  featured?: boolean
  inProgress?: boolean
  /** Pulled from the description copy, never invented.
   *  `fill` (0-1) drives the underbar so it encodes the figure rather than
   *  being a decorative width. */
  metric?: { value: string; label: string; fill?: number }
  /** An ordered sequence rendered as a flow strip rather than prose.
   *  `complete` (when given) marks how many steps are actually done. */
  flow?: { label: string; steps: string[]; complete?: number }
}

const projects: Project[] = [
  {
    title: 'Power BI Performance & DAX Optimization',
    description:
      'Cut dashboard visual load times by up to 95% through query-level coarse-grained filtering — one visual went from ~60s to 2-3s — plus DAX optimization of the boolean flag measures used in visual-level filtering (12s to 3s, 10s to 4s).',
    tech: ['Power BI', 'DAX', 'Query Optimization', 'Performance Tuning'],
    featured: true,
    metric: { value: '95%', label: 'Peak load-time cut', fill: 0.95 },
  },
  {
    title: 'SSRS to Snowflake Paginated Report Migration',
    description:
      'Modernized legacy SSRS/paginated reports by migrating from SQL Server (via SSMS) to Snowflake and a centralized semantic model built in Tabular Editor, preserving full validation and functional parity with zero disruption.',
    tech: ['SSRS', 'Report Builder', 'Snowflake', 'Tabular Editor'],
  },
  {
    title: 'T-SQL to Snowflake Dialect Converter',
    description:
      'Python automation that converts T-SQL to Snowflake SQL, driven by a mapping document and handling table/column renaming and aliasing. Also automates the conversion of SQL-based paginated reports to their Snowflake equivalents.',
    tech: ['Python', 'T-SQL', 'Snowflake', 'Automation'],
  },
  {
    title: 'Excel & CSV Comparison Test Automation',
    description:
      'Automated testing between two Excel/CSV extracts — validating reports field by field and producing an automated comparison report, replacing manual row-by-row checking.',
    tech: ['Python', 'Data Validation', 'Excel', 'Reporting'],
  },
  {
    title: 'Copilot AI Agents',
    description:
      'Built Microsoft Copilot AI agents to reduce manual effort on repetitive work, and shared them with the team so colleagues use them day to day.',
    tech: ['Microsoft Copilot', 'AI Agents', 'Microsoft 365'],
  },
  {
    title: 'Power Automate Reporting Operations',
    description:
      'Scheduled paginated report delivery around native subscription limits caused by dynamic parameters, plus an event-driven flow that triggers semantic model refreshes and notifies stakeholders on completion.',
    tech: ['Power Automate', 'Paginated Reports', 'Power BI Service'],
  },
  {
    title: 'SOP Document Workflow Platform',
    description:
      'A dynamic Power Platform solution for managing SOP document processes, enabling seamless workflow across multiple roles. Power Apps drives the interface, SharePoint handles data management, and Power Automate runs the process automation — including conditional feedback loops that route a document back to the right role instead of failing the request.',
    tech: ['Power Apps', 'SharePoint', 'Power Automate', 'Workflow Automation'],
    flow: { label: 'Workflow', steps: ['Request', 'Review', 'Approve', 'Feedback'] },
  },
  {
    title: 'Blinkit Sales Analysis Dashboard',
    description:
      'Cleaned and transformed data in Power Query (M), then built dynamic filters, KPIs and custom DAX measures for total sales, average order value and customer ratings. Interactive dashboard with cards, charts, slicers, drill-through and Row-Level Security.',
    tech: ['Power BI', 'Power Query (M)', 'DAX', 'RLS'],
  },
  {
    title: 'COVID-19 Data ETL Pipeline',
    description:
      'Self-taught Azure Data Factory and built ETL pipelines with source/sink datasets and data flow transformations over public COVID-19 datasets.',
    tech: ['Azure Data Factory', 'ETL', 'Data Flows'],
  },
  {
    title: 'Banking / Fintech Data Platform',
    description:
      'A full modern data stack for a simulated retail bank: a seeded Python generator produces six related entities as partitioned Parquet, which land in ADLS Gen2 and load into a Snowflake medallion warehouse, then transform through dbt into a star schema for Power BI — orchestrated end to end by Azure Data Factory. Generation runs 20 automated validation checks (referential integrity, PK dedup, anomaly-rate tolerance, no transactions on closed accounts) before anything reaches the lake.',
    tech: ['Python', 'ADLS Gen2', 'Snowflake', 'dbt Core', 'Azure Data Factory', 'Power BI'],
    inProgress: true,
    metric: { value: '20', label: 'Validation checks' },
    flow: {
      label: 'Pipeline',
      steps: ['Generate', 'Bronze', 'Orchestrate', 'Transform', 'Serve', 'Polish'],
      complete: 2,
    },
  },
]

function StatusTag({ project }: { project: Project }) {
  if (project.featured) {
    return (
      <span className="flex shrink-0 items-center gap-2">
        <span aria-hidden className="block h-2 w-2 rotate-45 bg-signal" />
        <span className="meta text-signal">Featured</span>
      </span>
    )
  }
  if (project.inProgress) {
    return (
      <span className="flex shrink-0 items-center gap-2">
        <span
          aria-hidden
          className="block h-2 w-2 rounded-full border border-dashed border-mute"
        />
        <span className="meta">In progress</span>
      </span>
    )
  }
  return null
}

function TechLine({ tech }: { tech: string[] }) {
  return (
    <p className="font-mono text-[11px] leading-relaxed text-mute">
      {tech.join('\u00a0\u00a0·\u00a0\u00a0')}
    </p>
  )
}

/** Ordered flow strip — nodes on a rule, mono labels. Reuses the timeline's
 * marker language so a process reads the same way a roadmap does. When
 * `complete` is given, done steps fill in accent and the rest stay hollow. */
function FlowStrip({ flow }: { flow: NonNullable<Project['flow']> }) {
  const { label, steps, complete } = flow
  const tracked = typeof complete === 'number'

  return (
    <div className="mt-5">
      <span className="meta">
        {label} · {String(steps.length).padStart(2, '0')} steps
        {tracked && (
          <>
            {' '}
            · <span className="text-signal">{String(complete).padStart(2, '0')} done</span>
          </>
        )}
      </span>

      <ol className="mt-3 flex items-start">
        {steps.map((step, i) => {
          const isLast = i === steps.length - 1
          const done = tracked ? i < complete : i === 0
          return (
            <li
              key={step}
              className={`flex min-w-0 flex-col gap-2 ${isLast ? 'flex-none' : 'flex-1'}`}
            >
              <span className="flex items-center" aria-hidden>
                <span
                  className={`block h-1.5 w-1.5 shrink-0 border ${
                    done
                      ? 'border-signal bg-signal'
                      : tracked
                        ? 'border-mute bg-transparent'
                        : 'border-mute bg-mute'
                  }`}
                />
                {!isLast && <span className="h-px flex-1 bg-rule" />}
              </span>
              <span
                className={`truncate font-mono text-[10px] uppercase tracking-[0.12em] ${
                  done && tracked ? 'text-dim' : 'text-mute'
                }`}
              >
                {step}
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/** True for a final cell that would otherwise sit alone in a two-column row. */
const isOrphanRow = (index: number, total: number) =>
  index === total - 1 && total % 2 === 1

export default function Projects() {
  const [featured, ...rest] = projects

  return (
    <SectionAmbient id="projects" variant="projects">
      <SectionHeading
        index="04"
        label="Portfolio"
        title="Featured Projects"
        subtitle="Showcasing my best work and the impact behind each build"
        centered={false}
      />

      {/* Lead project — its own panel, asymmetric 7/5 with the metric pulled out */}
      <motion.article
        className="group border border-rule bg-panel"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-2.5 sm:px-7">
          <span className="meta text-dim">01 — Lead Project</span>
          <StatusTag project={featured} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="p-5 sm:p-7 lg:col-span-8">
            <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-fg md:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-dim">
              {featured.description}
            </p>
            <div className="mt-6">
              <TechLine tech={featured.tech} />
            </div>
          </div>

          {featured.metric && (
            <div className="flex flex-col justify-center border-t border-rule p-5 sm:p-7 lg:col-span-4 lg:border-l lg:border-t-0">
              <span className="meta mb-3">{featured.metric.label}</span>
              <p className="font-mono text-5xl font-medium leading-none text-signal lg:text-6xl">
                {featured.metric.value}
              </p>
              <span aria-hidden className="mt-5 block h-px w-full bg-rule">
                <span
                  className="block h-px bg-signal"
                  style={{ width: `${(featured.metric.fill ?? 1) * 100}%` }}
                />
              </span>
            </div>
          )}
        </div>
      </motion.article>

      {/* The rest as a hairline register — rows and rules, not floating boxes */}
      <motion.div
        className="mt-px grid grid-cols-1 border-t border-rule lg:grid-cols-2"
        variants={staggerContainer(0.07, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {rest.map((project, idx) => (
          <motion.article
            key={project.title}
            variants={fadeUp}
            className={`group flex flex-col border-b border-rule p-5 transition-colors duration-300 hover:bg-panel sm:p-7 ${
              isOrphanRow(idx, rest.length) ? 'lg:col-span-2' : 'lg:odd:border-r'
            }`}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <span className="meta">{String(idx + 2).padStart(2, '0')}</span>
              <StatusTag project={project} />
            </div>

            <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-fg">
              {project.title}
            </h3>

            <p className="mt-3 flex-grow text-sm leading-relaxed text-dim">
              {project.description}
            </p>

            {project.metric && (
              <p className="mt-5 flex items-baseline gap-2.5">
                <span className="font-mono text-2xl font-medium leading-none text-signal">
                  {project.metric.value}
                </span>
                <span className="meta">{project.metric.label}</span>
              </p>
            )}

            {project.flow && <FlowStrip flow={project.flow} />}

            <div className="mt-5">
              <TechLine tech={project.tech} />
            </div>

          </motion.article>
        ))}
      </motion.div>
    </SectionAmbient>
  )
}
