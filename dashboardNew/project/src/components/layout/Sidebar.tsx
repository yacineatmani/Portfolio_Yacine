import React from 'react';
import { User, BarChart3, FolderOpen, FileText, Home, X } from 'lucide-react';
import { User as UserType } from '../../types/dashboard';
import { Button } from '../ui/Button';

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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 lg:static lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 space-y-6">
          {/* Close button for mobile */}
          <div className="flex justify-end lg:hidden">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* User Profile */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <img
                src={user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=96`}
                alt="Photo de profil"
                className="w-24 h-24 rounded-full shadow-md border-4 border-indigo-500"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Stats */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-4 rounded-xl">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Statistiques</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{projectCount}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Projets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{skillCount}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Compétences</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}