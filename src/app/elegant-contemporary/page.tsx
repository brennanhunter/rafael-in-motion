import { Metadata } from "next";
import ArtGallery from "../components/ArtGallery";
import { generatePageMetadata } from "../../utils/canonical";

export const metadata: Metadata = generatePageMetadata(
  '/elegant-contemporary',
  'Elegant Contemporary Gallery - RafaelRafael Contemporary Art | Art Deco Style Evolution',
  'Explore Rafael Acevedo\'s stunning Elegant Contemporary paintings featuring sophisticated modern aesthetics, refined colors, and elegant design elements. Evolution of Art Deco style into contemporary luxury art with geometric patterns and bold sophistication.'
);

export default function ElegantContemporaryPage() {
  return (
    <main className="min-h-screen">
      <ArtGallery 
        category="elegant-contemporary"
      />
    </main>
  );
}