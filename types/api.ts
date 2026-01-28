export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    totalPages: number;
  } | null;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role?: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
  profilePhoto?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User; // Assuming user details are returned or decoded
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  instructorId: string | User;
  thumbnail: string;
  thumbnailPublicId?: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  isPublished: boolean;
  ratingAvg: number;
  totalEnrollments: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseData {
  title: string;
  description: string;
  price: number;
  category: string;
  level: string;
  file?: File;
}

export interface UpdateCourseData {
  isPublished?: boolean;
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  level?: string;
  file?: File;
}

export interface Payment {
  _id: string;
  userId: string | User;
  courseId: string | Course;
  amount: number;
  currency: string;
  status: 'PAID' | 'PENDING' | 'FAILED';
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Enrollment {
  _id: string;
  userId: string | User;
  courseId: string | Course;
  progress: number;
  isActive: boolean;
  enrolledAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  userId: string | User;
  courseId: string | Course;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardSummary {
  totalUsers: number;
  totalCourses: number;
  totalRevenue: number;
}
