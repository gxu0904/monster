'use client';

import { Project } from '@/lib/types';

interface ProjectsWindowProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export default function ProjectsWindow({ projects, onOpenProject }: ProjectsWindowProps) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-pixel mb-6 text-blue-700">Projects</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-2 border-gray-400 text-sm">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="border border-gray-400 px-4 py-2 text-left font-pixel text-xs">
                Name
              </th>
              <th className="border border-gray-400 px-4 py-2 text-left font-pixel text-xs">
                Stack
              </th>
              <th className="border border-gray-400 px-4 py-2 text-center font-pixel text-xs">
                Year
              </th>
              <th className="border border-gray-400 px-4 py-2 text-center font-pixel text-xs">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, i) => (
              <tr
                key={project.slug}
                className={i % 2 === 0 ? 'bg-white' : 'bg-retro-beige-50'}
              >
                <td className="border border-gray-400 px-4 py-3">
                  <div className="font-bold text-blue-700">{project.name}</div>
                  <div className="text-xs text-gray-600 mt-1">{project.tagline}</div>
                </td>
                <td className="border border-gray-400 px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-blue-100 border border-blue-300 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="border border-gray-400 px-4 py-3 text-center">
                  {project.year}
                </td>
                <td className="border border-gray-400 px-4 py-3">
                  <div className="flex gap-2 justify-center flex-wrap">
                    <button
                      onClick={() => onOpenProject(project)}
                      className="retro-button px-3 py-1 text-xs"
                    >
                      Open
                    </button>
                    {project.links.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="retro-button px-3 py-1 text-xs inline-block"
                      >
                        Repo
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="retro-button px-3 py-1 text-xs inline-block"
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
