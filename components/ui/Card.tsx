import React, { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'
interface CardProps extends HTMLMotionProps<'div'> {
    hoverEffect?: boolean
}
export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, hoverEffect = false, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    'rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm',
                    hoverEffect &&
                    'hover:shadow-lg hover:border-primary-200 transition-all duration-300 cursor-pointer',
                    className,
                )}
                whileHover={
                    hoverEffect
                        ? {
                            y: -4,
                        }
                        : undefined
                }
                {...props}
            >
                {children}
            </motion.div>
        )
    },
)
Card.displayName = 'Card'
export const CardHeader = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        {...props}
    />
))
CardHeader.displayName = 'CardHeader'
export const CardTitle = forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            'font-semibold leading-none tracking-tight text-slate-900',
            className,
        )}
        {...props}
    />
))
CardTitle.displayName = 'CardTitle'
export const CardDescription = forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-slate-500', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'
export const CardContent = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'
export const CardFooter = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex items-center p-6 pt-0', className)}
        {...props}
    />
))
CardFooter.displayName = 'CardFooter'
