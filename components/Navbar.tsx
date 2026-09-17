'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi'

// Filled in once SD Services is deployed. Until then the link is not rendered
// rather than shipped dead — same rule as the project links.
const SD_SERVICES_URL = 'https://TODO-sd-services-url'
const sdServicesReady = !SD_SERVICES_URL.includes('TODO')

const navItems = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navItems.map((item) => item.id)
      const scrollPos = window.scrollY + 100

      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(section)
          break
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled || isOpen
          ? 'border-b border-rule bg-ink/95 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-[4.25rem]">
          <a
            href="#home"
            className="group flex items-baseline gap-2 font-display text-lg font-bold tracking-[-0.02em] text-fg"
          >
            SD
            <span
              aria-hidden
              className="block h-1.5 w-1.5 bg-signal transition-transform duration-200 group-hover:translate-y-[-2px]"
            />
          </a>

          <div className="hidden items-center md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm transition-colors duration-200 ${
                    isActive ? 'text-fg' : 'text-mute hover:text-dim'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-px block h-px bg-signal"
                      layoutId="navIndicator"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </a>
              )
            })}
          </div>

          <div className="hidden items-center gap-6 md:flex">
            {sdServicesReady && (
              <a
                href={SD_SERVICES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm text-dim transition-colors duration-200 hover:text-signal"
              >
                Hire me
                <FiArrowUpRight
                  aria-hidden
                  className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )}
            <a
              href="#contact"
              className="inline-flex min-h-[40px] items-center bg-signal px-5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-[#ffb949]"
            >
              Get In Touch
            </a>
          </div>

          <button
            className="p-2 text-2xl text-fg md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="overflow-hidden border-t border-rule md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="py-2">
                {navItems.map((item, idx) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`flex items-center gap-4 border-b border-rule-soft py-3.5 text-sm transition-colors duration-200 ${
                        activeSection === item.id ? 'text-fg' : 'text-dim hover:text-fg'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span
                        className={`meta ${activeSection === item.id ? 'text-signal' : ''}`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {sdServicesReady && (
                <a
                  href={SD_SERVICES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 py-4 text-sm text-dim"
                  onClick={() => setIsOpen(false)}
                >
                  Hire me <FiArrowUpRight aria-hidden className="text-xs" />
                </a>
              )}

              <a
                href="#contact"
                className="mb-5 mt-3 flex min-h-[48px] w-full items-center justify-center bg-signal px-6 text-sm font-semibold text-ink"
                onClick={() => setIsOpen(false)}
              >
                Get In Touch
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
