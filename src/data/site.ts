export const SITE = {
  name: 'Procurement Signal',
  tagline: 'The intelligence feed for procurement leaders.',
  description: 'B2B intelligence for procurement and supply chain professionals: tariffs, supplier risk, input costs and procurement technology, with what each development means for buyers.',
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

// Photos used when a story has no image of its own, and for topic pages.
// All from Unsplash (free to use under the Unsplash License); credited on display.
export interface Photo { src: string; alt: string; credit: string; creditUrl: string; license: string; }
const u = (id: string) => `https://images.unsplash.com/${id}?ixlib=rb-4.1.0`;
export const TOPIC_PHOTOS: Record<string, Photo> = {
  'tariffs-trade': { src: u('photo-1562892302-97faedd66f1c'), alt: 'Aerial view of stacked freight containers', credit: 'Olga Subach', creditUrl: 'https://unsplash.com/photos/aerial-view-photo-of-freight-containers-Zuxxq0iHkN4', license: 'Unsplash' },
  'supplier-risk': { src: u('photo-1553413077-190dd305871c'), alt: 'Rows of shelving in a large warehouse', credit: 'Ruchindra Gunasekara', creditUrl: 'https://unsplash.com/photos/large-warhause-GK8x_XCcDZg', license: 'Unsplash' },
  'commodities': { src: u('photo-1697698532634-ea59b636ccea'), alt: 'Rolls of steel lined up in a warehouse', credit: 'Morteza Mohammadi', creditUrl: 'https://unsplash.com/photos/rolls-of-steel-are-lined-up-in-a-warehouse--kWkoUkFyp0', license: 'Unsplash' },
  'proc-tech': { src: u('photo-1551288049-bebda4e38f71'), alt: 'Analytics charts on a laptop screen', credit: 'Luke Chesser', creditUrl: 'https://unsplash.com/photos/graphs-of-performance-analytics-on-a-laptop-screen-JKUTrJ4vK00', license: 'Unsplash' },
  'ai-procurement': { src: u('photo-1675602488512-bdd631490fcb'), alt: 'Close-up of a computer chip on a circuit board', credit: 'Bermix Studio', creditUrl: 'https://unsplash.com/photos/a-close-up-of-a-computer-chip-on-a-printed-circuit-board-tTurhPw9bwQ', license: 'Unsplash' },
  'public-sector': { src: u('photo-1520525003249-2b9cdda513bc'), alt: 'The U.S. Capitol building against a blue sky', credit: 'Louis Velazquez', creditUrl: 'https://unsplash.com/photos/united-states-capitol-building-in-washington-XWW746i6WoM', license: 'Unsplash' },
  'esg-regulation': { src: u('photo-1762381157166-f51ac99ab412'), alt: 'Wind turbines and solar panels in a rural landscape', credit: 'Bernd Dittrich', creditUrl: 'https://unsplash.com/photos/wind-turbines-and-solar-panels-in-a-rural-landscape-gFud7-XmQvk', license: 'Unsplash' },
  'people-moves': { src: u('photo-1517048676732-d65bc937f952'), alt: 'Colleagues in a meeting around a table', credit: 'Dylan Gillis', creditUrl: 'https://unsplash.com/photos/people-sitting-on-chair-in-front-of-table-while-holding-pens-during-daytime-KdeqA3aTnBY', license: 'Unsplash' },
};

// Newsletter sign-up endpoint (for example, a Beehiiv or Mailchimp form action). Leave empty until an email provider is connected.
export const SUBSCRIBE_ACTION = '';
