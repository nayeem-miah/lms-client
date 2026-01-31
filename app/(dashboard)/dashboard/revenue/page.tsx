"use client"
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react'

export default function RevenueReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">Revenue Reports</h1>
                    <p className="text-slate-400">Detailed financial analysis and sales reports.</p>
                </motion.div>
                <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg transition-colors">
                        <Calendar className="w-5 h-5" />
                        <span>Last 30 Days</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition-colors">
                        <Download className="w-5 h-5" />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4 text-emerald-400">
                        <DollarSign className="w-6 h-6" />
                        <h3 className="font-semibold text-slate-100">Total Revenue</h3>
                    </div>
                    <p className="text-3xl font-bold text-slate-100">৳145,200</p>
                    <div className="flex items-center mt-2 text-emerald-400 text-sm">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span>+12.5% from last month</span>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center text-slate-500">
                Detailed charts and transaction logs will be integrated here.
            </div>
        </div>
    )
}
