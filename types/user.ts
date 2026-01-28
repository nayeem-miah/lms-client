export type UserRole = 'ADMIN' | 'STUDENT' | 'INSTRUCTOR';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    level?: number;
    points?: number;
}
