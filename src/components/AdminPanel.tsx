import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { Product, Order, ProductCategory } from '../types/bakery';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  Download,
  CheckCircle,
  Clock,
  Sparkles,
  Package,
  Layers,
  Search,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
    orders,
    updateOrderStatus,
    updatePaymentStatus,
  } = useBakery();

  const [activeTab, setActiveTab] = useState<'productos' | 'pedidos' | 'clientes' | 'reportes'>('pedidos');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [orderFilter, setOrderFilter] = useState<string>('todos');
  const [productSearch, setProductSearch] = useState('');

  // Form state for creating or editing product
  const [pName, setPName] = useState('');
  const [pCategory, setPCategory] = useState<ProductCategory>('postres');
  const [pSubcategory, setPSubcategory] = useState('');
  const [pPrice, setPPrice] = useState<number>(1000);
  const [pOriginalPrice, setPOriginalPrice] = useState<number | undefined>(undefined);
  const [pDescription, setPDescription] = useState('');
  const [pImage, setPImage] = useState('');
  const [pStockCount, setPStockCount] = useState<number>(20);
  const [pIsHoliday, setPIsHoliday] = useState(false);
  const [pPortions, setPPortions] = useState('');

  if (!isAdminOpen) return null;

  const openCreateModal = () => {
    setPName('');
    setPCategory('postres');
    setPSubcategory('');
    setPPrice(1200);
    setPOriginalPrice(undefined);
    setPDescription('');
    setPImage('/src/assets/images/galletas_postres_navidenos_1792178999521.jpg');
    setPStockCount(25);
    setPIsHoliday(false);
    setPPortions('8-10 porciones');
    setIsCreatingProduct(true);
    setEditingProduct(null);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setPName(p.name);
    setPCategory(p.category);
    setPSubcategory(p.subcategory || '');
    setPPrice(p.price);
    setPOriginalPrice(p.originalPrice);
    setPDescription(p.description);
    setPImage(p.image);
    setPStockCount(p.stockCount);
    setPIsHoliday(!!p.isHoliday);
    setPPortions(p.portions || '');
    setIsCreatingProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName.trim() || !pPrice) return;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: pName.trim(),
        category: pCategory,
        subcategory: pSubcategory.trim(),
        price: Number(pPrice),
        originalPrice: pOriginalPrice ? Number(pOriginalPrice) : undefined,
        description: pDescription.trim(),
        image: pImage.trim() || editingProduct.image,
        stockCount: Number(pStockCount),
        isHoliday: pIsHoliday,
        portions: pPortions.trim(),
      });
    } else {
      addProduct({
        name: pName.trim(),
        category: pCategory,
        subcategory: pSubcategory.trim(),
        price: Number(pPrice),
        originalPrice: pOriginalPrice ? Number(pOriginalPrice) : undefined,
        description: pDescription.trim(),
        image: pImage.trim() || '/src/assets/images/hero_ginita_holiday_1792178997563.jpg',
        inStock: true,
        stockCount: Number(pStockCount),
        isHoliday: pIsHoliday,
        rating: 5.0,
        reviewCount: 1,
        portions: pPortions.trim(),
      });
    }

    setIsCreatingProduct(false);
    setEditingProduct(null);
  };

  // Export to Excel (CSV with UTF-8 BOM)
  const handleExportToExcel = () => {
    const headers = [
      'Orden',
      'Fecha Creación',
      'Cliente',
      'Teléfono/WhatsApp',
      'Correo',
      'Modalidad',
      'Dirección',
      'Fecha Entrega',
      'Horario',
      'Productos Resumen',
      'Dedicatorias',
      'Subtotal RD$',
      'Descuento RD$',
      'Envío RD$',
      'Total RD$',
      'Método de Pago',
      'Estado de Pago',
      'Estado de Orden',
    ];

    const rows = orders.map((o) => {
      const itemsSummary = o.items.map((i) => `${i.product.name} (x${i.quantity})`).join('; ');
      const dedications = o.items.map((i) => i.dedication || '-').filter((d) => d !== '-').join('; ') || 'Ninguna';

      return [
        `"${o.orderNumber}"`,
        `"${new Date(o.createdAt).toLocaleDateString()}"`,
        `"${o.customer.name.replace(/"/g, '""')}"`,
        `"${o.customer.whatsapp}"`,
        `"${o.customer.email || ''}"`,
        `"${o.customer.deliveryMethod}"`,
        `"${o.customer.address.replace(/"/g, '""')}"`,
        `"${o.deliveryDate}"`,
        `"${o.deliveryTimeSlot}"`,
        `"${itemsSummary.replace(/"/g, '""')}"`,
        `"${dedications.replace(/"/g, '""')}"`,
        o.subtotal,
        o.discount,
        o.deliveryFee,
        o.total,
        `"${o.paymentMethod}"`,
        `"${o.paymentStatus}"`,
        `"${o.orderStatus}"`,
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Ginita_Bakery_Pedidos_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics for reports
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const holidayOrdersCount = orders.filter((o) => o.items.some((i) => i.product.isHoliday)).length;
  const avgOrderTicket = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'todos') return true;
    return o.orderStatus === orderFilter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-6xl bg-stone-50 rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[90vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              GB
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-amber-200">
                Panel Administrativo Ginita Bakery
              </h2>
              <p className="text-[11px] text-stone-400">
                Gestión de pedidos, catálogo, inventario y reportes comerciales
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 text-stone-400 hover:text-white rounded-lg transition-colors"
            aria-label="Cerrar panel de administración"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation & Toolbar */}
        <div className="px-6 py-3 bg-white border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('pedidos')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'pedidos'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Pedidos ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('productos')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'productos'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Productos & Inventario ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('clientes')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'clientes'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Clientes</span>
            </button>

            <button
              onClick={() => setActiveTab('reportes')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'reportes'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Reportes de Ventas</span>
            </button>
          </div>

          {/* Action on right */}
          <div className="flex items-center gap-2">
            {activeTab === 'pedidos' && (
              <button
                onClick={handleExportToExcel}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
                title="Descargar pedidos en formato Excel / CSV con formato UTF-8"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar a Excel</span>
              </button>
            )}

            {activeTab === 'productos' && (
              <button
                onClick={openCreateModal}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nuevo Producto</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* TAB 1: PEDIDOS */}
          {activeTab === 'pedidos' && (
            <div className="space-y-4">
              
              {/* Order status filters */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-500 font-medium">Filtrar por estado:</span>
                {['todos', 'pendiente', 'en_preparacion', 'listo', 'entregado', 'cancelado'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-2.5 py-1 rounded-md capitalize transition-colors ${
                      orderFilter === st
                        ? 'bg-stone-800 text-white font-semibold'
                        : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* Orders Table / Cards */}
              <div className="space-y-3">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-stone-900">
                            #{order.orderNumber}
                          </span>
                          <span className="text-xs text-stone-400">·</span>
                          <span className="text-xs text-stone-600 font-medium">
                            {order.customer.name}
                          </span>
                          <span className="text-xs text-emerald-700 font-mono">
                            ({order.customer.whatsapp})
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Entrega programada: <strong>{order.deliveryDate}</strong> ({order.deliveryTimeSlot}) · {order.customer.deliveryMethod === 'delivery' ? `Envío a: ${order.customer.address}` : 'Retiro en taller'}
                        </p>
                      </div>

                      {/* State Selectors */}
                      <div className="flex items-center gap-2 text-xs">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          aria-label="Estado de la orden"
                          className="px-2.5 py-1 rounded-lg border border-stone-200 bg-stone-50 font-semibold text-xs text-stone-800 cursor-pointer"
                        >
                          <option value="pendiente">🟡 Pendiente</option>
                          <option value="en_preparacion">🔵 En Preparación</option>
                          <option value="listo">🟣 Listo para Entrega</option>
                          <option value="entregado">🟢 Entregado</option>
                          <option value="cancelado">🔴 Cancelado</option>
                        </select>

                        <select
                          value={order.paymentStatus}
                          onChange={(e) => updatePaymentStatus(order.id, e.target.value as any)}
                          aria-label="Estado del pago"
                          className="px-2.5 py-1 rounded-lg border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-800 cursor-pointer"
                        >
                          <option value="pendiente">Pago Pendiente</option>
                          <option value="comprobante_enviado">Comprobante Enviado</option>
                          <option value="pagado">Pagado</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Items List */}
                    <div className="space-y-1.5 text-xs">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between items-center text-stone-700 bg-stone-50/70 p-2 rounded-lg">
                          <div>
                            <span className="font-semibold text-stone-900">{it.product.name}</span>
                            <span className="text-stone-500 font-mono"> x{it.quantity}</span>
                            {it.dedication && (
                              <span className="text-rose-700 italic ml-2">
                                Placa: "{it.dedication}"
                              </span>
                            )}
                          </div>
                          <span className="font-mono tabular-nums text-stone-900">
                            RD$ {it.totalPrice.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total info */}
                    <div className="flex justify-between items-center text-xs pt-2 border-t border-stone-100">
                      <span className="text-stone-500">
                        Método: <strong className="uppercase text-stone-800">{order.paymentMethod}</strong>
                        {order.couponCode && ` (Cupón: ${order.couponCode})`}
                      </span>
                      <div className="text-right">
                        <span className="text-stone-500 mr-2">Total Orden:</span>
                        <span className="font-serif text-base font-bold text-rose-700 tabular-nums">
                          RD$ {order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 2: PRODUCTOS & INVENTARIO */}
          {activeTab === 'productos' && (
            <div className="space-y-4">
              
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Filtrar productos..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-white"
                  />
                </div>
                <span className="text-xs text-stone-500">
                  {products.length} productos registrados en catálogo
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products
                  .filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase()))
                  .map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-xl object-cover shrink-0 bg-stone-100"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                              {p.category}
                            </span>
                            <h4 className="text-xs font-bold text-stone-900 truncate">
                              {p.name}
                            </h4>
                            <p className="font-serif text-sm font-bold text-rose-700 tabular-nums mt-0.5">
                              RD$ {p.price.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                          <span>Inventario: <strong>{p.stockCount} uds</strong></span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                            p.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {p.inStock ? 'Activo' : 'Pausado'}
                          </span>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                        <button
                          onClick={() => toggleProductStatus(p.id)}
                          className="text-stone-500 hover:text-stone-900 flex items-center gap-1"
                          title="Alternar disponibilidad"
                        >
                          {p.inStock ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{p.inStock ? 'Pausar' : 'Activar'}</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                            title="Editar producto"
                            aria-label="Editar producto"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`¿Eliminar "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50"
                            title="Eliminar producto"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          )}

          {/* TAB 3: CLIENTES */}
          {activeTab === 'clientes' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-100 text-stone-600 uppercase text-[10px] tracking-wider font-semibold border-b border-stone-200">
                    <tr>
                      <th className="px-4 py-3">Cliente</th>
                      <th className="px-4 py-3">WhatsApp / Teléfono</th>
                      <th className="px-4 py-3">Correo</th>
                      <th className="px-4 py-3">Dirección de Entrega</th>
                      <th className="px-4 py-3">Pedidos Realizados</th>
                      <th className="px-4 py-3">Contacto Directo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-stone-50">
                        <td className="px-4 py-3 font-semibold text-stone-900">{o.customer.name}</td>
                        <td className="px-4 py-3 font-mono">{o.customer.whatsapp}</td>
                        <td className="px-4 py-3">{o.customer.email || 'N/A'}</td>
                        <td className="px-4 py-3 text-stone-500 max-w-xs truncate">{o.customer.address}</td>
                        <td className="px-4 py-3 font-mono font-medium">{o.items.length} productos</td>
                        <td className="px-4 py-3">
                          <a
                            href={`https://wa.me/${o.customer.whatsapp.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:underline font-semibold"
                          >
                            Abrir Chat
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: REPORTES DE VENTAS */}
          {activeTab === 'reportes' && (
            <div className="space-y-6">
              
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
                  <span className="text-xs text-stone-500 font-medium">Ventas Totales Registradas</span>
                  <div className="font-serif text-2xl font-bold text-rose-700 tabular-nums">
                    RD$ {totalRevenue.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-emerald-700 font-medium">+18% vs temporada anterior</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
                  <span className="text-xs text-stone-500 font-medium">Pedidos Navideños Agendados</span>
                  <div className="font-serif text-2xl font-bold text-emerald-800 tabular-nums">
                    {holidayOrdersCount} órdenes
                  </div>
                  <p className="text-[11px] text-stone-500">Para entrega entre Dic 20 - Dic 25</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1">
                  <span className="text-xs text-stone-500 font-medium">Ticket Promedio por Pedido</span>
                  <div className="font-serif text-2xl font-bold text-amber-700 tabular-nums">
                    RD$ {avgOrderTicket.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-stone-500">Impulsado por ponches y bizcochos</p>
                </div>
              </div>

              {/* Top Products breakdown */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
                <h3 className="font-serif text-base font-bold text-stone-900 mb-4">
                  Productos Más Demandados (Temporada Navideña)
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Caja Surtida de Galletas Navideñas Reales', share: 92, count: '38 cajas' },
                    { name: 'Ponche Gourmet de Pistacho Esmeralda', share: 85, count: '47 botellas' },
                    { name: 'Ponche Artesanal Dominicano Tradicional', share: 80, count: '64 botellas' },
                    { name: 'Bizcocho Dominicano de Gala', share: 74, count: '29 bizcochos' },
                    { name: 'Caja Festive Brownies Navideños', share: 68, count: '51 cajas' },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1 text-xs">
                      <div className="flex justify-between text-stone-700">
                        <span className="font-medium">{item.name}</span>
                        <span className="font-mono text-stone-500">{item.count}</span>
                      </div>
                      <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-rose-500 h-2 rounded-full"
                          style={{ width: `${item.share}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Create/Edit Product Modal Sub-dialog */}
        {isCreatingProduct && (
          <div className="fixed inset-0 z-60 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}
                </h3>
                <button
                  onClick={() => setIsCreatingProduct(false)}
                  className="text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Nombre del Producto *</label>
                  <input
                    type="text"
                    required
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    className="w-full p-2 rounded-lg border border-stone-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold mb-1">Categoría</label>
                    <select
                      value={pCategory}
                      onChange={(e) => setPCategory(e.target.value as any)}
                      className="w-full p-2 rounded-lg border border-stone-200 bg-white"
                    >
                      <option value="bizcochos">Bizcochos</option>
                      <option value="brownies">Brownies</option>
                      <option value="postres">Postres</option>
                      <option value="ponches">Ponches</option>
                      <option value="galletas">Galletas</option>
                      <option value="cupcakes">Cupcakes</option>
                      <option value="cheesecakes">Cheesecakes</option>
                      <option value="combos">Combos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Subcategoría</label>
                    <input
                      type="text"
                      placeholder="Ej: Galletas Navideñas"
                      value={pSubcategory}
                      onChange={(e) => setPSubcategory(e.target.value)}
                      className="w-full p-2 rounded-lg border border-stone-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold mb-1">Precio (RD$) *</label>
                    <input
                      type="number"
                      required
                      value={pPrice}
                      onChange={(e) => setPPrice(Number(e.target.value))}
                      className="w-full p-2 rounded-lg border border-stone-200 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Inventario / Stock</label>
                    <input
                      type="number"
                      value={pStockCount}
                      onChange={(e) => setPStockCount(Number(e.target.value))}
                      className="w-full p-2 rounded-lg border border-stone-200 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">URL de Imagen</label>
                  <input
                    type="text"
                    value={pImage}
                    onChange={(e) => setPImage(e.target.value)}
                    className="w-full p-2 rounded-lg border border-stone-200 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Descripción</label>
                  <textarea
                    rows={2}
                    value={pDescription}
                    onChange={(e) => setPDescription(e.target.value)}
                    className="w-full p-2 rounded-lg border border-stone-200"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pIsHoliday}
                      onChange={(e) => setPIsHoliday(e.target.checked)}
                      className="rounded text-emerald-600"
                    />
                    <span>Pertenece a Colección Navideña</span>
                  </label>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t">
                  <button
                    type="button"
                    onClick={() => setIsCreatingProduct(false)}
                    className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold"
                  >
                    Guardar Producto
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
