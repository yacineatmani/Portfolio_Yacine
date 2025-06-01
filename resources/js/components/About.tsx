import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code, Users, Globe } from 'lucide-react';
import SectionTitle from './SectionTitle';
import FallingText from './FallingText';

const About: React.FC = () => {
  const strengths = [
    {
      icon: <Code />,
      title: 'Développement de qualité',
      description: 'Je développe des applications robustes et évolutives en utilisant les meilleures pratiques et technologies modernes.'
    },
    {
      icon: <Users />,
      title: 'Collaboration efficace',
      description: 'Je travaille en étroite collaboration avec les équipes pour comprendre les besoins et livrer des solutions adaptées.'
    },
    {
      icon: <Sparkles />,
      title: 'Créativité',
      description: 'J\'apporte des idées innovantes et des solutions créatives pour résoudre des problèmes complexes.'
    },
    {
      icon: <Globe />,
      title: 'Vision globale',
      description: 'Je considère chaque projet dans son ensemble, de la conception à la livraison et au-delà.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full filter blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <FallingText text="Découvrez mon univers" className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4" speed={5} />
          <SectionTitle
            title="À Propos de Moi"
            subtitle="Découvrez mon parcours et ma vision"
            align="center"
          />
        </div>
        
        <motion.div 
          className="mt-12 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-indigo-600/20 dark:bg-indigo-400/20 blur-xl rounded-full transform -translate-x-2 translate-y-2"></div>
            <img
              src="/images/yacine.jpg"
              alt="Yacine Atmani"
              className="relative w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-lg"
              onError={(e) => {
                e.currentTarget.src = "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg";
              }}
            />
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            Passionné par le développement web, je crée des solutions innovantes avec une attention particulière au détail et à l'expérience utilisateur. 
            Mon parcours m'a permis d'acquérir une solide expertise technique et une compréhension approfondie des besoins des utilisateurs.
            Je suis constamment à la recherche de nouveaux défis et d'opportunités d'apprentissage pour améliorer mes compétences.
          </p>
          
          <blockquote className="text-xl italic text-indigo-600 dark:text-indigo-400 font-medium mb-12">
            "Le code est comme l'humour. Quand on doit l'expliquer, c'est mauvais."
          </blockquote>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {strengths.map((strength, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                {strength.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {strength.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {strength.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;