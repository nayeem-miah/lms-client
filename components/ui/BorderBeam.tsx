"use client"

import React from 'react'

interface BorderBeamProps {
    className?: string
    duration?: number
    delay?: number
    colorFrom?: string
    colorTo?: string
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
    className = '',
    duration = 15,
    delay = 0,
    colorFrom = 'from-purple-500',
    colorTo = 'to-cyan-500',
}) => {
    return (
        <div
            className={`pointer-events-none absolute inset-0 rounded-lg ${className}`}
            style={{
                background: `linear-gradient(90deg, transparent, transparent)`,
            }}
        >
            <div
                className={`absolute inset-0 rounded-lg bg-gradient-to-r ${colorFrom} via-pink-500 ${colorTo} opacity-0 blur-sm animate-border-beam`}
                style={{
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`,
                }}
            />
        </div>
    )
}
