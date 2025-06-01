import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import SectionTitle from './SectionTitle';
import FallingText from './FallingText';

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
}

const Experience: React.FC = () => {
  const experiences: Experience[] = [
    { 
      id: 1, 
      role: 'Développeur Web', 
      company: 'TechCorp', 
      period: '2023 - Présent', 
      description: 'Développement de sites modernes avec React. Optimisation des performances et amélioration de l\'expérience utilisateur.', 
      tech: ['React', 'Node.js', 'TypeScript'] 
    },
    { 
      id: 2, 
      role: 'Stagiaire Backend', 
      company: 'DevInc', 
      period: '2022', 
      description: 'Travail sur des API avec Laravel. Implémentation de fonctionnalités et optimisation des requêtes de base de données.', 
      tech: ['Laravel', 'PHP', 'MySQL'] 
    },
    {
      id: 3,
      role: 'Freelance Développeur',
      company: 'Freelance',
      period: '2021 - 2022',
      description: 'Création de sites personnalisés pour clients.',
      tech: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 4,
      role: 'Assistant Développeur',
      company: 'StartUpX',
      period: '2020',
      description: 'Support sur des projets de start-up.',
      tech: ['Vue.js', 'MySQL']
    },
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <FallingText text="Expérience" className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4" speed={5} />
          <SectionTitle
            title="Mon Parcours"
            subtitle="Expériences professionnelles"
            align="center"
          />
        </div>
        
        <div className="mt-12 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-indigo-200 dark:bg-indigo-900 z-0"></div>
          
          {experiences.map((experience, index) => (
            <motion.div 
              key={experience.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative z-10 mb-12 last:mb-0 flex items-center ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/3 w-4 h-4 rounded-full bg-indigo-600 dark:bg-indigo-400 z-20 shadow-md"></div>
              
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                <motion.div 
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {experience.role}
                  </h3>
                  <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 mb-2 text-sm font-medium ${index % 2 === 0 ? 'justify-end' : 'justify-start'}">
                    <Briefcase size={16} />
                    <span>{experience.company}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mb-4 text-sm ${index % 2 === 0 ? 'justify-end' : 'justify-start'}">
                    <Calendar size={16} />
                    <span>{experience.period}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {experience.description}
                  </p>
                  <div className="flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}">
                    {experience.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;