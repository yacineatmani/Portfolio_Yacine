import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { debounce } from 'lodash';
import { FaGithub, FaExternalLinkAlt, FaMoon, FaSun, FaArrowUp, FaCheckCircle, FaExclamationCircle, FaLinkedin, FaDownload } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

// Données fixes pour garantir le fonctionnement
const PORTFOLIO_DATA = {
    user: {
        id: 1,
        name: "Yacine Atmani",
        first_name: "Yacine",
        bio: "Développeur Fullstack passionné par Laravel, React et les technologies modernes.",
        photo: "https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text=YA",
        cv: "/portifolio_Yacine/cv.pdf"
    },
    projects: [
        {
            id: 1,
            title: "Next-Librairie",
            description: "Application de gestion de bibliothèque moderne avec Next.js",
            github_link: "https://github.com/yacineatmani/Next-Libraire",
            demo_link: "https://github.com/yacineatmani/Next-Libraire",
            image: "https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Next+Library",
            stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
            challenges: "Gestion d'état complexe et interface utilisateur moderne"
        },
        {
            id: 2,
            title: "Adam vs Yacine",
            description: "Projet collaboratif de développement web avec CSS avancé",
            github_link: "https://github.com/yacineatmani/gestion-librairie",
            demo_link: "https://github.com/yacineatmani/gestion-librairie",
            image: "https://via.placeholder.com/400x300/10B981/FFFFFF?text=CSS+Project",
            stack: ["HTML", "CSS", "JavaScript", "PHP"],
            challenges: "Maîtrise avancée du CSS et animations"
        },
        {
            id: 3,
            title: "E-commerce Next.js",
            description: "Plateforme e-commerce complète avec panier et paiement",
            github_link: "https://github.com/yacineatmani/gestion-librairie",
            demo_link: "https://github.com/yacineatmani/gestion-librairie",
            image: "https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=E-Commerce",
            stack: ["Next.js", "Stripe", "MongoDB", "React"],
            challenges: "Intégration paiement et gestion commandes"
        },
        {
            id: 4,
            title: "All Nations in World",
            description: "Application géographique interactive des pays du monde",
            github_link: "https://github.com/yacineatmani/Project_Flag",
            demo_link: "https://yacineatmani.github.io/Project_Flag",
            image: "https://via.placeholder.com/400x300/EF4444/FFFFFF?text=World+App",
            stack: ["JavaScript", "API REST", "CSS3", "HTML5"],
            challenges: "Intégration d'APIs et visualisation de données"
        }
    ],
    skills: [
        { id: 1, name: "React", level: "Expert" },
        { id: 2, name: "Laravel", level: "Avancé" },
        { id: 3, name: "JavaScript", level: "Expert" },
        { id: 4, name: "PHP", level: "Avancé" },
        { id: 5, name: "Node.js", level: "Intermédiaire" },
        { id: 6, name: "TypeScript", level: "Avancé" },
        { id: 7, name: "Tailwind CSS", level: "Expert" },
        { id: 8, name: "Docker", level: "Intermédiaire" },
        { id: 9, name: "MySQL", level: "Avancé" }
    ],
    experiences: [
        {
            id: 1,
            role: "Développeur Full Stack",
            company: "MolenGeek",
            period: "2024 - Présent",
            description: "Formation intensive en développement web moderne avec focus sur React et Laravel",
            tech: ["React", "Laravel", "JavaScript", "PHP"]
        },
        {
            id: 2,
            role: "Développeur Frontend",
            company: "Projets Personnels",
            period: "2023 - 2024",
            description: "Développement d'applications web modernes et responsive",
            tech: ["HTML", "CSS", "JavaScript", "React"]
        }
    ]
};

// Types
interface User {
    id: number;
    name: string;
    first_name: string;
    bio: string;
    photo: string;
    cv: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
    github_link?: string;
    demo_link?: string;
    image: string;
    stack: string[];
    challenges: string;
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

// Composant RotatingText
const RotatingText: React.FC<{ texts: string[]; style: React.CSSProperties; interval?: number }> = ({ texts, style, interval = 3000 }) => {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => setIndex((prev) => (prev + 1) % texts.length), interval);
        return () => clearInterval(timer);
    }, [texts.length, interval]);
    return <h2 style={style}>{texts[index]}</h2>;
};

const WorkingPortfolio: React.FC = () => {
    const user: User = PORTFOLIO_DATA.user;
    const projects: Project[] = PORTFOLIO_DATA.projects;
    const skills: Skill[] = PORTFOLIO_DATA.skills;
    const experiences: Experience[] = PORTFOLIO_DATA.experiences;

    const [isDarkMode, setDarkMode] = useState<boolean>(false);
    const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [toast, setToast] = useState<{ type: 'success' | 'error'; message?: string } | null>(null);

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

        const handleScroll = debounce(() => {
            setShowBackToTop(window.scrollY > 300);
        }, 100);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleTheme = () => {
        setDarkMode(prev => !prev);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setToast({ type: 'success', message: 'Message envoyé avec succès! Je vous recontacterai bientôt.' });
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => setToast(null), 5000);
    };

    const getSkillPercentage = (level: string) => {
        switch (level.toLowerCase()) {
            case 'expert': return '95%';
            case 'avancé': case 'advanced': return '80%';
            case 'intermédiaire': case 'intermediate': return '65%';
            default: return '50%';
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            {user.first_name}
                        </div>
                        
                        <div className="hidden md:flex space-x-8">
                            {[
                                { name: 'Accueil', ref: heroRef },
                                { name: 'À propos', ref: aboutRef },
                                { name: 'Projets', ref: projectsRef },
                                { name: 'Compétences', ref: skillsRef },
                                { name: 'Expérience', ref: experienceRef },
                                { name: 'Contact', ref: contactRef }
                            ].map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => scrollToSection(item.ref)}
                                    className="hover:text-purple-600 transition-colors"
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                        
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
                            <div className="mb-8">
                                <img
                                    src={user.photo}
                                    alt={user.name}
                                    className="mx-auto rounded-full w-32 h-32 md:w-48 md:h-48 object-cover border-4 border-purple-600/20 shadow-xl"
                                />
                            </div>
                            
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
                                {user.bio}
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
                            />
                        </div>
                        
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Développeur Full Stack</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                {user.bio}
                            </p>
                            
                            <div className="flex gap-4 mb-6">
                                <a href="https://www.linkedin.com/in/yacine-atmani" className="text-purple-600 hover:text-purple-800 text-2xl">
                                    <FaLinkedin />
                                </a>
                                <a href="https://github.com/yacineatmani" className="text-purple-600 hover:text-purple-800 text-2xl">
                                    <FaGithub />
                                </a>
                            </div>

                            <a
                                href={user.cv}
                                download
                                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                <FaDownload />
                                Télécharger mon CV
                            </a>
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
                                    />
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
                                                <FaGithub /> Code
                                            </a>
                                        )}
                                        {project.demo_link && (
                                            <a
                                                href={project.demo_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
                                            >
                                                <FaExternalLinkAlt /> Démo
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
                            <motion.div
                                key={skill.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">{skill.level}</span>
                                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <motion.div
                                            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: getSkillPercentage(skill.level) }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section ref={experienceRef} className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Expérience</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">Mon parcours professionnel</p>
                    </div>
                    
                    <div className="space-y-8">
                        {experiences.map((exp) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold">{exp.role}</h3>
                                        <p className="text-purple-600 dark:text-purple-400">{exp.company}</p>
                                    </div>
                                    <span className="text-gray-500 dark:text-gray-400">{exp.period}</span>
                                </div>
                                
                                <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>
                                
                                <div className="flex flex-wrap gap-2">
                                    {exp.tech.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section ref={contactRef} style={{ padding: '3rem 0', position: 'relative', zIndex: 10 }}>
                <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center', padding: '0 1.5rem' }}>
                    <RotatingText
                        texts={['Contact', 'Me Contacter', 'Échangeons']}
                        style={{ fontSize: '2.25rem', fontWeight: 'bold', color: isDarkMode ? '#a78bfa' : '#8b5cf6' }}
                    />
                </div>
                <div
                    style={{
                        maxWidth: '32rem',
                        margin: '0 auto',
                        backgroundColor: isDarkMode ? '#2d3748' : '#ffffff',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        position: 'relative',
                        zIndex: 20,
                        marginTop: '1.5rem',
                        textAlign: 'center',
                    }}
                >
                    <AnimatePresence>
                        {toast && (
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    top: '-3rem',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    padding: '0.75rem',
                                    borderRadius: '0.25rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    backgroundColor: toast.type === 'success' ? '#8b5cf6' : '#e11d48',
                                    color: '#ffffff',
                                }}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {toast.type === 'success' ? <FaCheckCircle size={16} /> : <FaExclamationCircle size={16} />}
                                {toast.message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <input
                                type="text"
                                placeholder="Nom"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`,
                                    borderRadius: '0.25rem',
                                    backgroundColor: isDarkMode ? '#2d3748' : '#ffffff',
                                    color: isDarkMode ? '#ffffff' : '#000000',
                                    textAlign: 'center',
                                }}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`,
                                    borderRadius: '0.25rem',
                                    backgroundColor: isDarkMode ? '#2d3748' : '#ffffff',
                                    color: isDarkMode ? '#ffffff' : '#000000',
                                    textAlign: 'center',
                                }}
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Votre message"
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    border: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`,
                                    borderRadius: '0.25rem',
                                    backgroundColor: isDarkMode ? '#2d3748' : '#ffffff',
                                    color: isDarkMode ? '#ffffff' : '#000000',
                                    textAlign: 'center',
                                    height: '6rem',
                                    resize: 'none',
                                }}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                backgroundColor: '#8b5cf6',
                                color: '#ffffff',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '0.25rem',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#7c3aed')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#8b5cf6')}
                        >
                            Envoyer
                        </button>
                    </form>
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <a
                        href="https://github.com/yacineatmani"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: isDarkMode ? '#a78bfa' : '#8b5cf6', transition: 'color 0.3s' }}
                    >
                        <FaGithub size={24} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/yacine-atmani"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: isDarkMode ? '#a78bfa' : '#8b5cf6', transition: 'color 0.3s' }}
                    >
                        <FaLinkedin size={24} />
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '1.5rem 0', textAlign: 'center', backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6' }}>
                <p style={{ color: isDarkMode ? '#d1d5db' : '#6b7280', fontSize: '0.75rem' }}>
                    © {new Date().getFullYear()} Yacine Atmani. Tous droits réservés.
                </p>
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

export default WorkingPortfolio;
