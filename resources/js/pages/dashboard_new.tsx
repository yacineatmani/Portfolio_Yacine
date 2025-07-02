import React, { useState } from 'react';
import { Head, useForm, PageProps, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { useSnackbar, withSnackbarProvider } from '../components/Notifier';
import { RippleButton } from '../components/RippleButton';
import ParticlesBackground from '../components/ParticlesBackground';
import { ProjectCard } from '../components/dashboard/ProjectCard';
import { SkillCard } from '../components/dashboard/SkillCard';
import { ProjectForm } from '../components/dashboard/ProjectForm';
import { SkillForm } from '../components/dashboard/SkillForm';
import '@/../css/dashboard.css';

interface User {
  id: number;
  name: string;
  email: string;
  photo?: string;
  cv_path?: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  github_link?: string;
  demo_link?: string;
  image?: string;
}

interface Skill {
  id: number;
  name: string;
  level: string;
  category: string;
  icon?: string;
}

interface DashboardPageProps extends PageProps {
  auth: { user: User };
  projects: Project[];
  skills: Skill[];
}

function Dashboard({ auth, projects = [], skills = [] }: DashboardPageProps) {
  const { user } = auth;
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const snackbar = useSnackbar();

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const cvForm = useForm({
    cv: null as File | null,
  });

  const handleCvUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvForm.data.cv) return;
    cvForm.post('/dashboard/cv', {
      forceFormData: true,
      onSuccess: () => {
        cvForm.reset('cv');
        snackbar.success('CV mis à jour !');
      },
      onError: () => snackbar.error('Erreur lors de la mise à jour du CV.'),
    });
  };

  const handleDeleteProject = (id: number) => {
    router.delete(`/projects/${id}`, {
      onSuccess: () => snackbar.success('Projet supprimé !'),
      onError: () => snackbar.error('Erreur lors de la suppression.'),
    });
  };

  const handleDeleteSkill = (id: number) => {
    router.delete(`/skills/${id}`, {
      onSuccess: () => snackbar.success('Compétence supprimée !'),
      onError: () => snackbar.error('Erreur lors de la suppression.'),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900 relative">
      <Head title="Dashboard" />
      <ParticlesBackground />

      {/* Bouton Dark/Light Mode */}
      <div className="fixed top-4 right-4 z-50">
        <motion.button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            darkMode ? 'bg-indigo-600' : 'bg-gray-800'
          }`}
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Basculer le mode sombre"
        >
          {darkMode ? <FaSun className="text-white" size={20} /> : <FaMoon className="text-white" size={20} />}
        </motion.button>
      </div>

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Topbar */}
      <Topbar 
        onMenuClick={() => setSidebarOpen(true)} 
        user={user} 
        isDarkMode={darkMode}
        toggleTheme={toggleDarkMode}
      />

      <div className="flex">
        {/* Sidebar verticale avec photo */}
        <aside
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-2xl border-r border-gray-200 dark:border-gray-700 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-6 space-y-6">
            {/* Photo de profil */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-75 animate-pulse"></div>
                <img
                  src={user.photo ? `/storage/${user.photo}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`}
                  alt="Photo de profil"
                  className="relative w-32 h-32 rounded-full object-cover shadow-xl bg-white border-4 border-white"
                />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-3">
              <a href="/">
                <RippleButton
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg rounded-2xl px-6 py-4 text-white font-semibold transition-all duration-300 flex items-center gap-3 justify-center transform hover:scale-105"
                  aria-label="Retour à l'accueil"
                >
                  <span className="material-icons">home</span>
                  Retour à l'accueil
                </RippleButton>
              </a>

              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <span className="material-icons text-indigo-600">dashboard</span>
                  Navigation
                </h4>
                <div className="space-y-2 text-sm">
                  <a href="#projects" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <span className="material-icons text-lg">work</span>
                    Mes Projets
                  </a>
                  <a href="#skills" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <span className="material-icons text-lg">psychology</span>
                    Mes Compétences
                  </a>
                  <a href="#cv" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <span className="material-icons text-lg">description</span>
                    Mon CV
                  </a>
                </div>
              </div>

              {/* Stats rapides */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <span className="material-icons text-indigo-600">analytics</span>
                  Statistiques
                </h4>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-3">
                    <div className="text-2xl font-bold text-indigo-600">{projects.length}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Projets</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-3">
                    <div className="text-2xl font-bold text-purple-600">{skills.length}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Compétences</div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 relative z-10 lg:ml-80">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            {/* Header avec bouton accueil plus visible */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300">Gérez votre portfolio professionnel</p>
              </div>
              <div className="flex gap-3">
                <a href="/">
                  <RippleButton
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg rounded-2xl px-8 py-4 text-white font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-105 text-lg"
                    aria-label="Retour à l'accueil"
                  >
                    <span className="material-icons text-xl">home</span>
                    <span>Accueil</span>
                  </RippleButton>
                </a>
                <a href="/profile">
                  <RippleButton
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg rounded-2xl px-6 py-4 text-white font-semibold transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                    aria-label="Mon profil"
                  >
                    <span className="material-icons">person</span>
                    <span>Profil</span>
                  </RippleButton>
                </a>
              </div>
            </div>

            {/* Profil Header moderne */}
            <div className="mb-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-75 animate-pulse"></div>
                    <img
                      src={user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`}
                      alt="Photo de profil"
                      className="relative w-28 h-28 rounded-full object-cover shadow-xl bg-white border-4 border-white"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3 justify-center md:justify-start">
                      <span className="material-icons text-indigo-600 text-4xl">person</span>
                      Bonjour, {user.name} 👋
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">Bienvenue dans votre espace d'administration</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu principal en grille */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Section principale (Projets et Compétences) */}
              <div className="xl:col-span-3 space-y-8">
                {/* Section Projets modernisée */}
                <section id="projects" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                          <span className="material-icons text-white">work</span>
                        </div>
                        Mes Projets
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">Gérez vos réalisations</p>
                    </div>
                    <RippleButton
                      onClick={() => setShowProjectForm(true)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg rounded-2xl px-6 py-3 text-white font-semibold transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                      aria-label="Ajouter un projet"
                    >
                      <span className="material-icons">add</span>
                      Nouveau Projet
                    </RippleButton>
                  </div>

                  {/* Grille des projets avec composants modulaires */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        onDelete={handleDeleteProject}
                      />
                    ))}
                    {projects.length === 0 && (
                      <div className="col-span-full text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                          <span className="material-icons text-2xl text-gray-400">work_off</span>
                        </div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun projet</h4>
                        <p className="text-gray-500 dark:text-gray-400">Créez votre premier projet pour commencer</p>
                      </div>
                    )}
                  </div>
                </section>

                {/* Section Compétences modernisée */}
                <section id="skills" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                          <span className="material-icons text-white">psychology</span>
                        </div>
                        Mes Compétences
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">Présentez vos talents</p>
                    </div>
                    <RippleButton
                      onClick={() => setShowSkillForm(true)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg rounded-2xl px-6 py-3 text-white font-semibold transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
                      aria-label="Ajouter une compétence"
                    >
                      <span className="material-icons">add</span>
                      Nouvelle Compétence
                    </RippleButton>
                  </div>

                  {/* Grille des compétences avec composants modulaires */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {skills.map((skill, index) => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                        index={index}
                        onDelete={handleDeleteSkill}
                      />
                    ))}
                    {skills.length === 0 && (
                      <div className="col-span-full text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                          <span className="material-icons text-2xl text-gray-400">psychology_off</span>
                        </div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucune compétence</h4>
                        <p className="text-gray-500 dark:text-gray-400">Ajoutez vos premières compétences</p>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Sidebar CV */}
              <aside className="xl:col-span-1">
                <div className="sticky top-24">
                  <section id="cv" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
                    <div className="text-center mb-8">
                      <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl inline-block mb-4">
                        <span className="material-icons text-white text-3xl">description</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Mon CV</h3>
                      <p className="text-gray-600 dark:text-gray-300">Gérez votre curriculum vitae</p>
                    </div>

                    <form onSubmit={handleCvUpload} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                          Nouveau CV (PDF)
                        </label>
                        <input
                          type="file"
                          onChange={(e) => cvForm.setData('cv', e.target.files ? e.target.files[0] : null)}
                          className="mt-2 block w-full text-gray-900 dark:text-white rounded-xl border border-gray-300 dark:border-gray-600 focus:border-indigo-500 p-3"
                          accept=".pdf,.doc,.docx"
                        />
                        {cvForm.errors.cv && (
                          <p className="text-red-500 text-sm mt-1">{cvForm.errors.cv}</p>
                        )}
                      </div>
                      <RippleButton
                        type="submit"
                        disabled={cvForm.processing || !cvForm.data.cv}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg rounded-2xl py-4 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Mettre à jour le CV"
                      >
                        <span className="material-icons">upload_file</span>
                        <span>Mettre à jour</span>
                      </RippleButton>
                    </form>

                    {user.cv_path && (
                      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/50">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
                            <span className="material-icons text-white text-lg">check_circle</span>
                          </div>
                          <span className="font-semibold text-emerald-800 dark:text-emerald-200">CV disponible</span>
                        </div>
                        <a
                          href={`/storage/${user.cv_path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 font-medium transition-colors"
                        >
                          <span className="material-icons text-lg">visibility</span>
                          <span>Voir mon CV</span>
                        </a>
                      </div>
                    )}
                  </section>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>

      {/* Formulaires Modaux */}
      <ProjectForm 
        isOpen={showProjectForm} 
        onClose={() => setShowProjectForm(false)} 
      />
      
      <SkillForm 
        isOpen={showSkillForm} 
        onClose={() => setShowSkillForm(false)} 
      />

      <Footer />
    </div>
  );
}

// Exporter le composant enveloppé avec le provider de notifications
export default withSnackbarProvider(Dashboard);
