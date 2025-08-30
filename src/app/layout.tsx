import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import PageWrapper from "./components/PageWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
  colorScheme: 'dark light',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://rafaelrafael.com'),
  title: {
    default: "RafaelRafael - Contemporary Artist & Painter | Rafael Acevedo Art",
    template: "%s | RafaelRafael - Contemporary Artist"
  },
  description: "Discover the artistic world of RafaelRafael (Rafael Acevedo), contemporary artist creating stunning Art Deco paintings, abstract art, and interior design pieces. Experience original artwork and visual storytelling.",
  keywords: [
    "RafaelRafael",
    "Rafael Acevedo", 
    "contemporary artist",
    "Art Deco paintings",
    "abstract art",
    "interior design art",
    "original paintings",
    "visual storytelling",
    "fine art",
    "modern art",
    "artist portfolio"
  ],
  authors: [{ name: "Rafael Acevedo", url: "https://rafaelrafael.com" }],
  creator: "Rafael Acevedo",
  publisher: "RafaelRafael",
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
    type: 'website',
    locale: 'en_US',
    url: 'https://rafaelrafael.com',
    siteName: 'RafaelRafael - Contemporary Artist',
    title: 'RafaelRafael - Contemporary Artist & Painter | Rafael Acevedo Art',
    description: 'Discover the artistic world of RafaelRafael (Rafael Acevedo), contemporary artist creating stunning Art Deco paintings, abstract art, and interior design pieces.',
    images: [
      {
        url: '/images/art-deco/FlyingKitesRunningCats.jpg',
        width: 1200,
        height: 630,
        alt: 'RafaelRafael - Contemporary Art by Rafael Acevedo',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RafaelRafael - Contemporary Artist & Painter',
    description: 'Discover the artistic world of RafaelRafael (Rafael Acevedo), contemporary artist creating stunning Art Deco paintings and abstract art.',
    images: ['/images/art-deco/FlyingKitesRunningCats.jpg'],
  },
  alternates: {
    canonical: 'https://rafaelrafael.com',
  },
  category: 'Arts & Culture',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://rafaelrafael.com/#person",
        name: "Rafael Acevedo",
        alternateName: "RafaelRafael",
        description: "Contemporary artist specializing in Art Deco paintings, abstract art, and interior design pieces.",
        url: "https://rafaelrafael.com",
        image: {
          "@type": "ImageObject",
          url: "https://rafaelrafael.com/images/artista.jpg",
          width: 800,
          height: 600
        },
        sameAs: [
          "https://instagram.com/rafaelartinmotion",
          "https://facebook.com/rafaelartinmotion"
        ],
        jobTitle: "Contemporary Artist & Painter",
        worksFor: {
          "@type": "Organization",
          "@id": "https://rafaelrafael.com/#organization"
        },
        knowsAbout: [
          "Art Deco Painting",
          "Abstract Art",
          "Contemporary Art",
          "Interior Design Art",
          "Visual Storytelling",
          "Fine Art"
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://rafaelrafael.com/#organization",
        name: "RafaelRafael",
        alternateName: "Rafael Acevedo Art",
        url: "https://rafaelrafael.com",
        logo: {
          "@type": "ImageObject",
          url: "https://rafaelrafael.com/images/logo.png",
          width: 400,
          height: 400
        },
        founder: {
          "@id": "https://rafaelrafael.com/#person"
        },
        foundingDate: "2020",
        description: "Contemporary art studio and gallery featuring original paintings by Rafael Acevedo, specializing in Art Deco and abstract artwork."
      },
      {
        "@type": "WebSite",
        "@id": "https://rafaelrafael.com/#website", 
        url: "https://rafaelrafael.com",
        name: "RafaelRafael - Contemporary Artist",
        description: "Official website of contemporary artist Rafael Acevedo, featuring Art Deco paintings, abstract art, and interior design pieces.",
        publisher: {
          "@id": "https://rafaelrafael.com/#organization"
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://rafaelrafael.com/?s={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html lang="en" itemScope itemType="https://schema.org/WebSite">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} antialiased`}
        itemScope 
        itemType="https://schema.org/WebPage"
      >
        <PageWrapper>
          <Header />
          <main role="main" itemProp="mainContentOfPage">
            {children}
          </main>
        </PageWrapper>
      </body>
    </html>
  );
}
