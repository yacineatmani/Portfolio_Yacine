import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import React from 'react';

const Footer: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-gray-900 py-12 text-white dark:bg-gray-950">
            <div className="container mx-auto px-4">
                <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
                    <div className="mb-6 text-center md:mb-0 md:text-left">
                        <h2 className="mb-2 text-2xl font-bold text-indigo-400">Yacine Atmani</h2>
                        <p className="max-w-md text-gray-400">
                            Développeur web passionné, créant des solutions innovantes avec précision et créativité.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end">
                        <div className="mb-4 flex space-x-4">
                            <a
                                href="https://github.com/yacineatmani"
                                className="rounded-full bg-gray-800 p-2 transition-colors duration-300 hover:bg-gray-700"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/yacine-atmani"
                                className="rounded-full bg-gray-800 p-2 transition-colors duration-300 hover:bg-gray-700"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href="mailto:contact@yacineatmani.fr"
                                className="rounded-full bg-gray-800 p-2 transition-colors duration-300 hover:bg-gray-700"
                                aria-label="Email"
                            >
                                <Mail size={20} />
                            </a>
                        </div>

                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-indigo-700"
                            aria-label="Retour en haut"
                        >
                            <ArrowUp size={16} />
                            <span>Retour en haut</span>
                        </button>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} Yacine Atmani. Tous droits réservés.</p>
                    <p className="mt-2">Fait avec passion en utilisant React, TypeScript et Tailwind CSS.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
