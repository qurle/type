// News not planned but structure may help in future

import { glob } from 'astro/loaders'
import { defineCollection, getCollection, getEntry, z } from 'astro:content'

const news = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/data/news" }),
	schema: z.object({
		title: z.string(),
		date: z.date(),
	})
})

// Export a single `collections` object to register your collection(s)
export const collections = {
	news,
}
