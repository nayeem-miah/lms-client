"use client"

import React, { useState, useMemo } from 'react'
import { CourseCard } from "@/components/Course/CourseCard"
import { CourseFilter } from "@/components/Course/CourseFilter"
import { Button } from "@/components/ui/Button"
import { useGetAllCoursesQuery } from "@/lib/redux/features/courses/coursesApi"
import { Course as ApiCourse, User } from "@/types/api"
import { Course } from "@/types/types"
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Loader2, ChevronLeft, ChevronRight, BookOpen, RefreshCw, Search, Award, Sparkles, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const CourseListingPage = () => {
    const t = useTranslations('CourseListing')
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('')
    const [sortBy, setSortBy] = useState('')

    // Construct query parameters only with values that are present
    const queryParams = useMemo(() => {
        const params: any = { page, limit: 12 } // Show more courses by default
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

    // Map API Data to UI type
    const courses: Course[] = useMemo(() => {
        if (!data?.courses || !Array.isArray(data.courses)) return []

        return data.courses.map((apiCourse: ApiCourse) => {
            const instructor = (apiCourse.instructorId && typeof apiCourse.instructorId === 'object')
                ? apiCourse.instructorId as any
                : { _id: 'unknown', name: 'Unknown', profilePhoto: '' };

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
                level: (apiCourse.level ? (apiCourse.level.charAt(0).toUpperCase() + apiCourse.level.slice(1).toLowerCase()) : 'Beginner') as any,
                lessons: 0,
                duration: '10h',
                students: apiCourse.totalEnrollments || 0,
                description: apiCourse.description || '',
                isPopular: false,
            }
        })
    }, [data])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 py-20 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-cyan-600 animate-spin" />
                <p className="text-slate-400 font-medium">{t('loading')}</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header Section */}
            <div className="relative py-24 md:py-32 overflow-hidden border-b border-slate-900 bg-slate-950">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] -ml-40 -mb-40"></div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-block mb-4"
                            >
                                <span className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-cyan-400 italic flex items-center gap-2">
                                    <Sparkles size={12} className="animate-pulse" />
                                    Premium Courses
                                </span>
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black text-slate-100 tracking-tighter italic uppercase mb-6 leading-tight"
                            >
                                {t('title')}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-slate-400 font-medium max-w-2xl leading-relaxed"
                            >
                                {t('subtitle')}
                            </motion.p>
                        </div>
                        {isFetching && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-2xl text-cyan-400 text-sm font-bold italic animate-pulse"
                            >
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                {t('updating')}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="relative z-20">
                    <CourseFilter
                        searchTerm={searchTerm}
                        setSearchTerm={(val) => { setSearchTerm(val); setPage(1); }}
                        category={category}
                        setCategory={(val) => { setCategory(val); setPage(1); }}
                        sortBy={sortBy}
                        setSortBy={(val) => { setSortBy(val); setPage(1); }}
                        onReset={handleReset}
                    />
                </div>

                {error ? (
                    <div className="text-center py-20 bg-slate-900 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent pointer-events-none"></div>
                        <div className="mb-6 inline-flex p-6 bg-rose-500/10 rounded-[2rem] border border-rose-500/20 relative z-10">
                            <BookOpen className="w-12 h-12 text-rose-500" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-100 italic tracking-tight uppercase mb-4 relative z-10">{t('errorTitle')}</h3>
                        <p className="text-slate-400 mb-10 font-medium italic text-lg max-w-md mx-auto relative z-10">{t('errorSubtitle')}</p>
                        <Button
                            className="relative z-10 bg-rose-600 hover:bg-rose-500 text-white border-none px-12 py-7 h-auto text-lg font-black uppercase italic tracking-widest rounded-2xl shadow-xl shadow-rose-500/20 active:scale-95 transition-all"
                            onClick={() => window.location.reload()}
                        >
                            {t('tryAgain')}
                        </Button>
                    </div>
                ) : courses.length === 0 ? (
                    <div className="text-center py-32 bg-slate-900 rounded-[3rem] border border-slate-800 shadow-3xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none"></div>
                        <div className="mb-8 inline-flex p-8 bg-slate-800 rounded-[2.5rem] border border-slate-700 relative z-10">
                            <Search className="w-14 h-14 text-slate-600" />
                        </div>
                        <h3 className="text-4xl font-black text-slate-100 italic tracking-tight uppercase mb-6 relative z-10">{t('noCoursesFound')}</h3>
                        <p className="text-slate-400 mt-2 max-w-md mx-auto font-medium text-lg leading-relaxed relative z-10">
                            {t('noCoursesSubtitle')}
                        </p>
                        <Button
                            variant="outline"
                            className="mt-12 px-10 py-6 h-auto text-sm font-black uppercase italic tracking-widest rounded-2xl border-slate-700 hover:bg-slate-800 relative z-10 transition-all active:scale-95"
                            onClick={handleReset}
                        >
                            {t('clearFilters')}
                        </Button>
                    </div>
                ) : (
                    <>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <AnimatePresence mode='popLayout'>
                                {courses.map((course, index) => (
                                    <motion.div
                                        key={course.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                    >
                                        <CourseCard course={course} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Pagination */}
                        {data?.meta && data.meta.totalPages > 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-slate-900 mt-10"
                            >
                                <p className="text-xs text-slate-500 font-extrabold uppercase tracking-[0.2em] italic">
                                    {t('pagination.displaying')} <span className="text-cyan-500">{courses.length}</span> {t('pagination.of')} <span className="text-slate-300">{data.meta.total}</span> {t('pagination.courses')}
                                </p>
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        disabled={page === 1}
                                        onClick={() => setPage(p => p - 1)}
                                        className="rounded-2xl border-slate-800 bg-slate-900/50 hover:bg-slate-800 hover:text-cyan-400 h-14 px-6 text-xs font-black uppercase italic tracking-widest transition-all active:scale-95 disabled:opacity-30"
                                    >
                                        <ChevronLeft className="w-5 h-5 mr-2" />
                                        {t('pagination.prev')}
                                    </Button>

                                    <div className="flex items-center gap-2 bg-slate-900/50 p-1.5 rounded-[1.25rem] border border-slate-800/50 backdrop-blur-sm">
                                        {[...Array(data?.meta?.totalPages || 0)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPage(i + 1)}
                                                className={`w-11 h-11 rounded-xl text-xs font-black transition-all duration-300 uppercase italic tracking-tighter ${page === i + 1
                                                    ? 'bg-cyan-600 text-white shadow-xl shadow-cyan-500/30 scale-110 z-10'
                                                    : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="lg"
                                        disabled={page === data.meta.totalPages}
                                        onClick={() => setPage(p => p + 1)}
                                        className="rounded-2xl border-slate-800 bg-slate-900/50 hover:bg-slate-800 hover:text-cyan-400 h-14 px-6 text-xs font-black uppercase italic tracking-widest transition-all active:scale-95 disabled:opacity-30"
                                    >
                                        {t('pagination.next')}
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
