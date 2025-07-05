import { AppContent } from '@/components/app-content';
import { AppSidebar } from '@/components/app-sidebar';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    photo?: string;
}

interface Project {
    id: number;
    title: string;
    technologies: string;
    github_link?: string;
}

interface Skill {
    id: number;
    name: string;
}

interface DashboardPageProps {
    auth: { user: User };
    projects: Project[];
    skills: Skill[];
}

export default function Dashboard({ auth, projects = [], skills = [] }: DashboardPageProps) {
    const { user } = auth;
    return (
        <AppLayout>
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Sidebar */}
                <AppSidebar />
                {/* Main Content */}
                <AppContent variant="sidebar">
                    <Head title="Dashboard" />
                    <div className="mx-auto max-w-7xl px-4 py-8">
                        {/* Header */}
                        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-4">
                                <img
                                    src={user.photo ? `/storage/${user.photo}` : '/storage/photo.jpg'}
                                    alt="Profile"
                                    className="h-16 w-16 rounded-full border-2 border-indigo-500 object-cover shadow"
                                />
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bienvenue, {user.name}</h1>
                                    <p className="mt-1 text-gray-600 dark:text-gray-400">Dashboard Portfolio</p>
                                </div>
                            </div>
                            <a href="/" className="inline-block rounded bg-gray-200 px-4 py-2 text-gray-800 transition hover:bg-gray-300">
                                ← Retour à l'accueil
                            </a>
                        </div>

                        {/* Statistiques principales */}
                        <div className="mb-8 grid gap-6 md:grid-cols-3">
                            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Projets</p>
                                    <p className="text-3xl font-bold text-indigo-600">{projects.length}</p>
                                </div>
                                <div className="text-3xl">📁</div>
                            </div>
                            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Compétences</p>
                                    <p className="text-3xl font-bold text-green-600">{skills.length}</p>
                                </div>
                                <div className="text-3xl">🛠️</div>
                            </div>
                            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</p>
                                    <p className="text-3xl font-bold text-blue-600">{user.email}</p>
                                </div>
                                <div className="text-3xl">📧</div>
                            </div>
                        </div>

                        {/* Liste des projets */}
                        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Mes Projets</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                                Titre
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                                Technos
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300">
                                                Lien
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                        {projects.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="py-8 text-center text-gray-400">
                                                    Aucun projet
                                                </td>
                                            </tr>
                                        )}
                                        {projects.map((p) => (
                                            <tr key={p.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white">{p.title}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{p.technologies}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {p.github_link && (
                                                        <a
                                                            href={p.github_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-indigo-600 hover:underline"
                                                        >
                                                            GitHub
                                                        </a>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Liste des compétences */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Mes Compétences</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.length === 0 && <span className="text-gray-400">Aucune compétence</span>}
                                {skills.map((s) => (
                                    <span
                                        key={s.id}
                                        className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                                    >
                                        {s.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </AppContent>
            </div>
        </AppLayout>
    );
}
