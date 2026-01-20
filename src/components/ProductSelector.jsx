import React, { useState } from 'react';
import { POPULAR_TEAMS, SEASONS, COLORS, SIZES, MODELS, calculateItemPrice, formatCurrency, isPremiumSeason } from '../utils/pricing';
import { PlusIcon, ShirtIcon, ChevronDownIcon } from './Icons';

export function ProductSelector({ onAddToCart }) {
  const [item, setItem] = useState({ team: '', customTeam: '', season: '24/25', color: '', size: '', model: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    const team = item.team === 'Outro' ? item.customTeam : item.team;
    if (!team.trim()) e.team = 'Selecione um time';
    if (!item.color) e.color = 'Selecione uma cor';
    if (!item.size) e.size = 'Selecione um tamanho';
    if (!item.model) e.model = 'Selecione um modelo';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAdd = () => {
    if (validate()) {
      onAddToCart({ team: item.team === 'Outro' ? item.customTeam : item.team, season: item.season, color: item.color, size: item.size, model: item.model });
      setItem({ team: '', customTeam: '', season: '24/25', color: '', size: '', model: '' });
      setErrors({});
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    }
  };

  const price = item.model ? calculateItemPrice(item.model, item.season) : null;

  return (
    <div className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700/50">
      <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
        <ShirtIcon className="w-5 h-5 text-emerald-400" /> Adicionar Camisa
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-2">Time *</label>
          <div className="relative">
            <select value={item.team} onChange={e => setItem({...item, team: e.target.value, customTeam: ''})}
              className={`w-full px-4 py-3.5 bg-slate-900/50 border rounded-xl text-white appearance-none ${errors.team ? 'border-red-500' : 'border-slate-700'} ${!item.team ? 'text-slate-500' : ''}`}>
              <option value="">Selecione o time</option>
              {POPULAR_TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
          </div>
          {item.team === 'Outro' && (
            <input type="text" value={item.customTeam} onChange={e => setItem({...item, customTeam: e.target.value})}
              placeholder="Digite o time" className="w-full mt-2 px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white" />
          )}
          {errors.team && <p className="mt-1 text-sm text-red-400">{errors.team}</p>}
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-2">Temporada</label>
          <div className="flex flex-wrap gap-2">
            {SEASONS.map(s => (
              <button key={s} type="button" onClick={() => setItem({...item, season: s})}
                className={`px-4 py-2.5 rounded-xl font-medium text-sm ${item.season === s ? 'bg-emerald-500 text-white' : 'bg-slate-900/50 text-slate-300 border border-slate-700'}`}>
                {s} {isPremiumSeason(s) && '★'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-2">Cor *</label>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(c => (
              <button key={c.value} type="button" onClick={() => setItem({...item, color: c.value})}
                className={`px-3 py-2 rounded-xl text-sm font-medium ${item.color === c.value ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-slate-800' : ''}`}
                style={{ background: c.color, color: c.textColor, border: c.value === 'Branca' ? '1px solid #666' : 'none' }}>
                {c.value}
              </button>
            ))}
          </div>
          {errors.color && <p className="mt-1 text-sm text-red-400">{errors.color}</p>}
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-2">Tamanho *</label>
          <div className="flex flex-wrap gap-2">
            {SIZES.map(s => (
              <button key={s} type="button" onClick={() => setItem({...item, size: s})}
                className={`w-14 h-14 rounded-xl font-bold text-sm ${item.size === s ? 'bg-emerald-500 text-white' : 'bg-slate-900/50 text-slate-300 border border-slate-700'}`}>
                {s}
              </button>
            ))}
          </div>
          {errors.size && <p className="mt-1 text-sm text-red-400">{errors.size}</p>}
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-2">Modelo *</label>
          <div className="grid grid-cols-2 gap-3">
            {MODELS.map(m => (
              <button key={m.value} type="button" onClick={() => setItem({...item, model: m.value})}
                className={`p-4 rounded-xl text-left ${item.model === m.value ? 'bg-emerald-500/20 border-2 border-emerald-500' : 'bg-slate-900/50 border border-slate-700'}`}>
                <div className="font-semibold text-white">{m.value}</div>
                <div className="text-xs text-slate-400">{m.description}</div>
                <div className="text-emerald-400 font-bold mt-2">{formatCurrency(calculateItemPrice(m.value, item.season))}</div>
              </button>
            ))}
          </div>
          {errors.model && <p className="mt-1 text-sm text-red-400">{errors.model}</p>}
        </div>

        {price && (
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700 flex justify-between items-center">
            <span className="text-slate-400">Preço:</span>
            <span className="text-2xl font-bold text-emerald-400">{formatCurrency(price)}</span>
          </div>
        )}

        <button type="button" onClick={handleAdd}
          className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 ${success ? 'bg-green-500 text-white' : 'bg-slate-700 text-white hover:bg-slate-600'}`}>
          {success ? '✓ Adicionado!' : <><PlusIcon className="w-5 h-5" /> Adicionar ao Carrinho</>}
        </button>
      </div>
    </div>
  );
}