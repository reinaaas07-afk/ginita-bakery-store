import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { Star, MessageSquarePlus, CheckCircle, Sparkles, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { reviews, addReview } = useBakery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [productName, setProductName] = useState('Bizcocho Dominicano de Gala');
  const [location, setLocation] = useState('Santo Domingo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    addReview({
      author: author.trim(),
      rating,
      comment: comment.trim(),
      productName: productName.trim(),
      location: location.trim(),
    });

    setAuthor('');
    setComment('');
    setIsModalOpen(false);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-rose-50/20 to-white border-b border-rose-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200/80 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Experiencias Dulces Comprobadas</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Lo que Dicen Nuestros Clientes
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Testimonios de celebraciones, bodas, navidades familiares y eventos corporativos con Ginita Bakery.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="self-start md:self-auto px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Dejar mi Reseña</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">{rev.author}</span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                      <CheckCircle className="w-3 h-3" />
                      Compra Verificada
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span className="text-rose-700 font-medium truncate">{rev.productName}</span>
                  {rev.location && <span>{rev.location}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leave Review Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Comparte tu Experiencia Dulce
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Tu Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Laura Santos"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold mb-1">Calificación</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-stone-200 bg-white"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 Estrellas)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 Estrellas)</option>
                      <option value={3}>⭐⭐⭐ (3 Estrellas)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Ciudad / Sector</label>
                    <input
                      type="text"
                      placeholder="Ej: Santo Domingo"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Postre o Bizcocho Disfrutado</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Tu Reseña o Comentario *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Cuéntanos sobre el sabor, la textura, la decoración y el momento especial..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-200"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold"
                  >
                    Publicar Reseña
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
