# 🗺️ Soul Trail Maps Implementation Guide

## ✅ Completed Files

✓ `src/components/maps/LeafletMap.tsx` - Live location tracking with Leaflet
✓ `src/components/maps/GoogleMapView.tsx` - Google Maps with place search
✓ `src/components/maps/index.ts` - Barrel exports

## 📝 Remaining Files to Create

### 1. Create `src/components/maps/MapMarker.tsx`

```typescript
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
```

### 2. Create `src/hooks/useGeolocation.ts`

```typescript
/**
 * Soul Trail - Geolocation Hook
 * @author Vishwanath Archak
 * @description Custom hook for real-time location tracking
 */

import { useState, useEffect, useCallback } from 'react';

interface LocationCoords {
  lat: number;
  lng: number;
  accuracy: number;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      setLoading(false);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { location, error, loading };
};

export default useGeolocation;
```

### 3. Create `src/types/maps.ts`

```typescript
/**
 * Soul Trail - Map Type Definitions
 * @author Vishwanath Archak
 * @description TypeScript interfaces for map components
 */

export interface LocationCoords {
  lat: number;
  lng: number;
  name?: string;
}

export interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: 'temple' | 'nature' | 'adventure' | 'heritage' | 'peaceful';
  rating?: number;
  image?: string;
  description?: string;
}

export interface MapProps {
  places?: Place[];
  onPlaceClick?: (place: Place) => void;
  userLocation?: LocationCoords;
}

export interface GoogleMapProps {
  apiKey: string;
  onPlaceSelected?: (place: any) => void;
  onLocationChange?: (lat: number, lng: number) => void;
}
```

### 4. Create `src/utils/mapHelpers.ts`

```typescript
/**
 * Soul Trail - Map Helper Functions
 * @author Vishwanath Archak
 * @description Utility functions for map operations
 */

export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    temple: '#FFA500',
    nature: '#0066FF',
    adventure: '#00CC00',
    heritage: '#9900FF',
    peaceful: '#FF1493'
  };
  return colors[category] || '#888888';
};

export const formatLocationString = (lat: number, lng: number): string => {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
};
```

### 5. Create `.env.local` in root directory

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 6. Update `package.json`

Add these dependencies:

```json
{
  "dependencies": {
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1"
  },
  "devDependencies": {
    "@types/leaflet": "^1.9.4"
  }
}
```

Run: `npm install`

## 🚀 Installation Steps

1. **Copy the code above for each file**
2. **Create the directory structure:**
   ```bash
   mkdir -p src/hooks src/types src/utils
   ```

3. **Create each file with the code provided above**

4. **Install dependencies:**
   ```bash
   npm install leaflet react-leaflet
   npm install -D @types/leaflet
   ```

5. **Add `.env.local` with your Google Maps API Key**

## 📱 Usage in Components

```typescript
import { LeafletMap, GoogleMapView } from './components/maps';
import { useGeolocation } from './hooks/useGeolocation';

export const MyComponent = () => {
  const { location } = useGeolocation();

  const places = [
    {
      id: '1',
      name: 'Place Name',
      lat: 13.3393,
      lng: 74.7421,
      category: 'adventure',
      rating: 4.5
    }
  ];

  return (
    <div>
      <LeafletMap 
        places={places} 
        onPlaceClick={(place) => console.log(place)}
      />
      <GoogleMapView 
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      />
    </div>
  );
};
```

## ✨ Features Implemented

✅ Live location tracking with Leaflet
✅ Google Maps integration with search
✅ Custom markers with color coding
✅ Place click handlers
✅ TypeScript support
✅ Reusable hooks
✅ Helper utilities
✅ Type definitions

## 🎯 Next Steps

1. Get a Google Maps API Key from Google Cloud Console
2. Add it to `.env.local`
3. Test both map components
4. Customize styling as needed
5. Integrate with your app's navigation

## 📞 Support

For issues or questions, refer to:
- [Leaflet Documentation](https://leafletjs.com/)
- [React Leaflet Documentation](https://react-leaflet.js.org/)
- [Google Maps Platform](https://cloud.google.com/maps-platform)

Made with ❤️ by Vishwanath Archak
