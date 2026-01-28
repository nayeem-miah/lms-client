import { api } from './client';
import { ApiResponse, Enrollment } from '@/types/api';

export const enrollmentApi = {
    enroll: (courseId: string) =>
        api.post<ApiResponse<Enrollment>>(`/enrollments/${courseId}`),

    getMyEnrollments: () =>
        api.get<ApiResponse<Enrollment[]>>('/enrollments/me'),
};
