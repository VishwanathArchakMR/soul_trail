import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Filter, Star } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function MapView() {
  const { state } = useApp();
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  const filteredPlaces = state.places.filter(place => 
    !categoryFilter || place.category === categoryFilter
  );

  const getCategoryColor = (category: string) => {
    const colors = {
      'Temples': '#f59e0b',
      'Peaceful': '#ec4899',
      'Adventure': '#10b981',
      'Heritage': '#8b5cf6',
      'Nature': '#3b82f6'
    };
    return colors[category as keyof typeof colors] || '#6b7280';
  };

  const selectedPlaceData = selectedPlace ? state.places.find(p => p.id === selectedPlace) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Explore Map</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  <option value="Temples">Temples 🛕</option>
                  <option value="Peaceful">Peaceful 🌸</option>
                  <option value="Adventure">Adventure 🧗</option>
                  <option value="Heritage">Heritage 🕰</option>
                  <option value="Nature">Nature 🏞</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Map Area */}
        <div className="flex-1 relative bg-gray-100">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">Interactive Map</h3>
              <p className="text-gray-600 mb-6">Click on pins to explore places</p>
              
              {/* Simulated Map Pins */}
              <div className="relative w-full max-w-2xl mx-auto h-96 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                  {filteredPlaces.map((place, index) => (
                    <button
                      key={place.id}
                      onClick={() => setSelectedPlace(place.id)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110"
                      style={{
                        left: `${20 + (index % 5) * 15}%`,
                        top: `${25 + Math.floor(index / 5) * 20}%`
                      }}
                    >
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                        style={{ backgroundColor: getCategoryColor(place.category) }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      {selectedPlace === place.id && (
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-2 min-w-48 z-10">
                          <div className="text-sm font-medium text-gray-900">{place.name}</div>
                          <div className="text-xs text-gray-600">{place.category}</div>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600">{place.rating}</span>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l overflow-y-auto">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold text-gray-900">Places ({filteredPlaces.length})</h2>
            <p className="text-sm text-gray-600">Click on a place to see details</p>
          </div>

          <div className="p-4">
            {/* Legend */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Legend</h3>
              <div className="space-y-2">
                {['Temples', 'Peaceful', 'Adventure', 'Heritage', 'Nature'].map((category) => (
                  <div key={category} className="flex items-center space-x-2 text-sm">
                    <div 
                      className="w-4 h-4 rounded-full border border-white"
                      style={{ backgroundColor: getCategoryColor(category) }}
                    />
                    <span className="text-gray-700">{category}</span>
                    <span className="text-gray-500">
                      ({state.places.filter(p => p.category === category).length})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Places List */}
            <div className="space-y-3">
              {filteredPlaces.map((place) => (
                <Link
                  key={place.id}
                  to={`/place/${place.id}`}
                  className={`block p-3 rounded-lg border transition-colors hover:bg-gray-50 ${
                    selectedPlace === place.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedPlace(place.id)}
                >
                  <div className="flex items-start space-x-3">
                    <img 
                      src={place.coverImage} 
                      alt={place.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{place.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {place.location.district}, {place.location.state}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span 
                          className="text-xs px-2 py-1 rounded-full text-white"
                          style={{ backgroundColor: getCategoryColor(place.category) }}
                        >
                          {place.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{place.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}