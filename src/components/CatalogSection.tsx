import React, { useMemo } from 'react';
import { useBakery } from '../context/BakeryContext';
import { Product } from '../types/bakery';
import {
  Heart,
  ShoppingBag,
  Star,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

interface SpecialtyCard {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  image: string;
  badge: string;
  itemCount: string;
  highlights: string[];
  gradient: string;
}

export const SPECIALTIES: SpecialtyCard[] = [
  {
    id: 'dulces',
    name: 'Dulces de Autor',
    tagline: 'Bizcochos dominicanos con suspiro tostado, brownies fudgy, tres leches y cheesecakes.',
    emoji: '🎂',
    image: '/src/assets/images/bizcocho_suspiro_real_1792179925460.jpg',
    badge: 'Receta Tradicional',
    itemCount: 'Bizcochos · Brownies · Postres',
    highlights: ['Bizcochos dominicanos', 'Brownies fudgy', 'Tres leches', 'Cheesecakes', 'Cupcakes'],
    gradient: 'from-rose-500/80 to-rose-950/90',
  },
  {
    id: 'salados',
    name: 'Picaderas & Salados',
    tagline: 'Pastelitos hojaldrados, quipes de res, croquetas cremosas, empanadas y bandejas de picadera.',
    emoji: '🌮',
    image: '/src/assets/images/picadera_salados_dominicana_1792180633517.jpg',
    badge: '¡Nueva Sección!',
    itemCount: '11 Especialidades Saladas',
    highlights: ['Pastelitos', 'Quipes', 'Croquetas', 'Empanadas', 'Bandejas Fiesta', 'Deditos'],
    gradient: 'from-amber-600/80 to-stone-950/90',
  },
  {
    id: 'navidad',
    name: 'Colección Navideña 2026',
    tagline: 'Galletas decoradas con glasé real, Ponche Artesanal por onzas, tronco navideño y canastas.',
    emoji: '🎄',
    image: '/src/assets/images/galletas_postres_navidenos_1792178999521.jpg',
    badge: 'Temporada Festiva',
    itemCount: 'Ponches · Galletas · Tronco',
    highlights: ['Galletas navideñas', 'Ponche Artesanal', 'Tronco de chocolate', 'Canastas'],
    gradient: 'from-emerald-700/80 to-emerald-950/90',
  },
  {
    id: 'combos',
    name: 'Combos & Regalos',
    tagline: 'Canastas de lujo, kits familiares para compartir y combos corporativos para empresas.',
    emoji: '🎁',
    image: '/src/assets/images/hero_ginita_holiday_1792178997563.jpg',
    badge: 'Para Compartir',
    itemCount: 'Canastas · Cajas · Kits VIP',
    highlights: ['Canastas de gala', 'Kits familiares', 'Combos corporativos'],
    gradient: 'from-purple-600/80 to-stone-950/90',
  },
  {
    id: 'eventos',
    name: 'Eventos & Personalizados',
    tagline: 'Configura tu bizcocho soñado a medida: sabor de masa, relleno, suspiro, paleta y dedicatoria.',
    emoji: '🎉',
    image: '/src/assets/images/bizcocho_personalizado_lujo_1792178999240.jpg',
    badge: 'A tu Medida',
    itemCount: 'Configurador en Vivo',
    highlights: ['Bodas y Quinceañeras', 'Suspiro dominicano', 'Masa esponjosa', 'Cotización instantánea'],
    gradient: 'from-pink-600/80 to-stone-950/90',
  },
];

export const CatalogSection: React.FC = () => {
  const {
    products,
    activeSection,
    setActiveSection,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    searchQuery,
    setSearchQuery,
    setSelectedProductForDetail,
    toggleWishlist,
    wishlist,
    isAdminAuthenticated,
  } = useBakery();

  // Filter products: clients ONLY see inStock products; admins can see all
  const visibleProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Inactive products hidden from normal clients
      if (!isAdminAuthenticated && !p.inStock) {
        return false;
      }

      // 2. Category filtering
      if (activeSection !== 'inicio' && activeSection !== 'catalogo') {
        if (activeSection === 'dulces' && p.category !== 'dulces') return false;
        if (activeSection === 'salados' && p.category !== 'salados') return false;
        if (activeSection === 'navidad' && p.category !== 'navidad' && !p.isHoliday) return false;
        if (activeSection === 'combos' && p.category !== 'combos') return false;
        if (activeSection === 'ponches' && p.category !== 'ponches') return false;
      } else if (selectedCategory !== 'todos') {
        if (p.category !== selectedCategory && (!p.isHoliday || selectedCategory !== 'navidad')) {
          return false;
        }
      }

      // 3. Subcategory filtering
      if (selectedSubcategory && selectedSubcategory !== 'todos') {
        const sub = (p.subcategory || '').toLowerCase();
        if (!sub.includes(selectedSubcategory.toLowerCase())) {
          return false;
        }
      }

      // 4. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesSub = (p.subcategory || '').toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesSub) return false;
      }

      return true;
    });
  }, [products, activeSection, selectedCategory, selectedSubcategory, searchQuery, isAdminAuthenticated]);

  // Subcategories for current active view
  const currentSubcategories = useMemo(() => {
    if (activeSection === 'salados') {
      return [
        'todos',
        'Pastelitos',
        'Quipes',
        'Croquetas',
        'Empanadas',
        'Mini Sandwiches',
        'Wraps',
        'Tacos',
        'Nachos',
        'Bandejas de Picadera',
        'Deditos de Queso',
        'Pizza Bites',
      ];
    }
    if (activeSection === 'dulces') {
      return ['todos', 'Bizcochos', 'Brownies', 'Tres leches', 'Cheesecakes', 'Cupcakes', 'Mini postres'];
    }
    if (activeSection === 'navidad') {
      return ['todos', 'Galletas Navideñas', 'Ponches Artesanales', 'Postres Navideños', 'Regalos Navideños'];
    }
    if (activeSection === 'combos') {
      return ['todos', 'Kits de regalo', 'Combos corporativos', 'Combos familiares'];
    }
    return ['todos'];
  }, [activeSection]);

  const handleSelectSpecialty = (specId: string) => {
    setActiveSection(specId);
    setSelectedCategory(specId);
    setSelectedSubcategory('todos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSpecialties = () => {
    setActiveSection('inicio');
    setSelectedCategory('todos');
    setSelectedSubcategory('todos');
    setSearchQuery('');
  };

  // If user is on the main 'inicio' view, show the prominent "CATÁLOGO DE ESPECIALIDADES" cards FIRST
  const isSpecialtiesHub = activeSection === 'inicio';

  return (
    <section id="catalogo" className="py-10 sm:py-14 bg-[#FAFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* ============================================================== */}
        {/* VIEW 1: CATÁLOGO DE ESPECIALIDADES (5 Grandes Tarjetas Ilustrativas) */}
        {/* ============================================================== */}
        {isSpecialtiesHub && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Nuestras Creaciones Artesanales</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
                Catálogo de Especialidades
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Selecciona la categoría que deseas explorar para ver sus productos exclusivos sin desplazarte por toda la página.
              </p>
            </div>

            {/* 5 Big Illustrative Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {SPECIALTIES.map((spec, index) => {
                const isFeaturedWide = index === 0 || index === 1; // Top 2 prominent
                return (
                  <div
                    key={spec.id}
                    onClick={() => handleSelectSpecialty(spec.id)}
                    className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 border border-rose-100/70 bg-white flex flex-col justify-between ${
                      index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                    }`}
                  >
                    {/* Image Container with Aspect Ratio */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                      <img
                        src={spec.image}
                        alt={spec.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${spec.gradient} opacity-75 group-hover:opacity-85 transition-opacity`} />
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-white/95 text-stone-900 text-xs font-bold shadow-md flex items-center gap-1.5 backdrop-blur-xs">
                          <span>{spec.emoji}</span>
                          <span>{spec.badge}</span>
                        </span>
                        <span className="text-white/90 text-[11px] font-medium bg-black/30 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                          {spec.itemCount}
                        </span>
                      </div>

                      {/* Title on Image */}
                      <div className="absolute bottom-4 left-5 right-5 text-white">
                        <h3 className="font-serif text-2xl font-bold tracking-wide flex items-center gap-2">
                          <span>{spec.name}</span>
                        </h3>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white space-y-4">
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                        {spec.tagline}
                      </p>

                      {/* Sub-pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {spec.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="text-[10px] sm:text-[11px] font-medium text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-md"
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-rose-700 group-hover:text-emerald-800 transition-colors">
                        <span>Explorar {spec.name}</span>
                        <div className="w-8 h-8 rounded-full bg-rose-50 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Helper Bar */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-rose-50 to-amber-50 border border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-700">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-stone-900">
                  Carrito de Compras Único & Global:
                </span>
                <span>
                  Puedes agregar dulces, picaderas saladas, ponches y combos en la misma orden sin perder tus selecciones.
                </span>
              </div>
              <button
                onClick={() => {
                  setActiveSection('catalogo');
                  setSelectedCategory('todos');
                }}
                className="px-4 py-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 font-semibold text-stone-800 transition-colors whitespace-nowrap shadow-2xs cursor-pointer"
              >
                Ver Todo el Catálogo Completo
              </button>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: CATEGORÍA ENFOCADA (Sin desplazamiento infinito!) */}
        {/* ============================================================== */}
        {!isSpecialtiesHub && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Top Navigation Bar: Back Button & Title */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <button
                type="button"
                onClick={handleBackToSpecialties}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-stone-200 hover:border-rose-300 text-stone-700 hover:text-rose-700 text-xs font-bold transition-all shadow-2xs cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-rose-600" />
                <span>← Volver a Catálogo de Especialidades</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar en esta categoría..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none focus:border-emerald-500 text-stone-800 shadow-2xs"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Category Header Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-stone-900 to-rose-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="space-y-2 text-center md:text-left z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-amber-300 text-[11px] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ginita Bakery · Especialidades</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white capitalize">
                  {activeSection === 'salados' && '🌮 Picaderas & Salados'}
                  {activeSection === 'dulces' && '🎂 Dulces & Bizcochos'}
                  {activeSection === 'navidad' && '🎄 Colección Navideña 2026'}
                  {activeSection === 'combos' && '🎁 Combos & Regalos de Gala'}
                  {activeSection === 'ponches' && '🍾 Ponche Artesanal'}
                  {activeSection === 'catalogo' && '✨ Todo el Catálogo'}
                </h1>
                <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                  {activeSection === 'salados' && 'Pastelitos hojaldrados, quipes tradicionales, croquetas, empanaditas y bandejas de picadera fresca para tus eventos.'}
                  {activeSection === 'dulces' && 'El auténtico sabor del bizcocho dominicano con suspiro de seda, brownies fudgy con cacao puro y tres leches irresistibles.'}
                  {activeSection === 'navidad' && 'Nuestros ponches por onzas, galletas decoradas a mano y delicias temáticas para celebrar la Nochebuena.'}
                  {activeSection === 'combos' && 'Paquetes completos con ponches, bizcochos y picaderas para empresas y reuniones familiares.'}
                  {activeSection === 'ponches' && 'El auténtico ponche dominicano en presentaciones de 5 oz, 8 oz, 16 oz, 32 oz y botella completa.'}
                  {activeSection === 'catalogo' && 'Explora todas las delicias dulces y saladas elaboradas en nuestro obrador.'}
                </p>
              </div>

              {/* Counter Pill */}
              <div className="z-10 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-2xl text-center">
                <span className="block font-serif text-2xl font-bold text-amber-300">
                  {visibleProducts.length}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-stone-300">
                  Productos Disponibles
                </span>
              </div>
            </div>

            {/* Subcategory Pills Filter */}
            {currentSubcategories.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
                <span className="text-xs font-semibold text-stone-500 shrink-0 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  Filtrar:
                </span>
                {currentSubcategories.map((sub) => {
                  const isSelected = selectedSubcategory === sub;
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-stone-900 text-white shadow-xs font-bold'
                          : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      {sub === 'todos' ? 'Todos los Productos' : sub}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Products Grid */}
            {visibleProducts.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-3xl border border-stone-200/80 p-8 space-y-3">
                <p className="font-serif text-lg text-stone-700">
                  No se encontraron productos en esta categoría o filtro.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubcategory('todos');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleProducts.map((product) => {
                  const isWish = wishlist.includes(product.id);
                  const isPonche = product.id === 'ponche-artesanal-unico' || product.category === 'ponches';

                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Image Box */}
                      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                        />

                        {/* Holiday Badge */}
                        {product.isHoliday && (
                          <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-emerald-900/90 text-emerald-200 border border-emerald-400/50 text-[10px] font-bold flex items-center gap-1 shadow-xs">
                            <Sparkles className="w-3 h-3 text-amber-300" />
                            <span>Navideño</span>
                          </div>
                        )}

                        {/* Wishlist Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-rose-600 shadow-sm transition-colors cursor-pointer"
                          title="Guardar en favoritos"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>

                        {/* Ponche presentation helper pill */}
                        {isPonche && (
                          <div className="absolute bottom-2 left-2 right-2 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded-lg text-center font-semibold">
                            Presentaciones: 5oz, 8oz, 16oz, 32oz o Botella
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] text-stone-500">
                            <span className="font-semibold text-rose-700 uppercase tracking-wider text-[10px]">
                              {product.subcategory || product.category}
                            </span>
                            <div className="flex items-center gap-0.5 text-amber-500">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="font-bold text-stone-700 text-xs">{product.rating.toFixed(1)}</span>
                            </div>
                          </div>

                          <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 leading-snug line-clamp-2">
                            {product.name}
                          </h3>

                          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Price & Action */}
                        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] text-stone-400 block">
                              {isPonche ? 'Desde' : 'Precio'}
                            </span>
                            <span className="font-serif text-lg font-bold text-emerald-800 tabular-nums">
                              RD$ {product.price.toLocaleString()}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setSelectedProductForDetail(product)}
                            className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                            <span>{isPonche ? 'Elegir Tamaño' : 'Personalizar'}</span>
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Back Button */}
            <div className="pt-8 text-center">
              <button
                type="button"
                onClick={handleBackToSpecialties}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-stone-300 hover:border-emerald-600 text-stone-800 font-bold text-xs shadow-xs transition-all hover:bg-stone-50 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-700" />
                <span>Volver al Catálogo de Especialidades</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
