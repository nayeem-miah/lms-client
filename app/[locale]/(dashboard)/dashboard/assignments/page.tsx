"use client"
import { motion } from 'framer-motion'
import { FileText, Plus, Clock, CheckCircle2, AlertCircle, BookOpen, User } from 'lucide-react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

const mockAssignments = [
    {
        id: '1',
        title: 'React Hooks Deep Dive Quiz',
        course: 'Advanced React Patterns',
        dueDate: 'Oct 15, 2024',
        submissions: 24,
        totalStudents: 45,
        status: 'Active',
        priority: 'High'
    },
    {
        id: '2',
        title: 'Mid-term Project: E-commerce UI',
        course: 'UI/UX Design Essentials',
        dueDate: 'Oct 20, 2024',
        submissions: 12,
        totalStudents: 38,
        status: 'Active',
        priority: 'Medium'
    },
    {
        id: '3',
        title: 'Backend API Documentation',
        course: 'Node.js Mastery',
        dueDate: 'Oct 05, 2024',
        submissions: 45,
        totalStudents: 45,
        status: 'Completed',
        priority: 'Low'
    },
    {
        id: '4',
        title: 'Python for Data Science Final',
        course: 'Data Science Bootcamp',
        dueDate: 'Nov 01, 2024',
        submissions: 0,
        totalStudents: 60,
        status: 'Draft',
        priority: 'High'
    }
]

export default function AssignmentsPage() {
    return (
        <ProtectedRoute allowedRoles={['INSTRUCTOR']}>
            <div className="space-y-8 pb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-800/20 p-8 rounded-[3rem] border border-white/5 backdrop-blur-sm shadow-xl">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-3xl font-black text-slate-100 mb-1 uppercase tracking-tighter">Assignments</h1>
                        <p className="text-sm font-medium text-slate-500 italic uppercase tracking-wide">Create and manage your course assessments</p>
                    </motion.div>
                    <button className="flex items-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-indigo-500/20 transition-all border border-white/10">
                        <Plus className="w-5 h-5" />
                        <span>Create New Assessment</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {mockAssignments.map((assignment, index) => (
                        <motion.div
                            key={assignment.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-[2.5rem] p-8 hover:border-indigo-500/30 transition-all shadow-xl"
                        >
                            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                                <div className="flex items-center space-x-6">
                                    <div className={`p-5 rounded-[1.5rem] ${
                                        assignment.status === 'Active' ? 'bg-indigo-500/10 text-indigo-400' :
                                        assignment.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' :
                                        'bg-slate-500/10 text-slate-400'
                                    } shadow-xl`}>
                                        <FileText className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-black text-slate-100 group-hover:text-indigo-400 transition-colors leading-tight">{assignment.title}</h3>
                                            <span className={`px-3 py-1 text-[9px] font-black rounded-lg border uppercase tracking-widest ${
                                                assignment.priority === 'High' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                assignment.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                'bg-slate-500/10 text-slate-400 border-slate-700'
                                            }`}>
                                                {assignment.priority} Priority
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-6">
                                            <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                <BookOpen className="w-3.5 h-3.5 mr-2 text-indigo-400" />
                                                {assignment.course}
                                            </span>
                                            <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                <Clock className="w-3.5 h-3.5 mr-2 text-slate-400" />
                                                Due: {assignment.dueDate}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12 w-full lg:w-auto mt-4 lg:mt-0">
                                    <div className="text-right flex-1 lg:flex-none">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Submission Rate</p>
                                        <div className="flex items-center gap-4">
                                            <div className="h-2 w-32 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                                                <div 
                                                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-400 rounded-full"
                                                    style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-black text-slate-200 tabular-nums">
                                                {assignment.submissions}/{assignment.totalStudents}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-3">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                                            assignment.status === 'Active' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                            assignment.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                            'bg-slate-500/10 text-slate-500 border-slate-700'
                                        }`}>
                                            {assignment.status}
                                        </span>
                                        <button className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">
                                            View Submissions →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </ProtectedRoute>
    )
}
