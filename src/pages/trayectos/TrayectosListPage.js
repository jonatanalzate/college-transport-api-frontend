import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import ListPage from '../../components/ListPage';
import { trayectosService } from '../../services/trayectosService';

const TrayectosListPage = () => {
    const [trayectos, setTrayectos] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const columns = [
        { id: 'id', label: 'ID' },
        { id: 'ruta_id', label: 'Ruta' },
        { id: 'vehiculo_id', label: 'Vehículo' },
        { id: 'conductor_id', label: 'Conductor' },
        { id: 'hora_inicio', label: 'Hora Inicio' },
        { id: 'hora_fin', label: 'Hora Fin' },
        { id: 'estado', label: 'Estado' }
    ];

    useEffect(() => {
        loadTrayectos();
    }, []);

    const loadTrayectos = async () => {
        try {
            const data = await trayectosService.getAll();
            setTrayectos(data);
        } catch (err) {
            setError('Error al cargar los trayectos');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await trayectosService.delete(id);
            setSuccessMessage('Trayecto eliminado exitosamente');
            loadTrayectos();
        } catch (err) {
            setError('Error al eliminar el trayecto');
            console.error(err);
        }
    };

    return (
        <>
            <ListPage
                title="Trayectos"
                items={trayectos}
                columns={columns}
                onDelete={handleDelete}
                addPath="/trayectos/nuevo"
                editPath="/trayectos/editar"
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

export default TrayectosListPage; 