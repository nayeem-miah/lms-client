import React from 'react'
import { cn } from '../../lib/utils'
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?:
    | 'default'
    | 'secondary'
    | 'outline'
    | 'destructive'
    | 'success'
    | 'warning'
    | 'accent'
    size?: 'sm' | 'md'
}
export const Badge = ({
    className,
    variant = 'default',
    size = 'md',
    ...props
}: BadgeProps) => {
    const variants = {
        default:
            'border-transparent bg-primary-100 text-primary-700 hover:bg-primary-200',
        secondary:
            'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200',
        outline: 'text-slate-950 border-slate-200',
        destructive: 'border-transparent bg-red-100 text-red-700 hover:bg-red-200',
        success:
            'border-transparent bg-green-100 text-green-700 hover:bg-green-200',
        warning:
            'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        accent:
            'border-transparent bg-accent-100 text-accent-800 hover:bg-accent-200',
    }
    const sizes = {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-0.5 text-xs',
    }
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2',
                variants[variant],
                sizes[size],
                className,
            )}
            {...props}
        />
    )
}
