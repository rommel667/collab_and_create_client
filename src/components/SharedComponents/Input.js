import React from 'react'

const Input = ({ label, id, name, type, autoComplete, placeholder, value, onChange }) => {
    return (
        <div className="space-y-6">
            <label htmlFor={id} className="sr-only">
                {label}
            </label>
            <input
                value={value}
                onChange={onChange}
                id={id}
                name={name}
                type={type}
                autoComplete={autoComplete}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-500 focus:z-10 sm:text-sm inputNumber"
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input