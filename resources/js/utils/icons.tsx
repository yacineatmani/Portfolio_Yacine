import React from 'react';
import { FaCss3Alt, FaDocker, FaHtml5, FaJs, FaLaravel, FaReact } from 'react-icons/fa';

export const skillIcons: Record<string, React.ReactNode> = {
    Docker: React.createElement(FaDocker, { className: 'w-6 h-6 text-blue-600 dark:text-blue-400' }),
    Laravel: React.createElement(FaLaravel, { className: 'w-6 h-6 text-blue-600 dark:text-blue-400' }),
    React: React.createElement(FaReact, { className: 'w-6 h-6 text-blue-600 dark:text-blue-400' }),
    JavaScript: React.createElement(FaJs, { className: 'w-6 h-6 text-blue-600 dark:text-blue-400' }),
    HTML5: React.createElement(FaHtml5, { className: 'w-6 h-6 text-blue-600 dark:text-blue-400' }),
    CSS: React.createElement(FaCss3Alt, { className: 'w-6 h-6 text-blue-600 dark:text-blue-400' }),
};
