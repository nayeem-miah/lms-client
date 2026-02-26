"use client"
import {
    BookOpen,
    Facebook,
    Instagram,
    Linkedin,
    Twitter
} from 'lucide-react'
import { Link, usePathname } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'


export const Footer = () => {
    const t = useTranslations('Footer')
    const nt = useTranslations('Navbar')
    const pathname = usePathname()

    if (pathname?.startsWith('/dashboard')) {
        return null
    }

    return (
        <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Brand & Newsletter */}
                    <div className="space-y-8 xl:col-span-1">
                        <Link href="/" className="flex items-center gap-2 text-white">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                                <BookOpen className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-bold text-slate-100">EduLearn</span>
                        </Link>
                        <p className="text-sm leading-6 text-slate-400">
                            {t('description')}
                        </p>
                        <div className="flex space-x-6">
                            <a
                                href="#"
                                className="text-slate-500 hover:text-cyan-400 transition-colors"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-slate-500 hover:text-cyan-400 transition-colors"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-slate-500 hover:text-cyan-400 transition-colors"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-slate-500 hover:text-cyan-400 transition-colors"
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-slate-100 italic">
                                    {t('platform')}
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link
                                            href="/courses"
                                            className="text-sm leading-6 hover:text-cyan-400 transition-colors"
                                        >
                                            {nt('browseCourses')}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/pricing"
                                            className="text-sm leading-6 hover:text-cyan-400 transition-colors"
                                        >
                                            Pricing
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/instructors"
                                            className="text-sm leading-6 hover:text-cyan-400 transition-colors"
                                        >
                                            For Instructors
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/business"
                                            className="text-sm leading-6 hover:text-cyan-400 transition-colors"
                                        >
                                            For Business
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-slate-100 italic">
                                    {t('support')}
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link
                                            href="/help"
                                            className="text-sm leading-6 hover:text-cyan-400 transition-colors"
                                        >
                                            Help Center
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/terms"
                                            className="text-sm leading-6 hover:text-cyan-400 transition-colors"
                                        >
                                            Terms of Service
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/privacy"
                                            className="text-sm leading-6 hover:text-cyan-400 transition-colors"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/contact"
                                            className="text-sm leading-6 hover:text-cyan-400 transition-colors"
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
                                <h3 className="text-sm font-semibold leading-6 text-slate-100 italic">
                                    {t('subscribeTitle')}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    {t('subscribeDesc')}
                                </p>
                                <form className="mt-6 sm:flex sm:max-w-md">
                                    <Input
                                        type="email"
                                        placeholder={t('subscribePlaceholder')}
                                        className="w-full bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:ring-cyan-500 focus:border-cyan-500"
                                    />
                                    <div className="mt-4 sm:ml-4 sm:mt-0">
                                        <Button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white border-none shadow-lg shadow-cyan-500/20">
                                            {t('subscribeButton')}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-slate-800 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-slate-500">
                        &copy; {new Date().getFullYear()} EduLearn, Inc. {t('rights')}
                    </p>
                </div>
            </div>
        </footer>
    )
}

