import React from 'react';
import { ExternalLink, Github, Trash2 } from 'lucide-react';
import { Card } from '../ui/SimpleCard';

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
    <Card className="group hover:shadow-md transition-all duration-200">
      <div className="space-y-4">
        {/* Image */}
        <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
          {project.image ? (
            <img
              src={`/storage/${project.image}`}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg">
                {project.title.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
              {project.description}
            </p>
          </div>

          {/* Technologies - Plus compactes */}
          <div className="flex flex-wrap gap-1">
            {technologies.slice(0, 2).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 2 && (
              <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded-full">
                +{technologies.length - 2}
              </span>
            )}
          </div>

          {/* Actions - Plus compactes */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex gap-1">
              {project.github_link && (
                <a 
                  href={project.github_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-2 py-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  <Github className="w-3 h-3 mr-1" />
                  Code
                </a>
              )}
              {project.demo_link && (
                <a 
                  href={project.demo_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-2 py-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Demo
                </a>
              )}
            </div>
            
            <button
              onClick={() => onDelete(project.id)}
              className="inline-flex items-center p-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
