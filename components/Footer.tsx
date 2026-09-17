'use client'

import { motion } from 'framer-motion'
import { FiLinkedin, FiMail, FiPhone, FiArrowUp, FiArrowUpRight } from 'react-icons/fi'

// Filled in once SD Services is deployed; hidden while it is a placeholder.
const SD_SERVICES_URL = 'https://TODO-sd-services-url'
const sdServicesReady = !SD_SERVICES_URL.includes('TODO')

/* Sourced from the resume; the GitHub handle is not on it — confirm it. */
const socialLinks = [
  { icon: FiLinkedin, href: 'https://linkedin.com/in/siva-durga-kondapalli', label: 'LinkedIn' },
  { icon: FiMail, href: 'mailto:sivadurgakondapalli@gmail.com', label: 'Email' },
  { icon: FiPhone, href: 'tel:+919177139110', label: 'Phone' },
]

const quickLinks = ['Home', 'About', 'Projects', 'Contact']
const serviceLinks = [
  'Power BI Dashboards',
  'Paginated Reports',
  'SQL & Snowflake Migration',
  'Automation Scripts',
]

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="meta mb-5 border-b border-rule pb-3 text-dim">{children}</h4>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-rule px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="lg:col-span-5">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-fg">
              Sivadurga Kondapalli
              <span aria-hidden className="ml-2 inline-block h-1.5 w-1.5 bg-signal align-middle" />
            </h3>
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-mute">
              Power BI Developer · BI Engineer · HCLTech, Chennai
            </p>
            {sdServicesReady && (
              <a
                href={SD_SERVICES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-1.5 text-sm text-dim transition-colors duration-200 hover:text-signal"
              >
                SD Services — hire me for a project
                <FiArrowUpRight
                  aria-hidden
                  className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )}
          </div>

          <div className="lg:col-span-3">
            <ColumnTitle>Quick Links</ColumnTitle>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="group inline-flex items-center gap-2.5 text-sm text-dim transition-colors duration-200 hover:text-fg"
                  >
                    <span
                      aria-hidden
                      className="block h-px w-0 bg-signal transition-all duration-200 group-hover:w-3"
                    />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <ColumnTitle>Services</ColumnTitle>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service} className="text-sm leading-snug text-mute">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <ColumnTitle>Follow Me</ColumnTitle>
            <ul className="space-y-3">
              {socialLinks.map((link) => {
                const Icon = link.icon
                const isExternal = link.href.startsWith('http')
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center gap-3 text-sm text-dim transition-colors duration-200 hover:text-fg"
                    >
                      <Icon
                        size={15}
                        className="text-mute transition-colors duration-200 group-hover:text-signal"
                        aria-hidden
                      />
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </motion.div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-rule pt-7 md:flex-row">
          <p className="meta text-center md:text-left">
            © {currentYear} Sivadurga Kondapalli · All rights reserved · Built with Next.js &amp; Tailwind CSS
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex h-10 w-10 items-center justify-center border border-rule text-mute transition-colors duration-200 hover:border-signal hover:text-signal"
            aria-label="Back to top"
          >
            <FiArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
