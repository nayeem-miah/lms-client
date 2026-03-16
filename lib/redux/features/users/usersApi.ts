import { apiSlice } from '../../api/apiSlice'

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: (params) => ({
                url: '/users',
                params
            }),
            providesTags: ['User'],
            transformResponse: (response: any) => {
                return {
                    users: response.data,
                    meta: response.meta
                };
            },
        }),
        updateUserRole: builder.mutation({
            query: ({ id, role }) => ({
                url: `/users/${id}/role`,
                method: 'PATCH',
                body: { role },
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
})

export const {
    useGetAllUsersQuery,
    useUpdateUserRoleMutation,
    useDeleteUserMutation,
} = usersApi
