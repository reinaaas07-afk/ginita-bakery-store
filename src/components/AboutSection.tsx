import React from 'react';
import { Heart, Sparkles, Award, Coffee, Cake, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="nosotros" className="py-16 lg:py-24 bg-[#FFF9FA] border-b border-rose-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Storytelling */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-rose-100 shadow-xl border-4 border-white relative">
                <img
                  src="/src/assets/images/bizcocho_suspiro_real_1792179925460.jpg"
                  alt="Bizcocho Dominicano con suspiro tostado y lazos artesanales Ginita Bakery"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Quote Box */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-amber-200/60">
                  <p className="font-serif italic text-xs sm:text-sm text-stone-900 leading-snug">
                    "Cada bizcocho que horneamos lleva el alma de nuestra cocina: sabor auténtico dominicano y el cuidado de los detalles que hacen inolvidable tu día."
                  </p>
                  <span className="block mt-2 text-[11px] font-bold uppercase tracking-wider text-rose-700">
                    — Chef Ginita & Equipo
                  </span>
                </div>
              </div>

              {/* Decorative floating badge */}
              <div className="absolute -top-4 -right-4 bg-emerald-900 text-amber-200 border border-amber-400/50 p-3 rounded-2xl shadow-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-sans text-emerald-200">Desde 2018</div>
                  <div className="text-xs font-serif font-bold text-white">Pasión Artesanal</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Brand Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/80">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Nuestra Historia & Filosofía</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
              Ginita Bakery: Donde el Sabor se Convierte en Arte
            </h2>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              Nacimos del amor por el auténtico <strong>bizcocho dominicano</strong>: esa masa húmeda, esponjosa e impregnada de almíbar aromático, coronada por el suspiro perfecto de textura sedosa y brillo nacarado. Con los años, expandimos nuestra pasión hacia los brownies fudge más intensos, cheesecakes de autor y nuestros aclamados <strong>ponches artesanales de temporada navideña</strong>.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              Creemos firmemente que una celebración no está completa sin un postre que despierte sonrisas y una sobremesa inolvidable. Por eso, en <strong>Ginita Bakery - Cakes & More</strong>, no usamos mezclas prefabricadas: cada ingrediente se selecciona a mano, desde la vainilla pura y el dulce de leche hasta las perlas y hojas de oro comestible de 24 quilates.
            </p>

            {/* Core Values 3-Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-rose-200/60">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-stone-900 font-semibold text-sm">
                  <Heart className="w-4 h-4 text-rose-600" />
                  <span>Amor & Detalle</span>
                </div>
                <p className="text-xs text-stone-500 leading-normal">
                  Diseños únicos personalizados a tu medida y estilo.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-stone-900 font-semibold text-sm">
                  <Coffee className="w-4 h-4 text-amber-600" />
                  <span>Ingredientes Puros</span>
                </div>
                <p className="text-xs text-stone-500 leading-normal">
                  Mantequilla de verdad, chocolate belga y frutas frescas.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-stone-900 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Puntualidad</span>
                </div>
                <p className="text-xs text-stone-500 leading-normal">
                  Tu pedido listo a la hora pactada, sin contratiempos.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
