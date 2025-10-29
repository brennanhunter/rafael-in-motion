import VideoHero from '../components/VideoHero';
import WearablesShowcase from '../components/WearablesShowcase';
import WearablesGallery from '../components/WearablesGallery';

export const metadata = {
  title: 'Art in Motion | Rafael Espitia',
  description: 'Explore wearable art pieces that bring Rafael Espitia\'s paintings to life.',
};

export default function ArtInMotionPage() {
  return (
    <main className="min-h-screen bg-black">
      <VideoHero />
      
      <WearablesShowcase />
      
      <WearablesGallery />
      
      {/* Content sections will go here */}
      <div className="relative z-10 bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Future content */}
      </div>
    </main>
  );
}
