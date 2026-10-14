// Market Outlook: our call on each Cost Pressure Monitor category.
//
// The cost data (src/data/cost-monitor.json) updates automatically every month.
// The calls below are editorial and change only when an editor reviews them.
// When the data moves against a call, the site flags it ("review due") so the
// editor knows which categories to revisit.
//
// EDITORIAL STATUS
// Calls ship as `status: 'draft'` and the Outlook page is noindexed until at
// least one call is published. Keep views qualitative: the live numbers are
// shown beside them and would make hard-coded figures go stale.
import { categories, type Category, type Status } from './costs';

export type Leverage = 'buyer' | 'balanced' | 'supplier';
export type Direction = 'rising' | 'stable' | 'falling';
export type Risk = 'low' | 'medium' | 'high';

export interface Call {
  id: string; // cost-monitor category id
  leverage: Leverage;
  direction: Direction; // expected price direction, next 90 days
  risk: Risk; // supply risk
  view: string;
  moves: string[];
  calledOn: string;
  status: 'draft' | 'published';
}

export const LEVERAGE: Record<Leverage, { label: string; icon: string }> = {
  buyer: { label: "Buyer's market", icon: '◆' },
  balanced: { label: 'Balanced', icon: '◇' },
  supplier: { label: "Supplier's market", icon: '◆' },
};
export const DIRECTION: Record<Direction, { label: string; icon: string }> = {
  rising: { label: 'Rising', icon: '▲' },
  stable: { label: 'Stable', icon: '▶' },
  falling: { label: 'Falling', icon: '▼' },
};
export const RISK: Record<Risk, string> = { low: 'Low', medium: 'Medium', high: 'High' };

const calls: Call[] = [
  { id: 'steel', leverage: 'supplier', direction: 'rising', risk: 'medium', status: 'draft', calledOn: '2026-10-14',
    view: 'Mill prices are climbing fast and the Section 232 tariff keeps import competition out, so suppliers hold the cards.',
    moves: ['Secure fixed pricing on core volumes while mills still offer it', 'Index-link anything longer than a quarter', 'Qualify a second domestic source for critical grades'] },
  { id: 'aluminum', leverage: 'balanced', direction: 'falling', risk: 'medium', status: 'draft', calledOn: '2026-10-14',
    view: 'Prices are cooling from their peak but remain well above last year, with tariffs setting a high floor.',
    moves: ['Avoid new long fixed-price commitments at current levels', 'Ask suppliers to pass through recent declines', 'Keep tariff pass-through terms explicit'] },
  { id: 'copper', leverage: 'supplier', direction: 'rising', risk: 'medium', status: 'draft', calledOn: '2026-10-14',
    view: 'Prices turned up again last month after a pause, and tariff coverage on copper products limits alternatives.',
    moves: ['Use index-linked pricing tied to a published copper benchmark', 'Shorten quote validity windows', 'Review copper content in electrical and HVAC buys'] },
  { id: 'resins', leverage: 'buyer', direction: 'falling', risk: 'low', status: 'draft', calledOn: '2026-10-14',
    view: 'Resin prices are falling quickly, which gives buyers room to renegotiate.',
    moves: ['Re-bid or renegotiate resin-heavy packaging and parts', 'Keep contract terms short to capture further declines', 'Push suppliers to share index-based decreases'] },
  { id: 'chemicals', leverage: 'balanced', direction: 'falling', risk: 'low', status: 'draft', calledOn: '2026-10-14',
    view: 'Industrial chemical prices are easing after a strong year, a reasonable window to revisit pricing.',
    moves: ['Request price reviews on contracts set at last year\'s highs', 'Benchmark quotes against the index before renewals'] },
  { id: 'diesel', leverage: 'supplier', direction: 'rising', risk: 'high', status: 'draft', calledOn: '2026-10-14',
    view: 'Diesel jumped sharply last month and remains far above a year ago; expect fuel surcharges to stay volatile.',
    moves: ['Audit carrier fuel surcharge tables against the weekly diesel index', 'Budget freight with a fuel contingency', 'Consolidate shipments to cut fuel exposure'] },
  { id: 'ocean', leverage: 'supplier', direction: 'rising', risk: 'high', status: 'draft', calledOn: '2026-10-14',
    view: 'Ocean freight rates are accelerating, giving carriers the upper hand in rate negotiations.',
    moves: ['Lock contract rates for core lanes before further increases', 'Split volume across carriers and routings', 'Build extra lead time into import plans'] },
  { id: 'trucking', leverage: 'balanced', direction: 'stable', risk: 'low', status: 'draft', calledOn: '2026-10-14',
    view: 'Truckload pricing is steady, a good time to run lane bids without much price noise.',
    moves: ['Run competitive lane bids now', 'Separate fuel from linehaul in carrier contracts'] },
  { id: 'semis', leverage: 'buyer', direction: 'falling', risk: 'medium', status: 'draft', calledOn: '2026-10-14',
    view: 'Semiconductor producer prices are falling, but tariff scope on chips keeps landed cost uncertain for importers.',
    moves: ['Renegotiate pricing on commodity components', 'Check product-specific tariff scope before switching sources', 'Avoid long fixed-price terms while prices fall'] },
  { id: 'electrical', leverage: 'supplier', direction: 'rising', risk: 'medium', status: 'draft', calledOn: '2026-10-14',
    view: 'Electrical equipment prices keep rising, and metal-intensive grid equipment carries tariff exposure.',
    moves: ['Order long-lead equipment early', 'Use escalation clauses tied to metals indexes', 'Lock pricing on planned capital projects'] },
  { id: 'lumber', leverage: 'balanced', direction: 'rising', risk: 'medium', status: 'draft', calledOn: '2026-10-14',
    view: 'Lumber prices are drifting higher, with wood-product tariffs adding cost for imported supply.',
    moves: ['Add index-linked escalation rather than accepting flat increases', 'Review pallet and crating specifications'] },
  { id: 'paper', leverage: 'balanced', direction: 'rising', risk: 'low', status: 'draft', calledOn: '2026-10-14',
    view: 'Corrugated and paperboard prices are picking up after a quiet year; expect suppliers to test increases.',
    moves: ['Challenge increase notices against the index', 'Right-size box specifications to cut board use', 'Shorten quote validity windows'] },
];

const dataDirection = (s: Status): Direction => (s === 'rising-fast' || s === 'rising' ? 'rising' : s === 'easing' ? 'falling' : 'stable');

export interface Outlook extends Call { category: Category; dataDirection: Direction; review: false | 'against' | 'differs'; }

export const outlooks: Outlook[] = calls
  .map((call) => {
    const category = categories.find((c) => c.id === call.id);
    if (!category) return null;
    const dd = dataDirection(category.status);
    const opposite = (call.direction === 'rising' && dd === 'falling') || (call.direction === 'falling' && dd === 'rising');
    return { ...call, category, dataDirection: dd, review: opposite ? 'against' : dd !== call.direction ? 'differs' : false } as Outlook;
  })
  .filter((o): o is Outlook => o !== null);

export const outlookFor = (id: string) => outlooks.find((o) => o.id === id);
export const outlookDraft = outlooks.every((o) => o.status === 'draft');
