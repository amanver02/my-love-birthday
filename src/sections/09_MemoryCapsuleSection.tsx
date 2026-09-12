import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Key, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MEMORY_CAPSULE_DATA } from '../data/content';
import { GlassCard } from '../components/common/GlassCard';
import { useAudio } from '../context/AudioContext';

export const MemoryCapsuleSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { playSparkle, playClick } = useAudio();

  const handleOpenCapsule = () => {
    if (isOpen) return;
    playClick();
    playSparkle();
    setIsOpen(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#e879f9', '#ffffff']
    });
  };

  return (
    <section id="capsule" className="relative min-h-[85vh] w-full flex items-center justify-center p-6 bg-[#070409]">
      <div className="max-w-xl w-full mx-auto text-center z-10 space-y-6">
        <GlassCard variant="rose" className="p-8 md:p-12 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs uppercase tracking-widest mb-4">
            <Key className="w-3.5 h-3.5" />
            <span>Time Capsule</span>
          </div>

          <h2 className="font-serif-romantic text-3xl md:text-5xl text-slate-100 font-semibold mb-6">
            {MEMORY_CAPSULE_DATA.promptText}
          </h2>

          <div className="min-h-[220px] flex items-center justify-center py-4">
            {!isOpen ? (
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenCapsule}
                className="cursor-pointer group flex flex-col items-center gap-4"
              >
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-rose-600 to-purple-600 p-0.5 shadow-2xl shadow-rose-900/50 group-hover:shadow-rose-500/50 transition-shadow">
                  <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-rose-300 group-hover:text-rose-100 transition-colors">
                    <Mail className="w-10 h-10 animate-pulse" />
                  </div>
                </div>
                <span className="text-xs font-semibold text-rose-300 uppercase tracking-widest">
                  Tap Envelope to Unlock
                </span>
              </motion.div>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="space-y-6 p-6 rounded-2xl bg-black/40 border border-rose-400/30 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                    <Heart className="w-5 h-5 fill-rose-400" />
                  </div>
                  <p className="font-serif-romantic text-2xl md:text-3xl text-rose-100 font-medium italic leading-relaxed">
                    "{MEMORY_CAPSULE_DATA.message}"
                  </p>
                  <p className="font-handwriting text-3xl text-rose-300">
                    {MEMORY_CAPSULE_DATA.author}
                  </p>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
