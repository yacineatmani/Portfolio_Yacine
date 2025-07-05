import { motion } from 'framer-motion';
import { Code, Globe, Sparkles, Users } from 'lucide-react';
import React from 'react';
import FallingText from './FallingText';
import SectionTitle from './SectionTitle';

const About: React.FC = () => {
    const strengths = [
        {
            icon: <Code />,
            title: 'Développement de qualité',
            description: 'Je développe des applications robustes et évolutives en utilisant les meilleures pratiques et technologies modernes.',
        },
        {
            icon: <Users />,
            title: 'Collaboration efficace',
            description: 'Je travaille en étroite collaboration avec les équipes pour comprendre les besoins et livrer des solutions adaptées.',
        },
        {
            icon: <Sparkles />,
            title: 'Créativité',
            description: "J'apporte des idées innovantes et des solutions créatives pour résoudre des problèmes complexes.",
        },
        {
            icon: <Globe />,
            title: 'Vision globale',
            description: 'Je considère chaque projet dans son ensemble, de la conception à la livraison et au-delà.',
        },
    ];

    return (
        <section id="about" className="relative overflow-hidden bg-gray-50 py-20 dark:bg-gray-800">
            <div className="absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-indigo-200/30 blur-3xl filter dark:bg-indigo-900/20"></div>
            <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/3 translate-y-1/3 transform rounded-full bg-indigo-200/30 blur-3xl filter dark:bg-indigo-900/20"></div>

            <div className="relative z-10 container mx-auto px-4">
                <div className="text-center">
                    <FallingText text="Découvrez mon univers" className="mb-4 text-4xl font-bold text-indigo-600 dark:text-indigo-400" speed={5} />
                    <SectionTitle title="À Propos de Moi" subtitle="Découvrez mon parcours et ma vision" align="center" />
                </div>

                <motion.div
                    className="mx-auto mt-12 max-w-3xl text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="relative mx-auto mb-8 h-32 w-32">
                        <div className="absolute inset-0 -translate-x-2 translate-y-2 transform rounded-full bg-indigo-600/20 blur-xl dark:bg-indigo-400/20"></div>
                        <img
                            src="/images/yacine.jpg"
                            alt="Yacine Atmani"
                            className="relative h-full w-full rounded-full border-4 border-white object-cover shadow-lg dark:border-gray-900"
                            onError={(e) => {
                                e.currentTarget.src = 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg';
                            }}
                        />
                    </div>

                    <p className="mb-8 leading-relaxed text-gray-700 dark:text-gray-300">
                        Passionné par le développement web, je crée des solutions innovantes avec une attention particulière au détail et à
                        l'expérience utilisateur. Mon parcours m'a permis d'acquérir une solide expertise technique et une compréhension approfondie
                        des besoins des utilisateurs. Je suis constamment à la recherche de nouveaux défis et d'opportunités d'apprentissage pour
                        améliorer mes compétences.
                    </p>

                    <blockquote className="mb-12 text-xl font-medium text-indigo-600 italic dark:text-indigo-400">
                        "Le code est comme l'humour. Quand on doit l'expliquer, c'est mauvais."
                    </blockquote>
                </motion.div>

                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {strengths.map((strength, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="rounded-lg bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-900"
                        >
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                                {strength.icon}
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{strength.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{strength.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
