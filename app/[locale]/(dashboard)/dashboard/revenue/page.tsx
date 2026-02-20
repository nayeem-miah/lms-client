"use client"

import { motion } from 'framer-motion'
import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    CreditCard,
    ArrowUpRight,
    Search,
    Download,
    Calendar,
    Loader2
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useGetPaymentsQuery } from '@/lib/redux/features/payments/paymentsApi'
import { Payment } from '@/types/api'

const dummyChartData = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 5000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 2390 },
    { name: 'Sun', revenue: 3490 },
]

export default function RevenuePage() {
    const { data: payments, isLoading } = useGetPaymentsQuery({})

    const totalRevenue = payments?.reduce((sum: number, p: Payment) => sum + p.amount, 0) || 0

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">Revenue Analytics</h1>
                    <p className="text-slate-400">Track and analyze platform revenue and transactions.</p>
                </motion.div>
                <button className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl border border-slate-700 transition-all shadow-lg">
                    <Download className="w-4 h-4" />
                    <span>Export Report</span>
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Revenue', value: `৳${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    { label: 'Total Transactions', value: payments?.length || 0, icon: CreditCard, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                    { label: 'Avg. Transaction', value: `৳${payments?.length ? (totalRevenue / payments.length).toFixed(2) : 0}`, icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl flex items-center space-x-4"
                    >
                        <div className={`p-4 rounded-xl ${stat.bg}`}>
                            <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                            <p className="text-3xl font-bold text-slate-100">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Revenue Chart */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-slate-100">Revenue Performance</h3>
                        <p className="text-slate-500 text-sm">Weekly revenue trends and growth.</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-slate-900/50 p-1.5 rounded-xl border border-slate-700">
                        <button className="px-4 py-1.5 text-xs font-bold bg-slate-700 text-slate-100 rounded-lg">Weekly</button>
                        <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-300">Monthly</button>
                    </div>
                </div>

                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dummyChartData}>
                            <defs>
                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                            <YAxis stroke="#64748b" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', borderShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Transactions Table */}
            <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-100">Recent Transactions</h3>
                    <div className="relative">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Transaction ID..."
                            className="bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="p-20 text-center">
                        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin mx-auto mb-2" />
                        <p className="text-slate-400">Loading transactions...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900/50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Transaction ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">User</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {payments?.map((payment: Payment) => (
                                    <tr key={payment._id} className="hover:bg-slate-700/20 transition-colors">
                                        <td className="px-6 py-4 text-sm font-mono text-cyan-400">{payment.transactionId}</td>
                                        <td className="px-6 py-4 text-sm text-slate-300">
                                            {typeof payment.userId === 'object' ? payment.userId.name : 'User ' + payment.userId}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-100">৳{payment.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${payment.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                }`}>
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(payment.createdAt).toLocaleDateString()}
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
