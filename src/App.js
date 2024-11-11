import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';

// Vehículos
import VehiculosListPage from './pages/vehiculos/VehiculosListPage';
import VehiculoFormPage from './pages/vehiculos/VehiculoFormPage';
import VehiculoUploadPage from './pages/vehiculos/VehiculoUploadPage';

// Rutas
import RutasListPage from './pages/rutas/RutasListPage';
import RutaFormPage from './pages/rutas/RutaFormPage';
import RutaMapPage from './pages/rutas/RutaMapPage';

// Conductores
import ConductoresListPage from './pages/conductores/ConductoresListPage';
import ConductorFormPage from './pages/conductores/ConductorFormPage';

// Trayectos
import TrayectosListPage from './pages/trayectos/TrayectosListPage';
import TrayectoFormPage from './pages/trayectos/TrayectoFormPage';

// Monitoreo
import MonitoreoPage from './pages/monitoreo/MonitoreoPage';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navbar />
                <Container maxWidth="lg">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        
                        {/* Rutas de Vehículos */}
                        <Route path="/vehiculos/lista" element={<VehiculosListPage />} />
                        <Route path="/vehiculos/nuevo" element={<VehiculoFormPage />} />
                        <Route path="/vehiculos/editar/:id" element={<VehiculoFormPage />} />
                        <Route path="/vehiculos/cargar" element={<VehiculoUploadPage />} />
                        
                        {/* Rutas de Rutas */}
                        <Route path="/rutas/lista" element={<RutasListPage />} />
                        <Route path="/rutas/nueva" element={<RutaFormPage />} />
                        <Route path="/rutas/editar/:id" element={<RutaFormPage />} />
                        <Route path="/rutas/mapa" element={<RutaMapPage />} />
                        
                        {/* Rutas de Conductores */}
                        <Route path="/conductores/lista" element={<ConductoresListPage />} />
                        <Route path="/conductores/nuevo" element={<ConductorFormPage />} />
                        <Route path="/conductores/editar/:id" element={<ConductorFormPage />} />
                        
                        {/* Rutas de Trayectos */}
                        <Route path="/trayectos/lista" element={<TrayectosListPage />} />
                        <Route path="/trayectos/nuevo" element={<TrayectoFormPage />} />
                        <Route path="/trayectos/editar/:id" element={<TrayectoFormPage />} />
                        
                        {/* Monitoreo */}
                        <Route path="/monitoreo" element={<MonitoreoPage />} />
                    </Routes>
                </Container>
            </Router>
        </ThemeProvider>
    );
}

export default App; 