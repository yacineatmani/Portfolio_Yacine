import { skillIcons } from '@/utils/icons';
import { motion } from 'framer-motion';
import React from 'react';
import SectionTitle from './SectionTitle';

interface Skill {
    id: number;
    name: string;
    level: string;
}

interface SkillsProps {
    skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
    const optimizedSkills = skills.slice(0, 6);

    return (
        <section id="skills" className="bg-gray-50 py-20 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <SectionTitle title="Compétences" subtitle="Mes Expertises" align="center" variants={['Compétences', 'Mes Skills', 'Expertises']} />
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {optimizedSkills.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            className="rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-900"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="mb-2 flex items-center gap-3">
                                <span>{skillIcons[skill.name] || <span className="h-6 w-6" />}</span>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{skill.name}</h3>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                <motion.div
                                    className="h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
                                    initial={{ width: '0%' }}
                                    whileInView={{
                                        width: `${skill.level === 'expert' ? 90 : skill.level === 'advanced' ? 70 : skill.level === 'intermediate' ? 50 : 30}%`,
                                    }}
                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                    viewport={{ once: true }}
                                />
                            </div>
                            <p className="mt-2 text-xs text-gray-600 capitalize dark:text-gray-300">{skill.level}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
