import React from 'react';

export const Button = ({
    type = 'button',
    color = 'bg-primary-chart hover:bg-violet-800',
    text = 'text-primary-foreground',
    size = 'medium',
    rounded = 'rounded-md',
    className = '',
    title,
    onClick,
    children
}) => {
    const sizeClasses = {
        small: 'px-4 py-2 text-sm',
        medium: 'px-6 py-3 text-base',
        large: 'xxs:py-2 xxs:px-6 px-8 py-3 text-lg',
    };

    return (
        <button
            type={type}
            className={`${color} ${text} border-none outline-none focus:outline-offset-2 focus:outline-primary-chart 
                transition duration-200 ease-in-out ${sizeClasses[size]} ${rounded} ${className}`}
            title={title}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
