import { Select } from "../Select/Select.jsx"

export const Input = ({placeholder ="", value, onChange, type="text", label, className = "", options = [],}) => {
    const defaultClass = "flex bg-dark-violet-background text-blue-normal border-blue-normal text-center border-b-2 border-t-2 border-r-2 border-l-2 px-28 py-3 outline-none placeholder:text-blue-normal-light placeholder:opacity-50 focus:border-stone-600 invalid:focus:border-red-400 valid:focus:border-green-400 rounded-md mb-5"
    return (
        <div className="inputContainer">
                <label className="text-blue-normal">{label}</label>
                {type === "select" ? (
                    <Select value={value} onChange={onChange} className={className} options={options}/>
                ): (
                <input type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={` ${className ? className : defaultClass}`}
               />
               )}
        </div>
    )
}