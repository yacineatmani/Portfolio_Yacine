import { motion } from 'framer-motion';
import React from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import SectionTitle from './SectionTitle';

interface Project {
    id: number;
    title: string;
    description: string;
    github_link?: string;
    demo_link?: string;
    image?: string | null;
    stack: string[];
    challenges: string;
    video?: string | null;
}

interface ProjectsProps {
    projects: Project[];
    onImageError: (projectId: number) => void;
    imageErrors: number[];
}

const Projects: React.FC<ProjectsProps> = ({ projects, onImageError, imageErrors }) => {
    const getImagePath = (image: string | null | undefined) => {
        if (!image) return '/images/placeholder.png';
        return image.startsWith('http') || image.startsWith('https') ? image : `/storage/${image}`;
    };

    return (
        <section id="projects" className="bg-white py-20 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <SectionTitle title="Projets" subtitle="Mes Réalisations" align="center" variants={['Projets', 'Mes Réalisations', 'Portfolio']} />
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.length > 0 ? (
                        projects.map((project, index) => {
                            const imagePath = getImagePath(project.image);
                            const isImageError = imageErrors.includes(project.id);

                            return (
                                <motion.div
                                    key={project.id}
                                    className="rounded-lg bg-gray-50 p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-800"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            {!isImageError ? (
                                                <img
                                                    src={imagePath}
                                                    alt={project.title}
                                                    className="h-48 w-full rounded-md object-cover"
                                                    loading="lazy"
                                                    onError={() => onImageError(project.id)}
                                                />
                                            ) : (
                                                <div className="flex h-48 w-full items-center justify-center rounded-md bg-gray-200 dark:bg-gray-700">
                                                    <span className="text-gray-500">Image non disponible</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">{project.title}</h3>
                                            <div className="mb-2 flex flex-wrap gap-2">
                                                {project.stack?.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
                                            <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
                                                <strong>Challenges :</strong> {project.challenges}
                                            </p>
                                            <div className="flex gap-3">
                                                {project.github_link && (
                                                    <a
                                                        href={project.github_link}
                                                        className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <FaGithub className="h-4 w-4" /> GitHub
                                                    </a>
                                                )}
                                                {project.demo_link && (
                                                    <a
                                                        href={project.demo_link}
                                                        className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <FaExternalLinkAlt className="h-4 w-4" /> Démo
                                                    </a>
                                                )}
                                            </div>
                                            {project.video && (
                                                <div className="mt-3">
                                                    <video
                                                        src={project.video}
                                                        autoPlay
                                                        loop
                                                        muted
                                                        playsInline
                                                        className="h-24 w-full rounded-md object-cover opacity-90"
                                                    >
                                                        <source src={project.video} type="video/mp4" />
                                                        Votre navigateur ne supporte pas la lecture de vidéos.
                                                    </video>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                            Aucun projet disponible. Visitez mon{' '}
                            <a
                                href="https://github.com/yacineatmani"
                                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                            !
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;
