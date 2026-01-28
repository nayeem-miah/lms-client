import { api } from './client';
import { ApiResponse, LoginResponse, User } from '@/types/api';

export const authApi = {
    login: (data: { email: string; password?: string; deviceId?: string }) =>
        api.post<ApiResponse<LoginResponse>>('/auth/login', data),

    changePassword: (data: { oldPassword: string; newPassword: string }) =>
        api.post<ApiResponse<void>>('/auth/change-password', data),

    logout: (data: { deviceId: string }) =>
        api.post<ApiResponse<void>>('/auth/logout', data),

    getMe: () =>
        api.get<ApiResponse<User>>('/users/me'),

    updateProfile: (data: FormData) =>
        api.patch<ApiResponse<User>>('/users/update-profile', data),
};
