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
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { trayectosService } from '../../services/trayectosService';
import { rutasService } from '../../services/rutasService';
import { vehiculosService } from '../../services/vehiculosService';
import { conductoresService } from '../../services/conductoresService';

const TrayectoFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [trayecto, setTrayecto] = useState({
        id: '',
        fecha: null,
        hora_salida: null,
        hora_llegada: null,
        cantidad_pasajeros: '',
        kilometraje: '',
        observaciones: '',
        ruta_id: '',
        vehiculo_id: '',
        conductor_id: ''
    });
    const [rutas, setRutas] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [conductores, setConductores] = useState([]);
    const [trayectosActivos, setTrayectosActivos] = useState([]);
    const [conductoresDisponibles, setConductoresDisponibles] = useState([]);
    const [vehiculosDisponibles, setVehiculosDisponibles] = useState([]);

    useEffect(() => {
        loadTrayectosActivos();
        loadRutas();
        loadVehiculos();
        loadConductores();
        if (id) {
            loadTrayecto();
        }
    }, [id]);

    const loadTrayectosActivos = async () => {
        try {
            const data = await trayectosService.getActivos();
            setTrayectosActivos(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error al cargar trayectos activos:', err);
            setError('Error al cargar trayectos activos');
            setTrayectosActivos([]);
        }
    };

    const loadRutas = async () => {
        try {
            const data = await rutasService.getAll();
            setRutas(data);
        } catch (err) {
            setError('Error al cargar las rutas');
            console.error(err);
        }
    };

    const loadVehiculos = async () => {
        try {
            const data = await vehiculosService.getAll();
            setVehiculos(data);
        } catch (err) {
            setError('Error al cargar los vehículos');
            console.error(err);
        }
    };

    const loadConductores = async () => {
        try {
            const data = await conductoresService.getAll();
            setConductores(data);
        } catch (err) {
            setError('Error al cargar los conductores');
            console.error(err);
        }
    };

    const loadTrayecto = async () => {
        try {
            const data = await trayectosService.getById(id);
            setTrayecto({
                ...data,
                ruta_id: data.ruta_id || '',
                fecha: new Date(data.fecha),
                hora_salida: new Date(`1970-01-01T${data.hora_salida}`),
                hora_llegada: new Date(`1970-01-01T${data.hora_llegada}`)
            });
        } catch (err) {
            setError('Error al cargar el trayecto');
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const horaSalida = trayecto.hora_salida?.toTimeString().split(' ')[0];
            const horaLlegada = trayecto.hora_llegada?.toTimeString().split(' ')[0];
            
            // Validar que todos los campos necesarios estén presentes
            if (!trayecto.fecha || !horaSalida || !horaLlegada || 
                !trayecto.cantidad_pasajeros || !trayecto.kilometraje || 
                !trayecto.ruta_id || !trayecto.vehiculo_id || !trayecto.conductor_id) {
                setError('Todos los campos son requeridos excepto observaciones');
                return;
            }

            const activos = Array.isArray(trayectosActivos) ? trayectosActivos : [];
            
            // Verificar conflictos de horario
            const conflictos = activos.filter(trayectoActivo => {
                // Ignorar el trayecto actual en edición
                if (trayectoActivo.id === id) return false;
                
                const trayectoInicio = new Date(`1970-01-01T${trayectoActivo.hora_salida}`);
                const trayectoFin = new Date(`1970-01-01T${trayectoActivo.hora_llegada}`);
                const nuevoInicio = new Date(`1970-01-01T${horaSalida}`);
                const nuevoFin = new Date(`1970-01-01T${horaLlegada}`);

                const hayConflictoHorario = (
                    (nuevoInicio >= trayectoInicio && nuevoInicio <= trayectoFin) ||
                    (nuevoFin >= trayectoInicio && nuevoFin <= trayectoFin) ||
                    (nuevoInicio <= trayectoInicio && nuevoFin >= trayectoFin)
                );

                return hayConflictoHorario && (
                    trayectoActivo.conductor_id === trayecto.conductor_id ||
                    trayectoActivo.vehiculo_id === trayecto.vehiculo_id
                );
            });

            if (conflictos.length > 0) {
                const conductorConflicto = conflictos.some(t => t.conductor_id === trayecto.conductor_id);
                const vehiculoConflicto = conflictos.some(t => t.vehiculo_id === trayecto.vehiculo_id);
                
                if (conductorConflicto && vehiculoConflicto) {
                    setError('No se puede actualizar: El conductor y el vehículo ya están asignados a otro trayecto en este horario');
                } else if (conductorConflicto) {
                    setError('No se puede actualizar: El conductor ya está asignado a otro trayecto en este horario');
                } else {
                    setError('No se puede actualizar: El vehículo ya está asignado a otro trayecto en este horario');
                }
                return;
            }

            const trayectoData = {
                ...trayecto,
                fecha: trayecto.fecha.toISOString().split('T')[0],
                hora_salida: horaSalida,
                hora_llegada: horaLlegada,
                cantidad_pasajeros: Number(trayecto.cantidad_pasajeros),
                kilometraje: Number(trayecto.kilometraje)
            };

            if (id) {
                try {
                    console.log('Intentando actualizar trayecto:', trayectoData);
                    const resultado = await trayectosService.update(id, trayectoData);
                    console.log('Resultado de la actualización:', resultado);
                    
                    // Verificar si el resultado contiene un mensaje de error
                    if (resultado && resultado.detail) {
                        setError(resultado.detail);
                        return;
                    }
                    
                    setSuccessMessage('Trayecto actualizado exitosamente');
                    setTimeout(() => navigate('/trayectos/lista'), 2000);
                } catch (updateError) {
                    console.error('Error de actualización:', updateError);
                    // Mostrar el mensaje de error
                    setError(updateError.message || 'Error al actualizar el trayecto');
                    return;
                }
            } else {
                try {
                    await trayectosService.create(trayectoData);
                    setSuccessMessage('Trayecto creado exitosamente');
                    setTimeout(() => navigate('/trayectos/lista'), 2000);
                } catch (createError) {
                    console.error('Error de creación:', createError);
                    if (createError.response?.status === 400) {
                        setError(createError.response.data.detail || 'El conductor o vehículo ya está asignado a otro trayecto en este horario');
                    } else {
                        setError('No se pudo crear el trayecto: Verifique la disponibilidad del conductor y vehículo');
                    }
                    return;
                }
            }
        } catch (err) {
            const errorMessage = err.response?.data?.detail || 
                               err.message || 
                               'Error al procesar la solicitud';
            setError(`No se puede procesar la solicitud: ${errorMessage}`);
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

        if (name === 'hora_salida' || name === 'hora_llegada') {
            const newTrayecto = {
                ...trayecto,
                [name]: value
            };
            verificarDisponibilidad(
                newTrayecto.hora_salida?.toTimeString().split(' ')[0],
                newTrayecto.hora_llegada?.toTimeString().split(' ')[0]
            );
        }
    };

    const verificarDisponibilidad = (horaSalida, horaLlegada) => {
        if (!horaSalida || !horaLlegada) return;

        const conductoresOcupados = new Set();
        const vehiculosOcupados = new Set();

        const activos = Array.isArray(trayectosActivos) ? trayectosActivos : [];

        activos.forEach(trayectoActivo => {
            if (trayectoActivo.id === id) return;

            const trayectoInicio = new Date(`1970-01-01T${trayectoActivo.hora_salida}`);
            const trayectoFin = new Date(`1970-01-01T${trayectoActivo.hora_llegada}`);
            const nuevoInicio = new Date(`1970-01-01T${horaSalida}`);
            const nuevoFin = new Date(`1970-01-01T${horaLlegada}`);

            if (
                (nuevoInicio >= trayectoInicio && nuevoInicio <= trayectoFin) ||
                (nuevoFin >= trayectoInicio && nuevoFin <= trayectoFin) ||
                (nuevoInicio <= trayectoInicio && nuevoFin >= trayectoFin)
            ) {
                conductoresOcupados.add(trayectoActivo.conductor_id);
                vehiculosOcupados.add(trayectoActivo.vehiculo_id);
            }
        });

        const conductoresDisp = conductores.filter(c => !conductoresOcupados.has(c.id));
        const vehiculosDisp = vehiculos.filter(v => !vehiculosOcupados.has(v.id));

        setConductoresDisponibles(conductoresDisp);
        setVehiculosDisponibles(vehiculosDisp);
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
                            <FormControl fullWidth required>
                                <InputLabel>Ruta</InputLabel>
                                <Select
                                    value={trayecto.ruta_id}
                                    name="ruta_id"
                                    onChange={handleChange}
                                    label="Ruta"
                                >
                                    {rutas.map((ruta) => (
                                        <MenuItem key={ruta.id} value={ruta.id}>
                                            {ruta.nombre} - {ruta.origen} a {ruta.destino}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
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
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Vehículo</InputLabel>
                                <Select
                                    value={trayecto.vehiculo_id}
                                    name="vehiculo_id"
                                    onChange={handleChange}
                                    label="Vehículo"
                                >
                                    {(vehiculosDisponibles.length > 0 ? vehiculosDisponibles : vehiculos).map((vehiculo) => (
                                        <MenuItem 
                                            key={vehiculo.id} 
                                            value={vehiculo.id}
                                            disabled={vehiculosDisponibles.length > 0 && !vehiculosDisponibles.find(v => v.id === vehiculo.id)}
                                        >
                                            {vehiculo.placa} - {vehiculo.modelo}
                                            {vehiculosDisponibles.length > 0 && !vehiculosDisponibles.find(v => v.id === vehiculo.id) && 
                                                " (No disponible en este horario)"}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Conductor</InputLabel>
                                <Select
                                    value={trayecto.conductor_id}
                                    name="conductor_id"
                                    onChange={handleChange}
                                    label="Conductor"
                                >
                                    {(conductoresDisponibles.length > 0 ? conductoresDisponibles : conductores).map((conductor) => (
                                        <MenuItem 
                                            key={conductor.id} 
                                            value={conductor.id}
                                            disabled={conductoresDisponibles.length > 0 && !conductoresDisponibles.find(c => c.id === conductor.id)}
                                        >
                                            {conductor.nombre} {conductor.apellido}
                                            {conductoresDisponibles.length > 0 && !conductoresDisponibles.find(c => c.id === conductor.id) && 
                                                " (No disponible en este horario)"}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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