"use client"
import { motion } from 'framer-motion'
import { BookOpen, Search, Edit, Trash2, Eye, Plus, Filter, ChevronDown, ChevronLeft, ChevronRight, PlayCircle, Clock, Star } from 'lucide-react'
import { useGetInstructorCoursesQuery, useDeleteCourseMutation } from '@/lib/redux/features/courses/coursesApi'
import { useGetMyEnrollmentsQuery } from '@/lib/redux/features/enrollments/enrollmentsApi'
import { useAppSelector } from '@/lib/redux/hooks'
import { selectCurrentUser } from '@/lib/redux/features/auth/authSlice'
import { Course, Enrollment } from '@/types/api'
import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

export default function MyCoursesPage() {
    const user = useAppSelector(selectCurrentUser)
    const isStudent = user?.role === 'STUDENT'
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all')
    const [showFilterDropdown, setShowFilterDropdown] = useState(false)

    // Instructor Data
    const { data: instructorData, isLoading: isLoadingInstructor, error: instructorError } = useGetInstructorCoursesQuery({
        page,
        limit: 10,
        search: searchQuery || undefined,
        status: filterStatus !== 'all' ? filterStatus : undefined
    }, { skip: isStudent })

    // Student Data
    const { data: studentEnrollments, isLoading: isLoadingStudent, error: studentError } = useGetMyEnrollmentsQuery({}, { skip: !isStudent })

    const isLoading = isStudent ? isLoadingStudent : isLoadingInstructor
    const error = isStudent ? studentError : instructorError

    const deleteCourseMutation = useDeleteCourseMutation()
    const deleteCourse = deleteCourseMutation[0]

    const handleDelete = async (courseId: string, courseTitle: string) => {
        if (window.confirm(`Are you sure you want to delete "${courseTitle}"?`)) {
            try {
                await deleteCourse(courseId).unwrap()
                toast.success('Course deleted successfully!')
            } catch (err) {
                toast.error('Failed to delete course')
                console.error('Delete error:', err)
            }
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    if (isStudent) {
        return (
            <div className="space-y-8">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">My Enrollments</h1>
                    <p className="text-slate-400">Continue where you left off and track your learning progress</p>
                </motion.div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => <div key={i} className="h-64 bg-slate-800/50 rounded-2xl animate-pulse" />)}
                    </div>
                ) : !studentEnrollments || studentEnrollments.length === 0 ? (
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-16 text-center space-y-6">
                        <div className="h-24 w-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                            <BookOpen className="h-12 w-12 text-slate-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-200">No Enrolled Courses Found</h2>
                        <p className="text-slate-500 max-w-md mx-auto">
                            You haven't enrolled in any courses yet. Explore our course catalog to find the perfect course for you.
                        </p>
                        <Button
                            onClick={() => router.push('/courses')}
                            className="px-8 py-6 rounded-xl font-bold text-lg"
                        >
                            Browse Courses
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {studentEnrollments.map((enrollment: Enrollment) => {
                            const course = enrollment.courseId as Course
                            return (
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    key={enrollment._id}
                                    className="bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden group transition-all hover:bg-slate-800/60 hover:shadow-2xl hover:shadow-cyan-500/10"
                                >
                                    <div className="aspect-video relative overflow-hidden">
                                        {course.thumbnail ? (
                                            <img src={course.thumbnail} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        ) : (
                                            <div className="h-full w-full bg-gradient-to-br from-slate-700 to-slate-800" />
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button variant="outline" className="border-white text-white hover:bg-white/10 flex items-center gap-2">
                                                <PlayCircle className="h-5 w-5" />
                                                Continue Learning
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="p-5 space-y-4">
                                        <div>
                                            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg">
                                                {course.category}
                                            </span>
                                            <h3 className="mt-2 font-bold text-lg text-slate-100 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                                                {course.title}
                                            </h3>
                                        </div>

                                        <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                                            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                                <Clock className="h-3.5 w-3.5" />
                                                Enrolled: {formatDate(enrollment.createdAt)}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                                                <span className="text-xs font-bold text-slate-300">{course.ratingAvg?.toFixed(1) || '0.0'}</span>
                                            </div>
                                        </div>

                                        <Link href={`/courses/${course._id}`} className="block">
                                            <Button className="w-full h-11 bg-slate-700 hover:bg-slate-600 text-slate-100">
                                                Course Details
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}
            </div>
        )
    }

    // Instructor View (Original logic mostly)
    const courses = instructorData?.courses || []
    const meta = instructorData?.meta

    const getStatusBadge = (isPublished: boolean) => {
        if (isPublished) {
            return (
                <span className="px-2.5 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                    Published
                </span>
            )
        }
        return (
            <span className="px-2.5 py-1 text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
                Draft
            </span>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">My Created Courses</h1>
                    <p className="text-slate-400">Manage and track all your courses</p>
                </motion.div>

                <Link href="/dashboard/create-course">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-cyan-500/25"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Create Course</span>
                    </motion.button>
                </Link>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search courses by title..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            setPage(1)
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                </div>

                <div className="relative">
                    <button
                        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                        className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-300 hover:border-cyan-500 transition-colors w-full sm:w-auto"
                    >
                        <Filter className="w-4 h-4" />
                        <span className="capitalize">{filterStatus === 'all' ? 'All Courses' : filterStatus}</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>

                    {showFilterDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10">
                            {['all', 'published', 'draft'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => {
                                        setFilterStatus(status as any)
                                        setPage(1)
                                        setShowFilterDropdown(false)
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-sm capitalize hover:bg-slate-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${filterStatus === status ? 'text-cyan-400 bg-slate-700/50' : 'text-slate-300'
                                        }`}
                                >
                                    {status === 'all' ? 'All Courses' : status}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center py-20">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                        <p className="text-slate-400">Loading courses...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
                    <p className="text-red-400">Failed to load courses. Please try again later.</p>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && courses.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-800/50 border border-slate-700 rounded-xl p-12 text-center"
                >
                    <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-300 mb-2">
                        {searchQuery || filterStatus !== 'all' ? 'No courses found' : 'No courses yet'}
                    </h3>
                    <p className="text-slate-500 mb-6">
                        {searchQuery || filterStatus !== 'all'
                            ? 'Try adjusting your search or filter criteria'
                            : 'Start creating your first course to share your knowledge'}
                    </p>
                    {!searchQuery && filterStatus === 'all' && (
                        <Link href="/dashboard/create-course">
                            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all">
                                Create Your First Course
                            </button>
                        </Link>
                    )}
                </motion.div>
            )}

            {/* Desktop Table View */}
            {!isLoading && !error && courses.length > 0 && (
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hidden lg:block bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden"
                    >
                        <div className="relative overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-900/50 border-b border-slate-700">
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Course</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Category</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Price</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Status</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Enrollments</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Rating</th>
                                        <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Created</th>
                                        <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course: Course) => (
                                        <tr
                                            key={course._id}
                                            className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden bg-slate-700">
                                                        {course.thumbnail ? (
                                                            <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-500" />
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-slate-100 truncate max-w-[200px]">{course.title}</p>
                                                        <p className="text-xs text-slate-500 truncate">{course.level}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-300">{course.category}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-slate-100">৳{course.price}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(course.isPublished)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-300">{course.totalEnrollments || 0}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-1">
                                                    <span className="text-sm font-medium text-amber-400">★</span>
                                                    <span className="text-sm text-slate-300">{course.ratingAvg?.toFixed(1) || '0.0'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-400">{formatDate(course.createdAt)}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Link href={`/dashboard/courses/${course._id}`}>
                                                        <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 rounded-lg transition-all" title="View Details">
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                    </Link>
                                                    <Link href={`/dashboard/courses/${course._id}/edit`}>
                                                        <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded-lg transition-all" title="Edit Course">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(course._id, course.title)}
                                                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-all"
                                                        title="Delete Course"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Tablet View & Mobile View - Simplified */}
                    <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                        {courses.map((course: Course) => (
                            <div key={course._id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold text-slate-100 line-clamp-2 pr-2">{course.title}</h3>
                                    {getStatusBadge(course.isPublished)}
                                </div>
                                <div className="grid grid-cols-2 gap-y-2 text-sm">
                                    <span className="text-slate-400">Price:</span>
                                    <span className="text-slate-100 text-right">৳{course.price}</span>
                                    <span className="text-slate-400">Students:</span>
                                    <span className="text-slate-100 text-right">{course.totalEnrollments || 0}</span>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <Link href={`/dashboard/courses/${course._id}`} className="flex-1">
                                        <Button variant="outline" size="sm" className="w-full text-slate-300">View</Button>
                                    </Link>
                                    <Link href={`/dashboard/courses/${course._id}/edit`} className="flex-1">
                                        <Button variant="outline" size="sm" className="w-full text-slate-300">Edit</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {meta && meta.totalPages > 1 && (
                        <div className="flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                            <p className="text-sm text-slate-400">
                                Page <span className="text-slate-100 font-bold">{meta.page}</span> of {meta.totalPages}
                            </p>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setPage(p => p - 1)}
                                    disabled={page === 1}
                                    className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-400 disabled:opacity-30 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <div className="flex items-center space-x-1">
                                    {[...Array(meta.totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setPage(i + 1)}
                                            className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${page === i + 1
                                                ? 'bg-cyan-500 text-white'
                                                : 'text-slate-400 hover:bg-slate-700'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={page === meta.totalPages}
                                    className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-400 disabled:opacity-30 transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
