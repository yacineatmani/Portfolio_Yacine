import { FileText, Plus, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { ProjectCard } from '../components/dashboard/ProjectCard';
import { ProjectForm } from '../components/dashboard/ProjectForm';
import { SkillCard } from '../components/dashboard/SkillCard';
import { SkillForm } from '../components/dashboard/SkillForm';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { Button } from '../components/ui/DashboardButton';
import { Notification } from '../components/ui/Notification';
import { Card } from '../components/ui/SimpleCard';
import { useDarkMode } from '../hooks/useDarkMode';
import { useNotification } from '../hooks/useNotification';
import { Project, Skill } from '../types/dashboard';
import { mockDashboardData } from '../utils/mockData';

function Dashboard() {
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
            image: projectData.image ? URL.createObjectURL(projectData.image) : undefined,
        };

        setProjects((prev) => [...prev, newProject]);
        setShowProjectForm(false);
        success('Projet ajouté avec succès !');
    };

    const handleSkillSubmit = (skillData: any) => {
        const newSkill: Skill = {
            id: Date.now(),
            name: skillData.name,
            level: skillData.level,
            category: skillData.category,
        };

        setSkills((prev) => [...prev, newSkill]);
        setShowSkillForm(false);
        success('Compétence ajoutée avec succès !');
    };

    const handleDeleteProject = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
            setProjects((prev) => prev.filter((p) => p.id !== id));
            success('Projet supprimé avec succès !');
        }
    };

    const handleDeleteSkill = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
            setSkills((prev) => prev.filter((s) => s.id !== id));
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
        <div className="min-h-screen bg-gray-50 transition-colors dark:bg-gray-900">
            {/* Header */}
            <Header user={mockDashboardData.user} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} onMenuClick={() => setSidebarOpen(true)} />

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
                    <div className="mx-auto max-w-7xl space-y-8">
                        {/* Welcome Section */}
                        <Card>
                            <div className="flex items-center gap-6">
                                <img
                                    src={
                                        mockDashboardData.user.photo ||
                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(mockDashboardData.user.name)}&background=6366f1&color=fff&size=80`
                                    }
                                    alt="Profile"
                                    className="h-20 w-20 rounded-full"
                                />
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bonjour, {mockDashboardData.user.name} 👋</h1>
                                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                                        Gérez vos projets et compétences depuis votre espace d'administration
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
                            {/* Projects Section */}
                            <div className="space-y-8 xl:col-span-3">
                                <section id="projects">
                                    <Card>
                                        <div className="mb-6 flex items-center justify-between">
                                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Mes Projets ({projects.length})</h2>
                                            <Button onClick={() => setShowProjectForm(true)}>
                                                <Plus className="mr-2 h-4 w-4" />
                                                Nouveau Projet
                                            </Button>
                                        </div>

                                        {projects.length > 0 ? (
                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                                {projects.map((project) => (
                                                    <ProjectCard key={project.id} project={project} onDelete={handleDeleteProject} />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="py-12 text-center">
                                                <div className="mb-4 text-gray-400 dark:text-gray-600">
                                                    <FileText className="mx-auto h-12 w-12" />
                                                </div>
                                                <p className="mb-4 text-gray-500 dark:text-gray-400">Aucun projet pour le moment</p>
                                                <Button onClick={() => setShowProjectForm(true)}>Créer mon premier projet</Button>
                                            </div>
                                        )}
                                    </Card>
                                </section>

                                {/* Skills Section */}
                                <section id="skills">
                                    <Card>
                                        <div className="mb-6 flex items-center justify-between">
                                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Mes Compétences ({skills.length})</h2>
                                            <Button onClick={() => setShowSkillForm(true)}>
                                                <Plus className="mr-2 h-4 w-4" />
                                                Nouvelle Compétence
                                            </Button>
                                        </div>

                                        {skills.length > 0 ? (
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                {skills.map((skill) => (
                                                    <SkillCard key={skill.id} skill={skill} onDelete={handleDeleteSkill} />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="py-12 text-center">
                                                <div className="mb-4 text-gray-400 dark:text-gray-600">
                                                    <FileText className="mx-auto h-12 w-12" />
                                                </div>
                                                <p className="mb-4 text-gray-500 dark:text-gray-400">Aucune compétence pour le moment</p>
                                                <Button onClick={() => setShowSkillForm(true)}>Ajouter ma première compétence</Button>
                                            </div>
                                        )}
                                    </Card>
                                </section>
                            </div>

                            {/* Sidebar Content */}
                            <div className="space-y-6 xl:col-span-1">
                                {/* CV Section */}
                                <section id="cv">
                                    <Card>
                                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Mon CV</h3>

                                        <form onSubmit={handleCvUpload} className="space-y-4">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Nouveau CV (PDF)
                                                </label>
                                                <input
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                                                    className="block w-full text-sm text-gray-500 file:mr-2 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-300"
                                                />
                                            </div>

                                            <Button type="submit" disabled={!cvFile} className="w-full">
                                                <Upload className="mr-2 h-4 w-4" />
                                                Mettre à jour
                                            </Button>
                                        </form>

                                        {mockDashboardData.user.cv_path && (
                                            <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                                                <Button variant="ghost" className="w-full">
                                                    <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center">
                                                        <FileText className="mr-2 h-4 w-4" />
                                                        Voir mon CV actuel
                                                    </a>
                                                </Button>
                                            </div>
                                        )}
                                    </Card>
                                </section>

                                {/* Quick Stats */}
                                <Card>
                                    <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Statistiques rapides</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Projets</span>
                                            <span className="font-semibold text-indigo-600 dark:text-indigo-400">{projects.length}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Compétences</span>
                                            <span className="font-semibold text-purple-600 dark:text-purple-400">{skills.length}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Expert</span>
                                            <span className="font-semibold text-green-600 dark:text-green-400">
                                                {skills.filter((s) => s.level === 'expert').length}
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
            <ProjectForm isOpen={showProjectForm} onClose={() => setShowProjectForm(false)} onSubmit={handleProjectSubmit} />

            <SkillForm isOpen={showSkillForm} onClose={() => setShowSkillForm(false)} onSubmit={handleSkillSubmit} />

            {/* Notifications */}
            <div className="fixed top-4 right-4 z-50 max-w-sm space-y-2">
                {notifications.map((notification) => (
                    <Notification key={notification.id} {...notification} onClose={removeNotification} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
