import React from 'react';
import { Paper, Typography } from '@mui/material';
import UploadCsv from '../../components/UploadCsv';
import { ENDPOINTS } from '../../config/api.config';
import BackButton from '../../components/BackButton';

const RutaUploadPage = () => {
    return (
        <>
            <BackButton to="/rutas/lista" />
            <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                    Cargar Rutas desde CSV
                </Typography>
                <UploadCsv 
                    endpoint={ENDPOINTS.bulk.rutas}
                    onUploadSuccess={() => {
                        // Opcional: Redirigir a la lista después de cargar
                        // navigate('/rutas/lista');
                    }}
                />
            </Paper>
        </>
    );
};

export default RutaUploadPage;