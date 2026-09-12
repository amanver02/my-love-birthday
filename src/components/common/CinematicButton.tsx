import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';

interface CinematicButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const CinematicButton: React.FC<CinematicButtonProps> = ({
  children,
  icon,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  ...props
}) => {
  const { playClick } = useAudio();

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm tracking-wide',
    md: 'px-7 py-3.5 text-base tracking-wide font-medium',
    lg: 'px-9 py-4 text-lg tracking-wider font-semibold'
  };

  const variantClasses = {
    primary:
      'glass-button text-white relative group rounded-full overflow-hidden shadow-lg shadow-rose-900/30',
    secondary:
      'bg-slate-900/80 hover:bg-slate-800 text-rose-200 border border-rose-500/30 rounded-full hover:border-rose-400/60 shadow-lg',
    outline:
      'bg-transparent hover:bg-white/5 text-slate-200 border border-white/20 rounded-full hover:border-white/40'
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-3 cursor-pointer select-none transition-all ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {/* Light sheen animation sweep */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="transition-transform group-hover:translate-x-1">{icon}</span>}
      </span>
    </motion.button>
  );
};
