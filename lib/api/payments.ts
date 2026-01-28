import { api } from './client';
import { ApiResponse, Payment } from '@/types/api';

export const paymentApi = {
    create: (courseId: string) =>
        api.post<ApiResponse<{ checkoutUrl: string }>>('/payments', { courseId }),

    getMyHistory: () =>
        api.get<ApiResponse<Payment[]>>('/payments/me'),

    getAll: () =>
        api.get<ApiResponse<Payment[]>>('/payments'),
};
