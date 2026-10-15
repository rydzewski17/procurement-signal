// Links the first mention of a ranked software vendor in article HTML to its review on
// our ranking page. Only names that can't be mistaken for ordinary words are linked.
import { SOFTWARE, slugify } from './software';

const SAFE = /^(SAP Ariba|Coupa|Ivalua|Stampli|Procurify|Precoro|Omnea|Tipalti|Basware|Payhawk|AvidXchange|ApprovalMax|Ironclad|LinkSquares|Sirion|Juro|Summize|SpotDraft|LawVu|EcoVadis|osapiens|Creditsafe|Bitsight|UpGuard|Whistic|Secureframe|Vanta|aPriori|Archlet|Scanmarket|Agicap|DualEntry|Docusign|Workday)/;

const targets = (() => {
  const seen = new Map<string, string>();
  for (const c of SOFTWARE.categories) for (const v of c.vendors) {
    const m = v.name.match(SAFE);
    if (!m) continue;
    const label = m[1];
    if (!seen.has(label)) seen.set(label, `/software/${c.slug}/#${slugify(v.name)}`);
  }
  return [...seen.entries()].sort((a, b) => b[0].length - a[0].length);
})();

export function linkVendors(html: string, used = new Set<string>()): string {
  // Split into tags and text; skip text inside <a>, headings and tables' header cells.
  const parts = html.split(/(<[^>]+>)/);
  let skip = 0;
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (p.startsWith('<')) {
      if (/^<(a|h[1-6]|th)[\s>]/i.test(p)) skip++;
      else if (/^<\/(a|h[1-6]|th)>/i.test(p)) skip = Math.max(0, skip - 1);
      continue;
    }
    if (skip || !p.trim()) continue;
    let text = p;
    for (const [label, href] of targets) {
      if (used.has(label)) continue;
      const re = new RegExp(`\\b${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
      if (re.test(text)) {
        text = text.replace(re, `<a class="vlink" href="${href}">${label}</a>`);
        used.add(label);
      }
    }
    parts[i] = text;
  }
  return parts.join('');
}
