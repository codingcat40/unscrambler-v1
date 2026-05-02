'use client'

import { useState } from 'react'
import { getWordScore } from '@/lib/wordEngine'

interface WordResultsProps {
  results: Record<number, string[]>
  totalWords: number
}

export default function WordResults({ results, totalWords }: WordResultsProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [filter, setFilter] = useState<'all' | number>('all')

  const lengths = Object.keys(results).map(Number).sort((a, b) => b - a)

  const copyWord = (word: string) => {
    navigator.clipboard.writeText(word).then(() => {
      setCopied(word)
      setToastMsg(`"${word}" copied!`)
      setShowToast(true)
      setTimeout(() => { setCopied(null); setShowToast(false) }, 2000)
    })
  }

  const copyAll = () => {
    const allWords = Object.values(results).flat().join(', ')
    navigator.clipboard.writeText(allWords).then(() => {
      setToastMsg(`${totalWords} words copied!`)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    })
  }

  const filteredLengths = filter === 'all' ? lengths : lengths.filter(l => l === filter)

  if (totalWords === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem 1rem',
        color: 'var(--muted)',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤔</div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem' }}>
          No words found
        </p>
        <p style={{ fontSize: '0.9rem' }}>Try adding more letters or using wildcards (? or *)</p>
      </div>
    )
  }

  return (
    <div>
      {/* Stats & controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '1.5rem',
      }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="stat-pill">
            <span style={{ fontWeight: 700, color: 'var(--amber-dark)' }}>{totalWords}</span> words found
          </span>
          <span className="stat-pill">
            <span style={{ fontWeight: 700 }}>{lengths.length}</span> lengths
          </span>
          {lengths[0] && (
            <span className="stat-pill">
              Best: <strong>{results[lengths[0]][0]}</strong>
              <span style={{
                background: 'var(--amber)',
                color: 'white',
                borderRadius: '999px',
                padding: '1px 6px',
                fontSize: '0.7rem',
                fontWeight: 700,
              }}>
                {getWordScore(results[lengths[0]][0])} pts
              </span>
            </span>
          )}
        </div>

        <button onClick={copyAll} style={{
          background: 'none',
          border: '1.5px solid var(--border)',
          borderRadius: '8px',
          padding: '6px 14px',
          fontSize: '0.8rem',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          color: 'var(--ink)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--cream)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >
          📋 Copy All
        </button>
      </div>

      {/* Length filter tabs */}
      <div style={{
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
        marginBottom: '1.5rem',
      }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            padding: '4px 12px',
            borderRadius: '999px',
            border: '1.5px solid',
            borderColor: filter === 'all' ? 'var(--ink)' : 'var(--border)',
            background: filter === 'all' ? 'var(--ink)' : 'transparent',
            color: filter === 'all' ? 'var(--paper)' : 'var(--ink)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          All
        </button>
        {lengths.map(len => (
          <button
            key={len}
            onClick={() => setFilter(len)}
            style={{
              padding: '4px 12px',
              borderRadius: '999px',
              border: '1.5px solid',
              borderColor: filter === len ? 'var(--amber)' : 'var(--border)',
              background: filter === len ? 'var(--amber)' : 'transparent',
              color: filter === len ? 'white' : 'var(--ink)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {len} letters <span style={{ opacity: 0.7, fontWeight: 400 }}>({results[len].length})</span>
          </button>
        ))}
      </div>

      {/* Word groups */}
      {filteredLengths.map((len, groupIdx) => (
        <div
          key={len}
          className="slide-up"
          style={{ marginBottom: '1.75rem', animationDelay: `${groupIdx * 0.05}s` }}
        >
          <div className="length-header">
            {len}-letter words <span style={{ fontWeight: 400, marginLeft: '4px' }}>({results[len].length})</span>
          </div>
          <div className="words-grid">
            {results[len].map((word, i) => (
              <button
                key={word}
                onClick={() => copyWord(word)}
                className="word-chip"
                title={`Score: ${getWordScore(word)} pts — Click to copy`}
                style={{ animationDelay: `${i * 0.02}s` }}
              >
                {word}
                <span className="score-badge">{getWordScore(word)}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Toast */}
      <div className={`copy-toast ${showToast ? 'visible' : ''}`}>
        ✓ {toastMsg}
      </div>
    </div>
  )
}
