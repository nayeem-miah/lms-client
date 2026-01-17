import { Course } from '@/types/types'
import { BookOpen, Clock, Users } from 'lucide-react'
import { Card, CardContent, CardFooter } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Rating } from '../ui/Rating'
import { Avatar } from '../ui/Avater'

interface CourseCardProps {
    course: Course
}
export const CourseCard = ({ course }: CourseCardProps) => {
    return (
        <Card hoverEffect className="h-full flex flex-col overflow-hidden group">
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                    <Badge
                        variant="secondary"
                        className="bg-white/90 backdrop-blur-sm text-slate-900 shadow-sm"
                    >
                        {course.category}
                    </Badge>
                    {course.isPopular && (
                        <Badge variant="accent" className="shadow-sm">
                            Popular
                        </Badge>
                    )}
                </div>
            </div>

            <CardContent className="flex-1 p-5">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{course.duration}</span>
                        <span>•</span>
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>{course.lessons} lessons</span>
                    </div>
                    <Badge variant="outline" size="sm" className="text-xs font-normal">
                        {course.level}
                    </Badge>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {course.title}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                    <Rating
                        rating={course.rating}
                        size="sm"
                        showCount
                        count={course.reviewCount}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Avatar
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        size="sm"
                        className="h-6 w-6"
                    />
                    <span className="text-sm text-slate-600 truncate">
                        by{' '}
                        <span className="font-medium text-slate-900">
                            {course.instructor.name}
                        </span>
                    </span>
                </div>
            </CardContent>

            <CardFooter className="p-5 pt-0 border-t border-slate-100 mt-auto flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="text-lg font-bold text-primary-600">
                    ${course.price}
                </div>
            </CardFooter>
        </Card>
    )
}
