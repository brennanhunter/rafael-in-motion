import { Metadata } from "next";
import ArtGallery from "../components/ArtGallery";
import { generatePageMetadata } from "../../utils/canonical";

export const metadata: Metadata = generatePageMetadata(
  '/abstract',
  'Abstract Art Gallery - RafaelRafael Contemporary Paintings',
  'Discover Rafael Acevedo\'s abstract art collection featuring dynamic compositions, vibrant colors, and expressive forms that capture emotion and movement in contemporary abstract painting.'
);

export default function AbstractPage() {
  return (
    <main className="min-h-screen">
      <ArtGallery 
        category="abstracts"
        title="Abstract"
        subtitle="Scroll to cycle through the collection"
      />
    </main>
  );
}
