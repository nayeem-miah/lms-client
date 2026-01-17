import React from 'react'
import { cn } from '../../lib/utils'
import { motion } from 'framer-motion'
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number
    max?: number
    variant?: 'default' | 'success' | 'warning' | 'danger'
    showLabel?: boolean
}
export const Progress = ({
    value,
    max = 100,
    variant = 'default',
    showLabel = false,
    className,
    ...props
}: ProgressProps) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    const variants = {
        default: 'bg-primary-600',
        success: 'bg-secondary-500',
        warning: 'bg-amber-500',
        danger: 'bg-red-500',
    }
    return (
        <div className={cn('w-full', className)} {...props}>
            <div className="flex justify-between mb-1">
                {showLabel && (
                    <span className="text-xs font-medium text-slate-700">Progress</span>
                )}
                {showLabel && (
                    <span className="text-xs font-medium text-slate-700">
                        {Math.round(percentage)}%
                    </span>
                )}
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <motion.div
                    className={cn('h-full rounded-full', variants[variant])}
                    initial={{
                        width: 0,
                    }}
                    animate={{
                        width: `${percentage}%`,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                    }}
                />
            </div>
        </div>
    )
}
