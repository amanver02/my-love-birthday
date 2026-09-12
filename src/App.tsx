import React, { Suspense, lazy } from 'react';
import { AudioProvider } from './context/AudioContext';
import { AudioPlayer } from './components/common/AudioPlayer';

// Detect mobile once at module level
const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

// ALL sections eagerly imported — no lazy loading delay on mobile
import { OpeningSection } from './sections/01_OpeningSection';
import { LukkaChuppiSection } from './sections/02_LukkaChuppiSection';
import { WelcomeSection } from './sections/03_WelcomeSection';
import { PhotoStorySection } from './sections/04_PhotoStorySection';
import { ThingsILoveSection } from './sections/05_ThingsILoveSection';
import { FunnyInvestigationSection } from './sections/06_FunnyInvestigationSection';
import { SecretButtonSection } from './sections/07_SecretButtonSection';
import { LetterSection } from './sections/08_LetterSection';
import { MemoryCapsuleSection } from './sections/09_MemoryCapsuleSection';
import { UsMomentSection } from './sections/10_UsMomentSection';
import { WishSection } from './sections/11_WishSection';
import { CinematicEndingSection } from './sections/12_CinematicEndingSection';

// Heavy decorations — only on desktop
const ParticleBackground = lazy(() => import('./components/common/ParticleBackground').then(m => ({ default: m.ParticleBackground })));
const ConfettiRain = lazy(() => import('./components/common/ParticleBackground').then(m => ({ default: m.ConfettiRain })));
const FloatingBalloons = lazy(() => import('./components/common/ParticleBackground').then(m => ({ default: m.FloatingBalloons })));
const NavigationProgress = lazy(() => import('./components/common/NavigationProgress').then(m => ({ default: m.NavigationProgress })));
const CustomCursor = lazy(() => import('./components/common/CustomCursor').then(m => ({ default: m.CustomCursor })));

export const App: React.FC = () => {
  const handleScrollToContent = () => {
    const el = document.getElementById('lukka-chuppi');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AudioProvider>
      <div className="relative min-h-screen bg-[#070709] text-slate-100 overflow-x-hidden">
        {/* Decorations: skip entirely on mobile for instant load */}
        {!isMobile && (
          <Suspense fallback={null}>
            <ParticleBackground />
            <ConfettiRain />
            <FloatingBalloons />
            <CustomCursor />
            <NavigationProgress />
          </Suspense>
        )}

        {/* Mobile-only: lightweight confetti with fewer pieces */}
        {isMobile && (
          <Suspense fallback={null}>
            <ConfettiRain />
          </Suspense>
        )}

        <AudioPlayer />

        {/* ALL sections rendered eagerly — zero loading delay */}
        <main className="relative z-10">
          <OpeningSection onEnter={handleScrollToContent} />
          <div className="section-divider" />
          <LukkaChuppiSection />
          <div className="section-divider" />
          <WelcomeSection />
          <div className="section-divider" />
          <PhotoStorySection />
          <div className="section-divider" />
          <ThingsILoveSection />
          <div className="section-divider" />
          <FunnyInvestigationSection />
          <div className="section-divider" />
          <SecretButtonSection />
          <div className="section-divider" />
          <LetterSection />
          <div className="section-divider" />
          <MemoryCapsuleSection />
          <div className="section-divider" />
          <UsMomentSection />
          <div className="section-divider" />
          <WishSection />
          <div className="section-divider" />
          <CinematicEndingSection />
        </main>
      </div>
    </AudioProvider>
  );
};

export default App;
