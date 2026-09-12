import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SECTIONS = [
  { id: 'opening', label: '01 Hello' },
  { id: 'lukka-chuppi', label: '02 Game' },
  { id: 'welcome', label: '03 Welcome' },
  { id: 'memories', label: '04 Memories' },
  { id: 'things-i-love', label: '05 Little Things' },
  { id: 'investigation', label: '06 Investigation' },
  { id: 'secret', label: '07 Secret' },
  { id: 'letter', label: '08 Letter' },
  { id: 'capsule', label: '09 Capsule' },
  { id: 'us', label: '10 Us' },
  { id: 'wish', label: '11 Wish' },
  { id: 'ending', label: '12 Forever' }
];

export const NavigationProgress: React.FC<{ activeSection?: string }> = () => {
  const [currentSection, setCurrentSection] = useState('opening');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setCurrentSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
    >
      {SECTIONS.map((sec) => {
        const isActive = currentSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className="group flex items-center gap-3 cursor-pointer text-left focus:outline-none"
          >
            <span
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isActive ? 'w-8 bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.6)]' : 'w-2 bg-white/20 group-hover:bg-white/40'
              }`}
            />
            <span
              className={`text-xs tracking-wider transition-all duration-300 font-medium ${
                isActive ? 'text-rose-200 opacity-100 translate-x-0' : 'text-slate-400 opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0'
              }`}
            >
              {sec.label}
            </span>
          </button>
        );
      })}
    </motion.nav>
  );
};
