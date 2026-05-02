'use client'

import { useState } from 'react'
import { solveWordle } from '@/lib/wordEngine'
import AdSlot from '@/components/AdSlot'

type TileState = 'empty' | 'absent' | 'present' | 'correct'

const WORDLE_LENGTH = 5

export default function WordleClient() {
  const [pattern, setPattern] = useState<string[]>(Array(WORDLE_LENGTH).fill(''))
  const [tileStates, setTileStates] = useState<TileState[]>(Array(WORDLE_LENGTH).fill('empty'))
  const [absentInput, setAbsentInput] = useState('')
  const [results, setResults] = useState<string[] | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [wordleError, setWordleError] = useState<string | null>(null)

  const STATE_COLORS: Record<TileState, { bg: string; text: string; label: string }> = {
    empty: { bg: 'white', text: 'var(--muted)', label: 'Unknown' },
    correct: { bg: '#22C55E', text: 'white', label: 'Correct position' },
    present: { bg: '#F59E0B', text: 'white', label: 'Wrong position' },
    absent: { bg: '#6B7280', text: 'white', label: 'Not in word' },
  }

  const STATE_ORDER: TileState[] = ['empty', 'correct', 'present', 'absent']

  const cycleTileState = (index: number) => {
    if (!pattern[index]) return
    const current = tileStates[index]
    const next = STATE_ORDER[(STATE_ORDER.indexOf(current) + 1) % STATE_ORDER.length]
    const newStates = [...tileStates]
    newStates[index] = next
    setTileStates(newStates)
  }

  const setLetter = (index: number, letter: string) => {
    const newPattern = [...pattern]
    const newStates = [...tileStates]
    newPattern[index] = letter.toLowerCase()
    if (!letter) newStates[index] = 'empty'
    setPattern(newPattern)
    setTileStates(newStates)
  }

  const handleSolve = async () => {
    setIsSearching(true)
    setWordleError(null)
    try {
      const patternStr = pattern.map((l, i) => tileStates[i] === 'correct' ? l || '_' : '_').join('')
      const presentLetters = pattern.filter((l, i) => l && tileStates[i] === 'present')
      const absentLetters = absentInput.toLowerCase().split('').filter(Boolean)

      const found = await solveWordle({
        pattern: patternStr,
        presentLetters,
        absentLetters,
      })
      setResults(found)
    } catch (err) {
      setWordleError((err as Error).message || 'Solver failed. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const handleReset = () => {
    setPattern(Array(WORDLE_LENGTH).fill(''))
    setTileStates(Array(WORDLE_LENGTH).fill('empty'))
    setAbsentInput('')
    setResults(null)
  }

  const copyWord = (word: string) => navigator.clipboard.writeText(word)

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
      <section style={{ textAlign: 'center', padding: '3rem 1rem 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🟩</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          marginBottom: '0.75rem',
        }}>
          Wordle Solver
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: '460px', margin: '0 auto' }}>
          Stuck on today's Wordle? Enter your clues and let us find the answer.
          Enter letters, then click each tile to set its color.
        </p>
      </section>

      <AdSlot slot="6060606060" format="horizontal" style={{ marginBottom: '2rem' }} />

      {/* Color legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '1.5rem',
      }}>
        {(Object.entries(STATE_COLORS) as [TileState, typeof STATE_COLORS[TileState]][]).filter(([s]) => s !== 'empty').map(([state, cfg]) => (
          <div key={state} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
            <div style={{
              width: '20px', height: '20px',
              background: cfg.bg,
              borderRadius: '4px',
              border: state === 'empty' ? '2px solid var(--border)' : 'none',
            }} />
            <span style={{ color: 'var(--muted)' }}>{cfg.label}</span>
          </div>
        ))}
      </div>

      {/* Wordle grid */}
      <div style={{
        background: 'white',
        border: '2px solid var(--border)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '1.5rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>
        <p style={{
          fontSize: '0.8rem',
          color: 'var(--muted)',
          textAlign: 'center',
          marginBottom: '1.25rem',
          fontWeight: 500,
        }}>
          Type letters in each box, then click the tile to cycle through colors
        </p>

        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          marginBottom: '1.5rem',
        }}>
          {pattern.map((letter, i) => {
            const state = tileStates[i]
            const cfg = STATE_COLORS[state]
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <input
                  type="text"
                  maxLength={1}
                  value={letter.toUpperCase()}
                  onChange={e => setLetter(i, e.target.value.replace(/[^a-zA-Z]/g, ''))}
                  style={{
                    width: '52px',
                    height: '52px',
                    textAlign: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '1.4rem',
                    textTransform: 'uppercase',
                    border: '2.5px solid var(--border)',
                    borderRadius: '8px',
                    outline: 'none',
                    background: 'white',
                    color: 'var(--ink)',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--teal)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
                <button
                  onClick={() => cycleTileState(i)}
                  disabled={!letter}
                  style={{
                    width: '52px',
                    height: '52px',
                    background: cfg.bg,
                    color: cfg.text,
                    border: state === 'empty' ? '2.5px solid var(--border)' : 'none',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    fontSize: '1.4rem',
                    textTransform: 'uppercase',
                    cursor: letter ? 'pointer' : 'not-allowed',
                    boxShadow: state !== 'empty' ? `0 3px 0 ${state === 'correct' ? '#16A34A' : state === 'present' ? '#B45309' : '#4B5563'}` : 'none',
                    transition: 'all 0.15s',
                    opacity: letter ? 1 : 0.4,
                  }}
                  title={`Click to change: ${cfg.label}`}
                >
                  {letter.toUpperCase() || '?'}
                </button>
                <span style={{ fontSize: '0.6rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {state === 'empty' ? '?' : state.slice(0, 3)}
                </span>
              </div>
            )
          })}
        </div>

        {/* Absent letters */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--muted)',
            marginBottom: '8px',
          }}>
            Letters NOT in the word (grey tiles from previous guesses)
          </label>
          <input
            type="text"
            value={absentInput}
            onChange={e => setAbsentInput(e.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase())}
            placeholder="e.g. aetoi"
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1.5px solid var(--border)',
              borderRadius: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              letterSpacing: '0.1em',
              outline: 'none',
              color: 'var(--ink)',
              textTransform: 'uppercase',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn-primary btn-teal"
            onClick={handleSolve}
            disabled={isSearching}
            style={{ flex: 1, fontSize: '1rem', padding: '0.9rem' }}
          >
            {isSearching ? 'Searching...' : '🟩 Find Solutions'}
          </button>
          <button
            className="btn-primary"
            onClick={handleReset}
            style={{ padding: '0.9rem 1.25rem', background: 'var(--muted)' }}
          >
            Reset
          </button>
        </div>
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
            {results.length > 0
              ? `${results.length} Possible Solution${results.length !== 1 ? 's' : ''}`
              : 'No words match those clues'}
          </h2>

          {results.length > 0 ? (
            <>
              {results.length === 1 && (
                <div style={{
                  background: '#ECFDF5',
                  border: '2px solid #6EE7B7',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  textAlign: 'center',
                  marginBottom: '1rem',
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '2rem', color: '#065F46', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    {results[0]}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#065F46', marginTop: '0.5rem' }}>The answer is almost certainly this word!</p>
                </div>
              )}
              <div className="words-grid">
                {results.map((word, i) => (
                  <button
                    key={word}
                    onClick={() => copyWord(word)}
                    className="word-chip pop-in"
                    style={{ animationDelay: `${i * 0.03}s` }}
                  >
                    {word}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--muted)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔍</div>
              <p>Try removing some constraints or double-checking your clues.</p>
            </div>
          )}
        </div>
      )}

      <AdSlot slot="7070707070" format="horizontal" style={{ marginBottom: '2rem' }} />
    </div>
  )
}
