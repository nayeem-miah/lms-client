"use client"
import { useAppSelector } from '@/lib/redux/hooks'
import { selectCurrentUser, selectIsLoading } from '@/lib/redux/features/auth/authSlice'
import {
    GraduationCap,
    Settings,
    Bell,
    Search,
    Menu,
    Shield,
    User,
    Users,
    BookOpen,
    BarChart3,
    DollarSign,
    Calendar,
    Trophy,
    Award,
    FileText,
    MessageSquare,
    PlusCircle,
    X
} from 'lucide-react'
import type { UserRole } from '@/types/user'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = useAppSelector(selectCurrentUser)
    const isLoading = useAppSelector(selectIsLoading)
    const currentRole = (user?.role as UserRole) || 'STUDENT'
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

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
            {/* Desktop Sidebar */}
            <Sidebar currentRole={currentRole} />

            {/* Mobile Sidebar Overlay */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <MobileSidebar
                    currentRole={currentRole}
                    onClose={() => setIsMobileSidebarOpen(false)}
                />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <Header
                    currentRole={currentRole}
                    roleConfig={roleConfig}
                    onMenuClick={() => setIsMobileSidebarOpen(true)}
                />

                {/* Dashboard Content */}
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {children}
                </div>
            </main>
        </div>
    )
}

function Sidebar({ currentRole }: { currentRole: UserRole }) {
    const pathname = usePathname()
    const getNavItems = (role: UserRole) => {
        const commonItems = [
            { icon: 'BarChart3', label: 'Dashboard', href: '/dashboard' },
        ]

        if (role === 'ADMIN') {
            return [
                ...commonItems,
                { icon: 'Users', label: 'Users', href: '/dashboard/users' },
                { icon: 'BookOpen', label: 'Courses', href: '/dashboard/courses-management' },
                { icon: 'DollarSign', label: 'Revenue', href: '/dashboard/revenue' },
                { icon: 'Settings', label: 'Settings', href: '/dashboard/settings' },
            ]
        } else if (role === 'INSTRUCTOR') {
            return [
                ...commonItems,
                { icon: 'PlusCircle', label: 'Create Course', href: '/dashboard/create-course' },
                { icon: 'BookOpen', label: 'My Courses', href: '/dashboard/my-courses' },
                { icon: 'Users', label: 'Students', href: '/dashboard/students-management' },
                { icon: 'FileText', label: 'Assignments', href: '/dashboard/assignments' },
                { icon: 'MessageSquare', label: 'Discussions', href: '/dashboard/discussions' },
            ]
        } else {
            return [
                ...commonItems,
                { icon: 'BookOpen', label: 'My Courses', href: '/dashboard/my-courses' },
                { icon: 'Calendar', label: 'Schedule', href: '/dashboard/schedule' },
                { icon: 'Trophy', label: 'Leaderboard', href: '/dashboard/leaderboard' },
                { icon: 'Award', label: 'Certificates', href: '/dashboard/certificates' },
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
                    </div>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item, index) => {
                    const IconComponent = getIconComponent(item.icon)
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border-l-2 border-cyan-500'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border-l-2 border-transparent'
                                }`}
                        >
                            <IconComponent className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-50 group-hover:text-slate-300'}`} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <Link href="/dashboard/settings" className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium text-sm">Settings</span>
                </Link>
            </div>
        </div>
    )
}

function MobileSidebar({ currentRole, onClose }: { currentRole: UserRole, onClose: () => void }) {
    const pathname = usePathname()
    const getNavItems = (role: UserRole) => {
        const commonItems = [
            { icon: 'BarChart3', label: 'Dashboard', href: '/dashboard' },
        ]

        if (role === 'ADMIN') {
            return [
                ...commonItems,
                { icon: 'Users', label: 'Users', href: '/dashboard/users' },
                { icon: 'BookOpen', label: 'Courses', href: '/dashboard/courses-management' },
                { icon: 'DollarSign', label: 'Revenue', href: '/dashboard/revenue' },
                { icon: 'Settings', label: 'Settings', href: '/dashboard/settings' },
            ]
        } else if (role === 'INSTRUCTOR') {
            return [
                ...commonItems,
                { icon: 'PlusCircle', label: 'Create Course', href: '/dashboard/create-course' },
                { icon: 'BookOpen', label: 'My Courses', href: '/dashboard/my-courses' },
                { icon: 'Users', label: 'Students', href: '/dashboard/students-management' },
                { icon: 'FileText', label: 'Assignments', href: '/dashboard/assignments' },
                { icon: 'MessageSquare', label: 'Discussions', href: '/dashboard/discussions' },
            ]
        } else {
            return [
                ...commonItems,
                { icon: 'BookOpen', label: 'My Courses', href: '/dashboard/my-courses' },
                { icon: 'Calendar', label: 'Schedule', href: '/dashboard/schedule' },
                { icon: 'Trophy', label: 'Leaderboard', href: '/dashboard/leaderboard' },
                { icon: 'Award', label: 'Certificates', href: '/dashboard/certificates' },
            ]
        }
    }

    const navItems = getNavItems(currentRole)

    return (
        <div className="flex flex-col h-full">
            {/* Mobile Sidebar Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <Link href="/" onClick={onClose}>
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-slate-100">EduLearn</h1>
                            <p className="text-xs text-slate-500">Learning Platform</p>
                        </div>
                    </div>
                </Link>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5 text-slate-400" />
                </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item, index) => {
                    const IconComponent = getIconComponent(item.icon)
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={index}
                            href={item.href}
                            onClick={onClose}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border-l-2 border-cyan-500'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border-l-2 border-transparent'
                                }`}
                        >
                            <IconComponent className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-50 group-hover:text-slate-300'}`} />
                            <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Mobile Sidebar Footer */}
            <div className="p-4 border-t border-slate-800">
                <Link
                    href="/dashboard/settings"
                    onClick={onClose}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
                >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium text-sm">Settings</span>
                </Link>
            </div>
        </div>
    )
}

function Header({ currentRole, roleConfig, onMenuClick }: {
    currentRole: UserRole
    roleConfig: { [key in UserRole]: { name: string, icon: any, color: string } }
    onMenuClick: () => void
}) {
    return (
        <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onMenuClick}
                            className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <Menu className="w-6 h-6 text-slate-400" />
                        </button>
                        <div className="relative hidden sm:block">
                            <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-64"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="hidden sm:flex items-center space-x-2 bg-slate-800 border border-slate-700 rounded-lg p-1 px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-slate-700 to-slate-800">
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

function getIconComponent(iconName: string): React.ElementType {
    const icons: Record<string, React.ElementType> = {
        BarChart3,
        Users,
        BookOpen,
        DollarSign,
        Settings,
        Calendar,
        Trophy,
        Award,
        FileText,
        MessageSquare,
        PlusCircle,
    }
    return icons[iconName] || BarChart3
}
