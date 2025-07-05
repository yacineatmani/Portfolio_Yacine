import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTheme } from './context/ThemeContext';

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Accueil', href: '#hero' },
        { name: 'Projets', href: '#projects' },
        { name: 'Compétences', href: '#skills' },
        { name: 'Expérience', href: '#experience' },
        { name: 'À propos', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            setMobileMenuOpen(false);
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white/90 py-3 shadow-md backdrop-blur-md dark:bg-gray-900/90' : 'bg-transparent py-5'
            }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <a
                        href="#hero"
                        className="text-xl font-bold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('#hero');
                        }}
                    >
                        Yacine Atmani
                    </a>

                    <nav className="hidden space-x-6 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-gray-700 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(link.href);
                                }}
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <motion.button
                            onClick={toggleTheme}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="rounded-full bg-gray-100 p-2 text-gray-700 transition-colors hover:text-indigo-600 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:text-indigo-400"
                            aria-label={theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'}
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </motion.button>

                        <button
                            className="rounded-full bg-gray-100 p-2 text-gray-700 transition-colors hover:text-indigo-600 focus:outline-none md:hidden dark:bg-gray-800 dark:text-gray-300 dark:hover:text-indigo-400"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden bg-white md:hidden dark:bg-gray-900"
                    >
                        <div className="space-y-1 px-4 pt-2 pb-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="block py-2 text-gray-700 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(link.href);
                                    }}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
