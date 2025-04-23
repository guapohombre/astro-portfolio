import { defineCollection, reference, z } from "astro:content";
import { file, glob } from "astro/loaders";

const features = defineCollection({
  loader: file("src/content/features.json"),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
  }),
});

const projects = defineCollection({
  loader: file("src/content/projects.yaml"),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(65),
      image: image(),
      href: z.string().url(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: "src/content/blog/**.*md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(65),
      slug: z.string().optional(),
      description: z.string().max(160),
      image: image(),
      pubDate: z.date(),
      isDraft: z.boolean().optional(),
      author: reference("authors"),
    }),
});

const authors = defineCollection({
  loader: async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    return data.map((p: any) => ({ id: p.name, name: p.name }));
  },
});

export const collections = { features, projects, blog, authors };
