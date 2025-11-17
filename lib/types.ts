import { z } from 'zod';

export const ProjectSchema = z.object({
  slug: z.string(),
  name: z.string(),
  tagline: z.string(),
  stack: z.array(z.string()),
  year: z.string(),
  role: z.string(),
  description: z.string(),
  highlights: z.array(z.string()),
  metrics: z.array(z.string()),
  links: z.object({
    demo: z.string().optional(),
    repo: z.string().optional(),
  }),
});

export type Project = z.infer<typeof ProjectSchema>;

export const ProjectsDataSchema = z.object({
  projects: z.array(ProjectSchema),
});

export type ProjectsData = z.infer<typeof ProjectsDataSchema>;
