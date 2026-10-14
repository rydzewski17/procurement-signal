// Single source of truth for browse categories. Used by:
//  - scripts/update-wire.mjs (tags each RSS headline with one or more categories)
//  - the site (category pages, hub, and matching of our own stories)
// A headline can belong to several categories. Keep patterns broad enough to catch
// trade-press wording, and check the result with the test below after changes.
export const CATEGORIES = [
  { slug: 'tariffs', name: 'Tariffs & trade policy', blurb: 'Duties, exclusions, trade agreements and customs rules that change landed cost.', re: /tariff|duty|duties|customs|section 30[1-9]|section 232|reciprocal|trade deal|trade war|usmca|de minimis|exclusion|export control|import ban|foreign-trade zone|\bftz\b/i },
  { slug: 'freight', name: 'Freight & logistics', blurb: 'Ocean, air, truck and rail capacity, rates and carrier moves.', re: /freight|shipping|shipment|carrier|container|ocean|air cargo|trucking|truck|truckload|linehaul|rail|logistic|transport|port|drayage|boxes|delivery|cargo|vessel/i },
  { slug: 'metals', name: 'Metals & commodities', blurb: 'Steel, aluminum, copper and other input prices and supply.', re: /steel|aluminum|aluminium|copper|nickel|zinc|iron ore|commodit|metal|lumber|pulp|paper price|resin/i },
  { slug: 'energy', name: 'Energy & fuel', blurb: 'Diesel, oil, natural gas and electricity costs that feed into supplier pricing.', re: /diesel|crude|oil price|natural gas|energy price|fuel|electricity|power price|brent|gasoline/i },
  { slug: 'supplier-risk', name: 'Supplier risk & disruption', blurb: 'Shortages, closures, bankruptcies, recalls and disruptions in the supply base.', re: /shortage|disrupt|bankrupt|chapter 11|shutdown|closure|closing|recall|strike|outage|halt|delay|hurricane|cyberattack|ransomware|plant fire|rollover|killed|crash|suspend|resilien|risk/i },
  { slug: 'sourcing', name: 'Sourcing & supplier strategy', blurb: 'Nearshoring, dual sourcing, supplier consolidation and market shifts.', re: /sourcing|supplier|nearshor|reshor|onshor|dual sourc|supplier diversity|vendor|supplier base/i },
  { slug: 'contracts', name: 'Contracts & pricing', blurb: 'Escalators, indexation, fixed-price terms, renegotiation and cost pass-through.', re: /contract|pricing|price increase|escalat|index-linked|surcharge|fixed-price|renegotiat|price hike/i },
  { slug: 'spend', name: 'Spend & savings', blurb: 'Spend analytics, cost reduction, category management and procurement performance.', re: /spend|savings|cost reduction|category management|procurement performance|cost savings|budget/i },
  { slug: 'proc-tech', name: 'Procurement technology', blurb: 'Source-to-pay software, platform launches, funding and acquisitions.', re: /procurement software|source-to-pay|s2p|platform|saas|raises|funding round|acquires|acquisition|launches .*procurement|spend management|e-?procurement/i },
  { slug: 'ai', name: 'AI in procurement', blurb: 'Agents, automation and AI tools applied to sourcing and buying.', re: /\bai\b|artificial intelligence|agentic|generative|machine learning|automation|copilot/i },
  { slug: 'semis', name: 'Semiconductors & electronics', blurb: 'Chip supply, export controls and electronics component availability.', re: /semiconductor|chip|electronic|circuit|memory|foundry|wafer/i },
  { slug: 'manufacturing', name: 'Manufacturing & industrial', blurb: 'Plant openings and closings, reshoring, capacity and industrial output.', re: /manufactur|factory|plant|industrial production|capacity|production line|steel mill|expansion|shipyard|facility|breaks ground/i },
  { slug: 'warehousing', name: 'Warehousing & inventory', blurb: 'Distribution centers, fulfillment, inventory strategy and returns.', re: /warehouse|distribution center|fulfillment|inventory|returns|replenish/i },
  { slug: 'public-sector', name: 'Government & public sector', blurb: 'Federal and public procurement rules, contract awards and agency policy.', re: /federal|government|gsa|dod|pentagon|far\b|acquisition regulation|public sector|contract award|agency/i },
  { slug: 'compliance', name: 'Compliance & regulation', blurb: 'Forced-labor rules, sanctions, due diligence and regulatory deadlines.', re: /forced labor|uyghur|sanction|due diligence|compliance|regulat|disclosure|csddd|csrd|uflpa|anti-corruption|fcpa/i },
  { slug: 'sustainability', name: 'Sustainability & decarbonization', blurb: 'Emissions targets, decarbonized freight, recycled content and ESG reporting.', re: /sustainab|decarbon|emission|carbon|esg|renewable|net zero|circular|recycl|climate/i },
  { slug: 'talent', name: 'Talent & careers', blurb: 'CPO appointments, team moves, hiring and the procurement job market.', re: /appoint|names .*chief|chief procurement|chief supply|chief operating|hires|named .*officer|layoff|job cuts|workforce|talent|retire|chief .*officer|\bcfo\b|\bceo\b/i },
  { slug: 'deals', name: 'Company moves & M&A', blurb: 'Acquisitions, mergers, earnings signals and major supplier and buyer news.', re: /merger|acquires|acquisition|buyout|earnings|revenue|quarterly results|guidance|q[1-4] results|spin-?off|ipo|credit facility|lands \$|raises \$|invest/i },
  { slug: 'food-ag', name: 'Food & agriculture', blurb: 'Food supply chains, agricultural inputs, egg, meat and produce sourcing.', re: /food|agricultur|grocer|produce|egg|meat|dairy|crop|fertilizer|cyclospora|beverage/i },
  { slug: 'healthcare', name: 'Healthcare supply', blurb: 'Medical consumables, pharmaceutical supply and health system procurement.', re: /pharma|medical|drug|hospital|healthcare|health system|medicine|tariff on drugs|patented/i },
];

// Reader-facing groups for menus and homepage section fronts.
export const NEWS_GROUPS = [
  { id: 'trade', name: 'Trade & policy', slugs: ['tariffs', 'compliance', 'public-sector', 'sustainability'] },
  { id: 'supply', name: 'Supply chain', slugs: ['freight', 'supplier-risk', 'manufacturing', 'warehousing'] },
  { id: 'costs', name: 'Costs & commodities', slugs: ['metals', 'energy', 'semis', 'food-ag', 'healthcare'] },
  { id: 'function', name: 'Procurement & sourcing', slugs: ['sourcing', 'contracts', 'spend', 'proc-tech', 'ai', 'talent', 'deals'] },
];

export const FALLBACK = { slug: 'industry', name: 'Industry news', blurb: 'Other procurement and supply chain headlines that don’t fit a specific category yet.' };

export const categoryBySlug = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]));

// Returns every category slug whose pattern matches the text.
export function categorize(text = '') {
  const hits = CATEGORIES.filter((c) => c.re.test(text)).map((c) => c.slug);
  return hits.length ? hits : [FALLBACK.slug];
}

// Homepage section blocks and /sections/ pages, in the order readers see them.
export const SECTIONS = [
  { id: 'procurement', name: 'Procurement', blurb: 'Sourcing strategy, contracts, spend, savings and the people leading procurement teams.', slugs: ['sourcing', 'contracts', 'spend', 'talent'] },
  { id: 'digital-procurement', name: 'Digital procurement', blurb: 'Source-to-pay software, AI agents and the technology changing how teams buy.', slugs: ['proc-tech', 'ai'] },
  { id: 'trade', name: 'Trade & policy', blurb: 'Tariffs, trade rules, compliance deadlines and government procurement.', slugs: ['tariffs', 'compliance', 'public-sector', 'sustainability'] },
  { id: 'supply-chain', name: 'Supply chain & risk', blurb: 'Freight, warehousing, supplier failures and disruptions in the supply base.', slugs: ['freight', 'supplier-risk', 'warehousing', 'manufacturing'] },
  { id: 'costs', name: 'Costs & commodities', blurb: 'Metals, energy, chips and the input costs behind supplier pricing.', slugs: ['metals', 'energy', 'semis', 'food-ag', 'healthcare'] },
  { id: 'companies', name: 'Company moves', blurb: 'Acquisitions, earnings, funding and major supplier and buyer news.', slugs: ['deals'] },
];
export const sectionById = Object.fromEntries(SECTIONS.map((s) => [s.id, s]));
export const sectionOf = (slugs = []) => SECTIONS.find((s) => s.slugs.some((x) => slugs.includes(x))) ?? SECTIONS[0];
