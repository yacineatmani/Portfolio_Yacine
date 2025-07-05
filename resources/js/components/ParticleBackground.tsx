import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import { useTheme } from './context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const ParticleBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && theme === 'dark') {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                interface Particle {
                    x: number;
                    y: number;
                    size: number;
                    speedX: number;
                    speedY: number;
                }

                const particles: Particle[] = [];
                for (let i = 0; i < 50; i++) {
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        size: Math.random() * 3 + 1,
                        speedX: Math.random() * 2 - 1,
                        speedY: Math.random() * 2 - 1,
                    });
                }

                function animate() {
                    if (!canvas || !ctx) return;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    particles.forEach((p) => {
                        p.x += p.speedX;
                        p.y += p.speedY;
                        if (p.x < 0 || p.x > canvas.width) p.speedX = -p.speedX;
                        if (p.y < 0 || p.y > canvas.height) p.speedY = -p.speedY;
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.fill();
                    });
                    requestAnimationFrame(animate);
                }
                animate();

                gsap.to(canvas, { y: 50, ease: 'power1.out', scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom top', scrub: true } });
            }
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [theme]);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }} />;
};

export default ParticleBackground;
