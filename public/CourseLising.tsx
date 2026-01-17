"use client"
import { CourseCard } from "@/components/Course/CourseCard"
import { CourseFilter } from "@/components/Course/CourseFilter"
import { Button } from "@/components/ui/Button"
import { Course } from "@/types/types"

// Mock Data (Expanded)
const courses: Course[] = [
    {
        id: '1',
        title: 'Complete Web Development Bootcamp 2024',
        instructor: {
            id: '1',
            name: 'Sarah Johnson',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        },
        price: 89.99,
        rating: 4.8,
        reviewCount: 1240,
        thumbnail:
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        category: 'Development',
        level: 'Beginner',
        lessons: 142,
        duration: '42h 30m',
        students: 15400,
        isPopular: true,
    },
    {
        id: '2',
        title: 'Advanced UI/UX Design Masterclass',
        instructor: {
            id: '2',
            name: 'Michael Chen',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
        },
        price: 69.99,
        rating: 4.9,
        reviewCount: 850,
        thumbnail:
            'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
        category: 'Design',
        level: 'Advanced',
        lessons: 86,
        duration: '24h 15m',
        students: 8200,
    },
    {
        id: '3',
        title: 'Digital Marketing Strategy for 2024',
        instructor: {
            id: '3',
            name: 'Emma Wilson',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
        },
        price: 49.99,
        rating: 4.7,
        reviewCount: 620,
        thumbnail:
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        category: 'Marketing',
        level: 'Intermediate',
        lessons: 54,
        duration: '12h 45m',
        students: 5600,
    },
    {
        id: '4',
        title: 'Python for Data Science and Machine Learning',
        instructor: {
            id: '4',
            name: 'David Lee',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        },
        price: 94.99,
        rating: 4.6,
        reviewCount: 2100,
        thumbnail:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        category: 'Data Science',
        level: 'Intermediate',
        lessons: 110,
        duration: '35h 20m',
        students: 22000,
        isPopular: true,
    },
    {
        id: '5',
        title: 'Business Management Essentials',
        instructor: {
            id: '5',
            name: 'Robert Brown',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
        },
        price: 59.99,
        rating: 4.5,
        reviewCount: 340,
        thumbnail:
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
        category: 'Business',
        level: 'Beginner',
        lessons: 45,
        duration: '18h 10m',
        students: 3400,
    },
    {
        id: '6',
        title: 'Photography Masterclass: A Complete Guide',
        instructor: {
            id: '6',
            name: 'Lisa Taylor',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
        },
        price: 39.99,
        rating: 4.8,
        reviewCount: 980,
        thumbnail:
            'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
        category: 'Photography',
        level: 'Beginner',
        lessons: 62,
        duration: '15h 45m',
        students: 12500,
    },
]
export const CourseListingPage = () => {
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2">
                    <Button variant="outline" disabled>
                        Previous
                    </Button>
                    <Button variant="primary">1</Button>
                    <Button variant="outline">2</Button>
                    <Button variant="outline">3</Button>
                    <span className="flex items-center px-2 text-slate-400">...</span>
                    <Button variant="outline">8</Button>
                    <Button variant="outline">Next</Button>
                </div>
            </div>
        </div>
    )
}
