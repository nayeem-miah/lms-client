import React, { useState } from 'react'
import { Star, StarHalf } from 'lucide-react'
import { cn } from '../../lib/utils'
interface RatingProps {
    rating: number
    maxRating?: number
    size?: 'sm' | 'md' | 'lg'
    showCount?: boolean
    count?: number
    className?: string
    readonly?: boolean
    onChange?: (rating: number) => void
}
export const Rating = ({
    rating,
    maxRating = 5,
    size = 'md',
    showCount = false,
    count,
    className,
    readonly = true,
    onChange,
}: RatingProps) => {
    const [hoverRating, setHoverRating] = useState<number | null>(null)
    const sizes = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
    }
    const handleMouseEnter = (index: number) => {
        if (!readonly) setHoverRating(index)
    }
    const handleMouseLeave = () => {
        if (!readonly) setHoverRating(null)
    }
    const handleClick = (index: number) => {
        if (!readonly && onChange) onChange(index)
    }
    const displayRating = hoverRating !== null ? hoverRating : rating
    return (
        <div className={cn('flex items-center gap-1', className)}>
            <div className="flex">
                {[...Array(maxRating)].map((_, i) => {
                    const index = i + 1
                    const isFull = index <= Math.floor(displayRating)
                    const isHalf =
                        !isFull &&
                        index === Math.ceil(displayRating) &&
                        displayRating % 1 >= 0.5
                    return (
                        <div
                            key={i}
                            className={cn(
                                'transition-colors',
                                !readonly && 'cursor-pointer hover:scale-110',
                            )}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick(index)}
                        >
                            {isHalf ? (
                                <div className="relative">
                                    <Star
                                        className={cn(sizes[size], 'text-slate-200 fill-slate-200')}
                                    />
                                    <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                                        <Star
                                            className={cn(
                                                sizes[size],
                                                'text-amber-400 fill-amber-400',
                                            )}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <Star
                                    className={cn(
                                        sizes[size],
                                        isFull
                                            ? 'text-amber-400 fill-amber-400'
                                            : 'text-slate-200 fill-slate-200',
                                    )}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
            {showCount && count !== undefined && (
                <span className="text-xs text-slate-500 ml-1">({count})</span>
            )}
        </div>
    )
}
