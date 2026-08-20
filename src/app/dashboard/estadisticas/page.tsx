'use client';

import React from 'react';
import { useAuth } from '@/lib/auth-context';
import { mockDb } from '@/services/mockDb';
import {
  BarChart3,
  Users,
  TrendingUp,
  Clock,
  Gift,
  Award,
  Calendar,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';

export default function EstadisticasPage() {
  const { business } = useAuth();

  if (!business) return null;

  const customers = mockDb.getCustomers(business.id);
  const transactions = mockDb.getTransactions(business.id);
  const rewards = mockDb.getRewards(business.id);

  // Growth Data Mock
  const monthlyData = [
    { month: 'Ene', clientes: 12, visitas: 45, canjes: 3 },
    { month: 'Feb', clientes: 19, visitas: 68, canjes: 6 },
    { month: 'Mar', clientes: 27, visitas: 94, canjes: 11 },
    { month: 'Abr', clientes: 36, visitas: 120, canjes: 15 },
    { month: 'May', clientes: 48, visitas: 165, canjes: 22 },
    { month: 'Jun', clientes: customers.length + 50, visitas: 210, canjes: 30 },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER BAR */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-brand-400" />
          <span>Analíticas & Métricas de Rendimiento</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Analiza la recurrencia de tus clientes, crecimiento mensual y la efectividad de tus recompensas.
        </p>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">Clientes Totales</div>
          <div className="text-3xl font-extrabold text-white">{customers.length}</div>
          <div className="text-[11px] text-brand-400 font-semibold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> CRECIMIENTO CONSTANTE
          </div>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">Visitas del Mes</div>
          <div className="text-3xl font-extrabold text-white">
            {customers.reduce((acc, c) => acc + c.visits, 0)}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-2 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> RECURRENCIA ALTA
          </div>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">Premios Activos</div>
          <div className="text-3xl font-extrabold text-white">{rewards.length}</div>
          <div className="text-[11px] text-amber-400 font-semibold mt-2 flex items-center gap-1">
            <Gift className="w-3.5 h-3.5" /> {rewards.filter((r) => r.active).length} habilitados
          </div>
        </div>

        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">Tasa de Fidelización</div>
          <div className="text-3xl font-extrabold text-brand-400">84.2%</div>
          <div className="text-[11px] text-slate-400 font-medium mt-2">
            Retención de clientes
          </div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CUSTOMER GROWTH CHART */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-base font-bold text-white mb-1">Crecimiento de Clientes</h3>
          <p className="text-xs text-slate-400 mb-6">Evolución mensual de registros</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                />
                <Bar dataKey="clientes" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MONTHLY VISITS TREND */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-base font-bold text-white mb-1">Visitas & Canjes</h3>
          <p className="text-xs text-slate-400 mb-6">Frecuencia de visitas de clientes</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                />
                <Line type="monotone" dataKey="visitas" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="canjes" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
