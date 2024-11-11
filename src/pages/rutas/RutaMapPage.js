import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import MapView from '../../components/MapView';
import { rutasService } from '../../services/rutasService';

const RutaMapPage = () => {
    const [rutas, setRutas] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);

    useEffect(() => {
        loadRutas();
    }, []);

    const loadRutas = async () => {
        try {
            const data = await rutasService.getAll();
            setRutas(data);
            if (data.length > 0) {
                setSelectedRoute(data[0]);
            }
        } catch (err) {
            console.error('Error al cargar las rutas:', err);
        }
    };

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Visualización de Rutas
            </Typography>
            <Box sx={{ height: '70vh' }}>
                <MapView route={selectedRoute} />
            </Box>
        </Paper>
    );
};

export default RutaMapPage; 