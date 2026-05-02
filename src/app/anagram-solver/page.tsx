import type { Metadata } from 'next'
import { PAGE_SEO, SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS, buildWebAppSchema, buildBreadcrumbSchema, buildFAQSchema, canonical } from '@/lib/seo'
import AnagramClient from './AnagramClient'

const seo = PAGE_SEO.anagram

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: canonical('/anagram-solver') },
  openGraph: { ...OG_DEFAULTS, title: seo.title, description: seo.description, url: `${SITE_URL}/anagram-solver` },
  twitter: { ...TWITTER_DEFAULTS, title: seo.title, description: seo.description },
}

export default function AnagramSolverPage() {
  const schemas = [
    buildWebAppSchema({ name: 'Anagram Solver', description: seo.description, url: `${SITE_URL}/anagram-solver`, keywords: seo.keywords }),
    buildBreadcrumbSchema([
      { name: 'WordUnscramble', url: SITE_URL },
      { name: 'Anagram Solver', url: `${SITE_URL}/anagram-solver` },
    ]),
    buildFAQSchema([
      { question: 'What is an anagram?', answer: 'An anagram is a word formed by rearranging all the letters of another word. For example, LISTEN is an anagram of SILENT, ENLIST, and TINSEL — all using the same six letters.' },
      { question: 'How are anagrams useful in Scrabble?', answer: 'Knowing anagrams of your tiles helps you spot plays you might otherwise miss. For instance, if you have the letters AELRST, knowing that ALERTS, ALTERS, ARTELS, LASTER, RATELS, SALTER, SLATER, and STALER are all valid helps you find the best board placement.' },
      { question: 'Are all anagram results valid Scrabble words?', answer: 'Yes. All results are checked against a standard English word list used in competitive word games. Scrabble point values are shown for each result.' },
    ]),
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <AnagramClient />
    </>
  )
}
