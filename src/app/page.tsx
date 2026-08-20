'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  QrCode,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  Gift,
  Users,
  Zap,
  ChevronDown,
  Star,
  Award,
  Sparkles,
  BarChart3,
  BellRing,
  CreditCard,
  Menu,
  X,
  Check,
} from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'stamps' | 'points'>('stamps');
  const [sampleStamps, setSampleStamps] = useState(6);

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-brand-500 selection:text-slate-950">
      {/* BACKGROUND GLOW DECORATIONS */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-20 z-0">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-brand-500/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-[200px] right-[-100px] w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[100px]"></div>
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform">
              L
            </div>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Loyalify
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#beneficios" className="hover:text-white transition-colors">
              Beneficios
            </a>
            <a href="#como-funciona" className="hover:text-white transition-colors">
              Cómo funciona
            </a>
            <a href="#demo" className="hover:text-white transition-colors">
              Tarjeta Digital
            </a>
            <a href="#precios" className="hover:text-white transition-colors">
              Precios
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/iniciar-sesion"
              className="text-sm font-semibold text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-xl hover:bg-slate-900"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/registro"
              className="text-sm font-bold bg-brand-500 hover:bg-brand-400 text-slate-950 px-5 py-2.5 rounded-xl shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Comenzar gratis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-4 pb-6 space-y-3">
            <a
              href="#beneficios"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-white py-2"
            >
              Beneficios
            </a>
            <a
              href="#como-funciona"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-white py-2"
            >
              Cómo funciona
            </a>
            <a
              href="#demo"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-white py-2"
            >
              Tarjeta Digital
            </a>
            <a
              href="#precios"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-white py-2"
            >
              Precios
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-white py-2"
            >
              FAQ
            </a>
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <Link
                href="/iniciar-sesion"
                className="text-center py-2.5 text-slate-300 font-semibold bg-slate-800 rounded-xl"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/registro"
                className="text-center py-2.5 text-slate-950 font-bold bg-brand-500 rounded-xl"
              >
                Comenzar gratis
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>La plataforma de fidelización para negocios modernos</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight mb-6">
            Sustituye las tarjetas de papel por un{' '}
            <span className="bg-gradient-to-r from-brand-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
              programa digital inteligente
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8">
            Fideliza a tus clientes mediante tarjetas de sellos y puntos en su Smartphone. Sin apps pesadas para descargar, sin complicaciones. Multiplica tus clientes recurrentes hoy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/registro"
              className="w-full sm:w-auto text-base font-bold bg-brand-500 hover:bg-brand-400 text-slate-950 px-8 py-4 rounded-xl shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>Crear mi programa gratis</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#demo"
              className="w-full sm:w-auto text-base font-semibold bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 px-8 py-4 rounded-xl transition-colors text-center"
            >
              Ver demo interactiva
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 text-xs text-slate-400 font-medium border-t border-slate-800/80 pt-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-400" />
              <span>Sin tarjeta de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-400" />
              <span>Configuración en 2 minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-400" />
              <span>Compatibilidad con QR</span>
            </div>
          </div>
        </div>

        {/* MOCKUP SHOWCASE */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700/60 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="text-xs text-slate-400 ml-2 font-mono">dashboard.loyalify.app</span>
              </div>
              <div className="text-xs bg-brand-500/20 text-brand-400 px-2.5 py-1 rounded-full font-semibold">
                Estado: En línea
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Clientes Totales</div>
                <div className="text-3xl font-extrabold text-white">1,284</div>
                <div className="text-xs text-brand-400 font-semibold mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +18.4% este mes
                </div>
              </div>
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Visitas del Mes</div>
                <div className="text-3xl font-extrabold text-white">4,890</div>
                <div className="text-xs text-brand-400 font-semibold mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +24.1% recurrencia
                </div>
              </div>
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Recompensas Entregadas</div>
                <div className="text-3xl font-extrabold text-white">342</div>
                <div className="text-xs text-emerald-400 font-semibold mt-2 flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5" /> 94% satisfacción
                </div>
              </div>
            </div>

            <div className="mt-6 bg-slate-950/80 p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center shrink-0">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Tu Código QR de Registro Único</h4>
                  <p className="text-xs text-slate-400">Imprímelo y colócalo en tu mostrador para captar clientes en segundos.</p>
                </div>
              </div>
              <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-xs font-mono text-brand-400">
                loyalify.app/join/tu-negocio
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EL PROBLEMA Y LA SOLUCIÓN */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              ¿Por qué las tarjetas de papel ya no funcionan?
            </h2>
            <p className="mt-4 text-slate-400">
              Tus clientes las pierden, las olvidan en casa o simplemente terminan en la basura.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-red-500/20 p-8 rounded-2xl relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold mb-4">
                El método tradicional (Papel)
              </div>
              <ul className="space-y-4 text-slate-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Las tarjetas físicas se pierden con frecuencia.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Cero datos sobre la frecuencia de compra o hábitos de los clientes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Sin canal directo para enviar ofertas o promociones.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Costo recurrente de impresión y diseño de tarjetas físicas.</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900 border border-brand-500/30 p-8 rounded-2xl relative overflow-hidden shadow-xl shadow-brand-500/5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
                La solución Loyalify (Digital)
              </div>
              <ul className="space-y-4 text-slate-300 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0" />
                  <span>Siempre en el teléfono del cliente (Navegador o Wallet).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0" />
                  <span>Métricas en tiempo real: recurrencia, visitas y recompensas.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0" />
                  <span>Vinculación instantánea mediante código QR interactivo.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0" />
                  <span>Ahorro total de papel y digitalización profesional de tu marca.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS DESTACADOS */}
      <section id="beneficios" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">Beneficios Clave</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white">
            Diseñado para acelerar las ventas de tu negocio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl hover:border-brand-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Captación Automática</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Los clientes se registran escaneando un código QR en tu local. Sin necesidad de descargar aplicaciones complejas.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl hover:border-brand-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Sellos o Puntos</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Elige el esquema que mejor encaje con tu tipo de negocio: tarjetas de sellos por visitas o acumulación de puntos por compras.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl hover:border-brand-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Analíticas en Tiempo Real</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Conoce quiénes son tus mejores clientes, cuántas veces vuelven al mes y qué recompensas generan mayor tracción.
            </p>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-20 bg-slate-900/40 border-y border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              ¿Cómo funciona Loyalify?
            </h2>
            <p className="mt-4 text-slate-400">
              En sólo 3 sencillos pasos tendrás tu programa de fidelización funcionando en tu local.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 relative">
              <div className="w-10 h-10 rounded-full bg-brand-500 text-slate-950 font-black flex items-center justify-center text-lg mb-6 shadow-lg shadow-brand-500/20">
                1
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Crea tu Negocio</h3>
              <p className="text-sm text-slate-400">
                Regístrate y configura el nombre de tu programa, la cantidad de sellos requeridos y los premios.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 relative">
              <div className="w-10 h-10 rounded-full bg-brand-500 text-slate-950 font-black flex items-center justify-center text-lg mb-6 shadow-lg shadow-brand-500/20">
                2
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Despliega el QR</h3>
              <p className="text-sm text-slate-400">
                Descarga tu cartel con código QR impreso y ubícalo en la caja o en las mesas de tu establecimiento.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 relative">
              <div className="w-10 h-10 rounded-full bg-brand-500 text-slate-950 font-black flex items-center justify-center text-lg mb-6 shadow-lg shadow-brand-500/20">
                3
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Fideliza y Premia</h3>
              <p className="text-sm text-slate-400">
                Tus clientes escanean, suman sellos y canjean sus recompensas directamente desde su móvil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO INTERACTIVA DE TARJETA DIGITAL */}
      <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
              Experiencia del cliente final
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Una tarjeta digital elegante que tus clientes amarán usar
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Prueba el simulador en vivo. Haz clic en el botón para simular la adición de sellos en la tarjeta digital del cliente.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                <Smartphone className="w-6 h-6 text-brand-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Sin descargas</h4>
                  <p className="text-xs text-slate-400">Funciona directamente en Safari, Chrome o cualquier navegador web.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                <Award className="w-6 h-6 text-brand-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Progreso en vivo</h4>
                  <p className="text-xs text-slate-400">El cliente ve de inmediato cuántos sellos le faltan para su premio.</p>
                </div>
              </div>
            </div>
          </div>

          {/* SIMULADOR DE TARJETA */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 shadow-2xl relative">
              <div className="w-16 h-1.5 bg-slate-800 rounded-full mx-auto mb-6"></div>

              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-brand-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-400">Cafetería Artesanal</span>
                    <h3 className="text-lg font-extrabold text-white">Aroma Café</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-brand-500 text-slate-950 font-black flex items-center justify-center text-lg">
                    ☕
                  </div>
                </div>

                <div className="text-xs text-slate-400 mb-3 flex justify-between">
                  <span>Tarjeta de Sellos</span>
                  <span className="font-bold text-white">{sampleStamps} / 8 Sellos</span>
                </div>

                {/* STAMPS GRID */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-12 rounded-xl flex items-center justify-center text-lg transition-all ${
                        idx < sampleStamps
                          ? 'bg-brand-500 text-slate-950 shadow-md shadow-brand-500/30 scale-100'
                          : 'bg-slate-950 border border-slate-800 text-slate-700'
                      }`}
                    >
                      {idx < sampleStamps ? '☕' : idx + 1}
                    </div>
                  ))}
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Próximo Premio</div>
                  <div className="text-xs font-bold text-brand-400">Café Especialidad Gratis</div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setSampleStamps((prev) => (prev >= 8 ? 0 : prev + 1))}
                  className="flex-1 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition-colors cursor-pointer"
                >
                  {sampleStamps >= 8 ? 'Reiniciar tarjeta' : '+ Sumar sello simulación'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="py-24 bg-slate-900/50 border-t border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Planes transparentes para cada etapa
            </h2>
            <p className="mt-4 text-slate-400">
              Comienza gratis hoy mismo y escala según el crecimiento de tu negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* PLAN STARTER */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Inicial</h3>
                <p className="text-slate-400 text-xs mb-6">Ideal para pequeños negocios o emprendimientos.</p>
                <div className="text-4xl font-extrabold text-white mb-6">
                  $0 <span className="text-sm font-normal text-slate-400">/ mes</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-400" /> Hasta 100 clientes activos
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-400" /> 1 Programa de sellos
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-400" /> Código QR descargable
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-400" /> Métricas básicas
                  </li>
                </ul>
              </div>
              <Link
                href="/registro"
                className="w-full text-center py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Comenzar Gratis
              </Link>
            </div>

            {/* PLAN PRO */}
            <div className="bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 border-2 border-brand-500 p-8 rounded-3xl flex flex-col justify-between relative shadow-2xl shadow-brand-500/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full tracking-wider shadow-md">
                Más Popular
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Pro Business</h3>
                <p className="text-slate-400 text-xs mb-6">Para negocios en expansión que buscan acelerar ventas.</p>
                <div className="text-4xl font-extrabold text-white mb-6">
                  $29 <span className="text-sm font-normal text-slate-400">/ mes</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-400" /> Clientes ilimitados
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-400" /> Programas ilimitados (Sellos y Puntos)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-400" /> Recompensas personalizadas ilimitadas
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-400" /> Analíticas avanzadas e historial completo
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-400" /> Soporte prioritario 24/7
                  </li>
                </ul>
              </div>
              <Link
                href="/registro"
                className="w-full text-center py-3 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-brand-500/20 transition-all"
              >
                Probar 14 Días Gratis
              </Link>
            </div>

            {/* PLAN ENTERPRISE */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Multi-Sucursal</h3>
                <p className="text-slate-400 text-xs mb-6">Para franquicias o cadenas de múltiples locales.</p>
                <div className="text-4xl font-extrabold text-white mb-6">
                  $79 <span className="text-sm font-normal text-slate-400">/ mes</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-400" /> Múltiples ubicaciones y roles
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-400" /> Dominio propio y marca blanca
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-400" /> Integraciones API a medida
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-400" /> Asesor de fidelización dedicado
                  </li>
                </ul>
              </div>
              <Link
                href="/registro"
                className="w-full text-center py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Contactar Ventas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <div className="flex gap-1 text-amber-400 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              "Pasamos de dar tarjetas de cartón que la gente perdía a tener más del 80% de nuestros clientes recurrentes registrados en la tarjeta digital. Increíble."
            </p>
            <div>
              <div className="text-sm font-bold text-white">Mateo Fernández</div>
              <div className="text-xs text-slate-500">Dueño de Cafetería San Jorge</div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <div className="flex gap-1 text-amber-400 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              "La facilidad con la que el cliente escanea el QR en la barra sin bajar ninguna app hizo que nuestra base de datos creciera en más de 600 personas en el primer mes."
            </p>
            <div>
              <div className="text-sm font-bold text-white">Lucía Gómez</div>
              <div className="text-xs text-slate-500">Fundadora de Studio Barber</div>
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <div className="flex gap-1 text-amber-400 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              "El panel de métricas nos permitió entender qué promociones realmente traen a la gente de regreso. La mejor inversión SaaS para mi local."
            </p>
            <div>
              <div className="text-sm font-bold text-white">Andrés Silva</div>
              <div className="text-xs text-slate-500">Gerente de Gourmet Burgers</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-slate-900/40 border-t border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white">Preguntas Frecuentes</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: '¿El cliente necesita descargar alguna aplicación?',
                a: 'No. El cliente únicamente escanea el código QR desde la cámara de su teléfono y la tarjeta se abre instantáneamente en su navegador móvil.',
              },
              {
                q: '¿Puedo cambiar mi programa de sellos a puntos después?',
                a: 'Sí. En cualquier momento puedes cambiar la modalidad de fidelización desde la pestaña de configuración del dashboard.',
              },
              {
                q: '¿Cómo se evitan los fraudes al asignar sellos?',
                a: 'Cada asignación de sellos o puntos se valida únicamente a través del panel administrativo del dueño o colaborador del negocio.',
              },
              {
                q: '¿Los datos de mi negocio están aislados de otros comercios?',
                a: 'Totalmente. Loyalify es una plataforma multi-tenant con Row Level Security (RLS) en la base de datos, garantizando que nadie pueda ver tus datos.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between text-sm font-bold text-white hover:text-brand-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${faqOpen === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                {faqOpen === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-emerald-500 rounded-3xl p-10 sm:p-16 text-center text-slate-950 relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            Empieza a fidelizar a tus clientes hoy mismo
          </h2>
          <p className="text-slate-950/80 max-w-2xl mx-auto font-medium text-base sm:text-lg mb-8">
            Crea tu cuenta gratis en menos de 2 minutos. Sin contratos ni tarjetas de crédito obligatorias.
          </p>
          <Link
            href="/registro"
            className="inline-flex items-center gap-3 bg-slate-950 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-900 transition-colors shadow-xl"
          >
            <span>Crear mi cuenta gratis</span>
            <ArrowRight className="w-5 h-5 text-brand-400" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-500 text-slate-950 font-black flex items-center justify-center text-sm">
              L
            </div>
            <span className="font-bold text-slate-200 text-sm">Loyalify SaaS</span>
            <span className="text-slate-600">| © {new Date().getFullYear()} Todos los derechos reservados.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#beneficios" className="hover:text-slate-300">
              Beneficios
            </a>
            <a href="#como-funciona" className="hover:text-slate-300">
              Cómo funciona
            </a>
            <a href="#precios" className="hover:text-slate-300">
              Precios
            </a>
            <Link href="/iniciar-sesion" className="hover:text-slate-300">
              Acceso Negocios
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
