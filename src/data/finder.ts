// Software finder questions. Each need maps to a software category slug in software.json.
export const NEEDS = [
  { id: 'p2p', label: 'Purchasing and invoice approvals', sub: 'Requests, purchase orders, receiving and three-way match', category: 'procure-to-pay', icon: 'cart' },
  { id: 'intake', label: 'One front door for requests', sub: 'Route purchases through procurement, legal, IT and security', category: 'procurement-software', icon: 'door' },
  { id: 'sourcing', label: 'Sourcing events and negotiations', sub: 'RFQs, auctions, bid analysis and should-cost', category: 'strategic-sourcing', icon: 'gavel' },
  { id: 'contracts', label: 'Contracts and renewals', sub: 'Templates, approvals, obligations and price escalators', category: 'contract-lifecycle', icon: 'doc' },
  { id: 'spend', label: 'Spend visibility', sub: 'Where money goes, by supplier, category and budget', category: 'spend-analytics', icon: 'chart' },
  { id: 'risk', label: 'Supplier risk', sub: 'Financial health, cyber risk and disruption monitoring', category: 'supplier-risk', icon: 'shield' },
  { id: 'payments', label: 'Paying suppliers', sub: 'Bill pay, global payments and payment fraud controls', category: 'payment-software', icon: 'card' },
  { id: 'compliance', label: 'Compliance and screening', sub: 'Sanctions, due diligence and supplier certifications', category: 'compliance-software', icon: 'check' },
];
export const SIZES = [
  { id: 'small', label: 'Under 500 employees', sub: 'Small team, fast decisions', note: 'Favor tools that go live in weeks and keep total cost low. Avoid paying for suite modules you will not use.' },
  { id: 'mid', label: '500 to 5,000 employees', sub: 'Growing, multi-team', note: 'Balance configurability with the time your team can spend on setup. Check how well each tool handles multiple entities.' },
  { id: 'large', label: 'Over 5,000 employees', sub: 'Global, multi-entity', note: 'Prioritize governance, scale and ERP integration. Plan for a longer implementation and supplier enablement.' },
];
export const PRIORITIES = [
  { id: 'usability', label: 'People actually use it', sub: 'Adoption and ease of use' },
  { id: 'support', label: 'Live quickly', sub: 'Fast implementation and strong support' },
  { id: 'integration', label: 'Fits our ERP and finance stack', sub: 'Integration depth' },
  { id: 'value', label: 'Lowest total cost', sub: 'Price and value for money' },
  { id: 'coverage', label: 'Covers everything we need', sub: 'Breadth and depth of features' },
];
export const PLATFORMS = [
  { id: 'sap', label: 'SAP', match: /\bSAP\b/ },
  { id: 'workday', label: 'Workday', match: /Workday/ },
  { id: 'servicenow', label: 'ServiceNow', match: /ServiceNow/ },
  { id: 'salesforce', label: 'Salesforce', match: /Conga|Salesforce/ },
  { id: 'docusign', label: 'Docusign', match: /Docusign/ },
  { id: 'none', label: 'None of these / mixed', match: null },
];
