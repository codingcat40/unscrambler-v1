'use client'

import { useState } from 'react'
import { scrambleWord } from '@/lib/wordEngine'
import AdSlot from '@/components/AdSlot'

export default function ScramblerClient() {
  const [input, setInput] = useState('')
  const [scrambled, setScrambled] = useState('')
  const [history, setHistory] = useState<Array<{ original: string; scrambled: string }>>([])
  const [copied, setCopied] = useState(false)

  const handleScramble = () => {
    if (!input.trim()) return
    const result = scrambleWord(input.trim())
    setScrambled(result)
    setHistory(prev => [{ original: input.trim().toLowerCase(), scrambled: result }, ...prev.slice(0, 7)])
  }

  const handleReshuffle = () => {
    if (!input.trim()) return
    const result = scrambleWord(input.trim())
    setScrambled(result)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(scrambled).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleScramble()
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
      <section style={{ textAlign: 'center', padding: '3rem 1rem 2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎲</div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          marginBottom: '0.75rem',
        }}>
          Word Scrambler
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: '400px', margin: '0 auto' }}>
          Scramble any word into a random jumble. Great for creating word puzzles,
          games, and brain teasers.
        </p>
      </section>

      <AdSlot slot="8888888888" format="horizontal" style={{ marginBottom: '2rem' }} />

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
            placeholder="Enter a word to scramble..."
            value={input}
            onChange={e => { setInput(e.target.value.replace(/[^a-zA-Z ]/g, '')); setScrambled('') }}
            onKeyDown={handleKeyDown}
            maxLength={30}
            autoFocus
            style={{ fontSize: '1.15rem', textAlign: 'left', flex: 1 }}
          />
          <button
            className="btn-primary btn-amber"
            onClick={handleScramble}
            disabled={!input.trim()}
            style={{ whiteSpace: 'nowrap', padding: '0 1.5rem' }}
          >
            🎲 Scramble
          </button>
        </div>

        {scrambled && (
          <div className="pop-in" style={{
            textAlign: 'center',
            padding: '2rem',
            background: 'var(--cream)',
            borderRadius: '12px',
            border: '2px solid var(--border)',
          }}>
            <div style={{ marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)' }}>
                Original
              </span>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.1rem',
                color: 'var(--muted)',
                textDecoration: 'line-through',
                marginTop: '2px',
              }}>
                {input}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--amber-dark)' }}>
                Scrambled!
              </span>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '6px',
                flexWrap: 'wrap',
                marginTop: '10px',
              }}>
                {scrambled.toUpperCase().split('').map((l, i) => (
                  <span key={i} className="letter-tile tile-amber pop-in" style={{ animationDelay: `${i * 0.05}s` }}>
                    {l}
                  </span>
                ))}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: 'var(--muted)',
                marginTop: '8px',
              }}>
                {scrambled.toUpperCase()}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary btn-amber" onClick={handleReshuffle} style={{ padding: '8px 20px' }}>
                🔄 Reshuffle
              </button>
              <button
                className="btn-primary"
                onClick={handleCopy}
                style={{ padding: '8px 20px', background: copied ? 'var(--teal)' : 'var(--ink)' }}
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
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
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>
            Recent Scrambles
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {history.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'var(--cream)',
                gap: '12px',
                flexWrap: 'wrap',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--muted)' }}>
                  {item.original}
                </span>
                <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>→</span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--amber-dark)',
                }}>
                  {item.scrambled.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <AdSlot slot="9999999999" format="horizontal" style={{ marginBottom: '2rem' }} />

      <div style={{
        background: 'white',
        border: '1.5px solid var(--border)',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
      }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.75rem' }}>
          Uses for the Word Scrambler
        </h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.9rem' }}>
          Our word scrambler is perfect for teachers creating spelling exercises, puzzle designers making word games,
          party hosts setting up word challenges, or anyone who wants to create a fun brain-teasing activity.
          Just enter any word and click Scramble — then reshuffle as many times as you like until you get a satisfying jumble.
        </p>
      </div>
    </div>
  )
}
