import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { AppSidebar } from '@/components/app-sidebar';
import { AppContent } from '@/components/app-content';

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        {/* Sidebar */}
        <AppSidebar />
        {/* Main Content */}
        <AppContent variant="sidebar">
          <Head title="Dashboard" />
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={user.photo ? `/storage/${user.photo}` : '/storage/photo.jpg'}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 shadow"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bienvenue, {user.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Dashboard Portfolio</p>
                </div>
              </div>
              <a
                href="/"
                className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                ← Retour à l'accueil
              </a>
            </div>

            {/* Statistiques principales */}
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Projets</p>
                  <p className="text-3xl font-bold text-indigo-600">{projects.length}</p>
                </div>
                <div className="text-3xl">📁</div>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Compétences</p>
                  <p className="text-3xl font-bold text-green-600">{skills.length}</p>
                </div>
                <div className="text-3xl">🛠️</div>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</p>
                  <p className="text-3xl font-bold text-blue-600">{user.email}</p>
                </div>
                <div className="text-3xl">📧</div>
              </div>
            </div>

            {/* Liste des projets */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Mes Projets</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Titre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Technos</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Lien</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {projects.length === 0 && (
                      <tr>
                        <td colSpan={3} className="text-center py-8 text-gray-400">Aucun projet</td>
                      </tr>
                    )}
                    {projects.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">{p.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{p.technologies}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {p.github_link && (
                            <a href={p.github_link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">GitHub</a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Liste des compétences */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Mes Compétences</h2>
              <div className="flex flex-wrap gap-2">
                {skills.length === 0 && <span className="text-gray-400">Aucune compétence</span>}
                {skills.map((s) => (
                  <span key={s.id} className="inline-block bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-3 py-1 rounded-full text-sm font-medium">
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
