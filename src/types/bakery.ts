export type ProductCategory = string;

export interface CategoryItem {
  id: string;
  label: string;
  isCustom?: boolean;
}

export interface HomeBannerSettings {
  title: string;
  subtitle: string;
  announcement: string;
  couponCode: string;
  discountPercentage: number;
  holidayActive: boolean;
  bannerImage: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number; // in DOP RD$
  originalPrice?: number;
  description: string;
  image: string;
  secondaryImage?: string;
  inStock: boolean;
  stockCount: number;
  isHoliday?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
  portions?: string;
  flavors?: string[];
  ouncesOptions?: Array<{ ounces: string; price: number }>;
  holidayCategory?: 'galletas' | 'ponches' | 'postres' | 'regalos';
}

export interface CustomCakeOptions {
  size: string; // e.g., '1/2 Libra (15-20 porciones)'
  portions: number;
  spongeFlavor: string; // e.g., 'Vainilla Dominicana Tradicional', 'Chocolate Fudge', 'Red Velvet'
  filling: string; // e.g., 'Dulce de Leche', 'Crema Pastelera', 'Guayaba', 'Nutella'
  frosting: string; // e.g., 'Suspiro Dominicano (Merengue)', 'Buttercream de Vainilla', 'Ganache de Chocolate'
  palette: string; // e.g., 'Menta & Rosa Pastel con Dorado', 'Blanco & Dorado Navideño', 'Navidad Tradicional'
  theme: string;
  dedicationText: string;
  referenceImageNote?: string;
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // unique item cart uuid
  product: Product;
  quantity: number;
  deliveryDate: string;
  deliveryTimeSlot?: string;
  dedication?: string;
  specialInstructions?: string;
  customCake?: CustomCakeOptions;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    notes?: string;
    deliveryMethod: 'delivery' | 'pickup';
  };
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryFee: number;
  total: number;
  deliveryDate: string;
  deliveryTimeSlot: string;
  paymentMethod: 'transferencia' | 'tarjeta' | 'contra_entrega' | 'enlace_pago';
  paymentStatus: 'pendiente' | 'pagado' | 'comprobante_enviado';
  orderStatus: 'pendiente' | 'en_preparacion' | 'listo' | 'entregado' | 'cancelado';
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  productName: string;
  verified: boolean;
  location?: string;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  minPurchase: number;
  description: string;
  validUntil: string;
  isActive: boolean;
}
