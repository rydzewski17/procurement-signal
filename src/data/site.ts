export const SITE = {
  name: 'Procurement Signal',
  tagline: 'The intelligence feed for procurement leaders.',
  description: 'Daily procurement news, supplier risk, tariffs, commodities and procurement technology — with what it means for buyers.',
  editor: 'Jason Rydzewski',
};

export const TOPICS: Record<string, { name: string; blurb: string }> = {
  'tariffs-trade': { name: 'Tariffs & Trade', blurb: 'Tariff actions, trade policy and customs changes that move landed cost.' },
  'supplier-risk': { name: 'Supplier Risk', blurb: 'Bankruptcies, disruptions, recalls and the suppliers to watch.' },
  'proc-tech': { name: 'Proc-Tech', blurb: 'Source-to-pay software: funding, M&A, launches and adoption.' },
  'commodities': { name: 'Commodities & Pricing', blurb: 'Metals, energy, freight and input costs, with buyer guidance.' },
  'public-sector': { name: 'Public Sector', blurb: 'Government procurement rules, major contract awards and policy.' },
  'esg-regulation': { name: 'ESG & Regulation', blurb: 'Supply chain due diligence, forced-labor rules and compliance deadlines.' },
  'ai-procurement': { name: 'AI in Procurement', blurb: 'Agents, autonomous sourcing and how AI is changing the function.' },
  'people-moves': { name: 'People & Careers', blurb: 'CPO appointments, team trends and the procurement talent market.' },
};

export const TYPE_LABEL: Record<string, string> = { news: 'News', signal: 'Signal Report', analysis: 'Analysis' };
