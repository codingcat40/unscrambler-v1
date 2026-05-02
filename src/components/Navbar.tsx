'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/', label: 'Unscrambler', emoji: '🔀' },
  { href: '/check-dictionary', label: 'Dictionary', emoji: '📖' },
  { href: '/word-descrambler', label: 'Descrambler', emoji: '🧩' },
  { href: '/word-scrambler', label: 'Scrambler', emoji: '🎲' },
  { href: '/anagram-solver', label: 'Anagrams', emoji: '🔄' },
  { href: '/random-word-generator', label: 'Random Words', emoji: '🎯' },
  { href: '/wordle-solver', label: 'Wordle Solver', emoji: '🟩' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(250, 250, 247, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1.5px solid var(--border)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px',
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex',
              gap: '3px',
            }}>
              {['W','U'].map((l, i) => (
                <span key={i} className="letter-tile" style={{
                  width: '28px',
                  height: '28px',
                  fontSize: '0.75rem',
                  background: i === 0 ? 'var(--amber)' : 'var(--teal)',
                  color: 'white',
                  borderRadius: '5px',
                  boxShadow: i === 0 ? '0 2px 0 var(--amber-dark)' : '0 2px 0 var(--teal-dark)',
                }}>
                  {l}
                </span>
              ))}
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.15rem',
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
            }}>
              WordUnscramble
            </span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }} className="hidden-mobile">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                style={{ fontSize: '0.8rem' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
            }}
            className="show-mobile"
            aria-label="Toggle menu"
          >
            <span style={{ width: '22px', height: '2px', background: 'var(--ink)', display: 'block', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
            <span style={{ width: '22px', height: '2px', background: 'var(--ink)', display: 'block', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ width: '22px', height: '2px', background: 'var(--ink)', display: 'block', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--paper)',
            padding: '0.75rem 1.5rem',
          }}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', marginBottom: '2px' }}
                onClick={() => setMenuOpen(false)}
              >
                <span>{link.emoji}</span>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}
