'use client'

import { useState, useRef, useCallback } from 'react'
import { unscrambleLetters, getTotalWordCount } from '@/lib/wordEngine'
import WordResults from '@/components/WordResults'
import AdSlot from '@/components/AdSlot'

const EXAMPLE_WORDS = ['LETTERS', 'SCRAMBLE', 'PUZZLE', 'WORDS', 'GAME']

const HOW_TO_TILES = [
  { letter: '?', label: 'Wildcard', color: 'var(--coral)' },
  { letter: '*', label: 'Blank', color: 'var(--teal)' },
]

export default function HomePageClient() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<Record<number, string[]> | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [startsWith, setStartsWith] = useState('')
  const [endsWith, setEndsWith] = useState('')
  const [mustInclude, setMustInclude] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resultsRef = useRef<HTMLDivElement>(null)

  const totalWords = results ? Object.values(results).reduce((sum, arr) => sum + arr.length, 0) : 0

  const handleUnscramble = useCallback(async () => {
    if (!input.trim()) return
    setIsSearching(true)
    setHasSearched(true)
    setError(null)

    try {
      const found = await unscrambleLetters(input, {
        startsWith: startsWith || undefined,
        endsWith: endsWith || undefined,
        mustInclude: mustInclude || undefined,
      })
      setResults(found)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err) {
      setError((err as Error).message || 'Something went wrong. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }, [input, startsWith, endsWith, mustInclude])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleUnscramble()
  }

  const handleClear = () => {
    setInput('')
    setResults(null)
    setHasSearched(false)
    setStartsWith('')
    setEndsWith('')
    setMustInclude('')
  }

  const tryExample = (word: string) => {
    setInput(word)
    setResults(null)
  }

  const inputLetters = input.replace(/[^a-zA-Z?*]/g, '')

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

      {/* Hero section */}
      <section style={{
        textAlign: 'center',
        padding: '3.5rem 1rem 2rem',
        position: 'relative',
      }}>
        {/* Decorative tiles */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          marginBottom: '1.5rem',
        }}>
          {['U','N','S','C','R','A','M','B','L','E'].map((l, i) => (
            <div
              key={i}
              className="letter-tile"
              style={{
                background: i % 3 === 0 ? 'var(--amber)' : i % 3 === 1 ? 'var(--teal)' : 'var(--ink)',
                color: 'white',
                boxShadow: i % 3 === 0
                  ? '0 3px 0 var(--amber-dark)'
                  : i % 3 === 1
                  ? '0 3px 0 var(--teal-dark)'
                  : '0 3px 0 #000',
                animationDelay: `${i * 0.06}s`,
              }}
            >
              {l}
            </div>
          ))}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: '1rem',
          color: 'var(--ink)',
        }}>
          Word Unscrambler
        </h1>

        <p style={{
          color: 'var(--muted)',
          fontSize: '1.05rem',
          maxWidth: '480px',
          margin: '0 auto 2rem',
          lineHeight: 1.6,
        }}>
          Unscramble any letters and discover every valid word — instantly.
          Perfect for Scrabble, Wordle, Words with Friends, and more.
        </p>

        {/* Quick stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <span className="stat-pill">📚 {getTotalWordCount().toLocaleString()}+ words</span>
          <span className="stat-pill">⚡ Instant results</span>
          <span className="stat-pill">🎯 Scrabble scored</span>
          <span className="stat-pill">🌍 Free forever</span>
        </div>
      </section>

      {/* Top Ad */}
      <AdSlot slot="1111111111" format="horizontal" style={{ marginBottom: '2rem' }} />

      {/* Search box */}
      <section style={{
        background: 'white',
        border: '2px solid var(--border)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>
        {/* Letter display */}
        {inputLetters && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '6px',
            flexWrap: 'wrap',
            marginBottom: '1.25rem',
          }}>
            {inputLetters.toUpperCase().split('').map((l, i) => (
              <span
                key={i}
                className="letter-tile tile-amber pop-in"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                {l}
              </span>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <input
            type="text"
            className="main-input"
            placeholder="Enter letters (e.g. SPAHCE)"
            value={input}
            onChange={e => setInput(e.target.value.replace(/[^a-zA-Z?*]/g, '').slice(0, 15))}
            onKeyDown={handleKeyDown}
            maxLength={15}
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
          {input && (
            <button
              onClick={handleClear}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'var(--cream)',
                border: 'none',
                borderRadius: '999px',
                width: '28px',
                height: '28px',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--muted)',
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Character counter */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
              {inputLetters.length}/15 letters
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>·</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
              Use <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--cream)', padding: '1px 4px', borderRadius: '4px' }}>?</code> or{' '}
              <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--cream)', padding: '1px 4px', borderRadius: '4px' }}>*</code> for blank tiles
            </span>
          </div>

          <button
            onClick={() => setShowOptions(!showOptions)}
            style={{
              background: 'none',
              border: '1.5px solid var(--border)',
              borderRadius: '8px',
              padding: '5px 12px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              color: 'var(--ink)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--cream)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            ⚙ Options {showOptions ? '▲' : '▼'}
          </button>
        </div>

        {/* Advanced options */}
        {showOptions && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            padding: '1rem',
            background: 'var(--cream)',
            borderRadius: '10px',
            marginBottom: '1rem',
            border: '1.5px solid var(--border)',
          }}>
            {[
              { label: 'Starts with', value: startsWith, set: setStartsWith, placeholder: 'e.g. sp' },
              { label: 'Ends with', value: endsWith, set: setEndsWith, placeholder: 'e.g. ed' },
              { label: 'Must include', value: mustInclude, set: setMustInclude, placeholder: 'e.g. a' },
            ].map(opt => (
              <div key={opt.label}>
                <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--muted)',
                  marginBottom: '5px',
                }}>
                  {opt.label}
                </label>
                <input
                  type="text"
                  value={opt.value}
                  onChange={e => opt.set(e.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase())}
                  placeholder={opt.placeholder}
                  style={{
                    width: '100%',
                    padding: '7px 10px',
                    border: '1.5px solid var(--border)',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    background: 'white',
                    outline: 'none',
                    color: 'var(--ink)',
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Unscramble button */}
        <button
          className="btn-primary btn-amber"
          onClick={handleUnscramble}
          disabled={!input.trim() || isSearching}
          style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
        >
          {isSearching ? '🔍 Unscrambling...' : '🔀 Unscramble It'}
        </button>

        {/* Example searches */}
        <div style={{
          marginTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 500 }}>Try:</span>
          {EXAMPLE_WORDS.map(word => (
            <button
              key={word}
              onClick={() => tryExample(word)}
              style={{
                background: 'none',
                border: '1.5px solid var(--border)',
                borderRadius: '999px',
                padding: '3px 10px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
                color: 'var(--ink)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--amber-light)'; e.currentTarget.style.borderColor = 'var(--amber)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              {word}
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      {error && (
        <div style={{
          padding: '1rem 1.5rem',
          background: '#FEF2F2',
          border: '1.5px solid #FCA5A5',
          borderRadius: '12px',
          color: '#991B1B',
          marginBottom: '1rem',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          ⚠️ {error}
        </div>
      )}

      <div ref={resultsRef}>
        {isSearching && (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{
              width: '48px', height: '48px',
              border: '3px solid var(--border)',
              borderTop: '3px solid var(--amber)',
              borderRadius: '50%',
              margin: '0 auto 1rem',
              animation: 'spin 0.8s linear infinite',
            }} />
            <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Scanning dictionary...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
          </div>
        )}

        {!isSearching && results !== null && (
          <section style={{
            background: 'white',
            border: '2px solid var(--border)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              color: 'var(--ink)',
            }}>
              {totalWords > 0
                ? `Found ${totalWords} words from "${input.toUpperCase()}"`
                : `No words found for "${input.toUpperCase()}"`
              }
            </h2>

            {/* Mid-results ad */}
            <AdSlot slot="2222222222" format="horizontal" style={{ marginBottom: '1.5rem' }} />

            <WordResults results={results} totalWords={totalWords} />
          </section>
        )}
      </div>

      {/* Info section */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {[
          {
            icon: '🎮',
            title: 'Boost Your Game Score',
            text: 'Every word comes with its Scrabble score so you can instantly spot the highest-value plays.',
          },
          {
            icon: '🔍',
            title: 'Smart Filtering',
            text: 'Filter by starting letters, ending letters, or required letters to find exactly what you need.',
          },
          {
            icon: '⚡',
            title: 'Lightning Fast',
            text: 'Our word engine searches thousands of words in milliseconds. No waiting, no loading.',
          },
        ].map(card => (
          <div key={card.title} style={{
            background: 'white',
            border: '1.5px solid var(--border)',
            borderRadius: '12px',
            padding: '1.5rem',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{card.icon}</div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.1rem',
              marginBottom: '0.5rem',
              color: 'var(--ink)',
            }}>
              {card.title}
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7 }}>{card.text}</p>
          </div>
        ))}
      </section>

      {/* Bottom Ad */}
      <AdSlot slot="2222222222" format="horizontal" style={{ marginBottom: '2rem' }} />

      {/* SEO Content */}
      <section style={{
        background: 'white',
        border: '1.5px solid var(--border)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          fontWeight: 700,
          marginBottom: '1rem',
          color: 'var(--ink)',
        }}>
          What is a Word Unscrambler?
        </h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.95rem' }}>
          A word unscrambler is a tool that takes a set of scrambled or random letters and finds all valid English words
          that can be formed using those letters. It's an essential companion for word games like Scrabble, Words with
          Friends, Wordle, Word Cookies, Wordscapes, and TextTwist.
        </p>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          Simply enter up to 15 letters (including wildcards with <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--cream)', padding: '1px 6px', borderRadius: '4px' }}>?</code> or <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--cream)', padding: '1px 6px', borderRadius: '4px' }}>*</code> for blank tiles),
          and our engine instantly returns every valid word grouped by length with Scrabble point values shown.
        </p>
      </section>
    </div>
  )
}
