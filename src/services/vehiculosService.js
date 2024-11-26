import api from './api';

const ENDPOINTS = {
    BASE: '/vehiculos',
    SINGLE: '/vehiculo'
};

export const vehiculosService = {
    getVehiculos: async () => {
        try {
            const response = await api.get(ENDPOINTS.BASE + '/');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al obtener los vehículos');
        }
    },

    getVehiculo: async (id) => {
        try {
            const response = await api.get(`${ENDPOINTS.SINGLE}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al obtener el vehículo');
        }
    },

    createVehiculo: async (vehiculo) => {
        try {
            const response = await api.post(`${ENDPOINTS.BASE}/`, [vehiculo]);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al crear el vehículo');
        }
    },

    updateVehiculo: async (id, vehiculo) => {
        try {
            const response = await api.put(`${ENDPOINTS.SINGLE}/${id}`, vehiculo);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al actualizar el vehículo');
        }
    },

    deleteVehiculo: async (id) => {
        try {
            const response = await api.delete(`${ENDPOINTS.SINGLE}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al eliminar el vehículo');
        }
    },

    uploadVehiculos: async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await api.post(`${ENDPOINTS.BASE}/bulk`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al cargar el archivo de vehículos');
        }
    }
}; 