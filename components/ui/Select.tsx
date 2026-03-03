import React, { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { ChevronDown, AlertCircle } from 'lucide-react'
interface SelectOption {
    value: string
    label: string
}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    options: SelectOption[]
    placeholder?: string
    helperText?: string
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        { className, label, error, options, placeholder, helperText, ...props },
        ref,
    ) => {
        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label
                        htmlFor={props.id}
                        className="text-sm font-medium text-slate-300 block"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        className={cn(
                            'flex h-10 w-full appearance-none rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 shadow-inner',
                            error && 'border-rose-500 focus:ring-rose-500',
                            className,
                        )}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled className="bg-slate-900 text-slate-100">
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option key={option.value} value={option.value} className="bg-slate-900 text-slate-100">
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
                {helperText && !error && (
                    <p className="text-xs text-slate-500 italic">{helperText}</p>
                )}
                {error && (
                    <div className="flex items-center text-rose-400 text-xs mt-1">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        <span>{error}</span>
                    </div>
                )}
            </div>
        )
    },
)
Select.displayName = 'Select'
