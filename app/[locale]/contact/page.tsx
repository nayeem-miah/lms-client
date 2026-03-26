"use client"
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageCircle, Github, Twitter, Linkedin, Facebook } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const contactInfo = [
    { label: 'Email Us', value: 'support@edulearn.com', icon: Mail, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Call Us', value: '+1 (555) 000-0000', icon: Phone, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Our Office', value: '123 Learning Ave, CA 94103', icon: MapPin, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
]

export default function ContactUsPage() {
    return (
        <div className="min-h-screen bg-slate-950 py-32 px-4 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] pointer-events-none" />
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.85] mb-8">
                            Let's Start <br /> <span className="text-cyan-400">Conversing</span>.
                        </h1>
                        <p className="text-slate-400 text-xl font-medium tracking-tight max-w-lg mb-12 italic">
                            Have questions or ideas? Our team is available 24/7 to help you build your future.
                        </p>
                        
                        <div className="space-y-8">
                            {contactInfo.map((info, i) => (
                                <div key={i} className="flex gap-6 items-center p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-xl hover:border-cyan-500/20 transition-all group">
                                    <div className={`h-14 w-14 rounded-2xl ${info.bg} ${info.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <info.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-xs font-black uppercase tracking-widest italic mb-1">{info.label}</p>
                                        <p className="text-xl font-black text-white italic tracking-tighter uppercase">{info.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex gap-6">
                            {[Facebook, Twitter, Linkedin, Github].map((Icon, i) => (
                                <a key={i} href="#" className="h-12 w-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-all shadow-lg active:scale-95">
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 50 }} 
                        animate={{ opacity: 1, x: 0 }}
                        className="p-12 bg-slate-900 border-2 border-slate-800 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
                            <Send className="w-64 h-64 text-cyan-400" />
                        </div>
                        <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-10 relative z-10">Send a Message</h2>
                        <form className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-bold">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase italic tracking-widest text-slate-500 ml-4">Full Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full bg-slate-950 border-2 border-slate-800 rounded-[1.5rem] px-6 py-4 text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-all" />
                                </div>
                                <div className="space-y-2 font-bold">
                                    <label className="text-[10px] font-black uppercase italic tracking-widest text-slate-500 ml-4">Email Address</label>
                                    <input type="email" placeholder="john@example.com" className="w-full bg-slate-950 border-2 border-slate-800 rounded-[1.5rem] px-6 py-4 text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-all" />
                                </div>
                            </div>
                            <div className="space-y-2 font-bold">
                                <label className="text-[10px] font-black uppercase italic tracking-widest text-slate-500 ml-4">Message</label>
                                <textarea rows={5} placeholder="Tell us how we can help..." className="w-full bg-slate-950 border-2 border-slate-800 rounded-[1.5rem] px-6 py-4 text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-all resize-none" />
                            </div>
                            <div className="pt-6">
                                <Button className="w-full py-8 rounded-[1.5rem] bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase italic tracking-widest shadow-2xl transition-all active:scale-95 border-none text-lg">
                                    Send Message Now
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
