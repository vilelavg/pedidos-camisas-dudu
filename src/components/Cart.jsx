import React from 'react';
import { formatCurrency } from '../utils/pricing';
import { TrashIcon, ShoppingCartIcon } from './Icons';

export function Cart({ items, onRemoveItem, totalValue }) {
  if (!items.length) return null;

  return (
    <div className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700/50">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <ShoppingCartIcon className="w-5 h-5 text-emerald-400" /> Carrinho
        <span className="ml-auto bg-emerald-500 text-white text-sm px-2.5 py-0.5 rounded-full">{items.length}</span>
      </h2>

      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
        {items.map((item, i) => (
          <div key={item.id} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 animate-fadeIn" style={{animationDelay: `${i*50}ms`}}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white truncate">{item.team} {item.season}</div>
                <div className="text-sm text-slate-400 mt-1">{item.color} • {item.size} • {item.model}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">{formatCurrency(item.price)}</span>
                <button onClick={() => onRemoveItem(item.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center">
        <span className="text-slate-300 font-medium">Total:</span>
        <span className="text-2xl font-bold text-emerald-400">{formatCurrency(totalValue)}</span>
      </div>
    </div>
  );
}