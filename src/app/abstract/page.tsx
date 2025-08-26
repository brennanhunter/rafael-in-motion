import ArtGallery from "../components/ArtGallery";

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
