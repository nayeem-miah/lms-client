"use client"
import { motion } from 'framer-motion'
import { Shield, Clock, Book, AlertCircle } from 'lucide-react'

const sections = [
    { title: 'User Agreement', content: 'By accessing or using our platform, you agree to be bound by these terms and all applicable laws and regulations.' },
    { title: 'Intellectual Property', content: 'All course content, videos, and materials are protected by international copyright laws and belong exclusively to EduLearn and its instructors.' },
    { title: 'User Conduct', content: 'Users must maintain a respectful environment. Any form of harassment, hate speech, or intellectual property theft will result in immediate termination of access.' },
    { title: 'Refund Policy', content: 'We offer a 30-day money back guarantee from the date of purchase. Refunds are processed within 5-10 business days.' },
    { title: 'Account Security', content: 'You are responsible for maintaining the confidentiality of your account credentials. EduLearn is not liable for any loss resulting from unauthorized access.' },
]

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-slate-950 py-32 px-4 shadow-2xl">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-24 relative overflow-hidden p-20 bg-slate-900 rounded-[4rem] border border-slate-800 shadow-2xl"
                >
                    <div className="absolute top-0 right-0 h-96 w-96 bg-cyan-500/5 blur-[120px] -mr-48 -mt-48 pointer-events-none" />
                    <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none mb-8">
                        Terms of <br /><span className="text-cyan-400">Service</span>
                    </h1>
                    <div className="flex flex-wrap justify-center gap-6 mt-10">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-black uppercase tracking-widest italic group transition-colors hover:text-cyan-400">
                            <Clock className="h-4 w-4" />
                            Last Updated: March 2026
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-black uppercase tracking-widest italic group transition-colors hover:text-cyan-400">
                            <Shield className="h-4 w-4" />
                            Version 2.4.0
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-12">
                    {sections.map((section, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative pl-12 border-l-2 border-slate-900 hover:border-cyan-500/50 transition-all duration-500"
                        >
                            <div className="absolute left-[-11px] top-0 h-5 w-5 rounded-full bg-slate-950 border-2 border-slate-900 group-hover:border-cyan-500/50 group-hover:bg-cyan-500 transition-all" />
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4 group-hover:text-cyan-400 transition-colors">{section.title}</h3>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed tracking-tight">{section.content}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 p-12 bg-red-500/5 border-2 border-red-500/10 rounded-[3rem] shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-5 transition-transform duration-700 group-hover:rotate-12">
                        <AlertCircle className="w-48 h-48 text-red-500" />
                    </div>
                    <div className="relative z-10">
                        <h4 className="flex items-center gap-3 text-red-400 font-black italic uppercase tracking-widest mb-6">
                            <AlertCircle className="h-6 w-6" />
                            Important Notice
                        </h4>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
                            Failure to comply with these terms may result in account suspension or permanent termination without notice. We reserve the right to modify these terms at any time.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
