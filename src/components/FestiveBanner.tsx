import React, { useState, useEffect } from 'react';
import { useBakery } from '../context/BakeryContext';
import { Sparkles, Clock, Gift, ArrowRight } from 'lucide-react';

export const FestiveBanner: React.FC = () => {
  const { setActiveSection, setSelectedCategory, applyCoupon } = useBakery();

  // Christmas Countdown (Target: Dec 25, 2026 or current year)
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      let targetYear = now.getFullYear();
      let christmas = new Date(targetYear, 11, 25, 0, 0, 0); // Month is 0-indexed (11 = Dec)

      if (now.getTime() > christmas.getTime()) {
        christmas = new Date(targetYear + 1, 11, 25, 0, 0, 0);
      }

      const diff = christmas.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGoHoliday = () => {
    setActiveSection('navidad');
    setSelectedCategory('navidad');
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  const handleCopyCoupon = () => {
    applyCoupon('NAVIDAD2026');
  };

  return (
    <div className="relative bg-gradient-to-r from-emerald-950 via-teal-950 to-stone-900 text-amber-50 px-4 py-2.5 text-xs sm:text-sm border-b border-amber-400/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Left: Message */}
        <div className="flex items-center gap-2 text-center md:text-left">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
          <span className="font-light tracking-wide text-stone-200">
            Colección Navideña 2026 activa <span className="text-amber-300 font-medium">·</span> Cupón:{' '}
            <button
              onClick={handleCopyCoupon}
              className="font-semibold text-amber-300 underline underline-offset-2 decoration-amber-400/50 hover:text-amber-200 transition-colors"
              title="Haz clic para activar este cupón"
            >
              NAVIDAD2026 (15% OFF)
            </button>
          </span>
        </div>

        {/* Center: Christmas Countdown */}
        <div className="flex items-center gap-2 bg-stone-900/60 border border-amber-500/30 px-3 py-1 rounded-md text-xs font-mono">
          <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-stone-300 font-sans text-[11px] uppercase tracking-wider hidden sm:inline">Navidad en:</span>
          <div className="flex items-center gap-1.5 font-semibold text-amber-200 tabular-nums">
            <span>{String(timeLeft.days).padStart(2, '0')}d</span>
            <span className="text-stone-500">:</span>
            <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
            <span className="text-stone-500">:</span>
            <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
            <span className="text-stone-500">:</span>
            <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
          </div>
        </div>

        {/* Right: Quick CTA */}
        <button
          onClick={handleGoHoliday}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-200 hover:text-white transition-colors"
        >
          <span>Ver Colección Navideña</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
