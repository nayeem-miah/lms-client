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
import { Link, useRouter, usePathname } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { selectCurrentUser, selectIsAuthenticated, logOut } from '@/lib/redux/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { Avatar } from '../ui/Avater'
import { Button } from '../ui/Button'
import { LanguageSwitcher } from './LanguageSwitcher'

export const Navbar = () => {
    const t = useTranslations('Navbar')
    const dispatch = useAppDispatch()
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const user = useAppSelector(selectCurrentUser)

    const pathname = usePathname()
    const router = useRouter()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

    if (pathname?.startsWith('/dashboard')) {
        return null
    }

    const handleLogout = () => {
        dispatch(logOut())
        router.push('/login')
        setIsProfileMenuOpen(false)
    }
    return (
        <nav className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
                            <BookOpen className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold text-white hidden sm:block">
                            {t('logoText')}
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                    >
                        {t('home')}
                    </Link>
                    <Link
                        href="/courses"
                        className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                    >
                        {t('browseCourses')}
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                    >
                        {t('about')}
                    </Link>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    <LanguageSwitcher />

                    {/* Search - Desktop */}
                    <div className="hidden lg:flex relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            className="h-9 w-64 rounded-full border border-slate-700 bg-slate-800 pl-10 pr-4 text-sm text-slate-200 focus:border-cyan-500 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        />
                    </div>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-3">
                            <button className="relative rounded-full p-2 text-slate-400 hover:bg-slate-800 transition-colors">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-500 ring-2 ring-slate-900" />
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                    className="flex items-center gap-2 rounded-full border border-slate-700 p-1 hover:bg-slate-800 transition-colors"
                                >
                                    <Avatar src={user?.profilePhoto} alt={user?.name} fallback={user?.name} size="sm" />
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
                                            className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-2xl ring-1 ring-black ring-opacity-20 focus:outline-none"
                                        >
                                            <div className="px-3 py-2 border-b border-slate-800 mb-1">
                                                <p className="text-sm font-medium text-slate-100">
                                                    {user?.name}
                                                </p>
                                                <p className="text-xs text-slate-400 truncate">
                                                    {user?.email}
                                                </p>
                                            </div>

                                            <Link
                                                href="/dashboard"
                                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                                                onClick={() => setIsProfileMenuOpen(false)}
                                            >
                                                <LayoutDashboard className="h-4 w-4" />
                                                {t('dashboard')}
                                            </Link>
                                            <Link
                                                href="/profile"
                                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
                                                onClick={() => setIsProfileMenuOpen(false)}
                                            >
                                                <UserIcon className="h-4 w-4" />
                                                {t('profile')}
                                            </Link>

                                            <div className="my-1 border-t border-slate-800" />

                                            <button
                                                onClick={handleLogout}
                                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                {t('signOut')}
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
                                    {t('logIn')}
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button
                                    variant='outline'
                                    size="sm"
                                    className="border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white"
                                >
                                    {t('getStarted')}
                                </Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-400 hover:text-white"
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
                        className="md:hidden border-t border-slate-800 bg-slate-900 overflow-hidden"
                    >
                        <div className="space-y-1 px-4 py-4">
                            <Link
                                href="/"
                                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t('home')}
                            </Link>
                            <Link
                                href="/courses"
                                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t('browseCourses')}
                            </Link>

                            <Link
                                href="/about"
                                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t('about')}
                            </Link>
                            {!isAuthenticated && (
                                <div className="mt-4 flex flex-col gap-2">
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full border-slate-700 text-slate-200">
                                            {t('logIn')}
                                        </Button>
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white border-none">{t('getStarted')}</Button>
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

