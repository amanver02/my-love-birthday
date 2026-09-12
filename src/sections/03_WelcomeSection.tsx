import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { WELCOME_DATA } from '../data/content';
import { GlassCard } from '../components/common/GlassCard';

export const WelcomeSection: React.FC = () => {
  const [celebrated, setCelebrated] = useState(false);

  const handleCelebrate = () => {
    setCelebrated(true);
    confetti({ particleCount: 120, spread: 100, origin: { y: 0.6 }, colors: ['#f43f5e','#a855f7','#f59e0b','#fff','#3b82f6'] });
    setTimeout(() => confetti({ particleCount: 60, spread: 80, origin: { y: 0.5, x: 0.2 }, colors: ['#f43f5e','#fbbf24','#fff'] }), 400);
    setTimeout(() => confetti({ particleCount: 60, spread: 80, origin: { y: 0.5, x: 0.8 }, colors: ['#a855f7','#3b82f6','#fff'] }), 700);
  };

  return (
    <section id="welcome" className="relative min-h-[90vh] w-full flex items-center justify-center p-6 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at top, #1e0a2e 0%, #0a0710 100%)' }}>

      {/* Glowing orbs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600/25 rounded-full blur-[80px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-rose-600/25 rounded-full blur-[80px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      {/* Background emoji confetti (static decoration) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {['🎂','🎉','🎈','⭐','🎊','✨','🥳','💝','🌟','🎀'].map((e, i) => (
          <div
            key={i}
            className="absolute text-2xl md:text-4xl opacity-10 animate-balloon"
            style={{
              left: `${(i * 10) + 5}%`,
              top: `${15 + (i * 7) % 70}%`,
              animationDuration: `${3 + i * 0.4}s`,
              animationDelay: `${-i * 0.3}s`
            }}
          >{e}</div>
        ))}
      </div>

      <div className="max-w-3xl w-full mx-auto text-center z-10 space-y-8">
        {/* Main Heading with party border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          onClick={handleCelebrate}
          className="party-border rounded-3xl p-6 md:p-10 cursor-pointer group birthday-glow"
        >
          <h2
            className="font-serif-romantic text-5xl md:text-7xl font-bold text-gradient-romantic tracking-tight mb-4 text-glow-rose"
          >
            {WELCOME_DATA.heading}
          </h2>

          <h3 className="font-handwriting text-4xl md:text-6xl text-rose-300 mb-2">
            {WELCOME_DATA.subtitle}
          </h3>

          {!celebrated && (
            <p className="text-xs uppercase tracking-widest text-rose-400/60 mt-4 animate-bounce">
              🎉 Tap to Celebrate! 🎉
            </p>
          )}
          {celebrated && (
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-2xl mt-2"
            >
              🥳✨🎉
            </motion.p>
          )}
        </motion.div>

        {/* Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <GlassCard variant="rose" className="p-8 md:p-10 text-slate-100 text-lg md:text-xl font-light leading-relaxed">
            <p className="italic">"{WELCOME_DATA.paragraph}"</p>
            <div className="mt-5 flex justify-center gap-2 text-xl">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>💝</span>
              <span className="animate-bounce" style={{ animationDelay: '0.15s' }}>💖</span>
              <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>💝</span>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};
