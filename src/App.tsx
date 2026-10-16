import React from 'react';
import { BakeryProvider, useBakery } from './context/BakeryContext';
import { FestiveEffects, ChristmasFairyLights } from './components/FestiveEffects';
import { FestiveBanner } from './components/FestiveBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HolidayCollection } from './components/HolidayCollection';
import { CustomCakeBuilder } from './components/CustomCakeBuilder';
import { CatalogSection } from './components/CatalogSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AdminPanel } from './components/AdminPanel';
import { AdminLoginModal } from './components/AdminLoginModal';
import { FloatingWhatsAppChat } from './components/FloatingWhatsAppChat';

const MainAppContent: React.FC = () => {
  const { activeSection, toast } = useBakery();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-stone-800 antialiased selection:bg-rose-200 selection:text-rose-900">
      
      {/* Festive Holiday Effects (Snow & Fairy Lights) */}
      <FestiveEffects />
      <ChristmasFairyLights />
      <FestiveBanner />

      {/* Main Top Navigation */}
      <Navbar />

      {/* Main Flow: Non-infinite-scroll section router */}
      <main className="flex-1">
        {/* 1. Vista de Inicio: Hero + Catálogo de Especialidades */}
        {activeSection === 'inicio' && (
          <>
            <HeroSection />
            <CatalogSection />
            <TestimonialsSection />
          </>
        )}

        {/* 2. Vistas de Categorías Específicas (Sin tener que recorrer toda la página) */}
        {(activeSection === 'dulces' ||
          activeSection === 'salados' ||
          activeSection === 'combos' ||
          activeSection === 'ponches' ||
          activeSection === 'catalogo') && (
          <CatalogSection />
        )}

        {/* 3. Vista Exclusiva Navidad */}
        {activeSection === 'navidad' && (
          <>
            <HolidayCollection />
            <CatalogSection />
          </>
        )}

        {/* 4. Vista Bizcochos Personalizados & Eventos */}
        {(activeSection === 'eventos' || activeSection === 'personalizados') && (
          <CustomCakeBuilder />
        )}

        {/* 5. Vista Nosotros */}
        {activeSection === 'nosotros' && (
          <>
            <AboutSection />
            <TestimonialsSection />
          </>
        )}

        {/* 6. Vista Contacto & Pedidos */}
        {activeSection === 'contacto' && (
          <ContactSection />
        )}
      </main>

      {/* Footer with Discreet Admin Access */}
      <Footer />

      {/* Overlays, Drawers & Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <WishlistDrawer />
      <AdminPanel />
      <AdminLoginModal />
      <FloatingWhatsAppChat />

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold shadow-2xl border border-stone-700 animate-in fade-in slide-in-from-bottom-3 duration-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <BakeryProvider>
      <MainAppContent />
    </BakeryProvider>
  );
}
