'use client'

import Link from 'next/link'

const LINKS = [
  { href: '/', label: 'Word Unscrambler' },
  { href: '/check-dictionary', label: 'Dictionary' },
  { href: '/word-descrambler', label: 'Descrambler' },
  { href: '/word-scrambler', label: 'Scrambler' },
  { href: '/anagram-solver', label: 'Anagram Solver' },
  { href: '/random-word-generator', label: 'Random Words' },
  { href: '/wordle-solver', label: 'Wordle Solver' },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1.5px solid var(--border)',
      background: 'var(--cream)',
      padding: '3rem 1.5rem 2rem',
      marginTop: '4rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          {/* Brand */}
          <div style={{ maxWidth: '280px' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.25rem',
              marginBottom: '0.75rem',
            }}>
              WordUnscramble
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>
              Fast, clean word tools for Scrabble, Wordle, Words with Friends and every word game you love.
            </p>
          </div>

          {/* Tools */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.75rem',
              color: 'var(--muted)',
            }}>
              Tools
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--ink)',
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--amber-dark)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--ink)')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Games */}
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.75rem',
              color: 'var(--muted)',
            }}>
              Great For
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {['Scrabble', 'Words with Friends', 'Wordle', 'Word Cookies', 'TextTwist', 'Wordscapes', 'Anagram Games'].map(game => (
                <span key={game} style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>{game}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
            © {new Date().getFullYear()} WordUnscramble. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['Privacy Policy', 'Terms of Use', 'Contact'].map(item => (
              <a
                key={item}
                href="#"
                style={{ fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'none' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
