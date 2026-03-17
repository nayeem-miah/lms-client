
import { apiSlice } from '../../api/apiSlice'

export const enrollmentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyEnrollments: builder.query({
            query: (params?: any) => ({
                url: '/enrollments/me',
                params,
            }),
            providesTags: ['Enrollment'],
            transformResponse: (response: any) => {
                // Handle both array response and wrapped { data: [...] } format
                if (Array.isArray(response)) return response
                if (Array.isArray(response?.data)) return response.data
                return []
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
        getInstructorEnrollments: builder.query({
            query: (params?: any) => ({
                url: '/instructor/enrollments',
                params,
            }),
            providesTags: ['Enrollment'],
            transformResponse: (response: any) => {
                return {
                    enrollments: response.data,
                    meta: response.meta
                };
            },
        }),
        getAllEnrollments: builder.query({
            query: (params?: any) => ({
                url: '/admin/enrollments',
                params,
            }),
            providesTags: ['Enrollment'],
            transformResponse: (response: any) => {
                return {
                    enrollments: response.data,
                    meta: response.meta
                };
            },
        }),
    }),
})

export const {
    useGetMyEnrollmentsQuery,
    useCreateEnrollmentMutation,
    useCheckEnrollmentQuery,
    useGetInstructorEnrollmentsQuery,
    useGetAllEnrollmentsQuery
} = enrollmentsApi
