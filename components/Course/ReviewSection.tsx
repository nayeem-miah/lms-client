"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, MessageSquare, Send, Lock, ThumbsUp } from 'lucide-react'
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
    const [hoveredStar, setHoveredStar] = useState(0)

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isAuthenticated) { toast.error('Please login to leave a review'); return }
        if (rating === 0) { toast.error('Please select a rating'); return }
        if (!comment.trim()) { toast.error('Please enter a comment'); return }

        try {
            await createReview({ courseId, rating, comment }).unwrap()
            toast.success('Review submitted successfully!')
            setRating(0)
            setComment('')
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to submit review')
        }
    }

    if (isLoading) return (
        <div className="py-8 text-center text-slate-500 text-sm font-medium animate-pulse">
            Loading reviews...
        </div>
    )

    const reviews = reviewData?.reviews || []
    const avgRating = reviewData?.averageRating || 0
    const totalReviews = reviewData?.totalReviews || 0

    const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent']

    return (
        <section id="reviews-section" className="space-y-8 scroll-mt-24">
            {/* Section Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <span className="h-7 w-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Star className="h-3.5 w-3.5 text-amber-400" />
                    </span>
                    Student Reviews
                </h2>
                <div className="flex items-center gap-3">
                    {avgRating > 0 && (
                        <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
                            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                            <span className="text-amber-400 text-sm font-black">{avgRating.toFixed(1)}</span>
                        </div>
                    )}
                    <span className="text-slate-500 text-sm font-semibold">{totalReviews} reviews</span>
                </div>
            </div>

            {/* Review Form */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/60 rounded-2xl border border-slate-800/60 p-6 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-48 h-32 bg-amber-500/3 blur-3xl pointer-events-none" />

                {!isAuthenticated ? (
                    <div className="py-8 text-center space-y-4">
                        <div className="h-14 w-14 bg-slate-800/80 border border-slate-700/60 rounded-2xl flex items-center justify-center mx-auto">
                            <Lock className="h-6 w-6 text-slate-500" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-200 mb-1">Want to share your thoughts?</h3>
                            <p className="text-slate-500 text-sm">Please log in to leave a review for this course.</p>
                        </div>
                        <Button
                            onClick={() => window.location.href = '/login'}
                            variant="outline"
                            size="sm"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl"
                        >
                            Login Now
                        </Button>
                    </div>
                ) : !isEnrolled ? (
                    <div className="py-8 text-center space-y-4">
                        <div className="h-14 w-14 bg-slate-800/80 border border-slate-700/60 rounded-2xl flex items-center justify-center mx-auto">
                            <MessageSquare className="h-6 w-6 text-slate-500" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-200 mb-1">Enrolled students only</h3>
                            <p className="text-slate-500 text-sm">You must be enrolled in this course to share your experience.</p>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold px-4 py-2 rounded-xl">
                            <Star className="h-3.5 w-3.5" />
                            Enroll above to unlock reviews!
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className="text-base font-black text-white mb-5">Leave a Review</h3>
                        <form onSubmit={handleSubmitReview} className="space-y-5">
                            {/* Star Rating */}
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-semibold text-slate-400">Your Rating</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setRating(s)}
                                            onMouseEnter={() => setHoveredStar(s)}
                                            onMouseLeave={() => setHoveredStar(0)}
                                            className="transition-transform hover:scale-110 focus:outline-none"
                                        >
                                            <Star
                                                className={`h-7 w-7 transition-colors duration-150 ${
                                                    s <= (hoveredStar || rating)
                                                        ? 'text-amber-400 fill-amber-400'
                                                        : 'text-slate-700'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <AnimatePresence>
                                    {(hoveredStar || rating) > 0 && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -4 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -4 }}
                                            className="text-xs font-bold text-amber-400"
                                        >
                                            {ratingLabels[hoveredStar || rating]}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Comment */}
                            <div className="relative">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="What did you like or dislike? How can we improve?"
                                    className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 min-h-[120px] resize-none transition-all"
                                    required
                                />
                                <div className="absolute bottom-3 right-3 text-xs text-slate-600 font-mono">
                                    {comment.length}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                className="flex items-center gap-2 px-6 h-11 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white border-none rounded-xl font-bold shadow-lg shadow-amber-500/20 transition-all"
                            >
                                <Send className="h-4 w-4" />
                                Post Review
                            </Button>
                        </form>
                    </>
                )}
            </motion.div>

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <div className="py-16 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 text-center space-y-3">
                        <div className="h-14 w-14 bg-slate-800/80 border border-slate-700/60 rounded-2xl flex items-center justify-center mx-auto">
                            <MessageSquare className="h-6 w-6 text-slate-600" />
                        </div>
                        <p className="text-slate-500 font-medium text-sm">No reviews yet. Be the first to share your feedback!</p>
                    </div>
                ) : (
                    reviews.map((review: Review) => {
                        const user = review.userId as UserType
                        return (
                            <motion.div
                                key={review._id}
                                layout
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-900/60 rounded-2xl border border-slate-800/60 p-5 space-y-3 hover:border-slate-700/80 transition-colors"
                            >
                                {/* Reviewer Info */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar src={user?.profilePhoto} alt={user?.name} size="sm" />
                                        <div>
                                            <p className="text-sm font-bold text-slate-200">{user?.name || 'Anonymous'}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <Rating rating={review.rating} size="sm" />
                                                <span className="text-xs text-slate-500 font-medium">
                                                    {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-400 transition-colors">
                                        <ThumbsUp className="h-3.5 w-3.5" />
                                        Helpful
                                    </button>
                                </div>

                                {/* Comment */}
                                <p className="text-slate-400 text-sm leading-relaxed pl-11">
                                    &ldquo;{review.comment}&rdquo;
                                </p>
                            </motion.div>
                        )
                    })
                )}
            </div>
        </section>
    )
}
