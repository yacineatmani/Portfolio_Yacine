import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import React from 'react';
import FallingText from './FallingText';
import SectionTitle from './SectionTitle';

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
            description: "Développement de sites modernes avec React. Optimisation des performances et amélioration de l'expérience utilisateur.",
            tech: ['React', 'Node.js', 'TypeScript'],
        },
        {
            id: 2,
            role: 'Stagiaire Backend',
            company: 'DevInc',
            period: '2022',
            description: 'Travail sur des API avec Laravel. Implémentation de fonctionnalités et optimisation des requêtes de base de données.',
            tech: ['Laravel', 'PHP', 'MySQL'],
        },
        {
            id: 3,
            role: 'Freelance Développeur',
            company: 'Freelance',
            period: '2021 - 2022',
            description: 'Création de sites personnalisés pour clients.',
            tech: ['HTML', 'CSS', 'JavaScript'],
        },
        {
            id: 4,
            role: 'Assistant Développeur',
            company: 'StartUpX',
            period: '2020',
            description: 'Support sur des projets de start-up.',
            tech: ['Vue.js', 'MySQL'],
        },
    ];

    return (
        <section id="experience" className="bg-white py-20 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <FallingText text="Expérience" className="mb-4 text-4xl font-bold text-indigo-600 dark:text-indigo-400" speed={5} />
                    <SectionTitle title="Mon Parcours" subtitle="Expériences professionnelles" align="center" />
                </div>

                <div className="relative mt-12">
                    <div className="absolute left-1/2 z-0 h-full w-0.5 -translate-x-1/2 transform bg-indigo-200 dark:bg-indigo-900"></div>

                    {experiences.map((experience, index) => (
                        <motion.div
                            key={experience.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true, margin: '-100px' }}
                            className={`relative z-10 mb-12 flex items-center last:mb-0 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                        >
                            <div className="absolute top-0 left-1/2 z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/3 transform rounded-full bg-indigo-600 shadow-md dark:bg-indigo-400"></div>

                            <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                                <motion.div
                                    className="rounded-lg bg-gray-50 p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-800"
                                    whileHover={{ y: -5 }}
                                >
                                    <h3 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">{experience.role}</h3>
                                    <div className="${index % 2 === 0 ? 'justify-end' : 'justify-start'} mb-2 flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                        <Briefcase size={16} />
                                        <span>{experience.company}</span>
                                    </div>
                                    <div className="${index % 2 === 0 ? 'justify-end' : 'justify-start'} mb-4 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                        <Calendar size={16} />
                                        <span>{experience.period}</span>
                                    </div>
                                    <p className="mb-4 text-gray-600 dark:text-gray-300">{experience.description}</p>
                                    <div className="${index % 2 === 0 ? 'justify-end' : 'justify-start'} flex flex-wrap gap-2">
                                        {experience.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300"
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
