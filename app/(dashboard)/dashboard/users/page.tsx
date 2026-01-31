"use client"
import { motion } from 'framer-motion'
import { Users, UserPlus, Search, Filter } from 'lucide-react'

export default function UsersManagementPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">Users Management</h1>
                    <p className="text-slate-400">Manage all registered users on the platform.</p>
                </motion.div>
                <button className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg transition-colors">
                    <UserPlus className="w-5 h-5" />
                    <span>Add New User</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4 text-cyan-400">
                        <Users className="w-6 h-6" />
                        <h3 className="font-semibold text-slate-100">Total Users</h3>
                    </div>
                    <p className="text-3xl font-bold text-slate-100">1,250</p>
                </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1">
                        <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-500"
                        />
                    </div>
                    <button className="flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg transition-colors">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                </div>
                <div className="p-8 text-center text-slate-500">
                    User list will appear here after API integration.
                </div>
            </div>
        </div>
    )
}
