"use client"
/* eslint-disable react/no-unescaped-entities */
import { CourseCard } from '@/components/Course/CourseCard'
import { PricingCard } from '@/components/Course/PricingCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Course, SubscriptionPlan } from '@/types/types'
import { motion } from 'framer-motion'
import {
    ArrowRight,
    CheckCircle,
    PlayCircle,
    Star,
    Users,
    Award,
    BookOpen,
    Code,
    Smartphone,
    Database,
    Brain,
    Layout,
    BarChart,
    Quote,
    Mail,
    ChevronRight,
    Plus,
    Minus,
} from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { BannerCarousel } from './BannerCarousel'
import { useGetAllCoursesQuery } from '@/lib/redux/features/courses/coursesApi'
import { useGetAllUsersQuery } from '@/lib/redux/features/users/usersApi'
import { useMemo, useState } from 'react'

// Mock Data
const plans: SubscriptionPlan[] = [
    {
        id: 'basic',
        name: 'Basic',
        price: 0,
        interval: 'month',
        features: [
            'Access to free courses',
            'Community support',
            'Basic progress tracking',
            'Mobile app access',
        ],
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 29,
        interval: 'month',
        features: [
            'Unlimited access to all courses',
            'Certificate of completion',
            'Offline downloads',
            'Priority support',
            'Exclusive workshops',
        ],
        isPopular: true,
    },
    {
        id: 'team',
        name: 'Team',
        price: 99,
        interval: 'month',
        features: [
            '5 team member accounts',
            'Team analytics dashboard',
            'SSO integration',
            'Dedicated account manager',
            'Custom learning paths',
        ],
    },
]

const categories = [
    { name: 'Web Development', icon: Code, color: 'bg-blue-500', courses: '150+' },
    { name: 'Mobile App', icon: Smartphone, color: 'bg-purple-500', courses: '80+' },
    { name: 'Data Science', icon: Database, color: 'bg-cyan-500', courses: '120+' },
    { name: 'Artificial Intelligence', icon: Brain, color: 'bg-pink-500', courses: '60+' },
    { name: 'UI/UX Design', icon: Layout, color: 'bg-indigo-500', courses: '90+' },
    { name: 'Digital Marketing', icon: BarChart, color: 'bg-emerald-500', courses: '110+' },
]

const testimonials = [
    {
        name: 'Alex Johnson',
        role: 'Full Stack Developer',
        content: 'This platform changed my life. I went from knowing nothing to landing a job at a top tech company in just 6 months.',
        avatar: '/avatars/user1.jpg'
    },
    {
        name: 'Sarah Chen',
        role: 'UX Designer',
        content: 'The quality of the instructors is unmatched. The practical projects helped me build a portfolio that stood out.',
        avatar: '/avatars/user2.jpg'
    },
    {
        name: 'Michael Smith',
        role: 'Data Scientist',
        content: 'Comprehensive curriculum and community support. I highly recommend EduLearn to anyone serious about their career.',
        avatar: '/avatars/user3.jpg'
    }
]

const faqs = [
    {
        question: 'Are the courses self-paced?',
        answer: 'Yes, all our recorded courses are completely self-paced. You can start, pause, and resume your learning anytime from any device. Your progress is automatically saved.'
    },
    {
        question: 'Do I get a certificate after completion?',
        answer: 'Absolutely! Upon successful completion of a course and its associated projects, you will receive a verifiable digital certificate. You can easily share this on LinkedIn, or download it as a PDF.'
    },
    {
        question: 'Can I cancel my subscription anytime?',
        answer: 'Yes, you can cancel your subscription at any time with a single click from your account settings. You will continue to have full access until the end of your current billing cycle.'
    },
    {
        question: 'Is there a money-back guarantee?',
        answer: 'We offer a 30-day money-back guarantee for all individual course purchases if you are not satisfied with the content. Subscription plans also have a 7-day trial period.'
    },
    {
        question: 'Can I interact with instructors?',
        answer: 'Yes! Each course has a dedicated Q&A section where you can post questions and interact with both instructors and fellow students. We also host live community workshops.'
    }
]

export const LandingPage = () => {
    const t = useTranslations('LandingPage')

    const { data: coursesData, isLoading: isCoursesLoading } = useGetAllCoursesQuery({ limit: 6, sort: '-createdAt' })
    const { data: studentsData } = useGetAllUsersQuery({ role: 'STUDENT', limit: 1 })
    const { data: instructorsData } = useGetAllUsersQuery({ role: 'INSTRUCTOR', limit: 1 })

    const courses = useMemo(() => {
        if (!coursesData?.courses || !Array.isArray(coursesData.courses)) return []

        return coursesData.courses.map((apiCourse: any) => {
            const instructor = (apiCourse.instructorId && typeof apiCourse.instructorId === 'object')
                ? apiCourse.instructorId
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
    }, [coursesData])
    console.log("coursesData", coursesData)

    const stats = useMemo(() => {

        const totalCourses = coursesData?.meta?.total || courses.length;
        const totalStudents = studentsData?.meta?.total || courses.reduce((sum, c) => sum + (c.students || 0), 0);
        const uniqueInstructors = instructorsData?.meta?.total || new Set(courses.map(c => c.instructor.id)).size;
        const avgRating = courses.length > 0
            ? (courses.reduce((sum, c) => sum + (c.rating || 0), 0) / courses.length).toFixed(1)
            : '4.8';

        return [
            { label: t('stats.activeStudents'), value: `${totalStudents}+`, icon: Users, color: 'text-cyan-400' },
            { label: t('stats.totalCourses'), value: `${totalCourses}+`, icon: BookOpen, color: 'text-purple-400' },
            { label: t('stats.expertInstructors'), value: `${uniqueInstructors}+`, icon: Award, color: 'text-pink-400' },
            { label: t('stats.courseRating'), value: `${avgRating}/5`, icon: Star, color: 'text-yellow-400' },
        ];
    }, [coursesData, studentsData, instructorsData, courses, t]);

    const [openFaq, setOpenFaq] = useState<number | null>(null)

    return (
        <div className="flex flex-col min-h-screen bg-slate-950 overflow-x-hidden">
            {/* Hero Section */}
            <div className="relative">
                <BannerCarousel />
            </div>

            {/* Trusted By Section - More premium look */}
            <section className="bg-slate-950 py-20 border-b border-slate-900 overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="md:w-1/4">
                            <p className="text-sm font-black text-slate-500 uppercase tracking-[0.3em] italic text-center md:text-left leading-relaxed">
                                {t('trustedBy.title')}
                            </p>
                        </div>
                        <div className="md:w-3/4 flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60">
                            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Tesla'].map((company) => (
                                <span key={company} className="text-2xl md:text-3xl font-black text-slate-400 hover:text-cyan-400 cursor-default uppercase italic tracking-tighter transition-all duration-300 hover:scale-110">
                                    {company}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Stats Section */}
            <section className="bg-slate-900 py-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.03),transparent)] pointer-events-none"></div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    {isCoursesLoading ? (
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-48 rounded-[2.5rem] bg-slate-800/50 animate-pulse border border-slate-700/50" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="relative group p-10 rounded-[2.5rem] bg-slate-950/60 border border-slate-800 hover:border-cyan-500/30 transition-all duration-500 text-center shadow-2xl backdrop-blur-sm"
                                >
                                    <div className={`mb-6 inline-flex rounded-2xl bg-slate-900/50 p-5 ${stat.color} border border-slate-800 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                                        <stat.icon className="h-8 w-8" />
                                    </div>
                                    <div className="text-4xl font-black text-white italic tracking-tighter mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Categories Selection */}
            <section className="py-32 bg-slate-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] -mr-48 -mt-48 transition-opacity duration-1000"></div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-24">
                        <div className="inline-block mb-4">
                            <span className="px-5 py-2 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-cyan-400 italic">Curated Learning</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-100 mb-6 italic tracking-tight uppercase">
                            {t('categories.title')}
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                            {t('categories.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((cat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="h-full bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-10 text-center transition-all duration-500 hover:bg-slate-900 hover:border-cyan-500/40 hover:-translate-y-3 shadow-2xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className={`mb-8 mx-auto w-16 h-16 rounded-2xl ${cat.color} bg-opacity-10 flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 relative z-10 shadow-lg`}>
                                        <cat.icon className={`h-8 w-8 ${cat.color.replace('bg-', 'text-')}`} />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-200 uppercase tracking-tighter mb-2 relative z-10 leading-tight">{cat.name}</h3>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] relative z-10">{cat.courses} Courses</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-32 bg-slate-900 relative">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none"></div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="lg:w-1/2">
                            <div className="inline-block mb-6">
                                <span className="px-5 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-purple-400 italic">Advanced Learning Engine</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-black text-slate-100 mb-10 italic tracking-tight uppercase leading-[1.1]">
                                Why Choose <span className="text-cyan-400">EduLearn</span> Platform?
                            </h2>
                            <p className="text-xl text-slate-400 mb-12 font-medium leading-[1.8]">
                                We combine industry-leading technology with expert pedagogy to deliver a learning experience that actually sticks. Our approach is data-driven and student-centric.
                            </p>
                            <div className="space-y-8">
                                {[
                                    { title: 'AI-Powered Learning Paths', desc: 'Personalized course recommendations based on your professional goals.', icon: Brain, color: 'text-cyan-400' },
                                    { title: 'Live Mentorship Sessions', desc: 'Direct access to industry leads for code reviews and career advice.', icon: Award, color: 'text-purple-400' },
                                    { title: 'Project-First Curriculum', desc: 'Build production-grade applications that actually matter.', icon: Code, color: 'text-pink-400' },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 group">
                                        <div className="flex-shrink-0 w-16 h-16 rounded-[1.5rem] bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                                            <item.icon className={`h-7 w-7 ${item.color}`} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-slate-100 italic mb-2 tracking-tight">{item.title}</h4>
                                            <p className="text-slate-400 text-base font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="absolute -inset-10 bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 blur-[100px] opacity-20 rounded-full"></div>
                                <div className="relative bg-slate-950 border border-slate-800 rounded-[3.5rem] p-10 shadow-3xl overflow-hidden group">
                                    <div className="aspect-video bg-slate-900 rounded-[2rem] flex items-center justify-center overflow-hidden border border-slate-800 relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                                        <div className="w-20 h-20 rounded-full bg-cyan-600 flex items-center justify-center text-white shadow-[0_0_50px_rgba(6,182,212,0.4)] group-hover:scale-125 transition-all duration-500 cursor-pointer relative z-10 group-hover:bg-cyan-500">
                                            <PlayCircle size={40} className="fill-current" />
                                        </div>
                                    </div>
                                    <div className="mt-10 grid grid-cols-2 gap-6">
                                        <div className="p-8 bg-slate-900/50 rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors">
                                            <div className="text-4xl font-black text-white italic mb-2 tracking-tighter">98.4%</div>
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Student Satisfaction</div>
                                        </div>
                                        <div className="p-8 bg-slate-900/50 rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors">
                                            <div className="text-4xl font-black text-white italic mb-2 tracking-tighter">&lt; 15m</div>
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Support Response</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Courses Section */}
            <section className="py-32 bg-slate-950 border-y border-slate-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <div className="inline-block mb-4">
                                <span className="px-5 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-cyan-400 italic">Premium Courses</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-100 mb-4 italic tracking-tight uppercase leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                                {t('featuredCourses.title')}
                            </h2>
                            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                                {t('featuredCourses.subtitle')}
                            </p>
                        </div>
                        <Link href="/courses">
                            <Button
                                size="lg"
                                className="text-cyan-400 border-slate-800 hover:bg-slate-800/50 hover:border-cyan-500/30 px-8 py-6 h-auto text-sm font-black uppercase italic tracking-widest"
                                variant="outline"
                                rightIcon={<ArrowRight size={18} />}
                            >
                                {t('featuredCourses.viewAll')}
                            </Button>
                        </Link>
                    </div>

                    {isCoursesLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-[450px] bg-slate-900 animate-pulse rounded-[2.5rem] border border-slate-800 shadow-xl" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {courses.map((course, index) => (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                >
                                    <CourseCard course={course} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-32 bg-slate-900 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-600/5 rounded-full blur-[200px] pointer-events-none"></div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-24">
                        <div className="inline-block mb-4">
                            <span className="px-5 py-2 bg-slate-800 border border-slate-700 rounded-full text-[10px] font-black uppercase tracking-widest text-cyan-400 italic">Strategic Framework</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-100 mb-8 italic tracking-tight uppercase leading-tight">
                            {t('howItWorks.title')}
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                            {t('howItWorks.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 relative">
                        {/* Connected path (desktop only) */}
                        <div className="hidden md:block absolute top-[4.5rem] left-0 w-full px-20 z-0">
                            <div className="w-full h-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
                        </div>

                        {[
                            { title: t('howItWorks.step1.title'), description: t('howItWorks.step1.description'), icon: CheckCircle, color: 'from-cyan-500/20 to-blue-600/20', textColor: 'text-cyan-400' },
                            { title: t('howItWorks.step2.title'), description: t('howItWorks.step2.description'), icon: PlayCircle, color: 'from-purple-500/20 to-pink-600/20', textColor: 'text-purple-400' },
                            { title: t('howItWorks.step3.title'), description: t('howItWorks.step3.description'), icon: Award, color: 'from-orange-500/20 to-red-600/20', textColor: 'text-orange-400' },
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="flex flex-col items-center text-center group relative z-10"
                            >
                                <div className="relative mb-12">
                                    <div className={`w-32 h-32 rounded-[2.5rem] bg-gradient-to-br ${step.color} p-[1px] group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-3xl`}>
                                        <div className="w-full h-full rounded-[2.5rem] bg-slate-950 flex items-center justify-center relative overflow-hidden">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                                            <step.icon className={`h-12 w-12 ${step.textColor} relative z-10 group-hover:scale-110 transition-transform`} />
                                        </div>
                                    </div>
                                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-sm font-black text-white italic shadow-2xl">
                                        0{index + 1}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-slate-100 mb-4 italic tracking-tight uppercase group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
                                    {step.title}
                                </h3>
                                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xs mx-auto mb-6">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-32 bg-slate-950 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] -ml-40 -mb-40 pointer-events-none"></div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-24">
                        <div className="inline-block mb-4">
                            <span className="px-5 py-2 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-purple-400 italic">User Experiences</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-100 mb-8 italic tracking-tight uppercase leading-tight">
                            {t('testimonials.title')}
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                            {t('testimonials.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {testimonials.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-slate-900/40 border border-slate-800 rounded-[3rem] p-12 relative group hover:border-cyan-500/20 transition-all duration-700 shadow-3xl hover:shadow-cyan-500/5 backdrop-blur-sm"
                            >
                                <Quote className="absolute top-12 right-12 h-16 w-16 text-slate-800 group-hover:text-cyan-500/10 transition-colors duration-700 rotate-12" />
                                <div className="flex items-center gap-6 mb-10">
                                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[2px] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                                        <div className="h-full w-full rounded-2xl bg-slate-950 flex items-center justify-center overflow-hidden">
                                            <Users size={30} className="text-cyan-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-slate-100 italic tracking-tight mb-1 leading-tight">{item.name}</h4>
                                        <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">{item.role}</p>
                                    </div>
                                </div>
                                <p className="text-xl text-slate-400 leading-[1.8] font-medium italic opacity-80">"{item.content}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-32 bg-slate-900 border-y border-slate-800 relative z-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-24">
                        <div className="inline-block mb-4">
                            <span className="px-5 py-2 bg-slate-950 border border-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-cyan-400 italic">Investment Plans</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-100 mb-8 italic tracking-tight uppercase leading-tight">
                            {t('pricing.title')}
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                            {t('pricing.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto items-stretch">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="h-full"
                            >
                                <PricingCard plan={plan} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-40 bg-slate-950 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] -ml-60 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[150px] -mr-40 pointer-events-none"></div>

                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-24">
                        <div className="inline-block mb-4">
                            <span className="px-5 py-2 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-cyan-400 italic">Support Excellence</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-100 mb-6 italic tracking-tight uppercase leading-tight">
                            {t('faq.title')}
                        </h2>
                        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                            {t('faq.subtitle')}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className={`rounded-[2.5rem] overflow-hidden transition-all duration-700 ${openFaq === index ? 'bg-slate-900 border-cyan-500/30 ring-1 ring-cyan-500/10' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 shadow-xl'} border`}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full px-12 py-10 text-left flex justify-between items-center group relative overflow-hidden h-full"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-cyan-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <span className={`text-2xl font-black italic tracking-tight transition-all duration-500 leading-tight relative z-10 ${openFaq === index ? 'text-cyan-400' : 'text-slate-200'} group-hover:text-cyan-400`}>
                                        {faq.question}
                                    </span>
                                    <div className={`flex-shrink-0 ml-8 p-3 rounded-2xl transition-all duration-700 relative z-10 ${openFaq === index ? 'bg-cyan-500/10 text-cyan-400 rotate-180 scale-110 shadow-lg' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700 group-hover:text-cyan-400 group-hover:scale-110'}`}>
                                        {openFaq === index ? <Minus size={24} /> : <Plus size={24} />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className="px-12 pb-12 text-slate-400 font-medium leading-[2] text-xl border-t border-slate-800/50 pt-8 bg-slate-900/50">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Teaching CTA Section */}
            <section className="py-24 bg-slate-950 relative overflow-hidden group">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="rounded-[4rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 px-8 py-24 sm:py-32 overflow-hidden relative shadow-4xl group-hover:border-cyan-500/10 transition-all duration-1000">
                        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-[600px] h-[600px] bg-cyan-500 rounded-full opacity-5 blur-[120px] transition-all duration-1000 group-hover:opacity-10 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-[600px] h-[600px] bg-purple-600 rounded-full opacity-5 blur-[120px] transition-all duration-1000 group-hover:opacity-10 pointer-events-none" />

                        <div className="relative z-10 text-center max-w-3xl mx-auto">
                            <div className="inline-block mb-8">
                                <span className="px-6 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-black text-cyan-400 uppercase tracking-[0.3em] italic animate-pulse">Join Our Faculty</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-white mb-10 italic tracking-tighter uppercase leading-[1] text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                                {t('instructor.title')}
                            </h2>
                            <p className="text-xl md:text-2xl text-slate-400 mb-16 font-medium leading-[1.8] opacity-80">
                                {t('instructor.subtitle')}
                            </p>
                            <Button
                                size="lg"
                                className="bg-cyan-600 hover:bg-cyan-500 text-white border-none shadow-[0_20px_50px_rgba(6,182,212,0.3)] px-16 py-10 h-auto text-xl font-black uppercase italic tracking-widest active:scale-95 transition-all duration-500 group-hover:shadow-[0_25px_60px_rgba(6,182,212,0.4)]"
                            >
                                {t('instructor.button')}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
