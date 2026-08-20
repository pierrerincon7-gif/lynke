'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { mockDb } from '@/services/mockDb';
import {
  Users,
  Award,
  Gift,
  TrendingUp,
  QrCode,
  ArrowUpRight,
  Clock,
  UserPlus,
  Sparkles,
  ChevronRight,
  PlusCircle,
} from 'lucide-react';

export default function DashboardOverviewPage() {
  const { business } = useAuth();

  if (!business) return null;

  const customers = mockDb.getCustomers(business.id);
  const rewards = mockDb.getRewards(business.id);
  const program = mockDb.getLoyaltyProgram(business.id);
  const transactions = mockDb.getTransactions(business.id);

  const totalCustomers = customers.length;
  const newCustomersThisMonth = customers.filter(
    (c) => new Date(c.createdAt).getTime() > Date.now() - 86400000 * 30
  ).length;

  const totalVisits = customers.reduce((acc, c) => acc + c.visits, 0);
  const totalPointsRedeemed = Math.abs(
    transactions.filter((t) => t.type === 'redeem_reward').reduce((acc, t) => acc + t.points, 0)
  );

  return (
    <div className="space-y-8">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
              {business.businessType}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">{business.city}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Bienvenido, {business.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Resumen en tiempo real del rendimiento de tu programa de fidelización.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/join/${business.slug}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors"
          >
            <QrCode className="w-4 h-4 text-brand-400" />
            <span>Ver Tarjeta Digital</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            href="/dashboard/clientes"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-brand-500/20"
          >
            <UserPlus className="w-4 h-4" />
            <span>Registrar Cliente</span>
          </Link>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Clientes Totales</span>
            <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{totalCustomers}</div>
          <div className="text-[11px] text-brand-400 font-semibold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +{newCustomersThisMonth} este último mes
          </div>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Visitas Registradas</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{totalVisits}</div>
          <div className="text-[11px] text-slate-400 font-medium mt-2">
            Promedio: {totalCustomers > 0 ? (totalVisits / totalCustomers).toFixed(1) : 0} visitas / cliente
          </div>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Premios Disponibles</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{rewards.length}</div>
          <div className="text-[11px] text-amber-400 font-semibold mt-2">
            {rewards.filter((r) => r.active).length} recompensas activas
          </div>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Puntos Canjeados</span>
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{totalPointsRedeemed}</div>
          <div className="text-[11px] text-teal-400 font-semibold mt-2">
            Alto compromiso de clientes
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RECENT TRANSACTIONS */}
        <div className="lg:col-span-2 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Actividad Reciente</h3>
              <p className="text-xs text-slate-400">Últimas transacciones registradas en tu local</p>
            </div>
            <Link
              href="/dashboard/clientes"
              className="text-xs font-semibold text-brand-400 hover:underline flex items-center gap-1"
            >
              Ver clientes <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              No hay transacciones registradas aún.
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                        tx.type === 'redeem_reward'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                      }`}
                    >
                      {tx.type === 'redeem_reward' ? '🎁' : '⚡'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{tx.customerName}</div>
                      <div className="text-[11px] text-slate-400">{tx.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-xs font-black ${
                        tx.points > 0 ? 'text-brand-400' : 'text-amber-400'
                      }`}
                    >
                      {tx.points > 0 ? `+${tx.points}` : tx.points} pts
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {new Date(tx.createdAt).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PROGRAM PREVIEW SIDEBAR */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Programa Activo</h3>
              <Link
                href="/dashboard/fidelizacion"
                className="text-xs text-brand-400 font-semibold hover:underline"
              >
                Editar
              </Link>
            </div>

            {program ? (
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400">Nombre del Programa:</span>
                  <div className="font-bold text-white text-sm mt-0.5">{program.name}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-400">Tipo:</span>
                    <div className="font-bold text-brand-400 uppercase">
                      {program.type === 'stamps' ? 'Sellos' : 'Puntos'}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Meta Premio:</span>
                    <div className="font-bold text-white">
                      {program.pointsRequired} {program.type === 'stamps' ? 'sellos' : 'pts'}
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400">Condiciones:</span>
                  <p className="text-slate-300 italic mt-0.5">
                    "{program.conditions || 'Sin condiciones adicionales.'}"
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No hay programa configurado.</p>
            )}
          </div>

          {/* QR SHORTCUT CARD */}
          <div className="bg-gradient-to-br from-brand-950/40 via-slate-900 to-slate-900 p-6 rounded-2xl border border-brand-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500 text-slate-950 font-extrabold flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Captación por QR</h4>
                <p className="text-[11px] text-slate-400">Comparte tu enlace con tus clientes</p>
              </div>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono text-brand-400 truncate mb-3">
              /join/{business.slug}
            </div>
            <Link
              href="/dashboard/configuracion"
              className="block text-center w-full bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold py-2 rounded-xl text-xs transition-colors"
            >
              Descargar Cartel QR
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
