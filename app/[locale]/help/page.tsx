"use client"
import { motion } from 'framer-motion'
import { Search, Book, HelpCircle, MessageCircle, FileText, Settings, CreditCard, Play } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Link } from '@/i18n/routing'

const categories = [
    { title: 'Getting Started', icon: Play, count: 12, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { title: 'Account Settings', icon: Settings, count: 8, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { title: 'Payments & Billing', icon: CreditCard, count: 15, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { title: 'Course Content', icon: Book, count: 20, color: 'text-amber-400', bg: 'bg-amber-500/10' },
]

const faqs = [
    { q: 'How do I reset my password?', a: 'Go to the login page and click "Forgot Password". You\'ll receive an email with instructions.' },
    { q: 'Can I get a refund?', a: 'We offer a 30-day money back guarantee on all courses if you\'re not satisfied.' },
    { q: 'What is Pro membership?', a: 'Pro gives you unlimited access to our entire library of over 500+ courses.' },
    { q: 'How can I become an instructor?', a: 'Visit our /instructors page and click "Start Teaching" to apply.' },
]

export default function HelpCenterPage() {
    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
            <div className="relative pt-32 pb-48 px-4 overflow-hidden text-center bg-slate-900 shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none mb-8"
                    >
                        How Can We <br /> <span className="text-cyan-400">Assist You?</span>
                    </motion.h1>
                    
                    <div className="relative max-w-2xl mx-auto group">
                        <Search className="h-6 w-6 text-slate-500 absolute left-6 top-1/2 -translate-y-1/2 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search articles, guides, or solutions..."
                            className="w-full bg-slate-950 border-2 border-slate-800 rounded-[2rem] pl-16 pr-8 py-5 text-lg text-slate-300 focus:outline-none focus:border-cyan-500/50 shadow-2xl transition-all font-medium italic"
                        />
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl hover:border-cyan-500/30 transition-all cursor-pointer group"
                        >
                            <div className={`h-14 w-14 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <cat.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-black text-white italic uppercase tracking-tight mb-2 group-hover:text-cyan-400 transition-colors">{cat.title}</h3>
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest italic">{cat.count} Articles</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* FAQs */}
            <div className="max-w-7xl mx-auto py-32 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none mb-4">
                                Frequently <br /> Asked <span className="text-cyan-400">Questions</span>
                            </h2>
                            <p className="text-slate-500 text-lg font-medium tracking-tight">Can't find what you're looking for? Reach out to our support team.</p>
                        </div>
                        <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-xl">
                            <MessageCircle className="h-10 w-10 text-cyan-400 mb-6" />
                            <h4 className="text-white font-black italic uppercase tracking-tight mb-2">Live Support</h4>
                            <p className="text-slate-500 text-sm mb-6 font-medium">Chat with our experts 24/7 for immediate assistance with any issue.</p>
                            <Link href="/contact" className="inline-block text-cyan-400 font-black italic uppercase tracking-widest text-xs hover:text-cyan-300 transition-colors">Start Conversation &rarr;</Link>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] shadow-lg hover:border-slate-700 transition-all group"
                            >
                                <div className="flex gap-6">
                                    <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-black italic flex-shrink-0">?</div>
                                    <div>
                                        <h4 className="text-lg font-black text-slate-200 italic uppercase tracking-tight mb-3 group-hover:text-white transition-colors">{faq.q}</h4>
                                        <p className="text-slate-500 text-sm font-medium leading-relaxed">{faq.a}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Guides */}
            <div className="max-w-7xl mx-auto px-4 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex gap-8 p-10 bg-slate-900 border border-slate-800 rounded-[3rem] items-center hover:border-cyan-500/20 transition-all shadow-xl group">
                        <div className="h-20 w-20 bg-cyan-500/10 rounded-[2rem] flex items-center justify-center text-cyan-400 flex-shrink-0 group-hover:scale-105 transition-transform shadow-lg">
                            <FileText className="h-10 w-10" />
                        </div>
                        <div>
                            <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Documentation</h4>
                            <p className="text-slate-500 text-sm font-medium">Comprehensive guides and technical API references for everyone.</p>
                        </div>
                    </div>
                    <div className="flex gap-8 p-10 bg-slate-900 border border-slate-800 rounded-[3rem] items-center hover:border-cyan-500/20 transition-all shadow-xl group">
                        <div className="h-20 w-20 bg-purple-500/10 rounded-[2rem] flex items-center justify-center text-purple-400 flex-shrink-0 group-hover:scale-105 transition-transform shadow-lg">
                            <HelpCircle className="h-10 w-10" />
                        </div>
                        <div>
                            <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Community Forum</h4>
                            <p className="text-slate-500 text-sm font-medium">Join 500k+ learners to share knowledge and solve complex problems.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
