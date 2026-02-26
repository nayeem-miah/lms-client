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
} from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

// Mock Data
const featuredCourses: Course[] = [
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
]
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

export const LandingPage = () => {
    const t = useTranslations('LandingPage')
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-950 pt-16 pb-20 lg:pt-24 lg:pb-28">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-5" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-900" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                        >
                            <Badge variant="accent" className="mb-6">
                                {t('newBadge')}
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                                {t('heroTitle')}
                            </h1>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                {t('heroSubtitle')}
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/courses">
                                    <Button size="lg" className="w-full sm:w-auto text-base px-8 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border-none shadow-lg shadow-cyan-500/20">
                                        {t('exploreCourses')}
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full sm:w-auto text-base px-8 border-slate-600 text-white hover:bg-slate-800 hover:text-white hover:border-slate-500"
                                    >
                                        {t('startFreeTrial')}
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>


                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 border-t border-slate-800 pt-8">
                        {[
                            {
                                label: t('stats.activeStudents'),
                                value: '50k+',
                                icon: Users,
                            },
                            {
                                label: t('stats.totalCourses'),
                                value: '1,200+',
                                icon: BookOpen,
                            },
                            {
                                label: t('stats.expertInstructors'),
                                value: '300+',
                                icon: Award,
                            },
                            {
                                label: t('stats.courseRating'),
                                value: '4.8/5',
                                icon: Star,
                            },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: 0.2 + index * 0.1,
                                }}
                                className="flex flex-col items-center justify-center text-center"
                            >
                                <div className="mb-2 rounded-full bg-slate-800 p-3 text-primary-400">
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <div className="text-2xl font-bold text-white">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Courses */}
            <section className="py-20 bg-slate-900 border-t border-slate-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-100 mb-2">
                                {t('featuredCourses.title')}
                            </h2>
                            <p className="text-slate-400">
                                {t('featuredCourses.subtitle')}
                            </p>
                        </div>
                        <Link href="/courses">
                            <Button
                                variant="ghost"
                                className="hidden sm:inline-flex text-cyan-400 hover:text-cyan-300 hover:bg-slate-800"
                                rightIcon={<ArrowRight className="h-4 w-4" />}
                            >
                                {t('featuredCourses.viewAll')}
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCourses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    delay: index * 0.1,
                                }}
                            >
                                <CourseCard course={course} />
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 text-center sm:hidden">
                        <Link href="/courses">
                            <Button variant="outline" className="w-full">
                                {t('featuredCourses.viewAllCourses')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-slate-800/30 border-t border-slate-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-100 mb-4">
                            {t('howItWorks.title')}
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            {t('howItWorks.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                title: t('howItWorks.step1.title'),
                                description: t('howItWorks.step1.description'),
                                icon: CheckCircle,
                            },
                            {
                                title: t('howItWorks.step2.title'),
                                description: t('howItWorks.step2.description'),
                                icon: PlayCircle,
                            },
                            {
                                title: t('howItWorks.step3.title'),
                                description: t('howItWorks.step3.description'),
                                icon: Award,
                            },
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="mb-6 rounded-2xl bg-slate-900 p-6 text-cyan-500 border border-slate-700 group-hover:border-cyan-500/50 transition-all shadow-xl">
                                    <step.icon className="h-10 w-10" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-100 mb-3 italic">
                                    {step.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-20 bg-slate-900 border-t border-slate-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-100 mb-4">
                            {t('pricing.title')}
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            {t('pricing.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                }}
                                transition={{
                                    delay: index * 0.1,
                                }}
                                className="h-full"
                            >
                                <PricingCard plan={plan} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Instructor CTA */}
            <section className="py-20 bg-slate-950 border-t border-slate-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 px-6 py-16 sm:p-16 md:p-20 overflow-hidden relative">
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-cyan-500 rounded-full opacity-10 blur-3xl" />
                        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-600 rounded-full opacity-10 blur-3xl" />

                        <div className="relative z-10 text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-slate-100 mb-6 italic">
                                {t('instructor.title')}
                            </h2>
                            <p className="text-lg text-slate-400 mb-8">
                                {t('instructor.subtitle')}
                            </p>
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-none shadow-xl shadow-purple-500/20 px-10"
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
