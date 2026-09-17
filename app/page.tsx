'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import AnimatedBackground from '@/components/effects/AnimatedBackground'
import MouseSpotlight from '@/components/effects/MouseSpotlight'
import CustomCursor from '@/components/effects/CustomCursor'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-ink text-fg">
      <AnimatedBackground />
      <MouseSpotlight />
      <CustomCursor />

      {/* Sections carry their own rules and padding — the decorative curved
          dividers belonged to the old visual language and were removed. */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
