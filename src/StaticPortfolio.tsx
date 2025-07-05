import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { debounce } from 'lodash';
import { FaGithub, FaExternalLinkAlt, FaMoon, FaSun, FaArrowUp, FaCheckCircle, FaExclamationCircle, FaLinkedin, FaDownload } from 'react-icons/fa';
import dataImport from './data.json';

gsap.registerPlugin(ScrollTrigger);

// Adapter les chemins d'images pour GitHub Pages
const staticData = {
    ...dataImport,
    user: {
        ...dataImport.user,
        photo: dataImport.user.photo ? `/portifolio_Yacine/storage/${dataImport.user.photo}` : '/portifolio_Yacine/images/profile-placeholder.jpg',
        cv: dataImport.user.cv ? `/portifolio_Yacine/storage/${dataImport.user.cv}` : '/portifolio_Yacine/cv.pdf'
    },
    projects: dataImport.projects.map(project => ({
        ...project,
        image: project.image ? `/portifolio_Yacine/storage/${project.image}` : '/portifolio_Yacine/images/project-placeholder.jpg'
    }))
};

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

interface RotatingTextProps {
  texts: string[];
  style: React.CSSProperties;
  interval?: number;
}

interface FallingTextProps {
  text: string;
  style: React.CSSProperties;
  speed?: number;
}

// Composant RotatingText
const RotatingText: React.FC<RotatingTextProps> = ({ texts, style, interval = 3000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % texts.length), interval);
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return <h2 style={style}>{texts[index]}</h2>;
};

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
        }
      );
    }
  }, [text, speed]);

  return <div ref={textRef} style={style}>{text}</div>;
};

const StaticPortfolio: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Utilisation des données statiques
  const user = staticData.user;
  const projects = staticData.projects;
  const skills = staticData.skills;
  const experiences = staticData.experiences;

  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Theme toggle
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  // Scroll handling
  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 300);

      // Update active section
      const sections = [
        { ref: aboutRef, name: 'about' },
        { ref: projectsRef, name: 'projects' },
        { ref: skillsRef, name: 'skills' },
        { ref: experienceRef, name: 'experience' },
        { ref: contactRef, name: 'contact' }
      ];

      const current = sections.find(section => {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current.name);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animations
  useEffect(() => {
    // Animate sections on scroll
    gsap.fromTo('.animate-on-scroll', 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.animate-on-scroll',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Parallax effect for hero section
    gsap.to('.parallax-bg', {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Contact form handling (static version)
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('loading');
    
    // Simulate form submission for static version
    setTimeout(() => {
      setContactStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setContactStatus('idle'), 3000);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Utility function for safe image loading
  const getImageUrl = (imagePath: string | null | undefined): string => {
    if (!imagePath) return '/images/placeholder.svg';
    
    // For static hosting, ensure all paths start with base path
    const basePath = import.meta.env.BASE_URL || '/';
    if (imagePath.startsWith('/')) {
      return basePath + imagePath.substring(1);
    }
    return basePath + imagePath;
  };

  const getCvUrl = (): string => {
    const basePath = import.meta.env.BASE_URL || '/';
    return basePath + 'cv.pdf';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              {user?.first_name || 'Portfolio'}
            </motion.div>

            <div className="hidden md:flex space-x-8">
              {[
                { name: 'À propos', ref: aboutRef, id: 'about' },
                { name: 'Projets', ref: projectsRef, id: 'projects' },
                { name: 'Compétences', ref: skillsRef, id: 'skills' },
                { name: 'Expérience', ref: experienceRef, id: 'experience' },
                { name: 'Contact', ref: contactRef, id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.ref)}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400 ${
                    activeSection === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
              </button>

              <a
                href={getCvUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <FaDownload className="w-4 h-4" />
                <span>CV</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            {user?.photo && (
              <img
                src={getImageUrl(user.photo)}
                alt={user.name}
                className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-white dark:border-gray-700 shadow-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder.svg';
                }}
              />
            )}
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {user?.name || 'Développeur Full Stack'}
              </span>
            </h1>
            
            <RotatingText
              texts={[
                "Développeur React & Laravel",
                "Créateur d'expériences web",
                "Passionné de technologie"
              ]}
              style={{
                fontSize: '1.5rem',
                color: isDarkMode ? '#9CA3AF' : '#6B7280',
                marginBottom: '2rem'
              }}
            />
            
            {user?.bio && (
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                {user.bio}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => scrollToSection(projectsRef)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Voir mes projets
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg font-medium transition-colors duration-200"
            >
              Me contacter
            </button>
          </motion.div>
        </div>

        {/* Floating text animation */}
        <div className="absolute inset-0 pointer-events-none">
          <FallingText
            text="React"
            style={{
              position: 'absolute',
              left: '10%',
              top: '20%',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: isDarkMode ? '#60A5FA' : '#3B82F6',
              opacity: 0.3
            }}
            speed={4}
          />
          <FallingText
            text="Laravel"
            style={{
              position: 'absolute',
              right: '15%',
              top: '30%',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: isDarkMode ? '#A78BFA' : '#8B5CF6',
              opacity: 0.3
            }}
            speed={3}
          />
          <FallingText
            text="TypeScript"
            style={{
              position: 'absolute',
              left: '20%',
              top: '70%',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: isDarkMode ? '#34D399' : '#10B981',
              opacity: 0.3
            }}
            speed={5}
          />
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-4 sm:px-6 lg:px-8 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              À propos de moi
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Passionné par le développement web moderne
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {user?.bio || "Développeur Full Stack avec une expertise en React et Laravel, je créé des applications web performantes et des expériences utilisateur exceptionnelles."}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Mon approche combine créativité et rigueur technique pour livrer des solutions innovantes qui répondent aux besoins spécifiques de chaque projet.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/yacineatmani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <FaGithub className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/yacine-atmani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <FaLinkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {user?.photo && (
                <div className="relative">
                  <img
                    src={getImageUrl(user.photo)}
                    alt={user.name}
                    className="rounded-2xl shadow-2xl"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-purple-600/20"></div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mes Projets
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-6 max-w-3xl mx-auto">
              Découvrez une sélection de mes réalisations, alliant créativité et expertise technique
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects && projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={getImageUrl(project.image)}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors duration-200"
                      >
                        <FaGithub className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.demo_link && (
                      <a
                        href={project.demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <FaExternalLinkAlt className="w-4 h-4" />
                        <span>Demo</span>
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
      <section ref={skillsRef} className="py-20 px-4 sm:px-6 lg:px-8 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Compétences
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills && skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {skill.name}
                  </h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    skill.level === 'Expert' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : skill.level === 'Avancé'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  }`}>
                    {skill.level}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expérience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="space-y-8">
            {experiences && experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {exp.role}
                    </h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 font-medium mt-2 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {exp.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
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
      <section ref={contactRef} className="py-20 px-4 sm:px-6 lg:px-8 animate-on-scroll">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Contactez-moi
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-6">
              Une idée de projet ? Discutons-en !
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8"
          >
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={contactStatus === 'loading'}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  {contactStatus === 'loading' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Envoi...</span>
                    </>
                  ) : (
                    <span>Envoyer le message</span>
                  )}
                </button>
              </div>

              <AnimatePresence>
                {contactStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400"
                  >
                    <FaCheckCircle />
                    <span>Message envoyé avec succès !</span>
                  </motion.div>
                )}
                {contactStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400"
                  >
                    <FaExclamationCircle />
                    <span>Erreur lors de l'envoi. Veuillez réessayer.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              © 2024 {user?.name || 'Yacine Atmani'}. Tous droits réservés.
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/yacineatmani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/yacine-atmani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors duration-200 z-50"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StaticPortfolio;
