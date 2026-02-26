import React, { forwardRef, useState } from 'react'
import { cn } from '../../lib/utils'
import { AlertCircle, Eye, EyeOff } from 'lucide-react'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    icon?: React.ReactNode
    helperText?: string
    showPasswordToggle?: boolean
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, helperText, showPasswordToggle, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false)
        const isPasswordField = type === 'password'
        const inputType = isPasswordField && showPassword ? 'text' : type

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
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        type={inputType}
                        className={cn(
                            'flex h-10 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 shadow-inner',
                            icon && 'pl-10',
                            (isPasswordField && showPasswordToggle !== false) && 'pr-10',
                            error && 'border-rose-500 focus:ring-rose-500',
                            className,
                        )}
                        {...props}
                    />
                    {isPasswordField && showPasswordToggle !== false && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    )}
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
Input.displayName = 'Input'
