"use client"
import { motion } from 'framer-motion'
import { Calendar, Clock, Video } from 'lucide-react'

export default function SchedulePage() {
    const classes = [
        { title: 'Live Q&A: React Advanced', instructor: 'Sarah Johnson', time: '10:00 AM', duration: '1h 30m', type: 'Live Class' },
        { title: 'UI/UX Design Review', instructor: 'Michael Chen', time: '02:00 PM', duration: '1h', type: 'Workshop' },
    ]

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-slate-100 mb-2">Class Schedule</h1>
                <p className="text-slate-400">Keep track of your upcoming live classes and workshops.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {classes.map((cls, idx) => (
                        <div key={idx} className="bg-slate-800 border border-slate-700 p-6 rounded-xl flex items-center justify-between group hover:border-cyan-500/50 transition-all">
                            <div className="flex items-center space-x-6">
                                <div className="text-center min-w-[60px] p-2 rounded-lg bg-slate-900 border border-slate-700">
                                    <p className="text-xs text-slate-500 uppercase font-bold">Today</p>
                                    <p className="text-sm font-bold text-cyan-400">{cls.time}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-100 mb-1">{cls.title}</h3>
                                    <p className="text-xs text-slate-500 flex items-center">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {cls.duration} • {cls.instructor}
                                    </p>
                                </div>
                            </div>
                            <button className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg transition-colors">
                                <Video className="w-4 h-4" />
                                <span>Join Now</span>
                            </button>
                        </div>
                    ))}
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <div className="mb-6 flex items-center space-x-2 text-cyan-400">
                        <Calendar className="w-5 h-5" />
                        <h3 className="font-semibold text-slate-100">Mini Calendar</h3>
                    </div>
                    <div className="aspect-square bg-slate-900 rounded-lg flex items-center justify-center text-slate-600 italic">
                        Calendar View Placeholder
                    </div>
                </div>
            </div>
        </div>
    )
}
