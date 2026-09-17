import type { Metadata } from 'next'
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

/* Display face: hierarchy comes from weight and scale, not from gradients. */
const interTight = Inter_Tight({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

/* Mono is reserved for numbers, metrics and labels — the "data person" signal.
 * JetBrains Mono over Roboto Mono for its tabular figures and slashed zero. */
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Sivadurga Kondapalli — Power BI Developer & BI Engineer',
  description:
    'Power BI Developer with close to 3 years across Power BI, DAX, Power Query (M), SQL/T-SQL and Snowflake — paginated reports, semantic modeling, performance tuning and legacy-to-cloud migration.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} font-sans antialiased bg-ink text-fg`}
      >
        {children}
      </body>
    </html>
  )
}
