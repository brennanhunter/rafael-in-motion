import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Interior Design Art by RafaelRafael - Rafael Acevedo Contemporary Art',
  description: 'Discover interior design artwork by Rafael Acevedo at RafaelRafael.com. Contemporary paintings perfect for home decor, office spaces, and architectural environments.',
  keywords: 'Rafael interior design art, RafaelRafael interior paintings, Rafael home decor art, contemporary interior art Rafael, Rafael architectural art, interior design paintings RafaelRafael.com',
  openGraph: {
    title: 'Interior Design Art by RafaelRafael - Rafael Acevedo Contemporary Art',
    description: 'Contemporary paintings perfect for interior design and architectural spaces by Rafael Acevedo',
    url: 'https://rafaelrafael.com/interiors',
    images: [
      {
        url: '/images/interiors/art-gallery-wall---20.jpg',
        width: 800,
        height: 600,
        alt: 'Interior Design Art by Rafael Acevedo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interior Design Art by RafaelRafael - Rafael Acevedo Contemporary Art',
    description: 'Contemporary paintings perfect for interior design and architectural spaces',
    images: ['/images/interiors/art-gallery-wall---20.jpg']
  },
  alternates: {
    canonical: 'https://rafaelrafael.com/interiors',
  },
}

export default function InteriorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
