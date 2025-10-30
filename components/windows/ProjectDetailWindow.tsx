'use client';

import { Project } from '@/lib/types';

interface ProjectDetailWindowProps {
  project: Project;
}

export default function ProjectDetailWindow({ project }: ProjectDetailWindowProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-pixel mb-2 text-blue-700">{project.name}</h1>
        <p className="text-gray-600 italic">{project.tagline}</p>
        <p className="text-sm text-gray-500 mt-2">
          {project.role} • {project.year}
        </p>
      </div>

      {/* Description */}
      <section className="mb-6">
        <p className="text-sm leading-relaxed">{project.description}</p>
      </section>

      {/* Metrics */}
      <section className="mb-6">
        <h2 className="text-lg font-pixel mb-3 text-blue-600">Key Metrics</h2>
        <div className="grid grid-cols-3 gap-4">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="bg-blue-50 p-4 border-2 border-blue-200 text-center">
              <div className="text-2xl font-bold text-blue-700">{metric.value}</div>
              <div className="text-xs text-gray-600 mt-1">{metric.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="mb-6">
        <h2 className="text-lg font-pixel mb-3 text-blue-600">Highlights</h2>
        <ul className="space-y-2">
          {project.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-blue-600 mt-1">▸</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Tech Stack */}
      <section className="mb-6">
        <h2 className="text-lg font-pixel mb-3 text-blue-600">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-2 bg-blue-100 border-2 border-blue-300 text-sm font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Links */}
      <section>
        <h2 className="text-lg font-pixel mb-3 text-blue-600">Links</h2>
        <div className="flex gap-3">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button px-4 py-2"
            >
              🌐 Live Demo
            </a>
          )}
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="retro-button px-4 py-2"
            >
              💻 GitHub Repo
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
