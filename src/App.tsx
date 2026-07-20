import { useRef } from 'react';
import { Nav } from './components/Nav';
import { HeroOverlay } from './components/HeroOverlay';
import { HeroScene } from './scenes/hero/HeroScene';
import { useScrollProgress } from './scenes/hero/useScrollProgress';
import { TrustStrip } from './components/sections/TrustStrip';
import { Features } from './components/sections/Features';
import { HowItWorks } from './components/sections/HowItWorks';
import { Footer } from './components/sections/Footer';

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(heroRef);

  return (
    <main className="bg-midnight font-sans text-cream">
      <Nav />

      <div ref={heroRef} className="relative h-[150vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <HeroScene scrollProgress={scrollProgress} />
          <HeroOverlay />
        </div>
      </div>

      <TrustStrip />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
