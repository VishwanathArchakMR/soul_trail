import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, ChevronRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import PlaceCard from './PlaceCard';

export default function RegionView() {
  const { type, id } = useParams();
  const { state } = useApp();

  const currentRegion = state.regions.find(r => r.id === id);
  const childRegions = state.regions.filter(r => r.parent === id);
  const placesInRegion = state.places.filter(place => {
    switch (type) {
      case 'state':
        return place.location.state === currentRegion?.name;
      case 'district':
        return place.location.district === currentRegion?.name;
      case 'taluk':
        return place.location.taluk === currentRegion?.name;
      case 'village':
        return place.location.village === currentRegion?.name;
      default:
        return false;
    }
  });

  if (!currentRegion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Region not found</h2>
          <Link to="/" className="text-purple-600 hover:underline">Return home</Link>
        </div>
      </div>
    );
  }

  const breadcrumbs = [];
  let current = currentRegion;
  while (current) {
    breadcrumbs.unshift(current);
    current = current.parent ? state.regions.find(r => r.id === current!.parent) : undefined;
  }

  const getNextLevelName = (currentType: string) => {
    const levels = {
      'country': 'states',
      'state': 'districts', 
      'district': 'taluks',
      'taluk': 'villages'
    };
    return levels[currentType as keyof typeof levels] || 'areas';
  };

  const categories = ['Temples', 'Peaceful', 'Adventure', 'Heritage', 'Nature'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link to="/" className="hover:text-purple-600">Home</Link>
            {breadcrumbs.map((region, index) => (
              <React.Fragment key={region.id}>
                <ChevronRight className="h-4 w-4" />
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium">{region.name}</span>
                ) : (
                  <Link 
                    to={`/region/${region.type}/${region.id}`}
                    className="hover:text-purple-600"
                  >
                    {region.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{currentRegion.name}</h1>
              <p className="text-gray-600 mt-1">
                {placesInRegion.length} places • {childRegions.length} {getNextLevelName(currentRegion.type)}
              </p>
            </div>
            
            <Link to="/" className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Child Regions */}
        {childRegions.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Explore {getNextLevelName(currentRegion.type).charAt(0).toUpperCase() + getNextLevelName(currentRegion.type).slice(1)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {childRegions.map((region) => {
                const regionPlaces = state.places.filter(place => {
                  switch (region.type) {
                    case 'district':
                      return place.location.district === region.name;
                    case 'taluk':
                      return place.location.taluk === region.name;
                    case 'village':
                      return place.location.village === region.name;
                    default:
                      return false;
                  }
                });

                return (
                  <Link
                    key={region.id}
                    to={`/region/${region.type}/${region.id}`}
                    className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-purple-500 to-orange-500">
                      <div className="w-full h-32 bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {region.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {regionPlaces.length} places to explore
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Places by Category */}
        {placesInRegion.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Places in {currentRegion.name}
            </h2>
            
            {categories.map((category) => {
              const categoryPlaces = placesInRegion.filter(place => place.category === category);
              
              if (categoryPlaces.length === 0) return null;
              
              return (
                <div key={category} className="mb-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      {category} ({categoryPlaces.length})
                    </h3>
                    <Link 
                      to={`/search?category=${category}&region=${currentRegion.name}`}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      View all →
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryPlaces.slice(0, 4).map((place) => (
                      <PlaceCard key={place.id} place={place} />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* No Places Found */}
        {placesInRegion.length === 0 && childRegions.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No places found</h3>
            <p className="text-gray-600 mb-6">
              There are no places or sub-regions listed for {currentRegion.name} yet.
            </p>
            <Link 
              to="/upload" 
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add a Place
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}