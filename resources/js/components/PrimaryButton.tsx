import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, ...props }) => (
    <button
        {...props}
        className={`px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition ${props.className ?? ''}`}
    >
        {children}
    </button>
);

export default PrimaryButton;
