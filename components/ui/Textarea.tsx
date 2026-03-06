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
                        className="text-sm font-medium text-slate-300 block"
                    >
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={cn(
                        'flex min-h-[80px] w-full rounded-xl border border-slate-700/50 bg-slate-800/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
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
