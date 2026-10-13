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
  }),
});

export const collections = { articles };
