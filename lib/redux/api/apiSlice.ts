
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth?.token || localStorage.getItem('accessToken')
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['User', 'Course', 'Enrollment', 'Review', 'Payment', 'Dashboard'],
    endpoints: (builder) => ({}),
})
