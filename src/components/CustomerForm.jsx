import React, { useState } from 'react';
import { formatPhone, unformatPhone } from '../utils/pricing';
import { UserIcon, PhoneIcon, MapPinIcon } from './Icons';

export function CustomerForm({ customer, onSubmit }) {
  const [form, setForm] = useState({ name: customer.name || '', phone: customer.phone || '', address: customer.address || '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.length < 3) e.name = 'Nome inválido';
    const phone = unformatPhone(form.phone);
    if (phone.length < 10 || phone.length > 11) e.phone = 'Telefone inválido';
    if (!form.address.trim() || form.address.length < 10) e.address = 'Endereço incompleto';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSubmit(form); };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700/50">
        <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-emerald-400" /> Seus Dados
        </h2>

        <div className="mb-4">
          <label className="block text-sm text-slate-300 mb-2">Nome Completo *</label>
          <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
            placeholder="Digite seu nome" className={`w-full px-4 py-3.5 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 ${errors.name ? 'border-red-500' : 'border-slate-700'}`} />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-slate-300 mb-2">Telefone (WhatsApp) *</label>
          <div className="relative">
            <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: formatPhone(e.target.value)})}
              placeholder="(11) 99999-9999" maxLength={16} className={`w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 ${errors.phone ? 'border-red-500' : 'border-slate-700'}`} />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-2">Endereço de Entrega *</label>
          <div className="relative">
            <MapPinIcon className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
            <textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})}
              placeholder="Rua, número, bairro, cidade" rows={3} className={`w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 resize-none ${errors.address ? 'border-red-500' : 'border-slate-700'}`} />
          </div>
          {errors.address && <p className="mt-1 text-sm text-red-400">{errors.address}</p>}
        </div>
      </div>

      <button type="submit" className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-xl active:scale-[0.98] transition-all">
        Continuar para Produtos →
      </button>
    </form>
  );
}