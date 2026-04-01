"use client"
import { motion } from 'framer-motion'
import { TrendingUp, LucideIcon } from 'lucide-react'

interface StatsCardProps {
    icon: LucideIcon
    label: string
    value: string
    trend: string
    color: string
    delay: number
    variant?: 'admin' | 'student'
}

export function DashboardStatsCard({ icon: Icon, label, value, trend, color, delay, variant = 'student' }: StatsCardProps) {
    const isStudent = variant === 'student'
    
    // Determine text color based on bg- color (e.g. bg-cyan-500 -> text-cyan-400)
    const getTextColor = (bgColor: string) => {
        const base = bgColor.replace('bg-', '')
        return `text-${base.split('-')[0]}-400`
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={`group bg-slate-800/30 backdrop-blur-md border border-slate-700/50 ${isStudent ? 'rounded-[2rem]' : 'rounded-xl'} p-6 hover:border-cyan-500/30 transition-all duration-300 shadow-lg`}
        >
            <div className="flex justify-between items-start mb-6">
                <div className={`p-4 ${isStudent ? 'rounded-2xl' : 'rounded-xl'} ${isStudent ? `bg-${color}-500/10` : `${color} bg-opacity-10`}`}>
                    <Icon className={`w-6 h-6 ${isStudent ? `text-${color}-400` : getTextColor(color)}`} />
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 bg-slate-900/50 rounded-full border border-white/5`}>
                   <TrendingUp className="w-3 h-3 text-emerald-400" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest tabular-nums">{trend}</span>
                </div>
            </div>
            <div>
                <p className="text-3xl font-black text-slate-100 mb-1 tabular-nums tracking-tighter leading-none">{value}</p>
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{label}</h4>
            </div>
        </motion.div>
    )
}
