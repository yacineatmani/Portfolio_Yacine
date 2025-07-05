import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const BackToTop: React.FC = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {showButton && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.3 }}
                    onClick={scrollToTop}
                    className="fixed right-8 bottom-8 z-50 rounded-full bg-indigo-600 p-3 text-white shadow-lg transition-colors duration-300 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    aria-label="Retour en haut"
                >
                    <ArrowUp size={24} />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
