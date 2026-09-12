import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  currentTrack: 'apna_bana_le' | 'tenu_khabar_nahi';
  volume: number;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (v: number) => void;
  playTrack: (track: 'apna_bana_le' | 'tenu_khabar_nahi') => void;
  initAudio: () => void;
  playChime: () => void;
  playSparkle: () => void;
  playClick: () => void;
}

const ReactAudioContext = createContext<AudioContextType | undefined>(undefined);

const TRACK_URLS = {
  apna_bana_le: '/audio/apna_bana_le.mp3',
  tenu_khabar_nahi: '/audio/tenu_khabar_nahi.mp3'
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.6);
  const [currentTrack, setCurrentTrack] = useState<'apna_bana_le' | 'tenu_khabar_nahi'>('apna_bana_le');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInitializedRef = useRef(false);

  const stopCurrentAudio = useCallback(() => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } catch (e) {
        console.error("Error stopping audio:", e);
      }
      audioRef.current = null;
    }
  }, []);

  const playTrack = useCallback((track: 'apna_bana_le' | 'tenu_khabar_nahi') => {
    // Stop any existing playing song completely and immediately!
    stopCurrentAudio();

    const audio = new Audio(TRACK_URLS[track]);
    audio.loop = true;
    audio.volume = volume;
    audio.muted = isMuted;

    audioRef.current = audio;
    setCurrentTrack(track);

    audio.play().then(() => {
      setIsPlaying(true);
      hasInitializedRef.current = true;
    }).catch((err) => {
      console.log('Audio play error:', err);
    });
  }, [volume, isMuted, stopCurrentAudio]);

  const initAudio = useCallback(() => {
    if (hasInitializedRef.current && audioRef.current && !audioRef.current.paused) {
      return;
    }
    playTrack('apna_bana_le');
  }, [playTrack]);

  // Global listener: play Apna Bana Le on page load or very first interaction anywhere on page
  useEffect(() => {
    // Try immediate autoplay first
    initAudio();

    const handleFirstInteraction = () => {
      if (!hasInitializedRef.current) {
        initAudio();
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [initAudio]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) {
      initAudio();
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying, initAudio]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  }, [isMuted]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  const playClick = useCallback(() => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.1);
    } catch {}
  }, [isMuted]);

  const playChime = useCallback(() => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
        gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.5);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.5);
      });
    } catch {}
  }, [isMuted]);

  const playSparkle = useCallback(() => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      [880, 1108.73, 1318.51, 1760, 2093].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.04);
        gain.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.04 + 0.35);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.04);
        osc.stop(ctx.currentTime + i * 0.04 + 0.35);
      });
    } catch {}
  }, [isMuted]);

  return (
    <ReactAudioContext.Provider value={{
      isPlaying, isMuted, currentTrack, volume,
      togglePlay, toggleMute, setVolume, playTrack, initAudio,
      playChime, playSparkle, playClick
    }}>
      {children}
    </ReactAudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(ReactAudioContext);
  if (!context) throw new Error('useAudio must be used within AudioProvider');
  return context;
};
