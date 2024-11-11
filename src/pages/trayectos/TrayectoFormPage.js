import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    Snackbar,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { trayectosService } from '../../services/trayectosService';

const TrayectoFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [trayecto, setTrayecto] = useState({
        fecha: null,
        hora_salida: null,
        hora_llegada: null,
        cantidad_pasajeros: '',
        kilometraje: '',
        observaciones: ''
    });

    useEffect(() => {
        if (id) {
            loadTrayecto();
        }
    }, [id]);

    const loadTrayecto = async () => {
        try {
            const data = await trayectosService.getById(id);
            setTrayecto(data);
        } catch (err) {
            setError('Error al cargar el trayecto');
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const trayectoData = {
                ...trayecto,
                cantidad_pasajeros: Number(trayecto.cantidad_pasajeros),
                kilometraje: Number(trayecto.kilometraje)
            };

            if (id) {
                await trayectosService.update(id, trayectoData);
                setSuccessMessage('Trayecto actualizado exitosamente');
            } else {
                if (!trayecto.fecha || !trayecto.hora_salida || !trayecto.hora_llegada || 
                    !trayecto.cantidad_pasajeros || !trayecto.kilometraje) {
                    setError('Todos los campos son requeridos excepto observaciones');
                    return;
                }
                await trayectosService.create(trayectoData);
                setSuccessMessage('Trayecto creado exitosamente');
            }
            setTimeout(() => navigate('/trayectos/lista'), 2000);
        } catch (err) {
            setError(err.message || 'Error al guardar el trayecto');
            console.error('Error completo:', err);
        }
    };

    const handleDelete = async () => {
        try {
            await trayectosService.delete(id);
            setSuccessMessage('Trayecto eliminado exitosamente');
            setTimeout(() => navigate('/trayectos/lista'), 2000);
        } catch (err) {
            setError('Error al eliminar el trayecto');
            console.error(err);
        }
        setOpenDialog(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrayecto(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                    {id ? 'Editar Trayecto' : 'Nuevo Trayecto'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <DatePicker
                                label="Fecha"
                                value={trayecto.fecha}
                                onChange={(newValue) => {
                                    setTrayecto(prev => ({ ...prev, fecha: newValue }));
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth required={!id} />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TimePicker
                                label="Hora Salida"
                                value={trayecto.hora_salida}
                                onChange={(newValue) => {
                                    setTrayecto(prev => ({ ...prev, hora_salida: newValue }));
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth required={!id} />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TimePicker
                                label="Hora Llegada"
                                value={trayecto.hora_llegada}
                                onChange={(newValue) => {
                                    setTrayecto(prev => ({ ...prev, hora_llegada: newValue }));
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth required={!id} />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Cantidad de Pasajeros"
                                name="cantidad_pasajeros"
                                type="number"
                                value={trayecto.cantidad_pasajeros}
                                onChange={handleChange}
                                inputProps={{ min: 0 }}
                                required={!id}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Kilometraje"
                                name="kilometraje"
                                type="number"
                                value={trayecto.kilometraje}
                                onChange={handleChange}
                                inputProps={{ min: 0 }}
                                required={!id}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Observaciones"
                                name="observaciones"
                                value={trayecto.observaciones}
                                onChange={handleChange}
                                multiline
                                rows={4}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button
                            variant="contained"
                            type="submit"
                        >
                            {id ? 'Actualizar' : 'Crear'}
                        </Button>
                        {id && (
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
                            onClick={() => navigate('/trayectos/lista')}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Paper>

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            >
                <DialogTitle>Confirmar Eliminación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Está seguro que desea eliminar este trayecto? Esta acción no se puede deshacer.
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
        </LocalizationProvider>
    );
};

export default TrayectoFormPage; 