"use client"
import { motion } from 'framer-motion'
import { Trophy, TrendingUp, Award, User } from 'lucide-react'

export default function LeaderboardPage() {
    const students = [
        { rank: 1, name: 'Ayesha Khan', points: '12,450', courses: 14, avatar: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
        { rank: 2, name: 'Tanvir Rahman', points: '11,890', courses: 12, avatar: 'bg-gradient-to-br from-slate-300 to-slate-400' },
        { rank: 3, name: 'Rahul Ahmed', points: '10,250', courses: 15, avatar: 'bg-gradient-to-br from-amber-600 to-amber-700' },
    ]

    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-slate-100 mb-2">Global Leaderboard</h1>
                <p className="text-slate-400">See how you rank against other learners across the platform.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {students.map((student, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`bg-slate-800 border border-slate-700 p-6 rounded-2xl text-center relative overflow-hidden ${idx === 0 ? 'ring-2 ring-yellow-500/50' : ''}`}
                    >
                        {idx === 0 && (
                            <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 flex items-center justify-center rounded-bl-3xl">
                                <Trophy className="w-6 h-6 text-yellow-500" />
                            </div>
                        )}
                        <div className={`w-20 h-20 mx-auto rounded-full ${student.avatar} flex items-center justify-center text-3xl font-bold text-slate-900 mb-4`}>
                            {student.name.charAt(0)}
                        </div>
                        <h3 className="text-xl font-bold text-slate-100 mb-1">{student.name}</h3>
                        <p className="text-sm text-slate-500 mb-4">{student.courses} Courses Completed</p>
                        <div className="bg-slate-900/50 rounded-xl py-2 px-4 inline-block">
                            <span className="text-2xl font-bold text-cyan-400">{student.points}</span>
                            <span className="text-xs text-slate-400 ml-1 uppercase">XP Points</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                <div className="p-8 text-center text-slate-500">
                    Full rankings list will be integrated here.
                </div>
            </div>
        </div>
    )
}
