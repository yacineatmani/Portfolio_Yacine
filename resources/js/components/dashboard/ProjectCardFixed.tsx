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
    const technologies = project.technologies ? project.technologies.split(',').map((tech) => tech.trim()) : [];

    return (
        <div className="project-card-ultra group rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition-all duration-200 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="space-y-2">
                {/* Content PRINCIPAL - Titre en premier */}
                <div>
                    <h3 className="project-title-ultra line-clamp-1 text-center text-xs leading-tight font-semibold text-gray-900 dark:text-white">
                        {project.title}
                    </h3>
                </div>

                {/* Image - Taille normale et compacte */}
                <div className="project-image-container-ultra mx-auto h-6 w-12 overflow-hidden rounded-sm bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
                    {project.image ? (
                        <img
                            src={project.image.startsWith('http') ? project.image : `/storage/${project.image}`}
                            alt={project.title}
                            className="project-image-ultra h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{project.title.charAt(0).toUpperCase()}</div>
                        </div>
                    )}
                </div>

                {/* Technologies - Une seule, minuscule */}
                <div className="flex justify-center">
                    {technologies.slice(0, 1).map((tech, index) => (
                        <span
                            key={index}
                            className="tech-badge-ultra rounded-sm bg-indigo-100 px-1 py-0 text-xs text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Actions - Horizontal, compactes */}
                <div className="flex items-center justify-center gap-2">
                    {project.github_link && (
                        <Button variant="ghost" size="sm" className="button-ultra h-6 p-1">
                            <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                                <Github className="h-3 w-3" />
                            </a>
                        </Button>
                    )}
                    {project.demo_link && (
                        <Button variant="ghost" size="sm" className="button-ultra h-6 p-1">
                            <a href={project.demo_link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(project.id)}
                        className="button-ultra h-6 p-1 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                    >
                        <Trash2 className="h-3 w-3" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
