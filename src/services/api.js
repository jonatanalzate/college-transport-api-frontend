import axios from 'axios';
import { API_BASE_URL } from '../config/api.config';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    validateStatus: function (status) {
        return status >= 200 && status < 500;
    }
});

api.interceptors.request.use(request => {
    console.log('Starting Request:', request);
    return request;
});

api.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
}, error => {
    console.error('API Error:', error);
    return Promise.reject(error);
});

export const uploadCsv = async (endpoint, file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await api.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Upload Error:', error);
        throw error;
    }
};

export default api; 