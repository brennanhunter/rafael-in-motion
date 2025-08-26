import ArtGallery from "../components/ArtGallery";

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