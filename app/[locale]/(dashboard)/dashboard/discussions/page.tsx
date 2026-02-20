"use client"
import { motion } from 'framer-motion'
import { MessageSquare, Search, Send } from 'lucide-react'

export default function DiscussionsPage() {
    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-slate-100 mb-2">Discussions</h1>
                <p className="text-slate-400">Join the conversation and ask questions to your peers and instructors.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <div className="relative">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search topics..."
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                        <div className="p-3 border-b border-slate-700 font-semibold text-sm">Channels</div>
                        <div className="p-2 space-y-1">
                            <button className="w-full text-left px-3 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm font-medium"># general-help</button>
                            <button className="w-full text-left px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-700 transition-colors text-sm"># web-dev-2024</button>
                            <button className="w-full text-left px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-700 transition-colors text-sm"># career-tips</button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3 h-[600px] flex flex-col bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                        <h3 className="font-semibold text-slate-100 flex items-center">
                            <MessageSquare className="w-5 h-5 mr-2 text-cyan-400" />
                            # general-help
                        </h3>
                    </div>
                    <div className="flex-1 p-6 flex items-center justify-center text-slate-500 italic">
                        Start a new discussion or select one from the sidebar.
                    </div>
                    <div className="p-4 bg-slate-900/50 border-t border-slate-700">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Write a message..."
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-300 focus:outline-none focus:border-cyan-500"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyan-500 hover:text-cyan-400">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
