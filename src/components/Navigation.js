import { Link } from 'react-router-dom';
import { Menu, MenuItem, Button } from '@mui/material';

const Navigation = () => {
  return (
    <Menu>
      {/* Menú de Vehículos */}
      <MenuItem>
        <Link to="/vehiculos/lista">Lista de Vehículos</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/vehiculos/nuevo">Nuevo Vehículo</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/vehiculos/cargar">Cargar Vehículos (CSV)</Link>
      </MenuItem>

      {/* Menú de Conductores */}
      <MenuItem>
        <Link to="/conductores/lista">Lista de Conductores</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/conductores/nuevo">Nuevo Conductor</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/conductores/cargar">Cargar Conductores (CSV)</Link>
      </MenuItem>

      {/* Menú de Rutas */}
      <MenuItem>
        <Link to="/rutas/lista">Lista de Rutas</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/rutas/nueva">Nueva Ruta</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/rutas/cargar">Cargar Rutas (CSV)</Link>
      </MenuItem>
    </Menu>
  );
}; 