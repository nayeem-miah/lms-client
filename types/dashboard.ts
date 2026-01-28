import { LucideIcon } from 'lucide-react'

export interface StatsCardProps {
    icon: LucideIcon
    label: string
    value: string
    trend?: string
    color: string
    delay: number
}

export interface CourseCardProps {
    title: string
    progress: number
    instructor: string
    thumbnail: string
    lessons: number
    duration: string
    delay: number
}
