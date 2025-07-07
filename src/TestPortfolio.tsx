import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaMoon, FaSun, FaArrowUp, FaCheckCircle, FaExclamationCircle, FaLinkedin, FaDownload } from 'react-icons/fa';

// Test avec données simplifiées pour diagnostiquer le problème
const testData = {
    user: {
        id: 1,
        name: "Yacine Atmani",
        first_name: "Yacine",
        bio: "Développeur Fullstack passionné par Laravel, React et les technologies modernes.",
        photo: "/portifolio_Yacine/test-photo.jpg",
        cv: "/portifolio_Yacine/cv.pdf"
    },
    projects: [
        {
            id: 1,
            title: "Test Project",
            description: "Projet de test pour vérifier l'affichage",
            github_link: "https://github.com/yacineatmani",
            demo_link: "https://github.com/yacineatmani",
            image: "/portifolio_Yacine/images/project-placeholder.jpg",
            stack: ["React", "Laravel"],
            challenges: "Test d'affichage"
        }
    ],
    skills: [
        { id: 1, name: "React", level: "Expert" },
        { id: 2, name: "Laravel", level: "Avancé" },
        { id: 3, name: "JavaScript", level: "Expert" }
    ]
};

const TestPortfolio: React.FC = () => {
    const [isDarkMode, setDarkMode] = useState<boolean>(false);
    const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => setDarkMode(prev => !prev);
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-lg z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-purple-600">Portfolio</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
                            >
                                {isDarkMode ? <FaSun /> : <FaMoon />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Test */}
            <section className="pt-16 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Test Portfolio - {testData.user.first_name}
                    </h1>
                    
                    <div className="mt-12">
                        <img
                            src={testData.user.photo}
                            alt={testData.user.name}
                            className="mx-auto rounded-full w-64 h-64 object-cover border-8 border-purple-600/20"
                            onError={(e) => {
                                console.error('Erreur de chargement d\'image:', e.currentTarget.src);
                                e.currentTarget.src = '/portifolio_Yacine/images/profile-placeholder.jpg';
                            }}
                            onLoad={() => console.log('Image chargée avec succès!')}
                        />
                    </div>
                    
                    <p className="text-xl text-gray-600 dark:text-gray-300 mt-8">
                        {testData.user.bio}
                    </p>
                </div>
            </section>

            {/* Test Projects */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">Tests Projets</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testData.projects.map((project) => (
                            <div key={project.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        console.error('Erreur projet:', e.currentTarget.src);
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold">{project.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Test Skills */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">Compétences Test</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {testData.skills.map((skill) => (
                            <div key={skill.id} className="bg-white dark:bg-gray-700 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold">{skill.name}</h3>
                                <span className="text-sm text-gray-600">{skill.level}</span>
                                <div className="mt-2 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                    <div className="bg-purple-600 h-2 rounded-full w-3/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Debug Info */}
            <section className="py-12 bg-yellow-100 dark:bg-yellow-900">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h3 className="text-lg font-bold mb-4">Debug Info</h3>
                    <div className="text-left bg-white dark:bg-gray-800 p-4 rounded">
                        <p><strong>Photo URL:</strong> {testData.user.photo}</p>
                        <p><strong>Base URL:</strong> {window.location.origin}</p>
                        <p><strong>Current Path:</strong> {window.location.pathname}</p>
                        <p><strong>Dark Mode:</strong> {isDarkMode ? 'Activé' : 'Désactivé'}</p>
                    </div>
                </div>
            </section>

            {/* Back to Top */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg"
                    >
                        <FaArrowUp />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TestPortfolio;
