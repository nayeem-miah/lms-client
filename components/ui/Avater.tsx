import React, { useState } from 'react'
import { cn } from '../../lib/utils'
import { User } from 'lucide-react'
interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
}
export const Avatar = ({
    className,
    src,
    alt,
    fallback,
    size = 'md',
    ...props
}: AvatarProps) => {
    const [imageError, setImageError] = useState(false)
    const sizes = {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-14 w-14 text-base',
        xl: 'h-20 w-20 text-lg',
    }
    return (
        <div
            className={cn(
                'relative flex shrink-0 overflow-hidden rounded-full bg-slate-100',
                sizes[size],
                className,
            )}
        >
            {src && !imageError ? (
                <img
                    src={src}
                    alt={alt || 'Avatar'}
                    className="aspect-square h-full w-full object-cover"
                    onError={() => setImageError(true)}
                    {...props}
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-500 font-medium">
                    {fallback ? (
                        fallback.slice(0, 2).toUpperCase()
                    ) : (
                        <User className="h-[50%] w-[50%]" />
                    )}
                </div>
            )}
        </div>
    )
}
