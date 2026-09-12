import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, RefreshCw } from 'lucide-react';
import { LOVE_CARDS } from '../data/content';
import { GlassCard } from '../components/common/GlassCard';
import { useAudio } from '../context/AudioContext';

export const ThingsILoveSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { playClick, playSparkle } = useAudio();

  const handleNextCard = () => {
    playClick();
    if (currentIndex < LOVE_CARDS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      if (currentIndex === LOVE_CARDS.length - 2) {
        playSparkle();
      }
    } else {
      setCurrentIndex(0);
    }
  };

  const currentCard = LOVE_CARDS[currentIndex];
  const isLast = currentIndex === LOVE_CARDS.length - 1;

  return (
    <section id="things-i-love" className="relative min-h-[85vh] w-full flex items-center justify-center p-6 bg-[#08050c]">
      <div className="max-w-xl w-full mx-auto text-center z-10 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 fill-rose-400" />
            <span>Little Things</span>
          </div>
          <h2 className="font-serif-romantic text-3xl md:text-5xl text-slate-100 font-semibold">
            Things I probably don't say enough…
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            Tap the card to reveal the next reason ({currentIndex + 1} of {LOVE_CARDS.length})
          </p>
        </div>

        {/* Stack of Cards Container */}
        <div className="relative min-h-[260px] flex items-center justify-center cursor-pointer" onClick={handleNextCard}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, scale: 0.8, rotate: -4, y: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 4, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-full"
            >
              <GlassCard
                variant="rose"
                className={`p-8 md:p-10 text-center relative shadow-2xl transition-all duration-300 ${
                  isLast ? 'border-rose-400/60 bg-rose-950/40 shadow-[0_0_50px_rgba(244,63,94,0.3)]' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-rose-500/15 border border-rose-400/30 flex items-center justify-center mx-auto mb-5 text-rose-300">
                  {isLast ? <Sparkles className="w-6 h-6 text-rose-400" /> : <Heart className="w-6 h-6 fill-rose-400/40" />}
                </div>

                <h3 className="font-serif-romantic text-2xl md:text-4xl text-rose-100 font-bold mb-3">
                  "{currentCard.text}"
                </h3>

                {currentCard.subtext && (
                  <p className="text-sm md:text-base text-rose-200/80 font-light italic">
                    {currentCard.subtext}
                  </p>
                )}

                <div className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-rose-300 uppercase tracking-widest">
                  <span>{isLast ? 'Start Over' : 'Tap for Next'}</span>
                  {isLast ? <RefreshCw className="w-3.5 h-3.5" /> : <ChevronRight className="w-4 h-4" />}
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
