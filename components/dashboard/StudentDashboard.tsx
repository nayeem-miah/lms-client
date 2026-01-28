"use client"
import { useGetMyEnrollmentsQuery } from '@/lib/redux/features/enrollments/enrollmentsApi'
import { Enrollment, Course } from '@/types/api'
import { useAppSelector } from '@/lib/redux/hooks'
import { selectCurrentUser } from '@/lib/redux/features/auth/authSlice'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Trophy, TrendingUp, CheckCircle2, Award, PlayCircle, Users, Video, Star, Flame, ChevronRight } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { StatsCardProps, CourseCardProps } from '@/types/dashboard'
const progressData = [
    { day: 'Sun', hours: 2.5 },
    { day: 'Mon', hours: 3.2 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 4.5 },
    { day: 'Thu', hours: 3.0 },
    { day: 'Fri', hours: 2.2 },
    { day: 'Sat', hours: 3.8 },
]

export default function StudentDashboard() {
    const user = useAppSelector(selectCurrentUser)
    const { data: enrollmentsData, isLoading } = useGetMyEnrollmentsQuery(undefined)
    const enrollments: Enrollment[] = enrollmentsData || []


    // Calculate stats
    const activeCourses = enrollments.filter(e => e.isActive).length
    // const completedCourses = enrollments.filter(e => e.progress === 100).length // Assuming progress is tracked

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-slate-100 mb-2">Welcome back, {user?.name || 'Student'}! 👋</h1>
                <p className="text-slate-400">Ready to learn something new today? Let's make progress towards your goals.</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatsCard
                    icon={BookOpen}
                    label="Active Courses"
                    value={isLoading ? "..." : activeCourses.toString()}
                    trend="+2 this month"
                    color="bg-cyan-500"
                    delay={0.1}
                />
                <StatsCard icon={Clock} label="Learning Time" value="24h" trend="+5.2h" color="bg-blue-500" delay={0.2} />
                <StatsCard icon={CheckCircle2} label="Completed Lessons" value="45" trend="+12 this week" color="bg-emerald-500" delay={0.3} />
                <StatsCard icon={Trophy} label="Earned Badges" value="15" trend="+3 new" color="bg-yellow-500" delay={0.4} />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-100">Ongoing Courses</h2>
                        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center">
                            View All <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {isLoading ? (
                            <p className="text-slate-400 col-span-2">Loading courses...</p>
                        ) : enrollments.length === 0 ? (
                            <p className="text-slate-400 col-span-2">No ongoing courses found.</p>
                        ) : (
                            enrollments.slice(0, 4).map((enrollment, index) => {
                                const course = enrollment.courseId as Course;
                                return (
                                    <CourseCard
                                        key={enrollment._id}
                                        title={course.title}
                                        progress={enrollment.progress}
                                        instructor="Unknown Instructor" // Instructor info might not be fully populated in enrollment -> courseId
                                        thumbnail={course.thumbnail || "bg-gradient-to-br from-blue-600 to-cyan-500"}
                                        lessons={0}
                                        duration="10h"
                                        delay={0.1 * index}
                                    />
                                )
                            })
                        )}
                    </div>

                    {/* Progress Chart */}
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                        className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-slate-100 mb-6">Weekly Progress</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={progressData}>
                                    <defs>
                                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                                    <Area type="monotone" dataKey="hours" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <LeaderboardWidget />
                    <StreakWidget />
                </div>
            </div>
        </div>
    )
}

function StatsCard({ icon: Icon, label, value, trend, color, delay }: StatsCardProps) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                </div>
                {trend && (
                    <div className="flex items-center text-xs font-medium text-emerald-400">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {trend}
                    </div>
                )}
            </div>
            <p className="text-3xl font-bold text-slate-100 mb-1 font-mono">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
        </motion.div>
    )
}

function CourseCard({ title, progress, instructor, thumbnail, lessons, duration, delay }: CourseCardProps) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}
            whileHover={{ y: -5 }} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all cursor-pointer">
            <div className={`h-40 ${thumbnail} relative`}>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    <span className="text-xs text-cyan-400 font-semibold">{progress}% Completed</span>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                    <div className="bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center">
                        <Video className="w-3 h-3 text-slate-400 mr-1" />
                        <span className="text-xs text-slate-300">{lessons} lessons</span>
                    </div>
                    <div className="bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center">
                        <Clock className="w-3 h-3 text-slate-400 mr-1" />
                        <span className="text-xs text-slate-300">{duration}</span>
                    </div>
                </div>
            </div>
            <div className="p-5">
                <h4 className="text-slate-100 font-semibold mb-2 line-clamp-2">{title}</h4>
                <p className="text-xs text-slate-500 mb-4 flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {instructor}
                </p>
                <div className="space-y-2">
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, delay: delay + 0.3 }}
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full" />
                    </div>
                    <button className="w-full bg-slate-900 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-400 py-2 rounded-lg text-sm font-medium transition-all border border-slate-700 hover:border-cyan-500/50 flex items-center justify-center">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Continue Learning
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

function LeaderboardWidget() {
    const leaders = [
        { rank: 1, name: 'Ayesha Khan', points: '3,250', avatar: 'bg-gradient-to-br from-pink-500 to-rose-500' },
        { rank: 2, name: 'Tanvir Rahman', points: '2,890', avatar: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
        { rank: 3, name: 'Rahul Ahmed', points: '2,450', avatar: 'bg-gradient-to-br from-cyan-500 to-blue-600', isUser: true },
    ]

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-slate-100 flex items-center mb-4">
                <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                Leaderboard
            </h3>
            <div className="space-y-2">
                {leaders.map((leader) => (
                    <div key={leader.rank} className={`flex items-center justify-between p-3 rounded-lg ${leader.isUser ? 'bg-cyan-500/10 border border-cyan-500/30' : 'hover:bg-slate-700/50'}`}>
                        <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${leader.rank === 1 ? 'bg-yellow-500 text-slate-900' :
                                leader.rank === 2 ? 'bg-slate-400 text-slate-900' : 'bg-amber-600 text-slate-900'
                                }`}>{leader.rank}</div>
                            <div className={`w-9 h-9 rounded-full ${leader.avatar} flex items-center justify-center text-sm font-bold`}>
                                {leader.name.charAt(0)}
                            </div>
                            <span className={`text-sm font-medium ${leader.isUser ? 'text-cyan-400' : 'text-slate-300'}`}>{leader.name}</span>
                        </div>
                        <span className="text-sm font-mono font-semibold text-slate-200">{leader.points}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

function StreakWidget() {
    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-5">
            <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Flame className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-slate-100">Daily Streak</h3>
                    <p className="text-xs text-slate-400">Keep up the good work!</p>
                </div>
            </div>
            <div className="text-center py-4">
                <div className="text-5xl font-bold text-orange-400 mb-2">7</div>
                <p className="text-sm text-slate-300">days in a row</p>
            </div>
            <div className="flex justify-center space-x-2 mb-3">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div key={day} className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                ))}
            </div>
            <p className="text-xs text-center text-slate-400">Great job! Keep pushing towards your goals 🎯</p>
        </motion.div>
    )
}
