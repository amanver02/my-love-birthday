import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart } from 'lucide-react';
import { LUKKA_CHUPPI_DATA } from '../data/content';
import { GlassCard } from '../components/common/GlassCard';
import { useAudio } from '../context/AudioContext';

export const LukkaChuppiSection: React.FC = () => {
  const [attempts, setAttempts] = useState(0);
  const [isFound, setIsFound] = useState(false);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [currentTease, setCurrentTease] = useState('');
  const { playSparkle, playClick } = useAudio();

  const handleDodge = () => {
    if (isFound) return;
    
    // Allow catching on attempt 4 or higher
    if (attempts >= 4) {
      handleCatch();
      return;
    }

    playClick();
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    // Random dodge offset within reasonable boundary
    const randomX = (Math.random() - 0.5) * 260;
    const randomY = (Math.random() - 0.5) * 160;
    setBtnPos({ x: randomX, y: randomY });

    // Pick teasing message
    const msg = LUKKA_CHUPPI_DATA.teasingMessages[newAttempts % LUKKA_CHUPPI_DATA.teasingMessages.length];
    setCurrentTease(msg);
  };

  const handleCatch = () => {
    playSparkle();
    setIsFound(true);
    setBtnPos({ x: 0, y: 0 });
  };

  return (
    <section id="lukka-chuppi" className="relative min-h-screen w-full flex items-center justify-center p-6 bg-[#0c0812]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-xl w-full mx-auto z-10">
        <GlassCard variant="rose" className="text-center p-8 md:p-12 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs uppercase tracking-widest mb-4">
            <Search className="w-3.5 h-3.5" />
            <span>Mini Game</span>
          </div>

          <h2 className="font-serif-romantic text-3xl md:text-5xl text-slate-100 mb-3">
            {LUKKA_CHUPPI_DATA.heading}
          </h2>

          <p className="text-sm md:text-base text-rose-200/80 mb-8 italic">
            "{LUKKA_CHUPPI_DATA.subtext}"
          </p>

          <div className="min-h-[160px] flex flex-col items-center justify-center relative py-6">
            {!isFound ? (
              <>
                {/* Teasing Speech Bubble */}
                <AnimatePresence mode="wait">
                  {currentTease && (
                    <motion.div
                      key={currentTease}
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute -top-4 px-4 py-1.5 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-200 text-sm font-medium shadow-lg"
                    >
                      {currentTease}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dodging Button */}
                <motion.button
                  animate={{ x: btnPos.x, y: btnPos.y }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  onMouseEnter={handleDodge}
                  onClick={handleCatch}
                  className="glass-button px-8 py-4 rounded-full text-lg font-semibold text-white cursor-pointer shadow-xl shadow-rose-900/40 select-none"
                >
                  {attempts >= 3 ? "Aman ko dhoond liya? 🙈" : LUKKA_CHUPPI_DATA.buttonText}
                </motion.button>
              </>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-400/50 flex items-center justify-center mx-auto text-rose-400">
                  <Heart className="w-8 h-8 fill-rose-400" />
                </div>
                <h3 className="font-serif-romantic text-3xl text-rose-200 font-bold">
                  {LUKKA_CHUPPI_DATA.foundMessage}
                </h3>
                <p className="text-slate-300 text-lg font-medium">
                  {LUKKA_CHUPPI_DATA.afterFoundText}
                </p>
              </motion.div>
            )}
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
