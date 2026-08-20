'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { mockDb } from '@/services/mockDb';
import {
  Award,
  Gift,
  Phone,
  UserCheck,
  CheckCircle2,
  Sparkles,
  Store,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function JoinBusinessPage() {
  const params = useParams();
  const businessSlug = params?.businessSlug as string;

  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [activeCustomerIdentified, setActiveCustomerIdentified] = useState<string | null>(null);

  // New Registration State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const portalData = mockDb.getCustomerPortalData(businessSlug, activeCustomerIdentified || undefined);

  if (!portalData || !portalData.business) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md text-center">
          <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
            ✕
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Negocio no encontrado</h2>
          <p className="text-xs text-slate-400 mb-6">
            El enlace o código QR utilizado no corresponde a ningún negocio activo en Loyalify.
          </p>
          <Link
            href="/"
            className="inline-block bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
          >
            Ir a la página principal
          </Link>
        </div>
      </div>
    );
  }

  const { business, program, rewards, customer, card, transactions } = portalData;

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneOrEmail) {
      setActiveCustomerIdentified(phoneOrEmail.trim());
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    try {
      const created = mockDb.addCustomer(business.id, {
        name,
        email: email || undefined,
        phone,
      });
      setActiveCustomerIdentified(created.phone);
      setRegisterSuccess(true);
    } catch (err: any) {
      alert(err.message || 'Error al registrarse');
    }
  };

  const handleRedeem = (rewardId: string) => {
    if (!customer) return;
    try {
      mockDb.redeemReward(business.id, customer.id, rewardId);
      // Refresh state
      setActiveCustomerIdentified(customer.phone);
      alert('¡Recompensa canjeada con éxito! Muestra este mensaje al personal.');
    } catch (err: any) {
      alert(err.message || 'No se pudo canjear la recompensa');
    }
  };

  const requiredPoints = program?.pointsRequired || 10;
  const currentPoints = card?.points || 0;
  const progressPercent = Math.min(100, Math.round((currentPoints / requiredPoints) * 100));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      <div className="max-w-md mx-auto w-full space-y-6 my-auto py-8">
        {/* BRAND / BUSINESS CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-brand-500 text-slate-950 font-black text-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-brand-500/20">
            {business.name.charAt(0)}
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-400">
            {business.businessType}
          </span>
          <h1 className="text-xl font-black text-white mt-0.5">{business.name}</h1>
          <p className="text-xs text-slate-400">{business.city}</p>
        </div>

        {/* CUSTOMER IDENTIFIED VIEW */}
        {customer && card ? (
          <div className="space-y-6">
            {/* DIGITAL LOYALTY CARD */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border-2 border-brand-500/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Tarjeta Digital</span>
                  <div className="text-base font-bold text-white">{customer.name}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400">Teléfono</span>
                  <div className="text-xs font-mono text-brand-400">{customer.phone}</div>
                </div>
              </div>

              {/* PROGRESS BAR / STAMPS */}
              {program?.type === 'stamps' ? (
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-300 font-semibold mb-3">
                    <span>Progreso de sellos:</span>
                    <span className="text-brand-400">{card.points} / {requiredPoints} Sellos</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {Array.from({ length: requiredPoints }).map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-11 rounded-xl flex items-center justify-center text-base transition-all ${
                          idx < card.points
                            ? 'bg-brand-500 text-slate-950 font-bold shadow-md shadow-brand-500/30'
                            : 'bg-slate-950 border border-slate-800 text-slate-700'
                        }`}
                      >
                        {idx < card.points ? '☕' : idx + 1}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <div className="flex justify-between items-center text-xs text-slate-300 font-semibold mb-2">
                    <span>Puntos Acumulados:</span>
                    <span className="text-brand-400 font-extrabold text-sm">{card.points} pts</span>
                  </div>
                  <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="bg-brand-500 h-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Total Visitas:</span>
                <span className="font-bold text-white">{card.visits} visitas registradas</span>
              </div>
            </div>

            {/* AVAILABLE REWARDS */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Gift className="w-4 h-4 text-brand-400" /> Recompensas Disponibles
              </h3>

              <div className="space-y-3">
                {rewards.map((reward) => {
                  const canRedeem = card.points >= reward.requiredPoints;
                  return (
                    <div
                      key={reward.id}
                      className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{reward.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {reward.description || 'Sin descripción'}
                        </div>
                        <div className="text-[10px] text-brand-400 font-bold mt-1">
                          Costo: {reward.requiredPoints} {program?.type === 'stamps' ? 'sellos' : 'pts'}
                        </div>
                      </div>

                      <button
                        onClick={() => handleRedeem(reward.id)}
                        disabled={!canRedeem}
                        className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                          canRedeem
                            ? 'bg-brand-500 hover:bg-brand-400 text-slate-950 shadow-md shadow-brand-500/20 cursor-pointer'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        {canRedeem ? 'Canjear' : 'Faltan pts'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setActiveCustomerIdentified(null)}
              className="w-full py-2.5 text-center text-xs text-slate-400 hover:text-white transition-colors"
            >
              Consultar con otro teléfono
            </button>
          </div>
        ) : (
          /* REGISTRATION / LOOKUP FORM */
          <div className="space-y-6">
            {/* LOGIN / LOOKUP BOX */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-1">¿Ya tienes tarjeta?</h3>
              <p className="text-xs text-slate-400 mb-4">Ingresa tu número de teléfono para ver tus puntos.</p>

              <form onSubmit={handleLookup} className="space-y-3">
                <input
                  type="text"
                  required
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder="Ej. +34611223344"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <button
                  type="submit"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  Ver Mi Progreso
                </button>
              </form>
            </div>

            {/* NEW REGISTRATION FORM */}
            <div className="bg-slate-900 border border-brand-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-[11px] font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Registrarse en 30 segundos
              </div>
              <h3 className="text-base font-bold text-white mb-1">Crea tu Tarjeta Digital Gratis</h3>
              <p className="text-xs text-slate-400 mb-4">
                Comienza a acumular sellos y gana premios en {business.name}.
              </p>

              <form onSubmit={handleRegister} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Nombre completo *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Laura García"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Teléfono *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+34611223344"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Correo electrónico (Opcional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="laura@gmail.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold py-3.5 rounded-xl text-xs transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Obtener mi Tarjeta Digital</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <footer className="text-center text-[10px] text-slate-600 py-4">
        Powered by Loyalify SaaS Platform
      </footer>
    </div>
  );
}
