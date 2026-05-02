import type { Metadata } from 'next'
import { PAGE_SEO, SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS, buildWebAppSchema, buildFAQSchema, canonical } from '@/lib/seo'
import HomePageClient from './HomePageClient'

const seo = PAGE_SEO.home

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: canonical('/') },
  openGraph: { ...OG_DEFAULTS, title: seo.title, description: seo.description, url: SITE_URL },
  twitter: { ...TWITTER_DEFAULTS, title: seo.title, description: seo.description },
}

export default function HomePage() {
  const webAppSchema = buildWebAppSchema({
    name: 'Word Unscrambler',
    description: seo.description,
    url: SITE_URL,
    keywords: seo.keywords,
  })

  const faqSchema = buildFAQSchema([
    {
      question: 'What is a word unscrambler?',
      answer: 'A word unscrambler takes scrambled or random letters and finds all valid English words that can be formed from them. It is used for Scrabble, Words with Friends, Wordle, and other word games.',
    },
    {
      question: 'How do I use wildcards in the word unscrambler?',
      answer: 'Enter a question mark (?) or asterisk (*) in place of a blank tile. For example, "appl?" finds words like "apple" or "apply" using your letters plus one unknown letter.',
    },
    {
      question: 'What word lists does this unscrambler use?',
      answer: 'We use a curated list based on TWL (Tournament Word List) for North American Scrabble and SOWPODS for UK/International Scrabble, covering thousands of valid English words.',
    },
    {
      question: 'Can I filter results by starting or ending letters?',
      answer: 'Yes. Click the Options button to reveal filters for Starts with, Ends with, and Must include — perfect for finding specific words that fit your game board.',
    },
    {
      question: 'Is this word unscrambler free to use?',
      answer: 'Yes, WordUnscramble is completely free. All tools including the unscrambler, dictionary checker, anagram solver, and Wordle solver are available at no cost.',
    },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomePageClient />
    </>
  )
}
