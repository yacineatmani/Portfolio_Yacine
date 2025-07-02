import React from 'react';
import { ExternalLink, Github, Trash2 } from 'lucide-react';
import { Button } from '../ui/DashboardButton';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  github_link?: string;
  demo_link?: string;
  image?: string;
}

interface ProjectCardProps {
  project: Project;
  onDelete: (id: number) => void;
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const technologies = project.technologies ? project.technologies.split(',').map(tech => tech.trim()) : [];

  return (
    <div className="project-card-ultra bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-2 group hover:shadow-sm transition-all duration-200">
      <div className="space-y-2">
        {/* Content PRINCIPAL - Titre en premier */}
        <div>
          <h3 className="project-title-ultra text-xs font-semibold text-gray-900 dark:text-white line-clamp-1 leading-tight text-center">
            {project.title}
          </h3>
        </div>

        {/* Image - Taille normale et compacte */}
        <div className="project-image-container-ultra h-6 w-12 mx-auto rounded-sm overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
          {project.image ? (
            <img
              src={project.image.startsWith('http') ? project.image : `/storage/${project.image}`}
              alt={project.title}
              className="project-image-ultra w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-indigo-600 dark:text-indigo-400 font-semibold text-xs">
                {project.title.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>

        {/* Technologies - Une seule, minuscule */}
        <div className="flex justify-center">
          {technologies.slice(0, 1).map((tech, index) => (
            <span
              key={index}
              className="tech-badge-ultra px-1 py-0 text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions - Horizontal, compactes */}
        <div className="flex items-center justify-center gap-2">
          {project.github_link && (
            <Button variant="ghost" size="sm" className="button-ultra p-1 h-6">
              <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                <Github className="w-3 h-3" />
              </a>
            </Button>
          )}
          {project.demo_link && (
            <Button variant="ghost" size="sm" className="button-ultra p-1 h-6">
              <a href={project.demo_link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(project.id)}
            className="button-ultra text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 h-6"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
