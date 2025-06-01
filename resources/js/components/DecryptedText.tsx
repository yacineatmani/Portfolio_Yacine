import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'view' | 'click';
  revealDirection?: 'left' | 'right' | 'center';
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*',
  className = '',
  parentClassName = '',
  encryptedClassName = 'encrypted',
  animateOn = 'hover',
  revealDirection = 'left',
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: animateOn === 'view' });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomChar = () => characters[Math.floor(Math.random() * characters.length)];

  const scrambleText = () => {
    let iterations = 0;
    setIsAnimating(true);

    const animate = () => {
      if (iterations >= maxIterations) {
        setDisplayText(text);
        setIsAnimating(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        return;
      }

      const scrambled = text
        .split('')
        .map((char, i) => {
          if (revealDirection === 'left' && i < iterations) return char;
          if (revealDirection === 'right' && i > text.length - iterations) return char;
          if (revealDirection === 'center') {
            const mid = text.length / 2;
            if (Math.abs(i - mid) < iterations / 2) return char;
          }
          return getRandomChar();
        })
        .join('');

      setDisplayText(scrambled);
      iterations++;
      timeoutRef.current = setTimeout(animate, speed);
    };

    animate();
  };

  useEffect(() => {
    if (animateOn === 'view' && isInView && !isAnimating) {
      scrambleText();
    }

    const element = ref.current;
    if (!element) return;

    const handleEvent = () => {
      if (!isAnimating) scrambleText();
    };

    if (animateOn === 'hover') {
      element.addEventListener('mouseenter', handleEvent);
    } else if (animateOn === 'click') {
      element.addEventListener('click', handleEvent);
    }

    return () => {
      if (animateOn === 'hover') {
        element.removeEventListener('mouseenter', handleEvent);
      } else if (animateOn === 'click') {
        element.removeEventListener('click', handleEvent);
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isInView, animateOn, text, speed, maxIterations, characters, isAnimating, revealDirection]);

  return (
    <div className={`relative inline-block ${parentClassName}`} ref={ref}>
      <motion.span
        className={`${className} ${isAnimating ? encryptedClassName : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {displayText}
      </motion.span>
    </div>
  );
}