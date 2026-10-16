import React, { useState, useEffect } from 'react';
import { useBakery } from '../context/BakeryContext';
import {
  X,
  Calendar,
  Clock,
  ShoppingBag,
  Heart,
  Star,
  Sparkles,
  Truck,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForDetail,
    setSelectedProductForDetail,
    addToCart,
    toggleWishlist,
    wishlist,
    setIsCartOpen,
    isDateBlocked,
    showToast,
  } = useBakery();

  const product = selectedProductForDetail;

  const [quantity, setQuantity] = useState(1);
  const [dedication, setDedication] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Default delivery date: 2 days ahead
  const getInitialDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  };

  const [deliveryDate, setDeliveryDate] = useState<string>(getInitialDate());
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('10:00 AM - 1:00 PM');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [selectedOunces, setSelectedOunces] = useState<{ ounces: string; price: number } | null>(null);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setDedication('');
      setSpecialInstructions('');
      
      // Default to first flavor if product has flavors
      if (product.flavors && product.flavors.length > 0) {
        setSelectedFlavor(product.flavors[0]);
      } else {
        setSelectedFlavor('');
      }

      // Default to first ounces option if product has ouncesOptions (e.g. Ponche Artesanal)
      if (product.ouncesOptions && product.ouncesOptions.length > 0) {
        setSelectedOunces(product.ouncesOptions[0]);
      } else {
        setSelectedOunces(null);
      }
    }
  }, [product]);

  if (!product) return null;

  const isSelectedDateBlocked = isDateBlocked(deliveryDate);
  const isWish = wishlist.includes(product.id);
  
  // Compute unit price based on selected presentation/ounces
  const unitPrice = selectedOunces ? selectedOunces.price : product.price;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    if (isSelectedDateBlocked) {
      showToast('⚠️ La fecha seleccionada no está disponible. Por favor elige otra fecha.');
      return;
    }

    let displayName = product.name;
    if (selectedOunces) displayName += ` (${selectedOunces.ounces})`;
    if (selectedFlavor) displayName += ` - Sabor: ${selectedFlavor}`;

    addToCart({
      product: {
        ...product,
        name: displayName,
        price: unitPrice,
      },
      quantity,
      deliveryDate,
      deliveryTimeSlot,
      dedication: dedication.trim() || undefined,
      specialInstructions: specialInstructions.trim() || undefined,
      unitPrice,
    });
    setSelectedProductForDetail(null);
  };

  const handleBuyNow = () => {
    if (isSelectedDateBlocked) {
      showToast('⚠️ La fecha seleccionada no está disponible. Por favor elige otra fecha.');
      return;
    }

    let displayName = product.name;
    if (selectedOunces) displayName += ` (${selectedOunces.ounces})`;
    if (selectedFlavor) displayName += ` - Sabor: ${selectedFlavor}`;

    addToCart({
      product: {
        ...product,
        name: displayName,
        price: unitPrice,
      },
      quantity,
      deliveryDate,
      deliveryTimeSlot,
      dedication: dedication.trim() || undefined,
      specialInstructions: specialInstructions.trim() || undefined,
      unitPrice,
    });
    setSelectedProductForDetail(null);
    setIsCartOpen(true);
  };

  // Helper quick date setter
  const setQuickDay = (daysFromNow: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    setDeliveryDate(d.toISOString().split('T')[0]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForDetail(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-stone-600 hover:text-stone-900 hover:bg-white shadow-md transition-all cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Product Image */}
        <div className="md:w-5/12 relative aspect-[4/3] md:aspect-auto bg-stone-100 overflow-hidden shrink-0">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent md:hidden" />
          
          {product.isHoliday && (
            <div className="absolute top-4 left-4 bg-emerald-900/90 text-emerald-100 border border-emerald-400/50 px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Edición Navidad</span>
            </div>
          )}

          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute bottom-4 left-4 p-2.5 rounded-full bg-white/90 shadow-md text-stone-700 hover:text-rose-600 transition-colors"
            title="Guardar en favoritos"
          >
            <Heart className={`w-4 h-4 ${isWish ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Right Column: Options & Controls */}
        <div className="md:w-7/12 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto max-h-[85vh] space-y-4">
          
          {/* Top Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="uppercase tracking-widest font-bold text-rose-700 text-[10px] bg-rose-50 px-2.5 py-0.5 rounded-md">
                {product.subcategory || product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-stone-800">{product.rating.toFixed(1)}</span>
                <span className="text-[11px] text-stone-400">({product.reviewCount})</span>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                {product.name}
              </h2>
              
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-serif text-2xl font-bold text-emerald-800 tabular-nums">
                  RD$ {unitPrice.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-stone-400 line-through tabular-nums">
                    RD$ {(selectedOunces ? Math.round(unitPrice * 1.15) : product.originalPrice).toLocaleString()}
                  </span>
                )}
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-medium">
                  {product.inStock ? 'Disponible para encargo' : 'Agotado'}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {product.portions && (
              <div className="text-xs text-stone-700 bg-stone-50 p-2 rounded-xl border border-stone-200/60 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Rendimiento: <strong>{product.portions}</strong></span>
              </div>
            )}

            {/* PRESENTACIÓN POR ONZAS (Especial para Ponche Artesanal) */}
            {product.ouncesOptions && product.ouncesOptions.length > 0 && (
              <div className="pt-1">
                <label className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center justify-between">
                  <span>Presentación:</span>
                  <span className="text-[11px] text-emerald-700 font-normal">
                    Seleccionado: {selectedOunces?.ounces}
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.ouncesOptions.map((opt) => {
                    const isSelected = selectedOunces?.ounces === opt.ounces;
                    return (
                      <button
                        key={opt.ounces}
                        type="button"
                        onClick={() => setSelectedOunces(opt)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-bold ring-2 ring-emerald-500/30 shadow-xs'
                            : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        <div className="text-xs font-bold">{opt.ounces}</div>
                        <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                          RD$ {opt.price.toLocaleString()}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SELECCIÓN DE SABOR (Tradicional, Dulce de Leche, Pistacho, Coco, Chocolate) */}
            {product.flavors && product.flavors.length > 0 && (
              <div className="pt-1">
                <label className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center justify-between">
                  <span>Sabor / Variedad:</span>
                  <span className="text-[11px] text-rose-700 font-normal">
                    {selectedFlavor}
                  </span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {product.flavors.map((flv) => {
                    const isSelected = selectedFlavor === flv;
                    return (
                      <button
                        key={flv}
                        type="button"
                        onClick={() => setSelectedFlavor(flv)}
                        className={`px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'border-rose-400 bg-rose-50 text-rose-900 font-bold ring-1 ring-rose-400'
                            : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        {flv}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dedicatoria personalizada */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Dedicatoria para tarjeta o placa de chocolate (opcional):
              </label>
              <input
                type="text"
                placeholder="Ej: ¡Feliz Cumpleaños Mamá! / ¡Feliz Navidad 2026!"
                value={dedication}
                onChange={(e) => setDedication(e.target.value)}
                maxLength={90}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400 bg-stone-50/50"
              />
            </div>

            {/* Calendario de Disponibilidad con Fechas Bloqueadas */}
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Fecha de Entrega o Recogida:</span>
                </label>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setQuickDay(2)}
                    className="text-[10px] px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                  >
                    +2 días
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickDay(3)}
                    className="text-[10px] px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
                  >
                    +3 días
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="date"
                  value={deliveryDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className={`text-xs p-2 rounded-xl border ${
                    isSelectedDateBlocked
                      ? 'border-rose-500 bg-rose-50 text-rose-900 font-bold'
                      : 'border-stone-200 bg-white text-stone-800 focus:border-emerald-500'
                  }`}
                />

                <select
                  value={deliveryTimeSlot}
                  onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                  className="text-xs p-2 rounded-xl border border-stone-200 bg-white text-stone-800"
                >
                  <option value="10:00 AM - 1:00 PM">Mañana: 10:00 AM - 1:00 PM</option>
                  <option value="2:00 PM - 5:00 PM">Tarde: 2:00 PM - 5:00 PM</option>
                  <option value="5:00 PM - 7:30 PM">Noche: 5:00 PM - 7:30 PM</option>
                </select>
              </div>

              {/* Mensaje de Fecha Bloqueada */}
              {isSelectedDateBlocked ? (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-800 text-xs font-semibold animate-shake">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>No disponible: Esta fecha está bloqueada por cupo completo. Por favor elige otro día.</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Fecha disponible para entrega artesanal</span>
                </div>
              )}
            </div>

            {/* Cantidad */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-bold text-stone-800">Cantidad:</span>
              <div className="flex items-center border border-stone-200 rounded-xl bg-white overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-stone-600 hover:bg-stone-100 font-bold text-sm cursor-pointer"
                >
                  −
                </button>
                <span className="px-3 py-1 text-xs font-bold text-stone-800 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-stone-600 hover:bg-stone-100 font-bold text-sm cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-stone-100 space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
              <span>Total a pagar ({quantity} {quantity === 1 ? 'unidad' : 'unidades'}):</span>
              <span className="font-serif text-lg font-bold text-stone-900 tabular-nums">
                RD$ {totalPrice.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isSelectedDateBlocked}
                className="py-3 px-4 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4 text-rose-700" />
                <span>Agregar al Carrito</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isSelectedDateBlocked}
                className="py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Comprar Ahora</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
