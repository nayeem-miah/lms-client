"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
    BookOpen,
    Upload,
    DollarSign,
    Tag,
    FileText,
    Image as ImageIcon,
    ArrowLeft,
    Save,
    Eye,
    CloudCog
} from 'lucide-react'
import { useCreateCourseMutation } from '@/lib/redux/features/courses/coursesApi'
import toast, { Toaster } from 'react-hot-toast'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function CreateCoursePage() {
    const router = useRouter()
    const [createCourse, { isLoading }] = useCreateCourseMutation()

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        level: 'BEGINNER',
    })
    const [thumbnail, setThumbnail] = useState<File | null>(null)
    const [thumbnailPreview, setThumbnailPreview] = useState<string>('')

    const categories = [
        'Web Development',
        'Mobile Development',
        'Data Science',
        'Machine Learning',
        'UI/UX Design',
        'Digital Marketing',
        'Business',
        'Photography',
        'Music',
        'Language Learning',
    ]

    const levels = [
        { value: 'BEGINNER', label: 'Beginner' },
        { value: 'INTERMEDIATE', label: 'Intermediate' },
        { value: 'ADVANCED', label: 'Advanced' },
    ]

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setThumbnail(file)

            const reader = new FileReader()
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (
            !formData.title ||
            !formData.description ||
            !formData.price ||
            !formData.category
        ) {
            toast.error('Please fill in all required fields')
            return
        }

        const loadingToast = toast.loading('Creating your course...')

        try {
            const courseData = new FormData()

            courseData.append(
                'data',
                JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    price: Number(formData.price),
                    category: formData.category,
                    level: formData.level,
                })
            )

            if (thumbnail) {
                courseData.append('file', thumbnail)
            }

            const response = await createCourse(courseData).unwrap()

            console.log('Course created successfully:', response)

            toast.dismiss(loadingToast)

            toast.success('Course created successfully! 🎉', {
                duration: 3000,
            })

            setTimeout(() => {
                router.push('/dashboard/my-courses')
            }, 1500)
        } catch (err: any) {
            toast.dismiss(loadingToast)

            let errorMessage = 'Failed to create course. Please try again.'
            if (err?.data?.message) {
                errorMessage = err.data.message
            }

            toast.error(errorMessage, { duration: 5000 })
        }
    }


    return (
        <ProtectedRoute allowedRoles={['INSTRUCTOR', 'ADMIN']}>
            <div className="space-y-6">
                <Toaster
                    position="top-center"
                    toastOptions={{
                        style: {
                            background: '#1e293b',
                            color: '#fff',
                            borderRadius: '12px',
                            padding: '16px',
                        },
                    }}
                />

                {/* Header */}
                <div className="flex items-center justify-between">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex items-center space-x-4 mb-2">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-slate-400" />
                            </button>
                            <h1 className="text-3xl font-bold text-slate-100">Create New Course</h1>
                        </div>
                        <p className="text-slate-400 ml-14">Share your knowledge with students around the world</p>
                    </motion.div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-800 border border-slate-700 rounded-xl p-6"
                            >
                                <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center">
                                    <BookOpen className="w-5 h-5 mr-2 text-purple-400" />
                                    Basic Information
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Course Title <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="e.g., Complete Web Development Bootcamp"
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Description <span className="text-red-400">*</span>
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Describe what students will learn in this course..."
                                            rows={6}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                            required
                                        />
                                        <p className="text-xs text-slate-500 mt-1">
                                            {formData.description.length} characters
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Course Details */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-slate-800 border border-slate-700 rounded-xl p-6"
                            >
                                <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-cyan-400" />
                                    Course Details
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            <Tag className="w-4 h-4 inline mr-1" />
                                            Category <span className="text-red-400">*</span>
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            Difficulty Level
                                        </label>
                                        <select
                                            name="level"
                                            value={formData.level}
                                            onChange={handleInputChange}
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        >
                                            {levels.map(level => (
                                                <option key={level.value} value={level.value}>
                                                    {level.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-2">
                                            <DollarSign className="w-4 h-4 inline mr-1" />
                                            Price (৳) <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                            min="0"
                                            step="0.01"
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Thumbnail Upload */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-slate-800 border border-slate-700 rounded-xl p-6"
                            >
                                <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
                                    <ImageIcon className="w-5 h-5 mr-2 text-emerald-400" />
                                    Course Thumbnail
                                </h2>

                                <div className="space-y-4">
                                    {thumbnailPreview ? (
                                        <div className="relative group">
                                            <img
                                                src={thumbnailPreview}
                                                alt="Thumbnail preview"
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setThumbnail(null)
                                                    setThumbnailPreview('')
                                                }}
                                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors bg-slate-900">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-10 h-10 text-slate-500 mb-3" />
                                                <p className="mb-2 text-sm text-slate-400">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-slate-500">PNG, JPG or WEBP (MAX. 5MB)</p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleThumbnailChange}
                                            />
                                        </label>
                                    )}
                                </div>
                            </motion.div>

                            {/* Actions */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-3"
                            >
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Creating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            <span>Create Course</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="w-full flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-3 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </form>
            </div>
        </ProtectedRoute>
    )
}
