"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useGetCourseByIdQuery } from '@/lib/redux/features/courses/coursesApi'
import { useCheckEnrollmentQuery, useCreateEnrollmentMutation } from '@/lib/redux/features/enrollments/enrollmentsApi'
import { useCreateStripeSessionMutation } from '@/lib/redux/features/payments/paymentsApi'
import { selectIsAuthenticated } from '@/lib/redux/features/auth/authSlice'
import { useAppSelector } from '@/lib/redux/hooks'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Rating } from '@/components/ui/Rating'
import { Avatar } from '@/components/ui/Avater'
import { BookOpen, Clock, Users, PlayCircle, Star, Shield, CheckCircle, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Course, User } from '@/types/api'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { ReviewSection } from './ReviewSection'

export const CourseDetail = () => {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string
    const isAuthenticated = useAppSelector(selectIsAuthenticated)

    const { data: course, isLoading, error } = useGetCourseByIdQuery(id)
    const { data: enrollmentInfo, isLoading: isCheckingEnrollment } = useCheckEnrollmentQuery(id, { skip: !isAuthenticated })
    const [createEnrollment, { isLoading: isEnrolling }] = useCreateEnrollmentMutation()
    const [createStripeSession, { isLoading: isCreatingSession }] = useCreateStripeSessionMutation()

    const handleEnroll = async () => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }
        try {
            await createEnrollment(id).unwrap()
            toast.success('Enrolled successfully! Redirecting to dashboard...')
            setTimeout(() => {
                router.push('/dashboard')
            }, 2000)
        } catch (err: any) {
            console.error('Failed to enroll:', err)
            toast.error(err?.data?.message || 'Failed to enroll')
        }
    }

    const handlePayment = async () => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }
        try {
            const { checkoutUrl } = await createStripeSession({ courseId: id }).unwrap()
            if (checkoutUrl) {
                window.location.href = checkoutUrl
            }
        } catch (err: any) {
            console.error('Payment session creation failed:', err)
            toast.error(err?.data?.message || 'Failed to initiate payment')
        }
    }

    if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading course details...</div>
    if (error || !course) return <div className="flex items-center justify-center min-h-screen text-red-500">Course not found.</div>

    const isEnrolled = enrollmentInfo?.isEnrolled;
    const instructor = typeof course.instructorId === 'object'
        ? course.instructorId as User
        : { name: 'Instructor', profilePhoto: '' } as User;

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-slate-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <div className="flex gap-3">
                                <Badge className="bg-primary-500 text-white border-none">{course.category}</Badge>
                                <Badge variant="outline" className="border-slate-700 text-slate-300">{course.level}</Badge>
                            </div>
                            <h1 className="text-4xl font-bold leading-tight">{course.title}</h1>
                            <p className="text-slate-400 text-lg line-clamp-3">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap gap-6 items-center pt-2">
                                <div className="flex items-center gap-2">
                                    <Rating rating={course.ratingAvg || 0} size="sm" showCount count={120} />
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <Users className="h-4 w-4" />
                                    <span>{course.totalEnrollments?.toLocaleString()} students enrolled</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-300">
                                    <Clock className="h-4 w-4" />
                                    <span>Last updated {new Date(course.updatedAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-4">
                                <Avatar src={instructor.profilePhoto} alt={instructor.name} size="md" />
                                <div>
                                    <p className="text-xs text-slate-500">Created by</p>
                                    <p className="font-medium text-slate-200">{instructor.name}</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                        >
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group cursor-pointer">
                                <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                    <PlayCircle className="h-12 w-12 fill-white" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">What you'll learn</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span className="text-slate-600 text-sm">Comprehensive understanding of core concepts and advanced techniques in the field.</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Description</h2>
                            <div className="prose prose-slate max-w-none text-slate-600">
                                {course.description}
                                <p className="mt-4">
                                    Whether you're starting from scratch or looking to refine your expertise, this course provides a structured path to success. You'll work on real-world projects, learn industry-standard workflows, and gain the confidence to apply your new skills immediately.
                                </p>
                            </div>
                        </section>

                        <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Instructor Details</h2>
                            <div className="flex items-start gap-6">
                                <Avatar src={instructor.profilePhoto} alt={instructor.name} size="lg" />
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">{instructor.name}</h3>
                                        <p className="text-primary-600 text-sm font-medium">Senior Instructor & Professional Creator</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                            <span>4.8 Rating</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                            <Users className="h-4 w-4" />
                                            <span>2.4k Students</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                            <PlayCircle className="h-4 w-4" />
                                            <span>12 Courses</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        With over a decade of experience in the industry, {instructor.name} has coached thousands of professionals. Their teaching style focuses on practical applications and clear, actionable insights.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <ReviewSection
                            courseId={id}
                            isEnrolled={!!isEnrolled}
                            isAuthenticated={isAuthenticated}
                        />
                    </div>

                    {/* Sidebar Purchase Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white rounded-2xl p-8 border border-slate-100 shadow-xl space-y-6">
                            <div className="flex flex-col gap-3">
                                {isEnrolled ? (
                                    <Button
                                        onClick={() => router.push(`/dashboard`)}
                                        variant="outline"
                                        className="w-full h-12 text-md font-bold shadow-lg"
                                    >
                                        <span className="flex items-center gap-2">
                                            <PlayCircle className="h-5 w-5" />
                                            Go to Course
                                        </span>
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            onClick={handlePayment}
                                            isLoading={isCreatingSession}
                                            className="w-full h-12 text-md font-bold shadow-lg shadow-primary-500/20"
                                            variant="outline"
                                        >
                                            Create Payment ({course.price})
                                        </Button>
                                        <Button
                                            onClick={handleEnroll}
                                            isLoading={isEnrolling}
                                            variant="outline"
                                            className="w-full h-12 text-md font-bold"
                                        >
                                            Enroll Now
                                        </Button>
                                    </>
                                )}
                            </div>
                            <Button variant="ghost" className="w-full h-10 text-slate-500">
                                <Star className="h-4 w-4 mr-2" />
                                Save to Wishlist
                            </Button>

                            <div className="pt-6 space-y-4 border-t border-slate-100">
                                <p className="text-sm font-semibold text-slate-900">This course includes:</p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <PlayCircle className="h-4 w-4" />
                                        <span>42 hours on-demand video</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <BookOpen className="h-4 w-4" />
                                        <span>15 downloadable resources</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <Shield className="h-4 w-4" />
                                        <span>Full lifetime access</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <CheckCircle className="h-4 w-4" />
                                        <span>Certificate of completion</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
