import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corregir el ícono del marcador
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapView = ({ route }) => {
    // Coordenadas de Manizales, Colombia
    const defaultPosition = [5.0689, -75.5174];
    
    // Verificar si route tiene las coordenadas necesarias
    const hasValidCoordinates = route && 
        route.origen_coordenadas && 
        route.destino_coordenadas && 
        route.origen_coordenadas.lat && 
        route.origen_coordenadas.lng && 
        route.destino_coordenadas.lat && 
        route.destino_coordenadas.lng;

    return (
        <MapContainer
            center={defaultPosition}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {hasValidCoordinates && (
                <>
                    <Marker 
                        position={[route.origen_coordenadas.lat, route.origen_coordenadas.lng]}
                    >
                        <Popup>
                            Origen: {route.origen || 'Punto de inicio'}
                        </Popup>
                    </Marker>
                    
                    <Marker 
                        position={[route.destino_coordenadas.lat, route.destino_coordenadas.lng]}
                    >
                        <Popup>
                            Destino: {route.destino || 'Punto final'}
                        </Popup>
                    </Marker>
                </>
            )}
        </MapContainer>
    );
};

export default MapView; 