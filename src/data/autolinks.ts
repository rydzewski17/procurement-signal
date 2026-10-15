// Automatic in-text links for articles, guides and deep dives.
// - Internal: the first mention of a key term links to our most relevant page
//   (a story, guide, category analysis or glossary entry). Self-links are skipped.
// - External: the first mention of a cited publisher links to that source.
// Text inside existing links, headings and table headers is never touched.
import { slugify } from './software';

export interface Rule { re: RegExp; href: string }

const A = (id: string) => `/articles/${id}/`;
const G = (id: string) => `/guides/${id}/`;
const O = (id: string) => `/outlook/${id}/`;

// Order matters: more specific phrases first.
const RULES: [string, string][] = [
  // Stories
  ['C\\.H\\. Robinson', A('2026-10-14-ch-robinson-rxo-merger-what-shippers-should-do')],
  ['RXO', A('2026-10-14-ch-robinson-rxo-merger-what-shippers-should-do')],
  ['Union Pacific', A('2026-09-01-union-pacific-norfolk-southern-merger-stb-schedule-shippers')],
  ['Norfolk Southern', A('2026-09-01-union-pacific-norfolk-southern-merger-stb-schedule-shippers')],
  ['USMCA', A('2026-09-10-usmca-not-renewed-annual-reviews-north-america-sourcing')],
  ['Strait of Hormuz', A('2026-08-28-us-iran-war-six-months-hormuz-tanker-rates-diesel-jet-fuel')],
  ['war with Iran', A('2026-08-28-us-iran-war-six-months-hormuz-tanker-rates-diesel-jet-fuel')],
  ['(?:EU )?[Dd]eforestation (?:[Rr]egulation|rules)', A('2026-10-07-eudr-deforestation-regulation-december-30-2026-deadline-suppliers')],
  ['EUDR', A('2026-10-07-eudr-deforestation-regulation-december-30-2026-deadline-suppliers')],
  ['Taylor Farms', A('2026-10-14-taylor-farms-seasonal-sourcing-pause-produce-supplier-risk')],
  ['Noble Supply', A('2026-08-31-noble-supply-logistics-chapter-11-dla-contract-distributor-risk')],
  ['(?:memory chips?|DRAM)', A('2026-10-02-memory-chip-shortage-dram-prices-ai-data-centers-electronics-sourcing')],
  ['Port of Los Angeles', A('2026-10-14-port-of-los-angeles-record-september-canal-shift')],
  ['Panama Canal', A('2026-10-14-port-of-los-angeles-record-september-canal-shift')],
  ['(?:178 )?(?:Section 301 )?China exclusions', A('2026-10-12-section-301-china-exclusions-expire-nov-10')],
  ['forced-labor (?:tariffs?|duty)', A('2026-10-12-section-301-forced-labor-tariffs-what-buyers-pay')],
  ['(?:ISM|Institute for Supply Management)(?:\'s)? (?:September )?(?:survey|report|manufacturing)', A('2026-10-01-ism-september-prices-index-77-9-supplier-lead-times')],
  ['Old Dominion', A('2026-09-22-ltl-general-rate-increases-old-dominion-saia-arcbest-2026')],
  ['FedEx', A('2026-09-21-fedex-2027-rate-increase-5-9-percent-surcharges-parcel')],
  ['Cleveland-Cliffs', A('2026-10-14-us-factory-investments-blue-origin-cleveland-cliffs-saronic-shipyard')],
  ['Kodiak', A('2026-10-14-autonomous-trucks-laredo-lane-50000-hardware-cost')],
  ['Raytheon', A('2026-10-14-raytheon-30-7b-multiyear-missile-contracts-defense-supplier-ramp')],
  ['Levi(?:\'s| Strauss)', A('2026-10-14-tariff-refunds-levis-80m-how-companies-reinvest')],
  ['Mondelēz', A('2026-09-21-mondelez-new-cpo-dahkoun-cocoa-oversupply-sourcing')],
  ['Relex', A('2026-10-14-neighborhood-intelligence-relex-ai-planning-bed-bath-container-store')],
  ['ORO Labs', A('2026-10-06-sap-ariba-oro-labs-procurement-orchestration-resale')],
  ['Stord', A('2026-10-14-stord-400m-credit-facility-fulfillment-network')],
  ['(?:3PL|fulfillment provider|outsourced fulfillment)s?', A('2026-10-14-stord-400m-credit-facility-fulfillment-network')],
  ['autonomous truck(?:s|ing)?', A('2026-10-14-autonomous-trucks-laredo-lane-50000-hardware-cost')],
  ['(?:LTL|less-than-truckload)', A('2026-09-22-ltl-general-rate-increases-old-dominion-saia-arcbest-2026')],
  ['parcel', A('2026-09-21-fedex-2027-rate-increase-5-9-percent-surcharges-parcel')],
  ['(?:defense|munitions) (?:production|suppliers|contracts)', A('2026-10-14-raytheon-30-7b-multiyear-missile-contracts-defense-supplier-ramp')],
  ['(?:federal|government) contract(?:or|s|ing)', A('2026-09-25-far-overhaul-second-proposed-rules-federal-contractors')],
  ['spend (?:analytics|data|visibility)', A('2026-10-14-spend-analytics-ai-supplier-master-data-cleanup')],
  ['(?:retail|demand) planning|replenishment', A('2026-10-14-neighborhood-intelligence-relex-ai-planning-bed-bath-container-store')],
  ['reshoring|onshoring', A('2026-10-14-us-factory-investments-blue-origin-cleveland-cliffs-saronic-shipyard')],
  ['bankruptcy|Chapter 11', G('supplier-bankruptcy-warning-signs-guide')],
  ['cocoa', A('2026-09-21-mondelez-new-cpo-dahkoun-cocoa-oversupply-sourcing')],
  ['food safety|produce suppliers', A('2026-10-14-taylor-farms-seasonal-sourcing-pause-produce-supplier-risk')],
  ['cargo theft', A('2026-08-10-cargo-theft-q2-2026-losses-304-million-metals-technology')],
  ['double brokering', A('2026-10-14-freight-fraud-fake-broker-cargo-theft-verification')],
  ['schedule reliability', A('2026-10-14-ocean-schedule-reliability-27-percent-vessel-delays-six-days')],
  ['(?:truckload|contract) rates', A('2026-10-14-truckload-contract-rates-52-week-high-bid-season')],
  ['(?:cross-border|Mexican) (?:trucking|drivers|capacity)', A('2026-10-14-mexico-cross-border-trucking-capacity-visa-restrictions')],
  ['(?:pharmaceutical|pharma) tariffs?', A('2026-10-12-section-232-pharma-tariff-now-applies-all-importers')],
  ['tariff refunds?', A('2026-10-14-tariff-refunds-levis-80m-how-companies-reinvest')],
  ['GSK', A('2026-10-14-gsk-800m-pennsylvania-biologics-hub-pharma-reshoring')],
  ['FAR Overhaul|Federal Acquisition Regulation', A('2026-09-25-far-overhaul-second-proposed-rules-federal-contractors')],
  // Guides
  ['Section 232', G('section-232-tariffs-explained-steel-aluminum-copper-pharma-semiconductors-wood')],
  ['IEEPA', G('ieepa-tariff-refunds-cape-guide')],
  ['fuel surcharges?', G('fuel-surcharge-guide-truckload-ltl-parcel')],
  ['(?:freight|truckload) bids?', G('truckload-freight-bid-rfp-guide')],
  ['ocean (?:contracts?|freight contracts?)', G('ocean-freight-contract-negotiation-guide')],
  ['parcel contracts?', G('parcel-ltl-contract-negotiation-guide')],
  ['supplier risk', G('supplier-risk-management-framework')],
  ['(?:AI agents?|agentic AI)', G('ai-in-procurement-guide-agents-governance-vendor-questions')],
  ['price indexes', G('procurement-cost-inflation-price-indexes')],
  ['Laredo', A('2026-10-14-mexico-cross-border-trucking-capacity-visa-restrictions')],
  ['Pentagon|Department of Defense|Defense Department', A('2026-10-14-raytheon-30-7b-multiyear-missile-contracts-defense-supplier-ramp')],
  ['Defense Logistics Agency', A('2026-08-31-noble-supply-logistics-chapter-11-dla-contract-distributor-risk')],
  ['rail(?:roads?| service| contracts| shippers)', A('2026-09-01-union-pacific-norfolk-southern-merger-stb-schedule-shippers')],
  ['intermodal', A('2026-09-01-union-pacific-norfolk-southern-merger-stb-schedule-shippers')],
  ['warehous(?:e|es|ing)', A('2026-10-14-stord-400m-credit-facility-fulfillment-network')],
  ['subcontract(?:ors?|ing)', A('2026-09-25-far-overhaul-second-proposed-rules-federal-contractors')],
  ['freight market', A('2026-10-14-truckload-contract-rates-52-week-high-bid-season')],
  ['supplier (?:scorecards?|performance)', G('supplier-risk-management-framework')],
  ['(?:AI (?:tools|platforms?|planning|models?)|artificial intelligence|machine learning)', G('ai-in-procurement-guide-agents-governance-vendor-questions')],
  ['tariffs', G('us-tariffs-explained-procurement')],
  ['change[- ]of[- ]control', A('2026-10-14-ch-robinson-rxo-merger-what-shippers-should-do')],
  ['freight brokers?|brokerage', A('2026-10-14-ch-robinson-rxo-merger-what-shippers-should-do')],
  ['AI-(?:driven|based|powered|assisted)', G('ai-in-procurement-guide-agents-governance-vendor-questions')],
  ['category (?:managers?|strateg(?:y|ies))', '/outlook/'],
  ['suppl(?:y|ier) agreements?', G('supplier-risk-management-framework')],
  ['(?:security|supply chain) (?:requirements|framework)', G('supplier-risk-management-framework')],
  ['captive shippers?|shippers', A('2026-10-14-truckload-contract-rates-52-week-high-bid-season')],
  // Category analysis
  ['electronic components|circuit boards', O('semis')],
  ['castings|forgings|specialty metals', O('steel')],
  ['steel prices', O('steel')],
  ['aluminum prices', O('aluminum')],
  ['copper', O('copper')],
  ['(?:plastic )?resins?', O('resins')],
  ['diesel', O('diesel')],
  ['ocean freight', O('ocean')],
  ['semiconductors', O('semis')],
  ['transformers?', O('electrical')],
  ['lumber', O('lumber')],
  ['corrugated', O('paper')],
  // Glossary
  ['tender rejections?', '/glossary/#tender-rejection'],
  ['blank sailings?', '/glossary/#blank-sailing'],
  ['landed cost', '/glossary/#landed-cost'],
  ['general rate increases?', '/glossary/#general-rate-increase-gri'],
  ['importer of record', '/glossary/#importer-of-record'],
  ['index-linked', '/glossary/#index-linked-pricing'],
  ['escalation clauses?', '/glossary/#escalation-clause'],
  ['force majeure', '/glossary/#force-majeure'],
  ['dual sourcing', '/glossary/#dual-sourcing'],
  ['accessorials?', '/glossary/#accessorial-charges'],
  ['detention', '/glossary/#detention-and-demurrage'],
  ['routing guide', '/glossary/#routing-guide'],
  ['producer price (?:index|data)', '/glossary/#producer-price-index-ppi'],
  ['rules of origin|country of origin', '/glossary/#country-of-origin'],
  ['Incoterms', '/glossary/#incoterms'],
  ['should-cost', '/glossary/#should-cost'],
  ['spend analysis', '/glossary/#spend-analysis'],
  ['procurement orchestration', '/glossary/#procurement-orchestration'],
  ['TEUs?|FEU', '/glossary/#teu-and-feu'],
  ['three-way match', '/glossary/#three-way-match'],
  ['single[- ]sourc(?:e|ed|ing)', '/glossary/#single-sourcing'],
  ['critical vendors?', '/glossary/#critical-vendor'],
  ['customs value', '/glossary/#customs-value'],
  ['HTS(?:US)? codes?', '/glossary/#hts-code'],
  ['tier[- ](?:2|two|N) suppliers?', '/glossary/#tier-n-mapping'],
  ['spot (?:market|rates?)', '/glossary/#spot-rate'],
  ['purchasing managers', '/glossary/#purchasing-managers-index-pmi'],
  ['direct materials', '/glossary/#direct-procurement'],
  ['indirect spend', '/glossary/#indirect-procurement'],
  ['due diligence statements?', '/glossary/#due-diligence-statement-dds'],
  ['tariff exclusions?', '/glossary/#tariff-exclusion'],
];

// Lowercase phrases match any case (sentence starts); names and acronyms match exactly.
const COMPILED: Rule[] = RULES.map(([p, href]) => ({ re: new RegExp(`\\b(?:${p})\\b`, /^[(]?[a-z]/.test(p) ? 'i' : ''), href }));

// Inserted links are held as placeholders until the end so later rules can't match inside them.
function walk(html: string, fn: (text: string, hold: (h: string) => string) => string): string {
  const held: string[] = [];
  const hold = (h: string) => `\u0000${held.push(h) - 1}\u0000`;
  const parts = html.split(/(<[^>]+>)/);
  let skip = 0;
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (p.startsWith('<')) {
      if (/^<(a|h[1-6]|th|summary|code)[\s>]/i.test(p)) skip++;
      else if (/^<\/(a|h[1-6]|th|summary|code)>/i.test(p)) skip = Math.max(0, skip - 1);
      continue;
    }
    if (skip || !p.trim()) continue;
    parts[i] = fn(p, hold);
  }
  return parts.join('').replace(/\u0000(\d+)\u0000/g, (_, k) => held[+k]);
}

/** Link first mentions of key terms to our pages. `self` is the current page path. */
export function linkInternal(html: string, self: string, max = 10): string {
  const present = new Set([...html.matchAll(/href="([^"#]+)/g)].map((m) => m[1]));
  const used = new Set<string>();
  let n = 0;
  return walk(html, (text, hold) => {
    for (const r of COMPILED) {
      if (n >= max) break;
      const base = r.href.split('#')[0];
      if (base === self || used.has(r.href) || (base !== '/glossary/' && present.has(base))) continue;
      const m = text.match(r.re);
      if (!m) continue;
      text = text.replace(r.re, () => hold(`<a class="ilink" href="${r.href}">${m[0]}</a>`));
      used.add(r.href); if (base !== '/glossary/') present.add(base); n++;
    }
    return text;
  });
}

/** Link the first in-text mention of each cited publisher to its source. */
export function linkSources(html: string, sources: { name: string; url: string }[]): string {
  const pubs = sources
    .filter((s) => /^https?:/.test(s.url))
    .map((s) => ({ name: s.name.split(/\s+[—–-]\s+/)[0].trim(), url: s.url }))
    .filter((s) => s.name.length > 2 && !/^Procurement Signal/.test(s.name));
  const seen = new Set<string>();
  const list = pubs.filter((p) => (seen.has(p.name) ? false : (seen.add(p.name), true)));
  const done = new Set<string>();
  return walk(html, (text, hold) => {
    for (const p of list) {
      if (done.has(p.name)) continue;
      const re = new RegExp(`\\b${p.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
      if (re.test(text)) {
        text = text.replace(re, (m) => hold(`<a class="xlink" href="${p.url}" target="_blank" rel="noopener">${m}</a>`));
        done.add(p.name);
      }
    }
    return text;
  });
}

export { slugify };
