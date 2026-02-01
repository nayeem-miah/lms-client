"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, MessageSquare, Send, User, Lock } from 'lucide-react'
import { Rating } from '@/components/ui/Rating'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avater'
import { useGetCourseReviewsQuery, useCreateReviewMutation } from '@/lib/redux/features/reviews/reviewsApi'
import { Review, User as UserType } from '@/types/api'
import { toast } from 'react-hot-toast'

interface ReviewSectionProps {
    courseId: string
    isEnrolled: boolean
    isAuthenticated: boolean
}

export const ReviewSection = ({ courseId, isEnrolled, isAuthenticated }: ReviewSectionProps) => {
    const { data: reviewData, isLoading } = useGetCourseReviewsQuery(courseId)
    const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation()

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isAuthenticated) {
            toast.error('Please login to leave a review')
            return
        }
        if (rating === 0) {
            toast.error('Please select a rating')
            return
        }
        if (!comment.trim()) {
            toast.error('Please enter a comment')
            return
        }

        try {
            await createReview({ courseId, rating, comment }).unwrap()
            toast.success('Review submitted successfully!')
            setRating(0)
            setComment('')
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to submit review')
        }
    }

    if (isLoading) return <div className="py-8 text-center text-slate-500">Loading reviews...</div>

    const reviews = reviewData?.reviews || []

    return (
        <section id="reviews-section" className="space-y-8 scroll-mt-24">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                    Student Reviews
                </h2>
                <div className="flex items-center gap-4">
                    {reviewData?.averageRating > 0 && (
                        <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1 rounded-full text-yellow-700 text-sm font-bold">
                            <Star className="h-4 w-4 fill-yellow-500" />
                            {reviewData.averageRating.toFixed(1)}
                        </div>
                    )}
                    <div className="text-slate-500 font-medium">
                        {reviewData?.totalReviews || 0} reviews
                    </div>
                </div>
            </div>

            {/* Review Form Logic */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4"
            >
                {!isAuthenticated ? (
                    <div className="py-4 text-center space-y-3">
                        <Lock className="h-10 w-10 text-slate-300 mx-auto" />
                        <h3 className="text-lg font-semibold text-slate-900">Want to share your thoughts?</h3>
                        <p className="text-slate-500 text-sm">Please log in to leave a review for this course.</p>
                        <Button onClick={() => window.location.href = '/login'} variant="outline" size="sm">
                            Login Now
                        </Button>
                    </div>
                ) : !isEnrolled ? (
                    <div className="py-4 text-center space-y-3">
                        <MessageSquare className="h-10 w-10 text-primary-200 mx-auto" />
                        <h3 className="text-lg font-semibold text-slate-900">Enrolled students only</h3>
                        <p className="text-slate-500 text-sm">You must be enrolled in this course to share your experience.</p>
                        <div className="bg-primary-50 p-3 rounded-xl inline-block text-primary-700 text-xs font-medium">
                            Enroll above to unlock the review form!
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className="text-lg font-semibold text-slate-900">Leave a Review</h3>
                        <form onSubmit={handleSubmitReview} className="space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-slate-700">Your Rating:</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setRating(s)}
                                            className={`transition-colors transform hover:scale-110 ${s <= rating ? 'text-yellow-500' : 'text-slate-300'}`}
                                        >
                                            <Star className={`h-6 w-6 ${s <= rating ? 'fill-yellow-500' : ''}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="What did you like or dislike? How can we improve?"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[120px] resize-none"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                className="flex items-center gap-2 px-8 bg-primary-600 hover:bg-primary-700 w-full h-12 text-md font-bold shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-none"
                                variant="outline"
                            >
                                <Send className="h-4 w-4" />
                                Post My Review
                            </Button>
                        </form>
                    </>
                )}
            </motion.div>

            {/* Reviews List */}
            <div className="grid grid-cols-1 gap-6">
                {reviews.length === 0 ? (
                    <div className="py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-center space-y-3">
                        <MessageSquare className="h-12 w-12 text-slate-300 mx-auto" />
                        <p className="text-slate-500 font-medium">No reviews yet. Be the first to share your feedback!</p>
                    </div>
                ) : (
                    reviews.map((review: Review) => {
                        const user = review.userId as UserType
                        return (
                            <motion.div
                                key={review._id}
                                layout
                                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar src={user?.profilePhoto} alt={user?.name} size="md" />
                                        <div>
                                            <p className="font-bold text-slate-900">{user?.name || 'Anonymous'}</p>
                                            <div className="flex items-center gap-2">
                                                <Rating rating={review.rating} size="sm" />
                                                <span className="text-xs text-slate-400 font-medium">
                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    "{review.comment}"
                                </p>
                            </motion.div>
                        )
                    })
                )}
            </div>
        </section>
    )
}
