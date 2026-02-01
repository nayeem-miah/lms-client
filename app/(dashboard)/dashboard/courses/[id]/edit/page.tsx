"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useParams } from 'next/navigation'
import {
    BookOpen,
    Upload,
    DollarSign,
    Tag,
    FileText,
    Image as ImageIcon,
    ArrowLeft,
    Save,
    Loader2
} from 'lucide-react'
import { useGetCourseByIdQuery, useUpdateCourseMutation } from '@/lib/redux/features/courses/coursesApi'
import toast, { Toaster } from 'react-hot-toast'

export default function EditCoursePage() {
    const router = useRouter()
    const { id } = useParams()
    const { data: course, isLoading: isFetching, error: fetchError } = useGetCourseByIdQuery(id)
    const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation()

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

    useEffect(() => {
        if (course) {
            setFormData({
                title: course.title || '',
                description: course.description || '',
                price: course.price?.toString() || '',
                category: course.category || '',
                level: course.level || 'BEGINNER',
            })
            if (course.thumbnail) {
                setThumbnailPreview(course.thumbnail)
            }
        }
    }, [course])

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

        const loadingToast = toast.loading('Updating your course...')

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

            await updateCourse({ id, data: courseData }).unwrap()

            toast.dismiss(loadingToast)
            toast.success('Course updated successfully! 🎉')

            setTimeout(() => {
                router.push(`/dashboard/courses/${id}`)
            }, 1500)
        } catch (err: any) {
            toast.dismiss(loadingToast)
            let errorMessage = 'Failed to update course. Please try again.'
            if (err?.data?.message) {
                errorMessage = err.data.message
            }
            toast.error(errorMessage)
        }
    }

    if (isFetching) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
                <p className="text-slate-400 font-medium">Loading course data...</p>
            </div>
        )
    }

    if (fetchError) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold text-slate-100 mb-2">Error Loading Course</h2>
                <p className="text-slate-400 mb-6">We couldn't find the course you're looking for.</p>
                <button onClick={() => router.back()} className="bg-slate-800 text-white px-6 py-2 rounded-lg">Go Back</button>
            </div>
        )
    }

    return (
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
                            onClick={() => router.back()}
                            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-slate-400" />
                        </button>
                        <h1 className="text-3xl font-bold text-slate-100">Edit Course</h1>
                    </div>
                    <p className="text-slate-400 ml-14">Update your course information and content</p>
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
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                        rows={6}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                        required
                                    />
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
                                        Price (৳) <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        min="0"
                                        step="0.01"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                                        <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg">
                                            <div className="text-white text-sm font-medium flex items-center">
                                                <Upload className="w-4 h-4 mr-2" />
                                                Change Image
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleThumbnailChange}
                                            />
                                        </label>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors bg-slate-900">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-10 h-10 text-slate-500 mb-3" />
                                            <p className="mb-2 text-sm text-slate-400">
                                                <span className="font-semibold">Click to upload</span>
                                            </p>
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
                                disabled={isUpdating}
                                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium py-3 rounded-lg transition-all disabled:opacity-50"
                            >
                                {isUpdating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Saving Changes...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        <span>Save Changes</span>
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
    )
}
