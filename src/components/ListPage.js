import React, { useState } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Typography,
    Box,
    Button,
    Tooltip,
    useTheme,
    useMediaQuery
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const ListPage = ({
    title,
    items,
    columns,
    onDelete,
    onEdit,
    addPath,
    editPath,
    loading,
    error
}) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper 
            sx={{ 
                width: '100%', 
                height: '100%',
                overflow: 'hidden',
                borderRadius: 0,
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box sx={{ 
                px: { xs: 1, sm: 2 }, 
                py: 1.5, 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1, sm: 0 },
                justifyContent: 'space-between', 
                alignItems: { xs: 'stretch', sm: 'center' }
            }}>
                <Typography variant="h6" component="h2">
                    {title}
                </Typography>
                <Button
                    fullWidth={isMobile}
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate(addPath)}
                >
                    Agregar Nuevo
                </Button>
            </Box>

            <TableContainer sx={{ flexGrow: 1 }}>
                <Table 
                    stickyHeader 
                    sx={{
                        '& .MuiTableCell-root': {
                            px: { xs: 1, sm: 2 }
                        }
                    }}
                >
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell 
                                    key={column.id}
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item) => (
                                <TableRow key={item.id || item.placa}>
                                    {columns.map((column) => (
                                        <TableCell key={`${item.id}-${column.id}`}>
                                            {column.render ? column.render(item) : item[column.id]}
                                        </TableCell>
                                    ))}
                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                        <Tooltip title="Editar">
                                            <IconButton
                                                onClick={() => onEdit ? onEdit(item) : navigate(`${editPath}/${item.id || item.placa}`)}
                                                size="small"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Eliminar">
                                            <IconButton
                                                onClick={() => onDelete(item.id || item.placa)}
                                                color="error"
                                                size="small"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Filas por página"
                labelDisplayedRows={({ from, to, count }) => 
                    `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
            />
        </Paper>
    );
};

export default ListPage; 