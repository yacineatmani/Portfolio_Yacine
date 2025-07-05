import { Menu, Moon, Settings, Sun } from 'lucide-react';
import { Button } from '../ui/DashboardButton';

interface User {
    id: number;
    name: string;
    email: string;
    photo?: string;
    cv_path?: string;
}

interface HeaderProps {
    user: User;
    darkMode: boolean;
    onToggleDarkMode: () => void;
    onMenuClick: () => void;
}

export function Header({ user, darkMode, onToggleDarkMode, onMenuClick }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={onMenuClick} className="p-1 lg:hidden">
                        <Menu className="h-4 w-4" />
                    </Button>
                    <h1 className="text-lg font-bold text-gray-900 dark:text-white">Dashboard</h1>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={onToggleDarkMode} className="p-1">
                        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>

                    <div className="flex items-center gap-1">
                        <img
                            src={
                                user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=24`
                            }
                            alt="Avatar"
                            className="h-6 w-6 rounded-full"
                        />
                        <span className="hidden text-xs font-medium text-gray-700 sm:block dark:text-gray-300">{user.name}</span>
                    </div>

                    <Button variant="ghost" size="sm" className="p-1">
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
