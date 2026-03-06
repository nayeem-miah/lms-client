"use client"
import { useState, useEffect, useRef } from 'react'
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
    ChevronDown,
    Zap,
    GraduationCap,
    Globe,
    TrendingUp,
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
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [scrolled, setScrolled] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)
    const profileRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsSearchOpen(false)
            }
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setIsProfileMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (pathname?.startsWith('/dashboard')) {
        return null
    }

    const handleLogout = () => {
        dispatch(logOut())
        router.push('/login')
        setIsProfileMenuOpen(false)
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            // Use window.location.href to preserve the locale prefix while adding query params
            const currentLocale = pathname.split('/')[1]
            const localePrefix = currentLocale && ['en', 'bn'].includes(currentLocale) ? `/${currentLocale}` : ''
            window.location.href = `${localePrefix}/courses?search=${encodeURIComponent(searchQuery.trim())}`
            setIsSearchOpen(false)
            setSearchQuery('')
        }
    }

    const navLinks = [
        { href: '/', label: t('home'), icon: <Zap className="h-3.5 w-3.5" /> },
        { href: '/courses', label: t('browseCourses'), icon: <GraduationCap className="h-3.5 w-3.5" /> },
        { href: '/about', label: t('about'), icon: <Globe className="h-3.5 w-3.5" /> },
    ]

    const isActive = (href: string) => pathname === href

    return (
        <>
            <nav
                className={`sticky top-0 z-50 w-full transition-all duration-500 ${
                    scrolled
                        ? 'bg-slate-950/95 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/40'
                        : 'bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.04]'
                }`}
            >
                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
                        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-violet-600" />
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <BookOpen className="h-4.5 w-4.5 text-white relative z-10" />
                        </div>
                        <div className="hidden sm:flex flex-col">
                            <span className="text-base font-black text-white tracking-tight leading-none">
                                {t('logoText')}
                            </span>
                            <span className="text-[9px] font-bold text-cyan-400/70 tracking-[0.2em] uppercase leading-none mt-0.5">
                                Learning Platform
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                                    isActive(link.href)
                                        ? 'text-cyan-400 bg-cyan-500/10'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                <span className={`transition-colors duration-300 ${isActive(link.href) ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400'}`}>
                                    {link.icon}
                                </span>
                                {link.label}
                                {isActive(link.href) && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2">
                        <LanguageSwitcher />

                        {/* Search Button */}
                        <div ref={searchRef} className="relative">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className={`flex items-center gap-2 h-9 px-3 rounded-xl border transition-all duration-300 ${
                                    isSearchOpen
                                        ? 'bg-slate-800 border-cyan-500/30 text-cyan-400'
                                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                                }`}
                            >
                                <Search className="h-4 w-4" />
                                <span className="hidden lg:block text-sm font-medium w-32 text-left">{t('searchPlaceholder')}</span>
                                <kbd className="hidden lg:block text-[10px] font-black bg-slate-700/80 text-slate-400 px-1.5 py-0.5 rounded">⌘K</kbd>
                            </button>

                            <AnimatePresence>
                                {isSearchOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 top-12 w-80 bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden z-50"
                                    >
                                        <form onSubmit={handleSearch} className="p-3">
                                            <div className="relative">
                                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    placeholder="Search courses..."
                                                    className="w-full h-11 bg-slate-800/80 border border-slate-700/50 rounded-xl pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                                                />
                                                {searchQuery && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setSearchQuery('')}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                                    >
                                                        <X className="h-3.5 w-3.5" />
                                                    </button>
                                                )}
                                            </div>
                                        </form>
                                        <div className="px-3 pb-3">
                                            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-2 px-1">Trending</p>
                                            {['Web Development', 'Machine Learning', 'UI/UX Design'].map((trend) => (
                                                <button
                                                    key={trend}
                                                    onClick={() => {
                                                        router.push(`/courses?search=${encodeURIComponent(trend)}`)
                                                        setIsSearchOpen(false)
                                                    }}
                                                    className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
                                                >
                                                    <TrendingUp className="h-3.5 w-3.5 text-cyan-500/60" />
                                                    {trend}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-1.5">
                                {/* Notification Bell */}
                                <button className="relative h-9 w-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all duration-200 border border-transparent hover:border-slate-800">
                                    <Bell className="h-4.5 w-4.5" />
                                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 ring-2 ring-slate-950" />
                                </button>

                                {/* Profile Menu */}
                                <div ref={profileRef} className="relative">
                                    <button
                                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                        className={`flex items-center gap-2 h-9 px-2 rounded-xl border transition-all duration-300 ${
                                            isProfileMenuOpen
                                                ? 'bg-slate-800 border-slate-700'
                                                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                                        }`}
                                    >
                                        <Avatar src={user?.profilePhoto} alt={user?.name} fallback={user?.name} size="sm" />
                                        <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 hidden sm:block ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isProfileMenuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-0 mt-2 w-60 origin-top-right rounded-2xl border border-slate-800/80 bg-slate-900 shadow-2xl shadow-black/60 overflow-hidden z-50"
                                            >
                                                {/* User Info */}
                                                <div className="p-4 border-b border-slate-800/60 bg-gradient-to-br from-slate-900 to-slate-800/40">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar src={user?.profilePhoto} alt={user?.name} fallback={user?.name} size="md" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-bold text-slate-100 truncate">{user?.name}</p>
                                                            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Menu Items */}
                                                <div className="p-2">
                                                    <Link
                                                        href="/dashboard"
                                                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                                                        onClick={() => setIsProfileMenuOpen(false)}
                                                    >
                                                        <div className="h-7 w-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                                                            <LayoutDashboard className="h-3.5 w-3.5 text-violet-400" />
                                                        </div>
                                                        <span className="font-medium">{t('dashboard')}</span>
                                                    </Link>
                                                    <Link
                                                        href="/profile"
                                                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                                                        onClick={() => setIsProfileMenuOpen(false)}
                                                    >
                                                        <div className="h-7 w-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                                            <UserIcon className="h-3.5 w-3.5 text-cyan-400" />
                                                        </div>
                                                        <span className="font-medium">{t('profile')}</span>
                                                    </Link>

                                                    <div className="my-2 border-t border-slate-800/60" />

                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-all"
                                                    >
                                                        <div className="h-7 w-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0">
                                                            <LogOut className="h-3.5 w-3.5 text-rose-400" />
                                                        </div>
                                                        <span className="font-medium">{t('signOut')}</span>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center gap-2">
                                <Link href="/login">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-9 px-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl text-sm font-semibold"
                                    >
                                        {t('logIn')}
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button
                                        size="sm"
                                        className="h-9 px-4 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white border-none rounded-xl text-sm font-bold shadow-lg shadow-cyan-500/20 transition-all duration-300"
                                    >
                                        {t('getStarted')}
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden h-9 w-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-white/5 hover:text-white border border-slate-800 hover:border-slate-700 transition-all"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <AnimatePresence mode="wait">
                                {isMobileMenuOpen ? (
                                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                        <X className="h-5 w-5" />
                                    </motion.div>
                                ) : (
                                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                        <Menu className="h-5 w-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="md:hidden border-t border-slate-800/60 bg-slate-950/98 backdrop-blur-xl overflow-hidden"
                        >
                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className="px-4 pt-4 pb-2">
                                <div className="relative">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search courses..."
                                        className="w-full h-11 bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/40 transition-all"
                                    />
                                </div>
                            </form>

                            <div className="px-4 py-3 space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all ${
                                            isActive(link.href)
                                                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                                : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <span className={isActive(link.href) ? 'text-cyan-400' : 'text-slate-500'}>{link.icon}</span>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            {!isAuthenticated && (
                                <div className="px-4 pb-4 pt-2 flex flex-col gap-2 border-t border-slate-800/60 mt-2">
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full border-slate-700 text-slate-200 hover:bg-white/5 rounded-xl h-11 font-semibold">
                                            {t('logIn')}
                                        </Button>
                                    </Link>
                                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button className="w-full h-11 bg-gradient-to-r from-cyan-500 to-violet-600 text-white border-none rounded-xl font-bold shadow-lg shadow-cyan-500/20">
                                            {t('getStarted')}
                                        </Button>
                                    </Link>
                                </div>
                            )}

                            {isAuthenticated && (
                                <div className="px-4 pb-4 pt-2 border-t border-slate-800/60 mt-2">
                                    <Link href="/dashboard" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>
                                        <LayoutDashboard className="h-4 w-4 text-violet-400" />
                                        {t('dashboard')}
                                    </Link>
                                    <Link href="/profile" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-300 hover:bg-white/5" onClick={() => setIsMobileMenuOpen(false)}>
                                        <UserIcon className="h-4 w-4 text-cyan-400" />
                                        {t('profile')}
                                    </Link>
                                    <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-rose-400 hover:bg-rose-500/10">
                                        <LogOut className="h-4 w-4" />
                                        {t('signOut')}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    )
}
