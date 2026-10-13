import { getCollection } from 'astro:content';

export async function getPosts() {
  const posts = await getCollection('articles');
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || b.data.signal - a.data.signal);
}
