import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextInput: React.FC<TextInputProps> = (props) => (
    <input
        {...props}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${props.className ?? ''}`}
    />
);

export default TextInput;
