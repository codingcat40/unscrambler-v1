'use client'

import { useEffect, useRef } from 'react'

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Replace this with your real AdSense publisher ID after approval
// Format: ca-pub-XXXXXXXXXXXXXXXX
const PUBLISHER_ID = 'ca-pub-XXXXXXXXXXXXXXXX'

// Set to true once your AdSense account is approved and script is live
const ADS_ENABLED = false
// ─────────────────────────────────────────────────────────────────────────────

interface AdSlotProps {
  // Your ad unit slot ID from AdSense dashboard (the number after ca-pub-xxx)
  slot?: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  // Used for layout only — actual ad size is controlled by AdSense
  height?: number
  className?: string
  style?: React.CSSProperties
  label?: string
}

export default function AdSlot({
  slot,
  format = 'auto',
  height = 90,
  className,
  style,
  label = 'Advertisement',
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (!ADS_ENABLED || pushed.current) return
    try {
      // Push the ad after the component mounts
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).adsbygoogle.push({})
      pushed.current = true
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [])

  // ── PLACEHOLDER (shown until AdSense is activated) ────────────────────────
  if (!ADS_ENABLED) {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: `${height}px`,
          background: 'repeating-linear-gradient(45deg, #F5F0E8, #F5F0E8 10px, #EDE8DF 10px, #EDE8DF 20px)',
          border: '1.5px dashed #D4CFC7',
          borderRadius: '8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: '#9CA3AF',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          ...style,
        }}
      >
        Ad · {format} · slot {slot}
      </div>
    )
  }

  // ── LIVE AD ───────────────────────────────────────────────────────────────
  return (
    <div
      className={className}
      style={{ minHeight: `${height}px`, textAlign: 'center', ...style }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={format === 'auto' ? 'true' : undefined}
      />
    </div>
  )
}
