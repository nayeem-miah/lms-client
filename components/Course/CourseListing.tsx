"use client"

import React, { useState, useMemo } from 'react'
import { CourseCard } from "@/components/Course/CourseCard"
import { CourseFilter } from "@/components/Course/CourseFilter"
import { Button } from "@/components/ui/Button"
import { useGetAllCoursesQuery } from "@/lib/redux/features/courses/coursesApi"
import { Course as ApiCourse } from "@/types/api"
import { Course } from "@/types/types"
import { useTranslations } from 'next-intl'
import {
    Loader2,
    ChevronLeft,
    ChevronRight,
    BookOpen,
    RefreshCw,
    Search,
    Sparkles,
    GraduationCap,
    Users,
    Award,
    ChevronsLeft,
    ChevronsRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const StatCard = ({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) => (
    <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/60 rounded-2xl px-5 py-3.5">
        <div className="text-cyan-400">{icon}</div>
        <div>
            <p className="text-lg font-black text-white leading-none">{value}</p>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">{label}</p>
        </div>
    </div>
)

export const CourseListingPage = () => {
    const t = useTranslations('CourseListing')
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('')
    const [sortBy, setSortBy] = useState('')

    const queryParams = useMemo(() => {
        const params: any = { page, limit: 9 }
        if (searchTerm) params.search = searchTerm
        if (category) params.category = category
        if (sortBy) params.sort = sortBy
        return params
    }, [page, searchTerm, category, sortBy])

    const { data, isLoading, isFetching, error } = useGetAllCoursesQuery(queryParams)

    const handleReset = () => {
        setSearchTerm('')
        setCategory('')
        setSortBy('')
        setPage(1)
    }

    const courses: Course[] = useMemo(() => {
        if (!data?.courses || !Array.isArray(data.courses)) return []

        return data.courses.map((apiCourse: ApiCourse) => {
            const instructor = (apiCourse.instructorId && typeof apiCourse.instructorId === 'object')
                ? apiCourse.instructorId as any
                : { _id: 'unknown', name: 'Unknown', profilePhoto: '' }

            return {
                id: apiCourse._id || Math.random().toString(),
                title: apiCourse.title || 'Untitled Course',
                instructor: {
                    id: instructor._id || 'unknown',
                    name: instructor.name || 'Unknown Instructor',
                    avatar: instructor.profilePhoto || ''
                },
                price: apiCourse.price || 0,
                rating: apiCourse.ratingAvg || 0,
                reviewCount: 0,
                thumbnail: apiCourse.thumbnail || '',
                category: apiCourse.category || 'General',
                level: (apiCourse.level
                    ? (apiCourse.level.charAt(0).toUpperCase() + apiCourse.level.slice(1).toLowerCase())
                    : 'Beginner') as any,
                lessons: 0,
                duration: '10h',
                students: apiCourse.totalEnrollments || 0,
                description: apiCourse.description || '',
                isPopular: false,
            }
        })
    }, [data])

    const totalPages = data?.meta?.totalPages || 0
    const totalCourses = data?.meta?.total || 0

    // Smart pagination logic - show limited page numbers
    const getPageNumbers = () => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
        const pages: (number | '...')[] = []
        pages.push(1)
        if (page > 3) pages.push('...')
        const start = Math.max(2, page - 1)
        const end = Math.min(totalPages - 1, page + 1)
        for (let i = start; i <= end; i++) pages.push(i)
        if (page < totalPages - 2) pages.push('...')
        pages.push(totalPages)
        return pages
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="relative w-16 h-16 mx-auto">
                        <div className="absolute inset-0 rounded-full border-2 border-slate-800" />
                        <div className="absolute inset-0 rounded-full border-2 border-t-cyan-500 animate-spin" />
                        <BookOpen className="absolute inset-0 m-auto h-6 w-6 text-cyan-500" />
                    </div>
                    <p className="text-slate-400 text-sm font-semibold">{t('loading')}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Hero Header */}
            <div className="relative overflow-hidden border-b border-slate-900/80">
                {/* Background blobs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/4 rounded-full blur-[140px] -mr-60 -mt-60" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/4 rounded-full blur-[120px] -ml-48 -mb-48" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-slate-900/30 rounded-full blur-3xl" />

                {/* Dot grid pattern */}
                <div className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
                        backgroundSize: '32px 32px'
                    }}
                />

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                        {/* Text Content */}
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/80 border border-slate-800/80 rounded-full mb-6"
                            >
                                <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" />
                                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Premium Courses</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.08 }}
                                className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05] mb-5"
                            >
                                {t('title')}{' '}
                                <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                                    Courses
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="text-slate-400 text-lg leading-relaxed"
                            >
                                {t('subtitle')}
                            </motion.p>
                        </div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-3"
                        >
                            <StatCard icon={<GraduationCap className="h-5 w-5" />} value={`${totalCourses}+`} label="Courses" />
                            <StatCard icon={<Users className="h-5 w-5" />} value="12K+" label="Students" />
                            <StatCard icon={<Award className="h-5 w-5" />} value="4.8★" label="Avg Rating" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                {/* Filter Section */}
                <CourseFilter
                    searchTerm={searchTerm}
                    setSearchTerm={(val) => { setSearchTerm(val); setPage(1) }}
                    category={category}
                    setCategory={(val) => { setCategory(val); setPage(1) }}
                    sortBy={sortBy}
                    setSortBy={(val) => { setSortBy(val); setPage(1) }}
                    onReset={handleReset}
                />

                {/* Results Info Bar */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <p className="text-sm text-slate-400">
                            Showing{' '}
                            <span className="text-white font-bold">{courses.length}</span>
                            {' '}of{' '}
                            <span className="text-white font-bold">{totalCourses}</span>
                            {' '}courses
                        </p>
                        <AnimatePresence>
                            {isFetching && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold"
                                >
                                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                    {t('updating')}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Courses Grid Or States */}
                {error ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-24 bg-slate-900/40 rounded-3xl border border-slate-800/60"
                    >
                        <div className="mb-5 inline-flex p-5 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                            <BookOpen className="w-10 h-10 text-rose-500" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-100 mb-3">{t('errorTitle')}</h3>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">{t('errorSubtitle')}</p>
                        <Button
                            className="bg-rose-600 hover:bg-rose-500 text-white border-none px-8 py-3 h-auto rounded-xl font-bold shadow-lg shadow-rose-500/20"
                            onClick={() => window.location.reload()}
                        >
                            {t('tryAgain')}
                        </Button>
                    </motion.div>
                ) : courses.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-24 bg-slate-900/40 rounded-3xl border border-slate-800/60"
                    >
                        <div className="mb-5 inline-flex p-6 bg-slate-800/80 rounded-2xl border border-slate-700/60">
                            <Search className="w-10 h-10 text-slate-500" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-100 mb-3">{t('noCoursesFound')}</h3>
                        <p className="text-slate-400 mb-8 max-w-sm mx-auto leading-relaxed">{t('noCoursesSubtitle')}</p>
                        <Button
                            variant="outline"
                            className="border-slate-700 hover:bg-slate-800 rounded-xl px-8 py-3 h-auto font-semibold"
                            onClick={handleReset}
                        >
                            {t('clearFilters')}
                        </Button>
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <AnimatePresence mode="popLayout">
                                {courses.map((course, index) => (
                                    <motion.div
                                        key={course.id}
                                        layout
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.35, delay: index * 0.06 }}
                                    >
                                        <CourseCard course={course} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Advanced Pagination */}
                        {totalPages > 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-800/60"
                            >
                                {/* Info */}
                                <div className="text-sm text-slate-500">
                                    Page{' '}
                                    <span className="text-white font-bold">{page}</span>
                                    {' '}of{' '}
                                    <span className="text-white font-bold">{totalPages}</span>
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex items-center gap-2">
                                    {/* First Page */}
                                    <button
                                        onClick={() => setPage(1)}
                                        disabled={page === 1}
                                        className="h-9 w-9 flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ChevronsLeft className="h-4 w-4" />
                                    </button>

                                    {/* Prev */}
                                    <button
                                        onClick={() => setPage(p => p - 1)}
                                        disabled={page === 1}
                                        className="h-9 w-9 flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>

                                    {/* Page Numbers */}
                                    <div className="flex items-center gap-1">
                                        {getPageNumbers().map((pageNum, idx) => (
                                            pageNum === '...'
                                                ? (
                                                    <span key={`ellipsis-${idx}`} className="h-9 w-9 flex items-center justify-center text-slate-600 text-sm select-none">
                                                        ···
                                                    </span>
                                                ) : (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => setPage(pageNum as number)}
                                                        className={`h-9 w-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-200 ${page === pageNum
                                                                ? 'bg-gradient-to-br from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                                                                : 'border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800/60'
                                                            }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                )
                                        ))}
                                    </div>

                                    {/* Next */}
                                    <button
                                        onClick={() => setPage(p => p + 1)}
                                        disabled={page === totalPages}
                                        className="h-9 w-9 flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>

                                    {/* Last Page */}
                                    <button
                                        onClick={() => setPage(totalPages)}
                                        disabled={page === totalPages}
                                        className="h-9 w-9 flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ChevronsRight className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Jump to page */}
                                <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
                                    <span>Go to</span>
                                    <input
                                        type="number"
                                        min={1}
                                        max={totalPages}
                                        defaultValue={page}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const val = parseInt((e.target as HTMLInputElement).value)
                                                if (val >= 1 && val <= totalPages) setPage(val)
                                            }
                                        }}
                                        className="w-14 h-9 text-center bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
