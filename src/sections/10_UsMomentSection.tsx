import React from 'react';
import { Heart } from 'lucide-react';
import { US_MOMENT_DATA } from '../data/content';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { GlassCard } from '../components/common/GlassCard';

export const UsMomentSection: React.FC = () => {
  return (
    <section id="us" className="relative min-h-screen w-full py-20 px-6 bg-[#08050b] flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto space-y-10 text-center z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 fill-rose-400" />
            <span>Our Journey</span>
          </div>
          <h2 className="font-serif-romantic text-4xl md:text-6xl text-slate-100 font-bold tracking-tight">
            {US_MOMENT_DATA.heading}
          </h2>
          <p className="text-lg md:text-xl text-rose-200/80 font-light italic">
            "{US_MOMENT_DATA.subheading}"
          </p>
        </div>

        {/* Featured Showcase Frame */}
        <GlassCard variant="rose" className="p-4 md:p-6 rounded-3xl relative overflow-hidden">
          <ImageWithFallback
            src={US_MOMENT_DATA.photoUrl}
            alt="Aman and Tuhi"
            containerClassName="w-full h-[400px] md:h-[520px] rounded-2xl"
          />

          {/* Animated Connecting Pulse Overlay */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 bg-black/60 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/20 shadow-xl">
            <span className="text-slate-100 font-semibold tracking-wider text-sm">Aman</span>
            <div className="flex items-center gap-1">
              <span className="w-8 h-[2px] bg-gradient-to-r from-rose-500 to-amber-400 animate-pulse" />
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-bounce" />
              <span className="w-8 h-[2px] bg-gradient-to-r from-amber-400 to-rose-500 animate-pulse" />
            </div>
            <span className="text-rose-300 font-semibold tracking-wider text-sm">Tuhi</span>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};
