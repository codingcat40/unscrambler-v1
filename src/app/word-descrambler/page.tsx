import type { Metadata } from 'next'
import { PAGE_SEO, SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS, buildWebAppSchema, buildBreadcrumbSchema, buildFAQSchema, canonical } from '@/lib/seo'
import DescramblerClient from './DescramblerClient'

const seo = PAGE_SEO.descrambler

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: canonical('/word-descrambler') },
  openGraph: { ...OG_DEFAULTS, title: seo.title, description: seo.description, url: `${SITE_URL}/word-descrambler` },
  twitter: { ...TWITTER_DEFAULTS, title: seo.title, description: seo.description },
}

export default function WordDescramblerPage() {
  const schemas = [
    buildWebAppSchema({ name: 'Word Descrambler', description: seo.description, url: `${SITE_URL}/word-descrambler`, keywords: seo.keywords }),
    buildBreadcrumbSchema([
      { name: 'WordUnscramble', url: SITE_URL },
      { name: 'Word Descrambler', url: `${SITE_URL}/word-descrambler` },
    ]),
    buildFAQSchema([
      { question: 'What is the difference between a descrambler and an unscrambler?', answer: 'A word descrambler focuses on finding the single correct word that uses all your letters, while a general unscrambler finds all possible words from any subset of your letters. Use the descrambler when you have a specific scrambled word to solve.' },
      { question: 'Can I solve daily Jumble puzzles with this tool?', answer: 'Yes! Our word descrambler is perfect for solving Daily Jumble newspaper puzzles. Enter the scrambled letters and switch to "Use all letters" mode to find the intended answer.' },
    ]),
  ]

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <DescramblerClient />
    </>
  )
}
