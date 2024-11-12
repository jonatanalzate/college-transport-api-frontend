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
        { id: 'fecha', label: 'Fecha' },
        { id: 'hora_salida', label: 'Hora Salida' },
        { id: 'hora_llegada', label: 'Hora Llegada' },
        { id: 'cantidad_pasajeros', label: 'Pasajeros' },
        { id: 'kilometraje', label: 'Kilometraje' },
        { 
            id: 'ruta', 
            label: 'Ruta',
            render: (item) => item.ruta ? `${item.ruta.nombre} (${item.ruta.origen} - ${item.ruta.destino})` : 'N/A'
        }
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

    const handleEdit = (item) => {
        navigate(`/trayectos/editar/${item.id}`);
    };

    return (
        <>
            <ListPage
                title="Trayectos"
                items={trayectos}
                columns={columns}
                onDelete={handleDelete}
                onEdit={handleEdit}
                addPath="/trayectos/nuevo"
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