"use client"
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardContent, CardFooter } from '../../components/ui/Card'
import { BookOpen, ArrowLeft, CheckCircle } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
export const ForgotPasswordPage = () => {
    const t = useTranslations('Auth.forgotPassword')
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsLoading(false)
        setIsSubmitted(true)
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="w-full max-w-md space-y-8">
                <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 text-white mb-4">
                        <BookOpen className="h-7 w-7" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        {t('title')}
                    </h2>
                    <p className="mt-2 text-sm text-slate-400 text-center">
                        {t('subtitle')}
                    </p>
                </div>

                <Card className="border-slate-800 bg-slate-900 shadow-2xl shadow-black/40">
                    <CardContent className="pt-6">
                        {isSubmitted ? (
                            <div className="text-center py-4">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
                                    <CheckCircle className="h-6 w-6 text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-medium text-slate-100">
                                    {t('successTitle')}
                                </h3>
                                <p className="mt-2 text-sm text-slate-400">
                                    {t('successDesc')}{' '}
                                    <span className="font-medium text-slate-200">{email}</span>
                                </p>
                                <Button
                                    variant="outline"
                                    className="mt-6 w-full"
                                    onClick={() => setIsSubmitted(false)}
                                >
                                    {t('tryAnother')}
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    label={t('emailLabel')}
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <Button type="submit" className="w-full text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 border-none" isLoading={isLoading}>
                                    {t('sendLink')}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                    <CardFooter className="justify-center border-t border-slate-800/60 bg-slate-950/30 py-4">
                        <Link
                            href="/login"
                            className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {t('backToLogin')}
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
