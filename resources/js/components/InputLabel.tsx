import React from 'react';

interface InputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    value?: string;
    className?: string;
}

const InputLabel: React.FC<InputLabelProps> = ({ htmlFor, value, className = '', children, ...props }) => (
    <label htmlFor={htmlFor} className={className} {...props}>
        {value || children}
    </label>
);

export default InputLabel;
