"use client"

import { motion } from 'framer-motion'
import { BookOpen, Clock, Star, PlayCircle, TrendingUp, Award, Calendar } from 'lucide-react'
import { useGetMyEnrollmentsQuery } from '@/lib/redux/features/enrollments/enrollmentsApi'
import { Course, Enrollment } from '@/types/api'
import { useState } from 'react'
import { Link, useRouter } from '@/i18n/routing'
import { Button } from '@/components/ui/Button'

export default function MyEnrollmentsPage() {
    const router = useRouter()
    const { data: enrollments, isLoading, error } = useGetMyEnrollmentsQuery({})

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const getProgressColor = (progress: number) => {
        if (progress === 0) return 'from-slate-600 to-slate-700'
        if (progress < 30) return 'from-red-500 to-orange-500'
        if (progress < 70) return 'from-yellow-500 to-amber-500'
        return 'from-green-500 to-emerald-500'
    }

    return (
        <div className="min-h-screen space-y-8">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
            >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    My Enrollments
                </h1>
                <p className="text-slate-400 text-lg">
                    Continue where you left off and track your learning progress
                </p>
            </motion.div>

            {/* Stats Cards */}
            {!isLoading && enrollments && enrollments.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6 space-y-2">
                        <div className="flex items-center justify-between">
                            <BookOpen className="h-8 w-8 text-cyan-400" />
                            <div className="h-12 w-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-cyan-400">{enrollments.length}</span>
                            </div>
                        </div>
                        <h3 className="text-slate-300 font-medium">Total Courses</h3>
                        <p className="text-xs text-slate-500">Enrolled courses</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6 space-y-2">
                        <div className="flex items-center justify-between">
                            <TrendingUp className="h-8 w-8 text-purple-400" />
                            <div className="h-12 w-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-purple-400">
                                    {Math.round(enrollments.reduce((acc: number, e: Enrollment) => acc + (e.progress || 0), 0) / enrollments.length)}%
                                </span>
                            </div>
                        </div>
                        <h3 className="text-slate-300 font-medium">Avg Progress</h3>
                        <p className="text-xs text-slate-500">Overall completion</p>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-2xl p-6 space-y-2">
                        <div className="flex items-center justify-between">
                            <Award className="h-8 w-8 text-emerald-400" />
                            <div className="h-12 w-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-emerald-400">
                                    {enrollments.filter((e: Enrollment) => (e.progress || 0) === 100).length}
                                </span>
                            </div>
                        </div>
                        <h3 className="text-slate-300 font-medium">Completed</h3>
                        <p className="text-xs text-slate-500">Finished courses</p>
                    </div>
                </motion.div>
            )}

            {/* Loading State */}
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-96 bg-slate-800/50 border border-slate-700/50 rounded-2xl animate-pulse" />
                    ))}
                </div>
            )}

            {/* Error State */}
            {error && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center"
                >
                    <p className="text-red-400 text-lg">Failed to load enrollments. Please try again later.</p>
                </motion.div>
            )}

            {/* Empty State */}
            {!isLoading && !error && (!enrollments || enrollments.length === 0) && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-16 text-center space-y-6"
                >
                    <div className="h-32 w-32 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto">
                        <BookOpen className="h-16 w-16 text-slate-500" />
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold text-slate-200">No Enrolled Courses Found</h2>
                        <p className="text-slate-400 max-w-md mx-auto text-lg">
                            You haven't enrolled in any courses yet. Explore our course catalog to find the perfect course for you.
                        </p>
                    </div>
                    <Button
                        onClick={() => router.push('/courses')}
                        className="px-10 py-6 rounded-xl font-bold text-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25"
                    >
                        Browse Courses
                    </Button>
                </motion.div>
            )}

            {/* Enrollments Grid */}
            {!isLoading && !error && enrollments && enrollments.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {enrollments.map((enrollment: Enrollment, index: number) => {
                        const course = enrollment.courseId as Course
                        const progress = enrollment.progress || 0

                        return (
                            <motion.div
                                key={enrollment._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-cyan-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
                            >
                                {/* Thumbnail */}
                                <div className="aspect-video relative overflow-hidden bg-slate-900">
                                    {course.thumbnail ? (
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600" />
                                    )}

                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <Button
                                            variant="outline"
                                            className="border-2 border-white text-white hover:bg-white hover:text-slate-900 flex items-center gap-2 font-bold px-6 py-3"
                                        >
                                            <PlayCircle className="h-5 w-5" />
                                            Continue Learning
                                        </Button>
                                    </div>

                                    {/* Progress Badge */}
                                    {progress > 0 && (
                                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                                            <span className="text-xs font-bold text-white">{progress}% Complete</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    {/* Category Badge */}
                                    <div>
                                        <span className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg">
                                            {course.category}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-bold text-xl text-slate-100 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                                        {course.title}
                                    </h3>

                                    {/* Progress Bar */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-slate-400 font-medium">Progress</span>
                                            <span className="text-slate-300 font-bold">{progress}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                                className={`h-full bg-gradient-to-r ${getProgressColor(progress)} rounded-full`}
                                            />
                                        </div>
                                    </div>

                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                            <Calendar className="h-3.5 w-3.5" />
                                            Enrolled: {formatDate(enrollment.createdAt)}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                            <span className="text-sm font-bold text-slate-200">
                                                {course.ratingAvg?.toFixed(1) || '0.0'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <Link href={`/courses/${course._id}`} className="block">
                                        <Button className="w-full h-12 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-cyan-600 hover:to-blue-600 text-slate-100 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/20">
                                            Course Details
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            )}
        </div>
    )
}
