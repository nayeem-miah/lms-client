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
import Link from 'next/link'

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
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-900 pt-16 pb-20 lg:pt-24 lg:pb-28">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10" />
                <div className="absolute inset-0  from-slate-900/80 to-slate-900" />

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
                                New: AI-Powered Learning Paths
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                                Master New Skills with{' '}
                                <span className="text-primary-400">Expert-Led</span> Courses
                            </h1>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                Unlock your potential with our comprehensive library of courses.
                                Learn from industry experts and get certified in development,
                                design, business, and more.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/courses">
                                    <Button size="lg" className="w-full sm:w-auto text-base px-8">
                                        Explore Courses
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full sm:w-auto text-base px-8 border-slate-600 text-white hover:bg-slate-800 hover:text-white hover:border-slate-500"
                                    >
                                        Start Free Trial
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 border-t border-slate-800 pt-8">
                        {[
                            {
                                label: 'Active Students',
                                value: '50k+',
                                icon: Users,
                            },
                            {
                                label: 'Total Courses',
                                value: '1,200+',
                                icon: BookOpen,
                            },
                            {
                                label: 'Expert Instructors',
                                value: '300+',
                                icon: Award,
                            },
                            {
                                label: 'Course Rating',
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
            <section className="py-20 bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">
                                Featured Courses
                            </h2>
                            <p className="text-slate-600">
                                Hand-picked courses to get you started
                            </p>
                        </div>
                        <Link href="/courses">
                            <Button
                                variant="ghost"
                                className="hidden sm:inline-flex"
                                rightIcon={<ArrowRight className="h-4 w-4" />}
                            >
                                View All
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
                                View All Courses
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Start your learning journey in three simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                title: '1. Choose a Plan',
                                description:
                                    'Select a subscription plan that fits your needs or buy individual courses.',
                                icon: CheckCircle,
                            },
                            {
                                title: '2. Start Learning',
                                description:
                                    'Access high-quality video lessons, quizzes, and projects anytime, anywhere.',
                                icon: PlayCircle,
                            },
                            {
                                title: '3. Get Certified',
                                description:
                                    'Complete courses and earn certificates to showcase your new skills.',
                                icon: Award,
                            },
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="mb-6 rounded-full bg-primary-50 p-6 text-primary-600">
                                    <step.icon className="h-10 w-10" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-20 bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Choose the plan that's right for you. Cancel anytime.
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
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl bg-primary-600 px-6 py-16 sm:p-16 md:p-20 overflow-hidden relative">
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary-500 rounded-full opacity-50 blur-3xl" />
                        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-primary-700 rounded-full opacity-50 blur-3xl" />

                        <div className="relative z-10 text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-black mb-6">
                                Become an Instructor
                            </h2>
                            <p className="text-lg text-black mb-8">
                                Share your knowledge with millions of students worldwide. Join
                                our community of expert instructors and earn money doing what
                                you love.
                            </p>
                            <Button
                                size="lg"
                                variant="secondary"
                                className="bg-white text-primary-600 hover:bg-slate-100"
                            >
                                Start Teaching Today
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
