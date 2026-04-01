"use client"
import { motion } from 'framer-motion'
import { MessageSquare, Search, Send, User, Hash, MoreVertical } from 'lucide-react'
import { useState } from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

const mockChannels = [
    { id: '1', name: 'general-help', active: true, unread: 2 },
    { id: '2', name: 'web-dev-2024', active: false, unread: 0 },
    { id: '3', name: 'career-tips', active: false, unread: 5 },
    { id: '4', name: 'showcase', active: false, unread: 0 },
]

const mockMessages = [
    {
        id: '1',
        user: 'Sarah Connor',
        avatar: 'SC',
        role: 'Student',
        content: "Hey everyone! I'm struggling with the latest React Hooks assignment. Does anyone know how to handle the useEffect cleanup properly?",
        time: '10:24 AM'
    },
    {
        id: '2',
        user: 'John Doe',
        avatar: 'JD',
        role: 'Instructor',
        content: "Great question Sarah! You should return a function from your useEffect. That's where the cleanup logic goes. For example: return () => clearInterval(timer).",
        time: '10:30 AM',
        isInstructor: true
    },
    {
        id: '3',
        user: 'Michael Scott',
        avatar: 'MS',
        role: 'Student',
        content: "I also found a great article on this. Let me share the link!",
        time: '10:45 AM'
    }
]

export default function DiscussionsPage() {
    const [selectedChannel, setSelectedChannel] = useState('general-help')

    return (
        <ProtectedRoute allowedRoles={['INSTRUCTOR']}>
            <div className="space-y-6 h-[calc(100vh-180px)]">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-black text-slate-100 mb-1 uppercase tracking-tighter">Community Discussions</h1>
                    <p className="text-sm font-medium text-slate-500 italic uppercase tracking-wide">Connect, share, and learn with your peers</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                    {/* Channels Sidebar */}
                    <div className="lg:col-span-1 space-y-4 h-full flex flex-col">
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search channels..."
                                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-cyan-500 transition-all font-medium"
                            />
                        </div>
                        <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-[2rem] overflow-hidden flex-1 flex flex-col shadow-xl">
                            <div className="p-6 border-b border-white/5 font-black text-xs uppercase tracking-widest text-slate-500">Active Channels</div>
                            <div className="p-3 space-y-2 overflow-y-auto flex-1">
                                {mockChannels.map(channel => (
                                    <button 
                                        key={channel.id}
                                        onClick={() => setSelectedChannel(channel.name)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 group ${
                                            selectedChannel === channel.name 
                                            ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg' 
                                            : 'text-slate-400 hover:bg-slate-700/30 hover:text-slate-200 border border-transparent'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Hash className={`w-4 h-4 ${selectedChannel === channel.name ? 'text-cyan-400' : 'text-slate-500'}`} />
                                            <span className="text-sm font-bold uppercase tracking-tight">{channel.name}</span>
                                        </div>
                                        {channel.unread > 0 && (
                                            <span className="bg-cyan-500 text-slate-900 text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-cyan-500/20">
                                                {channel.unread}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="lg:col-span-3 flex flex-col bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] overflow-hidden shadow-2xl">
                        {/* Chat Header */}
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-900/20">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-cyan-500/10 rounded-2xl">
                                    <Hash className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-100 uppercase tracking-tight">#{selectedChannel}</h3>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Channel for collaborative learning</p>
                                </div>
                            </div>
                            <button className="p-2 text-slate-500 hover:text-slate-300 transition-colors">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-8 space-y-8 overflow-y-auto scrollbar-hide">
                            {mockMessages.map(message => (
                                <div key={message.id} className="flex items-start gap-5 group">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm border border-white/5 shadow-xl transition-transform group-hover:scale-105 ${
                                        message.isInstructor ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white' : 'bg-slate-700 text-slate-300'
                                    }`}>
                                        {message.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`text-sm font-black uppercase tracking-tight ${message.isInstructor ? 'text-purple-400' : 'text-slate-100'}`}>
                                                {message.user}
                                            </span>
                                            <span className="px-2 py-0.5 bg-slate-900/50 rounded-md text-[8px] font-black text-slate-500 uppercase tracking-widest border border-white/5">
                                                {message.role}
                                            </span>
                                            <span className="text-[9px] font-bold text-slate-600 uppercase italic">{message.time}</span>
                                        </div>
                                        <p className="text-sm text-slate-300 leading-relaxed font-medium bg-slate-900/40 p-4 rounded-2xl rounded-tl-none border border-white/5">
                                            {message.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chat Input */}
                        <div className="p-6 bg-slate-900/40 border-t border-white/5">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder={`Message #${selectedChannel}`}
                                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl pl-6 pr-14 py-4 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50 transition-all font-medium placeholder:text-slate-600 italic shadow-inner"
                                />
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-cyan-500 text-slate-900 rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 active:scale-95 group-focus-within:rotate-12">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
