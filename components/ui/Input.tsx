import React, { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { AlertCircle } from 'lucide-react'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    icon?: React.ReactNode
    helperText?: string
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, helperText, ...props }, ref) => {
        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label
                        htmlFor={props.id}
                        className="text-sm font-medium text-slate-700 block"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            'flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
                            icon && 'pl-10',
                            error && 'border-red-500 focus:ring-red-500',
                            className,
                        )}
                        {...props}
                    />
                </div>
                {helperText && !error && (
                    <p className="text-xs text-slate-500">{helperText}</p>
                )}
                {error && (
                    <div className="flex items-center text-red-500 text-xs mt-1">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        <span>{error}</span>
                    </div>
                )}
            </div>
        )
    },
)
Input.displayName = 'Input'
