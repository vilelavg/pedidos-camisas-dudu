import React, { useState } from 'react';
import { CustomerForm } from './components/CustomerForm';
import { ProductSelector } from './components/ProductSelector';
import { Cart } from './components/Cart';
import { OrderConfirmation } from './components/OrderConfirmation';
import { calculateItemPrice, formatCurrency, generateOrderSummary } from './utils/pricing';
import { ShirtIcon, CheckCircleIcon } from './components/Icons';

// ══════════════════════════════════════════════════════════════
// ⚠️ CONFIGURAÇÃO 1: COLE AQUI A URL DO GOOGLE APPS SCRIPT
// ══════════════════════════════════════════════════════════════
const API_URL = 'https://script.google.com/macros/s/AKfycbzYLQ6BueKUlxA4ynQDuIEF9QLhA9qXTgIO2unuTrKwX9fB5vo1z2bwtdA-VqzELJgbqA/exec';

// ══════════════════════════════════════════════════════════════
// ⚠️ CONFIGURAÇÃO 2: COLOQUE O NÚMERO DO WHATSAPP DO VENDEDOR
// Formato: 55 + DDD + número (apenas números, sem espaços)
// Exemplo: '5511999999999'
// ══════════════════════════════════════════════════════════════
const WHATSAPP_NUMBER = '5511969009039';

export default function App() {
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
  const [cart, setCart] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSummary, setOrderSummary] = useState('');

  const handleCustomerSubmit = (data) => { setCustomer(data); setStep(2); };
  
  const handleAddToCart = (item) => {
    setCart([...cart, { ...item, id: Date.now(), price: calculateItemPrice(item.model, item.season) }]);
  };
  
  const handleRemoveFromCart = (id) => setCart(cart.filter(item => item.id !== id));

  const handleFinishOrder = async () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);

    const orderData = {
      customer,
      items: cart.map(({ team, season, color, size, model, price }) => ({ team, season, color, size, model, price })),
      total: cart.reduce((sum, item) => sum + item.price, 0),
      totalItems: cart.length,
      orderDate: new Date().toISOString()
    };

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
        mode: 'no-cors'
      });
    } catch (error) {
      console.error('Erro:', error);
    }

    setOrderSummary(generateOrderSummary(customer, cart));
    setStep(3);
    setIsSubmitting(false);
  };

  const handleWhatsAppSend = () => {
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(orderSummary)}`, '_blank');
  };

  const handleNewOrder = () => {
    setStep(1);
    setCustomer({ name: '', phone: '', address: '' });
    setCart([]);
    setOrderSummary('');
  };

  const totalValue = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative z-10 px-4 py-6 max-w-lg mx-auto">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30 mb-4">
            <ShirtIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Camisas de Time</h1>
          <p className="text-emerald-300/70 text-sm mt-1">Faça seu pedido</p>
        </header>

        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${step >= s ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
                {step > s ? <CheckCircleIcon className="w-5 h-5" /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-1 mx-1 rounded-full ${step > s ? 'bg-emerald-500' : 'bg-slate-800'}`} />}
            </div>
          ))}
        </div>

        <div className="flex justify-between text-xs text-slate-400 mb-6 px-2">
          <span className={step >= 1 ? 'text-emerald-400' : ''}>Dados</span>
          <span className={step >= 2 ? 'text-emerald-400' : ''}>Produtos</span>
          <span className={step >= 3 ? 'text-emerald-400' : ''}>Confirmação</span>
        </div>

        <main>
          {step === 1 && <CustomerForm customer={customer} onSubmit={handleCustomerSubmit} />}
          
          {step === 2 && (
            <div className="space-y-6">
              <ProductSelector onAddToCart={handleAddToCart} />
              {cart.length > 0 && (
                <>
                  <Cart items={cart} onRemoveItem={handleRemoveFromCart} totalValue={totalValue} />
                  <button onClick={handleFinishOrder} disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-50">
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                        Enviando...
                      </span>
                    ) : `Finalizar Pedido • ${formatCurrency(totalValue)}`}
                  </button>
                </>
              )}
              <button onClick={() => setStep(1)} className="w-full py-3 text-slate-400 hover:text-white text-sm">← Voltar</button>
            </div>
          )}
          
          {step === 3 && <OrderConfirmation summary={orderSummary} onWhatsAppSend={handleWhatsAppSend} onNewOrder={handleNewOrder} />}
        </main>

        <footer className="mt-12 text-center text-slate-500 text-xs">© 2025 - Pedidos de Camisas</footer>
      </div>
    </div>
  );
}