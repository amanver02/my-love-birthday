import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Radio } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

export const AudioPlayer: React.FC = () => {
  const { isPlaying, isMuted, currentTrack, togglePlay, toggleMute, playTrack } = useAudio();

  const trackInfo = {
    apna_bana_le:    { label: 'Apna Bana Le', emoji: '🎵', color: 'text-rose-300' },
    tenu_khabar_nahi: { label: 'Tenu Khabar Nahi', emoji: '💝', color: 'text-purple-300' }
  };
  const track = trackInfo[currentTrack];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
      className="fixed bottom-6 right-4 md:right-6 z-40 flex items-center gap-2 px-3 py-2 rounded-full shadow-2xl"
      style={{
        background: 'rgba(15, 5, 25, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(244,63,94,0.3)',
        boxShadow: '0 0 20px rgba(244,63,94,0.2), 0 0 40px rgba(168,85,247,0.15)',
      }}
    >
      {/* Track info / Prompt */}
      <div className="flex items-center gap-2 pl-2">
        <span className={`text-xs font-semibold tracking-wide ${track.color} flex items-center gap-1.5`}>
          {isPlaying ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              {track.emoji} <span className="hidden sm:inline">{track.label}</span>
            </>
          ) : (
            <span className="flex items-center gap-1 text-yellow-300 animate-pulse font-medium text-[11px] sm:text-xs">
              <Radio className="w-3.5 h-3.5" /> Tap anywhere for Apna Bana Le 🎵
            </span>
          )}
        </span>
      </div>

      {/* Switch Track */}
      <button
        onClick={() => playTrack(currentTrack === 'apna_bana_le' ? 'tenu_khabar_nahi' : 'apna_bana_le')}
        className="hidden md:flex w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-[9px] font-bold text-white/70 transition-colors"
        title="Switch Song"
      >
        ⇄
      </button>

      {/* Play/Pause */}
      <button
        onClick={togglePlay}
        className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all"
        style={{ background: 'linear-gradient(135deg, #f43f5e, #a855f7)' }}
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
      </button>

      {/* Mute */}
      <button
        onClick={toggleMute}
        className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-300 transition-colors"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-rose-300" />}
      </button>
    </motion.div>
  );
};
