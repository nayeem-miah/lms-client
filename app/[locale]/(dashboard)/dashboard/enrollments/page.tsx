"use client"
import { motion } from 'framer-motion'
import { Users, Search, BookOpen, Calendar, ExternalLink, Shield, CreditCard, DollarSign } from 'lucide-react'
import { useGetPaymentsQuery } from '@/lib/redux/features/payments/paymentsApi'
import { User, Course } from '@/types/api'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Link } from '@/i18n/routing'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

interface Payment {
    _id: string;
    userId: User;
    courseId: Course;
    amount: number;
    currency: string;
    status: string;
    createdAt: string;
    transactionId: string;
}

export default function AdminPaymentHistoryPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)
    
    const { data: paymentData, isLoading, error } = useGetPaymentsQuery({
        page,
        limit: 10,
        search: searchQuery || undefined
    })

    const payments = paymentData?.payments || []
    const meta = paymentData?.meta

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'USD',
        }).format(amount);
    }

    return (
        <ProtectedRoute allowedRoles={['ADMIN']}>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-3xl font-bold text-slate-100 mb-2 flex items-center gap-2 italic">
                            <CreditCard className="h-8 w-8 text-cyan-500" />
                            Global Payment History
                        </h1>
                        <p className="text-slate-400 font-medium tracking-tight">View and monitor all platform transactions and course purchases.</p>
                    </motion.div>

                    <div className="relative w-full sm:w-64 group">
                        <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search student or course..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-all font-medium"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-20 bg-slate-900/50 border border-slate-800 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="bg-red-500/10 border border-red-500/20 p-12 rounded-[2rem] text-center text-red-400">
                        <p className="font-bold uppercase tracking-widest text-sm mb-2 italic">Error Loading Data</p>
                        <p className="font-medium">Failed to load payments. Please check your admin permissions.</p>
                    </div>
                ) : payments.length === 0 ? (
                    <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden text-center p-20 shadow-2xl">
                        <div className="h-20 w-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <DollarSign className="w-10 h-10 text-slate-600" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-200 mb-2 italic uppercase">No Transactions Found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto font-medium">
                            {searchQuery ? "No results match your search query." : "There are currently no transactions recorded in the system."}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-950/50 border-b border-slate-800">
                                            <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-[0.2em] italic">Student</th>
                                            <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-[0.2em] italic">Course & Amount</th>
                                            <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-[0.2em] italic">Transaction Info</th>
                                            <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-[0.2em] italic">Status</th>
                                            <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-[0.2em] italic text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/50">
                                        {payments.map((payment: Payment) => {
                                            const student = payment.userId
                                            const course = payment.courseId
                                            return (
                                                <tr key={payment._id} className="hover:bg-cyan-500/5 transition-all duration-300 group">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center text-sm font-black text-white uppercase overflow-hidden border-2 border-slate-800 shadow-xl group-hover:border-cyan-500/30 transition-all">
                                                                {student?.profilePhoto ? (
                                                                    <img src={student.profilePhoto} alt="" className="w-full h-full object-cover" />
                                                                ) : (
                                                                    (student?.name || 'U').charAt(0)
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-100 group-hover:text-cyan-400 transition-colors italic">{student?.name || 'Unknown User'}</p>
                                                                <p className="text-xs text-slate-500 font-medium tracking-tight">{student?.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="space-y-1.5">
                                                            <div className="flex items-center gap-2 group/title">
                                                                <BookOpen className="h-4 w-4 text-slate-500 group-hover/title:text-cyan-400 transition-colors" />
                                                                <p className="text-sm font-bold text-slate-300 line-clamp-1">{course?.title || 'Unknown Course'}</p>
                                                            </div>
                                                            <p className="text-lg font-black text-emerald-400 italic">
                                                                {formatCurrency(payment.amount, payment.currency)}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="space-y-1.5 font-medium">
                                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                                <Calendar className="h-3.5 w-3.5 text-slate-500" />
                                                                {formatDate(payment.createdAt)}
                                                            </div>
                                                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold font-mono truncate max-w-[150px]">
                                                                ID: {payment.transactionId?.slice(-12)}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] italic border ${
                                                            payment.status === 'PAID'
                                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                        }`}>
                                                            {payment.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <Link href={`/dashboard/courses/${course?._id}`}>
                                                            <button className="p-3 bg-slate-800 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 rounded-xl transition-all shadow-lg active:scale-90" title="View Course">
                                                                <ExternalLink className="h-4 w-4" />
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        {meta && meta.totalPages > 1 && (
                            <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest italic">
                                    Page <span className="text-cyan-400">{meta.page}</span> of {meta.totalPages}
                                </p>
                                <div className="flex items-center gap-3">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        disabled={page === 1}
                                        onClick={() => setPage(page - 1)}
                                        className="border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800 px-6 h-10 font-bold italic"
                                    >
                                        Previous
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        disabled={page === meta.totalPages}
                                        onClick={() => setPage(page + 1)}
                                        className="border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800 px-6 h-10 font-bold italic"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ProtectedRoute>
    )
}
