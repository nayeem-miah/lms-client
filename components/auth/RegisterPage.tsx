"use client"
import React, { useState } from 'react'

import { useRegisterMutation } from '@/lib/redux/features/auth/authApi'
import { UserRole } from '@/types/types'
import { BookOpen, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '../../components/ui/Button'
import { Card, CardContent, CardFooter } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import toast, { Toaster } from 'react-hot-toast'


export const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState<UserRole>('STUDENT')
    const [register, { isLoading }] = useRegisterMutation();
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
        const loadingToast = toast.loading('Creating your account...')

        try {
            console.log('Registration payload:', { name, email, password, role })
            const res = await register({ name, email, password, role }).unwrap();
            console.log('Registration response:', res)

            // Always dismiss loading toast first
            toast.dismiss(loadingToast)

            // Check if registration was successful
            // The response might be { success: true, data: {...} } or just the data
            const isSuccess = res?.success !== false; // If success is not explicitly false, consider it successful

            if (isSuccess) {
                // Show success toast
                toast.success('Account created successfully! Please log in.', {
                    duration: 4000,
                    icon: '🎉',
                })

                // Redirect to login after a short delay
                setTimeout(() => {
                    router.push('/login')
                }, 1500)
            } else {
                // Handle case where success is false but no error was thrown
                const errorMsg = res?.message || 'Registration failed. Please try again.'
                toast.error(errorMsg, {
                    duration: 5000,
                    icon: '❌',
                })
                setError(errorMsg)
                setIsSubmitting(false)
            }
        } catch (err: any) {
            // Always dismiss loading toast first
            toast.dismiss(loadingToast)

            console.error('Registration error:', err)

            // Extract error message from API response
            let errorMessage = 'Registration failed. Please try again.'

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
        window.location.href = `${baseUrl}/auth/google`;
    }

    // Handle social login callback
    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
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
                        Create an Account
                    </h2>
                    <p className="mt-3 text-sm text-slate-400">
                        Join thousands of learners and instructors today
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

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2 group">
                                    <label className="text-sm font-medium text-slate-300">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-slate-600"
                                    />
                                </div>

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
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create a strong password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 pr-12 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-slate-600"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors duration-200 focus:outline-none"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Password Strength Indicator */}
                                    {password && (
                                        <div className="mt-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full transition-all duration-500 ${password.length >= 12 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)
                                                                ? 'w-full bg-gradient-to-r from-green-500 to-emerald-500'
                                                                : password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)
                                                                    ? 'w-3/4 bg-gradient-to-r from-yellow-500 to-orange-500'
                                                                    : password.length >= 6
                                                                        ? 'w-1/2 bg-gradient-to-r from-orange-500 to-red-500'
                                                                        : 'w-1/4 bg-gradient-to-r from-red-500 to-red-600'
                                                            }`}
                                                    />
                                                </div>
                                                <span className={`text-xs font-medium ${password.length >= 12 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)
                                                        ? 'text-green-400'
                                                        : password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)
                                                            ? 'text-yellow-400'
                                                            : password.length >= 6
                                                                ? 'text-orange-400'
                                                                : 'text-red-400'
                                                    }`}>
                                                    {password.length >= 12 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)
                                                        ? 'Strong'
                                                        : password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)
                                                            ? 'Good'
                                                            : password.length >= 6
                                                                ? 'Fair'
                                                                : 'Weak'
                                                    }
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                <div className={`flex items-center gap-1.5 ${password.length >= 8 ? 'text-green-400' : 'text-slate-500'}`}>
                                                    {password.length >= 8 ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                                                    <span>8+ characters</span>
                                                </div>
                                                <div className={`flex items-center gap-1.5 ${/[A-Z]/.test(password) ? 'text-green-400' : 'text-slate-500'}`}>
                                                    {/[A-Z]/.test(password) ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                                                    <span>Uppercase</span>
                                                </div>
                                                <div className={`flex items-center gap-1.5 ${/[a-z]/.test(password) ? 'text-green-400' : 'text-slate-500'}`}>
                                                    {/[a-z]/.test(password) ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                                                    <span>Lowercase</span>
                                                </div>
                                                <div className={`flex items-center gap-1.5 ${/[0-9]/.test(password) ? 'text-green-400' : 'text-slate-500'}`}>
                                                    {/[0-9]/.test(password) ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                                                    <span>Number</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-sm font-medium text-slate-300">I want to</label>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value as UserRole)}
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-slate-600"
                                    >
                                        <option value="STUDENT">Learn new skills (Student)</option>
                                        <option value="INSTRUCTOR">Teach courses (Instructor)</option>
                                    </select>
                                </div>

                                <div className="flex items-start space-x-3 pt-2">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-800/50 text-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all duration-200"
                                        required
                                    />
                                    <label htmlFor="terms" className="text-sm text-slate-400 leading-relaxed">
                                        I agree to the{' '}
                                        <Link
                                            href="/terms"
                                            className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                                        >
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link
                                            href="/privacy"
                                            className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </label>
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
                                                    Creating account...
                                                </>
                                            ) : (
                                                'Create Account'
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
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
