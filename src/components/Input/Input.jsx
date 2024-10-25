import React, { useState } from 'react';

export const Input = ({
    placeholdercolor = "",
    onClick,
    placeholder = "",
    type = "",
    color = '',
    size = "medium",
    value,
    onChange,
    label,
    className = "",
    options = [],
    name
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const sizeClasses = {
        small: 'xxs:py-1 px-2 py-2 w-full text-sm',
        medium: 'xxs:py-1 px-2 py-1 w-full text-base',
        large: 'xxs:py-2 px-2 py-3 w-full text-lg'
    };

    const handleClick = () => {
        document.getElementById("fileInput").click();
    };

    const passwordVisibility = () => {
        setShowPassword(!showPassword)
    };

    return (
        <div>
            <label className="text-blue-normal">{label}</label>
            {type === "file" ? (
                <div className="flex flex-col items-start">
                <input
                  id="fileInput"
                  type="file"
                  name={name}
                  onChange={onChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={handleClick}
                  className="bg-card text-blue-normal border-blue-normal border-2 py-2 px-4 rounded-md focus:ring-2 focus:ring-stone-600 focus:outline-none hover:bg-violet-800 hover:text-white w-full text-start"
                >
                  Selecionar Arquivo
                </button>
                </div>
            ) : (
                <div className="flex items-center relative">
                <input
                    type={type === "password" && showPassword ? "text" : type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={` ${placeholder} ${placeholdercolor} ${sizeClasses[size]} ${color} flex bg-dark-violet-background text-blue-normal border-blue-normal text-start border-b-2 border-t-2 border-r-2 border-l-2 px-1 py-4 outline-none placeholder:text-blue-normal-light placeholder:opacity-50 focus:border-stone-600 invalid:focus:border-red-400 valid:focus:border-green-400 rounded-md mb-5 w-96`}
                />
                {type === "password" && (
                    <button
                    type='button'
                    onClick={passwordVisibility}
                    className="absolute right-2 transform -translate-y-1/2 bg-blue-normal text-dark-violet-background px-3 rounded-md focus:outline-none hover:bg-violet-800"
                    >
                    {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
            )}
            </div>
            )}
            </div>
            );        
        }

export default Input;
