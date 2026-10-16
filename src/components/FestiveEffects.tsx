import React, { useEffect, useRef } from 'react';
import { useBakery } from '../context/BakeryContext';
import { Sparkles, Snowflake } from 'lucide-react';

export const FestiveEffects: React.FC = () => {
  const { isSnowEnabled, setIsSnowEnabled } = useBakery();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isSnowEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle gentle snowflakes
    const flakeCount = Math.min(38, Math.floor(width / 35));
    const flakes: Array<{
      x: number;
      y: number;
      radius: number;
      density: number;
      opacity: number;
      swing: number;
      swingSpeed: number;
    }> = [];

    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 0.8,
        density: Math.random() * 0.7 + 0.3,
        opacity: Math.random() * 0.45 + 0.15,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.swing += f.swingSpeed;
        f.x += Math.sin(f.swing) * 0.5;
        f.y += f.density * 0.9;

        if (f.y > height) {
          f.y = -10;
          f.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isSnowEnabled]);

  return (
    <>
      {/* Canvas for falling snow */}
      {isSnowEnabled && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-40 h-full w-full opacity-70"
          aria-hidden="true"
        />
      )}

      {/* Floating subtle toggle button for snow */}
      <button
        onClick={() => setIsSnowEnabled((prev: boolean) => !prev)}
        className="fixed bottom-24 left-5 z-40 flex items-center gap-2 rounded-full border border-pink-200/60 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-stone-700 shadow-sm backdrop-blur-md transition-all hover:bg-pink-50 hover:text-stone-900"
        title="Activar o pausar efecto de nieve"
      >
        <Snowflake className={`h-3.5 w-3.5 ${isSnowEnabled ? 'text-teal-600 animate-spin-slow' : 'text-stone-400'}`} />
        <span className="hidden sm:inline">{isSnowEnabled ? 'Nieve activa' : 'Pausar nieve'}</span>
      </button>
    </>
  );
};

export const ChristmasFairyLights: React.FC = () => {
  // Palette matching brand: Mint, Blush Pink, Gold, Crisp White
  const bulbs = [
    { color: 'bg-emerald-300 shadow-emerald-200', delay: '0s' },
    { color: 'bg-pink-300 shadow-pink-200', delay: '0.4s' },
    { color: 'bg-amber-300 shadow-amber-200', delay: '0.8s' },
    { color: 'bg-teal-200 shadow-teal-100', delay: '1.2s' },
    { color: 'bg-rose-300 shadow-rose-200', delay: '1.6s' },
    { color: 'bg-yellow-200 shadow-yellow-100', delay: '2.0s' },
    { color: 'bg-emerald-300 shadow-emerald-200', delay: '0.3s' },
    { color: 'bg-pink-200 shadow-pink-100', delay: '0.7s' },
    { color: 'bg-amber-300 shadow-amber-200', delay: '1.1s' },
    { color: 'bg-teal-300 shadow-teal-200', delay: '1.5s' },
    { color: 'bg-rose-200 shadow-rose-100', delay: '1.9s' },
    { color: 'bg-yellow-300 shadow-yellow-200', delay: '2.3s' },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-stone-900/90 py-1 border-b border-amber-500/20" aria-hidden="true">
      {/* Cable string */}
      <div className="absolute top-1 left-0 right-0 h-[1px] bg-stone-700/60" />
      <div className="flex justify-around items-center px-4 relative">
        {bulbs.map((bulb, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="w-1.5 h-1 bg-stone-600 rounded-t-sm" />
            <span
              className={`w-2.5 h-3 rounded-full ${bulb.color} shadow-sm animate-twinkle`}
              style={{ animationDelay: bulb.delay }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
