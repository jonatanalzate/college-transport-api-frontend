import api from './api';

const ENDPOINTS = {
    BASE: '/vehiculos',
    SINGLE: '/vehiculo'
};

export const vehiculosService = {
    getAll: async () => {
        try {
            const userEmail = localStorage.getItem('user_email');
            console.log('Fetching vehicles for:', userEmail);
            const response = await api.get(`${ENDPOINTS.BASE}/?empresa_email=${userEmail}`);
            console.log('Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error details:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al obtener los vehículos');
        }
    },

    getByPlaca: async (placa) => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const response = await api.get(`${ENDPOINTS.SINGLE}/${placa}?empresa_email=${userEmail}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al obtener el vehículo');
        }
    },

    create: async (vehiculo) => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const vehiculoData = {
                placa: vehiculo.placa.toUpperCase(),
                marca: vehiculo.marca.toLowerCase(),
                modelo: vehiculo.modelo,
                lateral: vehiculo.lateral,
                año_de_fabricacion: Number(vehiculo.año_de_fabricacion),
                capacidad_pasajeros: Number(vehiculo.capacidad_pasajeros),
                estado_operativo: vehiculo.estado_operativo
            };

            console.log('Datos a enviar:', vehiculoData);
            const response = await api.post(
                `${ENDPOINTS.BASE}/`, 
                [vehiculoData],
                {
                    params: {
                        empresa_email: userEmail
                    }
                }
            );
            return response.data[0];
        } catch (error) {
            console.error('Error al crear vehículo:', error.response?.data);
            throw new Error(error.response?.data?.detail || 'Error al crear el vehículo');
        }
    },

    update: async (placa, vehiculo) => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const response = await api.put(
                `${ENDPOINTS.SINGLE}/${placa}?empresa_email=${userEmail}`, 
                vehiculo
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al actualizar el vehículo');
        }
    },

    delete: async (placa) => {
        try {
            const userEmail = localStorage.getItem('user_email');
            const response = await api.delete(
                `${ENDPOINTS.SINGLE}/${placa}?empresa_email=${userEmail}`
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.detail || 'Error al eliminar el vehículo');
        }
    }
}; 