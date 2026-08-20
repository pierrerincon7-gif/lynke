'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { mockDb } from '@/services/mockDb';
import { Customer } from '@/types/database';
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  Award,
  Phone,
  Mail,
  Calendar,
  X,
  CheckCircle2,
  Sparkles,
  History,
  Clock,
} from 'lucide-react';

export default function ClientesPage() {
  const { business } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<(Customer & { points: number; visits: number }) | null>(null);
  const [pointsToAdd, setPointsToAdd] = useState<number>(1);
  const [pointsReason, setPointsReason] = useState('Compra realizada');

  // New Customer Form State
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [formError, setFormError] = useState<string | null>(null);

  if (!business) return null;

  const customers = mockDb.getCustomers(business.id);
  const program = mockDb.getLoyaltyProgram(business.id);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!newCustomer.name || !newCustomer.phone) {
      setFormError('Nombre y teléfono son obligatorios.');
      return;
    }

    try {
      mockDb.addCustomer(business.id, {
        name: newCustomer.name,
        email: newCustomer.email || undefined,
        phone: newCustomer.phone,
      });
      setNewCustomer({ name: '', email: '', phone: '' });
      setIsAddModalOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'Error al agregar cliente');
    }
  };

  const handleAddPoints = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;

    try {
      mockDb.addPointsToCustomer(business.id, selectedCustomer.id, Number(pointsToAdd), pointsReason);
      setSelectedCustomer(null);
      setPointsToAdd(1);
    } catch (err: any) {
      alert(err.message || 'Error al sumar puntos');
    }
  };

  const handleDeleteCustomer = (customerId: string) => {
    if (confirm('¿Estás seguro de eliminar este cliente? Se borrará todo su historial.')) {
      mockDb.deleteCustomer(business.id, customerId);
      if (selectedCustomer?.id === customerId) {
        setSelectedCustomer(null);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-brand-400" />
            <span>Gestión de Clientes</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Administra tus clientes, asigna sellos/puntos y revisa su historial de visitas.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-brand-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar cliente por nombre, teléfono o correo..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      {/* CUSTOMERS TABLE */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Cliente</th>
                <th className="p-4">Contacto</th>
                <th className="p-4">Visitas</th>
                <th className="p-4">Puntos / Sellos</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No se encontraron clientes para la búsqueda realizada.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 font-bold flex items-center justify-center border border-brand-500/30">
                          {cust.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{cust.name}</div>
                          <div className="text-[10px] text-slate-500">
                            Registrado el{' '}
                            {new Date(cust.createdAt).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-300">
                      <div className="flex items-center gap-1.5 font-mono">
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span>{cust.phone}</span>
                      </div>
                      {cust.email && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-500" />
                          <span>{cust.email}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-bold text-white">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700">
                        <Clock className="w-3 h-3 text-brand-400" />
                        <span>{cust.visits} visitas</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 font-extrabold text-sm">
                        <Award className="w-4 h-4" />
                        <span>
                          {cust.points}{' '}
                          {program?.type === 'stamps' ? 'sellos' : 'pts'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedCustomer(cust)}
                          className="px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-[11px] transition-colors cursor-pointer"
                        >
                          + Otorgar
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(cust.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Eliminar cliente"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD CUSTOMER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Registrar Nuevo Cliente</h3>
            <p className="text-xs text-slate-400 mb-6">
              Agrega manualmente un cliente a la base de datos de tu negocio.
            </p>

            {formError && (
              <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-xl">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateCustomer} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nombre completo *</label>
                <input
                  type="text"
                  required
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  placeholder="Ej. Laura García"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Teléfono *</label>
                <input
                  type="tel"
                  required
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  placeholder="+34611223344"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Correo electrónico (Opcional)</label>
                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  placeholder="laura@gmail.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold py-3 rounded-xl text-xs shadow-md shadow-brand-500/20"
                >
                  Guardar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD POINTS MODAL */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-500/20 text-brand-400 font-bold flex items-center justify-center border border-brand-500/30 text-lg">
                {selectedCustomer.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{selectedCustomer.name}</h3>
                <p className="text-xs text-slate-400 font-mono">{selectedCustomer.phone}</p>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mb-6 flex justify-between items-center text-xs">
              <span className="text-slate-400">Saldo actual:</span>
              <span className="font-extrabold text-brand-400 text-sm">
                {selectedCustomer.points} {program?.type === 'stamps' ? 'sellos' : 'puntos'}
              </span>
            </div>

            <form onSubmit={handleAddPoints} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Cantidad a otorgar ({program?.type === 'stamps' ? 'Sellos' : 'Puntos'})
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={pointsToAdd}
                  onChange={(e) => setPointsToAdd(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Concepto / Notas</label>
                <input
                  type="text"
                  required
                  value={pointsReason}
                  onChange={(e) => setPointsReason(e.target.value)}
                  placeholder="Ej. Consumo de $25 o sello por visita"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCustomer(null)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold py-3 rounded-xl text-xs shadow-md shadow-brand-500/20"
                >
                  Confirmar Otorgamiento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
