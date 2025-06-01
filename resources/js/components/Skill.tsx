import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { skillIcons } from '@/utils/icons';

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
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Compétences"
          subtitle="Mes Expertises"
          align="center"
          variants={['Compétences', 'Mes Skills', 'Expertises']}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {optimizedSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span>{skillIcons[skill.name] || <span className="w-6 h-6" />}</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{skill.name}</h3>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-indigo-600 dark:bg-indigo-400 h-2 rounded-full"
                  initial={{ width: '0%' }}
                  whileInView={{ width: `${skill.level === 'expert' ? 90 : skill.level === 'advanced' ? 70 : skill.level === 'intermediate' ? 50 : 30}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  viewport={{ once: true }}
                />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 capitalize">{skill.level}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;