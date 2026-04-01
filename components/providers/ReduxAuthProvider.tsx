
'use client'

import { useEffect, useState } from 'react'
import { useGetMeQuery } from '@/lib/redux/features/auth/authApi'
import { setCredentials, logOut, setUser, setLoading } from '@/lib/redux/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'

export default function ReduxAuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch()
    const { token, user: currentUser } = useAppSelector((state) => state.auth)
    const [isMounted, setIsMounted] = useState(false)

    // Initial check for token in localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken')
        if (storedToken) {
            // Only set credentials if not already set (e.g. from a fresh login)
            if (!token) {
                dispatch(setCredentials({ token: storedToken, user: null as any }))
            }
        } else {
            // No token found, ensure we are logged out
            if (token || currentUser) {
                dispatch(logOut())
            }
        }
        setIsMounted(true)
    }, [dispatch, token, currentUser])

    // Query to fetch user details if we have a token but NO user data in Redux
    // This allows fresh logins to skip this if they already have 'user' in state
    const { data: userData, isLoading, isSuccess, isError } = useGetMeQuery(undefined, {
        skip: !token || !!currentUser, 
    })

    useEffect(() => {
        if (isSuccess && userData) {
            dispatch(setUser(userData))
        } else if (isError) {
            // Errors (like 401) are already handled globally in apiSlice.ts
            // We just ensure Redux is cleared here if getMe fails
            dispatch(logOut())
        }
        
        // Sync loading state only if we are actually checking
        if (token && !currentUser) {
            dispatch(setLoading(isLoading))
        } else {
            dispatch(setLoading(false))
        }
    }, [userData, isSuccess, isError, isLoading, dispatch, token, currentUser])

    if (!isMounted) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            </div>
        )
    }

    return <>{children}</>
}
