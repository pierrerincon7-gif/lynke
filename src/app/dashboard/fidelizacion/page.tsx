'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { mockDb } from '@/services/mockDb';
import { LoyaltyProgramType } from '@/types/database';
import { Award, CheckCircle2, Save, Sparkles, Layers, FileText } from 'lucide-react';

export default function FidelizacionPage() {
  const { business } = useAuth();

  if (!business) return null;

  const currentProgram = mockDb.getLoyaltyProgram(business.id);

  const [formData, setFormData] = useState({
    name: currentProgram?.name || `Programa de Fidelización ${business.name}`,
    type: (currentProgram?.type || 'stamps') as LoyaltyProgramType,
    pointsRequired: currentProgram?.pointsRequired || 10,
    conditions: currentProgram?.conditions || 'Acumula sellos en cada consumo superior a $10.',
    active: currentProgram?.active !== undefined ? currentProgram.active : true,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mockDb.updateLoyaltyProgram(business.id, {
      name: formData.name,
      type: formData.type,
      pointsRequired: Number(formData.pointsRequired),
      conditions: formData.conditions,
      active: formData.active,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* HEADER BAR */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Award className="w-6 h-6 text-brand-400" />
          <span>Configuración del Programa de Fidelización</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Define las reglas de juego: modalidad de acumulación, meta para obtener premios y condiciones.
        </p>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-4 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Configuración del programa guardada con éxito.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Nombre del Programa
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-3">
              Tipo de Fidelización
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                onClick={() => setFormData({ ...formData, type: 'stamps' })}
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  formData.type === 'stamps'
                    ? 'bg-brand-500/10 border-brand-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
                  ☕
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Tarjeta de Sellos</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    1 visita = 1 sello. Ideal para cafeterías, restaurantes y peluquerías.
                  </div>
                </div>
              </label>

              <label
                onClick={() => setFormData({ ...formData, type: 'points' })}
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  formData.type === 'points'
                    ? 'bg-brand-500/10 border-brand-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
                  ⚡
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Acumulación de Puntos</div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Acumula puntos según el monto o consumo del cliente.
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {formData.type === 'stamps' ? 'Sellos requeridos para recompensa' : 'Puntos meta por defecto'}
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.pointsRequired}
                onChange={(e) => setFormData({ ...formData, pointsRequired: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Estado del Programa</label>
              <select
                value={formData.active ? 'active' : 'inactive'}
                onChange={(e) => setFormData({ ...formData, active: e.target.value === 'active' })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="active">Activo (Visible para clientes)</option>
                <option value="inactive">Inactivo (Pausado)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Términos y Condiciones
            </label>
            <textarea
              rows={3}
              value={formData.conditions}
              onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
              placeholder="Ej. Valido solo en compras superiores a $10. No acumulable con otras promociones."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-lg shadow-brand-500/20 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Cambios</span>
          </button>
        </div>
      </form>
    </div>
  );
}
