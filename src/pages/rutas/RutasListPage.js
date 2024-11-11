import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import ListPage from '../../components/ListPage';
import { rutasService } from '../../services/rutasService';

const RutasListPage = () => {
    const [rutas, setRutas] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const columns = [
        { id: 'id', label: 'ID' },
        { id: 'nombre', label: 'Nombre' },
        { id: 'origen', label: 'Origen' },
        { id: 'destino', label: 'Destino' },
        { id: 'hora_inicio', label: 'Hora Inicio' },
        { id: 'hora_fin', label: 'Hora Fin' },
        { id: 'estado', label: 'Estado' }
    ];

    useEffect(() => {
        loadRutas();
    }, []);

    const loadRutas = async () => {
        try {
            const data = await rutasService.getAll();
            setRutas(data);
        } catch (err) {
            setError('Error al cargar las rutas');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await rutasService.delete(id);
            setSuccessMessage('Ruta eliminada exitosamente');
            loadRutas();
        } catch (err) {
            setError('Error al eliminar la ruta');
            console.error(err);
        }
    };

    return (
        <>
            <ListPage
                title="Rutas"
                items={rutas}
                columns={columns}
                onDelete={handleDelete}
                addPath="/rutas/nueva"
                editPath="/rutas/editar"
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

export default RutasListPage; 