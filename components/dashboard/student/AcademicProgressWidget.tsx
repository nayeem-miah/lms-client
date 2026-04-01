"use client"
import { motion } from 'framer-motion'
import { Trophy, BarChart3, BookOpen } from 'lucide-react'

interface AcademicProgressWidgetProps {
    stats: {
        total: number
        completed: number
        inProgress: number
    }
}

export function AcademicProgressWidget({ stats }: AcademicProgressWidgetProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-8"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-cyan-500/10 rounded-2xl">
                    <BarChart3 className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-100 uppercase tracking-tighter">Academic Summary</h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Verified Progress Data</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-[1.5rem] bg-slate-900/50 border border-slate-700/50">
                    <div className="p-2 bg-emerald-500/10 rounded-xl w-fit mb-4">
                        <Trophy className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-[10px] uppercase font-black text-slate-500 mb-1">Completed</p>
                    <p className="text-2xl font-black text-emerald-400 tabular-nums">{stats.completed}</p>
                </div>
                <div className="p-5 rounded-[1.5rem] bg-slate-900/50 border border-slate-700/50">
                    <div className="p-2 bg-blue-500/10 rounded-xl w-fit mb-4">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                    </div>
                    <p className="text-[10px] uppercase font-black text-slate-500 mb-1">Total Enrolled</p>
                    <p className="text-2xl font-black text-blue-400 tabular-nums">{stats.total}</p>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Mastery Goal</p>
                        <span className="text-[10px] font-black text-cyan-400 tabular-nums bg-cyan-400/10 px-2 py-0.5 rounded-md border border-cyan-400/20">{(stats.completed / (stats.total || 1) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(stats.completed / (stats.total || 1) * 100)}%` }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full"
                        />
                    </div>
                </div>
                <p className="text-[10px] text-center text-slate-500 font-bold italic leading-tight">Keep pushing towards your learning goals 🎯</p>
            </div>
        </motion.div>
    )
}
