"use client"

import { motion } from 'framer-motion'
import {
    Users as UsersIcon,
    UserPlus,
    Search,
    Filter,
    Trash2,
    Shield,
    UserCircle,
    Mail,
    Calendar,
    MoreVertical,
    Loader2
} from 'lucide-react'
import { useGetAllUsersQuery, useDeleteUserMutation, useUpdateUserRoleMutation } from '@/lib/redux/features/users/usersApi'
import { User } from '@/types/api'
import { useState, useMemo } from 'react'
import { toast } from 'react-hot-toast'

export default function UsersManagementPage() {
    const { data: users, isLoading, error } = useGetAllUsersQuery({})
    const [deleteUser] = useDeleteUserMutation()
    const [updateUserRole] = useUpdateUserRoleMutation()
    const [searchQuery, setSearchQuery] = useState('')

    const filteredUsers = useMemo(() => {
        if (!users) return []
        return users.filter((user: User) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [users, searchQuery])

    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete user "${name}"?`)) {
            try {
                await deleteUser(id).unwrap()
                toast.success('User deleted successfully')
            } catch (err) {
                toast.error('Failed to delete user')
            }
        }
    }

    const handleRoleChange = async (id: string, newRole: string) => {
        try {
            await updateUserRole({ id, role: newRole }).unwrap()
            toast.success(`Role updated to ${newRole}`)
        } catch (err) {
            toast.error('Failed to update role')
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold text-slate-100 mb-2">Users Management</h1>
                    <p className="text-slate-400">Manage all registered users and their permissions.</p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-lg"
                >
                    <div className="flex items-center space-x-3 mb-4 text-cyan-400">
                        <UsersIcon className="w-6 h-6" />
                        <h3 className="font-semibold text-slate-100">Total Platform Users</h3>
                    </div>
                    <p className="text-4xl font-extrabold text-slate-100">{users?.length || 0}</p>
                    <p className="text-slate-500 text-sm mt-2">Active accounts across roles</p>
                </motion.div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-5 border-b border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/50">
                    <div className="relative flex-1">
                        <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-cyan-500 transition-all"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="p-20 text-center flex flex-col items-center">
                        <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" />
                        <p className="text-slate-400 italic">Fetching platform users...</p>
                    </div>
                ) : error ? (
                    <div className="p-20 text-center text-red-400">
                        <UserCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>Error loading users. Please check your permissions.</p>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="p-20 text-center text-slate-500 text-lg">
                        No users found matching your criteria.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900/80 border-b border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">User Identity</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">Contact</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">Role</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-300">Joined</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {filteredUsers.map((user: User) => (
                                    <tr key={user._id} className="hover:bg-slate-700/20 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center border border-slate-600 shadow-inner group-hover:border-cyan-500/50 transition-colors text-slate-300 font-bold uppercase">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">{user.name}</span>
                                                    <span className="text-xs text-slate-500 italic">ID: {user._id.slice(-6)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2 text-sm text-slate-300">
                                                <Mail className="w-3.5 h-3.5 text-slate-500" />
                                                <span>{user.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                className={`text-xs font-bold px-3 py-1.5 rounded-full border bg-transparent transition-all cursor-pointer outline-none ${user.role === 'ADMIN'
                                                        ? 'text-amber-400 border-amber-500/30'
                                                        : user.role === 'INSTRUCTOR'
                                                            ? 'text-purple-400 border-purple-500/30'
                                                            : 'text-cyan-400 border-cyan-500/30'
                                                    }`}
                                            >
                                                <option value="STUDENT" className="bg-slate-900">STUDENT</option>
                                                <option value="INSTRUCTOR" className="bg-slate-900">INSTRUCTOR</option>
                                                <option value="ADMIN" className="bg-slate-900">ADMIN</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-400">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{new Date(user.createdAt || '').toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-3">
                                                <button
                                                    onClick={() => handleDelete(user._id, user.name)}
                                                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                                    title="Remove User"
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
                )}
            </div>
        </div>
    )
}
