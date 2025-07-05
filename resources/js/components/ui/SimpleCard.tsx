import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className, padding = 'md' }: CardProps) {
    const paddingClasses = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            className={cn(
                'rounded-xl border border-gray-200 bg-white shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800',
                paddingClasses[padding],
                className,
            )}
        >
            {children}
        </div>
    );
}

// Alias pour compatibilité
export const SimpleCard = Card;
