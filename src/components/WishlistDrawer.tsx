import React from 'react';
import { useBakery } from '../context/BakeryContext';
import { X, Heart, ShoppingBag, Trash2, ChevronRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    setSelectedProductForDetail,
  } = useBakery();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToCart = (product: any) => {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 2);

    addToCart({
      product,
      quantity: 1,
      deliveryDate: defaultDate.toISOString().split('T')[0],
      deliveryTimeSlot: '10:00 AM - 1:00 PM',
      unitPrice: product.price,
    });
    toggleWishlist(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end">
      <div className="flex-1" onClick={() => setIsWishlistOpen(false)} />

      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-rose-100 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between bg-rose-50/40">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h3 className="font-serif text-lg font-bold text-stone-900">Lista de Deseos</h3>
            <span className="text-xs bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full tabular-nums">
              {wishlistedProducts.length}
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700"
            aria-label="Cerrar lista de deseos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-rose-300">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-base font-semibold text-stone-800">
                Aún no has guardado favoritos
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Toca el corazón en cualquier bizcocho o postre para guardarlo aquí y ordenar cuando quieras.
              </p>
            </div>
          ) : (
            wishlistedProducts.map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex gap-3 items-center justify-between"
              >
                <div
                  className="flex gap-3 items-center min-w-0 cursor-pointer"
                  onClick={() => {
                    setSelectedProductForDetail(p);
                    setIsWishlistOpen(false);
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover shrink-0 bg-stone-200"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-stone-900 truncate">
                      {p.name}
                    </h4>
                    <span className="font-serif text-xs font-bold text-rose-700 tabular-nums">
                      RD$ {p.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleMoveToCart(p)}
                    className="p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs"
                    title="Pasar al carrito"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    className="p-2 text-stone-400 hover:text-stone-700"
                    title="Remover de lista"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-stone-100">
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="w-full py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-xl"
          >
            Continuar Explorando
          </button>
        </div>

      </div>
    </div>
  );
};
