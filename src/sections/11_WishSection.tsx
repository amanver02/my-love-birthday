import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift } from 'lucide-react';
import { CANDLE_DATA } from '../data/content';
import { useAudio } from '../context/AudioContext';

// Individual candle component
const Candle: React.FC<{ color: string; isBlownOut: boolean; size?: 'sm' | 'md' | 'lg' }> = ({
  color, isBlownOut, size = 'md'
}) => {
  const heights = { sm: 'h-16', md: 'h-24', lg: 'h-32' };
  const widths  = { sm: 'w-6',  md: 'w-8',  lg: 'w-10' };
  const flameH  = { sm: 'h-8',  md: 'h-12', lg: 'h-14' };
  const flameW  = { sm: 'w-5',  md: 'w-7',  lg: 'w-8' };

  return (
    <div className="flex flex-col items-center gap-0">
      {/* Flame */}
      <AnimatePresence>
        {!isBlownOut && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col items-center mb-0.5"
          >
            {/* Outer glow */}
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 ${flameH[size]} ${flameW[size]} rounded-full blur-xl opacity-60`}
              style={{ background: 'radial-gradient(circle, #fde68a, #f97316, transparent)' }}
            />
            {/* Inner flame */}
            <div
              className={`relative ${flameH[size]} ${flameW[size]} animate-flicker flame-glow`}
              style={{
                background: 'linear-gradient(to top, #ef4444 0%, #f97316 30%, #fbbf24 70%, #fef08a 100%)',
                borderRadius: '50% 50% 30% 30% / 60% 60% 40% 40%',
                filter: 'drop-shadow(0 0 6px #fbbf24)',
              }}
            />
            {/* Hot core */}
            <div
              className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2 h-4 animate-flicker-fast"
              style={{
                background: 'linear-gradient(to top, #93c5fd, #fff)',
                borderRadius: '50% 50% 30% 30%',
                opacity: 0.8,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wick */}
      <div className="w-[3px] h-3 bg-gray-700 rounded-full" />

      {/* Candle body */}
      <div
        className={`${widths[size]} ${heights[size]} rounded-t-lg relative overflow-hidden shadow-xl`}
        style={{ background: `linear-gradient(to bottom, ${color}dd, ${color}88)` }}
      >
        <div className="absolute inset-0 bg-white/20 w-1/3 rounded-l-lg" />
        {/* Wax drip */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2 rounded-b-full"
          style={{ height: '30%', background: `${color}cc` }}
        />
      </div>

      {/* Base */}
      <div
        className="w-[120%] h-2 rounded-full opacity-50 blur-[2px]"
        style={{ background: color }}
      />
    </div>
  );
};

export const WishSection: React.FC = () => {
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [showWish, setShowWish] = useState(false);
  const { playSparkle, playClick } = useAudio();

  const candleColors = ['#f43f5e', '#a855f7', '#3b82f6', '#10b981', '#f59e0b'];

  const handleBlowOut = () => {
    if (isBlownOut) return;
    playClick();
    playSparkle();
    setIsBlownOut(true);

    // Epic confetti sequence
    const launch = () => {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 }, colors: ['#f43f5e','#a855f7','#3b82f6','#10b981','#f59e0b','#fff'] });
      setTimeout(() => confetti({ particleCount: 80, spread: 70, origin: { y: 0.4, x: 0.2 }, angle: 60 }), 200);
      setTimeout(() => confetti({ particleCount: 80, spread: 70, origin: { y: 0.4, x: 0.8 }, angle: 120 }), 400);
      setTimeout(() => confetti({ particleCount: 60, spread: 120, origin: { y: 0.3 }, colors: ['#fbbf24','#fde68a','#fff'] }), 700);
    };
    launch();
    setTimeout(launch, 1200);

    setTimeout(() => setShowWish(true), 800);
  };

  return (
    <section id="wish" className="relative min-h-screen w-full flex items-center justify-center p-6 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #2d0a0a 0%, #0e0614 40%, #070709 100%)' }}>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-rose-600/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '0.7s' }} />
      </div>

      <div className="max-w-2xl w-full mx-auto text-center z-10 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-sm uppercase tracking-widest"
        >
          <Gift className="w-4 h-4" />
          <span>🎂 Birthday Wish Time 🎂</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 150 }}
          className="font-serif-romantic text-5xl md:text-7xl font-bold text-gradient-romantic text-glow-gold"
        >
          {CANDLE_DATA.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-rose-200 italic font-light"
        >
          "{CANDLE_DATA.subtitle}"
        </motion.p>

        {/* Birthday Cake + Candles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
          className="relative"
        >
          {/* Glow under candles */}
          {!isBlownOut && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-20 bg-amber-500/20 blur-3xl rounded-full pointer-events-none animate-pulse" />
          )}

          {/* Candle Row */}
          <div
            className="flex items-end justify-center gap-3 md:gap-6 cursor-pointer group"
            onClick={handleBlowOut}
            title="Tap to blow out candles!"
          >
            {candleColors.map((color, i) => (
              <motion.div
                key={i}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={!isBlownOut ? { y: -6, scale: 1.1 } : {}}
              >
                <Candle
                  color={color}
                  isBlownOut={isBlownOut}
                  size={i === 2 ? 'lg' : i % 2 === 0 ? 'md' : 'sm'}
                />
              </motion.div>
            ))}
          </div>

          {/* Cake Base */}
          <div className="mt-3 mx-auto max-w-xs">
            <div
              className="h-16 rounded-2xl border border-rose-400/30 flex items-center justify-center text-3xl shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #7e1d4e, #4c1d95, #1e3a8a)' }}
            >
              🎂
            </div>
            <div
              className="h-8 rounded-b-2xl -mt-1 shadow-xl"
              style={{ background: 'linear-gradient(135deg, #6d28d9, #1d4ed8)' }}
            />
          </div>

          {!isBlownOut && (
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-4 text-amber-300 text-sm font-semibold uppercase tracking-widest"
            >
              ✨ Tap candles to blow them out! ✨
            </motion.p>
          )}
        </motion.div>

        {/* Wish revealed */}
        <AnimatePresence>
          {showWish && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="party-border rounded-3xl p-6 md:p-8 space-y-4 birthday-glow"
            >
              <div className="text-4xl">🌟✨🌟</div>
              <h3 className="font-serif-romantic text-3xl md:text-5xl text-gradient-romantic font-bold">
                {CANDLE_DATA.wishMadeTitle}
              </h3>
              <p className="text-rose-200 text-lg italic">
                {CANDLE_DATA.wishMadeSubtext}
              </p>
              <div className="flex justify-center gap-2 text-2xl animate-bounce">
                🎉🥳🎊
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
