"use client"

import { motion } from 'framer-motion'
import {
    BookOpen,
    Search,
    Filter,
    Eye,
    Trash2,
    CheckCircle2,
    XCircle,
    ChevronLeft,
    ChevronRight,
    Loader2,
    MoreVertical
} from 'lucide-react'
import {
    useDeleteCourseMutation,
    useGetAllCoursesByAdminQuery,
    useTogglePublishCourseMutation
} from '@/lib/redux/features/courses/coursesApi'
import { Course } from '@/types/api'
import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function CoursesManagementPage() {
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('')

    const { data, isLoading, isFetching, error } = useGetAllCoursesByAdminQuery({
        page,
        limit: 10,
        search: searchTerm,
        category: category || undefined
    })

    const [deleteCourse] = useDeleteCourseMutation()
    const [togglePublish] = useTogglePublishCourseMutation()

    const handleDelete = async (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                await deleteCourse(id).unwrap()
                toast.success('Course deleted successfully')
            } catch (err) {
                toast.error('Failed to delete course')
            }
        }
    }

    const handleTogglePublish = async (id: string) => {
        try {
            await togglePublish(id).unwrap()
            toast.success('Course status updated')
        } catch (err) {
            toast.error('Failed to update course status')
        }
    }

    const categories = [
        'Web Development',
        'Mobile Development',
        'Data Science',
        'Machine Learning',
        'UI/UX Design',
        'Digital Marketing',
        'Business',
    ]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">Course Management</h1>
                    <p className="text-slate-400">Review and publish courses across the platform.</p>
                </motion.div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
                {/* Filters */}
                <div className="p-5 border-b border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/50">
                    <div className="relative flex-1">
                        <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                                setPage(1)
                            }}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-cyan-500 transition-all"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        <select
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                                setPage(1)
                            }}
                            className="bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-cyan-500"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <div className="p-20 text-center">
                        <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mx-auto mb-4" />
                        <p className="text-slate-400 italic">Loading courses...</p>
                    </div>
                ) : error ? (
                    <div className="p-20 text-center text-red-400">
                        <p>Error loading courses. Please try again later.</p>
                    </div>
                ) : !data?.courses?.length ? (
                    <div className="p-20 text-center text-slate-500 text-lg italic">
                        No courses found matching your criteria.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900/80 border-b border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">Course</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">Category</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">Price</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">Instructor</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-center">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {data.courses.map((course: Course) => (
                                    <tr key={course._id} className="hover:bg-slate-700/20 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-slate-700 rounded-lg overflow-hidden border border-slate-600 shadow-sm transition-transform group-hover:scale-105">
                                                    {course.thumbnail ? (
                                                        <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-slate-800">
                                                            <BookOpen className="w-6 h-6 text-slate-600" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors truncate max-w-[200px]">{course.title}</span>
                                                    <span className="text-xs text-slate-500">ID: {course._id?.slice(-6) || '...'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-300 italic">{course.category}</td>
                                        <td className="px-6 py-4 text-sm text-slate-100 font-bold">৳{course.price}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm text-slate-200">{typeof course.instructorId === 'object' && course.instructorId !== null ? (course.instructorId as any).name : 'Unknown'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                onClick={() => handleTogglePublish(course._id)}
                                                className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all border ${course.isPublished
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                                                    : 'bg-slate-700/50 text-slate-400 border-slate-600 hover:bg-slate-700'
                                                    }`}
                                            >
                                                {course.isPublished ? 'Published' : 'Draft'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link href={`/dashboard/courses/${course._id}`}>
                                                    <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 rounded-lg transition-all" title="View Details">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(course._id, course.title)}
                                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-all"
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
                )}

                {/* Pagination */}
                {data?.meta && data.meta.totalPages > 1 && (
                    <div className="p-5 border-t border-slate-700 flex items-center justify-between bg-slate-900/50">
                        <div className="text-sm text-slate-400 font-medium italic">
                            Showing page <span className="text-slate-100 font-bold">{data.meta.page}</span> of <span className="text-slate-100 font-bold">{data.meta.totalPages}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-slate-700"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div className="flex items-center space-x-1">
                                {[...Array(data?.meta?.totalPages || 0)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i + 1)}
                                        className={`w-10 h-10 rounded-xl text-sm font-bold transition-all border ${page === i + 1
                                            ? 'bg-cyan-500 border-cyan-400 text-white shadow-lg shadow-cyan-900/40'
                                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page === data.meta.totalPages}
                                className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-slate-700"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
