import React from 'react';

export const Button = ({
    type,
    color = 'bg-violet hover:bg-stone-800',
    size = 'medium',
    rounded = '',
    text = "",
    className = "",
    title,
    onClick,
    children
}) => {
    const sizeClasses = {
        small: 'px-4 py-2 text-sm',
        medium: 'px-6 py-3 text-base',
        large: 'xxs:py-2 xxs:px-6 px-8 py-3 text-lg'
    };
    return (
        <button
            type={type}
            className={`${color} ${text} text-sky-00 border-none outline-offset-0 hover:outline-gray-500 outline-none hover:duration-200 ${sizeClasses[size]} ${className} ${rounded}`}
            title={title}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
