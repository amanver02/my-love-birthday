import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle, Award } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/content';
import { GlassCard } from '../components/common/GlassCard';
import { useAudio } from '../context/AudioContext';

export const FunnyInvestigationSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeResponse, setActiveResponse] = useState<string | null>(null);
  const [showWinner, setShowWinner] = useState(false);
  const { playSparkle, playClick } = useAudio();

  const handleSelect = (choiceId: string, response: string, isCorrect?: boolean) => {
    playClick();
    setSelectedId(choiceId);
    setActiveResponse(response);

    if (isCorrect) {
      playSparkle();
      setShowWinner(true);
      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#e879f9', '#f59e0b', '#ffffff']
      });
    } else {
      setShowWinner(false);
    }
  };

  return (
    <section id="investigation" className="relative min-h-[85vh] w-full flex items-center justify-center p-6 bg-[#07050a]">
      <div className="max-w-xl w-full mx-auto z-10 space-y-8">
        <GlassCard variant="rose" className="text-center p-8 md:p-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Investigation</span>
          </div>

          <h2 className="font-serif-romantic text-3xl md:text-5xl text-slate-100 font-semibold">
            Okay, enough romance. Important investigation.
          </h2>

          <p className="text-xl md:text-2xl text-rose-200 font-medium">
            Who is more cute?
          </p>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {QUIZ_QUESTIONS.map((q) => {
              const isSelected = selectedId === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => handleSelect(q.id, q.response, q.isCorrect)}
                  className={`p-4 rounded-2xl border text-sm font-medium transition-all cursor-pointer text-left flex items-center justify-between ${
                    isSelected
                      ? 'bg-rose-500/30 border-rose-400 text-white shadow-lg shadow-rose-950/40'
                      : 'bg-white/5 hover:bg-white/10 border-white/15 text-slate-200'
                  }`}
                >
                  <span>{q.text}</span>
                  {isSelected && <CheckCircle className="w-4 h-4 text-rose-400" />}
                </button>
              );
            })}
          </div>

          {/* Feedback Response */}
          <AnimatePresence mode="wait">
            {activeResponse && (
              <motion.div
                key={activeResponse}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-2xl bg-black/40 border border-white/10 text-rose-200 font-medium text-base mt-4"
              >
                {activeResponse}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Winner Reveal */}
          {showWinner && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="pt-4 border-t border-white/10 flex items-center justify-center gap-3 text-rose-300 font-serif-romantic text-xl md:text-2xl font-bold"
            >
              <Award className="w-6 h-6 text-amber-400" />
              <span>Official result: Tuhi wins. Obviously. 👑</span>
            </motion.div>
          )}
        </GlassCard>
      </div>
    </section>
  );
};
