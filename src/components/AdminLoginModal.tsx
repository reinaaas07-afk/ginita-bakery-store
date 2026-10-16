import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { GinitaLogo } from './GinitaLogo';
import { X, Lock, Mail, User, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const {
    isAdminLoginModalOpen,
    setIsAdminLoginModalOpen,
    loginAdmin,
    isAdminAuthenticated,
  } = useBakery();

  const [username, setUsername] = useState('ginita');
  const [email, setEmail] = useState('admin@ginitabakery.com');
  const [password, setPassword] = useState('GinitaAdmin2026!');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAdminLoginModalOpen || isAdminAuthenticated) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const result = loginAdmin(username, email, password);
      setIsSubmitting(false);
      if (!result.success) {
        setError(result.message);
      }
    }, 400);
  };

  const handleFillDemo = (user: string, mail: string, pass: string) => {
    setUsername(user);
    setEmail(mail);
    setPassword(pass);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden">
        
        {/* Header Decorator */}
        <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-rose-950 px-6 py-6 text-white text-center relative">
          <button
            onClick={() => setIsAdminLoginModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex justify-center mb-2">
            <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-amber-400/40">
              <Lock className="w-6 h-6 text-amber-300" />
            </div>
          </div>
          
          <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
            Panel Propietario Privado
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            Ginita Bakery · Acceso Seguro para Dirección y Cocina
          </p>
        </div>

        {/* Content & Form */}
        <div className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900">
            <span className="font-semibold block mb-1">🔐 Credenciales de Administración:</span>
            <div className="flex flex-wrap gap-2 text-[10px]">
              <button
                type="button"
                onClick={() => handleFillDemo('ginita', 'admin@ginitabakery.com', 'GinitaAdmin2026!')}
                className="px-2 py-1 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 font-mono transition-colors"
              >
                Cargar: ginita / GinitaAdmin2026!
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Usuario Administrador
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ej: ginita o admin"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-emerald-500 focus:bg-white text-stone-800 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Correo Electrónico Registrado
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ginitabakery.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-emerald-500 focus:bg-white text-stone-800 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Contraseña Segura
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-emerald-500 focus:bg-white text-stone-800 transition-colors"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Verificando credenciales...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-amber-300" />
                    <span>Iniciar Sesión como Administrador</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="pt-3 border-t border-stone-100 text-center">
            <p className="text-[11px] text-stone-400">
              Área reservada exclusivamente para el personal autorizado de Ginita Bakery.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
