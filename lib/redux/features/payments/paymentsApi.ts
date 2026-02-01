import { apiSlice } from '../../api/apiSlice'

export const paymentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPayments: builder.query({
            query: () => '/payments',
            providesTags: ['Payment'],
            transformResponse: (response: any) => response.data,
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
    }),
})

export const { useGetPaymentsQuery, useGetRevenueStatsQuery, useCreatePaymentIntentMutation } = paymentsApi
