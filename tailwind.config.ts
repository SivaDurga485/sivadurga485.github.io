import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* --- Editorial BI palette (new identity) --------------------------
         * One background, two surfaces, one hairline, one accent.
         * `signal` is the ONLY chromatic colour — reserve it for meaning:
         * active states, links, the single primary action.
         * ------------------------------------------------------------------ */
        ink: '#0a0c0f',
        panel: '#101317',
        tile: '#151a1f',
        rule: '#1f262d',
        'rule-soft': '#161b21',
        fg: '#e6e8ea',
        dim: '#9aa3ab',
        mute: '#78828b',
        /* Semantic status — form validation only, never decoration. */
        danger: '#e5624f',
        signal: {
          DEFAULT: '#f0a62b',
          soft: 'rgba(240, 166, 43, 0.12)',
          line: 'rgba(240, 166, 43, 0.35)',
        },

        /* --- Legacy palette -------------------------------------------------
         * Still consumed by About/Skills/Projects/Services/Contact until each
         * section is migrated. `surface-950` is retargeted to the new ink so
         * the page background changes in one step, with no seam between the
         * redesigned Hero and the not-yet-migrated sections below it.
         * ------------------------------------------------------------------ */
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#38bdf8',
          600: '#0ea5e9',
          700: '#0284c7',
          900: '#0c2d48',
        },
        accent: {
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
        surface: {
          950: '#0a0c0f',
          900: '#101317',
          800: '#151a1f',
          700: '#1f262d',
        },
        secondary: {
          100: '#e6e8ea',
          200: '#cfd4d8',
          300: '#9aa3ab',
          400: '#78828b',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        meta: '0.18em',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin-reverse 15s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(56, 189, 248, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.25)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'mesh-gradient':
          'radial-gradient(at 35% 15%, rgba(255, 255, 255, 0.022) 0px, transparent 55%), radial-gradient(at 85% 75%, rgba(255, 255, 255, 0.016) 0px, transparent 55%)',
        'hero-glow':
          'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 30px rgba(56, 189, 248, 0.2)',
        'glow-violet': '0 0 30px rgba(139, 92, 246, 0.2)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        panel: '0 1px 0 rgba(255, 255, 255, 0.03) inset, 0 24px 60px -30px rgba(0, 0, 0, 0.9)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
