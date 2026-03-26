"use client"
import React, { useState, useEffect } from 'react'
import { useAppSelector } from '@/lib/redux/hooks'
import { selectCurrentUser } from '@/lib/redux/features/auth/authSlice'
import { Avatar } from '../ui/Avater'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Card, CardContent } from '../ui/Card'
import { User, Mail, Shield, Camera, Edit2, Check, X, ShieldCheck, Clock, BookOpen, Lock, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUpdateProfileMutation } from '@/lib/redux/features/users/usersApi'
import { useChangePasswordMutation } from '@/lib/redux/features/auth/authApi'
import { Modal } from '../ui/Model'
import toast from 'react-hot-toast'

export const ProfilePage = () => {
    const user = useAppSelector(selectCurrentUser)
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(user?.name || '')
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })

    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
    const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation()

    useEffect(() => {
        if (user?.name) {
            setName(user.name)
        }
    }, [user])

    const handleUpdate = async () => {
        if (!name.trim() || name === user?.name) {
            setIsEditing(false)
            return
        }

        try {
            const formData = new FormData()
            formData.append('name', name)
            
            await updateProfile(formData).unwrap()
            toast.success('Profile updated successfully!')
            setIsEditing(false)
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to update profile')
        }
    }

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (passwords.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        try {
            await changePassword({
                oldPassword: passwords.oldPassword,
                newPassword: passwords.newPassword
            }).unwrap()
            
            toast.success('Password changed successfully!')
            setIsPasswordModalOpen(false)
            setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' })
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to change password')
        }
    }

    if (!user) return <div className="flex items-center justify-center min-h-screen">Loading profile...</div>

    return (
        <div className="min-h-screen bg-slate-950">
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    {/* Header Section */}
                    <div className="relative">
                        <div className="h-48 w-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -ml-20 -mb-20" />
                        </div>
                        <div className="absolute -bottom-12 left-8 flex items-end space-x-6">
                            <div className="relative group">
                                <Avatar
                                    src={user.profilePhoto}
                                    alt={user.name}
                                    size="xl"
                                    className="border-4 border-slate-950 shadow-2xl ring-2 ring-cyan-500/20"
                                />
                                <button className="absolute bottom-0 right-0 p-2 bg-slate-900 rounded-full shadow-lg border border-slate-700 hover:bg-slate-800 transition-colors text-cyan-400">
                                    <Camera className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="pb-4">
                                <div className="flex items-center space-x-3 mb-1">
                                    {isEditing ? (
                                        <div className="flex items-center space-x-2">
                                            <Input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="h-8 py-0 min-w-[200px]"
                                                disabled={isUpdating}
                                            />
                                            <button 
                                                onClick={handleUpdate} 
                                                className="text-emerald-500 hover:text-emerald-600 p-1 disabled:opacity-50"
                                                disabled={isUpdating}
                                            >
                                                {isUpdating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Check className="h-5 w-5" />}
                                            </button>
                                            <button 
                                                onClick={() => setIsEditing(false)} 
                                                className="text-red-500 hover:text-red-600 p-1 disabled:opacity-50"
                                                disabled={isUpdating}
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <h1 className="text-3xl font-bold text-slate-100 italic tracking-tight">{user.name}</h1>
                                            <button onClick={() => setIsEditing(true)} className="text-slate-500 hover:text-cyan-400 transition-colors p-1">
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                        </>
                                    )}
                                </div>
                                <div className="flex items-center space-x-3 text-slate-400">
                                    <span className="flex items-center text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                                        <ShieldCheck className="h-3 w-3 mr-1.5" />
                                        {user.role}
                                    </span>
                                    <span className="text-sm font-medium">Member since {new Date(user.createdAt || '').toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Column: Info Card */}
                        <div className="space-y-6">
                            <Card className="bg-slate-900 border-slate-800 shadow-xl overflow-hidden">
                                <CardContent className="p-6">
                                    <h3 className="font-bold text-slate-100 mb-6 flex items-center italic">
                                        <User className="h-4 w-4 mr-2 text-cyan-500" />
                                        About Me
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center text-sm">
                                            <Mail className="h-4 w-4 text-slate-500 mr-3 shrink-0" />
                                            <span className="text-slate-300 truncate font-medium">{user.email}</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <Shield className="h-4 w-4 text-slate-500 mr-3 shrink-0" />
                                            <span className="text-slate-300 font-medium">Account Role: {user.role}</span>
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <Clock className="h-4 w-4 text-slate-500 mr-3 shrink-0" />
                                            <span className="text-slate-300 truncate font-medium">Last Login: Just now</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-slate-800">
                                        <Button 
                                            variant="outline" 
                                            className="w-full text-sm border-slate-700 hover:bg-slate-800 text-slate-300"
                                            onClick={() => setIsPasswordModalOpen(true)}
                                        >
                                            Change Password
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Stats Banner */}
                            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white overflow-hidden relative shadow-xl">
                                <div className="relative z-10">
                                    <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Total Learning</p>
                                    <h2 className="text-3xl font-extrabold mb-4 italic text-slate-100">২৪ ঘণ্টা</h2>
                                    <div className="flex items-center text-xs font-bold text-cyan-400">
                                        <TrendingUp className="h-3 w-3 mr-1.5" />
                                        <span>+১২% This month</span>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl -mr-16 -mt-16 rounded-full" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-600/5 blur-2xl -ml-12 -mb-12 rounded-full" />
                            </div>
                        </div>

                        {/* Right Column: Activity/Tabs */}
                        <div className="md:col-span-2 space-y-6">
                            <Card className="bg-slate-900 border-slate-800 shadow-xl overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="flex border-b border-slate-800 bg-slate-950/50">
                                        <button className="px-6 py-4 text-sm font-bold text-cyan-400 border-b-2 border-cyan-400 uppercase tracking-wider italic">
                                            My Courses
                                        </button>
                                        <button className="px-6 py-4 text-sm font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-wider">
                                            Achievements
                                        </button>
                                        <button className="px-6 py-4 text-sm font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-wider">
                                            History
                                        </button>
                                    </div>
                                    <div className="p-6 bg-slate-900">
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-4 p-4 rounded-xl border border-slate-800 bg-slate-950/30 hover:bg-slate-800 hover:border-cyan-500/30 transition-all cursor-pointer group">
                                                <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                                                    <BookOpen className="h-6 w-6" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-slate-100 truncate">Advanced React Patters</p>
                                                    <p className="text-xs text-slate-400 font-medium tracking-tight">85% Completed • Next: Render Props</p>
                                                </div>
                                                <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden shadow-inner">
                                                    <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full w-[85%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4 p-4 rounded-xl border border-slate-800 bg-slate-950/30 hover:bg-slate-800 hover:border-blue-500/30 transition-all cursor-pointer group">
                                                <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:scale-110 transition-transform">
                                                    <BookOpen className="h-6 w-6" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-slate-100 truncate">UI/UX Design Systems</p>
                                                    <p className="text-xs text-slate-400 font-medium tracking-tight">20% Completed • Next: Color Theory</p>
                                                </div>
                                                <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden shadow-inner">
                                                    <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-full w-[20%] rounded-full shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="ghost" className="w-full mt-6 text-sm text-slate-500 hover:text-cyan-400 hover:bg-slate-800 rounded-xl transition-all">
                                            View all enrollments
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Change Password Modal */}
            <Modal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                title="Change Password"
                size="md"
            >
                <form onSubmit={handleChangePassword} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider block">Current Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <Input
                                type="password"
                                placeholder="••••••••"
                                className="pl-10"
                                value={passwords.oldPassword}
                                onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider block">New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <Input
                                type="password"
                                placeholder="••••••••"
                                className="pl-10"
                                value={passwords.newPassword}
                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider block">Confirm New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <Input
                                type="password"
                                placeholder="••••••••"
                                className="pl-10"
                                value={passwords.confirmPassword}
                                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="pt-4 flex space-x-3">
                        <Button 
                            type="button" 
                            variant="outline" 
                            className="flex-1 border-slate-800 text-slate-400 hover:bg-slate-800"
                            onClick={() => setIsPasswordModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white"
                            disabled={isChangingPassword}
                        >
                            {isChangingPassword ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Update Password
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

function TrendingUp(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </svg>
    )
}

