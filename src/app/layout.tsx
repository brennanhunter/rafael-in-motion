import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import PageWrapper from "./components/PageWrapper";
import { SEO_CONFIG } from "../utils/canonical";

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
  metadataBase: new URL(SEO_CONFIG.baseUrl),
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: SEO_CONFIG.titleTemplate
  },
  description: SEO_CONFIG.description,
  keywords: SEO_CONFIG.keywords,
  authors: [{ name: "Rafael Acevedo", url: SEO_CONFIG.baseUrl }],
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
    url: SEO_CONFIG.baseUrl,
    siteName: SEO_CONFIG.siteName,
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.description,
    images: [
      {
        url: SEO_CONFIG.socialImage,
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
    description: SEO_CONFIG.description,
    images: [SEO_CONFIG.socialImage],
    creator: SEO_CONFIG.twitterHandle,
  },
  alternates: {
    canonical: SEO_CONFIG.baseUrl,
    languages: {
      'en': SEO_CONFIG.baseUrl,
    },
  },
  category: 'Arts & Culture',
  other: {
    'format-detection': 'telephone=no',
    'referrer': 'strict-origin-when-cross-origin',
  },
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
        alternateName: ["RafaelRafael", "Rafael Rafael Artist", "Rafael Rafael Painter"],
        description: "RafaelRafael (Rafael Rafael) is a contemporary artist and painter specializing in Art Deco paintings, abstract art, and interior design pieces. Not to be confused with actors of similar names.",
        url: "https://rafaelrafael.com",
        disambiguatingDescription: "Contemporary artist and painter, not an actor",
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
        hasOccupation: {
          "@type": "Occupation",
          name: "Visual Artist",
          occupationalCategory: "Arts, Design, Entertainment, Sports, and Media Occupations",
          responsibilities: "Creating contemporary paintings, Art Deco artwork, and abstract art pieces"
        },
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
          "Fine Art",
          "Painting Techniques",
          "Color Theory",
          "Artistic Composition"
        ],
        artform: ["Painting", "Contemporary Art", "Abstract Art", "Art Deco"],
        mainEntityOfPage: "https://rafaelrafael.com"
      },
      {
        "@type": "Organization",
        "@id": "https://rafaelrafael.com/#organization",
        name: "RafaelRafael",
        alternateName: ["Rafael Rafael Art", "Rafael Rafael Artist Studio"],
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
        description: "RafaelRafael (Rafael Rafael) contemporary art studio and gallery featuring original paintings by Rafael Acevedo, specializing in Art Deco and abstract artwork.",
        knowsAbout: ["Contemporary Art", "Art Deco", "Abstract Art", "Painting"],
        makesOffer: {
          "@type": "Offer",
          itemOffered: {
            "@type": "CreativeWork",
            name: "Contemporary Art Paintings"
          }
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://rafaelrafael.com/#website", 
        url: "https://rafaelrafael.com",
        name: "RafaelRafael - Rafael Rafael Artist Official Website",
        alternateName: "Rafael Rafael Painter Website",
        description: "Official website of RafaelRafael (Rafael Rafael), contemporary artist Rafael Acevedo, featuring Art Deco paintings, abstract art, and interior design pieces.",
        publisher: {
          "@id": "https://rafaelrafael.com/#organization"
        },
        mainEntity: {
          "@id": "https://rafaelrafael.com/#person"
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://rafaelrafael.com/?s={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        },
        about: {
          "@type": "Thing",
          "name": "Contemporary Art",
          "sameAs": "https://en.wikipedia.org/wiki/Contemporary_art"
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
