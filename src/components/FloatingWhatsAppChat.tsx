import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';

export const FloatingWhatsAppChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');

  const QUICK_QUESTIONS = [
    {
      q: '¿Cómo reservo para Navidad?',
      a: '¡Hola! Puedes reservar directamente desde nuestra sección "Colección Navideña" o escribiéndonos tu fecha deseada. Los cupos para el 24 y 31 de diciembre son limitados.',
    },
    {
      q: '¿Tienen envíos a domicilio?',
      a: 'Sí, cubrimos todo Santo Domingo (Distrito Nacional y Santo Domingo Este/Oeste) y despachos coordinados a Santiago.',
    },
    {
      q: '¿Con cuánto tiempo de anticipación?',
      a: 'Para bizcochos personalizados sugerimos 48 a 72 horas. Para ponches y galletas navideñas, de 24 a 48 horas.',
    },
    {
      q: '¿Qué sabores de ponche tienen?',
      a: 'Tenemos Tradicional Dominicano, Pistacho Esmeralda, Dulce de Leche y Coco & Ron, en botellas de 500ml y 750ml.',
    },
  ];

  const handleSendToWhatsApp = (text?: string) => {
    const msg = text || userQuery || '¡Hola Ginita Bakery! Quisiera información para hacer un pedido.';
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/18295551284?text=${encoded}`, '_blank');
    setUserQuery('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      
      {/* Floating Popup Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-rose-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-serif font-bold text-amber-200">
                  G
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">Ginita Bakery · Asistente</h4>
                <p className="text-[10px] text-emerald-200">En línea para ayudarte</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto text-xs bg-stone-50">
            {/* Intro balloon */}
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-stone-200 shadow-2xs space-y-1">
              <p className="text-stone-700">
                ¡Hola! Bienvenido a <strong>Ginita Bakery</strong>. ¿En qué podemos endulzar tu celebración hoy?
              </p>
              <span className="text-[10px] text-stone-400 block text-right">Repostería Artesanal</span>
            </div>

            {/* Quick Questions pills */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-semibold text-stone-500">Preguntas Frecuentes:</p>
              {QUICK_QUESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendToWhatsApp(`Hola Ginita Bakery, quisiera saber: ${item.q}`)}
                  className="w-full text-left p-2 rounded-xl bg-white hover:bg-rose-50 border border-stone-200 text-stone-700 hover:text-rose-700 text-[11px] transition-colors"
                >
                  {item.q}
                </button>
              ))}
            </div>
          </div>

          {/* Input & WhatsApp Action */}
          <div className="p-3 bg-white border-t border-stone-200 flex gap-2">
            <input
              type="text"
              placeholder="Escribe tu consulta..."
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendToWhatsApp()}
              className="flex-1 text-xs p-2 rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-600 text-stone-800"
            />
            <button
              onClick={() => handleSendToWhatsApp()}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors"
              title="Enviar por WhatsApp"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs font-semibold"
        aria-label="Abrir chat de WhatsApp"
      >
        <MessageSquare className="w-4 h-4 fill-white" />
        <span className="hidden sm:inline">Habla con Ginita</span>
      </button>

    </div>
  );
};
