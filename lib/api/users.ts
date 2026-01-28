import { api } from './client';
import { ApiResponse, User } from '@/types/api';

export const userApi = {
    create: (data: User) =>
        api.post<ApiResponse<User>>('/users', data),

    getAll: (params?: { page: number; limit: number; search?: string; role?: string }) =>
        api.get<ApiResponse<User[]>>('/users', { params }),

    findById: (id: string) =>
        api.get<ApiResponse<User>>(`/users/${id}`),

    delete: (id: string) =>
        api.delete<ApiResponse<void>>(`/users/${id}`),

    seedAdmin: (data?: any) =>
        api.post<ApiResponse<void>>('/users/seed-admin', data),

    updateRole: (id: string, role: string) =>
        api.patch<ApiResponse<User>>(`/users/update-role/${id}`, { role }),

    updateStatus: (id: string, status: string) =>
        api.patch<ApiResponse<User>>(`/users/update-status/${id}`, { status }),
};
