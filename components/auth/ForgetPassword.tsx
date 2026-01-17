"use client"
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardContent, CardFooter } from '../../components/ui/Card'
import { BookOpen, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
export const ForgotPasswordPage = () => {
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
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white mb-4">
                        <BookOpen className="h-7 w-7" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                        Reset Password
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 text-center">
                        Enter your email address and we'll send you a link to reset your
                        password.
                    </p>
                </div>

                <Card className="border-slate-200 shadow-xl">
                    <CardContent className="pt-6">
                        {isSubmitted ? (
                            <div className="text-center py-4">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-lg font-medium text-slate-900">
                                    Check your email
                                </h3>
                                <p className="mt-2 text-sm text-slate-600">
                                    We've sent a password reset link to{' '}
                                    <span className="font-medium text-slate-900">{email}</span>
                                </p>
                                <Button
                                    variant="outline"
                                    className="mt-6 w-full"
                                    onClick={() => setIsSubmitted(false)}
                                >
                                    Try another email
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Input
                                    label="Email address"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <Button type="submit" className="w-full  text-white bg-blue-600 hover:bg-blue-700" isLoading={isLoading}>
                                    Send Reset Link
                                </Button>
                            </form>
                        )}
                    </CardContent>
                    <CardFooter className="justify-center border-t border-slate-100 bg-slate-50/50 py-4">
                        <Link
                            href="/login"
                            className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to login
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
