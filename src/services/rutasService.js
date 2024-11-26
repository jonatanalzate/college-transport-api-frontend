import api from './api';

const ENDPOINTS = {
    BASE: '/rutas',
    SINGLE: '/ruta'
};

export const rutasService = {
    getAll: async () => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const response = await api.get(`${ENDPOINTS.BASE}/?empresa_email=${userEmail}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al obtener las rutas');
        }
    },

    getById: async (id) => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const response = await api.get(`${ENDPOINTS.SINGLE}/${id}?empresa_email=${userEmail}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al obtener la ruta');
        }
    },

    create: async (ruta) => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const rutaData = {
                nombre: ruta.nombre.trim(),
                codigo: ruta.codigo.trim(),
                origen: ruta.origen.trim(),
                destino: ruta.destino.trim(),
                duracion_estimada: Number(ruta.duracion_estimada)
            };

            const response = await api.post(
                `${ENDPOINTS.BASE}/`,
                rutaData,
                {
                    params: {
                        empresa_email: userEmail
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al crear la ruta');
        }
    },

    update: async (id, ruta) => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const response = await api.put(
                `${ENDPOINTS.SINGLE}/${id}?empresa_email=${userEmail}`,
                ruta
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al actualizar la ruta');
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
            throw new Error(error.response?.data?.detail || 'Error al eliminar la ruta');
        }
    }
}; 