import { Course } from '@/types/types'
import { BookOpen, Clock, Users, Star, ArrowRight, Play, Sparkles } from 'lucide-react'
import { Card, CardContent, CardFooter } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Rating } from '../ui/Rating'
import { Avatar } from '../ui/Avater'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

interface CourseCardProps {
    course: Course
}
export const CourseCard = ({ course }: CourseCardProps) => {
    const t = useTranslations('Course')
    return (
        <Link href={`/courses/${course.id}`} className="block h-full group">
            <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="h-full"
            >
                <Card className="h-full flex flex-col overflow-hidden bg-slate-900 border-slate-800/50 group-hover:border-cyan-500/30 transition-all duration-500 shadow-2xl relative">
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-slate-800">
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                        {/* Status Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                            <Badge
                                variant="secondary"
                                className="bg-slate-950/80 backdrop-blur-md text-slate-100 border-slate-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 italic"
                            >
                                {course.category}
                            </Badge>
                            {course.isPopular && (
                                <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-none shadow-lg text-[10px] font-black uppercase tracking-widest px-3 py-1 italic flex items-center gap-1">
                                    <Sparkles size={10} />
                                    {t('popular')}
                                </Badge>
                            )}
                        </div>

                        {/* Play Button Icon on Hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                            <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                                <Play className="fill-white text-white ml-1 w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    <CardContent className="p-6 flex-1 bg-slate-900 flex flex-col relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3 text-[10px] text-slate-500 font-black tracking-[0.1em] uppercase italic">
                                <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3 text-cyan-500" />
                                    <span>{course.duration}</span>
                                </div>
                                <span className="text-slate-800">•</span>
                                <div className="flex items-center gap-1">
                                    <BookOpen className="h-3 w-3 text-purple-500" />
                                    <span>{course.lessons} {t('lessons')}</span>
                                </div>
                            </div>
                            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
                                {course.level}
                            </span>
                        </div>

                        <h3 className="text-xl font-black text-slate-100 mb-4 line-clamp-2 leading-snug group-hover:text-cyan-400 transition-colors italic tracking-tight uppercase">
                            {course.title}
                        </h3>

                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex items-center gap-1 bg-slate-950/50 px-2 py-1 rounded-lg border border-slate-800">
                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                <span className="text-sm font-black text-slate-200">{course.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-xs text-slate-500 font-medium font-mono">({course.reviewCount}) reviews</span>
                        </div>

                        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-slate-800/50">
                            <Avatar
                                src={course.instructor.avatar}
                                alt={course.instructor.name}
                                size="sm"
                                className="h-8 w-8 ring-2 ring-slate-800 grayscale group-hover:grayscale-0 transition-all"
                            />
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{t('by')}</span>
                                <span className="text-sm font-black text-slate-200 italic leading-none group-hover:text-cyan-400 transition-colors">
                                    {course.instructor.name}
                                </span>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="px-6 py-5 border-t border-slate-800/80 mt-auto flex items-center justify-between bg-slate-950/40 backdrop-blur-sm">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">{t('students')}</span>
                            <div className="flex items-center gap-1.5 text-sm font-black text-slate-300 italic">
                                <Users className="h-4 w-4 text-cyan-600" />
                                <span>{course.students.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-2xl font-black text-cyan-400 font-mono italic">
                                ৳{course.price}
                            </span>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </Link>
    )
}
