'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { mockDb } from '@/services/mockDb';
import { Reward } from '@/types/database';
import {
  Gift,
  Plus,
  Edit2,
  Trash2,
  X,
  Check,
  Award,
  Sparkles,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

export default function RecompensasPage() {
  const { business } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);

  const [form, setForm] = useState({
    name: '',
    description: '',
    requiredPoints: 10,
    active: true,
  });

  if (!business) return null;

  const rewards = mockDb.getRewards(business.id);
  const program = mockDb.getLoyaltyProgram(business.id);

  const handleOpenModal = (reward?: Reward) => {
    if (reward) {
      setEditingReward(reward);
      setForm({
        name: reward.name,
        description: reward.description || '',
        requiredPoints: reward.requiredPoints,
        active: reward.active,
      });
    } else {
      setEditingReward(null);
      setForm({
        name: '',
        description: '',
        requiredPoints: program?.pointsRequired || 10,
        active: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || form.requiredPoints <= 0) return;

    if (editingReward) {
      mockDb.updateReward(business.id, editingReward.id, {
        name: form.name,
        description: form.description,
        requiredPoints: Number(form.requiredPoints),
        active: form.active,
      });
    } else {
      mockDb.addReward(business.id, {
        name: form.name,
        description: form.description,
        requiredPoints: Number(form.requiredPoints),
        active: form.active,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (rewardId: string) => {
    if (confirm('¿Deseas eliminar esta recompensa?')) {
      mockDb.deleteReward(business.id, rewardId);
    }
  };

  const toggleActive = (reward: Reward) => {
    mockDb.updateReward(business.id, reward.id, { active: !reward.active });
  };

  return (
    <div className="space-y-8">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Gift className="w-6 h-6 text-brand-400" />
            <span>Catálogo de Recompensas</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Crea los premios que tus clientes podrán canjear con sus sellos o puntos acumulados.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-brand-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Crear Recompensa</span>
        </button>
      </div>

      {/* REWARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-500 text-xs">
            Aún no has creado recompensas para tu negocio.
          </div>
        ) : (
          rewards.map((reward) => (
            <div
              key={reward.id}
              className={`bg-slate-900/80 rounded-2xl border p-6 flex flex-col justify-between transition-all relative ${
                reward.active
                  ? 'border-slate-800 hover:border-brand-500/40'
                  : 'border-slate-800/40 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 font-extrabold text-xs">
                    <Award className="w-3.5 h-3.5" />
                    {reward.requiredPoints} {program?.type === 'stamps' ? 'sellos' : 'pts'}
                  </span>

                  <button
                    onClick={() => toggleActive(reward)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      reward.active
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {reward.active ? 'Activa' : 'Inactiva'}
                  </button>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{reward.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {reward.description || 'Sin descripción detallada.'}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800/60">
                <button
                  onClick={() => handleOpenModal(reward)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => handleDelete(reward.id)}
                  className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">
              {editingReward ? 'Editar Recompensa' : 'Nueva Recompensa'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Define los detalles y la cantidad de puntos/sellos necesarios.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Nombre de la recompensa *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ej. Café Gratis de Especialidad"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Puntos o Sellos requeridos *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={form.requiredPoints}
                  onChange={(e) => setForm({ ...form, requiredPoints: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Descripción / Instrucciones
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Ej. Aplica para cualquier café de tamaño mediano en barra."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs font-medium text-slate-300">Recompensa activa</span>
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="w-4 h-4 accent-brand-500 rounded cursor-pointer"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold py-3 rounded-xl text-xs shadow-md shadow-brand-500/20"
                >
                  Guardar Recompensa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
