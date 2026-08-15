import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Mahadev Listening Room',
    template: '%s | Mahadev Listening Room',
  },
  description: 'A calm devotional listening room for Shiva bhajans, mantras, and songs shared through YouTube embeds.',
  keywords: ['Mahadev', 'Shiva songs', 'devotional music', 'bhajan', 'mantra', 'listening room'],
  authors: [{ name: 'Pruthvirajsinh Makwana', url: 'https://pruthvirajsinh.in/' }],
  creator: 'Pruthvirajsinh Makwana',
  publisher: 'Pruthvirajsinh Makwana',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Mahadev Listening Room',
    description: 'Find your stillness in the sound of Shiva.',
    type: 'website',
    siteName: 'Mahadev Listening Room',
  },
  twitter: {
    card: 'summary',
    title: 'Mahadev Listening Room',
    description: 'A calm devotional listening room for Shiva music.',
  },
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://www.youtube.com" />
        <script src="https://www.youtube.com/iframe_api" async />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
