"use client"
import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import {
    Bell,
    BookOpen,
    LayoutDashboard,
    LogOut,
    Menu,
    Search,
    User as UserIcon,
    X,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Avatar } from '../ui/Avater'
import { Button } from '../ui/Button'
export const Navbar = () => {
    // const { user, isAuthenticated, logout } = useAuth()
    const isAuthenticated = true
    const user = {
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e28540',
        email: 's3NkU@example.com',
    }
    const router = useRouter()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
    const handleLogout = () => {
        // logout()
        router.push('/login')
        setIsProfileMenuOpen(false)
    }
    return (
        <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
                            <BookOpen className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 hidden sm:block">
                            EduPlatform
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/courses"
                        className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                    >
                        Browse Courses
                    </Link>
                    <Link
                        href="/pricing"
                        className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/instructors"
                        className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                    >
                        Instructors
                    </Link>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    {/* Search - Desktop */}
                    <div className="hidden lg:flex relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="h-9 w-64 rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all"
                        />
                    </div>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-3">
                            <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                    className="flex items-center gap-2 rounded-full border border-slate-200 p-1 hover:bg-slate-50 transition-colors"
                                >
                                    <Avatar src={user?.avatar} alt={user?.name} size="sm" />
                                </button>

                                <AnimatePresence>
                                    {isProfileMenuOpen && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: 10,
                                                scale: 0.95,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 10,
                                                scale: 0.95,
                                            }}
                                            className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-slate-100 bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        >
                                            <div className="px-3 py-2 border-b border-slate-100 mb-1">
                                                <p className="text-sm font-medium text-slate-900">
                                                    {user?.name}
                                                </p>
                                                <p className="text-xs text-slate-500 truncate">
                                                    {user?.email}
                                                </p>
                                            </div>

                                            <Link
                                                href="/dashboard"
                                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                                onClick={() => setIsProfileMenuOpen(false)}
                                            >
                                                <LayoutDashboard className="h-4 w-4" />
                                                Dashboard
                                            </Link>
                                            <Link
                                                href="/profile"
                                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                                onClick={() => setIsProfileMenuOpen(false)}
                                            >
                                                <UserIcon className="h-4 w-4" />
                                                Profile
                                            </Link>

                                            <div className="my-1 border-t border-slate-100" />

                                            <button
                                                onClick={handleLogout}
                                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Sign out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hidden sm:inline-flex"
                                >
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{
                            height: 0,
                            opacity: 0,
                        }}
                        animate={{
                            height: 'auto',
                            opacity: 1,
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                        }}
                        className="md:hidden border-t border-slate-200 bg-white overflow-hidden"
                    >
                        <div className="space-y-1 px-4 py-4">
                            <Link
                                href="/courses"
                                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Browse Courses
                            </Link>
                            <Link
                                href="/pricing"
                                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/instructors"
                                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Instructors
                            </Link>
                            {!isAuthenticated && (
                                <div className="mt-4 flex flex-col gap-2">
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full">
                                            Log in
                                        </Button>
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Button className="w-full">Get Started</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
