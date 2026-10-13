import rss from '@astrojs/rss';
import { getPosts } from '../data/posts';
import { SITE } from '../data/site';

export async function GET(context: { site: URL }) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items: posts.slice(0, 50).map((p) => ({
      title: p.data.title,
      description: p.data.dek,
      pubDate: p.data.date,
      link: `/articles/${p.id}/`,
    })),
  });
}
