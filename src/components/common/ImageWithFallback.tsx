import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  caption?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  priority?: boolean;
  onClick?: () => void;
}

const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  caption,
  aspectRatio = 'auto',
  priority = false,
  onClick
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: 'h-full w-full'
  };

  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -4, scale: 1.01 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onClick={onClick}
      className={`relative group rounded-2xl overflow-hidden border border-white/15 bg-slate-900/60 shadow-2xl shadow-rose-950/20 backdrop-blur-md ${aspectClasses[aspectRatio]} ${containerClassName}`}
    >
      {/* Skeleton / Loading pulse */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-slate-800/80 animate-pulse flex items-center justify-center">
          <Heart className="w-8 h-8 text-rose-400/40 animate-ping" />
        </div>
      )}

      {/* Primary Image */}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
        />
      ) : (
        /* Fallback romantic styled panel if physical image is not found */
        <div className="w-full h-full min-h-[260px] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-rose-950/40 to-purple-950/40 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-400/30 flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-rose-400 fill-rose-400/20" />
          </div>
          <h4 className="font-serif-romantic text-xl text-rose-100 font-semibold mb-1">
            {alt || 'Aman & Tuhi'}
          </h4>
          <p className="text-xs text-rose-200/60 tracking-wider">SPECIAL MOMENT</p>
        </div>
      )}

      {/* Subtle Romantic Lighting Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

      {/* Glowing vignette border on hover */}
      <div className="absolute inset-0 border border-rose-400/0 group-hover:border-rose-400/40 rounded-2xl transition-colors duration-500 pointer-events-none" />

      {/* Caption Overlay */}
      {caption && (
        <div className="absolute bottom-0 inset-x-0 p-3 md:p-5 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="font-serif-romantic text-sm md:text-lg text-rose-50 font-medium italic drop-shadow-md">
            "{caption}"
          </p>
        </div>
      )}
    </motion.div>
  );
};

