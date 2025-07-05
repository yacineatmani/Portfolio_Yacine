import { ExternalLink, Github, Trash2 } from 'lucide-react';

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
        <div className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
            <div className="space-y-4">
                {/* Image */}
                <div className="aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
                    {project.image ? (
                        <img
                            src={`/storage/${project.image}`}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <div className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">{project.title.charAt(0).toUpperCase()}</div>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                    <div>
                        <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                        {technologies.slice(0, 3).map((tech, index) => (
                            <span
                                key={index}
                                className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                            >
                                {tech}
                            </span>
                        ))}
                        {technologies.length > 3 && (
                            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                                +{technologies.length - 3}
                            </span>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-2">
                            {project.github_link && (
                                <a
                                    href={project.github_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <Github className="mr-1 h-4 w-4" />
                                    GitHub
                                </a>
                            )}
                            {project.demo_link && (
                                <a
                                    href={project.demo_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <ExternalLink className="mr-1 h-4 w-4" />
                                    Demo
                                </a>
                            )}
                        </div>

                        <button
                            onClick={() => onDelete(project.id)}
                            className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
