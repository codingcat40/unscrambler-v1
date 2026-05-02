import type { Metadata } from 'next'
import { PAGE_SEO, SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS, buildWebAppSchema, buildBreadcrumbSchema, buildFAQSchema, canonical } from '@/lib/seo'
import ScramblerClient from './ScramblerClient'

const seo = PAGE_SEO.scrambler

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: canonical('/word-scrambler') },
  openGraph: { ...OG_DEFAULTS, title: seo.title, description: seo.description, url: `${SITE_URL}/word-scrambler` },
  twitter: { ...TWITTER_DEFAULTS, title: seo.title, description: seo.description },
}

export default function WordScramblerPage() {
  const schemas = [
    buildWebAppSchema({ name: 'Word Scrambler', description: seo.description, url: `${SITE_URL}/word-scrambler`, keywords: seo.keywords }),
    buildBreadcrumbSchema([
      { name: 'WordUnscramble', url: SITE_URL },
      { name: 'Word Scrambler', url: `${SITE_URL}/word-scrambler` },
    ]),
    buildFAQSchema([
      { question: 'What can I use a word scrambler for?', answer: 'Word scramblers are used by teachers for spelling exercises, party hosts for word games, puzzle designers for brain teasers, and parents for fun vocabulary activities with kids.' },
      { question: 'Can I scramble multiple words at once?', answer: 'Currently our scrambler works word by word. Enter one word at a time and use the Reshuffle button to get different arrangements of the same letters.' },
    ]),
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <ScramblerClient />
    </>
  )
}
