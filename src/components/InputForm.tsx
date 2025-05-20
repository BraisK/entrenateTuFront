"use client"

import type React from "react"
import { useState } from "react"

interface InputFormProps {
    text: string
    name: string
    value?: string
    checked?: boolean
    placeholder?: string
    type?: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: string | undefined
    icon?: React.ReactNode
}

function InputForm({
    text,
    name,
    value,
    checked,
    handleChange,
    error,
    placeholder = "",
    type = "text",
    icon,
}: InputFormProps) {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className="mb-5 w-full">
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-700">
                {text}
            </label>
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-500">
                        {icon}
                    </div>
                )}
                <input
                    value={value}
                    checked={checked}
                    onChange={handleChange}
                    type={type}
                    name={name}
                    id={name}
                    className={`${icon ? "pl-10" : "pl-4"
                        } bg-white border-2 border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2.5 transition-all duration-200 ease-in-out ${isFocused ? "border-blue-500 shadow-md shadow-blue-100 ring-2 ring-blue-100" : "hover:border-gray-300"
                        }`}
                    placeholder={placeholder}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
            {error && <p className="mt-2 text-sm text-red-600 bg-red-50 p-1 rounded-md border-l-2 border-red-500">{error}</p>}
        </div>
    )
}

export default InputForm
