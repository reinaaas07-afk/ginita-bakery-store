import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { GinitaLogo } from './GinitaLogo';
import { ShoppingBag, Heart, Menu, X, Sparkles, Search, ShieldCheck, LogOut, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cartItemCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    activeSection,
    setActiveSection,
    setSelectedCategory,
    setSelectedSubcategory,
    searchQuery,
    setSearchQuery,
    isAdminAuthenticated,
    adminUser,
    setIsAdminOpen,
    logoutAdmin,
  } = useBakery();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleNav = (section: string) => {
    setActiveSection(section);
    if (section === 'navidad') {
      setSelectedCategory('navidad');
    } else if (section === 'salados') {
      setSelectedCategory('salados');
    } else if (section === 'dulces') {
      setSelectedCategory('dulces');
    } else if (section === 'combos') {
      setSelectedCategory('combos');
    } else if (section === 'catalogo') {
      setSelectedCategory('todos');
    }
    setSelectedSubcategory('todos');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-rose-100/80 shadow-[0_2px_15px_-3px_rgba(255,200,215,0.15)] transition-all">
      
      {/* Admin Notice Bar (ONLY visible if Admin is logged in!) */}
      {isAdminAuthenticated && (
        <div className="bg-stone-900 text-stone-200 px-4 py-1.5 text-xs flex items-center justify-between border-b border-amber-500/30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-amber-300">Modo Propietario Activo:</span>
            <span>Bienvenida, {adminUser || 'Chef Ginita'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-white hover:text-amber-300 font-bold underline flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Abrir Panel de Administración</span>
            </button>
            <span className="text-stone-600">|</span>
            <button
              onClick={logoutAdmin}
              className="text-stone-400 hover:text-rose-400 flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-2.5">
        
        {/* Zone 1: Official Brand Logo Lockup */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => handleNav('inicio')}
            className="flex items-center group text-left cursor-pointer transition-transform hover:scale-102"
            title="Ginita Bakery - Inicio"
          >
            <GinitaLogo variant="compact" />
          </button>
        </div>

        {/* Zone 2: Navigation Links (Clean Category & Section Links) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-700">
          <button
            onClick={() => handleNav('inicio')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeSection === 'inicio'
                ? 'text-rose-700 font-bold border-b-2 border-rose-500'
                : 'hover:text-rose-700 hover:border-b-2 hover:border-rose-300'
            }`}
          >
            Inicio
          </button>

          <button
            onClick={() => handleNav('navidad')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'navidad'
                ? 'text-emerald-800 font-bold border-b-2 border-emerald-600'
                : 'text-emerald-700 hover:text-emerald-800 hover:border-b-2 hover:border-emerald-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>🎄 Navidad</span>
          </button>

          <button
            onClick={() => handleNav('dulces')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeSection === 'dulces'
                ? 'text-rose-700 font-bold border-b-2 border-rose-500'
                : 'hover:text-rose-700 hover:border-b-2 hover:border-rose-300'
            }`}
          >
            🎂 Dulces
          </button>

          <button
            onClick={() => handleNav('salados')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeSection === 'salados'
                ? 'text-amber-800 font-bold border-b-2 border-amber-600'
                : 'hover:text-amber-800 hover:border-b-2 hover:border-amber-300'
            }`}
          >
            🌮 Salados
          </button>

          <button
            onClick={() => handleNav('combos')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeSection === 'combos'
                ? 'text-purple-700 font-bold border-b-2 border-purple-500'
                : 'hover:text-purple-700 hover:border-b-2 hover:border-purple-300'
            }`}
          >
            🎁 Combos
          </button>

          <button
            onClick={() => handleNav('eventos')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeSection === 'eventos' || activeSection === 'personalizados'
                ? 'text-rose-700 font-bold border-b-2 border-rose-500'
                : 'hover:text-rose-700 hover:border-b-2 hover:border-rose-300'
            }`}
          >
            🎉 Personalizados
          </button>

          <button
            onClick={() => handleNav('nosotros')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeSection === 'nosotros'
                ? 'text-rose-700 font-bold border-b-2 border-rose-500'
                : 'hover:text-rose-700 hover:border-b-2 hover:border-rose-300'
            }`}
          >
            Nosotros
          </button>

          <button
            onClick={() => handleNav('contacto')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              activeSection === 'contacto'
                ? 'text-rose-700 font-bold border-b-2 border-rose-500'
                : 'hover:text-rose-700 hover:border-b-2 hover:border-rose-300'
            }`}
          >
            Contacto
          </button>
        </nav>

        {/* Zone 3: Search, Wishlist, and Global Cart */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Search Toggle */}
          <div className="relative">
            {showSearchInput ? (
              <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1 shadow-2xs">
                <Search className="w-3.5 h-3.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Buscar dulce o picadera..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-28 sm:w-44 text-xs bg-transparent focus:outline-none text-stone-800"
                />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    setSearchQuery('');
                  }}
                  className="text-stone-400 hover:text-stone-700 text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-stone-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                title="Buscar productos"
                aria-label="Buscar productos"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            title="Lista de Deseos"
            aria-label="Lista de Deseos"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute 1 top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Unique Global Cart CTA Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-stone-900 bg-gradient-to-r from-emerald-100 via-rose-100 to-amber-100 border border-amber-300/70 rounded-xl hover:from-emerald-200 hover:to-rose-200 transition-all shadow-xs whitespace-nowrap shrink-0 group cursor-pointer"
            title="Ver carrito de compras único"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-800 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Carrito</span>
            <span className="bg-emerald-700 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full tabular-nums">
              {cartItemCount}
            </span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:bg-stone-100 rounded-xl cursor-pointer"
            aria-label="Menú principal"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-rose-100 bg-white/98 px-6 py-4 shadow-xl flex flex-col gap-2.5 animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNav('inicio')}
            className="text-left py-2 font-medium text-stone-800 hover:text-rose-700 cursor-pointer"
          >
            Inicio
          </button>
          <button
            onClick={() => handleNav('navidad')}
            className="text-left py-2 font-bold text-emerald-800 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            🎄 Colección Navideña
          </button>
          <button
            onClick={() => handleNav('dulces')}
            className="text-left py-2 font-medium text-stone-800 hover:text-rose-700 cursor-pointer"
          >
            🎂 Dulces & Bizcochos
          </button>
          <button
            onClick={() => handleNav('salados')}
            className="text-left py-2 font-medium text-amber-900 hover:text-amber-700 cursor-pointer"
          >
            🌮 Picaderas & Salados
          </button>
          <button
            onClick={() => handleNav('combos')}
            className="text-left py-2 font-medium text-stone-800 hover:text-rose-700 cursor-pointer"
          >
            🎁 Combos & Regalos
          </button>
          <button
            onClick={() => handleNav('eventos')}
            className="text-left py-2 font-medium text-stone-800 hover:text-rose-700 cursor-pointer"
          >
            🎉 Bizcochos Personalizados
          </button>
          <button
            onClick={() => handleNav('nosotros')}
            className="text-left py-2 font-medium text-stone-800 hover:text-rose-700 cursor-pointer"
          >
            Nosotros
          </button>
          <button
            onClick={() => handleNav('contacto')}
            className="text-left py-2 font-medium text-stone-800 hover:text-rose-700 cursor-pointer"
          >
            Contacto & Pedidos
          </button>

          {isAdminAuthenticated && (
            <div className="pt-2 border-t border-stone-100">
              <button
                onClick={() => {
                  setIsAdminOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 rounded-xl bg-stone-900 text-amber-300 font-bold text-xs flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Panel Administrativo</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
