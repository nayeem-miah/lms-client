
import { apiSlice } from '../../api/apiSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (payload) => ({
                url: '/auth/login',
                method: 'POST',
                body: payload,
            }),
            transformResponse: (response, meta, arg) => {
                return response.data;
            },
        }),
        register: builder.mutation({
            query: (payload) => ({
                url: '/users',
                method: 'POST',
                body: payload,
            }),
            transformResponse: (response, meta, arg) => {
                return response;
            },
        }),
        getMe: builder.query({
            query: () => '/users/me',
            transformResponse: (response, meta, arg) => {
                return response.data;
            },
        }),
        changePassword: builder.mutation({
            query: (payload) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: payload,
            }),
            transformResponse: (response, meta, arg) => {
                return response.data;
            },
        }),
        updateProfile: builder.mutation({
            query: (payload) => ({
                url: '/users/update-profile',
                method: 'PATCH',
                body: payload,
            }),
            transformResponse: (response: any) => {
                return response.data;
            },
        }),
    }),
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetMeQuery,
    useChangePasswordMutation,
    useUpdateProfileMutation
} = authApi;
