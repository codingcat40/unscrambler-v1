'use client'

import { useState } from 'react'
import { unscrambleLetters, getWordScore } from '@/lib/wordEngine'
import AdSlot from '@/components/AdSlot'

export default function DescramblerClient() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<Record<number, string[]> | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [descrError, setDescrError] = useState<string | null>(null)
  const [exactLength, setExactLength] = useState(true)

  const handleDescramble = async () => {
    if (!input.trim()) return
    setIsSearching(true)
    setDescrError(null)
    try {
      const opts = exactLength
        ? { minLength: input.replace(/[^a-zA-Z?*]/g, '').length, maxLength: input.replace(/[^a-zA-Z?*]/g, '').length }
        : {}
      const found = await unscrambleLetters(input, opts)
      setResults(found)
    } catch (err) {
      setDescrError((err as Error).message || 'Descramble failed. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const totalWords = results ? Object.values(results).reduce((s, a) => s + a.length, 0) : 0

  const copyWord = (word: string) => navigator.clipboard.writeText(word)

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
      <section style={{ textAlign: 'center', padding: '3rem 1rem 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧩</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          marginBottom: '0.75rem',
        }}>
          Word Descrambler
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: '440px', margin: '0 auto' }}>
          Enter a scrambled word and find the correct unscrambled word.
          Unlike the main unscrambler, this focuses on words using <em>all</em> your letters.
        </p>
      </section>

      <AdSlot slot="6666666666" format="horizontal" style={{ marginBottom: '2rem' }} />

      <div style={{
        background: 'white',
        border: '2px solid var(--border)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>
        {/* Letter display */}
        {input && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {input.toUpperCase().replace(/[^A-Z?*]/g, '').split('').map((l, i) => (
              <span key={i} className="letter-tile tile-teal pop-in" style={{ animationDelay: `${i * 0.04}s` }}>
                {l}
              </span>
            ))}
          </div>
        )}

        <input
          type="text"
          className="main-input"
          placeholder="Enter scrambled letters..."
          value={input}
          onChange={e => { setInput(e.target.value.replace(/[^a-zA-Z?*]/g, '').slice(0, 15)); setResults(null) }}
          onKeyDown={e => e.key === 'Enter' && handleDescramble()}
          maxLength={15}
          autoFocus
          autoComplete="off"
          style={{ marginBottom: '1rem' }}
        />

        {/* Mode toggle */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '1.25rem',
          padding: '12px',
          background: 'var(--cream)',
          borderRadius: '10px',
          border: '1.5px solid var(--border)',
        }}>
          {[
            { value: true, label: 'Use all letters', desc: 'Words using exactly your letters' },
            { value: false, label: 'Use any letters', desc: 'Words from any subset of letters' },
          ].map(opt => (
            <button
              key={String(opt.value)}
              onClick={() => setExactLength(opt.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1.5px solid',
                borderColor: exactLength === opt.value ? 'var(--teal)' : 'var(--border)',
                background: exactLength === opt.value ? 'var(--teal)' : 'white',
                color: exactLength === opt.value ? 'white' : 'var(--ink)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{opt.label}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '2px' }}>{opt.desc}</div>
            </button>
          ))}
        </div>

        <button
          className="btn-primary btn-teal"
          onClick={handleDescramble}
          disabled={!input.trim() || isSearching}
          style={{ width: '100%', fontSize: '1.05rem', padding: '0.9rem' }}
        >
          {isSearching ? '🔍 Descrambling...' : '🧩 Descramble Word'}
        </button>
      </div>

      {/* Results */}
      {results !== null && !isSearching && (
        <div style={{
          background: 'white',
          border: '2px solid var(--border)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '1.25rem' }}>
            {totalWords > 0
              ? `${totalWords} word${totalWords !== 1 ? 's' : ''} from "${input.toUpperCase()}"`
              : `No words found for "${input.toUpperCase()}"`}
          </h2>

          {totalWords > 0 ? (
            Object.keys(results).map(Number).sort((a, b) => b - a).map(len => (
              <div key={len} style={{ marginBottom: '1.5rem' }}>
                <div className="length-header">{len}-letter words ({results[len].length})</div>
                <div className="words-grid">
                  {results[len].map((word, i) => (
                    <button
                      key={word}
                      onClick={() => copyWord(word)}
                      className="word-chip pop-in"
                      style={{ animationDelay: `${i * 0.03}s` }}
                      title={`Score: ${getWordScore(word)} — Click to copy`}
                    >
                      {word}
                      <span className="score-badge">{getWordScore(word)}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🤔</div>
              <p>Try switching to "Use any letters" mode for more results.</p>
            </div>
          )}
        </div>
      )}

      <AdSlot slot="7777777777" format="horizontal" style={{ marginBottom: '2rem' }} />
    </div>
  )
}
