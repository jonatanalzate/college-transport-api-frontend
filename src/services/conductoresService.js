import api from './api';

const ENDPOINTS = {
    BASE: '/conductores',
    SINGLE: '/conductor'
};

export const conductoresService = {
    getAll: async () => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const response = await api.get(`${ENDPOINTS.BASE}/?empresa_email=${userEmail}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al obtener los conductores');
        }
    },

    getById: async (id) => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const response = await api.get(`${ENDPOINTS.SINGLE}/${id}?empresa_email=${userEmail}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al obtener el conductor');
        }
    },

    create: async (conductor) => {
        try {
            // Validación básica
            if (!conductor.nombre || !conductor.cedula || !conductor.licencia || !conductor.telefono) {
                throw new Error('Todos los campos son obligatorios');
            }

            const userEmail = localStorage.getItem('user_email');
            const conductorData = {
                nombre: conductor.nombre.trim(),
                cedula: conductor.cedula.trim(),
                licencia: conductor.licencia.trim(),
                telefono: conductor.telefono.trim(),
                estado: conductor.estado.toString()
            };

            console.log('Enviando conductor:', [conductorData]);  // Para debugging

            const response = await api.post(
                `${ENDPOINTS.BASE}/`,
                [conductorData],  // Enviar como array
                {
                    params: {
                        empresa_email: userEmail
                    }
                }
            );

            console.log('Respuesta:', response.data);  // Para debugging
            return response.data[0];  // Retornar el primer conductor del array
        } catch (error) {
            console.error('Error completo:', error);
            console.error('Response data:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al crear el conductor');
        }
    },

    update: async (id, conductor) => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const conductorData = {
                nombre: conductor.nombre.trim(),
                cedula: conductor.cedula.trim(),
                licencia: conductor.licencia.trim(),
                telefono: conductor.telefono.trim(),
                estado: conductor.estado.toString()
            };

            const response = await api.put(
                `${ENDPOINTS.SINGLE}/${id}?empresa_email=${userEmail}`,
                conductorData
            );
            return response.data;
        } catch (error) {
            console.error('Error completo:', error);
            throw new Error(error.response?.data?.detail || 'Error al actualizar el conductor');
        }
    },

    delete: async (id) => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const response = await api.delete(
                `${ENDPOINTS.SINGLE}/${id}?empresa_email=${userEmail}`
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al eliminar el conductor');
        }
    },

    // Método adicional para carga masiva si lo necesitas
    uploadBulk: async (file) => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post(
                `${ENDPOINTS.BASE}/bulk?empresa_email=${userEmail}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al cargar el archivo');
        }
    }
};

export default conductoresService; 