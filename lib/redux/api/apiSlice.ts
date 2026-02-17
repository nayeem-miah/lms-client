
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { logOut } from '../features/auth/authSlice'
import toast from 'react-hot-toast'

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any).auth?.token || (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null)
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    },
})

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    // Check if the error is 401 (Unauthorized) or 403 (Forbidden) - token expired or invalid
    if (result.error && (result.error.status === 401 || result.error.status === 403)) {
        console.log('Token expired or invalid, logging out...')

        // Dispatch logout action
        api.dispatch(logOut())

        // Show toast notification
        toast.error('Your session has expired. Please log in to continue.')

        // Redirect to login page
        if (typeof window !== 'undefined') {
            window.location.href = '/login'
        }
    }

    return result
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User', 'Course', 'Enrollment', 'Review', 'Payment', 'Dashboard'],
    endpoints: (builder) => ({}),
})
