import api from './api';
import { ENDPOINTS } from '../config/api.config';

export const vehiculosService = {
    // Obtener todos los vehículos
    getAll: async () => {
        try {
            const response = await api.get('/vehiculos/');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Obtener un vehículo por placa
    getByPlaca: async (placa) => {
        try {
            const response = await api.get(`/vehiculo/${placa}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener vehículo:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al obtener el vehículo');
        }
    },

    // Crear vehículos (acepta un array)
    create: async (vehiculo) => {
        try {
            const vehiculoData = {
                placa: vehiculo.placa.trim(),
                marca: vehiculo.marca.trim(),
                modelo: vehiculo.modelo.trim(),
                lateral: vehiculo.lateral.trim(),
                año_de_fabricacion: Number(vehiculo.año_de_fabricacion),
                capacidad_pasajeros: Number(vehiculo.capacidad_pasajeros),
                estado_operativo: vehiculo.estado_operativo
            };

            // El endpoint espera un array de vehículos
            const response = await api.post('/vehiculos/', [vehiculoData]);
            return response.data[0]; // Retornamos el primer vehículo creado
        } catch (error) {
            console.error('Error completo:', error);
            throw new Error(error.response?.data?.detail || 'Error al crear el vehículo');
        }
    },

    // Actualizar un vehículo (PUT)
    update: async (placa, vehiculoActualizado) => {
        try {
            if (!placa) {
                throw new Error('La placa del vehículo es requerida');
            }

            // Primero obtenemos el vehículo actual para obtener su ID
            const vehiculoActual = await vehiculosService.getByPlaca(placa);
            
            const vehiculoData = {
                id: vehiculoActual.id, // Importante: incluir el ID
                placa: vehiculoActualizado.placa?.trim(),
                marca: vehiculoActualizado.marca?.trim(),
                modelo: vehiculoActualizado.modelo?.trim(),
                lateral: vehiculoActualizado.lateral?.trim(),
                año_de_fabricacion: Number(vehiculoActualizado.año_de_fabricacion),
                capacidad_pasajeros: Number(vehiculoActualizado.capacidad_pasajeros),
                estado_operativo: vehiculoActualizado.estado_operativo
            };

            // Usamos el ID para el PUT
            const response = await api.put(`/vehiculo/${vehiculoActual.id}`, vehiculoData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al actualizar el vehículo');
        }
    },

    // Actualizar parcialmente un vehículo (PATCH)
    updatePartial: async (id, vehiculo) => {
        try {
            const response = await api.patch(`/vehiculo/${id}`, vehiculo);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al actualizar el vehículo');
        }
    },

    // Eliminar un vehículo
    delete: async (placa) => {
        try {
            const response = await api.delete(`/vehiculo/${placa}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al eliminar el vehículo');
        }
    },

    // Obtener un vehículo por ID o placa
    getById: async (idOrPlaca) => {
        try {
            // Primero intentamos obtener por placa
            const response = await api.get(`/vehiculo/${idOrPlaca}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener vehículo:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al obtener el vehículo');
        }
    }
}; 