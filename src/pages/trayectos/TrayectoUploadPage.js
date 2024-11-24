import React from 'react';
import { Paper, Typography } from '@mui/material';
import UploadCsv from '../../components/UploadCsv';
import { ENDPOINTS } from '../../config/api.config';

const TrayectoUploadPage = () => {
    return (
        <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                Cargar Trayectos desde CSV
            </Typography>
            <UploadCsv 
                endpoint={ENDPOINTS.bulk.trayectos}
                onUploadSuccess={() => {
                    // Opcional: Redirigir a la lista después de cargar
                    // navigate('/conductores/lista');
                }}
            />
        </Paper>
    );
};

export default TrayectoUploadPage;