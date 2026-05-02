'use client'

import { useState } from 'react'
import { findAnagrams, getWordScore } from '@/lib/wordEngine'
import AdSlot from '@/components/AdSlot'

export default function AnagramClient() {
  const [input, setInput] = useState('')
  const [anagrams, setAnagrams] = useState<string[] | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [anagramError, setAnagramError] = useState<string | null>(null)

  const handleFind = async () => {
    if (!input.trim() || input.trim().length < 2) return
    setIsSearching(true)
    setAnagramError(null)
    try {
      const found = await findAnagrams(input.trim())
      setAnagrams(found)
    } catch (err) {
      setAnagramError((err as Error).message || 'Search failed. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleFind()
  }

  const copyWord = (word: string) => {
    navigator.clipboard.writeText(word)
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
      <section style={{ textAlign: 'center', padding: '3rem 1rem 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔄</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          marginBottom: '0.75rem',
        }}>
          Anagram Solver
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: '420px', margin: '0 auto' }}>
          Find all anagrams of any word — words using exactly the same letters in a different order.
        </p>
      </section>

      <AdSlot slot="1010101010" format="horizontal" style={{ marginBottom: '2rem' }} />

      <div style={{
        background: 'white',
        border: '2px solid var(--border)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '0.75rem' }}>
          <input
            type="text"
            className="main-input"
            placeholder="Enter a word (e.g. LISTEN)"
            value={input}
            onChange={e => { setInput(e.target.value.replace(/[^a-zA-Z]/g, '')); setAnagrams(null) }}
            onKeyDown={handleKeyDown}
            maxLength={15}
            autoFocus
            style={{ fontSize: '1.2rem', flex: 1 }}
          />
          <button
            className="btn-primary btn-teal"
            onClick={handleFind}
            disabled={!input.trim() || isSearching}
            style={{ whiteSpace: 'nowrap', padding: '0 1.5rem' }}
          >
            {isSearching ? 'Searching...' : '🔄 Find Anagrams'}
          </button>
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
          Enter 2–15 letters. Anagrams use the <em>exact same letters</em> in a different arrangement.
        </p>
      </div>

      {/* Results */}
      {anagrams !== null && !isSearching && (
        <div style={{
          background: 'white',
          border: '2px solid var(--border)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          {anagrams.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🤷</div>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
                No anagrams found for "{input.toUpperCase()}"
              </p>
              <p style={{ fontSize: '0.875rem' }}>This word has no valid anagrams in our dictionary.</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
                  {anagrams.length} Anagram{anagrams.length !== 1 ? 's' : ''} of "{input.toUpperCase()}"
                </h2>
                <span className="stat-pill">
                  {input.length} letters
                </span>
              </div>

              <AdSlot slot="3030303030" format="horizontal" style={{ marginBottom: '1.25rem' }} />

              <div className="words-grid">
                {anagrams.map((word, i) => (
                  <button
                    key={word}
                    onClick={() => copyWord(word)}
                    className="word-chip pop-in"
                    style={{ animationDelay: `${i * 0.04}s` }}
                    title={`Scrabble score: ${getWordScore(word)} — Click to copy`}
                  >
                    {word}
                    <span className="score-badge">{getWordScore(word)}</span>
                  </button>
                ))}
              </div>

              <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
                💡 Click any word to copy it to clipboard.
              </p>
            </>
          )}
        </div>
      )}

      <AdSlot slot="2020202020" format="horizontal" style={{ marginBottom: '2rem' }} />

      {/* Info */}
      <div style={{
        background: 'white',
        border: '1.5px solid var(--border)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
      }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.75rem' }}>
          What is an Anagram?
        </h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          An anagram is a word formed by rearranging all the letters of another word.
          For example, <strong>LISTEN</strong> is an anagram of <strong>SILENT</strong> and <strong>ENLIST</strong>.
        </p>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.9rem' }}>
          Anagram solving is a core skill in Scrabble, crossword puzzles, and word games.
          Our solver finds every valid English anagram instantly, complete with Scrabble point values.
        </p>
      </div>
    </div>
  )
}
