import { Select } from "../Select/Select.jsx"

export const Input = ({placeholdercolor = "", placeholder ="", size = "medium", value, onChange, type="text", label, className = "", options = [],}) => {
    const sizeClasses = {
        small: 'xxs:py-1 px-2 py-2 w-full text-sm',
        medium: 'xxs:py-1 px-2 py-1 w-full text-base',
        large: 'xxs:py-1 px-2 py-3 w-full text-lg'
   }
    
    return (
        <div>
                <label className="text-blue-normal">{label}</label>
                {type === "select" ? (
                    <Select value={value} onChange={onChange} className={` ${sizeClasses[size]} ${className}`} options={options}/>
                ): (
                <input type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={` ${placeholder} ${placeholdercolor} ${sizeClasses[size]} flex bg-dark-violet-background text-blue-normal border-blue-normal text-start border-b-2 border-t-2 border-r-2 border-l-2 px-1 py-4 outline-none placeholder:text-blue-normal-light placeholder:opacity-50 focus:border-stone-600 invalid:focus:border-red-400 valid:focus:border-green-400 rounded-md mb-5 w-96`}
               />
               )}
        </div>
    )
}
