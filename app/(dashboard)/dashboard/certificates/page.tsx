"use client"
import { motion } from 'framer-motion'
import { Award, Download, ExternalLink, ShieldCheck } from 'lucide-react'

export default function CertificatesPage() {
    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-slate-100 mb-2">My Certificates</h1>
                <p className="text-slate-400">View and download your earned certificates for completed courses.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden group hover:border-cyan-500/50 transition-all"
                >
                    <div className="p-8 bg-gradient-to-br from-cyan-900 to-slate-900 flex items-center justify-center relative overflow-hidden h-48">
                        <Award className="w-24 h-24 text-cyan-400/20 absolute -right-4 -bottom-4 rotate-12" />
                        <ShieldCheck className="w-16 h-16 text-cyan-500" />
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-100 mb-1 group-hover:text-cyan-400 transition-colors">Complete Web Development</h3>
                        <p className="text-sm text-slate-400 mb-6">Earned on January 15, 2024</p>
                        <div className="flex space-x-3">
                            <button className="flex-1 flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-slate-200 py-2 rounded-lg transition-colors">
                                <Download className="w-4 h-4" />
                                <span>Download PDF</span>
                            </button>
                            <button className="flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-slate-200 p-2 rounded-lg transition-colors">
                                <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="bg-cyan-500/5 border border-cyan-500/20 p-6 rounded-2xl flex items-center space-x-6">
                <div className="p-4 rounded-full bg-cyan-500/10 text-cyan-500">
                    <Award className="w-8 h-8" />
                </div>
                <div>
                    <h4 className="text-lg font-bold text-slate-100">Want more certificates?</h4>
                    <p className="text-sm text-slate-400">Complete more courses to build your profile and showcase your skills to employers.</p>
                </div>
            </div>
        </div>
    )
}
