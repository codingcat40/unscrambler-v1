import type { Metadata } from 'next'
import { PAGE_SEO, SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS, buildWebAppSchema, buildBreadcrumbSchema, buildFAQSchema, canonical } from '@/lib/seo'
import RandomWordsClient from './RandomWordsClient'

const seo = PAGE_SEO.randomWords

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: canonical('/random-word-generator') },
  openGraph: { ...OG_DEFAULTS, title: seo.title, description: seo.description, url: `${SITE_URL}/random-word-generator` },
  twitter: { ...TWITTER_DEFAULTS, title: seo.title, description: seo.description },
}

export default function RandomWordGeneratorPage() {
  const schemas = [
    buildWebAppSchema({ name: 'Random Word Generator', description: seo.description, url: `${SITE_URL}/random-word-generator`, keywords: seo.keywords }),
    buildBreadcrumbSchema([
      { name: 'WordUnscramble', url: SITE_URL },
      { name: 'Random Word Generator', url: `${SITE_URL}/random-word-generator` },
    ]),
    buildFAQSchema([
      { question: 'What is a random word generator used for?', answer: 'Random word generators are used for creative writing prompts, vocabulary building, word game challenges, classroom exercises, icebreaker games, naming brainstorms, and generating passwords or usernames.' },
      { question: 'Can I generate random words of a specific length?', answer: 'Yes. Select a specific word length (2 through 8 letters) and the tool will only return words of that exact length. You can also filter by starting letter.' },
      { question: 'Are the generated words all valid English words?', answer: 'Yes. All words come from a curated English dictionary and are valid in standard word games. They are not random letter strings — they are real, usable English words.' },
    ]),
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <RandomWordsClient />
    </>
  )
}
