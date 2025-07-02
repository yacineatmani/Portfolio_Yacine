import { DashboardData } from '../types/dashboard';

export const mockDashboardData: DashboardData = {
  user: {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&fit=crop&facepad=1.5',
    cv_path: 'cv/john-doe-cv.pdf'
  },
  projects: [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Une plateforme e-commerce moderne avec gestion des commandes, paiements et administration complète.',
      technologies: 'React, TypeScript, Node.js, PostgreSQL',
      github_link: 'https://github.com/johndoe/ecommerce',
      demo_link: 'https://ecommerce-demo.vercel.app',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400&h=300'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Application de gestion de tâches avec collaboration en temps réel et notifications push.',
      technologies: 'Vue.js, Laravel, Redis, WebSocket',
      github_link: 'https://github.com/johndoe/taskmanager',
      demo_link: 'https://taskmanager-demo.vercel.app',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300'
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Dashboard météo avec prévisions détaillées, cartes interactives et alertes personnalisées.',
      technologies: 'React, Chart.js, OpenWeatherMap API',
      github_link: 'https://github.com/johndoe/weather-dashboard',
      demo_link: 'https://weather-demo.vercel.app',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300'
    }
  ],
  skills: [
    {
      id: 1,
      name: 'React',
      level: 'expert',
      category: 'Frontend'
    },
    {
      id: 2,
      name: 'TypeScript',
      level: 'confirmé',
      category: 'Frontend'
    },
    {
      id: 3,
      name: 'Node.js',
      level: 'confirmé',
      category: 'Backend'
    },
    {
      id: 4,
      name: 'PostgreSQL',
      level: 'confirmé',
      category: 'Database'
    },
    {
      id: 5,
      name: 'Docker',
      level: 'débutant',
      category: 'DevOps'
    },
    {
      id: 6,
      name: 'Figma',
      level: 'confirmé',
      category: 'Design'
    }
  ]
};
