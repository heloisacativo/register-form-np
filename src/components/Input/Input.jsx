import { EyeIcon, EyeSlashIcon, PhotoIcon } from '@heroicons/react/16/solid';
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
        large: 'xxs:py-1 px-2 py-2 w-full text-md'
    };

    const handleClick = () => {
        document.getElementById("fileInput").click();
    };

    const passwordVisibility = () => {
        setShowPassword(!showPassword)
    };

    return (
        <div>
            <label className="text-muted-foreground">{label}</label>
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
                  className="mb-2 mt-1 bg-background text-muted-foreground border py-1 px-3 rounded-md focus:ring-2 focus:ring-stone-600 focus:outline-none w-full text-start flex items-center justify-between"
                >
                  Selecionar Imagem
                  <PhotoIcon className="w-5 h-5 ml-2"/>
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
                    className={` ${placeholder} ${placeholdercolor} ${sizeClasses[size]} ${color} flex bg-background text-muted-foreground border-border border text-start outline-none placeholder:text-muted-foreground placeholder:opacity-50 invalid:focus:border-red-400 valid:focus:border-green-400 rounded-md mb-2 mt-1 w-96`}
                />
                {type === "password" && (
                    <button
                    type='button'
                    onClick={passwordVisibility}
                    className="absolute right-2 transform -translate-y-2/2 text-muted-foreground px-3 rounded-md focus:outline-noneborder-border"
                    >
                    {showPassword ? (
                        <EyeSlashIcon className='h-5 w-5' aria-hidden="true"/>
                    ) : (
                        <EyeIcon className='h-5 w-5' aria-hidden="true"/>
                    )}
                    </button>
            )}
            </div>
            )}
            </div>
            );        
        }

export default Input;
