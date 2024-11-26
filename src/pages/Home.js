import React from 'react';
import { 
    Container, 
    Grid, 
    Typography,
    Card,
    CardContent,
    Box,
    Paper,
    useTheme
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PeopleIcon from '@mui/icons-material/People';

const Home = () => {
    const theme = useTheme();

    const beneficios = [
        {
            icon: <SpeedIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: 'Optimización de Tiempos',
            description: 'Control preciso de recorridos y reducción de tiempos de espera'
        },
        {
            icon: <AnalyticsIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: 'Datos en Tiempo Real',
            description: 'Toma de decisiones informada basada en datos actualizados'
        },
        {
            icon: <AutoGraphIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: 'Mayor Eficiencia',
            description: 'Mejora en la gestión de recursos y planificación de rutas'
        },
        {
            icon: <PeopleIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
            title: 'Experiencia Mejorada',
            description: 'Mejor servicio para los usuarios del transporte público'
        }
    ];

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            {/* Hero Section */}
            <Paper 
                elevation={0}
                sx={{
                    position: 'relative',
                    mb: 4,
                    background: '#f8f9fa',
                    height: '400px',
                    overflow: 'hidden'
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            background: `url(${process.env.PUBLIC_URL}/manizales-transport.png)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.15,
                            filter: 'grayscale(30%)'
                        }
                    }}
                >
                    <Container maxWidth="md">
                        <Typography 
                            component="h1" 
                            variant="h2"
                            color="primary.main"
                            gutterBottom
                            align="center"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: '0.02em',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                            }}
                        >
                            Modernizando el Transporte Público de Manizales
                        </Typography>
                    </Container>
                </Box>
            </Paper>

            {/* Sección de Innovación */}
            <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
                <Box sx={{ mb: 8 }}>
                    <Typography variant="h4" component="h2" gutterBottom align="center" color="primary">
                        Transformación Digital del Transporte
                    </Typography>
                    <Typography variant="body1" paragraph align="center">
                        Pasamos de registros manuales a un sistema automatizado que permite
                        el monitoreo en tiempo real y la gestión eficiente de la flota de transporte.
                    </Typography>
                </Box>

                {/* Sección de Beneficios */}
                <Grid container spacing={4}>
                    {beneficios.map((beneficio) => (
                        <Grid item xs={12} sm={6} md={3} key={beneficio.title}>
                            <Card 
                                sx={{ 
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: '0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 6
                                    }
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                        {beneficio.icon}
                                    </Box>
                                    <Typography gutterBottom variant="h6" component="h3" align="center">
                                        {beneficio.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" align="center">
                                        {beneficio.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Sección de Estadísticas */}
                <Box sx={{ mt: 8 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Paper 
                                sx={{ 
                                    p: 3, 
                                    bgcolor: 'primary.main', 
                                    color: 'primary.contrastText',
                                    height: '100%'
                                }}
                            >
                                <Typography variant="h5" gutterBottom>
                                    Impacto en la Ciudad
                                </Typography>
                                <Typography variant="body1">
                                    Nuestro sistema está diseñado para mejorar la experiencia de transporte
                                    en Manizales, optimizando rutas y tiempos de espera para beneficio
                                    de todos los ciudadanos.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper 
                                sx={{ 
                                    p: 3, 
                                    bgcolor: 'secondary.main', 
                                    color: 'secondary.contrastText',
                                    height: '100%'
                                }}
                            >
                                <Typography variant="h5" gutterBottom>
                                    Tecnología Avanzada
                                </Typography>
                                <Typography variant="body1">
                                    Utilizamos tecnología GPS y análisis de datos en tiempo real
                                    para proporcionar un servicio de transporte más eficiente y confiable.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default Home;