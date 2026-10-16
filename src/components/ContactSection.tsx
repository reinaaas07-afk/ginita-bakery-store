import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, MapPin, Clock, Instagram, Facebook, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [eventType, setEventType] = useState('Cumpleaños');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const waText = `*CONSULTA DESDE LA WEB - GINITA BAKERY*
👤 *Nombre:* ${name}
📱 *Teléfono:* ${phone || 'N/A'}
📧 *Correo:* ${email || 'N/A'}
🎉 *Tipo de Evento:* ${eventType}
💬 *Mensaje:* ${message}`;

    const encoded = encodeURIComponent(waText);
    window.open(`https://wa.me/18295551284?text=${encoded}`, '_blank');

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contacto" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
            Estamos Listos para Atenderte
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
            Contacto & Pedidos Especiales
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            ¿Tienes una fecha especial, evento corporativo o mesa de postres soñada? Escríbenos o visítanos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    WhatsApp Business Oficial
                  </h4>
                  <a
                    href="https://wa.me/18295551284"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-emerald-800 hover:underline block mt-0.5"
                  >
                    +1 (829) 555-1284
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Respuestas rápidas y cotizaciones personalizadas de lunes a sábado.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Correo de Atención y Empresas
                  </h4>
                  <a
                    href="mailto:pedidos@ginitabakery.com"
                    className="text-sm font-semibold text-rose-700 hover:underline block mt-0.5"
                  >
                    pedidos@ginitabakery.com
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Para órdenes masivas corporativas y facturas con comprobante fiscal.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Taller & Punto de Retiro
                  </h4>
                  <p className="text-sm font-semibold text-stone-800 mt-0.5">
                    Calle Federico Geraldino #48, Piantini
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Santo Domingo, Distrito Nacional, República Dominicana.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Horario de Atención y Entregas
                  </h4>
                  <p className="text-xs text-stone-700 mt-0.5">
                    <strong>Lunes a Sábado:</strong> 9:00 AM – 7:00 PM
                  </p>
                  <p className="text-xs text-stone-700">
                    <strong>Domingos:</strong> 9:00 AM – 2:00 PM (Solo entregas programadas)
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Síguenos en Redes Sociales
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-700 text-xs font-medium transition-colors"
                >
                  <Instagram className="w-4 h-4 text-rose-600" />
                  <span>@ginitabakery</span>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-blue-50 text-stone-700 hover:text-blue-700 text-xs font-medium transition-colors"
                >
                  <Facebook className="w-4 h-4 text-blue-600" />
                  <span>Ginita Bakery RD</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Inquiry Form & Google Map preview */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Form */}
            <div className="p-6 sm:p-8 rounded-2xl bg-stone-50/70 border border-stone-200 shadow-xs">
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">
                Escríbenos tu Mensaje
              </h3>
              <p className="text-xs text-stone-500 mb-5">
                Te responderemos a la brevedad posible por WhatsApp o correo.
              </p>

              {submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-serif font-bold text-emerald-950">¡Mensaje Enviado con Éxito!</h4>
                  <p className="text-xs text-emerald-800">
                    Se ha abierto una conversación en WhatsApp para dar seguimiento inmediato a tu solicitud.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Tu Nombre *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Patricia Henríquez"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">WhatsApp o Teléfono *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Ej: 809-555-1234"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Correo Electrónico</label>
                      <input
                        type="email"
                        placeholder="tu@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Tipo de Evento</label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:border-rose-500"
                      >
                        <option value="Cumpleaños">Cumpleaños / Aniversario</option>
                        <option value="Navidad">Cena / Regalos de Navidad</option>
                        <option value="Corporativo">Evento Empresarial / Canastas</option>
                        <option value="Boda">Boda / Compromiso</option>
                        <option value="Bautizo">Bautizo / Primera Comunión</option>
                        <option value="MesaDulces">Mesa de Postres Completa</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Mensaje o Detalles del Pedido *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Cuéntanos cuántas personas esperan, la fecha estimada y tus postres preferidos..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Consulta a Ginita Bakery</span>
                  </button>
                </form>
              )}
            </div>

            {/* Interactive Location Visual Map Box */}
            <div className="rounded-2xl border border-stone-200 overflow-hidden bg-stone-100 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-600" />
                  <span>Google Maps: Ubicación Piantini</span>
                </span>
                <a
                  href="https://maps.google.com/?q=Piantini+Santo+Domingo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-600 hover:underline font-medium text-[11px]"
                >
                  Abrir en Google Maps
                </a>
              </div>
              <div className="w-full h-36 bg-gradient-to-br from-stone-200 via-stone-100 to-emerald-50 rounded-xl border border-stone-200 flex items-center justify-center relative overflow-hidden text-center p-4">
                <div className="space-y-1">
                  <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <p className="font-bold text-xs text-stone-900">Ginita Bakery Workshop</p>
                  <p className="text-[11px] text-stone-500">Calle Federico Geraldino, Piantini, Santo Domingo</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
