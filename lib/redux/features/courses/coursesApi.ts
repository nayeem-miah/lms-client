
import { apiSlice } from '../../api/apiSlice'

export const coursesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCourses: builder.query({
            query: (params) => ({
                url: '/courses',
                params
            }),
            providesTags: ['Course'],
            transformResponse: (response: any) => {
                return {
                    courses: response.data,
                    meta: response.meta
                };
            },
        }),
        getAllCoursesByAdmin: builder.query({
            query: (params) => ({
                url: '/courses/admin',
                params
            }),
            providesTags: ['Course'],
            transformResponse: (response: any) => {
                return {
                    courses: response.data,
                    meta: response.meta
                };
            },
        }),
        getCourseById: builder.query({
            query: (id) => `/courses/${id}`,
            providesTags: (result, error, id) => [{ type: 'Course', id }],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        createCourse: builder.mutation({
            query: (data) => ({
                url: '/courses',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Course'],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        updateCourse: builder.mutation({
            query: ({ id, data }) => ({
                url: `/courses/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Course', id },
                'Course'
            ],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `/courses/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Course'],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        togglePublishCourse: builder.mutation({
            query: (id) => ({
                url: `/courses/${id}/toggle-publish`,
                method: 'PATCH',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Course', id }, 'Course'],
            transformResponse: (response: any) => response.data,
        }),
        getMyCourses: builder.query({
            query: () => '/courses/my-courses',
            providesTags: ['Course'],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        getInstructorCourses: builder.query({
            query: (params) => ({
                url: '/courses/my-courses',
                params
            }),
            providesTags: ['Course'],
            transformResponse: (response: any) => {
                return {
                    courses: response.data,
                    meta: response.meta
                };
            },
        }),
    }),
})

export const {
    useGetAllCoursesQuery,
    useGetCourseByIdQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useGetMyCoursesQuery,
    useGetInstructorCoursesQuery,
    useGetAllCoursesByAdminQuery,
    useTogglePublishCourseMutation,
} = coursesApi

