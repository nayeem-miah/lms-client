"use client"
import { motion } from 'framer-motion'
import { Users, Mail, MessageSquare, Search, BookOpen, Calendar, ExternalLink, Filter } from 'lucide-react'
import { useGetMyCoursesQuery } from '@/lib/redux/features/courses/coursesApi'
import { useState, useMemo } from 'react'
import { Link } from '@/i18n/routing'

// Mock names for variety
const MOCK_NAMES = [
    "Arifur Rahman", "Sultana Ahmed", "Tanvir Hossain", "Nusrat Jahan", "Fahim Faisal",
    "Sadia Islam", "Mehedi Hasan", "Riya Khatun", "Kamrul Islam", "Anika Tabassum",
    "Zubayer Ahmed", "Tasnim Akter", "Imtiaz Mahmud", "Jannatul Firdaus", "Rifat Bin Sayeed"
]

export default function StudentsManagementPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const { data: courses, isLoading: coursesLoading } = useGetMyCoursesQuery(undefined)
    
    // Generate high-quality mock enrollments based on actual courses
    const enrollments = useMemo(() => {
        if (!courses || courses.length === 0) return []
        
        return Array.from({ length: 15 }).map((_, i) => {
            const course = courses[i % courses.length]
            const name = MOCK_NAMES[i % MOCK_NAMES.length]
            const date = new Date()
            date.setDate(date.getDate() - (i * 3 + 2))
            
            return {
                _id: `mock_enr_${i}`,
                user: {
                    _id: `mock_user_${i}`,
                    name: name,
                    email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
                    profilePhoto: null
                },
                course: {
                    _id: course._id,
                    title: course.title
                },
                enrolledAt: date.toISOString(),
                isActive: i !== 5 && i !== 12 // make a few inactive for variety
            }
        })
    }, [courses])

    // Filter enrollments based on search
    const filteredEnrollments = useMemo(() => {
        return enrollments.filter(enr => 
            enr.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            enr.course.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [enrollments, searchQuery])

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-800/20 p-8 rounded-[3rem] border border-white/5 backdrop-blur-sm shadow-xl">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-3xl font-black text-slate-100 mb-1 uppercase tracking-tighter">Student Management</h1>
                    <p className="text-sm font-medium text-slate-500 italic uppercase tracking-wide">Track and manage students enrolled in your courses</p>
                </motion.div>
                <div className="relative w-full md:w-80 group">
                    <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search student or course..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl pl-12 pr-4 py-4 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-all shadow-inner placeholder:italic"
                    />
                </div>
            </div>

            {coursesLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-24 bg-slate-800/40 rounded-[2rem] border border-white/5 animate-pulse" />
                    ))}
                </div>
            ) : filteredEnrollments.length === 0 ? (
                <div className="bg-slate-800/20 border border-slate-700/50 rounded-[3rem] p-20 text-center shadow-xl">
                    <div className="p-6 bg-slate-800/50 rounded-3xl w-fit mx-auto mb-6">
                        <Users className="w-12 h-12 text-slate-600" />
                    </div>
                    <h3 className="text-xl font-black text-slate-300 mb-2 uppercase tracking-tight">No Students Found</h3>
                    <p className="text-slate-500 font-bold italic uppercase tracking-widest text-[10px]">
                        {searchQuery ? "No results match your search query" : "Waiting for your first enrollment..."}
                    </p>
                </div>
            ) : (
                <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] overflow-hidden shadow-2xl overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900/40 border-b border-white/5">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Student Details</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Course Name</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Enrolled On</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">Activity</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredEnrollments.map((enrollment, index) => (
                                <motion.tr 
                                    key={enrollment._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-slate-700/20 transition-all group"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-sm font-black text-white shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                                                {enrollment.user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-200 group-hover:text-cyan-400 transition-colors">{enrollment.user.name}</p>
                                                <p className="text-[10px] font-bold text-slate-500 lowercase opacity-70">{enrollment.user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-800 rounded-lg">
                                                <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
                                            </div>
                                            <p className="text-sm font-bold text-slate-300 line-clamp-1">{enrollment.course.title}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-[11px] font-black text-slate-500 tracking-tight">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {formatDate(enrollment.enrolledAt)}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-xl ${
                                            enrollment.isActive 
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                            : 'bg-slate-500/10 text-slate-400 border-slate-700'
                                        }`}>
                                            {enrollment.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-3 bg-slate-800 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl transition-all border border-white/5" title="Message">
                                                <MessageSquare className="h-4 w-4" />
                                            </button>
                                            <Link href={`/dashboard/courses/${enrollment.course._id}`}>
                                                <button className="p-3 bg-slate-800 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all border border-white/5" title="Course Info">
                                                    <ExternalLink className="h-4 w-4" />
                                                </button>
                                            </Link>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {/* Pagination Mockup */}
            <div className="flex justify-center gap-2 mt-8">
                {[1, 2, 3].map(p => (
                    <button key={p} className={`w-10 h-10 rounded-xl font-black text-xs transition-all border ${
                        p === 1 ? 'bg-cyan-500 text-slate-900 border-cyan-500' : 'bg-slate-800 text-slate-500 border-white/5 hover:border-slate-600'
                    }`}>
                        {p}
                    </button>
                ))}
            </div>
        </div>
    )
}
