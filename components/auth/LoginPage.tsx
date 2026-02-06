"use client"
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'

import { BookOpen } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '../../components/ui/Button'
import {
    Card,
    CardContent,
    CardFooter
} from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { useAuth } from '@/context/AuthContext'
import { getDeviceId } from '@/lib/utils/deviceId'
import toast, { Toaster } from 'react-hot-toast'
export const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading } = useAuth()
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Prevent double submission
        if (isSubmitting) return

        setError(null)
        setIsSubmitting(true)

        // Show loading toast
        const loadingToast = toast.loading('Signing you in...')

        try {
            // Get or generate a unique device ID
            const deviceId = getDeviceId();

            // Log the login credentials with device ID
            console.log('Login attempt:', {
                email,
                password: '***hidden***',
                deviceId,
                deviceName: navigator.userAgent.split('(')[1]?.split(')')[0] || 'Unknown Device'
            });

            await login(email, password, deviceId)

            // Dismiss loading toast
            toast.dismiss(loadingToast)

            // Show success toast
            toast.success('Welcome back!', {
                duration: 2000,
                icon: '👋',
            })

            // Redirect to dashboard after login
            setTimeout(() => {
                router.push('/dashboard')
            }, 500)
        } catch (err: any) {
            // Dismiss loading toast
            toast.dismiss(loadingToast)

            console.error('Login error:', err)

            // Extract error message from API response
            let errorMessage = 'Login failed. Please check your credentials.'

            if (err?.data?.message) {
                errorMessage = err.data.message
            } else if (err?.message) {
                errorMessage = err.message
            } else if (typeof err === 'string') {
                errorMessage = err
            }

            // Show error toast
            toast.error(errorMessage, {
                duration: 5000,
                icon: '❌',
            })

            setError(errorMessage)
            setIsSubmitting(false)
        }
    }

    const handleGoogleLogin = () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        // Redirect to backend google auth endpoint
        window.location.href = `${baseUrl}/auth/google`;
    }

    // Handle social login callback (token in URL)
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            // If token in URL, set it and redirect
            localStorage.setItem('accessToken', token);
            toast.success('Signed in with Google!');
            router.push('/dashboard');
        }
    }, [router]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }} />
            </div>

            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        background: '#1e293b',
                        color: '#fff',
                        borderRadius: '12px',
                        padding: '16px',
                    },
                    success: {
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />

            <div className="w-full max-w-md space-y-8 relative z-10">
                <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 text-white mb-6 shadow-2xl shadow-purple-500/50 animate-in zoom-in duration-500">
                        <BookOpen className="h-9 w-9" />
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                        Welcome Back
                    </h2>
                    <p className="mt-3 text-sm text-slate-400">
                        Sign in to your account to continue learning
                    </p>
                </div>

                <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: '200ms' }}>
                    {/* Animated rainbow border */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse" />

                    <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
                        {/* Glassmorphism overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none" />

                        <div className="p-8">
                            {error && (
                                <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300" role="alert">
                                    <span className="block sm:inline">{error}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2 group">
                                    <label className="text-sm font-medium text-slate-300">Email address</label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-slate-600"
                                    />
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-sm font-medium text-slate-300">Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-slate-600"
                                    />
                                    <div className="flex justify-end mt-2">
                                        <Link
                                            href="/forgot-password"
                                            className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full relative group overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 p-0.5 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <div className="relative bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg px-6 py-3 transition-all duration-300 group-hover:from-purple-500 group-hover:to-cyan-500">
                                        <span className="relative z-10 font-semibold text-white flex items-center justify-center">
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Signing in...
                                                </>
                                            ) : (
                                                'Sign in'
                                            )}
                                        </span>
                                    </div>
                                </button>
                            </form>

                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-700" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-slate-900 px-4 text-slate-400">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <button
                                        onClick={handleGoogleLogin}
                                        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
                                    >
                                        <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                fill="#EA4335"
                                            />
                                        </svg>
                                        <span>Continue with Google</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm py-4 px-8">
                            <p className="text-sm text-slate-400 text-center">
                                Don't have an account?{' '}
                                <Link
                                    href="/register"
                                    className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
