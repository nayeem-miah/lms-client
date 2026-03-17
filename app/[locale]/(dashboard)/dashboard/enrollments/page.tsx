"use client"
import { motion } from 'framer-motion'
import { Users, Search, BookOpen, Calendar, ExternalLink, Shield } from 'lucide-react'
import { useGetAllEnrollmentsQuery } from '@/lib/redux/features/enrollments/enrollmentsApi'
import { Enrollment, User, Course } from '@/types/api'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Link } from '@/i18n/routing'

export default function AdminEnrollmentHistoryPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)
    
    const { data: enrollmentData, isLoading, error } = useGetAllEnrollmentsQuery({
        page,
        limit: 10,
        search: searchQuery || undefined
    })

    const enrollments = enrollmentData?.enrollments || []
    const meta = enrollmentData?.meta

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold text-slate-100 mb-2 flex items-center gap-2">
                        <Shield className="h-8 w-8 text-cyan-500" />
                        Global Enrollment History
                    </h1>
                    <p className="text-slate-400">View and monitor all course enrollments across the platform.</p>
                </motion.div>

                <div className="relative w-full sm:w-64">
                    <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search student, course, or instructor..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-20 bg-slate-800/50 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl text-center text-red-400">
                    Failed to load enrollments. Please ensure you have admin privileges.
                </div>
            ) : enrollments.length === 0 ? (
                <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden text-center p-12">
                    <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-300 mb-2">No Enrollments Found</h3>
                    <p className="text-slate-500 max-w-sm mx-auto">
                        {searchQuery ? "No results match your search." : "There are currently no enrollments recorded in the system."}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-900/50 border-b border-slate-700">
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-400">Student</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-400">Course</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-400">Date</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-400">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {enrollments.map((enrollment: Enrollment) => {
                                    const student = enrollment.userId as User
                                    const course = enrollment.courseId as Course
                                    return (
                                        <tr key={enrollment._id} className="hover:bg-slate-700/20 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 bg-slate-700 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase overflow-hidden border border-slate-600">
                                                        {student?.profilePhoto ? (
                                                            <img src={student.profilePhoto} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            (student?.name || 'U').charAt(0)
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-200">{student?.name || 'Unknown User'}</p>
                                                        <p className="text-xs text-slate-500">{student?.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <BookOpen className="h-4 w-4 text-slate-500" />
                                                    <p className="text-sm text-slate-300 line-clamp-1">{course?.title || 'Unknown Course'}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                                    <Calendar className="h-4 w-4" />
                                                    {formatDate(enrollment.createdAt || enrollment.enrolledAt)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                                    enrollment.isActive 
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                                    : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                                }`}>
                                                    {enrollment.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/dashboard/courses/${course?._id}`}>
                                                        <button className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 rounded-lg transition-all" title="View Course Details">
                                                            <ExternalLink className="h-4 w-4" />
                                                        </button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {meta && meta.totalPages > 1 && (
                        <div className="flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                            <p className="text-sm text-slate-400 font-medium">
                                Showing page <span className="text-slate-100">{meta.page}</span> of {meta.totalPages}
                            </p>
                            <div className="flex items-center gap-2">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                    className="border-slate-700 text-slate-300 hover:bg-slate-700"
                                >
                                    Previous
                                </Button>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    disabled={page === meta.totalPages}
                                    onClick={() => setPage(page + 1)}
                                    className="border-slate-700 text-slate-300 hover:bg-slate-700"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
