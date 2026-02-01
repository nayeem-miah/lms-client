import { apiSlice } from '../../api/apiSlice'

export const reviewsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourseReviews: builder.query({
            query: (courseId) => `/reviews/course/${courseId}`,
            providesTags: (result, error, courseId) => [{ type: 'Review', id: courseId }],
            transformResponse: (response: any) => response.data,
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: '/reviews',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, { courseId }) => [{ type: 'Review', id: courseId }, 'Course'],
        }),
    }),
})

export const { useGetCourseReviewsQuery, useCreateReviewMutation } = reviewsApi
