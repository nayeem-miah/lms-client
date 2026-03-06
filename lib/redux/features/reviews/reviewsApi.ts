import { apiSlice } from '../../api/apiSlice'

export const reviewsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourseReviews: builder.query<
            { reviews: any[]; averageRating: number; totalReviews: number },
            string
        >({
            query: (courseId) => `/reviews/course/${courseId}`,
            providesTags: (result, error, courseId) => [{ type: 'Review', id: courseId }],
            transformResponse: (response: any) => {
                // Backend returns: { success, message, data: { reviews, averageRating, totalReviews } }
                // or data might be an array — handle both shapes gracefully
                const data = response?.data
                if (Array.isArray(data)) {
                    return {
                        reviews: data,
                        averageRating: data.length > 0
                            ? data.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / data.length
                            : 0,
                        totalReviews: data.length,
                    }
                }
                return {
                    reviews: data?.reviews ?? [],
                    averageRating: data?.averageRating ?? 0,
                    totalReviews: data?.totalReviews ?? data?.reviews?.length ?? 0,
                }
            },
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: '/reviews',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response: any) => response.data,
            invalidatesTags: (result, error, { courseId }) => [
                { type: 'Review', id: courseId },
                'Course'
            ],
        }),
    }),
})

export const { useGetCourseReviewsQuery, useCreateReviewMutation } = reviewsApi
