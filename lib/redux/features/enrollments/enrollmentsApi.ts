
import { apiSlice } from '../../api/apiSlice'

export const enrollmentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyEnrollments: builder.query({
            query: () => '/enrollments/me',
            providesTags: ['Enrollment'],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        createEnrollment: builder.mutation({
            query: (courseId) => ({
                url: `/enrollments/${courseId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Enrollment'],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        checkEnrollment: builder.query({
            query: (courseId) => `/enrollments/me/${courseId}`,
            providesTags: (result, error, courseId) => [{ type: 'Enrollment', id: courseId }],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
    }),
})

export const { useGetMyEnrollmentsQuery, useCreateEnrollmentMutation, useCheckEnrollmentQuery } = enrollmentsApi
