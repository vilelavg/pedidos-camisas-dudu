const PRICES = {
  torcedor: { base: 150, premium: 170 },
  jogador: { base: 180, premium: 200 }
};

export function isPremiumSeason(season) {
  const match = season.match(/^(\d{2})/);
  return match ? parseInt(match[1], 10) >= 25 : false;
}

export function calculateItemPrice(model, season) {
  const config = PRICES[model.toLowerCase()];
  if (!config) return 150;
  return isPremiumSeason(season) ? config.premium : config.base;
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function formatPhone(value) {
  const n = value.replace(/\D/g, '');
  if (n.length <= 2) return n;
  if (n.length <= 7) return `(${n.slice(0,2)}) ${n.slice(2)}`;
  return `(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7,11)}`;
}

export function unformatPhone(value) {
  return value.replace(/\D/g, '');
}

export function generateOrderSummary(customer, items) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const list = items.map((item, i) => 
    `${i+1}. ${item.team} ${item.season} | ${item.color} | ${item.size} | ${item.model} - ${formatCurrency(item.price)}`
  ).join('\n');

  return `🏆 *PEDIDO DE CAMISAS*

👤 *Cliente:* ${customer.name}
📱 *Telefone:* ${customer.phone}
📍 *Endereço:* ${customer.address}

📦 *Itens (${items.length}):*
${list}

💰 *TOTAL: ${formatCurrency(total)}*

Aguardo confirmação! ⚽`;
}

export const POPULAR_TEAMS = [
  'Flamengo', 'Corinthians', 'São Paulo', 'Palmeiras', 'Santos', 'Grêmio', 'Internacional',
  'Atlético-MG', 'Cruzeiro', 'Fluminense', 'Vasco', 'Botafogo', 'Bahia', 'Fortaleza',
  'Real Madrid', 'Barcelona', 'Manchester United', 'Manchester City', 'Liverpool', 'Chelsea',
  'PSG', 'Bayern Munich', 'Juventus', 'Milan', 'Seleção Brasileira', 'Seleção Argentina', 'Outro'
];

export const SEASONS = ['24/25', '25/26', '23/24', '22/23'];

export const COLORS = [
  { value: 'Branca', color: '#FFFFFF', textColor: '#000' },
  { value: 'Preta', color: '#1a1a1a', textColor: '#FFF' },
  { value: 'Vermelha', color: '#DC2626', textColor: '#FFF' },
  { value: 'Azul', color: '#2563EB', textColor: '#FFF' },
  { value: 'Verde', color: '#16A34A', textColor: '#FFF' },
  { value: 'Amarela', color: '#EAB308', textColor: '#000' },
  { value: 'Roxa', color: '#7C3AED', textColor: '#FFF' },
  { value: 'Laranja', color: '#EA580C', textColor: '#FFF' },
  { value: 'Rosa', color: '#EC4899', textColor: '#FFF' },
  { value: 'Cinza', color: '#6B7280', textColor: '#FFF' }
];

export const SIZES = ['PP', 'P', 'M', 'G', 'GG', 'GGG'];

export const MODELS = [
  { value: 'Torcedor', description: 'Modelo tradicional' },
  { value: 'Jogador', description: 'Modelo profissional' }
];