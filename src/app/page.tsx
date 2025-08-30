import { Metadata } from "next";
import About from "./components/About";
import AnimatedExhibitions from "./components/AnimatedExhibitions";
import ArtDeco from "./components/ArtDeco";
import Hero from "./components/Hero";
import HomeClient from "./components/HomeClient";
import { generatePageMetadata } from "../utils/canonical";

export const metadata: Metadata = generatePageMetadata(
  '/',
  'RafaelRafael Artist | Rafael Rafael Painter Official Website - Contemporary Art',
  'RafaelRafael artist official website - Rafael Rafael painter creating contemporary Art Deco and abstract paintings. Discover Rafael Rafael art collection by Rafael Acevedo, contemporary artist not actor.'
);

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HomeClient />
      <Hero />
      <About />
      <AnimatedExhibitions />
      <ArtDeco />
    </main>
  );
}