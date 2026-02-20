"use client"
import { motion } from 'framer-motion'
import { FileText, Plus, Clock } from 'lucide-react'

export default function AssignmentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">Assignments</h1>
                    <p className="text-slate-400">View and manage course assignments and submissions.</p>
                </motion.div>
                <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors">
                    <Plus className="w-5 h-5" />
                    <span>Create Assignment</span>
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-100">React Hooks Basics Quiz</h3>
                            <p className="text-sm text-slate-500">Course: Intro to React</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="text-right">
                            <p className="text-sm text-slate-300">Due Date</p>
                            <p className="text-xs text-slate-500 flex items-center mt-1">
                                <Clock className="w-3 h-3 mr-1" />
                                Feb 15, 2024
                            </p>
                        </div>
                        <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/20">Active</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
