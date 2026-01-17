/* eslint-disable react-hooks/set-state-in-effect */
import { User, UserRole } from '@/types/types'
import React, { useEffect, useState, createContext, useContext } from 'react'
interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (email: string, role?: UserRole) => Promise<void>
    register: (name: string, email: string, role: UserRole) => Promise<void>
    logout: () => void
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        // Simulate checking for existing session
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setIsLoading(false)
    }, [])
    const login = async (email: string, role: UserRole = "STUDENT") => {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const mockUser: User = {
            id: '1',
            name: email.split('@')[0],
            email,
            role,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        }
        setUser(mockUser)
        localStorage.setItem('user', JSON.stringify(mockUser))
        setIsLoading(false)
    }
    const register = async (name: string, email: string, role: UserRole) => {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const mockUser: User = {
            id: '2',
            name,
            email,
            role,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        }
        setUser(mockUser)
        localStorage.setItem('user', JSON.stringify(mockUser))
        setIsLoading(false)
    }
    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
