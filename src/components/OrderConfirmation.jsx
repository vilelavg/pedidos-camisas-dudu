import React, { useState } from 'react';
import { WhatsAppIcon, CopyIcon, CheckCircleIcon } from './Icons';

export function OrderConfirmation({ summary, onWhatsAppSend, onNewOrder }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(summary); } 
    catch { const t = document.createElement('textarea'); t.value = summary; document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t); }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg mb-4 animate-bounce-once">
          <CheckCircleIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Pedido Enviado!</h2>
        <p className="text-slate-400 mt-2">Dados registrados com sucesso</p>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
        <p className="text-amber-300 text-sm text-center font-medium">⚠️ Copie o resumo e envie no WhatsApp para confirmar</p>
      </div>

      <div className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase">Resumo</h3>
          <button onClick={handleCopy} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
            {copied ? <><CheckCircleIcon className="w-4 h-4" /> Copiado!</> : <><CopyIcon className="w-4 h-4" /> Copiar</>}
          </button>
        </div>
        <pre className="bg-slate-900/50 rounded-xl p-4 text-sm text-slate-300 whitespace-pre-wrap font-mono overflow-x-auto border border-slate-700/50">{summary}</pre>
      </div>

      <button onClick={onWhatsAppSend} className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-2xl shadow-lg flex items-center justify-center gap-3 hover:shadow-xl active:scale-[0.98] transition-all">
        <WhatsAppIcon className="w-6 h-6" /> Enviar para WhatsApp
      </button>

      <button onClick={onNewOrder} className="w-full py-3 text-slate-400 hover:text-white text-sm">← Fazer novo pedido</button>
    </div>
  );
}