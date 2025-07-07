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
        photo: '/portifolio_Yacine/images/profile-placeholder.jpg', // Image de test statique
        cv: dataImport.user.cv ? `/portifolio_Yacine/storage/${dataImport.user.cv}` : '/portifolio_Yacine/cv.pdf'
    },
    projects: dataImport.projects.map((project, index) => ({
        ...project,
        image: '/portifolio_Yacine/images/project-placeholder.jpg' // Image de test statique pour tous
    })),
    skills: dataImport.skills,
    experiences: dataImport.experiences || []
};

// Debug pour vérifier les chemins
console.log('🔍 Debug StaticData:', {
    userPhoto: staticData.user.photo,
    firstProjectImage: staticData.projects[0]?.image,
    totalProjects: staticData.projects.length
});

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

interface FallingTextProps {
    text: string;
    style: React.CSSProperties;
    speed?: number;
}

// Composant FallingText
const FallingText: React.FC<FallingTextProps> = ({ text, style, speed = 2 }) => {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = textRef.current;
        if (element) {
            gsap.fromTo(
                element,
                { y: -100, opacity: 0 },
                {
                    y: 600,
                    opacity: 1,
                    duration: speed,
                    ease: 'power1.inOut',
                    repeat: -1,
                    yoyo: true,
                },
            );
        }
    }, [text, speed]);

    return (
        <div ref={textRef} style={style}>
            {text}
        </div>
    );
};

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
        
        // Animation du background avec GSAP
        gsap.to('body', {
            background: initialTheme ? 'linear-gradient(135deg, #1a202c, #2d3748)' : 'linear-gradient(135deg, #ffffff, #e6f0fa)',
            duration: 1.5,
            ease: 'power2.inOut',
        });

        const handleScroll = debounce(() => {
            setShowBackToTop(window.scrollY > 200);
        }, 16);
        window.addEventListener('scroll', handleScroll);

        // Animations GSAP
        const heroImage = heroRef.current?.querySelector('.hero-image');
        if (heroImage) {
            gsap.fromTo(
                heroImage,
                { y: 0 },
                { y: 50, ease: 'power1.out', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } },
            );
        }

        const heroContent = heroRef.current?.querySelector('.hero-content');
        if (heroContent) {
            gsap.fromTo(heroContent, { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' });
        }

        const projectsTitle = projectsRef.current?.querySelector('.section-title');
        if (projectsTitle) {
            gsap.fromTo(
                projectsTitle,
                { opacity: 0, x: -50, rotate: -5 },
                {
                    opacity: 1,
                    x: 0,
                    rotate: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: projectsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
                },
            );
        }

        gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, index) => {
            const projectImage = card.querySelector('.project-image');
            if (projectImage) {
                gsap.fromTo(
                    projectImage,
                    { y: -20 },
                    { y: 20, ease: 'power1.out', scrollTrigger: { trigger: card, start: 'top 80%', end: 'bottom top', scrub: true } },
                );
            }
            gsap.fromTo(
                card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none reverse' },
                },
            );
        });

        const skillsTitle = skillsRef.current?.querySelector('.section-title');
        if (skillsTitle) {
            gsap.fromTo(
                skillsTitle,
                { opacity: 0, x: 50, rotate: 5 },
                {
                    opacity: 1,
                    x: 0,
                    rotate: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: skillsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
                },
            );
        }

        gsap.utils.toArray<HTMLElement>('.skill-card').forEach((card, index) => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none reverse' },
                },
            );
            const skillBar = card.querySelector('.skill-bar');
            if (skillBar) {
                gsap.fromTo(
                    skillBar,
                    { width: '0%' },
                    {
                        width: skillBar.getAttribute('data-width') || '0%',
                        duration: 1.5,
                        ease: 'power2.out',
                        scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none reverse' },
                    },
                );
            }
        });

        const experienceTitle = experienceRef.current?.querySelector('.section-title');
        if (experienceTitle) {
            gsap.fromTo(
                experienceTitle,
                { opacity: 0, x: -50, rotate: -5 },
                {
                    opacity: 1,
                    x: 0,
                    rotate: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: experienceRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
                },
            );
        }

        const aboutTitle = aboutRef.current?.querySelector('.about-title');
        if (aboutTitle) {
            gsap.fromTo(
                aboutTitle,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: aboutRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
                },
            );
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
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
                    <div className="text-center hero-content">
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
                        
                        {/* Hero Image */}
                        <div className="hero-image mt-12">
                            <img
                                src={user.photo}
                                alt={user.name}
                                className="mx-auto rounded-full w-64 h-64 object-cover border-8 border-purple-600/20"
                                onLoad={() => console.log('✅ Hero image loaded:', user.photo)}
                                onError={(e) => {
                                    console.log('❌ Hero image failed:', user.photo);
                                    console.log('🔄 Trying fallback...');
                                    e.currentTarget.src = '/portifolio_Yacine/images/profile-placeholder.jpg';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section ref={aboutRef} className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="about-title text-3xl md:text-4xl font-bold mb-4">À propos de moi</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">Passionné par le code et l'innovation</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src={user.photo}
                                alt={user.name}
                                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                                onLoad={() => console.log('✅ Profile image loaded:', user.photo)}
                                onError={(e) => {
                                    console.log('❌ Profile image failed:', user.photo);
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
                        <h2 className="section-title text-3xl md:text-4xl font-bold mb-4">Mes Projets</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">Découvrez mes réalisations récentes</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="project-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <div className="project-image relative h-48">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        onLoad={() => console.log('✅ Project image loaded:', project.title, project.image)}
                                        onError={() => {
                                            console.log('❌ Project image failed:', project.title, project.image);
                                            handleImageError(project.id);
                                        }}
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
                        <h2 className="section-title text-3xl md:text-4xl font-bold mb-4">Compétences</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">Technologies que je maîtrise</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills.map((skill) => {
                            const getSkillPercentage = (level: string) => {
                                switch (level.toLowerCase()) {
                                    case 'expert': return '90%';
                                    case 'avancé':
                                    case 'advanced': return '75%';
                                    case 'intermédiaire':
                                    case 'intermediate': return '60%';
                                    default: return '45%';
                                }
                            };
                            
                            return (
                                <div
                                    key={skill.id}
                                    className="skill-card bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">{skill.level}</span>
                                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                                className="skill-bar bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                                                data-width={getSkillPercentage(skill.level)}
                                                style={{ width: '0%' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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

export default StaticPortfolio;
