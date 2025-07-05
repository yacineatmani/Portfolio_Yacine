import '@/../css/dashboard.css';
import { Head, PageProps, router, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import Footer from '../components/Footer';
import { useSnackbar, withSnackbarProvider } from '../components/Notifier';
import ParticlesBackground from '../components/ParticlesBackground';
import { RippleButton } from '../components/RippleButton';
import Topbar from '../components/Topbar';
import { ProjectCard } from '../components/dashboard/ProjectCard';
import { ProjectForm } from '../components/dashboard/ProjectForm';
import { SkillCard } from '../components/dashboard/SkillCard';
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
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900">
            <Head title="Dashboard" />
            <ParticlesBackground />

            {/* Bouton Dark/Light Mode */}
            <div className="fixed top-4 right-4 z-50">
                <motion.button
                    onClick={toggleDarkMode}
                    className={`transform rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 ${
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
            {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />}

            {/* Topbar */}
            <Topbar onMenuClick={() => setSidebarOpen(true)} user={user} isDarkMode={darkMode} toggleTheme={toggleDarkMode} />

            <div className="flex">
                {/* Sidebar verticale avec photo */}
                <aside
                    className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-80 transform border-r border-gray-200 bg-white/90 shadow-2xl backdrop-blur-lg transition-transform duration-300 ease-in-out lg:static lg:h-auto lg:translate-x-0 dark:border-gray-700 dark:bg-gray-800/90 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="space-y-6 p-6">
                        {/* Photo de profil */}
                        <div className="text-center">
                            <div className="relative inline-block">
                                <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75 blur"></div>
                                <img
                                    src={
                                        user.photo
                                            ? `/storage/${user.photo}`
                                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`
                                    }
                                    alt="Photo de profil"
                                    className="relative h-32 w-32 rounded-full border-4 border-white bg-white object-cover shadow-xl"
                                />
                            </div>
                            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                        </div>

                        {/* Navigation */}
                        <nav className="space-y-3">
                            <a href="/">
                                <RippleButton
                                    className="flex w-full transform items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-indigo-600 hover:to-purple-700"
                                    aria-label="Retour à l'accueil"
                                >
                                    <span className="material-icons">home</span>
                                    Retour à l'accueil
                                </RippleButton>
                            </a>

                            <div className="rounded-2xl bg-gray-100 p-4 dark:bg-gray-700">
                                <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
                                    <span className="material-icons text-indigo-600">dashboard</span>
                                    Navigation
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <a
                                        href="#projects"
                                        className="flex items-center gap-2 text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                                    >
                                        <span className="material-icons text-lg">work</span>
                                        Mes Projets
                                    </a>
                                    <a
                                        href="#skills"
                                        className="flex items-center gap-2 text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                                    >
                                        <span className="material-icons text-lg">psychology</span>
                                        Mes Compétences
                                    </a>
                                    <a
                                        href="#cv"
                                        className="flex items-center gap-2 text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                                    >
                                        <span className="material-icons text-lg">description</span>
                                        Mon CV
                                    </a>
                                </div>
                            </div>

                            {/* Stats rapides */}
                            <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 p-4 dark:from-indigo-900/20 dark:to-purple-900/20">
                                <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
                                    <span className="material-icons text-indigo-600">analytics</span>
                                    Statistiques
                                </h4>
                                <div className="grid grid-cols-2 gap-3 text-center">
                                    <div className="rounded-xl bg-white p-3 dark:bg-gray-800">
                                        <div className="text-2xl font-bold text-indigo-600">{projects.length}</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">Projets</div>
                                    </div>
                                    <div className="rounded-xl bg-white p-3 dark:bg-gray-800">
                                        <div className="text-2xl font-bold text-purple-600">{skills.length}</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">Compétences</div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </aside>

                {/* Contenu principal */}
                <main className="relative z-10 flex-1 lg:ml-80">
                    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                        {/* Header avec bouton accueil plus visible */}
                        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <h1 className="mb-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-4xl font-bold text-transparent">
                                    Dashboard
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300">Gérez votre portfolio professionnel</p>
                            </div>
                            <div className="flex gap-3">
                                <a href="/">
                                    <RippleButton
                                        className="flex transform items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-indigo-700"
                                        aria-label="Retour à l'accueil"
                                    >
                                        <span className="material-icons text-xl">home</span>
                                        <span>Accueil</span>
                                    </RippleButton>
                                </a>
                                <a href="/profile">
                                    <RippleButton
                                        className="flex transform items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-pink-700"
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
                            <div className="rounded-3xl border border-white/20 bg-white/80 p-8 shadow-2xl backdrop-blur-lg dark:border-gray-700/50 dark:bg-gray-800/80">
                                <div className="flex flex-col items-center gap-6 md:flex-row">
                                    <div className="relative">
                                        <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75 blur"></div>
                                        <img
                                            src={
                                                user.photo ||
                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`
                                            }
                                            alt="Photo de profil"
                                            className="relative h-28 w-28 rounded-full border-4 border-white bg-white object-cover shadow-xl"
                                        />
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h2 className="mb-2 flex items-center justify-center gap-3 text-3xl font-bold text-gray-900 md:justify-start dark:text-white">
                                            <span className="material-icons text-4xl text-indigo-600">person</span>
                                            Bonjour, {user.name} 👋
                                        </h2>
                                        <p className="text-lg text-gray-600 dark:text-gray-300">Bienvenue dans votre espace d'administration</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contenu principal en grille */}
                        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4">
                            {/* Section principale (Projets et Compétences) */}
                            <div className="space-y-8 xl:col-span-3">
                                {/* Section Projets modernisée */}
                                <section
                                    id="projects"
                                    className="rounded-3xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-lg dark:border-gray-700/50 dark:bg-gray-800/80"
                                >
                                    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                        <div>
                                            <h3 className="mb-2 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
                                                <div className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-2">
                                                    <span className="material-icons text-white">work</span>
                                                </div>
                                                Mes Projets
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">Gérez vos réalisations</p>
                                        </div>
                                        <RippleButton
                                            onClick={() => setShowProjectForm(true)}
                                            className="flex transform items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-indigo-700"
                                            aria-label="Ajouter un projet"
                                        >
                                            <span className="material-icons">add</span>
                                            Nouveau Projet
                                        </RippleButton>
                                    </div>

                                    {/* Grille des projets avec composants modulaires */}
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {projects.map((project, index) => (
                                            <ProjectCard key={project.id} project={project} index={index} onDelete={handleDeleteProject} />
                                        ))}
                                        {projects.length === 0 && (
                                            <div className="col-span-full py-12 text-center">
                                                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                                                    <span className="material-icons text-2xl text-gray-400">work_off</span>
                                                </div>
                                                <h4 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Aucun projet</h4>
                                                <p className="text-gray-500 dark:text-gray-400">Créez votre premier projet pour commencer</p>
                                            </div>
                                        )}
                                    </div>
                                </section>

                                {/* Section Compétences modernisée */}
                                <section
                                    id="skills"
                                    className="rounded-3xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur-lg dark:border-gray-700/50 dark:bg-gray-800/80"
                                >
                                    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                        <div>
                                            <h3 className="mb-2 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
                                                <div className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 p-2">
                                                    <span className="material-icons text-white">psychology</span>
                                                </div>
                                                Mes Compétences
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">Présentez vos talents</p>
                                        </div>
                                        <RippleButton
                                            onClick={() => setShowSkillForm(true)}
                                            className="flex transform items-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-emerald-700"
                                            aria-label="Ajouter une compétence"
                                        >
                                            <span className="material-icons">add</span>
                                            Nouvelle Compétence
                                        </RippleButton>
                                    </div>

                                    {/* Grille des compétences avec composants modulaires */}
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {skills.map((skill, index) => (
                                            <SkillCard key={skill.id} skill={skill} index={index} onDelete={handleDeleteSkill} />
                                        ))}
                                        {skills.length === 0 && (
                                            <div className="col-span-full py-12 text-center">
                                                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                                                    <span className="material-icons text-2xl text-gray-400">psychology_off</span>
                                                </div>
                                                <h4 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Aucune compétence</h4>
                                                <p className="text-gray-500 dark:text-gray-400">Ajoutez vos premières compétences</p>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </div>

                            {/* Sidebar CV */}
                            <aside className="xl:col-span-1">
                                <div className="sticky top-24">
                                    <section
                                        id="cv"
                                        className="rounded-3xl border border-white/20 bg-white/80 p-8 shadow-2xl backdrop-blur-lg dark:border-gray-700/50 dark:bg-gray-800/80"
                                    >
                                        <div className="mb-8 text-center">
                                            <div className="mb-4 inline-block rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-3">
                                                <span className="material-icons text-3xl text-white">description</span>
                                            </div>
                                            <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Mon CV</h3>
                                            <p className="text-gray-600 dark:text-gray-300">Gérez votre curriculum vitae</p>
                                        </div>

                                        <form onSubmit={handleCvUpload} className="space-y-6">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                                                    Nouveau CV (PDF)
                                                </label>
                                                <input
                                                    type="file"
                                                    onChange={(e) => cvForm.setData('cv', e.target.files ? e.target.files[0] : null)}
                                                    className="mt-2 block w-full rounded-xl border border-gray-300 p-3 text-gray-900 focus:border-indigo-500 dark:border-gray-600 dark:text-white"
                                                    accept=".pdf,.doc,.docx"
                                                />
                                                {cvForm.errors.cv && <p className="mt-1 text-sm text-red-500">{cvForm.errors.cv}</p>}
                                            </div>
                                            <RippleButton
                                                type="submit"
                                                disabled={cvForm.processing || !cvForm.data.cv}
                                                className="flex w-full transform items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-indigo-600 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                aria-label="Mettre à jour le CV"
                                            >
                                                <span className="material-icons">upload_file</span>
                                                <span>Mettre à jour</span>
                                            </RippleButton>
                                        </form>

                                        {user.cv_path && (
                                            <div className="mt-6 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 dark:border-emerald-800/50 dark:from-emerald-900/20 dark:to-teal-900/20">
                                                <div className="mb-3 flex items-center gap-3">
                                                    <div className="rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 p-2">
                                                        <span className="material-icons text-lg text-white">check_circle</span>
                                                    </div>
                                                    <span className="font-semibold text-emerald-800 dark:text-emerald-200">CV disponible</span>
                                                </div>
                                                <a
                                                    href={`/storage/${user.cv_path}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 font-medium text-emerald-700 transition-colors hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
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
            <ProjectForm isOpen={showProjectForm} onClose={() => setShowProjectForm(false)} />

            <SkillForm isOpen={showSkillForm} onClose={() => setShowSkillForm(false)} />

            <Footer />
        </div>
    );
}

// Exporter le composant enveloppé avec le provider de notifications
export default withSnackbarProvider(Dashboard);
