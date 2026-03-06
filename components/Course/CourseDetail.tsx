"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useRouter } from '@/i18n/routing'
import { useGetCourseByIdQuery } from '@/lib/redux/features/courses/coursesApi'
import { useCreateEnrollmentMutation, useGetMyEnrollmentsQuery } from '@/lib/redux/features/enrollments/enrollmentsApi'
import { useCreateStripeSessionMutation } from '@/lib/redux/features/payments/paymentsApi'
import { selectIsAuthenticated } from '@/lib/redux/features/auth/authSlice'
import { useAppSelector } from '@/lib/redux/hooks'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Rating } from '@/components/ui/Rating'
import { Avatar } from '@/components/ui/Avater'
import {
    BookOpen, Clock, Users, PlayCircle, Star, Shield,
    CheckCircle, Lock, Sparkles, GraduationCap, ArrowRight,
    Heart, Globe, Award, Zap
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Course, User } from '@/types/api'
import { toast } from 'react-hot-toast'
import { ReviewSection } from './ReviewSection'

export const CourseDetail = () => {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string
    const isAuthenticated = useAppSelector(selectIsAuthenticated)

    const { data: course, isLoading, error } = useGetCourseByIdQuery(id)
    const { data: allEnrollments, isLoading: isFetchingEnrollments } = useGetMyEnrollmentsQuery({}, { skip: !isAuthenticated })
    const [createEnrollment, { isLoading: isEnrolling }] = useCreateEnrollmentMutation()
    const [createStripeSession, { isLoading: isCreatingSession }] = useCreateStripeSessionMutation()

    const isEnrolled = React.useMemo(() => {
        if (!allEnrollments || !Array.isArray(allEnrollments)) return false
        return allEnrollments.some((enrollment: any) => {
            const eCourseId = typeof enrollment.courseId === 'object' ? enrollment.courseId?._id : enrollment.courseId
            return String(eCourseId) === String(id)
        })
    }, [allEnrollments, id])

    const isCheckingEnrollment = isFetchingEnrollments

    const handleEnroll = async () => {
        if (!isAuthenticated) { router.push('/login'); return }
        try {
            await createEnrollment(id).unwrap()
            toast.success('Enrolled successfully! Redirecting to dashboard...')
            setTimeout(() => router.push('/dashboard'), 2000)
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to enroll')
        }
    }

    const handlePayment = async () => {
        if (!isAuthenticated) { router.push('/login'); return }
        try {
            const { checkoutUrl } = await createStripeSession({ courseId: id }).unwrap()
            if (checkoutUrl) window.location.href = checkoutUrl
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to initiate payment')
        }
    }

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 space-y-4">
            <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-2 border-slate-800" />
                <div className="absolute inset-0 rounded-full border-2 border-t-cyan-500 animate-spin" />
                <BookOpen className="absolute inset-0 m-auto h-5 w-5 text-cyan-500" />
            </div>
            <p className="text-slate-400 text-sm font-semibold animate-pulse">Loading course details...</p>
        </div>
    )

    if (error || !course) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-center p-4">
            <div className="bg-rose-500/10 border border-rose-500/20 p-10 rounded-3xl max-w-md shadow-2xl">
                <div className="bg-rose-500/15 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Lock className="w-8 h-8 text-rose-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-100 mb-2">Error Loading Course</h2>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">We couldn't find the course you're looking for. Please try again.</p>
                <Button onClick={() => window.location.reload()} variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl">
                    Reload Page
                </Button>
            </div>
        </div>
    )

    const instructor = typeof course.instructorId === 'object'
        ? course.instructorId as User
        : { name: 'Instructor', profilePhoto: '' } as User

    const includes = [
        { icon: <PlayCircle className="h-4 w-4 text-cyan-400" />, text: '42 hours on-demand video' },
        { icon: <BookOpen className="h-4 w-4 text-violet-400" />, text: '15 downloadable resources' },
        { icon: <Globe className="h-4 w-4 text-emerald-400" />, text: 'Full lifetime access' },
        { icon: <Award className="h-4 w-4 text-amber-400" />, text: 'Certificate of completion' },
        { icon: <Shield className="h-4 w-4 text-blue-400" />, text: '30-day money back guarantee' },
    ]

    return (
        <div className="bg-slate-950 min-h-screen">
            {/* ── Hero Section ── */}
            <div className="relative overflow-hidden border-b border-slate-800/60">
                {/* Background blobs */}
                <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-cyan-500/4 rounded-full blur-[140px] -mr-60 -mt-40 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-violet-600/4 rounded-full blur-[120px] -ml-40 -mb-32 pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '32px 32px' }}
                />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            {/* Badges */}
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-bold text-cyan-400 uppercase tracking-wide">
                                    <Zap className="h-3 w-3" />
                                    {course.category}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 border border-slate-700/60 rounded-full text-xs font-bold text-slate-300 uppercase tracking-wide">
                                    {course.level}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                                {course.title}
                            </h1>

                            {/* Description */}
                            <p className="text-slate-400 text-base leading-relaxed line-clamp-3">
                                {course.description}
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-5 items-center">
                                <div className="flex items-center gap-2">
                                    <Rating rating={course.ratingAvg || 0} size="sm" showCount count={120} />
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <Users className="h-4 w-4 text-violet-400" />
                                    <span>{course.totalEnrollments?.toLocaleString()} students</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <Clock className="h-4 w-4 text-cyan-400" />
                                    <span>Updated {new Date(course.updatedAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* Instructor */}
                            <div className="flex items-center gap-3 pt-2">
                                <Avatar src={instructor.profilePhoto} alt={instructor.name} size="md" />
                                <div>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Created by</p>
                                    <p className="font-bold text-slate-200">{instructor.name}</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Thumbnail */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/8 group"
                        >
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-16 w-16 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 shadow-xl">
                                    <PlayCircle className="h-9 w-9 fill-white" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* What You'll Learn */}
                        <motion.section
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="bg-slate-900/60 rounded-2xl border border-slate-800/60 p-7 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/4 rounded-full blur-3xl pointer-events-none" />
                            <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2">
                                <span className="h-7 w-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                                </span>
                                What you'll learn
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {[
                                    'Master core concepts and advanced techniques',
                                    'Build real-world projects from scratch',
                                    'Industry-standard tools and workflows',
                                    'Best practices and design patterns',
                                    'Debugging and problem-solving skills',
                                    'Deploy and ship production-ready code',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800/40 transition-colors">
                                        <CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                                        <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Description */}
                        <motion.section
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                                <span className="h-7 w-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                                    <BookOpen className="h-3.5 w-3.5 text-violet-400" />
                                </span>
                                Course Description
                            </h2>
                            <div className="text-slate-400 leading-relaxed space-y-4 text-sm">
                                <p>{course.description}</p>
                                <p>
                                    Whether you're starting from scratch or looking to refine your expertise,
                                    this course provides a structured path to success. You'll work on real-world
                                    projects, learn industry-standard workflows, and gain the confidence to apply
                                    your new skills immediately.
                                </p>
                            </div>
                        </motion.section>

                        {/* Instructor */}
                        <motion.section
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="bg-slate-900/60 rounded-2xl border border-slate-800/60 p-7 relative overflow-hidden"
                        >
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/4 rounded-full blur-3xl pointer-events-none" />
                            <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                                <span className="h-7 w-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                                    <GraduationCap className="h-3.5 w-3.5 text-amber-400" />
                                </span>
                                Instructor
                            </h2>
                            <div className="flex items-start gap-5">
                                <Avatar src={instructor.profilePhoto} alt={instructor.name} size="lg" />
                                <div className="space-y-3 flex-1">
                                    <div>
                                        <h3 className="text-lg font-black text-white">{instructor.name}</h3>
                                        <p className="text-cyan-400 text-sm font-semibold">Senior Instructor & Professional Creator</p>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center gap-1.5 text-sm text-slate-400">
                                            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                                            <span>4.8 Rating</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-slate-400">
                                            <Users className="h-3.5 w-3.5 text-violet-400" />
                                            <span>2.4k Students</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-slate-400">
                                            <PlayCircle className="h-3.5 w-3.5 text-cyan-400" />
                                            <span>12 Courses</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        With over a decade of experience in the industry, {instructor.name} has coached
                                        thousands of professionals. Their teaching style focuses on practical
                                        applications and clear, actionable insights.
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Reviews */}
                        <ReviewSection
                            courseId={id}
                            isEnrolled={!!isEnrolled}
                            isAuthenticated={isAuthenticated}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="sticky top-24"
                        >
                            <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800/60 shadow-2xl shadow-black/40 overflow-hidden">
                                {/* Price Header */}
                                <div className="p-6 border-b border-slate-800/60 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
                                    <div className="text-3xl font-black text-white mb-1">
                                        ৳{course.price}
                                    </div>
                                    <p className="text-slate-500 text-xs font-semibold">One-time payment · Lifetime access</p>
                                </div>

                                {/* Actions */}
                                <div className="p-6 space-y-3">
                                    {isEnrolled ? (
                                        <div className="space-y-3">
                                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex flex-col items-center gap-2 text-center">
                                                <CheckCircle className="h-7 w-7 text-emerald-400" />
                                                <div>
                                                    <p className="text-emerald-400 font-bold text-sm">Already Enrolled</p>
                                                    <p className="text-slate-500 text-xs mt-0.5">You have full access to this course</p>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => router.push('/dashboard')}
                                                className="w-full h-12 font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white border-none shadow-lg shadow-emerald-500/20 rounded-xl"
                                            >
                                                <PlayCircle className="h-4.5 w-4.5 mr-2" />
                                                Continue Learning
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
                                                className="w-full text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl h-10 font-semibold"
                                            >
                                                <Star className="h-4 w-4 mr-2" />
                                                Leave a Review
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <Button
                                                onClick={handlePayment}
                                                isLoading={isCreatingSession}
                                                disabled={isCheckingEnrollment}
                                                className="w-full h-12 font-bold bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white border-none shadow-lg shadow-cyan-500/20 rounded-xl transition-all duration-300"
                                            >
                                                Buy Now · ৳{course.price}
                                                <ArrowRight className="h-4 w-4 ml-2" />
                                            </Button>
                                            <Button
                                                onClick={handleEnroll}
                                                isLoading={isEnrolling}
                                                disabled={isCheckingEnrollment}
                                                variant="outline"
                                                className="w-full h-12 font-bold border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600 rounded-xl transition-all"
                                            >
                                                Enroll for Free
                                            </Button>
                                        </>
                                    )}

                                    <button className="flex items-center justify-center gap-2 w-full h-9 rounded-xl text-sm text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all font-semibold">
                                        <Heart className="h-4 w-4" />
                                        Save to Wishlist
                                    </button>
                                </div>

                                {/* Course Includes */}
                                <div className="px-6 pb-6 pt-2 border-t border-slate-800/60">
                                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 mt-4">This course includes</p>
                                    <div className="space-y-3">
                                        {includes.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-sm text-slate-400">
                                                {item.icon}
                                                <span>{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
