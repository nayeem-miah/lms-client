
import { apiSlice } from '../../api/apiSlice'

export const enrollmentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyEnrollments: builder.query({
            query: () => '/enrollments/my-enrollments',
            providesTags: ['Enrollment'],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        createEnrollment: builder.mutation({
            query: (data) => ({
                url: '/enrollments',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Enrollment'],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        checkEnrollment: builder.query({
            query: (courseId) => `/enrollments/check/${courseId}`,
            providesTags: (result, error, courseId) => [{ type: 'Enrollment', id: courseId }],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
    }),
})

export const { useGetMyEnrollmentsQuery, useCreateEnrollmentMutation, useCheckEnrollmentQuery } = enrollmentsApi
