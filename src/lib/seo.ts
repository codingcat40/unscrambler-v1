// ============================================================
// CENTRALIZED SEO CONFIGURATION
// WordUnscramble.app — Keyword & Metadata Strategy
// ============================================================
//
// KEYWORD RESEARCH RATIONALE:
// Primary targets: High-volume, moderate-competition tool queries
// Secondary targets: Long-tail game-specific queries (easier to rank)
// Strategy: Each page owns ONE primary keyword cluster, avoids
// cannibalization with other pages on the site.
//
// Volume estimates based on Ahrefs/SEMrush patterns for word tool niche.
// ============================================================

export const SITE_NAME = 'word-unscrambler'
export const SITE_URL = 'https://word-unscrambler-blush.vercel.app' // UPDATE to your Vercel domain
export const SITE_TAGLINE = 'Free Word Tools for Every Word Game'

// ============================================================
// PAGE-BY-PAGE SEO CONFIG
// ============================================================

export const PAGE_SEO = {

  // ── HOME PAGE ──────────────────────────────────────────────
  // Primary KW: "word unscrambler" (~165K searches/mo)
  // Secondary: "unscramble letters", "letter unscrambler"
  // Intent: Tool / utility — user wants to instantly unscramble letters
  // Competition: High but winnable with fast UX + content depth
  home: {
    title: 'Word Unscrambler — Unscramble Letters to Find Words',
    description:
      'Free word unscrambler tool. Enter your scrambled letters and instantly find all valid words for Scrabble, Wordle, Words with Friends, and more. Supports wildcards and blank tiles.',
    keywords: [
      'word unscrambler',
      'unscramble letters',
      'letter unscrambler',
      'unscramble words',
      'word descrambler',
      'scrambled letters solver',
      'unscramble word finder',
      'words from letters',
      'make words from letters',
      'scrabble word finder',
      'words with friends cheat',
      'wordle helper',
      'word cookies answers',
      'texttwist solver',
      'wordscapes answers',
    ],
    // Structured data type
    schema: 'WebApplication',
    // H1 on page (for on-page SEO alignment)
    h1: 'Word Unscrambler',
    // Focus for content section
    contentFocus: 'What is a word unscrambler and how does it work',
  },

  // ── CHECK DICTIONARY ───────────────────────────────────────
  // Primary KW: "is [word] a word" / "check if word is valid" (~40K/mo combined)
  // Secondary: "scrabble word checker", "dictionary word lookup"
  // Intent: Validation — user wants to settle a dispute
  dictionary: {
    title: 'Dictionary Word Checker — Is It a Valid Word?',
    description:
      'Instantly check if any word is valid in English dictionaries. Supports Scrabble TWL and SOWPODS word lists. Settle word game disputes in seconds.',
    keywords: [
      'check if word is valid',
      'is that a word',
      'word checker',
      'scrabble dictionary checker',
      'valid scrabble word',
      'sowpods word checker',
      'twl word list',
      'dictionary lookup',
      'word validator',
      'scrabble word validator',
      'words with friends word checker',
      'official scrabble dictionary',
    ],
    schema: 'WebApplication',
    h1: 'Dictionary Checker',
    contentFocus: 'How to verify word validity in Scrabble and word games',
  },

  // ── WORD DESCRAMBLER ───────────────────────────────────────
  // Primary KW: "word descrambler" (~22K/mo)
  // Secondary: "descramble words", "unscramble a word"
  // Intent: Similar to home but user has a specific scrambled word
  descrambler: {
    title: 'Word Descrambler — Unscramble a Specific Word',
    description:
      'Descramble any word instantly. Enter your jumbled letters and find the correct word using all your letters. Perfect for word puzzles, jumble games, and classroom activities.',
    keywords: [
      'word descrambler',
      'descramble words',
      'descramble letters',
      'unscramble a word',
      'jumble word solver',
      'daily jumble answers',
      'jumble solver',
      'word jumble',
      'unjumble words',
      'solve scrambled word',
      'unscramble the word',
      'word puzzle solver',
    ],
    schema: 'WebApplication',
    h1: 'Word Descrambler',
    contentFocus: 'How to descramble words and solve word jumbles',
  },

  // ── WORD SCRAMBLER ─────────────────────────────────────────
  // Primary KW: "word scrambler" (~12K/mo)
  // Secondary: "scramble a word", "make word puzzle"
  // Intent: Creation — teacher or game maker wants to scramble words
  scrambler: {
    title: 'Word Scrambler — Scramble Words for Puzzles and Games',
    description:
      'Scramble any word or phrase into a random jumble. Create word puzzles, spelling exercises, and classroom games instantly. Shuffle as many times as you like.',
    keywords: [
      'word scrambler',
      'scramble a word',
      'word jumble maker',
      'scramble words',
      'word puzzle maker',
      'scrambled word generator',
      'jumble word maker',
      'spelling game creator',
      'word game generator',
      'random word scramble',
      'create word puzzle',
      'word scramble generator',
    ],
    schema: 'WebApplication',
    h1: 'Word Scrambler',
    contentFocus: 'How to create scrambled word puzzles for games and teaching',
  },

  // ── ANAGRAM SOLVER ─────────────────────────────────────────
  // Primary KW: "anagram solver" (~60K/mo) — good opportunity
  // Secondary: "find anagrams", "anagram maker"
  // Intent: Find all anagrams of a word — scrabble + wordplay enthusiasts
  anagram: {
    title: 'Anagram Solver — Find All Anagrams of Any Word',
    description:
      'Find every anagram of any English word instantly. Our anagram solver rearranges all letters to find valid words — great for Scrabble strategy, crosswords, and wordplay.',
    keywords: [
      'anagram solver',
      'find anagrams',
      'anagram maker',
      'anagram generator',
      'word anagram',
      'anagram finder',
      'solve anagram',
      'anagram helper',
      'scrabble anagram solver',
      'best anagram solver',
      'online anagram solver',
      'anagram checker',
      'words that are anagrams',
    ],
    schema: 'WebApplication',
    h1: 'Anagram Solver',
    contentFocus: 'What is an anagram and how to solve anagrams in word games',
  },

  // ── RANDOM WORD GENERATOR ──────────────────────────────────
  // Primary KW: "random word generator" (~90K/mo) — high volume, moderate competition
  // Secondary: "random English word", "word generator"
  // Intent: Generation — creative writing, games, teaching
  randomWords: {
    title: 'Random Word Generator — Generate Random English Words',
    description:
      'Generate random English words by length, count, and starting letter. Free random word generator for creative writing, word games, brainstorming, vocabulary practice, and more.',
    keywords: [
      'random word generator',
      'random English word',
      'word generator',
      'generate random words',
      'random word picker',
      'vocabulary generator',
      'word list generator',
      'random noun generator',
      'random verb generator',
      'random adjective generator',
      'word of the day generator',
      'creative writing prompts',
      'random word for games',
    ],
    schema: 'WebApplication',
    h1: 'Random Word Generator',
    contentFocus: 'Uses for random word generators in games, writing, and education',
  },

  // ── WORDLE SOLVER ──────────────────────────────────────────
  // Primary KW: "wordle solver" (~110K/mo) — very high volume, very high competition
  // Secondary: "wordle answer today", "wordle helper", "wordle cheat"
  // Intent: Desperate Wordle player — high urgency, quick need
  // Note: Compete on UX clarity — most solvers have terrible UI
  wordle: {
    title: 'Wordle Solver — Find Today\'s Wordle Answer Fast',
    description:
      'Stuck on Wordle? Enter your green, yellow, and grey letter clues and instantly find all possible Wordle answers. The fastest and cleanest Wordle solver online.',
    keywords: [
      'wordle solver',
      'wordle answer today',
      'wordle helper',
      'wordle cheat',
      'wordle word finder',
      'wordle hint',
      'solve wordle',
      'wordle answer finder',
      'wordle clue solver',
      'wordle solution',
      'nyt wordle solver',
      'wordle assistant',
      'wordle puzzle solver',
      'best wordle solver',
    ],
    schema: 'WebApplication',
    h1: 'Wordle Solver',
    contentFocus: 'How to use color clues to solve Wordle puzzles every day',
  },
}

// ============================================================
// OPEN GRAPH DEFAULTS
// ============================================================
export const OG_DEFAULTS = {
  type: 'website' as const,
  locale: 'en_US',
  siteName: SITE_NAME,
  images: [
    {
      url: `${SITE_URL}/og-image.png`, // 1200x630px — create this image
      width: 1200,
      height: 630,
      alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
    },
  ],
}

// ============================================================
// TWITTER CARD DEFAULTS
// ============================================================
export const TWITTER_DEFAULTS = {
  card: 'summary_large_image' as const,
  site: '@wordunscramble', // Update with your Twitter handle
  creator: '@wordunscramble',
}

// ============================================================
// STRUCTURED DATA HELPERS
// ============================================================

export function buildWebAppSchema(page: {
  name: string
  description: string
  url: string
  keywords?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: page.name,
    description: page.description,
    url: page.url,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    keywords: page.keywords?.join(', '),
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
  }
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// ============================================================
// CANONICAL URL BUILDER
// ============================================================
export function canonical(path: string) {
  return `${SITE_URL}${path}`
}
