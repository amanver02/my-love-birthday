import React, { Suspense, lazy } from 'react';
import { AudioProvider } from './context/AudioContext';
import { ParticleBackground, ConfettiRain, FloatingBalloons } from './components/common/ParticleBackground';
import { AudioPlayer } from './components/common/AudioPlayer';
import { NavigationProgress } from './components/common/NavigationProgress';

// Critical above-the-fold section — loaded eagerly
import { OpeningSection } from './sections/01_OpeningSection';

// All below-the-fold sections — lazy loaded for mobile speed
const LukkaChuppiSection      = lazy(() => import('./sections/02_LukkaChuppiSection').then(m => ({ default: m.LukkaChuppiSection })));
const WelcomeSection          = lazy(() => import('./sections/03_WelcomeSection').then(m => ({ default: m.WelcomeSection })));
const PhotoStorySection       = lazy(() => import('./sections/04_PhotoStorySection').then(m => ({ default: m.PhotoStorySection })));
const ThingsILoveSection      = lazy(() => import('./sections/05_ThingsILoveSection').then(m => ({ default: m.ThingsILoveSection })));
const FunnyInvestigationSection = lazy(() => import('./sections/06_FunnyInvestigationSection').then(m => ({ default: m.FunnyInvestigationSection })));
const SecretButtonSection     = lazy(() => import('./sections/07_SecretButtonSection').then(m => ({ default: m.SecretButtonSection })));
const LetterSection           = lazy(() => import('./sections/08_LetterSection').then(m => ({ default: m.LetterSection })));
const MemoryCapsuleSection    = lazy(() => import('./sections/09_MemoryCapsuleSection').then(m => ({ default: m.MemoryCapsuleSection })));
const UsMomentSection         = lazy(() => import('./sections/10_UsMomentSection').then(m => ({ default: m.UsMomentSection })));
const WishSection             = lazy(() => import('./sections/11_WishSection').then(m => ({ default: m.WishSection })));
const CinematicEndingSection  = lazy(() => import('./sections/12_CinematicEndingSection').then(m => ({ default: m.CinematicEndingSection })));

// Custom cursor only on desktop (pointer: fine devices)
const CustomCursor = lazy(() => import('./components/common/CustomCursor').then(m => ({ default: m.CustomCursor })));

// Simple skeleton shown while a section loads
const SectionSkeleton: React.FC = () => (
  <div className="min-h-screen w-full flex items-center justify-center">
    <div className="flex gap-2">
      {[0,1,2].map(i => (
        <div
          key={i}
          className="w-3 h-3 rounded-full bg-rose-500/40 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
);

export const App: React.FC = () => {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  const handleScrollToContent = () => {
    const el = document.getElementById('lukka-chuppi');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AudioProvider>
      <div className="relative min-h-screen bg-[#070709] text-slate-100 overflow-x-hidden">
        {/* Global ambient and celebration layers */}
        <ParticleBackground />
        <ConfettiRain />
        <FloatingBalloons />

        {/* Custom cursor only on desktop */}
        {!isMobile && (
          <Suspense fallback={null}>
            <CustomCursor />
          </Suspense>
        )}

        <AudioPlayer />
        <NavigationProgress />

        {/* Sections */}
        <main className="relative z-10">
          {/* Opening: eager loaded */}
          <OpeningSection onEnter={handleScrollToContent} />
          <div className="section-divider" />

          {/* All remaining sections lazy loaded */}
          <Suspense fallback={<SectionSkeleton />}>
            <LukkaChuppiSection />
          </Suspense>
          <div className="section-divider" />

          <Suspense fallback={<SectionSkeleton />}>
            <WelcomeSection />
          </Suspense>
          <div className="section-divider" />

          <Suspense fallback={<SectionSkeleton />}>
            <PhotoStorySection />
          </Suspense>
          <div className="section-divider" />

          <Suspense fallback={<SectionSkeleton />}>
            <ThingsILoveSection />
          </Suspense>
          <div className="section-divider" />

          <Suspense fallback={<SectionSkeleton />}>
            <FunnyInvestigationSection />
          </Suspense>
          <div className="section-divider" />

          <Suspense fallback={<SectionSkeleton />}>
            <SecretButtonSection />
          </Suspense>
          <div className="section-divider" />

          <Suspense fallback={<SectionSkeleton />}>
            <LetterSection />
          </Suspense>
          <div className="section-divider" />

          <Suspense fallback={<SectionSkeleton />}>
            <MemoryCapsuleSection />
          </Suspense>
          <div className="section-divider" />

          <Suspense fallback={<SectionSkeleton />}>
            <UsMomentSection />
          </Suspense>
          <div className="section-divider" />

          <Suspense fallback={<SectionSkeleton />}>
            <WishSection />
          </Suspense>
          <div className="section-divider" />

          <Suspense fallback={<SectionSkeleton />}>
            <CinematicEndingSection />
          </Suspense>
        </main>
      </div>
    </AudioProvider>
  );
};

export default App;
