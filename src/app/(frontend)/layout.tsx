import type { Metadata } from 'next';
import {
  Inter,
  Roboto,
  Open_Sans,
  Montserrat,
  Kaushan_Script,
  Delius_Swash_Caps,
  Poppins,
  Caveat,
  Courgette,
  Mynerve,
  Fuzzy_Bubbles,
} from 'next/font/google';
import React from 'react';

import { AdminBar } from '@/components/AdminBar';
import { Footer } from '@/Footer/Component';
import { Header } from '@/Header/Component';
import { Providers } from '@/providers';
import { InitTheme } from '@/providers/Theme/InitTheme';
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph';
import { draftMode } from 'next/headers';

import './globals.css';
import { getServerSideURL } from '@/utilities/getURL';
import ScrollToTop from '@/components/ui/scrolltotop';

export const inter = Inter({ subsets: ['latin'] });
export const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});
export const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});
export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});
export const kaushanScript = Kaushan_Script({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kaushan-script',
});
export const delius = Delius_Swash_Caps({
  subsets: ['latin'],
  variable: '--font-delius',
  weight: '400'
});
export const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: '100'
});
export const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat',
});
export const courgette = Courgette({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-courgette',
});
export const mynerve = Mynerve({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mynerve',
});

export const fuzzyBubbles = Fuzzy_Bubbles({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-fuzzy-bubbles',
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode();

  return (
    <html
      className={`${inter.className} ${roboto.variable} ${openSans.variable} ${montserrat.variable} ${kaushanScript.variable} ${delius.variable} ${poppins.variable} ${caveat.variable} ${courgette.variable} ${mynerve.variable} ${fuzzyBubbles.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
        <ScrollToTop />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
};
