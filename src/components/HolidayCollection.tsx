import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { Product } from '../types/bakery';
import { Sparkles, Gift, Wine, Cookie, CakeSlice, ShoppingBag, Heart, Star, Calendar, MessageSquare, ChevronRight } from 'lucide-react';

export const HolidayCollection: React.FC = () => {
  const {
    products,
    addToCart,
    toggleWishlist,
    wishlist,
    setSelectedProductForDetail,
    setIsCartOpen,
    isAdminAuthenticated,
    isDateBlocked,
    showToast,
  } = useBakery();

  const [holidayFilter, setHolidayFilter] = useState<'todos' | 'galletas' | 'ponches' | 'postres' | 'regalos'>('todos');

  // Filter holiday products (hide inactive products from non-admins)
  const holidayProducts = products.filter((p) => {
    if (!isAdminAuthenticated && !p.inStock) return false;
    if (!p.isHoliday) return false;
    if (holidayFilter === 'todos') return true;
    return p.holidayCategory === holidayFilter;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProductForDetail(product);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 2);
    const dateStr = defaultDate.toISOString().split('T')[0];

    addToCart({
      product,
      quantity: 1,
      deliveryDate: dateStr,
      deliveryTimeSlot: '10:00 AM - 1:00 PM',
      unitPrice: product.price,
    });
  };

  return (
    <section id="navidad" className="py-16 lg:py-24 bg-[#0F241D] text-stone-100 relative overflow-hidden">
      
      {/* Decorative festive ornaments & light glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-700/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-rose-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-200 text-xs font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Temporada Navideña Ginita Bakery 2026</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Magia Dulce para tus Fiestas Navideñas
          </h2>

          <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
            Galletas glaseadas con arte navideño, ponches artesanales cremosos en botellas de autor, troncos de chocolate y canastas diseñadas para compartir amor.
          </p>

          {/* Interactive Holiday Filter Tabs */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setHolidayFilter('todos')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                holidayFilter === 'todos'
                  ? 'bg-amber-400 text-stone-900 font-semibold shadow-sm'
                  : 'bg-emerald-950/70 text-stone-300 hover:text-white border border-emerald-800/60'
              }`}
            >
              Todo lo Navideño ({products.filter((p) => p.isHoliday).length})
            </button>
            <button
              onClick={() => setHolidayFilter('galletas')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                holidayFilter === 'galletas'
                  ? 'bg-amber-400 text-stone-900 font-semibold shadow-sm'
                  : 'bg-emerald-950/70 text-stone-300 hover:text-white border border-emerald-800/60'
              }`}
            >
              <Cookie className="w-3.5 h-3.5" />
              Galletas Reales (Árbol, Renos, Santa...)
            </button>
            <button
              onClick={() => setHolidayFilter('ponches')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                holidayFilter === 'ponches'
                  ? 'bg-amber-400 text-stone-900 font-semibold shadow-sm'
                  : 'bg-emerald-950/70 text-stone-300 hover:text-white border border-emerald-800/60'
              }`}
            >
              <Wine className="w-3.5 h-3.5" />
              Ponches Artesanales (Pistacho, Tradicional, Dulce de Leche)
            </button>
            <button
              onClick={() => setHolidayFilter('postres')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                holidayFilter === 'postres'
                  ? 'bg-amber-400 text-stone-900 font-semibold shadow-sm'
                  : 'bg-emerald-950/70 text-stone-300 hover:text-white border border-emerald-800/60'
              }`}
            >
              <CakeSlice className="w-3.5 h-3.5" />
              Postres (Tronco, Cheesecakes, Brownies)
            </button>
            <button
              onClick={() => setHolidayFilter('regalos')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                holidayFilter === 'regalos'
                  ? 'bg-amber-400 text-stone-900 font-semibold shadow-sm'
                  : 'bg-emerald-950/70 text-stone-300 hover:text-white border border-emerald-800/60'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              Canastas & Regalos Corporativos
            </button>
          </div>
        </div>

        {/* Holiday Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {holidayProducts.map((product) => {
            const isWish = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                onClick={() => setSelectedProductForDetail(product)}
                className="group cursor-pointer rounded-2xl bg-stone-900/80 border border-emerald-700/40 p-4 transition-all duration-300 hover:border-amber-400/60 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between backdrop-blur-sm"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-800 mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

                    {/* Wishlist toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white transition-colors backdrop-blur-sm"
                      aria-label="Guardar en lista de deseos"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWish ? 'fill-rose-500 text-rose-500' : 'text-stone-300'
                        }`}
                      />
                    </button>

                    {/* Price Tag in image */}
                    <div className="absolute bottom-3 left-3 flex items-baseline gap-2">
                      <span className="font-serif text-lg font-bold text-amber-300 tabular-nums">
                        RD$ {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-stone-400 line-through tabular-nums">
                          RD$ {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-stone-400">
                      <span className="text-emerald-300 font-medium uppercase tracking-wider text-[11px]">
                        {product.subcategory || 'Navidad Ginita'}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-mono text-stone-200">{product.rating.toFixed(1)}</span>
                        <span className="text-stone-500">({product.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-white group-hover:text-amber-200 transition-colors leading-snug">
                      {product.name}
                    </h3>

                    <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {product.portions && (
                      <p className="text-[11px] text-stone-400 flex items-center gap-1.5 pt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{product.portions}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-emerald-900/60 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleProductClick(product)}
                    className="w-full py-2.5 px-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold rounded-xl text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-stone-900" />
                    <span>{product.ouncesOptions ? 'Elegir Presentación & Sabor' : 'Personalizar & Pedir'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Holiday Corporate Note */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-stone-900 to-emerald-950/80 border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-lg font-semibold text-amber-200">
              ¿Deseas cotizar canastas navideñas para tu empresa o familia?
            </h4>
            <p className="text-xs text-stone-300">
              Personalizamos etiquetas con el logo de tu empresa y entregamos en Santo Domingo y Santiago con factura fiscal comprobante (NCF).
            </p>
          </div>
          <a
            href="https://wa.me/18295551284?text=Hola%20Ginita%20Bakery,%20quisiera%20cotizar%20un%20pedido%20corporativo%20de%20Navidad."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg whitespace-nowrap shadow-sm transition-all shrink-0 flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-stone-900" />
            <span>Cotizar por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
