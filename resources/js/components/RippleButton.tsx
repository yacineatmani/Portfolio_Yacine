import React from 'react';

export function RippleButton({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
        circle.className = 'ripple';
        button.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    };
    return (
        <button {...props} className={`relative overflow-hidden ${className}`} onClick={handleClick}>
            {children}
        </button>
    );
}

// Ajoute ce CSS dans ton fichier global ou dashboard.css :
// .ripple {
//   position: absolute;
//   border-radius: 50%;
//   transform: scale(0);
//   animation: ripple 0.6s linear;
//   background: rgba(99, 102, 241, 0.3);
//   pointer-events: none;
//   z-index: 10;
// }
// @keyframes ripple {
//   to {
//     transform: scale(4);
//     opacity: 0;
//   }
// }
