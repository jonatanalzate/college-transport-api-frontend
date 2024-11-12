import api from './api';
import { ENDPOINTS } from '../config/api.config';

export const rutasService = {
    getAll: async () => {
        try {
            const response = await api.get('/rutas/');
            return response.data.map(ruta => ({
                ...ruta,
                origen_coordenadas: ruta.origen_coordenadas || null,
                destino_coordenadas: ruta.destino_coordenadas || null
            }));
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/ruta/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener ruta:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al obtener la ruta');
        }
    },

    create: async (ruta) => {
        try {
            const rutaData = {
                nombre: ruta.nombre.trim(),
                codigo: ruta.codigo.trim(),
                origen: ruta.origen.trim(),
                destino: ruta.destino.trim(),
                duracion_estimada: Number(ruta.duracion_estimada)
            };

            const response = await api.post('/rutas/', [rutaData]);
            return response.data[0];
        } catch (error) {
            console.error('Error completo:', error);
            throw new Error(error.response?.data?.detail || 'Error al crear la ruta');
        }
    },

    update: async (id, rutaActualizada) => {
        try {
            if (!id) {
                throw new Error('El ID de la ruta es requerido');
            }

            const rutaData = {
                id: id,
                nombre: rutaActualizada.nombre?.trim(),
                codigo: rutaActualizada.codigo?.trim(),
                origen: rutaActualizada.origen?.trim(),
                destino: rutaActualizada.destino?.trim(),
                duracion_estimada: Number(rutaActualizada.duracion_estimada)
            };

            const response = await api.put(`/ruta/${id}`, rutaData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al actualizar la ruta');
        }
    },

    updatePartial: async (id, ruta) => {
        try {
            const response = await api.patch(`/ruta/${id}`, ruta);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al actualizar la ruta');
        }
    },

    delete: async (id) => {
        try {
            const response = await api.delete(`/ruta/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al eliminar la ruta');
        }
    }
}; 