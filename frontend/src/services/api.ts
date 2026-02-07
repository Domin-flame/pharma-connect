import axios, { AxiosResponse } from 'axios';
import { AuthResponse, Pharmacy, Product, User } from '../types';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the JWT token to headers if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    login: (credentials: any): Promise<AxiosResponse<AuthResponse>> => api.post('/token/', credentials),
    register: (userData: any): Promise<AxiosResponse<User>> => api.post('/users/register/', userData),
    refresh: (): Promise<AxiosResponse<AuthResponse>> => api.post('/token/refresh/', { refresh: localStorage.getItem('refresh_token') }),
};

export const pharmacyService = {
    getPharmacies: (params?: any): Promise<AxiosResponse<Pharmacy[]>> => api.get('/pharmacie/', { params }),
    getPharmacy: (id: string): Promise<AxiosResponse<Pharmacy>> => api.get(`/pharmacie/${id}/`),
    getMyPharmacy: (): Promise<AxiosResponse<Pharmacy[]>> => api.get('/pharmacie/'),
    createPharmacy: (data: any): Promise<AxiosResponse<Pharmacy>> => api.post('/pharmacie/', data),
    updatePharmacy: (id: number, data: any): Promise<AxiosResponse<Pharmacy>> => api.put(`/pharmacie/${id}/`, data),
    patchPharmacy: (id: number, data: any): Promise<AxiosResponse<Pharmacy>> => api.patch(`/pharmacie/${id}/`, data),
};

export const productService = {
    getProducts: (params?: any): Promise<AxiosResponse<Product[]>> => api.get('/produits/', { params }),
    getProduct: (id: string): Promise<AxiosResponse<Product>> => api.get(`/produits/${id}/`),
};

export const orderService = {
    getOrders: (): Promise<AxiosResponse<any[]>> => api.get('/commandes/'),
    createOrder: (orderData: any): Promise<AxiosResponse<any>> => api.post('/commandes/', orderData),
};

export default api;
