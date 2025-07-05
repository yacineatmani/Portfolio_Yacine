import { Link, usePage } from '@inertiajs/react';

const navLinks = [
    { label: 'Dashboard', icon: 'dashboard', href: '/dashboard', color: 'from-blue-500 to-indigo-600' },
    { label: 'Projets', icon: 'work', href: '/dashboard#projets', color: 'from-emerald-500 to-teal-600' },
    { label: 'Compétences', icon: 'psychology', href: '/dashboard#competences', color: 'from-purple-500 to-pink-600' },
    { label: 'CV', icon: 'description', href: '/dashboard#cv', color: 'from-orange-500 to-red-600' },
    { label: 'Accueil', icon: 'home', href: '/', color: 'from-gray-500 to-gray-600' },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { url } = usePage();

    return (
        <>
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-gray-200/50 bg-white/95 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-in-out dark:border-gray-800/50 dark:bg-gray-900/95 ${open ? 'translate-x-0' : '-translate-x-full'} md:static md:block md:translate-x-0`}
                aria-label="Sidebar navigation"
            >
                {/* Header de la sidebar */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-6 dark:border-gray-800/50">
                    <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-2">
                            <span className="material-icons text-2xl text-white">dashboard</span>
                        </div>
                        <div>
                            <h2 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                                Portfolio
                            </h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
                        </div>
                    </div>
                    <button
                        className="rounded-full p-2 transition-colors hover:bg-gray-100 focus:outline-none md:hidden dark:hover:bg-gray-800"
                        onClick={onClose}
                        aria-label="Fermer le menu"
                    >
                        <span className="material-icons text-gray-600 dark:text-gray-400">close</span>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-6 flex flex-col gap-2 px-4">
                    {navLinks.map((link) => {
                        const isActive = url === link.href || (link.href.includes('#') && url.includes(link.href.split('#')[0]));

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`group relative flex items-center gap-4 rounded-2xl px-4 py-4 font-medium transition-all duration-300 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none ${
                                    isActive
                                        ? 'scale-[1.02] transform bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-lg dark:from-indigo-900/30 dark:to-purple-900/30 dark:text-indigo-300'
                                        : 'text-gray-700 hover:scale-[1.01] hover:transform hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:text-gray-200 dark:hover:from-gray-800/50 dark:hover:to-gray-700/50'
                                }`}
                            >
                                {/* Indicateur actif */}
                                {isActive && (
                                    <div className="absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-indigo-500 to-purple-600"></div>
                                )}

                                {/* Icône avec gradient */}
                                <div
                                    className={`rounded-xl p-2 transition-all duration-300 ${
                                        isActive
                                            ? `bg-gradient-to-r ${link.color} shadow-lg`
                                            : 'bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-gray-200 group-hover:to-gray-300 dark:bg-gray-800 dark:group-hover:from-gray-700 dark:group-hover:to-gray-600'
                                    }`}
                                >
                                    <span
                                        className={`material-icons text-lg ${
                                            isActive
                                                ? 'text-white'
                                                : 'text-gray-600 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300'
                                        }`}
                                    >
                                        {link.icon}
                                    </span>
                                </div>

                                {/* Label */}
                                <span className="flex-1">{link.label}</span>

                                {/* Flèche pour les liens actifs */}
                                {isActive && (
                                    <span className="material-icons animate-pulse text-lg text-indigo-600 dark:text-indigo-400">chevron_right</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer de la sidebar */}
                <div className="absolute right-0 bottom-0 left-0 border-t border-gray-100 bg-gradient-to-t from-white/80 to-transparent p-4 dark:border-gray-800/50 dark:from-gray-900/80">
                    <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 Portfolio Dashboard</p>
                        <div className="mt-2 flex justify-center gap-2">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"></div>
                            <div className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-500 delay-75"></div>
                            <div className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-pink-400 to-red-500 delay-150"></div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
