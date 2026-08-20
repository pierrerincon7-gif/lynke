'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { mockDb } from '@/services/mockDb';
import QRCode from 'qrcode';
import {
  Settings,
  Store,
  QrCode,
  Copy,
  CheckCircle2,
  Download,
  Save,
  ExternalLink,
  Building2,
  MapPin,
  User,
} from 'lucide-react';

export default function ConfiguracionPage() {
  const { business, user, refreshSession } = useAuth();
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: business?.name || '',
    businessType: business?.businessType || '',
    city: business?.city || '',
    ownerName: user?.name || '',
  });

  useEffect(() => {
    if (business?.slug) {
      const joinUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/join/${business.slug}`;
      QRCode.toDataURL(joinUrl, { width: 300, margin: 2 }, (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        }
      });
    }
  }, [business?.slug]);

  if (!business || !user) return null;

  const joinUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/join/${business.slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(joinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    mockDb.updateBusiness(business.id, {
      name: formData.name,
      businessType: formData.businessType,
      city: formData.city,
    });
    refreshSession();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* HEADER BAR */}
      <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-brand-400" />
          <span>Configuración del Negocio & QR</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Administra la información pública de tu local y obtén tu kit de captación por código QR.
        </p>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-4 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Información actualizada correctamente.</span>
        </div>
      )}

      {/* QR CAPTATION KIT CARD */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-2xl border border-brand-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="bg-white p-4 rounded-2xl shadow-xl shrink-0 border border-slate-200 text-center">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="QR Code" className="w-44 h-44 object-contain" />
            ) : (
              <div className="w-44 h-44 bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-semibold">
                Generando QR...
              </div>
            )}
            <span className="text-[10px] font-mono text-slate-500 font-bold block mt-1">
              Escanea para unirte
            </span>
          </div>

          <div className="space-y-4 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold">
              <QrCode className="w-3.5 h-3.5" /> Kit de Captación Digital
            </div>
            <h3 className="text-xl font-bold text-white">Enlace Único de Registro para Clientes</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Coloca este código QR en el mostrador o las mesas de tu establecimiento. Los clientes lo escanean con su teléfono y quedan asociados de forma automática a tu negocio.
            </p>

            <div className="flex items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <input
                type="text"
                readOnly
                value={joinUrl}
                className="bg-transparent text-xs text-brand-400 font-mono w-full focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-brand-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {qrDataUrl && (
                <a
                  href={qrDataUrl}
                  download={`QR-${business.slug}.png`}
                  className="px-4 py-2.5 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md shadow-brand-500/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Imagen QR</span>
                </a>
              )}
              <a
                href={joinUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors border border-slate-700"
              >
                <ExternalLink className="w-4 h-4 text-slate-400" />
                <span>Probar Portal de Cliente</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT BUSINESS FORM */}
      <form onSubmit={handleSave} className="bg-slate-900/80 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-4">
          Perfil del Negocio
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Nombre del negocio
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
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Tipo de negocio
            </label>
            <input
              type="text"
              required
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Ciudad
            </label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Propietario
            </label>
            <input
              type="text"
              disabled
              value={formData.ownerName}
              className="w-full bg-slate-950/50 border border-slate-800/80 rounded-xl p-3 text-xs text-slate-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800/60">
          <button
            type="submit"
            className="flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-lg shadow-brand-500/20 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Información</span>
          </button>
        </div>
      </form>
    </div>
  );
}
