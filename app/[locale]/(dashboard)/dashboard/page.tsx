"use client"
import { useAppSelector } from '@/lib/redux/hooks'
import { selectCurrentUser } from '@/lib/redux/features/auth/authSlice'
import AdminDashboard from '@/components/dashboard/AdminDashboard'
import StudentDashboard from '@/components/dashboard/StudentDashboard'
import InstructorDashboard from '@/components/dashboard/InstructorDashboard'
import type { UserRole } from '@/types/user'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function DashboardPage() {
    const user = useAppSelector(selectCurrentUser)

    // Fallback to STUDENT if role is missing, though it should be present for authenticated users
    const currentRole = (user?.role as UserRole) || 'STUDENT'

    return (
        <ProtectedRoute>
            {currentRole === 'ADMIN' && <AdminDashboard />}
            {currentRole === 'STUDENT' && <StudentDashboard />}
            {currentRole === 'INSTRUCTOR' && <InstructorDashboard />}
        </ProtectedRoute>
    )
}