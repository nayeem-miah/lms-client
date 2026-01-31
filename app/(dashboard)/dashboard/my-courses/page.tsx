"use client"
import { motion } from 'framer-motion'
import { BookOpen, Search, Edit, Trash2, Eye, Plus, Filter, ChevronDown, MoreVertical } from 'lucide-react'
import { useGetInstructorCoursesQuery, useDeleteCourseMutation } from '@/lib/redux/features/courses/coursesApi'
import { Course } from '@/types/api'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function MyCoursesPage() {
    const { data: courses, isLoading, error } = useGetInstructorCoursesQuery({})
    const [deleteCourse] = useDeleteCourseMutation()
    const [searchQuery, setSearchQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all')
    const [showFilterDropdown, setShowFilterDropdown] = useState(false)

    // Filter and search courses
    const filteredCourses = useMemo(() => {
        if (!courses) return []

        let filtered = courses

        // Apply status filter
        if (filterStatus === 'published') {
            filtered = filtered.filter((course: Course) => course.isPublished)
        } else if (filterStatus === 'draft') {
            filtered = filtered.filter((course: Course) => !course.isPublished)
        }

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter((course: Course) =>
                course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.category.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        return filtered
    }, [courses, searchQuery, filterStatus])

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
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">My Courses</h1>
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
                        placeholder="Search courses by title or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
            {!isLoading && !error && filteredCourses.length === 0 && (
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
            {!isLoading && !error && filteredCourses.length > 0 && (
                <>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hidden lg:block bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden"
                    >
                        <div className="overflow-x-auto">
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
                                    {filteredCourses.map((course: Course, index: number) => (
                                        <motion.tr
                                            key={course._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex-shrink-0" />
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-slate-100 truncate">{course.title}</p>
                                                        <p className="text-xs text-slate-500 truncate">{course.level}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-300">{course.category}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-slate-100">${course.price}</span>
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
                                                    <span className="text-sm text-slate-300">{course.ratingAvg.toFixed(1)}</span>
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
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Tablet View */}
                    <div className="hidden md:grid lg:hidden grid-cols-1 gap-4">
                        {filteredCourses.map((course: Course, index: number) => (
                            <motion.div
                                key={course._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 hover:border-cyan-500/50 transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-semibold text-slate-100 mb-1 truncate">{course.title}</h3>
                                            <div className="flex items-center space-x-2 text-xs text-slate-400">
                                                <span>{course.category}</span>
                                                <span>•</span>
                                                <span>{course.level}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {getStatusBadge(course.isPublished)}
                                </div>

                                <div className="grid grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Price</p>
                                        <p className="text-sm font-medium text-slate-100">${course.price}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Students</p>
                                        <p className="text-sm font-medium text-slate-100">{course.totalEnrollments || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Rating</p>
                                        <p className="text-sm font-medium text-amber-400">★ {course.ratingAvg.toFixed(1)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">Created</p>
                                        <p className="text-sm font-medium text-slate-100">{formatDate(course.createdAt)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 pt-4 border-t border-slate-700">
                                    <Link href={`/dashboard/courses/${course._id}`} className="flex-1">
                                        <button className="w-full flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg transition-all">
                                            <Eye className="w-4 h-4" />
                                            <span className="text-sm font-medium">Details</span>
                                        </button>
                                    </Link>
                                    <Link href={`/dashboard/courses/${course._id}/edit`}>
                                        <button className="p-2 bg-slate-700 hover:bg-blue-500 text-slate-200 hover:text-white rounded-lg transition-all">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(course._id, course.title)}
                                        className="p-2 bg-slate-700 hover:bg-red-500 text-slate-200 hover:text-white rounded-lg transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden grid grid-cols-1 gap-4">
                        {filteredCourses.map((course: Course, index: number) => (
                            <motion.div
                                key={course._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all"
                            >
                                <div className="h-32 bg-gradient-to-br from-cyan-500 to-blue-500" />
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="font-semibold text-slate-100 flex-1 pr-2">{course.title}</h3>
                                        {getStatusBadge(course.isPublished)}
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-400">Category</span>
                                            <span className="text-slate-200">{course.category}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-400">Level</span>
                                            <span className="text-slate-200">{course.level}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-400">Price</span>
                                            <span className="text-slate-200 font-medium">${course.price}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-400">Students</span>
                                            <span className="text-slate-200">{course.totalEnrollments || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-400">Rating</span>
                                            <span className="text-amber-400 font-medium">★ {course.ratingAvg.toFixed(1)}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-400">Created</span>
                                            <span className="text-slate-200">{formatDate(course.createdAt)}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        <Link href={`/dashboard/courses/${course._id}`} className="col-span-3">
                                            <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2.5 rounded-lg transition-all">
                                                <Eye className="w-4 h-4" />
                                                <span className="text-sm font-medium">View Details</span>
                                            </button>
                                        </Link>
                                        <Link href={`/dashboard/courses/${course._id}/edit`} className="col-span-1">
                                            <button className="w-full flex items-center justify-center bg-slate-700 hover:bg-blue-500 text-slate-200 hover:text-white px-3 py-2.5 rounded-lg transition-all">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(course._id, course.title)}
                                            className="col-span-2 flex items-center justify-center space-x-2 bg-slate-700 hover:bg-red-500 text-slate-200 hover:text-white px-3 py-2.5 rounded-lg transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            <span className="text-sm font-medium">Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Results Count */}
                    <div className="text-center text-sm text-slate-400">
                        Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
                        {(searchQuery || filterStatus !== 'all') && courses && ` of ${courses.length} total`}
                    </div>
                </>
            )}
        </div>
    )
}
