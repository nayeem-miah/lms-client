
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types/api'

interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
}

const initialState: AuthState = {
    user: null,
    token: typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null,
    isAuthenticated: false,
    isLoading: true,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            const { user, token } = action.payload
            state.user = user
            state.token = token
            state.isAuthenticated = true
            state.isLoading = false
            localStorage.setItem('accessToken', token)
        },
        logOut: (state) => {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            state.isLoading = false
            localStorage.removeItem('accessToken')
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isAuthenticated = true
            state.isLoading = false
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    },
})

export const { setCredentials, logOut, setUser, setLoading } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: any) => state.auth.user
export const selectCurrentToken = (state: any) => state.auth.token
export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated
export const selectIsLoading = (state: any) => state.auth.isLoading
