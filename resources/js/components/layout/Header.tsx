import React from 'react';
import { Menu, Sun, Moon, Settings } from 'lucide-react';
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
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onMenuClick} className="lg:hidden p-1">
            <Menu className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Dashboard</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onToggleDarkMode} className="p-1">
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          
          <div className="flex items-center gap-1">
            <img
              src={user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=24`}
              alt="Avatar"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
              {user.name}
            </span>
          </div>

          <Button variant="ghost" size="sm" className="p-1">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
