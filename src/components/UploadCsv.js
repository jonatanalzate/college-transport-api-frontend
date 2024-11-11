import React, { useState } from 'react';
import Papa from 'papaparse';
import { Button, Box, Alert } from '@mui/material';
import { uploadCsv } from '../services/api';

const UploadCsv = ({ endpoint, onUploadSuccess }) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            Papa.parse(file, {
                complete: async (results) => {
                    try {
                        await uploadCsv(endpoint, file);
                        setSuccess(true);
                        setError(null);
                        if (onUploadSuccess) onUploadSuccess();
                    } catch (err) {
                        setError('Error al cargar el archivo: ' + err.message);
                        setSuccess(false);
                    }
                },
                error: (error) => {
                    setError('Error al procesar el archivo CSV: ' + error.message);
                    setSuccess(false);
                }
            });
        } catch (err) {
            setError('Error al procesar el archivo: ' + err.message);
            setSuccess(false);
        }
    };

    return (
        <Box sx={{ my: 2 }}>
            <input
                accept=".csv"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFileUpload}
            />
            <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                    Cargar CSV
                </Button>
            </label>
            
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">Archivo cargado exitosamente</Alert>}
        </Box>
    );
};

export default UploadCsv; 