"use client"
import { motion } from 'framer-motion'
import { Users, BookOpen, DollarSign, Award, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Link } from '@/i18n/routing'

const stats = [
    { label: 'Active Instructors', value: '5,000+', icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Total Students', value: '10M+', icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Total Earnings', value: '$500M+', icon: DollarSign, color: 'text-purple-400', bg: 'bg-purple-500/10' },
]

export default function InstructorsPage() {
    return (
        <div className="min-h-screen bg-slate-950">
            {/* Hero Section */}
            <div className="relative pt-32 pb-24 px-4 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase italic tracking-widest mb-8"
                    >
                        <Award className="h-4 w-4" />
                        Empower the World
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.9] mb-8"
                    >
                        Inspire Learners, <br />
                        Build Your <span className="text-cyan-400">Empire</span>.
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12"
                    >
                        Join the world's most elite platform for teaching. Share your knowledge, reach millions, and earn what you deserve.
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/auth/login">
                            <Button className="px-10 py-7 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase italic tracking-widest shadow-2xl shadow-cyan-500/30 transition-all border-none">
                                Start Teaching Now
                            </Button>
                        </Link>
                        <Button variant="outline" className="px-10 py-7 rounded-2xl border-slate-800 text-white font-black uppercase italic tracking-widest hover:bg-slate-900 transition-all">
                            How it Works
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Platform Stats */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-24 border-y border-slate-900">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800/60 shadow-xl"
                    >
                        <div className={`h-12 w-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <h4 className="text-3xl font-black text-white italic tracking-tighter mb-1">{stat.value}</h4>
                        <p className="text-slate-500 text-sm font-bold uppercase italic tracking-widest">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Why Join Section */}
            <div className="max-w-7xl mx-auto py-24 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                        <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none mb-8">
                            Everything You Need <br /> To <span className="text-cyan-400">Succeed</span>
                        </h2>
                        <ul className="space-y-6">
                            {[
                                { title: 'Global Reach', desc: 'Deliver your content to active students across 190 countries.' },
                                { title: 'Easy Upload', desc: 'Our intuitive course builder makes creation a seamless experience.' },
                                { title: 'Premium Revenue', desc: 'Keep up to 90% of your earnings with our competitive revenue model.' },
                                { title: '24/7 Support', desc: 'Expert guidance to help you craft the perfect high-quality course.' },
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4 p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:border-cyan-500/30 transition-all">
                                    <div className="h-6 w-6 mt-1 flex-shrink-0">
                                        <ArrowUpRight className="h-6 w-6 text-cyan-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black italic uppercase tracking-tight mb-2">{item.title}</h4>
                                        <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }} 
                        animate={{ opacity: 1, x: 0 }}
                        className="relative h-[600px] bg-slate-900 rounded-[3rem] border border-slate-800 overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                        <img 
                            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" 
                            alt="Instructor teaching" 
                            className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                        />
                        <div className="absolute bottom-10 left-10 z-20">
                            <p className="text-3xl font-black text-white italic tracking-tighter mb-2">"Teaching here changed my life."</p>
                            <p className="text-cyan-400 font-bold uppercase italic tracking-widest text-sm">Sarah Jenkins, Fullstack Expert</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* CTA */}
            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="bg-gradient-to-br from-cyan-600 to-blue-700 p-16 rounded-[4rem] text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48" />
                    <h2 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-8 leading-none relative z-10">
                        Ready to Start Your <br /> Teaching Journey?
                    </h2>
                    <Link href="/auth/login" className="relative z-10 inline-block">
                        <Button className="px-16 py-8 rounded-2xl bg-white text-slate-950 font-black uppercase italic tracking-widest shadow-xl hover:bg-slate-100 transition-all active:scale-95 text-lg">
                            Apply To Teach Today
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
