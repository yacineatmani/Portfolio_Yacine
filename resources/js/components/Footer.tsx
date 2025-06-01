import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-indigo-400 mb-2">Yacine Atmani</h2>
            <p className="text-gray-400 max-w-md">
              Développeur web passionné, créant des solutions innovantes avec précision et créativité.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a
                href="https://github.com/yacineatmani"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/yacine-atmani"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:contact@yacineatmani.fr"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
            
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              aria-label="Retour en haut"
            >
              <ArrowUp size={16} />
              <span>Retour en haut</span>
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Yacine Atmani. Tous droits réservés.</p>
          <p className="mt-2">
            Fait avec passion en utilisant React, TypeScript et Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;