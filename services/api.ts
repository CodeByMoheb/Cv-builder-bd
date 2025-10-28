import {
  ResumeData,
  SavedResume,
  User,
  BlogPost,
  Template,
  AdminStats,
  Payment,
} from './types';

const API_BASE_URL = 'http://localhost:5105/api';

// Helper for making API requests
const apiRequest = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const token = localStorage.getItem('authToken');
    const headers = new Headers(options.headers || {});
    
    // Don't set Content-Type for FormData, browser does it with boundary
    if (!(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }
    
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = { message: response.statusText };
            }
            
            let errorMessage = errorData?.message || errorData?.title;
            
            // If no specific message from backend, create a user-friendly one based on status code.
            if (!errorMessage || errorMessage.trim() === '') {
                switch (response.status) {
                    case 401:
                        errorMessage = 'Authentication failed. Please check your credentials.';
                        break;
                    case 403:
                        errorMessage = 'You do not have permission to perform this action.';
                        break;
                    case 404:
                        errorMessage = 'The requested resource was not found.';
                        break;
                    case 500:
                        errorMessage = 'An internal server error occurred. Please try again later.';
                        break;
                    default:
                        errorMessage = `An unexpected error occurred (Status: ${response.status}).`;
                }
            }
            
            console.error('API Error:', errorMessage, 'Status:', response.status, 'Response:', errorData);
            
            if (response.status === 401 && endpoint !== '/auth/login') { // Don't redirect on login fail
                localStorage.removeItem('authToken');
                // Use a simple hash change for navigation in this environment
                window.location.hash = 'login';
            }
            
            throw new Error(errorMessage);
        }
        
        if (response.status === 204) {
            return undefined as T;
        }

        return response.json();
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new Error('Network error: Could not connect to the backend. Is the server running and CORS configured?');
        }
        // Re-throw other errors (like the ones we create from bad statuses)
        throw error;
    }
};


// --- Auth APIs ---
export const login = (email: string, password: string): Promise<{ token: string, user: User }> =>
    apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

export const register = (email: string, password: string): Promise<{ token: string, user: User }> =>
    apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
    
export const getSelf = (): Promise<User> => apiRequest('/users/me');

export const requestPasswordReset = (email: string): Promise<void> =>
    apiRequest('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
    });

export const resetPassword = (token: string, newPassword: string): Promise<void> =>
    apiRequest('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, newPassword }),
    });


// --- Resume APIs ---
export const getResumes = (): Promise<SavedResume[]> => apiRequest('/resumes');
export const getResumeById = (id: string): Promise<SavedResume> => apiRequest(`/resumes/${id}`);
export const createResume = (data: Omit<SavedResume, 'id' | 'userId' | 'lastModified'>): Promise<SavedResume> =>
    apiRequest('/resumes', {
        method: 'POST',
        body: JSON.stringify(data),
    });

export const updateResume = (id: string, data: Partial<Omit<SavedResume, 'id' | 'userId'>>): Promise<SavedResume> =>
    apiRequest(`/resumes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
    
export const deleteResume = (id: string): Promise<void> =>
    apiRequest(`/resumes/${id}`, { method: 'DELETE' });

export const duplicateResume = (id: string): Promise<SavedResume> =>
    apiRequest(`/resumes/${id}/duplicate`, { method: 'POST' });


// --- User Profile ---
export const updateUserProfile = (data: { name?: string, photo?: string }): Promise<User> =>
    apiRequest('/users/me', {
        method: 'PUT',
        body: JSON.stringify(data),
    });

export const changePassword = (data: { oldPassword: string, newPassword: string }): Promise<void> =>
    apiRequest('/users/me/password', {
        method: 'PUT',
        body: JSON.stringify(data),
    });
    
// --- Public APIs ---
export const getBlogPosts = (): Promise<BlogPost[]> => apiRequest('/blog/posts');
export const getBlogPostBySlug = (slug: string): Promise<BlogPost> => apiRequest(`/blog/posts/${slug}`);
export const submitContactForm = (formData: { name: string; email: string; message: string }): Promise<void> =>
    apiRequest('/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
    });
    
// --- Admin APIs ---
export const getDashboardStats = (): Promise<AdminStats> => apiRequest('/admin/stats');
export const adminGetAllUsers = (): Promise<User[]> => apiRequest('/admin/users');
export const adminUpdateUser = (id: string, data: Partial<User>): Promise<User> =>
    apiRequest(`/admin/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
export const adminDeleteUser = (id: string): Promise<void> =>
    apiRequest(`/admin/users/${id}`, { method: 'DELETE' });
    
export const adminGetTemplates = (): Promise<Template[]> => apiRequest('/admin/templates');
export const adminCreateTemplate = (formData: FormData): Promise<Template> =>
    apiRequest('/admin/templates', {
        method: 'POST',
        body: formData,
    });
export const adminUpdateTemplate = (id: string, formData: FormData): Promise<Template> =>
    apiRequest(`/admin/templates/${id}`, {
        method: 'PUT',
        body: formData,
    });
export const adminDeleteTemplate = (id: string): Promise<void> =>
    apiRequest(`/admin/templates/${id}`, { method: 'DELETE' });

export const adminGetBlogPosts = (): Promise<BlogPost[]> => apiRequest('/admin/blog/posts');
export const adminCreateBlogPost = (data: Partial<BlogPost>): Promise<BlogPost> =>
    apiRequest('/admin/blog/posts', {
        method: 'POST',
        body: JSON.stringify(data),
    });
export const adminUpdateBlogPost = (id: string, data: Partial<BlogPost>): Promise<BlogPost> =>
    apiRequest(`/admin/blog/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
export const adminDeleteBlogPost = (id: string): Promise<void> =>
    apiRequest(`/admin/blog/posts/${id}`, { method: 'DELETE' });

export const adminGetPayments = (): Promise<Payment[]> => apiRequest('/admin/payments');