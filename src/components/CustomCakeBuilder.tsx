import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { Sparkles, Calendar, Clock, MessageSquare, Check, ShoppingBag, ShieldCheck } from 'lucide-react';

interface SizeOption {
  label: string;
  portions: number;
  basePrice: number;
  popular?: boolean;
}

const SIZES: SizeOption[] = [
  { label: '1/2 Libra (15-18 Porciones)', portions: 18, basePrice: 2800 },
  { label: '1 Libra (25-30 Porciones)', portions: 30, basePrice: 3800, popular: true },
  { label: '1.5 Libras (40-45 Porciones)', portions: 45, basePrice: 5200 },
  { label: '2 Libras (60 Porciones)', portions: 60, basePrice: 6800 },
  { label: '2 Pisos de Gala (40-50 Porciones)', portions: 50, basePrice: 6500 },
  { label: '3 Pisos Imperial (80-100 Porciones)', portions: 90, basePrice: 11500 },
];

const FLAVORS = [
  'Masa Tradicional Dominicana (Almíbar & Vainilla)',
  'Chocolate Belga Intenso',
  'Vainilla Francesa Real',
  'Mármol (Vainilla & Chocolate)',
  'Red Velvet Suave',
  'Zanahoria con Especias & Nuez',
];

const FILLINGS = [
  'Dulce de Leche Artesanal (La Clásica de la Casa)',
  'Crema Pastelera Dominicana Suave',
  'Guayaba Orgánica Artesanal',
  'Nutella Ferrero Original (+RD$ 300)',
  'Mousse de Chinola / Maracuyá Tropical',
  'Ganache de Chocolate Blanco & Frambuesa (+RD$ 350)',
];

const FROSTINGS = [
  'Suspiro Dominicano Tradicional (Merengue Ligero)',
  'Buttercream Sedoso de Vainilla',
  'Ganache Suave de Chocolate',
  'Textura Aterciopelada Vintage (Lambeth)',
];

const COLOR_PALETTES = [
  {
    name: 'Firma Ginita (Menta Pastel, Rosa Rubor & Oro 24k)',
    colors: ['#A8E6CF', '#FFD1DC', '#D4AF37', '#FFFFFF'],
  },
  {
    name: 'Blanco Nieve & Oro Festivo',
    colors: ['#FFFFFF', '#FDFBF7', '#D4AF37', '#E5C158'],
  },
  {
    name: 'Rosa Romántico & Perlas',
    colors: ['#FCE7F3', '#F472B6', '#FFF1F2', '#CBD5E1'],
  },
  {
    name: 'Navidad Tradicional (Verde Pino, Escarlata & Oro)',
    colors: ['#166534', '#991B1B', '#EAB308', '#F8FAFC'],
  },
];

export const CustomCakeBuilder: React.FC = () => {
  const { addToCart, setIsCartOpen, isDateBlocked, showToast } = useBakery();

  const [selectedSize, setSelectedSize] = useState<SizeOption>(SIZES[1]);
  const [selectedFlavor, setSelectedFlavor] = useState<string>(FLAVORS[0]);
  const [selectedFilling, setSelectedFilling] = useState<string>(FILLINGS[0]);
  const [selectedFrosting, setSelectedFrosting] = useState<string>(FROSTINGS[0]);
  const [selectedPalette, setSelectedPalette] = useState(COLOR_PALETTES[0]);
  const [theme, setTheme] = useState<string>('Elegante Navideño con Topper Dorado');
  const [dedication, setDedication] = useState<string>('');
  const [referenceNote, setReferenceNote] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  
  // Tomorrow + 2 days default
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 3);
  const [deliveryDate, setDeliveryDate] = useState<string>(
    defaultDate.toISOString().split('T')[0]
  );
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState<string>('10:00 AM - 1:00 PM');

  // Check if date is blocked by admin
  const isSelectedDateBlocked = isDateBlocked(deliveryDate);

  // Calculate dynamic price
  let calculatedPrice = selectedSize.basePrice;
  if (selectedFilling.includes('+RD$ 300')) calculatedPrice += 300;
  if (selectedFilling.includes('+RD$ 350')) calculatedPrice += 350;

  const handleAddCustomCakeToCart = () => {
    if (isSelectedDateBlocked) {
      showToast('⚠️ Esta fecha no está disponible. Por favor elige otra fecha.');
      return;
    }

    const customCakeProduct = {
      id: `custom-cake-${Date.now()}`,
      name: `Bizcocho Personalizado (${selectedSize.label})`,
      category: 'bizcochos' as const,
      price: calculatedPrice,
      description: `Masa: ${selectedFlavor}. Relleno: ${selectedFilling}. Cobertura: ${selectedFrosting}. Paleta: ${selectedPalette.name}. Temática: ${theme || 'Elegante'}.`,
      image: '/src/assets/images/bizcocho_suspiro_real_1792179925460.jpg',
      inStock: true,
      stockCount: 99,
      rating: 5.0,
      reviewCount: 42,
      portions: `${selectedSize.portions} personas`,
    };

    addToCart({
      product: customCakeProduct,
      quantity: 1,
      deliveryDate,
      deliveryTimeSlot,
      dedication: dedication.trim() || 'Sin dedicatoria en placa',
      specialInstructions: `${specialInstructions ? specialInstructions + ' | ' : ''}Ref: ${referenceNote || 'Estándar'}`,
      customCake: {
        size: selectedSize.label,
        portions: selectedSize.portions,
        spongeFlavor: selectedFlavor,
        filling: selectedFilling,
        frosting: selectedFrosting,
        palette: selectedPalette.name,
        theme: theme,
        dedicationText: dedication,
        referenceImageNote: referenceNote,
        specialInstructions,
      },
      unitPrice: calculatedPrice,
    });

    setIsCartOpen(true);
  };

  const handleWhatsAppQuote = () => {
    const message = `*SOLICITUD DE BIZCOCHO PERSONALIZADO - GINITA BAKERY*
---------------------------------------
🎂 *Tamaño:* ${selectedSize.label}
🍰 *Masa:* ${selectedFlavor}
✨ *Relleno:* ${selectedFilling}
🧁 *Cobertura:* ${selectedFrosting}
🎨 *Paleta:* ${selectedPalette.name}
🎀 *Temática:* ${theme || 'A convenir'}
💌 *Dedicatoria en Placa:* ${dedication || 'Ninguna'}
📅 *Fecha de Entrega:* ${deliveryDate} ${isSelectedDateBlocked ? '(Consultar cupo)' : ''}
⏰ *Horario Preferido:* ${deliveryTimeSlot}
📝 *Instrucciones especiales:* ${specialInstructions || 'Ninguna'}
💰 *Presupuesto Estimado:* RD$ ${calculatedPrice.toLocaleString()}
---------------------------------------
¡Hola! Me encantaría confirmar este pedido con ustedes.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/18295551284?text=${encoded}`, '_blank');
  };

  return (
    <section id="personalizados" className="py-16 lg:py-24 bg-[#FCFDFC] border-b border-rose-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Configurador de Pasteles a Medida</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
            Diseña tu Bizcocho Soñado
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Personaliza el sabor, relleno, paleta cromática, dedicatoria y fecha de entrega. Diseñado a mano por nuestras maestras reposteras.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Preview Left Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
            <div className="rounded-2xl bg-white border border-rose-200/80 p-5 shadow-md">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 relative">
                <img
                  src="/src/assets/images/bizcocho_suspiro_real_1792179925460.jpg"
                  alt="Referencia de bizcocho personalizado dominicano Ginita Bakery"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-md text-xs font-semibold text-rose-700 shadow-xs">
                  {selectedSize.label}
                </div>
              </div>

              {/* Dynamic Live Summary */}
              <div className="mt-5 space-y-3 pt-3 border-t border-stone-100 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Masa:</span>
                  <span className="font-medium text-stone-900 text-right">{selectedFlavor}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Relleno:</span>
                  <span className="font-medium text-stone-900 text-right">{selectedFilling}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Cobertura:</span>
                  <span className="font-medium text-stone-900 text-right">{selectedFrosting}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Paleta seleccionada:</span>
                  <span className="font-medium text-stone-900">{selectedPalette.name.split('(')[0]}</span>
                </div>
                {dedication && (
                  <div className="flex justify-between text-rose-700 font-medium bg-rose-50/80 p-2 rounded-lg">
                    <span>Placa:</span>
                    <span className="italic text-right">"{dedication}"</span>
                  </div>
                )}

                {/* Blocked Date Warning Banner */}
                {isSelectedDateBlocked && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
                    <span>Fecha {deliveryDate}: <strong>No disponible</strong> (Cocina completa). Por favor elige otra fecha.</span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-stone-200">
                  <span className="text-sm font-semibold text-stone-800">Precio Estimado:</span>
                  <span className="font-serif text-2xl font-bold text-rose-700 tabular-nums">
                    RD$ {calculatedPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 space-y-2">
                <button
                  onClick={handleAddCustomCakeToCart}
                  disabled={isSelectedDateBlocked}
                  className={`w-full py-3 text-white font-semibold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
                    isSelectedDateBlocked
                      ? 'bg-stone-300 cursor-not-allowed'
                      : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isSelectedDateBlocked ? 'Fecha No Disponible' : 'Agregar al Carrito de Compras'}</span>
                </button>
                <button
                  onClick={handleWhatsAppQuote}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Pedir / Cotizar por WhatsApp Directo</span>
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Garantía de sabor y frescura Ginita Bakery</span>
              </div>
            </div>
          </div>

          {/* Form Options Right Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-7 shadow-xs">
            
            {/* Step 1: Size & Portions */}
            <div>
              <label className="block text-sm font-semibold text-stone-900 mb-2">
                1. Selecciona el Tamaño y Porciones
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SIZES.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                      selectedSize.label === size.label
                        ? 'border-rose-500 bg-rose-50/60 ring-1 ring-rose-500'
                        : 'border-stone-200 hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-900">{size.label}</span>
                      {size.popular && (
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">
                          Favorito
                        </span>
                      )}
                    </div>
                    <span className="text-stone-500 mt-1 font-mono text-[11px]">
                      Aprox. {size.portions} porciones · RD$ {size.basePrice.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Flavor of Cake Sponge */}
            <div>
              <label className="block text-sm font-semibold text-stone-900 mb-2">
                2. Masa / Bizcocho
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FLAVORS.map((flavor) => (
                  <button
                    key={flavor}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                      selectedFlavor === flavor
                        ? 'border-emerald-600 bg-emerald-50/70 font-semibold text-emerald-950'
                        : 'border-stone-200 text-stone-700 hover:border-emerald-300'
                    }`}
                  >
                    <span>{flavor}</span>
                    {selectedFlavor === flavor && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Filling */}
            <div>
              <label className="block text-sm font-semibold text-stone-900 mb-2">
                3. Relleno Gourmet
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FILLINGS.map((filling) => (
                  <button
                    key={filling}
                    onClick={() => setSelectedFilling(filling)}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                      selectedFilling === filling
                        ? 'border-rose-500 bg-rose-50/70 font-semibold text-rose-950'
                        : 'border-stone-200 text-stone-700 hover:border-rose-300'
                    }`}
                  >
                    <span>{filling}</span>
                    {selectedFilling === filling && <Check className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Frosting */}
            <div>
              <label className="block text-sm font-semibold text-stone-900 mb-2">
                4. Cobertura & Textura
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FROSTINGS.map((frost) => (
                  <button
                    key={frost}
                    onClick={() => setSelectedFrosting(frost)}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                      selectedFrosting === frost
                        ? 'border-amber-500 bg-amber-50/70 font-semibold text-stone-900'
                        : 'border-stone-200 text-stone-700 hover:border-amber-300'
                    }`}
                  >
                    <span>{frost}</span>
                    {selectedFrosting === frost && <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Visual Color Palette */}
            <div>
              <label className="block text-sm font-semibold text-stone-900 mb-2">
                5. Paleta de Colores
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {COLOR_PALETTES.map((pal) => (
                  <button
                    key={pal.name}
                    onClick={() => setSelectedPalette(pal)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedPalette.name === pal.name
                        ? 'border-rose-500 bg-rose-50/50 shadow-xs ring-1 ring-rose-500'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      {pal.colors.map((c, i) => (
                        <span
                          key={i}
                          className="w-5 h-5 rounded-full border border-stone-300/80 shadow-xs"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-stone-800">{pal.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 6: Dedication and Theme */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-900 mb-1">
                  6. Dedicatoria en Placa (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej: Feliz Cumpleaños Sofía / Feliz Aniversario / Bienvenidos"
                  value={dedication}
                  onChange={(e) => setDedication(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-500 text-stone-800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-900 mb-1">
                  7. Temática o Estilo
                </label>
                <input
                  type="text"
                  placeholder="Ej: Navideño invernal, Bautizo celeste y blanco, Floral con macarons..."
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-500 text-stone-800"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-900 mb-1">
                  8. Referencia de Diseño / Notas Adicionales
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe cómo deseas los detalles, colores específicos o si tienes un diseño de Instagram o Pinterest que deseas recrear."
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-500 text-stone-800"
                />
              </div>
            </div>

            {/* Step 7: Delivery Date & Slot */}
            <div className="pt-2 border-t border-stone-100">
              <label className="block text-sm font-semibold text-stone-900 mb-2">
                9. Fecha y Horario Deseado de Entrega
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3.5 pointer-events-none" />
                  <input
                    type="date"
                    min={defaultDate.toISOString().split('T')[0]}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-200 text-stone-800 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="relative">
                  <Clock className="w-4 h-4 text-stone-400 absolute left-3 top-3.5 pointer-events-none" />
                  <select
                    value={deliveryTimeSlot}
                    onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-200 text-stone-800 focus:outline-none focus:border-rose-500 bg-white"
                  >
                    <option value="9:00 AM - 12:00 PM">Mañana: 9:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 3:00 PM">Tarde temprana: 12:00 PM - 3:00 PM</option>
                    <option value="3:00 PM - 6:00 PM">Tarde: 3:00 PM - 6:00 PM</option>
                    <option value="6:00 PM - 8:00 PM">Noche: 6:00 PM - 8:00 PM</option>
                  </select>
                </div>
              </div>
              <p className="text-[11px] text-stone-500 mt-2">
                * Para bizcochos de más de 1 libra recomendamos reservar con al menos 48 a 72 horas de antelación.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
