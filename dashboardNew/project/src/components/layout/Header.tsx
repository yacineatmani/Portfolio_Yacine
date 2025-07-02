import React from 'react';
import { Menu, Sun, Moon, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { User } from '../../types/dashboard';

interface HeaderProps {
  user: User;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onMenuClick: () => void;
}

export function Header({ user, darkMode, onToggleDarkMode, onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onMenuClick} className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onToggleDarkMode}>
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          
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

          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}