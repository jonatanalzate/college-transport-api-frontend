import api from './api';

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
                cantidad_pasajeros: String(trayecto.cantidad_pasajeros),
                kilometraje: String(trayecto.kilometraje),
                observaciones: trayecto.observaciones,
                ruta_id: trayecto.ruta_id,
                vehiculo_id: trayecto.vehiculo_id,
                conductor_id: trayecto.conductor_id
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
                cantidad_pasajeros: String(trayectoActualizado.cantidad_pasajeros),
                kilometraje: String(trayectoActualizado.kilometraje),
                observaciones: trayectoActualizado.observaciones,
                ruta_id: trayectoActualizado.ruta_id,
                vehiculo_id: trayectoActualizado.vehiculo_id,
                conductor_id: trayectoActualizado.conductor_id
            };

            try {
                const response = await api.put(`/trayecto/${id}`, trayectoData);
                console.log('Respuesta exitosa:', response.data);
                return response.data;
            } catch (apiError) {
                console.error('Error de la API:', {
                    status: apiError.response?.status,
                    statusText: apiError.response?.statusText,
                    data: apiError.response?.data,
                    detail: apiError.response?.data?.detail
                });

                // Lanzar el error con el mensaje específico
                throw new Error(apiError.response?.data?.detail || 'Error al actualizar el trayecto');
            }
        } catch (error) {
            console.error('Error en update:', error);
            throw error;
        }
    },

    updatePartial: async (id, trayecto) => {
        try {
            const trayectoData = {
                ...trayecto,
                ruta_id: trayecto.ruta_id || '',
                cantidad_pasajeros: String(trayecto.cantidad_pasajeros),
                kilometraje: String(trayecto.kilometraje),
                vehiculo_id: trayecto.vehiculo_id || '',
                conductor_id: trayecto.conductor_id || ''
            };

            if (trayectoData.ruta) {
                delete trayectoData.ruta;
            }

            const response = await api.patch(`/trayecto/${id}`, trayectoData);
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