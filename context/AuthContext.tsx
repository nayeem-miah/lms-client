
'use client'
import { User, UserRole } from '@/types/types'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { useLoginMutation, useRegisterMutation } from '@/lib/redux/features/auth/authApi'
import { setCredentials, logOut } from '@/lib/redux/features/auth/authSlice'
import { useRouter } from 'next/navigation'
import React from 'react'

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (email: string, password: string, deviceId: string) => Promise<void>
    register: (name: string, email: string, password: string, role: UserRole) => Promise<void>
    logout: (deviceId: string) => Promise<void>
}

export const useAuth = (): AuthContextType => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { user: reduxUser, isAuthenticated, isLoading: reduxLoading } = useAppSelector((state) => state.auth)

    const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation()
    const [registerMutation, { isLoading: isRegisterLoading }] = useRegisterMutation()

    // Combine loading states
    const isLoading = reduxLoading || isLoginLoading || isRegisterLoading

    // Map Redux User (API User) to App User (UI User)
    const user: User | null = reduxUser ? {
        id: reduxUser._id || 'unknown',
        name: reduxUser.name,
        email: reduxUser.email,
        role: (reduxUser.role as UserRole) || 'STUDENT',
        avatar: reduxUser.profilePhoto
    } : null

    const login = async (email: string, password: string, deviceId: string) => {
        try {
            // response is the data object from backend (due to transformResponse)
            // { accessToken: string, user: User }
            const data = await loginMutation({ email, password, deviceId }).unwrap()

            if (data && data.accessToken) {
                dispatch(setCredentials({ token: data.accessToken, user: data.user }))
                // Redirect is handled by the component or here?
                // Previous AuthContext didn't redirect inside login function but component did?
                // Wait, component called login then redirect.
                // But here I can just return.
            }
        } catch (error) {
            console.error('Login failed', error)
            throw error
        }
    }

    const register = async (name: string, email: string, password: string, role: UserRole) => {
        try {
            await registerMutation({ name, email, password, role }).unwrap()
            // Registration successful
        } catch (error) {
            console.error('Registration failed', error)
            throw error
        }
    }

    const logout = async (deviceId: string) => {
        try {
            dispatch(logOut())
            router.push('/login')
        } catch (error) {
            console.error('Logout failed', error)
            dispatch(logOut())
            router.push('/login')
        }
    }

    return {
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout
    }
}

// Legacy AuthProvider kept for compatibility if imported, but functional logic moved to ReduxAuthProvider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>
