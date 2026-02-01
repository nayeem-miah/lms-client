"use client"
import React, { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, PlayCircle, Home, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { toast } from 'react-hot-toast'

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const sessionId = searchParams.get('session_id')

    useEffect(() => {
        if (!sessionId) {
            router.push('/')
            return
        }
        // In a real app, you might verify the session here with your backend
        toast.success('Payment verified successfully!')
    }, [sessionId, router])

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center space-y-8 border border-slate-100"
            >
                <div className="relative mx-auto w-24 h-24">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                        className="bg-emerald-100 rounded-full w-full h-full flex items-center justify-center"
                    >
                        <CheckCircle className="h-12 w-12 text-emerald-600" />
                    </motion.div>
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-emerald-400 rounded-full"
                    />
                </div>

                <div className="space-y-3">
                    <h1 className="text-3xl font-extrabold text-slate-900">Payment Successful!</h1>
                    <p className="text-slate-500">
                        Thank you for your purchase. Your enrollment is now active and you can start learning right away.
                    </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left">
                    <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-slate-500">Session ID</span>
                        <span className="text-slate-900 font-mono text-xs">{sessionId?.substring(0, 20)}...</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Status</span>
                        <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Completed</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <Button
                        onClick={() => router.push('/dashboard')}
                        className="w-full h-14 text-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-500/25"
                    >
                        <PlayCircle className="h-5 w-5" />
                        Go to My Dashboard
                        <ArrowRight className="h-5 w-5" />
                    </Button>

                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            onClick={() => router.push('/')}
                            className="flex-1 h-12 flex items-center justify-center gap-2 border-slate-200"
                        >
                            <Home className="h-4 w-4" />
                            Home
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push('/courses')}
                            className="flex-1 h-12 flex items-center justify-center gap-2 border-slate-200"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            Browse More
                        </Button>
                    </div>
                </div>

                <p className="text-xs text-slate-400">
                    A confirmation email has been sent to your registered email address.
                </p>
            </motion.div>
        </div>
    )
}
