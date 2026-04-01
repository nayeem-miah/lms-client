"use client"

import { motion, AnimatePresence } from 'framer-motion'
import {
    BookOpen,
    Search,
    Edit,
    Trash2,
    Eye,
    Plus,
    Filter,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    PlayCircle,
    Clock,
    Star,
    AlertCircle,
    Loader2
} from 'lucide-react'
import { useGetInstructorCoursesQuery, useDeleteCourseMutation } from '@/lib/redux/features/courses/coursesApi'
import { useGetMyEnrollmentsQuery } from '@/lib/redux/features/enrollments/enrollmentsApi'
import { useAppSelector } from '@/lib/redux/hooks'
import { selectCurrentUser, selectIsLoading as selectAuthLoading } from '@/lib/redux/features/auth/authSlice'
import { Course, Enrollment } from '@/types/api'
import { useState, useMemo } from 'react'
import { Link, useRouter } from '@/i18n/routing'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/Button'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function MyCoursesPage() {
    const user = useAppSelector(selectCurrentUser)
    const isAuthLoading = useAppSelector(selectAuthLoading)
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all')
    const [showFilterDropdown, setShowFilterDropdown] = useState(false)

    // Role detection
    const isStudent = user?.role === 'STUDENT'
    const isInstructor = user?.role === 'INSTRUCTOR' || user?.role === 'ADMIN'

    // Queries with strict skipping until auth is ready
    const { 
        data: instructorData, 
        isLoading: isLoadingInstructor, 
        isFetching: isFetchingInstructor,
        error: instructorError 
    } = useGetInstructorCoursesQuery({
        page,
        limit: 10,
        search: searchQuery || undefined,
        status: filterStatus !== 'all' ? filterStatus : undefined
    }, { skip: !isInstructor || isAuthLoading })

    const { 
        data: studentEnrollments, 
        isLoading: isLoadingStudent, 
        error: studentError 
    } = useGetMyEnrollmentsQuery({}, { skip: !isStudent || isAuthLoading })

    const [deleteCourse] = useDeleteCourseMutation()

    const handleDelete = async (courseId: string, courseTitle: string) => {
        if (window.confirm(`Are you sure you want to delete "${courseTitle}"?`)) {
            try {
                await deleteCourse(courseId).unwrap()
                toast.success('Course deleted successfully!')
            } catch (err) {
                toast.error('Failed to delete course')
            }
        }
    }

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A'
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const isLoading = isStudent ? isLoadingStudent : isLoadingInstructor
    const error = isStudent ? studentError : instructorError
    const courses = instructorData?.courses || []
    const meta = instructorData?.meta

    return (
        <ProtectedRoute allowedRoles={['STUDENT', 'INSTRUCTOR', 'ADMIN']}>
            <div className="min-h-screen">
                {isStudent ? (
                    <div className="space-y-8">
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                            <h1 className="text-3xl font-bold text-slate-100 mb-2 italic">My Learning Journey</h1>
                            <p className="text-slate-400 font-medium">Continue where you left off and track your professional growth</p>
                        </motion.div>

                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-80 bg-slate-900/50 border border-slate-800 rounded-3xl animate-pulse" />
                                ))}
                            </div>
                        ) : studentError ? (
                            <div className="bg-red-500/10 border border-red-500/20 p-12 rounded-[2rem] text-center">
                                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-100 mb-2">Oops! Something went wrong</h3>
                                <p className="text-slate-400">Failed to load your enrollments. Please try refreshing the page.</p>
                            </div>
                        ) : !studentEnrollments || studentEnrollments.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-slate-900 border border-slate-800 rounded-[3rem] p-16 text-center space-y-6 shadow-2xl"
                            >
                                <div className="h-24 w-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto ring-8 ring-slate-800/50">
                                    <BookOpen className="h-12 w-12 text-slate-600" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-black text-slate-100 italic uppercase">No Enrolled Courses</h2>
                                    <p className="text-slate-500 max-w-md mx-auto font-medium">
                                        Your learning journey hasn't started yet. Browse our catalog and start building your future today.
                                    </p>
                                </div>
                                <Button
                                    onClick={() => router.push('/courses')}
                                    className="px-10 py-6 rounded-2xl font-bold text-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl shadow-cyan-900/40 border-none"
                                >
                                    Browse Courses
                                </Button>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {studentEnrollments.map((enrollment: Enrollment, index: number) => {
                                    const course = typeof enrollment.courseId === 'object' ? (enrollment.courseId as Course) : null
                                    if (!course) return null

                                    return (
                                        <motion.div
                                            key={enrollment._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ y: -8 }}
                                            className="bg-slate-900/80 border border-slate-800 rounded-[2rem] overflow-hidden group hover:border-cyan-500/50 transition-all duration-300 shadow-2xl"
                                        >
                                            <div className="aspect-video relative overflow-hidden bg-slate-950">
                                                {course.thumbnail ? (
                                                    <img src={course.thumbnail} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                ) : (
                                                    <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-900" />
                                                )}
                                                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                                    <Button className="bg-white text-slate-950 hover:bg-cyan-50 font-black rounded-full px-6 py-2 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                        <PlayCircle className="h-5 w-5" />
                                                        CONTINUE
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="p-6 space-y-4">
                                                <div>
                                                    <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">
                                                        {course.category}
                                                    </span>
                                                    <h3 className="mt-3 font-bold text-xl text-slate-100 line-clamp-2 group-hover:text-cyan-400 transition-colors italic">
                                                        {course.title}
                                                    </h3>
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                                                    <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-tighter">
                                                        <Clock className="h-3.5 w-3.5 text-slate-600" />
                                                        {formatDate(enrollment.createdAt)}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                                                        <span className="text-xs font-black text-slate-300">{(course.ratingAvg || 0).toFixed(1)}</span>
                                                    </div>
                                                </div>

                                                <Link href={`/courses/${course._id}`} className="block">
                                                    <Button variant="outline" className="w-full h-12 border-slate-800 hover:bg-slate-800 text-slate-300 font-bold rounded-xl transition-all">
                                                        COURSE DETAILS
                                                    </Button>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Instructor Header */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                                <h1 className="text-3xl font-black text-slate-100 mb-1 italic uppercase tracking-tight">Instructor Studio</h1>
                                <p className="text-slate-400 font-medium tracking-tight">Blueprint and oversee your educational portfolio.</p>
                            </motion.div>

                            <Link href="/dashboard/create-course">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-black italic transition-all shadow-xl shadow-cyan-900/30 border border-white/10 uppercase text-sm tracking-widest"
                                >
                                    <Plus className="w-5 h-5 stroke-[3px]" />
                                    <span>New Course</span>
                                </motion.button>
                            </Link>
                        </div>

                        {/* Search and Filter */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1 group">
                                <Search className="w-5 h-5 text-slate-600 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-cyan-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Scrutinize courses by title..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                        setPage(1)
                                    }}
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-all font-medium backdrop-blur-sm"
                                />
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                    className="flex items-center space-x-3 bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-3.5 text-sm text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all w-full sm:w-auto font-bold uppercase tracking-widest"
                                >
                                    <Filter className="w-4 h-4" />
                                    <span>{filterStatus}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {showFilterDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-800 rounded-[2rem] shadow-2xl z-50 overflow-hidden backdrop-blur-xl"
                                        >
                                            {['all', 'published', 'draft'].map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => {
                                                        setFilterStatus(status as any)
                                                        setPage(1)
                                                        setShowFilterDropdown(false)
                                                    }}
                                                    className={`w-full text-left px-6 py-4 text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all ${
                                                        filterStatus === status ? 'text-cyan-400 bg-cyan-400/5' : 'text-slate-500'
                                                    }`}
                                                >
                                                    {status}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* State Handling */}
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                                <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
                                <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs italic">Syncing Portfolio</p>
                            </div>
                        ) : instructorError ? (
                            <div className="bg-red-500/5 border border-red-500/10 rounded-[2rem] p-12 text-center">
                                <AlertCircle className="w-12 h-12 text-red-500/50 mx-auto mb-4" />
                                <p className="text-red-400 font-bold italic">Network Synchronization Failure</p>
                                <p className="text-slate-500 text-sm mt-2">Authenticated access required to fetch private portfolio.</p>
                            </div>
                        ) : courses.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-900/30 border border-slate-800 rounded-[3rem] p-24 text-center border-dashed"
                            >
                                <div className="h-20 w-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <BookOpen className="w-10 h-10 text-slate-800" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-500 mb-2 italic uppercase">Zero Assets Detected</h3>
                                <p className="text-slate-600 max-w-sm mx-auto font-medium mb-8">
                                    {searchQuery || filterStatus !== 'all'
                                        ? 'Refine your parameters or reset filters.'
                                        : 'Initiate your educational empire by manifesting your first resource.'}
                                </p>
                                {!searchQuery && filterStatus === 'all' && (
                                    <Link href="/dashboard/create-course">
                                        <Button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-12 h-14 rounded-2xl font-black uppercase tracking-widest text-xs border border-slate-700">
                                            COMMENCE BUILD
                                        </Button>
                                    </Link>
                                )}
                            </motion.div>
                        ) : (
                            <div className="space-y-6">
                                <div className="hidden lg:block bg-slate-900/50 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-sm">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-slate-950/50 border-b border-slate-800">
                                                    <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] italic">Course Architecture</th>
                                                    <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] italic">Metric</th>
                                                    <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] italic text-center">Status</th>
                                                    <th className="px-8 py-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] italic text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-800/30">
                                                {courses.map((course: Course) => (
                                                    <tr key={course._id} className="hover:bg-cyan-500/[0.02] transition-colors group">
                                                        <td className="px-8 py-6">
                                                            <div className="flex items-center space-x-4">
                                                                <div className="w-14 h-14 rounded-2xl flex-shrink-0 overflow-hidden bg-slate-800 border-2 border-slate-800 group-hover:border-cyan-500/30 transition-all shadow-xl">
                                                                    {course.thumbnail ? (
                                                                        <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <div className="w-full h-full bg-slate-900" />
                                                                    )}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors italic line-clamp-1">{course.title}</p>
                                                                    <p className="text-[10px] text-slate-600 font-extrabold uppercase tracking-widest mt-0.5">{course.category}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className="flex flex-col">
                                                                <span className="text-lg font-black text-slate-200 italic">৳{course.price}</span>
                                                                <span className="text-[10px] text-slate-600 font-bold uppercase">{course.totalEnrollments || 0} Students</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6 text-center">
                                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic border ${
                                                                course.isPublished 
                                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                            }`}>
                                                                {course.isPublished ? 'Live' : 'Draft'}
                                                            </span>
                                                        </td>
                                                        <td className="px-8 py-6 text-right">
                                                            <div className="flex items-center justify-end space-x-2">
                                                                <Link href={`/dashboard/courses/${course._id}`}>
                                                                    <button className="p-3 text-slate-500 hover:text-cyan-400 hover:bg-slate-800 rounded-xl transition-all">
                                                                        <Eye className="w-4 h-4" />
                                                                    </button>
                                                                </Link>
                                                                <Link href={`/dashboard/courses/${course._id}/edit`}>
                                                                    <button className="p-3 text-slate-500 hover:text-blue-400 hover:bg-slate-800 rounded-xl transition-all">
                                                                        <Edit className="w-4 h-4" />
                                                                    </button>
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleDelete(course._id, course.title)}
                                                                    className="p-3 text-slate-500 hover:text-red-500 hover:bg-slate-800 rounded-xl transition-all"
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
                                </div>

                                {/* Mobile Grid */}
                                <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {courses.map((course: Course) => (
                                        <div key={course._id} className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 space-y-4 shadow-xl">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-slate-100 italic line-clamp-2 pr-4">{course.title}</h3>
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border shrink-0 ${
                                                    course.isPublished ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                }`}>
                                                    {course.isPublished ? 'Live' : 'Draft'}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between py-3 border-y border-slate-800/50">
                                                <span className="text-xl font-black text-slate-200">৳{course.price}</span>
                                                <span className="text-[10px] text-slate-600 font-bold uppercase">{course.totalEnrollments || 0} Learners</span>
                                            </div>
                                            <div className="flex gap-3 pt-2">
                                                <Link href={`/dashboard/courses/${course._id}`} className="flex-1">
                                                    <Button variant="outline" className="w-full text-[10px] font-bold h-11 border-slate-800">VIEW</Button>
                                                </Link>
                                                <Link href={`/dashboard/courses/${course._id}/edit`} className="flex-1">
                                                    <Button variant="outline" className="w-full text-[10px] font-bold h-11 border-slate-800">EDIT</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {meta && meta.totalPages > 1 && (
                                    <div className="flex items-center justify-between bg-slate-950/50 border border-slate-900 rounded-[2rem] p-6 shadow-2xl">
                                        <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest italic">
                                            Phase <span className="text-cyan-500">{meta.page}</span> / {meta.totalPages}
                                        </p>
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => setPage(p => p - 1)}
                                                disabled={page === 1}
                                                className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-600 disabled:opacity-20 transition-all hover:text-cyan-400"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => setPage(p => p + 1)}
                                                disabled={page === meta.totalPages}
                                                className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-600 disabled:opacity-20 transition-all hover:text-cyan-400"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ProtectedRoute>
    )
}
