import { ApiResponse } from '@/types/api';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions extends RequestInit {
    data?: any;
    params?: Record<string, string | number | boolean>;
}

async function client<T>(
    endpoint: string,
    { data, params, headers: customHeaders, ...customConfig }: RequestOptions = {}
): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...customHeaders,
    };

    // specific handling for FormData (file uploads)
    if (data instanceof FormData) {
        // Content-Type header should be omitted for FormData to let the browser set it with boundary
        // @ts-ignore
        delete headers['Content-Type'];
    }

    let url = `${BASE_URL}${endpoint}`;

    if (params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, String(value));
            }
        });
        url += `?${searchParams.toString()}`;
    }

    const config: RequestInit = {
        method: customConfig.method || 'GET',
        headers,
        ...customConfig,
    };

    if (data && !(data instanceof FormData)) {
        config.body = JSON.stringify(data);
    } else if (data instanceof FormData) {
        config.body = data;
    }

    try {
        const response = await fetch(url, config);
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Something went wrong');
        }

        return responseData as T;
    } catch (error: any) {
        console.error('API Error:', error);
        throw error;
    }
}

export const api = {
    get: <T>(endpoint: string, options?: RequestOptions) =>
        client<T>(endpoint, { ...options, method: 'GET' }),

    post: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
        client<T>(endpoint, { ...options, data, method: 'POST' }),

    put: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
        client<T>(endpoint, { ...options, data, method: 'PUT' }),

    patch: <T>(endpoint: string, data?: any, options?: RequestOptions) =>
        client<T>(endpoint, { ...options, data, method: 'PATCH' }),

    delete: <T>(endpoint: string, options?: RequestOptions) =>
        client<T>(endpoint, { ...options, method: 'DELETE' }),
};
