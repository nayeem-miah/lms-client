"use client"
import { useAppSelector } from '@/lib/redux/hooks'
import { selectCurrentUser, selectIsLoading } from '@/lib/redux/features/auth/authSlice'
import { motion } from 'framer-motion'
import {
    GraduationCap,
    Settings,
    Bell,
    Search,
    Menu,
    Shield,
    User,
    BookOpen
} from 'lucide-react'
import AdminDashboard from '@/components/dashboard/AdminDashboard'
import StudentDashboard from '@/components/dashboard/StudentDashboard'
import InstructorDashboard from '@/components/dashboard/InstructorDashboard'
import type { UserRole } from '@/types/user'
import Link from 'next/link'


export default function DashboardPage() {
    const user = useAppSelector(selectCurrentUser)
    const isLoading = useAppSelector(selectIsLoading)

    // Fallback to STUDENT if role is missing, though it should be present for authenticated users
    const currentRole = (user?.role as UserRole) || 'STUDENT'

    const roleConfig = {
        ADMIN: { name: 'Admin', icon: Shield, color: 'from-amber-500 to-orange-600' },
        STUDENT: { name: 'Student', icon: User, color: 'from-cyan-500 to-blue-600' },
        INSTRUCTOR: { name: 'Instructor', icon: BookOpen, color: 'from-purple-500 to-pink-600' }
    }

    if (isLoading) {
        return <div className="flex min-h-screen bg-slate-900 justify-center items-center text-slate-100 italic">Preparing your learning journey...</div>
    }

    if (!user) {
        return <div className="flex min-h-screen bg-slate-900 justify-center items-center text-slate-100">Please log in to continue.</div>
    }

    return (
        <div className="flex min-h-screen bg-slate-900 text-slate-100">
            {/* Sidebar */}
            <Sidebar currentRole={currentRole} />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <Header currentRole={currentRole} roleConfig={roleConfig} />

                {/* Dashboard Content */}
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {currentRole === 'ADMIN' && <AdminDashboard />}
                    {currentRole === 'STUDENT' && <StudentDashboard />}
                    {currentRole === 'INSTRUCTOR' && <InstructorDashboard />}
                </div>
            </main>
        </div>
    )
}

function Sidebar({ currentRole }: { currentRole: UserRole }) {
    const getNavItems = (role: UserRole) => {
        const commonItems = [
            { icon: 'BarChart3', label: 'Dashboard', active: true },
        ]

        if (role === 'ADMIN') {
            return [
                ...commonItems,
                { icon: 'Users', label: 'Users', active: false },
                { icon: 'BookOpen', label: 'Course Management', active: false },
                { icon: 'DollarSign', label: 'Revenue Reports', active: false },
                { icon: 'Settings', label: 'System Settings', active: false },
            ]
        } else if (role === 'INSTRUCTOR') {
            return [
                ...commonItems,
                { icon: 'BookOpen', label: 'My Courses', active: false },
                { icon: 'Users', label: 'Students', active: false },
                { icon: 'FileText', label: 'Assignments', active: false },
                { icon: 'MessageSquare', label: 'Discussions', active: false },
            ]
        } else {
            return [
                ...commonItems,
                { icon: 'BookOpen', label: 'My Courses', active: false },
                { icon: 'Calendar', label: 'Class Schedule', active: false },
                { icon: 'Trophy', label: 'Leaderboard', active: false },
                { icon: 'Award', label: 'Certificates', active: false },
            ]
        }
    }

    const navItems = getNavItems(currentRole)

    return (
        <div className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 h-screen sticky top-0">
            <div className="p-6 border-b border-slate-800">
                <Link href="/">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-slate-100">EduLearn</h1>
                            <p className="text-xs text-slate-500">Learning Platform</p>
                        </div>
                    </div></Link>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item, index) => {
                    const IconComponent = getIconComponent(item.icon)
                    return (
                        <button
                            key={index}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${item.active
                                ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border-l-2 border-cyan-500'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border-l-2 border-transparent'
                                }`}
                        >
                            <IconComponent className={`w-5 h-5 ${item.active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </button>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium text-sm">Settings</span>
                </button>
            </div>
        </div>
    )
}

function Header({ currentRole, roleConfig }: {
    currentRole: UserRole
    roleConfig: any
}) {
    return (
        <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button className="lg:hidden">
                            <Menu className="w-6 h-6 text-slate-400" />
                        </button>
                        <div className="relative">
                            <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-64"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        {/* Current Role Indicator */}
                        <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700 rounded-lg p-1 px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-slate-700 to-slate-800">
                            <Shield className="w-4 h-4 text-cyan-400" />
                            <span>{roleConfig[currentRole].name} Mode</span>
                        </div>

                        <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors">
                            <Bell className="w-5 h-5 text-slate-400" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full"></span>
                        </button>

                        <div className={`w-9 h-9 bg-gradient-to-br ${roleConfig[currentRole].color} rounded-full flex items-center justify-center text-sm font-bold cursor-pointer`}>
                            {currentRole === 'ADMIN' ? 'A' : currentRole === 'INSTRUCTOR' ? 'I' : 'S'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Helper function to get icon components dynamically
function getIconComponent(iconName: string) {
    const icons: Record<string, any> = {
        BarChart3: require('lucide-react').BarChart3,
        Users: require('lucide-react').Users,
        BookOpen: require('lucide-react').BookOpen,
        DollarSign: require('lucide-react').DollarSign,
        Settings: require('lucide-react').Settings,
        Calendar: require('lucide-react').Calendar,
        Trophy: require('lucide-react').Trophy,
        Award: require('lucide-react').Award,
        FileText: require('lucide-react').FileText,
        MessageSquare: require('lucide-react').MessageSquare,
    }
    return icons[iconName] || icons.BarChart3
}