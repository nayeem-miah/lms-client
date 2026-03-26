"use client"
import { motion } from 'framer-motion'
import { Building2, ShieldCheck, PieChart, Users2, Rocket, Briefcase, Zap, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Link } from '@/i18n/routing'

const solutions = [
    { title: 'Training Excellence', desc: 'Craft custom learning paths for your unique team workflows.', icon: Building2 },
    { title: 'Advanced Reports', desc: 'Track skill progression with interactive analytical dashboards.', icon: PieChart },
    { title: 'Team Management', desc: 'Effortlessly oversee users, groups, and permissions.', icon: Users2 },
    { title: 'Custom Content', desc: 'Incorporate your company\'s resources into our expert library.', icon: Briefcase },
]

export default function BusinessPage() {
    return (
        <div className="min-h-screen bg-slate-950">
            {/* Hero Section */}
            <div className="relative pt-32 pb-24 px-4 overflow-hidden text-center bg-gradient-to-b from-slate-900 to-slate-950">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/5 rounded-full blur-[150px] -mt-64 z-0" />
                
                <div className="max-w-4xl mx-auto relative z-10 font-bold mb-10">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center mb-10">
                        <div className="px-6 py-2 bg-slate-800 border-2 border-slate-700/50 rounded-full flex items-center gap-3 shadow-2xl backdrop-blur-md">
                            <Rocket className="w-5 h-5 text-cyan-400 animate-pulse" />
                            <span className="text-xs font-black uppercase text-slate-100 tracking-[0.2em] italic">Scale Your Empire</span>
                        </div>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.85] mb-8"
                    >
                        Future-Proof Your <br /> 
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">Team's Skills</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-xl md:text-2xl font-medium max-w-3xl mx-auto mb-16 italic tracking-tight"
                    >
                        The world's leading platform for corporate learning and professional development. Join 2,000+ top companies trust us.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/contact">
                            <Button className="px-16 py-8 rounded-3xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase italic tracking-widest shadow-[0_0_50px_-12px_rgba(6,182,212,0.5)] border-none text-lg active:scale-95 transition-all">
                                Get Corporate Quote
                            </Button>
                        </Link>
                        <Button variant="outline" className="px-16 py-8 rounded-3xl border-slate-700 text-white font-black uppercase italic tracking-widest hover:bg-slate-800/50 backdrop-blur-sm transition-all text-lg border-2">
                            Explore Features
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Trusted By */}
            <div className="max-w-7xl mx-auto py-16 px-4 text-center border-y border-slate-900/50 bg-slate-950 relative z-20">
                <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] mb-10 italic">Trusted by Global Industry Leaders</p>
                <div className="flex flex-wrap justify-center gap-16 opacity-30 grayscale contrast-125">
                    {['Google', 'Netflix', 'Amazon', 'Meta', 'Microsoft'].map(name => (
                        <span key={name} className="text-3xl font-black italic tracking-tighter text-white uppercase">{name}</span>
                    ))}
                </div>
            </div>

            {/* Enterprise Grid */}
            <div className="max-w-7xl mx-auto py-32 px-4 relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="flex-1 space-y-12">
                        <h2 className="text-5xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                            Enterprise <br /> Grade <span className="text-cyan-500">Solutions</span>
                        </h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {solutions.map((item, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    className="p-8 bg-slate-900 border border-slate-800/80 rounded-[2.5rem] shadow-2xl hover:border-cyan-500/30 transition-all duration-500 group"
                                >
                                    <div className="h-14 w-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <item.icon className="h-6 w-6 text-cyan-400 group-hover:rotate-12 transition-transform" />
                                    </div>
                                    <h4 className="text-xl font-black text-white italic uppercase tracking-tight mb-3 transition-colors group-hover:text-cyan-400">{item.title}</h4>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed tracking-tight">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <div className="absolute inset-0 bg-cyan-500/20 rounded-[4rem] blur-[120px] scale-90" />
                        <div className="relative bg-slate-900 border-2 border-slate-800 rounded-[4rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                                <ShieldCheck className="w-64 h-64 text-cyan-400" />
                            </div>
                            <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-8 leading-tight relative z-10">
                                Security First <br /> Mentality
                            </h3>
                            <ul className="space-y-6 relative z-10">
                                {[
                                    { icon: ShieldCheck, text: 'SSO & Advanced User Provisioning' },
                                    { icon: Zap, text: 'Custom API Integrations & Webhooks' },
                                    { icon: Star, text: '99.9% High Availability SlA' },
                                    { icon: Building2, text: 'GDPR & SOC2 Type II Certified' },
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-4 text-slate-400 font-bold uppercase italic text-sm tracking-widest">
                                        <div className="h-8 w-8 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400">
                                            <feature.icon className="h-4 w-4" />
                                        </div>
                                        {feature.text}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-12 relative z-10">
                                <Link href="/contact">
                                    <Button className="w-full py-7 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black uppercase italic tracking-widest transition-all">
                                        View Security Whitepaper
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
