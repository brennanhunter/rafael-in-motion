// src/app/page.tsx
import About from "./components/About";
import AnimatedExhibitions from "./components/AnimatedExhibitions";
import ArtDeco from "./components/ArtDeco";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <About />
      <AnimatedExhibitions />
      <ArtDeco />
    </main>
  );
}