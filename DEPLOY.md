# WordUnscramble — Deployment, SEO & Monetization Guide

## Quick Deploy to Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. In the project root
vercel

# 3. Follow prompts → it auto-detects Next.js
# 4. Your site goes live at yourproject.vercel.app
# 5. Add a custom domain in the Vercel dashboard
```

---

## Step 1 — Update Your Domain

In `src/lib/seo.ts`, change:
```ts
export const SITE_URL = 'https://word-unscrambler-tan.vercel.app'
```
to your actual Vercel / custom domain. This affects:
- All canonical URLs
- Open Graph tags
- Sitemap URLs
- robots.txt host

---

## Step 2 — Google Search Console Setup

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → enter your domain
3. Verify via HTML tag → copy the token value
4. In `src/app/layout.tsx`, replace:
   ```ts
   google: 'REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN'
   ```
   with your token
5. Deploy → click Verify in Search Console
6. Submit your sitemap: `https://yourdomain.com/sitemap.xml`

---

## Step 3 — Google AdSense Setup

### Getting Approved
1. Sign up at [google.com/adsense](https://www.google.com/adsense)
2. Add your deployed Vercel domain
3. Paste their verification code snippet (you'll add it to layout.tsx)
4. Wait for approval (usually 1–14 days for new sites)
5. Your site needs real content and traffic — the tools are enough for v1

### After Approval — Activating Ads

**A. Set your Publisher ID** in `src/components/AdSlot.tsx`:
```ts
const PUBLISHER_ID = 'ca-pub-1234567890123456'  // your real ID
const ADS_ENABLED = true  // flip this to activate
```

**B. Uncomment the AdSense script** in `src/app/layout.tsx`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous" />
```

**C. Create Ad Units in AdSense Dashboard**
Go to Ads → By ad unit → Display ads. Create one unit per placement:

| Page | Placement | Slot Variable | Recommended Format |
|------|-----------|--------------|-------------------|
| Home | Top banner | 1111111111 | Leaderboard (728×90) |
| Home | Mid results | 2222222222 | Rectangle (336×280) |
| Home | Bottom | 3333333333 | Responsive |
| Dictionary | Top | 4444444444 | Responsive |
| Dictionary | Mid | 5555555555 | Rectangle |
| Descrambler | Top | 6666666666 | Responsive |
| Descrambler | Bottom | 7777777777 | Responsive |
| Scrambler | Top | 8888888888 | Responsive |
| Scrambler | Bottom | 9999999999 | Responsive |
| Anagram | Top | 1010101010 | Responsive |
| Anagram | Mid | 2020202020 | Responsive |
| Anagram | Bottom | 3030303030 | Responsive |
| Random Words | Top | 4040404040 | Responsive |
| Random Words | Bottom | 5050505050 | Responsive |
| Wordle | Top | 6060606060 | Responsive |
| Wordle | Bottom | 7070707070 | Responsive |

**D. Replace placeholder slot IDs** in each client file with your real slot IDs from the table above.

### Auto Ads (Alternative)
Instead of manual placement, you can enable AdSense Auto Ads which automatically places ads across your site. Just activate the AdSense script and turn on Auto Ads in your dashboard. You can then remove individual `<AdSlot />` components.

---

## Step 4 — Google Analytics 4

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a GA4 property for your domain
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)
4. Uncomment the GA4 section in `src/app/layout.tsx`
5. Replace `G-XXXXXXXXXX` with your real ID

---

## SEO Strategy — Keyword Targets

### High Priority Pages (target these first)

| Page | Primary Keyword | Est. Monthly Volume | Competition |
|------|----------------|--------------------|-----------| 
| Home (/) | word unscrambler | 165,000/mo | High |
| /wordle-solver | wordle solver | 110,000/mo | High |
| /anagram-solver | anagram solver | 60,000/mo | Medium |
| /random-word-generator | random word generator | 90,000/mo | Medium |
| /check-dictionary | word checker | 40,000/mo | Medium |
| /word-descrambler | word descrambler | 22,000/mo | Low-Medium |
| /word-scrambler | word scrambler | 12,000/mo | Low |

### Long-tail Keywords (easier to rank, target in blog posts)
- "unscramble [letters]" — e.g. "unscramble aelrst" (very high intent)
- "words that can be made from [letters]"
- "wordle answer [date]"
- "anagram of [word]"
- "is [word] a scrabble word"

---

## On-Page SEO Checklist

- [x] Unique title tag per page (50–60 characters)
- [x] Unique meta description per page (150–160 characters)
- [x] Keywords array per page
- [x] Canonical URLs
- [x] Open Graph tags (Facebook/LinkedIn sharing)
- [x] Twitter Card tags
- [x] Structured data (WebApplication schema)
- [x] FAQ schema (rich results in search)
- [x] Breadcrumb schema
- [x] Sitemap.xml (auto-generated at /sitemap.xml)
- [x] Robots.txt (at /robots.txt)
- [x] PWA manifest
- [x] Security headers (via vercel.json)
- [x] Redirect aliases (/anagram → /anagram-solver etc.)
- [ ] OG image (1200×630px) — create at /public/og-image.png
- [ ] Favicon + app icons — add to /public/
- [ ] Google Search Console verified
- [ ] Sitemap submitted to Search Console

---

## Content Strategy to Drive Traffic

### Phase 1 (Launch — Month 1-2)
- Submit sitemap to Google Search Console
- Share on Reddit: r/wordgames, r/scrabble, r/wordle
- Post in word game Facebook groups
- Tweet daily Wordle hints linking to your solver

### Phase 2 (Growth — Month 3-6)
- Add a blog section with articles like:
  - "Best 7-letter Scrabble words to memorize"
  - "Wordle strategy: the best starting words"
  - "Common anagram pairs in English"
  - "Words with Q but no U — the complete list"
- Target "[game] answers today" queries with daily content

### Phase 3 (Scale — Month 6+)
- Add dynamic pages: /words/[letters] (unscramble results as indexable pages)
- Add language support (Spanish, French unscrambler)
- Build backlinks via word game communities

---

## Revenue Expectations (rough estimates)

| Monthly Visitors | RPM (Revenue per 1000 views) | Monthly Revenue |
|-----------------|------------------------------|----------------|
| 10,000 | $1–3 | $10–30 |
| 50,000 | $1–3 | $50–150 |
| 100,000 | $2–5 | $200–500 |
| 500,000 | $3–8 | $1,500–4,000 |
| 1,000,000 | $3–8 | $3,000–8,000 |

RPM improves as you grow, optimize ad placement, and attract higher-value visitors (US/UK/AU audiences earn more per click).

---

## Performance Tips for Better Ad Revenue

1. **Page speed** — AdSense rewards fast sites with better ad quality. Use Vercel's edge network.
2. **Session depth** — Link between tools so users visit multiple pages (more ad impressions).
3. **Return visitors** — Add a daily Wordle hint or "word of the day" to bring people back.
4. **US/UK traffic** — These users earn 3–5x more per click than other regions. Write content targeting English-language game communities.
