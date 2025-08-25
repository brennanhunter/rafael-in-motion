import ArtGallery from "../components/ArtGallery";

export default function ArtDecoPage() {
  return (
    <main className="min-h-screen">
      <ArtGallery 
        category="art-deco" 
        title="Art Deco Masterpieces"
        subtitle="Explore our stunning collection of Art Deco artwork featuring bold geometric patterns and luxurious aesthetics"
      />
    </main>
  );
}