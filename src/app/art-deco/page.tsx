import { Metadata } from "next";
import ArtGallery from "../components/ArtGallery";
import { generatePageMetadata } from "../../utils/canonical";

export const metadata: Metadata = generatePageMetadata(
  '/art-deco',
  'Art Deco Gallery - RafaelRafael Contemporary Art',
  'Explore Rafael Acevedo\'s stunning Art Deco paintings featuring elegant geometric patterns, bold colors, and sophisticated design elements inspired by the golden age of Art Deco.'
);

export default function ArtDecoPage() {
  return (
    <main className="min-h-screen">
      <ArtGallery 
        category="art-deco"
        title="Art Deco"
        subtitle="Scroll to cycle through the collection"
      />
    </main>
  );
}