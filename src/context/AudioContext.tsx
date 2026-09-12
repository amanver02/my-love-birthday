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
  const [volume, setVolumeState] = useState(0.55);
  const [currentTrack, setCurrentTrack] = useState<'apna_bana_le' | 'tenu_khabar_nahi'>('apna_bana_le');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const buildAudio = useCallback((track: 'apna_bana_le' | 'tenu_khabar_nahi', vol: number, muted: boolean) => {
    const a = new Audio(TRACK_URLS[track]);
    a.loop = true;
    a.volume = vol;
    a.muted = muted;
    return a;
  }, []);

  // Auto-play on user interaction or page load
  const initAudio = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      setIsPlaying(true);
      return;
    }

    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setCurrentTrack('apna_bana_le');
      }).catch(() => {});
      return;
    }

    const audio = buildAudio('apna_bana_le', volume, isMuted);
    audioRef.current = audio;
    audio.play().then(() => {
      setIsPlaying(true);
      setCurrentTrack('apna_bana_le');
    }).catch((err) => {
      console.log('Autoplay deferred until user interaction:', err);
    });
  }, [volume, isMuted, buildAudio]);

  // Global listener: play Apna Bana Le on page load or very first interaction anywhere on page
  useEffect(() => {
    // Try immediate autoplay first
    initAudio();

    const handleFirstInteraction = () => {
      initAudio();
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('pointerdown', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [initAudio]);

  const playTrack = useCallback((track: 'apna_bana_le' | 'tenu_khabar_nahi') => {
    if (currentTrack === track && isPlaying && audioRef.current && !audioRef.current.paused) return;

    // Fade out current
    if (audioRef.current) {
      const old = audioRef.current;
      const fadeOut = setInterval(() => {
        if (old.volume > 0.05) {
          old.volume = Math.max(0, old.volume - 0.05);
        } else {
          clearInterval(fadeOut);
          old.pause();
        }
      }, 60);
    }

    const audio = buildAudio(track, 0, isMuted);
    audioRef.current = audio;
    setCurrentTrack(track);

    audio.play().then(() => {
      setIsPlaying(true);
      // Fade in
      const fadeIn = setInterval(() => {
        if (audio.volume < volume - 0.05) {
          audio.volume = Math.min(volume, audio.volume + 0.05);
        } else {
          audio.volume = volume;
          clearInterval(fadeIn);
        }
      }, 60);
    }).catch(() => {});
  }, [currentTrack, isPlaying, isMuted, volume, buildAudio]);

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
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
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
