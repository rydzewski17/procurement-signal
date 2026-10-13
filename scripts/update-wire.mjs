// Builds the Industry Wire: recent procurement and supply chain headlines from
// trade publications (RSS) and the Federal Register (official notices).
// Headlines and links only; readers click through to the original source.
// Runs daily in GitHub Actions. No AI and no paid services involved.
import fs from 'node:fs';

const OUT = new URL('../src/data/wire.json', import.meta.url);
const DAYS = 7;
const MAX = 60;

const FEEDS = [
  { source: 'Supply Chain Dive', url: 'https://www.supplychaindive.com/feeds/news/', filter: false },
  { source: 'Spend Matters', url: 'https://spendmatters.com/feed/', filter: false },
  { source: 'Procurement Magazine', url: 'https://procurementmag.com/rss', filter: false },
  { source: 'CPO Strategy', url: 'https://cpostrategy.media/feed/', filter: false },
  { source: 'Sourcing Journal', url: 'https://sourcingjournal.com/feed/', filter: true },
  { source: 'FreightWaves', url: 'https://www.freightwaves.com/news/feed', filter: true },
  { source: 'Logistics Management', url: 'https://www.logisticsmgmt.com/rss', filter: true },
  { source: 'IndustryWeek', url: 'https://www.industryweek.com/rss.xml', filter: true },
  { source: 'Manufacturing Dive', url: 'https://www.manufacturingdive.com/feeds/news/', filter: true },
];

// Federal Register searches (official U.S. government notices).
const FED_TERMS = ['"Section 301"', '"Section 232"', 'tariff exclusion', '"Federal Acquisition Regulation"', 'forced labor import'];

// Keeps general-business feeds on topic for procurement and supply chain readers.
const KEYWORDS = /procure|sourcing|supplier|supply chain|tariff|duty|duties|customs|import|export|freight|shipping|logistic|port|container|warehouse|inventory|steel|aluminum|copper|commodit|resin|semiconductor|chip|shortage|reshor|nearshor|manufactur|contract|purchas|spend|vendor|cpo|forced labor|sanction|trade/i;

const TOPIC_RULES = [
  ['tariffs-trade', /tariff|duty|duties|customs|section 301|section 232|trade|import|export|usmca/i],
  ['commodities', /price|steel|aluminum|copper|resin|oil|diesel|fuel|freight rate|commodit|inflation/i],
  ['supplier-risk', /shortage|disrupt|bankrupt|chapter 11|strike|recall|closure|risk|delay|congestion/i],
  ['ai-procurement', /\bai\b|artificial intelligence|agentic|machine learning|genai|llm/i],
  ['proc-tech', /software|platform|saas|raises|funding|acqui|launch|digital/i],
  ['public-sector', /federal|government|gsa|dod|pentagon|acquisition regulation|public sector|contract award/i],
  ['esg-regulation', /forced labor|esg|sustainab|emission|due diligence|csrd|cbam|deforestation/i],
  ['people-moves', /appoint|names .* chief|hires|cpo\b|chief procurement/i],
];

const decode = (s = '') => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#8217;|&rsquo;/g, '’').replace(/&#8216;|&lsquo;/g, '‘').replace(/&#8220;|&ldquo;/g, '“').replace(/&#8221;|&rdquo;/g, '”')
  .replace(/&#8211;|&ndash;/g, '–').replace(/&#8212;|&mdash;/g, '—').replace(/&#039;|&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ')
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
  .replace(/\s+/g, ' ').trim();

const tag = (block, name) => {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? decode(m[1]) : '';
};

export function parseFeed(xml) {
  const items = [];
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) ?? [];
  for (const b of blocks) {
    let link = tag(b, 'link');
    if (!link) link = (b.match(/<link[^>]*href="([^"]+)"/i) || [])[1] || '';
    const date = tag(b, 'pubDate') || tag(b, 'published') || tag(b, 'updated') || tag(b, 'dc:date');
    items.push({ title: tag(b, 'title'), url: link.trim(), summary: tag(b, 'description') || tag(b, 'summary'), date });
  }
  return items;
}

const topicFor = (text) => (TOPIC_RULES.find(([, re]) => re.test(text)) || ['supplier-risk'])[0];
const norm = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

async function get(url, accept = 'application/rss+xml, application/xml, text/xml, application/json') {
  const res = await fetch(url, { headers: { 'user-agent': 'ProcurementSignalWire/1.0 (+https://procurement-signal.rydzewski-jason.workers.dev/about/)', accept }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function main() {
  const cutoff = Date.now() - DAYS * 864e5;
  const all = [];
  const report = [];

  for (const f of FEEDS) {
    try {
      const items = parseFeed(await get(f.url));
      let kept = 0;
      for (const it of items) {
        const t = new Date(it.date).getTime();
        if (!it.title || !it.url.startsWith('http') || !t || t < cutoff) continue;
        if (f.filter && !KEYWORDS.test(`${it.title} ${it.summary}`)) continue;
        all.push({ title: it.title, url: it.url, source: f.source, date: new Date(t).toISOString(), topic: topicFor(`${it.title} ${it.summary}`), official: false });
        kept++;
      }
      report.push(`${f.source}: ${kept}`);
    } catch (e) { report.push(`${f.source}: failed (${e.message})`); }
  }

  for (const term of FED_TERMS) {
    try {
      const since = new Date(cutoff).toISOString().slice(0, 10);
      const q = `https://www.federalregister.gov/api/v1/documents.json?per_page=10&order=newest&conditions[term]=${encodeURIComponent(term)}&conditions[publication_date][gte]=${since}&fields[]=title&fields[]=html_url&fields[]=publication_date&fields[]=agencies&fields[]=type`;
      const data = JSON.parse(await get(q, 'application/json'));
      for (const d of data.results ?? []) {
        const agency = d.agencies?.[0]?.name ?? 'Federal Register';
        all.push({ title: d.title, url: d.html_url, source: `Federal Register · ${agency}`, date: new Date(d.publication_date + 'T12:00:00Z').toISOString(), topic: topicFor(`${term} ${d.title}`), official: true });
      }
      report.push(`Federal Register ${term}: ${data.results?.length ?? 0}`);
    } catch (e) { report.push(`Federal Register ${term}: failed (${e.message})`); }
  }

  const seen = new Set();
  const items = all
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter((i) => { const k = norm(i.title); if (seen.has(k) || seen.has(i.url)) return false; seen.add(k); seen.add(i.url); return true; })
    .slice(0, MAX);

  console.log(report.join('\n'));
  if (items.length === 0) {
    console.log('No items fetched; keeping the existing wire.');
    return;
  }
  fs.writeFileSync(OUT, JSON.stringify({ updated: new Date().toISOString(), items }, null, 1) + '\n');
  console.log(`Wrote ${items.length} items.`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
