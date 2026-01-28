"use client"
import React from 'react'
import { CourseCard } from "@/components/Course/CourseCard"
import { CourseFilter } from "@/components/Course/CourseFilter"
import { Button } from "@/components/ui/Button"
import { Course } from "@/types/types"
import { useGetAllCoursesQuery } from "@/lib/redux/features/courses/coursesApi"
import { Course as ApiCourse, User } from "@/types/api"

export const CourseListingPage = () => {
    const { data: apiCourses, isLoading, error } = useGetAllCoursesQuery(undefined)

    const courses: Course[] = apiCourses ? apiCourses.map((apiCourse: ApiCourse) => {
        const instructor = typeof apiCourse.instructorId === 'object'
            ? apiCourse.instructorId as User
            : { _id: 'unknown', name: 'Unknown', profilePhoto: '' } as User;

        return {
            id: apiCourse._id,
            title: apiCourse.title,
            instructor: {
                id: instructor._id,
                name: instructor.name,
                avatar: instructor.profilePhoto
            },
            price: apiCourse.price,
            rating: apiCourse.ratingAvg || 0,
            reviewCount: 0,
            thumbnail: apiCourse.thumbnail,
            category: apiCourse.category,
            level: (apiCourse.level.charAt(0) + apiCourse.level.slice(1).toLowerCase()) as any,
            lessons: 0,
            duration: '10h',
            students: apiCourse.totalEnrollments || 0,
            description: apiCourse.description,
            isPopular: false,
        }
    }) : []

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 py-12 flex justify-center items-center">
                <p>Loading courses...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 py-12 flex justify-center items-center">
                <p className="text-red-500">Failed to load courses. Please try again later.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Explore Courses</h1>
                    <p className="text-slate-600 mt-2">
                        Discover the best courses to expand your skills
                    </p>
                </div>

                <CourseFilter />

                {courses.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-slate-500">No courses found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {courses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                )}

                {/* Pagination - Placeholder for now, hardcoded in UI */}
                <div className="flex justify-center gap-2">
                    <Button variant="outline" disabled>
                        Previous
                    </Button>
                    <Button variant="primary">1</Button>
                    <Button variant="outline" disabled>Next</Button>
                </div>
            </div>
        </div>
    )
}
