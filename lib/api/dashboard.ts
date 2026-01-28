import { api } from './client';
import { ApiResponse, DashboardSummary } from '@/types/api';

export const dashboardApi = {
    getSummary: () =>
        api.get<ApiResponse<DashboardSummary>>('/admin/dashboard/summary'),
};
