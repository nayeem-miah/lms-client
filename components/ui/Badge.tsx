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
            'border-cyan-500/20 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20',
        secondary:
            'border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700',
        outline: 'text-slate-400 border-slate-700 hover:bg-slate-800',
        destructive: 'border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20',
        success:
            'border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20',
        warning:
            'border-amber-500/20 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20',
        accent:
            'border-purple-500/20 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20',
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
