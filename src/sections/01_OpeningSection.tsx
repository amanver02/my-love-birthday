import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Sparkles, Heart, Star } from 'lucide-react';
import { HERO_DATA } from '../data/content';
import { useAudio } from '../context/AudioContext';

interface OpeningSectionProps {
  onEnter: () => void;
}

export const OpeningSection: React.FC<OpeningSectionProps> = ({ onEnter }) => {
  const { initAudio, playChime, isPlaying } = useAudio();

  const handleStart = () => {
    initAudio();
    playChime();
    onEnter();
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' }
    })
  };

  return (
    <section
      id="opening"
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #1a0520 0%, #0d0510 40%, #070709 100%)' }}
      onClick={() => { if (!isPlaying) initAudio(); }}
    >
      {/* Simplified ambient glows — no heavy blur on mobile */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-700/20 rounded-full blur-[60px] pointer-events-none" />

      {/* Decorative stars — reduced count */}
      {['top-20 left-16', 'top-32 right-20', 'bottom-28 left-12', 'bottom-16 right-24'].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} text-yellow-300 text-xl animate-twinkle pointer-events-none select-none`}
          style={{ animationDelay: `${i * 0.4}s`, animationDuration: `${1.5 + i * 0.3}s` }}
        >
          ✦
        </div>
      ))}

      <div className="max-w-2xl mx-auto z-10 space-y-6 relative">
        {/* Badge */}
        <motion.div
          custom={0} initial="hidden" animate="visible" variants={textVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-rose-400/40 bg-rose-500/10 text-rose-300 text-sm tracking-widest uppercase"
        >
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span>A Surprise for Tuhi</span>
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1} initial="hidden" animate="visible" variants={textVariants}
          className="font-serif-romantic text-5xl md:text-7xl font-bold text-gradient-romantic tracking-tight leading-tight"
        >
          {HERO_DATA.greeting}
        </motion.h1>

        <motion.p
          custom={2} initial="hidden" animate="visible" variants={textVariants}
          className="text-lg md:text-2xl text-slate-300 font-light italic"
        >
          "{HERO_DATA.subtext1}"
        </motion.p>

        <motion.div
          custom={3} initial="hidden" animate="visible" variants={textVariants}
          className="neon-card inline-block px-7 py-3 rounded-2xl text-rose-200 text-base md:text-xl font-semibold"
        >
          {HERO_DATA.subtext2}
        </motion.div>

        <motion.p
          custom={4} initial="hidden" animate="visible" variants={textVariants}
          className="text-sm md:text-base text-slate-400 font-normal tracking-wide"
        >
          {HERO_DATA.subtext3}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          custom={5} initial="hidden" animate="visible" variants={textVariants}
          className="pt-2"
        >
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: '0 0 50px rgba(244,63,94,0.7), 0 0 80px rgba(168,85,247,0.4)' }}
            whileTap={{ scale: 0.94 }}
            onClick={handleStart}
            className="glass-button px-10 py-5 rounded-full text-xl font-bold text-white cursor-pointer relative group"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-600/0 via-white/10 to-rose-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              {HERO_DATA.buttonText}
              <Heart className="w-5 h-5 fill-rose-400 text-rose-400 animate-bounce" />
            </span>
          </motion.button>
        </motion.div>

        <motion.p
          custom={6} initial="hidden" animate="visible" variants={textVariants}
          className="text-xs text-slate-500 uppercase tracking-widest"
        >
          🎵 Song will play when you enter
        </motion.p>
      </div>

      {/* Bottom emoji row — instant */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 text-2xl select-none">
        {'🎂🎉🎈🎀✨'.split('').map((e, i) => (
          <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}>{e}</span>
        ))}
      </div>
    </section>
  );
};
