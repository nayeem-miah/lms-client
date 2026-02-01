"use client"

import React, { useState, useMemo } from 'react'
import { CourseCard } from "@/components/Course/CourseCard"
import { CourseFilter } from "@/components/Course/CourseFilter"
import { Button } from "@/components/ui/Button"
import { useGetAllCoursesQuery } from "@/lib/redux/features/courses/coursesApi"
import { Course as ApiCourse, User } from "@/types/api"
import { Course } from "@/types/types"
import { Loader2, ChevronLeft, ChevronRight, BookOpen, RefreshCw, Search } from 'lucide-react'

export const CourseListingPage = () => {
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
            <div className="min-h-screen bg-slate-50 py-20 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="text-slate-500 font-medium">Loading courses...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8 md:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Discover Your Path</h1>
                        <p className="text-slate-600 mt-2 text-lg">
                            Browse through our extensive library of professional courses.
                        </p>
                    </div>
                    {isFetching && (
                        <div className="flex items-center text-slate-400 text-sm font-medium animate-pulse">
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Updating results...
                        </div>
                    )}
                </div>

                <CourseFilter
                    searchTerm={searchTerm}
                    setSearchTerm={(val) => { setSearchTerm(val); setPage(1); }}
                    category={category}
                    setCategory={(val) => { setCategory(val); setPage(1); }}
                    sortBy={sortBy}
                    setSortBy={(val) => { setSortBy(val); setPage(1); }}
                    onReset={handleReset}
                />

                {error ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
                        <div className="mb-4 inline-flex p-4 bg-red-50 rounded-full">
                            <BookOpen className="w-8 h-8 text-red-400" />
                        </div>
                        <p className="text-slate-800 font-bold text-xl mb-2">Oops! Something went wrong</p>
                        <p className="text-slate-500 mb-6 font-medium italic">We couldn't load the courses at this moment.</p>
                        <Button variant="primary" onClick={() => window.location.reload()}>Try Again</Button>
                    </div>
                ) : courses.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm">
                        <div className="mb-4 inline-flex p-6 bg-slate-50 rounded-full">
                            <Search className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">No courses found</h3>
                        <p className="text-slate-500 mt-2 max-w-md mx-auto">
                            We couldn't find any courses matching your current filters. Try resetting or using different keywords.
                        </p>
                        <Button variant="outline" className="mt-8 px-8" onClick={handleReset}>Clear All Filters</Button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {courses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {data?.meta && data.meta.totalPages > 1 && (
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-200">
                                <p className="text-sm text-slate-500 font-medium font-mono uppercase tracking-wider">
                                    Displaying <span className="text-slate-900 font-bold">{courses.length}</span> of {data.meta.total} courses
                                </p>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={page === 1}
                                        onClick={() => setPage(p => p - 1)}
                                        className="rounded-xl"
                                    >
                                        <ChevronLeft className="w-4 h-4 mr-1" />
                                        Prev
                                    </Button>

                                    <div className="flex items-center space-x-1">
                                        {[...Array(data?.meta?.totalPages || 0)].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPage(i + 1)}
                                                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${page === i + 1
                                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={page === data.meta.totalPages}
                                        onClick={() => setPage(p => p + 1)}
                                        className="rounded-xl"
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
