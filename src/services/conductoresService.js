import api from './api';
import { ENDPOINTS } from '../config/api.config';

export const conductoresService = {
    getAll: async () => {
        try {
            const response = await api.get('/conductores/');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/conductor/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener conductor:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al obtener el conductor');
        }
    },

    create: async (conductor) => {
        try {
            const conductorData = {
                nombre: conductor.nombre.trim(),
                cedula: conductor.cedula.trim(),
                licencia: conductor.licencia.trim(),
                telefono: conductor.telefono.trim(),
                estado: conductor.estado
            };

            const response = await api.post('/conductores/', conductorData);
            return response.data;
        } catch (error) {
            console.error('Error completo:', error);
            throw new Error(error.response?.data?.detail || 'Error al crear el conductor');
        }
    },

    update: async (id, conductor) => {
        try {
            const response = await api.put(`/conductor/${id}`, conductor);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al actualizar el conductor');
        }
    },

    updatePartial: async (id, conductor) => {
        try {
            const response = await api.patch(`/conductor/${id}`, conductor);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al actualizar el conductor');
        }
    },

    delete: async (id) => {
        try {
            const response = await api.delete(`/conductor/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al eliminar el conductor');
        }
    }
}; 