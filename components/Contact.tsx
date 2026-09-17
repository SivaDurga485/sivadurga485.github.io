'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionAmbient from './ui/SectionAmbient'
import SectionHeading from './ui/SectionHeading'
import { FiMail, FiLinkedin, FiPhone, FiMapPin, FiSend, FiArrowUpRight } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

type SubmitStatus = 'idle' | 'success' | 'mailto' | 'error'

const CONTACT_EMAIL = 'sivadurgakondapalli@gmail.com'

/* Dual path, same as the SD Services form: post to Web3Forms when a key is
 * configured, otherwise hand off to the visitor's mail client. Neither path
 * ever reports success for something that did not happen. */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

function buildMailto(data: ContactFormData) {
  const subject = encodeURIComponent(`Portfolio enquiry from ${data.name}`)
  const body = encodeURIComponent(
    `${data.message}\n\n—\n${data.name}\n${data.email}`
  )
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
}

/* Sourced from the resume. GitHub is the one handle the resume does not
 * list — confirm it before deploying. */
const contactLinks = [
  {
    icon: FiMail,
    label: 'Email',
    href: 'mailto:sivadurgakondapalli@gmail.com',
    value: 'sivadurgakondapalli@gmail.com',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/siva-durga-kondapalli',
    value: 'linkedin.com/in/siva-durga-kondapalli',
  },
  {
    icon: FiPhone,
    label: 'Phone',
    href: 'tel:+919177139110',
    value: '+91 91771 39110',
  },
  {
    icon: FiMapPin,
    label: 'Location',
    href: 'https://www.google.com/maps/search/Kurichedu,+Andhra+Pradesh,+India',
    value: 'Kurichedu, Andhra Pradesh, India',
  },
]

const fieldClass =
  'w-full border border-rule bg-tile px-4 py-3 text-sm text-fg outline-none transition-colors duration-200 placeholder:text-mute focus:border-signal'

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="meta mb-2.5 block">
      {children}
    </label>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-2 font-mono text-[11px] text-danger">
      {message}
    </p>
  )
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('idle')

    // No form backend configured — open the visitor's mail client instead of
    // pretending the message was delivered.
    if (!WEB3FORMS_KEY) {
      window.location.href = buildMailto(data)
      setSubmitStatus('mailto')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio enquiry from ${data.name}`,
          from_name: data.name,
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      })
      const json = await res.json()

      if (res.ok && json?.success) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SectionAmbient id="contact" variant="contact">
      <SectionHeading
        index="06"
        label="Contact"
        title="Get In Touch"
        subtitle="Let's start a conversation about your next project"
        centered={false}
      />

      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-16">
        {/* --------------------------------------------------------- form */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="mb-7 flex items-baseline justify-between gap-4 border-b border-rule pb-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-fg">
              Send me a message
            </h3>
            <span className="meta">03 fields</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="contact-name">Name</FieldLabel>
                <input
                  {...register('name')}
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={fieldClass}
                />
                <FieldError id="contact-name-error" message={errors.name?.message} />
              </div>

              <div>
                <FieldLabel htmlFor="contact-email">Email</FieldLabel>
                <input
                  {...register('email')}
                  id="contact-email"
                  type="email"
                  placeholder="you@company.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={fieldClass}
                />
                <FieldError id="contact-email-error" message={errors.email?.message} />
              </div>
            </div>

            <div className="mt-6">
              <FieldLabel htmlFor="contact-message">Message</FieldLabel>
              <textarea
                {...register('message')}
                id="contact-message"
                placeholder="Tell me about your project..."
                rows={6}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={`${fieldClass} resize-none`}
              />
              <FieldError id="contact-message-error" message={errors.message?.message} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-7 inline-flex min-h-[48px] items-center gap-2.5 bg-signal px-7 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-[#ffb949] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Sending…' : 'Send Message'}
              <FiSend
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>

            <div aria-live="polite">
              {submitStatus === 'success' && (
                <motion.p
                  className="mt-6 border-l-2 border-signal py-1 pl-4 text-sm text-dim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Message sent — I&apos;ll get back to you soon.
                </motion.p>
              )}
              {submitStatus === 'mailto' && (
                <motion.p
                  className="mt-6 border-l-2 border-signal py-1 pl-4 text-sm text-dim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Opening your email app with the message ready to send. If nothing
                  happened, write to{' '}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-mono text-[13px] text-signal underline underline-offset-4"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  className="mt-6 border-l-2 border-danger py-1 pl-4 text-sm text-dim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  That didn&apos;t send. Please try again, or{' '}
                  <a
                    href={buildMailto(getValues())}
                    className="text-signal underline underline-offset-4"
                  >
                    send it by email instead
                  </a>
                  .
                </motion.p>
              )}
            </div>
          </form>
        </motion.div>

        {/* ------------------------------------------------------ channels */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="mb-1 flex items-baseline justify-between gap-4 border-b border-rule pb-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-fg">
              Contact Info
            </h3>
            <span className="meta">
              {String(contactLinks.length).padStart(2, '0')} channels
            </span>
          </div>

          <ul>
            {contactLinks.map((link) => {
              const Icon = link.icon
              const isExternal = link.href.startsWith('http')
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="group grid grid-cols-[1.25rem_1fr_auto] items-center gap-x-4 border-b border-rule py-4 transition-colors duration-200 hover:border-mute"
                  >
                    <Icon
                      className="text-base text-mute transition-colors duration-200 group-hover:text-signal"
                      aria-hidden
                    />
                    <span className="min-w-0">
                      <span className="meta block">{link.label}</span>
                      <span className="mt-1 block truncate font-mono text-[13px] text-dim transition-colors duration-200 group-hover:text-fg">
                        {link.value}
                      </span>
                    </span>
                    <FiArrowUpRight
                      aria-hidden
                      className="text-mute opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Replaced the waving-emoji card with a plain closing note */}
          <p className="mt-8 border-l-2 border-rule py-1 pl-4 text-sm leading-relaxed text-dim">
            Don&apos;t see what you&apos;re looking for? Let&apos;s discuss your needs!
          </p>
        </motion.div>
      </div>
    </SectionAmbient>
  )
}
