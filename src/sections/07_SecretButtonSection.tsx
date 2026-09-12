import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart } from 'lucide-react';
import { SECRET_BUTTON_DATA } from '../data/content';
import { GlassCard } from '../components/common/GlassCard';
import { useAudio } from '../context/AudioContext';

export const SecretButtonSection: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const { playSparkle, playClick } = useAudio();

  const handleNextStep = () => {
    playClick();
    if (step < SECRET_BUTTON_DATA.steps.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setIsRevealed(true);
      playSparkle();
    }
  };

  return (
    <section id="secret" className="relative min-h-[70vh] w-full flex items-center justify-center p-6 bg-[#060408]">
      <div className="max-w-md w-full mx-auto text-center z-10 space-y-6">
        <GlassCard variant="rose" className="p-8 md:p-10 space-y-6 text-center">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
            {isRevealed ? <Heart className="w-6 h-6 fill-rose-400" /> : <Lock className="w-6 h-6" />}
          </div>

          {!isRevealed ? (
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-widest text-rose-400/80 font-mono">
                [ SECRET REVEAL ]
              </p>

              <AnimatePresence mode="wait">
                <motion.p
                  key={step}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="font-serif-romantic text-2xl text-slate-100 italic"
                >
                  {step === 0 ? `"${SECRET_BUTTON_DATA.initialText}"` : `"${SECRET_BUTTON_DATA.steps[step]}"`}
                </motion.p>
              </AnimatePresence>

              <button
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-rose-500/20 border border-white/15 hover:border-rose-400/40 text-xs font-semibold text-rose-200 uppercase tracking-widest transition-all cursor-pointer"
              >
                {step === 0 ? "Don't Click This" : "Tap to continue..."}
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="space-y-4 py-4"
            >
              <h3 className="font-serif-romantic text-3xl md:text-4xl text-rose-100 font-bold text-glow-rose">
                {SECRET_BUTTON_DATA.revealedText}
              </h3>
              <p className="text-slate-300 text-sm font-light">
                Your happiness is literally my favorite thing in the world.
              </p>
            </motion.div>
          )}
        </GlassCard>
      </div>
    </section>
  );
};
