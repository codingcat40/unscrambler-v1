// ============================================================
// Word Engine — powered by Datamuse API
// https://www.datamuse.com/api/
//
// Datamuse is free, no API key required, ~100K requests/day.
// Covers 170,000+ English words including full Scrabble
// dictionaries (TWL + SOWPODS).
//
// Endpoints used:
//   /words?sp=<pattern>          → spelling pattern search
//   /words?rel_anagram=<word>    → exact anagram lookup
//   /words?ml=<seed>             → thematically related words
// ============================================================

const DATAMUSE_BASE = 'https://api.datamuse.com'

interface DatamuseWord {
  word: string
  score?: number
  numSyllables?: number
}

// Shared fetch helper with 8s timeout
async function datamuse(
  endpoint: string,
  params: Record<string, string | number>
): Promise<DatamuseWord[]> {
  const url = new URL(`${DATAMUSE_BASE}${endpoint}`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)))

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 8000)

  try {
    const res = await fetch(url.toString(), {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) throw new Error(`Datamuse error ${res.status}`)
    return await res.json()
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      throw new Error('Request timed out — please try again.')
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}

// ============================================================
// SCRABBLE LETTER SCORES
// ============================================================
export const LETTER_SCORES: Record<string, number> = {
  a:1, e:1, i:1, o:1, u:1, l:1, n:1, s:1, t:1, r:1,
  d:2, g:2,
  b:3, c:3, m:3, p:3,
  f:4, h:4, v:4, w:4, y:4,
  k:5,
  j:8, x:8,
  q:10, z:10,
}

export function getWordScore(word: string): number {
  return word.toLowerCase().split('').reduce((sum, ch) => sum + (LETTER_SCORES[ch] || 0), 0)
}

// ============================================================
// UNSCRAMBLE
// For each valid word length, fire a Datamuse sp= query using
// a wildcard pattern, then verify each result can actually be
// formed from the user's letters (Datamuse is permissive).
// All length queries run in parallel for speed.
// ============================================================
export async function unscrambleLetters(
  letters: string,
  options: {
    startsWith?: string
    endsWith?: string
    mustInclude?: string
    minLength?: number
    maxLength?: number
  } = {}
): Promise<Record<number, string[]>> {
  const input = letters.toLowerCase().replace(/[^a-z?*]/g, '')
  const wildcardCount = (input.match(/[?*]/g) || []).length
  const baseLetters = input.replace(/[?*]/g, '')
  const totalLen = baseLetters.length + wildcardCount

  if (totalLen < 2) return {}

  const minLen = options.minLength ?? 2
  const maxLen = options.maxLength ?? Math.min(totalLen, 15)
  const lengths = Array.from({ length: maxLen - minLen + 1 }, (_, i) => minLen + i)

  function buildPattern(len: number): string {
    const sw = options.startsWith?.toLowerCase() ?? ''
    const ew = options.endsWith?.toLowerCase() ?? ''
    const mid = '?'.repeat(Math.max(0, len - sw.length - ew.length))
    return `${sw}${mid}${ew}`
  }

  const requests = lengths.map(len =>
    datamuse('/words', { sp: buildPattern(len), max: 300 })
      .then(results =>
        results
          .map(r => r.word.toLowerCase())
          .filter(word => {
            if (word.length !== len) return false
            if (!canForm(word, baseLetters, wildcardCount)) return false
            if (options.mustInclude) {
              const must = options.mustInclude.toLowerCase()
              if (!must.split('').every(ch => word.includes(ch))) return false
            }
            return true
          })
          // Highest Scrabble score first within each length group
          .sort((a, b) => getWordScore(b) - getWordScore(a))
      )
      .catch(() => [] as string[]) // skip a length if request fails
  )

  const allResults = await Promise.all(requests)

  const grouped: Record<number, string[]> = {}
  lengths.forEach((len, i) => {
    if (allResults[i].length > 0) grouped[len] = allResults[i]
  })
  return grouped
}

function canForm(word: string, available: string, wildcards: number): boolean {
  const pool = available.split('')
  let used = 0
  for (const ch of word) {
    const idx = pool.indexOf(ch)
    if (idx !== -1) pool.splice(idx, 1)
    else if (used < wildcards) used++
    else return false
  }
  return true
}

// ============================================================
// DICTIONARY CHECKER
// Exact sp= lookup — if Datamuse returns it, it's a real word.
// ============================================================
export async function checkDictionary(
  word: string
): Promise<{ valid: boolean; word: string }> {
  const cleaned = word.toLowerCase().trim()
  if (!cleaned || cleaned.length < 2) return { valid: false, word: cleaned }

  const results = await datamuse('/words', { sp: cleaned, max: 5 })
  const exact = results.find(r => r.word.toLowerCase() === cleaned)
  return { valid: !!exact, word: cleaned }
}

// ============================================================
// WORD SCRAMBLER  (pure client-side — no API needed)
// ============================================================
export function scrambleWord(word: string): string {
  const arr = word.toLowerCase().split('')
  let result = word.toLowerCase()
  let attempts = 0
  while (result === word.toLowerCase() && attempts < 20) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    result = arr.join('')
    attempts++
  }
  return result
}

// ============================================================
// ANAGRAM SOLVER
// Datamuse's rel_anagram= endpoint is purpose-built for this.
// ============================================================
export async function findAnagrams(word: string): Promise<string[]> {
  const cleaned = word.toLowerCase().trim()
  if (!cleaned || cleaned.length < 2) return []

  const results = await datamuse('/words', { rel_anagram: cleaned, max: 100 })
  return results
    .map(r => r.word.toLowerCase())
    .filter(w => w !== cleaned)
    .sort((a, b) => getWordScore(b) - getWordScore(a))
}

// ============================================================
// RANDOM WORD GENERATOR
// Rotates through topic seeds so results feel varied each time.
// ============================================================
const SEEDS = [
  'nature', 'adventure', 'color', 'animal', 'music',
  'science', 'travel', 'food', 'sport', 'emotion',
  'ocean', 'forest', 'city', 'weather', 'building',
  'technology', 'history', 'mystery', 'energy', 'light',
]

export async function generateRandomWords(options: {
  length?: number
  count?: number
  startsWith?: string
}): Promise<string[]> {
  const { length, count = 10, startsWith } = options

  let sp = ''
  if (startsWith && length) {
    sp = startsWith.toLowerCase() + '?'.repeat(Math.max(0, length - startsWith.length))
  } else if (startsWith) {
    sp = startsWith.toLowerCase() + '*'
  } else if (length) {
    sp = '?'.repeat(length)
  }

  const seed = SEEDS[Math.floor(Math.random() * SEEDS.length)]

  const params: Record<string, string | number> = sp
    ? { sp, max: 300 }
    : { ml: seed, max: 300 }

  const results = await datamuse('/words', params)

  const words = results
    .map(r => r.word.toLowerCase())
    .filter(w => /^[a-z]+$/.test(w))
    .filter(w => !length || w.length === length)
    .filter(w => !startsWith || w.startsWith(startsWith.toLowerCase()))
    .sort(() => Math.random() - 0.5)

  return words.slice(0, count)
}

// ============================================================
// WORDLE SOLVER
// sp= pattern with known letters, then filter yellow/grey tiles.
// Results sorted by Datamuse frequency score (common words first).
// ============================================================
export async function solveWordle(options: {
  pattern: string          // "r_a_t" — _ means unknown position
  presentLetters: string[] // yellow tiles (letter in word, wrong spot)
  absentLetters: string[]  // grey tiles (letter not in word)
}): Promise<string[]> {
  const { pattern, presentLetters, absentLetters } = options
  const len = pattern.length

  // Datamuse uses ? for single unknown letter
  const sp = pattern.split('').map(c => (c === '_' ? '?' : c)).join('')

  const results = await datamuse('/words', { sp, max: 500 })

  return results
    .map(r => r.word.toLowerCase())
    .filter(word => {
      if (word.length !== len) return false
      if (presentLetters.some(l => !word.includes(l))) return false
      if (absentLetters.some(l => word.includes(l))) return false
      return true
    })
  // Order preserved from Datamuse which ranks by frequency — best guesses first
}

// ============================================================
// TOTAL WORD COUNT
// ============================================================
export function getTotalWordCount(): number {
  return 170000
}
