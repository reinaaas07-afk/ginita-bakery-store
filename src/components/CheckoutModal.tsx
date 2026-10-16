import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { Order } from '../types/bakery';
import { X, CheckCircle, CreditCard, Landmark, Truck, Link2, MessageSquare, ShieldCheck, MapPin, Calendar, Clock } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    createOrder,
    isDateBlocked,
  } = useBakery();

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  
  // Tomorrow + 2 days default
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 2);
  const [deliveryDate, setDeliveryDate] = useState<string>(
    defaultDate.toISOString().split('T')[0]
  );
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState<string>('10:00 AM - 1:00 PM');
  
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('transferencia');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Check if date is blocked
  const isSelectedDateBlocked = isDateBlocked(deliveryDate);

  // Credit card fake fields for simulated card processing
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  if (!isCheckoutOpen) return null;

  const deliveryFee = deliveryMethod === 'delivery' ? 250 : 0;
  const finalTotal = cartTotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSelectedDateBlocked) {
      alert(`La fecha ${deliveryDate} está bloqueada / no disponible. Por favor selecciona otra fecha.`);
      return;
    }

    if (!name.trim() || !whatsapp.trim()) {
      alert('Por favor completa tu nombre y número de WhatsApp.');
      return;
    }

    if (deliveryMethod === 'delivery' && !address.trim()) {
      alert('Por favor ingresa tu dirección para el envío.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        customer: {
          name: name.trim(),
          phone: phone.trim() || whatsapp.trim(),
          whatsapp: whatsapp.trim(),
          email: email.trim(),
          address: deliveryMethod === 'delivery' ? address.trim() : 'Retiro en Taller Ginita Bakery (Piantini, Santo Domingo)',
          deliveryMethod,
          notes: notes.trim(),
        },
        deliveryDate,
        deliveryTimeSlot,
        paymentMethod,
        deliveryFee,
        notes: notes.trim(),
      });

      setConfirmedOrder(order);
      setIsSubmitting(false);
    }, 600);
  };

  const getWhatsAppUrl = () => {
    if (!confirmedOrder) return '#';

    let itemsList = confirmedOrder.items
      .map(
        (i, idx) =>
          `${idx + 1}. *${i.product.name}* x${i.quantity} = RD$ ${i.totalPrice.toLocaleString()}${
            i.dedication ? `\n   💌 Placa: "${i.dedication}"` : ''
          }`
      )
      .join('\n');

    const text = `*NUEVO PEDIDO EN LÍNEA - GINITA BAKERY* 🎂
---------------------------------------
🔖 *Orden:* #${confirmedOrder.orderNumber}
👤 *Cliente:* ${confirmedOrder.customer.name}
📱 *WhatsApp:* ${confirmedOrder.customer.whatsapp}
📧 *Correo:* ${confirmedOrder.customer.email || 'N/A'}
🚚 *Modalidad:* ${confirmedOrder.customer.deliveryMethod === 'delivery' ? 'Envío a Domicilio' : 'Retiro en Tienda'}
📍 *Dirección:* ${confirmedOrder.customer.address}
📅 *Fecha de Entrega:* ${confirmedOrder.deliveryDate} (${confirmedOrder.deliveryTimeSlot})
💳 *Método de Pago:* ${confirmedOrder.paymentMethod.toUpperCase()}

🛍️ *PRODUCTOS:*
${itemsList}

💰 *Subtotal:* RD$ ${confirmedOrder.subtotal.toLocaleString()}
${confirmedOrder.discount > 0 ? `✨ *Descuento:* -RD$ ${confirmedOrder.discount.toLocaleString()}\n` : ''}🛵 *Envío:* RD$ ${confirmedOrder.deliveryFee.toLocaleString()}
💵 *TOTAL A PAGAR: RD$ ${confirmedOrder.total.toLocaleString()}*
---------------------------------------
¡Hola Ginita Bakery! Acabo de realizar este pedido en la página web. ¿Podrían confirmarme la disponibilidad y recepción?`;

    return `https://wa.me/18295551284?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsCheckoutOpen(false);
            setConfirmedOrder(null);
          }}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
          aria-label="Cerrar modal de pago"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedOrder ? (
          /* Confirmation Success View */
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                ¡Orden Recibida con Éxito!
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
                Gracias por tu compra, {confirmedOrder.customer.name}
              </h3>
              <p className="text-sm text-stone-600 mt-1">
                Número de pedido:{' '}
                <strong className="text-rose-700 font-mono">{confirmedOrder.orderNumber}</strong>
              </p>
            </div>

            {/* Recap Box */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 text-left text-xs space-y-2.5">
              <div className="flex justify-between text-stone-600">
                <span>Fecha de Entrega:</span>
                <span className="font-semibold text-stone-900">
                  {confirmedOrder.deliveryDate} ({confirmedOrder.deliveryTimeSlot})
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Modalidad:</span>
                <span className="font-semibold text-stone-900">
                  {confirmedOrder.customer.deliveryMethod === 'delivery' ? 'Envío a Domicilio' : 'Retiro en Tienda'}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Método de Pago:</span>
                <span className="font-semibold uppercase text-stone-900">
                  {confirmedOrder.paymentMethod}
                </span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                <span className="font-bold text-stone-800">Total a Pagar:</span>
                <span className="font-serif text-lg font-bold text-rose-700 tabular-nums">
                  RD$ {confirmedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Banking instructions if wire transfer */}
            {confirmedOrder.paymentMethod === 'transferencia' && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-900 space-y-1">
                <p className="font-bold">Datos para Transferencia Bancaria:</p>
                <p>• <strong>Banco Popular:</strong> Cta Corriente #804910284 (Ginita Bakery SRL)</p>
                <p>• <strong>Banreservas:</strong> Cta Ahorros #9601249102 (Ginita Bakery SRL)</p>
                <p>• <strong>BHD:</strong> Cta Corriente #2940182410 (Ginita Bakery SRL)</p>
                <p className="text-[11px] text-amber-800 pt-1">
                  Envía el comprobante a nuestro WhatsApp para procesar tu orden de inmediato.
                </p>
              </div>
            )}

            {/* Direct WhatsApp Confirmation Button */}
            <div className="space-y-3 pt-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 text-white" />
                <span>Enviar Pedido a WhatsApp de Ginita</span>
              </a>

              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setConfirmedOrder(null);
                }}
                className="w-full py-2.5 text-xs text-stone-500 hover:text-stone-800"
              >
                Volver a la tienda
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Input Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-700">
                Paso Final
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mt-0.5">
                Datos de Entrega y Facturación
              </h3>
              <p className="text-xs text-stone-500">
                Completa tus datos para agendar tu pedido en la cocina de Ginita Bakery.
              </p>
            </div>

            {/* Customer Inputs */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                1. Datos del Cliente
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Carolina Méndez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 text-stone-800 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    WhatsApp para Confirmación *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej: 829-555-1234"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 text-stone-800 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Teléfono Alternativo (Opcional)
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej: 809-555-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 text-stone-800 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="cliente@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 text-stone-800 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Method & Address */}
            <div className="space-y-3 pt-3 border-t border-stone-100">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                2. Método y Fecha de Entrega
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('delivery')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-2.5 ${
                    deliveryMethod === 'delivery'
                      ? 'border-rose-500 bg-rose-50/70 font-semibold text-stone-900'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <Truck className="w-4 h-4 text-rose-600 shrink-0" />
                  <div>
                    <div>Envío a Domicilio</div>
                    <span className="text-[10px] text-stone-500 font-mono font-normal">RD$ 250</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-2.5 ${
                    deliveryMethod === 'pickup'
                      ? 'border-rose-500 bg-rose-50/70 font-semibold text-stone-900'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div>Retiro en Taller</div>
                    <span className="text-[10px] text-emerald-700 font-semibold">Gratis</span>
                  </div>
                </button>
              </div>

              {deliveryMethod === 'delivery' && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Dirección Completa de Envío *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Calle, Número, Edificio, Apto, Sector, Ciudad..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 text-stone-800 focus:outline-none focus:border-rose-500"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Fecha de Entrega:
                  </label>
                  <input
                    type="date"
                    min={defaultDate.toISOString().split('T')[0]}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className={`w-full text-xs p-2.5 rounded-xl border ${
                      isSelectedDateBlocked
                        ? 'border-rose-500 bg-rose-50 text-rose-900 font-bold'
                        : 'border-stone-200 text-stone-800 focus:border-rose-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Horario Preferido:
                  </label>
                  <select
                    value={deliveryTimeSlot}
                    onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 text-stone-800 focus:outline-none focus:border-rose-500 bg-white"
                  >
                    <option value="10:00 AM - 1:00 PM">10:00 AM - 1:00 PM</option>
                    <option value="1:00 PM - 4:00 PM">1:00 PM - 4:00 PM</option>
                    <option value="4:00 PM - 7:00 PM">4:00 PM - 7:00 PM</option>
                  </select>
                </div>
              </div>

              {isSelectedDateBlocked && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
                  <span>
                    Fecha {deliveryDate}: <strong className="uppercase">No disponible</strong> (Agenda copada). Por favor selecciona otra fecha.
                  </span>
                </div>
              )}
            </div>

            {/* Payment Methods */}
            <div className="space-y-3 pt-3 border-t border-stone-100">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                3. Método de Pago
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('transferencia')}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'transferencia'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold'
                      : 'border-stone-200 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <Landmark className="w-4 h-4 text-emerald-700" />
                  <span className="leading-tight">Transferencia</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('tarjeta')}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'tarjeta'
                      ? 'border-rose-600 bg-rose-50 text-rose-950 font-semibold'
                      : 'border-stone-200 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-rose-700" />
                  <span className="leading-tight">Tarjeta Débito/Crédito</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('contra_entrega')}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'contra_entrega'
                      ? 'border-amber-600 bg-amber-50 text-amber-950 font-semibold'
                      : 'border-stone-200 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <Truck className="w-4 h-4 text-amber-700" />
                  <span className="leading-tight">Contra Entrega</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('enlace_pago')}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'enlace_pago'
                      ? 'border-teal-600 bg-teal-50 text-teal-950 font-semibold'
                      : 'border-stone-200 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <Link2 className="w-4 h-4 text-teal-700" />
                  <span className="leading-tight">Enlace de Pago</span>
                </button>
              </div>

              {/* Card inputs simulator if card selected */}
              {paymentMethod === 'tarjeta' && (
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-stone-200 bg-white font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Expiración (MM/AA)
                      </label>
                      <input
                        type="text"
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-stone-200 bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="password"
                        placeholder="123"
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full text-xs p-2 rounded-lg border border-stone-200 bg-white font-mono"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-stone-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Conexión encriptada SSL de 256 bits segura</span>
                  </p>
                </div>
              )}
            </div>

            {/* Total Recap */}
            <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-1.5 text-xs text-stone-700">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} productos):</span>
                <span className="font-mono tabular-nums">RD$ {cartSubtotal.toLocaleString()}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Descuento ({appliedCoupon?.code}):</span>
                  <span className="font-mono tabular-nums">- RD$ {cartDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Costo de Envío:</span>
                <span className="font-mono tabular-nums">RD$ {deliveryFee.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-rose-200 flex justify-between items-baseline font-bold text-stone-900">
                <span className="text-sm">Total Final a Pagar:</span>
                <span className="font-serif text-xl text-rose-700 tabular-nums">
                  RD$ {finalTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Procesando pedido...</span>
              ) : (
                <span>Confirmar y Agendar Pedido</span>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
