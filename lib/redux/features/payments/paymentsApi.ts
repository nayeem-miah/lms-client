import { apiSlice } from '../../api/apiSlice'

export const paymentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPayments: builder.query({
            query: (params) => ({
                url: '/payments',
                params
            }),
            providesTags: ['Payment'],
            transformResponse: (response: any) => ({
                payments: response.data,
                meta: response.meta
            }),
        }),
        getRevenueStats: builder.query({
            query: () => '/payments/revenue-stats',
            providesTags: ['Payment'],
            transformResponse: (response: any) => response.data,
        }),
        createPaymentIntent: builder.mutation({
            query: (data) => ({
                url: '/payments/create-payment-intent',
                method: 'POST',
                body: data,
            }),
        }),
        createStripeSession: builder.mutation({
            query: (data) => ({
                url: '/payments',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response: any) => {
                // Response shape: { success, data: { checkoutUrl } }
                return response?.data ?? response
            },
            invalidatesTags: ['Payment', 'Enrollment'],
        }),
        getMyPayments: builder.query({
            query: () => '/payments/me',
            providesTags: ['Payment'],
            transformResponse: (response: any) => response.data,
        }),
    }),
})

export const {
    useGetPaymentsQuery,
    useGetRevenueStatsQuery,
    useCreatePaymentIntentMutation,
    useCreateStripeSessionMutation,
    useGetMyPaymentsQuery
} = paymentsApi
