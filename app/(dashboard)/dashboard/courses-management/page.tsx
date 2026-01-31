"use client"
import { motion } from 'framer-motion'
import { BookOpen, Plus, Search, Filter, Eye, Edit, Trash2, MoreVertical } from 'lucide-react'
import { useGetAllCoursesQuery, useDeleteCourseMutation } from '@/lib/redux/features/courses/coursesApi'
import { Course } from '@/types/api'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function CoursesManagementPage() {
    const { data: courses, isLoading, error } = useGetAllCoursesQuery({})
    const [deleteCourse] = useDeleteCourseMutation()
    const [searchQuery, setSearchQuery] = useState('')

    const filteredCourses = useMemo(() => {
        if (!courses) return []
        return courses.filter((course: Course) =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [courses, searchQuery])

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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">Course Management</h1>
                    <p className="text-slate-400">Manage all courses across the platform.</p>
                </motion.div>
                <Link href="/dashboard/create-course">
                    <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-colors">
                        <Plus className="w-5 h-5" />
                        <span>Create New Course</span>
                    </button>
                </Link>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1">
                        <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-purple-500"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="p-12 text-center text-slate-400 italic">
                        Loading courses...
                    </div>
                ) : error ? (
                    <div className="p-12 text-center text-red-400">
                        Failed to load courses.
                    </div>
                ) : filteredCourses.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        No courses found.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900/50 border-b border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">Course</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">Category</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">Price</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">Instructor</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {filteredCourses.map((course: Course) => (
                                    <tr key={course._id} className="hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-slate-700 rounded overflow-hidden">
                                                    {course.thumbnail && (
                                                        <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
                                                    )}
                                                </div>
                                                <span className="font-medium text-slate-100">{course.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-300">{course.category}</td>
                                        <td className="px-6 py-4 text-sm text-slate-100 font-medium">৳{course.price}</td>
                                        <td className="px-6 py-4 text-sm text-slate-300">
                                            {typeof course.instructorId === 'object' ? course.instructorId.name : 'Unknown'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
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
            </div>
        </div>
    )
}
