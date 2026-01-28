
'use client'

import { useEffect, useState } from 'react'
import { useGetMeQuery } from '@/lib/redux/features/auth/authApi'
import { setCredentials, logOut, setUser, setLoading } from '@/lib/redux/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'

export default function ReduxAuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch()
    const { token } = useAppSelector((state) => state.auth)
    const [isMounted, setIsMounted] = useState(false)

    // Initial check for token in localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken')
        if (storedToken) {
            // We have a token but not fully loaded user yet. Set credentials to enable query.
            dispatch(setCredentials({ token: storedToken, user: null as any }))
        } else {
            dispatch(logOut())
        }
        setIsMounted(true)
    }, [dispatch])

    // Query to fetch user details if we have a token
    const { data: userData, isLoading, isSuccess, isError, error } = useGetMeQuery(undefined, {
        skip: !token, // Only fetch if token is present
    })

    useEffect(() => {
        if (isSuccess && userData) {
            dispatch(setUser(userData))
        } else if (isError) {
            console.error("Auth check failed:", error)
            dispatch(logOut())
        }
        dispatch(setLoading(isLoading))
    }, [userData, isSuccess, isError, isLoading, dispatch, error])

    if (!isMounted) {
        return <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
        </div>
    }

    return <>{children}</>
}
