import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { debounce } from 'lodash';
import { FaGithub, FaExternalLinkAlt, FaMoon, FaSun, FaArrowUp, FaCheckCircle, FaExclamationCircle, FaLinkedin, FaDownload } from 'react-icons/fa';
import dataImport from './data.json';

gsap.registerPlugin(ScrollTrigger);

// Adapter les données importées pour GitHub Pages
const staticData = {
    user: {
        ...dataImport.user,
        name: `${dataImport.user.first_name} ${dataImport.user.name}`,
        photo: dataImport.user.photo ? `/portifolio_Yacine/${dataImport.user.photo}` : '/portifolio_Yacine/images/profile-placeholder.jpg',
        cv: dataImport.user.cv ? `/portifolio_Yacine/${dataImport.user.cv}` : '/portifolio_Yacine/cv.pdf'
    },
    projects: dataImport.projects.map(project => ({
        ...project,
        image: project.image ? `/portifolio_Yacine/${project.image}` : '/portifolio_Yacine/images/project-placeholder.jpg'
    })),
    skills: dataImport.skills,
    experiences: dataImport.experiences || []
};

// Types
interface User {
    id: number;
    name: string;
    first_name: string;
    bio: string | null;
    photo: string | null;
    cv: string | null;
}

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

interface Skill {
    id: number;
    name: string;
    level: string;
}

interface Experience {
    id: number;
    role: string;
    company: string;
    period: string;
    description: string;
    tech: string[];
}

// Composants helper
const RotatingText: React.FC<{ texts: string[]; style: React.CSSProperties; interval?: number }> = ({ texts, style, interval = 3000 }) => {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setIndex((prev) => (prev + 1) % texts.length), interval);
        return () => clearInterval(timer);
    }, [texts.length, interval]);
    return <h2 style={style}>{texts[index]}</h2>;
};

const StaticPortfolio: React.FC = () => {
    const user: User = staticData.user;
    const projects: Project[] = staticData.projects;
    const skills: Skill[] = staticData.skills;
    const experiences: Experience[] = staticData.experiences;

    const [isDarkMode, setDarkMode] = useState<boolean>(false);
    const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [toast, setToast] = useState<{ type: 'success' | 'error'; message?: string } | null>(null);
    const [imageErrors, setImageErrors] = useState<number[]>([]);

    const heroRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = storedTheme === 'dark' || (!storedTheme && prefersDark);
        setDarkMode(initialTheme);
        document.documentElement.classList.toggle('dark', initialTheme);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    useEffect(() => {
        const handleScroll = debounce(() => {
            setShowBackToTop(window.scrollY > 300);
        }, 100);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleTheme = () => {
        setDarkMode(prev => !prev);
    };

    const handleImageError = (projectId: number) => {
        setImageErrors(prev => [...prev, projectId]);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Simulation d'envoi pour la version statique
        setToast({ type: 'success', message: 'Message envoyé avec succès! (Version démo)' });
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => setToast(null), 5000);
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                {user.name}
                            </h1>
                        </div>
                        
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {[
                                    { name: 'Accueil', ref: heroRef },
                                    { name: 'À propos', ref: aboutRef },
                                    { name: 'Projets', ref: projectsRef },
                                    { name: 'Compétences', ref: skillsRef },
                                    { name: 'Contact', ref: contactRef }
                                ].map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => scrollToSection(item.ref)}
                                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {isDarkMode ? <FaSun /> : <FaMoon />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section ref={heroRef} className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Salut, je suis{' '}
                                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    {user.first_name}
                                </span>
                            </h1>
                            
                            <RotatingText
                                texts={[
                                    'Développeur Full Stack',
                                    'Expert Laravel',
                                    'Spécialiste React',
                                    'Créateur d\'expériences'
                                ]}
                                style={{
                                    fontSize: '1.5rem',
                                    marginBottom: '1.5rem',
                                    color: isDarkMode ? '#9ca3af' : '#6b7280'
                                }}
                            />
                            
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                                {user.bio || "Développeur passionné par la création d'applications web modernes et performantes"}
                            </p>
                            
                            <div className="flex justify-center gap-4 flex-wrap">
                                <button
                                    onClick={() => scrollToSection(projectsRef)}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
                                >
                                    Voir mes projets
                                </button>
                                
                                <button
                                    onClick={() => scrollToSection(contactRef)}
                                    className="border-2 border-purple-600 text-purple-600 dark:text-purple-400 px-8 py-3 rounded-lg font-medium hover:bg-purple-600 hover:text-white transition-all"
                                >
                                    Me contacter
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section ref={aboutRef} className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">À propos de moi</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">Passionné par le code et l'innovation</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src={user.photo}
                                alt={user.name}
                                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                                onError={(e) => {
                                    e.currentTarget.src = '/portifolio_Yacine/images/profile-placeholder.jpg';
                                }}
                            />
                        </div>
                        
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Développeur Full Stack</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                {user.bio || "Passionné par le développement web moderne, je crée des applications performantes et innovantes en utilisant les dernières technologies."}
                            </p>
                            
                            <div className="flex gap-4 mb-6">
                                <a href="#" className="text-purple-600 hover:text-purple-800 text-2xl">
                                    <FaLinkedin />
                                </a>
                                <a href="#" className="text-purple-600 hover:text-purple-800 text-2xl">
                                    <FaGithub />
                                </a>
                            </div>

                            {user.cv && (
                                <a
                                    href={user.cv}
                                    download
                                    className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    <FaDownload />
                                    Télécharger mon CV
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section ref={projectsRef} className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Mes Projets</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">Découvrez mes réalisations récentes</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <div className="relative h-48">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        onError={() => handleImageError(project.id)}
                                    />
                                    {imageErrors.includes(project.id) && (
                                        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                            <span className="text-gray-500">Image non disponible</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                                    
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.stack.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <div className="flex gap-4">
                                        {project.github_link && (
                                            <a
                                                href={project.github_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
                                            >
                                                <FaGithub />
                                                Code
                                            </a>
                                        )}
                                        {project.demo_link && (
                                            <a
                                                href={project.demo_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
                                            >
                                                <FaExternalLinkAlt />
                                                Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section ref={skillsRef} className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Compétences</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">Technologies que je maîtrise</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills.map((skill) => (
                            <div
                                key={skill.id}
                                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">{skill.level}</span>
                                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                                            style={{
                                                width: skill.level === 'Expert' ? '90%' : 
                                                      skill.level === 'Avancé' ? '75%' : '60%'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section ref={contactRef} className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">Parlons de votre projet</p>
                    </div>
                    
                    <div className="max-w-2xl mx-auto">
                        <form onSubmit={handleFormSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Nom</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 dark:bg-gray-700"
                                    required
                                />
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 dark:bg-gray-700"
                                    required
                                />
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    rows={5}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 dark:bg-gray-700"
                                    required
                                />
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
                            >
                                Envoyer le message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p>&copy; 2024 {user.name}. Tous droits réservés.</p>
                </div>
            </footer>

            {/* Back to Top Button */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50"
                    >
                        <FaArrowUp />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className={`fixed bottom-8 left-8 p-4 rounded-lg shadow-lg z-50 ${
                            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                        } text-white`}
                    >
                        <div className="flex items-center gap-2">
                            {toast.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                            {toast.message}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StaticPortfolio;
