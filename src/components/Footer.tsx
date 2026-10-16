import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { Sparkles, Mail, Heart, Shield, Instagram, Facebook, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setActiveSection,
    setSelectedCategory,
    setIsAdminOpen,
    setIsAdminLoginModalOpen,
    isAdminAuthenticated,
    showToast,
  } = useBakery();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    showToast('¡Te has suscrito! Tu cupón de 10% OFF es GINITA10');
    setNewsletterEmail('');
  };

  const handleNav = (sec: string, cat?: string) => {
    setActiveSection(sec);
    if (cat) setSelectedCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminTrigger = () => {
    if (isAdminAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Newsletter Subscription Box */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-stone-900 to-rose-950/70 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-300 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Club Dulce Ginita Bakery</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Recibe 10% OFF en tu Primer Pedido
            </h3>
            <p className="text-xs text-stone-300 max-w-md">
              Suscríbete para recibir recetas exclusivas, promociones navideñas y lanzamientos de temporada.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                placeholder="tu@correo.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full sm:w-64 pl-9 pr-3 py-2.5 text-xs rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl transition-colors whitespace-nowrap"
            >
              Suscribirme
            </button>
          </form>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-serif font-bold text-base">
                G
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-wide">
                Ginita Bakery
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed max-w-sm">
              Repostería artesanal dominicana contemporánea. Diseñamos bizcochos de gala, ponches gourmet de temporada, brownies y mesas de postres para endulzar tus momentos inolvidables.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-stone-800 hover:bg-rose-900/60 text-stone-300 hover:text-white transition-colors"
                aria-label="Instagram de Ginita Bakery"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-stone-800 hover:bg-blue-900/60 text-stone-300 hover:text-white transition-colors"
                aria-label="Facebook de Ginita Bakery"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-sm font-semibold text-white">Navegación</h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button onClick={() => handleNav('inicio')} className="hover:text-rose-400 transition-colors">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('navidad', 'navidad')} className="hover:text-amber-300 transition-colors flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Colección Navideña</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('catalogo', 'todos')} className="hover:text-rose-400 transition-colors">
                  Catálogo Completo
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('personalizados')} className="hover:text-rose-400 transition-colors">
                  Bizcochos Personalizados
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('nosotros')} className="hover:text-rose-400 transition-colors">
                  Nuestra Historia
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contacto')} className="hover:text-rose-400 transition-colors">
                  Contacto & Pedidos
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-sm font-semibold text-white">Especialidades</h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button onClick={() => handleNav('salados', 'salados')} className="hover:text-amber-400 transition-colors">
                  🌮 Picaderas & Salados
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dulces', 'dulces')} className="hover:text-rose-400 transition-colors">
                  🎂 Bizcochos Dominicanos
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dulces', 'dulces')} className="hover:text-rose-400 transition-colors">
                  🍫 Brownies Fudgy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('navidad', 'navidad')} className="hover:text-amber-300 transition-colors">
                  🍾 Ponche Artesanal por Onzas
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dulces', 'dulces')} className="hover:text-rose-400 transition-colors">
                  🍮 Tres Leches & Postres
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('combos', 'combos')} className="hover:text-rose-400 transition-colors">
                  🎁 Canastas & Combos
                </button>
              </li>
            </ul>
          </div>

          {/* Payment Methods & Admin */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-sm font-semibold text-white">Pagos Aceptados</h4>
            <p className="text-stone-400 leading-normal">
              Transferencia bancaria en Banco Popular, Banreservas, BHD, tarjetas de débito/crédito y contra entrega.
            </p>
            <div className="pt-2">
              <button
                onClick={handleAdminTrigger}
                className="text-stone-500 hover:text-amber-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Acceso exclusivo para el propietario de Ginita Bakery"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>{isAdminAuthenticated ? 'Panel Administrativo (Activo)' : 'Acceso Propietario / Admin'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Ginita Bakery - Cakes & More. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>en República Dominicana</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
