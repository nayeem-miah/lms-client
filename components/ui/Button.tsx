import React, { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { Loader2 } from 'lucide-react'
import { motion, HTMLMotionProps } from 'framer-motion'
interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    isLoading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    children: React.ReactNode
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref,
    ) => {
        const variants = {
            primary:
                'bg-cyan-600 text-white hover:bg-cyan-500 shadow-lg shadow-cyan-500/20 focus:ring-cyan-500',
            secondary:
                'bg-slate-800 text-slate-100 hover:bg-slate-700 shadow-sm focus:ring-slate-700',
            outline:
                'border border-slate-700 bg-transparent text-slate-300 hover:border-cyan-500 hover:text-cyan-400 focus:ring-cyan-500',
            ghost:
                'bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:ring-slate-700',
            danger:
                'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-500/20 focus:ring-rose-500',
        }
        const sizes = {
            sm: 'h-8 px-3 text-xs',
            md: 'h-10 px-4 text-sm',
            lg: 'h-12 px-6 text-base',
        }
        return (
            <motion.button
                ref={ref}
                whileTap={{
                    scale: 0.98,
                }}
                className={cn(
                    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
                    variants[variant],
                    sizes[size],
                    className,
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
                {children}
                {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
            </motion.button>
        )
    },
)
Button.displayName = 'Button'
