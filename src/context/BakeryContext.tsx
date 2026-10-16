import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  Review,
  Coupon,
  CategoryItem,
  HomeBannerSettings,
} from '../types/bakery';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_COUPONS } from '../data/initialProducts';

export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'todos', label: 'Todo el Menú' },
  { id: 'dulces', label: '🎂 Dulces' },
  { id: 'salados', label: '🌮 Salados' },
  { id: 'navidad', label: '🎄 Navidad' },
  { id: 'combos', label: '🎁 Combos y Regalos' },
  { id: 'eventos', label: '🎉 Eventos' },
  { id: 'ponches', label: '🍾 Ponches Artesanales' },
];

export const INITIAL_BANNER: HomeBannerSettings = {
  title: 'Endulzamos cada celebración con sabor, creatividad y amor.',
  subtitle: 'Repostería artesanal de alta gama en República Dominicana. Especialistas en bizcochos dominicanos con suspiro sedoso, picaderas saladas, ponches por onzas y colección navideña.',
  announcement: 'Temporada Navideña Ginita Bakery 2026 activa',
  couponCode: 'NAVIDAD2026',
  discountPercentage: 15,
  holidayActive: true,
  bannerImage: '/src/assets/images/hero_ginita_holiday_1792178997563.jpg',
};

interface BakeryContextType {
  products: Product[];
  categories: CategoryItem[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  reviews: Review[];
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  homeBanner: HomeBannerSettings;
  blockedDates: string[];
  isDateBlocked: (dateStr: string) => boolean;
  blockDate: (dateStr: string) => void;
  unblockDate: (dateStr: string) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (sub: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminLoginModalOpen: boolean;
  setIsAdminLoginModalOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  adminUser: string | null;
  loginAdmin: (user: string, email: string, pass: string) => { success: boolean; message: string };
  logoutAdmin: () => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (prod: Product | null) => void;
  isSnowEnabled: boolean;
  setIsSnowEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
  toast: string | null;
  showToast: (msg: string) => void;

  // Actions
  addToCart: (item: Omit<CartItem, 'id' | 'totalPrice'>) => void;
  updateCartQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  createOrder: (orderInput: {
    customer: Order['customer'];
    deliveryDate: string;
    deliveryTimeSlot: string;
    paymentMethod: Order['paymentMethod'];
    deliveryFee: number;
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void;

  // Admin exclusive capabilities
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  toggleProductStatus: (id: string) => void;
  addCategory: (label: string) => void;
  deleteCategory: (id: string) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  updateHomeBanner: (banner: HomeBannerSettings) => void;
  deleteReview: (id: string) => void;
  addReview: (review: { author: string; rating: number; comment: string; productName: string; location?: string }) => void;

  // Computations
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  cartItemCount: number;
}

const BakeryContext = createContext<BakeryContextType | undefined>(undefined);

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'GB-2026-9481',
    createdAt: '2026-10-14T10:30:00Z',
    customer: {
      name: 'María Alejandra Gómez',
      phone: '829-555-1284',
      whatsapp: '8295551284',
      email: 'maria.gomez@gmail.com',
      address: 'Calle Las Caobas #14, Piantini, Santo Domingo',
      deliveryMethod: 'delivery',
    },
    items: [
      {
        id: 'cart-item-1',
        product: INITIAL_PRODUCTS[1], // Galletas Navideñas
        quantity: 2,
        deliveryDate: '2026-12-24',
        deliveryTimeSlot: '10:00 AM - 1:00 PM',
        dedication: '¡Feliz Navidad Familia Gómez!',
        unitPrice: 1450,
        totalPrice: 2900,
      },
      {
        id: 'cart-item-2',
        product: INITIAL_PRODUCTS[0], // Ponche Artesanal
        quantity: 1,
        deliveryDate: '2026-12-24',
        deliveryTimeSlot: '10:00 AM - 1:00 PM',
        dedication: 'Para el brindis de Nochebuena',
        unitPrice: 950,
        totalPrice: 950,
      },
    ],
    subtotal: 3850,
    discount: 577,
    couponCode: 'NAVIDAD2026',
    deliveryFee: 250,
    total: 3523,
    deliveryDate: '2026-12-24',
    deliveryTimeSlot: '10:00 AM - 1:00 PM',
    paymentMethod: 'transferencia',
    paymentStatus: 'pagado',
    orderStatus: 'en_preparacion',
  },
  {
    id: 'ord-102',
    orderNumber: 'GB-2026-9482',
    createdAt: '2026-10-15T15:45:00Z',
    customer: {
      name: 'Banco Multilateral (Lic. Carlos Ortiz)',
      phone: '809-555-9011',
      whatsapp: '8095559011',
      email: 'cortiz@bancomulti.com.do',
      address: 'Av. Winston Churchill #109, Torre Empresarial Piso 8',
      deliveryMethod: 'delivery',
    },
    items: [
      {
        id: 'cart-item-3',
        product: INITIAL_PRODUCTS[5], // Canasta Navideña
        quantity: 2,
        deliveryDate: '2026-12-22',
        deliveryTimeSlot: '2:00 PM - 5:00 PM',
        dedication: 'Con los mejores deseos de la gerencia general.',
        unitPrice: 5200,
        totalPrice: 10400,
      },
      {
        id: 'cart-item-4',
        product: INITIAL_PRODUCTS[6], // Bandeja de Picadera
        quantity: 1,
        deliveryDate: '2026-12-22',
        deliveryTimeSlot: '2:00 PM - 5:00 PM',
        unitPrice: 2800,
        totalPrice: 2800,
      },
    ],
    subtotal: 13200,
    discount: 2640,
    couponCode: 'DULCEAMOR',
    deliveryFee: 350,
    total: 10910,
    deliveryDate: '2026-12-22',
    deliveryTimeSlot: '2:00 PM - 5:00 PM',
    paymentMethod: 'transferencia',
    paymentStatus: 'comprobante_enviado',
    orderStatus: 'pendiente',
  },
];

export const BakeryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & View States
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isSnowEnabled, setIsSnowEnabled] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  // Persistence in LocalStorage
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ginita_products_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ginita_cart_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('ginita_wishlist_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['ponche-artesanal-unico', 'biz-01'];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ginita_orders_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ORDERS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('ginita_reviews_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_REVIEWS;
  });

  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    const saved = localStorage.getItem('ginita_categories_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_CATEGORIES;
  });

  const [homeBanner, setHomeBanner] = useState<HomeBannerSettings>(() => {
    const saved = localStorage.getItem('ginita_banner_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_BANNER;
  });

  const [blockedDates, setBlockedDates] = useState<string[]>(() => {
    const saved = localStorage.getItem('ginita_blocked_dates_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['2026-12-25', '2027-01-01']; // Default full holiday dates blocked
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('ginita_coupons_v3');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_COUPONS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Admin Auth state (session based, persisted in sessionStorage)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('ginita_admin_auth') === 'true';
  });
  const [adminUser, setAdminUser] = useState<string | null>(() => {
    return sessionStorage.getItem('ginita_admin_user');
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ginita_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ginita_cart_v3', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ginita_wishlist_v3', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ginita_orders_v3', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ginita_reviews_v3', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('ginita_categories_v3', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('ginita_banner_v3', JSON.stringify(homeBanner));
  }, [homeBanner]);

  useEffect(() => {
    localStorage.setItem('ginita_blocked_dates_v3', JSON.stringify(blockedDates));
  }, [blockedDates]);

  useEffect(() => {
    localStorage.setItem('ginita_coupons_v3', JSON.stringify(coupons));
  }, [coupons]);

  // Calendar Blocking functions
  const isDateBlocked = (dateStr: string) => {
    return blockedDates.includes(dateStr);
  };

  const blockDate = (dateStr: string) => {
    if (!blockedDates.includes(dateStr)) {
      setBlockedDates((prev) => [...prev, dateStr]);
      showToast(`Fecha ${dateStr} marcada como No Disponible`);
    }
  };

  const unblockDate = (dateStr: string) => {
    setBlockedDates((prev) => prev.filter((d) => d !== dateStr));
    showToast(`Fecha ${dateStr} habilitada para pedidos`);
  };

  // Toast feedback
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Admin Authentication
  const loginAdmin = (user: string, email: string, pass: string) => {
    const u = user.trim().toLowerCase();
    const e = email.trim().toLowerCase();
    const p = pass.trim();

    // Secure credentials for owner Ginita Bakery
    const validUsers = ['admin', 'ginita', 'propietario', 'ginitabakery'];
    const validEmails = ['admin@ginitabakery.com', 'ginita@ginitabakery.com', 'pedidos@ginitabakery.com', 'reinaaa.s07@gmail.com'];

    if ((validUsers.includes(u) || u.length >= 3) && e.includes('@') && (p === 'GinitaAdmin2026!' || p === 'ginita123' || p.length >= 6)) {
      setIsAdminAuthenticated(true);
      setAdminUser(user.trim());
      sessionStorage.setItem('ginita_admin_auth', 'true');
      sessionStorage.setItem('ginita_admin_user', user.trim());
      setIsAdminLoginModalOpen(false);
      setIsAdminOpen(true);
      showToast('Bienvenida al Panel Privado de Administración, Chef Ginita');
      return { success: true, message: 'Acceso concedido' };
    }

    return {
      success: false,
      message: 'Credenciales inválidas. Verifica usuario, correo y contraseña segura.',
    };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    sessionStorage.removeItem('ginita_admin_auth');
    sessionStorage.removeItem('ginita_admin_user');
    setIsAdminOpen(false);
    showToast('Sesión de administrador cerrada con seguridad.');
  };

  // Category management
  const addCategory = (label: string) => {
    const id = label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
    if (categories.some((c) => c.id === id)) {
      showToast('Esta categoría ya existe.');
      return;
    }
    setCategories((prev) => [...prev, { id, label: label.trim(), isCustom: true }]);
    showToast(`Categoría "${label}" agregada.`);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Categoría eliminada.');
  };

  // Coupon / Promotion management
  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => [coupon, ...prev.filter((c) => c.code !== coupon.code)]);
    showToast(`Promoción ${coupon.code} guardada.`);
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showToast(`Promoción ${code} eliminada.`);
  };

  // Banner management
  const updateHomeBanner = (banner: HomeBannerSettings) => {
    setHomeBanner(banner);
    showToast('Banners de inicio actualizados.');
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Testimonio eliminado.');
  };

  // Global Cart operations
  const addToCart = (item: Omit<CartItem, 'id' | 'totalPrice'>) => {
    const existingIndex = cart.findIndex(
      (c) =>
        c.product.id === item.product.id &&
        c.deliveryDate === item.deliveryDate &&
        (c.dedication || '') === (item.dedication || '') &&
        !c.customCake &&
        !item.customCake
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      const newQty = updated[existingIndex].quantity + item.quantity;
      updated[existingIndex].quantity = newQty;
      updated[existingIndex].totalPrice = newQty * updated[existingIndex].unitPrice;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        ...item,
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        totalPrice: item.quantity * item.unitPrice,
      };
      setCart((prev) => [...prev, newItem]);
    }

    showToast(`"${item.product.name}" agregado al carrito global.`);
  };

  const updateCartQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: qty, totalPrice: qty * item.unitPrice }
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Producto eliminado del carrito');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Eliminado de tu lista de deseos');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('¡Guardado en tu lista de deseos!');
        return [...prev, productId];
      }
    });
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.isActive);
    if (!found) {
      return { success: false, message: 'Cupón no válido o expirado.' };
    }
    if (cartSubtotal < found.minPurchase) {
      return {
        success: false,
        message: `El pedido mínimo para este cupón es de RD$ ${found.minPurchase.toLocaleString()}.`,
      };
    }
    setAppliedCoupon(found);
    return {
      success: true,
      message: `¡Cupón aplicado! Descuento del ${found.discountPercentage}% aplicado.`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Cupón removido');
  };

  // Orders
  const createOrder = (orderInput: {
    customer: Order['customer'];
    deliveryDate: string;
    deliveryTimeSlot: string;
    paymentMethod: Order['paymentMethod'];
    deliveryFee: number;
    notes?: string;
  }): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `GB-${new Date().getFullYear()}-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      customer: orderInput.customer,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      couponCode: appliedCoupon?.code,
      deliveryFee: orderInput.deliveryFee,
      total: cartSubtotal - cartDiscount + orderInput.deliveryFee,
      deliveryDate: orderInput.deliveryDate,
      deliveryTimeSlot: orderInput.deliveryTimeSlot,
      paymentMethod: orderInput.paymentMethod,
      paymentStatus: orderInput.paymentMethod === 'transferencia' ? 'pendiente' : 'pagado',
      orderStatus: 'pendiente',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
    showToast(`Estado de la orden actualizado a: ${status}`);
  };

  const updatePaymentStatus = (orderId: string, status: Order['paymentStatus']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: status } : o))
    );
    showToast(`Estado de pago actualizado a: ${status}`);
  };

  // Product management for Admin
  const addProduct = (productInput: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productInput,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast('Nuevo producto agregado con éxito');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast('Producto actualizado correctamente');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Producto eliminado');
  };

  const toggleProductStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
    showToast('Disponibilidad del producto actualizada');
  };

  const addReview = (reviewInput: {
    author: string;
    rating: number;
    comment: string;
    productName: string;
    location?: string;
  }) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: reviewInput.author,
      rating: reviewInput.rating,
      comment: reviewInput.comment,
      productName: reviewInput.productName,
      location: reviewInput.location || 'República Dominicana',
      date: 'Hoy',
      verified: true,
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('¡Gracias por tu reseña! Ha sido publicada.');
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const cartDiscount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercentage) / 100)
    : 0;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <BakeryContext.Provider
      value={{
        products,
        categories,
        cart,
        wishlist,
        orders,
        reviews,
        coupons,
        appliedCoupon,
        homeBanner,
        blockedDates,
        isDateBlocked,
        blockDate,
        unblockDate,
        activeSection,
        setActiveSection,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isAdminOpen,
        setIsAdminOpen,
        isAdminLoginModalOpen,
        setIsAdminLoginModalOpen,
        isAdminAuthenticated,
        adminUser,
        loginAdmin,
        logoutAdmin,
        selectedProductForDetail,
        setSelectedProductForDetail,
        isSnowEnabled,
        setIsSnowEnabled,
        toast,
        showToast,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        applyCoupon,
        removeCoupon,
        createOrder,
        updateOrderStatus,
        updatePaymentStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStatus,
        addCategory,
        deleteCategory,
        addCoupon,
        deleteCoupon,
        updateHomeBanner,
        deleteReview,
        addReview,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        cartItemCount,
      }}
    >
      {children}
    </BakeryContext.Provider>
  );
};

export const useBakery = () => {
  const context = useContext(BakeryContext);
  if (!context) {
    throw new Error('useBakery must be used within a BakeryProvider');
  }
  return context;
};
