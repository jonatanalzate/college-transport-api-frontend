import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    Grid
} from '@mui/material';
import authService from '../../services/authService';

const LoginPage = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
        // Limpiar error cuando el usuario empieza a escribir
        setError('');
    };

    const validateForm = () => {
        if (!credentials.email) {
            setError('El correo electrónico es requerido');
            return false;
        }
        if (!credentials.email.includes('@')) {
            setError('Por favor ingrese un correo electrónico válido');
            return false;
        }
        if (!credentials.password) {
            setError('La contraseña es requerida');
            return false;
        }
        if (credentials.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            await authService.login(credentials);
            navigate('/');
        } catch (err) {
            console.error('Error de login:', err);
            if (err.response) {
                switch (err.response.status) {
                    case 401:
                        setError('Email o contraseña incorrectos');
                        break;
                    case 404:
                        setError('La empresa no está registrada');
                        break;
                    case 422:
                        setError('Formato de email inválido');
                        break;
                    default:
                        setError('Error al iniciar sesión. Por favor intente nuevamente');
                }
            } else if (err.request) {
                setError('No se pudo conectar con el servidor. Verifique su conexión a internet');
            } else {
                setError('Error al iniciar sesión. Por favor intente nuevamente');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h5" component="h1" gutterBottom align="center">
                        Iniciar Sesión
                    </Typography>
                    
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={credentials.email}
                            onChange={handleChange}
                            margin="normal"
                            required
                            error={!!error && error.includes('email')}
                            disabled={loading}
                        />
                        <TextField
                            fullWidth
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={credentials.password}
                            onChange={handleChange}
                            margin="normal"
                            required
                            error={!!error && error.includes('contraseña')}
                            disabled={loading}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3 }}
                            disabled={loading}
                        >
                            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </Button>

                        <Grid container justifyContent="center" sx={{ mt: 2 }}>
                            <Grid item>
                                <Link to="/register" style={{ textDecoration: 'none' }}>
                                    <Typography color="primary">
                                        ¿No tienes una cuenta? Regístrate
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default LoginPage; 