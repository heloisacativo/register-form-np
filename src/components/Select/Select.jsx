import React from 'react';

export const Select = ({
    placeholder,
    value,
    onChange,
    className = "",
    options = [],
    name
}) => {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`
            flex
            bg-dark-violet-background
            text-blue-normal-light
            border-blue-normal
            border-b-2 
            border-t-2 
            border-r-2 
            border-l-2 
            outline-none
            placeholder:text-blue-normal-light
            placeholder:opacity-50 
            focus:border-stone-600 
            rounded-md mb-5 ${className}`}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
