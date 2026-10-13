import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    topic: z.enum(['tariffs-trade', 'supplier-risk', 'proc-tech', 'commodities', 'public-sector', 'esg-regulation', 'ai-procurement', 'people-moves']),
    type: z.enum(['news', 'signal', 'analysis']).default('news'),
    signal: z.number().min(1).max(5).default(3),
    author: z.string().default('Procurement Signal Staff'),
    tags: z.array(z.string()).default([]),
    sources: z.array(z.object({ name: z.string(), url: z.string().url() })).min(1),
    featured: z.boolean().default(false),
    keyfacts: z.array(z.object({ value: z.string(), label: z.string() })).max(4).default([]),
    image: z.object({ src: z.string().url(), alt: z.string(), credit: z.string(), creditUrl: z.string().url().optional(), license: z.string().default('Unsplash') }).optional(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date(),
    topic: z.string(),
    takeaways: z.array(z.string()).min(3).max(6),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    tags: z.array(z.string()).default([]),
    sources: z.array(z.object({ name: z.string(), url: z.string().url() })).default([]),
  }),
});

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/glossary' }),
  schema: z.object({ term: z.string(), short: z.string(), related: z.array(z.string()).default([]) }),
});

export const collections = { articles, guides, glossary };
