import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'RafaelRafael Artist | About Rafael Rafael Painter - Contemporary Art Biography',
  description: 'RafaelRafael artist Rafael Acevedo biography - Learn about Rafael Rafael painter, contemporary artist specializing in Art Deco and abstract art. Rafael Rafael artist website, not actor.',
  keywords: 'RafaelRafael artist, Rafael Rafael painter, Rafael Rafael artist biography, Rafael Acevedo artist, Rafael Rafael contemporary artist, Rafael Rafael website, artist not actor, Rafael Rafael art',
  openGraph: {
    title: 'RafaelRafael Artist | About Rafael Rafael Painter',
    description: 'Learn about RafaelRafael artist Rafael Acevedo, contemporary painter specializing in Art Deco and abstract art. Official Rafael Rafael artist biography.',
  },
};

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold font-cinzel mb-6 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              RafaelRafael
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              The Contemporary Artist Behind the Name
            </p>
          </div>

          {/* Artist Profile */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/artista.jpg"
                alt="RafaelRafael - Rafael Acevedo Contemporary Artist"
                width={600}
                height={700}
                className="rounded-lg shadow-2xl"
                priority
              />
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-lg">
                <p className="font-semibold">Rafael Acevedo</p>
                <p className="text-sm opacity-90">Contemporary Artist</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold font-cinzel text-amber-400 mb-6">
                About RafaelRafael
              </h2>
              
              <div className="prose prose-lg text-gray-300 space-y-4">
                <p>
                  <strong className="text-amber-400">RafaelRafael</strong> represents more than just a name – it embodies the artistic vision and creative passion of Rafael Acevedo, a contemporary artist whose work bridges classical elegance with modern expression.
                </p>
                
                <p>
                  Based in Miami, <strong className="text-amber-400">Rafael</strong> has dedicated his career to creating stunning Art Deco paintings, abstract compositions, and transformative interior design pieces. The name <strong className="text-amber-400">RafaelRafael</strong> reflects the duality of his artistic nature: honoring traditional techniques while embracing contemporary innovation.
                </p>
                
                <p>
                  At <strong className="text-amber-400">RafaelRafael.com</strong>, visitors discover a curated collection of original artwork that tells stories through color, form, and emotion. Each piece represents Rafael&apos;s commitment to visual storytelling and his belief that art should both inspire and transform spaces.
                </p>
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-semibold text-amber-400 mb-4">Artistic Specializations</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                    Art Deco Paintings
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                    Abstract Art Compositions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                    Interior Design Art
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                    Visual Storytelling
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-cinzel text-amber-400 mb-8">
            Explore RafaelRafael Gallery
          </h2>
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
            Discover the artistic world of <strong>RafaelRafael</strong> through curated collections that showcase Rafael Acevedo&apos;s mastery of contemporary art forms.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/art-deco" className="group block">
              <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-amber-400 mb-3 group-hover:text-amber-300">
                  Art Deco Collection
                </h3>
                <p className="text-gray-300 text-sm">
                  Elegant paintings that capture the sophistication of the Art Deco movement
                </p>
              </div>
            </Link>
            
            <Link href="/abstract" className="group block">
              <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-amber-400 mb-3 group-hover:text-amber-300">
                  Abstract Works
                </h3>
                <p className="text-gray-300 text-sm">
                  Contemporary abstract compositions that explore color and form
                </p>
              </div>
            </Link>
            
            <Link href="/interiors" className="group block">
              <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-amber-400 mb-3 group-hover:text-amber-300">
                  Interior Design
                </h3>
                <p className="text-gray-300 text-sm">
                  Transformative art pieces designed to enhance living spaces
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About RafaelRafael - Rafael Acevedo Contemporary Artist",
            "description": "Learn about Rafael Acevedo, the contemporary artist behind RafaelRafael.com specializing in Art Deco and abstract paintings",
            "url": "https://rafaelrafael.com/about",
            "mainEntity": {
              "@type": "Person",
              "name": "Rafael Acevedo",
              "alternateName": ["RafaelRafael", "rafaelrafael", "Rafael Rafael"],
              "jobTitle": "Contemporary Artist",
              "url": "https://rafaelrafael.com",
              "worksFor": {
                "@type": "Organization",
                "name": "RafaelRafael Art Gallery",
                "url": "https://rafaelrafael.com"
              }
            }
          })
        }}
      />
    </main>
  );
}
