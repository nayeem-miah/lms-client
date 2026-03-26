"use client"
import { motion } from 'framer-motion'
import { Lock, EyeOff, ShieldCheck, Database, Fingerprint } from 'lucide-react'

const policies = [
    { title: 'Data Encryption', desc: 'Secure industry-standard 256-bit AES encryption protecting your personal information.', icon: Lock },
    { title: 'Privacy Promise', desc: 'We never sell or share your personal learning data to third-party marketers.', icon: EyeOff },
    { title: 'Security Audits', desc: 'Regular independent security audits to ensure your safety and data integrity.', icon: ShieldCheck },
    { title: 'Data Retention', desc: 'Securely store and delete your data according to GDPR and local compliance.', icon: Database },
]

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-950 py-32 px-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] pointer-events-none" />
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-32 relative z-10"
                >
                    <div className="h-20 w-20 bg-emerald-500/10 rounded-[2rem] border-2 border-emerald-500/20 flex items-center justify-center mx-auto mb-10 text-emerald-400 shadow-2xl animate-pulse">
                        <Lock className="h-10 w-10" />
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none mb-8">
                        Privacy <br /><span className="text-emerald-400">Policy</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium tracking-tight max-w-2xl mx-auto italic">
                        Your trust is our greatest asset. Learn how we handle your data with professional-grade security and transparency.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {policies.map((policy, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 bg-slate-900 border-2 border-slate-800 rounded-[3rem] shadow-2xl hover:border-emerald-500/30 transition-all group"
                        >
                            <div className="h-14 w-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <policy.icon className="h-6 w-6 text-emerald-400" />
                            </div>
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-4">{policy.title}</h3>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed tracking-tight">{policy.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-slate-900 border-2 border-slate-800 p-16 rounded-[4rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-16 opacity-5 rotate-12 transition-transform duration-1000 group-hover:rotate-0 pointer-events-none">
                        <Fingerprint className="w-64 h-64 text-emerald-400" />
                    </div>
                    <div className="relative z-10 space-y-10">
                        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">
                            GDPR & <br /> <span className="text-emerald-400">Compliance</span>
                        </h2>
                        <div className="space-y-6 text-slate-500 text-lg font-medium leading-relaxed max-w-2xl">
                            <p>We are fully compliant with General Data Protection Regulation (GDPR) standards. You have full control over your data, including the right to request access, correction, and deletion of your personal information at any time.</p>
                            <p>Our infrastructure is protected by advanced firewalls, intrusion detection systems, and regular vulnerability scanning to ensure your learning experience is always secure.</p>
                        </div>
                        <div className="pt-10 flex gap-10 opacity-30 grayscale contrast-125 saturate-0">
                            {['ISO 27001', 'SOC 2 TYPE II', 'GDPR READY', 'CCPA'].map(cert => (
                                <span key={cert} className="text-xs font-black uppercase italic tracking-[0.3em] text-white whitespace-nowrap">{cert}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
