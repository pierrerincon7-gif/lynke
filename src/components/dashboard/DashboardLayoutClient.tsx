'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  LayoutDashboard,
  Users,
  Award,
  Gift,
  BarChart3,
  Settings,
  LogOut,
  Building2,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  Store,
  Sparkles,
} from 'lucide-react';

const navigation = [
  { name: 'Inicio', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Clientes', href: '/dashboard/clientes', icon: Users },
  { name: 'Fidelización', href: '/dashboard/fidelizacion', icon: Award },
  { name: 'Recompensas', href: '/dashboard/recompensas', icon: Gift },
  { name: 'Estadísticas', href: '/dashboard/estadisticas', icon: BarChart3 },
  { name: 'Configuración', href: '/dashboard/configuracion', icon: Settings },
];

export function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, business, loading, logout, switchBusiness } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/iniciar-sesion');
    }
  }, [user, loading, router]);

  if (loading || !user || !business) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-slate-400">Cargando tu negocio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* MOBILE HEADER */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-500 text-slate-950 font-black flex items-center justify-center text-sm">
            L
          </div>
          <div>
            <div className="text-sm font-bold text-white truncate max-w-[150px]">{business.name}</div>
            <div className="text-[10px] text-slate-400 truncate">{business.city}</div>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900/90 backdrop-blur-xl border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* LOGO & BUSINESS BRAND */}
          <div className="p-6 border-b border-slate-800/80">
            <Link href="/dashboard" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-slate-950 font-black text-lg shadow-md shadow-brand-500/20">
                L
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">Loyalify</span>
            </Link>

            {/* Current Business Card */}
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-brand-400 uppercase tracking-wider">Negocio Activo</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="text-sm font-bold text-white truncate">{business.name}</div>
              <div className="text-xs text-slate-400 truncate">{business.businessType} • {business.city}</div>

              {/* Business Multi-Tenant Switcher */}
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Cambiar negocio:</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => switchBusiness('biz-negocio-a')}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      business.id === 'biz-negocio-a' ? 'bg-brand-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Negocio A
                  </button>
                  <button
                    onClick={() => switchBusiness('biz-negocio-b')}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      business.id === 'biz-negocio-b' ? 'bg-brand-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Negocio B
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-500 text-slate-950 shadow-lg shadow-brand-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* OWNER PROFILE & LOGOUT */}
        <div className="p-4 border-t border-slate-800/80">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-white">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{user.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              router.push('/iniciar-sesion');
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-950 hover:bg-red-500/10 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-500/30 rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
