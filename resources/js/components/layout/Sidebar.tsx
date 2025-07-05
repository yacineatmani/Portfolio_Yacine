import { BarChart3, FileText, FolderOpen, Home, X } from 'lucide-react';
import { Button } from '../ui/DashboardButton';

interface UserType {
    id: number;
    name: string;
    email: string;
    photo?: string;
    cv_path?: string;
}

interface SidebarProps {
    user: UserType;
    isOpen: boolean;
    onClose: () => void;
    projectCount: number;
    skillCount: number;
}

export function Sidebar({ user, isOpen, onClose, projectCount, skillCount }: SidebarProps) {
    const menuItems = [
        { icon: Home, label: 'Accueil', href: '#home' },
        { icon: FolderOpen, label: 'Projets', href: '#projects' },
        { icon: BarChart3, label: 'Compétences', href: '#skills' },
        { icon: FileText, label: 'CV', href: '#cv' },
    ];

    return (
        <>
            {/* Overlay */}
            {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />}

            {/* Sidebar - Ultra compact */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 transform border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 lg:static lg:translate-x-0 dark:border-gray-700 dark:bg-gray-800 ${isOpen ? 'translate-x-0' : '-translate-x-full'} `}
            >
                <div className="space-y-3 p-3">
                    {/* Close button for mobile */}
                    <div className="flex justify-end lg:hidden">
                        <Button variant="ghost" size="sm" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* User Profile - Ultra compact */}
                    <div className="flex flex-col items-center text-center">
                        <div className="relative">
                            <img
                                src={
                                    user.photo ||
                                    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=48`
                                }
                                alt="Photo de profil"
                                className="h-12 w-12 rounded-full border-2 border-indigo-500 shadow-md"
                            />
                            <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border border-white bg-green-500 dark:border-gray-800"></div>
                        </div>
                        <h3 className="mt-2 w-full truncate text-sm font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                        <p className="w-full truncate text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>

                    {/* Navigation - Ultra compact */}
                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                <item.icon className="h-4 w-4" />
                                <span className="font-medium">{item.label}</span>
                            </a>
                        ))}
                    </nav>

                    {/* Stats - Ultra compact */}
                    <div className="rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-2 dark:from-gray-700 dark:to-gray-600">
                        <h4 className="mb-2 text-xs font-semibold text-gray-800 dark:text-gray-200">Statistiques</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="text-center">
                                <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{projectCount}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Projets</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{skillCount}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Compétences</div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
