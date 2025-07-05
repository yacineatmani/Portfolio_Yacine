import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, ...props }) => (
    <button {...props} className={`rounded bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700 ${props.className ?? ''}`}>
        {children}
    </button>
);

export default PrimaryButton;
