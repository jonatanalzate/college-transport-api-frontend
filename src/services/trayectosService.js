import api from './api';

const ENDPOINTS = {
    BASE: '/trayectos',
    SINGLE: '/trayecto'
};

export const trayectosService = {
    getAll: async () => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const response = await api.get(`${ENDPOINTS.BASE}/?empresa_email=${userEmail}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al obtener los trayectos');
        }
    },

    getById: async (id) => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const response = await api.get(`${ENDPOINTS.SINGLE}/${id}?empresa_email=${userEmail}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al obtener el trayecto');
        }
    },

    getActivos: async () => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const response = await api.get(`${ENDPOINTS.BASE}/activos/?empresa_email=${userEmail}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al obtener los trayectos activos');
        }
    },

    create: async (trayecto) => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const trayectoData = {
                fecha: trayecto.fecha,
                hora_salida: trayecto.hora_salida,
                hora_llegada: trayecto.hora_llegada,
                cantidad_pasajeros: String(trayecto.cantidad_pasajeros),
                kilometraje: String(trayecto.kilometraje),
                observaciones: trayecto.observaciones,
                ruta_id: trayecto.ruta_id,
                vehiculo_id: trayecto.vehiculo_id,
                conductor_id: trayecto.conductor_id
            };

            const response = await api.post(
                `${ENDPOINTS.BASE}/`,
                trayectoData,
                {
                    params: {
                        empresa_email: userEmail
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al crear el trayecto');
        }
    },

    update: async (id, trayecto) => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const response = await api.put(
                `${ENDPOINTS.SINGLE}/${id}?empresa_email=${userEmail}`,
                trayecto
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al actualizar el trayecto');
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
            throw new Error(error.response?.data?.detail || 'Error al eliminar el trayecto');
        }
    }
}; 