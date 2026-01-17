export type UserRole = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN'

export interface User {
    id: string
    name: string
    email: string
    role: UserRole
    avatar?: string
}

export interface Course {
    id: string
    title: string
    instructor: {
        id: string
        name: string
        avatar?: string
    }
    price: number
    rating: number
    reviewCount: number
    thumbnail: string
    category: string
    level: 'Beginner' | 'Intermediate' | 'Advanced'
    lessons: number
    duration: string // e.g., "12h 30m"
    students: number
    description?: string
    isPopular?: boolean
    isNew?: boolean
}

export interface SubscriptionPlan {
    id: string
    name: string
    price: number
    interval: 'month' | 'year'
    features: string[]
    isPopular?: boolean
    color?: 'blue' | 'green' | 'amber'
}

export interface Review {
    id: string
    userId: string
    userName: string
    userAvatar?: string
    rating: number
    comment: string
    date: string
}

export interface Lesson {
    id: string
    title: string
    duration: string
    isCompleted?: boolean
    isLocked?: boolean
    type: 'video' | 'quiz' | 'article'
}
