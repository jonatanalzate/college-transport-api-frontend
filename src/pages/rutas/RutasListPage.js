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
        { id: 'codigo', label: 'Código' },
        { id: 'nombre', label: 'Nombre' },
        { id: 'origen', label: 'Origen' },
        { id: 'destino', label: 'Destino' },
        { id: 'duracion_estimada', label: 'Duración (min)' }
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

    const handleEdit = (item) => {
        navigate(`/rutas/editar/${item.id}`);
    };

    return (
        <>
            <ListPage
                title="Rutas"
                items={rutas}
                columns={columns}
                onDelete={handleDelete}
                addPath="/rutas/nueva"
                onEdit={handleEdit}
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