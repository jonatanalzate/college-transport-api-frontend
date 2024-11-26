import React, { useState } from 'react';
import { Button, Box, Alert, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadCsv } from '../services/api';

const UploadCsv = ({ endpoint, onUploadSuccess, title }) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const result = await uploadCsv(endpoint, file);
            setSuccess(true);
            if (onUploadSuccess) {
                onUploadSuccess(result);
            }
        } catch (err) {
            setError(err.message || 'Error al cargar el archivo');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ my: 3 }}>
            <Typography variant="h6" gutterBottom>
                {title || 'Cargar archivo CSV'}
            </Typography>
            
            <input
                accept=".csv"
                style={{ display: 'none' }}
                id="csv-file"
                type="file"
                onChange={handleFileUpload}
                disabled={loading}
            />
            <label htmlFor="csv-file">
                <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    disabled={loading}
                >
                    {loading ? 'Cargando...' : 'Seleccionar archivo CSV'}
                </Button>
            </label>

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
            
            {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Archivo cargado exitosamente
                </Alert>
            )}
        </Box>
    );
};

export default UploadCsv; 