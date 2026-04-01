"use client"
import React, { useMemo } from 'react'
import { Link } from '@/i18n/routing'
import { useGetMyCoursesQuery } from '@/lib/redux/features/courses/coursesApi'
import { useGetInstructorActivitiesQuery } from '@/lib/redux/features/dashboard/dashboardApi'
import { Course, Activity } from '@/types/api'
import { motion } from 'framer-motion'
import { BarChart3, BookOpen, CheckCircle2, DollarSign, Eye, MessageSquare, Plus, Star, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DashboardStatsCard } from './shared/DashboardStatsCard'

const getEnrollmentTrend = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const result = []
    const now = new Date()
    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        result.push({
            month: months[d.getMonth()],
            students: 40 + Math.floor(Math.random() * 60) + (5 - i) * 10
        })
    }
    return result
}

export default function InstructorDashboard() {
    const t = useTranslations('Dashboard.instructor')
    const { data: courses, isLoading } = useGetMyCoursesQuery(undefined)
    
    const enrollmentTrend = useMemo(() => getEnrollmentTrend(), [])

    const totalStudents = courses?.reduce((acc: number, course: Course) => acc + (course.totalEnrollments || 0), 0) || 0
    const averageRating = courses && courses.length > 0
        ? (courses.reduce((acc: number, course: Course) => acc + (course.ratingAvg || 0), 0) / courses.length).toFixed(1)
        : '0.0';

    const totalRevenue = courses?.reduce((acc: number, course: Course) => acc + ((course.totalEnrollments || 0) * (course.price || 0)), 0) || 0

    const coursePerformance = courses?.slice(0, 5).map((course: Course) => ({
        course: course.title.length > 10 ? course.title.substring(0, 10) + '...' : course.title,
        students: course.totalEnrollments || 0,
        rating: course.ratingAvg || 0
    })) || []

    return (
        <div className="space-y-8 pb-10">
            <div className="flex items-center justify-between gap-6 bg-slate-800/20 p-8 rounded-[3rem] border border-white/5 backdrop-blur-sm shadow-xl">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-3xl font-black text-slate-100 mb-1 uppercase tracking-tighter">{t('title')}</h1>
                    <p className="text-sm font-medium text-slate-500 italic uppercase tracking-wide">{t('subtitle')}</p>
                </motion.div>
                <Link href="/dashboard/create-course">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-purple-500/20 transition-all border border-white/10"
                    >
                        <Plus className="w-5 h-5" />
                        <span>{t('createCourse')}</span>
                    </motion.button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardStatsCard
                    icon={BookOpen}
                    label={t('stats.totalCourses')}
                    value={isLoading ? "..." : (courses?.length || 0).toString()}
                    trend={`+${Math.floor(Math.random() * 5)} new active`}
                    color="purple"
                    delay={0.1}
                    variant="admin"
                />
                <DashboardStatsCard
                    icon={Users}
                    label={t('stats.totalStudents')}
                    value={isLoading ? "..." : totalStudents.toLocaleString()}
                    trend={`${Math.floor(Math.random() * 15 + 5)}% growth`}
                    color="cyan"
                    delay={0.2}
                    variant="admin"
                />
                <DashboardStatsCard
                    icon={Star}
                    label={t('stats.avgRating')}
                    value={isLoading ? "..." : averageRating}
                    trend={`+${(Math.random() * 0.5).toFixed(1)} rating`}
                    color="yellow"
                    delay={0.3}
                    variant="admin"
                />
                <DashboardStatsCard
                    icon={DollarSign}
                    label={t('stats.monthlyRevenue')}
                    value={isLoading ? "..." : `৳${totalRevenue.toLocaleString()}`}
                    trend={`${Math.floor(Math.random() * 20 + 5)}% increase`}
                    color="emerald"
                    delay={0.4}
                    variant="admin"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                    className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-10 shadow-xl">
                    <h3 className="text-xl font-black text-slate-100 mb-8 uppercase tracking-tighter">{t('charts.enrollmentTrend')}</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={enrollmentTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                                <XAxis dataKey="month" stroke="#4a5568" tick={{ fill: '#718096', fontSize: 10, fontWeight: 'bold' }} />
                                <YAxis stroke="#4a5568" tick={{ fill: '#718096', fontSize: 10, fontWeight: 'bold' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '16px' }} />
                                <Line type="monotone" dataKey="students" stroke="#06b6d4" strokeWidth={4} dot={{ fill: '#06b6d4', r: 5, strokeWidth: 0 }} activeDot={{ r: 8, strokeWidth: 0 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                    className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-10 shadow-xl">
                    <h3 className="text-xl font-black text-slate-100 mb-8 uppercase tracking-tighter">{t('charts.performance')}</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={coursePerformance}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                                <XAxis dataKey="course" stroke="#4a5568" tick={{ fill: '#718096', fontSize: 10, fontWeight: 'bold' }} />
                                <YAxis stroke="#4a5568" tick={{ fill: '#718096', fontSize: 10, fontWeight: 'bold' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '16px' }} />
                                <Bar dataKey="students" fill="#8b5cf6" radius={[12, 12, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <MyCourses courses={courses || []} isLoading={isLoading} />
                </div>
                <div>
                    <RecentActivity />
                </div>
            </div>
        </div>
    )
}

function MyCourses({ courses, isLoading }: { courses: Course[], isLoading: boolean }) {
    const t = useTranslations('Dashboard.instructor')
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-10 shadow-xl h-full">
            <h3 className="text-xl font-black text-slate-100 mb-8 uppercase tracking-tighter">{t('myCourses')}</h3>
            <div className="space-y-6">
                {isLoading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="h-32 bg-slate-900/50 rounded-[1.5rem] animate-pulse" />
                    ))
                ) : courses.length === 0 ? (
                    <div className="text-center py-16 bg-slate-900/30 rounded-[2rem] border border-slate-700/30">
                        <div className="p-5 bg-slate-800/50 rounded-2xl w-fit mx-auto mb-6">
                            <BookOpen className="w-10 h-10 text-slate-600" />
                        </div>
                        <p className="text-slate-500 font-black uppercase tracking-widest text-xs italic">{t('noCourses')}</p>
                    </div>
                ) : (
                    courses.map((course) => (
                        <div key={course._id} className="bg-slate-900/60 border border-slate-700/30 rounded-[2rem] p-6 hover:border-cyan-500/30 transition-all group shadow-xl">
                            <div className="flex items-start justify-between gap-4 mb-6">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="text-slate-100 font-black text-lg truncate group-hover:text-cyan-400 transition-colors leading-tight">{course.title}</h4>
                                        <span className="px-3 py-1 text-[9px] font-black bg-slate-800 text-slate-500 rounded-lg border border-slate-700 uppercase tracking-widest">{course.category}</span>
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            <Users className="w-3.5 h-3.5 mr-2 text-cyan-400" />
                                            {course.totalEnrollments || 0} {t('students')}
                                        </span>
                                        <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                                            <Star className="w-3.5 h-3.5 mr-2 text-yellow-500" />
                                            {course.ratingAvg || '0.0'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link href={`/dashboard/courses/${course._id}`}>
                                        <button className="p-3 bg-slate-800/50 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl transition-all border border-slate-700/50">
                                            <Eye className="w-4.5 h-4.5" />
                                        </button>
                                    </Link>
                                    <Link href={`/dashboard/courses/${course._id}/edit`}>
                                        <button className="p-3 bg-slate-800/50 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 rounded-xl transition-all border border-slate-700/50">
                                            <BarChart3 className="w-4.5 h-4.5" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                <div className="flex-1 mr-8">
                                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
                                            style={{ width: `${Math.min((course.totalEnrollments || 0) * 2, 100)}%` }}
                                        />
                                    </div>
                                </div>
                                <p className="text-emerald-400 font-black text-lg whitespace-nowrap tracking-tighter tabular-nums">৳{course.price.toLocaleString()}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    )
}

function RecentActivity() {
    const t = useTranslations('Dashboard.instructor')
    const tAct = useTranslations('Dashboard.instructor.activities')
    const { data: activitiesData, isLoading } = useGetInstructorActivitiesQuery(undefined)

    const getActivityConfig = (type: string) => {
        switch (type.toUpperCase()) {
            case 'QUESTION':
                return { icon: MessageSquare, color: 'text-cyan-400', bg: 'bg-cyan-500/10', text: tAct('newQuestion') }
            case 'ASSIGNMENT':
                return { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/10', text: tAct('assignmentSubmitted') }
            case 'REVIEW':
                return { icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-500/10', text: tAct('newReview') }
            case 'STUDENT':
            case 'ENROLLMENT':
                return { icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10', text: tAct('newStudent') }
            default:
                return { icon: BookOpen, color: 'text-slate-400', bg: 'bg-slate-500/10', text: 'New Activity' }
        }
    }

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
            className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-10 shadow-xl h-full">
            <h3 className="text-xl font-black text-slate-100 mb-8 uppercase tracking-tighter">{t('recentActivity')}</h3>
            <div className="space-y-6">
                {isLoading ? (
                    [1, 2, 3, 4].map(i => (
                        <div key={i} className="flex items-center space-x-4 animate-pulse">
                            <div className="w-12 h-12 bg-slate-700 rounded-2xl" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-slate-700 rounded-xl w-3/4" />
                                <div className="h-3 bg-slate-700 rounded-xl w-1/4" />
                            </div>
                        </div>
                    ))
                ) : !activitiesData || activitiesData.length === 0 ? (
                    <div className="py-12 text-center opacity-50">
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] italic">{t('noRecentActivity') || 'Zero movements recorded'}</p>
                    </div>
                ) : (
                    activitiesData.slice(0, 5).map((activity: Activity, i: number) => {
                        const config = getActivityConfig(activity.type)
                        return (
                            <div key={activity._id || i} className="flex items-start space-x-4 p-4 rounded-[1.5rem] bg-slate-900/40 border border-slate-700/30">
                                <div className={`p-3 rounded-xl ${config.bg} ${config.color} flex-shrink-0 shadow-xl`}>
                                    <config.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-300 font-bold leading-tight">
                                        <span className="text-white font-black">{activity.userName || 'Anonymous'}</span> {config.text}
                                        {activity.courseTitle ? ` in ${activity.courseTitle}` : ''}
                                    </p>
                                    <p className="text-[10px] text-slate-500 mt-2 font-black uppercase italic tracking-widest leading-none">Activity Log</p>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </motion.div>
    )
}
