'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function RecuperarContrasenaPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand-500 rounded-full blur-3xl"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight text-white mb-2">
          <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-slate-950 font-extrabold text-xl shadow-lg shadow-brand-500/30">
            L
          </div>
          <span>Loyalify</span>
        </Link>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white">
          Recuperar contraseña
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Ingresa tu correo para recibir las instrucciones de acceso.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-slate-800/80 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-slate-700/60">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center mx-auto mb-4 border border-brand-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instrucciones enviadas</h3>
              <p className="text-sm text-slate-300 mb-6">
                Si el correo <span className="font-semibold text-brand-400">{email}</span> está registrado en nuestra plataforma, recibirás un enlace de recuperación.
              </p>
              <Link
                href="/iniciar-sesion"
                className="inline-flex items-center gap-2 text-sm text-brand-400 font-semibold hover:underline"
              >
                <ArrowLeft className="w-4 h-4" /> Volver a iniciar sesión
              </Link>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Correo electrónico registrado
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@negocio.com"
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl text-slate-950 font-bold bg-brand-500 hover:bg-brand-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 shadow-lg shadow-brand-500/20 transition-all cursor-pointer mt-2"
              >
                <span>Enviar Instrucciones</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-6 text-center">
                <Link
                  href="/iniciar-sesion"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Volver al inicio de sesión
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
