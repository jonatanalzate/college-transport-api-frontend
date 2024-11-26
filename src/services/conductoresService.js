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
            const userEmail = localStorage.getItem('user_email');
            const conductorData = {
                nombre: conductor.nombre.trim(),
                cedula: conductor.cedula.trim(),
                licencia: conductor.licencia.trim(),
                telefono: conductor.telefono.trim(),
                estado: conductor.estado.toString()
            };

            const response = await api.post(
                `${ENDPOINTS.BASE}/`,
                conductorData,
                {
                    params: {
                        empresa_email: userEmail
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al crear el conductor');
        }
    },

    update: async (id, conductor) => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const response = await api.put(
                `${ENDPOINTS.SINGLE}/${id}?empresa_email=${userEmail}`,
                conductor
            );
            return response.data;
        } catch (error) {
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
    }
}; 