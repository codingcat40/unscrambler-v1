'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { checkDictionary } from '@/lib/wordEngine'
import AdSlot from '@/components/AdSlot'

export default function DictionaryClient() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<{ valid: boolean; word: string } | null>(null)
  const [history, setHistory] = useState<Array<{ word: string; valid: boolean }>>([])
  const [isChecking, setIsChecking] = useState(false)
  const [checkError, setCheckError] = useState<string | null>(null)

  const handleCheck = async () => {
    if (!input.trim()) return
    setIsChecking(true)
    setCheckError(null)
    try {
      const res = await checkDictionary(input.trim())
      setResult(res)
      setHistory(prev => [{ word: res.word, valid: res.valid }, ...prev.slice(0, 9)])
    } catch (err) {
      setCheckError((err as Error).message || 'Check failed. Please try again.')
    } finally {
      setIsChecking(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCheck()
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
      {/* Header */}
      <section style={{ textAlign: 'center', padding: '3rem 1rem 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📖</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          marginBottom: '0.75rem',
        }}>
          Dictionary Checker
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: '400px', margin: '0 auto' }}>
          Instantly check if a word is valid in the English dictionary.
          Perfect for settling arguments in Scrabble or Words with Friends.
        </p>
      </section>

      <AdSlot slot="4444444444" format="horizontal" style={{ marginBottom: '2rem' }} />

      {/* Check box */}
      <div style={{
        background: 'white',
        border: '2px solid var(--border)',
        borderRadius: '16px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
          <input
            type="text"
            className="main-input"
            placeholder="Type a word..."
            value={input}
            onChange={e => { setInput(e.target.value.replace(/[^a-zA-Z]/g, '')); setResult(null) }}
            onKeyDown={handleKeyDown}
            maxLength={30}
            autoFocus
            autoComplete="off"
            style={{ fontSize: '1.25rem', textAlign: 'left', flex: 1 }}
          />
          <button
            className="btn-primary btn-teal"
            onClick={handleCheck}
            disabled={!input.trim()}
            style={{ whiteSpace: 'nowrap', padding: '0 1.5rem' }}
          >
            Check Word
          </button>
        </div>

        {/* Result */}
        {result && (
          <div
            className="pop-in"
            style={{
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center',
              background: result.valid ? '#ECFDF5' : '#FEF2F2',
              border: `2px solid ${result.valid ? '#6EE7B7' : '#FCA5A5'}`,
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
              {result.valid ? '✅' : '❌'}
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.25rem',
              color: result.valid ? '#065F46' : '#991B1B',
            }}>
              {result.word}
            </div>
            <div style={{
              fontWeight: 600,
              fontSize: '1.1rem',
              color: result.valid ? '#065F46' : '#991B1B',
            }}>
              {result.valid
                ? '✓ Valid word — found in dictionary!'
                : '✗ Not found in the dictionary'}
            </div>
            <p style={{
              fontSize: '0.85rem',
              color: result.valid ? '#065F46' : '#991B1B',
              marginTop: '0.5rem',
              opacity: 0.8,
            }}>
              {result.valid
                ? 'This word is accepted in Scrabble (TWL/SOWPODS) and standard English dictionaries.'
                : 'This word was not found. Check spelling or try a variation.'}
            </p>
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div style={{
          background: 'white',
          border: '1.5px solid var(--border)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.1rem',
            marginBottom: '1rem',
          }}>
            Recent Checks
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {history.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: 'var(--cream)',
                  cursor: 'pointer',
                }}
                onClick={() => { setInput(item.word); setResult(null) }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '0.9rem',
                }}>
                  {item.word}
                </span>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: item.valid ? '#065F46' : '#991B1B',
                  background: item.valid ? '#D1FAE5' : '#FEE2E2',
                  padding: '2px 10px',
                  borderRadius: '999px',
                }}>
                  {item.valid ? '✓ Valid' : '✗ Invalid'}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setHistory([])}
            style={{
              marginTop: '10px',
              background: 'none',
              border: 'none',
              fontSize: '0.8rem',
              color: 'var(--muted)',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Clear history
          </button>
        </div>
      )}

      <AdSlot slot="5555555555" format="rectangle" style={{ margin: '0 auto 2rem', display: 'block' }} />

      {/* Info */}
      <div style={{
        background: 'white',
        border: '1.5px solid var(--border)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
      }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.75rem' }}>
          About Our Dictionary
        </h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.9rem' }}>
          Our word list includes words from the TWL (Tournament Word List) used in North American Scrabble competitions,
          as well as SOWPODS used in UK Scrabble. We also cover standard everyday English words across all major dialects.
          Words are checked against a curated database of thousands of valid English words.
        </p>
      </div>
    </div>
  )
}
