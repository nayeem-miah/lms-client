"use client"
import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
    LayoutDashboard,
    CheckCircle2,
    Zap,
    Sparkles,
    TrendingUp,
    ArrowRight,
    BookOpen
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { useTranslations } from 'next-intl'
import { useAppSelector } from '@/lib/redux/hooks'
import { selectCurrentUser } from '@/lib/redux/features/auth/authSlice'
import { useGetMyEnrollmentsQuery } from '@/lib/redux/features/enrollments/enrollmentsApi'
import { useGetAllCoursesQuery } from '@/lib/redux/features/courses/coursesApi'
import { Enrollment, Course, User } from '@/types/api'
import { Link } from '@/i18n/routing'

// Modular Components
import { DashboardStatsCard } from './shared/DashboardStatsCard'
import { CourseOverviewCard } from './student/CourseOverviewCard'
import { LeaderboardWidget } from './student/LeaderboardWidget'
import { AcademicProgressWidget } from './student/AcademicProgressWidget'

export default function StudentDashboard() {
    const user = useAppSelector(selectCurrentUser)
    const { data: enrollmentsData, isLoading: enrollmentsLoading } = useGetMyEnrollmentsQuery(undefined)
    const { data: allCoursesData, isLoading: coursesLoading } = useGetAllCoursesQuery({ limit: 4 })

    const enrollments: Enrollment[] = useMemo(() => enrollmentsData || [], [enrollmentsData])
    const recommendedCourses: Course[] = useMemo(() => allCoursesData?.courses || [], [allCoursesData])

    // Calculate real-time stats
    const stats = useMemo(() => {
        const total = enrollments.length
        const completed = enrollments.filter(e => e.progress === 100).length
        const inProgress = total - completed

        const categoryMap: Record<string, number> = {}
        enrollments.forEach(e => {
            const cat = (e.courseId as Course)?.category || 'General'
            categoryMap[cat] = (categoryMap[cat] || 0) + 1
        })

        const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }))
        const currentXP = enrollments.reduce((acc, curr) => acc + (curr.progress * 15), 1250)

        return { total, completed, inProgress, categoryData, currentXP }
    }, [enrollments])

    return (
        <div className="space-y-8 pb-10">
            {/* Welcome Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-800/20 p-8 rounded-[3rem] border border-white/5 backdrop-blur-sm"
            >
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-2xl shadow-cyan-500/20">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-100 uppercase tracking-tighter leading-none mb-2">
                            Welcome back, <span className="text-cyan-400">{user?.name}</span>!
                        </h1>
                        <p className="text-sm font-medium text-slate-500 italic tracking-wide uppercase">Your learning journey continues here.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-900/50 px-6 py-4 rounded-[2rem] border border-white/5">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Current XP</p>
                        <p className="text-xl font-black text-cyan-400 tabular-nums leading-none tracking-tighter">{stats.currentXP.toLocaleString()}</p>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                        <Zap className="w-6 h-6" />
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardStatsCard
                    icon={LayoutDashboard}
                    label="Active Courses"
                    value={enrollmentsLoading ? "..." : stats.inProgress.toString()}
                    trend="Currently Studying"
                    color="cyan"
                    delay={0.1}
                />
                <DashboardStatsCard
                    icon={LayoutDashboard}
                    label="Total Enrolled"
                    value={enrollmentsLoading ? "..." : stats.total.toString()}
                    trend="From Academic API"
                    color="blue"
                    delay={0.2}
                />
                <DashboardStatsCard
                    icon={CheckCircle2}
                    label="Certifications"
                    value={enrollmentsLoading ? "..." : stats.completed.toString()}
                    trend="Verified Achievements"
                    color="emerald"
                    delay={0.3}
                />
                <DashboardStatsCard
                    icon={Zap}
                    label="Knowledge Level"
                    value={enrollmentsLoading ? "..." : Math.ceil(stats.currentXP / 1000).toString()}
                    trend="Mastery Tier"
                    color="yellow"
                    delay={0.4}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Ongoing Courses */}
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-cyan-500/10 rounded-2xl">
                                    <BookOpen className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h2 className="text-xl font-black text-slate-100 uppercase tracking-tight">Ongoing Courses</h2>
                            </div>
                        </div>

                        {enrollmentsLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[1, 2].map(i => (
                                    <div key={i} className="h-64 bg-slate-800/40 animate-pulse rounded-[2rem] border border-slate-700/50" />
                                ))}
                            </div>
                        ) : enrollments.length === 0 ? (
                            <div className="bg-slate-800/20 border border-slate-700/50 rounded-[3rem] p-16 text-center">
                                <p className="text-slate-500 italic font-black uppercase tracking-widest text-xs mb-6">No active enrolments found</p>
                                <Link href="/courses" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-cyan-500/20 inline-block">
                                    Discover Your First Course
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {enrollments.filter(e => e.progress < 100).map((enrollment, index) => {
                                    const course = enrollment.courseId as Course
                                    
                                    // Safety check if course is not populated
                                    if (!course || typeof course !== 'object') return null;
                                    
                                    const instructor = typeof course?.instructorId === 'object' ? (course.instructorId as User).name : "Platform Expert"
                                    
                                    return (
                                        <CourseOverviewCard
                                            key={enrollment._id}
                                            title={course.title || "Untitled Course"}
                                            progress={enrollment.progress}
                                            instructor={instructor}
                                            thumbnail={course.thumbnail || "bg-gradient-to-br from-slate-800 to-slate-900"}
                                            lessons={10}
                                            duration="Self-Paced"
                                            delay={0.1 * index}
                                        />
                                    )
                                }).filter(Boolean)}
                            </div>
                        )}
                    </section>

                    {/* Learning Distribution */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-10"
                    >
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl">
                                <TrendingUp className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-slate-100 uppercase tracking-tighter">Learning Distribution</h3>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Content focus areas</p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="w-full md:w-1/2 h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={stats.categoryData.length > 0 ? stats.categoryData : [{ name: 'None', value: 1 }]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={8}
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
                            <div className="flex-1 space-y-4 w-full">
                                {stats.categoryData.length > 0 ? stats.categoryData.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 rounded-2xl bg-slate-900/40 border border-slate-700/20 transition-all hover:bg-slate-900/60">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ['#06b6d4', '#6366f1', '#10b981', '#f59e0b', '#ec4899'][i % 5] }} />
                                            <span className="text-xs font-black text-slate-300 uppercase tracking-tight">{item.name}</span>
                                        </div>
                                        <span className="text-xs font-black text-slate-500 tabular-nums tracking-widest">{item.value} Course{item.value > 1 ? 's' : ''}</span>
                                    </div>
                                )) : <div className="text-slate-600 italic text-xs uppercase tracking-widest font-black">Insufficient data for distribution</div>}
                            </div>
                        </div>
                    </motion.div>

                    {/* Recommended for You */}
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-yellow-500/10 rounded-2xl">
                                    <Sparkles className="w-6 h-6 text-yellow-400" />
                                </div>
                                <h2 className="text-xl font-black text-slate-100 uppercase tracking-tight">Recommended for You</h2>
                            </div>
                            <Link href="/courses" className="text-[10px] font-black text-yellow-500 uppercase tracking-widest hover:text-yellow-400 flex items-center gap-1 transition-all">
                                View All <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {coursesLoading ? (
                                [1, 2].map(i => <div key={i} className="h-44 bg-slate-800/40 animate-pulse rounded-[2.5rem] border border-slate-700/50" />)
                            ) : recommendedCourses.length > 0 ? (
                                recommendedCourses.map((course, i) => (
                                    <Link key={course._id} href={`/courses/${course._id}`}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.1 * i }}
                                            className="group relative h-48 bg-slate-800/40 border border-slate-700/50 rounded-[2.5rem] overflow-hidden p-8 hover:border-yellow-500/40 transition-all shadow-xl"
                                        >
                                            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-yellow-500/10 to-transparent blur-[50px] -mr-20 -mt-20 opacity-40 group-hover:opacity-100 transition-opacity" />
                                            <h3 className="text-lg font-black text-slate-100 leading-tight mb-3 group-hover:text-yellow-400 transition-colors">{course.title}</h3>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 italic">Featured Course Module</p>
                                            <div className="absolute bottom-8 left-8 flex items-center gap-2">
                                                <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                                <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Enroll Today</span>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))
                            ) : <div className="text-slate-600 font-bold uppercase tracking-widest text-xs italic">Checking newest arrivals...</div>}
                        </div>
                    </section>
                </div>

                {/* Sidebar Column */}
                <aside className="space-y-10">
                    <LeaderboardWidget />
                    <AcademicProgressWidget stats={stats} />

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20 group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                        <h3 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2">Upgrade Pro</h3>
                        <p className="text-[10px] font-bold text-blue-200/80 uppercase tracking-widest mb-10">Get unlimited course access</p>
                        <button className="bg-white text-blue-700 w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors shadow-xl">
                            Unlock Unlimited
                        </button>
                    </motion.div>
                </aside>
            </div>
        </div>
    )
}
