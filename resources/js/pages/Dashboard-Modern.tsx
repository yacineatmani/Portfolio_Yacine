import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { Plus, FileText, Upload, Menu, Sun, Moon, Settings } from 'lucide-react';
import { useSnackbar, withSnackbarProvider } from '../components/Notifier';
import { ProjectCard } from '../components/dashboard/ProjectCard';
import { SkillCard } from '../components/dashboard/SkillCard';
import { ProjectForm } from '../components/dashboard/ProjectForm';
import { SkillForm } from '../components/dashboard/SkillForm';

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

interface DashboardPageProps {
  auth: { user: User };
  projects: Project[];
  skills: Skill[];
}

function Dashboard({ auth, projects = [], skills = [] }: DashboardPageProps) {
  const { user } = auth;
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' || 
             (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const snackbar = useSnackbar();

  // Initialize dark mode on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleDeleteProject = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      router.delete(`/projects/${id}`, {
        onSuccess: () => snackbar.success('Projet supprimé avec succès !'),
        onError: () => snackbar.error('Erreur lors de la suppression.'),
      });
    }
  };

  const handleDeleteSkill = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
      router.delete(`/skills/${id}`, {
        onSuccess: () => snackbar.success('Compétence supprimée avec succès !'),
        onError: () => snackbar.error('Erreur lors de la suppression.'),
      });
    }
  };

  const handleCvUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (cvFile) {
      const formData = new FormData();
      formData.append('cv', cvFile);
      
      router.post('/dashboard/cv', formData, {
        forceFormData: true,
        onSuccess: () => {
          setCvFile(null);
          snackbar.success('CV mis à jour avec succès !');
        },
        onError: () => snackbar.error('Erreur lors de la mise à jour du CV.'),
      });
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors ${darkMode ? 'dark' : ''}`}>
      <Head title="Dashboard Portfolio" />

      {/* Header - Exactement comme dashboardNew */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center gap-2">
              <img
                src={user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=32`}
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                {user.name}
              </span>
            </div>

            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar - Exactement comme dashboardNew */}
        <aside className={`
          fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 lg:static lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-6 space-y-6">
            {/* Close button for mobile */}
            <div className="flex justify-end lg:hidden">
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* User Profile */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=96`}
                  alt="Photo de profil"
                  className="w-24 h-24 rounded-full shadow-md border-4 border-indigo-500"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <a href="#home" className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                🏠 <span className="font-medium">Accueil</span>
              </a>
              <a href="#projects" className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                📁 <span className="font-medium">Projets</span>
              </a>
              <a href="#skills" className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                📊 <span className="font-medium">Compétences</span>
              </a>
              <a href="#cv" className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                📄 <span className="font-medium">CV</span>
              </a>
            </nav>

            {/* Stats */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Statistiques</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{projects.length}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Projets</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{skills.length}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Compétences</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-80">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-6">
                <img
                  src={user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=80`}
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Bonjour, {user.name} 👋
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Gérez vos projets et compétences depuis votre espace d'administration
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Projects and Skills Section */}
              <div className="xl:col-span-3 space-y-8">
                <section id="projects">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Mes Projets ({projects.length})
                      </h2>
                      <button 
                        onClick={() => setShowProjectForm(true)}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau Projet
                      </button>
                    </div>
                    
                    {projects.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map(project => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            onDelete={handleDeleteProject}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-gray-400 dark:text-gray-600 mb-4">
                          <FileText className="w-12 h-12 mx-auto" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                          Aucun projet pour le moment
                        </p>
                        <button 
                          onClick={() => setShowProjectForm(true)}
                          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          Créer mon premier projet
                        </button>
                      </div>
                    )}
                  </div>
                </section>

                {/* Skills Section */}
                <section id="skills">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Mes Compétences ({skills.length})
                      </h2>
                      <button 
                        onClick={() => setShowSkillForm(true)}
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Nouvelle Compétence
                      </button>
                    </div>
                    
                    {skills.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skills.map(skill => (
                          <SkillCard
                            key={skill.id}
                            skill={skill}
                            onDelete={handleDeleteSkill}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-gray-400 dark:text-gray-600 mb-4">
                          <FileText className="w-12 h-12 mx-auto" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                          Aucune compétence pour le moment
                        </p>
                        <button 
                          onClick={() => setShowSkillForm(true)}
                          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          Ajouter ma première compétence
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Right Sidebar Content */}
              <div className="xl:col-span-1 space-y-6">
                {/* CV Section */}
                <section id="cv">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Mon CV
                    </h3>
                    
                    <form onSubmit={handleCvUpload} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nouveau CV (PDF)
                        </label>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                          className="block w-full text-sm text-gray-500 file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                        />
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={!cvFile}
                        className="w-full inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Mettre à jour
                      </button>
                    </form>
                    
                    {user.cv_path && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <a 
                          href={user.cv_path} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Voir mon CV actuel
                        </a>
                      </div>
                    )}
                  </div>
                </section>

                {/* Quick Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Statistiques rapides
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Projets</span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{projects.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Compétences</span>
                      <span className="font-semibold text-purple-600 dark:text-purple-400">{skills.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Expert</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {skills.filter(s => s.level === 'expert').length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Forms */}
      <ProjectForm
        isOpen={showProjectForm}
        onClose={() => setShowProjectForm(false)}
      />
      
      <SkillForm
        isOpen={showSkillForm}
        onClose={() => setShowSkillForm(false)}
      />
    </div>
  );
}

export default withSnackbarProvider(Dashboard);
