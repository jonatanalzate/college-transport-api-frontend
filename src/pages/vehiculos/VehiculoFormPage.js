import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    FormControlLabel,
    Switch,
    Alert,
    Snackbar,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { vehiculosService } from '../../services/vehiculosService';
import BackButton from '../../components/BackButton';

const VehiculoFormPage = () => {
    const { id: placa } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [vehiculo, setVehiculo] = useState({
        id: '',
        placa: '',
        marca: '',
        modelo: '',
        lateral: '',
        año_de_fabricacion: '',
        capacidad_pasajeros: '',
        estado_operativo: 'activo'
    });

    const loadVehiculo = useCallback(async () => {
        try {
            const data = await vehiculosService.getByPlaca(placa);
            setVehiculo({
                ...data,
                estado_operativo: data.estado_operativo === 'activo'
            });
        } catch (err) {
            setError('Error al cargar el vehículo');
            console.error(err);
        }
    }, [placa]);

    useEffect(() => {
        if (placa) {
            loadVehiculo();
        }
    }, [placa, loadVehiculo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const vehiculoData = {
                ...vehiculo,
                año_de_fabricacion: vehiculo.año_de_fabricacion ? Number(vehiculo.año_de_fabricacion) : undefined,
                capacidad_pasajeros: vehiculo.capacidad_pasajeros ? Number(vehiculo.capacidad_pasajeros) : undefined,
                estado_operativo: vehiculo.estado_operativo ? 'activo' : 'inactivo'
            };

            if (placa) {
                await vehiculosService.update(placa, vehiculoData);
                setSuccessMessage('Vehículo actualizado exitosamente');
            } else {
                if (!vehiculo.placa || !vehiculo.marca || !vehiculo.modelo || 
                    !vehiculo.lateral || !vehiculo.año_de_fabricacion || 
                    !vehiculo.capacidad_pasajeros) {
                    setError('Todos los campos son requeridos para crear un nuevo vehículo');
                    return;
                }
                await vehiculosService.create(vehiculoData);
                setSuccessMessage('Vehículo creado exitosamente');
            }
            setTimeout(() => navigate('/vehiculos/lista'), 2000);
        } catch (err) {
            setError(err.message || 'Error al guardar el vehículo');
            console.error('Error completo:', err);
        }
    };

    const handleDelete = async () => {
        try {
            await vehiculosService.delete(placa);
            setSuccessMessage('Vehículo eliminado exitosamente');
            setTimeout(() => navigate('/vehiculos/lista'), 2000);
        } catch (err) {
            setError('Error al eliminar el vehículo');
            console.error(err);
        }
        setOpenDialog(false);
    };

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setVehiculo(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : 
                    (type === 'number' ? (value === '' ? '' : parseInt(value)) : value)
        }));
    };

    return (
        <>
            <BackButton to="/vehiculos/lista" />
            <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                    {placa ? 'Editar Vehículo' : 'Nuevo Vehículo'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Placa"
                                name="placa"
                                value={vehiculo.placa}
                                onChange={handleChange}
                                disabled={!!placa}
                                required={!placa}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Marca"
                                name="marca"
                                value={vehiculo.marca}
                                onChange={handleChange}
                                required={!placa}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Modelo"
                                name="modelo"
                                value={vehiculo.modelo}
                                onChange={handleChange}
                                required={!placa}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Lateral"
                                name="lateral"
                                value={vehiculo.lateral}
                                onChange={handleChange}
                                required={!placa}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Año de Fabricación"
                                name="año_de_fabricacion"
                                type="number"
                                value={vehiculo.año_de_fabricacion}
                                onChange={handleChange}
                                inputProps={{ min: 1900, max: new Date().getFullYear() }}
                                required={!placa}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Capacidad de Pasajeros"
                                name="capacidad_pasajeros"
                                type="number"
                                value={vehiculo.capacidad_pasajeros}
                                onChange={handleChange}
                                inputProps={{ min: 1 }}
                                required={!placa}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={vehiculo.estado_operativo === 'activo'}
                                        onChange={(e) => setVehiculo(prev => ({
                                            ...prev,
                                            estado_operativo: e.target.checked ? 'activo' : 'inactivo'
                                        }))}
                                        name="estado_operativo"
                                    />
                                }
                                label="Vehículo Activo"
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button
                            variant="contained"
                            type="submit"
                        >
                            {placa ? 'Actualizar' : 'Crear'}
                        </Button>
                        {placa && (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => setOpenDialog(true)}
                            >
                                Eliminar
                            </Button>
                        )}
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/vehiculos/lista')}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>

            {/* Diálogo de confirmación para eliminar */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>Confirmar Eliminación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Está seguro que desea eliminar este vehículo? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button onClick={handleDelete} color="error" autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

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

export default VehiculoFormPage; 