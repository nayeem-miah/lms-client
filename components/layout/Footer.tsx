"use client"
import {
    BookOpen,
    Facebook,
    Instagram,
    Linkedin,
    Twitter
} from 'lucide-react'
import Link from 'next/link'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'


export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Brand & Newsletter */}
                    <div className="space-y-8 xl:col-span-1">
                        <Link href="/" className="flex items-center gap-2 text-white">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
                                <BookOpen className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-bold">EduPlatform</span>
                        </Link>
                        <p className="text-sm leading-6 text-slate-400">
                            Empowering learners worldwide with accessible, high-quality
                            education. Join our community today.
                        </p>
                        <div className="flex space-x-6">
                            <a
                                href="#"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">
                                    Platform
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link
                                            href="/courses"
                                            className="text-sm leading-6 hover:text-white"
                                        >
                                            Browse Courses
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/pricing"
                                            className="text-sm leading-6 hover:text-white"
                                        >
                                            Pricing
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/instructors"
                                            className="text-sm leading-6 hover:text-white"
                                        >
                                            For Instructors
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/business"
                                            className="text-sm leading-6 hover:text-white"
                                        >
                                            For Business
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">
                                    Support
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link
                                            href="/help"
                                            className="text-sm leading-6 hover:text-white"
                                        >
                                            Help Center
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/terms"
                                            className="text-sm leading-6 hover:text-white"
                                        >
                                            Terms of Service
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/privacy"
                                            className="text-sm leading-6 hover:text-white"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/contact"
                                            className="text-sm leading-6 hover:text-white"
                                        >
                                            Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="md:grid md:grid-cols-1">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">
                                    Subscribe to our newsletter
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    The latest news, articles, and resources, sent to your inbox
                                    weekly.
                                </p>
                                <form className="mt-6 sm:flex sm:max-w-md">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:ring-primary-500"
                                    />
                                    <div className="mt-4 sm:ml-4 sm:mt-0">
                                        <Button variant="primary" className="w-full">
                                            Subscribe
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-slate-800 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-slate-500">
                        &copy; {new Date().getFullYear()} EduPlatform, Inc. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
