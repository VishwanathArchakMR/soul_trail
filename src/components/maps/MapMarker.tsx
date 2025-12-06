/**
 * Soul Trail - Custom Map Marker Component
 * @author Vishwanath Archak
 * @description Reusable marker component for map displays
 */

import React from 'react';

interface MapMarkerProps {
  lat: number;
  lng: number;
  title: string;
  icon?: string;
  onClick?: () => void;
}

export const MapMarker: React.FC<MapMarkerProps> = ({
  title,
  icon,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
      title={title}
    >
      {icon ? (
        <img src={icon} alt={title} className="w-8 h-8" />
      ) : (
        <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-md" />
      )}
    </div>
  );
};

export default MapMarker;
