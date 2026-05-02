'use client'

import { useState } from 'react'
import { generateRandomWords, getWordScore } from '@/lib/wordEngine'
import AdSlot from '@/components/AdSlot'

const LENGTHS = [2, 3, 4, 5, 6, 7, 8]
const COUNTS = [5, 10, 15, 20, 25]

export default function RandomWordsClient() {
  const [length, setLength] = useState<number | undefined>(undefined)
  const [count, setCount] = useState(10)
  const [startsWith, setStartsWith] = useState('')
  const [words, setWords] = useState<string[]>([])
  const [hasGenerated, setHasGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [genError, setGenError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setGenError(null)
    try {
      const result = await generateRandomWords({ length, count, startsWith: startsWith || undefined })
      setWords(result)
      setHasGenerated(true)
    } catch (err) {
      setGenError((err as Error).message || 'Generation failed. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyAll = () => {
    navigator.clipboard.writeText(words.join('\n')).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const copyWord = (word: string) => {
    navigator.clipboard.writeText(word)
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
      <section style={{ textAlign: 'center', padding: '3rem 1rem 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          marginBottom: '0.75rem',
        }}>
          Random Word Generator
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: '420px', margin: '0 auto' }}>
          Generate random English words by length, count, or starting letter.
          Ideal for brainstorming, games, and vocabulary building.
        </p>
      </section>

      <AdSlot slot="4040404040" format="horizontal" style={{ marginBottom: '2rem' }} />

      {/* Controls */}
      <div style={{
        background: 'white',
        border: '2px solid var(--border)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '1.5rem',
        }}>
          {/* Word length */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--muted)',
              marginBottom: '0.75rem',
            }}>
              Word Length
            </label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setLength(undefined)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '8px',
                  border: '1.5px solid',
                  borderColor: length === undefined ? 'var(--ink)' : 'var(--border)',
                  background: length === undefined ? 'var(--ink)' : 'transparent',
                  color: length === undefined ? 'white' : 'var(--ink)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                Any
              </button>
              {LENGTHS.map(l => (
                <button
                  key={l}
                  onClick={() => setLength(l)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '8px',
                    border: '1.5px solid',
                    borderColor: length === l ? 'var(--amber)' : 'var(--border)',
                    background: length === l ? 'var(--amber)' : 'transparent',
                    color: length === l ? 'white' : 'var(--ink)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--muted)',
              marginBottom: '0.75rem',
            }}>
              How Many Words
            </label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {COUNTS.map(c => (
                <button
                  key={c}
                  onClick={() => setCount(c)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '8px',
                    border: '1.5px solid',
                    borderColor: count === c ? 'var(--teal)' : 'var(--border)',
                    background: count === c ? 'var(--teal)' : 'transparent',
                    color: count === c ? 'white' : 'var(--ink)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Starts with */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--muted)',
              marginBottom: '0.75rem',
            }}>
              Starts With (Optional)
            </label>
            <input
              type="text"
              value={startsWith}
              onChange={e => setStartsWith(e.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase())}
              placeholder="e.g. sp"
              maxLength={4}
              style={{
                padding: '8px 12px',
                border: '1.5px solid var(--border)',
                borderRadius: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                width: '100%',
                outline: 'none',
                color: 'var(--ink)',
              }}
            />
          </div>
        </div>

        <button
          className="btn-primary btn-amber"
          onClick={handleGenerate}
          style={{ width: '100%', fontSize: '1.05rem', padding: '0.9rem' }}
        >
          {isGenerating ? 'Generating...' : `🎯 Generate ${count} Random Word${count !== 1 ? 's' : ''}`}
        </button>
      </div>

      {/* Results */}
      {hasGenerated && (
        <div style={{
          background: 'white',
          border: '2px solid var(--border)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
              {words.length > 0 ? `${words.length} Random Words` : 'No words match your filters'}
            </h2>
            {words.length > 0 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn-primary btn-teal"
                  onClick={handleGenerate}
                  style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                >
                  🔄 Regenerate
                </button>
                <button
                  className="btn-primary"
                  onClick={handleCopyAll}
                  style={{ padding: '6px 14px', fontSize: '0.85rem', background: copied ? 'var(--teal)' : 'var(--ink)' }}
                >
                  {copied ? '✓ Copied!' : '📋 Copy All'}
                </button>
              </div>
            )}
          </div>

          {words.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '8px',
            }}>
              {words.map((word, i) => (
                <button
                  key={`${word}-${i}`}
                  onClick={() => copyWord(word)}
                  className="pop-in"
                  title={`Score: ${getWordScore(word)} — Click to copy`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    background: 'var(--cream)',
                    border: '1.5px solid var(--border)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'var(--ink)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    transition: 'all 0.15s',
                    animationDelay: `${i * 0.03}s`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--amber-light)'; e.currentTarget.style.borderColor = 'var(--amber)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--cream)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  <span>{word}</span>
                  <span style={{
                    background: 'var(--amber)',
                    color: 'white',
                    borderRadius: '999px',
                    padding: '2px 6px',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                  }}>
                    {getWordScore(word)}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--muted)', padding: '2rem' }}>
              No words match. Try relaxing your filters.
            </p>
          )}
        </div>
      )}

      <AdSlot slot="5050505050" format="horizontal" style={{ marginBottom: '2rem' }} />
    </div>
  )
}
