import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { X, Trash2, ArrowRight, ShoppingBag, Tag, Sparkles, Calendar } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    setSelectedProductForDetail,
  } = useBakery();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
      
      {/* Click outside to close */}
      <div className="flex-1" onClick={() => setIsCartOpen(false)} />

      {/* Slide-over panel */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-rose-100 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between bg-gradient-to-r from-rose-50/50 to-emerald-50/40">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-700" />
            <h3 className="font-serif text-lg font-bold text-stone-900">Tu Carrito Dulce</h3>
            <span className="text-xs bg-rose-200/70 text-rose-800 font-bold px-2 py-0.5 rounded-full tabular-nums">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-rose-300">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-base font-semibold text-stone-800">
                Tu carrito aún está vacío
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explora nuestra colección navideña, bizcochos personalizados y brownies artesanales.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/80 flex gap-3.5 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-stone-200"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-semibold text-stone-900 truncate">
                      {item.product.name}
                    </h4>

                    {/* Dedication or date info */}
                    <div className="text-[11px] text-stone-500 space-y-0.5">
                      <p className="flex items-center gap-1 text-emerald-800 font-medium">
                        <Calendar className="w-3 h-3 text-emerald-600" />
                        <span>Entrega: {item.deliveryDate}</span>
                      </p>
                      {item.dedication && (
                        <p className="italic truncate text-rose-700">
                          Placa: "{item.dedication}"
                        </p>
                      )}
                    </div>

                    {/* Pricing & Quantity modifier */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-serif text-xs font-bold text-stone-900 tabular-nums">
                        RD$ {item.totalPrice.toLocaleString()}
                      </span>

                      <div className="flex items-center border border-stone-200 rounded-md bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-medium text-stone-800 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-100 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 text-stone-400 hover:text-rose-600 transition-colors self-start"
                    title="Eliminar producto"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              <div className="text-right pt-1">
                <button
                  onClick={clearCart}
                  className="text-[11px] text-stone-400 hover:text-stone-700 underline"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-stone-100 bg-stone-50/50 space-y-4">
            
            {/* Coupon Code section */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>
                      Cupón <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discountPercentage}%)
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-stone-700 font-bold text-xs"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Código de cupón (Ej: NAVIDAD2026)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-white text-stone-800 uppercase focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Aplicar
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono text-stone-900 tabular-nums">
                  RD$ {cartSubtotal.toLocaleString()}
                </span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Descuento aplicado:</span>
                  <span className="font-mono tabular-nums">
                    - RD$ {cartDiscount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-stone-500 text-[11px]">
                <span>Envío / Retiro:</span>
                <span>Se calcula en el siguiente paso</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-stone-200">
                <span className="text-sm font-bold text-stone-900">Total Estimado:</span>
                <span className="font-serif text-2xl font-bold text-rose-700 tabular-nums">
                  RD$ {cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:scale-[0.99] text-white font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Finalizar Compra</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
