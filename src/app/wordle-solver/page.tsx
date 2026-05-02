import type { Metadata } from 'next'
import { PAGE_SEO, SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS, buildWebAppSchema, buildBreadcrumbSchema, buildFAQSchema, canonical } from '@/lib/seo'
import WordleClient from './WordleClient'

const seo = PAGE_SEO.wordle

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: canonical('/wordle-solver') },
  openGraph: { ...OG_DEFAULTS, title: seo.title, description: seo.description, url: `${SITE_URL}/wordle-solver` },
  twitter: { ...TWITTER_DEFAULTS, title: seo.title, description: seo.description },
}

export default function WordleSolverPage() {
  const schemas = [
    buildWebAppSchema({ name: 'Wordle Solver', description: seo.description, url: `${SITE_URL}/wordle-solver`, keywords: seo.keywords }),
    buildBreadcrumbSchema([
      { name: 'WordUnscramble', url: SITE_URL },
      { name: 'Wordle Solver', url: `${SITE_URL}/wordle-solver` },
    ]),
    buildFAQSchema([
      { question: 'How do I use the Wordle solver?', answer: 'Enter the letters you have guessed into the five boxes. Then click each letter tile to set its color: green for correct position, yellow for wrong position, and grey for not in the word. Finally enter any grey letters in the excluded box and click Find Solutions.' },
      { question: 'Does the Wordle solver give away the answer?', answer: 'It narrows down possibilities based on your clues. If you have entered enough information, it may show just one or two possible answers. It is designed to help when you are genuinely stuck, not to replace the fun of guessing.' },
      { question: 'Is this solver updated for the NYT Wordle daily puzzle?', answer: 'Our solver works for any 5-letter Wordle variant, including the original NYT Wordle. It does not pull today\'s specific answer but finds all words matching your clue pattern.' },
    ]),
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <WordleClient />
    </>
  )
}
