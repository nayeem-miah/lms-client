"use client"
import { motion } from 'framer-motion'
import { Trophy, Medal, User as UserIcon } from 'lucide-react'
import { useMemo } from 'react'
import { useGetAllUsersQuery } from '@/lib/redux/features/users/usersApi'
import { selectCurrentUser } from '@/lib/redux/features/auth/authSlice'
import { useAppSelector } from '@/lib/redux/hooks'
import { User } from '@/types/api'

export function LeaderboardWidget() {
    const { data: studentsData } = useGetAllUsersQuery({ role: 'STUDENT', limit: 3 })
    const currentUser = useAppSelector(selectCurrentUser)

    const leaders = useMemo(() => {
        if (!studentsData?.users) return []
        return (studentsData.users as User[]).map((student, i) => ({
            id: student._id,
            name: student.name,
            points: (12450 - i * 1450).toLocaleString(),
            isCurrentUser: student._id === currentUser?._id
        }))
    }, [studentsData, currentUser])

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-8"
        >
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-yellow-500/10 rounded-2xl">
                        <Trophy className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-slate-100 uppercase tracking-tighter">Top Learners</h3>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Rankings</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {leaders.map((leader, i) => (
                    <div
                        key={leader.id}
                        className={`group flex items-center justify-between p-4 rounded-2xl border transition-all ${
                            leader.isCurrentUser ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-slate-900/40 border-slate-700/50 hover:bg-slate-800/60'
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-black text-slate-500 w-4">{i + 1}</span>
                            <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center font-black text-slate-300 group-hover:scale-105 transition-transform border border-white/5">
                                {leader.name.charAt(0)}
                            </div>
                            <div className="max-w-[80px]">
                                <p className={`text-xs font-black truncate tracking-tight text-slate-200 ${leader.isCurrentUser ? 'text-cyan-400' : ''}`}>{leader.name}</p>
                                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Pioneer</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="text-right">
                               <p className="text-[10px] font-black text-slate-200 tabular-nums">{leader.points}</p>
                               <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">XP</p>
                           </div>
                           <Medal className={`w-4 h-4 ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-slate-400' : 'text-amber-700'}`} />
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
