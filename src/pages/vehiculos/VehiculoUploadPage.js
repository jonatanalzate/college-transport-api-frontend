import React from 'react';
import { Paper, Typography } from '@mui/material';
import UploadCsv from '../../components/UploadCsv';
import { ENDPOINTS } from '../../config/api.config';
import BackButton from '../../components/BackButton';

const VehiculoUploadPage = () => {
    return (
        <>
            <BackButton to="/vehiculos/lista" />
            <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                    Cargar Vehículos desde CSV
                </Typography>
                <UploadCsv 
                    endpoint={ENDPOINTS.bulk.vehiculos}
                    onUploadSuccess={() => {
                        // Opcional: Redirigir a la lista después de cargar
                        // navigate('/vehiculos/lista');
                    }}
                />
            </Paper>
        </>
    );
};

export default VehiculoUploadPage; 