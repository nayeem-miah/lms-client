import React, { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { AlertCircle } from 'lucide-react'
interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
    helperText?: string
}
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, helperText, ...props }, ref) => {
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
                <textarea
                    ref={ref}
                    className={cn(
                        'flex min-h-[80px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
                        error && 'border-red-500 focus:ring-red-500',
                        className,
                    )}
                    {...props}
                />
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
Textarea.displayName = 'Textarea'
