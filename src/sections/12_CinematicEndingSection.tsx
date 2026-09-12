import React, { useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FINALE_DATA } from '../data/content';
import { useAudio } from '../context/AudioContext';

export const CinematicEndingSection: React.FC = () => {
  const { playTrack, currentTrack } = useAudio();
  const triggered = useRef(false);

  const triggerClimax = () => {
    if (currentTrack !== 'tenu_khabar_nahi') {
      playTrack('tenu_khabar_nahi');
    }
    // Massive finale confetti
    const fire = (x: number, angle: number) => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5, x },
        angle,
        colors: ['#f43f5e','#a855f7','#3b82f6','#10b981','#f59e0b','#fff','#ec4899'],
        startVelocity: 40,
      });
    };
    fire(0.2, 60); fire(0.5, 90); fire(0.8, 120);
    setTimeout(() => { fire(0.1, 70); fire(0.9, 110); }, 600);
    setTimeout(() => { fire(0.3, 80); fire(0.7, 100); }, 1200);
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { delay: i * 0.15 + 0.1, duration: 0.6, ease: 'easeOut' }
    })
  };

  return (
    <section
      id="ending"
      className="relative min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #200530 0%, #0f0318 40%, #040306 100%)' }}
    >
      {/* Multi-color glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-rose-600/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-600/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Floating emoji decoration */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {['🌟','💖','✨','🎉','💝','⭐','🎊','💫'].map((e, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-20 animate-balloon"
            style={{
              left: `${(i * 12.5) + 2}%`,
              top: `${20 + (i * 9) % 60}%`,
              animationDuration: `${4 + i * 0.5}s`,
              animationDelay: `${-i * 0.6}s`,
            }}
          >{e}</div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto z-10 space-y-8 relative">
        {/* Trigger Heart Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          onViewportEnter={() => {
            if (!triggered.current) {
              triggered.current = true;
              setTimeout(triggerClimax, 600);
            }
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          onClick={triggerClimax}
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto cursor-pointer animate-pulse-ring"
          style={{ background: 'linear-gradient(135deg, #f43f5e, #a855f7)' }}
        >
          <Heart className="w-10 h-10 fill-white text-white" />
        </motion.div>

        {/* Music Switch Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs uppercase tracking-widest"
        >
          🎵 Tenu Khabar Nahi playing…
        </motion.div>

        {/* Main Birthday Text */}
        <motion.div
          custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={lineVariants}
          className="party-border rounded-3xl p-6 md:p-10 birthday-glow"
        >
          <h2 className="font-serif-romantic text-5xl md:text-8xl font-bold text-gradient-romantic tracking-tight text-glow-rose">
            {FINALE_DATA.lines[0]}
          </h2>
        </motion.div>

        <motion.h3
          custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={lineVariants}
          className="font-handwriting text-5xl md:text-7xl text-rose-300"
        >
          "{FINALE_DATA.lines[1]}"
        </motion.h3>

        <motion.h3
          custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={lineVariants}
          className="font-handwriting text-5xl md:text-7xl text-purple-300"
        >
          "{FINALE_DATA.lines[2]}"
        </motion.h3>

        <motion.p
          custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={lineVariants}
          className="text-2xl md:text-3xl text-rose-100 font-light italic"
        >
          {FINALE_DATA.lines[3]}
        </motion.p>

        <motion.p
          custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={lineVariants}
          className="text-xl text-slate-300 font-normal tracking-wide"
        >
          {FINALE_DATA.lines[4]}
        </motion.p>

        {/* Sign-off */}
        <motion.div
          custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={lineVariants}
          className="pt-8 border-t border-rose-500/30 max-w-xs mx-auto space-y-2"
        >
          <p className="text-slate-400 text-sm italic">{FINALE_DATA.signOff}</p>
          <p className="font-handwriting text-5xl text-rose-300">{FINALE_DATA.author}</p>
        </motion.div>

        {/* P.S. */}
        <motion.div
          custom={6} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={lineVariants}
          className="neon-card inline-block px-8 py-4 rounded-2xl"
        >
          <p className="text-base md:text-lg text-rose-300 font-semibold italic">
            {FINALE_DATA.ps}
          </p>
        </motion.div>

        {/* Final emojis */}
        <motion.div
          custom={7} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={lineVariants}
          className="flex justify-center gap-4 text-3xl"
        >
          {['🎂','🥳','🎉','🎈','💝','✨'].map((e, i) => (
            <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.12}s` }}>{e}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
