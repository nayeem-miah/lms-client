import { api } from './client';
import { ApiResponse, Review } from '@/types/api';

export const reviewApi = {
    create: (data: { courseId: string; rating: number; comment: string }) =>
        api.post<ApiResponse<Review>>('/reviews', data),

    getByCourseId: (courseId: string) =>
        api.get<ApiResponse<{ averageRating: number; totalReviews: number; reviews: Review[] }>>(`/reviews/course/${courseId}`),
};
