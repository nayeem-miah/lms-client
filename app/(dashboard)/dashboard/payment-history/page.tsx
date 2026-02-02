"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Search, Calendar, Landmark, Receipt, ExternalLink, Eye, FileText, Printer, CheckCircle2 } from 'lucide-react'
import { useGetMyPaymentsQuery } from '@/lib/redux/features/payments/paymentsApi'
import { Payment } from '@/types/api'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Modal } from '@/components/ui/Model'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function PaymentHistoryPage() {
    const { data: payments, isLoading, error } = useGetMyPaymentsQuery({})
    const [selectedPayment, setSelectedPayment] = useState<any>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleViewReceipt = (payment: any) => {
        setSelectedPayment(payment)
        setIsModalOpen(true)
    }

    const handlePrint = () => {
        window.print()
    }

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
                                        <div className="flex items-center justify-end gap-2 text-slate-400">
                                            <Link 
                                                href={`/courses/${typeof payment.courseId === 'object' ? payment.courseId?._id : payment.courseId}`}
                                                title="View Course"
                                            >
                                                <button className="p-2 hover:text-cyan-400 hover:bg-slate-700 rounded-lg transition-all">
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                            </Link>
                                            <button 
                                                onClick={() => handleViewReceipt(payment)}
                                                className="p-2 hover:text-emerald-400 hover:bg-slate-700 rounded-lg transition-all"
                                                title="View Receipt"
                                            >
                                                <FileText className="h-4 w-4" />
                                            </button>
                                            <Link href={`/courses/${typeof payment.courseId === 'object' ? payment.courseId?._id : payment.courseId}#reviews-section`}>
                                                <button className="p-2 hover:text-amber-400 hover:bg-slate-700 rounded-lg transition-all" title="Write Review">
                                                    <Star className="h-4 w-4" />
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
            {/* Receipt Modal */}
            {selectedPayment && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Transaction Receipt"
                    size="md"
                    footer={
                        <div className="flex justify-between items-center w-full">
                            <p className="text-xs text-slate-500 italic">Thank you for your purchase!</p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                                    Close
                                </Button>
                                <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white gap-2" onClick={handlePrint}>
                                    <Printer className="h-4 w-4" />
                                    Print Receipt
                                </Button>
                            </div>
                        </div>
                    }
                >
                    <div className="space-y-6 printable-area">
                        <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                            <div>
                                <h4 className="font-bold text-slate-900 text-xl">LMS Academy</h4>
                                <p className="text-sm text-slate-500">Invoice #{selectedPayment.transactionId?.slice(-8).toUpperCase() || selectedPayment._id.slice(-8).toUpperCase()}</p>
                            </div>
                            <div className="text-right">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                    <CheckCircle2 className="mr-1 h-3 w-3" />
                                    {selectedPayment.status}
                                </span>
                                <p className="text-sm text-slate-500 mt-1">{formatDate(selectedPayment.createdAt)}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Billed To</p>
                                <p className="font-semibold text-slate-900 mt-1">{typeof selectedPayment.userId === 'object' ? selectedPayment.userId?.name : 'Student'}</p>
                                <p className="text-slate-600">{typeof selectedPayment.userId === 'object' ? selectedPayment.userId?.email : ''}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-slate-500 uppercase tracking-wider text-[10px] font-bold">Payment Method</p>
                                <p className="font-semibold text-slate-900 mt-1">Stripe / Online Payment</p>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-slate-500 border-b border-slate-200">
                                        <th className="text-left py-2 font-semibold">Course Description</th>
                                        <th className="text-right py-2 font-semibold">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700">
                                    <tr>
                                        <td className="py-4">
                                            <p className="font-bold text-slate-900">{selectedPayment.courseId?.title || 'Course Purchase'}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">Full access to all course materials</p>
                                        </td>
                                        <td className="text-right font-bold text-slate-900">
                                            {selectedPayment.currency === 'BDT' ? '৳' : '$'}{selectedPayment.amount}
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot className="border-t border-slate-200">
                                    <tr>
                                        <td className="py-3 font-bold text-slate-900">Total Paid</td>
                                        <td className="text-right py-3 font-extrabold text-cyan-600 text-lg">
                                            {selectedPayment.currency === 'BDT' ? '৳' : '$'}{selectedPayment.amount}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold pt-4">
                            This is a computer generated receipt
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}
