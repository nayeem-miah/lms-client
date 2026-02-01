"use client"

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
    BookOpen,
    Clock,
    User,
    ChevronLeft,
    Tag,
    BarChart,
    Calendar,
    DollarSign,
    Users,
    Star,
    Edit,
    Trash2,
    CheckCircle2,
    Loader2
} from 'lucide-react'
import { useGetCourseByIdQuery, useDeleteCourseMutation } from '@/lib/redux/features/courses/coursesApi'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

export default function CourseDetailsPage() {
    const { id } = useParams()
    const router = useRouter()
    const { data: course, isLoading, error } = useGetCourseByIdQuery(id)
    const [deleteCourse] = useDeleteCourseMutation()

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await deleteCourse(id).unwrap()
                toast.success('Course deleted successfully')
                router.push('/dashboard/my-courses')
            } catch (err) {
                toast.error('Failed to delete course')
            }
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
                <p className="text-slate-400 font-medium animate-pulse">Loading course details...</p>
            </div>
        )
    }

    if (error || !course) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center">
                <div className="p-4 bg-red-500/10 rounded-full">
                    <BookOpen className="w-12 h-12 text-red-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-100 mb-2">Course Not Found</h2>
                    <p className="text-slate-400">The course you are looking for does not exist or has been removed.</p>
                </div>
                <button
                    onClick={() => router.back()}
                    className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-xl transition-all"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Go Back</span>
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {/* Header / Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2.5 bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl transition-all border border-slate-700/50"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Course Details</h1>
                        <p className="text-slate-300 font-medium truncate max-w-[250px] sm:max-w-md">{course.title}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <Link href={`/dashboard/courses/${id}/edit`}>
                        <button className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl transition-all border border-slate-700/50">
                            <Edit className="w-4 h-4" />
                            <span className="text-sm font-medium">Edit Course</span>
                        </button>
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="flex items-center space-x-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2.5 rounded-xl transition-all border border-red-500/20"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Delete</span>
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Thumbnail & Key Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-1 space-y-6"
                >
                    <div className="aspect-video relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-2xl group">
                        {course.thumbnail ? (
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400">
                                <BookOpen className="w-16 h-16" />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-4 left-4">
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest bg-emerald-500 text-white shadow-lg`}>
                                {course.isPublished ? 'Published' : 'Draft'}
                            </span>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 space-y-6 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-amber-400">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="text-lg font-bold">{course.ratingAvg.toFixed(1)}</span>
                                <span className="text-slate-500 text-sm font-normal">(4.8/5)</span>
                            </div>
                            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                ৳{course.price}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
                            <div className="space-y-1">
                                <p className="text-xs text-slate-500 uppercase font-semibold">Category</p>
                                <div className="flex items-center space-x-2 text-slate-200">
                                    <Tag className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm font-medium">{course.category}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-slate-500 uppercase font-semibold">Level</p>
                                <div className="flex items-center space-x-2 text-slate-200">
                                    <BarChart className="w-4 h-4 text-cyan-400" />
                                    <span className="text-sm font-medium lowercase capitalize">{course.level.toLowerCase()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-3 text-slate-400">
                                    <Users className="w-4 h-4" />
                                    <span>Total Enrollments</span>
                                </div>
                                <span className="text-slate-100 font-semibold">{course.totalEnrollments} Students</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-3 text-slate-400">
                                    <Calendar className="w-4 h-4" />
                                    <span>Created Date</span>
                                </div>
                                <span className="text-slate-100 font-semibold">
                                    {new Date(course.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Content & Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 space-y-8"
                >
                    {/* Course Summary */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-sm space-y-6">
                        <h2 className="text-3xl font-bold text-slate-100 leading-tight">
                            {course.title}
                        </h2>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2 bg-slate-900/50 px-4 py-2 rounded-xl text-slate-300 border border-slate-700/30">
                                <BookOpen className="w-4 h-4 text-indigo-400" />
                                <span className="text-sm font-medium">12 Modules</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-slate-900/50 px-4 py-2 rounded-xl text-slate-300 border border-slate-700/30">
                                <Clock className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm font-medium">45 Hours Content</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-slate-900/50 px-4 py-2 rounded-xl text-slate-300 border border-slate-700/30">
                                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                                <span className="text-sm font-medium">Certificate</span>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <h3 className="text-xl font-semibold text-white mb-4">Course Description</h3>
                            <p className="text-slate-400 leading-relaxed text-lg italic bg-slate-900/30 p-4 rounded-xl border-l-4 border-indigo-500">
                                {course.description}
                            </p>
                        </div>
                    </div>

                    {/* Instructor Card */}
                    <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-3xl p-8 backdrop-blur-sm">
                        <div className="flex items-center space-x-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-xl rotate-3">
                                {typeof course.instructorId === 'object'
                                    ? course.instructorId.name.charAt(0)
                                    : 'I'}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-100 mb-1">
                                    {typeof course.instructorId === 'object'
                                        ? course.instructorId.name
                                        : 'Course Instructor'}
                                </h3>
                                <p className="text-indigo-400 font-medium text-sm mb-2">Senior Content Creator & Expert Educator</p>
                                <div className="flex items-center space-x-4 text-slate-400 text-sm">
                                    <div className="flex items-center space-x-1">
                                        <Users className="w-4 h-4" />
                                        <span>12.5k Students</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-4 h-4 text-amber-500" />
                                        <span>4.9 Rating</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Curricullum Preview Placeholder */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-slate-100 flex items-center">
                            <Loader2 className="w-5 h-5 mr-3 text-cyan-500" />
                            Curriculum Structure
                        </h3>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/50 rounded-2xl hover:bg-slate-800/50 transition-all cursor-pointer group">
                                    <div className="flex items-center space-x-4 text-slate-300">
                                        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">
                                            0{i}
                                        </div>
                                        <span className="font-medium group-hover:text-white transition-colors">Module {i} Preview Content</span>
                                    </div>
                                    <Clock className="w-4 h-4 text-slate-600" />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
