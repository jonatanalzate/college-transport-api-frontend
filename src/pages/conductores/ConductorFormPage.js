import React, { useState, useEffect, useCallback } from 'react';
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
    DialogTitle,
    MenuItem
} from '@mui/material';
import { conductoresService } from '../../services/conductoresService';

const ConductorFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [conductor, setConductor] = useState({
        id: '',
        nombre: '',
        cedula: '',
        licencia: '',
        telefono: '',
        estado: '1'
    });

    const loadConductor = useCallback(async () => {
        try {
            const data = await conductoresService.getById(id);
            setConductor(data);
        } catch (err) {
            setError('Error al cargar el conductor');
            console.error(err);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            loadConductor();
        }
    }, [id, loadConductor]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await conductoresService.update(id, conductor);
                setSuccessMessage('Conductor actualizado exitosamente');
            } else {
                if (!conductor.nombre || !conductor.cedula || !conductor.licencia || !conductor.telefono) {
                    setError('Todos los campos son requeridos');
                    return;
                }
                await conductoresService.create(conductor);
                setSuccessMessage('Conductor creado exitosamente');
            }
            setTimeout(() => navigate('/conductores/lista'), 2000);
        } catch (err) {
            setError(err.message || 'Error al guardar el conductor');
            console.error('Error completo:', err);
        }
    };

    const handleDelete = async () => {
        try {
            await conductoresService.delete(id);
            setSuccessMessage('Conductor eliminado exitosamente');
            setTimeout(() => navigate('/conductores/lista'), 2000);
        } catch (err) {
            setError('Error al eliminar el conductor');
            console.error(err);
        }
        setOpenDialog(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConductor(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                    {id ? 'Editar Conductor' : 'Nuevo Conductor'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nombre"
                                name="nombre"
                                value={conductor.nombre}
                                onChange={handleChange}
                                required={!id}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Cédula"
                                name="cedula"
                                value={conductor.cedula}
                                onChange={handleChange}
                                required={!id}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Licencia"
                                name="licencia"
                                value={conductor.licencia}
                                onChange={handleChange}
                                required={!id}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Teléfono"
                                name="telefono"
                                value={conductor.telefono}
                                onChange={handleChange}
                                required={!id}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Estado"
                                name="estado"
                                value={conductor.estado}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="1">Activo</MenuItem>
                                <MenuItem value="0">Inactivo</MenuItem>
                            </TextField>
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
                            onClick={() => navigate('/conductores/lista')}
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
                        ¿Está seguro que desea eliminar este conductor? Esta acción no se puede deshacer.
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

export default ConductorFormPage; 