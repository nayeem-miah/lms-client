import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
interface Tab {
    id: string
    label: string
}
interface TabsProps {
    tabs: Tab[]
    activeTab: string
    onChange: (id: string) => void
    className?: string
}
export const Tabs = ({ tabs, activeTab, onChange, className }: TabsProps) => {
    return (
        <div
            className={cn('flex space-x-1 rounded-xl bg-slate-100 p-1', className)}
        >
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={cn(
                        'relative flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                        activeTab === tab.id
                            ? 'text-slate-900'
                            : 'text-slate-600 hover:text-slate-900',
                    )}
                >
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="active-tab"
                            className="absolute inset-0 rounded-lg bg-white shadow-sm"
                            transition={{
                                type: 'spring',
                                bounce: 0.2,
                                duration: 0.6,
                            }}
                        />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                </button>
            ))}
        </div>
    )
}
