import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ route }) => {
    // Coordenadas de Manizales
    const defaultPosition = [5.0689, -75.5174];

    return (
        <MapContainer
            center={defaultPosition}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {route && (
                <Marker position={[route.lat, route.lng]}>
                    <Popup>
                        Ruta: {route.name}
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default MapView; 