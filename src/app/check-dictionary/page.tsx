import type { Metadata } from 'next'
import { PAGE_SEO, SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS, buildWebAppSchema, buildFAQSchema, buildBreadcrumbSchema, canonical } from '@/lib/seo'
import DictionaryClient from './DictionaryClient'

const seo = PAGE_SEO.dictionary

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: canonical('/check-dictionary') },
  openGraph: { ...OG_DEFAULTS, title: seo.title, description: seo.description, url: `${SITE_URL}/check-dictionary` },
  twitter: { ...TWITTER_DEFAULTS, title: seo.title, description: seo.description },
}

export default function CheckDictionaryPage() {
  const webAppSchema = buildWebAppSchema({
    name: 'Dictionary Word Checker',
    description: seo.description,
    url: `${SITE_URL}/check-dictionary`,
    keywords: seo.keywords,
  })

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'WordUnscramble', url: SITE_URL },
    { name: 'Dictionary Checker', url: `${SITE_URL}/check-dictionary` },
  ])

  const faqSchema = buildFAQSchema([
    {
      question: 'Is this dictionary checker valid for Scrabble?',
      answer: 'Yes. Our checker validates words against both TWL (Tournament Word List) used in North American Scrabble, and SOWPODS used in UK and international Scrabble competitions.',
    },
    {
      question: 'Does the dictionary include all English words?',
      answer: 'We cover thousands of common English words including Scrabble-valid words. Highly technical, archaic, or brand-new slang may not be included in every case.',
    },
    {
      question: 'Can I check words for Words with Friends?',
      answer: 'Yes. Words with Friends uses a similar word list to TWL, so most words valid in our checker are also valid in Words with Friends.',
    },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <DictionaryClient />
    </>
  )
}
