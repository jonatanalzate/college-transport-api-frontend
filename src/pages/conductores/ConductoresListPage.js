import React, { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import ListPage from '../../components/ListPage';
import { conductoresService } from '../../services/conductoresService';
import { useNavigate } from 'react-router-dom';

const ConductoresListPage = () => {
    const [conductores, setConductores] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const columns = [
        { id: 'id', label: 'ID' },
        { id: 'nombre', label: 'Nombre' },
        { id: 'licencia', label: 'Licencia' },
        { id: 'telefono', label: 'Teléfono' },
        { id: 'estado', label: 'Estado' }
    ];

    useEffect(() => {
        loadConductores();
    }, []);

    const loadConductores = async () => {
        try {
            const data = await conductoresService.getAll();
            setConductores(data);
        } catch (err) {
            setError('Error al cargar los conductores');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await conductoresService.delete(id);
            setSuccessMessage('Conductor eliminado exitosamente');
            loadConductores();
        } catch (err) {
            setError('Error al eliminar el conductor');
            console.error(err);
        }
    };

    const handleEdit = (item) => {
        navigate(`/conductores/editar/${item.id}`);
    };

    return (
        <>
            <ListPage
                title="Conductores"
                items={conductores}
                columns={columns}
                onDelete={handleDelete}
                onEdit={handleEdit}
                addPath="/conductores/nuevo"
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

export default ConductoresListPage; 