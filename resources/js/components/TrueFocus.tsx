import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import './TrueFocus.css';

interface TrueFocusProps {
    sentence?: string;
    manualMode?: boolean;
    blurAmount?: number;
    borderColor?: string;
    glowColor?: string;
    animationDuration?: number;
    pauseBetweenAnimations?: number;
}

const TrueFocus = ({
    sentence = 'True Focus',
    manualMode = false,
    blurAmount = 3,
    borderColor = 'oklch(0.60 0.15 240)',
    glowColor = 'oklch(0.60 0.15 240 / 0.6)',
    animationDuration = 0.4,
    pauseBetweenAnimations = 0.8,
}: TrueFocusProps) => {
    const words = sentence.split(' ');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

    useEffect(() => {
        if (!manualMode) {
            const interval = setInterval(
                () => {
                    setCurrentIndex((prev) => (prev + 1) % words.length);
                },
                (animationDuration + pauseBetweenAnimations) * 1000,
            );

            return () => clearInterval(interval);
        }
    }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

    useEffect(() => {
        if (currentIndex === null || currentIndex === -1) return;

        if (!wordRefs.current[currentIndex] || !containerRef.current) return;

        const parentRect = containerRef.current.getBoundingClientRect();
        const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect();

        setFocusRect({
            x: activeRect.left - parentRect.left,
            y: activeRect.top - parentRect.top,
            width: activeRect.width,
            height: activeRect.height,
        });
    }, [currentIndex, words.length]);

    const handleMouseEnter = (index: number) => {
        if (manualMode) {
            setLastActiveIndex(index);
            setCurrentIndex(index);
        }
    };

    const handleMouseLeave = () => {
        if (manualMode) {
            setCurrentIndex(lastActiveIndex ?? 0);
        }
    };

    return (
        <div className="focus-container" ref={containerRef}>
            {words.map((word, index) => {
                const isActive = index === currentIndex;
                return (
                    <span
                        key={index}
                        ref={(el) => {
                            wordRefs.current[index] = el;
                        }} // CORRECTED: no return value
                        className={`focus-word ${manualMode ? 'manual' : ''} ${isActive && !manualMode ? 'active' : ''}`}
                        style={
                            {
                                filter: isActive ? `blur(0px)` : `blur(${blurAmount}px)`,
                                '--border-color': borderColor,
                                '--glow-color': glowColor,
                                transition: `filter ${animationDuration}s ease`,
                            } as React.CSSProperties & { [key: string]: any }
                        } // CORRECTED: allow CSS vars
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {word}
                    </span>
                );
            })}

            <motion.div
                className="focus-frame"
                animate={{
                    x: focusRect.x,
                    y: focusRect.y,
                    width: focusRect.width,
                    height: focusRect.height,
                    opacity: currentIndex >= 0 ? 1 : 0,
                }}
                transition={{ duration: animationDuration }}
                style={
                    {
                        '--border-color': borderColor,
                        '--glow-color': glowColor,
                    } as React.CSSProperties & { [key: string]: any }
                } // CORRECTED: allow CSS vars
            >
                <span className="corner top-left"></span>
                <span className="corner top-right"></span>
                <span className="corner bottom-left"></span>
                <span className="corner bottom-right"></span>
            </motion.div>
        </div>
    );
};

export default TrueFocus;
