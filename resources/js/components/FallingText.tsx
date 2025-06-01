import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FallingTextProps {
  text: string;
  className: string;
  speed?: number;
}

const FallingText: React.FC<FallingTextProps> = ({ text, className, speed = 2 }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      gsap.fromTo(
        element,
        { y: -100, opacity: 0 },
        {
          y: 600,
          opacity: 1,
          duration: speed,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
        }
      );
    }
  }, [text, speed]);

  return <div ref={textRef} className={className}>{text}</div>;
};

export default FallingText;