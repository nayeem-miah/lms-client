"use client"
import { useGetMyCoursesQuery } from '@/lib/redux/features/courses/coursesApi'
import { Course } from '@/types/api'
import { motion } from 'framer-motion'
import { BookOpen, Users, Video, TrendingUp, Clock, MessageSquare, Star, DollarSign, BarChart3, Calendar, FileText, CheckCircle2 } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import type { StatsCardProps } from '@/types/dashboard'

const enrollmentData = [
    { month: 'Jan', students: 45 },
    { month: 'Feb', students: 52 },
    { month: 'Mar', students: 68 },
    { month: 'Apr', students: 75 },
    { month: 'May', students: 82 },
    { month: 'Jun', students: 95 },
]

const coursePerformance = [
    { course: 'React', rating: 4.8, students: 120 },
    { course: 'UI/UX', rating: 4.6, students: 95 },
    { course: 'Node.js', rating: 4.9, students: 85 },
    { course: 'Python', rating: 4.7, students: 110 },
]

export default function InstructorDashboard() {
    const { data: coursesData, isLoading } = useGetMyCoursesQuery(undefined)
    const courses: Course[] = coursesData || []


    const totalStudents = courses.reduce((acc, course) => acc + (course.totalEnrollments || 0), 0)
    const averageRating = courses.length > 0
        ? (courses.reduce((acc, course) => acc + (course.ratingAvg || 0), 0) / courses.length).toFixed(1)
        : '0.0';

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-slate-100 mb-2">Instructor Dashboard 📚</h1>
                <p className="text-slate-400">Manage your courses and students effectively</p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatsCard
                    icon={BookOpen}
                    label="Total Courses"
                    value={isLoading ? "..." : courses.length.toString()}
                    trend="+2 new"
                    color="bg-purple-500"
                    delay={0.1}
                />
                <StatsCard
                    icon={Users}
                    label="Total Students"
                    value={isLoading ? "..." : totalStudents.toString()}
                    trend="+25 this month"
                    color="bg-cyan-500"
                    delay={0.2}
                />
                <StatsCard
                    icon={Star}
                    label="Average Rating"
                    value={isLoading ? "..." : averageRating}
                    trend="+0.2"
                    color="bg-yellow-500"
                    delay={0.3}
                />
                <StatsCard icon={DollarSign} label="Monthly Revenue" value="৳15,000" trend="+12%" color="bg-emerald-500" delay={0.4} />
            </div>

            {/* Charts - Keeping mock data for charts as they need aggregate history not available in simplified API */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Enrollment Trend */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                    className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-100 mb-6">Student Enrollment Trend</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={enrollmentData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                                <Line type="monotone" dataKey="students" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Course Performance */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                    className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-slate-100 mb-6">Course Performance</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={coursePerformance}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="course" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                                <Bar dataKey="students" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* My Courses & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <MyCourses courses={courses} isLoading={isLoading} />
                </div>
                <div>
                    <RecentActivity />
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

function MyCourses({ courses, isLoading }: { courses: Course[], isLoading: boolean }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">My Courses</h3>
            <div className="space-y-4">
                {isLoading ? (
                    <p className="text-slate-400">Loading...</p>
                ) : courses.length === 0 ? (
                    <p className="text-slate-400">No courses found.</p>
                ) : (
                    courses.map((course, i) => (
                        <div key={course._id} className="bg-slate-900 border border-slate-700 rounded-lg p-4 hover:border-cyan-500/50 transition-all cursor-pointer">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h4 className="text-slate-100 font-semibold mb-2">{course.title}</h4>
                                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                                        <span className="flex items-center">
                                            <Users className="w-4 h-4 mr-1" />
                                            {course.totalEnrollments || 0} Students
                                        </span>
                                        <span className="flex items-center">
                                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                            {course.ratingAvg || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-emerald-400 font-semibold font-mono">৳{course.price}</p>
                                    <p className="text-xs text-slate-500">Price</p>
                                </div>
                            </div>
                            {/* Static progress bar as placeholder */}
                            <div className={`h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full`} />
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    )
}

function RecentActivity() {
    const activities = [
        { icon: MessageSquare, text: 'New question posted', time: '10 mins ago', color: 'bg-cyan-500' },
        { icon: CheckCircle2, text: 'Assignment submitted', time: '30 mins ago', color: 'bg-emerald-500' },
        { icon: Star, text: 'New review received', time: '1 hour ago', color: 'bg-yellow-500' },
        { icon: Users, text: 'New student enrolled', time: '2 hours ago', color: 'bg-purple-500' },
    ]

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
            className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Recent Activity</h3>
            <div className="space-y-4">
                {activities.map((activity, i) => (
                    <div key={i} className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${activity.color} bg-opacity-10`}>
                            <activity.icon className={`w-4 h-4 ${activity.color.replace('bg-', 'text-')}`} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-slate-200">{activity.text}</p>
                            <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
