"use client"
import { useGetMyEnrollmentsQuery } from '@/lib/redux/features/enrollments/enrollmentsApi'
import { useGetAllCoursesQuery } from '@/lib/redux/features/courses/coursesApi'
import { useGetAllUsersQuery } from '@/lib/redux/features/users/usersApi'
import { Enrollment, Course, User } from '@/types/api'
import { useAppSelector } from '@/lib/redux/hooks'
import { selectCurrentUser } from '@/lib/redux/features/auth/authSlice'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Trophy, TrendingUp, CheckCircle2, Award, PlayCircle, Users, Video, Star, Flame, ChevronRight, Zap, Target, Sparkles, PieChart as PieIcon, LayoutDashboard } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import type { StatsCardProps, CourseCardProps } from '@/types/dashboard'
import { useMemo } from 'react'

export default function StudentDashboard() {
    const t = useTranslations('Dashboard.student')
    const user = useAppSelector(selectCurrentUser)
    const { data: enrollmentsData, isLoading: enrollmentsLoading } = useGetMyEnrollmentsQuery(undefined)
    const { data: allCoursesData, isLoading: coursesLoading } = useGetAllCoursesQuery({ limit: 4 })

    const enrollments: Enrollment[] = useMemo(() => enrollmentsData || [], [enrollmentsData])
    const recommendedCourses: Course[] = useMemo(() => allCoursesData?.courses || [], [allCoursesData])

    // Calculate dynamic stats from REAL enrollment data
    const stats = useMemo(() => {
        const total = enrollments.length
        const active = enrollments.filter(e => e.isActive).length
        const completed = enrollments.filter(e => e.progress === 100).length
        const inProgress = total - completed

        // Group by category for real chart data
        const categoryMap: Record<string, number> = {}
        enrollments.forEach(e => {
            const cat = (e.courseId as Course).category || 'Other'
            categoryMap[cat] = (categoryMap[cat] || 0) + 1
        })

        const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
            name,
            value
        }))

        // Mock XP for current user based on progress (since XP isn't in API)
        const totalProgress = enrollments.reduce((acc, e) => acc + (e.progress || 0), 0)
        const calculatedXP = (totalProgress * 25).toLocaleString()

        return { total, active, completed, inProgress, categoryData, calculatedXP }
    }, [enrollments])

    return (
        <div className="space-y-8 pb-10">
            {/* Welcome Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-1">
                        {t('welcome')}, <span className="text-cyan-400">{user?.name?.split(' ')[0] || 'Learner'}</span>! 👋
                    </h1>
                    <p className="text-slate-400 text-sm">{t('subtitle')}</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 px-5 py-3 rounded-2xl flex items-center gap-4">
                        <div className="h-10 w-10 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400">
                            <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Calculated XP</p>
                            <p className="text-xl font-black text-slate-200 leading-none">{stats.calculatedXP}</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatsCard
                    icon={BookOpen}
                    label={t('stats.activeCourses')}
                    value={enrollmentsLoading ? "..." : stats.active.toString()}
                    trend="Real-time"
                    color="cyan"
                    delay={0.1}
                />
                <StatsCard
                    icon={LayoutDashboard}
                    label="Total Enrolled"
                    value={enrollmentsLoading ? "..." : stats.total.toString()}
                    trend="From API"
                    color="blue"
                    delay={0.2}
                />
                <StatsCard
                    icon={CheckCircle2}
                    label="Certifications"
                    value={enrollmentsLoading ? "..." : stats.completed.toString()}
                    trend="Verified"
                    color="emerald"
                    delay={0.3}
                />
                <StatsCard
                    icon={Zap}
                    label="In Progress"
                    value={enrollmentsLoading ? "..." : stats.inProgress.toString()}
                    trend="Active"
                    color="yellow"
                    delay={0.4}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Ongoing Courses */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                                <PlayCircle className="w-6 h-6 text-cyan-400" />
                                {t('ongoingCourses')}
                            </h2>
                            <Link href="/dashboard/my-enrollments" className="text-cyan-400 hover:text-cyan-300 text-sm font-bold flex items-center transition-colors">
                                {t('viewAll')} <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>

                        {enrollmentsLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {[1, 2].map(i => (
                                    <div key={i} className="h-64 bg-slate-800/40 animate-pulse rounded-2xl border border-slate-700/50" />
                                ))}
                            </div>
                        ) : enrollments.length === 0 ? (
                            <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-12 text-center">
                                <p className="text-slate-500 italic mb-4">{t('noOngoing')}</p>
                                <Link href="/courses" className="text-cyan-400 bg-cyan-400/10 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-400 hover:text-slate-900 transition-all">Start Learning Now</Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {enrollments.slice(0, 2).map((enrollment, index) => {
                                    const course = enrollment.courseId as Course;
                                    const instructor = typeof course.instructorId === 'object' ? (course.instructorId as User).name : "Platform Expert";
                                    return (
                                        <CourseCard
                                            key={enrollment._id}
                                            title={course.title}
                                            progress={enrollment.progress}
                                            instructor={instructor}
                                            thumbnail={course.thumbnail || "bg-gradient-to-br from-indigo-600 to-cyan-500"}
                                            lessons={10}
                                            duration="6h 30m"
                                            delay={0.1 * index}
                                        />
                                    )
                                })}
                            </div>
                        )}
                    </section>

                    {/* Learning Distribution (Real Category Data) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-8"
                    >
                        <div className="flex items-center gap-2 mb-8">
                            <PieIcon className="w-5 h-5 text-cyan-400" />
                            <h3 className="text-xl font-black text-slate-100 uppercase tracking-tight">Learning Distribution</h3>
                        </div>

                        <div className="h-64 w-full flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="h-full w-full md:w-1/2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={stats.categoryData.length > 0 ? stats.categoryData : [{ name: 'No Data', value: 1 }]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {stats.categoryData.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={['#06b6d4', '#6366f1', '#10b981', '#f59e0b', '#ec4899'][index % 5]} />
                                            ))}
                                            {stats.categoryData.length === 0 && <Cell fill="#1e293b" />}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                                            itemStyle={{ fontWeight: 'bold' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-full md:w-1/2 space-y-3">
                                {stats.categoryData.length > 0 ? stats.categoryData.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-slate-800/50 border border-slate-700/30">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#06b6d4', '#6366f1', '#10b981', '#f59e0b', '#ec4899'][i % 5] }} />
                                            <span className="text-xs font-bold text-slate-300">{item.name}</span>
                                        </div>
                                        <span className="text-xs font-black text-slate-500 tabular-nums">{item.value} Course{item.value > 1 ? 's' : ''}</span>
                                    </div>
                                )) : (
                                    <p className="text-slate-500 text-sm italic">Enroll in courses to see distribution</p>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Recommended for You */}
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="w-6 h-6 text-yellow-400" />
                            <h2 className="text-xl font-black text-slate-100 uppercase tracking-tight">Recommended for You</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            {coursesLoading ? (
                                [1, 2, 3, 4].map(i => <div key={i} className="h-44 bg-slate-800/40 animate-pulse rounded-2xl border border-slate-700/50" />)
                            ) : recommendedCourses.length > 0 ? (
                                recommendedCourses.map((course, i) => (
                                    <Link key={course._id} href={`/courses/${course._id}`}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.1 * i }}
                                            whileHover={{ y: -5 }}
                                            className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 group h-full hover:border-cyan-500/30 transition-all"
                                        >
                                            <div className="aspect-square rounded-xl overflow-hidden mb-3 border border-slate-700/30">
                                                {course.thumbnail ? (
                                                    <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={course.title} />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900" />
                                                )}
                                            </div>
                                            <h4 className="text-xs font-black text-slate-200 line-clamp-2 leading-tight group-hover:text-cyan-400">{course.title}</h4>
                                            <p className="text-[10px] text-slate-500 mt-2 uppercase font-black tracking-widest">{course.category}</p>
                                        </motion.div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-slate-500 italic text-sm">Explore courses to get personalized recommendations</p>
                            )}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <aside className="space-y-8">
                    <LeaderboardWidget />
                    <AcademicProgressWidget stats={stats} />

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20"
                    >
                        <Zap className="absolute top-0 right-0 w-40 h-40 text-white/10 -mr-10 -mt-10 rotate-12" />
                        <h4 className="text-2xl font-black mb-2 relative z-10 uppercase tracking-tighter">Premium Access</h4>
                        <p className="text-sm text-blue-100 mb-8 relative z-10 leading-relaxed font-medium">Get 1-on-1 mentorship and unlimited access to expert paths.</p>
                        <button className="bg-white text-indigo-600 font-black px-6 py-3.5 rounded-2xl text-xs uppercase tracking-widest shadow-xl hover:translate-y-[-2px] transition-all relative z-10 w-full">
                            Explore Plans
                        </button>
                    </motion.div>
                </aside>
            </div>
        </div>
    )
}

function StatsCard({ icon: Icon, label, value, trend, color, delay }: StatsCardProps) {
    const colorClasses = {
        cyan: 'text-cyan-400 border-cyan-500/20 bg-cyan-500',
        blue: 'text-blue-400 border-blue-500/20 bg-blue-500',
        emerald: 'text-emerald-400 border-emerald-500/20 bg-emerald-500',
        yellow: 'text-yellow-400 border-yellow-500/20 bg-yellow-500',
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="group bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-[2rem] p-6 hover:border-cyan-500/30 transition-all duration-300"
        >
            <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${colorClasses[color as keyof typeof colorClasses].split(' ')[2]} bg-opacity-10`}>
                    <Icon className={`w-6 h-6 ${colorClasses[color as keyof typeof colorClasses].split(' ')[0]}`} />
                </div>
                <div className="bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">
                    <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">{trend}</p>
                </div>
            </div>
            <div>
                <p className="text-4xl font-black text-white tracking-tighter tabular-nums mb-1">{value}</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
            </div>
        </motion.div>
    )
}

function CourseCard({ title, progress, instructor, thumbnail, lessons, duration, delay }: CourseCardProps) {
    const t = useTranslations('Dashboard.student.course')
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="group bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 flex flex-col h-full shadow-lg"
        >
            <div className="h-44 w-full relative overflow-hidden">
                {thumbnail.startsWith('bg-') ? (
                    <div className={`w-full h-full ${thumbnail}`} />
                ) : (
                    <img src={thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={title} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent" />
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                    <span className="text-[11px] text-cyan-400 font-black uppercase tracking-widest">{progress}%</span>
                </div>
                <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-1.5 bg-cyan-400/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-400/20">
                        <Video className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-[11px] text-cyan-400 font-bold">{t('continue')}</span>
                    </div>
                </div>
            </div>
            <div className="p-7 flex flex-col flex-grow">
                <h4 className="text-slate-100 font-black text-lg mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors uppercase tracking-tight leading-none">{title}</h4>
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-[11px] font-bold text-slate-500 italic opacity-70">by {instructor}</span>
                </div>

                <div className="mt-auto space-y-5">
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

function LeaderboardWidget() {
    const { data: studentsData, isLoading } = useGetAllUsersQuery({ role: 'STUDENT', limit: 3 })
    const currentUser = useAppSelector(selectCurrentUser)

    const leaders = useMemo(() => {
        if (!studentsData?.users) return []
        return (studentsData.users as User[]).map((student, i) => ({
            rank: i + 1,
            name: student.name,
            points: (10000 - i * 1450).toLocaleString(), // Semi-random but ordered
            isUser: student._id === currentUser?._id
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
                <h3 className="text-xl font-black text-slate-100 uppercase tracking-tighter flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Top Learners
                </h3>
            </div>
            <div className="space-y-4">
                {isLoading ? (
                    [1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-800/40 animate-pulse rounded-2xl" />)
                ) : leaders.map((leader) => (
                    <div key={leader.rank} className={`flex items-center justify-between p-4 rounded-2xl transition-all ${leader.isUser ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-slate-800/50 border border-slate-700/30 hover:border-slate-600'}`}>
                        <div className="flex items-center gap-4">
                            <span className={`w-5 text-center text-xs font-black ${leader.rank === 1 ? 'text-yellow-500' : 'text-slate-500'}`}>{leader.rank}</span>
                            <div className={`w-10 h-10 rounded-[12px] bg-gradient-to-br ${leader.rank === 1 ? 'from-yellow-400 to-orange-500' : leader.rank === 2 ? 'from-slate-300 to-slate-500' : 'from-orange-600 to-amber-800'} flex items-center justify-center text-sm font-black text-slate-900 shadow-lg`}>
                                {leader.name.charAt(0)}
                            </div>
                            <div>
                                <p className={`text-sm font-black ${leader.isUser ? 'text-cyan-400' : 'text-slate-200'} line-clamp-1`}>{leader.name}</p>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">Active Member</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

function AcademicProgressWidget({ stats }: { stats: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-8"
        >
            <div className="inline-flex p-4 bg-orange-500/10 rounded-3xl mb-6 border border-orange-500/20">
                <Award className="w-8 h-8 text-orange-400" />
            </div>
            <h3 className="text-2xl font-black text-slate-100 uppercase tracking-tighter mb-1">Academic Summary</h3>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-8">Verified Progress Data</p>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-700/50">
                    <p className="text-[10px] uppercase font-black text-slate-500 mb-1">Completed</p>
                    <p className="text-2xl font-black text-emerald-400 tabular-nums">{stats.completed}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-700/50">
                    <p className="text-[10px] uppercase font-black text-slate-500 mb-1">Enrolled</p>
                    <p className="text-2xl font-black text-blue-400 tabular-nums">{stats.total}</p>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-slate-500 uppercase">Mastery Goal</span>
                        <span className="text-[10px] font-black text-slate-300">{(stats.completed / (stats.total || 1) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(stats.completed / (stats.total || 1) * 100)}%` }}
                            className="bg-emerald-500 h-full rounded-full"
                        />
                    </div>
                </div>
                <p className="text-[10px] text-center text-slate-500 font-bold italic leading-tight">Keep pushing towards your learning goals 🎯</p>
            </div>
        </motion.div>
    )
}

