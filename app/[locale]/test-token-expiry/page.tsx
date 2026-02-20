"use client"

import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { logOut, selectCurrentToken, selectCurrentUser } from '@/lib/redux/features/auth/authSlice'
import { useGetMyEnrollmentsQuery } from '@/lib/redux/features/enrollments/enrollmentsApi'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'
import { useRouter } from '@/i18n/routing'

export default function TestTokenExpiryPage() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const token = useAppSelector(selectCurrentToken)
    const user = useAppSelector(selectCurrentUser)
    const [invalidToken, setInvalidToken] = useState<string | null>(null)

    // This will trigger when we set an invalid token
    const { data, error, isLoading } = useGetMyEnrollmentsQuery({}, {
        skip: !invalidToken
    })

    const handleSetInvalidToken = () => {
        const fakeExpiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDAwMDAwMDB9.invalid'
        localStorage.setItem('accessToken', fakeExpiredToken)
        setInvalidToken(fakeExpiredToken)
        toast.success('Invalid token set! Now try to fetch data.')
    }

    const handleTestExpiredToken = () => {
        // This will trigger the API call with invalid token
        setInvalidToken(Date.now().toString())
    }

    const handleClearToken = () => {
        localStorage.removeItem('accessToken')
        dispatch(logOut())
        toast.success('Token cleared!')
    }

    const handleGoToLogin = () => {
        router.push('/login')
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                    <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        Token Expiry Test Page
                    </h1>
                    <p className="text-slate-400 mb-6">
                        এই page টি ব্যবহার করে আপনি token expiry functionality test করতে পারবেন
                    </p>

                    {/* Current Status */}
                    <div className="bg-slate-900 rounded-xl p-6 mb-6 space-y-3">
                        <h2 className="text-xl font-bold text-cyan-400 mb-4">Current Status</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-slate-500">Token Status:</p>
                                <p className={`font-mono text-sm ${token ? 'text-green-400' : 'text-red-400'}`}>
                                    {token ? '✓ Token Present' : '✗ No Token'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">User Status:</p>
                                <p className={`font-mono text-sm ${user ? 'text-green-400' : 'text-red-400'}`}>
                                    {user ? `✓ Logged in as ${user.name}` : '✗ Not Logged In'}
                                </p>
                            </div>
                        </div>

                        {token && (
                            <div className="mt-4">
                                <p className="text-sm text-slate-500 mb-2">Current Token (first 50 chars):</p>
                                <p className="font-mono text-xs text-slate-400 bg-slate-950 p-3 rounded break-all">
                                    {token.substring(0, 50)}...
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Test Instructions */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-6">
                        <h3 className="text-lg font-bold text-blue-400 mb-3">📋 Test Instructions:</h3>
                        <ol className="space-y-2 text-sm text-slate-300">
                            <li><strong>1.</strong> প্রথমে login করুন (যদি করা না থাকে)</li>
                            <li><strong>2.</strong> "Set Invalid Token" button এ click করুন</li>
                            <li><strong>3.</strong> "Test API Call with Expired Token" button এ click করুন</li>
                            <li><strong>4.</strong> আপনি automatically logout হয়ে login page এ redirect হবেন</li>
                            <li><strong>5.</strong> Toast message দেখবেন: "Your session has expired. Please log in to continue."</li>
                        </ol>
                    </div>

                    {/* Test Buttons */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button
                                onClick={handleSetInvalidToken}
                                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3"
                            >
                                🔧 Set Invalid Token
                            </Button>

                            <Button
                                onClick={handleTestExpiredToken}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3"
                                disabled={!invalidToken}
                            >
                                🧪 Test API Call with Expired Token
                            </Button>

                            <Button
                                onClick={handleClearToken}
                                className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3"
                            >
                                🗑️ Clear Token (Logout)
                            </Button>

                            <Button
                                onClick={handleGoToLogin}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3"
                            >
                                🔐 Go to Login Page
                            </Button>
                        </div>
                    </div>

                    {/* API Response */}
                    {isLoading && (
                        <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                            <p className="text-yellow-400">⏳ Loading... (This should trigger logout if token is invalid)</p>
                        </div>
                    )}

                    {error && (
                        <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                            <p className="text-red-400 font-bold mb-2">❌ Error Detected:</p>
                            <pre className="text-xs text-slate-300 overflow-auto">
                                {JSON.stringify(error, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>

                {/* Backend Testing */}
                <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                    <h2 className="text-2xl font-bold mb-4 text-purple-400">Backend Testing</h2>
                    <p className="text-slate-400 mb-4">
                        আপনার backend এ token expiry test করার জন্য:
                    </p>

                    <div className="bg-slate-900 rounded-xl p-4 space-y-3 text-sm">
                        <div>
                            <p className="text-slate-500 mb-2">Option 1: JWT Token এর expiry time কমিয়ে দিন</p>
                            <code className="text-cyan-400 bg-slate-950 px-2 py-1 rounded">
                                expiresIn: '10s' // 10 seconds
                            </code>
                        </div>

                        <div>
                            <p className="text-slate-500 mb-2">Option 2: Postman/Thunder Client দিয়ে expired token পাঠান</p>
                            <code className="text-cyan-400 bg-slate-950 px-2 py-1 rounded">
                                Authorization: Bearer &lt;expired_token&gt;
                            </code>
                        </div>

                        <div>
                            <p className="text-slate-500 mb-2">Expected Response:</p>
                            <code className="text-red-400 bg-slate-950 px-2 py-1 rounded">
                                401 Unauthorized or 403 Forbidden
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
