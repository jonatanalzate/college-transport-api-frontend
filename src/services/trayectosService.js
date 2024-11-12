import api from './api';
import { ENDPOINTS } from '../config/api.config';

export const trayectosService = {
    getAll: async () => {
        try {
            const response = await api.get('/trayectos/');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/trayecto/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener trayecto:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al obtener el trayecto');
        }
    },

    getActivos: async () => {
        try {
            const response = await api.get('/trayectos/activos/');
            return response.data;
        } catch (error) {
            console.error('Error al obtener trayectos activos:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al obtener trayectos activos');
        }
    },

    create: async (trayecto) => {
        try {
            const trayectoData = {
                fecha: trayecto.fecha,
                hora_salida: trayecto.hora_salida,
                hora_llegada: trayecto.hora_llegada,
                cantidad_pasajeros: Number(trayecto.cantidad_pasajeros),
                kilometraje: Number(trayecto.kilometraje),
                observaciones: trayecto.observaciones,
                ruta_id: trayecto.ruta_id
            };

            const response = await api.post('/trayectos/', [trayectoData]);
            return response.data[0];
        } catch (error) {
            console.error('Error completo:', error);
            throw new Error(error.response?.data?.detail || 'Error al crear el trayecto');
        }
    },

    update: async (id, trayectoActualizado) => {
        try {
            if (!id) {
                throw new Error('El ID del trayecto es requerido');
            }

            const trayectoData = {
                id: id,
                fecha: trayectoActualizado.fecha,
                hora_salida: trayectoActualizado.hora_salida,
                hora_llegada: trayectoActualizado.hora_llegada,
                cantidad_pasajeros: Number(trayectoActualizado.cantidad_pasajeros),
                kilometraje: Number(trayectoActualizado.kilometraje),
                observaciones: trayectoActualizado.observaciones,
                ruta_id: trayectoActualizado.ruta_id
            };

            const response = await api.put(`/trayecto/${id}`, trayectoData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al actualizar el trayecto');
        }
    },

    updatePartial: async (id, trayecto) => {
        try {
            const response = await api.patch(`/trayecto/${id}`, trayecto);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al actualizar el trayecto');
        }
    },

    delete: async (id) => {
        try {
            const response = await api.delete(`/trayecto/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al eliminar el trayecto');
        }
    }
}; 