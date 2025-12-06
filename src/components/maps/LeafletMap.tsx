/**
 * Soul Trail - Leaflet Map Component
 * @author Vishwanath Archak
 * @description Real-time map with live location tracking and place markers
 */

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  lat: number;
  lng: number;
  name?: string;
}

interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: 'temple' | 'nature' | 'adventure' | 'heritage' | 'peaceful';
  rating?: number;
}

interface LeafletMapProps {
  places?: Place[];
  onPlaceClick?: (place: Place) => void;
}

// Custom marker icons
const categoryColors: Record<string, string> = {
  temple: '#FFA500',
  nature: '#0066FF',
  adventure: '#00CC00',
  heritage: '#9900FF',
  peaceful: '#FF1493'
};

const MarkerIcon = (color: string) =>
  L.divIcon({
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [30, 30],
    className: 'custom-marker'
  });

// Live Location Updater Component
const LiveLocationUpdater: React.FC<{
  onLocationChange: (location: Location) => void;
}> = ({ onLocationChange }) => {
  const map = useMap();
  const [liveLocation, setLiveLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = {
            lat: latitude,
            lng: longitude,
            name: 'Your Location'
          };
          setLiveLocation(newLocation);
          onLocationChange(newLocation);
          map.setView([latitude, longitude], 13);
        },
        (error) => console.error('Geolocation error:', error),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [map, onLocationChange]);

  return liveLocation ? (
    <Marker
      position={[liveLocation.lat, liveLocation.lng]}
      icon={L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })}
    >
      <Popup>
        <div className="text-center">
          <h3 className="font-bold">📍 You are here</h3>
          <p className="text-sm text-gray-600">
            {liveLocation.lat.toFixed(4)}, {liveLocation.lng.toFixed(4)}
          </p>
        </div>
      </Popup>
    </Marker>
  ) : null;
};

export const LeafletMap: React.FC<LeafletMapProps> = ({ places = [], onPlaceClick }) => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const defaultCenter: [number, number] = [13.3393, 74.7421];

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={defaultCenter}
        zoom={11}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />

        <LiveLocationUpdater onLocationChange={setUserLocation} />

        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={MarkerIcon(categoryColors[place.category])}
            eventHandlers={{
              click: () => onPlaceClick?.(place)
            }}
          >
            <Popup>
              <div className="max-w-[200px]">
                <h3 className="font-bold text-lg">{place.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{place.category}</p>
                {place.rating && (
                  <p className="text-sm mt-2">⭐ {place.rating}/5</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
