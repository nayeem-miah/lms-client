"use client"
import { motion } from 'framer-motion'
import { Users, Mail, MessageSquare } from 'lucide-react'

export default function StudentsManagementPage() {
    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-slate-100 mb-2">My Students</h1>
                <p className="text-slate-400">Manage students enrolled in your courses.</p>
            </motion.div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden text-center p-12">
                <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-300 mb-2">Manage Your Community</h3>
                <p className="text-slate-500 mb-6 max-w-sm mx-auto">Engage with your students, track their progress, and provide feedback directly.</p>
                <div className="p-8 text-center text-slate-500 border border-dashed border-slate-700 rounded-xl">
                    Student roster and performance data will be displayed here.
                </div>
            </div>
        </div>
    )
}
