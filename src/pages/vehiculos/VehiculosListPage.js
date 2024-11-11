import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import ListPage from '../../components/ListPage';
import { vehiculosService } from '../../services/vehiculosService';

const VehiculosListPage = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const columns = [
        { id: 'placa', label: 'Placa' },
        { id: 'marca', label: 'Marca' },
        { id: 'modelo', label: 'Modelo' },
        { id: 'lateral', label: 'Lateral' },
        { id: 'estado_operativo', label: 'Estado' }
    ];

    useEffect(() => {
        loadVehiculos();
    }, []);

    const loadVehiculos = async () => {
        try {
            const data = await vehiculosService.getAll();
            setVehiculos(data);
        } catch (err) {
            setError('Error al cargar los vehículos');
            console.error(err);
        }
    };

    const handleDelete = async (placa) => {
        try {
            await vehiculosService.delete(placa);
            setSuccessMessage('Vehículo eliminado exitosamente');
            loadVehiculos();
        } catch (err) {
            setError('Error al eliminar el vehículo');
            console.error(err);
        }
    };

    const handleEdit = (item) => {
        navigate(`/vehiculos/editar/${item.placa}`);
    };

    return (
        <>
            <ListPage
                title="Vehículos"
                items={vehiculos}
                columns={columns}
                onDelete={handleDelete}
                onEdit={handleEdit}
                addPath="/vehiculos/nuevo"
                loading={false}
                error={error}
            />
            <Snackbar 
                open={!!error} 
                autoHideDuration={6000} 
                onClose={() => setError(null)}
            >
                <Alert severity="error">{error}</Alert>
            </Snackbar>
            <Snackbar
                open={!!successMessage}
                autoHideDuration={6000}
                onClose={() => setSuccessMessage('')}
            >
                <Alert severity="success">{successMessage}</Alert>
            </Snackbar>
        </>
    );
};

export default VehiculosListPage; 