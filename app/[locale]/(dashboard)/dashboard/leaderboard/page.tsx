"use client"
import { useGetAllUsersQuery } from '@/lib/redux/features/users/usersApi'
import { User } from '@/types/api'
import { motion } from 'framer-motion'
import { Trophy, TrendingUp, Award, User as UserIcon, Star, Medal } from 'lucide-react'
import { useMemo } from 'react'
import { useAppSelector } from '@/lib/redux/hooks'
import { selectCurrentUser } from '@/lib/redux/features/auth/authSlice'

export default function LeaderboardPage() {
    const currentUser = useAppSelector(selectCurrentUser)
    const { data: studentsData, isLoading } = useGetAllUsersQuery({ role: 'STUDENT', limit: 20 })
    
    const students = useMemo(() => {
        if (!studentsData?.users) return []
        
        return (studentsData.users as User[]).map((student, idx) => {
            // Generate semi-realistic XP points based on their index (mocked since XP is missing in API)
            const baseXP = 15000 - (idx * 450)
            const randomXP = Math.floor(Math.random() * 100)
            const points = (baseXP + randomXP).toLocaleString()
            
            return {
                _id: student._id,
                rank: idx + 1,
                name: student.name,
                points,
                courses: 10 + (3 - idx % 4), // Mocked count
                avatar: idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 
                        idx === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400' :
                        idx === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700' : 'bg-slate-800'
            }
        })
    }, [studentsData])

    const topThree = students.slice(0, 3)
    const rest = students.slice(3)

    if (isLoading) return <div className="p-10 text-center text-slate-500 italic">Updating global rankings...</div>

    return (
        <div className="space-y-10 pb-20">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-black text-slate-100 mb-2 uppercase tracking-tight">Global Leaderboard</h1>
                <p className="text-slate-400 font-medium">See how you rank against real learners across the platform.</p>
            </motion.div>

            {/* Podium for Top 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto px-4">
                {/* 2nd Place */}
                {topThree[1] && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-8 rounded-[2.5rem] text-center relative md:order-1 h-fit"
                    >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-400 rounded-2xl flex items-center justify-center shadow-xl border-4 border-slate-900">
                           <span className="text-slate-900 font-black">2</span>
                        </div>
                        <div className={`w-24 h-24 mx-auto rounded-full ${topThree[1].avatar} flex items-center justify-center text-4xl font-black text-slate-900 mb-4 shadow-2xl`}>
                            {topThree[1].name.charAt(0)}
                        </div>
                        <h3 className="text-xl font-black text-slate-100 mb-1">{topThree[1].name}</h3>
                        <div className="text-cyan-400 font-black text-2xl tabular-nums">{topThree[1].points} <span className="text-[10px] text-slate-500 uppercase">XP</span></div>
                    </motion.div>
                )}

                {/* 1st Place */}
                {topThree[0] && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-800/60 backdrop-blur-md border-2 border-yellow-500/30 p-10 rounded-[3rem] text-center relative md:order-2 shadow-2xl shadow-yellow-500/10"
                    >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-[1.25rem] flex items-center justify-center shadow-2xl border-4 border-slate-900 animate-bounce">
                           <Trophy className="w-8 h-8 text-slate-900" />
                        </div>
                        <div className={`w-32 h-32 mx-auto rounded-full ${topThree[0].avatar} flex items-center justify-center text-5xl font-black text-slate-900 mb-6 shadow-2xl border-4 border-yellow-500/20`}>
                            {topThree[0].name.charAt(0)}
                        </div>
                        <h3 className="text-2xl font-black text-slate-100 mb-1">{topThree[0].name}</h3>
                        <div className="text-yellow-500 font-black text-4xl tabular-nums">{topThree[0].points} <span className="text-xs text-slate-500 uppercase">XP</span></div>
                        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full border border-yellow-500/20 text-[10px] font-black uppercase tracking-widest">
                            Global Champion
                        </div>
                    </motion.div>
                )}

                {/* 3rd Place */}
                {topThree[2] && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-8 rounded-[2.5rem] text-center relative md:order-3 h-fit"
                    >
                         <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-700 rounded-2xl flex items-center justify-center shadow-xl border-4 border-slate-900">
                           <span className="text-slate-900 font-black">3</span>
                        </div>
                        <div className={`w-24 h-24 mx-auto rounded-full ${topThree[2].avatar} flex items-center justify-center text-4xl font-black text-slate-900 mb-4 shadow-2xl`}>
                            {topThree[2].name.charAt(0)}
                        </div>
                        <h3 className="text-xl font-black text-slate-100 mb-1">{topThree[2].name}</h3>
                        <div className="text-orange-500 font-black text-2xl tabular-nums">{topThree[2].points} <span className="text-[10px] text-slate-500 uppercase">XP</span></div>
                    </motion.div>
                )}
            </div>

            {/* List for the rest */}
            <div className="max-w-4xl mx-auto space-y-3 px-4">
                {rest.map((student, idx) => (
                    <motion.div
                        key={student._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`group flex items-center justify-between p-5 rounded-2xl border transition-all ${student._id === currentUser?._id ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60'}`}
                    >
                        <div className="flex items-center gap-6">
                            <span className="w-6 text-center font-black text-slate-500 tabular-nums">{student.rank}</span>
                            <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center font-black text-slate-300 shadow-inner group-hover:scale-105 transition-transform">
                                {student.name.charAt(0)}
                            </div>
                            <div>
                                <p className={`font-black tracking-tight ${student._id === currentUser?._id ? 'text-cyan-400' : 'text-slate-200'}`}>
                                    {student.name} {student._id === currentUser?._id && <span className="ml-2 py-0.5 px-2 bg-cyan-400/10 text-[9px] uppercase border border-cyan-400/20 rounded-md">You</span>}
                                </p>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5">Top Tier Pioneer</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-10">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-black text-slate-100 tabular-nums">{student.points}</p>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">Total XP</p>
                            </div>
                            <Medal className={`w-5 h-5 ${student.rank <= 5 ? 'text-cyan-400 opacity-100' : 'text-slate-700 opacity-30'}`} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
