// Top Software rankings: our scores and analysis, plus G2 peer ratings.
//
// EDITORIAL STATUS
// Every category ships as `status: 'draft'`. Draft pages show a "Draft ranking"
// notice and are excluded from search engines (noindex). Review the scores and
// analysis, then set `status: 'published'` and `reviewed` to the review date.
//
// G2 DATA
// Fill `g2` only from G2's own pages or its syndication/badge program, and
// record the date you checked (`asOf`). Never estimate a rating. Products with
// no `g2` entry link readers to G2 to compare reviews themselves.

export type Size = 'smb' | 'mid' | 'enterprise';
export type Erp = 'sap' | 'oracle' | 'microsoft' | 'netsuite';
export type Criterion = 'functionality' | 'ease' | 'integrations' | 'ai' | 'value' | 'implementation';

export const CRITERIA: { id: Criterion; name: string; weight: number; about: string }[] = [
  { id: 'functionality', name: 'Functionality', weight: 25, about: 'Depth and breadth of the core capabilities buyers expect in this category.' },
  { id: 'ease', name: 'Ease of use', weight: 20, about: 'How quickly requesters, buyers and approvers can work in it without training.' },
  { id: 'integrations', name: 'Integrations', weight: 15, about: 'ERP connectors, APIs and fit with the rest of the source-to-pay stack.' },
  { id: 'ai', name: 'AI and automation', weight: 15, about: 'Practical automation that removes manual work, not demos.' },
  { id: 'value', name: 'Value', weight: 15, about: 'Expected total cost for the capability delivered, including services.' },
  { id: 'implementation', name: 'Time to value', weight: 10, about: 'How fast a typical customer goes live and sees adoption.' },
];

export interface Product {
  id: string;
  name: string;
  vendor: string;
  url?: string;
  sizes: Size[];
  erp?: Erp; // set only when the product is native to one ERP ecosystem
  bestFor: string;
  verdict: string;
  strengths: string[];
  watch: string[];
  pricing: string;
  scores: Record<Criterion, number>; // 1-10
  g2?: { rating: number; reviews: number; asOf: string; url: string };
}

export interface SoftwareCategory {
  id: string;
  name: string;
  short: string; // tab label
  need: string; // the problem it solves, used by the Software Finder
  description: string;
  verdict: string;
  status: 'draft' | 'published';
  reviewed: string;
  faqs: { q: string; a: string }[];
  products: Product[];
}

const S = (functionality: number, ease: number, integrations: number, ai: number, value: number, implementation: number) =>
  ({ functionality, ease, integrations, ai, value, implementation });

const raw: SoftwareCategory[] = [
  {
    id: 'procure-to-pay', name: 'Procure-to-pay software', short: 'Procure-to-pay',
    need: 'Purchase requests, approvals and purchase orders',
    description: 'Tools that take a purchase from request and approval through purchase order, receipt and invoice match.',
    verdict: 'Suite platforms lead on depth and supplier networks; intake-first tools win where adoption by requesters is the problem to solve.',
    status: 'draft', reviewed: '2026-10-14',
    faqs: [
      { q: 'What is procure-to-pay software?', a: 'Software that runs the purchasing process from requisition and approval through purchase order, goods receipt, invoice matching and payment, so spend is controlled before it happens.' },
      { q: 'How is procure-to-pay different from source-to-pay?', a: 'Procure-to-pay covers buying from suppliers you already have. Source-to-pay adds the upstream work: spend analysis, sourcing events, supplier selection and contracts.' },
      { q: 'How long does a procure-to-pay implementation take?', a: 'It varies widely with scope, ERP complexity and the number of entities. Intake-first and mid-market tools tend to go live faster than full suites.' },
    ],
    products: [
      { id: 'coupa', name: 'Coupa', vendor: 'Coupa Software', url: 'https://www.coupa.com', sizes: ['mid', 'enterprise'], bestFor: 'Large enterprises that want one platform for spend', verdict: 'The broadest spend-management suite, with a large supplier network behind it.', strengths: ['Wide suite covering procurement, invoicing, expenses and payments', 'Large supplier network for onboarding and e-invoicing', 'Benchmarking drawn from its customer community'], watch: ['Licensing and services can be costly for smaller teams', 'Full-suite rollouts need strong program management'], pricing: 'Quote-based subscription', scores: S(9, 8, 8, 8, 6, 6) },
      { id: 'sap-ariba-p2p', name: 'SAP Ariba Buying', vendor: 'SAP', sizes: ['enterprise'], erp: 'sap', bestFor: 'SAP-centric enterprises', verdict: 'The default for large SAP shops, backed by the biggest B2B trading network.', strengths: ['Deep integration with SAP ERP', 'Very large supplier network', 'Proven at global scale'], watch: ['User experience trails newer tools', 'Implementations are complex and long'], pricing: 'Quote-based subscription', scores: S(9, 5, 9, 7, 5, 4) },
      { id: 'zip', name: 'Zip', vendor: 'Zip', url: 'https://ziphq.com', sizes: ['mid', 'enterprise'], bestFor: 'Fixing requester adoption and intake', verdict: 'An intake and orchestration layer that makes requesting easy and routes work across teams.', strengths: ['Consumer-grade request experience drives adoption', 'Orchestrates legal, security and finance reviews in one flow', 'Sits on top of existing ERP or P2P systems'], watch: ['Relies on other systems for some downstream steps', 'Newer vendor than the suite incumbents'], pricing: 'Quote-based subscription', scores: S(7, 9, 8, 8, 7, 8) },
      { id: 'oracle-procurement', name: 'Oracle Procurement', vendor: 'Oracle', url: 'https://www.oracle.com/erp/procurement/', sizes: ['enterprise'], erp: 'oracle', bestFor: 'Oracle Cloud ERP customers', verdict: 'Natively built into Oracle Cloud ERP, which removes integration work for Oracle shops.', strengths: ['Single data model with Oracle financials', 'Strong controls and audit trail', 'Regular quarterly updates'], watch: ['Little reason to choose it outside the Oracle ecosystem', 'Requester experience is less intuitive than intake-first tools'], pricing: 'Quote-based subscription, often bundled with Oracle Cloud ERP', scores: S(8, 6, 9, 6, 7, 6) },
      { id: 'procurify', name: 'Procurify', vendor: 'Procurify', url: 'https://www.procurify.com', sizes: ['smb', 'mid'], bestFor: 'Mid-market teams formalizing purchasing', verdict: 'A practical way for growing companies to add approvals, budgets and purchase orders.', strengths: ['Fast setup with budget-based approvals', 'Straightforward interface for occasional users', 'Integrations with common mid-market accounting systems'], watch: ['Less depth for complex global or direct-materials buying'], pricing: 'Quote-based subscription', scores: S(6, 8, 7, 5, 8, 9) },
    ],
  },
  {
    id: 'source-to-contract', name: 'Source-to-contract software', short: 'Source-to-contract',
    need: 'Sourcing events, RFPs and supplier selection',
    description: 'Platforms for running RFx and auctions, evaluating bids, selecting suppliers and moving awards into contracts.',
    verdict: 'Unified suites suit teams that want one data model across sourcing and contracts; optimization specialists win on complex, high-volume bids.',
    status: 'draft', reviewed: '2026-10-14',
    faqs: [
      { q: 'What does source-to-contract software do?', a: 'It runs the upstream procurement process: requests for information, proposal and quotation, bid comparison, award decisions and handoff into a contract.' },
      { q: 'Do I need sourcing optimization?', a: 'Optimization pays off when events have many lanes, items or suppliers and complex constraints, such as freight or packaging bids. Simple RFPs rarely need it.' },
    ],
    products: [
      { id: 'gep-smart', name: 'GEP SMART', vendor: 'GEP', url: 'https://www.gep.com', sizes: ['enterprise'], bestFor: 'Enterprises that want software plus services', verdict: 'A unified source-to-pay platform from a vendor that also offers consulting and managed services.', strengths: ['Single platform across sourcing, contracts and procurement', 'Option to pair software with managed services', 'Active investment in AI features'], watch: ['Scope can grow quickly when services are bundled'], pricing: 'Quote-based subscription', scores: S(9, 7, 8, 8, 6, 6) },
      { id: 'ivalua', name: 'Ivalua', vendor: 'Ivalua', url: 'https://www.ivalua.com', sizes: ['enterprise'], bestFor: 'Complex organizations that need configurability', verdict: 'A single-codebase suite known for adapting to unusual processes without custom code.', strengths: ['Highly configurable workflows and data model', 'One platform across source-to-pay', 'Strong in direct and indirect spend'], watch: ['Configuration freedom needs governance to avoid complexity'], pricing: 'Quote-based subscription', scores: S(9, 7, 8, 7, 6, 6) },
      { id: 'sap-ariba-sourcing', name: 'SAP Ariba Sourcing', vendor: 'SAP', sizes: ['enterprise'], erp: 'sap', bestFor: 'Global SAP shops running high event volume', verdict: 'Proven sourcing at scale with direct reach into the Ariba supplier network.', strengths: ['Event templates and scale for global teams', 'Supplier network reach', 'Tight SAP integration'], watch: ['Steeper learning curve for occasional sourcers'], pricing: 'Quote-based subscription', scores: S(8, 5, 9, 7, 5, 5) },
      { id: 'jaggaer', name: 'JAGGAER One', vendor: 'JAGGAER', url: 'https://www.jaggaer.com', sizes: ['mid', 'enterprise'], bestFor: 'Direct materials, higher education and public sector', verdict: 'A long-established suite with particular depth in direct materials and education buying.', strengths: ['Direct-materials sourcing and supplier quality', 'Established in higher education and public sector', 'Broad source-to-pay coverage'], watch: ['Plan module scope and sequencing early'], pricing: 'Quote-based subscription', scores: S(8, 6, 7, 7, 6, 6) },
      { id: 'keelvar', name: 'Keelvar', vendor: 'Keelvar', url: 'https://www.keelvar.com', sizes: ['mid', 'enterprise'], bestFor: 'Complex freight and high-volume bids', verdict: 'Sourcing optimization and automation for events too complex for spreadsheets.', strengths: ['Optimization across many lanes, items and constraints', 'Automates routine sourcing events', 'Works alongside an existing suite'], watch: ['Focused on sourcing events, not contracts or purchasing'], pricing: 'Quote-based subscription', scores: S(7, 7, 7, 9, 7, 8) },
    ],
  },
  {
    id: 'spend-analytics', name: 'Spend analytics software', short: 'Spend analytics',
    need: 'Seeing where the money goes',
    description: 'Tools that clean, classify and enrich spend data so teams can find savings and track performance.',
    verdict: 'Specialists classify data better and faster; suite modules are convenient when the rest of the stack already sits on one platform.',
    status: 'draft', reviewed: '2026-10-14',
    faqs: [
      { q: 'What is spend analytics?', a: 'The practice of collecting, cleansing, classifying and analyzing purchasing data to see what is bought, from whom and at what price, and where savings or risks sit.' },
      { q: 'Why not use the ERP for spend reporting?', a: 'ERP data is usually fragmented across systems, with inconsistent supplier names and categories. Spend analytics tools normalize and classify it so totals can be trusted.' },
    ],
    products: [
      { id: 'sievo', name: 'Sievo', vendor: 'Sievo', url: 'https://sievo.com', sizes: ['enterprise'], bestFor: 'Enterprises tracking savings and spend at scale', verdict: 'A procurement analytics specialist with strong classification and savings tracking.', strengths: ['Automated spend classification', 'Savings and performance tracking', 'Connects many ERPs into one view'], watch: ['Analytics only; pairs with separate transactional tools'], pricing: 'Quote-based subscription', scores: S(9, 7, 9, 8, 6, 7) },
      { id: 'spendhq', name: 'SpendHQ', vendor: 'SpendHQ', url: 'https://www.spendhq.com', sizes: ['mid', 'enterprise'], bestFor: 'Teams that want analytics with expert support', verdict: 'Spend visibility paired with hands-on analyst support for data quality.', strengths: ['Managed data cleansing and classification', 'Practical dashboards for category teams', 'Procurement performance reporting'], watch: ['Less suited to teams wanting to run everything in-house'], pricing: 'Quote-based subscription', scores: S(8, 8, 7, 7, 7, 7) },
      { id: 'simfoni', name: 'Simfoni', vendor: 'Simfoni', url: 'https://simfoni.com', sizes: ['mid', 'enterprise'], bestFor: 'Turning tail spend insight into action', verdict: 'Combines spend analytics with tools to act on tail spend.', strengths: ['Spend analytics with tail-spend focus', 'Quick-start deployments', 'Savings opportunity identification'], watch: ['Smaller footprint than the analytics leaders'], pricing: 'Quote-based subscription', scores: S(7, 7, 7, 7, 8, 8) },
      { id: 'coupa-spend', name: 'Coupa Spend Analysis', vendor: 'Coupa Software', url: 'https://www.coupa.com', sizes: ['mid', 'enterprise'], bestFor: 'Existing Coupa customers', verdict: 'Convenient analytics for spend already flowing through Coupa.', strengths: ['Native to the Coupa platform', 'Community benchmarks', 'No extra integration for Coupa transactions'], watch: ['Weaker for spend that sits outside Coupa'], pricing: 'Quote-based subscription', scores: S(7, 8, 6, 7, 6, 8) },
      { id: 'rosslyn', name: 'Rosslyn', vendor: 'Rosslyn', sizes: ['mid', 'enterprise'], bestFor: 'Teams consolidating messy multi-source data', verdict: 'A data platform approach to spend analytics with strong data preparation.', strengths: ['Data extraction and cleansing from many sources', 'Flexible reporting', 'Supplier data enrichment'], watch: ['Requires internal ownership of the data model'], pricing: 'Quote-based subscription', scores: S(7, 6, 8, 6, 7, 6) },
    ],
  },
  {
    id: 'supplier-risk', name: 'Supplier risk management software', short: 'Supplier risk',
    need: 'Monitoring supplier and supply chain risk',
    description: 'Tools that map suppliers beyond tier 1 and monitor them for disruption, financial, compliance and ESG risk.',
    verdict: 'Mapping depth separates the leaders: alerts are only useful when you know which of your parts sit behind each supplier.',
    status: 'draft', reviewed: '2026-10-14',
    faqs: [
      { q: 'What does supplier risk management software monitor?', a: 'Typically financial health, operational disruptions such as fires or strikes, geopolitical and weather events, cyber incidents, and compliance and ESG issues, across tier 1 and deeper suppliers.' },
      { q: 'What is multi-tier mapping?', a: 'Identifying the suppliers behind your direct suppliers, down to raw-material sources, so an event at a tier-3 site can be traced to the parts and products it affects.' },
    ],
    products: [
      { id: 'resilinc', name: 'Resilinc', vendor: 'Resilinc', url: 'https://www.resilinc.com', sizes: ['enterprise'], bestFor: 'Manufacturers needing multi-tier mapping', verdict: 'A leader in multi-tier supply chain mapping and event monitoring.', strengths: ['Deep multi-tier mapping down to sites and parts', 'Event monitoring tied to affected parts', 'Strong in high-tech, life sciences and automotive'], watch: ['Mapping value depends on supplier participation'], pricing: 'Quote-based subscription', scores: S(9, 7, 8, 8, 6, 6) },
      { id: 'everstream', name: 'Everstream Analytics', vendor: 'Everstream Analytics', url: 'https://www.everstream.ai', sizes: ['enterprise'], bestFor: 'Predictive risk insight for global networks', verdict: 'AI-driven risk monitoring with an emphasis on predicting disruptions.', strengths: ['Predictive risk scoring', 'Broad event and weather monitoring', 'Logistics and network risk views'], watch: ['Prediction quality depends on how well your network is modeled'], pricing: 'Quote-based subscription', scores: S(8, 7, 7, 9, 6, 7) },
      { id: 'interos', name: 'Interos', vendor: 'Interos', url: 'https://www.interos.ai', sizes: ['enterprise'], bestFor: 'Broad multi-factor risk monitoring', verdict: 'Monitors suppliers across many risk factors from one platform.', strengths: ['Multiple risk factors in one score', 'Automated multi-tier discovery', 'Public-sector and regulated-industry experience'], watch: ['Broad scoring needs tuning to be actionable'], pricing: 'Quote-based subscription', scores: S(8, 7, 7, 8, 6, 7) },
      { id: 'prewave', name: 'Prewave', vendor: 'Prewave', url: 'https://www.prewave.com', sizes: ['mid', 'enterprise'], bestFor: 'ESG and due diligence compliance', verdict: 'AI risk monitoring with strength in supply chain due diligence requirements.', strengths: ['Monitoring of news and social sources in many languages', 'Built around due diligence laws such as Germany\'s supply chain act', 'Supplier ESG risk detection'], watch: ['Less depth for financial risk than specialist providers'], pricing: 'Quote-based subscription', scores: S(8, 8, 7, 8, 7, 8) },
      { id: 'sphera-scrm', name: 'Sphera Supply Chain Risk Management', vendor: 'Sphera', url: 'https://sphera.com', sizes: ['enterprise'], bestFor: 'Teams pairing supplier risk with ESG programs', verdict: 'The former riskmethods platform, now part of a broader ESG and operational risk portfolio.', strengths: ['Established supplier risk monitoring', 'Fits with Sphera ESG and safety tools', 'Risk mitigation workflows'], watch: ['Product direction tied to a larger portfolio'], pricing: 'Quote-based subscription', scores: S(7, 7, 7, 7, 6, 6) },
    ],
  },
  {
    id: 'contract-management', name: 'Contract lifecycle management software', short: 'Contract management',
    need: 'Creating, approving and tracking contracts',
    description: 'CLM tools that author, negotiate, approve, store and track obligations in supplier and customer contracts.',
    verdict: 'Pick by who owns contracts: legal-led teams favor workflow tools, procurement-led teams need strong post-signature obligation tracking.',
    status: 'draft', reviewed: '2026-10-14',
    faqs: [
      { q: 'What is contract lifecycle management?', a: 'Managing a contract from request and drafting through negotiation, approval, signature, obligation tracking, renewal and expiry.' },
      { q: 'Why does procurement need CLM?', a: 'Savings negotiated in sourcing leak when pricing, rebates and service levels in signed contracts are not tracked. CLM makes those terms visible and enforceable.' },
    ],
    products: [
      { id: 'icertis', name: 'Icertis', vendor: 'Icertis', url: 'https://www.icertis.com', sizes: ['enterprise'], bestFor: 'Large enterprises with complex contract portfolios', verdict: 'An enterprise CLM leader with deep integration and AI-based contract intelligence.', strengths: ['Scales to very large contract volumes', 'AI extraction of terms and obligations', 'Integrations with major ERP and CRM systems'], watch: ['Enterprise pricing and implementation effort'], pricing: 'Quote-based subscription', scores: S(9, 6, 9, 8, 5, 5) },
      { id: 'sirion', name: 'Sirion', vendor: 'Sirion', url: 'https://www.sirion.ai', sizes: ['enterprise'], bestFor: 'Post-signature performance and obligations', verdict: 'Strong on what happens after signature: obligations, service levels and invoice compliance.', strengths: ['Obligation and service-level tracking', 'AI contract analysis', 'Supplier performance views'], watch: ['Authoring experience less central than legal-first tools'], pricing: 'Quote-based subscription', scores: S(8, 7, 8, 9, 6, 6) },
      { id: 'ironclad', name: 'Ironclad', vendor: 'Ironclad', url: 'https://ironcladapp.com', sizes: ['mid', 'enterprise'], bestFor: 'Legal-led teams that want fast workflows', verdict: 'A modern, workflow-first CLM that legal and business users adopt quickly.', strengths: ['Easy self-service contract workflows', 'Strong drafting and negotiation tools', 'AI review features'], watch: ['Procurement-specific depth lighter than suite CLM'], pricing: 'Quote-based subscription', scores: S(8, 9, 8, 8, 6, 8) },
      { id: 'agiloft', name: 'Agiloft', vendor: 'Agiloft', url: 'https://www.agiloft.com', sizes: ['mid', 'enterprise'], bestFor: 'Teams that need no-code configurability', verdict: 'A highly configurable, no-code CLM for unusual processes.', strengths: ['No-code configuration', 'Flexible data model', 'Broad integration options'], watch: ['Flexibility requires admin ownership'], pricing: 'Quote-based subscription', scores: S(8, 7, 8, 7, 7, 7) },
      { id: 'docusign-clm', name: 'Docusign CLM', vendor: 'Docusign', url: 'https://www.docusign.com', sizes: ['mid', 'enterprise'], bestFor: 'Docusign eSignature users', verdict: 'A natural extension for organizations standardized on Docusign signatures.', strengths: ['Native to Docusign eSignature', 'Template-driven generation', 'Familiar vendor for most counterparties'], watch: ['Less depth in post-signature obligation management'], pricing: 'Quote-based subscription', scores: S(7, 8, 8, 7, 6, 7) },
    ],
  },
  {
    id: 'ap-automation', name: 'Accounts payable automation software', short: 'AP automation',
    need: 'Invoice processing and supplier payments',
    description: 'Tools that capture invoices, match them to orders and receipts, route approvals and pay suppliers.',
    verdict: 'E-invoicing mandates favor global specialists; mid-market teams get faster payback from tools built on their existing ERP.',
    status: 'draft', reviewed: '2026-10-14',
    faqs: [
      { q: 'What does AP automation do?', a: 'It captures supplier invoices, extracts their data, matches them to purchase orders and receipts, routes exceptions for approval, and schedules payment, reducing manual keying and late payments.' },
      { q: 'What are e-invoicing mandates?', a: 'Government rules that require invoices in a structured electronic format, often cleared through a tax authority platform. Several countries have them now, with more phasing in, which affects global AP teams.' },
    ],
    products: [
      { id: 'basware', name: 'Basware', vendor: 'Basware', url: 'https://www.basware.com', sizes: ['enterprise'], bestFor: 'Global e-invoicing compliance', verdict: 'An AP automation and e-invoicing specialist for multinational invoice volumes.', strengths: ['E-invoicing network and compliance coverage', 'High-volume invoice automation', 'Works across many ERPs'], watch: ['More than mid-sized single-country teams need'], pricing: 'Quote-based subscription', scores: S(9, 6, 8, 8, 6, 6) },
      { id: 'tipalti', name: 'Tipalti', vendor: 'Tipalti', url: 'https://tipalti.com', sizes: ['mid', 'enterprise'], bestFor: 'Paying suppliers across many countries', verdict: 'Payables automation with strength in global payments and supplier tax compliance.', strengths: ['Global supplier payments in many currencies', 'Supplier onboarding and tax form collection', 'Mid-market ERP integrations'], watch: ['Purchasing and sourcing depth limited'], pricing: 'Quote-based subscription', scores: S(8, 8, 8, 7, 7, 8) },
      { id: 'medius', name: 'Medius', vendor: 'Medius', url: 'https://www.medius.com', sizes: ['mid', 'enterprise'], bestFor: 'Touchless invoice processing', verdict: 'AP automation focused on raising touchless invoice rates with AI.', strengths: ['Automated capture and matching', 'Fraud and anomaly detection', 'Strong ERP connectivity'], watch: ['Fewer payment features than payables specialists'], pricing: 'Quote-based subscription', scores: S(8, 7, 8, 8, 7, 7) },
      { id: 'stampli', name: 'Stampli', vendor: 'Stampli', url: 'https://www.stampli.com', sizes: ['smb', 'mid'], bestFor: 'Fast rollout on an existing ERP', verdict: 'Invoice-centric AP with collaboration built around each invoice.', strengths: ['Quick deployment on top of existing ERP', 'Invoice-level collaboration with approvers', 'AI assistant for coding and routing'], watch: ['Lighter on complex multi-entity global needs'], pricing: 'Quote-based subscription', scores: S(7, 9, 8, 7, 8, 9) },
      { id: 'bill', name: 'BILL', vendor: 'BILL', url: 'https://www.bill.com', sizes: ['smb'], bestFor: 'Small businesses', verdict: 'The common choice for small businesses moving bill pay off paper.', strengths: ['Simple invoice approval and payment', 'Accounting software sync', 'Published plan pricing'], watch: ['Outgrown by complex mid-market AP'], pricing: 'Published subscription plans', scores: S(6, 9, 7, 6, 9, 9) },
    ],
  },
];

export const overall = (p: Product) =>
  Math.round((CRITERIA.reduce((s, c) => s + p.scores[c.id] * c.weight, 0) / 100) * 10) / 10;

export const softwareCategories: SoftwareCategory[] = raw.map((c) => ({
  ...c,
  products: [...c.products].sort((a, b) => overall(b) - overall(a)),
}));

export const g2Search = (p: Product) => `https://www.g2.com/search?query=${encodeURIComponent(p.name)}`;
export const SIZE_LABEL: Record<Size, string> = { smb: 'Small business', mid: 'Mid-market', enterprise: 'Enterprise' };
