"use client"
import React, { useState } from 'react'
import { useAppSelector } from '@/lib/redux/hooks'
import { selectCurrentUser } from '@/lib/redux/features/auth/authSlice'
import { Avatar } from '../ui/Avater'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Card, CardContent } from '../ui/Card'
import { User, Mail, Shield, Camera, Edit2, Check, X, ShieldCheck, Clock, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const ProfilePage = () => {
    const user = useAppSelector(selectCurrentUser)
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(user?.name || '')

    const handleUpdate = () => {
        // API call would go here
        setIsEditing(false)
    }

    if (!user) return <div className="flex items-center justify-center min-h-screen">Loading profile...</div>

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                {/* Header Section */}
                <div className="relative">
                    <div className="h-48 w-full rounded-2xl bg-gradient-to-r from-primary-600 to-indigo-600 shadow-lg" />
                    <div className="absolute -bottom-12 left-8 flex items-end space-x-6">
                        <div className="relative group">
                            <Avatar
                                src={user.profilePhoto}
                                alt={user.name}
                                size="xl"
                                className="border-4 border-white shadow-xl ring-2 ring-primary-500/20"
                            />
                            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                                <Camera className="h-4 w-4 text-slate-600" />
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
                                        />
                                        <button onClick={handleUpdate} className="text-emerald-500 hover:text-emerald-600 p-1">
                                            <Check className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => setIsEditing(false)} className="text-red-500 hover:text-red-600 p-1">
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
                                        <button onClick={() => setIsEditing(true)} className="text-slate-400 hover:text-primary-600 transition-colors">
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                    </>
                                )}
                            </div>
                            <div className="flex items-center space-x-3 text-slate-500">
                                <span className="flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
                                    <ShieldCheck className="h-3 w-3 mr-1" />
                                    {user.role}
                                </span>
                                <span className="text-sm">Member since {new Date(user.createdAt || '').toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Info Card */}
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
                                    <User className="h-4 w-4 mr-2" />
                                    About Me
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center text-sm">
                                        <Mail className="h-4 w-4 text-slate-400 mr-3 shrink-0" />
                                        <span className="text-slate-600 truncate">{user.email}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Shield className="h-4 w-4 text-slate-400 mr-3 shrink-0" />
                                        <span className="text-slate-600">Account Role: {user.role}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Clock className="h-4 w-4 text-slate-400 mr-3 shrink-0" />
                                        <span className="text-slate-600 truncate">Last Login: Just now</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <Button variant="outline" className="w-full text-sm">
                                        Change Password
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Stats Banner */}
                        <div className="bg-slate-900 rounded-xl p-6 text-white overflow-hidden relative">
                            <div className="relative z-10">
                                <p className="text-slate-400 text-sm mb-1">Total Learning</p>
                                <h2 className="text-3xl font-bold mb-4">২৪ ঘণ্টা</h2>
                                <div className="flex items-center text-xs text-primary-400">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    <span>+১২% This month</span>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-3xl -mr-16 -mt-16 rounded-full" />
                        </div>
                    </div>

                    {/* Right Column: Activity/Tabs */}
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardContent className="p-0">
                                <div className="flex border-b border-slate-100">
                                    <button className="px-6 py-4 text-sm font-medium text-primary-600 border-b-2 border-primary-600">
                                        My Courses
                                    </button>
                                    <button className="px-6 py-4 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
                                        Achievements
                                    </button>
                                    <button className="px-6 py-4 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
                                        History
                                    </button>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4 p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
                                            <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                                                <BookOpen className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-slate-900 truncate">Advanced React Patters</p>
                                                <p className="text-xs text-slate-500">85% Completed • Next lesson: Render Props</p>
                                            </div>
                                            <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                                <div className="bg-emerald-500 h-full w-[85%]" />
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4 p-4 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
                                            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                                <BookOpen className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-slate-900 truncate">UI/UX Design Systems</p>
                                                <p className="text-xs text-slate-500">20% Completed • Next lesson: Color Theory</p>
                                            </div>
                                            <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                                <div className="bg-blue-500 h-full w-[20%]" />
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="w-full mt-6 text-sm text-slate-500">
                                        View all enrollments
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </motion.div>
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
