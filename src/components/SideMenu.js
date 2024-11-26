import React, { useState, useEffect } from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    Box,
    Divider
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PersonIcon from '@mui/icons-material/Person';
import RouteIcon from '@mui/icons-material/Route';
import TimelineIcon from '@mui/icons-material/Timeline';
import MonitorIcon from '@mui/icons-material/Monitor';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';

const menuItems = {
    vehiculos: {
        icon: <DirectionsBusIcon />,
        label: 'Vehículos',
        items: [
            { label: 'Lista de Vehículos', path: '/vehiculos/lista', icon: <ListIcon /> },
            { label: 'Nuevo Vehículo', path: '/vehiculos/nuevo', icon: <AddIcon /> },
            { label: 'Cargar Vehículos (CSV)', path: '/vehiculos/cargar', icon: <UploadIcon /> }
        ]
    },
    conductores: {
        icon: <PersonIcon />,
        label: 'Conductores',
        items: [
            { label: 'Lista de Conductores', path: '/conductores/lista', icon: <ListIcon /> },
            { label: 'Nuevo Conductor', path: '/conductores/nuevo', icon: <AddIcon /> },
            { label: 'Cargar Conductores (CSV)', path: '/conductores/cargar', icon: <UploadIcon /> }
        ]
    },
    rutas: {
        icon: <RouteIcon />,
        label: 'Rutas',
        items: [
            { label: 'Lista de Rutas', path: '/rutas/lista', icon: <ListIcon /> },
            { label: 'Nueva Ruta', path: '/rutas/nueva', icon: <AddIcon /> },
            { label: 'Ver Mapa', path: '/rutas/mapa', icon: <RouteIcon /> },
            { label: 'Cargar Rutas (CSV)', path: '/rutas/cargar', icon: <UploadIcon /> }
        ]
    },
    trayectos: {
        icon: <TimelineIcon />,
        label: 'Trayectos',
        items: [
            { label: 'Lista de Trayectos', path: '/trayectos/lista', icon: <ListIcon /> },
            { label: 'Nuevo Trayecto', path: '/trayectos/nuevo', icon: <AddIcon /> },
            { label: 'Cargar Trayectos (CSV)', path: '/trayectos/cargar', icon: <UploadIcon /> }
        ]
    }
};

const SideMenu = ({ width = 240 }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [openSections, setOpenSections] = useState(() => {
        const path = location.pathname;
        return {
            vehiculos: path.includes('/vehiculos'),
            conductores: path.includes('/conductores'),
            rutas: path.includes('/rutas'),
            trayectos: path.includes('/trayectos')
        };
    });

    useEffect(() => {
        const path = location.pathname;
        setOpenSections(prev => ({
            ...prev,
            vehiculos: path.includes('/vehiculos'),
            conductores: path.includes('/conductores'),
            rutas: path.includes('/rutas'),
            trayectos: path.includes('/trayectos')
        }));
    }, [location.pathname]);

    const handleSectionClick = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: width,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: width,
                    boxSizing: 'border-box',
                    backgroundColor: '#ffffff',
                    borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                    '& .MuiListItem-root': {
                        borderRadius: '8px',
                        mx: 1,
                        my: 0.5,
                        '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                        },
                    },
                    '& .MuiListItemIcon-root': {
                        minWidth: 40,
                        color: 'primary.main'
                    }
                },
            }}
        >
            <Box sx={{ overflow: 'auto', mt: 8 }}>
                <List>
                    {Object.entries(menuItems).map(([key, section]) => (
                        <React.Fragment key={key}>
                            <ListItem 
                                button 
                                onClick={() => handleSectionClick(key)}
                                sx={{
                                    bgcolor: openSections[key] ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                                    color: openSections[key] ? 'primary.main' : 'inherit',
                                }}
                            >
                                <ListItemIcon>{section.icon}</ListItemIcon>
                                <ListItemText 
                                    primary={section.label}
                                    primaryTypographyProps={{
                                        fontWeight: openSections[key] ? 600 : 400
                                    }}
                                />
                                {openSections[key] ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={openSections[key]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {section.items.map((item) => (
                                        <ListItem
                                            button
                                            key={item.path}
                                            sx={{ 
                                                pl: 4,
                                                bgcolor: location.pathname === item.path ? 
                                                    'rgba(25, 118, 210, 0.08)' : 'transparent',
                                                color: location.pathname === item.path ? 
                                                    'primary.main' : 'inherit',
                                                '&:hover': {
                                                    bgcolor: 'rgba(25, 118, 210, 0.08)',
                                                }
                                            }}
                                            onClick={() => navigate(item.path)}
                                        >
                                            <ListItemIcon 
                                                sx={{
                                                    color: location.pathname === item.path ? 
                                                        'primary.main' : 'inherit'
                                                }}
                                            >
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText 
                                                primary={item.label}
                                                primaryTypographyProps={{
                                                    fontSize: '0.9rem',
                                                    fontWeight: location.pathname === item.path ? 
                                                        600 : 400
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                            <Divider sx={{ my: 1, mx: 2 }} />
                        </React.Fragment>
                    ))}
                    <ListItem 
                        button 
                        onClick={() => navigate('/monitoreo')}
                        sx={{
                            bgcolor: location.pathname === '/monitoreo' ? 
                                'rgba(25, 118, 210, 0.08)' : 'transparent',
                            color: location.pathname === '/monitoreo' ? 
                                'primary.main' : 'inherit',
                            '&:hover': {
                                bgcolor: 'rgba(25, 118, 210, 0.08)',
                            }
                        }}
                    >
                        <ListItemIcon 
                            sx={{
                                color: location.pathname === '/monitoreo' ? 
                                    'primary.main' : 'inherit'
                            }}
                        >
                            <MonitorIcon />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Monitoreo"
                            primaryTypographyProps={{
                                fontWeight: location.pathname === '/monitoreo' ? 
                                    600 : 400
                            }}
                        />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default SideMenu; 