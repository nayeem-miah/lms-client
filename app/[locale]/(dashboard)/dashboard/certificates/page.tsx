"use client"
import { useGetMyEnrollmentsQuery } from '@/lib/redux/features/enrollments/enrollmentsApi'
import { Enrollment, Course } from '@/types/api'
import { motion } from 'framer-motion'
import { Award, Download, ExternalLink, ShieldCheck, Search, BookOpen } from 'lucide-react'
import { useMemo } from 'react'

export default function CertificatesPage() {
    const { data: enrollmentsData, isLoading } = useGetMyEnrollmentsQuery(undefined)
    
    const certificates = useMemo(() => {
        if (!enrollmentsData) return []
        return enrollmentsData.filter((e: Enrollment) => e.progress === 100)
    }, [enrollmentsData])

    if (isLoading) return <div className="p-10 text-center text-slate-500 italic">Validating your achievements...</div>

    return (
        <div className="space-y-10 pb-20">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-black text-slate-100 mb-2 uppercase tracking-tight">Certification Center</h1>
                <p className="text-slate-400 font-medium">Verify, share, and download your hard-earned credentials.</p>
            </motion.div>

            {certificates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert: Enrollment, idx: number) => {
                        const course = cert.courseId as Course
                        const completionDate = new Date(cert.updatedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })
                        
                        return (
                            <motion.div
                                key={cert._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-[2rem] overflow-hidden group hover:border-cyan-500/50 transition-all shadow-xl shadow-black/20"
                            >
                                <div className="p-10 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden h-52 border-b border-slate-700/30">
                                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500 via-transparent to-transparent animate-pulse" />
                                    <ShieldCheck className="w-20 h-20 text-cyan-500 relative z-10 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]" />
                                    <div className="absolute bottom-2 right-2 flex gap-1">
                                        {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-500/20" />)}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <p className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] mb-2">Verified Graduate</p>
                                    <h3 className="text-xl font-black text-slate-100 mb-1 group-hover:text-cyan-400 transition-colors line-clamp-1 leading-tight">{course.title}</h3>
                                    <p className="text-xs font-bold text-slate-500 mb-8 italic">Completed on {completionDate}</p>
                                    
                                    <div className="flex gap-3">
                                        <button className="flex-1 flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/10">
                                            <Download className="w-4 h-4" />
                                            <span>Get PDF</span>
                                        </button>
                                        <button className="flex items-center justify-center bg-slate-700/50 hover:bg-slate-700 text-slate-200 px-4 rounded-2xl transition-all border border-slate-600/30">
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="bg-slate-800/20 border border-dashed border-slate-700 rounded-[3rem] p-20 text-center"
                >
                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-600 border border-slate-700">
                        <Award className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-400 mb-2 uppercase tracking-tighter">No Certificates Yet</h3>
                    <p className="text-slate-500 max-w-sm mx-auto font-medium text-sm leading-relaxed mb-8">Complete your active courses to 100% and claim your official certifications here.</p>
                    <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-black px-8 py-3 rounded-2xl text-xs uppercase tracking-widest border border-slate-700 transition-all">
                        Browse My Enrollments
                    </button>
                </motion.div>
            )}

            <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent border border-cyan-500/20 p-10 rounded-[3rem] flex flex-col md:flex-row items-center gap-8">
                <div className="p-6 rounded-[2rem] bg-cyan-500/20 text-cyan-400 ring-8 ring-cyan-500/5 shadow-2xl">
                    <Search className="w-10 h-10" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h4 className="text-2xl font-black text-slate-100 uppercase tracking-tighter mb-2">Build Your Credentials</h4>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">Platform certificates are recognized by industry leaders. Complete your specialized tracks and unlock new career opportunities with verified proof of expertise.</p>
                </div>
                <button className="whitespace-nowrap bg-white text-slate-900 font-black px-8 py-4 rounded-[1.5rem] text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                    Start Learning
                </button>
            </div>
        </div>
    )
}
