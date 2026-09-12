import React from 'react';
import { motion } from 'framer-motion';
import { Feather } from 'lucide-react';
import { LETTER_DATA } from '../data/content';
import { GlassCard } from '../components/common/GlassCard';

export const LetterSection: React.FC = () => {
  return (
    <section id="letter" className="relative min-h-screen w-full py-20 px-6 bg-[#08050e] flex items-center justify-center">
      {/* Background glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-950/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl w-full mx-auto z-10 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-300 text-xs uppercase tracking-widest">
            <Feather className="w-3.5 h-3.5" />
            <span>A Letter From My Heart</span>
          </div>
          <h2 className="font-serif-romantic text-3xl md:text-5xl text-slate-100 font-semibold">
            {LETTER_DATA.heading}
          </h2>
        </div>

        <GlassCard variant="rose" className="p-8 md:p-14 relative space-y-6 text-slate-200 leading-relaxed font-light text-base md:text-lg border-rose-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="space-y-6 font-serif-romantic text-lg md:text-xl text-rose-50/95 leading-relaxed tracking-wide">
            {LETTER_DATA.lines.map((line, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.6 }}
            className="pt-8 border-t border-rose-500/20 text-right space-y-1"
          >
            <p className="font-serif-romantic text-slate-400 italic text-base">
              {LETTER_DATA.signOff}
            </p>
            <p className="font-handwriting text-4xl text-rose-300 font-bold">
              {LETTER_DATA.author}
            </p>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
};
