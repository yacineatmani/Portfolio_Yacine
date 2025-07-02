import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { debounce } from 'lodash';
import { usePage, useForm } from '@inertiajs/react';
import { FaGithub, FaExternalLinkAlt, FaMoon, FaSun, FaArrowUp, FaCheckCircle, FaExclamationCircle, FaLinkedin, FaDownload } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

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

interface SharedData {
  user?: User;
  projects?: Project[];
  skills?: Skill[];
  experiences?: Experience[];
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

// Composant ErrorBoundary
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: string | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#ffe4e6', color: '#e11d48' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Une erreur est survenue</h2>
          <p>{this.state.error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '1rem', backgroundColor: '#8b5cf6', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }}
          >
            Recharger
          </button>
          <a href="mailto:support@example.com" style={{ marginTop: '0.5rem', display: 'inline-block', color: '#8b5cf6' }}>Contacter le support</a>
        </div>
      );
    }
    return this.props.children;
  }
}

const Home: React.FC = () => {
  const pageProps = usePage().props as SharedData;

  const user: User = pageProps.user || {
    id: 1,
    name: 'Yacine Atmani',
    email: 'yacine@example.com',
    cv: '/files/cv.pdf',
    avatar: 'photo.jpg',
    email_verified_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const projects: Project[] = pageProps.projects || [
    {
      id: 1,
      title: 'Projet Portfolio',
      description: 'Application portfolio moderne avec Laravel et React.',
      github_link: 'https://github.com/yacineatmani/portfolio',
      demo_link: 'https://portfolio.demo',
      image: '/images/projet1.jpg',
      stack: ['React', 'Laravel', 'Tailwind CSS'],
      challenges: 'Intégration frontend/backend moderne.',
      video: null,
    },
    {
      id: 2,
      title: 'Gestion de Tâches',
      description: 'Application de gestion de tâches avec temps réel.',
      github_link: 'https://github.com/yacineatmani/tasks',
      demo_link: 'https://tasks.demo',
      image: 'https://images.unsplash.com/photo-1721332153282-3be1f363074d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      stack: ['React', 'Node.js', 'Socket.IO'],
      challenges: 'Synchronisation temps réel entre utilisateurs.',
      video: null,
    },
  ];

  const skills: Skill[] = pageProps.skills || [
    { id: 1, name: 'React', level: 'expert' },
    { id: 2, name: 'Laravel', level: 'advanced' },
    { id: 3, name: 'Docker', level: 'intermediate' },
  ];

  const experiences: Experience[] = pageProps.experiences || [
    { id: 1, role: 'Développeur Web', company: 'TechCorp', period: '2023 - Présent', description: 'Développement de sites modernes avec React.', tech: ['React', 'Node.js'] },
    { id: 2, role: 'Stagiaire Backend', company: 'DevInc', period: '2022', description: 'Travail sur des API avec Laravel.', tech: ['Laravel', 'PHP'] },
    { id: 3, role: 'Freelance Développeur', company: 'Freelance', period: '2021 - 2022', description: 'Création de sites personnalisés pour clients.', tech: ['HTML', 'CSS', 'JavaScript'] },
    { id: 4, role: 'Assistant Développeur', company: 'StartUpX', period: '2020', description: 'Support sur des projets de start-up.', tech: ['Vue.js', 'MySQL'] },
  ];

  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    message: '',
  });
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message?: string } | null>(null);
  const [imageErrors, setImageErrors] = useState<number[]>([]);

  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme === 'dark' || (!storedTheme && prefersDark);
    setDarkMode(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme);
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
      gsap.fromTo(heroImage, { y: 0 }, { y: 50, ease: 'power1.out', scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true } });
    }

    const heroContent = heroRef.current?.querySelector('.hero-content');
    if (heroContent) {
      gsap.fromTo(heroContent, { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' });
    }

    const projectsTitle = projectsRef.current?.querySelector('.section-title');
    if (projectsTitle) {
      gsap.fromTo(projectsTitle, { opacity: 0, x: -50, rotate: -5 }, { opacity: 1, x: 0, rotate: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: projectsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } });
    }

    gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, index) => {
      const projectImage = card.querySelector('.project-image');
      if (projectImage) {
        gsap.fromTo(projectImage, { y: -20 }, { y: 20, ease: 'power1.out', scrollTrigger: { trigger: card, start: 'top 80%', end: 'bottom top', scrub: true } });
      }
      gsap.fromTo(card, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, delay: index * 0.2, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none reverse' } });
    });

    const skillsTitle = skillsRef.current?.querySelector('.section-title');
    if (skillsTitle) {
      gsap.fromTo(skillsTitle, { opacity: 0, x: 50, rotate: 5 }, { opacity: 1, x: 0, rotate: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: skillsRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } });
    }

    gsap.utils.toArray<HTMLElement>('.skill-card').forEach((card, index) => {
      gsap.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: index * 0.1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none reverse' } });
      const skillBar = card.querySelector('.skill-bar');
      if (skillBar) {
        gsap.fromTo(skillBar, { width: '0%' }, { width: skillBar.getAttribute('data-width') || '0%', duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none reverse' } });
      }
    });

    const experienceTitle = experienceRef.current?.querySelector('.section-title');
    if (experienceTitle) {
      gsap.fromTo(experienceTitle, { opacity: 0, x: -50, rotate: -5 }, { opacity: 1, x: 0, rotate: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: experienceRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } });
    }

    const aboutTitle = aboutRef.current?.querySelector('.about-title');
    if (aboutTitle) {
      gsap.fromTo(aboutTitle, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: aboutRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } });
    }

    const contactTitle = contactRef.current?.querySelector('.section-title');
    if (contactTitle) {
      gsap.fromTo(contactTitle, { opacity: 0, x: 50, rotate: 5 }, { opacity: 1, x: 0, rotate: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: contactRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } });
    }

    const contactForm = contactRef.current?.querySelector('.contact-form');
    if (contactForm) {
      gsap.fromTo(contactForm, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: contactRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } });
    }

    // Particules en mode sombre
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (canvas && isDarkMode) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        interface Particle {
          x: number;
          y: number;
          size: number;
          speedX: number;
          speedY: number;
        }

        const particles: Particle[] = [];
        for (let i = 0; i < 50; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
          });
        }

        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0 || p.x > canvas.width) p.speedX = -p.speedX;
            if (p.y < 0 || p.y > canvas.height) p.speedY = -p.speedY;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          });
          animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        gsap.to(canvas, { y: 50, ease: 'power1.out', scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom top', scrub: true } });
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    gsap.to('body', {
      background: newTheme ? 'linear-gradient(135deg, #1a202c, #2d3748)' : 'linear-gradient(135deg, #ffffff, #e6f0fa)',
      duration: 1.5,
      ease: 'power2.inOut',
    });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post('/contact', {
      onSuccess: () => {
        setToast({ type: 'success', message: 'Message envoyé !' });
        reset();
      },
      onError: () => setToast({ type: 'error', message: 'Erreur d’envoi.' }),
    });
  };

  const handleImageError = (projectId: number) => setImageErrors((prev) => [...prev, projectId]);

  const getImagePath = (image: string | null | undefined) => {
    if (!image) return '/images/placeholder.svg';
    
    // Si c'est déjà une URL complète, on la retourne
    if (image.startsWith('http') || image.startsWith('https')) {
      return image;
    }
    
    // Si ça commence par "/", on assume que c'est déjà un chemin correct
    if (image.startsWith('/')) {
      return image;
    }
    
    // Sinon, on construit le chemin vers storage
    return `/storage/${image}`;
  };

  return (
    <ErrorBoundary>
      <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden', background: isDarkMode ? 'linear-gradient(135deg, #1a202c, #2d3748)' : 'linear-gradient(135deg, #ffffff, #e6f0fa)', color: isDarkMode ? '#f3f4f6' : '#1f2937' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />

        {/* Bouton Mode Clair/Sombre */}
        <nav style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 50 }}>
          <motion.button
            onClick={toggleTheme}
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: isDarkMode ? '#8b5cf6' : '#1f2937',
              color: '#ffffff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s',
            }}
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </motion.button>
        </nav>

        {/* Bouton Remonter en Haut */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              onClick={scrollToTop}
              style={{
                position: 'fixed',
                bottom: '1rem',
                right: '1rem',
                padding: '0.75rem',
                borderRadius: '50%',
                backgroundColor: '#8b5cf6',
                color: '#ffffff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                zIndex: 50,
              }}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              exit={{ opacity: 0, scale: 0, rotate: -360 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>

{/* Hero Section */}
<section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10, padding: '1.5rem' }}>
  <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto', padding: '0 1.5rem' }}>
<img
  src={user.photo ? getImagePath(user.photo) : '/images/placeholder.png'}
  alt={user.name || "Profile"}
  className="hero-image"
  style={{
    width: '10rem',
    height: '10rem',
    borderRadius: '50%',
    margin: '0 auto',
    border: `2px solid ${isDarkMode ? '#a78bfa' : '#c4b5fd'}`,
    objectFit: 'cover',
  }}
  onError={(e) => {
    console.error("Erreur de chargement de l'image avatar:", e.currentTarget.src);
    // Essayer le placeholder local d'abord
    if (e.currentTarget.src !== '/images/placeholder.png') {
      e.currentTarget.src = '/images/placeholder.png';
    } else {
      // Si même le placeholder échoue, utiliser une image par défaut
      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDE2MCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iODAiIGN5PSI4MCIgcj0iODAiIGZpbGw9IiNFNUU3RUIiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjY4IiByPSIyNCIgZmlsbD0iIzlDQTNBRiIvPjxwYXRoIGQ9Ik04MCAyMEM0NC43IDE2NiA4MCA2NCA4MCA2NFM2MCA4MCA0NC43IDEwNiIgZmlsbD0iIzlDQTNBRiIvPjwvc3ZnPgo=';
    }
  }}
  onLoad={(e) => console.log('Image avatar chargée avec succès:', e.currentTarget.src)}
/>    
    <div className="hero-content" style={{ marginTop: '1.5rem' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: isDarkMode ? '#a78bfa' : '#8b5cf6' }}>{user.name}</h1>
      <p style={{ color: isDarkMode ? '#ffffff' : '#000000', maxWidth: '36rem', margin: '1rem auto', fontSize: '1.125rem' }}>
        Solutions web innovantes avec passion et précision.
      </p>
      <a
        href="/cv.pdf"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: '#8b5cf6',
          color: '#ffffff',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          marginTop: '1.5rem',
          transition: 'background-color 0.3s',
        }}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#7c3aed';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#8b5cf6';
        }}
      >
        <FaDownload size={16} />
        Télécharger mon CV
      </a>
    </div>
  </div>
</section>

        <hr style={{ borderColor: isDarkMode ? '#4b5563' : '#d1d5db', margin: '2rem 0' }} />

        {/* Projects Section */}
        <section ref={projectsRef} style={{ padding: '3rem 0', position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center', padding: '0 1.5rem' }}>
            <RotatingText
              texts={['Projets', 'Mes Réalisations', 'Portfolio']}
              style={{ fontSize: '2.25rem', fontWeight: 'bold', color: isDarkMode ? '#a78bfa' : '#8b5cf6' }}
            />
          </div>
          <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' }, '@media (min-width: 1024px)': { gridTemplateColumns: '1fr 1fr' } }}>
              {projects.map((project) => {
                const imagePath = getImagePath(project.image);
                const isImageError = imageErrors.includes(project.id);
                return (
                  <div
                    key={project.id}
                    className="project-card"
                    style={{
                      backgroundColor: isDarkMode ? '#2d3748' : '#ffffff',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
                      const projectImage = e.currentTarget.querySelector('.project-image');
                      if (projectImage) {
                        gsap.to(projectImage, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
                      }
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'power2.out' });
                      const projectImage = e.currentTarget.querySelector('.project-image');
                      if (projectImage) {
                        gsap.to(projectImage, { scale: 1, duration: 0.3, ease: 'power2.out' });
                      }
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        {!isImageError ? (
                          <img
                            src={imagePath}
                            alt={project.title}
                            className="project-image"
                            style={{ width: '100%', height: '8rem', objectFit: 'cover', borderRadius: '0.25rem' }}
                            onError={() => handleImageError(project.id)}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '8rem', backgroundColor: isDarkMode ? '#4b5563' : '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '0.25rem', color: isDarkMode ? '#d1d5db' : '#6b7280' }}>
                            Image non disponible
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: isDarkMode ? '#e0e7ff' : '#111827', marginBottom: '0.5rem' }}>{project.title}</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem', justifyContent: 'center' }}>
                          {(project.stack && project.stack.length > 0) ? project.stack.map((tech, i) => (
                            <span key={i} style={{ 
                              fontSize: '0.75rem', 
                              backgroundColor: isDarkMode ? '#4b5563' : '#e0e7ff', 
                              color: isDarkMode ? '#a78bfa' : '#8b5cf6', 
                              borderRadius: '9999px', 
                              padding: '0.25rem 0.75rem',
                              fontWeight: '500',
                              transition: 'all 0.2s ease',
                              cursor: 'default'
                            }}>
                              {tech.trim()}
                            </span>
                          )) : (
                            <span style={{ 
                              fontSize: '0.75rem', 
                              backgroundColor: isDarkMode ? '#374151' : '#f3f4f6', 
                              color: isDarkMode ? '#9ca3af' : '#6b7280', 
                              borderRadius: '9999px', 
                              padding: '0.25rem 0.75rem'
                            }}>
                              Technologies non spécifiées
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.875rem', color: isDarkMode ? '#d1d5db' : '#4b5563', marginBottom: '0.75rem', lineHeight: '1.5' }}>{project.description}</p>
                        {project.challenges && (
                          <p style={{ fontSize: '0.875rem', color: isDarkMode ? '#a78bfa' : '#8b5cf6', marginBottom: '0.75rem', fontStyle: 'italic' }}>
                            <strong>Défis :</strong> {project.challenges}
                          </p>
                        )}
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                          {project.github_link && (
                            <a 
                              href={project.github_link} 
                              style={{ 
                                color: '#8b5cf6', 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.5rem', 
                                fontSize: '0.875rem', 
                                fontWeight: '500', 
                                textDecoration: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.375rem',
                                border: `1px solid ${isDarkMode ? '#8b5cf6' : '#8b5cf6'}`,
                                transition: 'all 0.2s ease',
                                backgroundColor: 'transparent'
                              }} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#8b5cf6';
                                e.currentTarget.style.color = '#ffffff';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#8b5cf6';
                              }}
                            >
                              <FaGithub size={16} /> Code
                            </a>
                          )}
                          {project.demo_link && (
                            <a 
                              href={project.demo_link} 
                              style={{ 
                                color: '#ffffff', 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.5rem', 
                                fontSize: '0.875rem', 
                                fontWeight: '500', 
                                textDecoration: 'none',
                                padding: '0.5rem 1rem',
                                borderRadius: '0.375rem',
                                backgroundColor: '#8b5cf6',
                                transition: 'all 0.2s ease'
                              }} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#7c3aed';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#8b5cf6';
                                e.currentTarget.style.transform = 'translateY(0)';
                              }}
                            >
                              <FaExternalLinkAlt size={16} /> Voir le projet
                            </a>
                          )}
                        </div>
                        {project.video && (
                          <div style={{ marginTop: '0.75rem' }}>
                            <video src={project.video} autoPlay loop muted playsInline style={{ width: '100%', height: '6rem', objectFit: 'cover', borderRadius: '0.25rem', opacity: 0.9 }}>
                              <source src={project.video} type="video/mp4" />
                              Votre navigateur ne supporte pas la lecture de vidéos.
                            </video>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <hr style={{ borderColor: isDarkMode ? '#4b5563' : '#d1d5db', margin: '2rem 0' }} />

        {/* Skills Section */}
        <section ref={skillsRef} style={{ padding: '3rem 0', position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center', padding: '0 1.5rem' }}>
            <RotatingText
              texts={['Compétences', 'Mes Skills', 'Expertises']}
              style={{ fontSize: '2.25rem', fontWeight: 'bold', color: isDarkMode ? '#a78bfa' : '#8b5cf6' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', maxWidth: '72rem', margin: '1.5rem auto 0', padding: '0 1.5rem', '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr 1fr' } }}>
            {skills.map((skill) => (
              <div key={skill.id} className="skill-card" style={{ backgroundColor: isDarkMode ? '#2d3748' : '#ffffff', borderRadius: '0.5rem', padding: '0.75rem', margin: '0 auto', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', justifyContent: 'center' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: isDarkMode ? '#e0e7ff' : '#111827' }}>{skill.name}</h3>
                </div>
                <div style={{ width: '100%', backgroundColor: isDarkMode ? '#4b5563' : '#e5e7eb', borderRadius: '9999px', height: '0.5rem' }}>
                  <div
                    className="skill-bar"
                    style={{
                      backgroundColor: isDarkMode ? '#a78bfa' : '#8b5cf6',
                      height: '0.5rem',
                      borderRadius: '9999px',
                      width: skill.level === 'expert' ? '90%' : skill.level === 'advanced' ? '70%' : skill.level === 'intermediate' ? '50%' : '30%',
                    }}
                    data-width={skill.level === 'expert' ? '90%' : skill.level === 'advanced' ? '70%' : skill.level === 'intermediate' ? '50%' : '30%'}
                  />
                </div>
                <p style={{ fontSize: '0.75rem', color: isDarkMode ? '#d1d5db' : '#6b7280', marginTop: '0.5rem', textAlign: 'center', textTransform: 'capitalize' }}>{skill.level}</p>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ borderColor: isDarkMode ? '#4b5563' : '#d1d5db', margin: '2rem 0' }} />

        {/* Experience Section */}
        <section ref={experienceRef} style={{ padding: '4rem 0', position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center', padding: '0 1rem' }}>
            <FallingText text="Expérience" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: isDarkMode ? '#a78bfa' : '#8b5cf6' }} speed={5} />
            <div style={{ width: '100%', maxWidth: '12.5rem', borderRadius: '0.5rem', backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(224, 231, 255, 0.5)', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', border: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`, padding: '0.5rem 1rem', margin: '1.5rem auto', transition: 'transform 0.3s' }}>
              <RotatingText
                texts={['Expérience']}
                style={{ fontSize: '1.5rem', fontWeight: '500', color: isDarkMode ? '#a78bfa' : '#8b5cf6' }}
                interval={2000}
              />
            </div>
          </div>
          <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 1rem', position: 'relative' }}>
            <div style={{ backgroundColor: isDarkMode ? '#4b5563' : '#d1d5db', height: '0.25rem', width: '100%', position: 'absolute', left: 0 }}></div>
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '3rem',
                  flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                  justifyContent: 'center',
                }}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div style={{ width: '41.666667%', padding: '0 1rem' }}>
                  <div style={{ backgroundColor: isDarkMode ? '#2d3748' : '#ffffff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', border: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`, textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: isDarkMode ? '#e0e7ff' : '#111827' }}>{exp.role}</h3>
                    <p style={{ fontSize: '1rem', color: isDarkMode ? '#a78bfa' : '#8b5cf6', fontWeight: '500', marginBottom: '0.5rem' }}>{exp.company} | {exp.period}</p>
                    <p style={{ fontSize: '1rem', color: isDarkMode ? '#d1d5db' : '#4b5563', marginBottom: '1rem' }}>{exp.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                      {exp.tech.map((tech, i) => (
                        <span key={i} style={{ fontSize: '0.875rem', backgroundColor: isDarkMode ? '#4b5563' : '#e0e7ff', color: isDarkMode ? '#a78bfa' : '#8b5cf6', borderRadius: '9999px', padding: '0.25rem 0.75rem' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ width: '16.666667%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 10 }}>
                  <div style={{ backgroundColor: isDarkMode ? '#a78bfa' : '#8b5cf6', width: '1rem', height: '1rem', borderRadius: '50%' }}></div>
                </div>
                <div style={{ width: '41.666667%' }}></div>
              </motion.div>
            ))}
          </div>
        </section>

        <hr style={{ borderColor: isDarkMode ? '#4b5563' : '#d1d5db', margin: '2rem 0' }} />

        {/* About Section */}
        <section ref={aboutRef} style={{ padding: '6rem 0', position: 'relative', zIndex: 10, minHeight: '37.5rem' }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center', padding: '0 1.5rem' }}>
            <FallingText text="Découvrez mon univers" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: isDarkMode ? '#a78bfa' : '#8b5cf6' }} speed={5} />
            <p style={{ color: isDarkMode ? '#d1d5db' : '#4b5563', marginTop: '1.5rem', maxWidth: '32rem', margin: '0 auto' }}>
              Passionné par le développement web, je crée des solutions innovantes avec une attention particulière au détail et à l’expérience utilisateur.
            </p>
          </div>
        </section>

        <hr style={{ borderColor: isDarkMode ? '#4b5563' : '#d1d5db', margin: '2rem 0' }} />

        {/* Contact Section */}
        <section ref={contactRef} style={{ padding: '3rem 0', position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center', padding: '0 1.5rem' }}>
            <RotatingText
              texts={['Contact', 'Me Contacter', 'Échangeons']}
              style={{ fontSize: '2.25rem', fontWeight: 'bold', color: isDarkMode ? '#a78bfa' : '#8b5cf6' }}
            />
          </div>
          <div className="contact-form" style={{ maxWidth: '32rem', margin: '0 auto', backgroundColor: isDarkMode ? '#2d3748' : '#ffffff', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', position: 'relative', zIndex: 20, marginTop: '1.5rem', textAlign: 'center' }}>
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
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <input
                  type="text"
                  placeholder="Nom"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`, borderRadius: '0.25rem', backgroundColor: isDarkMode ? '#2d3748' : '#ffffff', color: isDarkMode ? '#ffffff' : '#000000', textAlign: 'center' }}
                  required
                />
                {errors.name && <p style={{ color: '#e11d48', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`, borderRadius: '0.25rem', backgroundColor: isDarkMode ? '#2d3748' : '#ffffff', color: isDarkMode ? '#ffffff' : '#000000', textAlign: 'center' }}
                  required
                />
                {errors.email && <p style={{ color: '#e11d48', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email}</p>}
              </div>
              <div>
                <textarea
                  placeholder="Votre message"
                  value={data.message}
                  onChange={(e) => setData('message', e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`, borderRadius: '0.25rem', backgroundColor: isDarkMode ? '#2d3748' : '#ffffff', color: isDarkMode ? '#ffffff' : '#000000', textAlign: 'center', height: '6rem' }}
                  required
                />
                {errors.message && <p style={{ color: '#e11d48', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={processing}
                style={{
                  width: '100%',
                  backgroundColor: '#8b5cf6',
                  color: '#ffffff',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.25rem',
                  border: 'none',
                  cursor: processing ? 'not-allowed' : 'pointer',
                  opacity: processing ? 0.5 : 1,
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => !processing && (e.currentTarget.style.backgroundColor = '#7c3aed')}
                onMouseLeave={(e) => !processing && (e.currentTarget.style.backgroundColor = '#8b5cf6')}
              >
                {processing ? (
                  <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ display: 'inline-block', width: '1rem', height: '1rem', border: '2px solid transparent', borderTop: '2px solid #ffffff', borderRadius: '50%' }}
                  />
                ) : 'Envoyer'}
              </button>
            </form>
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <a href="https://github.com/yacineatmani" target="_blank" rel="noopener noreferrer" style={{ color: isDarkMode ? '#a78bfa' : '#8b5cf6', transition: 'color 0.3s' }}>
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/yacine-atmani" target="_blank" rel="noopener noreferrer" style={{ color: isDarkMode ? '#a78bfa' : '#8b5cf6', transition: 'color 0.3s' }}>
              <FaLinkedin size={24} />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: '1.5rem 0', textAlign: 'center', backgroundColor: isDarkMode ? '#1f2937' : '#f3f4f6' }}>
          <p style={{ color: isDarkMode ? '#d1d5db' : '#6b7280', fontSize: '0.75rem' }}>© {new Date().getFullYear()} Yacine Atmani. Tous droits réservés.</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default Home;