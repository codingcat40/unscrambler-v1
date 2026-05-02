import type { Metadata } from 'next'
import Script from 'next/script'
import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { PAGE_SEO, SITE_NAME, SITE_URL, OG_DEFAULTS, TWITTER_DEFAULTS } from '@/lib/seo'

// REPLACE with your real AdSense publisher ID after approval
// Format: ca-pub-XXXXXXXXXXXXXXXX
const ADSENSE_PUBLISHER_ID = 'ca-pub-XXXXXXXXXXXXXXXX'

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: PAGE_SEO.home.title,
  },
  description: PAGE_SEO.home.description,
  keywords: PAGE_SEO.home.keywords,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    ...OG_DEFAULTS,
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    url: SITE_URL,
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    title: PAGE_SEO.home.title,
    description: PAGE_SEO.home.description,
    images: [`${SITE_URL}/og-image.png`],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  verification: {
    google: 'REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN',
  },
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'tools',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense — uncomment after publisher approval */}
        {/* <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`} crossOrigin="anonymous" /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <meta name="google-site-verification" content="XHEps6Pv-NTnCdXAuAgqYXmp3H3XbyaGLx6C7tTp284" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* GA4 — uncomment after setting up property */}
        {/* <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" /> */}
        {/* <Script id="gtag" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');`}</Script> */}
      </body>
    </html>
  )
}
