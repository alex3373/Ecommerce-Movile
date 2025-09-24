import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface Local {
  nombre: string;
  lat: number;
  lng: number;
  direccion: string;
  imagen?: string;
}

const locales: Local[] = [
  {
    nombre: 'Sucursal Viña del Mar',
    lat: -33.0245,
    lng: -71.5528,
    direccion: 'Av. Libertad 100, Viña del Mar',
    imagen: 'https://ofertasimperdibles.cl/wp-content/uploads/2025/01/logoofertasrecortado.png',
  },
  {
    nombre: 'Sucursal Valparaíso',
    lat: -33.0458,
    lng: -71.6197,
    direccion: 'Calle Condell 200, Valparaíso',
    imagen: 'https://ofertasimperdibles.cl/wp-content/uploads/2025/01/logoofertasrecortado.png',
  },
  {
    nombre: 'Sucursal Concón',
    lat: -32.9394,
    lng: -71.5265,
    direccion: 'Av. Blanca Estela 789, Concón',
    imagen: 'https://ofertasimperdibles.cl/wp-content/uploads/2025/01/logoofertasrecortado.png',
  },
  {
    nombre: 'Sucursal Quilpué',
    lat: -33.0472,
    lng: -71.4426,
    direccion: 'Av. Los Carrera 456, Quilpué',
    imagen: 'https://ofertasimperdibles.cl/wp-content/uploads/2025/01/logoofertasrecortado.png',
  },
  {
    nombre: 'Sucursal Villa Alemana',
    lat: -33.0423,
    lng: -71.3715,
    direccion: 'Av. Valparaíso 321, Villa Alemana',
    imagen: 'https://ofertasimperdibles.cl/wp-content/uploads/2025/01/logoofertasrecortado.png',
  },
  {
    nombre: 'Sucursal San Francisco de Mostazal',
    lat: -34.0634,
    lng: -70.7244,
    direccion: 'Camino Real 123, Mostazal',
    imagen: 'https://ofertasimperdibles.cl/wp-content/uploads/2025/01/logoofertasrecortado.png',
  },
  {
    nombre: 'Sucursal Machalí',
    lat: -34.1803,
    lng: -70.6342,
    direccion: 'Av. San Juan 234, Machalí',
    imagen: 'https://ofertasimperdibles.cl/wp-content/uploads/2025/01/logoofertasrecortado.png',
  },
  {
    nombre: 'Sucursal Rancagua',
    lat: -34.1654,
    lng: -70.7399,
    direccion: 'Av. Brasil 123, Rancagua',
    imagen: 'https://ofertasimperdibles.cl/wp-content/uploads/2025/01/logoofertasrecortado.png',
  },
  {
    nombre: 'Sucursal Codegua',
    lat: -34.1527,
    lng: -70.6679,
    direccion: 'Calle Central 456, Codegua',
    imagen: 'https://ofertasimperdibles.cl/wp-content/uploads/2025/01/logoofertasrecortado.png',
  },
  {
    nombre: 'Sucursal Graneros',
    lat: -34.0654,
    lng: -70.7256,
    direccion: 'Av. El Sol 789, Graneros',
    imagen: 'https://ofertasimperdibles.cl/wp-content/uploads/2025/01/logoofertasrecortado.png',
  },
  {
    nombre: 'Sucursal Algarrobo',
    lat: -33.3688,
    lng: -71.6689,
    direccion: 'Av. Carlos Alessandri 100, Algarrobo',
    imagen: 'https://ofertasimperdibles.cl/wp-content/uploads/2025/01/logoofertasrecortado.png',
  },
  {
    nombre: 'Sucursal El Quisco',
    lat: -33.3981,
    lng: -71.6922,
    direccion: 'Calle El Quisco 321, El Quisco',
    imagen: 'https://ofertasimperdibles.cl/wp-content/uploads/2025/01/logoofertasrecortado.png',
  },
  {
    nombre: 'Sucursal El Tabo',
    lat: -33.4435,
    lng: -71.6836,
    direccion: 'Av. El Tabo 456, El Tabo',
    imagen: 'https://ofertasimperdibles.cl/wp-content/uploads/2025/01/logoofertasrecortado.png',
  },
  {
    nombre: 'Sucursal Cartagena',
    lat: -33.5536,
    lng: -71.6097,
    direccion: 'Av. Cartagena 123, Cartagena',
    imagen: 'https://ofertasimperdibles.cl/wp-content/uploads/2025/01/logoofertasrecortado.png',
  },
  {
    nombre: 'Sucursal San Antonio',
    lat: -33.5939,
    lng: -71.6127,
    direccion: 'Av. Barros Luco 789, San Antonio',
    imagen: 'https://ofertasimperdibles.cl/wp-content/uploads/2025/01/logoofertasrecortado.png',
  },
  {
    nombre: 'Sucursal Santo Domingo',
    lat: -33.6557,
    lng: -71.6096,
    direccion: 'Calle Santo Domingo 456, Santo Domingo',
    imagen: 'https://ofertasimperdibles.cl/wp-content/uploads/2025/01/logoofertasrecortado.png',
  },
];

// Tamaño clásico del pin de Leaflet
const markerPinSize = [25, 41];

// Función para crear un icono con la imagen (si existe) encima del marcador clásico
const createIconWithImage = (imageUrl?: string) => {
  const html = `
    <div style="display: flex; flex-direction: column; align-items: center;">
      ${
        imageUrl
          ? `<img src="${imageUrl}" 
              style="width: 40px; height: 40px; object-fit: contain; border-radius: 6px; margin-bottom: 4px; box-shadow: 0 0 4px rgba(0,0,0,0.3);" />`
          : ''
      }
      <img 
        src="${iconUrl}" 
        style="width: ${markerPinSize[0]}px; height: ${markerPinSize[1]}px;" 
        alt="marker"
      />
    </div>
  `;

  return L.divIcon({
    html,
    className: '', // evitar estilos predeterminados
    iconSize: [markerPinSize[0], markerPinSize[1] + (imageUrl ? 44 : 0)],
    iconAnchor: [markerPinSize[0] / 2, markerPinSize[1]],
    popupAnchor: [0, -markerPinSize[1]],
  });
};

const MapaLocales: React.FC = () => {
  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <MapContainer
        center={[-33.4372, -70.6506]}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locales.map((local, index) => (
          <Marker
            key={index}
            position={[local.lat, local.lng]}
            icon={createIconWithImage(local.imagen)}
          >
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <strong>{local.nombre}</strong>
                <br />
                {local.direccion}
                {local.imagen && (
                  <div style={{ marginTop: '8px' }}>
                    <img
                      src={local.imagen}
                      alt={local.nombre}
                      style={{ width: '100px', borderRadius: '8px' }}
                    />
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapaLocales;