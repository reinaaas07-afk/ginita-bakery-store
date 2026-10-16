import React from 'react';

interface GinitaLogoProps {
  variant?: 'full' | 'compact' | 'badge' | 'icon';
  className?: string;
}

export const GinitaLogo: React.FC<GinitaLogoProps> = ({ variant = 'compact', className = '' }) => {
  if (variant === 'icon') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mint Circle Background with Gold Border */}
          <circle cx="50" cy="50" r="46" fill="#E8F6F3" stroke="#D4AF37" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="41" fill="#FFF9FA" stroke="#F8B4C8" strokeWidth="1.5" strokeDasharray="3 3" />
          
          {/* Cake Tier Base */}
          <path d="M26 68C26 66 28 64 30 64H70C72 64 74 66 74 68V73H26V68Z" fill="#FAD2E1" stroke="#D4AF37" strokeWidth="1.5" />
          {/* Middle Tier */}
          <path d="M32 54C32 52 34 50 36 50H64C66 50 68 52 68 54V64H32V54Z" fill="#A8E0D2" stroke="#D4AF37" strokeWidth="1.5" />
          {/* Top Tier */}
          <path d="M38 40C38 38 40 36 42 36H58C60 36 62 38 62 40V50H38V40Z" fill="#FFF" stroke="#D4AF37" strokeWidth="1.5" />
          {/* Candle & Flame */}
          <rect x="48.5" y="28" width="3" height="8" rx="1.5" fill="#D4AF37" />
          <path d="M50 20C50 20 47 24 47 26C47 27.6569 48.3431 29 50 29C51.6569 29 53 27.6569 53 26C53 24 50 20 50 20Z" fill="#F59E0B" />
          {/* Sparkles */}
          <path d="M24 35L26 31L28 35L32 37L28 39L26 43L24 39L20 37L24 35Z" fill="#D4AF37" transform="scale(0.6) translate(10, 15)" />
          <path d="M72 32L73.5 29L75 32L78 33.5L75 35L73.5 38L72 35L69 33.5L72 32Z" fill="#D4AF37" transform="scale(0.6) translate(45, 10)" />
        </svg>
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="relative w-24 h-24 sm:w-28 sm:h-28">
          <svg viewBox="0 0 160 160" className="w-full h-full filter drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DFB76C" />
                <stop offset="50%" stopColor="#C59B27" />
                <stop offset="100%" stopColor="#F3DC99" />
              </linearGradient>
              <linearGradient id="mintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EBF8F4" />
                <stop offset="100%" stopColor="#C9EFE4" />
              </linearGradient>
            </defs>
            {/* Outer Scalloped Ornate Ring */}
            <circle cx="80" cy="80" r="76" fill="url(#mintGrad)" stroke="url(#goldGrad)" strokeWidth="3" />
            <circle cx="80" cy="80" r="70" fill="#FFFFFF" stroke="#F8B4C8" strokeWidth="2" strokeDasharray="4 3" />
            
            {/* Ribbon Banner at bottom */}
            <path d="M30 115L45 105H115L130 115L120 128H40L30 115Z" fill="#FAD2E1" stroke="url(#goldGrad)" strokeWidth="1.5" />
            <text x="80" y="120" textAnchor="middle" fill="#881337" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold" letterSpacing="2">
              CAKES & MORE
            </text>

            {/* Stylized Cake Icon */}
            <path d="M48 95C48 92 50 90 53 90H107C110 90 112 92 112 95V101H48V95Z" fill="#F8B4C8" stroke="url(#goldGrad)" strokeWidth="1.5" />
            <path d="M54 78C54 75 56 73 59 73H101C104 73 106 75 106 78V90H54V78Z" fill="#A7E0D1" stroke="url(#goldGrad)" strokeWidth="1.5" />
            <path d="M62 62C62 59 64 57 67 57H93C96 57 98 59 98 62V73H62V62Z" fill="#FFFFFF" stroke="url(#goldGrad)" strokeWidth="1.5" />
            
            {/* Candle and Spark */}
            <rect x="78.5" y="47" width="3" height="10" rx="1.5" fill="url(#goldGrad)" />
            <path d="M80 37C80 37 76 42 76 45C76 47.2 77.8 49 80 49C82.2 49 84 47.2 84 45C84 42 80 37 80 37Z" fill="#F59E0B" />
            
            {/* Word Ginita */}
            <text x="80" y="30" textAnchor="middle" fill="#047857" fontSize="12" fontFamily="serif" fontStyle="italic" fontWeight="bold">
              Ginita
            </text>
          </svg>
        </div>
        <div className="mt-1">
          <span className="font-serif text-lg font-bold tracking-wide text-stone-900 block leading-tight">
            Ginita Bakery
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-amber-700 font-semibold block">
            Cakes & More · Repostería Fina
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        {/* Emblem */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-100 via-rose-50 to-amber-50 border-2 border-amber-400/80 p-1 flex items-center justify-center shadow-xs shrink-0">
          <svg viewBox="0 0 80 80" className="w-9 h-9" fill="none">
            {/* Cake Layers */}
            <path d="M22 58C22 56 24 54 26 54H54C56 54 58 56 58 58V63H22V58Z" fill="#FAD2E1" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M26 47C26 45 28 43 30 43H50C52 43 54 45 54 47V54H26V47Z" fill="#A8E0D2" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M31 37C31 35 33 33 35 33H45C47 33 49 35 49 37V43H31V37Z" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.5" />
            <rect x="38.5" y="27" width="3" height="6" rx="1" fill="#D4AF37" />
            <circle cx="40" cy="24" r="2.5" fill="#F59E0B" />
          </svg>
        </div>

        {/* Brand Text */}
        <div className="flex flex-col text-left">
          <span className="font-serif text-2xl font-bold tracking-tight text-stone-900 leading-none">
            Ginita <span className="text-emerald-700">Bakery</span>
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-3 h-[1px] bg-amber-400" />
            <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-rose-700">
              Cakes & More
            </span>
            <span className="w-3 h-[1px] bg-amber-400" />
          </div>
        </div>
      </div>
    );
  }

  // Default: 'compact' (best for navbar)
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Mini Seal Logo */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-100 via-rose-50 to-amber-100/60 border border-amber-400/90 p-0.5 flex items-center justify-center shadow-xs shrink-0 group-hover:rotate-6 transition-transform">
        <svg viewBox="0 0 80 80" className="w-7 h-7" fill="none">
          <circle cx="40" cy="40" r="37" fill="#FFF9FA" stroke="#F8B4C8" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M22 55C22 53 24 51 26 51H54C56 51 58 53 58 55V60H22V55Z" fill="#FAD2E1" stroke="#D4AF37" strokeWidth="1.5" />
          <path d="M27 44C27 42 29 40 31 40H49C51 40 53 42 53 44V51H27V44Z" fill="#A8E0D2" stroke="#D4AF37" strokeWidth="1.5" />
          <path d="M32 35C32 33 34 31 36 31H44C46 31 48 33 48 35V40H32V35Z" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.5" />
          <rect x="38.5" y="27" width="3" height="4" rx="1" fill="#D4AF37" />
          <circle cx="40" cy="24" r="2" fill="#F59E0B" />
        </svg>
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col text-left">
        <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900 leading-none">
          Ginita <span className="text-emerald-700">Bakery</span>
        </span>
        <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold text-rose-600 mt-0.5">
          Cakes & More
        </span>
      </div>
    </div>
  );
};
