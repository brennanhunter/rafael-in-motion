import { Metadata } from "next";
import About from "./components/About";
import CollectorsAndExhibitions from "./components/CollectorsAndExhibitions";
import ElegantContemporary from "./components/ElegantContemporary";
import Hero from "./components/Hero";
import HomeClient from "./components/HomeClient";
import { generatePageMetadata } from "../utils/canonical";

export const metadata: Metadata = generatePageMetadata(
  '/',
  'RafaelRafael Artist | Rafael Rafael Painter Official Website - Elegant Contemporary Art',
  'RafaelRafael artist official website - Rafael Rafael painter creating elegant contemporary and abstract paintings. Sophisticated modern art evolved from Art Deco influences. Discover Rafael Rafael art collection by Rafael Acevedo, contemporary artist not actor.'
);

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HomeClient />
      <Hero />
      <About />
      <ElegantContemporary />
      <CollectorsAndExhibitions />
      
    </main>
  );
}