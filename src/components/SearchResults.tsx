import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Filter, MapPin } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import PlaceCard from './PlaceCard';

export default function SearchResults() {
  const { state } = useApp();
  const [searchParams] = useSearchParams();
  
  const query = searchParams.get('q') || state.searchQuery;
  const category = searchParams.get('category');
  const emotion = searchParams.get('emotion');
  const region = searchParams.get('region');

  const filteredPlaces = useMemo(() => {
    return state.places.filter(place => {
      // Text search
      if (query) {
        const searchTerm = query.toLowerCase();
        const matchesName = place.name.toLowerCase().includes(searchTerm);
        const matchesDescription = place.description.toLowerCase().includes(searchTerm);
        const matchesLocation = 
          place.location.village.toLowerCase().includes(searchTerm) ||
          place.location.district.toLowerCase().includes(searchTerm) ||
          place.location.taluk.toLowerCase().includes(searchTerm) ||
          place.location.state.toLowerCase().includes(searchTerm);
        const matchesCategory = place.category.toLowerCase().includes(searchTerm);
        const matchesEmotion = place.emotionalTag.toLowerCase().includes(searchTerm);
        
        if (!(matchesName || matchesDescription || matchesLocation || matchesCategory || matchesEmotion)) {
          return false;
        }
      }
      
      // Category filter
      if (category && place.category !== category) {
        return false;
      }
      
      // Emotion filter
      if (emotion && place.emotionalTag !== emotion) {
        return false;
      }
      
      // Region filter
      if (region && 
          place.location.state !== region && 
          place.location.district !== region && 
          place.location.taluk !== region && 
          place.location.village !== region) {
        return false;
      }
      
      return true;
    });
  }, [state.places, query, category, emotion, region, state.filters]);

  const getResultsText = () => {
    const parts = [];
    if (query) parts.push(`"${query}"`);
    if (category) parts.push(`in ${category}`);
    if (emotion) parts.push(`${emotion} places`);
    if (region) parts.push(`in ${region}`);
    
    return parts.length > 0 ? parts.join(' ') : 'all places';
  };

  // Group results by category for better organization
  const groupedResults = filteredPlaces.reduce((groups, place) => {
    const category = place.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(place);
    return groups;
  }, {} as Record<string, typeof filteredPlaces>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            
            <Link to="/map" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
              <MapPin className="h-5 w-5" />
              <span>View on Map</span>
            </Link>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Search Results
            </h1>
            <p className="text-gray-600 mt-1">
              Found {filteredPlaces.length} places for {getResultsText()}
            </p>
          </div>

          {/* Active Filters */}
          {(query || category || emotion || region) && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="text-sm text-gray-600">Active filters:</span>
              {query && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  Query: "{query}"
                </span>
              )}
              {category && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Category: {category}
                </span>
              )}
              {emotion && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Emotion: {emotion}
                </span>
              )}
              {region && (
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                  Region: {region}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredPlaces.length === 0 ? (
          // No Results
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No places found</h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or explore different categories.
            </p>
            <div className="space-x-4">
              <Link 
                to="/" 
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Explore All Places
              </Link>
              <Link 
                to="/upload" 
                className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Add New Place
              </Link>
            </div>
          </div>
        ) : (
          // Results by Category
          <div className="space-y-12">
            {Object.entries(groupedResults)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([categoryName, places]) => (
                <section key={categoryName}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {categoryName} ({places.length})
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {places.map((place) => (
                      <PlaceCard key={place.id} place={place} />
                    ))}
                  </div>
                </section>
              ))}
          </div>
        )}

        {/* Suggestions */}
        {filteredPlaces.length > 0 && (
          <section className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Explore More</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {['Temples', 'Peaceful', 'Adventure', 'Heritage', 'Nature'].map((cat) => (
                <Link
                  key={cat}
                  to={`/search?category=${cat}`}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <div className="text-2xl mb-2">
                    {cat === 'Temples' && '🛕'}
                    {cat === 'Peaceful' && '🌸'}
                    {cat === 'Adventure' && '🧗'}
                    {cat === 'Heritage' && '🕰'}
                    {cat === 'Nature' && '🏞'}
                  </div>
                  <div className="font-medium text-gray-900">{cat}</div>
                  <div className="text-sm text-gray-600">
                    {state.places.filter(p => p.category === cat).length} places
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}