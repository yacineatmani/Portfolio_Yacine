import { motion } from 'framer-motion';
import { Download, Github as GitHub, Linkedin } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
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
            { threshold: 0.1 },
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
        <section id="hero" className="relative flex min-h-screen items-center pt-16">
            <div className="bg-gradient-radial absolute inset-0 from-indigo-100/30 via-transparent to-transparent dark:from-indigo-900/10 dark:via-transparent dark:to-transparent"></div>
            <div className="container mx-auto px-4 py-16 sm:py-24">
                <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
                    <motion.div
                        className="order-2 text-center lg:order-1 lg:w-1/2 lg:text-left"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.h1
                            className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl dark:text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <span className="block">Bonjour, je suis</span>
                            <span className="text-indigo-600 dark:text-indigo-400">Yacine Atmani</span>
                        </motion.h1>

                        <motion.div
                            className="mb-8 h-[40px] text-xl text-gray-600 sm:h-[60px] sm:text-2xl md:text-3xl dark:text-gray-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <TypeAnimation
                                sequence={['Développeur Full Stack', 1000, 'Expert Laravel', 1000, "Créateur d'API", 1000, 'Passionné de Web', 1000]}
                                speed={50}
                                repeat={Infinity}
                            />
                        </motion.div>

                        <motion.p
                            className="mx-auto mb-8 max-w-lg text-gray-600 lg:mx-0 dark:text-gray-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            Je crée des solutions web fullstack innovantes avec React et Laravel, en mettant l'accent sur l'expérience utilisateur et
                            des API performantes.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap justify-center gap-4 lg:justify-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                        >
                            <a
                                href="/files/cv.pdf"
                                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-white shadow-md transition-colors duration-300 hover:bg-indigo-700 hover:shadow-lg"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Download size={18} />
                                Télécharger CV
                            </a>

                            <div className="mt-2 flex items-center gap-4 sm:mt-0">
                                <a
                                    href="https://github.com/yacineatmani"
                                    className="rounded-full bg-gray-100 p-3 text-gray-700 transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                >
                                    <GitHub size={20} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/yacine-atmani"
                                    className="rounded-full bg-gray-100 p-3 text-gray-700 transition-colors duration-300 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
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
                        className="order-1 flex justify-center lg:order-2 lg:w-1/2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 -translate-x-4 translate-y-4 transform animate-pulse rounded-full bg-indigo-600/20 blur-3xl dark:bg-indigo-400/20"></div>
                            <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white shadow-xl sm:h-80 sm:w-80 dark:border-gray-800">
                                <img
                                    ref={imageRef}
                                    src="/images/yacine.jpg"
                                    alt="Yacine Atmani"
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg';
                                    }}
                                />
                            </div>
                            <div className="animate-float absolute -top-6 -right-6 flex h-24 w-24 rotate-12 transform items-center justify-center rounded-full bg-yellow-400 text-xl font-bold text-white shadow-lg dark:bg-yellow-500">
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
