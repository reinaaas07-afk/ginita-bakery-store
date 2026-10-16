import React from 'react';
import { useBakery } from '../context/BakeryContext';
import { GinitaLogo } from './GinitaLogo';
import { Sparkles, ArrowRight, Heart, Star, Clock, Truck, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveSection, setSelectedCategory, setSelectedSubcategory } = useBakery();

  const handleShopNow = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveSection('inicio');
    }
  };

  const handleHolidayCatalog = () => {
    setActiveSection('navidad');
    setSelectedCategory('navidad');
    setSelectedSubcategory('todos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F7] via-[#F4FAF7] to-[#FAFBF9] pt-8 pb-12 lg:pt-12 lg:pb-16 border-b border-rose-100/60">
      
      {/* Delicate ambient background shapes */}
      <div className="absolute top-12 left-10 w-72 h-72 rounded-full bg-emerald-100/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-rose-200/25 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Presentation */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Logo Badge Header */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/90 border border-amber-300/50 rounded-full shadow-2xs text-xs text-stone-700">
              <span className="font-bold text-rose-700">Ginita Bakery</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-emerald-800 flex items-center gap-1 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Edición Especial Navidad 2026
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.12] text-balance">
              Endulzamos cada celebración con{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-rose-600 to-amber-700">
                  sabor, creatividad
                </span>
                <span className="absolute bottom-1 left-0 w-full h-2.5 bg-rose-200/60 -z-0 rounded-sm" />
              </span>{' '}
              y amor.
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Repostería artesanal de alta gama en República Dominicana. Desde nuestros legendarios bizcochos con suspiro dominicano de gala y hojaldres, hasta picaderas saladas, ponches por onzas y la colección navideña más esperada del año.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <button
                type="button"
                onClick={handleShopNow}
                className="w-full sm:w-auto px-7 py-3 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.99] rounded-xl shadow-md hover:shadow-lg shadow-rose-200 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Comprar Ahora</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleHolidayCatalog}
                className="w-full sm:w-auto px-7 py-3 text-sm font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300/80 active:scale-[0.99] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Ver Catálogo Navideño</span>
              </button>
            </div>

            {/* Social Proof Quick Row */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-5 text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-stone-800">4.9 / 5.0</span>
                <span>(300+ pedidos calificados)</span>
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>100% Hecho a mano</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset (Clean, proportional and realistic) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              {/* Outer Glow */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-amber-300/30 via-rose-200/40 to-emerald-200/30 blur-lg opacity-60" />

              {/* Main Card */}
              <div className="relative overflow-hidden rounded-3xl bg-white p-3 shadow-xl border border-rose-100/80">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-100">
                  <img
                    src="/src/assets/images/hero_ginita_holiday_1792178997563.jpg"
                    alt="Mesa de repostería navideña artesanal Ginita Bakery"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating badge inside image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="bg-white/95 text-stone-900 px-3 py-1 rounded-lg font-bold shadow-xs">
                      Colección Ginita Holiday
                    </span>
                    <span className="bg-emerald-900/90 text-emerald-200 border border-emerald-400/40 px-2.5 py-1 rounded-lg text-[11px] font-semibold">
                      Navidad 2026
                    </span>
                  </div>
                </div>

                {/* Sub-strip on card */}
                <div className="mt-2.5 px-2 py-1 flex items-center justify-between text-xs text-stone-600">
                  <span className="font-serif italic text-rose-800 font-semibold">Ginita Bakery · Cakes & More</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Agenda Abierta
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Column Proof Strip */}
        <div className="mt-10 pt-6 border-t border-rose-100/70 grid grid-cols-2 md:grid-cols-4 gap-4 text-stone-700">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">100% Artesanal</h4>
              <p className="text-[11px] text-stone-500">Mantequilla pura y sin premezclas</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Envíos & Recogida</h4>
              <p className="text-[11px] text-stone-500">Puntualidad en cada celebración</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Fechas Disponibles</h4>
              <p className="text-[11px] text-stone-500">Elige tu día y horario exacto</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Personalización</h4>
              <p className="text-[11px] text-stone-500">Dedicatorias y diseños únicos</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
