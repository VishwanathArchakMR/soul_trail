/**
 * Soul Trail - Google Maps Component
 * @author Vishwanath Archak
 * @description Google Maps integration with place search and location tracking
 */

import React, { useEffect, useRef, useState } from 'react';

interface GoogleMapViewProps {
  apiKey: string;
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
  onLocationChange?: (lat: number, lng: number) => void;
}

export const GoogleMapView: React.FC<GoogleMapViewProps> = ({
  apiKey,
  onPlaceSelected,
  onLocationChange
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    // Load Google Maps Script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      initializeMap();
    };
    
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  const initializeMap = () => {
    if (!mapRef.current) return;

    const defaultLocation = { lat: 13.3393, lng: 74.7421 }; // Karnataka

    mapInstance.current = new google.maps.Map(mapRef.current, {
      zoom: 11,
      center: defaultLocation,
      mapTypeControl: true,
      fullscreenControl: true,
      streetViewControl: true,
      styles: [
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#523735' }]
        }
      ]
    });

    // Initialize Search Box
    initializeSearchBox();

    // Get user's live location
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Update user marker
          if (userMarkerRef.current) {
            userMarkerRef.current.setPosition({ lat: latitude, lng: longitude });
          } else {
            userMarkerRef.current = new google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map: mapInstance.current!,
              title: 'Your Location',
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            });
          }

          // Center map on user
          mapInstance.current?.setCenter({ lat: latitude, lng: longitude });
          onLocationChange?.(latitude, longitude);
        },
        (error) => console.error('Geolocation error:', error),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }
  };

  const initializeSearchBox = () => {
    if (!searchBoxRef.current || !mapInstance.current) return;

    const searchBox = new google.maps.places.SearchBox(searchBoxRef.current);
    mapInstance.current.controls[google.maps.ControlPosition.TOP_LEFT].push(
      searchBoxRef.current.parentElement!
    );

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      
      if (places.length === 0) return;

      const place = places[0];
      
      if (place.geometry && place.geometry.location) {
        // Center map on selected place
        mapInstance.current?.setCenter(place.geometry.location);
        mapInstance.current?.setZoom(15);

        // Add marker for place
        new google.maps.Marker({
          position: place.geometry.location,
          map: mapInstance.current!,
          title: place.name,
          icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });

        onPlaceSelected?.(place);
      }
    });
  };

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg relative">
      {/* Search Box */}
      <div className="absolute top-4 left-4 z-10">
        <input
          ref={searchBoxRef}
          type="text"
          placeholder="Search places..."
          className="w-80 px-4 py-2 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default GoogleMapView;
