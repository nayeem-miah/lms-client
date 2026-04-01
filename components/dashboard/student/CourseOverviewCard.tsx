"use client"
import { motion } from 'framer-motion'
import { GraduationCap, Timer, BookOpen } from 'lucide-react'
import Image from 'next/image'

interface CourseCardProps {
    title: string
    progress: number
    instructor: string
    thumbnail: string
    lessons: number
    duration: string
    delay: number
}

export function CourseOverviewCard({ title, progress, instructor, thumbnail, lessons, duration, delay }: CourseCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="group bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 flex flex-col h-full shadow-lg"
        >
            <div className={`relative h-44 overflow-hidden ${!thumbnail.startsWith('http') ? thumbnail : ''}`}>
                {thumbnail.startsWith('http') && (
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4 flex gap-2">
                    <div className="px-3 py-1.5 bg-slate-900/80 backdrop-blur-md rounded-xl text-[10px] font-black text-cyan-400 uppercase tracking-widest border border-white/10 shadow-xl">
                        {lessons} Lessons
                    </div>
                </div>
            </div>

            <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-black text-slate-100 mb-2 line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors">{title}</h3>
                <div className="flex items-center gap-2 mb-6 text-slate-500">
                   <div className="w-5 h-5 rounded-full bg-slate-700/50 flex items-center justify-center">
                       <GraduationCap className="w-3.5 h-3.5" />
                   </div>
                   <span className="text-[11px] font-bold italic opacity-70">by {instructor}</span>
                </div>

                <div className="mt-auto space-y-5">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span>Course Mastery</span>
                        <span className="text-cyan-400 tabular-nums">{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-700/40 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.5, delay: delay + 0.3 }}
                            className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
