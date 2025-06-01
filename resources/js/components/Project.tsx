import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
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
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Projets"
          subtitle="Mes Réalisations"
          align="center"
          variants={['Projets', 'Mes Réalisations', 'Portfolio']}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projects.length > 0 ? (
            projects.map((project, index) => {
              const imagePath = getImagePath(project.image);
              const isImageError = imageErrors.includes(project.id);

              return (
                <motion.div
                  key={project.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md"
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
                          className="w-full h-48 object-cover rounded-md"
                          loading="lazy"
                          onError={() => onImageError(project.id)}
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-md">
                          <span className="text-gray-500">Image non disponible</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{project.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.stack?.map((tech, i) => (
                          <span key={i} className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full px-2 py-1">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{project.description}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <strong>Challenges :</strong> {project.challenges}
                      </p>
                      <div className="flex gap-3">
                        {project.github_link && (
                          <a href={project.github_link} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 text-sm font-medium" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="w-4 h-4" /> GitHub
                          </a>
                        )}
                        {project.demo_link && (
                          <a href={project.demo_link} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 text-sm font-medium" target="_blank" rel="noopener noreferrer">
                            <FaExternalLinkAlt className="w-4 h-4" /> Démo
                          </a>
                        )}
                      </div>
                      {project.video && (
                        <div className="mt-3">
                          <video src={project.video} autoPlay loop muted playsInline className="w-full h-24 object-cover rounded-md opacity-90">
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
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              Aucun projet disponible. Visitez mon{' '}
              <a href="https://github.com/yacineatmani" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300" target="_blank" rel="noopener noreferrer">
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