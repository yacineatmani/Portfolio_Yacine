import React, { useState } from 'react';
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
        className={`fixed z-40 inset-y-0 left-0 w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-r border-gray-200/50 dark:border-gray-800/50 transform transition-all duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}
        aria-label="Sidebar navigation"
      >
        {/* Header de la sidebar */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100 dark:border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl">
              <span className="material-icons text-white text-2xl">dashboard</span>
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Portfolio
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
            </div>
          </div>
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
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
                className={`group relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 shadow-lg transform scale-[1.02]'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800/50 dark:hover:to-gray-700/50 hover:transform hover:scale-[1.01]'
                }`}
              >
                {/* Indicateur actif */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
                )}
                
                {/* Icône avec gradient */}
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-r ${link.color} shadow-lg` 
                    : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-gradient-to-r group-hover:from-gray-200 group-hover:to-gray-300 dark:group-hover:from-gray-700 dark:group-hover:to-gray-600'
                }`}>
                  <span className={`material-icons text-lg ${
                    isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                  }`}>
                    {link.icon}
                  </span>
                </div>
                
                {/* Label */}
                <span className="flex-1">{link.label}</span>
                
                {/* Flèche pour les liens actifs */}
                {isActive && (
                  <span className="material-icons text-indigo-600 dark:text-indigo-400 text-lg animate-pulse">
                    chevron_right
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer de la sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 dark:border-gray-800/50 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-900/80">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © 2025 Portfolio Dashboard
            </p>
            <div className="flex justify-center gap-2 mt-2">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
