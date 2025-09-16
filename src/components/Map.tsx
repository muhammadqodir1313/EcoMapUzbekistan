import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface RecyclingCenter {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  distance?: number;
  phone: string;
  hours: string;
  materials: string[];
  description: string;
  rating: number;
}

interface MapProps {
  centers: RecyclingCenter[];
  selectedCenter: RecyclingCenter | null;
  onCenterSelect: (center: RecyclingCenter) => void;
  userLocation: { lat: number; lng: number } | null;
}

// Custom marker icons
const recyclingIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#10B981" width="32" height="32">
      <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
      <circle cx="12" cy="12" r="8" fill="none" stroke="#10B981" stroke-width="2"/>
      <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="white"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const selectedIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#EF4444" width="36" height="36">
      <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
      <circle cx="12" cy="12" r="8" fill="none" stroke="#EF4444" stroke-width="2"/>
      <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="white"/>
    </svg>
  `),
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

const userIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3B82F6" width="24" height="24">
      <circle cx="12" cy="12" r="10" fill="#3B82F6"/>
      <circle cx="12" cy="12" r="6" fill="white"/>
      <circle cx="12" cy="12" r="2" fill="#3B82F6"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function MapUpdater({ center, zoom }: { center: LatLngExpression; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
}

export default function Map({ centers, selectedCenter, onCenterSelect, userLocation }: MapProps) {
  const mapRef = useRef<L.Map>(null);
  const defaultCenter: LatLngExpression = [41.2995, 69.2401]; // Tashkent center
  const mapCenter: LatLngExpression = selectedCenter
    ? [selectedCenter.lat, selectedCenter.lng]
    : (userLocation ? [userLocation.lat, userLocation.lng] as LatLngExpression : defaultCenter);

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={mapCenter}
        zoom={12}
        className="h-full w-full rounded-lg"
        ref={mapRef}
      >
        {/* Yandex-style tile layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* User location marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <div className="text-center">
                <strong>Sizning joylashuvingiz</strong>
              </div>
            </Popup>
          </Marker>
        )}
        
        {/* Recycling center markers */}
        {centers.map((center) => (
          <Marker
            key={center.id}
            position={[center.lat, center.lng]}
            icon={selectedCenter?.id === center.id ? selectedIcon : recyclingIcon}
            eventHandlers={{
              click: () => onCenterSelect(center),
            }}
          >
            <Popup>
              <div className="min-w-64">
                <h3 className="font-semibold text-gray-900 mb-2">{center.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{center.address}</p>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-sm font-medium">{center.rating}</span>
                  {center.distance && (
                    <span className="text-sm text-green-600 ml-2">
                      {center.distance.toFixed(1)} km
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {center.materials.slice(0, 3).map(material => (
                    <span key={material} className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      {material}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => onCenterSelect(center)}
                  className="w-full bg-green-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-green-600 transition-colors"
                >
                  Batafsil ma'lumot
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <MapUpdater center={mapCenter} zoom={12} />
      </MapContainer>
      
      {/* Map controls overlay */}
      <div className="absolute top-4 right-4 z-[1000] space-y-2">
        <button className="bg-white/95 backdrop-blur p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button className="bg-white/95 backdrop-blur p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </div>
      
      {/* Map type selector */}
      <div className="absolute bottom-4 right-4 z-[1000]">
        <div className="bg-white/95 backdrop-blur rounded-lg shadow-md overflow-hidden border border-gray-100">
          <button className="px-3 py-2 text-sm bg-gradient-to-r from-primary-500 to-secondary-500 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Xarita</button>
          <button className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">Sun'iy yo'ldosh</button>
        </div>
      </div>
    </div>
  );
}