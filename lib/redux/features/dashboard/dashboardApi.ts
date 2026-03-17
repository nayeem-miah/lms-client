
import { apiSlice } from '../../api/apiSlice'

export const dashboardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardSummary: builder.query({
            query: () => ({
                url: '/admin/dashboard/summary',
                method: 'GET',
            }),
            providesTags: ['Dashboard'],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        getInstructorActivities: builder.query({
            query: () => ({
                url: '/instructor/dashboard/activities',
                method: 'GET',
            }),
            providesTags: ['Dashboard'],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
        getAdminActivities: builder.query({
            query: () => ({
                url: '/admin/dashboard/activities',
                method: 'GET',
            }),
            providesTags: ['Dashboard'],
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
    }),
})

export const {
    useGetDashboardSummaryQuery,
    useGetInstructorActivitiesQuery,
    useGetAdminActivitiesQuery
} = dashboardApi
