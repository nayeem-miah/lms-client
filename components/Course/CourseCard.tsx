import { Course } from '@/types/types'
import { BookOpen, Clock, Users } from 'lucide-react'
import { Card, CardContent, CardFooter } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Rating } from '../ui/Rating'
import { Avatar } from '../ui/Avater'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

interface CourseCardProps {
    course: Course
}
export const CourseCard = ({ course }: CourseCardProps) => {
    const t = useTranslations('Course')
    return (
        <Link href={`/courses/${course.id}`} className="block h-full cursor-pointer">
            <Card hoverEffect className="h-full flex flex-col overflow-hidden group">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-slate-800">
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                        <Badge
                            variant="secondary"
                            className="bg-slate-900/90 backdrop-blur-sm text-slate-100 border-none shadow-xl"
                        >
                            {course.category}
                        </Badge>
                        {course.isPopular && (
                            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none shadow-xl">
                                {t('popular')}
                            </Badge>
                        )}
                    </div>
                </div>

                <CardContent className="p-5 flex-1 bg-slate-900">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <Clock className="h-3.5 w-3.5 text-cyan-500" />
                            <span>{course.duration}</span>
                            <span>•</span>
                            <BookOpen className="h-3.5 w-3.5 text-purple-500" />
                            <span>{course.lessons} {t('lessons')}</span>
                        </div>
                        <Badge variant="outline" size="sm" className="text-xs font-normal border-slate-700 text-slate-400">
                            {course.level}
                        </Badge>
                    </div>

                    <h3 className="text-lg font-bold text-slate-100 mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
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
                            className="h-6 w-6 ring-1 ring-slate-800"
                        />
                        <span className="text-sm text-slate-400 truncate">
                            {t('by')}{' '}
                            <span className="font-medium text-slate-200">
                                {course.instructor.name}
                            </span>
                        </span>
                    </div>
                </CardContent>

                <CardFooter className="p-5 pt-0 border-t border-slate-800 mt-auto flex items-center justify-between bg-slate-950/50">
                    <div className="flex items-center gap-1.5 text-sm text-slate-400">
                        <Users className="h-4 w-4 text-cyan-600" />
                        <span>{course.students.toLocaleString()} {t('students')}</span>
                    </div>
                    <div className="text-lg font-bold text-cyan-400 font-mono">
                        ৳{course.price}
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}
