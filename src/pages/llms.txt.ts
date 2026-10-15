// llms.txt: a plain-text map of the site for AI assistants and answer engines.
// Generated at build time so it always lists the latest stories, guides and rankings.
import { getCollection } from 'astro:content';
import { getPosts } from '../data/posts';
import { SITE } from '../data/site';
import { SECTIONS } from '../data/categories.mjs';
import { SOFTWARE } from '../data/software';

export async function GET(context: { site: URL }) {
  const u = (p: string) => new URL(p, context.site).toString();
  const posts = await getPosts();
  const guides = (await getCollection('guides')).sort((a, b) => a.data.title.localeCompare(b.data.title));
  const glossary = await getCollection('glossary');
  const outlook = (await getCollection('outlook')).sort((a, b) => a.data.title.localeCompare(b.data.title));
  const lines: string[] = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description} Independent news, analysis, data and software rankings.`,
    '',
    'Every article is original reporting and analysis that cites its sources, with sections on why it matters, the details, what procurement teams should do and what to watch next. Data pages use official U.S. government data (BLS Producer Price Index via FRED). Software rankings combine public G2 ratings with our analysts\' editorial scores; no vendor pays to be listed.',
    '',
    '## Data and tools',
    `- [Category outlook](${u('/outlook/')}): who holds negotiating leverage, supply risk and the move to make in 12 categories.`,
    `- [Price trends by category](${u('/cost-monitor/')}): monthly price-pressure readings for 12 purchase categories, from steel and diesel to ocean freight and semiconductors.`,
    `- [Tariff and trade deadline tracker](${u('/trackers/tariff-deadlines/')}): U.S. tariff effective dates and expirations.`,
    `- [Software finder](${u('/software/finder/')}): four questions that produce a shortlist of procurement software.`,
    `- [Procurement briefings](${u('/signals/')}): signal reports rated by urgency.`,
    '',
    '## Category outlook',
    `- [Category outlook](${u('/outlook/')}): negotiating leverage, supply risk and our recommended move for 12 purchase categories.`,
    ...outlook.map((o) => `- [${o.data.title}](${u(`/outlook/${o.id}/`)}): ${o.data.description}`),
    '',
    '## Guides',
    ...guides.map((g) => `- [${g.data.title}](${u(`/guides/${g.id}/`)}): ${g.data.description}`),
    `- [Procurement glossary](${u('/glossary/')}): ${glossary.length} plain-English definitions.`,
    '',
    '## Software rankings',
    `- [All procurement software rankings](${u('/software/')})`,
    ...SOFTWARE.categories.map((c) => `- [Best ${c.name.replace(/ software$/i, '')} software](${u(`/software/${c.slug}/`)}): ${c.vendors.length} platforms compared with our analysis, scores and G2 ratings. ${c.blurb}`),
    '',
    '## Sections',
    ...SECTIONS.map((s) => `- [${s.name}](${u(`/sections/${s.id}/`)}): ${s.blurb}`),
    '',
    '## Latest articles',
    ...posts.slice(0, 60).map((p) => `- [${p.data.title}](${u(`/articles/${p.id}/`)}) (${p.data.date.toISOString().slice(0, 10)}): ${p.data.dek}`),
    '',
    '## More',
    `- [All stories](${u('/archive/')})`,
    `- [RSS feed](${u('/rss.xml')})`,
    `- [Editorial standards](${u('/editorial-standards/')})`,
    `- [About](${u('/about/')})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
