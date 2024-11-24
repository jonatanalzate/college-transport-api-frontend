import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Menu,
    MenuItem,
    IconButton
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import RouteIcon from '@mui/icons-material/Route';
import PeopleIcon from '@mui/icons-material/People';
import TimelineIcon from '@mui/icons-material/Timeline';
import MapIcon from '@mui/icons-material/Map';

const Navbar = () => {
    const [vehiculosMenu, setVehiculosMenu] = useState(null);
    const [rutasMenu, setRutasMenu] = useState(null);
    const [conductoresMenu, setConductoresMenu] = useState(null);
    const [trayectosMenu, setTrayectosMenu] = useState(null);

    const handleClose = () => {
        setVehiculosMenu(null);
        setRutasMenu(null);
        setConductoresMenu(null);
        setTrayectosMenu(null);
    };

    return (
        <AppBar position="static" sx={{ mb: 3 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    component={RouterLink}
                    to="/"
                    sx={{ mr: 2 }}
                >
                    <HomeIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Sistema de Transporte
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Vehículos */}
                    <Button
                        color="inherit"
                        startIcon={<DirectionsBusIcon />}
                        onClick={(e) => setVehiculosMenu(e.currentTarget)}
                    >
                        Vehículos
                    </Button>
                    <Menu
                        anchorEl={vehiculosMenu}
                        open={Boolean(vehiculosMenu)}
                        onClose={handleClose}
                    >
                        <MenuItem component={RouterLink} to="/vehiculos/lista" onClick={handleClose}>
                            Listar Vehículos
                        </MenuItem>
                        <MenuItem component={RouterLink} to="/vehiculos/nuevo" onClick={handleClose}>
                            Nuevo Vehículo
                        </MenuItem>
                        <MenuItem component={RouterLink} to="/vehiculos/cargar" onClick={handleClose}>
                            Cargar CSV
                        </MenuItem>
                    </Menu>

                    {/* Rutas */}
                    <Button
                        color="inherit"
                        startIcon={<RouteIcon />}
                        onClick={(e) => setRutasMenu(e.currentTarget)}
                    >
                        Rutas
                    </Button>
                    <Menu
                        anchorEl={rutasMenu}
                        open={Boolean(rutasMenu)}
                        onClose={handleClose}
                    >
                        <MenuItem component={RouterLink} to="/rutas/lista" onClick={handleClose}>
                            Listar Rutas
                        </MenuItem>
                        <MenuItem component={RouterLink} to="/rutas/nueva" onClick={handleClose}>
                            Nueva Ruta
                        </MenuItem>
                        <MenuItem component={RouterLink} to="/rutas/mapa" onClick={handleClose}>
                            Ver Mapa
                        </MenuItem>
                        <MenuItem component={RouterLink} to="/rutas/cargar" onClick={handleClose}>
                            Cargar CSV
                        </MenuItem>
                    </Menu>

                    {/* Conductores */}
                    <Button
                        color="inherit"
                        startIcon={<PeopleIcon />}
                        onClick={(e) => setConductoresMenu(e.currentTarget)}
                    >
                        Conductores
                    </Button>
                    <Menu
                        anchorEl={conductoresMenu}
                        open={Boolean(conductoresMenu)}
                        onClose={handleClose}
                    >
                        <MenuItem component={RouterLink} to="/conductores/lista" onClick={handleClose}>
                            Listar Conductores
                        </MenuItem>
                        <MenuItem component={RouterLink} to="/conductores/nuevo" onClick={handleClose}>
                            Nuevo Conductor
                        </MenuItem>
                        <MenuItem component={RouterLink} to="/conductores/cargar" onClick={handleClose}>
                            Cargar CSV
                        </MenuItem>
                    </Menu>

                    {/* Trayectos */}
                    <Button
                        color="inherit"
                        startIcon={<TimelineIcon />}
                        onClick={(e) => setTrayectosMenu(e.currentTarget)}
                    >
                        Trayectos
                    </Button>
                    <Menu
                        anchorEl={trayectosMenu}
                        open={Boolean(trayectosMenu)}
                        onClose={handleClose}
                    >
                        <MenuItem component={RouterLink} to="/trayectos/lista" onClick={handleClose}>
                            Listar Trayectos
                        </MenuItem>
                        <MenuItem component={RouterLink} to="/trayectos/nuevo" onClick={handleClose}>
                            Nuevo Trayecto
                        </MenuItem>
                        <MenuItem component={RouterLink} to="/trayectos/cargar" onClick={handleClose}>
                            Cargar CSV
                        </MenuItem>
                    </Menu>

                    {/* Monitoreo */}
                    <Button
                        color="inherit"
                        startIcon={<MapIcon />}
                        component={RouterLink}
                        to="/monitoreo"
                    >
                        Monitoreo
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar; 