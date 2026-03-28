"use client"

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import {
    DollarSign,
    TrendingUp,
    CreditCard,
    Search,
    Download,
    Loader2
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useGetPaymentsQuery } from '@/lib/redux/features/payments/paymentsApi'
import { Payment } from '@/types/api'

export default function RevenuePage() {
    const { data: paymentData, isLoading } = useGetPaymentsQuery({ limit: 100 })

    const payments = paymentData?.payments || []
    const paidPayments = payments.filter((p: Payment) => p.status === 'PAID')

    const totalRevenue = paidPayments.reduce((sum: number, p: Payment) => sum + p.amount, 0)
    const avgTransaction = paidPayments.length ? (totalRevenue / paidPayments.length) : 0

    const chartData = useMemo(() => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const revenueByDay = new Array(7).fill(0).map((_, i) => ({
            name: days[i],
            revenue: 0
        }))

        paidPayments.forEach((p: Payment) => {
            const date = new Date(p.createdAt)
            const dayIndex = date.getDay()
            revenueByDay[dayIndex].revenue += p.amount
        })

        const today = new Date().getDay()
        const sortedData = []
        for (let i = 0; i < 7; i++) {
            const index = (today - 6 + i + 7) % 7
            sortedData.push(revenueByDay[index])
        }
        return sortedData
    }, [paidPayments])

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount)
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-black text-slate-100 mb-2 italic uppercase tracking-tight">Revenue Analytics</h1>
                    <p className="text-slate-400 font-medium tracking-tight">Track and analyze platform revenue from successful transactions.</p>
                </motion.div>
                <button className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-2xl border border-slate-700 transition-all shadow-xl active:scale-95 font-bold italic text-sm uppercase">
                    <Download className="w-4 h-4" />
                    <span>Export Report</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    { label: 'Paid Transactions', value: paidPayments.length, icon: CreditCard, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                    { label: 'Avg. Transaction', value: formatCurrency(avgTransaction), icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-900/50 border border-slate-800/60 p-8 rounded-[2rem] shadow-2xl flex items-center space-x-6 backdrop-blur-sm relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                        <div className={`p-5 rounded-2xl ${stat.bg} shadow-lg relative z-10`}>
                            <stat.icon className={`w-10 h-10 ${stat.color}`} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1 italic">{stat.label}</p>
                            <p className="text-3xl font-black text-slate-100 italic tracking-tighter">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] -mr-48 -mt-48" />

                <div className="flex items-center justify-between mb-10 relative z-10">
                    <div>
                        <h3 className="text-2xl font-black text-slate-100 italic uppercase tracking-tight">Revenue Performance</h3>
                        <p className="text-slate-500 text-sm font-medium">Daily revenue trends from successful payments.</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-slate-950/50 p-2 rounded-2xl border border-slate-800">
                        <button className="px-6 py-2 text-xs font-black bg-slate-800 text-emerald-400 rounded-xl shadow-lg italic transition-all">Weekly</button>
                        <button className="px-6 py-2 text-xs font-black text-slate-500 hover:text-slate-300 italic transition-all">Monthly</button>
                    </div>
                </div>

                <div className="h-[400px] w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} strokeOpacity={0.2} />
                            <XAxis
                                dataKey="name"
                                stroke="#64748b"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }}
                                dy={15}
                            />
                            <YAxis
                                stroke="#64748b"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '4 4' }}
                                contentStyle={{
                                    backgroundColor: '#0f172a',
                                    borderColor: '#1e293b',
                                    borderRadius: '20px',
                                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)',
                                    padding: '12px 20px',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}
                                itemStyle={{ color: '#10b981', fontWeight: '900', fontSize: '14px', textTransform: 'uppercase' }}
                                labelStyle={{ color: '#94a3b8', marginBottom: '4px', fontWeight: 'bold' }}
                                formatter={(value: any) => [formatCurrency(Number(value)), 'Revenue']}
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#10b981"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorRev)"
                                animationDuration={2000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-sm">
                <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-950/30">
                    <h3 className="text-xl font-black text-slate-100 italic uppercase">Recent Paid Transactions</h3>
                    <div className="relative group">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-emerald-400" />
                        <input
                            type="text"
                            placeholder="Transaction ID..."
                            className="bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500/50 transition-all font-medium min-w-[280px]"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="p-32 text-center">
                        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto mb-4" />
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs italic">Crunching Data...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-950/50">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Transaction ID</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Customer</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] italic text-center">Amount</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] italic text-center">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] italic text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {paidPayments.map((payment: Payment) => (
                                    <tr key={payment._id} className="hover:bg-emerald-500/5 transition-all duration-300 group">
                                        <td className="px-8 py-6 text-sm font-mono font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                                            {payment.transactionId?.slice(-16)}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-black text-white italic">
                                                    {(typeof payment.userId === 'object' ? payment.userId.name : 'U').charAt(0)}
                                                </div>
                                                <p className="text-sm font-bold text-slate-300 group-hover:text-slate-100 transition-colors italic">
                                                    {typeof payment.userId === 'object' ? payment.userId.name : 'Unknown User'}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <p className="text-base font-black text-emerald-400 italic">
                                                {formatCurrency(payment.amount)}
                                            </p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <span className="px-4 py-1.5 rounded-xl text-[10px] font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-[0.1em] italic">
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right text-xs font-bold text-slate-500 italic">
                                            {new Date(payment.createdAt).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
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
