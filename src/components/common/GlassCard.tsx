import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'default' | 'rose' | 'dark';
  glowOnHover?: boolean;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'default',
  glowOnHover = true,
  className = '',
  ...props
}) => {
  const variantStyles = {
    default: 'glass-panel text-slate-100',
    rose: 'glass-panel-rose text-rose-50',
    dark: 'bg-black/60 backdrop-blur-2xl border border-white/10 text-slate-100'
  };

  return (
    <motion.div
      className={`relative rounded-3xl p-6 md:p-8 transition-all duration-500 overflow-hidden ${variantStyles[variant]} ${
        glowOnHover ? 'hover:border-rose-500/30 hover:shadow-[0_12px_40px_rgba(244,63,94,0.15)]' : ''
      } ${className}`}
      {...props}
    >
      {/* Background ambient light reflection */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
