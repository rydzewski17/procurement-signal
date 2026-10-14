// Maps a buyer's first priority to a software category slug in software.json.
export const NEEDS = [
  { id: 'p2p', label: 'Purchase-to-pay and supplier onboarding', category: 'procure-to-pay' },
  { id: 'sourcing', label: 'Running sourcing events and negotiations', category: 'strategic-sourcing' },
  { id: 'contracts', label: 'Managing contracts and renewals', category: 'contract-lifecycle' },
  { id: 'spend', label: 'Spend visibility and analytics', category: 'spend-analytics' },
  { id: 'risk', label: 'Monitoring supplier risk', category: 'supplier-risk' },
  { id: 'payments', label: 'Paying suppliers and payment controls', category: 'payment-software' },
  { id: 'compliance', label: 'Supplier compliance and sanctions screening', category: 'compliance-software' },
];
export const SIZES = [
  { id: 'small', label: 'Under 500 employees', note: 'Look for fast implementation and lower total cost of ownership.' },
  { id: 'mid', label: '500 to 5,000 employees', note: 'Balance configurability with the time your team can spend on setup.' },
  { id: 'large', label: 'Over 5,000 employees', note: 'Prioritize scale, governance and integration with your ERP.' },
];
