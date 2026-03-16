"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, PlayCircle, ArrowRight, Sparkles, Globe, Zap, Brain } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Link } from '@/i18n/routing'

const BANNERS = [
    {
        id: 1,
        title: "Master the Future of Web Development",
        subtitle: "Join over 50,000 students learning Next.js 15, React 19, and Modern AI Integration. Stay ahead of the curve with our expert-led masterclasses.",
        image: "/banner-web-dev.png",
        badge: "Leading Platform",
        accent: "from-cyan-500 to-blue-600",
        icon: <Zap className="w-5 h-5" />,
    },
    {
        id: 2,
        title: "Design Systems & UI/UX Mastery",
        subtitle: "From wireframes to premium components. Learn how to build scalable design systems that power world-class applications.",
        image: "/banner-design.png",
        badge: "Premium Content",
        accent: "from-purple-600 to-pink-600",
        icon: <Sparkles className="w-5 h-5" />,
    },
    {
        id: 3,
        title: "Global Community of Lifelong Learners",
        subtitle: "Connect with experts and peers from around the world. Collaborate on real-world projects and build your professional network.",
        image: "/banner-community-abstract.png",
        badge: "Community Choice",
        accent: "from-emerald-500 to-teal-600",
        icon: <Globe className="w-5 h-5" />,
    },
    {
        id: 4,
        title: "AI & Machine Learning Revolution",
        subtitle: "Harness the power of Artificial Intelligence. Learn to build intelligent systems, LLM applications, and predictive models.",
        image: "/banner-ai.png",
        badge: "Trending Tech",
        accent: "from-amber-500 to-orange-600",
        icon: <Brain className="w-5 h-5" />,
    },
]

export const BannerCarousel = () => {
    const [current, setCurrent] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev === BANNERS.length - 1 ? 0 : prev + 1))
    }, [])

    const prevSlide = useCallback(() => {
        setCurrent((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1))
    }, [])

    useEffect(() => {
        if (!isAutoPlaying) return
        const timer = setInterval(nextSlide, 6000)
        return () => clearInterval(timer)
    }, [isAutoPlaying, nextSlide])

    return (
        <section
            className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-slate-950"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {/* Background Image with Parallax Effect */}
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 6, ease: "linear" }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${BANNERS[current].image})` }}
                    />

                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                    {/* Animated Particles/Orbs (Simulated) */}
                    <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px] animate-pulse delay-1000" />

                    <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <Badge
                                    className={`mb-6 bg-gradient-to-r ${BANNERS[current].accent} text-white border-none px-4 py-1.5 flex items-center gap-2 w-fit shadow-lg`}
                                >
                                    {BANNERS[current].icon}
                                    {BANNERS[current].badge}
                                </Badge>

                                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                                    {BANNERS[current].title.split(' ').map((word, i) => (
                                        <span key={i} className="inline-block mr-3">
                                            {word}
                                        </span>
                                    ))}
                                </h1>

                                <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-medium">
                                    {BANNERS[current].subtitle}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Link href="/courses">
                                        <Button
                                            size="lg"
                                            className={`bg-gradient-to-r ${BANNERS[current].accent} hover:brightness-110 border-none px-8 py-6 text-lg shadow-xl shadow-cyan-500/20 group`}
                                        >
                                            Get Started Now
                                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="bg-slate-900/50 backdrop-blur-md border-slate-700 text-white hover:bg-slate-800 px-8 py-6 text-lg group"
                                    >
                                        <PlayCircle className="mr-2 h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                                        Watch Demo
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 left-0 right-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    {/* Dots */}
                    <div className="flex gap-3">
                        {BANNERS.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`h-1.5 transition-all duration-300 rounded-full ${current === index ? 'w-12 bg-cyan-500' : 'w-3 bg-slate-600 hover:bg-slate-500'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Arrows */}
                    <div className="flex gap-4">
                        <button
                            onClick={prevSlide}
                            className="p-3 rounded-full border border-slate-700 bg-slate-900/40 backdrop-blur-md text-white hover:bg-slate-800 transition-all hover:border-slate-500 group"
                        >
                            <ChevronLeft className="w-6 h-6 group-active:scale-90 transition-transform" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-3 rounded-full border border-slate-700 bg-slate-900/40 backdrop-blur-md text-white hover:bg-slate-800 transition-all hover:border-slate-500 group"
                        >
                            <ChevronRight className="w-6 h-6 group-active:scale-90 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Progress Bar for Current Slide */}
            <div className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full z-20">
                <motion.div
                    key={current}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className={`h-full bg-gradient-to-r ${BANNERS[current].accent}`}
                />
            </div>
        </section>
    )
}
