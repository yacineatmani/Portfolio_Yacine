import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Github as GitHub, Linkedin } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

const Hero: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-hero-image');
        }
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 bg-gradient-radial from-indigo-100/30 via-transparent to-transparent dark:from-indigo-900/10 dark:via-transparent dark:to-transparent"></div>
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="block">Bonjour, je suis</span>
              <span className="text-indigo-600 dark:text-indigo-400">Yacine Atmani</span>
            </motion.h1>
            
            <motion.div 
              className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 h-[40px] sm:h-[60px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <TypeAnimation
                sequence={[
                  'Développeur Full Stack',
                  1000,
                  'Expert Laravel',
                  1000,
                  'Créateur d\'API',
                  1000,
                  'Passionné de Web',
                  1000,
                ]}
                speed={50}
                repeat={Infinity}
              />
            </motion.div>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Je crée des solutions web fullstack innovantes avec React et Laravel, en mettant l'accent sur l'expérience utilisateur et des API performantes.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <a
                href="/files/cv.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={18} />
                Télécharger CV
              </a>
              
              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <a
                  href="https://github.com/yacineatmani"
                  className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <GitHub size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/yacine-atmani"
                  className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-600/20 dark:bg-indigo-400/20 blur-3xl rounded-full transform -translate-x-4 translate-y-4 animate-pulse"></div>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                <img
                  ref={imageRef}
                  src="/images/yacine.jpg"
                  alt="Yacine Atmani"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg";
                  }}
                />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transform rotate-12 animate-float">
                <span>Hello!</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;