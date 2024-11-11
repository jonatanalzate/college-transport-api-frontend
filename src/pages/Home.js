import React from 'react';
import { 
    Container, 
    Grid, 
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Box
} from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import RouteIcon from '@mui/icons-material/Route';
import PeopleIcon from '@mui/icons-material/People';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const modules = [
        {
            title: 'Gestión de Vehículos',
            description: 'Administre la flota de vehículos, registre nuevos vehículos y gestione su estado.',
            icon: <DirectionsBusIcon sx={{ fontSize: 40 }} />,
            path: '/vehiculos/lista'
        },
        {
            title: 'Gestión de Rutas',
            description: 'Configure y administre las rutas de transporte, visualice en mapa.',
            icon: <RouteIcon sx={{ fontSize: 40 }} />,
            path: '/rutas/lista'
        },
        {
            title: 'Gestión de Conductores',
            description: 'Administre los conductores, sus licencias y asignaciones.',
            icon: <PeopleIcon sx={{ fontSize: 40 }} />,
            path: '/conductores/lista'
        },
        {
            title: 'Gestión de Trayectos',
            description: 'Configure y monitoree los trayectos activos.',
            icon: <TimelineIcon sx={{ fontSize: 40 }} />,
            path: '/trayectos/lista'
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom component="h1" align="center" sx={{ mb: 4 }}>
                Sistema de Monitoreo y Gestión de Transporte Público
            </Typography>
            
            <Grid container spacing={3}>
                {modules.map((module) => (
                    <Grid item xs={12} md={6} key={module.title}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    {module.icon}
                                    <Typography variant="h6" component="h2" sx={{ ml: 2 }}>
                                        {module.title}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {module.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    size="small" 
                                    onClick={() => navigate(module.path)}
                                >
                                    Acceder
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Home;