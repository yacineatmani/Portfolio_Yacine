import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';

interface RotatingTextProps {
    texts: string[];
    transition?: { type?: string; damping?: number; stiffness?: number };
    initial?: { y?: string; opacity?: number };
    animate?: { y?: number; opacity?: number };
    exit?: { y?: string; opacity?: number };
    animatePresenceMode?: 'wait' | 'sync' | 'popLayout';
    animatePresenceInitial?: boolean;
    rotationInterval?: number;
    staggerDuration?: number;
    staggerFrom?: string;
    loop?: boolean;
    auto?: boolean;
    splitBy?: string;
    onNext?: (index: number) => void;
    mainClassName?: string;
    splitLevelClassName?: string;
    elementLevelClassName?: string;
}

const RotatingText = forwardRef<unknown, RotatingTextProps>((props, ref) => {
    const {
        texts,
        transition = { type: 'spring', damping: 30, stiffness: 400 },
        initial = { y: '100%', opacity: 0 },
        animate = { y: 0, opacity: 1 },
        exit = { y: '-120%', opacity: 0 },
        animatePresenceMode = 'wait',
        animatePresenceInitial = false,
        rotationInterval = 3000,
        staggerDuration = 0.05,
        staggerFrom = 'first',
        loop = true,
        auto = true,
        splitBy = 'characters',
        onNext,
        mainClassName = 'inline-flex',
        splitLevelClassName = '',
        elementLevelClassName = '',
        ...rest
    } = props;

    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    // const splitIntoCharacters = (text: string) => {
    //   if (typeof Intl !== "undefined" && Intl.Segmenter) {
    //     const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    //     return Array.from(segmenter.segment(text), (segment) => segment.segment);
    //   }
    //   return Array.from(text);
    // };
    const splitIntoCharacters = (text: string) => {
        // Vérifie si Intl.Segmenter existe (et cast pour TypeScript)
        const Segmenter = (Intl as any).Segmenter;
        if (typeof Segmenter === 'function') {
            const segmenter = new Segmenter('en', { granularity: 'grapheme' });
            // Cast le résultat pour éviter l'erreur TS
            return Array.from(segmenter.segment(text) as Iterable<{ segment: string }>, (segment) => segment.segment);
        }
        return Array.from(text);
    };
    // Utility to split text into characters, words, or lines
    const splitText = useCallback(
        (text: string) => {
            if (splitBy === 'characters') {
                const words = text.split(' ');
                return words.map((word, i) => ({
                    characters: splitIntoCharacters(word),
                    needsSpace: i !== words.length - 1,
                }));
            }
            if (splitBy === 'words') {
                return text.split(' ').map((word, i, arr) => ({
                    characters: [word],
                    needsSpace: i !== arr.length - 1,
                }));
            }
            if (splitBy === 'lines') {
                return text.split('\n').map((line, i, arr) => ({
                    characters: [line],
                    needsSpace: i !== arr.length - 1,
                }));
            }
            return text.split(splitBy).map((part, i, arr) => ({
                characters: [part],
                needsSpace: i !== arr.length - 1,
            }));
        },
        [splitBy, splitIntoCharacters],
    );
    const elements = useMemo(() => {
        const currentText = typeof texts[currentTextIndex] === 'string' ? texts[currentTextIndex] : '';
        if (splitBy === 'characters') {
            const words = currentText.split(' ');
            return words.map((word, i) => ({
                characters: splitIntoCharacters(word),
                needsSpace: i !== words.length - 1,
            }));
        }
        if (splitBy === 'words') {
            return currentText.split(' ').map((word, i, arr) => ({
                characters: [word],
                needsSpace: i !== arr.length - 1,
            }));
        }
        if (splitBy === 'lines') {
            return currentText.split('\n').map((line, i, arr) => ({
                characters: [line],
                needsSpace: i !== arr.length - 1,
            }));
        }
        return currentText.split(splitBy).map((part, i, arr) => ({
            characters: [part],
            needsSpace: i !== arr.length - 1,
        }));
    }, [texts, currentTextIndex, splitBy]);

    const getStaggerDelay = useCallback(
        (index: number, totalChars: number) => {
            const total = totalChars;
            if (staggerFrom === 'first') return index * staggerDuration;
            if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
            if (staggerFrom === 'center') {
                const center = Math.floor(total / 2);
                return Math.abs(center - index) * staggerDuration;
            }
            if (staggerFrom === 'random') {
                const randomIndex = Math.floor(Math.random() * total);
                return Math.abs(randomIndex - index) * staggerDuration;
            }
            return Math.abs(parseInt(staggerFrom) - index) * staggerDuration;
        },
        [staggerFrom, staggerDuration],
    );

    const handleIndexChange = useCallback(
        (newIndex: number) => {
            setCurrentTextIndex(newIndex);
            if (onNext) onNext(newIndex);
        },
        [onNext],
    );

    const next = useCallback(() => {
        const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
        if (nextIndex !== currentTextIndex) {
            handleIndexChange(nextIndex);
        }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
        const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
        if (prevIndex !== currentTextIndex) {
            handleIndexChange(prevIndex);
        }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
        (index: number) => {
            const validIndex = Math.max(0, Math.min(index, texts.length - 1));
            if (validIndex !== currentTextIndex) {
                handleIndexChange(validIndex);
            }
        },
        [texts.length, currentTextIndex, handleIndexChange],
    );

    const reset = useCallback(() => {
        if (currentTextIndex !== 0) {
            handleIndexChange(0);
        }
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(
        ref,
        () => ({
            next,
            previous,
            jumpTo,
            reset,
        }),
        [next, previous, jumpTo, reset],
    );

    useEffect(() => {
        if (!auto) return;
        const intervalId = setInterval(next, rotationInterval);
        return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto]);

    return (
        <motion.span className={`relative flex flex-wrap whitespace-pre-wrap ${mainClassName}`} {...rest} layout transition={transition}>
            <span className="clip-rect(0,0,0,0) absolute m-[-1px] h-px w-px overflow-hidden border-0 p-0 whitespace-nowrap">
                {texts[currentTextIndex]}
            </span>
            <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
                <motion.div key={currentTextIndex} className={`flex ${splitBy === 'lines' ? 'w-full flex-col' : ''}`} layout aria-hidden="true">
                    {elements.map((wordObj, wordIndex, array) => {
                        const previousCharsCount = array.slice(0, wordIndex).reduce((sum, word) => sum + word.characters.length, 0);
                        return (
                            <span key={wordIndex} className={`inline-flex ${splitLevelClassName}`}>
                                {wordObj.characters.map((char, charIndex) => (
                                    <motion.span
                                        key={charIndex}
                                        initial={initial}
                                        animate={animate}
                                        exit={exit}
                                        transition={{
                                            ...transition,
                                            delay: getStaggerDelay(
                                                previousCharsCount + charIndex,
                                                array.reduce((sum, word) => sum + word.characters.length, 0),
                                            ),
                                        }}
                                        className={`inline-block ${elementLevelClassName}`}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                                {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
                            </span>
                        );
                    })}
                </motion.div>
            </AnimatePresence>
        </motion.span>
    );
});

RotatingText.displayName = 'RotatingText';
export default RotatingText;
// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const RotatingText = ({ texts, mainClassName, staggerFrom, initial, animate, exit, staggerDuration, splitLevelClassName, transition, rotationInterval, customColors }) => {
//   const [index, setIndex] = React.useState(0);

//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % texts.length);
//     }, rotationInterval);
//     return () => clearInterval(interval);
//   }, [texts.length, rotationInterval]);

//   return (
//     <div className={mainClassName}>
//       <AnimatePresence mode="wait">
//         <motion.span
//           key={index}
//           initial={initial}
//           animate={animate}
//           exit={exit}
//           transition={transition}
//           className={splitLevelClassName}
//           style={{ color: customColors?.[index % customColors.length] }}
//         >
//           {texts[index]}
//         </motion.span>
//       </AnimatePresence>
//     </div>
//   );
// };

// export default RotatingText;
