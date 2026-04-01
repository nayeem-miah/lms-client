"use client"
import { useGetDashboardSummaryQuery, useGetAdminActivitiesQuery } from '@/lib/redux/features/dashboard/dashboardApi'
import { useGetAllUsersQuery } from '@/lib/redux/features/users/usersApi'
import { useGetRevenueStatsQuery } from '@/lib/redux/features/payments/paymentsApi'
import { Activity } from '@/types/api'
import { motion } from 'framer-motion'
import { Users, BookOpen, DollarSign, UserCheck, AlertCircle, BarChart3, TrendingUp } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { DashboardStatsCard } from './shared/DashboardStatsCard'

const MOCK_STATS_DATA = [
    { name: 'Jan', users: 400, revenue: 2400, courses: 24 },
    { name: 'Feb', users: 300, revenue: 1398, courses: 22 },
    { name: 'Mar', users: 600, revenue: 9800, courses: 29 },
    { name: 'Apr', users: 800, revenue: 3908, courses: 35 },
    { name: 'May', users: 700, revenue: 4800, courses: 38 },
    { name: 'Jun', users: 900, revenue: 3800, courses: 42 },
]

export default function AdminDashboard() {
    const t = useTranslations('Dashboard.admin')
    const { data: summary, isLoading } = useGetDashboardSummaryQuery(undefined)
    
    const { data: studentsData } = useGetAllUsersQuery({ role: 'STUDENT', limit: 1 })
    const { data: instructorsData } = useGetAllUsersQuery({ role: 'INSTRUCTOR', limit: 1 })
    const { data: adminsData } = useGetAllUsersQuery({ role: 'ADMIN', limit: 1 })
    const { data: revenueStats } = useGetRevenueStatsQuery(undefined)

    const statsData = useMemo(() => {
        if (revenueStats && Array.isArray(revenueStats) && revenueStats.length > 0) {
            return revenueStats.map((item: any) => ({
                name: item.month,
                revenue: item.revenue || item.amount || 0,
                users: item.users || 0,
                courses: item.courses || 0
            }));
        }
        return MOCK_STATS_DATA;
    }, [revenueStats])

    const userDistribution = useMemo(() => [
        { name: 'Student', value: studentsData?.meta?.total || 0, color: '#06b6d4' },
        { name: 'Instructor', value: instructorsData?.meta?.total || 0, color: '#8b5cf6' },
        { name: 'Admin', value: adminsData?.meta?.total || 0, color: '#f59e0b' },
    ], [studentsData, instructorsData, adminsData])

    return (
        <div className="space-y-8 pb-10">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-black text-slate-100 mb-2 uppercase tracking-tight">{t('title')}</h1>
                <p className="text-slate-400 font-medium italic">{t('subtitle')}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardStatsCard
                    icon={Users}
                    label={t('stats.totalUsers')}
                    value={isLoading ? "..." : (summary?.totalUsers || 0).toLocaleString()}
                    trend="+12%"
                    color="cyan"
                    delay={0.1}
                    variant="admin"
                />
                <DashboardStatsCard
                    icon={BookOpen}
                    label={t('stats.totalCourses')}
                    value={isLoading ? "..." : (summary?.totalCourses || 0).toLocaleString()}
                    trend="+5%"
                    color="purple"
                    delay={0.2}
                    variant="admin"
                />
                <DashboardStatsCard
                    icon={DollarSign}
                    label={t('stats.totalRevenue')}
                    value={isLoading ? "..." : `৳${(summary?.totalRevenue || 0).toLocaleString()}`}
                    trend="+18%"
                    color="emerald"
                    delay={0.3}
                    variant="admin"
                />
                <DashboardStatsCard
                    icon={UserCheck}
                    label={t('stats.activeNow')}
                    value={isLoading ? "..." : "42"}
                    trend="Live"
                    color="blue"
                    delay={0.4}
                    variant="admin"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                    className="lg:col-span-2 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-10 shadow-xl">
                    <h3 className="text-xl font-black text-slate-100 mb-8 uppercase tracking-tighter">{t('charts.growth')}</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={statsData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                                <XAxis dataKey="name" stroke="#4a5568" tick={{ fill: '#718096', fontSize: 10, fontWeight: 'bold' }} />
                                <YAxis stroke="#4a5568" tick={{ fill: '#718096', fontSize: 10, fontWeight: 'bold' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '16px', fontSize: '12px' }} />
                                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                    className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-10 shadow-xl">
                    <h3 className="text-xl font-black text-slate-100 mb-6 uppercase tracking-tighter">{t('charts.distribution')}</h3>
                    <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={userDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={10} dataKey="value" stroke="none">
                                    {userDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '16px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-3 mt-8">
                        {userDistribution.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/50 border border-slate-700/30">
                                <div className="flex items-center">
                                    <div className="w-2.5 h-2.5 rounded-full mr-3" style={{ backgroundColor: item.color }} />
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-tight">{item.name}</span>
                                </div>
                                <span className="text-sm font-black text-slate-200 tabular-nums">{item.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RecentActivity />
                <SystemAlerts />
            </div>
        </div>
    )
}

function RecentActivity() {
    const t = useTranslations('Dashboard.admin')
    const tAct = useTranslations('Dashboard.admin.activities')
    const { data: activitiesData, isLoading } = useGetAdminActivitiesQuery(undefined)

    const getActivityText = (type: string) => {
        switch (type.toUpperCase()) {
            case 'ENROLLMENT': return tAct('newEnrollment')
            case 'COURSE_COMPLETED': return tAct('courseCompleted')
            case 'ASSIGNMENT': return tAct('assignmentSubmitted')
            case 'REVIEW': return tAct('newReview')
            case 'TEACHER': return tAct('newTeacher')
            default: return 'performed an action'
        }
    }

    const formatTime = (time: string) => {
        const now = new Date();
        const past = new Date(time);
        const diffMs = now.getTime() - past.getTime();
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return past.toLocaleDateString();
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-10">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400">
                    <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-100 uppercase tracking-tighter">{t('recentActivity')}</h3>
            </div>
            <div className="space-y-6">
                {isLoading ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="flex items-center space-x-4 animate-pulse">
                            <div className="w-12 h-12 bg-slate-700 rounded-2xl" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-slate-700 rounded-xl w-3/4" />
                                <div className="h-3 bg-slate-700 rounded-xl w-1/4" />
                            </div>
                        </div>
                    ))
                ) : !activitiesData || activitiesData.length === 0 ? (
                    <div className="py-10 text-center">
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] italic">{t('noRecentActivity')}</p>
                    </div>
                ) : (
                    activitiesData.slice(0, 5).map((activity: Activity, i: number) => (
                        <div key={activity._id || i} className="flex items-start space-x-4 p-4 rounded-[1.5rem] bg-slate-900/40 border border-slate-700/30">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-xs font-black text-white shadow-xl">
                                {(activity.userName || 'U').charAt(0)}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-300 font-bold leading-tight">
                                    <span className="text-white font-black">{activity.userName}</span> {getActivityText(activity.type)}
                                    {activity.courseTitle ? ` in ${activity.courseTitle}` : ''}
                                </p>
                                <p className="text-[10px] text-slate-500 mt-1 font-black uppercase italic">{formatTime(activity.createdAt)}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    )
}

function SystemAlerts() {
    const t = useTranslations('Dashboard.admin')
    const alerts = [
        { type: 'warning', message: 'High server load', time: '10 mins ago', icon: AlertCircle },
        { type: 'info', message: 'New update available', time: '1 hour ago', icon: AlertCircle },
        { type: 'success', message: 'Backup successful', time: '2 hours ago', icon: AlertCircle },
    ]

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-10">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-red-500/10 rounded-2xl text-red-400">
                    <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-100 uppercase tracking-tighter">{t('systemAlerts')}</h3>
            </div>
            <div className="space-y-4">
                {alerts.map((alert, i) => (
                    <div key={i} className={`p-5 rounded-[1.5rem] border ${alert.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/20' :
                        alert.type === 'info' ? 'bg-blue-500/10 border-blue-500/20' :
                            'bg-emerald-500/10 border-emerald-500/20'
                        }`}>
                        <div className="flex items-start space-x-4">
                            <alert.icon className={`w-5 h-5 mt-0.5 ${alert.type === 'warning' ? 'text-yellow-400' :
                                alert.type === 'info' ? 'text-blue-400' : 'text-emerald-400'
                                }`} />
                            <div className="flex-1">
                                <p className="text-xs font-black text-slate-200 uppercase tracking-tight">{alert.message}</p>
                                <p className="text-[9px] text-slate-500 mt-1 font-black uppercase italic">{alert.time}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

import { ShieldAlert } from 'lucide-react'
