"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Search, Calendar, Landmark, Receipt, ExternalLink } from 'lucide-react'
import { useGetMyPaymentsQuery } from '@/lib/redux/features/payments/paymentsApi'
import { Payment } from '@/types/api'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Star } from 'lucide-react'

export default function PaymentHistoryPage() {
    const { data: payments, isLoading, error } = useGetMyPaymentsQuery({})

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const getStatusStyle = (status: string) => {
        switch (status.toUpperCase()) {
            case 'PAID':
            case 'SUCCESS':
            case 'COMPLETED':
                return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            case 'PENDING':
                return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            default:
                return 'bg-slate-500/10 text-slate-400 border-slate-500/20'
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-2">
                        <Landmark className="h-8 w-8 text-cyan-500" />
                        Payment History
                    </h1>
                    <p className="text-slate-400">Track all your transactions and course purchases</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
                        <div className="h-10 w-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                            <Receipt className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Total Transactions</p>
                            <p className="text-xl font-bold text-slate-100">{payments?.length || 0}</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 bg-slate-800/50 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl text-center text-red-400">
                    Failed to load payment history. Please try again later.
                </div>
            ) : !payments || payments.length === 0 ? (
                <div className="bg-slate-800/50 border border-slate-700 border-dashed rounded-2xl p-20 text-center space-y-4">
                    <div className="h-20 w-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                        <DollarSign className="h-10 w-10 text-slate-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-300">No Transactions Found</h3>
                    <p className="text-slate-500 max-w-sm mx-auto">
                        You haven't made any purchases yet. Start exploring our premium courses to begin your learning journey.
                    </p>
                    <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                        Explore Courses
                    </Button>
                </div>
            ) : (
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-900/50 border-b border-slate-700">
                                <th className="px-6 py-4 text-sm font-semibold text-slate-400">Transaction Details</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-400">Date</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-400">Amount</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-400">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-400 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {payments.map((payment: any) => (
                                <motion.tr
                                    layout
                                    key={payment._id}
                                    className="hover:bg-slate-700/30 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-16 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                                                {payment.courseId?.thumbnail ? (
                                                    <img src={payment.courseId.thumbnail} alt="" className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="h-full w-full bg-slate-600" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-200 line-clamp-1">
                                                    {payment.courseId?.title || 'Unknown Course'}
                                                </p>
                                                <p className="text-xs text-slate-500 font-mono">
                                                    ID: {payment.transactionId || payment._id}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <Calendar className="h-4 w-4 text-slate-500" />
                                            {formatDate(payment.createdAt)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-100 italic">
                                            {payment.currency === 'BDT' ? '৳' : payment.currency === 'USD' ? '$' : payment.currency}
                                            {payment.amount}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(payment.status)}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/courses/${typeof payment.courseId === 'object' ? payment.courseId?._id : payment.courseId}#reviews-section`}>
                                                <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 gap-1 h-8">
                                                    <Star className="h-4 w-4" />
                                                    Review
                                                </Button>
                                            </Link>
                                            <button className="text-slate-500 hover:text-slate-300 transition-colors p-1">
                                                <ExternalLink className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
