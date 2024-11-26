import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Alert } from '@mui/material';
import MapView from '../../components/MapView';
import { rutasService } from '../../services/rutasService';
import BackButton from '../../components/BackButton';

const RutaMapPage = () => {
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadRutas();
    }, []);

    const loadRutas = async () => {
        try {
            const data = await rutasService.getAll();
            if (data.length > 0) {
                setSelectedRoute(data[0]);
            }
        } catch (err) {
            console.error('Error al cargar las rutas:', err);
            setError('Error al cargar las rutas. Por favor, intente nuevamente.');
        }
    };

    return (
        <>
            <BackButton to="/rutas/lista" />
            <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Visualización de Rutas
                </Typography>
                
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {selectedRoute && !selectedRoute.origen_coordenadas && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                        Esta ruta no tiene coordenadas definidas.
                    </Alert>
                )}

                <Box sx={{ height: '70vh' }}>
                    <MapView route={selectedRoute} />
                </Box>
            </Paper>
        </>
    );
};

export default RutaMapPage; 