import React, { useState, useEffect } from 'react';
import {
    Paper,
    Grid,
    Typography,
    Box,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    Divider,
    Chip,
    Snackbar,
    Alert
} from '@mui/material';
import MapView from '../../components/MapView';
import { trayectosService } from '../../services/trayectosService';
import { rutasService } from '../../services/rutasService';
import { vehiculosService } from '../../services/vehiculosService';
import { conductoresService } from '../../services/conductoresService';

const MonitoreoPage = () => {
    const [trayectosActivos, setTrayectosActivos] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadTrayectosActivos();
        const interval = setInterval(loadTrayectosActivos, 30000);
        return () => clearInterval(interval);
    }, []);

    const loadTrayectosActivos = async () => {
        try {
            const trayectos = await trayectosService.getActivos();
            const trayectosData = await Promise.all(
                trayectos.map(async (trayecto) => {
                    const [ruta, vehiculo, conductor] = await Promise.all([
                        rutasService.getById(trayecto.ruta_id),
                        vehiculosService.getByPlaca(trayecto.vehiculo_id),
                        conductoresService.getById(trayecto.conductor_id)
                    ]);
                    return {
                        ...trayecto,
                        ruta,
                        vehiculo,
                        conductor
                    };
                })
            );
            setTrayectosActivos(trayectosData);
        } catch (err) {
            setError('Error al cargar los trayectos activos');
            console.error(err);
        }
    };

    return (
        <Grid container spacing={3}>
            {/* Mapa */}
            <Grid item xs={12} md={8}>
                <Paper sx={{ p: 2, height: '70vh' }}>
                    <Typography variant="h6" gutterBottom>
                        Monitoreo en Tiempo Real
                    </Typography>
                    <Box sx={{ height: 'calc(100% - 40px)' }}>
                        <MapView route={selectedRoute} />
                    </Box>
                </Paper>
            </Grid>

            {/* Lista de Trayectos Activos */}
            <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, height: '70vh', overflow: 'auto' }}>
                    <Typography variant="h6" gutterBottom>
                        Trayectos Activos
                    </Typography>
                    <List>
                        {trayectosActivos.map((trayecto) => (
                            <React.Fragment key={trayecto.id}>
                                <ListItem 
                                    button
                                    onClick={() => setSelectedRoute(trayecto.ruta)}
                                    selected={selectedRoute?.id === trayecto.ruta.id}
                                >
                                    <Card sx={{ width: '100%' }}>
                                        <CardContent>
                                            <Typography variant="h6" component="div">
                                                Ruta: {trayecto.ruta.nombre}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                Vehículo: {trayecto.vehiculo.placa}
                                            </Typography>
                                            <Typography color="text.secondary">
                                                Conductor: {trayecto.conductor.nombre}
                                            </Typography>
                                            <Box sx={{ mt: 1 }}>
                                                <Chip 
                                                    label={`Inicio: ${trayecto.hora_inicio}`}
                                                    size="small"
                                                    sx={{ mr: 1 }}
                                                />
                                                <Chip 
                                                    label={`Fin: ${trayecto.hora_fin}`}
                                                    size="small"
                                                />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                        {trayectosActivos.length === 0 && (
                            <ListItem>
                                <ListItemText 
                                    primary="No hay trayectos activos"
                                    secondary="Los trayectos activos aparecerán aquí"
                                />
                            </ListItem>
                        )}
                    </List>
                </Paper>
            </Grid>

            {error && (
                <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
                    <Alert severity="error">{error}</Alert>
                </Snackbar>
            )}
        </Grid>
    );
};

export default MonitoreoPage; 