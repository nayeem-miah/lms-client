import { api } from './client';
import { ApiResponse, Course, CreateCourseData, UpdateCourseData } from '@/types/api';

export const courseApi = {
    create: (data: CreateCourseData) => {
        const formData = new FormData();
        const { file, ...courseData } = data;
        formData.append('data', JSON.stringify(courseData));
        if (file) {
            formData.append('file', file);
        }
        return api.post<ApiResponse<Course>>('/courses', formData);
    },

    update: (id: string, data: UpdateCourseData) => {
        const formData = new FormData();
        const { file, ...courseData } = data;
        formData.append('data', JSON.stringify(courseData));
        if (file) {
            formData.append('file', file);
        }
        return api.patch<ApiResponse<Course>>(`/courses/${id}`, formData);
    },

    getAll: (params?: { page?: number; limit?: number; search?: string; category?: string; level?: string }) =>
        api.get<ApiResponse<Course[]>>('/courses', { params }),

    getById: (id: string) =>
        api.get<ApiResponse<Course>>(`/courses/${id}`),

    getInstructorCourses: () =>
        api.get<ApiResponse<Course[]>>('/courses/my-courses'),

    delete: (id: string) =>
        api.delete<ApiResponse<void>>(`/courses/${id}`),

    togglePublish: (id: string) =>
        api.patch<ApiResponse<Course>>(`/courses/${id}/toggle-publish`),

    getAllAdmin: () =>
        api.get<ApiResponse<Course[]>>('/courses/admin'),
};
