import { z } from 'zod';

export const ProjectMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const ProjectSchema = z.object({
  slug: z.string(),
  name: z.string(),
  tagline: z.string(),
  stack: z.array(z.string()),
  year: z.number(),
  role: z.string(),
  description: z.string(),
  highlights: z.array(z.string()),
  metrics: z.array(ProjectMetricSchema),
  links: z.object({
    demo: z.string().optional(),
    repo: z.string().optional(),
  }),
  image: z.string().optional(),
});

export const ProjectsSchema = z.array(ProjectSchema);

export type ProjectMetric = z.infer<typeof ProjectMetricSchema>;
export type Project = z.infer<typeof ProjectSchema>;

export const ThemeSchema = z.enum(['classic-beige', 'olive-gray', 'candy-blue']);
export type Theme = z.infer<typeof ThemeSchema>;

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isFocused: boolean;
}

export interface AppSettings {
  theme: Theme;
  crtEffect: boolean;
  soundEnabled: boolean;
  clockFormat: '12h' | '24h';
}

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'classic-beige',
  crtEffect: true,
  soundEnabled: false,
  clockFormat: '12h',
};
