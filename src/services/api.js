import axios from 'axios';

// Asegúrate de que esta URL coincida con tu servidor backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Para peticiones multipart/form-data (como el login), no establecer Content-Type
        if (config.url === '/token') {
            delete config.headers['Content-Type'];
        }
        console.log('Request Config:', config); // Para debugging
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
    (response) => {
        console.log('Response:', response); // Para debugging
        return response;
    },
    (error) => {
        console.error('Response Error:', error);
        
        if (!error.response) {
            // Error de red o servidor no disponible
            return Promise.reject(new Error('No se pudo conectar con el servidor. Verifique su conexión a internet y que el servidor esté funcionando.'));
        }

        if (error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user_email');
            window.location.href = '/login';
            return Promise.reject(new Error('Sesión expirada o inválida'));
        }

        // Manejar otros errores específicos
        if (error.response.data?.detail) {
            return Promise.reject(new Error(error.response.data.detail));
        }

        return Promise.reject(error);
    }
);

// Función genérica para subir archivos CSV con manejo de errores
export const uploadCsv = async (endpoint, file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await api.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Error al cargar el archivo CSV');
    }
};

export default api; 