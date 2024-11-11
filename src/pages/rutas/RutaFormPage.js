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
import { rutasService } from '../../services/rutasService';

const RutaFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [ruta, setRuta] = useState({
        id: '',
        nombre: '',
        codigo: '',
        origen: '',
        destino: '',
        duracion_estimada: ''
    });

    useEffect(() => {
        if (id) {
            loadRuta();
        }
    }, [id]);

    const loadRuta = async () => {
        try {
            const data = await rutasService.getById(id);
            setRuta(data);
        } catch (err) {
            setError('Error al cargar la ruta');
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const rutaData = {
                ...ruta,
                duracion_estimada: Number(ruta.duracion_estimada)
            };

            if (id) {
                await rutasService.update(id, rutaData);
                setSuccessMessage('Ruta actualizada exitosamente');
            } else {
                if (!ruta.nombre || !ruta.codigo || !ruta.origen || !ruta.destino || !ruta.duracion_estimada) {
                    setError('Todos los campos son requeridos');
                    return;
                }
                await rutasService.create(rutaData);
                setSuccessMessage('Ruta creada exitosamente');
            }
            setTimeout(() => navigate('/rutas/lista'), 2000);
        } catch (err) {
            setError(err.message || 'Error al guardar la ruta');
            console.error('Error completo:', err);
        }
    };

    const handleDelete = async () => {
        try {
            await rutasService.delete(id);
            setSuccessMessage('Ruta eliminada exitosamente');
            setTimeout(() => navigate('/rutas/lista'), 2000);
        } catch (err) {
            setError('Error al eliminar la ruta');
            console.error(err);
        }
        setOpenDialog(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRuta(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                    {id ? 'Editar Ruta' : 'Nueva Ruta'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nombre"
                                name="nombre"
                                value={ruta.nombre}
                                onChange={handleChange}
                                required={!id}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Código"
                                name="codigo"
                                value={ruta.codigo}
                                onChange={handleChange}
                                disabled={!!id}
                                required={!id}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Origen"
                                name="origen"
                                value={ruta.origen}
                                onChange={handleChange}
                                required={!id}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Destino"
                                name="destino"
                                value={ruta.destino}
                                onChange={handleChange}
                                required={!id}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Duración Estimada (minutos)"
                                name="duracion_estimada"
                                type="number"
                                value={ruta.duracion_estimada}
                                onChange={handleChange}
                                inputProps={{ min: 1 }}
                                required={!id}
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
                            onClick={() => navigate('/rutas/lista')}
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
                        ¿Está seguro que desea eliminar esta ruta? Esta acción no se puede deshacer.
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

export default RutaFormPage; 