'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Lock, Mail, ArrowRight, Store, Sparkles } from 'lucide-react';

export default function IniciarSesionPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión. Revisa tus datos.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAccount = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('12345678');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-600 rounded-full blur-3xl"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight text-white mb-2">
          <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-slate-950 font-extrabold text-xl shadow-lg shadow-brand-500/30">
            L
          </div>
          <span>Loyalify</span>
        </Link>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white">
          Bienvenido de nuevo
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Ingresa al panel de administración de tu negocio.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-slate-800/80 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-slate-700/60">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 rounded-xl flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Correo electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@negocio.com"
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-slate-300">
                  Contraseña
                </label>
                <Link
                  href="/recuperar-contrasena"
                  className="text-xs text-brand-400 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl text-slate-950 font-bold bg-brand-500 hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 shadow-lg shadow-brand-500/20 transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                'Iniciando sesión...'
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-slate-700/60">
            <p className="text-xs text-slate-400 font-medium mb-3 text-center flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" /> Cuentas de demostración rápida:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemoAccount('carlos@aroma.com')}
                className="text-xs bg-slate-900/60 hover:bg-slate-700/60 border border-slate-700 text-slate-300 p-2.5 rounded-xl text-left transition-colors cursor-pointer"
              >
                <div className="font-semibold text-white truncate">Negocio A</div>
                <div className="text-[10px] text-slate-400 truncate">Cafetería Aroma</div>
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('sofia@elcorte.com')}
                className="text-xs bg-slate-900/60 hover:bg-slate-700/60 border border-slate-700 text-slate-300 p-2.5 rounded-xl text-left transition-colors cursor-pointer"
              >
                <div className="font-semibold text-white truncate">Negocio B</div>
                <div className="text-[10px] text-slate-400 truncate">Barbería Classic</div>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              ¿Aún no tienes cuenta?{' '}
              <Link href="/registro" className="font-semibold text-brand-400 hover:underline">
                Registrar mi negocio
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
