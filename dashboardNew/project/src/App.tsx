import React, { useState } from 'react';
import { Plus, FileText, Upload } from 'lucide-react';
import { useDarkMode } from './hooks/useDarkMode';
import { useNotification } from './hooks/useNotification';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ProjectCard } from './components/dashboard/ProjectCard';
import { SkillCard } from './components/dashboard/SkillCard';
import { ProjectForm } from './components/dashboard/ProjectForm';
import { SkillForm } from './components/dashboard/SkillForm';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { Notification } from './components/ui/Notification';
import { mockDashboardData } from './utils/mockData';
import { Project, Skill } from './types/dashboard';

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { notifications, success, error, removeNotification } = useNotification();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [projects, setProjects] = useState<Project[]>(mockDashboardData.projects);
  const [skills, setSkills] = useState<Skill[]>(mockDashboardData.skills);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleProjectSubmit = (projectData: any) => {
    const newProject: Project = {
      id: Date.now(),
      title: projectData.title,
      description: projectData.description,
      technologies: projectData.technologies,
      github_link: projectData.github_link,
      demo_link: projectData.demo_link,
      image: projectData.image ? URL.createObjectURL(projectData.image) : undefined
    };
    
    setProjects(prev => [...prev, newProject]);
    setShowProjectForm(false);
    success('Projet ajouté avec succès !');
  };

  const handleSkillSubmit = (skillData: any) => {
    const newSkill: Skill = {
      id: Date.now(),
      name: skillData.name,
      level: skillData.level,
      category: skillData.category
    };
    
    setSkills(prev => [...prev, newSkill]);
    setShowSkillForm(false);
    success('Compétence ajoutée avec succès !');
  };

  const handleDeleteProject = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
      success('Projet supprimé avec succès !');
    }
  };

  const handleDeleteSkill = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
      setSkills(prev => prev.filter(s => s.id !== id));
      success('Compétence supprimée avec succès !');
    }
  };

  const handleCvUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (cvFile) {
      success('CV mis à jour avec succès !');
      setCvFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <Header
        user={mockDashboardData.user}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          user={mockDashboardData.user}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          projectCount={projects.length}
          skillCount={skills.length}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-80">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <Card>
              <div className="flex items-center gap-6">
                <img
                  src={mockDashboardData.user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(mockDashboardData.user.name)}&background=6366f1&color=fff&size=80`}
                  alt="Profile"
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Bonjour, {mockDashboardData.user.name} 👋
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Gérez vos projets et compétences depuis votre espace d'administration
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Projects Section */}
              <div className="xl:col-span-3 space-y-8">
                <section id="projects">
                  <Card>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Mes Projets ({projects.length})
                      </h2>
                      <Button onClick={() => setShowProjectForm(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Nouveau Projet
                      </Button>
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
                        <Button onClick={() => setShowProjectForm(true)}>
                          Créer mon premier projet
                        </Button>
                      </div>
                    )}
                  </Card>
                </section>

                {/* Skills Section */}
                <section id="skills">
                  <Card>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Mes Compétences ({skills.length})
                      </h2>
                      <Button onClick={() => setShowSkillForm(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Nouvelle Compétence
                      </Button>
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
                        <Button onClick={() => setShowSkillForm(true)}>
                          Ajouter ma première compétence
                        </Button>
                      </div>
                    )}
                  </Card>
                </section>
              </div>

              {/* Sidebar Content */}
              <div className="xl:col-span-1 space-y-6">
                {/* CV Section */}
                <section id="cv">
                  <Card>
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
                      
                      <Button 
                        type="submit" 
                        disabled={!cvFile}
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Mettre à jour
                      </Button>
                    </form>
                    
                    {mockDashboardData.user.cv_path && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button variant="ghost" className="w-full" asChild>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <FileText className="w-4 h-4 mr-2" />
                            Voir mon CV actuel
                          </a>
                        </Button>
                      </div>
                    )}
                  </Card>
                </section>

                {/* Quick Stats */}
                <Card>
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
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Forms */}
      <ProjectForm
        isOpen={showProjectForm}
        onClose={() => setShowProjectForm(false)}
        onSubmit={handleProjectSubmit}
      />
      
      <SkillForm
        isOpen={showSkillForm}
        onClose={() => setShowSkillForm(false)}
        onSubmit={handleSkillSubmit}
      />

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            {...notification}
            onClose={removeNotification}
          />
        ))}
      </div>
    </div>
  );
}

export default App;