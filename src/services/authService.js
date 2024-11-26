import api from './api';

const authService = {
    login: async (credentials) => {
        try {
            const formData = new FormData();
            formData.append('username', credentials.email);
            formData.append('password', credentials.password);
            
            const response = await api.post('/token', formData);
            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('user_email', credentials.email);
                return response.data;
            }
            throw new Error('No se recibió el token de acceso');
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    },

    register: async (empresaData) => {
        try {
            const response = await api.post('/empresas/', empresaData);
            return response.data;
        } catch (error) {
            console.error('Error en registro:', error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_email');
    },

    getCurrentUser: () => {
        return localStorage.getItem('user_email');
    },

    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        return !!token;
    }
};

export default authService; 