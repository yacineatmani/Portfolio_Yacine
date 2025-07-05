import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

interface RotatingTextProps {
    texts: string[];
    className: string;
    interval?: number;
}

const RotatingText: React.FC<RotatingTextProps> = ({ texts, className, interval = 3000 }) => {
    const [index, setIndex] = React.useState(0);

    useEffect(() => {
        const timer = setInterval(() => setIndex((prev) => (prev + 1) % texts.length), interval);
        return () => clearInterval(timer);
    }, [texts.length, interval]);

    return <h2 className={className}>{texts[index]}</h2>;
};

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
    variants?: string[];
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, align = 'center', variants }) => {
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = titleRef.current;
        if (element) {
            gsap.fromTo(
                element,
                { opacity: 0, y: 20, rotate: align === 'center' ? 0 : align === 'left' ? -5 : 5 },
                {
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                },
            );
        }
    }, []);

    return (
        <div ref={titleRef} className={`section-title ${align === 'center' ? 'text-center' : align === 'left' ? 'text-left' : 'text-right'}`}>
            {variants ? (
                <RotatingText texts={variants} className="mb-4 text-4xl font-bold text-indigo-600 dark:text-indigo-400" interval={2000} />
            ) : (
                <h2 className="mb-4 text-4xl font-bold text-indigo-600 dark:text-indigo-400">{title}</h2>
            )}
            {subtitle && <p className="text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
    );
};

export default SectionTitle;
