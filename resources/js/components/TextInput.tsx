import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextInput: React.FC<TextInputProps> = (props) => (
    <input {...props} className={`rounded border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${props.className ?? ''}`} />
);

export default TextInput;
