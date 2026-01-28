"use client"
import { useGetDashboardSummaryQuery } from '@/lib/redux/features/dashboard/dashboardApi'
import { motion } from 'framer-motion'
import { Users, BookOpen, DollarSign, TrendingUp, UserCheck, AlertCircle, BarChart3, Settings } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import type { StatsCardProps } from '@/types/dashboard'

const statsData = [
    { name: 'Jan', users: 400, revenue: 2400, courses: 24 },
    { name: 'Feb', users: 300, revenue: 1398, courses: 22 },
    { name: 'Mar', users: 600, revenue: 9800, courses: 29 },
    { name: 'Apr', users: 800, revenue: 3908, courses: 35 },
    { name: 'May', users: 700, revenue: 4800, courses: 38 },
    { name: 'Jun', users: 900, revenue: 3800, courses: 42 },
]

const userDistribution = [
    { name: 'Student', value: 850, color: '#06b6d4' },
    { name: 'Instructor', value: 45, color: '#8b5cf6' },
    { name: 'Admin', value: 5, color: '#f59e0b' },
]

export default function AdminDashboard() {
    const { data: summary, isLoading } = useGetDashboardSummaryQuery(undefined)

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-slate-100 mb-2">Admin Dashboard 🎯</h1>
                <p className="text-slate-400">System Overview and Management</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatsCard
                    icon={Users}
                    label="Total Users"
                    value={isLoading ? "..." : (summary?.totalUsers || 0).toString()}
                    trend="+১২%"
                    color="bg-cyan-500"
                    delay={0.1}
                />
                <StatsCard
                    icon={BookOpen}
                    label="Total Courses"
                    value={isLoading ? "..." : (summary?.totalCourses || 0).toString()}
                    trend="+8%"
                    color="bg-purple-500"
                    delay={0.2}
                />
                <StatsCard
                    icon={DollarSign}
                    label="Total Revenue"
                    value={isLoading ? "..." : `৳${summary?.totalRevenue || 0}`}
                    trend="+15%"
                    color="bg-emerald-500"
                    delay={0.3}
                />
                <StatsCard
                    icon={UserCheck}
                    label="Active Users"
                    value="750" // Hardcoded as API doesn't provide this yet
                    trend="+5%"
                    color="bg-blue-500"
                    delay={0.4}
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                    className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-100 mb-6">Platform Growth</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={statsData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* User Distribution */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                    className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-100 mb-4">User Distribution</h3>
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={userDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={5} dataKey="value">
                                    {userDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-4">
                        {userDistribution.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                                    <span className="text-slate-300">{item.name}</span>
                                </div>
                                <span className="text-slate-400 font-mono">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Recent Activity & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentActivity />
                <SystemAlerts />
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
                <div className="flex items-center text-xs font-medium text-emerald-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {trend}
                </div>
            </div>
            <p className="text-3xl font-bold text-slate-100 mb-1 font-mono">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
        </motion.div>
    )
}

function RecentActivity() {
    const activities = [
        { user: 'Rahul Ahmed', action: 'enrolled in a new course', time: '5 mins ago' },
        { user: 'Sarah Khan', action: 'completed a course', time: '15 mins ago' },
        { user: 'Tanvir Islam', action: 'submitted an assignment', time: '30 mins ago' },
    ]

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Recent Activity</h3>
            <div className="space-y-4">
                {activities.map((activity, i) => (
                    <div key={i} className="flex items-start space-x-3 pb-3 border-b border-slate-700 last:border-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                            {activity.user.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-slate-200"><span className="font-semibold">{activity.user}</span> {activity.action}</p>
                            <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

function SystemAlerts() {
    const alerts = [
        { type: 'warning', message: 'High server load', time: '10 mins ago' },
        { type: 'info', message: 'New update available', time: '1 hour ago' },
        { type: 'success', message: 'Backup successful', time: '2 hours ago' },
    ]

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">System Alerts</h3>
            <div className="space-y-3">
                {alerts.map((alert, i) => (
                    <div key={i} className={`p-3 rounded-lg border ${alert.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                        alert.type === 'info' ? 'bg-blue-500/10 border-blue-500/30' :
                            'bg-emerald-500/10 border-emerald-500/30'
                        }`}>
                        <div className="flex items-start space-x-2">
                            <AlertCircle className={`w-4 h-4 mt-0.5 ${alert.type === 'warning' ? 'text-yellow-400' :
                                alert.type === 'info' ? 'text-blue-400' : 'text-emerald-400'
                                }`} />
                            <div className="flex-1">
                                <p className="text-sm text-slate-200">{alert.message}</p>
                                <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
