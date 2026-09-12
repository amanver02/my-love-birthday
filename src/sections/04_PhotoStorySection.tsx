import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Heart, MapPin } from 'lucide-react';
import { MEMORY_PHOTOS } from '../data/content';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import type { MemoryPhoto } from '../types';
import { useAudio } from '../context/AudioContext';

export const PhotoStorySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const { playClick } = useAudio();

  const handlePhotoClick = (photo: MemoryPhoto) => {
    playClick();
    setSelectedPhoto(photo);
  };

  return (
    <section id="memories" className="relative min-h-screen w-full py-20 px-6 bg-[#09060e]">
      <div className="max-w-6xl mx-auto space-y-12 z-10 relative">
        {/* Title Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-400/20 text-rose-300 text-xs uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5" />
            <span>Memory Gallery</span>
          </div>
          <h2 className="font-serif-romantic text-4xl md:text-6xl text-slate-100 font-semibold tracking-tight">
            Some moments I never want to forget.
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            Every photo with you tells a story I keep close to my heart. Click any photo to zoom in.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Featured Large Photo (Hero photo of Aman & Tuhi) */}
          <div className="md:col-span-7 h-full min-h-[380px]">
            <ImageWithFallback
              src={MEMORY_PHOTOS[0].url}
              alt={MEMORY_PHOTOS[0].title}
              caption={MEMORY_PHOTOS[0].caption}
              containerClassName="h-full min-h-[380px] cursor-pointer"
              onClick={() => handlePhotoClick(MEMORY_PHOTOS[0])}
            />
          </div>

          {/* Right Column Stack */}
          <div className="md:col-span-5 grid grid-cols-1 gap-6">
            <ImageWithFallback
              src={MEMORY_PHOTOS[1].url}
              alt={MEMORY_PHOTOS[1].title}
              caption={MEMORY_PHOTOS[1].caption}
              containerClassName="h-[220px] md:h-[240px] cursor-pointer"
              onClick={() => handlePhotoClick(MEMORY_PHOTOS[1])}
            />
            <ImageWithFallback
              src={MEMORY_PHOTOS[2].url}
              alt={MEMORY_PHOTOS[2].title}
              caption={MEMORY_PHOTOS[2].caption}
              containerClassName="h-[220px] md:h-[240px] cursor-pointer"
              onClick={() => handlePhotoClick(MEMORY_PHOTOS[2])}
            />
          </div>

          {/* Bottom Row 2 Photos */}
          <div className="md:col-span-6">
            <ImageWithFallback
              src={MEMORY_PHOTOS[3].url}
              alt={MEMORY_PHOTOS[3].title}
              caption={MEMORY_PHOTOS[3].caption}
              containerClassName="h-[260px] cursor-pointer"
              onClick={() => handlePhotoClick(MEMORY_PHOTOS[3])}
            />
          </div>
          <div className="md:col-span-6">
            <ImageWithFallback
              src={MEMORY_PHOTOS[4].url}
              alt={MEMORY_PHOTOS[4].title}
              caption={MEMORY_PHOTOS[4].caption}
              containerClassName="h-[260px] cursor-pointer"
              onClick={() => handlePhotoClick(MEMORY_PHOTOS[4])}
            />
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl p-4 md:p-10 flex items-center justify-center cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] glass-panel-rose rounded-3xl overflow-hidden p-6 md:p-8 flex flex-col md:flex-row gap-6 cursor-default"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo */}
              <div className="md:w-3/5 max-h-[60vh] md:max-h-[75vh] rounded-2xl overflow-hidden">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Information Side */}
              <div className="md:w-2/5 flex flex-col justify-center space-y-4 text-left">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold uppercase tracking-widest">
                  <Heart className="w-4 h-4 fill-rose-400" />
                  <span>{selectedPhoto.date}</span>
                </div>
                <h3 className="font-serif-romantic text-2xl md:text-3xl text-slate-100 font-bold">
                  {selectedPhoto.title}
                </h3>
                <p className="text-lg md:text-xl text-rose-200 font-light italic border-l-2 border-rose-500/50 pl-4 py-1">
                  "{selectedPhoto.caption}"
                </p>
                {selectedPhoto.location && (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{selectedPhoto.location}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
